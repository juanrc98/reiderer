---
title: "The screen that ate 14 GB of RAM: debugging Xibo Player in C++"
description: 'A digital signage screen that degraded every few hours. The cause was in the player code: a new video pipeline for every video, never released.'
pubDate: 2026-10-11
lang: 'en'
category: 'Systems'
accent: 'blue'
tags: ['Linux', 'C++', 'GStreamer', 'Xibo', 'Troubleshooting']
translationKey: 'xibo-memory'
---

A digital signage screen running Xibo Player on Linux worked fine after boot and, a few hours later, went black. Meanwhile the player process grew to **12-14 GB of memory** and the mini PC's CPU sat at **95-105 °C** all day, right at its thermal limit.

## Contain first

Before investigating anything, the screen had to keep working. The player was moved to a `systemd --user` service with automatic restart, and a small memory watchdog restarted it above a threshold. That's not a fix, it's a tourniquet: it buys time to find the real cause without anyone staring at a black screen.

## Read the code

Xibo's Linux client is open source (C++, GTK and GStreamer) and the project has been archived for years, so no official patch was coming. Just rebuilding it on Ubuntu 24.04 was a job in itself: dependencies dropped by every distribution, an exact Boost version pinned, API changes in `fmt`, `sqlite_orm` and Boost.Beast, and a CMake `find_path` that mistook the `/usr/bin/date` binary for a header directory.

With the binary building, I read how a layout is put together:

- When a region loads, the player created **all** of its items at once.
- For every video, the factory built its own `GstMediaPlayer`: a full GStreamer pipeline with its own OpenGL context.
- When a video finished, only `stop()` was called. The object was never destroyed or removed from the widget tree.

With 86 videos in the layout, there were **86 pipelines with their OpenGL contexts alive at the same time**. Memory and GPU drained little by little until something gave.

## The fix

A single player per region, shared by every video in that region. On each transition, only the new URI is loaded into the same pipeline. The region's first video creates the player and "owns" it; the rest reuse it.

## Deploy without fear

Before touching production I prepared two things: a **tested rollback script** that restored the original binary in seconds, and a **memory monitor** every 5 minutes writing to a CSV. I validated first in a VM with a virtual display (`Xvfb`) and then on the real screen.

## Result

| | Before | After |
|---|---|---|
| Player memory | 12-14 GB | 42-48 MB, stable |
| CPU temperature | 95-105 °C | 61-63 °C |

The fix ended up running on three devices, and the memory metric was wired into Zabbix with a custom item per device.

## What didn't work

On a device with a layout of almost 200 videos, a periodic crash showed up, roughly once an hour. I tried destroying the pipeline synchronously (worse: it blocked the only UI thread), deferring the release to the next event loop iteration, and forcing software decoding. None of the three fixed it. Since the automatic restart recovered it in seconds, it was accepted as a known, low-impact issue. Knowing when to stop digging is part of the job too.

## Takeaways

- Contain first, investigate later.
- An archived project doesn't mean it can't be fixed: the code is right there.
- No deployment without a tested rollback and a metric that tells you whether it worked.
- Document the failed attempts too: they save hours for whoever comes next.

*Real case told without environment data.*
