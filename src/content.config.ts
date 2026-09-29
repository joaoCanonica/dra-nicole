import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { compliance } from './config/compliance.config';

const fontePermitida = (url: string) => {
  const host = new URL(url).hostname;
  return compliance.fontesPermitidas.some((d) => host === d || host.endsWith(`.${d}`));
};

const artigos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/artigos' }),
  schema: z.object({
    titulo: z.string().min(5),
    resumo: z.string().min(20).max(220),
    categoria: z.enum(['ginecologia', 'gestacao', 'prevencao', 'puerperio', 'menopausa']),
    publicadoEm: z.coerce.date(),
    fontes: z
      .array(
        z.object({
          nome: z.string().min(2),
          url: z.string().url().refine(fontePermitida, 'Fonte fora da lista de compliance.fontesPermitidas.'),
          dataAcesso: z.coerce.date(),
        }),
      )
      .min(1, 'Todo artigo precisa de ao menos uma fonte.'),
    revisadoEm: z.coerce.date(),
    aviso: z.string().min(10).default(compliance.artigos.avisoPadrao),
    /** "aprovada" só depois que a profissional revisar o texto. Só então entra `reviewedBy` no schema. */
    revisaoMedica: z.enum(['CONFIRMAR', 'aprovada']),
    rascunho: z.boolean().default(false),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    pergunta: z.string().min(5),
    ordem: z.number().int().default(100),
    grupo: z.enum(['consulta', 'agendamento', 'convenios', 'privacidade']).default('consulta'),
  }),
});

export const collections = { artigos, faq };
