# Astro Blog

Een moderne blog gebouwd met Astro.

## 🚀 Aan de slag

### Installeer dependencies

```bash
npm install
```

### Start de development server

```bash
npm run dev
```

De blog is nu beschikbaar op `http://localhost:4321`

### Build voor productie

```bash
npm run build
```

### Preview productie build

```bash
npm run preview
```

## 📁 Project structuur

```
/
├── public/              # Statische assets
├── src/
│   ├── content/
│   │   ├── blog/       # Blog posts in Markdown
│   │   └── config.ts   # Content collections configuratie
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   │   ├── index.astro
│   │   ├── blog.astro
│   │   ├── about.astro
│   │   └── blog/
│   │       └── [slug].astro
├── astro.config.mjs    # Astro configuratie
├── package.json
└── tsconfig.json
```

## ✍️ Blog posts toevoegen

Maak een nieuw `.md` of `.mdx` bestand in `src/content/blog/`:

```markdown
---
title: "Mijn blog post"
description: "Een korte beschrijving"
pubDate: 2026-01-20
tags: ["tag1", "tag2"]
---

Je content hier...
```

## 📚 Meer informatie

- [Astro documentatie](https://docs.astro.build)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
