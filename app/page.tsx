'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const CSS = `
  .jjb {
    --acc: #E5402A;
    --ink: #0E0E0C;
    --paper: #EFEBE1;
    --dark: #11151D;
    --display: 'Bricolage Grotesque', sans-serif;
    --body: 'Satoshi', sans-serif;
    --mono: 'Hubot Sans', sans-serif;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--body);
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* ── NAV ── */
  .jjb-nav {
    position: sticky; top: 0; z-index: 60;
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 40px;
    background: var(--paper);
    border-bottom: 3px solid var(--ink);
  }
  .jjb-nav-brand {
    display: flex; align-items: center; gap: 12px; text-decoration: none;
  }
  .jjb-nav-logo { height: 30px; width: auto; display: block; }
  .jjb-nav-sep { width: 3px; height: 22px; background: var(--ink); }
  .jjb-nav-label {
    font-family: var(--mono); font-size: 11px; letter-spacing: .14em;
    text-transform: uppercase; color: var(--acc);
  }
  .jjb-nav-links {
    display: flex; align-items: center; gap: 28px; list-style: none;
  }
  .jjb-nav-links a {
    text-decoration: none; font-family: var(--mono); font-size: 12px;
    letter-spacing: .12em; text-transform: uppercase; color: var(--ink);
    transition: color .2s;
  }
  .jjb-nav-links a:hover { color: var(--acc); }

  /* lang toggle */
  .jjb-lang {
    display: flex; align-items: center; position: relative;
    background: #e0dbd0; border-radius: 20px; padding: 3px;
  }
  .jjb-lang-slider {
    position: absolute; top: 3px; bottom: 3px;
    width: calc(50% - 3px); border-radius: 16px;
    background: var(--ink);
    transition: transform .25s cubic-bezier(.4,0,.2,1);
    pointer-events: none;
  }
  .jjb-lang[data-lang="en"] .jjb-lang-slider { transform: translateX(100%); }
  .jjb-lang-btn {
    position: relative; z-index: 1;
    background: transparent; border: none; cursor: pointer;
    font-family: var(--mono); font-size: 11px; letter-spacing: .08em;
    padding: 4px 10px; border-radius: 16px;
    color: var(--ink); transition: color .25s;
  }
  .jjb-lang-btn.active { color: var(--paper); }

  /* hamburger */
  .jjb-hamburger {
    display: none; flex-direction: column; justify-content: center; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 8px 4px;
  }
  .jjb-hamburger span {
    display: block; width: 22px; height: 2px; background: var(--ink);
    transition: transform .35s ease, opacity .25s;
  }
  .jjb-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .jjb-hamburger.open span:nth-child(2) { opacity: 0; }
  .jjb-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* mobile overlay */
  .jjb-overlay {
    position: fixed; inset: 0; z-index: 50;
    background: var(--paper); border-bottom: 3px solid var(--ink);
    display: flex; flex-direction: column; padding: 100px 40px 40px;
    gap: 0; pointer-events: none; opacity: 0;
    transition: opacity .3s ease;
  }
  .jjb-overlay.open { opacity: 1; pointer-events: all; }
  .jjb-overlay a {
    text-decoration: none; font-family: var(--display); font-weight: 800;
    font-size: 52px; letter-spacing: -.02em; line-height: 1;
    color: var(--ink); padding: 20px 0;
    border-bottom: 2px solid var(--ink);
    transition: color .2s, padding-left .2s;
  }
  .jjb-overlay a:hover { color: var(--acc); padding-left: 12px; }
  .jjb-overlay-lang { display: flex; gap: 12px; margin-top: 32px; }

  /* ── HERO ── */
  .jjb-hero { padding: 28px 40px 56px; border-bottom: 3px solid var(--ink); }
  .jjb-masthead {
    display: flex; justify-content: space-between; align-items: center;
    font-family: var(--mono); font-size: 12px; letter-spacing: .1em;
    text-transform: uppercase; color: var(--ink);
    padding-bottom: 22px;
  }
  .jjb-name-grid {
    display: grid; grid-template-columns: 1fr auto;
    gap: 30px; align-items: end;
  }
  .jjb-h1 {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(56px, 10vw, 160px);
    line-height: .82; letter-spacing: -.045em; margin: 0; color: var(--ink);
  }
  .jjb-h1-line { display: block; overflow: hidden; }
  .jjb-h1-inner {
    display: block;
    animation: jjbRise .95s cubic-bezier(.16,.84,.34,1) both;
  }
  .jjb-h1-inner:nth-child(1) { animation-delay: 0s; }
  .jjb-h1-line:nth-child(2) .jjb-h1-inner { animation-delay: .12s; color: var(--ink); }
  .jjb-h1-line:nth-child(3) .jjb-h1-inner { animation-delay: .24s; color: var(--acc); }
  .jjb-hero-right {
    max-width: 320px; padding-bottom: 18px;
    opacity: 0; animation: jjbFade .9s .5s forwards;
  }
  .jjb-hero-desc {
    font-size: 15px; line-height: 1.6; color: var(--ink);
    border-top: 3px solid var(--ink); padding-top: 14px; margin-bottom: 18px;
  }
  .jjb-hero-cta {
    display: inline-block; text-decoration: none;
    font-family: var(--mono); font-size: 13px; letter-spacing: .06em;
    text-transform: uppercase; background: var(--acc); color: var(--paper);
    padding: 10px 18px; border-radius: 6px;
    transform: rotate(-2deg);
    transition: transform .25s, background .2s;
  }
  .jjb-hero-cta:hover { transform: rotate(0) scale(1.04); background: #c73520; }
  .jjb-hero-cta:active { transform: scale(.97); background: #a02919; }

  /* ── MARQUEE ── */
  .jjb-marquee {
    border-bottom: 3px solid var(--ink); background: var(--acc);
    overflow: hidden; white-space: nowrap; padding: 6px 0;
  }
  .jjb-marquee-track {
    display: inline-flex; width: max-content;
    animation: jjbMarq 30s linear infinite;
  }
  .jjb-marquee:hover .jjb-marquee-track { animation-play-state: paused; }
  .jjb-marquee-item {
    font-family: var(--mono); font-weight: 400; font-size: 11px;
    color: var(--paper); padding: 0 16px; letter-spacing: .12em;
  }

  /* ── FEATURED HABITA ── */
  .jjb-featured {
    border-bottom: 3px solid var(--ink);
    background: var(--dark); color: var(--paper);
  }
  .jjb-featured-grid {
    display: grid; grid-template-columns: 1fr 1fr; align-items: stretch;
  }
  .jjb-featured-copy {
    padding: 64px 40px; display: flex; flex-direction: column;
    justify-content: center; border-right: 3px solid #2a2f3a;
  }
  .jjb-featured-eyebrow {
    font-family: var(--mono); font-size: 12px; letter-spacing: .16em;
    text-transform: uppercase; color: #F5C518; margin-bottom: 20px;
  }
  .jjb-featured-name {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(40px, 5vw, 80px); line-height: .9;
    letter-spacing: -.03em; margin: 0 0 22px; color: var(--paper);
  }
  .jjb-featured-desc {
    font-size: 16px; line-height: 1.6; color: #aeb3bd;
    max-width: 440px; margin-bottom: 28px;
  }
  .jjb-featured-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
  .jjb-featured-chip {
    font-family: var(--mono); font-size: 11px; color: var(--paper);
    border: 1.5px solid #3a3f4a; padding: 6px 12px; border-radius: 20px;
  }
  .jjb-featured-link {
    text-decoration: none; align-self: flex-start;
    display: inline-flex; align-items: center; gap: 12px;
    font-family: var(--mono); font-size: 13px; letter-spacing: .06em;
    text-transform: uppercase; background: #F5C518; color: var(--dark);
    padding: 13px 22px; border-radius: 6px; transition: transform .25s;
  }
  .jjb-featured-link:hover { transform: translateX(6px); }
  .jjb-featured-visual {
    position: relative; display: flex; align-items: center;
    justify-content: center; padding: 50px 40px; overflow: hidden;
  }
  .jjb-featured-glow {
    position: absolute; width: 70%; height: 70%;
    background: radial-gradient(circle, rgba(245,197,24,.18), transparent 70%);
    filter: blur(20px);
  }
  .jjb-phone-fan { position: relative; width: 340px; height: 320px; }
  .jjb-phone {
    width: 120px; height: 240px; background: #0d1117;
    border-radius: 18px; overflow: hidden; border: 2px solid #1e2433;
    position: absolute; box-shadow: 0 20px 60px rgba(0,0,0,.35);
    transition: transform .5s cubic-bezier(.23,1,.32,1), box-shadow .5s;
  }
  .jjb-phone img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
  .jjb-phone:nth-child(1) { left: 50%; transform: translateX(-50%) translateX(-88px) rotate(-12deg) translateY(22px); z-index: 1; }
  .jjb-phone:nth-child(2) { left: 50%; transform: translateX(-50%) translateY(-6px); z-index: 3; width: 134px; height: 268px; }
  .jjb-phone:nth-child(3) { left: 50%; transform: translateX(-50%) translateX(88px) rotate(12deg) translateY(22px); z-index: 1; }
  .jjb-featured-visual:hover .jjb-phone:nth-child(1) { transform: translateX(-50%) translateX(-112px) rotate(-14deg) translateY(8px); box-shadow: 0 28px 72px rgba(0,0,0,.45); }
  .jjb-featured-visual:hover .jjb-phone:nth-child(2) { transform: translateX(-50%) translateY(-22px); box-shadow: 0 32px 80px rgba(0,0,0,.5); }
  .jjb-featured-visual:hover .jjb-phone:nth-child(3) { transform: translateX(-50%) translateX(112px) rotate(14deg) translateY(8px); box-shadow: 0 28px 72px rgba(0,0,0,.45); }

  /* ── PROJECT INDEX ── */
  .jjb-index { border-bottom: 3px solid var(--ink); }
  .jjb-index-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 40px; border-bottom: 3px solid var(--ink);
  }
  .jjb-index-label {
    font-family: var(--mono); font-size: 13px; letter-spacing: .18em;
    text-transform: uppercase; margin: 0;
  }
  .jjb-index-meta {
    font-family: var(--mono); font-size: 13px; letter-spacing: .1em;
    text-transform: uppercase; color: var(--ink);
  }
  .jjb-row {
    display: grid; grid-template-columns: 1fr auto; align-items: center;
    gap: 24px; padding: 28px 40px;
    border-bottom: 1.5px solid var(--ink);
    text-decoration: none; color: var(--ink);
    transition: background .25s, color .25s, padding-left .25s;
    cursor: pointer;
  }
  .jjb-row:last-child { border-bottom: none; }
  .jjb-row:hover { background: var(--acc); color: var(--paper); padding-left: 56px; }
  .jjb-row-name {
    font-family: var(--display); font-weight: 700;
    font-size: clamp(22px, 3vw, 38px); letter-spacing: -.025em; line-height: 1;
  }
  .jjb-row-right {
    display: flex; align-items: center; gap: 18px;
    font-family: var(--mono); font-size: 13px;
    letter-spacing: .06em; text-transform: uppercase;
    white-space: nowrap;
  }
  .jjb-row-arrow { font-size: 22px; transition: transform .25s; }
  .jjb-row:hover .jjb-row-arrow { transform: translateX(8px); }
  .jjb-row-muted { opacity: .45; cursor: default; }
  .jjb-row-muted:hover { background: transparent; color: var(--ink); padding-left: 40px; }

  /* ── BRANDING CARD (hero) ── */
  .jjb-branding-card {
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; margin-bottom: 18px;
    padding: 14px 16px; border-radius: 8px;
    background: var(--dark); color: var(--paper);
    text-decoration: none;
    border: 3px solid var(--ink);
    transition: background .25s, border-color .25s, transform .25s;
    position: relative; overflow: hidden;
  }
  .jjb-branding-card::after {
    content: ''; position: absolute; inset: 0;
    background: #D4920A; transform: translateX(-101%);
    transition: transform .3s cubic-bezier(.16,.84,.34,1);
    z-index: 0;
  }
  .jjb-branding-card:hover::after { transform: translateX(0); }
  .jjb-branding-card:hover { border-color: #D4920A; }
  .jjb-branding-card-left { display: flex; flex-direction: column; gap: 3px; position: relative; z-index: 1; }
  .jjb-branding-card-label {
    font-family: var(--mono); font-size: 9px; letter-spacing: .2em;
    text-transform: uppercase; color: #D4920A;
    transition: color .25s;
  }
  .jjb-branding-card:hover .jjb-branding-card-label { color: var(--dark); }
  .jjb-branding-card-name {
    font-family: var(--display); font-weight: 800; font-size: 18px;
    letter-spacing: -.02em; line-height: 1.1; color: var(--paper);
    transition: color .25s;
  }
  .jjb-branding-card:hover .jjb-branding-card-name { color: var(--dark); }
  .jjb-branding-card-arrow {
    font-family: var(--mono); font-size: 20px; color: #D4920A;
    transition: transform .3s cubic-bezier(.16,.84,.34,1), color .25s;
    flex-shrink: 0; position: relative; z-index: 1;
  }
  .jjb-branding-card:hover .jjb-branding-card-arrow { transform: translateX(8px); color: var(--dark); }

  /* ── SKILLS ── */
  .jjb-skills { border-bottom: 3px solid var(--ink); }
  .jjb-skills-header {
    padding: 28px 40px; border-bottom: 3px solid var(--ink);
  }
  .jjb-skills-label {
    font-family: var(--mono); font-size: 13px; letter-spacing: .18em;
    text-transform: uppercase; margin: 0;
  }
  .jjb-skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
  .jjb-skill {
    padding: 44px 36px; border-right: 3px solid var(--ink);
    transition: background .25s;
  }
  .jjb-skill:last-child { border-right: none; }
  .jjb-skill:hover { background: #e7e3d9; }
  .jjb-skill-name {
    font-family: var(--display); font-weight: 800; font-size: 34px;
    letter-spacing: -.02em; line-height: 1; margin: 0 0 16px; color: var(--ink);
  }
  .jjb-skill-desc { font-size: 15px; line-height: 1.6; color: #3a352d; margin: 0; }

  /* ── CONTACT ── */
  .jjb-contact {
    background: var(--ink); color: var(--paper); padding: 90px 40px 40px;
  }
  .jjb-contact-eyebrow {
    font-family: var(--mono); font-size: 13px; letter-spacing: .18em;
    text-transform: uppercase; color: var(--acc); margin-bottom: 24px;
  }
  .jjb-contact-headline {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(40px, 7vw, 96px); line-height: .88;
    letter-spacing: -.04em; margin: 0 0 48px; color: var(--paper);
  }
  .jjb-contact-bottom {
    display: flex; flex-wrap: wrap; justify-content: space-between;
    align-items: flex-end; gap: 30px;
    padding-bottom: 50px; border-bottom: 3px solid #2a2f3a;
  }
  .jjb-contact-email {
    text-decoration: none;
    font-family: var(--display); font-weight: 600;
    font-size: clamp(20px, 3.5vw, 42px); letter-spacing: -.02em;
    color: var(--paper); border-bottom: 3px solid transparent;
    transition: color .3s, border-color .3s;
  }
  .jjb-contact-email:hover { color: var(--acc); border-color: var(--acc); }
  .jjb-contact-socials { display: flex; gap: 22px; }
  .jjb-contact-socials a {
    text-decoration: none; font-family: var(--mono); font-size: 13px;
    letter-spacing: .1em; text-transform: uppercase;
    color: #aeb3bd; transition: color .25s;
  }
  .jjb-contact-socials a:hover { color: var(--paper); }
  .jjb-footer {
    display: flex; flex-wrap: wrap; justify-content: space-between;
    gap: 16px; padding-top: 26px;
    font-family: var(--mono); font-size: 11px; letter-spacing: .06em;
    color: #7c8190;
  }

  /* ── ANIMATIONS ── */
  @keyframes jjbRise { from { transform: translateY(115%); } to { transform: translateY(0); } }
  @keyframes jjbFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
  @keyframes jjbMarq  { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* ── MOBILE ── */
  @media (max-width: 768px) {
    .jjb-nav-links, .jjb-nav-label { display: none; }
    .jjb-hamburger { display: flex; }
    .jjb-masthead { flex-direction: column; gap: 6px; align-items: flex-start; }
    .jjb-name-grid { grid-template-columns: 1fr; gap: 24px; }
    .jjb-hero-right { max-width: 100%; }
    .jjb-featured-grid { grid-template-columns: 1fr; }
    .jjb-featured-copy { border-right: none; border-bottom: 3px solid #2a2f3a; }
    .jjb-featured-visual { padding: 40px 24px; min-height: 320px; }
    .jjb-skills-grid { grid-template-columns: 1fr; }
    .jjb-skill { border-right: none; border-bottom: 3px solid var(--ink); }
    .jjb-skill:last-child { border-bottom: none; }
    .jjb-index-header, .jjb-row { padding: 22px 24px; }
    .jjb-row:hover { padding-left: 36px; }
    .jjb-hero, .jjb-contact { padding-left: 24px; padding-right: 24px; }
    .jjb-nav { padding: 14px 24px; }
    .jjb-contact-headline { font-size: clamp(48px, 16vw, 96px); }
    .jjb-featured-copy { padding: 44px 24px; }
    .jjb-skills-header { padding: 22px 24px; }
  }
`;

export default function Home() {
  const { lang: language, setLang: setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const T = {
    es: {
      nav: { work: 'Trabajo', branding: 'Branding', skills: 'Skills', contact: 'Contacto', label: 'UX/UI Product Designer' },
      masthead: { loc: 'Bogotá, Colombia', role: 'UX/UI & Product Designer' },
      hero: {
        desc: 'Diseñador UX/UI y de producto. Convierto investigación en interfaces que sí se construyen — apps móviles, design systems y estrategia.',
        cta: 'Disponible ↗',
      },
      featured: {
        eyebrow: 'Caso destacado',
        name: 'HABITA',
        desc: 'App de smart home que centraliza el control del hogar en una sola interfaz. Diseño end-to-end: UI Kit, branding, prototipo navegable y pruebas de usuario con 5 participantes.',
        chips: ['Figma', 'Maze', 'UI Kit', 'User Testing'],
        cta: 'Ver caso de estudio',
      },
      index: {
        label: 'Índice de proyectos',
        meta: 'Selección 2024—2025',
        rows: [
          { name: 'Substrack',            meta: 'Dashboard · Design System',  href: '/projects/substrack' },
          { name: 'EsDesign Login',       meta: 'WCAG AA · Rediseño',         href: '/projects/esdesign' },
          { name: 'Sistema de Turnos',    meta: 'Design System · Maze',       href: '/projects/sistema-de-turnos' },
          { name: 'Pruebas de Usabilidad',meta: 'UX Research · Maze',         href: null },
          { name: 'Cards Documentation',  meta: 'Handoff · Specs',            href: null },
        ],
      },
      skills: {
        label: 'Qué hago',
        items: [
          { name: 'UX Research',    desc: 'Personas, flujos, arquitectura de información y pruebas de usabilidad moderadas. Síntesis de hallazgos en recomendaciones accionables.' },
          { name: 'Design Systems', desc: 'Atomic design, componentes reutilizables, tokens y documentación de handoff. Sistemas escalables desde el wireframe hasta la UI final.' },
          { name: 'Producto',       desc: 'Traducción de necesidades en decisiones de diseño concretas. Uso de IA como herramienta para mejorar accesibilidad y legibilidad.' },
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
      nav: { work: 'Work', branding: 'Branding', skills: 'Skills', contact: 'Contact', label: 'UX/UI Product Designer' },
      masthead: { loc: 'Bogotá, Colombia', role: 'UX/UI & Product Designer' },
      hero: {
        desc: 'UX/UI & product designer. I turn research into interfaces that actually ship — mobile apps, design systems and strategy.',
        cta: 'Available ↗',
      },
      featured: {
        eyebrow: 'Featured case',
        name: 'HABITA',
        desc: 'Smart-home app that centralizes household control in one interface. End-to-end design: UI Kit, branding, navigable prototype and user testing with 5 participants.',
        chips: ['Figma', 'Maze', 'UI Kit', 'User Testing'],
        cta: 'View case study',
      },
      index: {
        label: 'Project index',
        meta: 'Selected 2024—2025',
        rows: [
          { name: 'Substrack',            meta: 'Dashboard · Design System',  href: '/projects/substrack' },
          { name: 'EsDesign Login',       meta: 'WCAG AA · Redesign',         href: '/projects/esdesign' },
          { name: 'Queue Management System', meta: 'Design System · Maze',    href: '/projects/sistema-de-turnos' },
          { name: 'Usability Testing',    meta: 'UX Research · Maze',         href: null },
          { name: 'Cards Documentation',  meta: 'Handoff · Specs',            href: null },
        ],
      },
      skills: {
        label: 'What I do',
        items: [
          { name: 'UX Research',    desc: 'Personas, flows, information architecture and moderated usability tests. Findings synthesized into actionable recommendations.' },
          { name: 'Design Systems', desc: 'Atomic design, reusable components, tokens and handoff docs. Scalable systems from wireframe to final UI.' },
          { name: 'Product',        desc: 'Translating needs into concrete design decisions. Using AI as a tool to improve accessibility and legibility.' },
        ],
      },
      contact: {
        eyebrow: "Let's talk",
        headline: 'A NEW\nPROJECT?',
        copy: '© 2025 Juan José Bernal Núñez',
        made: 'Made in Bogotá, Colombia',
      },
    },
  };

  const t = language === 'en' ? T.en : T.es;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <div className="jjb">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* NAV */}
      <nav className="jjb-nav">
        <Link href="/" className="jjb-nav-brand">
          <Image src="/Images/LogoJJB/Logo JJB negro.png" alt="JJB" width={80} height={30} className="jjb-nav-logo" />
          <div className="jjb-nav-sep" />
          <span className="jjb-nav-label">UX/UI</span>
        </Link>
        <ul className="jjb-nav-links">
          <li><a href="#work">{t.nav.work}</a></li>
          <li><a href="#skills">{t.nav.skills}</a></li>
          <li><a href="#contact">{t.nav.contact}</a></li>
        </ul>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <div className="jjb-lang" data-lang={language}>
            <span className="jjb-lang-slider" />
            <button className={`jjb-lang-btn${language === 'es' ? ' active' : ''}`} onClick={() => setLanguage('es')}>ES</button>
            <button className={`jjb-lang-btn${language === 'en' ? ' active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
          </div>
          <button className={`jjb-hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Menú">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div className={`jjb-overlay${menuOpen ? ' open' : ''}`}>
        <a href="#work"    onClick={() => setMenuOpen(false)}>{t.nav.work}</a>
        <a href="#skills"  onClick={() => setMenuOpen(false)}>{t.nav.skills}</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
        <div className="jjb-overlay-lang">
          <button className={`jjb-lang-btn${language === 'es' ? ' active' : ''}`} style={{ border:'2px solid var(--ink)' }} onClick={() => setLanguage('es')}>ES</button>
          <button className={`jjb-lang-btn${language === 'en' ? ' active' : ''}`} style={{ border:'2px solid var(--ink)' }} onClick={() => setLanguage('en')}>EN</button>
        </div>
      </div>

      {/* HERO */}
      <header id="top" className="jjb-hero">
        <div className="jjb-masthead">
          <span>{t.masthead.loc}</span>
          <span>{t.masthead.role}</span>
        </div>
        <div className="jjb-name-grid">
          <h1 className="jjb-h1">
            <span className="jjb-h1-line"><span className="jjb-h1-inner" style={{ animationDelay:'0s' }}>JUAN</span></span>
            <span className="jjb-h1-line"><span className="jjb-h1-inner" style={{ animationDelay:'.12s' }}>JOSÉ</span></span>
            <span className="jjb-h1-line"><span className="jjb-h1-inner" style={{ animationDelay:'.24s', color:'var(--acc)' }}>BERNAL</span></span>
          </h1>
          <div className="jjb-hero-right">
            <Link href="/branding" className="jjb-branding-card">
              <div className="jjb-branding-card-left">
                <span className="jjb-branding-card-label">{language === 'es' ? 'Identidad de marca' : 'Brand identity'}</span>
                <span className="jjb-branding-card-name">BRANDING</span>
              </div>
              <span className="jjb-branding-card-arrow">→</span>
            </Link>
            <p className="jjb-hero-desc">{t.hero.desc}</p>
            <a href="#contact" className="jjb-hero-cta">{t.hero.cta}</a>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <section className="jjb-marquee" aria-hidden="true">
        <div className="jjb-marquee-track">
          <span className="jjb-marquee-item">UX RESEARCH&nbsp;✺&nbsp;DESIGN SYSTEMS&nbsp;✺&nbsp;PROTOTYPING&nbsp;✺&nbsp;USER TESTING&nbsp;✺&nbsp;FIGMA&nbsp;✺&nbsp;MOBILE APPS&nbsp;✺&nbsp;WIREFRAMING&nbsp;✺&nbsp;INTERACTION DESIGN&nbsp;✺&nbsp;USABILITY&nbsp;✺&nbsp;PRODUCT DESIGN&nbsp;✺&nbsp;ACCESSIBILITY&nbsp;✺&nbsp;DESIGN TOKENS&nbsp;✺&nbsp;</span>
          <span className="jjb-marquee-item">UX RESEARCH&nbsp;✺&nbsp;DESIGN SYSTEMS&nbsp;✺&nbsp;PROTOTYPING&nbsp;✺&nbsp;USER TESTING&nbsp;✺&nbsp;FIGMA&nbsp;✺&nbsp;MOBILE APPS&nbsp;✺&nbsp;WIREFRAMING&nbsp;✺&nbsp;INTERACTION DESIGN&nbsp;✺&nbsp;USABILITY&nbsp;✺&nbsp;PRODUCT DESIGN&nbsp;✺&nbsp;ACCESSIBILITY&nbsp;✺&nbsp;DESIGN TOKENS&nbsp;✺&nbsp;</span>
        </div>
      </section>

      {/* FEATURED — HABITA */}
      <section id="work" className="jjb-featured">
        <div className="jjb-featured-grid">
          <div className="jjb-featured-copy">
            <p className="jjb-featured-eyebrow">{t.featured.eyebrow}</p>
            <h2 className="jjb-featured-name">{t.featured.name}</h2>
            <p className="jjb-featured-desc">{t.featured.desc}</p>
            <div className="jjb-featured-chips">
              {t.featured.chips.map(c => <span key={c} className="jjb-featured-chip">{c}</span>)}
            </div>
            <Link href="/projects/habita" className="jjb-featured-link">
              <span>{t.featured.cta}</span><span>→</span>
            </Link>
          </div>
          <div className="jjb-featured-visual">
            <div className="jjb-featured-glow" />
            <div className="jjb-phone-fan">
              <div className="jjb-phone">
                <Image src="/Images/Habita/Sala Habita.jpg" alt="Habita sala" fill style={{ objectFit:'cover', objectPosition:'top' }} />
              </div>
              <div className="jjb-phone">
                <Image src="/Images/Habita/Home Habita.png" alt="Habita home" fill style={{ objectFit:'cover', objectPosition:'top' }} />
              </div>
              <div className="jjb-phone">
                <Image src="/Images/Habita/Configuracion Habita.png" alt="Habita configuración" fill style={{ objectFit:'cover', objectPosition:'top' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT INDEX */}
      <section className="jjb-index">
        <div className="jjb-index-header">
          <h2 className="jjb-index-label">{t.index.label}</h2>
        </div>
        {t.index.rows.map((row) =>
          row.href ? (
            <Link key={row.name} href={row.href} className="jjb-row">
              <span className="jjb-row-name">{row.name}</span>
              <span className="jjb-row-right">
                <span>{row.meta}</span>
                <span className="jjb-row-arrow">→</span>
              </span>
            </Link>
          ) : (
            <div key={row.name} className="jjb-row jjb-row-muted">
              <span className="jjb-row-name">{row.name}</span>
              <span className="jjb-row-right">
                <span>{row.meta}</span>
                <span className="jjb-row-arrow">→</span>
              </span>
            </div>
          )
        )}
      </section>

      {/* SKILLS */}
      <section id="skills" className="jjb-skills">
        <div className="jjb-skills-header">
          <h2 className="jjb-skills-label">{t.skills.label}</h2>
        </div>
        <div className="jjb-skills-grid">
          {t.skills.items.map(s => (
            <div key={s.name} className="jjb-skill">
              <h3 className="jjb-skill-name">{s.name}</h3>
              <p className="jjb-skill-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="jjb-contact">
        <p className="jjb-contact-eyebrow">{t.contact.eyebrow}</p>
        <h2 className="jjb-contact-headline">
          {t.contact.headline.split('\n').map((line, i) => (
            <span key={i} style={{ display:'block' }}>{line}</span>
          ))}
        </h2>
        <div className="jjb-contact-bottom">
          <a href="mailto:juanjose.bernal14@gmail.com" className="jjb-contact-email">
            juanjose.bernal14@gmail.com
          </a>
          <div className="jjb-contact-socials">
            <a href="https://www.linkedin.com/in/juanjosebernal-uxuidesigner/" target="_blank" rel="noopener">LinkedIn ↗</a>
            <a href="https://www.behance.net/juanjoseb" target="_blank" rel="noopener">Behance ↗</a>
          </div>
        </div>
        <footer className="jjb-footer">
          <span>{t.contact.copy}</span>
          <span>{t.contact.made}</span>
        </footer>
      </section>
    </div>
  );
}
