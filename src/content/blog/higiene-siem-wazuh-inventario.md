---
title: "Higiene del SIEM: limpiar Wazuh sin borrar lo que no toca"
description: 'Agentes fantasma, correos de alertas que no eran alertas y reinicios pendientes que nadie veía. El mantenimiento que no luce pero que decide si ves lo importante.'
pubDate: 2026-10-07
lang: 'es'
category: 'Blue Team'
accent: 'blue'
tags: ['Wazuh', 'SIEM', 'Active Directory', 'Zabbix', 'SOC']
translationKey: 'siem-hygiene'
---

Esto no es lo más vistoso que he hecho, pero creo que es de lo más útil. Un SIEM lleno de ruido acaba siendo igual de inútil que uno sin alertas, porque lo importante se pierde entre todo lo demás. Estas son las tareas de mantenimiento que más se notaron en un Wazuh de unos mil agentes.

## Agentes fantasma

En el inventario había **105 agentes** que llevaban meses sin conectarse. Borrarlos de golpe era cuestión de un minuto, pero un agente desconectado no tiene por qué ser un equipo retirado. Puede estar en un cajón, con alguien de vacaciones o con el servicio roto. Así que me puse un criterio antes de borrar nada: solo equipos de usuario (los servidores ni tocarlos), más de 90 días sin contactar con el manager y la cuenta de equipo **deshabilitada en Active Directory**. Esto último lo comprobaba así:

```powershell
Get-ADComputer -Identity PC-EJEMPLO -Properties Enabled, LastLogonDate | Select-Object Name, Enabled, LastLogonDate
```

De los 105, solo **3** cumplían todo. Los otros 102 seguían habilitados en AD, así que no los toqué y quedaron pendientes de cruzarlos con GLPI. Si me hubiera fiado solo de Wazuh, habría hecho desaparecer del SIEM 102 equipos que a lo mejor seguían en uso.

## La regla que llenaba el correo

La regla 204 de Wazuh, la de la cola de eventos del agente saturada, tenía nivel 12. Y a partir de 12 se mandaban correos, así que la bandeja estaba llena de avisos de salud de agentes mezclados con las alertas de verdad. La bajé a nivel 7 copiando la regla original a `local_rules.xml` con `overwrite="yes"` y cambiando solo el nivel, sin tocar los ficheros de reglas de Wazuh, que se machacan en cada actualización. Sigue viéndose en el dashboard, pero ya no hace ruido en el correo.

## Cuando el problema era Outlook

Un día me dijeron que no estaban llegando los correos de Wazuh. Sonaba a problema del servidor de correo, pero antes de tocar nada miré los logs de Postfix y las entregas al relay eran correctas en todo momento. El problema era que la carpeta de Outlook donde se guardaban las alertas había dejado de sincronizar. Menos mal que no me puse a cambiar configuraciones a ciegas, porque habría roto algo que funcionaba.

## Lo que el SIEM ve y nadie mira

El inventario de Wazuh también enseña cosas que no saltan como alerta. Revisándolo vi que varios servidores Linux tenían un kernel nuevo instalado, pero seguían corriendo uno antiguo. Eran reinicios pendientes acumulados y, con ellos, parches de seguridad que en realidad no estaban aplicados. Instalar un parche no sirve de mucho hasta que reinicias.

## Y en Zabbix, lo mismo

En la monitorización pasaba algo muy parecido: hosts caídos desde hacía meses o años, triggers de puertos de switch vacíos y umbrales de memoria que saltaban por el uso normal de la caché. Lo fui atacando por partes. Primero deshabilité los hosts zombie, luego quité los triggers de interfaces sin uso, después recalibré los umbrales y, al final, revisé una a una las alertas de disco.

Si tuviera que quedarme con una sola idea, sería no borrar nunca nada fiándome de una única fuente. Cruzar Wazuh con AD me libró de liarla bastante.

*Caso real contado sin datos del entorno.*
