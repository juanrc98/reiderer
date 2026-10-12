// Todo el contenido editable del sitio, en español e inglés.
// Cambia aquí los textos y se reflejan en ambas versiones.

export type Lang = 'es' | 'en';

export const content = {
  es: {
    locale: 'es',
    meta: {
      title: 'reiderer · Juan Rodríguez Castellano',
      description:
        'Juan Rodríguez Castellano — administración de sistemas Microsoft y análisis de ciberseguridad (Blue Team). Casos reales, laboratorios documentados y bitácora técnica.',
    },
    nav: {
      about: 'Sobre mí',
      projects: 'Proyectos',
      blog: 'Blog',
      experience: 'Trayectoria',
      certs: 'Certificaciones',
      contact: 'Contacto',
    },
    hero: {
      pill: 'Sistemas Microsoft · Blue Team',
      eyebrow: 'reiderer',
      h1pre: 'Hola, soy ',
      h1em: 'Juan Rodríguez',
      role: 'Administrador de sistemas · Analista de ciberseguridad',
      roleAccent: '· AD · Microsoft 365 · Wazuh · SIEM',
      sub: 'Me dedico a que los entornos Microsoft funcionen y estén seguros: Active Directory, GPO, Entra ID, Intune y Microsoft 365. Y la otra mitad de mi tiempo la paso del lado de la detección, con SIEM, vulnerabilidades y respuesta. Aquí cuento lo que monto y lo que me encuentro por el camino.',
      tags: ['Active Directory · GPO', 'Entra ID · Intune', 'Wazuh · Sentinel', 'Gestión de vulnerabilidades', 'PowerShell · Python'],
      ctaProjects: 'Ver casos y proyectos →',
      ctaBlog: 'Leer el blog',
      ctaGithub: 'GitHub',
      photoNote: 'Sustituye por tu foto<br>(pon tu imagen en /public)',
      location: 'Córdoba, Andalucía · ES',
    },
    metrics: {
      label: 'en cifras',
      items: [
        { n: '~1.000', l: 'endpoints Windows administrados en AD con GPO y Wazuh' },
        { n: '144', l: 'vulnerabilidades High cerradas en 3 h con un piloto de GPO' },
        { n: '3.600+', l: 'usuarios migrados a SSO con Keycloak (OIDC)' },
        { n: '230+', l: 'equipos desplegados con Autopilot e Intune' },
      ],
    },
    about: {
      tag: 'identidad',
      title: 'Sobre ',
      titleEm: 'mí',
      paragraphs: [
        'Soy Juan, <strong>administrador de sistemas</strong> con un pie metido en la <strong>ciberseguridad defensiva</strong>. Vengo de ASIR y donde más cómodo me siento es en el mundo Microsoft: Active Directory, GPO, Entra ID, Intune y Microsoft 365.',
        'Empecé triando alertas en un <strong>SOC 24/7</strong> y más tarde me tocó llevar la seguridad de un dominio de unos mil equipos con Wazuh, GLPI y GPO. De esa etapa me quedó algo claro: una alerta vale poco si no acaba en algo concreto, ya sea un parche desplegado, un ticket con alguien detrás o una regla que por fin deja de hacer ruido.',
        '<b>reiderer</b> es mi cuaderno de bitácora. Aquí monto laboratorios lo más parecidos posible a un entorno real y apunto lo que aprendo. Ahora mismo estoy con <b>BTL1</b>, que es blue team muy práctico (phishing, forense, SIEM, respuesta a incidentes), y en paralelo le tengo echado el ojo a <i>eCPPT</i>. Un 30% de su examen es atacar Active Directory, y me apetece mucho ver desde el otro lado lo que llevo tiempo defendiendo.',
        'Y si algo tengo claro es que esto no va de acumular herramientas ni dashboards. Va de entender bien lo que tienes delante y saber <strong>distinguir lo importante del ruido</strong>.',
      ],
      skills: ['Active Directory','GPO','Windows Server','Entra ID','Intune','Microsoft 365','Wazuh','Microsoft Sentinel · KQL','GLPI','Keycloak · OIDC','Zabbix','PowerShell','Python','Linux','Docker','Proxmox','MITRE ATT&CK'],
    },
    projects: {
      tag: 'trabajo técnico',
      title: 'Casos & ',
      titleEm: 'Labs',
      lead: 'En cada tarjeta cuento qué problema había, qué hice y qué cambió. Los casos reales salen de trabajos en empresa y los cuento sin datos del cliente. Los labs son míos y tienen el código publicado.',
      problemLabel: 'Problema',
      resultLabel: 'Resultado',
      groups: [
        {
          accent: 'blue',
          title: 'CASOS REALES — sistemas y seguridad en producción',
          cards: [
            { label: 'Destacado', labelHot: true, title: 'Parcheo de navegadores en todo un dominio', problem: 'El SIEM detecta un CVE crítico de Chrome en buena parte del parque, sin un mecanismo central de actualización.', desc: 'Plantillas ADMX oficiales de Chrome y Firefox, GPO de auto-actualización con piloto por grupo de seguridad y despliegue después a todo el dominio.', result: '144 vulnerabilidades High cerradas en 3 horas durante el piloto.', tags: ['#GPO','#ADMX','#Wazuh','#VulnMgmt'], href: '/blog/parchear-navegadores-dominio-gpo', link: 'Leer el caso →' },
            { label: 'Caso real', title: 'Alertas de Wazuh convertidas en tickets', problem: 'Vulnerabilidades y hallazgos SCA se quedaban en el dashboard del SIEM sin dueño ni seguimiento.', desc: 'Integración en Python con la API REST de GLPI: cuenta de servicio de mínimo privilegio, deduplicación y una regla propia para detectar software no autorizado.', result: 'Alertas críticas, CVEs y fallos de SCA entran solos en la cola de soporte, sin duplicados.', tags: ['#Wazuh','#GLPI','#Python','#SOAR'], href: '/blog/alertas-wazuh-tickets-glpi', link: 'Leer el caso →' },
            { label: 'Caso real', title: 'SSO con Keycloak en GLPI y Moodle', problem: 'Cada aplicación interna con su propia contraseña y su propio ciclo de altas y bajas.', desc: 'Autenticación OIDC con PKCE contra Keycloak, sin creación automática de cuentas, tras revisar el código del plugin antes de instalarlo.', result: '3.600+ usuarios migrados en Moodle y SSO validado en tres instancias de GLPI.', tags: ['#Keycloak','#OIDC','#IAM','#Docker'] },
            { label: 'Caso real · código abierto', title: 'Fuga de memoria en Xibo Player', problem: 'Pantallas de cartelería digital que llegaban a 12-14 GB de RAM y a 100 °C de CPU hasta quedarse en negro.', desc: 'Recompilación del reproductor (C++, GTK, GStreamer) en Ubuntu 24.04 y cambio de arquitectura: un único pipeline de vídeo por región en vez de uno por vídeo, con rollback y monitorización en Zabbix.', result: 'Memoria estable en 42-48 MB y CPU de 95-105 °C a 61-63 °C en tres equipos.', tags: ['#C++','#GStreamer','#Linux','#Zabbix'], href: '/blog/xibo-fuga-memoria-gstreamer', link: 'Leer el caso →' },
            { label: 'Caso real', title: 'Despliegue de Microsoft 365 a escala', problem: 'Integración de una empresa en un grupo internacional con un parque Windows heterogéneo.', desc: 'Aprovisionamiento con Windows Autopilot, identidades en Entra ID y políticas de cumplimiento y seguridad de endpoint en Intune.', result: 'Más de 230 endpoints migrados a Microsoft 365.', tags: ['#Autopilot','#EntraID','#Intune','#M365'] },
          ],
        },
        {
          accent: 'blue',
          title: 'LABS BLUE TEAM — detección y respuesta',
          cards: [
            { label: 'Lab completo', title: 'Microsoft Sentinel SOC Lab', problem: '¿Cómo se detecta la persistencia en la identidad cloud antes de que se convierta en un incidente?', desc: 'SIEM en Azure con conector de Entra ID, reglas analíticas en KQL mapeadas a MITRE ATT&CK, workbook de amenazas de identidad y playbook de notificación con Logic Apps.', result: 'Detección de creación de cuentas (T1136.003) y asignación de roles (T1098.003) con incidente y respuesta automática.', tags: ['#Sentinel','#KQL','#Azure','#MITRE'], href: 'https://github.com/juanrc98/microsoft-sentinel-lab', link: 'Ver en GitHub →' },
            { label: 'Lab completo', title: 'Wazuh SIEM Lab', problem: '¿Qué ve realmente un SIEM cuando atacan un servidor vulnerable?', desc: 'Wazuh monitorizando Metasploitable3 con Kali como atacante: reglas XML propias, detección de técnicas ATT&CK e integración con VirusTotal.', result: '22 CVEs inventariados y priorizados por CVSS; ataques detectados y correlacionados.', tags: ['#Wazuh','#MITREATTACK','#VirusTotal'], href: 'https://github.com/juanrc98/wazuh-siem', link: 'Ver en GitHub →' },
          ],
        },
        {
          accent: 'blue',
          title: 'LABS DE SISTEMAS — infraestructura y automatización',
          cards: [
            { label: 'Herramienta', title: 'M365 Admin Toolkit', problem: 'Altas y bajas manuales en Microsoft 365: licencias olvidadas y sesiones que siguen vivas.', desc: 'Módulo de PowerShell sobre Microsoft Graph para el ciclo de vida de usuarios e informes de MFA, licencias y cuentas inactivas, con -WhatIf en todo lo que toca cuentas.', result: 'Tests con Pester y CI en GitHub Actions con PSScriptAnalyzer.', tags: ['#PowerShell','#MicrosoftGraph','#Pester'], href: 'https://github.com/juanrc98/M365-Admin-Toolkit', link: 'Ver en GitHub →' },
            { future: 'blue-f', label: 'En curso · fase 2 de 5', title: 'Infraestructura resiliente', problem: 'Cómputo, observabilidad y protección del dato rara vez se aprenden juntos.', desc: 'Homelab en Proxmox VE con OPNsense, Active Directory, Zabbix y copias con Veeam y Proxmox Backup Server, documentado por fases.', result: 'Hipervisor, firewall, dominio y DHCP operativos; falta el host Docker para cerrar la fase 2.', tags: ['#Proxmox','#OPNsense','#ActiveDirectory','#Zabbix'], href: 'https://github.com/juanrc98/infra-resiliente', link: 'Ver en GitHub →' },
            { label: 'Proyecto final ASIR · en equipo', title: 'Clúster de alta disponibilidad', problem: 'Un servicio web con base de datos que no puede caerse si cae un nodo.', desc: 'Pacemaker y Corosync sobre Debian, MariaDB con ProxySQL y monitorización con Prometheus y Grafana.', result: 'Failover automático entre nodos sin intervención manual.', tags: ['#Pacemaker','#Corosync','#HA','#Linux'], href: 'https://juanrc98.github.io/Proyecto-cluster.pdf', link: 'Ver documentación →' },
          ],
        },
        {
          accent: 'red',
          title: 'PURPLE — conocer el ataque para defender mejor',
          cards: [
            { red: true, label: 'Dificultad media', title: 'DarkHole: 1', desc: 'Enumeración web, inyección SQL y escalada de privilegios mediante binarios SUID, con análisis de servicios internos.', tags: ['#SQLi','#SUID','#PrivEsc'], href: 'https://juanrc98.github.io/write-up.pdf', link: 'Ver write-up →' },
            { red: true, label: 'Dificultad media', title: 'Psycho: 1', desc: 'Enumeración exhaustiva, explotación de LFI, análisis de logs y escalada de privilegios mediante scripts con permisos especiales.', tags: ['#LFI','#LogAnalysis','#PrivEsc'], href: 'https://juanrc98.github.io/write-up-2.pdf', link: 'Ver write-up →' },
            { future: 'red-f', red: true, label: 'Objetivo', title: 'Camino a eCPPT', desc: 'Pentesting de Active Directory, post-explotación y movimiento lateral. Atacar el tipo de entorno que administro para entender qué dejan ver mis logs y qué no.', tags: ['#ActiveDirectory','#eCPPT','#PurpleTeam'] },
          ],
        },
      ],
    },
    blogSection: {
      tag: 'bitácora',
      title: 'Blog',
      lead: 'reiderer es, sobre todo, una bitácora. Aquí subo lo que aprendo, lo que monto y lo que pienso sobre sistemas y seguridad.',
      readMore: 'Ver todas las entradas →',
      empty: 'Pronto, las primeras entradas.',
      read: 'Leer →',
      newer: '← Más recientes',
      older: 'Anteriores →',
    },
    method: {
      tag: 'método',
      title: 'Cómo ',
      titleEm: 'trabajo',
      lead: 'Da igual que esté montando un servidor o mirando una alerta, intento trabajar siempre igual. Primero entender, luego priorizar y dejarlo todo apuntado.',
      items: [
        { n: '01', h: 'Entender antes de tocar', p: 'Antes de lanzar nada me gusta saber qué expone el sistema, cómo está montado y qué hay alrededor.' },
        { n: '02', h: 'Pilotar antes de desplegar', p: 'Primero un grupo pequeño en el que pueda medir y, si va bien, el resto. Y si un cambio no se puede deshacer, no lo lanzo un viernes.' },
        { n: '03', h: 'Priorizar, no acumular', p: 'No me obsesiona tener más reglas ni más fuentes. Prefiero tener menos y entenderlas bien.' },
        { n: '04', h: 'De la alerta a la acción', p: 'Si nadie se encarga de una alerta, es ruido. Lo que me interesa es que termine en un ticket, en un parche o en una regla mejor afinada.' },
        { n: '05', h: 'Documentar el proceso', p: 'Lo dejo todo apuntado para que otro pueda revisarlo, repetirlo o entenderlo sin tener que preguntarme.' },
        { n: '06', h: 'Mínimo privilegio, también para mí', p: 'Cuentas de servicio con los permisos justos, contraseñas fuera del código y cada cambio con su rastro.' },
      ],
    },
    experience: {
      tag: 'trayectoria',
      title: 'Experiencia',
      items: [
        { when: 'ago. 2026 — sep. 2026 · Córdoba · Presencial', role: 'Administrador de Sistemas — Soporte N3', org: 'Magtel', desc: 'Administración de un dominio Active Directory de ~1.000 endpoints Windows con GPO y de la plataforma de seguridad (Wazuh, GLPI, Zabbix). Parcheo de navegadores por GPO/ADMX, integración Wazuh → GLPI para tickets automáticos de vulnerabilidades y SCA, SSO con Keycloak (OIDC) en GLPI y Moodle y reducción de ruido de alertas en Zabbix.', stack: 'Active Directory · GPO · Wazuh · GLPI · Keycloak · Zabbix · Docker · Python · Linux' },
        { when: 'mar. 2026 — may. 2026 · Córdoba · Presencial', role: 'Técnico de Soporte TI — Migración Microsoft 365', org: 'ECOINTEGRAL INGENIERÍA, SL (vía GI Group)', desc: 'Despliegue y migración de más de 230 endpoints Windows a Microsoft 365, dentro de la integración en Bureau Veritas. Windows Autopilot, identidades en Entra ID, políticas de cumplimiento y soporte a usuarios.', stack: 'Windows 11 · Autopilot · Entra ID · Microsoft 365 · Intune' },
        { when: 'oct. 2025 — dic. 2025 · Córdoba · Presencial', role: 'Técnico Informático', org: 'Fersoft Informática', desc: 'Soporte e implantación de software de gestión en pymes (proyecto Verifactu). SQL Server, software de facturación y soporte presencial y remoto a usuarios.', stack: 'Windows · SQL Server · Soporte remoto' },
        { when: 'mar. 2025 — jun. 2025 · Córdoba · Híbrido', role: 'Analista de Ciberseguridad — SOC N1', org: 'IaaS365 · Prácticas', desc: 'SOC 24/7 multicliente: monitorización, triaje y escalado de alertas. SIEM (LogPoint, Wazuh) y EDR/XDR (Vision One, Cynet), IOCs y MITRE ATT&CK, escaneos con Nessus/OpenVAS, phishing con GoPhish y auditorías ENS.', stack: 'LogPoint · Wazuh · Vision One · Cynet · MITRE ATT&CK · ENS' },
      ],
    },
    certs: {
      tag: 'formación',
      title: 'Certificaciones',
      lead: 'Voy por una ruta purple team: primero la base de seguridad, luego algo de ataque y ahora toca la defensa práctica.',
      verify: 'Verificar credencial ↗',
      items: [
        { badge: 'CompTIA · SY0-701', name: 'Security+ (ce)', iss: 'nov. 2025 → nov. 2028', href: 'https://www.credly.com/badges/ad3204d9-e927-4383-8dc3-4a181659a195/linked_in_profile' },
        { badge: 'eLearnSecurity · INE', name: 'eJPTv2', iss: 'Junior Penetration Tester · dic. 2025', href: 'https://certs.ine.com/e9a35620-16fe-47f8-b9d2-a25223872fc6' },
        { badge: 'Google · Coursera', name: 'Google Cybersecurity', iss: 'Professional Certificate', href: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/Z3GIB12XPAFV' },
      ],
      roadmapTitle: 'Próximos objetivos',
      roadmap: [
        { step: '01', badge: 'Security Blue Team', name: 'BTL1', iss: 'Blue Team Level 1', p: 'Un examen práctico de 24 horas con análisis de phishing, forense, SIEM, threat intelligence y respuesta a incidentes. Mi siguiente paso.' },
        { step: '02', badge: 'INE', name: 'eCPPT', iss: 'Certified Professional Penetration Tester', p: 'Examen 100% práctico, y casi un tercio va de atacar Active Directory. Justo el entorno que conozco desde dentro.' },
      ],
      more: '<strong>Ruta:</strong> Security+ → eJPTv2 → BTL1 → eCPPT. Lo de Microsoft 365, Entra ID e Intune lo he aprendido trabajando con ello en producción.',
    },
    recs: {
      tag: 'lo que dicen de mí',
      title: 'Recomendaciones',
      items: [
        { text: 'Desde el inicio de ASIR, Juan demostró mucho interés por la ciberseguridad. Siempre iba un paso más allá, formándose de manera autodidacta. Muy dinámico, con una actitud constante de superación.', who: 'Gonzalo Cabada Añón', role: 'Técnico de Sistemas · compañero de ASIR' },
        { text: 'Juan destacó por su interés y curiosidad en la ciberseguridad. Siempre formándose por su cuenta, buscando aprender más allá de clase. Muy proactivo y con ganas de mejorar constantemente.', who: 'Irene Aragonés Sánchez', role: 'Técnico en ASIR · compañera de ASIR' },
      ],
    },
    contact: {
      tag: 'contacto',
      title: 'Hablemos de ',
      titleEm: 'sistemas y seguridad',
      text: 'reiderer es mi sitio para compartir lo que monto y lo que aprendo en sistemas y seguridad. Si quieres comentar un caso, proponer una colaboración o simplemente conectar, aquí me tienes.',
      cta: 'Escríbeme →',
      cv: 'Descargar CV',
    },
  },

  en: {
    locale: 'en',
    meta: {
      title: 'reiderer · Juan Rodríguez Castellano',
      description:
        'Juan Rodríguez Castellano — Microsoft systems administration and cybersecurity analysis (Blue Team). Real-world cases, documented labs and a technical blog.',
    },
    nav: {
      about: 'About',
      projects: 'Projects',
      blog: 'Blog',
      experience: 'Experience',
      certs: 'Certifications',
      contact: 'Contact',
    },
    hero: {
      pill: 'Microsoft Systems · Blue Team',
      eyebrow: 'reiderer',
      h1pre: "Hi, I'm ",
      h1em: 'Juan Rodríguez',
      role: 'Systems administrator · Cybersecurity analyst',
      roleAccent: '· AD · Microsoft 365 · Wazuh · SIEM',
      sub: 'I spend my time keeping Microsoft environments up and secure: Active Directory, GPO, Entra ID, Intune and Microsoft 365. The other half I’m on the detection side, with SIEM, vulnerabilities and response. This is where I write about what I build and what I run into along the way.',
      tags: ['Active Directory · GPO', 'Entra ID · Intune', 'Wazuh · Sentinel', 'Vulnerability management', 'PowerShell · Python'],
      ctaProjects: 'See cases & projects →',
      ctaBlog: 'Read the blog',
      ctaGithub: 'GitHub',
      photoNote: 'Replace with your photo<br>(put your image in /public)',
      location: 'Córdoba, Andalusia · ES',
    },
    metrics: {
      label: 'by the numbers',
      items: [
        { n: '~1,000', l: 'Windows endpoints managed in AD with GPO and Wazuh' },
        { n: '144', l: 'High vulnerabilities closed in 3 h with a GPO pilot' },
        { n: '3,600+', l: 'users migrated to SSO with Keycloak (OIDC)' },
        { n: '230+', l: 'devices deployed with Autopilot and Intune' },
      ],
    },
    about: {
      tag: 'identity',
      title: 'About ',
      titleEm: 'me',
      paragraphs: [
        'I’m Juan, a <strong>systems administrator</strong> with one foot firmly in <strong>defensive security</strong>. I studied ASIR (a Spanish network systems administration degree) and where I feel most at home is the Microsoft world: Active Directory, GPO, Entra ID, Intune and Microsoft 365.',
        'I started out triaging alerts in a <strong>24/7 SOC</strong> and later ended up looking after security for a domain of about a thousand machines with Wazuh, GLPI and GPO. One thing stuck with me from that time: an alert isn’t worth much unless it ends in something concrete, whether that’s a patch rolled out, a ticket someone owns or a rule that finally stops making noise.',
        '<b>reiderer</b> is my logbook. I build labs here that are as close to a real environment as I can get and write down what I learn. Right now I’m on <b>BTL1</b>, very hands-on blue team (phishing, forensics, SIEM, incident response), and I’ve also got my eye on <i>eCPPT</i>. About 30% of its exam is attacking Active Directory, and I really want to see from the other side what I’ve been defending.',
        'And if there’s one thing I’m sure of, it’s that this isn’t about collecting tools or dashboards. It’s about really understanding what’s in front of you and <strong>telling signal from noise</strong>.',
      ],
      skills: ['Active Directory','GPO','Windows Server','Entra ID','Intune','Microsoft 365','Wazuh','Microsoft Sentinel · KQL','GLPI','Keycloak · OIDC','Zabbix','PowerShell','Python','Linux','Docker','Proxmox','MITRE ATT&CK'],
    },
    projects: {
      tag: 'technical work',
      title: 'Cases & ',
      titleEm: 'Labs',
      lead: 'Each card covers what the problem was, what I did and what changed. The real cases come from jobs at companies and I tell them without client data. The labs are my own and their code is public.',
      problemLabel: 'Problem',
      resultLabel: 'Result',
      groups: [
        {
          accent: 'blue',
          title: 'REAL CASES — systems and security in production',
          cards: [
            { label: 'Featured', labelHot: true, title: 'Patching browsers across a whole domain', problem: 'The SIEM flags a critical Chrome CVE across much of the fleet, with no central update mechanism in place.', desc: 'Official Chrome and Firefox ADMX templates, an auto-update GPO piloted on a security group and then rolled out to the whole domain.', result: '144 High vulnerabilities closed in 3 hours during the pilot.', tags: ['#GPO','#ADMX','#Wazuh','#VulnMgmt'], href: '/en/blog/patching-browsers-domain-gpo', link: 'Read the case →' },
            { label: 'Real case', title: 'Wazuh alerts turned into tickets', problem: 'Vulnerabilities and SCA findings sat on the SIEM dashboard with no owner and no follow-up.', desc: 'Python integration with the GLPI REST API: least-privilege service account, deduplication and a custom rule to detect unauthorized software.', result: 'Critical alerts, CVEs and SCA failures land in the support queue automatically, without duplicates.', tags: ['#Wazuh','#GLPI','#Python','#SOAR'], href: '/en/blog/wazuh-alerts-glpi-tickets', link: 'Read the case →' },
            { label: 'Real case', title: 'SSO with Keycloak for GLPI and Moodle', problem: 'Every internal app with its own password and its own joiner/leaver process.', desc: 'OIDC authentication with PKCE against Keycloak, with automatic account creation disabled, after reviewing the plugin’s source code before installing it.', result: '3,600+ users migrated in Moodle and SSO validated on three GLPI instances.', tags: ['#Keycloak','#OIDC','#IAM','#Docker'] },
            { label: 'Real case · open source', title: 'Memory leak in Xibo Player', problem: 'Digital signage screens reaching 12-14 GB of RAM and 100 °C CPU until they went black.', desc: 'Rebuilt the player (C++, GTK, GStreamer) on Ubuntu 24.04 and changed its architecture: one video pipeline per region instead of one per video, with rollback and Zabbix monitoring.', result: 'Memory stable at 42-48 MB and CPU down from 95-105 °C to 61-63 °C on three devices.', tags: ['#C++','#GStreamer','#Linux','#Zabbix'], href: '/en/blog/xibo-memory-leak-gstreamer', link: 'Read the case →' },
            { label: 'Real case', title: 'Microsoft 365 deployment at scale', problem: 'A company joining an international group with a heterogeneous Windows fleet.', desc: 'Provisioning with Windows Autopilot, identities in Entra ID, and compliance and endpoint security policies in Intune.', result: '230+ endpoints migrated to Microsoft 365.', tags: ['#Autopilot','#EntraID','#Intune','#M365'] },
          ],
        },
        {
          accent: 'blue',
          title: 'BLUE TEAM LABS — detection and response',
          cards: [
            { label: 'Full lab', title: 'Microsoft Sentinel SOC Lab', problem: 'How do you catch persistence in cloud identity before it becomes an incident?', desc: 'SIEM in Azure with the Entra ID connector, KQL analytic rules mapped to MITRE ATT&CK, an identity threat workbook and a Logic Apps notification playbook.', result: 'Detection of account creation (T1136.003) and role assignment (T1098.003) with incident and automated response.', tags: ['#Sentinel','#KQL','#Azure','#MITRE'], href: 'https://github.com/juanrc98/microsoft-sentinel-lab', link: 'View on GitHub →' },
            { label: 'Full lab', title: 'Wazuh SIEM Lab', problem: 'What does a SIEM actually see when a vulnerable server is attacked?', desc: 'Wazuh monitoring Metasploitable3 with Kali as the attacker: custom XML rules, ATT&CK technique detection and VirusTotal integration.', result: '22 CVEs inventoried and prioritized by CVSS; attacks detected and correlated.', tags: ['#Wazuh','#MITREATTACK','#VirusTotal'], href: 'https://github.com/juanrc98/wazuh-siem', link: 'View on GitHub →' },
          ],
        },
        {
          accent: 'blue',
          title: 'SYSTEMS LABS — infrastructure and automation',
          cards: [
            { label: 'Tool', title: 'M365 Admin Toolkit', problem: 'Manual Microsoft 365 onboarding/offboarding: forgotten licenses and sessions left alive.', desc: 'PowerShell module on Microsoft Graph for the user lifecycle and MFA, license and inactive-account reports, with -WhatIf on everything that touches accounts.', result: 'Pester tests and GitHub Actions CI with PSScriptAnalyzer.', tags: ['#PowerShell','#MicrosoftGraph','#Pester'], href: 'https://github.com/juanrc98/M365-Admin-Toolkit', link: 'View on GitHub →' },
            { future: 'blue-f', label: 'In progress · phase 2 of 5', title: 'Resilient infrastructure', problem: 'Compute, observability and data protection are rarely learned together.', desc: 'Proxmox VE homelab with OPNsense, Active Directory, Zabbix and backups with Veeam and Proxmox Backup Server, documented phase by phase.', result: 'Hypervisor, firewall, domain and DHCP up; the Docker host closes phase 2.', tags: ['#Proxmox','#OPNsense','#ActiveDirectory','#Zabbix'], href: 'https://github.com/juanrc98/infra-resiliente', link: 'View on GitHub →' },
            { label: 'ASIR final project · team', title: 'High availability cluster', problem: 'A web service with a database that can’t go down when a node does.', desc: 'Pacemaker and Corosync on Debian, MariaDB behind ProxySQL and monitoring with Prometheus and Grafana.', result: 'Automatic failover between nodes with no manual intervention.', tags: ['#Pacemaker','#Corosync','#HA','#Linux'], href: 'https://juanrc98.github.io/Proyecto-cluster.pdf', link: 'View documentation →' },
          ],
        },
        {
          accent: 'red',
          title: 'PURPLE — know the attack to defend better',
          cards: [
            { red: true, label: 'Medium', title: 'DarkHole: 1', desc: 'Web enumeration, SQL injection and privilege escalation via SUID binaries, with internal service analysis.', tags: ['#SQLi','#SUID','#PrivEsc'], href: 'https://juanrc98.github.io/write-up.pdf', link: 'View write-up →' },
            { red: true, label: 'Medium', title: 'Psycho: 1', desc: 'Thorough enumeration, LFI exploitation, log analysis and privilege escalation through scripts with special permissions.', tags: ['#LFI','#LogAnalysis','#PrivEsc'], href: 'https://juanrc98.github.io/write-up-2.pdf', link: 'View write-up →' },
            { future: 'red-f', red: true, label: 'Goal', title: 'Road to eCPPT', desc: 'Active Directory pentesting, post-exploitation and lateral movement. Attacking the kind of environment I administer to learn what my logs show and what they miss.', tags: ['#ActiveDirectory','#eCPPT','#PurpleTeam'] },
          ],
        },
      ],
    },
    blogSection: {
      tag: 'log',
      title: 'Blog',
      lead: 'reiderer is, above all, a log. Here I post what I learn, what I build and what I think about systems and security.',
      readMore: 'See all posts →',
      empty: 'First posts coming soon.',
      read: 'Read →',
      newer: '← Newer',
      older: 'Older →',
    },
    method: {
      tag: 'method',
      title: 'How I ',
      titleEm: 'work',
      lead: 'Whether I’m building a server or looking at an alert, I try to work the same way. Understand first, then prioritize, and write everything down.',
      items: [
        { n: '01', h: 'Understand before touching', p: 'Before running anything I like to know what the system exposes, how it’s put together and what’s around it.' },
        { n: '02', h: 'Pilot before rolling out', p: 'First a small group I can measure and, if it goes well, everyone else. And if a change can’t be undone, it doesn’t go out on a Friday.' },
        { n: '03', h: 'Prioritize, don’t pile up', p: 'I’m not obsessed with having more rules or more sources. I’d rather have fewer and understand them properly.' },
        { n: '04', h: 'From alert to action', p: 'If nobody’s handling an alert, it’s noise. What I care about is it ending up as a ticket, a patch or a better-tuned rule.' },
        { n: '05', h: 'Document the process', p: 'I write everything down so someone else can review it, repeat it or understand it without having to ask me.' },
        { n: '06', h: 'Least privilege, me included', p: 'Service accounts with just the permissions they need, passwords out of the code and every change leaving a trail.' },
      ],
    },
    experience: {
      tag: 'experience',
      title: 'Experience',
      items: [
        { when: 'Aug 2026 — Sep 2026 · Córdoba · On-site', role: 'Systems Administrator — Tier 3 Support', org: 'Magtel', desc: 'Administration of an Active Directory domain of ~1,000 Windows endpoints with GPO, and of the security platform (Wazuh, GLPI, Zabbix). Browser patching via GPO/ADMX, Wazuh → GLPI integration for automatic vulnerability and SCA tickets, SSO with Keycloak (OIDC) for GLPI and Moodle, and Zabbix alert noise reduction.', stack: 'Active Directory · GPO · Wazuh · GLPI · Keycloak · Zabbix · Docker · Python · Linux' },
        { when: 'Mar 2026 — May 2026 · Córdoba · On-site', role: 'IT Support Technician — Microsoft 365 Migration', org: 'ECOINTEGRAL INGENIERÍA, SL (via GI Group)', desc: 'Deployment and migration of 230+ Windows endpoints to Microsoft 365, within the integration into Bureau Veritas. Windows Autopilot, identities in Entra ID, compliance policies and user support.', stack: 'Windows 11 · Autopilot · Entra ID · Microsoft 365 · Intune' },
        { when: 'Oct 2025 — Dec 2025 · Córdoba · On-site', role: 'IT Technician', org: 'Fersoft Informática', desc: 'Support and rollout of business management software in SMBs (Verifactu project). SQL Server, billing software and on-site and remote user support.', stack: 'Windows · SQL Server · Remote support' },
        { when: 'Mar 2025 — Jun 2025 · Córdoba · Hybrid', role: 'Cybersecurity Analyst — SOC Tier 1', org: 'IaaS365 · Internship', desc: '24/7 multi-client SOC: monitoring, triage and alert escalation. SIEM (LogPoint, Wazuh) and EDR/XDR (Vision One, Cynet), IOCs and MITRE ATT&CK, Nessus/OpenVAS scans, GoPhish phishing and ENS audits.', stack: 'LogPoint · Wazuh · Vision One · Cynet · MITRE ATT&CK · ENS' },
      ],
    },
    certs: {
      tag: 'education',
      title: 'Certifications',
      lead: 'I’m on a purple team path: security basics first, then some offense, and now it’s time for hands-on defense.',
      verify: 'Verify credential ↗',
      items: [
        { badge: 'CompTIA · SY0-701', name: 'Security+ (ce)', iss: 'Nov 2025 → Nov 2028', href: 'https://www.credly.com/badges/ad3204d9-e927-4383-8dc3-4a181659a195/linked_in_profile' },
        { badge: 'eLearnSecurity · INE', name: 'eJPTv2', iss: 'Junior Penetration Tester · Dec 2025', href: 'https://certs.ine.com/e9a35620-16fe-47f8-b9d2-a25223872fc6' },
        { badge: 'Google · Coursera', name: 'Google Cybersecurity', iss: 'Professional Certificate', href: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/Z3GIB12XPAFV' },
      ],
      roadmapTitle: 'Next goals',
      roadmap: [
        { step: '01', badge: 'Security Blue Team', name: 'BTL1', iss: 'Blue Team Level 1', p: 'A 24-hour practical exam covering phishing analysis, forensics, SIEM, threat intelligence and incident response. My next step.' },
        { step: '02', badge: 'INE', name: 'eCPPT', iss: 'Certified Professional Penetration Tester', p: 'A fully practical exam where almost a third is about attacking Active Directory. The very environment I know from the inside.' },
      ],
      more: '<strong>Path:</strong> Security+ → eJPTv2 → BTL1 → eCPPT. The Microsoft 365, Entra ID and Intune side I learned by working with it in production.',
    },
    recs: {
      tag: 'what they say about me',
      title: 'Recommendations',
      items: [
        { text: 'From the start of ASIR, Juan showed great interest in cybersecurity. He always went a step further, learning on his own. Very dynamic, with a constant drive to improve.', who: 'Gonzalo Cabada Añón', role: 'Systems Technician · ASIR classmate' },
        { text: 'Juan stood out for his interest and curiosity in cybersecurity. Always learning on his own, beyond class. Very proactive and eager to keep improving.', who: 'Irene Aragonés Sánchez', role: 'ASIR Technician · ASIR classmate' },
      ],
    },
    contact: {
      tag: 'contact',
      title: "Let's talk ",
      titleEm: 'systems and security',
      text: 'reiderer is my place to share what I build and what I learn in systems and security. If you want to discuss a case, propose a collaboration or just connect, here I am.',
      cta: 'Email me →',
      cv: 'Download CV',
    },
  },
} as const;
