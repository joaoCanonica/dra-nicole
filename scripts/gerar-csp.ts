/**
 * Pós-build: injeta em cada HTML de dist/ uma Content-Security-Policy (<meta http-equiv>) com o
 * hash SHA-256 de cada script inline executável da página. Sem 'unsafe-inline' em script-src.
 * Origens de terceiros entram SÓ se configuradas em contato.config (métricas, endpoint do formulário),
 * e mesmo assim só são usadas depois do consentimento. Diretivas que só valem em header
 * (frame-ancestors) ficam no vercel.json.
 */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { contato } from '../src/config/contato.config';

const DIST = 'dist';
const origem = (url: string) => { try { return new URL(url).origin; } catch { return null; } };

const a = contato.analytics;
const scriptExtra = a.tipo === 'plausible' ? [origem(a.script)] : [];
const connectExtra = a.tipo === 'beacon' ? [origem(a.endpoint)] : a.tipo === 'plausible' ? [origem(a.script)] : [];
const f = contato.formulario;
const formExtra = f.destino === 'mailto' ? ['mailto:'] : f.destino === 'endpoint' ? [origem(f.endpoint)] : [];
const lista = (xs: (string | null)[]) => xs.filter((x): x is string => !!x).join(' ');

function paginas(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? paginas(p) : p.endsWith('.html') ? [p] : [];
  });
}

let total = 0;
for (const arq of paginas(DIST)) {
  let html = readFileSync(arq, 'utf8').replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/, '');
  const hashes = [...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => `'sha256-${createHash('sha256').update(m[1] ?? '').digest('base64')}'`);
  const politica = [
    "default-src 'self'",
    `script-src 'self' ${[...new Set(hashes)].join(' ')} ${lista(scriptExtra)}`.trim(),
    // style-src precisa de 'unsafe-inline' por causa dos tokens e das variáveis em style="" (sem risco de execução).
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self' data:", // o Vite embute fontes pequenas como data:
    `connect-src 'self' ${lista(connectExtra)}`.trim(),
    `form-action 'self' ${lista(formExtra)}`.trim(),
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    'upgrade-insecure-requests',
  ].join('; ');
  html = html.replace(/<meta charset="utf-8"\s*\/?>/i, (m) => `${m}<meta http-equiv="Content-Security-Policy" content="${politica}">`);
  writeFileSync(arq, html);
  total++;
}
console.log(`✔ CSP com hashes injetada em ${total} páginas.`);
