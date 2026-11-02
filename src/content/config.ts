import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    isPublished: z.boolean().default(true),
    publishDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog };

// Functie om leestijd te berekenen
export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

// Functie om gepubliceerde posts te filteren
export function isPostPublished(post: any): boolean {
  const now = new Date();
  
  // Alleen tonen als expliciet isPublished: true
  if (post.data.isPublished !== true) {
    return false;
  }
  // Als er een publishDate is, alleen tonen als die in het verleden/heden is
  if (post.data.publishDate) {
    if (post.data.publishDate > now) {
      return false;
    }
  }
  // Controleer pubDate
  if (post.data.pubDate && post.data.pubDate > now) {
    return false;
  }
  // Anders tonen
  return true;
}
