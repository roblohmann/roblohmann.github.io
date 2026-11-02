# Astro Blog met Tailwind CSS

Een moderne, responsive blog gebouwd met Astro en Tailwind CSS.

## ✨ Features

- 🎨 Modern design met Tailwind CSS
- 📝 Markdown-based blog posts met MDX ondersteuning
- 🖼️ Hero sectie met profielfoto en social links
- 📁 Portfolio pagina voor GitHub projecten
- 🎯 Type-safe content collections
- ⚡ Super snelle performance
- 📱 Volledig responsive

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
│   ├── images/         # Afbeeldingen (voeg hier je profielfoto toe)
│   └── favicon.svg
├── src/
│   ├── components/     # Herbruikbare componenten
│   │   ├── Hero.astro
│   │   └── ProjectCard.astro
│   ├── content/
│   │   ├── blog/       # Blog posts in Markdown
│   │   └── config.ts   # Content collections configuratie
│   ├── layouts/        # Page layouts
│   │   ├── Layout.astro
│   │   └── BlogPost.astro
│   └── pages/          # Route pages
│       ├── index.astro
│       ├── blog.astro
│       ├── portfolio.astro
│       ├── about.astro
│       └── blog/
│           └── [slug].astro
├── astro.config.mjs    # Astro configuratie
├── tailwind.config.mjs # Tailwind CSS configuratie
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

## 🖼️ Profielfoto toevoegen

1. Voeg je profielfoto toe aan `public/images/profile.jpg`
2. De foto wordt automatisch getoond in de hero sectie op de homepage

## 🎨 Portfolio aanpassen

Open `src/pages/portfolio.astro` en pas de `projects` array aan met je eigen GitHub projecten:

```javascript
const projects = [
  {
    name: 'Project Naam',
    description: 'Beschrijving',
    url: 'https://github.com/jouwgebruikersnaam/project',
    technologies: ['Tech1', 'Tech2'],
    featured: true // Optioneel: geeft een featured badge
  },
  // Meer projecten...
];
```

## 🔗 Social Links aanpassen

Open `src/pages/index.astro` en pas de `socials` array aan:

```javascript
const socials = [
  { name: 'GitHub', url: 'https://github.com/jouwgebruikersnaam', icon: '🔗' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/jouwprofiel', icon: '💼' },
  // Meer social links...
];
```

## 🎨 Kleuren aanpassen

Pas de kleuren aan in `tailwind.config.mjs`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#0066cc', // Pas aan naar jouw primaire kleur
      secondary: '#1a1a1a',
    },
  },
}
```

## 📚 Meer informatie

- [Astro documentatie](https://docs.astro.build)
- [Tailwind CSS documentatie](https://tailwindcss.com/docs)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)

