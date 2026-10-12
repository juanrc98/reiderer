---
title: "144 vulnerabilities in 3 hours: patching browsers across a whole domain with GPO"
description: 'Wazuh lit up red over a critical Chrome CVE across half the fleet. I could have put out the fire with a script, but I preferred to fix why it had started.'
pubDate: 2026-10-12
lang: 'en'
category: 'Systems'
accent: 'blue'
tags: ['Active Directory', 'GPO', 'ADMX', 'Wazuh', 'Vulnerability management']
translationKey: 'browsers-gpo'
---

One morning I opened Wazuh's vulnerability module and found a critical Chrome CVE (CVSS 9.6) spread across a good chunk of a domain of about a thousand machines. Not one machine here and there, loads of them. And the browser is the most exposed thing any user has, so this couldn't sit in the queue.

My first thought was the quick fix: a script that downloads the installer and runs it silently everywhere. It would work, sure. But a month later another CVE comes out and you're back where you started, with one more script to maintain that nobody knows is still working. That's when it clicked that the real problem wasn't that vulnerability. It was that browsers **weren't updating themselves**. Fix that, and you also fix the ones that haven't been published yet.

## Self-updating, but under control

Chrome and Firefox publish official administrative templates (ADMX) to manage them through GPO, so that's the way I went:

1. I copied the Chrome, Google Update and Firefox ADMX files, with their language files, into the central `PolicyDefinitions` store in SYSVOL. That way everyone on the team sees the same policies from their console.
2. I created a GPO just for this. For Chrome, I forced updates to always be allowed and lowered the check interval to 240 minutes. For Firefox, automatic updates on.
3. Instead of applying it to the whole domain at once, or shuffling computers between OUs, I linked it to the computers OU and scoped it with security filtering to a small test group.
4. To know whether it worked, Wazuh itself. The same dashboard that had given me the scare was how I measured the fix.

In about three hours of pilot, **144 High vulnerabilities** were closed. With that number on the table, widening the filter to *Domain Computers* took no convincing at all.

## The scare afterwards

A few days later I noticed the number of vulnerable machines had stopped going down. The GPO was still there, but its **link to the OU was gone**. Just like that. Active Directory doesn't keep a history of `gPLink` changes unless you've turned on directory change auditing, so there was no way to find out who or what removed it. I linked it again with PowerShell:

```powershell
New-GPLink -Name "Update browsers" -Target "OU=Computers,DC=lab,DC=local" -LinkEnabled Yes
Get-GPInheritance -Target "OU=Computers,DC=lab,DC=local"
```

For me that's the most valuable part of the whole case, more than the 144 vulnerabilities: a security control nobody watches can disappear without anyone noticing. I was left with a to-do to build a check that opens a ticket if the link goes missing again, and honestly I think it's worth more than the GPO itself.

## What I took from it

That it's worth stopping for five minutes to ask whether you're fixing the cause or just the symptom. That piloting with a security group is about as comfortable as it gets: you can measure it, you can undo it and nothing has to move. And that AD change auditing needs turning on before you need it, not after.

*Real case. Domain, OU and GPO names have been changed.*
