---
title: "Migrar 3.600 usuarios de LDAP a SSO sin dejar a nadie fuera"
description: 'Pasar una plataforma de formación de autenticación LDAP a Keycloak con OpenID Connect. Lo difícil no fue configurar el SSO, sino todo lo que lo rodea.'
pubDate: 2026-10-08
lang: 'es'
category: 'Sistemas'
accent: 'blue'
tags: ['Keycloak', 'OIDC', 'Active Directory', 'Moodle', 'IAM']
translationKey: 'ldap-sso'
---

Una plataforma Moodle con **3.614 usuarios** autenticaba contra Active Directory por LDAP. El objetivo era pasarla a inicio de sesión único con Keycloak (OpenID Connect) sin que ningún usuario perdiera su cuenta, su historial ni sus cursos.

## La regla de oro: no crear cuentas nuevas

El mayor riesgo de una migración a SSO es que el sistema no reconozca al usuario que vuelve y le cree una cuenta nueva y vacía. El alumno entra, ve cero cursos y abre una incidencia. Para evitarlo, la vinculación entre Keycloak y Moodle se hizo por `preferred_username`, que coincide con el usuario que ya existía en LDAP. Después, un cambio masivo de método de autenticación de `ldap` a `oidc` en las 3.614 cuentas.

## Siempre una puerta de emergencia

Si el SSO falla, nadie puede entrar, tampoco el administrador. Por eso:

- Una cuenta de administrador local (autenticación manual) que no depende de Keycloak.
- El acceso al formulario de login clásico con `?noredirect=1` aunque la redirección automática al SSO esté activada.

Las dos cosas se probaron antes del cambio, no el día que hicieron falta.

## Los problemas que no salen en la guía

- **El cortafuegos interno de Moodle.** Moodle bloquea por defecto las peticiones a rangos privados como `10.0.0.0/8`, justo donde vivían Keycloak y LDAP. El login fallaba sin un error claro hasta que se revisó esa lista.
- **Grupos anidados en AD.** El acceso estaba limitado a un grupo que contenía otros grupos, no usuarios. Un filtro `memberOf` normal no ve los usuarios de los subgrupos. Hace falta la regla de coincidencia recursiva de Active Directory:

  ```
  (memberOf:1.2.840.113556.1.4.1941:=CN=App-Usuarios,OU=Grupos,DC=lab,DC=local)
  ```

- **Los usuarios nuevos.** La sincronización periódica desde LDAP seguía creando las altas nuevas con autenticación `ldap`. Un script en el cron las corrige automáticamente a `oidc`.
- **El cron que no termina.** En Moodle 5.x, `admin/cli/cron.php` se queda en espera continua y no devuelve el control, así que cualquier tarea encadenada detrás nunca se ejecutaba. Se resolvió lanzando la corrección en paralelo.

## El incidente que no era del SSO

Tras el cambio, un usuario no podía entrar ni a Moodle ni a otro portal interno. Todo apuntaba al SSO. La causa real: su portátil estaba conectado a la **red WiFi de invitados**, sin acceso a las subredes internas. Antes de culpar al último cambio, conviene comprobar lo básico.

## Lo que me llevo

- En una migración de identidad, el éxito se mide en cuentas que **no** se duplicaron.
- Probar la vía de emergencia antes de necesitarla.
- Validar en un entorno de pruebas con una copia real de datos: tres de estos problemas aparecieron ahí y no en producción.
- No todo lo que falla después de un cambio lo ha causado el cambio.

*Caso real contado sin datos del entorno: nombres de grupos y dominios cambiados.*
