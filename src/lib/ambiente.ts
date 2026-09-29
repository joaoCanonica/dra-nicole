import { profile } from '../config/profile.config';

/**
 * Go-live = SITE_ENV=production (variável de ambiente definida pela pessoa na Vercel quando tudo estiver confirmado).
 * Sem ela, o site é publicado como VERSÃO PROVISÓRIA: noindex, robots bloqueando buscadores e faixa de aviso.
 * O deploy "Production" da Vercel sem SITE_ENV continua provisório.
 */
export const siteFinal = process.env.SITE_ENV === 'production';

/** URL base: SITE_URL > domínio definitivo > URL de produção da Vercel > domínio do config. */
export function urlDoSite(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  const exemplo = /example\.(com|org)/.test(profile.dominio);
  if (exemplo && process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return profile.dominio;
}
