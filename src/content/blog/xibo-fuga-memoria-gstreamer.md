---
title: "La pantalla que se comía 14 GB de RAM: depurando Xibo Player en C++"
description: 'Una pantalla de cartelería digital que se degradaba cada pocas horas. La causa estaba en el código del reproductor: un pipeline de vídeo nuevo por cada vídeo, que nunca se liberaba.'
pubDate: 2026-10-11
lang: 'es'
category: 'Sistemas'
accent: 'blue'
tags: ['Linux', 'C++', 'GStreamer', 'Xibo', 'Troubleshooting']
translationKey: 'xibo-memory'
---

Una pantalla de cartelería digital con Xibo Player en Linux funcionaba bien al arrancar y, unas horas después, se quedaba en negro. Mientras tanto, el proceso del reproductor crecía hasta los **12-14 GB de memoria** y la CPU del mini PC rondaba los **95-105 °C** todo el día, rozando el límite térmico.

## Primero, contener

Antes de investigar nada, la pantalla tenía que seguir funcionando. El reproductor pasó a ejecutarse como servicio de `systemd --user` con reinicio automático, y un pequeño vigilante de memoria lo reiniciaba al superar un umbral. No es una solución, es un torniquete: compra tiempo para buscar la causa real sin que nadie vea una pantalla negra.

## Leer el código

El cliente Linux de Xibo es de código abierto (C++, GTK y GStreamer) y el proyecto está archivado desde hace años, así que no iba a llegar un parche oficial. Recompilarlo en Ubuntu 24.04 ya fue un trabajo en sí: dependencias retiradas de todas las distribuciones, una versión de Boost exigida de forma exacta, cambios de API en `fmt`, `sqlite_orm` y Boost.Beast, y un `find_path` de CMake que confundía el binario `/usr/bin/date` con un directorio de cabeceras.

Con el binario compilando, leí cómo se construye un layout:

- Al cargar una región, el reproductor creaba **todos** sus elementos de golpe.
- Por cada vídeo, la fábrica construía un `GstMediaPlayer` propio: un pipeline GStreamer completo con su contexto OpenGL.
- Al terminar un vídeo, solo se llamaba a `stop()`. El objeto nunca se destruía ni se retiraba del árbol de widgets.

Con 86 vídeos en el layout, había **86 pipelines con sus contextos OpenGL vivos a la vez**. La memoria y la GPU se agotaban poco a poco hasta que algo cedía.

## El arreglo

Un único reproductor por región, compartido por todos los vídeos de esa región. En cada transición solo se carga la nueva URI en el mismo pipeline. El primer vídeo de la región crea el reproductor y es su "propietario"; los siguientes lo reutilizan.

## Desplegar sin miedo

Antes de tocar producción preparé dos cosas: un **script de rollback probado** que devolvía el binario original en segundos y un **monitor de memoria** cada 5 minutos que escribía en un CSV. Primero validé en una VM con pantalla virtual (`Xvfb`) y después en la pantalla real.

## Resultado

| | Antes | Después |
|---|---|---|
| Memoria del reproductor | 12-14 GB | 42-48 MB, estable |
| Temperatura de CPU | 95-105 °C | 61-63 °C |

El fix acabó funcionando en tres equipos y la métrica de memoria se integró en Zabbix con un ítem propio por equipo.

## Lo que no salió bien

En un equipo con un layout de casi 200 vídeos apareció un crash periódico, cada hora más o menos. Probé a destruir el pipeline de forma síncrona (empeoró: bloqueaba el único hilo de la interfaz), a diferir la liberación al siguiente ciclo del bucle de eventos y a forzar la decodificación por software. Ninguna de las tres cosas lo resolvió. Como el reinicio automático lo recuperaba en segundos, se aceptó como problema conocido de bajo impacto. Saber cuándo dejar de cavar también forma parte del trabajo.

## Lo que me llevo

- Contener primero, investigar después.
- Que un proyecto esté archivado no significa que no se pueda arreglar: el código está ahí.
- Ningún despliegue sin rollback probado y sin una métrica que diga si ha funcionado.
- Documentar también los intentos fallidos: ahorran horas a quien venga detrás.

*Caso real contado sin datos del entorno.*
