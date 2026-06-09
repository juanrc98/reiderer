---
title: 'Building a Microsoft Sentinel lab: less is more'
description: 'The most useful part of building the lab wasn’t the detections, but deciding what made sense to include.'
pubDate: 2026-05-12
lang: 'en'
category: 'Blue Team'
accent: 'blue'
tags: ['Sentinel', 'KQL', 'CloudSecurity']
---

Most cybersecurity labs look like demos. A real SOC is more about **prioritizing** than piling things up.

These past days I’ve been building a Microsoft Sentinel lab from scratch and, honestly, the most useful part wasn’t creating detections or playbooks. It was deciding what made sense to include and what didn’t.

In the end I focused it only on **identity and cloud**:

- Sentinel integrated with Defender XDR
- KQL detections for sensitive Entra ID events
- A *hunting query* aimed at OAuth abuse
- A basic SOAR playbook to automate part of the response
- A simple workbook for visibility without filling the lab with dashboards

I could have added more sources and more rules to make it look more complete. But I preferred to keep it small and **understand each part well**. And I think that’s where the real learning is.
