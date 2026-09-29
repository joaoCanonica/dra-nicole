import type { APIRoute } from 'astro';
import { theme } from '../config/theme.config';
import { profile } from '../config/profile.config';

/** Favicon gerado do tema: inicial do nome curto sobre a cor primária, com o arco da assinatura. */
export const GET: APIRoute = () => {
  const c = theme.cores.claro;
  const inicial = profile.nomeCurto.charAt(0).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${c.primaria}"/>
  <path d="M16 54V30a16 16 0 0 1 32 0v24" fill="none" stroke="${c.acento}" stroke-width="3"/>
  <text x="32" y="46" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="${c.primariaTexto}">${inicial}</text>
</svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
