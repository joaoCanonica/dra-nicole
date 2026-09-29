import type { CollectionEntry } from 'astro:content';
import { nomeCompleto, profile } from '../config/profile.config';

const iso = (d: Date) => d.toISOString().slice(0, 10);

/** Pessoa responsável (dados de profile.config). */
export function pessoaResponsavel(site: URL) {
  return {
    '@type': 'Person',
    name: nomeCompleto,
    jobTitle: profile.especialidade,
    url: new URL('/#sobre', site).href,
    identifier: [
      { '@type': 'PropertyValue', propertyID: `CRM-${profile.crm.uf}`, value: profile.crm.numero },
      ...profile.rqe.map((r) => ({ '@type': 'PropertyValue', propertyID: 'RQE', value: r })),
    ],
  };
}

/**
 * JSON-LD de um artigo: MedicalWebPage + Article, com `citation` (fontes) e `reviewedBy`
 * apenas quando a revisão médica foi aprovada.
 */
export function schemaArtigo(artigo: CollectionEntry<'artigos'>, url: URL, site: URL) {
  const d = artigo.data;
  const pessoa = pessoaResponsavel(site);
  const citacoes = d.fontes.map((f) => ({ '@type': 'CreativeWork', name: f.nome, url: f.url }));
  const aprovada = d.revisaoMedica === 'aprovada';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${url.href}#pagina`,
        url: url.href,
        name: d.titulo,
        description: d.resumo,
        inLanguage: profile.idioma,
        lastReviewed: iso(d.revisadoEm),
        ...(aprovada ? { reviewedBy: pessoa } : {}),
        citation: citacoes,
        mainEntity: { '@id': `${url.href}#artigo` },
      },
      {
        '@type': 'Article',
        '@id': `${url.href}#artigo`,
        headline: d.titulo,
        description: d.resumo,
        inLanguage: profile.idioma,
        datePublished: iso(d.publicadoEm),
        dateModified: iso(d.revisadoEm),
        author: pessoa,
        publisher: { '@type': 'Person', name: nomeCompleto, url: site.href },
        mainEntityOfPage: { '@id': `${url.href}#pagina` },
        isAccessibleForFree: true,
        citation: citacoes,
      },
    ],
  };
}
