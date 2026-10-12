---
title: "Respuesta a incidente: un webshell en WordPress y los dos que nadie había visto"
description: 'El hosting avisó de un ataque y el plugin malicioso estaba donde decían. Lo interesante vino al seguir buscando: dos puertas traseras más, de hacía años.'
pubDate: 2026-10-09
lang: 'es'
category: 'Blue Team'
accent: 'blue'
tags: ['Respuesta a incidentes', 'WordPress', 'Webshell', 'Forense', 'Linux']
translationKey: 'webshell-wordpress'
---

El proveedor de hosting mandó un aviso de actividad maliciosa en una web corporativa con WordPress. Aquí no había SIEM ni EDR ni nada parecido: tenía acceso SSH al alojamiento, los ficheros y el correo del proveedor. Con eso había que trabajar.

## El plugin que no optimizaba nada

El aviso apuntaba a un plugin con nombre de herramienta de optimización. Entré y dentro solo había un fichero PHP. Un plugin normal trae varios ficheros, su `readme.txt` y aparece en el repositorio oficial de WordPress, y este no tenía nada de eso. Era un **webshell**, una puerta trasera para ejecutar comandos en el servidor desde el navegador.

Lo que te pide el cuerpo en ese momento es borrarlo y cerrar el ticket. Pero lo que borras ya no lo puedes analizar, así que primero lo moví a una carpeta de evidencias **fuera del directorio público** de la web, manteniendo fechas y permisos, y me apunté rutas, tamaños y fechas de modificación. La web dejaba de servir el webshell y yo seguía teniendo las pruebas.

## Seguir buscando

Esta es la parte que de verdad marcó la diferencia. Quien consigue entrar casi nunca deja una sola puerta, así que me puse a buscar ficheros PHP donde no deberían estar y los patrones típicos de código ofuscado:

```bash
find wp-content -name "*.php" -newer wp-config.php
find wp-content/uploads -name "*.php"
grep -rlE "eval\(|base64_decode\(|gzinflate\(|str_rot13\(" wp-content
```

Y salieron **dos más**. Uno era otro webshell metido en un plugin con nombre de caché, con un `.htaccess` preparado para esconderlo. El otro, un script de cloaking SEO, que enseña a Google un contenido distinto del real para colar enlaces de spam.

Lo que me dejó frío fue la fecha: los dos eran de **2021**. No tenían nada que ver con el aviso. Llevaban años ahí sin que nadie se enterase.

## Limpiar y cerrar

Eliminé los tres (guardando copia en evidencias), cambié las contraseñas de los administradores de WordPress, de la base de datos y del acceso al hosting, revisé qué usuarios eran administradores y qué plugins se usaban de verdad, y actualicé el núcleo, el tema y los plugins.

## Lo que aprendí

Que **el aviso es por dónde empiezas, no hasta dónde llega el incidente**. Si me hubiera quedado solo con lo que decía el proveedor, hoy seguiría habiendo dos puertas traseras abiertas. Que las evidencias se guardan antes de limpiar, siempre. Que la fecha de modificación de un fichero es una pista y no una prueba, porque se puede falsificar, aunque aquí me sirvió para separar dos incidentes. Y que una web que nadie vigila puede pasarse años comprometida. Con monitorización de integridad de ficheros, con Wazuh por ejemplo, se habría visto el primer día.

*Caso real contado sin datos del entorno.*
