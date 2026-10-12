---
title: "SIEM hygiene: cleaning up Wazuh without deleting what you shouldn't"
description: 'Ghost agents, alert emails that weren’t alerts and pending reboots nobody saw. The maintenance that doesn’t look good on a slide but decides whether you see what matters.'
pubDate: 2026-10-07
lang: 'en'
category: 'Blue Team'
accent: 'blue'
tags: ['Wazuh', 'SIEM', 'Active Directory', 'Zabbix', 'SOC']
translationKey: 'siem-hygiene'
---

This isn't the flashiest thing I've done, but I think it's among the most useful. A SIEM full of noise ends up as useless as one with no alerts, because what matters gets lost among everything else. These are the maintenance tasks that made the biggest difference on a Wazuh with about a thousand agents.

## Ghost agents

The inventory had **105 agents** that hadn't connected in months. Deleting them all would have taken a minute, but a disconnected agent isn't necessarily a retired machine. It could be in a drawer, with someone on holiday or with a broken service. So I set myself some criteria before deleting anything: user devices only (servers off limits), more than 90 days without contacting the manager, and the computer account **disabled in Active Directory**. That last one I checked like this:

```powershell
Get-ADComputer -Identity PC-EXAMPLE -Properties Enabled, LastLogonDate | Select-Object Name, Enabled, LastLogonDate
```

Of the 105, only **3** ticked every box. The other 102 were still enabled in AD, so I left them alone and they went on the list to cross-check against GLPI. If I'd trusted Wazuh alone, I'd have made 102 machines vanish from the SIEM that might well still be in use.

## The rule filling the inbox

Wazuh rule 204, the one for a flooded agent event queue, was at level 12. And from 12 up, emails went out, so the inbox was full of agent health notices mixed in with real alerts. I lowered it to level 7 by copying the original rule into `local_rules.xml` with `overwrite="yes"` and changing only the level, without touching Wazuh's own rule files, which get overwritten on every upgrade. It still shows on the dashboard, but it doesn't make noise in the inbox anymore.

## When the problem was Outlook

One day I was told Wazuh emails weren't arriving. It sounded like a mail server problem, but before touching anything I checked the Postfix logs and delivery to the relay was fine the whole time. The problem was that the Outlook folder where the alerts were filed had stopped syncing. Good thing I didn't start changing configs blindly, because I'd have broken something that was working.

## What the SIEM sees and nobody looks at

Wazuh's inventory also shows things that never fire as alerts. Going through it, I saw several Linux servers had a new kernel installed but were still running an old one. They were piled-up pending reboots and, with them, security patches that weren't actually applied. Installing a patch doesn't do much until you reboot.

## And in Zabbix, same thing

Monitoring had something very similar going on: hosts down for months or years, triggers on empty switch ports, and memory thresholds firing on normal cache usage. I tackled it in parts. First I disabled the zombie hosts, then removed triggers for unused interfaces, then recalibrated thresholds and, finally, went through the disk alerts one by one.

If I had to keep just one idea, it'd be never to delete anything based on a single source. Cross-checking Wazuh with AD saved me from making a real mess.

*Real case told without environment data.*
