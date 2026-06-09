---
title: 'De VirtualBox a Proxmox: lo que no te enseñan en el ciclo'
description: 'En clase virtualicé con VirtualBox y VMware. Al salir al mundo real me encontré Proxmox en todas partes. Esto es lo que aprendí de la diferencia.'
pubDate: 2026-06-08
lang: 'es'
category: 'Sistemas'
accent: 'blue'
tags: ['Proxmox', 'Virtualización', 'Homelab', 'Sistemas']
---

En el ciclo (ASIR) aprendí a virtualizar con **VirtualBox** y **VMware Workstation**. Levantaba máquinas en mi portátil, montaba labs, rompía cosas y las volvía a montar. Para aprender, perfectos. Pero al salir al mundo real me di cuenta de que ahí fuera casi nadie hablaba de eso: en empresas, en homelabs, en foros... el nombre que aparecía una y otra vez era **Proxmox**. Y me piqué por entender el porqué.

## No es lo mismo virtualizar "encima" que "debajo"

La diferencia clave que no me habían explicado del todo es esta: VirtualBox y VMware Workstation son **hipervisores de tipo 2**. Corren *sobre* tu sistema operativo, como una aplicación más. Son ideales para el escritorio y para aprender, pero arrastran el peso del sistema anfitrión.

**Proxmox VE**, en cambio, es un **hipervisor de tipo 1 (bare-metal)**: se instala directamente sobre el hardware (sobre una base Debian), sin un sistema operativo de escritorio por medio. Combina **KVM** para máquinas virtuales y **LXC** para contenedores, y se gestiona entero desde una **interfaz web**. Es otra liga: no es "una app para virtualizar", es **la base sobre la que monta todo un servidor**.

## Por qué se usa en todas partes

Cuanto más lo miraba, más sentido le encontraba a verlo por todos lados:

- Es **gratis y de código abierto**, pero con funciones de nivel empresarial: clústeres, **alta disponibilidad**, migración de máquinas en caliente, backups, snapshots, ZFS...
- No dependes de licencias caras para tener algo serio.
- Tiene una **comunidad enorme**, sobre todo en el mundo del homelab, así que documentación y ejemplos sobran.
- Sirve igual para un laboratorio en casa que para producción de verdad.

Es justo el tipo de herramienta que une mis dos mundos: la parte de **sistemas** que me encanta (montar infraestructura sólida) y la de **seguridad** (poder levantar entornos aislados para mis labs sin ensuciar nada).

## Lo que me llevo de esto

El ciclo me dio la base, y eso es impagable: entender *qué* es virtualizar, cómo funciona una máquina, cómo se conecta una red virtual. Pero el salto al mundo profesional es darte cuenta de que hay otra capa por encima esperándote, y que nadie te la va a enseñar si no la buscas tú.

Y para mí eso, lejos de agobiarme, es lo divertido: hay un terreno enorme por tocar. Así que mi siguiente proyecto está claro — **montar mi propio homelab con Proxmox** y documentar aquí el proceso, desde la instalación hasta levantar mis primeras VMs y contenedores. De VirtualBox en el portátil a un hipervisor de verdad. Toca crecer.
