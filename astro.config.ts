import { defineConfig } from 'astro/config';
import { profile } from './src/config/profile.config';

export default defineConfig({
  site: process.env.SITE_URL ?? profile.dominio,
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
});
