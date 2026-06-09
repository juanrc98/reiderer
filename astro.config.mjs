import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  // Cambia esto por tu dominio cuando lo tengas (p. ej. https://reiderer.com)
  site: 'https://reiderer.vercel.app',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      // El español vive en la raíz (/) y el inglés en /en
      prefixDefaultLocale: false,
    },
  },
});
