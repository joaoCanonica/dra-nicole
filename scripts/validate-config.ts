/**
 * Valida config e conteúdo.
 *  - sempre: campos obrigatórios presentes e contraste AA dos pares declarados;
 *  - produção (--production, ou --build com VERCEL_ENV=production / SITE_ENV=production):
 *    falha se houver "CONFIRMAR" e compliance.bloquearDeploySeHouverConfirmar = true.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'astro/zod';
import { profile, CONFIRMAR } from '../src/config/profile.config';
import { theme } from '../src/config/theme.config';
import { compliance } from '../src/config/compliance.config';
import { copy } from '../src/config/copy.pt-BR';
import { contraste } from '../src/lib/color';

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
});

const r = profileSchema.safeParse(profile);
if (!r.success) {
  for (const i of r.error.issues) erros.push(`profile.${i.path.join('.')}: ${i.message}`);
}

// LGPD: mensagem padrão do WhatsApp não pode induzir envio de dado clínico.
if (/sintoma|queixa|exame|dor|sangr/i.test(profile.whatsapp.mensagemPadrao)) {
  erros.push('profile.whatsapp.mensagemPadrao não pode pedir sintomas ou dados clínicos (LGPD).');
}

// Contraste
for (const modo of ['claro', 'escuro'] as const) {
  const p = theme.cores[modo];
  for (const [fg, bg, min] of theme.contraste) {
    const c = contraste(p[fg], p[bg]);
    if (c < min) erros.push(`contraste ${modo}: ${fg} sobre ${bg} = ${c.toFixed(2)} (mínimo ${min})`);
  }
}

// CONFIRMAR em config e conteúdo
function coletar(obj: unknown, caminho: string, saida: string[]): void {
  if (typeof obj === 'string') {
    if (obj.includes(CONFIRMAR)) saida.push(caminho);
  } else if (Array.isArray(obj)) {
    obj.forEach((v, i) => coletar(v, `${caminho}[${i}]`, saida));
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) coletar(v, `${caminho}.${k}`, saida);
  }
}
const pendentes: string[] = [];
coletar(profile, 'profile', pendentes);
coletar(compliance, 'compliance', pendentes);
coletar(copy, 'copy', pendentes);

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
  if (conteudo.includes(CONFIRMAR)) pendentes.push(f);
}

if (pendentes.length) {
  const msg = `${pendentes.length} campo(s) com "${CONFIRMAR}":\n    ${pendentes.join('\n    ')}`;
  if (producao && compliance.bloquearDeploySeHouverConfirmar) erros.push(msg);
  else avisos.push(msg);
}

for (const a of avisos) console.warn(`⚠ ${a}`);
if (erros.length) {
  console.error(`✖ Validação falhou${producao ? ' (produção)' : ''}:`);
  for (const e of erros) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✔ Config válida${producao ? ' para produção' : ''}.`);
