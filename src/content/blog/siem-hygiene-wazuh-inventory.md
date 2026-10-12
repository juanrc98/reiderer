---
title: "SIEM hygiene: cleaning up Wazuh without deleting what you shouldn't"
description: 'A SIEM with ghost agents, alerts flooding the inbox and pending reboots nobody saw. Unglamorous maintenance that decides whether a SOC sees what matters.'
pubDate: 2026-10-07
lang: 'en'
category: 'Blue Team'
accent: 'blue'
tags: ['Wazuh', 'SIEM', 'Active Directory', 'Zabbix', 'SOC']
translationKey: 'siem-hygiene'
---

Nobody writes a post about cleaning up their SIEM inventory. But a noisy SIEM has the same effect as one with no alerts: what matters gets lost. These are the maintenance tasks that made the biggest difference in a Wazuh deployment of about a thousand agents.

## 1. Ghost agents: double verification

The inventory had **105 agents** that had been disconnected for months. Deleting them all at once was easy, but a disconnected agent isn't necessarily a retired device: it might be in a drawer, on holiday or have a broken service. The decommissioning criteria ended up as:

1. User devices only, never servers.
2. More than 90 days without contacting the manager.
3. Computer account **disabled in Active Directory**, checked with PowerShell:

```powershell
Get-ADComputer -Identity PC-EXAMPLE -Properties Enabled, LastLogonDate | Select-Object Name, Enabled, LastLogonDate
```

Of 105 candidates, **only 3** passed both checks. The other 102 were still enabled in AD. Those were left alone and went on to be cross-checked against the GLPI inventory. Deleting 105 agents would have made 102 possibly active devices vanish from the SIEM.

## 2. A rule flooding the inbox

Wazuh rule 204 (agent event queue flooded) was at level 12, the same threshold that triggered emails. The result: dozens of agent health emails mixed in with real alerts. It was lowered to level 7 by copying the original rule into `local_rules.xml` with `overwrite="yes"` and changing only its `level` attribute, without touching the vendor rule files, which get overwritten on every upgrade. It's still visible on the dashboard, but no longer competes in the inbox with what matters.

## 3. The false positive that was Outlook

"Wazuh emails aren't arriving" sounded like a mail server problem. Postfix logs showed successful delivery to the relay the whole time. The cause: the Outlook folder where alerts were filed had stopped syncing. **Checking every hop** before changing configuration saves you from breaking something that worked.

## 4. What the SIEM sees and nobody looked at

Wazuh's inventory shows things that aren't alerts, too. Several Linux servers had a new kernel installed but were still running an old one: **accumulated pending reboots** and, with them, security patches that weren't active. Installing isn't patching until you reboot.

## 5. Same story in monitoring

Zabbix had something similar: hosts down for months or years, triggers on empty switch ports, and memory thresholds firing on normal cache behavior. The plan went in order: disable zombie hosts, turn off triggers for unused interfaces, recalibrate thresholds, and review every disk alert by hand.

## Takeaways

- **Never delete based on a single source of truth.** Cross-checking SIEM and AD avoided a big mistake.
- Lowering a rule's severity isn't hiding it: it's routing it to the right channel.
- Before "fixing" a failure, find where the chain of truth actually breaks.
- The SIEM inventory is a vulnerability management tool, not just a list of agents.

*Real case told without environment data.*
