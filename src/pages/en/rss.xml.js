import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', (p) => p.data.lang === 'en'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: 'reiderer · Blog (EN)',
    description: "Juan Rodríguez Castellano's log: systems, cloud and cybersecurity.",
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/en/blog/${p.slug}/`,
    })),
    customData: '<language>en</language>',
  });
}
