---
title: "Higiene del SIEM: limpiar Wazuh sin borrar lo que no toca"
description: 'Un SIEM con agentes fantasma, alertas que inundan el correo y reinicios pendientes que nadie veía. Mantenimiento poco vistoso que decide si un SOC ve lo importante.'
pubDate: 2026-10-07
lang: 'es'
category: 'Blue Team'
accent: 'blue'
tags: ['Wazuh', 'SIEM', 'Active Directory', 'Zabbix', 'SOC']
translationKey: 'siem-hygiene'
---

Nadie publica un post sobre limpiar el inventario de su SIEM. Pero un SIEM con ruido tiene el mismo efecto que uno sin alertas: lo importante se pierde. Estas son las tareas de mantenimiento que más diferencia marcaron en un despliegue de Wazuh de unos mil agentes.

## 1. Agentes fantasma: la doble verificación

El inventario tenía **105 agentes desconectados** hacía meses. Borrarlos todos de golpe era fácil, pero un agente desconectado no es necesariamente un equipo retirado: puede estar en un cajón, de vacaciones o con el servicio roto. El criterio para dar de baja quedó así:

1. Solo equipos de usuario, nunca servidores.
2. Más de 90 días sin contacto con el manager.
3. Cuenta de equipo **deshabilitada en Active Directory**, verificada con PowerShell:

```powershell
Get-ADComputer -Identity PC-EJEMPLO -Properties Enabled, LastLogonDate | Select-Object Name, Enabled, LastLogonDate
```

De 105 candidatos, **solo 3** cumplían las dos verificaciones. Los otros 102 seguían habilitados en AD. Esos no se tocaron y pasaron a cruzarse con el inventario de GLPI. Borrar 105 agentes habría hecho desaparecer del SIEM a 102 equipos que quizá siguen en uso.

## 2. Una regla que inundaba el correo

La regla 204 de Wazuh (cola de eventos del agente saturada) tenía nivel 12, el mismo umbral a partir del cual se enviaban correos. Resultado: decenas de correos de salud del agente mezclados con alertas reales. Se bajó a nivel 7 copiando la regla original a `local_rules.xml` con `overwrite="yes"` y cambiando solo su atributo `level`, sin tocar los ficheros de reglas del fabricante, que se sobrescriben en cada actualización. Sigue visible en el dashboard, pero ya no compite con lo que importa en la bandeja.

## 3. El falso positivo que era Outlook

"No llegan los correos de Wazuh" sonaba a problema del servidor de correo. Los logs de Postfix mostraban entregas correctas al relay en todo momento. La causa: la carpeta de Outlook donde se archivaban las alertas había dejado de sincronizar. **Verificar cada salto** antes de cambiar configuración ahorra romper algo que funcionaba.

## 4. Lo que el SIEM ve y nadie miraba

El inventario de Wazuh también enseña cosas que no son alertas. Varios servidores Linux tenían un kernel nuevo instalado pero seguían ejecutando uno antiguo: **reinicios pendientes acumulados** y, con ellos, parches de seguridad que no estaban activos. Instalar no es parchear hasta que se reinicia.

## 5. Lo mismo en la monitorización

En Zabbix pasaba algo parecido: hosts caídos desde hacía meses o años, triggers de puertos de switch vacíos y umbrales de memoria que saltaban por el funcionamiento normal de la caché. El plan fue por orden: deshabilitar hosts zombie, desactivar triggers de interfaces sin uso, recalibrar umbrales y revisar a mano cada alerta de disco.

## Lo que me llevo

- **Nunca borrar con una sola fuente de verdad.** Cruzar SIEM y AD evitó un error grande.
- Ajustar la severidad de una regla no es esconderla: es ponerla en el canal que le corresponde.
- Antes de "arreglar" un fallo, comprobar dónde se rompe la cadena de verdad.
- El inventario del SIEM es una herramienta de gestión de vulnerabilidades, no solo una lista de agentes.

*Caso real contado sin datos del entorno.*
