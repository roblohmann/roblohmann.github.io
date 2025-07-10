---
title:  "XMLResult – XML als MVC Actionresult"
date:   2011-06-20 00:00:00 +0100
published: true
categories: blog
tags: .net
---
Veel ontwikkelaars en software architecten hebben zo hun een eigen ideeën over software- en webontwikkeling. Zo heb ik ze ook. Wel of geen commentaar in code? En variabelen? Moeten ze implicitly typed of explicitly typed? Iedereen heeft zijn mening over de manier van coderen. Maar een ding kan ik vooraf al wel zeggen, zolang het binnen de organisatie maar consistent is en iedereen zich eraan houdt voorkomt dit al veel onnodige discussies en problemen wanneer je in andersmans code moet werken.

* Zelf ben ik altijd gewend om mijn variabelen implicitly typed te declareren. Met andere woorden, het type wordt compile time bepaald door de waarde die je erin stopt. Onderstaand voorbeeld geeft hier verduidelijking over.

{% highlight C# %}
// i compiled als een integer
var i = 5;

// s compiled als een string
var s = "Hello";
{% endhighlight %}

Dit zijn twee mogelijkheden waarvan ik zelf altijd de eerste gebruik, de implicitly typed. Maar wat is eigenlijk het verschil? En wat is een veiligere manier van coderen? En maakt het qua performance nog veel verschil? Zelf heb ik qua performance nooit problemen gehad, maar misschien hebben jullie daar andere ervaringen mee. Daarbij brengt het gebruik van implicitly typed wel de nodige risico’s met zich mee. Het kan bijvoorbeeld zijn dat een variabele (var x) het resultaat van een functie bevat. Nu zie je hieraan niet altijd even duidelijk wat het resultaat van een functie is. Dit kan een string zijn maar ook een integere waarde. Beiden zullen hun voor en nadeel hebben en de een is wat leesbaarder dan de ander, maar ben heel benieuwd naar jullie mening hierover! Maakt het verschil en zo ja, waarom?

* Commentaar bij functies is een geweldig hulpmiddel wanneer een ontwikkelaar in een project terechtkomt waar hij bijv. niet vanaf het begin bij betrokken is geweest. Veel code is dan al aanwezig en om te voorkomen dat functies herschreven of verwijderd worden terwijl ze misschien wel een specifieke toepassing hebben, is commentaar bij de functie als je het mij vraagt een minimale vereiste. Helaas valt het me te vaak op dat het niet gedaan wordt door mensen met als gevolg dat het ontwikkelaars onnodig tijd kost. Zie bijvoorbeeld onderstaand voorbeeld waarbij de functie GetSomething() wordt aangeroepen.

{% highlight C# %}
/// <summary>
/// This function returns a list of strings.
/// In case something goes wrong an empty list is returned.
/// </summary>
public List GetSomething()
{
    //..Redacted
}
{% endhighlight %}

Hier is te zien dat de functie commentaar bevat die ontwikkelaars kan helpen bij het toepassen van de functie. Als je het mij vraagt zijn er dan ook zeker twee redenen waarom dit soort commentaar een minimale vereiste is bij het schrijven van code.

1. **Onderhoudbaarheid**
Functies voor zien van dit soort commentaar zijn makkelijker te onderhouden en te begrijpen. Er staat minimaal bij wat de functie doet, wat elke parameter vereist en waarvoor deze gebruikt wordt en informatie over het resultaat is ook altijd welkom. Zelf zie ik dit soort commentaar altijd als een soort managementsamenvatting bij mijn functies. Ik heb regelmatig de “Oh ja!”-momentjes als ik dit commentaar teruglees uit code die eerder is geschreven, zonder verder ook nog maar inhoudelijk naar de functie te hebben gekeken. Als je het mij vraagt voorkomt dit veel problemen en onduidelijkheid wanneer je je eigen oude code tegenkomt of in andermanscode aan het werk moet.
2. **Toepasbaarheid**

* **Error-Handling**
Foutafhandeling is een onderdeel wat nog wel eens vragen oproept. Ik was altijd van mening dat het doorgeven van excepties netter is dan ze “onder water” af te vangen. En in sommige gevallen is dit nog steeds zo, maar ook door reacties van mensen om me heen ben ik me meer en meer af gaan vragen of ze niet teveel performance kostten. Als je het mij vraagt doet het dat en ook al ontkom je er niet altijd aan om de exceptie door te geven van een model naar controller, het zou zoveel mogelijk voorkomen moeten worden. Zie bijvoorbeeld onderstaand stuk code.

{% highlight C# %}
/// <summary>
/// This function returns a list of strings.
/// In case something goes wrong an empty list is returned.
/// </summary>
public List GetSomething()
{
    var listOfString = new List<string>();

    try
    {
        listOfString.Add("123");
    }
    catch (Exception err)
    {
        throw new Exception("An error occured creating my list of strings.", err);
    }

    return listOfString;
}
{% endhighlight %}

De exceptie wordt hier doorgegeven wanneer de functie een fout geeft. Stel dat dit een functie is in een model dan moet je je afvragen of dit altijd wenselijk is. Het zou netter zijn om de exceptie af te vangen en te loggen (met bijv. een framework als [NLog](http://nlog-project.org/)) en de foutmelding niet door te geven naar de controller die dit vervolgens wel afvangt en een foutmelding geeft. Het retourneren van true / false of (in dit geval) controleren of er een lege lijst terugkomt en daar je afhandeling op basseren is netter en efficiënter.