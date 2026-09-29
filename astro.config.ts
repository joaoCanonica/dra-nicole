import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { profile } from './src/config/profile.config';

/** Páginas fora do sitemap (noindex). */
const foraDoSitemap = ['/avaliar/'];

export default defineConfig({
  site: process.env.SITE_URL ?? profile.dominio,
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      filter: (url) => !foraDoSitemap.some((p) => new URL(url).pathname === p),
    }),
  ],
});
