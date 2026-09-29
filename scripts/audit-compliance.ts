/**
 * Auditoria de conformidade sobre o site GERADO (dist/). Roda depois do `astro build` e falha o build se:
 *  1. CFM: algum texto visível usar termo vetado (compliance.termosVetados). Citações de fontes
 *     (elementos com data-citacao) são ignoradas.
 *  2. CFM: alguma página não tiver a identificação (nome, CRM-UF, RQE, especialidade).
 *  3. LGPD: alguma página carregar recurso de terceiros sem interação (script, CSS, fonte, imagem,
 *     iframe) ou tiver campo de formulário fora da lista permitida.
 * Uso: npm run audit:compliance (também roda no `npm run build`).
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { termosVetados } from '../src/lib/termos';
import { nomeCompleto, profile } from '../src/config/profile.config';

const DIST = 'dist';
const CAMPOS_PERMITIDOS = new Set(['nome', 'telefone', 'periodo', 'consentimento', '_assunto', 'guia-fase', 'estatistica', 'essenciais']);
const erros: string[] = [];

function paginas(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? paginas(p) : p.endsWith('.html') ? [p] : [];
  });
}

const decodificar = (s: string) =>
  s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

/** Texto visível + textos de atributos lidos por humanos (alt, title, aria-label, meta description). */
function textoVisivel(html: string): string {
  const semCitacoes = html.replace(/<li[^>]*data-citacao[^>]*>[\s\S]*?<\/li>/g, ' ');
  const attrs = [...semCitacoes.matchAll(/\s(?:alt|title|aria-label|placeholder)="([^"]*)"/g)].map((m) => m[1]);
  const metas = [...semCitacoes.matchAll(/<meta[^>]+(?:name="description"|property="og:(?:title|description)")[^>]+content="([^"]*)"/g)].map((m) => m[1]);
  const corpo = semCitacoes
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  return decodificar([corpo, ...attrs, ...metas].join(' ')).replace(/\s+/g, ' ');
}

const ehExterno = (url: string) => /^(https?:)?\/\//.test(url) && !url.includes('localhost');

for (const arq of paginas(DIST)) {
  const html = readFileSync(arq, 'utf8');
  const pag = '/' + relative(DIST, arq).replace(/index\.html$/, '');

  // 1. Termos vetados
  for (const o of termosVetados(textoVisivel(html))) erros.push(`${pag}: termo vetado "${o.termo}" (${o.motivo}) → "…${o.trecho}…"`);

  // 2. Identificação CFM
  const texto = textoVisivel(html);
  const obrig = [nomeCompleto, `CRM-${profile.crm.uf}`, profile.especialidade, ...(profile.rqe.length ? ['RQE'] : [])];
  for (const o of obrig) if (!texto.includes(o)) erros.push(`${pag}: identificação CFM sem "${o}".`);

  // 3a. Recursos de terceiros carregados sem interação
  const recursos = [
    ...[...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => ['script', m[1]]),
    ...[...html.matchAll(/<link[^>]+rel="(?:stylesheet|preload|preconnect|dns-prefetch|modulepreload)"[^>]*href="([^"]+)"/g)].map((m) => ['link', m[1]]),
    ...[...html.matchAll(/<(?:img|iframe|source|video|audio)[^>]+src="([^"]+)"/g)].map((m) => ['mídia', m[1]]),
    ...[...html.matchAll(/url\((["']?)(https?:\/\/[^)"']+)\1\)/g)].map((m) => ['css url()', m[2]]),
  ] as [string, string][];
  for (const [tipo, url] of recursos) if (url && ehExterno(url)) erros.push(`${pag}: ${tipo} de terceiro carregado sem consentimento: ${url}`);
  if (/fonts\.googleapis|fonts\.gstatic/.test(html)) erros.push(`${pag}: Google Fonts remoto.`);

  // 3b. Campos de formulário (LGPD: nada clínico)
  for (const m of html.matchAll(/<(?:input|select|textarea)[^>]*\sname="([^"]+)"/g)) {
    if (!CAMPOS_PERMITIDOS.has(m[1] ?? '')) erros.push(`${pag}: campo de formulário não permitido "${m[1]}".`);
  }
  if (/<textarea/i.test(html)) erros.push(`${pag}: textarea não permitido.`);
}

if (erros.length) {
  console.error(`✖ Auditoria de conformidade falhou (${erros.length}):`);
  for (const e of erros) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✔ Auditoria de conformidade: ${paginas(DIST).length} páginas sem termos vetados, com identificação CFM e sem terceiros antes do consentimento.`);
