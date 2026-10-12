---
title: "De la alerta al ticket: conectar Wazuh con GLPI"
description: 'Un SIEM lleno de vulnerabilidades sin dueño no protege a nadie. Así monté una integración que convierte las alertas importantes de Wazuh en tickets de GLPI, sin duplicados y con el mínimo privilegio.'
pubDate: 2026-10-10
lang: 'es'
category: 'Blue Team'
accent: 'blue'
tags: ['Wazuh', 'GLPI', 'Python', 'SOAR', 'Gestión de vulnerabilidades']
translationKey: 'wazuh-glpi'
---

Wazuh detectaba bien: vulnerabilidades por equipo, configuraciones que fallaban los controles de SCA, software que no debía estar instalado. El problema era lo que pasaba después: nada. Las alertas se quedaban en el dashboard, y un dashboard no tiene dueño, ni prioridad, ni fecha de cierre. GLPI sí.

## Cómo se engancha algo a Wazuh

Wazuh trae un mecanismo pensado justo para esto: `wazuh-integratord`. En `ossec.conf` declaras una integración con un nivel mínimo o un grupo de reglas, y por cada alerta que encaja Wazuh ejecuta tu script pasándole un fichero con la alerta en JSON. Mi script, en Python, la lee, decide si merece ticket y lo crea contra la API REST de GLPI.

```xml
<integration>
  <name>custom-glpi-ticket</name>
  <level>12</level>
  <alert_format>json</alert_format>
</integration>
```

## Qué entra y qué no

La tentación es mandarlo todo. Sería convertir el ruido del SIEM en ruido en la cola de soporte. Así que tres ramas:

- **Alertas de nivel 12 o más**, excluyendo las reglas de salud del propio agente (las de buffer lleno o agente desconectado no son incidentes de seguridad).
- **Vulnerabilidades**, con su CVE, puntuación CVSS, paquete afectado y enlace a la ficha.
- **Fallos de SCA** solo si tocan lo que de verdad importa: contraseñas, cifrado, escritorio remoto, SSH o VPN.

Además, una regla propia de Wazuh, alimentada por el inventario de Syscollector, que salta cuando aparece instalado software no autorizado y entra por el mismo camino.

## Las decisiones que lo hacen fiable

**Mínimo privilegio.** GLPI tiene una cuenta de servicio solo para esto: puede crear tickets, ver los suyos y cambiar su prioridad. Nada de administración. Si alguien robara su token, no podría hacer mucho más que abrir tickets.

**Los secretos, fuera del código.** Un detalle que cuesta encontrar: `wazuh-integratord` no hereda variables de entorno, así que los tokens van en un fichero de credenciales con permisos restringidos al usuario de Wazuh.

**Deduplicación con dos ritmos.** Windows a veces registra el mismo evento dos veces, así que para alertas normales se descarta un ticket igual creado en los últimos 30 segundos. Para vulnerabilidades y SCA la ventana no tiene sentido: si ya existe un ticket para ese CVE en ese equipo, no se crea otro, aunque sea de hace un mes.

## El bug que tardé en ver

Durante semanas funcionó perfecto. Luego empezaron a aparecer duplicados. La búsqueda de tickets existentes pedía los primeros 500 resultados a la API, sin ordenar. Mientras hubo menos de 500 tickets, daba igual. Cuando se superaron, los recientes quedaron fuera de esa página y el script dejó de verlos. La corrección fue una línea: ordenar por fecha descendente. La lección, más larga: **probar con el volumen que tendrás dentro de seis meses, no con el de hoy**.

## Lo que encontré por el camino

Revisando la configuración apareció otro fallo silencioso: las listas de IOC (IPs, dominios y hashes maliciosos) existían en disco pero no estaban declaradas en el bloque `<ruleset>` de `ossec.conf`, así que llevaban tiempo sin cargarse. Nadie lo había notado porque una detección que no salta no hace ruido.

## Lo que me llevo

- Una alerta solo vale algo cuando alguien es responsable de ella.
- Filtrar antes de automatizar: automatizar ruido solo produce más ruido.
- Cuentas de servicio con lo justo y secretos fuera del código, también en integraciones internas.
- Revisar periódicamente que las detecciones siguen cargadas, no solo que no hay alertas.

*Caso real contado sin datos del entorno. El código original pertenece a la organización; si publico una versión, será reconstruida en mi laboratorio.*
