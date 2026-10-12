---
title: "From alert to ticket: connecting Wazuh to GLPI"
description: 'Wazuh was detecting fine, but alerts died on the dashboard. Here is how I built an integration so the important ones end up in GLPI with an owner, without duplicates and with just enough permissions.'
pubDate: 2026-10-10
lang: 'en'
category: 'Blue Team'
accent: 'blue'
tags: ['Wazuh', 'GLPI', 'Python', 'SOAR', 'Vulnerability management']
translationKey: 'wazuh-glpi'
---

Wazuh was doing its job. Vulnerabilities per machine, configurations failing SCA checks, software that shouldn't be installed... The problem came afterwards, because nothing happened. Alerts sat on the dashboard and died there. A dashboard has no owner, no priority and no due date. A GLPI ticket does, so I set out to connect the two.

## How you hook into Wazuh

Wazuh already ships with a piece built for this, `wazuh-integratord`. In `ossec.conf` you declare an integration with a minimum level, and every time a matching alert fires, Wazuh runs your script and hands it the alert as JSON. Mine is in Python: it reads the alert, decides whether it deserves a ticket and, if it does, creates one through the GLPI REST API.

```xml
<integration>
  <name>custom-glpi-ticket</name>
  <level>12</level>
  <alert_format>json</alert_format>
</integration>
```

## Not everything deserves a ticket

The easy route would have been to send everything, but that just takes the SIEM's noise and dumps it on the support queue. I ended up with three cases:

- Alerts at level 12 or above, minus the agent's own health rules. An agent's buffer filling up isn't a security incident.
- Vulnerabilities, with their CVE, CVSS, affected package and a link to the advisory.
- SCA failures, but only the ones touching serious stuff: passwords, encryption, remote desktop, SSH or VPN.

I also wrote a custom Wazuh rule that pulls from the Syscollector inventory and fires when unauthorized software shows up. It goes down the same path and ends up as a ticket too.

## Details you don't see but that matter

The GLPI account the script uses is a service account that can only create tickets, see its own and change their priority. No admin rights. If someone stole its token, they couldn't do much more than open tickets.

The tokens aren't in the code. I got stuck here for a good while: `wazuh-integratord` doesn't inherit environment variables, so the usual approach didn't work. They ended up in a credentials file only the Wazuh user can read.

For duplicates I used two different rules. Windows sometimes logs the same event twice, so for regular alerts I skip an identical ticket created in the last 30 seconds. For vulnerabilities and SCA that makes no sense: if a ticket for that CVE on that machine already exists, no new one gets created, even if it's a month old.

## The bug that took me a while

It worked perfectly for weeks, then duplicate tickets started appearing. I went round in circles until I saw it: the lookup for existing tickets asked the API for the first 500 results, unsorted. While there were fewer than 500 tickets it didn't matter. Once there were more, the most recent ones fell off that page and the script stopped seeing them. The fix was one line, sort by date descending. The lesson I'm keeping forever: test with the volume you'll have in six months, not today's.

## And while I was at it...

Going through the configuration I found something else failing silently. The IOC lists (malicious IPs, domains and hashes) were on disk, but nobody had declared them in the `<ruleset>` block of `ossec.conf`, so they hadn't been loading for ages. Nobody noticed, because a detection that never fires doesn't make any noise either. Since then, when I review a SIEM I don't stop at "there are no alerts". I check that what should be detecting is still loaded.

*Real case told without environment data. The original code belongs to the company; if I publish a version, I'll rewrite it from scratch in my lab.*
