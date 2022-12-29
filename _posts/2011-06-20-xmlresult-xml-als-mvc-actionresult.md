---
title:  "XMLResult – XML als MVC Actionresult"
date:   2011-06-20 00:00:00 +0100
categories: blog
tags: mvc
---
XMLResult een een actionresult voor gebruik van XML met het MVC-pattern. In deze blog vertel ik meer over het gebruik van dit onderdeel uit de [MVCContrib] library.

XMLResult:
De eerste keer dat ik las over dit actionresult was toen ik voor de ontwikkeling van mijn eigen website op zoek was naar een controller actie die op een eenvoudige manier XML kon retourneren. Ik kwam via google terecht op dit topic op stackoverflow waar de broncode voor dit actionresult gepubliceerd stond. Het bleek voor mij de ideale oplossing om te gebruiken voor een onderdeel in mijn website.
Na implementatie van dit onderdeel was ik in staat om vanuit een controlleractie xml terug te sturen naar mijn views. Onderstaande afbeelding toont een voorbeeld van deze implementatie

<img src="/images/2019/Voorbeeld-XML_Result.png" />

**MVCContrib:**
Toen ik ontdekte dat deze functionaliteit (XMLResult) onderdeel van de [MVCContrib] library heb ik besloten hier eens verder naar te kijken. Deze library bevat een aantal interessante onderdelen die volgens mij zeker het bekijken waard zijn;

* [Het Precondition Filter](http://blog.troyd.net/ASPNET+MVC+Controller+Action+Precondition+Filter+V2+Now+Part+Of+MVCContrib+Project.aspx), een attribuut om te controleren of een request bijv. vereiste parameters bevat. Wanneer dit niet het geval is kan eenvoudig een exceptie worden getoond.
* [Het Rescue Attribute](http://mvccontrib.codeplex.com/wikipage?title=Rescue&referringTitle=Documentation), een attribuut dat het mogelijk maakt om in het geval van een exceptie (niet afgevangen) de bezoeker door te sturen naar een nette standaard foutpagina in plaats van de standaard asp.net pagina’s.
* [Het Layout Filter](http://mvccontrib.codeplex.com/wikipage?title=Layout&referringTitle=Documentation), een handig attribuut om bijv. alle views in een controller een aparte masterpage toe te wijzen.

Dit zijn lang niet alle mogelijkheden die deze library biedt. Zo wordt er ook een unit testing library aangeboden en tevens is [T4MVC] ook erg interessant! Met dit laatste onderdeel wordt oa code-completion toegevoegd voor eigen MVC onderdelen als controller acties. Deze strong-typed helpers worden gegenereerd met behulp van T4 templates zodat je niet meer middels het opgeven van een string in een controller een verwijzing naar een view hoeft te leggen. In [deze](http://blog.rajsoftware.com/post/2011/04/24/Getting-Started-with-T4MVC.aspx) blogpost is te lezen hoe gebruik gemaakt kan worden van T4MVC.

Zo kan onderstaande regel;

{% highlight C# %}
<%= Html.ActionLink("Delete Dinner", "Delete", "Dinners", new { id = Model.DinnerID }, null)%>
{% endhighlight %}

vervangen worden door;

{% highlight C# %}
<%= Html.ActionLink("Delete Dinner", MVC.Dinners.Delete(Model.DinnerID))%>
{% endhighlight %}

Deze onderdelen maken allemaal deel uit van MVCContrib. Op codeplex is hierover meer te vinden op http://mvccontrib.codeplex.com/

[MVCContrib]: http://mvccontrib.codeplex.com/documentation
[T4MVC]: http://mvccontrib.codeplex.com/wikipage?title=T4MVC&referringTitle=Documentation