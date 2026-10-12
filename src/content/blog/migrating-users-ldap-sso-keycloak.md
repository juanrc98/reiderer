---
title: "Migrating 3,600 users from LDAP to SSO without locking anyone out"
description: 'Moving a training platform from LDAP authentication to Keycloak with OpenID Connect. The hard part wasn’t configuring SSO, it was everything around it.'
pubDate: 2026-10-08
lang: 'en'
category: 'Systems'
accent: 'blue'
tags: ['Keycloak', 'OIDC', 'Active Directory', 'Moodle', 'IAM']
translationKey: 'ldap-sso'
---

A Moodle platform with **3,614 users** authenticated against Active Directory over LDAP. The goal was to move it to single sign-on with Keycloak (OpenID Connect) without any user losing their account, history or courses.

## The golden rule: don't create new accounts

The biggest risk in an SSO migration is the system not recognizing a returning user and creating a brand-new, empty account. The student logs in, sees zero courses and opens a ticket. To avoid that, Keycloak and Moodle were linked on `preferred_username`, which matches the username that already existed in LDAP. Then came a bulk switch of the authentication method from `ldap` to `oidc` on all 3,614 accounts.

## Always an emergency door

If SSO fails, nobody can get in, the admin included. So:

- A local admin account (manual authentication) that doesn't depend on Keycloak.
- Access to the classic login form with `?noredirect=1`, even with automatic SSO redirect enabled.

Both were tested before the switch, not on the day they were needed.

## Problems the guide doesn't mention

- **Moodle's internal firewall.** By default Moodle blocks requests to private ranges such as `10.0.0.0/8`, exactly where Keycloak and LDAP lived. Login failed with no clear error until that list was reviewed.
- **Nested groups in AD.** Access was limited to a group that contained other groups, not users. A plain `memberOf` filter doesn't see users in subgroups. You need Active Directory's recursive matching rule:

  ```
  (memberOf:1.2.840.113556.1.4.1941:=CN=App-Users,OU=Groups,DC=lab,DC=local)
  ```

- **New users.** The periodic LDAP sync kept creating new accounts with `ldap` authentication. A script in the cron job switches them to `oidc` automatically.
- **The cron that never ends.** In Moodle 5.x, `admin/cli/cron.php` keeps waiting and never returns, so any task chained after it never ran. Running the fix in parallel solved it.

## The incident that wasn't SSO's fault

After the switch, one user couldn't log in to Moodle or another internal portal. Everything pointed at SSO. The real cause: their laptop was on the **guest WiFi**, with no access to the internal subnets. Before blaming the latest change, check the basics.

## Takeaways

- In an identity migration, success is measured in accounts that did **not** get duplicated.
- Test the emergency door before you need it.
- Validate in a test environment with a real copy of the data: three of these problems showed up there, not in production.
- Not everything that breaks after a change was caused by the change.

*Real case told without environment data: group and domain names changed.*
