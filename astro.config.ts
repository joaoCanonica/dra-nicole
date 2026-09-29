import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { urlDoSite } from './src/lib/ambiente';

/** Páginas fora do sitemap (noindex). */
const foraDoSitemap = ['/avaliar/'];

export default defineConfig({
  site: urlDoSite(),
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      filter: (url) => !foraDoSitemap.some((p) => new URL(url).pathname === p),
    }),
  ],
});
