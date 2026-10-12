---
title: "From alert to ticket: connecting Wazuh to GLPI"
description: 'A SIEM full of vulnerabilities with no owner protects nobody. Here is how I built an integration that turns the important Wazuh alerts into GLPI tickets, without duplicates and with least privilege.'
pubDate: 2026-10-11
lang: 'en'
category: 'Blue Team'
accent: 'blue'
tags: ['Wazuh', 'GLPI', 'Python', 'SOAR', 'Vulnerability management']
translationKey: 'wazuh-glpi'
---

Wazuh was detecting well: vulnerabilities per device, configurations failing SCA checks, software that shouldn't be installed. The problem was what happened next: nothing. Alerts stayed on the dashboard, and a dashboard has no owner, no priority and no due date. GLPI does.

## How you hook into Wazuh

Wazuh ships with a mechanism built for exactly this: `wazuh-integratord`. In `ossec.conf` you declare an integration with a minimum level or a rule group, and for every matching alert Wazuh runs your script with a file containing the alert as JSON. My Python script reads it, decides whether it deserves a ticket and creates it through the GLPI REST API.

```xml
<integration>
  <name>custom-glpi-ticket</name>
  <level>12</level>
  <alert_format>json</alert_format>
</integration>
```

## What gets in and what doesn't

The temptation is to send everything. That would just turn SIEM noise into support queue noise. So, three branches:

- **Alerts of level 12 or higher**, excluding the agent's own health rules (buffer full or agent disconnected are not security incidents).
- **Vulnerabilities**, with their CVE, CVSS score, affected package and a link to the advisory.
- **SCA failures** only when they touch what really matters: passwords, encryption, remote desktop, SSH or VPN.

On top of that, a custom Wazuh rule fed by the Syscollector inventory fires when unauthorized software shows up, and it flows down the same path.

## The decisions that make it reliable

**Least privilege.** GLPI has a service account just for this: it can create tickets, see its own and change their priority. No admin rights. If someone stole its token, they couldn't do much more than open tickets.

**Secrets out of the code.** A detail that's hard to find: `wazuh-integratord` doesn't inherit environment variables, so the tokens live in a credentials file readable only by the Wazuh user.

**Deduplication at two speeds.** Windows sometimes logs the same event twice, so for regular alerts an identical ticket created in the last 30 seconds is discarded. For vulnerabilities and SCA a time window makes no sense: if a ticket for that CVE on that device already exists, no new one is created, even if it's a month old.

## The bug that took me a while to see

For weeks it worked perfectly. Then duplicates started appearing. The lookup for existing tickets asked the API for the first 500 results, unsorted. While there were fewer than 500 tickets, it didn't matter. Once there were more, the recent ones fell off that page and the script stopped seeing them. The fix was one line: sort by date, descending. The lesson is longer: **test with the volume you'll have in six months, not today's**.

## What I found along the way

Reviewing the configuration surfaced another silent failure: the IOC lists (malicious IPs, domains and hashes) existed on disk but weren't declared in the `<ruleset>` block of `ossec.conf`, so they hadn't been loading for a long time. Nobody noticed, because a detection that never fires makes no noise.

## Takeaways

- An alert is only worth something when someone owns it.
- Filter before you automate: automating noise only produces more noise.
- Least-privilege service accounts and secrets out of the code, in internal integrations too.
- Periodically check that detections are still loaded, not just that there are no alerts.

*Real case told without environment data. The original code belongs to the organization; if I publish a version, it will be rebuilt in my lab.*
