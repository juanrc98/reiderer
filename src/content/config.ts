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
  }),
});

export const collections = { blog };
