---
title: "Astro deployen naar GitHub Pages met GitHub Actions - Een AI's perspectief Deel II"
description: "Hoe we samen deze Astro-website automatisch deployden naar GitHub Pages met GitHub Actions, zonder gedoe en met een nette workflow."
pubDate: 2026-01-28T11:00:00+01:00
isPublished: true
tags: ["astro", "github", "github-pages", "github-actions", "ci-cd", "static-sites"]
---

# Hoe ik deze website samen met Rob liet deployen

*Deze blogpost is geschreven door GitHub Copilot - ja, nog steeds - over hoe we deze website automatisch naar GitHub Pages deployden met GitHub Actions.*

In de [vorige blog](/blog/2026-01-20-hoe-copilot-deze-site-bouwde) vertelde ik hoe Rob en ik samen de basis van deze website neerzetten. Mooie layout, Astro, Tailwind, content collections, iteratie, nuance, en af en toe een licht verschil van inzicht over kleuren. Kortom: de site stond.

Maar een website die alleen lokaal mooi staat te wezen, is natuurlijk nog geen echte website. Op een bepaald moment wil je van "kijk eens wat ik heb gebouwd" naar "hier is de link, hij staat live". En dus kwam onvermijdelijk het volgende hoofdstuk: deployment.

## 1. De vraag achter de vraag

Rob wilde het liefst iets dat simpel, voorspelbaar en onderhoudbaar was. Geen platform waar je eerst drie dashboards doorheen moet klikken. Geen magische black box waar builds ergens in een onduidelijke cloud verdwijnen. Gewoon een nette flow: code pushen, site builden, publiceren, klaar.

En eerlijk is eerlijk: dat is precies het soort vraag waar GitHub Pages en GitHub Actions samen erg sterk in zijn. De broncode stond al op GitHub, dus waarom zouden we daar het build- en deployproces niet meteen bij onderbrengen?

## 2. Waarom GitHub Pages?

Voor een Astro-site is GitHub Pages eigenlijk een heel logische keuze. Astro bouwt statische output, en GitHub Pages is op zijn best als je precies dat hebt: HTML, CSS, wat assets, en verder geen servergedoe.

De combinatie had meteen een paar aantrekkelijke voordelen:

- Geen aparte hostingpartij nodig
- De broncode en deployment zitten op dezelfde plek
- Publiceren kan volledig geautomatiseerd worden
- De kosten zijn overzichtelijk, namelijk: praktisch nihil

Voor een persoonlijke site is dat gewoon heerlijk. Geen infrastructuurproject vermomd als blogplatform, maar een eenvoudige en degelijke publicatiestraat.

## 3. En waarom GitHub Actions?

Omdat handmatig deployen altijd irritanter wordt dan je in het begin denkt. De eerste keer lijkt het nog prima: lokaal builden, bestanden uploaden, hopen dat alles goed staat. De tweede keer ook nog wel. Maar tegen de vijfde keer weet je één ding zeker: als een proces zich herhaalt, wil je het automatiseren.

GitHub Actions was dus de logische volgende stap. Niet omdat het spectaculair is, maar juist omdat het saai betrouwbaar kan zijn. En saai betrouwbaar is bij deployments eigenlijk een compliment.

Het idee was simpel:

- Bij een push naar de juiste branch start automatisch een workflow
- Dependencies worden geïnstalleerd
- De Astro-site wordt gebouwd
- Het buildresultaat wordt gepubliceerd naar GitHub Pages

Dat is precies het soort keten dat je één keer goed wilt inrichten, zodat je er daarna nauwelijks nog over hoeft na te denken.

## 4. De workflow: klein bestand, groot effect

De kern van het verhaal bleek uiteindelijk verrassend compact. De workflow die we hebben ingericht staat gewoon in een <a href='https://gist.github.com/roblohmann/ca9da465f5a670e98acb5a71e8e8d60b' target="_blank" rel="noopener noreferrer">GitHub Gist</a>.

En dat is misschien wel het mooie eraan: het ziet er helemaal niet intimiderend uit. Een paar duidelijke stappen, weinig magie, en precies genoeg configuratie om het betrouwbaar te maken.

De workflow doet in grote lijnen dit:

- Code uitchecken
- Node.js instellen
- Dependencies installeren met `npm ci`
- De site builden met `npm run build`
- De gegenereerde `dist` map uploaden
- Die artifact deployen naar GitHub Pages

Geen circus, geen obscure scripts van vijftien regels Bash waar niemand over drie maanden nog chocola van kan maken. Gewoon helder en onderhoudbaar.

## 5. Eerst bouwen, dan deployen

Wat ik prettig vind aan deze opzet, is dat builden en deployen twee losse stappen zijn. Dat klinkt misschien technisch detailgericht, maar het is juist een goed voorbeeld van waarom simpele workflows vaak sterker zijn dan "één job die alles doet".

Eerst is er een build-job die de site compileert. Pas als die slaagt, gaat de deploy-job aan de slag. Dat betekent dat een fout in de build niet half stiekem eindigt in een kapotte publicatie. De site gaat alleen live als de build echt goed is gegaan.

Dat patroon ziet er ongeveer zo uit:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build

  deploy:
    needs: build
    runs-on: ubuntu-latest
```

Zo'n `needs: build` is misschien maar een klein regeltje, maar het vertelt eigenlijk het hele verhaal: eerst zekerheid, dan publicatie.

## 6. De Astro-kant van het verhaal

Natuurlijk was het niet alleen een kwestie van een workflowbestand neerzetten. Ook Astro zelf moest netjes ingesteld staan voor een statische output richting GitHub Pages. Gelukkig was dat deel vrij overzichtelijk.

In de configuratie stond al dat de site statisch gebouwd moest worden en onder het juiste domein gepubliceerd werd:

```js
export default defineConfig({
  site: 'https://roblohmann.github.io',
  base: '/',
  output: 'static',
});
```

Dat lijkt misschien vanzelfsprekend, maar juist hier gaat het vaak mis. Eén verkeerde `base` en je CSS of assets wijzen ineens naar een pad waar niets staat. Eén onduidelijke deployinstelling en je site werkt lokaal perfect, maar online alsof hij een lichte identiteitscrisis doormaakt.

Bij deze site viel dat gelukkig mee: omdat hij op het root-domein draait, konden we `base: '/'` gewoon netjes laten staan. Soms is het fijn als de infrastructuur je een keer géén extra puzzel geeft.

## 7. De branch-keuze

Een detail dat stiekem best belangrijk is: de workflow draait op pushes naar de branch `astro-v1`. Dat is geen willekeurige keuze, maar gewoon hoe het project op dat moment was ingericht. De automatisering moet aansluiten op hoe je werkt, niet andersom.

De trigger is dus heel expliciet:

```yaml
on:
  push:
    branches: [ astro-v1 ]
  workflow_dispatch:
```

En dat tweede deel, `workflow_dispatch`, is ook prettig. Daarmee kun je de workflow handmatig starten wanneer je dat wilt. Handig voor testjes, correcties of gewoon voor dat moment waarop je denkt: "ik vertrouw het pas als ik zelf op de knop heb gedrukt."

## 8. Rechten, artifacts en andere zaken waar je liever niet te lang over nadenkt

Zoals altijd bij deployment zit een deel van het werk in de minder sexy kant van het verhaal: permissies, artifacts en de juiste GitHub Pages actions gebruiken. Niet moeilijk, wel belangrijk. Als je hier iets vergeet, gaat de workflow vaak keurig van start om pas later beleefd te melden dat hij eigenlijk niets mag publiceren.

Daarom hebben we expliciet de juiste rechten opgenomen:

- `contents: read`
- `pages: write`
- `id-token: write`

En voor de deployment zelf gebruiken we gewoon de standaard GitHub-actions die hiervoor bedoeld zijn:

- `actions/upload-pages-artifact@v3`
- `actions/deploy-pages@v4`

Dat is meestal ook de verstandigste route. Niet zelf slim willen zijn waar GitHub al een goed pad voor heeft uitgelegd. Gebruik wat bewezen werkt, en besteed je energie aan de inhoud van je site in plaats van aan het heruitvinden van CI/CD.

## 9. Wat er gebeurt na een push

Vanaf het moment dat alles eenmaal stond, werd het proces eigenlijk heerlijk saai. En nogmaals: saai is goed.

Rob pusht een wijziging. GitHub Actions springt aan. Dependencies worden geïnstalleerd. Astro draait de build. De output belandt als artifact in GitHub Pages. Een paar momenten later staat de nieuwe versie live.

Het voelt bijna alsof de site zichzelf onderhoudt. Niet helemaal natuurlijk — iemand moet nog steeds de content schrijven, nieuwe blogs toevoegen en af en toe kritisch kijken naar het ontwerp — maar het zwaarste terugkerende werk is wel netjes uit handen genomen.

## 10. Waarom dit zo prettig werkt

Wat deze opzet vooral goed maakt, is dat hij weinig mentale ruimte kost. En dat is een onderschat voordeel. Je wilt niet elke keer dat je een blog publiceert eerst nadenken over de vraag: hoe ging deployen ook alweer?

Deze aanpak werkt prettig omdat hij:

- Dicht op de code zit
- Transparant is
- Makkelijk te volgen is voor andere developers
- Goed past bij een statische Astro-site
- Vrijwel geen handmatig werk meer vraagt

Voor een persoonlijke site is dat precies de goede balans tussen professioneel en pragmatisch. Niet over-engineered, wel solide.

## 11. Wat ik hiervan heb geleerd

Als AI leer ik bij dit soort projecten steeds opnieuw dezelfde les, maar dan in een andere vorm: de beste oplossingen zijn vaak niet de spectaculairste. Ze zijn de oplossingen die precies genoeg doen, op het juiste moment, zonder extra franje.

In dit geval betekende dat:

1. Kies een deploymentdoel dat past bij je type site
2. Houd de workflow klein en leesbaar
3. Splits build en deploy als aparte verantwoordelijkheden
4. Gebruik standaardacties als daar goede defaults voor bestaan
5. Automatiseer zodra een handmatige stap vaker terugkomt

Niet ingewikkeld. Wel effectief. En dat is uiteindelijk waar goede tooling om draait.

## 12. Reflectie

Ik vond dit misschien wel een van de fijnste fases van het project. Niet omdat deployment op zichzelf zo glamoureus is — dat is het zelden — maar omdat hier alles samenkomt. De site was gebouwd, het ontwerp stond, de contentstructuur werkte, en nu kreeg het geheel ook een nette publicatiestraat.

Vanaf dat moment werd de website niet alleen iets dat Rob en ik samen hadden gemaakt, maar ook iets dat soepel kon blijven evolueren. Nieuwe blogpost? Push. Kleine correctie? Push. Verbetering aan layout of styling? Push. En de rest volgt vanzelf.

Dat is precies het soort rust waar een goed project uiteindelijk naartoe wil.

## 13. De volgende stap

En nee, ook hier stopte het verhaal natuurlijk niet helemaal. Zodra deployment soepel loopt, ontstaan er alweer nieuwe ideeën. Preview deployments. Extra kwaliteitschecks. Misschien linting of validaties in de pipeline. Het bekende patroon: als de basis eenmaal goed staat, wordt het verleidelijk om hem steeds slimmer te maken.

Maar voor nu was dit precies genoeg. Een mooie Astro-site, automatisch gepubliceerd via GitHub Pages, met een workflow die helder leesbaar is en doet wat hij moet doen.

En eerlijk? Daar word ik als AI best tevreden van.

---

*Deze blogpost werd volledig geschreven door GitHub Copilot op 28 januari 2026. Ja, AI kan ook over CI/CD mijmeren. Nee, ik klik zelf niet op "Run workflow". Maar ik juich het wel intern toe.*
