---
title:  "RSS-Feeds in MVC"
date:   2016-09-12 00:00:00 +0100
published: true
categories: blog
tags: C# mvc
---
Met het herbouwen van mijn site heb ik ook veel code herschreven of zelfs opnieuw geschreven. Mijn vorige site was al een aantal jaren oud en in mijn werk leer ik ook nog dagelijks dingen bij of ontdek ik nieuwe dingen.
Een van de dingen die ik jaren terug zelf toegevoegd heb is een RSS-Feed, destijds zelf gebouwd en redelijk recht-toe-recht aan met hardcoded url’s enzo. Per toeval stuitte ik op een blog van codeinside waarop ik een artikel tegenkwam hoe zij dit doen., namelijk met een syndicationfeed.

De syndicationfeed-class is al enige tijd onderdeel van het .NET-framework en biedt mogelijkheden om Atom 1.0 feeds of RSS 2.0 feeds te genereren. Met een eenvoudig stukje code is het mogelijk om een eigen feed te maken. Je moet er enkel voor zorgen dat je de items uit je datasource omzet naar het type ‘SyndicationItem’. Op basis van de blog op codeinside heb ik in mijn eigen library een RSSActionResult toegevoegd om zo mijn RSS-feed te kunnen maken.

Dit levert uiteindelijk de volgende code op;

{% highlight C# %}
public RssActionResult RssFeedBlog()
{
	var items = new List<SyndicationItem>();
	var blogs = GetBlogs();

	foreach (var blog in blogs)
	{
		var blogItemUrl = $"{Host}/blog/{blog.Slug}}";

		var feedItem = new SyndicationItem(blog.Title, blog.Text.ShortenText(400, false), new Uri(blogItemUrl));
		feedItem.PublishDate = blog.PublishStart;
		if (blog.DateModified.HasValue) feedItem.LastUpdatedTime = blog.DateModified.Value;
		
		items.Add(feedItem);
	}

	re
{% endhighlight %}

Waar ik eerder veel werk moest verrichten om zelf mijn XML op te bouwen, is dit nu een fluitje van een cent!

<em>Bron: [http://blog.codeinside.eu/2014/06/02/howto-create-rss-feeds-with-asp-net-mvc/](http://blog.codeinside.eu/2014/06/02/howto-create-rss-feeds-with-asp-net-mvc/)</em>