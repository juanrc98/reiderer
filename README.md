# reiderer

Web personal de Juan Rodríguez Castellano — Sistemas, Cloud y Ciberseguridad.
Hecha con [Astro](https://astro.build): rápida, estática y bilingüe (ES/EN), con un blog en Markdown.

## Arrancar en local

Necesitas Node 18+ instalado.

```bash
npm install      # solo la primera vez
npm run dev      # arranca en http://localhost:4321
```

Para generar la versión final (carpeta `dist/`):

```bash
npm run build
npm run preview  # previsualiza el build
```

## Estructura

```
src/
  content/blog/        ← tus entradas del blog (.md)  ← AQUÍ ESCRIBES
  i18n/content.ts      ← todos los textos de la home, en ES y EN
  styles/global.css    ← el diseño (colores, tipografías)
  components/Home.astro
  layouts/Layout.astro
  pages/               ← rutas (no hace falta tocar)
public/
  favicon.svg          ← el logo de reiderer
  (pon aquí tu foto, p. ej. profile.jpg)
```

## Cómo subir una entrada al blog

Crea un archivo `.md` nuevo dentro de `src/content/blog/`. El nombre del archivo
es la URL (sin espacios ni acentos). Copia esta cabecera y escribe debajo en Markdown:

```markdown
---
title: 'Título de la entrada'
description: 'Una frase para la tarjeta y el SEO.'
pubDate: 2026-06-08
lang: 'es'          # 'es' o 'en'
category: 'Blue Team'
accent: 'blue'      # blue (defensa/sistemas) · red (ofensiva) · neutral
tags: ['Wazuh', 'SIEM']
---

Aquí va el contenido en **Markdown**: títulos, listas, `código`, enlaces, etc.
```

- Para la versión en inglés, crea otro archivo con `lang: 'en'`.
- Aparece automáticamente en la home (últimas 4) y en `/blog` (o `/en/blog`).

## Cambiar los textos de la home

Todo está en `src/i18n/content.ts`, separado en `es` y `en`. Edita ahí y se actualiza solo.
La foto: pon tu imagen en `public/` y cámbiala en `src/components/Home.astro` (el bloque `.hp-photo`).

## Desplegar con tu dominio (reiderer.com)

### Opción A — Vercel (recomendada, como hace plasysx.com)
1. Sube el proyecto a un repo de GitHub.
2. En vercel.com, *Add New Project* → importa el repo (Vercel detecta Astro solo).
3. En *Settings → Domains*, añade `reiderer.com` y sigue los registros DNS que te indique.

### Opción B — GitHub Pages
1. Pon `site: 'https://reiderer.com'` en `astro.config.mjs` (ya está).
2. Sube `dist/` o usa la GitHub Action oficial de Astro.
3. *Settings → Pages → Custom domain* → `reiderer.com` y configura el DNS
   (4 registros A a las IPs de GitHub + un CNAME `www` → tu-usuario.github.io).

El dominio es portable: si cambias de hosting, solo reapuntas el DNS.

## Notas

- El selector de idioma (ES/EN) está en la barra superior.
- Los colores de marca están en `:root` dentro de `global.css` (`--blue` y `--red`).
- Es 100% estático: carga muy rápido y casi sin JavaScript.
