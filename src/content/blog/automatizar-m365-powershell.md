---
title: "Automatizar lo repetitivo: mi módulo de PowerShell para Microsoft 365"
description: 'Me cansé de dar de alta y baja usuarios a mano en una migración a Microsoft 365, así que monté un módulo de PowerShell. Esto es lo que aprendí por el camino.'
pubDate: 2026-06-17
lang: 'es'
category: 'Sistemas'
accent: 'blue'
tags: ['PowerShell', 'Microsoft 365', 'Entra ID', 'Microsoft Graph', 'Automatización']
translationKey: 'm365-powershell'
---

En la migración a Microsoft 365 en la que estuve, lo que más se me quedó no fueron las cosas complicadas. Fueron las repetitivas. Dar de alta a alguien: crear la cuenta, asignar la licencia, meterlo en sus grupos. Y lo mismo al revés cuando alguien se iba. Una vez, y otra, y otra.

Por separado, cada una son dos minutos y cuatro clics. El problema aparece cuando lo repites decenas de veces y con prisa: se te pasa un grupo, queda una licencia asignada que nadie quita y que sigue costando dinero, una cuenta que crees deshabilitada pero que conserva la sesión abierta. No es difícil. Es tedioso. Y lo tedioso es justo por donde se cuelan los fallos.

En algún momento me cansé de hacerlo a mano. No quería otro script suelto de los que terminas perdiendo en una carpeta, así que me senté a montar algo ordenado, que pudiera reutilizar y entender meses después: un módulo de PowerShell sobre Microsoft Graph.

Hace lo que hacía yo, pero sin saltarse pasos. Da de alta usuarios con su licencia, sus grupos y su manager, y los da de baja como toca el día que se van: deshabilita la cuenta, cierra las sesiones, libera las licencias y los saca de los grupos. Y de camino le añadí los informes que siempre acababa sacando a mano: cuántas licencias estamos gastando, quién no tiene MFA, qué cuentas llevan meses sin que nadie entre.

## Lo difícil no eran las funciones, eran las decisiones

Montando esto me di cuenta de que la chicha no estaba en el código, sino en pequeñas decisiones. Que la baja revoque las sesiones y no solo apague la cuenta, porque una cuenta apagada con la sesión viva sigue siendo una puerta entornada. Que nada que toque cuentas se ejecute sin poder verlo antes con un `-WhatIf`. Que los secretos del tenant no entren jamás en el repositorio. Son detalles, pero son la diferencia entre un juguete y algo en lo que confiar un lunes por la mañana.

También le puse tests. Podría habérmelos ahorrado —es un proyecto mío, nadie me los pide—, pero para mí son lo que separa un script de una herramienta. Y si quiero enseñar cómo trabajo, tienen que estar ahí.

## Lo que me llevo

Esto conecta con algo que arrastro desde que ando entre sistemas y seguridad: la gracia no está en hacer más, sino en quitarte de encima lo que no necesita tu cabeza, para poder usarla donde sí hace falta. Automatizar el alta de un usuario no es el logro. El logro es no tener que volver a pensar en ella.

El código está en GitHub, con su README, sus ejemplos y sus tests: [M365-Admin-Toolkit](https://github.com/juanrc98/M365-Admin-Toolkit). Es solo el principio de una caja de herramientas que iré llenando; lo siguiente que tengo en la cabeza es el alta masiva desde un CSV y un informe de los equipos que llevan tiempo sin aparecer por Intune.

Seguimos.
