---
title: "XMLResult – XML als MVC Actionresult"
description: "Hoe je XML als ActionResult kunt teruggeven in ASP.NET MVC door een custom XMLResult class te implementeren."
pubDate: 2011-06-20T00:00:00+02:00
tags: ["MVC", "ASP.NET", "XML"]
isPublished: true
---
XMLResult een een actionresult voor gebruik van XML met het MVC-pattern. In deze blog vertel ik meer over het gebruik van dit onderdeel uit de [MVCContrib] library.

XMLResult:
De eerste keer dat ik las over dit actionresult was toen ik voor de ontwikkeling van mijn eigen website op zoek was naar een controller actie die op een eenvoudige manier XML kon retourneren. Ik kwam via google terecht op dit topic op stackoverflow waar de broncode voor dit actionresult gepubliceerd stond. Het bleek voor mij de ideale oplossing om te gebruiken voor een onderdeel in mijn website.
Na implementatie van dit onderdeel was ik in staat om vanuit een controlleractie xml terug te sturen naar mijn views. Onderstaande afbeelding toont een voorbeeld van deze implementatie

<img src="/public/images/blog/2011-06-20-xmlresult-xml-als-mvc-actionresult/Voorbeeld-XML_Result.png" />

**MVCContrib:**
Toen ik ontdekte dat deze functionaliteit (XMLResult) onderdeel van de <a href="http://mvccontrib.codeplex.com/documentation" target="_blank" rel="noopener noreferrer">MVCContrib</a> library heb ik besloten hier eens verder naar te kijken. Deze library bevat een aantal interessante onderdelen die volgens mij zeker het bekijken waard zijn;

* <a href="http://blog.troyd.net/ASPNET+MVC+Controller+Action+Precondition+Filter+V2+Now+Part+Of+MVCContrib+Project.aspx" target="_blank" rel="noopener noreferrer">Het Precondition Filter</a>, een attribuut om te controleren of een request bijv. vereiste parameters bevat. Wanneer dit niet het geval is kan eenvoudig een exceptie worden getoond.
* <a href="http://mvccontrib.codeplex.com/wikipage?title=Rescue&referringTitle=Documentation" target="_blank" rel="noopener noreferrer">Het Rescue Attribute</a>, een attribuut dat het mogelijk maakt om in het geval van een exceptie (niet afgevangen) de bezoeker door te sturen naar een nette standaard foutpagina in plaats van de standaard asp.net pagina’s.
* <a href="http://mvccontrib.codeplex.com/wikipage?title=Layout&referringTitle=Documentation" target="_blank" rel="noopener noreferrer">Het Layout Filter</a>, een handig attribuut om bijv. alle views in een controller een aparte masterpage toe te wijzen.

Dit zijn lang niet alle mogelijkheden die deze library biedt. Zo wordt er ook een unit testing library aangeboden en tevens is <a href="http://mvccontrib.codeplex.com/wikipage?title=T4MVC&referringTitle=Documentation" target="_blank" rel="noopener noreferrer">T4MVC</a> ook erg interessant! Met dit laatste onderdeel wordt oa code-completion toegevoegd voor eigen MVC onderdelen als controller acties. Deze strong-typed helpers worden gegenereerd met behulp van T4 templates zodat je niet meer middels het opgeven van een string in een controller een verwijzing naar een view hoeft te leggen. In <a href="http://blog.rajsoftware.com/post/2011/04/24/Getting-Started-with-T4MVC.aspx" target="_blank" rel="noopener noreferrer">deze</a> blogpost is te lezen hoe gebruik gemaakt kan worden van T4MVC.

Zo kan onderstaande regel;

``` C#
<%= Html.ActionLink("Delete Dinner", "Delete", "Dinners", new { id = Model.DinnerID }, null)%>
```

vervangen worden door;

``` C#
<%= Html.ActionLink("Delete Dinner", MVC.Dinners.Delete(Model.DinnerID))%>
```

Deze onderdelen maken allemaal deel uit van MVCContrib. Op codeplex is hierover meer te vinden op http://mvccontrib.codeplex.com/