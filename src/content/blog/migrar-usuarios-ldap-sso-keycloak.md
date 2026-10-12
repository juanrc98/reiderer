---
title: "Migrar 3.600 usuarios de LDAP a SSO sin dejar a nadie fuera"
description: 'Pasar una plataforma de formación de LDAP a Keycloak con OpenID Connect. Configurar el SSO fue lo de menos; lo que me dio guerra fue todo lo que había alrededor.'
pubDate: 2026-10-08
lang: 'es'
category: 'Sistemas'
accent: 'blue'
tags: ['Keycloak', 'OIDC', 'Active Directory', 'Moodle', 'IAM']
translationKey: 'ldap-sso'
---

Me tocó pasar un Moodle con **3.614 usuarios**, que autenticaba contra Active Directory por LDAP, a inicio de sesión único con Keycloak (OpenID Connect). La condición era que nadie perdiera su cuenta, su historial ni sus cursos. Sobre el papel parece sencillo. En la práctica, configurar el SSO fue lo de menos.

## Que no se duplique nadie

Lo que más miedo me daba era que, al entrar por SSO, Moodle no reconociera al usuario y le creara una cuenta nueva y vacía. El alumno entra, ve cero cursos y abre una incidencia. Multiplica eso por 3.600 y ya te imaginas.

Para evitarlo vinculé Keycloak y Moodle por `preferred_username`, que coincide con el usuario que ya había en LDAP, y después cambié en bloque el método de autenticación de las 3.614 cuentas de `ldap` a `oidc`.

## Siempre una puerta de emergencia

Si el SSO se cae, no entra nadie, y eso incluye al administrador. Así que antes de tocar nada dejé una cuenta de administrador local, con autenticación manual, que no depende de Keycloak, y comprobé que el login clásico seguía accesible con `?noredirect=1` aunque la redirección al SSO estuviera activada. Las dos cosas las probé antes del cambio. El día que te hacen falta no es momento de descubrir que no funcionan.

## Lo que no venía en ninguna guía

El login fallaba sin dar un error claro y tardé en ver por qué: Moodle tiene un cortafuegos interno que por defecto bloquea las peticiones a rangos privados como `10.0.0.0/8`, que es justo donde estaban Keycloak y LDAP.

El acceso estaba limitado a un grupo de AD que, en vez de usuarios, contenía otros grupos. Un filtro `memberOf` normal no ve a los usuarios de los subgrupos, así que hubo que usar la regla de coincidencia recursiva de Active Directory, ese OID tan bonito que nadie se aprende:

```
(memberOf:1.2.840.113556.1.4.1941:=CN=App-Usuarios,OU=Grupos,DC=lab,DC=local)
```

La sincronización periódica con LDAP seguía dando de alta a los usuarios nuevos con autenticación `ldap`, así que metí un script en el cron que los pasa a `oidc` solo.

Y ese script no se ejecutaba nunca, porque en Moodle 5.x `admin/cli/cron.php` se queda esperando y no devuelve el control. Todo lo que iba detrás no llegaba a ejecutarse. Lo solucioné lanzándolo en paralelo.

## El incidente que no era culpa del SSO

Después del cambio, un usuario no podía entrar ni a Moodle ni a otro portal interno. Todo apuntaba al SSO, que era lo último que habíamos tocado. Pues no: su portátil estaba conectado a la **WiFi de invitados**, sin acceso a las redes internas. Antes de echarle la culpa al último cambio, conviene mirar lo básico.

Lo bueno es que tres de estos problemas salieron en el entorno de pruebas, con una copia real de los datos, y no en producción. Ese entorno me ahorró más de un disgusto. Al final, en una migración de identidad el éxito no se mide en lo que funciona, sino en las cuentas que **no** se duplicaron.

*Caso real contado sin datos del entorno. He cambiado los nombres de grupos y dominios.*
