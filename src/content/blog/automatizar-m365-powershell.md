---
title: "Automatizar el alta y baja de usuarios en Microsoft 365 con PowerShell"
description: "Convertí las tareas más repetitivas de una migración M365 en un módulo de PowerShell con tests y CI. Esto es lo que monté y lo que aprendí por el camino."
category: "Sistemas"
accent: "blue"
pubDate: 2026-06-17
lang: "es"
---

Durante una migración real de más de 230 endpoints a Microsoft 365 me di cuenta de algo: las tareas que más se repetían no eran las difíciles. Eran las **manuales y propensas a error**. Dar de alta a un usuario con su licencia y sus grupos. Dar de baja a alguien que se va sin dejarse media cuenta abierta. Saber cuántas licencias estábamos pagando sin usar, o quién no tenía MFA.

Cada una de esas cosas, hecha a mano y por clics, son cinco minutos. Multiplicado por cientos de usuarios y repetido cada semana, son horas y, peor, son **fallos**: un grupo que se olvida, una sesión que no se revoca el día de la baja, una licencia que sigue costando dinero meses después de que alguien se fuera.

Así que en vez de seguir acumulando scripts sueltos, decidí montar algo serio: un módulo de PowerShell.

## Qué hace

El módulo se apoya en **Microsoft Graph** y cubre las tareas del día a día:

- **Alta de usuario** (`New-M365User`): crea la cuenta en Entra ID, le asigna licencia, lo mete en sus grupos y le pone manager.
- **Baja de usuario** (`Disable-M365User`): deshabilita la cuenta, revoca sus sesiones, le quita las licencias y lo saca de los grupos.
- **Reportes** de uso de licencias, estado de MFA y cuentas inactivas, para tener visibilidad sin llenar el entorno de dashboards.

## Las decisiones que me importaron

Más que las funciones en sí, lo interesante fue **cómo** las planteé.

**Seguridad por defecto.** La baja no se limita a deshabilitar la cuenta: revoca las sesiones activas (invalida los tokens) y libera las licencias. Una cuenta "deshabilitada" con sesiones vivas sigue siendo un riesgo. Y los reportes de MFA priorizan mostrarme primero los administradores sin MFA, porque ese es el hueco que de verdad duele.

**Nada se modifica a ciegas.** Todas las funciones que crean o cambian cuentas soportan `-WhatIf` y `-Confirm`. Antes de tocar producción puedo simular exactamente qué va a pasar:

```powershell
New-M365User -DisplayName 'Ana López' -UserPrincipalName 'ana.lopez@contoso.com' `
             -LicenseSkuPartNumber 'SPE_E3' -GroupId '1111-2222' -WhatIf
```

**Separación y limpieza.** Los helpers internos (conectar a Graph, resolver el ID de una licencia) viven aparte y no se exportan. Y la configuración real del tenant nunca entra en el repositorio: solo subo un ejemplo, el archivo real está ignorado por git.

## Por qué le puse tests

Aquí está lo que para mí marca la diferencia entre un script y una herramienta: **un laboratorio no está terminado sin pruebas**. Le añadí tests con Pester que usan *mocks* de los cmdlets de Graph, así que se ejecutan sin necesidad de un tenant ni conexión. Y un pipeline de CI en GitHub Actions que, en cada push, pasa el linter (PSScriptAnalyzer) y los tests.

¿Es imprescindible para un módulo personal? No. ¿Es la forma en que se trabaja en un entorno real y lo que quiero demostrar que sé hacer? Sí.

## La idea de fondo

Si algo tengo claro, después de pasar por sistemas y por seguridad, es que el valor no está en hacer más cosas, sino en **quitarte de encima lo repetitivo para dedicar la cabeza a lo que de verdad importa**. Automatizar el alta de usuarios no es el objetivo; el objetivo es no tener que pensar en ello y poder centrarme en lo que sí necesita criterio.

El código está en GitHub, con su README, sus ejemplos y sus tests: **[M365-Admin-Toolkit](https://github.com/juanrc98/M365-Admin-Toolkit)**. Es la base de una caja de herramientas que iré ampliando —lo siguiente, el alta masiva desde CSV y un informe de dispositivos Intune obsoletos—.

Seguimos construyendo.
