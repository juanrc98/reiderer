---
title: "144 vulnerabilidades en 3 horas: parchear navegadores en todo un dominio con GPO"
description: 'El SIEM avisó de un CVE crítico de Chrome en buena parte del parque. En vez de un script de usar y tirar, la solución fue dejar que los navegadores se actualicen solos, controlados por GPO.'
pubDate: 2026-10-12
lang: 'es'
category: 'Sistemas'
accent: 'blue'
tags: ['Active Directory', 'GPO', 'ADMX', 'Wazuh', 'Gestión de vulnerabilidades']
translationKey: 'browsers-gpo'
---

En un dominio de unos mil equipos Windows, el módulo de vulnerabilidades de Wazuh empezó a marcar en rojo un CVE crítico de Chrome (CVSS 9,6). No en un equipo: en una parte importante del parque. El navegador es la puerta más expuesta de cualquier puesto de trabajo, así que no era algo para dejar en la cola.

## La tentación del script

La primera idea que aparece siempre es la rápida: un script que descargue el instalador y lo ejecute en silencio en todos los equipos. Funciona. Una vez. El mes siguiente sale otro CVE y vuelves a estar en el mismo sitio, con un script que alguien tendrá que mantener y que nadie sabrá si sigue funcionando.

El problema real no era *esta* vulnerabilidad. Era que los navegadores no se estaban actualizando solos. Si arreglas eso, arreglas también las vulnerabilidades que todavía no se han publicado.

## La solución: que el navegador se actualice solo, pero bajo control

Chrome y Firefox publican plantillas administrativas oficiales (ADMX) para gestionarlos por directiva de grupo. Con ellas, la actualización deja de depender de que el usuario reinicie el navegador o de que nadie haya bloqueado el servicio de actualización.

1. **Cargar las plantillas en el almacén central.** Las ADMX de Chrome, Google Update y Firefox, con sus ADML de idioma, en `\\dominio\SYSVOL\dominio\Policies\PolicyDefinitions`. Así cualquier administrador ve las mismas políticas desde su consola.
2. **Crear una GPO dedicada.** En Chrome, forzar que las actualizaciones estén siempre permitidas y reducir el intervalo de comprobación a 240 minutos. En Firefox, activar la actualización automática.
3. **Pilotar con un grupo de seguridad.** En lugar de vincular la GPO a todo el dominio de golpe o mover equipos de OU, la vinculé a la OU de equipos y limité su alcance con el filtrado de seguridad a un grupo pequeño de prueba.
4. **Medir en el SIEM.** Wazuh vuelve a inventariar el software de cada agente, así que el mismo panel que había dado la alarma servía para ver si el cambio funcionaba.

## El resultado

Durante el piloto, en unas tres horas se cerraron **144 vulnerabilidades de severidad alta**. Con ese dato encima de la mesa, ampliar el filtrado de seguridad a *Equipos del dominio* fue una decisión fácil de defender.

## Lo que no salía en ningún tutorial

Unos días después, el número de equipos vulnerables dejó de bajar. La GPO seguía existiendo, pero **su vínculo a la OU había desaparecido**. Active Directory no guarda histórico de cambios del atributo `gPLink` si no tienes la auditoría de cambios en servicios de directorio activada, así que no había forma de saber quién o qué lo quitó. Se restauró con PowerShell:

```powershell
New-GPLink -Name "Actualizar navegadores" -Target "OU=Equipos,DC=lab,DC=local" -LinkEnabled Yes
Get-GPInheritance -Target "OU=Equipos,DC=lab,DC=local"
```

La lección me parece la más útil de todo el caso: **un control de seguridad que no se vigila acaba desapareciendo sin que nadie se entere**. Una comprobación periódica de que el vínculo sigue en su sitio, que abra un ticket si no, vale más que la propia GPO.

## Lo que me llevo

- Arreglar la causa (navegadores que no se actualizan) en vez del síntoma (un CVE concreto).
- Pilotar con un grupo de seguridad: es reversible, medible y no obliga a mover nada.
- Usar el mismo sistema que detecta el problema para medir la solución.
- Activar la auditoría de cambios de AD *antes* de necesitarla.

*Caso real contado sin datos del entorno: nombres de dominio, OU y GPO cambiados.*
