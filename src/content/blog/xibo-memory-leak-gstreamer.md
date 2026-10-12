---
title: "The screen that ate 14 GB of RAM: debugging Xibo Player in C++"
description: 'A digital signage screen that went black every few hours. I ended up reading the player’s C++ code, and there it was: one video pipeline per video, and none of them ever freed.'
pubDate: 2026-10-11
lang: 'en'
category: 'Systems'
accent: 'blue'
tags: ['Linux', 'C++', 'GStreamer', 'Xibo', 'Troubleshooting']
translationKey: 'xibo-memory'
---

We had a digital signage screen running Xibo Player on Linux that was fine after boot and, a few hours later, went black. When I looked into it, the player process was sitting at **12-14 GB of memory** and the mini PC's CPU spent all day between **95 and 105 °C**, right at its thermal limit. That wasn't going to end well.

First thing was keeping the screen working while I investigated. I moved the player to a `systemd --user` service with automatic restart and added a memory watchdog that restarted it above a threshold. That doesn't fix anything, it just buys time, but it let me hunt for the cause without anyone staring at a black screen.

## Into the code

Xibo's Linux client is open source (C++, GTK and GStreamer) and the project has been archived for years, so no patch was coming from upstream. If I wanted it fixed, I had to do it myself.

Just getting it to build on Ubuntu 24.04 was an adventure: dependencies that no distribution ships anymore, an exact Boost version nobody packages, API changes in `fmt`, `sqlite_orm` and Boost.Beast... and my favourite, a CMake `find_path` looking for the `date` header that found the `/usr/bin/date` binary instead. The compiler error it threw had nothing to do with that. It took me a while.

With the binary building I could finally read how it put a layout together, and there it was:

- When a region loaded, it created all of its items at once.
- For every video it built its own `GstMediaPlayer`, meaning a full GStreamer pipeline with its own OpenGL context.
- When a video finished, it only called `stop()`. The object was never destroyed.

The layout had 86 videos, so there were **86 pipelines with their OpenGL contexts alive at the same time**. Memory and GPU drained bit by bit until something blew.

## The fix

I changed the architecture so there's a single player per region, shared by all its videos. On each video change, only the new URI gets loaded into the same pipeline. The region's first video creates the player and the rest reuse it.

Before touching the real screen I had two things ready: a tested rollback script that restored the original binary in seconds, and a monitor logging memory every 5 minutes to a CSV. I tested first in a VM with a virtual display (`Xvfb`) and then on the real screen.

| | Before | After |
|---|---|---|
| Player memory | 12-14 GB | 42-48 MB, stable |
| CPU temperature | 95-105 °C | 61-63 °C |

In the end the fix ran on three machines, and each one's memory went into Zabbix with its own item.

## What I couldn't fix

On a machine with a layout of almost 200 videos, a crash showed up roughly once an hour. I tried destroying the pipeline synchronously and it got worse, because it blocked the only UI thread. I tried deferring the release to the next event loop iteration, no luck. I tried forcing software decoding in case it was the driver, nothing. Since the automatic restart brought it back in seconds and you barely noticed, we left it as a known, low-impact issue. Letting it go was hard, honestly, but there's a point where digging further just isn't worth it.

A few things I'm keeping. Contain first, investigate later. An archived project doesn't mean it can't be fixed, the code is still there. Nothing goes to production without a tested rollback and a metric that tells you whether it worked. And write down what fails too, because you save whoever comes next a lot of hours.

*Real case told without environment data.*
