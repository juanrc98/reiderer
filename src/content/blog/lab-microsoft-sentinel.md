---
title: 'Montando un lab de Microsoft Sentinel: menos es más'
description: 'Lo más útil de montar el lab no fueron las detecciones, sino decidir qué tenía sentido meter y qué no.'
pubDate: 2026-05-12
lang: 'es'
category: 'Blue Team'
accent: 'blue'
tags: ['Sentinel', 'KQL', 'CloudSecurity']
---

La mayoría de labs de ciberseguridad parecen demos. Un SOC real va más de **priorizar** que de acumular cosas.

Estos días he estado montando un laboratorio de Microsoft Sentinel desde cero y, sinceramente, lo más útil no ha sido crear detecciones o playbooks. Ha sido decidir qué tenía sentido meter y qué no.

Al final lo centré solo en **identidad y cloud**:

- Sentinel integrado con Defender XDR
- Detecciones en KQL para eventos sensibles de Entra ID
- Una *hunting query* orientada a abuso de OAuth
- Un playbook básico de SOAR para automatizar parte de la respuesta
- Un workbook sencillo para tener visibilidad sin llenar el lab de dashboards

Podría haber añadido más fuentes y más reglas para que pareciera más completo. Pero preferí hacerlo más pequeño y **entender bien cada parte**. Y creo que ahí está realmente el aprendizaje.
