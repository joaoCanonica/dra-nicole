/**
 * Valida config e conteúdo.
 *  - sempre: campos obrigatórios presentes e contraste AA dos pares declarados;
 *  - produção (--production, ou --build com VERCEL_ENV=production / SITE_ENV=production):
 *    falha se houver "CONFIRMAR" e compliance.bloquearDeploySeHouverConfirmar = true;
 *  - sempre: falha se copy/config/conteúdo usar termo proibido (compliance.termosProibidos);
 *  - --relatorio: grava docs/PENDENCIAS.md com todos os CONFIRMAR rastreáveis.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'astro/zod';
import { profile, CONFIRMAR } from '../src/config/profile.config';
import { theme } from '../src/config/theme.config';
import { compliance } from '../src/config/compliance.config';
import { copy } from '../src/config/copy.pt-BR';
import { contraste } from '../src/lib/color';
import { calendario } from '../src/config/calendario.config';

const args = process.argv.slice(2);
const producao =
  args.includes('--production') ||
  (args.includes('--build') &&
    (process.env.VERCEL_ENV === 'production' || process.env.SITE_ENV === 'production'));

const erros: string[] = [];
const avisos: string[] = [];

const texto = z.string().trim().min(1);
const profileSchema = z.object({
  nome: texto,
  nomeCurto: texto,
  tratamento: z.string(),
  especialidade: texto,
  subtitulo: texto,
  crm: z.object({ numero: texto, uf: z.string().length(2) }),
  rqe: z.array(texto).min(1),
  endereco: z.object({
    logradouro: texto, bairro: texto, cidade: texto, uf: z.string().length(2), cep: texto, urlMapa: texto,
  }),
  coordenadas: z.object({ lat: z.number().nullable(), lng: z.number().nullable() }),
  horarios: z.union([z.literal(CONFIRMAR), z.array(z.object({ dias: texto, abre: texto, fecha: texto })).min(1)]),
  telefone: z.object({ exibicao: texto, e164: texto }),
  whatsapp: z.object({ e164: texto, mensagemPadrao: texto }),
  instagram: z.object({ usuario: texto, url: texto }),
  email: z.string().email().optional(),
  googleBusiness: z.object({ placeId: texto, urlAvaliar: texto }),
  convenios: z.union([z.literal(CONFIRMAR), z.array(texto)]),
  atendeParticular: z.union([z.literal(CONFIRMAR), z.boolean()]),
  dominio: z.string().url(),
  idioma: texto,
  formacao: z.object({
    graduacao: texto,
    residencia: texto,
    titulos: z.array(texto),
    sociedades: z.array(texto),
    areasAtuacao: z.array(texto),
  }),
  retrato: z.object({
    arquivo: texto.nullable(),
    alt: texto,
    tratamento: z.enum(['duotone', 'natural']),
    ampliacaoMax: z.number().min(1).max(2),
  }),
});

const r = profileSchema.safeParse(profile);
if (!r.success) {
  for (const i of r.error.issues) erros.push(`profile.${i.path.join('.')}: ${i.message}`);
}

// LGPD: mensagem padrão do WhatsApp não pode induzir envio de dado clínico.
if (/sintoma|queixa|exame|dor|sangr/i.test(profile.whatsapp.mensagemPadrao)) {
  erros.push('profile.whatsapp.mensagemPadrao não pode pedir sintomas ou dados clínicos (LGPD).');
}

// Retrato: o arquivo declarado precisa existir.
if (profile.retrato.arquivo && !existsSync(join('src/assets/retrato', profile.retrato.arquivo))) {
  erros.push(`profile.retrato.arquivo: src/assets/retrato/${profile.retrato.arquivo} não encontrado.`);
}

// Contraste
for (const modo of ['claro', 'escuro'] as const) {
  const p = theme.cores[modo];
  for (const [fg, bg, min] of theme.contraste) {
    const c = contraste(p[fg], p[bg]);
    if (c < min) erros.push(`contraste ${modo}: ${fg} sobre ${bg} = ${c.toFixed(2)} (mínimo ${min})`);
  }
}

// Varre todos os textos de config e conteúdo publicado.
type Ocorrencia = { onde: string; texto: string };
const textos: Ocorrencia[] = [];
function coletar(obj: unknown, caminho: string): void {
  if (typeof obj === 'string') textos.push({ onde: caminho, texto: obj });
  else if (Array.isArray(obj)) obj.forEach((v, i) => coletar(v, `${caminho}[${i}]`));
  else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      if (caminho === 'compliance' && k === 'termosProibidos') continue;
      coletar(v, `${caminho}.${k}`);
    }
  }
}
coletar(profile, 'profile');
coletar(compliance, 'compliance');
coletar(copy, 'copy');

function arquivos(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? arquivos(p) : [p];
  });
}
for (const f of arquivos('src/content')) {
  const conteudo = readFileSync(f, 'utf8');
  // Rascunhos não são publicados, então não bloqueiam.
  if (/^rascunho:\s*true/m.test(conteudo)) continue;
  conteudo.split('\n').forEach((linha, i) => {
    if (linha.trim()) textos.push({ onde: `${f}:${i + 1}`, texto: linha });
  });
}

// Artigos: tamanho (palavras do corpo) e fontes presentes.
const dirArtigos = 'src/content/artigos';
const idsArtigos = new Set<string>();
for (const f of readdirSync(dirArtigos).filter((n) => /\.mdx?$/.test(n))) {
  idsArtigos.add(f.replace(/\.mdx?$/, ''));
  const bruto = readFileSync(join(dirArtigos, f), 'utf8');
  if (/^rascunho:\s*true/m.test(bruto)) continue;
  const corpo = bruto.replace(/^---[\s\S]*?\n---/, '');
  const n = corpo.split(/\s+/).filter(Boolean).length;
  const { palavrasMin, palavrasMax } = compliance.artigos;
  if (n < palavrasMin || n > palavrasMax) erros.push(`${f}: ${n} palavras (esperado ${palavrasMin}–${palavrasMax}).`);
  if (!/^fontes:/m.test(bruto)) erros.push(`${f}: sem bloco "fontes".`);
}

// Calendário: todo artigo referenciado precisa existir.
for (const d of calendario) {
  if (d.artigo && !idsArtigos.has(d.artigo)) erros.push(`calendario.${d.id}: artigo "${d.artigo}" não existe em ${dirArtigos}.`);
}

// Publicidade médica: termos proibidos.
const ehCitacao = (linha: string) => /^\s*(-\s*)?(nome|url):/.test(linha);
for (const termo of compliance.termosProibidos) {
  const prefixo = termo.endsWith('*');
  const base = termo.replace(/\*$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(^|[^\\p{L}])${base}${prefixo ? '' : '(?![\\p{L}])'}`, 'iu');
  for (const t of textos) {
    if (ehCitacao(t.texto)) continue;
    if (re.test(t.texto)) erros.push(`termo proibido "${termo}" em ${t.onde}: "${t.texto.trim()}"`);
  }
}

// CONFIRMAR rastreável.
const pendentes = textos.filter((t) => t.texto.includes(CONFIRMAR));
if (pendentes.length) {
  const msg = `${pendentes.length} campo(s) com "${CONFIRMAR}" (npm run pendencias gera docs/PENDENCIAS.md):\n    ${pendentes
    .map((p) => p.onde)
    .join('\n    ')}`;
  if (producao && compliance.bloquearDeploySeHouverConfirmar) erros.push(msg);
  else avisos.push(msg);
}

if (args.includes('--relatorio')) {
  const linhas = [
    '# Pendências de confirmação',
    '',
    `Gerado por \`npm run pendencias\`. ${pendentes.length} item(ns). Enquanto houver itens aqui, o deploy de produção fica bloqueado.`,
    '',
    '| Onde | Texto atual |',
    '|---|---|',
    ...pendentes.map((p) => `| \`${p.onde}\` | ${p.texto.replace(/\|/g, '\\|').trim()} |`),
    '',
  ];
  writeFileSync('docs/PENDENCIAS.md', linhas.join('\n'));
  console.log('✔ docs/PENDENCIAS.md atualizado.');
}

for (const a of avisos) console.warn(`⚠ ${a}`);
if (erros.length) {
  console.error(`✖ Validação falhou${producao ? ' (produção)' : ''}:`);
  for (const e of erros) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✔ Config válida${producao ? ' para produção' : ''}.`);
