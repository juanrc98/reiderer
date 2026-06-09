---
title: 'Case study: building a SOC with Microsoft Sentinel'
description: 'A Microsoft Sentinel lab in Azure from end to end: identity threat detection with KQL, MITRE ATT&CK mapping and automated response with Logic Apps.'
pubDate: 2026-06-09
lang: 'en'
category: 'Blue Team'
accent: 'blue'
tags: ['Sentinel', 'KQL', 'Azure', 'MITREATTACK', 'SC200']
---

Most cybersecurity labs look like demos. I wanted exactly the opposite: to build a **small but real SOC**, end to end, on Microsoft Sentinel in Azure. Here's how I did it, the decisions I made and what I learned. It's also part of my preparation for the **SC-200**.

And I made the most important decision before touching anything: instead of throwing in a thousand data sources to make it look complete, I focused it on **one well-understood domain: identity**. Because identity is the real perimeter today, and because I'd rather deeply understand two detections than collect twenty I can't even explain.

## The architecture, end to end

The full flow of the lab is this:

1. **Microsoft Entra ID** generates the *audit logs* (user creation, role assignment, etc.).
2. A **data connector** sends them to a **Log Analytics Workspace** (`lab-sentinel`).
3. **Microsoft Sentinel** evaluates those events with my **analytics rules**.
4. When a rule matches, an **incident with mapped entities** is created.
5. The incident shows up in the **Defender XDR portal** (my unified SOC console) and triggers a **playbook (Logic App)** that sends an email notification.

It's small, yes, but it closes the whole loop: from log to detection, from incident to automated response.

## Detection: engineering, not hoarding

I deployed two analytics rules in Sentinel, both mapped to **MITRE ATT&CK**, which is what gives an alert context:

- **Entra ID user account creation** — technique `T1136.003`, low severity.
- **Role assignment** — technique `T1098.003`, medium severity.

And a **hunting query** aimed at a subtler move: **service principal creation** (`T1098.001`), the kind that can slip by unnoticed and open a persistence door in the cloud.

Why these and not others? Because they're high-value identity actions: if someone creates a user, grants a role or registers a service principal when they shouldn't, that's exactly what you want to see. Less noise, more signal.

## Validation: making sure detection actually detects

A rule you haven't tested isn't a detection, it's a hope. So I **validated each detection end to end** by generating the events in a controlled way and checking that they fired the expected incident. I reviewed the **first incident in the Defender portal** with full entity mapping (user, action, context), which is exactly what an analyst needs to investigate fast.

## Automation: the SOAR touch

I built a **Logic Apps playbook** that, when an incident is created, sends an email notification with **dynamic metadata from the incident itself**. Not a generic email: the alert carries the information of the specific case. It's the first step into SOAR, and understanding how that automation is built is worth as much as the detection itself.

## Visibility: a focused workbook

Finally, a custom **workbook**, `Identity Threat Overview`, with five tiles focused on identity threats. Same philosophy again: not filling it with pretty charts, but having **just the right visibility** to understand the state of the environment at a glance.

## What I take away

When you start in Blue Team it's easy to think this is about having more rules, more sources and more dashboards. The more I built the lab, the clearer I saw it the other way around: **the hard part is deciding what to leave out**. Keeping it small and understanding each part well taught me more than any course.

And something that, to me, isn't optional: **documenting everything**. The repo holds the architecture, the KQL queries, the JSON exports of the rules, the playbook, the workbook, the screenshots and even a lessons-learned retrospective. A detection you can't review or reproduce is useless.

This closes the first phase of the lab (v1.0). From here I'll keep extending it with more sources and detections as I continue with the SC-200 (exam in July 2026).

---

🔗 **Full repository:** [github.com/juanrc98/microsoft-sentinel-lab](https://github.com/juanrc98/microsoft-sentinel-lab)
