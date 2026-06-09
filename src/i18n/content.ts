// Todo el contenido editable del sitio, en español e inglés.
// Cambia aquí los textos y se reflejan en ambas versiones.

export type Lang = 'es' | 'en';

export const content = {
  es: {
    locale: 'es',
    meta: {
      title: 'reiderer · Juan Rodríguez Castellano',
      description:
        'reiderer — la casa digital de Juan Rodríguez Castellano. Sistemas, Cloud y Ciberseguridad. Laboratorios, proyectos y bitácora.',
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
      pill: 'Bitácora personal · Sistemas & Ciberseguridad',
      eyebrow: 'reiderer',
      h1pre: 'Hola, soy ',
      h1em: 'Juan Rodríguez',
      role: 'Sistemas · Cloud · Ciberseguridad',
      roleAccent: '· Blue Team → Red Team',
      sub: 'Vivo entre los sistemas y la seguridad. Monto laboratorios, documento lo que aprendo y comparto el camino. Esta es mi casa: aquí cuento quién soy y dejo registro de lo que voy construyendo.',
      tags: ['Sistemas', 'Cloud / Azure', 'Blue Team', 'Red Team'],
      ctaProjects: 'Ver proyectos →',
      ctaBlog: 'Leer el blog',
      ctaGithub: 'GitHub',
      photoNote: 'Sustituye por tu foto<br>(pon tu imagen en /public)',
      location: 'Córdoba, Andalucía · ES',
    },
    about: {
      tag: 'identidad',
      title: 'Sobre ',
      titleEm: 'mí',
      paragraphs: [
        'Soy Juan Rodríguez Castellano y vivo a caballo entre dos mundos que me encantan: <strong>los sistemas y la ciberseguridad</strong>.',
        'Vengo de la administración de sistemas (ASIR) y es donde me siento como en casa: redes, Windows y Linux, virtualización, Microsoft 365, Entra ID, cloud... <strong>montar cosas, entender cómo encajan y mantenerlas en pie</strong>. Esa parte no la quiero soltar nunca, me apasiona.',
        'La ciberseguridad llegó después, casi por accidente. Empezó como <strong>curiosidad</strong> con un curso de hacking ético, se convirtió en <strong>hobby</strong> y acabó siendo una <strong>pasión</strong>. Hoy me muevo sobre todo en Blue Team —detección, respuesta, SIEM— y miro con ganas hacia el Red Team y la OSCP.',
        'Para mí <b>sistemas</b> y <i>seguridad</i> van siempre juntos. Uso <b>reiderer</b> como mi sitio para montar laboratorios, documentar lo que aprendo y compartir el camino.',
        'Y si algo tengo claro, es que esto no va de acumular herramientas, alertas o dashboards, sino de entender bien las cosas y <strong>distinguir lo importante del ruido</strong>.',
      ],
      skills: ['Windows Server','Linux','Redes / TCP-IP','Virtualización','Microsoft 365','Entra ID','Azure','Microsoft Sentinel','Wazuh','MITRE ATT&CK','Bash / Python','PowerShell'],
    },
    projects: {
      tag: 'trabajo técnico',
      title: 'Proyectos & ',
      titleEm: 'Labs',
      lead: 'Lo que voy montando, en mis tres terrenos: sistemas (mi base), defensa y ataque. Labs cercanos a un entorno real, no demos.',
      groups: [
        {
          accent: 'blue',
          title: 'SISTEMAS — la base que me encanta',
          cards: [
            { title: 'High Availability Cluster', desc: 'Clúster de alta disponibilidad con Pacemaker y Corosync sobre Linux, con balanceo de carga de MariaDB y failover automático.', tags: ['#Pacemaker','#Corosync','#HA','#Linux'], href: 'https://juanrc98.github.io/Proyecto-cluster.pdf', link: 'Ver documentación →' },
            { title: 'Despliegue Microsoft 365 a escala', desc: 'Migración real de más de 230 endpoints con Windows Autopilot, Entra ID e Intune en un entorno corporativo.', tags: ['#Autopilot','#EntraID','#Intune','#M365'] },
            { future: 'blue-f', label: 'Próximamente', title: 'Homelab de sistemas', desc: 'Virtualización con Proxmox, Active Directory, servicios de red y automatización. Para seguir creciendo en la parte de sistemas que tanto me gusta.', tags: ['#Proxmox','#ActiveDirectory','#Homelab'] },
          ],
        },
        {
          accent: 'blue',
          title: 'BLUE TEAM — defensa y detección',
          cards: [
            { label: 'Destacado', labelHot: true, title: 'Wazuh SIEM Lab', desc: 'Laboratorio completo de Wazuh con Metasploitable3 monitorizado y Kali como máquina ofensiva. Detección de técnicas MITRE ATT&CK, gestión de 22 CVEs con priorización CVSS, reglas XML e integración con la API de VirusTotal.', tags: ['#Wazuh','#MITREATTACK','#VirusTotal'], href: 'https://github.com/juanrc98', link: 'Ver en GitHub →' },
            { label: 'En desarrollo', title: 'Microsoft Sentinel Lab', desc: 'Laboratorio cloud-native en Azure: ingesta de logs, 5 reglas analíticas en KQL mapeadas a MITRE ATT&CK y validación con eventos controlados. La unión de mis dos mundos: cloud y seguridad.', tags: ['#Sentinel','#KQL','#Azure'] },
          ],
        },
        {
          accent: 'red',
          title: 'RED TEAM — CTF & write-ups',
          cards: [
            { red: true, label: 'Dificultad media', title: 'DarkHole: 1', desc: 'Enumeración web, inyección SQL y escalada de privilegios mediante binarios SUID, con análisis de servicios internos.', tags: ['#SQLi','#SUID','#PrivEsc'], href: 'https://juanrc98.github.io/write-up.pdf', link: 'Ver write-up →' },
            { red: true, label: 'Dificultad media', title: 'Psycho: 1', desc: 'Enumeración exhaustiva, explotación de LFI, análisis de logs y escalada de privilegios mediante scripts con permisos especiales.', tags: ['#LFI','#LogAnalysis','#PrivEsc'], href: 'https://juanrc98.github.io/write-up-2.pdf', link: 'Ver write-up →' },
            { future: 'red-f', red: true, label: 'El horizonte', title: 'Camino a la OSCP', desc: 'El siguiente capítulo: más máquinas, más labs ofensivos y el progreso hacia la OSCP. En rojo, porque es el rumbo.', tags: ['#RedTeam','#OSCP','#OffSec'] },
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
    },
    method: {
      tag: 'método',
      title: 'Cómo ',
      titleEm: 'trabajo',
      lead: 'Trabajo igual montando un sistema que investigando una alerta: entender primero, priorizar y dejarlo todo bien documentado.',
      items: [
        { n: '01', h: 'Entender antes de tocar', p: 'Antes de lanzar nada, intento entender qué expone el sistema, cómo está montado y qué contexto lo rodea.' },
        { n: '02', h: 'Priorizar, no acumular', p: 'No me obsesiono con tener más reglas o más fuentes. Prefiero menos cosas, pero entendidas a fondo.' },
        { n: '03', h: 'Correlacionar en el tiempo', p: 'Una alerta aislada suele ser una señal media. El valor real está en cómo encajan varias señales juntas.' },
        { n: '04', h: 'Documentar el proceso', p: 'Me importa dejar el trabajo bien documentado: que sea revisable, reproducible y fácil de explicar.' },
        { n: '05', h: 'Conectar sistemas y seguridad', p: 'Entiendo cómo se monta la infraestructura y cómo se defiende. Ese contexto completo es mi mayor ventaja.' },
      ],
    },
    experience: {
      tag: 'trayectoria',
      title: 'Experiencia',
      items: [
        { when: 'mar. 2026 — actualidad · Córdoba · Presencial', role: 'Técnico de Soporte TI — Migración Microsoft 365', org: 'ECOINTEGRAL INGENIERÍA, SL (vía GI Group)', desc: 'Despliegue y migración de más de 230 endpoints Windows a Microsoft 365, dentro de la integración en Bureau Veritas. Windows Autopilot, identidades en Entra ID, políticas de cumplimiento y soporte a usuarios.', stack: 'Windows 11 · Autopilot · Entra ID · Microsoft 365 · Intune' },
        { when: 'oct. 2025 — dic. 2025 · Córdoba · Presencial', role: 'Técnico Informático', org: 'Fersoft Informática', desc: 'Soporte e implantación de software de gestión en pymes (proyecto Verifactu). SQL Server, software de facturación y soporte presencial y remoto a usuarios.', stack: 'Windows · SQL Server · Soporte remoto' },
        { when: 'mar. 2025 — jun. 2025 · Córdoba · Híbrido', role: 'Analista de Ciberseguridad — SOC N1', org: 'IaaS365 · Prácticas', desc: 'SOC 24/7 multicliente: monitorización, triaje y escalado de alertas. SIEM (LogPoint, Wazuh) y EDR/XDR (Vision One, Cynet), IOCs y MITRE ATT&CK, escaneos con Nessus/OpenVAS, phishing con GoPhish y auditorías ENS.', stack: 'LogPoint · Wazuh · Vision One · Cynet · MITRE ATT&CK · ENS' },
      ],
    },
    certs: {
      tag: 'formación',
      title: 'Certificaciones',
      lead: 'Voy certificando lo que aprendo. Ahora mismo, el foco está en Microsoft Security; a futuro, la OSCP.',
      verify: 'Verificar credencial ↗',
      items: [
        { badge: 'eLearnSecurity · INE', name: 'eJPTv2', iss: 'Junior Penetration Tester · dic. 2025', href: 'https://certs.ine.com/e9a35620-16fe-47f8-b9d2-a25223872fc6' },
        { badge: 'CompTIA · SY0-701', name: 'Security+ (ce)', iss: 'nov. 2025 → nov. 2028', href: 'https://www.credly.com/badges/ad3204d9-e927-4383-8dc3-4a181659a195/linked_in_profile' },
        { badge: 'Google · Coursera', name: 'Google Cybersecurity', iss: 'Professional Certificate', href: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/Z3GIB12XPAFV' },
        { badge: 'Microsoft', name: 'SC-200', iss: 'Security Operations Analyst · en preparación' },
      ],
      more: 'Y más formación en hacking ético, análisis de malware y ciberseguridad OT. <strong>En el horizonte: SC-200, AZ-104, AZ-500 y OSCP.</strong>',
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
      text: 'reiderer es mi sitio para compartir lo que hago y lo que aprendo. Si quieres comentar algo, proponer una colaboración o simplemente conectar, aquí me tienes.',
      cta: 'Escríbeme →',
      cv: 'Descargar CV',
    },
  },

  en: {
    locale: 'en',
    meta: {
      title: 'reiderer · Juan Rodríguez Castellano',
      description:
        'reiderer — Juan Rodríguez Castellano’s digital home. Systems, Cloud and Cybersecurity. Labs, projects and a blog.',
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
      pill: 'Personal log · Systems & Cybersecurity',
      eyebrow: 'reiderer',
      h1pre: "Hi, I'm ",
      h1em: 'Juan Rodríguez',
      role: 'Systems · Cloud · Cybersecurity',
      roleAccent: '· Blue Team → Red Team',
      sub: 'I live between systems and security. I build labs, document what I learn and share the journey. This is my home: where I tell who I am and keep a record of what I build.',
      tags: ['Systems', 'Cloud / Azure', 'Blue Team', 'Red Team'],
      ctaProjects: 'See projects →',
      ctaBlog: 'Read the blog',
      ctaGithub: 'GitHub',
      photoNote: 'Replace with your photo<br>(put your image in /public)',
      location: 'Córdoba, Andalusia · ES',
    },
    about: {
      tag: 'identity',
      title: 'About ',
      titleEm: 'me',
      paragraphs: [
        'I’m Juan Rodríguez Castellano and I live between two worlds I love: <strong>systems and cybersecurity</strong>.',
        'I come from systems administration (ASIR) and it’s where I feel at home: networks, Windows and Linux, virtualization, Microsoft 365, Entra ID, cloud... <strong>building things, understanding how they fit together and keeping them running</strong>. I never want to let that part go.',
        'Cybersecurity came later, almost by accident. It started as <strong>curiosity</strong> with an ethical hacking course, became a <strong>hobby</strong> and ended up a <strong>passion</strong>. Today I work mostly on Blue Team —detection, response, SIEM— and look eagerly toward Red Team and the OSCP.',
        'For me <b>systems</b> and <i>security</i> always go together. I use <b>reiderer</b> as my place to build labs, document what I learn and share the journey.',
        'And if there’s one thing I’m sure of, it’s that this isn’t about piling up tools, alerts or dashboards, but about understanding things well and <strong>telling signal from noise</strong>.',
      ],
      skills: ['Windows Server','Linux','Networking / TCP-IP','Virtualization','Microsoft 365','Entra ID','Azure','Microsoft Sentinel','Wazuh','MITRE ATT&CK','Bash / Python','PowerShell'],
    },
    projects: {
      tag: 'technical work',
      title: 'Projects & ',
      titleEm: 'Labs',
      lead: 'What I build, across my three areas: systems (my base), defense and offense. Labs close to a real environment, not demos.',
      groups: [
        {
          accent: 'blue',
          title: 'SYSTEMS — the base I love',
          cards: [
            { title: 'High Availability Cluster', desc: 'High-availability cluster with Pacemaker and Corosync on Linux, with MariaDB load balancing and automatic failover.', tags: ['#Pacemaker','#Corosync','#HA','#Linux'], href: 'https://juanrc98.github.io/Proyecto-cluster.pdf', link: 'View documentation →' },
            { title: 'Microsoft 365 deployment at scale', desc: 'Real migration of 230+ endpoints with Windows Autopilot, Entra ID and Intune in a corporate environment.', tags: ['#Autopilot','#EntraID','#Intune','#M365'] },
            { future: 'blue-f', label: 'Coming soon', title: 'Systems homelab', desc: 'Virtualization with Proxmox, Active Directory, network services and automation. To keep growing in the systems side I love.', tags: ['#Proxmox','#ActiveDirectory','#Homelab'] },
          ],
        },
        {
          accent: 'blue',
          title: 'BLUE TEAM — defense and detection',
          cards: [
            { label: 'Featured', labelHot: true, title: 'Wazuh SIEM Lab', desc: 'Full Wazuh lab with a monitored Metasploitable3 and Kali as the offensive box. MITRE ATT&CK detection, 22 CVEs with CVSS prioritization, custom XML rules and VirusTotal API integration.', tags: ['#Wazuh','#MITREATTACK','#VirusTotal'], href: 'https://github.com/juanrc98', link: 'View on GitHub →' },
            { label: 'In progress', title: 'Microsoft Sentinel Lab', desc: 'Cloud-native lab in Azure: log ingestion, 5 KQL analytic rules mapped to MITRE ATT&CK and validation with controlled events. Where my two worlds meet: cloud and security.', tags: ['#Sentinel','#KQL','#Azure'] },
          ],
        },
        {
          accent: 'red',
          title: 'RED TEAM — CTF & write-ups',
          cards: [
            { red: true, label: 'Medium', title: 'DarkHole: 1', desc: 'Web enumeration, SQL injection and privilege escalation via SUID binaries, with internal service analysis.', tags: ['#SQLi','#SUID','#PrivEsc'], href: 'https://juanrc98.github.io/write-up.pdf', link: 'View write-up →' },
            { red: true, label: 'Medium', title: 'Psycho: 1', desc: 'Thorough enumeration, LFI exploitation, log analysis and privilege escalation through scripts with special permissions.', tags: ['#LFI','#LogAnalysis','#PrivEsc'], href: 'https://juanrc98.github.io/write-up-2.pdf', link: 'View write-up →' },
            { future: 'red-f', red: true, label: 'The horizon', title: 'Road to OSCP', desc: 'The next chapter: more boxes, more offensive labs and progress toward the OSCP. In red, because that’s the direction.', tags: ['#RedTeam','#OSCP','#OffSec'] },
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
    },
    method: {
      tag: 'method',
      title: 'How I ',
      titleEm: 'work',
      lead: 'I work the same way building a system as investigating an alert: understand first, prioritize and document everything well.',
      items: [
        { n: '01', h: 'Understand before touching', p: 'Before launching anything, I try to understand what the system exposes, how it’s built and the context around it.' },
        { n: '02', h: 'Prioritize, don’t pile up', p: 'I don’t obsess over having more rules or more sources. I prefer fewer things, but understood in depth.' },
        { n: '03', h: 'Correlate over time', p: 'An isolated alert is usually a medium signal. The real value is how several signals fit together.' },
        { n: '04', h: 'Document the process', p: 'I care about leaving work well documented: reviewable, reproducible and easy to explain.' },
        { n: '05', h: 'Connect systems and security', p: 'I understand how infrastructure is built and how it’s defended. That full context is my biggest advantage.' },
      ],
    },
    experience: {
      tag: 'experience',
      title: 'Experience',
      items: [
        { when: 'Mar 2026 — present · Córdoba · On-site', role: 'IT Support Technician — Microsoft 365 Migration', org: 'ECOINTEGRAL INGENIERÍA, SL (via GI Group)', desc: 'Deployment and migration of 230+ Windows endpoints to Microsoft 365, within the integration into Bureau Veritas. Windows Autopilot, identities in Entra ID, compliance policies and user support.', stack: 'Windows 11 · Autopilot · Entra ID · Microsoft 365 · Intune' },
        { when: 'Oct 2025 — Dec 2025 · Córdoba · On-site', role: 'IT Technician', org: 'Fersoft Informática', desc: 'Support and rollout of business management software in SMBs (Verifactu project). SQL Server, billing software and on-site and remote user support.', stack: 'Windows · SQL Server · Remote support' },
        { when: 'Mar 2025 — Jun 2025 · Córdoba · Hybrid', role: 'Cybersecurity Analyst — SOC N1', org: 'IaaS365 · Internship', desc: '24/7 multi-client SOC: monitoring, triage and alert escalation. SIEM (LogPoint, Wazuh) and EDR/XDR (Vision One, Cynet), IOCs and MITRE ATT&CK, Nessus/OpenVAS scans, GoPhish phishing and ENS audits.', stack: 'LogPoint · Wazuh · Vision One · Cynet · MITRE ATT&CK · ENS' },
      ],
    },
    certs: {
      tag: 'education',
      title: 'Certifications',
      lead: 'I certify what I learn. Right now the focus is Microsoft Security; in the future, the OSCP.',
      verify: 'Verify credential ↗',
      items: [
        { badge: 'eLearnSecurity · INE', name: 'eJPTv2', iss: 'Junior Penetration Tester · Dec 2025', href: 'https://certs.ine.com/e9a35620-16fe-47f8-b9d2-a25223872fc6' },
        { badge: 'CompTIA · SY0-701', name: 'Security+ (ce)', iss: 'Nov 2025 → Nov 2028', href: 'https://www.credly.com/badges/ad3204d9-e927-4383-8dc3-4a181659a195/linked_in_profile' },
        { badge: 'Google · Coursera', name: 'Google Cybersecurity', iss: 'Professional Certificate', href: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/Z3GIB12XPAFV' },
        { badge: 'Microsoft', name: 'SC-200', iss: 'Security Operations Analyst · in progress' },
      ],
      more: 'Plus more training in ethical hacking, malware analysis and OT security. <strong>On the horizon: SC-200, AZ-104, AZ-500 and OSCP.</strong>',
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
      text: 'reiderer is my place to share what I do and what I learn. If you want to comment, propose a collaboration or just connect, here I am.',
      cta: 'Email me →',
      cv: 'Download CV',
    },
  },
} as const;
