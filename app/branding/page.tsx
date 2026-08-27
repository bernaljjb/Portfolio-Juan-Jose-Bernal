'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const CSS = `
  .br {
    --acc: #D4920A;
    --ink: #0E0E0C;
    --paper: #EFEBE1;
    --dark: #11151D;
    --display: 'Bricolage Grotesque', sans-serif;
    --body: 'Space Grotesk', sans-serif;
    --mono: 'Space Mono', monospace;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--body);
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* ── NAV ── */
  .br-nav {
    position: sticky; top: 0; z-index: 60;
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 40px;
    background: var(--paper);
    border-bottom: 3px solid var(--ink);
  }
  .br-nav-brand {
    display: flex; align-items: center; gap: 12px; text-decoration: none;
  }
  .br-nav-logo { height: 30px; width: auto; display: block; }
  .br-nav-label {
    font-family: var(--mono); font-size: 11px; letter-spacing: .14em;
    text-transform: uppercase; color: var(--acc);
  }
  .br-nav-links {
    display: flex; align-items: center; gap: 28px; list-style: none; margin: 0; padding: 0;
  }
  .br-nav-links a {
    text-decoration: none; font-family: var(--mono); font-size: 12px;
    letter-spacing: .12em; text-transform: uppercase; color: var(--ink);
    transition: color .2s;
  }
  .br-nav-links a:hover { color: var(--acc); }
  .br-lang {
    display: flex; align-items: center;
    border: 2px solid var(--ink);
  }
  .br-lang-btn {
    background: transparent; border: none; cursor: pointer;
    font-family: var(--mono); font-size: 11px; letter-spacing: .08em;
    padding: 5px 9px; color: var(--ink); transition: background .15s, color .15s;
  }
  .br-lang-btn.active { background: var(--ink); color: var(--paper); }

  /* hamburger */
  .br-hamburger {
    display: none; flex-direction: column; justify-content: center; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 8px 4px;
  }
  .br-hamburger span { display: block; width: 22px; height: 2px; background: var(--ink); transition: transform .35s ease, opacity .25s; }
  .br-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .br-hamburger.open span:nth-child(2) { opacity: 0; }
  .br-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* overlay */
  .br-overlay {
    position: fixed; inset: 0; z-index: 50;
    background: var(--paper); border-bottom: 3px solid var(--ink);
    display: flex; flex-direction: column; padding: 100px 40px 40px;
    pointer-events: none; opacity: 0; transition: opacity .3s ease;
  }
  .br-overlay.open { opacity: 1; pointer-events: all; }
  .br-overlay a {
    text-decoration: none; font-family: var(--display); font-weight: 800;
    font-size: 52px; letter-spacing: -.02em; line-height: 1;
    color: var(--ink); padding: 20px 0; border-bottom: 2px solid var(--ink);
    transition: color .2s, padding-left .2s;
  }
  .br-overlay a:hover { color: var(--acc); padding-left: 12px; }

  /* ── HERO ── */
  .br-hero { padding: 28px 40px 56px; border-bottom: 3px solid var(--ink); }
  .br-masthead {
    display: flex; justify-content: space-between; align-items: center;
    font-family: var(--mono); font-size: 12px; letter-spacing: .1em;
    text-transform: uppercase; color: var(--ink); padding-bottom: 22px;
  }
  .br-name-grid {
    display: grid; grid-template-columns: 1fr auto;
    gap: 30px; align-items: end;
  }
  .br-h1 {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(72px, 16vw, 240px);
    line-height: .82; letter-spacing: -.045em; margin: 0; color: var(--ink);
  }
  .br-h1-line { display: block; overflow: hidden; }
  .br-h1-inner { display: block; animation: brRise .95s cubic-bezier(.16,.84,.34,1) both; }
  .br-h1-inner.acc { color: var(--acc); }
  .br-hero-right {
    max-width: 320px; padding-bottom: 18px;
    opacity: 0; animation: brFade .9s .5s forwards;
  }
  .br-hero-uxlink {
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; margin-bottom: 18px; padding: 14px 16px;
    border: 3px solid var(--ink);
    text-decoration: none; color: var(--ink);
    position: relative; overflow: hidden;
  }
  .br-hero-uxlink::after {
    content: ''; position: absolute; inset: 0;
    background: var(--ink); transform: translateX(-101%);
    transition: transform .3s cubic-bezier(.16,.84,.34,1);
    z-index: 0;
  }
  .br-hero-uxlink:hover::after { transform: translateX(0); }
  .br-hero-uxlink > * { position: relative; z-index: 1; }
  .br-hero-uxlink:hover { color: var(--paper); }
  .br-hero-uxlink-label {
    font-family: var(--mono); font-size: 9px; letter-spacing: .2em;
    text-transform: uppercase; color: #7a7770; display: block; margin-bottom: 3px;
    transition: color .3s;
  }
  .br-hero-uxlink:hover .br-hero-uxlink-label { color: rgba(239,235,225,.6); }
  .br-hero-uxlink-name {
    font-family: var(--display); font-weight: 800; font-size: 22px;
    letter-spacing: -.02em; line-height: 1;
  }
  .br-hero-uxlink-arrow { font-family: var(--mono); font-size: 20px; color: #7a7770; transition: transform .2s, color .3s; flex-shrink: 0; }
  .br-hero-uxlink:hover .br-hero-uxlink-arrow { transform: translateX(-6px); color: var(--paper); }
  .br-hero-desc {
    font-size: 15px; line-height: 1.6; color: var(--ink);
    border-top: 3px solid var(--ink); padding-top: 14px; margin-bottom: 18px;
  }
  .br-hero-cta {
    display: inline-block; text-decoration: none;
    font-family: var(--mono); font-size: 13px; letter-spacing: .06em;
    text-transform: uppercase; background: var(--acc); color: var(--paper);
    padding: 10px 18px; transform: rotate(-2deg);
    transition: transform .25s, background .2s;
  }
  .br-hero-cta:hover { transform: rotate(0) scale(1.04); background: #b57a08; }

  /* ── MARQUEE ── */
  .br-marquee {
    border-bottom: 3px solid var(--ink); background: var(--acc);
    overflow: hidden; white-space: nowrap; padding: 12px 0;
  }
  .br-marquee-track {
    display: inline-flex; width: max-content;
    animation: brMarq 30s linear infinite;
  }
  .br-marquee:hover .br-marquee-track { animation-play-state: paused; }
  .br-marquee-item {
    font-family: var(--display); font-weight: 800; font-size: 38px;
    color: var(--dark); padding: 0 26px; letter-spacing: -.01em;
  }

  /* ── FEATURED ── */
  .br-featured {
    border-bottom: 3px solid var(--ink);
    background: var(--dark); color: var(--paper);
  }
  .br-featured-grid {
    display: grid; grid-template-columns: 1fr 1fr; align-items: stretch;
  }
  .br-featured-copy {
    padding: 64px 40px; display: flex; flex-direction: column;
    justify-content: center; border-right: 3px solid #2a2f3a;
  }
  .br-featured-eyebrow {
    font-family: var(--mono); font-size: 12px; letter-spacing: .16em;
    text-transform: uppercase; color: var(--acc); margin-bottom: 20px;
  }
  .br-featured-name {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(56px, 9vw, 128px); line-height: .86;
    letter-spacing: -.03em; margin: 0 0 22px; color: var(--paper);
  }
  .br-featured-desc {
    font-size: 16px; line-height: 1.6; color: #aeb3bd;
    max-width: 440px; margin-bottom: 28px;
  }
  .br-featured-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
  .br-featured-chip {
    font-family: var(--mono); font-size: 11px; color: var(--paper);
    border: 1.5px solid #3a3f4a; padding: 6px 12px;
  }
  .br-featured-coming {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--mono); font-size: 12px; letter-spacing: .1em;
    text-transform: uppercase; color: rgba(239,235,225,.4);
    border: 2px solid rgba(239,235,225,.15); padding: 12px 20px; align-self: flex-start;
  }
  .br-featured-visual {
    position: relative; display: flex; align-items: center;
    justify-content: center; padding: 60px 40px; overflow: hidden;
  }
  .br-featured-glow {
    position: absolute; width: 70%; height: 70%;
    background: radial-gradient(circle, rgba(212,146,10,.2), transparent 70%);
    filter: blur(20px);
  }
  .br-featured-placeholder {
    display: flex; flex-direction: column; align-items: center; gap: 20px; position: relative;
  }
  .br-logo-block {
    border: 3px solid rgba(212,146,10,.4); padding: 32px 48px;
    display: flex; align-items: center; justify-content: center;
  }
  .br-logo-text {
    font-family: var(--display); font-weight: 800; font-size: 52px;
    letter-spacing: -.03em; color: var(--acc); line-height: 1;
  }
  .br-color-swatches { display: flex; gap: 8px; }
  .br-swatch { width: 40px; height: 40px; border: 2px solid rgba(255,255,255,.1); }

  /* ── INDEX ── */
  .br-index { border-bottom: 3px solid var(--ink); }
  .br-index-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 40px; border-bottom: 3px solid var(--ink);
  }
  .br-index-label { font-family: var(--mono); font-size: 13px; letter-spacing: .18em; text-transform: uppercase; margin: 0; }
  .br-index-meta { font-family: var(--mono); font-size: 13px; letter-spacing: .1em; text-transform: uppercase; color: var(--ink); }
  .br-row {
    display: grid; grid-template-columns: 1fr auto; align-items: center;
    gap: 24px; padding: 28px 40px;
    border-bottom: 1.5px solid var(--ink);
    text-decoration: none; color: var(--ink);
    transition: background .25s, color .25s, padding-left .25s; cursor: pointer;
  }
  .br-row:last-child { border-bottom: none; }
  .br-row:hover { background: var(--acc); color: var(--paper); padding-left: 56px; }
  .br-row-name {
    font-family: var(--display); font-weight: 700;
    font-size: clamp(32px, 5vw, 60px); letter-spacing: -.025em; line-height: 1;
  }
  .br-row-right {
    display: flex; align-items: center; gap: 18px;
    font-family: var(--mono); font-size: 13px;
    letter-spacing: .06em; text-transform: uppercase; white-space: nowrap;
  }
  .br-row-arrow { font-size: 22px; transition: transform .25s; }
  .br-row:hover .br-row-arrow { transform: translateX(8px); }
  .br-row-muted { opacity: .35; cursor: default; }
  .br-row-muted:hover { background: transparent; color: var(--ink); padding-left: 40px; }

  /* ── SKILLS ── */
  .br-skills { border-bottom: 3px solid var(--ink); }
  .br-skills-header { padding: 28px 40px; border-bottom: 3px solid var(--ink); }
  .br-skills-label { font-family: var(--mono); font-size: 13px; letter-spacing: .18em; text-transform: uppercase; margin: 0; }
  .br-skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
  .br-skill {
    padding: 44px 36px; border-right: 3px solid var(--ink); transition: background .25s;
  }
  .br-skill:last-child { border-right: none; }
  .br-skill:hover { background: #e7e3d9; }
  .br-skill-name { font-family: var(--display); font-weight: 800; font-size: 34px; letter-spacing: -.02em; line-height: 1; margin: 0 0 16px; }
  .br-skill-desc { font-size: 15px; line-height: 1.6; color: #3a352d; margin: 0; }

  /* ── CONTACT ── */
  .br-contact {
    background: var(--ink); color: var(--paper); padding: 90px 40px 40px;
  }
  .br-contact-eyebrow { font-family: var(--mono); font-size: 13px; letter-spacing: .18em; text-transform: uppercase; color: var(--acc); margin-bottom: 24px; }
  .br-contact-headline {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(54px, 12vw, 180px); line-height: .82;
    letter-spacing: -.04em; margin: 0 0 48px; color: var(--paper);
  }
  .br-contact-bottom {
    display: flex; flex-wrap: wrap; justify-content: space-between;
    align-items: flex-end; gap: 30px;
    padding-bottom: 50px; border-bottom: 3px solid #2a2f3a;
  }
  .br-contact-email {
    text-decoration: none; font-family: var(--display); font-weight: 600;
    font-size: clamp(20px, 3.5vw, 42px); letter-spacing: -.02em;
    color: var(--paper); border-bottom: 3px solid transparent;
    transition: color .3s, border-color .3s;
  }
  .br-contact-email:hover { color: var(--acc); border-color: var(--acc); }
  .br-contact-socials { display: flex; gap: 22px; }
  .br-contact-socials a {
    text-decoration: none; font-family: var(--mono); font-size: 13px;
    letter-spacing: .1em; text-transform: uppercase;
    color: #aeb3bd; transition: color .25s;
  }
  .br-contact-socials a:hover { color: var(--paper); }
  .br-footer {
    display: flex; flex-wrap: wrap; justify-content: space-between;
    gap: 16px; padding-top: 26px;
    font-family: var(--mono); font-size: 11px; letter-spacing: .06em; color: #7c8190;
  }

  /* ── ANIMATIONS ── */
  @keyframes brRise { from { transform: translateY(115%); } to { transform: translateY(0); } }
  @keyframes brFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
  @keyframes brMarq { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* ── MOBILE ── */
  @media (max-width: 768px) {
    .br-nav { padding: 14px 24px; }
    .br-nav-links, .br-nav-label { display: none; }
    .br-hamburger { display: flex; }
    .br-masthead { flex-direction: column; gap: 6px; align-items: flex-start; }
    .br-name-grid { grid-template-columns: 1fr; gap: 24px; }
    .br-hero-right { max-width: 100%; }
    .br-hero, .br-contact { padding-left: 24px; padding-right: 24px; }
    .br-featured-grid { grid-template-columns: 1fr; }
    .br-featured-copy { border-right: none; border-bottom: 3px solid #2a2f3a; }
    .br-featured-visual { padding: 40px 24px; min-height: 280px; }
    .br-index-header, .br-row { padding: 22px 24px; }
    .br-row:hover { padding-left: 36px; }
    .br-skills-grid { grid-template-columns: 1fr; }
    .br-skill { border-right: none; border-bottom: 3px solid var(--ink); }
    .br-skill:last-child { border-bottom: none; }
    .br-skills-header { padding: 22px 24px; }
    .br-nav { padding: 14px 24px; }
  }
`;

const T = {
  es: {
    nav: { ux: 'UX/UI Portfolio', contact: 'Contacto', label: 'Branding' },
    masthead: { loc: 'Bogotá, Colombia', role: 'Brand Designer' },
    hero: {
      desc: 'Identidad visual y sistemas de marca. Logotipos, paletas, tipografía y guías que dan forma a cómo una empresa se ve y se siente en el mundo.',
      cta: 'Disponible ↗',
      uxLabel: 'UX/UI Portfolio',
      uxName: 'UX/UI',
    },
    marquee: 'MANUAL DE USUARIO ✺ TIPOGRAFÍA ✺ LOGOS ✺ MOCKUPS ✺ CONSULTORÍA ✺ COLORES DE MARCA ✺ ILUSTRACIÓN ✺ PACKAGING ✺ CREACIÓN DE MARCA ✺ ',
    featured: {
      eyebrow: 'Próximamente',
      name: 'MARCA',
      desc: 'El primer proyecto de branding estará disponible pronto. Mientras tanto, explora el trabajo de UX/UI en el portfolio principal.',
      chips: ['Figma', 'Identidad', 'Sistema'],
      coming: 'En construcción',
    },
    index: {
      label: 'Proyectos de branding',
      meta: 'Selección 2023—2025',
      rows: [
        { name: 'Direction',       meta: 'Consultoría de coaching · Identidad visual',  href: null },
        { name: 'Nurish by Sarita', meta: 'Creadora de contenido · Nutrición',           href: '/branding/nurish' },
        { name: 'Sogerisk',        meta: 'Peritajes para seguros · Sistema de marca',   href: null },
        { name: 'Lageados',        meta: 'Streaming & gaming · Branding',               href: null },
      ],
    },
    skills: {
      label: 'Qué hago en branding',
      items: [
        { name: 'Identidad visual', desc: 'Construcción de sistemas de marca desde el logotipo hasta los elementos de aplicación. Paletas, tipografía y reglas de uso documentadas.' },
        { name: 'Sistemas de color', desc: 'Paletas primarias y secundarias con criterio semántico — colores que comunican la personalidad de la marca antes de que hable.' },
        { name: 'Guías de marca', desc: 'Documentación completa del sistema: usos correctos, incorrectos, variantes y aplicaciones. Todo lo que un equipo necesita para usar la marca bien.' },
      ],
    },
    contact: {
      eyebrow: 'Hablemos',
      headline: '¿NUEVO\nPROYECTO?',
      copy: '© 2025 Juan José Bernal Núñez',
      made: 'Hecho en Bogotá, Colombia',
    },
  },
  en: {
    nav: { ux: 'UX/UI Portfolio', contact: 'Contact', label: 'Branding' },
    masthead: { loc: 'Bogotá, Colombia', role: 'Brand Designer' },
    hero: {
      desc: 'Visual identity and brand systems. Logos, palettes, typography and guidelines that shape how a company looks and feels in the world.',
      cta: 'Available ↗',
      uxLabel: 'UX/UI Portfolio',
      uxName: 'UX/UI',
    },
    marquee: 'MANUAL DE USUARIO ✺ TIPOGRAFÍA ✺ LOGOS ✺ MOCKUPS ✺ CONSULTORÍA ✺ COLORES DE MARCA ✺ ILUSTRACIÓN ✺ PACKAGING ✺ CREACIÓN DE MARCA ✺ ',
    featured: {
      eyebrow: 'Coming soon',
      name: 'BRAND',
      desc: 'The first branding project will be available soon. Meanwhile, explore the UX/UI work in the main portfolio.',
      chips: ['Figma', 'Identity', 'System'],
      coming: 'In progress',
    },
    index: {
      label: 'Branding projects',
      meta: 'Selected 2023—2025',
      rows: [
        { name: 'Direction',        meta: 'Coaching consultancy · Visual identity',  href: null },
        { name: 'Nurish by Sarita', meta: 'Content creator · Nutrition',             href: '/branding/nurish' },
        { name: 'Sogerisk',         meta: 'Insurance appraisals · Brand system',     href: null },
        { name: 'Lageados',         meta: 'Streaming & gaming · Branding',           href: null },
      ],
    },
    skills: {
      label: 'What I do in branding',
      items: [
        { name: 'Visual identity', desc: 'Building brand systems from the logo to application elements. Documented palettes, typography and usage rules.' },
        { name: 'Color systems', desc: 'Primary and secondary palettes with semantic criteria — colors that communicate the brand personality before it speaks.' },
        { name: 'Brand guidelines', desc: 'Complete system documentation: correct uses, incorrect uses, variants and applications. Everything a team needs to use the brand well.' },
      ],
    },
    contact: {
      eyebrow: "Let's talk",
      headline: 'A NEW\nPROJECT?',
      copy: '© 2025 Juan José Bernal Núñez',
      made: 'Made in Bogotá, Colombia',
    },
  },
} as const;

type Lang = keyof typeof T;

export default function BrandingPage() {
  const { lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = T[lang as Lang];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <div className="br">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* NAV */}
      <nav className="br-nav">
        <Link href="/branding" className="br-nav-brand">
          <Image src="/Images/LogoJJB/Logo JJB negro.png" alt="JJB" width={80} height={30} className="br-nav-logo" />
          <span className="br-nav-label">{t.nav.label}</span>
        </Link>
        <ul className="br-nav-links">
          <li><Link href="/" style={{ textDecoration:'none', fontFamily:'var(--mono)', fontSize:12, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ink)', transition:'color .2s' }}>{t.nav.ux}</Link></li>
          <li><a href="#contact">{t.nav.contact}</a></li>
        </ul>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <div className="br-lang">
            <button className={`br-lang-btn${lang==='es'?' active':''}`} onClick={() => setLang('es')}>ES</button>
            <button className={`br-lang-btn${lang==='en'?' active':''}`} onClick={() => setLang('en')}>EN</button>
          </div>
          <button className={`br-hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Menú">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div className={`br-overlay${menuOpen ? ' open' : ''}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>{t.nav.ux}</Link>
        <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
      </div>

      {/* HERO */}
      <header className="br-hero">
        <div className="br-masthead">
          <span>{t.masthead.loc}</span>
          <span>{t.masthead.role}</span>
        </div>
        <div className="br-name-grid">
          <h1 className="br-h1">
            <span className="br-h1-line"><span className="br-h1-inner" style={{ animationDelay:'0s' }}>JUAN</span></span>
            <span className="br-h1-line"><span className="br-h1-inner" style={{ animationDelay:'.08s' }}>JOSÉ</span></span>
            <span className="br-h1-line"><span className="br-h1-inner acc" style={{ animationDelay:'.16s' }}>BERNAL</span></span>
          </h1>
          <div className="br-hero-right">
            <Link href="/" className="br-hero-uxlink">
              <div>
                <span className="br-hero-uxlink-label">{t.hero.uxLabel}</span>
                <span className="br-hero-uxlink-name">{t.hero.uxName}</span>
              </div>
              <span className="br-hero-uxlink-arrow">←</span>
            </Link>
            <p className="br-hero-desc">{t.hero.desc}</p>
            <a href="#contact" className="br-hero-cta">{t.hero.cta}</a>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <section className="br-marquee" aria-hidden="true">
        <div className="br-marquee-track">
          <span className="br-marquee-item">{t.marquee}</span>
          <span className="br-marquee-item">{t.marquee}</span>
        </div>
      </section>

      {/* FEATURED */}
      <section className="br-featured">
        <div className="br-featured-grid">
          <div className="br-featured-copy">
            <p className="br-featured-eyebrow">{t.featured.eyebrow}</p>
            <h2 className="br-featured-name">{t.featured.name}</h2>
            <p className="br-featured-desc">{t.featured.desc}</p>
            <div className="br-featured-chips">
              {t.featured.chips.map(c => <span key={c} className="br-featured-chip">{c}</span>)}
            </div>
            <div className="br-featured-coming">
              <span>◐</span><span>{t.featured.coming}</span>
            </div>
          </div>
          <div className="br-featured-visual">
            <div className="br-featured-glow" />
            <div className="br-featured-placeholder">
              <div className="br-logo-block">
                <span className="br-logo-text">BR</span>
              </div>
              <div className="br-color-swatches">
                <div className="br-swatch" style={{ background:'#D4920A' }} />
                <div className="br-swatch" style={{ background:'#EFEBE1' }} />
                <div className="br-swatch" style={{ background:'#11151D' }} />
                <div className="br-swatch" style={{ background:'#7a7770' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT INDEX */}
      <section className="br-index">
        <div className="br-index-header">
          <h2 className="br-index-label">{t.index.label}</h2>
          <span className="br-index-meta">{t.index.meta}</span>
        </div>
        {t.index.rows.map((row, i) =>
          row.href ? (
            <Link key={i} href={row.href} className="br-row">
              <span className="br-row-name">{row.name}</span>
              <span className="br-row-right"><span>{row.meta}</span><span className="br-row-arrow">→</span></span>
            </Link>
          ) : (
            <div key={i} className="br-row br-row-muted">
              <span className="br-row-name">{row.name}</span>
              <span className="br-row-right"><span>{row.meta}</span><span className="br-row-arrow">→</span></span>
            </div>
          )
        )}
      </section>

      {/* SKILLS */}
      <section className="br-skills">
        <div className="br-skills-header">
          <h2 className="br-skills-label">{t.skills.label}</h2>
        </div>
        <div className="br-skills-grid">
          {t.skills.items.map(s => (
            <div key={s.name} className="br-skill">
              <h3 className="br-skill-name">{s.name}</h3>
              <p className="br-skill-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="br-contact">
        <p className="br-contact-eyebrow">{t.contact.eyebrow}</p>
        <h2 className="br-contact-headline">
          {t.contact.headline.split('\n').map((line, i) => (
            <span key={i} style={{ display:'block' }}>{line}</span>
          ))}
        </h2>
        <div className="br-contact-bottom">
          <a href="mailto:juanjose.bernal14@gmail.com" className="br-contact-email">
            juanjose.bernal14@gmail.com
          </a>
          <div className="br-contact-socials">
            <a href="https://www.linkedin.com/in/juanjosebernal-uxuidesigner/" target="_blank" rel="noopener">LinkedIn ↗</a>
            <a href="https://www.behance.net/juanjoseb" target="_blank" rel="noopener">Behance ↗</a>
          </div>
        </div>
        <footer className="br-footer">
          <span>{t.contact.copy}</span>
          <span>{t.contact.made}</span>
        </footer>
      </section>
    </div>
  );
}
