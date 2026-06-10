import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build
export default defineConfig({
  site: 'https://reiderer.dev',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      // El español vive en la raíz (/) y el inglés en /en
      prefixDefaultLocale: false,
    },
  },
});
