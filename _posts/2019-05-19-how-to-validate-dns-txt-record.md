---
title:  "How to validate a DNS TXT-record"
date:   2019-05-19 00:00:00 +0100
published: true
categories: blog
tags: dns
---
Recently I’ve been using [Let’s Encrypt][1] a lot to generate SSL-certificates. Let’s Encrypt uses the ACME-protocol to validate the ownership of a DNS-record, how this works is described on [their website][2]. Since this requires me to update my DNS-records I use the nslookup command to see if the updated TXT-Records is active. This truely is very easy!

1. Open up a command prompt (cmd.exe) or PowerShell on your computer
2. Enter the following command to check for the ‘acme-challenge’-record;
{% highlight shell %}
nslookup -q=txt _acme-challenge.yourdomain.com
{% endhighlight %}

This will output something like;
<img src="/images/2019/05/nslookup-result.png" />

And that’s it, that is all you need to do!
Besides this, it is also possible to fetch all TXT-records for a domain, this can be done with the following command;

{% highlight %}
nslookup-q=txt yourdomain.com
{% endhighlight %}

[1]: https://letsencrypt.org/ "Let's Encrypt"
[2]: https://letsencrypt.org/how-it-works/ "How does let's encrypt work"