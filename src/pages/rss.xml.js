import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', (p) => p.data.lang === 'es'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: 'reiderer · Blog',
    description: 'Bitácora de Juan Rodríguez Castellano: sistemas, cloud y ciberseguridad.',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/blog/${p.slug}/`,
    })),
    customData: '<language>es</language>',
  });
}
