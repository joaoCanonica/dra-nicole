/**
 * Auditoria de acessibilidade com axe-core (WCAG 2.0/2.1/2.2 A e AA) sobre o site gerado.
 * - Sobe `astro preview`, abre cada página em 3 cenários: desktop claro, mobile escuro,
 *   desktop com prefers-reduced-motion.
 * - Falha se houver violação "critical" ou "serious". "moderate"/"minor" entram no relatório.
 * - Checagem extra: alvos de toque < 24px falham (WCAG 2.5.8 AA); < 44px viram aviso (meta do projeto).
 * Precisa de Chromium (CHROMIUM_PATH ou caminho padrão do Playwright). Rode `npm run build` antes.
 * Uso: npm run audit:a11y
 */
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright-core';

const require = createRequire(import.meta.url);
const axeFonte = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const PORTA = 4399;
const BASE = `http://localhost:${PORTA}`;
const PAGINAS = ['/', '/contato/', '/leitura/', '/leitura/endometriose/', '/avaliar/', '/privacidade/', '/termos/'];
const CENARIOS = [
  { nome: 'desktop-claro', viewport: { width: 1280, height: 900 }, colorScheme: 'light' as const, reducedMotion: 'no-preference' as const },
  { nome: 'mobile-escuro', viewport: { width: 390, height: 844 }, colorScheme: 'dark' as const, reducedMotion: 'no-preference' as const, isMobile: true, hasTouch: true },
  { nome: 'reduced-motion', viewport: { width: 1280, height: 900 }, colorScheme: 'light' as const, reducedMotion: 'reduce' as const },
];

const exe = [process.env.CHROMIUM_PATH, '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', '/usr/bin/chromium', '/usr/bin/google-chrome']
  .filter((p): p is string => !!p)
  .find((p) => existsSync(p));
if (!exe) { console.error('✖ Chromium não encontrado (defina CHROMIUM_PATH).'); process.exit(1); }

const servidor = spawn('npx', ['astro', 'preview', '--port', String(PORTA)], { stdio: 'ignore' });
const esperar = async () => {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(BASE)).ok) return; } catch { /* ainda subindo */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('preview não respondeu');
};

type Violacao = { id: string; impact: string | null; help: string; nodes: { target: string[] }[] };
const linhas: string[] = ['# Relatório de acessibilidade (axe-core)', '', `Gerado por \`npm run audit:a11y\` em ${new Date().toISOString().slice(0, 10)}.`, ''];
let graves = 0;
let avisosToque = 0;

try {
  await esperar();
  const b = await chromium.launch({ executablePath: exe });
  for (const c of CENARIOS) {
    const ctx = await b.newContext(c);
    const p = await ctx.newPage();
    for (const pag of PAGINAS) {
      await p.goto(BASE + pag, { waitUntil: 'load' });
      await p.waitForTimeout(700); // entrada do hero
      await p.addScriptTag({ content: axeFonte });
      const r = await p.evaluate(async () => {
        const axe = (window as unknown as { axe: { run: (c: Document, o: object) => Promise<{ violations: Violacao[] }> } }).axe;
        return axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } });
      });
      const toque = await p.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('a[href], button, input, select, summary, [tabindex="0"]')]
          .filter((el) => el.offsetParent !== null && !el.closest('p, li, dd, td') )
          .map((el) => ({ el: el.outerHTML.slice(0, 80), w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height }))
          .filter((t) => t.w > 0 && (t.w < 44 || t.h < 44)),
      );
      const pequenos = toque.filter((t) => t.w < 24 || t.h < 24);
      avisosToque += toque.length - pequenos.length;
      for (const v of r.violations) {
        const grave = v.impact === 'critical' || v.impact === 'serious';
        if (grave) graves++;
        linhas.push(`- ${grave ? '**✖**' : '⚠'} [${c.nome}] \`${pag}\` ${v.impact}: ${v.id} — ${v.help} (${v.nodes.length}×: ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(', ')})`);
      }
      for (const t of pequenos) { graves++; linhas.push(`- **✖** [${c.nome}] \`${pag}\` alvo de toque < 24px (${Math.round(t.w)}×${Math.round(t.h)}): \`${t.el}\``); }
    }
    await ctx.close();
  }
  await b.close();
} finally {
  servidor.kill();
}

linhas.push('', `Violações graves (critical/serious + alvos < 24px): **${graves}**.`, `Alvos entre 24 e 44px fora de texto corrido (aviso): ${avisosToque}.`, '');
writeFileSync('docs/A11Y.md', linhas.join('\n'));
if (graves) { console.error(`✖ ${graves} problema(s) grave(s) de acessibilidade. Veja docs/A11Y.md.`); process.exit(1); }
console.log(`✔ axe-core: 0 violações graves em ${PAGINAS.length} páginas × ${CENARIOS.length} cenários. Relatório: docs/A11Y.md`);
