---
title: "La pantalla que se comía 14 GB de RAM: depurando Xibo Player en C++"
description: 'Una pantalla de cartelería digital que se quedaba en negro cada pocas horas. Acabé leyendo el código en C++ del reproductor y la causa estaba ahí: un pipeline de vídeo por cada vídeo, y ninguno se liberaba.'
pubDate: 2026-10-11
lang: 'es'
category: 'Sistemas'
accent: 'blue'
tags: ['Linux', 'C++', 'GStreamer', 'Xibo', 'Troubleshooting']
translationKey: 'xibo-memory'
---

Teníamos una pantalla de cartelería digital con Xibo Player sobre Linux que al arrancar iba bien y, a las pocas horas, se quedaba en negro. Cuando me puse a mirarla, el proceso del reproductor estaba en **12-14 GB de memoria** y la CPU del mini PC se pasaba el día entre **95 y 105 °C**, prácticamente en el límite térmico. Eso no iba a acabar bien.

Lo primero fue que la pantalla siguiera funcionando mientras investigaba. Pasé el reproductor a un servicio de `systemd --user` con reinicio automático y le puse un vigilante de memoria que lo reiniciaba al pasar de cierto umbral. Eso no arregla nada, es un parche para ganar tiempo, pero me dejaba buscar la causa sin que nadie se quedara mirando una pantalla negra.

## Meterse en el código

El cliente de Xibo para Linux es de código abierto (C++, GTK y GStreamer) y el proyecto lleva años archivado, así que de arriba no iba a llegar ningún parche. Si quería arreglarlo, tenía que hacerlo yo.

Solo conseguir que compilara en Ubuntu 24.04 ya fue una aventura: dependencias que ya no existen en ninguna distribución, una versión exacta de Boost que nadie distribuye, cambios de API en `fmt`, `sqlite_orm` y Boost.Beast... y mi favorito, un `find_path` de CMake que buscaba la cabecera `date` y encontraba el binario `/usr/bin/date`. El error que soltaba el compilador no tenía nada que ver con eso. Me costó lo mío.

Con el binario compilando ya pude leer con calma cómo montaba un layout, y ahí estaba:

- Al cargar una región, creaba todos sus elementos de golpe.
- Por cada vídeo construía su propio `GstMediaPlayer`, es decir, un pipeline completo de GStreamer con su contexto OpenGL.
- Cuando un vídeo terminaba, solo llamaba a `stop()`. El objeto no se destruía nunca.

El layout tenía 86 vídeos, así que había **86 pipelines con sus contextos OpenGL vivos a la vez**. La memoria y la GPU se iban agotando poco a poco hasta que algo reventaba.

## El arreglo

Cambié la arquitectura para que haya un solo reproductor por región, compartido entre todos sus vídeos. En cada cambio de vídeo solo se carga la nueva URI en el mismo pipeline. El primer vídeo de la región crea el reproductor y los demás lo reutilizan.

Antes de tocar la pantalla de verdad me dejé dos cosas preparadas: un script de rollback probado que devolvía el binario original en segundos y un monitor que apuntaba la memoria cada 5 minutos en un CSV. Lo probé primero en una VM con pantalla virtual (`Xvfb`) y después ya en la pantalla real.

| | Antes | Después |
|---|---|---|
| Memoria del reproductor | 12-14 GB | 42-48 MB, estable |
| Temperatura de CPU | 95-105 °C | 61-63 °C |

Al final el fix acabó funcionando en tres equipos, y la memoria de cada uno quedó metida en Zabbix con un ítem propio.

## Lo que no conseguí arreglar

En un equipo con un layout de casi 200 vídeos apareció un crash más o menos cada hora. Probé a destruir el pipeline de forma síncrona y fue peor, porque bloqueaba el único hilo de la interfaz. Probé a retrasar la liberación al siguiente ciclo del bucle de eventos y tampoco. Probé a forzar la decodificación por software por si era cosa del driver, y nada. Como el reinicio automático lo levantaba en segundos y apenas se notaba, decidimos dejarlo como problema conocido y de bajo impacto. Me costó soltarlo, la verdad, pero llega un punto en que seguir cavando ya no compensa.

Me quedo con varias cosas. Primero contener y luego investigar. Que un proyecto esté archivado no significa que no se pueda arreglar, el código sigue ahí. Nada a producción sin un rollback probado y sin una métrica que te diga si ha funcionado. Y apuntar también lo que falla, porque a quien venga detrás le ahorras horas.

*Caso real contado sin datos del entorno.*
