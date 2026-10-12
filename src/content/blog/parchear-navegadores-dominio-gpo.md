---
title: "144 vulnerabilidades en 3 horas: parchear navegadores en todo un dominio con GPO"
description: 'Wazuh se puso en rojo por un CVE crítico de Chrome en medio parque. Podía apagar el fuego con un script, pero preferí arreglar por qué se había encendido.'
pubDate: 2026-10-12
lang: 'es'
category: 'Sistemas'
accent: 'blue'
tags: ['Active Directory', 'GPO', 'ADMX', 'Wazuh', 'Gestión de vulnerabilidades']
translationKey: 'browsers-gpo'
---

Una mañana abrí el módulo de vulnerabilidades de Wazuh y me encontré un CVE crítico de Chrome (CVSS 9,6) repartido por buena parte de un dominio de unos mil equipos. No era un equipo suelto, eran muchísimos. Y el navegador es justo lo más expuesto que tiene cualquier usuario, así que eso no podía esperar en la cola.

Lo primero que se me pasó por la cabeza fue lo rápido: un script que descargue el instalador y lo lance en silencio en todos los equipos. Funcionaría, sí. Pero dentro de un mes sale otro CVE y vuelta a empezar, con un script más que mantener y que nadie sabe si sigue funcionando. Ahí me di cuenta de que el problema de verdad no era esa vulnerabilidad. Era que los navegadores **no se estaban actualizando solos**. Si arreglaba eso, arreglaba también las que todavía no se habían publicado.

## Que se actualicen solos, pero controlados

Chrome y Firefox publican sus plantillas administrativas oficiales (ADMX) para gestionarlos por GPO, así que tiré por ahí:

1. Copié las ADMX de Chrome, Google Update y Firefox, con sus ficheros de idioma, al almacén central de `PolicyDefinitions` en SYSVOL. Así cualquiera del equipo ve las mismas políticas desde su consola.
2. Creé una GPO solo para esto. En Chrome forcé que las actualizaciones estén siempre permitidas y bajé el intervalo de comprobación a 240 minutos. En Firefox, actualización automática activada.
3. En vez de aplicarla a todo el dominio de golpe, o de andar moviendo equipos de OU, la vinculé a la OU de equipos y la limité con filtrado de seguridad a un grupo pequeño de prueba.
4. Y para saber si funcionaba, el propio Wazuh. El mismo panel que me había dado el susto me servía para medir la solución.

En unas tres horas de piloto se cerraron **144 vulnerabilidades altas**. Con ese número delante, ampliar el filtro a *Equipos del dominio* no costó nada de justificar.

## El susto de después

A los pocos días vi que el número de equipos vulnerables se había quedado parado. La GPO seguía ahí, pero el **vínculo con la OU había desaparecido**. Sin más. Active Directory no guarda histórico de los cambios en `gPLink` si no tienes activada la auditoría de cambios del directorio, así que no hubo forma de saber quién ni qué lo quitó. Lo volví a vincular con PowerShell:

```powershell
New-GPLink -Name "Actualizar navegadores" -Target "OU=Equipos,DC=lab,DC=local" -LinkEnabled Yes
Get-GPInheritance -Target "OU=Equipos,DC=lab,DC=local"
```

Y para mí esto es lo más valioso de todo el caso, más que las 144 vulnerabilidades: un control de seguridad que nadie vigila puede desaparecer sin que nadie se entere. Me quedó pendiente montar una comprobación que avise con un ticket si el vínculo vuelve a irse, y sinceramente creo que vale más que la propia GPO.

## Lo que me llevo

Que merece la pena pararse cinco minutos a pensar si estás arreglando la causa o solo el síntoma. Que pilotar con un grupo de seguridad es de las cosas más cómodas que hay: lo puedes medir, lo puedes deshacer y no tienes que mover nada de sitio. Y que la auditoría de cambios de AD hay que activarla antes de necesitarla, no después.

*Caso real. He cambiado los nombres de dominio, OU y GPO.*
