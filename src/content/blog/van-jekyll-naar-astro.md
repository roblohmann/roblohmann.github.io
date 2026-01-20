---
title: "Van Jekyll naar Astro"
description: "Waarom ik ben overgestapt van Jekyll naar Astro voor mijn blog"
pubDate: 2026-01-20
tags: ["astro", "jekyll", "migratie"]
---

# Van Jekyll naar Astro

Na jaren Jekyll te hebben gebruikt, ben ik overgestapt naar Astro. Hier is waarom.

## De voordelen van Astro

### Performance
Astro genereert standaard statische HTML zonder JavaScript. Dit maakt je site ongelooflijk snel.

### Developer Experience
Met TypeScript support, MDX, en een moderne build tool (Vite) is de developer experience top.

### Content Collections
Astro's content collections geven je type-safe frontmatter en betere organisatie:

```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});
```

## Migratie

Het migreren van Jekyll naar Astro is vrij eenvoudig:

1. Je Markdown files blijven grotendeels hetzelfde
2. Frontmatter is vergelijkbaar
3. Layouts zijn eenvoudiger in Astro

## Conclusie

Astro is een moderne, snelle, en developer-friendly static site generator. Perfect voor blogs!
