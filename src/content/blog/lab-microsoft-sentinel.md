---
title: 'Caso de estudio: montando un SOC con Microsoft Sentinel'
description: 'Un laboratorio de Sentinel en Azure de principio a fin: detección de amenazas de identidad con KQL, mapeo a MITRE ATT&CK y respuesta automatizada con Logic Apps.'
pubDate: 2026-06-09
lang: 'es'
category: 'Blue Team'
accent: 'blue'
tags: ['Sentinel', 'KQL', 'Azure', 'MITREATTACK', 'SC200']
---

La mayoría de labs de ciberseguridad parecen demos. Yo quería justo lo contrario: montar un **SOC en miniatura pero de verdad**, de principio a fin, sobre Microsoft Sentinel en Azure. Aquí cuento cómo lo hice, qué decisiones tomé y qué aprendí. Es también parte de mi preparación para la **SC-200**.

Y la decisión más importante la tomé antes de tocar nada: en lugar de meter mil fuentes de datos para que pareciera completo, lo centré en **un solo dominio bien entendido: la identidad**. Porque la identidad es hoy el verdadero perímetro, y porque prefiero entender a fondo dos detecciones que coleccionar veinte que no sé ni por qué saltan.

## La arquitectura, de punta a punta

El flujo completo del lab es este:

1. **Microsoft Entra ID** genera los *audit logs* (creación de usuarios, asignación de roles, etc.).
2. Un **data connector** los lleva a un **Log Analytics Workspace** (`lab-sentinel`).
3. **Microsoft Sentinel** evalúa esos eventos con mis **reglas analíticas**.
4. Cuando una regla casa, se genera un **incidente con sus entidades mapeadas**.
5. El incidente es visible en el **portal de Defender XDR** (mi consola SOC unificada) y dispara un **playbook (Logic App)** que manda una notificación por correo.

Es pequeño, sí, pero cierra el círculo entero: del log a la detección, del incidente a la respuesta automatizada.

## Detección: ingeniería, no acumulación

Desplegué dos reglas analíticas en Sentinel, las dos mapeadas a **MITRE ATT&CK**, que es lo que da contexto a una alerta:

- **Creación de cuenta de usuario en Entra ID** — técnica `T1136.003`, severidad baja.
- **Asignación de rol** — técnica `T1098.003`, severidad media.

Y una **hunting query** orientada a un movimiento más sutil: **creación de service principals** (`T1098.001`), de esos que pueden pasar desapercibidos y abrir una puerta de persistencia en la nube.

¿Por qué estas y no otras? Porque son acciones de identidad de alto valor: si alguien crea un usuario, se asigna un rol o registra un service principal sin que toque, eso es exactamente lo que quieres ver. Menos ruido, más señal.

## Validación: que la detección de verdad detecte

Una regla que no has probado no es una detección, es una esperanza. Así que **validé cada detección de punta a punta** generando los eventos de forma controlada y comprobando que disparaban el incidente esperado. Revisé el **primer incidente en el portal de Defender** con el mapeo completo de entidades (usuario, acción, contexto), que es justo lo que un analista necesita para investigar rápido.

## Automatización: el toque SOAR

Monté un **playbook con Logic Apps** que, al generarse un incidente, envía una notificación por correo con **metadatos dinámicos del propio incidente**. Nada de un email genérico: el aviso lleva la información del caso concreto. Es el primer paso del SOAR, y entender cómo se construye esa automatización vale tanto como la propia detección.

## Visibilidad: un workbook con foco

Por último, un **workbook propio**, `Identity Threat Overview`, con cinco paneles centrados en amenazas de identidad. Otra vez la misma filosofía: no llenarlo de gráficas bonitas, sino tener **la visibilidad justa** para entender el estado del entorno de un vistazo.

## Lo que me llevo

Cuando empiezas en Blue Team es fácil pensar que esto va de tener más reglas, más fuentes y más dashboards. Cuanto más montaba el lab, más claro lo veía al revés: **lo difícil es decidir qué dejar fuera**. Hacerlo pequeño y entender bien cada parte me ha enseñado más que cualquier curso.

Y algo que para mí no es opcional: **documentarlo todo**. En el repo está la arquitectura, las queries KQL, los exports JSON de las reglas, el playbook, el workbook, las capturas y hasta una retrospectiva de lecciones aprendidas. Una detección que no puedes revisar ni reproducir, no sirve.

Esto cierra la primera fase del lab (v1.0). A partir de aquí lo iré ampliando con más fuentes y detecciones mientras sigo con la SC-200 (examen en julio de 2026).

---

🔗 **Repositorio completo:** [github.com/juanrc98/microsoft-sentinel-lab](https://github.com/juanrc98/microsoft-sentinel-lab)
