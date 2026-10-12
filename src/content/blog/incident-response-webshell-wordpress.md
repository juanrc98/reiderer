---
title: "Incident response: a WordPress webshell and the two nobody had seen"
description: 'The hosting provider reported an attack, and the malicious plugin was right where they said. The interesting part came when I kept looking: two more backdoors, years old.'
pubDate: 2026-10-09
lang: 'en'
category: 'Blue Team'
accent: 'blue'
tags: ['Incident response', 'WordPress', 'Webshell', 'Forensics', 'Linux']
translationKey: 'webshell-wordpress'
---

The hosting provider sent a notice about malicious activity on a corporate WordPress site. No SIEM, no EDR, nothing like that here: I had SSH access to the hosting, the files and the provider's email. That was what I had to work with.

## The plugin that optimized nothing

The notice pointed to a plugin named like an optimization tool. I went in and there was a single PHP file inside. A normal plugin ships several files, a `readme.txt`, and is listed in the official WordPress repository; this one had none of that. It was a **webshell**, a backdoor to run commands on the server from a browser.

Your gut in that moment says delete it and close the ticket. But whatever you delete you can't analyze anymore, so first I moved it to an evidence folder **outside the web root**, keeping timestamps and permissions, and noted down paths, sizes and modification dates. The site stopped serving the webshell and I still had the evidence.

## Keep looking

This is the part that really made the difference. Whoever gets in almost never leaves just one door, so I started looking for PHP files where they shouldn't be and for the usual obfuscated-code patterns:

```bash
find wp-content -name "*.php" -newer wp-config.php
find wp-content/uploads -name "*.php"
grep -rlE "eval\(|base64_decode\(|gzinflate\(|str_rot13\(" wp-content
```

And **two more** turned up. One was another webshell inside a plugin named like a cache tool, with an `.htaccess` set up to hide it. The other was an SEO cloaking script, which shows Google different content from the real site to sneak in spam links.

What left me cold was the date: both were from **2021**. Nothing to do with the notice. They'd been sitting there for years without anyone noticing.

## Clean up and close

I removed all three (keeping copies as evidence), changed the passwords for the WordPress admins, the database and the hosting access, reviewed which users were admins and which plugins were actually in use, and updated core, theme and plugins.

## What I learned

That **the notice is where you start, not how far the incident goes**. If I'd only cleaned what the provider flagged, there would still be two backdoors open today. That evidence gets saved before cleaning up, always. That a file's modification date is a clue and not proof, because it can be faked, although here it helped me tell two incidents apart. And that a site nobody watches can stay compromised for years. With file integrity monitoring, with Wazuh for example, it would have shown up on day one.

*Real case told without environment data.*
