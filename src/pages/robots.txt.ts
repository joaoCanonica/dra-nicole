import type { APIRoute } from 'astro';
import { siteFinal } from '../lib/ambiente';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('http://localhost');
  const corpo = ['User-agent: *', siteFinal ? 'Allow: /' : 'Disallow: /', '', `Sitemap: ${new URL('/sitemap-index.xml', base).href}`, ''].join('\n');
  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
