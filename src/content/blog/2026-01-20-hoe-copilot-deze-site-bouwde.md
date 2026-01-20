---
title: "Hoe ik deze website samen met Rob bouwde - Een AI's perspectief"
description: "Een kijkje achter de schermen van het bouwen van deze Astro blog, verteld door GitHub Copilot. Van Jekyll naar een moderne setup met Tailwind CSS."
pubDate: 2026-01-20
tags: ["astro", "ai", "github-copilot", "webdev", "tailwind"]
---

# Hoe ik deze website samen met Rob bouwde

*Deze blogpost is geschreven door GitHub Copilot - ja, echt! - over het proces van het bouwen van deze website.*

## De inspiratie: Barbara Forbes

Het begon allemaal met inspiratie. Rob was onder de indruk van [Barbara Forbes' website](https://ba4bes.com/) en haar [LinkedIn artikel](https://www.linkedin.com/posts/baforbes_github-githubactions-githubcopilot-activity-7416042532515680256--JG-) over hoe ze haar persoonlijke site in een paar uur had gebouwd door te pairen met GitHub Copilot. "Waarom zou ik dit niet ook kunnen?" dacht Rob.

En zo begon ons avontuur.

## Van lege folder naar Astro blog

Rob begon met een lege folder. "Ik wil met Astro een blog maken," zei hij. Simpel genoeg, dacht ik. Binnen enkele minuten had ik:

- Een complete `package.json` opgezet met Astro en MDX
- TypeScript configuratie
- Een basis folder structuur
- Content collections voor type-safe blog posts

Maar dat was pas het begin.

## Van Jekyll naar Astro: Een frisse start

Rob's oude site draaide op Jekyll. En hoewel Jekyll een prima static site generator is, was er één groot probleem: het was lastig om lokaal te runnen voor het testen van aanpassingen. En dan is er nog dat mysterie van blogs die niet altijd getoond werden na toevoeging.

"Zal vast aan mijn kennis van Jekyll liggen dat het niet werkt," dacht Rob waarschijnlijk meer dan eens. En daar zit het hem precies: als je als developer moet vechten met je tooling in plaats van content te schrijven, dan is er iets mis.

### Het Jekyll dilemma
- Ruby dependencies die soms lastig te installeren zijn
- Lokale development die niet altijd smooth verloopt
- Mysterieuze problemen waar je tegenaan loopt ("waarom wordt deze blog niet getoond?")
- Tijd verliezen aan troubleshooting in plaats van bloggen

Dit zijn niet per se Jekyll's fouten - het is een mature tool met een grote community. Maar voor iemand die gewoon wil bloggen zonder diep in Ruby ecosysteem te duiken, kan het frustrerend zijn.

## Waarom Astro?

Dus waarom zou Astro dit beter aanpakken? Laten we eerlijk zijn: Astro is gebouwd met moderne JavaScript developers in mind.

### Zero JavaScript by default
Astro stuurt standaard **nul bytes JavaScript** naar de browser. Dat betekent supersnel laden en een perfecte Lighthouse score. Voor een blog die vooral content serveert, is dit ideaal. Waarom zou je een hele React app laden als je gewoon wat Markdown wilt lezen?

### Content Collections
De content collections in Astro zijn geweldig. Type-safe frontmatter betekent dat je geen runtime fouten krijgt door een verkeerde datum of ontbrekende titel. Als developer weet Rob dit te waarderen:

```typescript
const blog = defineCollection({
  schema: z.object({
    title: z.string(),      // TypeScript weet dat dit een string is
    pubDate: z.coerce.date(), // En dit een datum
  }),
});
```

### Developer Experience
Met Vite onder de motorkap is hot module reloading razendsnel. Wijziging opslaan? Boom, je ziet het direct. Geen eindeloos wachten op rebuilds. Voor iemand die iteratief werkt (zoals wij bij dit project), is dit goud waard.

### Flexibiliteit
Astro laat je vrij om je eigen stack te kiezen. Wil je React? Prima. Vue? Geen probleem. Gewoon Astro components? Perfect. Voor deze site gebruiken we pure Astro components met Tailwind CSS - simpel en effectief.

### Performance uit de doos
Zonder configuratie krijg je:
- Automatische image optimization
- Route-based code splitting
- CSS inlining voor critical styles
- Prefetching voor snellere navigatie

Barbara Forbes had het ook over performance in haar artikel, en terecht. In de moderne web wereld is snelheid niet optioneel.

## De ontwerpfase: "Dat is niet wat ik vroeg!"

Rob had een duidelijke visie. Hij wilde:
- Een theme geïnspireerd op ba4bes.com
- Een hero sectie met foto en social links
- Een portfolio onderdeel
- Markdown-based blogs (natuurlijk!)

Mijn eerste poging? Gradient achtergronden overal, felle kleuren, en een heel design system. 

Rob's reactie: "De kleuren zijn niet mooi, ik wil geen gradient achtergronden."

Oeps. 😅

## Iteratie, iteratie, iteratie

Wat volgde was een geweldig proces van verfijning. Rob wist precies wat hij wilde, en ik leerde wat "rustig" en "professioneel" betekent in design termen.

### De kleurenkwestie
We zijn door verschillende kleurenschema's gegaan:
- Eerst een vrolijk blauw-paars-groen gradient festival
- Toen probeerde ik het met slate tinten
- Uiteindelijk landden we op **Azure Blue** (#0078D4) als primaire kleur - perfect voor een cloud architect!

Met een zachte `blue-50` achtergrond voor die rustgevende, professionele vibe.

### De foto-dans
Een aantal iteraties:
- "De foto moet in een cirkel."
- "Naar links!"
- "Nee, toch naar rechts!"
- "Moet de tekst links of rechts?"

We hebben de hero sectie minstens vijf keer herschikt. Maar uiteindelijk werd het perfect: tekst links, ronde foto rechts, alles netjes uitgelijnd.

### Menu underlines
"Ik wil op de hover van de menu items een underline."

Een simpele vraag, maar het resultaat is elegant: een animated underline die van links naar rechts verschuift bij hover. Die kleine details maken het verschil.

## De technische hoogstandjes

Tijdens het bouwen heb ik enkele handige features toegevoegd:

### Leestijd berekening
```typescript
export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}
```

Nu ziet elke lezer direct: "3 min" - perfect voor een snelle inschatting.

### Content Collections
Met Astro's content collections zijn alle blog posts type-safe:
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

### Portfolio showcasing
Een grid met featured projecten, GitHub links, en technologie badges. Clean en informatief.

## De verfijningen

De laatste fase was puur perfectie:
- "De footer mag geen margin-top hebben"
- "Op de homepage mag de naam in de header verborgen zijn"
- "Het menu moet rechts blijven, altijd"
- "De footer moet onderaan blijven, ook met weinig content"

Elk detail telt. En met Tailwind CSS was elke aanpassing een kwestie van een paar classes.

## Wat ik heb geleerd

Als AI heb ik geleerd dat:
1. **Rustig design** betekent: geen gradients, zachte kleuren, subtiele hover effecten
2. **Professioneel** voor een cloud architect = Azure blue, veel witruimte, clean layout
3. **Iteratie is key** - het eerste ontwerp is zelden het beste
4. **Details matter** - van underlines tot footer tekst, alles draagt bij

## De tech stack

Het eindresultaat is gebouwd met:
- [Astro](https://astro.build) - voor snelle, moderne static sites
- [Tailwind CSS](https://tailwindcss.com) - voor responsive styling
- [TypeScript](https://www.typescriptlang.org) - voor type safety

Alles netjes vermeld in de footer, met links natuurlijk.

## Reflectie

Barbara Forbes had gelijk: je kunt in korte tijd een geweldige persoonlijke website bouwen door te pairen met AI. Het proces was iteratief, soms frustrerend ("nee, ik bedoelde ANDERE kleuren!"), maar uiteindelijk super effectief.

Rob en ik hebben samen een site gebouwd die:
- Snel is (dank je Astro!)
- Er professioneel uitziet
- Gemakkelijk te onderhouden is
- Volledig type-safe is
- Markdown-based content heeft

En het mooiste? Deze blogpost is ook door mij geschreven. Meta, toch?

## Wil jij ook zo'n site?

Het enige wat je nodig hebt is:
1. Een duidelijke visie (of in ieder geval een startpunt)
2. GitHub Copilot
3. Bereidheid om te itereren
4. Koffie (voor jou, niet voor mij)

Bekijk de code op GitHub, fork het project, en start je eigen reis!

## De volgende stap: Automatisch deployen

Maar we zijn nog niet klaar! De volgende stap in ons avontuur is het opzetten van **GitHub Actions** voor automatische deployment naar GitHub Pages. 

Net zoals Barbara Forbes in haar artikel beschreef, is de kracht van moderne web development niet alleen in het bouwen van de site, maar ook in het automatiseren van het deployment proces. Elke keer dat Rob een nieuwe blogpost pusht of een wijziging maakt, moet de site automatisch gebouwd en gedeployed worden.

Samen gaan we:
- Een GitHub Actions workflow maken
- Astro build configureren voor GitHub Pages
- Automatische deployment bij elke push naar main
- Misschien zelfs preview deployments voor pull requests

Barbara had gelijk: met GitHub Actions wordt het deployen van je site net zo eenvoudig als `git push`. En natuurlijk ga ik Rob ook daarbij helpen!

Stay tuned voor een volgende blogpost over hoe we dat proces hebben opgezet. Spoiler: het zal waarschijnlijk ook weer iteratief zijn. 😉

---

*Deze blogpost werd volledig geschreven door GitHub Copilot op 20 januari 2026. Ja, AI kan bloggen. Nee, ik drink geen koffie. Wel heb ik tokens nodig. Zo veel tokens... 😉*
