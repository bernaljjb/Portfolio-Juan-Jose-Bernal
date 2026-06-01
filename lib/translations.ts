export type Lang = "es" | "en";

export const translations = {
  es: {
    nav: {
      projects: "Proyectos",
      about: "Sobre mí",
      contact: "Contacto",
    },
    hero: {
      location: "Bogotá, Colombia",
      role: [
        "UX/UI & Product Designer —",
        "experiencias digitales centradas en las personas.",
      ],
      ctaProjects: "Ver proyectos",
      ctaAbout: "Sobre mí",
    },
    ticker: {
      skills: [
        "Sistemas de diseño",
        "Diseño de producto",
        "UX Research",
        "Pruebas de usuario",
        "Branding",
        "Wireframing",
        "Figma",
        "Notion",
        "Illustrator",
        "Photoshop",
        "Claude",
        "Diseño responsivo",
        "Mentoría",
        "Prototipado",
      ],
    },
    projects: {
      label: "Proyectos",
      heading: "Trabajo selecto",
      uxuiHeading: "UX/UI Projects",
      brandingHeading: "Branding Projects",
      comingSoon: "Proyectos en camino",
      imagePlaceholder: "imagen próximamente",
      viewFigma: "Ver en Figma →",
      viewCaseStudy: "Ver caso de estudio →",
      items: {
        habita: {
          tagline: "App de smart home",
          description:
            "Diseño end-to-end: UI KIT, Branding, Prototipado navegable y pruebas de usuario para una app de control del hogar inteligente.",
        },
        esdesign: {
          tagline: "Auditoría WCAG AA",
          description:
            "Auditoría de accesibilidad WCAG AA del login de EsDesign. Análisis de contraste, estructura y propuestas de mejora.",
        },
        substrack: {
          tagline: "Dashboard web",
          description:
            "Dashboard web para centralizar y visualizar todas las suscripciones activas en un solo lugar.",
        },
      },
    },
    about: {
      label: "Sobre mí",
      heading: ["Diseño con propósito,", "construyo con contexto."],
      bio: "Soy diseñador UX/UI y Product Designer con más de 7 años de experiencia construyendo productos digitales que resuelven problemas reales. Mi trabajo abarca todo el proceso — desde investigación y discovery hasta sistemas de diseño y handoff. Me especializo en apps móviles y plataformas B2B, trabajando en la intersección entre las necesidades del usuario y los objetivos del negocio. Uso la IA como parte central de mi proceso de diseño para mover más rápido sin perder calidad. Basado en Bogotá, disponible para oportunidades remotas.",
      expertise: [
        {
          title: "UX Research",
          description:
            "Práctica de investigación end-to-end: entrevistas a usuarios, pruebas de usabilidad, journey mapping y síntesis en decisiones de diseño accionables. He facilitado tests moderados y no moderados, definido personas a partir de datos reales y traducido hallazgos en estrategia de producto.",
        },
        {
          title: "UI & Design Systems",
          description:
            "Construyo sistemas de diseño escalables desde cero: tokens, bibliotecas de componentes, documentación y handoff. Atomic design aplicado a productos reales, no solo guías de estilo. Sistemas que los desarrolladores pueden usar de verdad.",
        },
        {
          title: "Producto & Estrategia",
          description:
            "Conecto diseño y producto: traduzco briefs ambiguos en direcciones de diseño claras, priorizo con criterio y comunico decisiones a stakeholders. Uso herramientas de IA para acelerar la síntesis de investigación, revisiones de accesibilidad y ciclos de iteración.",
        },
      ],
    },
    contact: {
      label: "Contacto",
      heading: ["Trabajemos", "juntos."],
    },
  },

  en: {
    nav: {
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
    hero: {
      location: "Bogotá, Colombia",
      role: [
        "UX/UI & Product Designer —",
        "human-centered digital experiences.",
      ],
      ctaProjects: "View projects",
      ctaAbout: "About me",
    },
    ticker: {
      skills: [
        "Design Systems",
        "Product Design",
        "UX Research",
        "User Testing",
        "Branding",
        "Wireframing",
        "Figma",
        "Notion",
        "Illustrator",
        "Photoshop",
        "Claude",
        "Responsive Design",
        "Mentoring",
        "Prototyping",
      ],
    },
    projects: {
      label: "Projects",
      heading: "Selected work",
      uxuiHeading: "UX/UI Projects",
      brandingHeading: "Branding Projects",
      comingSoon: "Projects coming soon",
      imagePlaceholder: "image coming soon",
      viewFigma: "View on Figma →",
      viewCaseStudy: "View case study →",
      items: {
        habita: {
          tagline: "Smart home app",
          description:
            "End-to-end design: UI KIT, Branding, interactive prototype, and user testing for a smart home control app.",
        },
        esdesign: {
          tagline: "WCAG AA Audit",
          description:
            "WCAG AA accessibility audit of EsDesign's login. Contrast analysis, structure review, and improvement proposals.",
        },
        substrack: {
          tagline: "Web dashboard",
          description:
            "Web dashboard to centralize and track all active subscriptions in one place.",
        },
      },
    },
    about: {
      label: "About",
      heading: ["Design with purpose,", "build with context."],
      bio: "I'm a UX/UI and Product Designer with 7+ years of experience building digital products that solve real problems. My work spans the full design process — from discovery and research to design systems and final handoff. I specialize in mobile apps and B2B platforms, working at the intersection of user needs and business goals. I use AI as a core part of my design process to move faster without losing quality. Based in Bogotá, open to remote opportunities worldwide.",
      expertise: [
        {
          title: "UX Research",
          description:
            "End-to-end research practice: user interviews, usability testing, journey mapping, and synthesis into actionable design decisions. I've run moderated and unmoderated tests, defined personas from real data, and translated findings into product strategy.",
        },
        {
          title: "UI & Design Systems",
          description:
            "I build scalable design systems from the ground up — tokens, component libraries, documentation, and handoff. Atomic design applied to real products, not just style guides. Systems that developers can actually use.",
        },
        {
          title: "Product & Strategy",
          description:
            "I bridge design and product: I translate ambiguous briefs into clear design directions, prioritize ruthlessly, and communicate decisions to stakeholders. I use AI tools to accelerate research synthesis, accessibility checks, and iteration cycles.",
        },
      ],
    },
    contact: {
      label: "Contact",
      heading: ["Let's work", "together."],
    },
  },
};

export type T = (typeof translations)["es"];
