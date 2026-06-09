---
title: "From VirtualBox to Proxmox: what they don't teach you in school"
description: 'In class I virtualized with VirtualBox and VMware. Out in the real world I found Proxmox everywhere. Here is what I learned about the difference.'
pubDate: 2026-06-08
lang: 'en'
category: 'Systems'
accent: 'blue'
tags: ['Proxmox', 'Virtualization', 'Homelab', 'Systems']
---

In my vocational training (ASIR) I learned to virtualize with **VirtualBox** and **VMware Workstation**. I spun up machines on my laptop, built labs, broke things and rebuilt them. For learning, perfect. But out in the real world I realized almost nobody was talking about those: in companies, in homelabs, in forums... the name that came up again and again was **Proxmox**. And I got curious about why.

## Virtualizing "on top" is not the same as "underneath"

The key difference nobody had fully explained to me is this: VirtualBox and VMware Workstation are **type 2 hypervisors**. They run *on top of* your operating system, like just another app. They're ideal for the desktop and for learning, but they carry the weight of the host system.

**Proxmox VE**, on the other hand, is a **type 1 (bare-metal) hypervisor**: it installs directly on the hardware (on a Debian base), with no desktop operating system in the middle. It combines **KVM** for virtual machines and **LXC** for containers, and it's managed entirely from a **web interface**. It's another level: it's not "an app to virtualize", it's **the foundation a whole server is built on**.

## Why it's used everywhere

The more I looked at it, the more sense it made that it's everywhere:

- It's **free and open source**, but with enterprise-grade features: clusters, **high availability**, live migration, backups, snapshots, ZFS...
- You don't depend on expensive licenses to have something serious.
- It has a **huge community**, especially in the homelab world, so there's no shortage of docs and examples.
- It works just as well for a home lab as for real production.

It's exactly the kind of tool that joins my two worlds: the **systems** side I love (building solid infrastructure) and the **security** side (being able to spin up isolated environments for my labs without messing anything up).

## What I take from this

My training gave me the foundation, and that's priceless: understanding *what* virtualizing is, how a machine works, how a virtual network connects. But the leap to the professional world is realizing there's another layer above waiting for you, and nobody will teach it to you unless you go looking for it yourself.

And to me that, far from being overwhelming, is the fun part: there's a huge field left to explore. So my next project is clear — **building my own homelab with Proxmox** and documenting the process here, from installation to spinning up my first VMs and containers. From VirtualBox on my laptop to a real hypervisor. Time to grow.
