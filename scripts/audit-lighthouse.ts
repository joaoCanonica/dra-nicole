/**
 * Lighthouse (mobile, throttling simulado padrão) sobre o site gerado, via `astro preview`.
 * Metas: Performance ≥ 95, Acessibilidade = 100, Boas práticas ≥ 95, SEO ≥ 95.
 * Também mede o JS total (gzip) enviado por página: meta < 80 KB.
 * Precisa de Chromium (CHROMIUM_PATH). Rode `npm run build` antes. Relatório: docs/PERFORMANCE.md
 */
import { spawn } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const PORTA = 4397;
const BASE = `http://localhost:${PORTA}`;
const PAGINAS = ['/', '/contato/', '/leitura/', '/leitura/endometriose/', '/avaliar/', '/privacidade/'];
const METAS = { performance: 95, accessibility: 100, 'best-practices': 95, seo: 95 } as const;
const JS_MAX_KB = 80;
/** /avaliar é noindex de propósito (alvo do QR): a nota de SEO não se aplica. */
const ISENCOES: Record<string, (keyof typeof METAS)[]> = { '/avaliar/': ['seo'] };

const chromePath = [process.env.CHROMIUM_PATH, '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', '/usr/bin/chromium', '/usr/bin/google-chrome']
  .filter((p): p is string => !!p)
  .find((p) => existsSync(p));
if (!chromePath) { console.error('✖ Chromium não encontrado (defina CHROMIUM_PATH).'); process.exit(1); }

const servidor = spawn('npx', ['astro', 'preview', '--port', String(PORTA)], { stdio: 'ignore' });
for (let i = 0; i < 60; i++) {
  try { if ((await fetch(BASE)).ok) break; } catch { /* subindo */ }
  await new Promise((r) => setTimeout(r, 500));
}

/** JS da página: scripts inline executáveis + arquivos .js, somados e comprimidos com gzip. */
async function jsGzipKb(pag: string): Promise<number> {
  const html = await (await fetch(BASE + pag)).text();
  const inline = [...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1] ?? '').join('\n');
  const externos = await Promise.all(
    [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(async (m) => (await fetch(new URL(m[1] ?? '', BASE))).text()),
  );
  return gzipSync([inline, ...externos].join('\n')).length / 1024;
}

const linhas = ['# Performance e Lighthouse', '', `Gerado por \`npm run audit:lighthouse\` em ${new Date().toISOString().slice(0, 10)} (mobile, throttling simulado padrão do Lighthouse ${'13'}).`, '', '| Página | Performance | Acessibilidade | Boas práticas | SEO | LCP | CLS | TBT | JS (gzip) |', '|---|---|---|---|---|---|---|---|---|'];
const falhas: string[] = [];
const chrome = await chromeLauncher.launch({ chromePath, chromeFlags: ['--headless=new', '--no-sandbox'] });
try {
  for (const pag of PAGINAS) {
    const r = await lighthouse(BASE + pag, { port: chrome.port, output: 'json', logLevel: 'error' });
    if (!r) throw new Error(`Lighthouse sem resultado para ${pag}`);
    const c = r.lhr.categories;
    const nota = (k: keyof typeof METAS) => Math.round((c[k]?.score ?? 0) * 100);
    const a = r.lhr.audits;
    const js = await jsGzipKb(pag);
    for (const k of Object.keys(METAS) as (keyof typeof METAS)[]) if (!ISENCOES[pag]?.includes(k) && nota(k) < METAS[k]) falhas.push(`${pag}: ${k} ${nota(k)} < ${METAS[k]}`);
    if (js >= JS_MAX_KB) falhas.push(`${pag}: JS ${js.toFixed(1)} KB ≥ ${JS_MAX_KB} KB`);
    linhas.push(`| \`${pag}\` | ${nota('performance')} | ${nota('accessibility')} | ${nota('best-practices')} | ${nota('seo')} | ${a['largest-contentful-paint']?.displayValue ?? '-'} | ${a['cumulative-layout-shift']?.displayValue ?? '-'} | ${a['total-blocking-time']?.displayValue ?? '-'} | ${js.toFixed(1)} KB |`);
    // Itens que tiraram pontos (para depuração)
    const perdas = Object.values(a).filter((x) => x.score !== null && x.score < 0.9 && x.scoreDisplayMode !== 'informative' && x.scoreDisplayMode !== 'notApplicable' && x.scoreDisplayMode !== 'manual');
    if (perdas.length) linhas.push(`| | ${perdas.map((x) => x.id).join(', ')} | | | | | | | |`);
    console.log(`${pag}: P${nota('performance')} A${nota('accessibility')} BP${nota('best-practices')} SEO${nota('seo')} JS ${js.toFixed(1)}KB`);
  }
} finally {
  await chrome.kill();
  servidor.kill();
}

linhas.push('', falhas.length ? `**Abaixo da meta:** ${falhas.join('; ')}` : '**Todas as metas atingidas.**', '');
writeFileSync('docs/PERFORMANCE.md', linhas.join('\n'));
if (falhas.length) { console.error(`✖ ${falhas.length} meta(s) não atingida(s). Veja docs/PERFORMANCE.md.`); process.exit(1); }
console.log('✔ Lighthouse: metas atingidas em todas as páginas.');
