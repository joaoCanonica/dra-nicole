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

/** Tira campos com CONFIRMAR ou vazios (o build de produção já bloqueia CONFIRMAR). */
const valido = (v: string | null | undefined): v is string => !!v && !v.includes('CONFIRMAR');

/**
 * Consultório: Physician (que já é MedicalBusiness no schema.org) + MedicalBusiness,
 * com geo, horários, especialidade, sameAs e identificadores CRM/RQE.
 */
export function schemaConsultorio(site: URL) {
  const e = profile.endereco;
  const horarios = Array.isArray(profile.horarios) ? profile.horarios : [];
  const sameAs = [profile.instagram.url, profile.googleBusiness.urlPerfil].filter(valido);
  const { lat, lng } = profile.coordenadas;
  return {
    '@context': 'https://schema.org',
    '@type': ['Physician', 'MedicalBusiness'],
    '@id': new URL('/#consultorio', site).href,
    name: nomeCompleto,
    description: `${profile.especialidade} em ${e.cidade}-${e.uf}.`,
    url: site.href,
    image: new URL('/og.png', site).href,
    medicalSpecialty: ['https://schema.org/Gynecologic', 'https://schema.org/Obstetric'],
    ...(valido(profile.telefone.e164) ? { telephone: profile.telefone.e164 } : {}),
    address: {
      '@type': 'PostalAddress',
      ...(valido(e.logradouro) ? { streetAddress: [e.logradouro, e.complemento].filter(Boolean).join(', ') } : {}),
      addressLocality: e.cidade,
      addressRegion: e.uf,
      ...(valido(e.cep) ? { postalCode: e.cep } : {}),
      addressCountry: 'BR',
    },
    ...(lat !== null && lng !== null ? { geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng } } : {}),
    ...(horarios.length
      ? {
          openingHoursSpecification: horarios.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.dias.map((d) => `https://schema.org/${d}`),
            opens: h.abre,
            closes: h.fecha,
          })),
        }
      : {}),
    areaServed: { '@type': 'City', name: e.cidade },
    ...(sameAs.length ? { sameAs } : {}),
    ...(valido(e.urlMapa) ? { hasMap: e.urlMapa } : {}),
    identifier: pessoaResponsavel(site).identifier,
  };
}

/** BreadcrumbList a partir de [{nome, caminho}]. */
export function schemaBreadcrumbs(itens: { nome: string; caminho: string }[], site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nome,
      item: new URL(it.caminho, site).href,
    })),
  };
}
