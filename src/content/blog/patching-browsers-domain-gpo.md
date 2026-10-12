---
title: "144 vulnerabilities in 3 hours: patching browsers across a whole domain with GPO"
description: 'The SIEM flagged a critical Chrome CVE across much of the fleet. Instead of a throwaway script, the fix was to let browsers update themselves, controlled by GPO.'
pubDate: 2026-10-12
lang: 'en'
category: 'Systems'
accent: 'blue'
tags: ['Active Directory', 'GPO', 'ADMX', 'Wazuh', 'Vulnerability management']
translationKey: 'browsers-gpo'
---

In a domain of about a thousand Windows devices, Wazuh's vulnerability module started flagging a critical Chrome CVE (CVSS 9.6). Not on one machine: across a large part of the fleet. The browser is the most exposed door on any workstation, so this wasn't something to leave in the queue.

## The script temptation

The first idea is always the quick one: a script that downloads the installer and runs it silently on every machine. It works. Once. Next month another CVE comes out and you're back where you started, with a script someone has to maintain and nobody knows is still working.

The real problem wasn't *this* vulnerability. It was that browsers weren't updating themselves. Fix that and you also fix the vulnerabilities that haven't been published yet.

## The fix: browsers that update themselves, under control

Chrome and Firefox publish official administrative templates (ADMX) to manage them through Group Policy. With them, updating no longer depends on users restarting the browser or on the update service not being blocked.

1. **Load the templates into the central store.** Chrome, Google Update and Firefox ADMX files, with their language ADML files, in `\\domain\SYSVOL\domain\Policies\PolicyDefinitions`. That way every admin sees the same policies from their console.
2. **Create a dedicated GPO.** For Chrome, force updates to always be allowed and lower the check interval to 240 minutes. For Firefox, enable automatic updates.
3. **Pilot with a security group.** Instead of linking the GPO to the whole domain at once or moving computers between OUs, I linked it to the computers OU and scoped it with security filtering to a small test group.
4. **Measure in the SIEM.** Wazuh re-inventories each agent's software, so the same dashboard that raised the alarm showed whether the change was working.

## The result

During the pilot, **144 High-severity vulnerabilities were closed** in about three hours. With that number on the table, widening the security filter to *Domain Computers* was an easy decision to defend.

## What no tutorial mentioned

A few days later, the number of vulnerable devices stopped going down. The GPO still existed, but **its link to the OU was gone**. Active Directory doesn't keep a history of `gPLink` changes unless directory service change auditing is enabled, so there was no way to tell who or what removed it. It was restored with PowerShell:

```powershell
New-GPLink -Name "Update browsers" -Target "OU=Computers,DC=lab,DC=local" -LinkEnabled Yes
Get-GPInheritance -Target "OU=Computers,DC=lab,DC=local"
```

That's the most useful lesson of the whole case: **a security control nobody watches eventually disappears without anyone noticing**. A periodic check that the link is still there, opening a ticket if it isn't, is worth more than the GPO itself.

## Takeaways

- Fix the cause (browsers not updating) rather than the symptom (one specific CVE).
- Pilot with a security group: reversible, measurable and nothing has to move.
- Use the same system that detects the problem to measure the fix.
- Turn on AD change auditing *before* you need it.

*Real case told without environment data: domain, OU and GPO names changed.*
