---
title: "Respuesta a incidente: un webshell en WordPress y los dos que nadie había visto"
description: 'El proveedor de hosting avisó de un ataque. El plugin malicioso estaba ahí, pero lo importante fue lo que apareció al seguir buscando: dos compromisos de hacía años.'
pubDate: 2026-10-09
lang: 'es'
category: 'Blue Team'
accent: 'blue'
tags: ['Respuesta a incidentes', 'WordPress', 'Webshell', 'Forense', 'Linux']
translationKey: 'webshell-wordpress'
---

Un proveedor de hosting compartido avisó de actividad maliciosa en una web corporativa con WordPress. No había SIEM ni EDR: solo SSH al alojamiento, los ficheros y un aviso del proveedor.

## 1. Identificar

El aviso apuntaba a un plugin con nombre de herramienta de optimización. Dentro, un único fichero PHP que no optimizaba nada: un **webshell**, una puerta trasera que permite ejecutar comandos en el servidor desde el navegador. Un plugin legítimo trae varios ficheros, un `readme.txt` y aparece en el repositorio oficial de WordPress. Este no cumplía nada de eso.

## 2. Contener sin destruir pruebas

La tentación es borrarlo y cerrar el ticket. Pero lo que borras ya no lo puedes analizar. Antes de limpiar:

- Moví el fichero malicioso a una carpeta de evidencias **fuera del directorio público** de la web, conservando fechas y permisos.
- Anoté rutas, tamaños y fechas de modificación.

Así la web dejaba de servir el webshell y las pruebas seguían disponibles para analizarlas.

## 3. Buscar más allá del aviso

Este paso es el que más valor aportó. Un atacante que consigue entrar rara vez deja una sola puerta. Busqué ficheros PHP en sitios donde no deberían estar y patrones típicos de código ofuscado:

```bash
find wp-content -name "*.php" -newer wp-config.php
find wp-content/uploads -name "*.php"
grep -rlE "eval\(|base64_decode\(|gzinflate\(|str_rot13\(" wp-content
```

Aparecieron **dos focos más**:

- Otro webshell dentro de un plugin con nombre de caché, con un `.htaccess` preparado para ocultarlo.
- Un script de **cloaking SEO**, que muestra contenido distinto a los buscadores para posicionar enlaces de spam.

Los dos tenían fecha de modificación de **2021**. No tenían relación con el aviso reciente: llevaban años ahí sin que nadie se enterara.

## 4. Erradicar y endurecer

- Eliminación de los tres focos, con copia en evidencias.
- Rotación de contraseñas de administradores de WordPress, base de datos y acceso al hosting.
- Revisión de usuarios administradores y de plugins instalados frente a los que de verdad se usan.
- Actualización del núcleo, el tema y los plugins.

## Lo que me llevo

- **El aviso es el punto de partida, no el alcance del incidente.** Si solo hubiera limpiado lo que señalaba el proveedor, dos puertas traseras seguirían abiertas.
- Conservar las evidencias antes de limpiar, siempre.
- La fecha de modificación de un fichero es una pista, no una prueba: se puede falsificar. Aun así, aquí ayudó a separar dos incidentes distintos.
- Una web que nadie monitoriza puede estar comprometida durante años. La integridad de ficheros (FIM), por ejemplo con Wazuh, lo habría detectado el primer día.

*Caso real contado sin datos del entorno.*
