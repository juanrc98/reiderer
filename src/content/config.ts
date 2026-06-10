import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    lang: z.enum(['es', 'en']),
    category: z.string(),
    // color del acento de marca: azul (defensa/sistemas), rojo (ofensiva), neutral
    accent: z.enum(['blue', 'red', 'neutral']).default('blue'),
    tags: z.array(z.string()).default([]),
    // clave compartida entre la versión ES y EN del mismo post (para el selector de idioma)
    translationKey: z.string().optional(),
  }),
});

export const collections = { blog };
