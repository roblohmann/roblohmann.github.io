---
title:  "MVC3, wat zijn mijn ervaringen tot nu toe?"
date:   2011-04-30 00:00:00 +0100
categories: blog
tags: mvc
redirect_from:
 - /2011/04/mvc3-wat-zijn-mijn-ervaringen-tot-nu-toe/
---
MVC3 is in januari 2011 door Microsoft vrijgegeven. Ik heb de release op de voet gevolgd en ben mij er steeds meer in gaan verdiepen. In deze blog vertel ik over mijn ervaringen met MVC3 en wat mij is opgevallen tijdens het werken ermee.

*Razor Views:*
Een van de opvallendste wijzigingen met de komst van MVC3 en de Razor View Engine vondt ik toch wel de syntax zoals die nu toegepast moet worden in de views. De oude syntax, zoals in de onderstaande afbeelding is te zien is voor mij bekend omdat ik er al een behoorlijke tijd mee werk. Deze vondt echter niet altijd even netjes, het kwam wel eens voor dat ik in een view een stuk code moest schrijven om bijv. dynamisch een css-klasse te bepalen die aan een list-item zou worden toegekend. Dit leverde vaak rommelige en overzichtelijke code op in mijn views.

<img src="/images/2019/mvc2-oude-syntax.png" />

Met de nieuwe syntax, zoals deze in de afbeelding hieronder is te zien, werd de code in de views meteen een heel stuk overzichtelijker en daarmee ook leesbaarder voor mij als ontwikkelaar. De nieuwe Razor View Engine is dusdanig intelligent gemaakt door Microsoft dat hij zelf ziet of de text die volgt na het @ als uitvoerbare code gebruikt moet worden of niet.

<img src="/images/2019/mvc3-nieuwe-syntax.png" />

*Output caching:*
Al langere tijd is output caching mogelijk in MVC. Met de komst van MVC3 kan dit nu ook op pagina niveau worden toegepast door het plaatsen van een enkel attribuut. Onderstaand voorbeeld laat zien hoe alle requests naar de actie Browse gecached zullen worden voor de duur van 6000 seconden, overeenkomstig met 100 minuten. Deze waarde, genoteerd in seconden, heb ik ook op enkele plaatsen binnen mijn site toegepast. Ik ben hier erg over te spreken. Pagina’s die niet vaak wijzigen kunnen globaal, bijv. in de global.asax gecached worden voor een periode van bijv. 1 week. Pagina’s zoals nieuwsoverzichten en blogs kunnen middels dit attribuut een caching krijgen van bijv. 15min.

<img src="/images/2019/output-cache.png" />

*Clientside Validatie:*
De implementatie van client-side validatie is ook vereenvoudigd. Door de toepassing van attributen als het required attribuut op een eigenschap in je viewmodel kun je al aangeven of deze eigenschappen verplicht zijn. Onderstaande afbeelding illustreert dit.

<img src="/images/2019/required-attribuut-en-validatie.png" />

Vervolgens kan eenvouding in de view die gebruik maakt van dit model aangegegven worden of er een validatiebericht getoond moet worden wanneer dit veld geen of een onjuiste waarde bevat. Door het opnemen van twee enkele kleine regels in de web.config van de webapplicatie werkt vervolgens de client-side validatie. Eenvoudiger kan het niet. Een grote verbetering ten opzichte van mvc2 op webforms applicaties waar ik wel eens aan gewerkt hebt. Hier moest veel handmatig gedaan worden door het schrijven van javascriptcode of toevoegen van javascript libraries.

*NuGet Package Manager:*
NuGet is een andere hele interressante toevoeging aan MVC3. Het is er niet zozeer een onderdeel van, maar wel een hele handige tool om libraries van derden eenvoudig toe te kunnen voegen aan je project. Met de hand is dit een kwestie van dll’s kopieëren en de juiste referenties leggen en in veel gevallen moet voor het gebruik ervan ook nog eens in een web.config bestand vastgelegd worden om de library goed te kunnen configureren.
Met het gebruik van deze Package Manager wordt dit allemaal voor je gedaan, ideaal zou je denken toch? Dat is het zeker! Meer informatie vindt je ook in deze blog waarin de mogelijkheden worden toegelicht.

Tot zover deze blog over mijn ervaringen met MVC3, ik ben er zeker over te spreken. Je ziet dat ook Microsoft hard aan het werk is om het werk voor de ontwikkelaar makkelijker te maken en de code overzichtelijker en eenvoudigder.
Tot slot hieronder nog een aantal interressante blogs waarvan ik vind dat jullie die zeker moeten lezen en moeten blijven volgen, beide blogs komen regelmatig met interressante artikelen over MVC en andere ASP.NET onderdelen.

Reacties naar aanleiding van deze blog? Laat het weten!

[Blog van Phil Haacked]. Phil Haacked werkt bij Microsoft mee aan de ontwikkelingen ASP.NET en MVC.
[Blog van Scott Guthrie]. Scott Guthrie is Vice President van de MS Developer Division.

[Blog van Phil Haacked]: http://www.haacked.com/
[Blog van Scott Guthrie]: https://weblogs.asp.net/scottgu