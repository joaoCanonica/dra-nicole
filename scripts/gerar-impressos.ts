/**
 * Gera materiais a partir do config (rodar de novo sempre que nome, CRM/RQE, domínio ou cores mudarem):
 *  - print/plaquinha-avaliacao.svg  (A5, QR para /avaliar, fontes embutidas)
 *  - print/plaquinha-avaliacao.pdf  (A5, pronto para gráfica; precisa de Chromium)
 *  - public/og.png                  (1200×630, imagem de compartilhamento; precisa de Chromium)
 *
 * Chromium: usa CHROMIUM_PATH ou os caminhos padrão do Playwright. Sem Chromium, gera só o SVG.
 * Uso: npm run impressos
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import QRCode from 'qrcode';
import { chromium } from 'playwright-core';
import { copy } from '../src/config/copy.pt-BR';
import { nomeCompleto, profile, registroProfissional } from '../src/config/profile.config';
import { theme } from '../src/config/theme.config';
import { caminho } from '../src/lib/linha';

const require = createRequire(import.meta.url);
const c = theme.cores.claro;
const urlAvaliar = new URL('/avaliar/', process.env.SITE_URL ?? profile.dominio).href;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

if (/example\.com|CONFIRMAR/.test(urlAvaliar)) {
  console.warn(`⚠ O QR aponta para ${urlAvaliar}. Defina profile.dominio (ou SITE_URL) e gere de novo antes de imprimir.`);
}

const fonte = (pkg: string) => readFileSync(require.resolve(pkg)).toString('base64');
const fontes = `
  @font-face { font-family: 'Cormorant Garamond'; font-weight: 500; src: url(data:font/woff2;base64,${fonte('@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2')}) format('woff2'); }
  @font-face { font-family: 'Cormorant Garamond'; font-weight: 500; font-style: italic; src: url(data:font/woff2;base64,${fonte('@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2')}) format('woff2'); }
  @font-face { font-family: 'Hanken Grotesk'; font-weight: 100 900; src: url(data:font/woff2;base64,${fonte('@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2')}) format('woff2'); }
  .display { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; }
  .texto { font-family: 'Hanken Grotesk', system-ui, sans-serif; }
`;

/** QR como <svg> aninhado, com a cor primária sobre branco (contraste alto para leitura). */
async function qr(x: number, y: number, tamanho: number): Promise<string> {
  const svg = await QRCode.toString(urlAvaliar, {
    type: 'svg', errorCorrectionLevel: 'M', margin: 0, color: { dark: c.texto, light: '#FFFFFF' },
  });
  return svg.replace('<svg ', `<svg x="${x}" y="${y}" width="${tamanho}" height="${tamanho}" `);
}

// ---------- Plaquinha A5 (148 × 210 mm; 1 unidade = 0,1 mm) ----------
async function plaquinha(): Promise<string> {
  const W = 1480, H = 2100, M = 110; // margem de segurança de 11 mm
  const qrTam = 620, qrX = (W - qrTam) / 2, qrY = 1020;
  const arcoX = qrX - 70, arcoW = qrTam + 140, arcoY = qrY - 190, arcoH = qrTam + 280;
  // Linha da Vida: desce do topo, contorna e pousa no arco do QR.
  // Desce pela margem esquerda (sem cruzar o texto) e pousa no topo do arco.
  const linha = `M 60 0 L 60 620 C 60 760, ${W * 0.3} 740, ${W / 2} ${arcoY - 2}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="148mm" height="210mm" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(`${copy.plaquinha.titulo} ${copy.plaquinha.subtitulo} ${nomeCompleto}`)}">
  <style>${fontes}</style>
  <defs>
    <radialGradient id="g1" cx="0.88" cy="0.1" r="0.7"><stop offset="0" stop-color="${c.acento}" stop-opacity="0.18"/><stop offset="1" stop-color="${c.acento}" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="0.05" cy="0.95" r="0.7"><stop offset="0" stop-color="${c.primaria}" stop-opacity="0.14"/><stop offset="1" stop-color="${c.primaria}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${c.fundo}"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>

  <path d="${linha}" fill="none" stroke="${c.acento}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="${W / 2}" cy="${arcoY - 2}" r="12" fill="${c.fundo}" stroke="${c.acento}" stroke-width="4"/>

  <text x="${W - M}" y="${M + 60}" text-anchor="end" class="display" font-size="78" fill="${c.texto}">${esc(nomeCompleto)}</text>
  <text x="${W - M}" y="${M + 120}" text-anchor="end" class="texto" font-size="34" letter-spacing="4" fill="${c.acentoTexto}">${esc(profile.especialidade.toUpperCase())}</text>

  <text x="${W / 2}" y="560" text-anchor="middle" class="display" font-size="84" fill="${c.texto}">${esc(copy.plaquinha.titulo)}</text>
  <text x="${W / 2}" y="680" text-anchor="middle" class="display" font-size="112" font-style="italic" fill="${c.primaria}">${esc(copy.plaquinha.subtitulo)}</text>

  <path d="M ${arcoX} ${arcoY + arcoW / 2} A ${arcoW / 2} ${arcoW / 2} 0 0 1 ${arcoX + arcoW} ${arcoY + arcoW / 2} L ${arcoX + arcoW} ${arcoY + arcoH} L ${arcoX} ${arcoY + arcoH} Z"
        fill="#FFFFFF" stroke="${c.acento}" stroke-width="3"/>
  ${await qr(qrX, qrY, qrTam)}

  <text x="${W / 2}" y="${arcoY + arcoH + 90}" text-anchor="middle" class="texto" font-size="38" fill="${c.textoSuave}">${esc(copy.plaquinha.instrucao)}</text>
  <text x="${W / 2}" y="${arcoY + arcoH + 145}" text-anchor="middle" class="texto" font-size="30" fill="${c.textoSuave}">${esc(urlAvaliar.replace(/^https?:\/\//, ''))}</text>

  <text x="${W / 2}" y="${H - M}" text-anchor="middle" class="texto" font-size="28" fill="${c.textoSuave}">${esc(`${nomeCompleto} · ${registroProfissional}`)}</text>
</svg>
`;
}

// ---------- Imagem OG 1200 × 630 ----------
function og(): string {
  const W = 1200, H = 630;
  const d = caminho('onda', 1, 1); // mesma geometria da Linha da Vida do site
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <style>${fontes}</style>
  <defs>
    <radialGradient id="a" cx="0.9" cy="0.1" r="0.8"><stop offset="0" stop-color="${c.acento}" stop-opacity="0.22"/><stop offset="1" stop-color="${c.acento}" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="0.05" cy="1" r="0.8"><stop offset="0" stop-color="${c.primaria}" stop-opacity="0.18"/><stop offset="1" stop-color="${c.primaria}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${c.fundo}"/><rect width="${W}" height="${H}" fill="url(#a)"/><rect width="${W}" height="${H}" fill="url(#b)"/>
  <svg x="60" y="0" width="120" height="${H}" viewBox="0 0 100 1000" preserveAspectRatio="none">
    <path d="${d}" fill="none" stroke="${c.acento}" stroke-width="3" vector-effect="non-scaling-stroke"/>
  </svg>
  <circle cx="120" cy="${H * 0.3}" r="9" fill="${c.fundo}" stroke="${c.acento}" stroke-width="3"/>
  <text x="200" y="210" class="texto" font-size="26" letter-spacing="5" fill="${c.acentoTexto}">${esc(profile.especialidade.toUpperCase())}</text>
  <text x="200" y="320" class="display" font-size="96" fill="${c.texto}">${esc(nomeCompleto)}</text>
  <text x="200" y="400" class="display" font-size="46" font-style="italic" fill="${c.primaria}">${esc(profile.subtitulo)}</text>
  <text x="200" y="540" class="texto" font-size="26" fill="${c.textoSuave}">${esc(registroProfissional)}</text>
</svg>`;
}

function acharChromium(): string | undefined {
  const candidatos = [
    process.env.CHROMIUM_PATH,
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    '/usr/bin/chromium',
    '/usr/bin/google-chrome',
  ].filter((p): p is string => !!p);
  return candidatos.find((p) => existsSync(p));
}

mkdirSync('print', { recursive: true });
const svgPlaquinha = await plaquinha();
writeFileSync('print/plaquinha-avaliacao.svg', svgPlaquinha);
console.log(`✔ print/plaquinha-avaliacao.svg (QR → ${urlAvaliar})`);

const exe = acharChromium();
if (!exe) {
  console.warn('⚠ Chromium não encontrado (defina CHROMIUM_PATH). PDF e og.png não foram gerados.');
} else {
  const b = await chromium.launch({ executablePath: exe });
  const p = await b.newPage();
  await p.setContent(`<!doctype html><html><head><style>@page{size:148mm 210mm;margin:0}html,body{margin:0}svg{display:block;width:148mm;height:210mm}</style></head><body>${svgPlaquinha.replace(/^<\?xml[^>]*>/, '')}</body></html>`);
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: 'print/plaquinha-avaliacao.pdf', width: '148mm', height: '210mm', printBackground: true, pageRanges: '1' });
  console.log('✔ print/plaquinha-avaliacao.pdf (A5)');

  await p.setViewportSize({ width: 1200, height: 630 });
  await p.setContent(`<!doctype html><html><head><style>html,body{margin:0}</style></head><body>${og()}</body></html>`);
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: 'public/og.png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log('✔ public/og.png (1200×630)');
  await b.close();
}
