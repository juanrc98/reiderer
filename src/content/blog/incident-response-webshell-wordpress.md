---
title: "Incident response: a WordPress webshell and the two nobody had seen"
description: 'The hosting provider reported an attack. The malicious plugin was there, but what mattered was what turned up when I kept looking: two compromises that were years old.'
pubDate: 2026-10-09
lang: 'en'
category: 'Blue Team'
accent: 'blue'
tags: ['Incident response', 'WordPress', 'Webshell', 'Forensics', 'Linux']
translationKey: 'webshell-wordpress'
---

A shared hosting provider reported malicious activity on a corporate WordPress site. No SIEM, no EDR: just SSH to the hosting account, the files and the provider's notice.

## 1. Identify

The notice pointed to a plugin named like an optimization tool. Inside, a single PHP file that optimized nothing: a **webshell**, a backdoor that lets someone run commands on the server from a browser. A legitimate plugin ships several files, a `readme.txt`, and is listed in the official WordPress repository. This one ticked none of those boxes.

## 2. Contain without destroying evidence

The temptation is to delete it and close the ticket. But what you delete you can no longer analyze. Before cleaning up:

- I moved the malicious file to an evidence folder **outside the web root**, keeping its timestamps and permissions.
- I recorded paths, sizes and modification dates.

That way the site stopped serving the webshell and the evidence stayed available for analysis.

## 3. Look beyond the notice

This step is the one that added the most value. An attacker who gets in rarely leaves a single door. I searched for PHP files where they shouldn't be and for typical obfuscated-code patterns:

```bash
find wp-content -name "*.php" -newer wp-config.php
find wp-content/uploads -name "*.php"
grep -rlE "eval\(|base64_decode\(|gzinflate\(|str_rot13\(" wp-content
```

**Two more footholds** turned up:

- Another webshell inside a plugin named like a cache tool, with an `.htaccess` set up to hide it.
- An **SEO cloaking** script, which shows search engines different content to rank spam links.

Both had a modification date from **2021**. They had nothing to do with the recent notice: they'd been sitting there for years without anyone noticing.

## 4. Eradicate and harden

- Removal of all three footholds, with copies kept as evidence.
- Password rotation for WordPress admins, the database and hosting access.
- Review of admin users, and of installed plugins against the ones actually in use.
- Core, theme and plugin updates.

## Takeaways

- **The notice is the starting point, not the scope of the incident.** Had I only cleaned what the provider flagged, two backdoors would still be open.
- Preserve evidence before cleaning up, always.
- A file's modification date is a clue, not proof: it can be forged. Still, here it helped separate two different incidents.
- A site nobody monitors can stay compromised for years. File integrity monitoring (FIM), with Wazuh for example, would have caught it on day one.

*Real case told without environment data.*
