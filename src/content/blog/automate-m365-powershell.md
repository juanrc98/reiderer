---
title: "Automating Microsoft 365 user onboarding and offboarding with PowerShell"
description: "I turned the most repetitive tasks of an M365 migration into a PowerShell module with tests and CI. Here's what I built and what I learned along the way."
category: "Systems"
accent: "blue"
date: 2026-06-17
lang: "en"
---

During a real migration of 230+ endpoints to Microsoft 365, I noticed something: the tasks that came up most often weren't the hard ones. They were the **manual, error-prone ones**. Onboarding a user with their license and groups. Offboarding someone who's leaving without leaving half an account open. Knowing how many licenses we were paying for but not using, or who didn't have MFA.

Each of those, done by hand and by clicking, is five minutes. Multiplied across hundreds of users and repeated every week, it's hours and, worse, it's **mistakes**: a group that gets forgotten, a session that isn't revoked on the day someone leaves, a license that keeps costing money months after they're gone.

So instead of piling up loose scripts, I decided to build something proper: a PowerShell module.

## What it does

The module is built on **Microsoft Graph** and covers the day-to-day tasks:

- **Onboarding** (`New-M365User`): creates the account in Entra ID, assigns a license, adds them to their groups and sets a manager.
- **Offboarding** (`Disable-M365User`): disables the account, revokes its sessions, removes licenses and takes the user out of their groups.
- **Reports** on license usage, MFA status and inactive accounts, for visibility without flooding the tenant with dashboards.

## The decisions that mattered

More than the functions themselves, the interesting part was **how** I approached them.

**Secure by default.** Offboarding doesn't just disable the account: it revokes active sessions (invalidates the tokens) and frees up the licenses. A "disabled" account with live sessions is still a risk. And the MFA report prioritizes showing me the administrators without MFA first, because that's the gap that really hurts.

**Nothing changes blindly.** Every function that creates or changes accounts supports `-WhatIf` and `-Confirm`. Before touching production I can simulate exactly what's going to happen:

```powershell
New-M365User -DisplayName 'Ana López' -UserPrincipalName 'ana.lopez@contoso.com' `
             -LicenseSkuPartNumber 'SPE_E3' -GroupId '1111-2222' -WhatIf
```

**Separation and cleanliness.** Internal helpers (connecting to Graph, resolving a license ID) live apart and aren't exported. And the real tenant configuration never makes it into the repo: I only commit an example; the real file is git-ignored.

## Why I added tests

This is what, to me, separates a script from a tool: **a lab isn't finished without tests**. I added Pester tests that use *mocks* of the Graph cmdlets, so they run without a tenant or a connection. And a CI pipeline on GitHub Actions that, on every push, runs the linter (PSScriptAnalyzer) and the tests.

Is it strictly necessary for a personal module? No. Is it how you work in a real environment, and what I want to show I can do? Yes.

## The underlying idea

If there's one thing I'm sure of, after coming through systems and security, it's that value isn't about doing more things, it's about **getting the repetitive stuff off your plate so you can spend your head on what actually matters**. Automating user onboarding isn't the goal; the goal is not having to think about it, so I can focus on what does need judgment.

The code is on GitHub, with its README, examples and tests: **[M365-Admin-Toolkit](https://github.com/juanrc98/M365-Admin-Toolkit)**. It's the base of a toolbox I'll keep expanding — next up, bulk onboarding from CSV and a report of stale Intune devices.

We keep building.
