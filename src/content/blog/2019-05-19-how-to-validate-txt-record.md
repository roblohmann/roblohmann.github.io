---
title: "How to validate a DNS TXT-record"
description: "Step-by-step guide for validating and checking DNS TXT records."
pubDate: 2019-05-19T00:00:00+02:00
tags: ["DNS", "Networking", "DevOps"]
isPublished: false
---
Recently I’ve been using [Let’s Encrypt][1] a lot to generate SSL-certificates. Let’s Encrypt uses the ACME-protocol to validate the ownership of a DNS-record, how this works is described on [their website][2]. Since this requires me to update my DNS-records I use the nslookup command to see if the updated TXT-Records is active. This truely is very easy!

1. Open up a command prompt (cmd.exe) or PowerShell on your computer
2. Enter the following command to check for the 'acme-challenge'-record;

``` shell
nslookup -q=txt _acme-challenge.yourdomain.com
```

This will output something like;
<img src="/public/images/blog/2019-05-19-how-to-validate-dns-txt-record/nslookup-result.png" />

And that’s it, that is all you need to do!
Besides this, it is also possible to fetch all TXT-records for a domain, this can be done with the following command;

``` shell
nslookup-q=txt yourdomain.com
```

[1]: https://letsencrypt.org/ "Let's Encrypt"
[2]: https://letsencrypt.org/how-it-works/ "How does let's encrypt work"