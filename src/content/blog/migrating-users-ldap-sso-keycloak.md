---
title: "Migrating 3,600 users from LDAP to SSO without locking anyone out"
description: 'Moving a training platform from LDAP to Keycloak with OpenID Connect. Setting up SSO was the easy bit; what gave me trouble was everything around it.'
pubDate: 2026-10-08
lang: 'en'
category: 'Systems'
accent: 'blue'
tags: ['Keycloak', 'OIDC', 'Active Directory', 'Moodle', 'IAM']
translationKey: 'ldap-sso'
---

I had to move a Moodle with **3,614 users**, authenticating against Active Directory over LDAP, to single sign-on with Keycloak (OpenID Connect). The condition was that nobody lost their account, history or courses. On paper it looks simple. In practice, setting up SSO was the least of it.

## Nobody gets duplicated

What scared me most was Moodle not recognizing a user coming in through SSO and creating a brand-new, empty account. The student logs in, sees zero courses and opens a ticket. Multiply that by 3,600 and you get the picture.

To avoid it I linked Keycloak and Moodle on `preferred_username`, which matches the username already in LDAP, and then bulk-switched the authentication method on all 3,614 accounts from `ldap` to `oidc`.

## Always an emergency door

If SSO goes down, nobody gets in, and that includes the admin. So before touching anything I left a local admin account, with manual authentication, that doesn't depend on Keycloak, and checked that the classic login was still reachable with `?noredirect=1` even with the SSO redirect on. I tested both before the switch. The day you need them is not the day to find out they don't work.

## What no guide mentioned

Login was failing without a clear error, and it took me a while to see why: Moodle has an internal firewall that by default blocks requests to private ranges like `10.0.0.0/8`, which is exactly where Keycloak and LDAP lived.

Access was limited to an AD group that, instead of users, contained other groups. A plain `memberOf` filter doesn't see users in subgroups, so I had to use Active Directory's recursive matching rule, that lovely OID nobody ever memorizes:

```
(memberOf:1.2.840.113556.1.4.1941:=CN=App-Users,OU=Groups,DC=lab,DC=local)
```

The periodic LDAP sync kept creating new users with `ldap` authentication, so I added a script to the cron job that switches them to `oidc` automatically.

And that script never ran, because in Moodle 5.x `admin/cli/cron.php` keeps waiting and never returns. Nothing chained after it ever got executed. I solved it by running it in parallel.

## The incident that wasn't SSO's fault

After the switch, one user couldn't get into Moodle or another internal portal. Everything pointed at SSO, the last thing we'd touched. Nope: their laptop was on the **guest WiFi**, with no access to the internal networks. Before blaming the latest change, check the basics.

The good news is that three of these problems showed up in the test environment, with a real copy of the data, and not in production. That environment saved me more than one headache. In the end, in an identity migration success isn't measured by what works, but by the accounts that did **not** get duplicated.

*Real case told without environment data. Group and domain names have been changed.*
