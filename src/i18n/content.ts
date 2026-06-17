// Todo el contenido editable del sitio, en español e inglés.
// Cambia aquí los textos y se reflejan en ambas versiones.

export type Lang = 'es' | 'en';

export const content = {
  es: {
    locale: 'es',
    meta: {
      title: 'reiderer · Juan Rodríguez Castellano',
      description:
        'reiderer — la casa digital de Juan Rodríguez Castellano. Sistemas Microsoft, Cloud y Seguridad. Laboratorios, proyectos y bitácora.',
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
      pill: 'Bitácora personal · Sistemas Microsoft & Cloud',
      eyebrow: 'reiderer',
      h1pre: 'Hola, soy ',
      h1em: 'Juan Rodríguez',
      role: 'Sistemas Microsoft · Cloud · Endpoint',
      roleAccent: '· Entra ID · Intune · Azure',
      sub: 'Administro y aseguro infraestructura Microsoft: identidad con Entra ID, gestión de endpoints con Intune, Microsoft 365 y Azure, con automatización en PowerShell. Monto laboratorios cercanos a entornos reales y documento cada paso.',
      tags: ['Microsoft 365', 'Entra ID · Intune', 'Azure', 'PowerShell', 'Seguridad de endpoint'],
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
        'Soy Juan Rodríguez Castellano, <strong>administrador de sistemas</strong> especializado en el entorno <strong>Microsoft</strong>: identidad con Entra ID, gestión de endpoints con Intune, Microsoft 365 y Azure.',
        'Vengo de la administración de sistemas (ASIR) y es donde me siento como en casa: Windows Server y Active Directory, redes, virtualización y cloud. <strong>Montar la infraestructura, entender cómo encaja y mantenerla en pie y segura</strong> es lo que me mueve.',
        'Mi diferencia está en la <strong>seguridad</strong>: vengo de un SOC y de Blue Team, así que no solo despliego sistemas, los aseguro. MFA, Conditional Access y protección de identidad y endpoint forman parte de cómo trabajo, no de un añadido.',
        'Uso <b>reiderer</b> para montar laboratorios cercanos a entornos reales, documentar lo que aprendo y compartir el camino. Ahora mismo, foco en profundizar en <b>Azure (AZ-104)</b> y en la automatización con <b>PowerShell</b>.',
        'Y si algo tengo claro, es que esto no va de acumular herramientas, alertas o dashboards, sino de entender bien las cosas y <strong>distinguir lo importante del ruido</strong>.',
      ],
      skills: ['Microsoft 365','Entra ID','Intune','Windows Server','Active Directory','Azure','PowerShell','Virtualización','Redes / TCP-IP','Seguridad de identidad','Microsoft Sentinel','Linux'],
    },
    projects: {
      tag: 'trabajo técnico',
      title: 'Proyectos & ',
      titleEm: 'Labs',
      lead: 'Lo que voy montando, cerca de un entorno real y no como demo: administración de sistemas Microsoft —identidad, endpoint y cloud— con la seguridad como hilo conductor.',
      groups: [
        {
          accent: 'blue',
          title: 'SISTEMAS MICROSOFT — identidad, endpoint y cloud',
          cards: [
            { label: 'Destacado', labelHot: true, title: 'Despliegue de Microsoft 365 a escala', desc: 'Migración real de más de 230 endpoints con Windows Autopilot, Entra ID e Intune en un entorno corporativo, con políticas de cumplimiento y seguridad de endpoint.', tags: ['#Autopilot','#EntraID','#Intune','#M365'], href: 'https://github.com/juanrc98', link: 'Ver en GitHub →' },
            { future: 'blue-f', label: 'En desarrollo', title: 'Toolkit de automatización (PowerShell + Graph)', desc: 'Módulo de PowerShell para alta y baja de usuarios en Entra ID, asignación de licencias M365 y reporting (MFA, licencias, dispositivos) vía Microsoft Graph.', tags: ['#PowerShell','#MicrosoftGraph','#Automatización'] },
            { future: 'blue-f', label: 'En desarrollo', title: 'Lab de identidad híbrida', desc: 'Active Directory on-prem sincronizado con Entra ID (Entra Connect), Conditional Access, MFA y gestión de endpoints con Intune. El entorno híbrido que piden las empresas.', tags: ['#ActiveDirectory','#EntraID','#Intune','#Híbrido'] },
            { title: 'High Availability Cluster', desc: 'Clúster de alta disponibilidad con Pacemaker y Corosync sobre Linux, con balanceo de carga de MariaDB y failover automático.', tags: ['#Pacemaker','#Corosync','#HA','#Linux'], href: 'https://juanrc98.github.io/Proyecto-cluster.pdf', link: 'Ver documentación →' },
          ],
        },
        {
          accent: 'blue',
          title: 'CLOUD & SEGURIDAD — Azure y detección',
          cards: [
            { label: 'En desarrollo', title: 'Microsoft Sentinel Lab', desc: 'Laboratorio cloud-native en Azure: ingesta de logs, reglas analíticas en KQL mapeadas a MITRE ATT&CK, hunting de identidad y respuesta automatizada. La unión de mis dos mundos: cloud y seguridad.', tags: ['#Sentinel','#KQL','#Azure'] },
            { label: 'Lab completo', title: 'Wazuh SIEM Lab', desc: 'Laboratorio completo de Wazuh con Metasploitable3 monitorizado y Kali como máquina ofensiva. Detección de técnicas MITRE ATT&CK, gestión de 22 CVEs con priorización CVSS, reglas XML e integración con la API de VirusTotal.', tags: ['#Wazuh','#MITREATTACK','#VirusTotal'], href: 'https://github.com/juanrc98', link: 'Ver en GitHub →' },
          ],
        },
        {
          accent: 'red',
          title: 'EXTRA — Red Team & CTF',
          cards: [
            { red: true, label: 'Dificultad media', title: 'DarkHole: 1', desc: 'Enumeración web, inyección SQL y escalada de privilegios mediante binarios SUID, con análisis de servicios internos.', tags: ['#SQLi','#SUID','#PrivEsc'], href: 'https://juanrc98.github.io/write-up.pdf', link: 'Ver write-up →' },
            { red: true, label: 'Dificultad media', title: 'Psycho: 1', desc: 'Enumeración exhaustiva, explotación de LFI, análisis de logs y escalada de privilegios mediante scripts con permisos especiales.', tags: ['#LFI','#LogAnalysis','#PrivEsc'], href: 'https://juanrc98.github.io/write-up-2.pdf', link: 'Ver write-up →' },
            { future: 'red-f', red: true, label: 'A futuro', title: 'Camino a la OSCP', desc: 'Conocimiento ofensivo que me hace mejor defensor y administrador. Un objetivo en paralelo, sin prisa.', tags: ['#RedTeam','#OSCP','#OffSec'] },
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
        { when: 'mar. 2026 — may. 2026 · Córdoba · Presencial', role: 'Técnico de Soporte TI — Migración Microsoft 365', org: 'ECOINTEGRAL INGENIERÍA, SL (vía GI Group)', desc: 'Despliegue y migración de más de 230 endpoints Windows a Microsoft 365, dentro de la integración en Bureau Veritas. Windows Autopilot, identidades en Entra ID, políticas de cumplimiento y soporte a usuarios.', stack: 'Windows 11 · Autopilot · Entra ID · Microsoft 365 · Intune' },
        { when: 'oct. 2025 — dic. 2025 · Córdoba · Presencial', role: 'Técnico Informático', org: 'Fersoft Informática', desc: 'Soporte e implantación de software de gestión en pymes (proyecto Verifactu). SQL Server, software de facturación y soporte presencial y remoto a usuarios.', stack: 'Windows · SQL Server · Soporte remoto' },
        { when: 'mar. 2025 — jun. 2025 · Córdoba · Híbrido', role: 'Analista de Ciberseguridad — SOC N1', org: 'IaaS365 · Prácticas', desc: 'SOC 24/7 multicliente: monitorización, triaje y escalado de alertas. SIEM (LogPoint, Wazuh) y EDR/XDR (Vision One, Cynet), IOCs y MITRE ATT&CK, escaneos con Nessus/OpenVAS, phishing con GoPhish y auditorías ENS.', stack: 'LogPoint · Wazuh · Vision One · Cynet · MITRE ATT&CK · ENS' },
      ],
    },
    certs: {
      tag: 'formación',
      title: 'Certificaciones',
      lead: 'Voy certificando lo que aprendo. Ahora mismo, el foco está en administración Microsoft y Azure.',
      verify: 'Verificar credencial ↗',
      items: [
        { badge: 'Microsoft', name: 'MD-102', iss: 'Endpoint Administrator · en preparación' },
        { badge: 'CompTIA · SY0-701', name: 'Security+ (ce)', iss: 'nov. 2025 → nov. 2028', href: 'https://www.credly.com/badges/ad3204d9-e927-4383-8dc3-4a181659a195/linked_in_profile' },
        { badge: 'eLearnSecurity · INE', name: 'eJPTv2', iss: 'Junior Penetration Tester · dic. 2025', href: 'https://certs.ine.com/e9a35620-16fe-47f8-b9d2-a25223872fc6' },
        { badge: 'Google · Coursera', name: 'Google Cybersecurity', iss: 'Professional Certificate', href: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/Z3GIB12XPAFV' },
      ],
      more: '<strong>En el horizonte: AZ-104 (Azure Administrator) y AZ-500.</strong> Además, base en seguridad (Security+, eJPTv2), hacking ético y análisis de malware.',
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
        'reiderer — Juan Rodríguez Castellano’s digital home. Microsoft Systems, Cloud and Security. Labs, projects and a blog.',
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
      pill: 'Personal log · Microsoft Systems & Cloud',
      eyebrow: 'reiderer',
      h1pre: "Hi, I'm ",
      h1em: 'Juan Rodríguez',
      role: 'Microsoft Systems · Cloud · Endpoint',
      roleAccent: '· Entra ID · Intune · Azure',
      sub: 'I manage and secure Microsoft infrastructure: identity with Entra ID, endpoint management with Intune, Microsoft 365 and Azure, with PowerShell automation. I build labs close to real environments and document every step.',
      tags: ['Microsoft 365', 'Entra ID · Intune', 'Azure', 'PowerShell', 'Endpoint security'],
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
        'I’m Juan Rodríguez Castellano, a <strong>systems administrator</strong> specialized in the <strong>Microsoft</strong> stack: identity with Entra ID, endpoint management with Intune, Microsoft 365 and Azure.',
        'I come from systems administration (ASIR) and it’s where I feel at home: Windows Server and Active Directory, networking, virtualization and cloud. <strong>Building the infrastructure, understanding how it fits together and keeping it running and secure</strong> is what drives me.',
        'My edge is <strong>security</strong>: I come from a SOC and Blue Team, so I don’t just deploy systems, I secure them. MFA, Conditional Access and identity and endpoint protection are part of how I work, not an add-on.',
        'I use <b>reiderer</b> to build labs close to real environments, document what I learn and share the journey. Right now my focus is going deeper into <b>Azure (AZ-104)</b> and automation with <b>PowerShell</b>.',
        'And if there’s one thing I’m sure of, it’s that this isn’t about piling up tools, alerts or dashboards, but about understanding things well and <strong>telling signal from noise</strong>.',
      ],
      skills: ['Microsoft 365','Entra ID','Intune','Windows Server','Active Directory','Azure','PowerShell','Virtualization','Networking / TCP-IP','Identity security','Microsoft Sentinel','Linux'],
    },
    projects: {
      tag: 'technical work',
      title: 'Projects & ',
      titleEm: 'Labs',
      lead: 'What I build, close to a real environment and not as a demo: Microsoft systems administration —identity, endpoint and cloud— with security as the common thread.',
      groups: [
        {
          accent: 'blue',
          title: 'MICROSOFT SYSTEMS — identity, endpoint and cloud',
          cards: [
            { label: 'Featured', labelHot: true, title: 'Microsoft 365 deployment at scale', desc: 'Real migration of 230+ endpoints with Windows Autopilot, Entra ID and Intune in a corporate environment, with compliance and endpoint security policies.', tags: ['#Autopilot','#EntraID','#Intune','#M365'], href: 'https://github.com/juanrc98', link: 'View on GitHub →' },
            { future: 'blue-f', label: 'In progress', title: 'Automation toolkit (PowerShell + Graph)', desc: 'PowerShell module for onboarding/offboarding users in Entra ID, M365 license assignment and reporting (MFA, licenses, devices) via Microsoft Graph.', tags: ['#PowerShell','#MicrosoftGraph','#Automation'] },
            { future: 'blue-f', label: 'In progress', title: 'Hybrid identity lab', desc: 'On-prem Active Directory synced with Entra ID (Entra Connect), Conditional Access, MFA and endpoint management with Intune. The hybrid environment companies ask for.', tags: ['#ActiveDirectory','#EntraID','#Intune','#Hybrid'] },
            { title: 'High Availability Cluster', desc: 'High-availability cluster with Pacemaker and Corosync on Linux, with MariaDB load balancing and automatic failover.', tags: ['#Pacemaker','#Corosync','#HA','#Linux'], href: 'https://juanrc98.github.io/Proyecto-cluster.pdf', link: 'View documentation →' },
          ],
        },
        {
          accent: 'blue',
          title: 'CLOUD & SECURITY — Azure and detection',
          cards: [
            { label: 'In progress', title: 'Microsoft Sentinel Lab', desc: 'Cloud-native lab in Azure: log ingestion, KQL analytic rules mapped to MITRE ATT&CK, identity hunting and automated response. Where my two worlds meet: cloud and security.', tags: ['#Sentinel','#KQL','#Azure'] },
            { label: 'Full lab', title: 'Wazuh SIEM Lab', desc: 'Full Wazuh lab with a monitored Metasploitable3 and Kali as the offensive box. MITRE ATT&CK detection, 22 CVEs with CVSS prioritization, custom XML rules and VirusTotal API integration.', tags: ['#Wazuh','#MITREATTACK','#VirusTotal'], href: 'https://github.com/juanrc98', link: 'View on GitHub →' },
          ],
        },
        {
          accent: 'red',
          title: 'EXTRA — Red Team & CTF',
          cards: [
            { red: true, label: 'Medium', title: 'DarkHole: 1', desc: 'Web enumeration, SQL injection and privilege escalation via SUID binaries, with internal service analysis.', tags: ['#SQLi','#SUID','#PrivEsc'], href: 'https://juanrc98.github.io/write-up.pdf', link: 'View write-up →' },
            { red: true, label: 'Medium', title: 'Psycho: 1', desc: 'Thorough enumeration, LFI exploitation, log analysis and privilege escalation through scripts with special permissions.', tags: ['#LFI','#LogAnalysis','#PrivEsc'], href: 'https://juanrc98.github.io/write-up-2.pdf', link: 'View write-up →' },
            { future: 'red-f', red: true, label: 'Future', title: 'Road to OSCP', desc: 'Offensive knowledge that makes me a better defender and admin. A parallel goal, no rush.', tags: ['#RedTeam','#OSCP','#OffSec'] },
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
        { when: 'Mar 2026 — May 2026 · Córdoba · On-site', role: 'IT Support Technician — Microsoft 365 Migration', org: 'ECOINTEGRAL INGENIERÍA, SL (via GI Group)', desc: 'Deployment and migration of 230+ Windows endpoints to Microsoft 365, within the integration into Bureau Veritas. Windows Autopilot, identities in Entra ID, compliance policies and user support.', stack: 'Windows 11 · Autopilot · Entra ID · Microsoft 365 · Intune' },
        { when: 'Oct 2025 — Dec 2025 · Córdoba · On-site', role: 'IT Technician', org: 'Fersoft Informática', desc: 'Support and rollout of business management software in SMBs (Verifactu project). SQL Server, billing software and on-site and remote user support.', stack: 'Windows · SQL Server · Remote support' },
        { when: 'Mar 2025 — Jun 2025 · Córdoba · Hybrid', role: 'Cybersecurity Analyst — SOC N1', org: 'IaaS365 · Internship', desc: '24/7 multi-client SOC: monitoring, triage and alert escalation. SIEM (LogPoint, Wazuh) and EDR/XDR (Vision One, Cynet), IOCs and MITRE ATT&CK, Nessus/OpenVAS scans, GoPhish phishing and ENS audits.', stack: 'LogPoint · Wazuh · Vision One · Cynet · MITRE ATT&CK · ENS' },
      ],
    },
    certs: {
      tag: 'education',
      title: 'Certifications',
      lead: 'I certify what I learn. Right now the focus is Microsoft systems administration and Azure.',
      verify: 'Verify credential ↗',
      items: [
        { badge: 'Microsoft', name: 'MD-102', iss: 'Endpoint Administrator · in progress' },
        { badge: 'CompTIA · SY0-701', name: 'Security+ (ce)', iss: 'Nov 2025 → Nov 2028', href: 'https://www.credly.com/badges/ad3204d9-e927-4383-8dc3-4a181659a195/linked_in_profile' },
        { badge: 'eLearnSecurity · INE', name: 'eJPTv2', iss: 'Junior Penetration Tester · Dec 2025', href: 'https://certs.ine.com/e9a35620-16fe-47f8-b9d2-a25223872fc6' },
        { badge: 'Google · Coursera', name: 'Google Cybersecurity', iss: 'Professional Certificate', href: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/Z3GIB12XPAFV' },
      ],
      more: '<strong>On the horizon: AZ-104 (Azure Administrator) and AZ-500.</strong> Plus a security foundation (Security+, eJPTv2), ethical hacking and malware analysis.',
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
