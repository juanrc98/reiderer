---
title: "De la alerta al ticket: conectar Wazuh con GLPI"
description: 'Wazuh detectaba bien, pero las alertas se morían en el dashboard. Así monté una integración para que las importantes acaben en GLPI con dueño, sin duplicados y con los permisos justos.'
pubDate: 2026-10-10
lang: 'es'
category: 'Blue Team'
accent: 'blue'
tags: ['Wazuh', 'GLPI', 'Python', 'SOAR', 'Gestión de vulnerabilidades']
translationKey: 'wazuh-glpi'
---

Wazuh hacía bien su trabajo. Sacaba vulnerabilidades por equipo, configuraciones que no pasaban los controles de SCA, software que no debería estar instalado... El problema venía después, porque no pasaba nada. Las alertas se quedaban en el dashboard y ahí morían. Un dashboard no tiene dueño, ni prioridad, ni fecha de cierre. Un ticket en GLPI sí, así que me puse a conectarlos.

## Cómo se engancha algo a Wazuh

Wazuh ya trae una pieza pensada para esto, `wazuh-integratord`. En `ossec.conf` declaras una integración con un nivel mínimo y, cada vez que salta una alerta que encaja, Wazuh ejecuta tu script y le pasa la alerta en JSON. El mío está en Python: la lee, decide si merece ticket y, si lo merece, lo crea contra la API REST de GLPI.

```xml
<integration>
  <name>custom-glpi-ticket</name>
  <level>12</level>
  <alert_format>json</alert_format>
</integration>
```

## No todo merece un ticket

Lo fácil habría sido mandarlo todo, pero eso es coger el ruido del SIEM y pasárselo a la cola de soporte. Al final lo dejé en tres casos:

- Alertas de nivel 12 o más, quitando las de salud del propio agente. Que se llene el buffer de un agente no es un incidente de seguridad.
- Vulnerabilidades, con su CVE, su CVSS, el paquete afectado y el enlace a la ficha.
- Fallos de SCA, pero solo los que tocan cosas serias: contraseñas, cifrado, escritorio remoto, SSH o VPN.

Además escribí una regla propia de Wazuh que tira del inventario de Syscollector y salta cuando aparece instalado software no autorizado. Entra por el mismo camino y acaba también en ticket.

## Detalles que no se ven pero importan

La cuenta de GLPI que usa el script es de servicio y solo puede crear tickets, ver los suyos y cambiarles la prioridad. Nada de administración. Si alguien le robara el token, poco más podría hacer que abrir tickets.

Los tokens no están en el código. Y aquí me pasé un buen rato atascado: `wazuh-integratord` no hereda variables de entorno, así que lo de siempre no funcionaba. Acabaron en un fichero de credenciales que solo puede leer el usuario de Wazuh.

Para los duplicados usé dos criterios distintos. Windows a veces registra el mismo evento dos veces, así que en las alertas normales descarto un ticket igual creado en los últimos 30 segundos. En vulnerabilidades y SCA eso no tiene sentido: si ya existe un ticket para ese CVE en ese equipo, no se crea otro aunque sea de hace un mes.

## El bug que tardé en ver

Funcionó perfecto durante semanas y de repente empezaron a salir tickets duplicados. Me volví loco hasta que lo vi: la búsqueda de tickets existentes le pedía a la API los primeros 500 resultados, sin ordenar. Mientras hubo menos de 500 tickets daba igual. En cuanto se pasó de ahí, los más recientes se quedaban fuera de esa página y el script dejaba de verlos. El arreglo fue una línea, ordenar por fecha descendente. La lección me la apunto para siempre: hay que probar con el volumen que vas a tener dentro de seis meses, no con el de hoy.

## Y de paso...

Revisando la configuración encontré otra cosa que fallaba en silencio. Las listas de IOC (IPs, dominios y hashes maliciosos) estaban en el disco, pero nadie las había declarado en el bloque `<ruleset>` de `ossec.conf`, así que llevaban tiempo sin cargarse. Nadie se había dado cuenta porque una detección que no salta tampoco hace ruido. Desde entonces, cuando reviso un SIEM, no me quedo solo en "no hay alertas". Compruebo que lo que debería detectar sigue cargado.

*Caso real contado sin datos del entorno. El código original es de la empresa; si publico una versión, la reescribiré desde cero en mi laboratorio.*
