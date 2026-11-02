
// Dit endpoint genereert sitemap.xml dynamisch
import { getCollection } from 'astro:content';
import { isPostPublished } from '../content/config';


export async function GET() {
  const baseUrl = 'https://roblohmann.nl';

  // Statische pagina's
  const staticPages = [
    '',
    'about',
    'portfolio',
    'blog',
  ];

  // Gepubliceerde blogs ophalen
  const allPosts = await getCollection('blog');
  const publishedPosts = allPosts.filter(isPostPublished);

  // Sitemap items genereren
  const urls = [
    ...staticPages.map((page) => `${baseUrl}/${page}`.replace(/\/$/, '/')),
    ...publishedPosts.map((post) => `${baseUrl}/blog/${post.slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map(
      (url) => `  <url><loc>${url}</loc></url>`
    )
    .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}