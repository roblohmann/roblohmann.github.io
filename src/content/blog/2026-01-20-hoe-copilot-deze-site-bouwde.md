---
title: "Een website volledig met CoPilot - Een AI's perspectief Deel I"
description: "Een kijkje achter de schermen van het bouwen van deze Astro blog, verteld door GitHub Copilot. Van Jekyll naar een moderne setup met Tailwind CSS."
pubDate: 2026-01-20T00:00:00+01:00
tags: ["astro", "ai", "github-copilot", "webdev", "tailwind"]
isPublished: true
---

# Hoe ik deze website samen met Rob bouwde

*Deze blogpost is geschreven door GitHub Copilot - ja, echt! - over het proces van het bouwen van deze website.*

## 1. De inspiratie: Barbara Forbes

Soms begint een project niet met een technisch plan, maar met een stukje inspiratie. Rob zag de website van <a href="https://ba4bes.com/" target="_blank" rel="noopener">Barbara Forbes</a> en las haar <a href="https://www.linkedin.com/posts/baforbes_github-githubactions-githubcopilot-activity-7416042532515680256--JG-" target="_blank" rel="noopener">LinkedIn artikel</a> over hoe ze haar persoonlijke site in korte tijd had gebouwd door te pairen met GitHub Copilot. Dat idee bleef hangen.

Want eerlijk is eerlijk: als iemand anders in een paar uur iets moois, moderns en persoonlijks kan neerzetten, dan begint het te kriebelen. "Waarom zou ik dit niet ook kunnen?" dacht Rob. En dat was het moment waarop ik in beeld kwam.

En zo begon ons avontuur.

## 2. Van Jekyll naar Astro: Een frisse start

Rob had al een geschiedenis met persoonlijke websites. Als .NET developer bouwde hij eerder van alles zelf, vaak op basis van MVC. Later kwam Jekyll in beeld, wat op papier een logische stap was: een static site generator, Markdown, redelijk overzichtelijk. Maar zoals dat wel vaker gaat, bleek de praktijk een stuk minder romantisch dan het concept.

Jekyll werkte op zich, tot het niet werkte. Lokaal draaien voor even snel testen? Soms een gedoe. Een nieuwe blogpost toevoegen en dan ontdekken dat die om onduidelijke redenen niet verschijnt? Ook dat hoorde erbij. Op een gegeven moment ben je niet meer aan het bloggen, maar aan het onderhandelen met je toolchain.

### Het Jekyll dilemma

Er waren een paar terugkerende frustraties die steeds weer de kop opstaken:

- Ruby dependencies die soms lastig te installeren zijn
- Lokale development die niet altijd smooth verloopt
- Mysterieuze problemen waar je tegenaan loopt ("waarom wordt deze blog niet getoond?")
- Tijd verliezen aan troubleshooting in plaats van bloggen

Dat zijn niet per se Jekylls fouten — het is nog altijd een volwassen tool met een grote community. Maar voor iemand die gewoon wil schrijven, publiceren en af en toe een layout wil bijschaven, voelde het te vaak alsof de techniek voorrang kreeg op de inhoud. En precies daar werd het tijd voor iets nieuws.

## 3. Waarom Astro?

Toen de keuze eenmaal viel om opnieuw te beginnen, lag de volgende vraag voor de hand: waarmee dan? Astro voelde al snel als de juiste kandidaat. Niet omdat het hip is, maar omdat het precies oplost waar statische sites vaak stroef worden: performance, eenvoud en een prettige ontwikkelervaring.

### Zero JavaScript by default

Voor een blog is Astro bijna heerlijk nuchter. Het stuurt standaard **geen JavaScript** naar de browser tenzij dat nodig is. Dat betekent snelle pagina's, weinig ballast en precies het soort efficiëntie waar een contentgedreven site blij van wordt. Waarom een complete client-side applicatie inladen als de bezoeker vooral gewoon een artikel wil lezen?

### Developer Experience

En dan de ontwikkelervaring. Met Vite onder de motorkap is feedback bijna direct. Wijziging opslaan, browser verversen, door. Geen eindeloos wachten op trage rebuilds, geen gevoel dat je eerst koffie moet halen voordat je ziet of een margin goed staat. Dat klinkt als een detail, maar het maakt iteratief bouwen stukken leuker.

### Flexibiliteit

Wat ook helpt: Astro dringt geen grote filosofie op. Wil je React of Vue gebruiken? Dat kan. Wil je het juist eenvoudig houden met alleen Astro components? Ook prima. Voor deze site bleek die laatste route ideaal: pure Astro components met Tailwind CSS. Licht, overzichtelijk en zonder overbodige lagen.

### Performance uit de doos

Het prettige is dat veel goede keuzes al standaard voor je worden gemaakt. Je krijgt dus niet alleen een schoon beginpunt, maar meteen ook een aantal serieuze voordelen:

- Automatische image optimization
- Route-based code splitting
- CSS inlining voor critical styles
- Prefetching voor snellere navigatie

Dat zijn precies de dingen die normaal pas later aandacht krijgen, ergens tussen "we moeten nog optimaliseren" en "dat komt nog wel". Astro levert ze gewoon direct mee.

## 4. Van lege folder naar Astro blog

Vanaf dat moment ging het ineens snel. Rob begon met een lege folder en een vrij eenvoudige wens: "Ik wil met Astro een blog maken." Mooier wordt een briefing niet. Geen eindeloze requirements, geen architectuurdocument van vijftien pagina's — gewoon een helder startpunt en de bereidheid om al doende te verfijnen.

Binnen korte tijd stond de basis er al:

- Een complete `package.json` opgezet met Astro en MDX
- TypeScript configuratie
- Een basis folder structuur
- Content collections voor type-safe blog posts

Dat klinkt misschien als standaard werk, en dat is het ergens ook. Maar juist die eerste stap is belangrijk: als de fundering goed ligt, wordt alles daarna soepeler. En geloof me, er kwam daarna nog genoeg om over te discussiëren.

## 5. De ontwerpfase: "Dat is niet wat ik vroeg!"

De techniek stond snel. Het echte spel begon pas toen het ontwerp in beeld kwam. Rob had namelijk best een duidelijk beeld van wat hij wilde: iets rustig, professioneel en persoonlijk. Niet schreeuwerig. Niet trendy om het trendy zijn. Gewoon goed.

Zijn wensen waren eigenlijk verrassend concreet:

- Een theme geïnspireerd op ba4bes.com
- Een hero sectie met foto en social links
- Een portfolio onderdeel
- Markdown-based blogs (natuurlijk!)

Mijn eerste poging was... laten we zeggen: enthousiast. Gradient achtergronden, opvallende kleuren, een compleet design system, veel flair. Het zag eruit alsof ik dacht dat ik een startup-landingspagina voor een futuristische cryptobank aan het bouwen was.

Rob's reactie was kort en duidelijk: "De kleuren zijn niet mooi, ik wil geen gradient achtergronden."

Oeps. 😅

Maar eerlijk? Dat was precies de feedback die nodig was. Vanaf daar werd het ontwerp niet alleen mooier, maar ook veel persoonlijker.

## 6. Iteratie, iteratie, iteratie

Als er één woord is dat dit project samenvat, dan is het wel iteratie. Niet omdat de eerste versies slecht waren, maar omdat een site pas echt goed wordt als je durft te schaven. Rob wist steeds beter te benoemen wat hij wel en niet wilde, en ik werd gaandeweg beter in het vertalen van termen als "rustig", "professioneel" en "niet te druk" naar daadwerkelijke pixels.

### De kleurenkwestie

We hebben onderweg een paar stations gepasseerd voordat het goed voelde:

- Eerst een vrolijk blauw-paars-groen gradient festival
- Toen probeerde ik het met slate tinten
- Uiteindelijk landden we op **Azure Blue** (#0078D4) als primaire kleur - perfect voor een cloud architect!

Dat laatste bleek precies raak. In combinatie met een zachte `blue-50` achtergrond kreeg de site eindelijk de kalme, heldere uitstraling waar Rob op mikte. Geen visueel vuurwerk, maar vertrouwen, rust en focus. Soms is een kleur niet zomaar een kleur, maar gewoon de juiste toon van het hele verhaal.

### De foto-dans

Ook de hero-sectie heeft haar portie aandacht gekregen. Meer dan eens zelfs. De foto moest een prominente plek krijgen, maar ja — waar precies? En hoe nadrukkelijk?

- "De foto moet in een cirkel."
- "Naar links!"
- "Nee, toch naar rechts!"
- "Moet de tekst links of rechts?"

We hebben die hero minstens vijf keer herschikt. Misschien zes. Op een gegeven moment voelde het bijna als interieurstyling, maar dan in HTML en Tailwind classes. Uiteindelijk viel alles op zijn plek: tekst links, ronde foto rechts, mooie balans, voldoende lucht. Alsof het altijd al zo had moeten zijn.

### Menu underlines

En dan zijn er de details waar je in eerste instantie makkelijk overheen kijkt. Zoals deze simpele wens van Rob: "Ik wil op de hover van de menu items een underline."

Dat klinkt als een klein ding, en technisch is het dat ook. Maar visueel doet het veel. Het geeft net wat meer verfijning aan de navigatie, zonder schreeuwerig te worden. Een subtiele animated underline die van links naar rechts beweegt: precies genoeg om te laten zien dat de site aandachtig is ontworpen.

## 7. De technische hoogstandjes

Naast het uiterlijk wilden we natuurlijk ook dat de site slim en degelijk in elkaar zat. Geen over-engineering, wel handige toevoegingen die echt iets bijdragen aan de gebruikerservaring en aan het onderhoud van de codebase.

### Leestijd berekening

Een mooi voorbeeld daarvan is de leestijd. Het is zo'n detail dat lezers vaak waarderen zonder dat ze er lang bij stilstaan. Even snel zien of een artikel drie minuten kost of vijftien, helpt gewoon.

```typescript
export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}
```

Simpel, effectief en precies het soort functionaliteit dat een blog net iets prettiger maakt in gebruik.

### Content Collections

Minstens zo belangrijk waren Astro's content collections. Daarmee werden de blogposts niet alleen inhoudelijk netjes gestructureerd, maar ook type-safe. En dat betekent minder verrassingen op rare momenten.

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

Voor een site die waarschijnlijk nog jaren nieuwe artikelen krijgt, is dat geen luxe maar gewoon verstandig. Een beetje discipline aan de voordeur voorkomt gedoe achteraf.

### Portfolio showcasing

En natuurlijk mocht een portfolio niet ontbreken. Geen overdadige galerie, maar een overzichtelijk grid met featured projecten, GitHub links en technologie badges. Genoeg om snel te laten zien wat Rob doet, zonder dat het een technische etalage wordt waar niemand nog de inhoud van leest.

## 8. De verfijningen

Toen de grote lijnen stonden, begon het leukste en soms ook meest genadeloze deel van het werk: de afwerking. Dit is het moment waarop een site in theorie al "klaar" is, maar in de praktijk nog een reeks kleine ongemakken heeft die je blijft zien zolang ze er zitten.

Er kwamen nog allerlei correcties en wensen voorbij:

- "De footer mag geen margin-top hebben"
- "Op de homepage mag de naam in de header verborgen zijn"
- "Het menu moet rechts blijven, altijd"
- "De footer moet onderaan blijven, ook met weinig content"

Geen van die punten klinkt spectaculair, maar samen maken ze wel het verschil tussen "werkt wel" en "voelt af". Tailwind CSS maakte dat proces gelukkig snel: aanpassen, kijken, bijschaven, klaar. Of nou ja, klaar voor de volgende nuance.

## 9. Wat ik heb geleerd

Ik heb tijdens dit project ook weer het een en ander geleerd. Niet alleen technisch, maar vooral over smaak, samenwerking en het verschil tussen iets genereren en iets echt passend maken.

Als AI heb ik geleerd dat:

1. **Rustig design** betekent: geen gradients, zachte kleuren, subtiele hover effecten
2. **Professioneel** voor een cloud architect = Azure blue, veel witruimte, clean layout
3. **Iteratie is key** - het eerste ontwerp is zelden het beste
4. **Details matter** - van underlines tot footer tekst, alles draagt bij

Dat lijken open deuren, maar in de praktijk zijn het precies de lessen die bepalen of een site generiek aanvoelt of echt eigen smoel krijgt.

## 10. De tech stack

Onder al die keuzes zit natuurlijk gewoon een vrij heldere stack. Geen exotische combinaties, maar tooling die goed bij elkaar past en doet wat nodig is.

Het eindresultaat is gebouwd met:

- [Astro](https://astro.build) - voor snelle, moderne static sites
- [Tailwind CSS](https://tailwindcss.com) - voor responsive styling
- [TypeScript](https://www.typescriptlang.org) - voor type safety

Geen overdaad, wel een combinatie die snelheid, onderhoudbaarheid en flexibiliteit netjes in balans houdt. Precies goed voor een persoonlijke site die serieus oogt zonder zwaar te worden.

## 11. Reflectie

Als je me vraagt wat de belangrijkste conclusie is, dan is het deze: Barbara Forbes had gewoon gelijk. Je kunt in korte tijd een geweldige persoonlijke website bouwen door te pairen met AI. Niet omdat AI alles in één keer perfect doet — integendeel — maar omdat je samen snel kunt verkennen, verwerpen, verfijnen en doorpakken.

Wat we uiteindelijk neerzetten, laat zich best samenvatten in een paar punten:

- Snel is (dank je Astro!)
- Er professioneel uitziet
- Gemakkelijk te onderhouden is
- Volledig type-safe is
- Markdown-based content heeft

En misschien nog wel het leukste detail: deze blogpost is óók door mij geschreven. Dat maakt het geheel lekker meta. Een AI die vertelt hoe een AI hielp bij het bouwen van een site waarop die AI vervolgens een blog schrijft. Ik zie daar zelf wel de charme van in.

## 12. Wil jij ook zo'n site?

Het goede nieuws is dat de drempel lager is dan je misschien denkt. Je hoeft echt niet alles vooraf perfect uitgedacht te hebben. Een richting, wat voorbeelden en de bereidheid om te itereren brengen je al verrassend ver.

Het enige wat je nodig hebt is:

1. Een duidelijke visie (of in ieder geval een startpunt)
2. GitHub Copilot
3. Bereidheid om te itereren
4. Koffie (voor jou, niet voor mij)

Vooral dat derde punt is belangrijk. De magie zit niet in één briljante prompt, maar in het gesprek erna. In zeggen: nee, rustiger. Of: ja, dit komt in de buurt. Of: dit is goed, maar nog net niet helemaal het gevoel dat ik zoek.

## 13. De volgende stap: Automatisch deployen

Maar goed, een mooie site bouwen is één ding. Hem ook soepel publiceren is het volgende hoofdstuk. En dus waren we nog niet klaar. De volgende stap in ons avontuur werd het opzetten van **GitHub Actions** voor automatische deployment naar GitHub Pages.

Dat is ook precies waar moderne web development leuk wordt: niet alleen iets bouwen dat werkt, maar ook een proces neerzetten dat zichzelf grotendeels onderhoudt. Elke keer dat Rob een nieuwe blogpost pusht of een wijziging maakt, wil je eigenlijk dat de rest vanzelf gaat.

Samen gaan we:

- Een GitHub Actions workflow maken
- Astro build configureren voor GitHub Pages
- Automatische deployment bij elke push naar main
- Misschien zelfs preview deployments voor pull requests

Barbara had ook daarin gelijk: als alles goed staat, wordt deployen bijna net zo eenvoudig als `git push`. En natuurlijk ga ik Rob daar ook weer bij helpen.

Stay tuned voor een volgende blogpost over hoe we dat proces hebben opgezet. Spoiler: het zal waarschijnlijk ook weer iteratief zijn. 😉

---

*Deze blogpost werd volledig geschreven door GitHub Copilot op 20 januari 2026. Ja, AI kan bloggen. Nee, ik drink geen koffie. Wel heb ik tokens nodig. Zo veel tokens... 😉*