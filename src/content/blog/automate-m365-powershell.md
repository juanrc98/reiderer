---
title: "Automating the repetitive stuff: my PowerShell module for Microsoft 365"
description: 'I got tired of onboarding and offboarding users by hand during a Microsoft 365 migration, so I built a PowerShell module. Here is what I learned along the way.'
pubDate: 2026-06-17
lang: 'en'
category: 'Systems'
accent: 'blue'
tags: ['PowerShell', 'Microsoft 365', 'Entra ID', 'Microsoft Graph', 'Automation']
translationKey: 'm365-powershell'
---

On the Microsoft 365 migration I worked on, the thing that stuck with me wasn't the complicated stuff. It was the repetitive stuff. Onboarding someone: create the account, assign the license, add them to their groups. And the same in reverse when someone left. Again, and again, and again.

On their own, each one is two minutes and four clicks. The problem shows up when you repeat it dozens of times in a hurry: you miss a group, a license stays assigned that nobody removes and keeps costing money, an account you think is disabled but that still has a live session. It isn't hard. It's tedious. And tedious is exactly where the mistakes slip in.

At some point I got tired of doing it by hand. I didn't want yet another loose script, the kind you end up losing in a folder, so I sat down to build something tidy that I could reuse and still understand months later: a PowerShell module on top of Microsoft Graph.

It does what I used to do, but without skipping steps. It onboards users with their license, groups and manager, and offboards them properly the day they leave: disables the account, kills the sessions, frees up the licenses and removes them from their groups. And along the way I added the reports I always ended up pulling by hand: how many licenses we're spending, who doesn't have MFA, which accounts have gone months without anyone signing in.

## The hard part wasn't the functions, it was the decisions

Building this, I realized the meat wasn't in the code but in small decisions. That offboarding should revoke the sessions and not just switch the account off, because a switched-off account with a live session is still a door left ajar. That nothing touching accounts should run without me being able to see it first with a `-WhatIf`. That the tenant secrets should never end up in the repo. Small things, but the difference between a toy and something you'd trust on a Monday morning.

I also added tests. I could have skipped them —it's my own project, nobody's asking for them— but to me they're what separates a script from a tool. And if I want to show how I work, they have to be there.

## What I take from this

This ties into something I've carried since I started living between systems and security: the point isn't to do more, it's to get off your plate the stuff that doesn't need your head, so you can use it where it actually matters. Automating a user's onboarding isn't the achievement. The achievement is never having to think about it again.

The code is on GitHub, with its README, examples and tests: [M365-Admin-Toolkit](https://github.com/juanrc98/M365-Admin-Toolkit). It's just the start of a toolbox I'll keep filling; next on my mind is bulk onboarding from a CSV and a report of the devices that haven't shown up in Intune for a while.

Onward.
