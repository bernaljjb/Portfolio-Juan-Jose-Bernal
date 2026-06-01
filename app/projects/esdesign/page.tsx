'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  .es-page {
    --bg: #F5F2ED; --ink: #0F0E0C; --muted: #6B6860;
    --rule: #D8D4CC; --card: #EDEAE3;
    --orange: #E8421A; --navy: #1a1a2e; --green: #2D8B6F;
    --display: 'Bebas Neue', sans-serif;
    --mono: 'DM Mono', monospace;
    --body: 'DM Sans', sans-serif;
    --roboto: 'Roboto', sans-serif;
    background: var(--bg); color: var(--ink);
    font-family: var(--body); overflow-x: hidden; min-height: 100vh;
  }
  .es-page section { border-bottom: 1px solid var(--rule); }
  @keyframes esd-up { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }

  /* NAV — Habita style */
  .es-page nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 48px;
    background: rgba(245,242,237,0.92); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--rule);
  }
  .es-nav-back {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--mono); font-size: 11px; letter-spacing: .12em;
    text-transform: uppercase; color: var(--muted); text-decoration: none;
    transition: color .2s;
  }
  .es-nav-back:hover { color: var(--orange); }
  .es-nav-back:hover svg { transform: translateX(-4px); }
  .es-nav-back svg { transition: transform .2s; }
  .es-nav-right { display: flex; align-items: center; gap: 20px; }
  .es-nav-logo { height: 36px; width: auto; display: block; }
  .es-lang-toggle { display: flex; align-items: center; gap: 6px; }
  .es-lang-btn { font-family: var(--mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; background: none; border: none; padding: 2px 0; transition: color .2s; cursor: pointer; }
  .es-lang-btn.active  { color: var(--ink); font-weight: 600; cursor: default; }
  .es-lang-btn.inactive { color: var(--muted); }
  .es-lang-btn.inactive:hover { color: var(--orange); }
  .es-lang-sep { font-family: var(--mono); font-size: 10px; color: var(--muted); opacity: .4; user-select: none; }

  /* HERO */
  .hero {
    min-height: 100vh; padding: 120px 48px 80px;
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; gap: 80px;
    background: #fff; position: relative; overflow: hidden;
    border-bottom: 1px solid var(--rule);
  }
  .hero::before {
    content: ''; position: absolute; top: 0; right: 0;
    width: 55%; height: 100%;
    background: linear-gradient(150deg,#d8cce8 0%,#b8d0e8 45%,#e8d4c0 100%);
    opacity: .25; pointer-events: none;
  }
  .hero::after {
    content: ''; position: absolute; top: -80px; right: -80px;
    width: 360px; height: 360px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,66,26,.1), transparent 70%);
    pointer-events: none;
  }
  .hero-content { position: relative; z-index: 1; }
  .hero-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; opacity: 0; animation: esd-up .8s .2s forwards; }
  .h-num { font-family: var(--mono); font-size: 11px; letter-spacing: .2em; color: var(--orange); }
  .h-tag { font-family: var(--mono); font-size: 9px; letter-spacing: .15em; text-transform: uppercase; padding: 4px 10px; border: 1px solid rgba(232,66,26,.35); color: var(--orange); border-radius: 2px; }
  .h-tag-dark { border-color: rgba(26,26,46,.3); color: var(--navy); }
  .project-title { font-family: var(--display); font-size: clamp(64px,9vw,140px); line-height: .9; color: var(--ink); opacity: 0; animation: esd-up 1s .3s forwards; }
  .project-title span { color: var(--orange); display: block; }
  .hero-tagline { font-size: 17px; line-height: 1.65; color: var(--muted); max-width: 400px; margin-top: 20px; opacity: 0; animation: esd-up .9s .45s forwards; }
  .hero-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; opacity: 0; animation: esd-up .9s .55s forwards; }
  .chip { font-family: var(--mono); font-size: 9px; letter-spacing: .12em; text-transform: uppercase; padding: 5px 12px; border: 1px solid var(--rule); color: var(--muted); border-radius: 2px; }
  .chip-orange { border-color: rgba(232,66,26,.3); color: var(--orange); }

  /* Hero before/after cards */
  .hero-visual { position: relative; z-index: 1; display: flex; gap: 14px; align-items: flex-start; opacity: 0; animation: esd-up 1.1s .5s forwards; }
  .lcard { flex: 1; border-radius: 10px; padding: 22px 18px; display: flex; flex-direction: column; gap: 9px; box-shadow: 0 8px 40px rgba(0,0,0,.1); position: relative; overflow: hidden; }
  .lcard-before { background: linear-gradient(150deg,#c8b8d8 0%,#a8c4d8 50%,#d8c4b0 100%); }
  .lcard-after { background: #fff; border: 1px solid #e8e8e8; }
  .vs { width: 32px; height: 32px; background: var(--ink); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-family: var(--mono); font-size: 9px; flex-shrink: 0; align-self: center; }
  .lc-badge { font-family: var(--mono); font-size: 8px; letter-spacing: .15em; text-transform: uppercase; padding: 3px 7px; border-radius: 2px; width: fit-content; margin-bottom: 4px; }
  .lc-badge-fail { background: rgba(232,66,26,.15); color: var(--orange); border: 1px solid rgba(232,66,26,.3); }
  .lc-badge-pass { background: rgba(45,139,111,.1); color: var(--green); border: 1px solid rgba(45,139,111,.3); }
  .lc-brand { display: flex; align-items: baseline; gap: 3px; }
  .lc-es { font-weight: 900; font-size: 18px; color: var(--orange); }
  .lc-design-before { font-weight: 700; font-size: 14px; color: #333; }
  .lc-design-after { font-weight: 700; font-size: 14px; color: var(--navy); }
  .lc-sub { font-size: 8px; line-height: 1.3; }
  .lc-blackboard { font-size: 11px; font-weight: 600; color: #111; }
  .lc-section { font-size: 13px; font-weight: 700; color: var(--ink); }
  .lc-field { padding: 7px 10px; border-radius: 5px; font-size: 10px; font-family: var(--roboto); }
  .lc-field-before { background: rgba(0,0,0,.5); color: rgba(255,255,255,.45); }
  .lc-field-after { background: #f7f7f7; border: 1px solid #e8e8e8; color: #aaa; }
  .lc-forgot { font-size: 9px; color: var(--orange); }
  .lc-btn { padding: 8px; border-radius: 5px; font-size: 10px; font-weight: 600; text-align: center; margin-top: 2px; font-family: var(--roboto); }
  .lc-btn-before { background: #fff; color: #666; }
  .lc-btn-after { background: var(--navy); color: white; }
  .lc-error-tag { font-size: 8px; color: var(--orange); background: rgba(232,66,26,.1); padding: 2px 6px; border-radius: 2px; border: 1px solid rgba(232,66,26,.25); width: fit-content; }
  .lc-check-tag { font-size: 8px; color: var(--green); background: rgba(45,139,111,.08); padding: 2px 6px; border-radius: 2px; border: 1px solid rgba(45,139,111,.25); width: fit-content; }

  /* INFO BAR */
  .info-bar { display: grid; grid-template-columns: repeat(4,1fr); border-bottom: 1px solid var(--rule); }
  .info-cell { padding: 32px 48px; border-right: 1px solid var(--rule); opacity: 0; transform: translateY(16px); transition: opacity .5s, transform .5s; }
  .info-cell.visible { opacity: 1; transform: none; }
  .info-cell:last-child { border-right: none; }
  .ic-label { font-family: var(--mono); font-size: 9px; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .ic-val { font-family: var(--display); font-size: 22px; letter-spacing: .02em; color: var(--ink); }

  /* SECTIONS */
  .s-intro { padding: 80px 48px; display: grid; grid-template-columns: 200px 1fr; gap: 80px; align-items: start; }
  .s-label { font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); display: flex; align-items: center; gap: 10px; position: sticky; top: 100px; align-self: start; }
  .s-label::before { content: ''; display: inline-block; width: 20px; height: 1px; background: var(--muted); }
  .s-headline { font-family: var(--display); font-size: clamp(36px,4vw,56px); line-height: 1; color: var(--ink); margin-bottom: 16px; }
  .s-text { font-size: 16px; line-height: 1.75; color: var(--muted); max-width: 600px; }
  .s-text + .s-text { margin-top: 14px; }

  /* PROCESS STEPS */
  .steps-grid { display: grid; grid-template-columns: repeat(5,1fr); border-top: 1px solid var(--rule); }
  .step-block { padding: 36px 28px; border-right: 1px solid var(--rule); opacity: 0; transform: translateY(20px); transition: opacity .5s, transform .5s; }
  .step-block.visible { opacity: 1; transform: none; }
  .step-block:last-child { border-right: none; }
  .step-num { font-family: var(--mono); font-size: 9px; letter-spacing: .2em; color: white; background: var(--orange); padding: 3px 8px; border-radius: 2px; display: inline-block; margin-bottom: 14px; }
  .step-name { font-family: var(--display); font-size: 22px; letter-spacing: .02em; color: var(--ink); margin-bottom: 8px; }
  .step-desc { font-size: 13px; line-height: 1.6; color: var(--muted); }

  /* AUDIT */
  .audit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; padding: 0 48px 80px; margin-top: 40px; }
  .audit-block { padding: 32px; border-radius: 4px; opacity: 0; transform: translateY(20px); transition: opacity .5s, transform .5s; }
  .audit-block.visible { opacity: 1; transform: none; }
  .audit-fail { background: var(--card); border-left: 3px solid var(--orange); }
  .audit-pass { background: var(--card); border-left: 3px solid var(--green); }
  .audit-tag { font-family: var(--mono); font-size: 9px; letter-spacing: .15em; text-transform: uppercase; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
  .audit-tag-fail { color: var(--orange); }
  .audit-tag-pass { color: var(--green); }
  .audit-title { font-family: var(--display); font-size: 24px; letter-spacing: .02em; color: var(--ink); margin-bottom: 8px; }
  .audit-text { font-size: 14px; line-height: 1.65; color: var(--muted); }
  .audit-ratio { font-family: var(--mono); font-size: 10px; color: var(--muted); margin-top: 10px; padding: 8px 12px; background: rgba(255,255,255,.6); border-radius: 3px; }

  /* CONTRAST */
  .contrast-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 40px; }
  .contrast-demo { border-radius: 8px; overflow: hidden; opacity: 0; transform: translateY(20px); transition: opacity .5s, transform .5s; }
  .contrast-demo.visible { opacity: 1; transform: none; }
  .cd-screen { padding: 20px; min-height: 110px; display: flex; flex-direction: column; gap: 7px; }
  .cd-footer { padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; background: var(--card); }
  .cd-footer-label { font-size: 12px; color: var(--muted); }
  .cd-status { display: flex; gap: 6px; align-items: center; }
  .cd-fail-badge { font-family: var(--mono); font-size: 8px; letter-spacing: .1em; text-transform: uppercase; padding: 2px 7px; border-radius: 2px; background: rgba(232,66,26,.12); color: var(--orange); border: 1px solid rgba(232,66,26,.25); }
  .cd-pass-badge { font-family: var(--mono); font-size: 8px; letter-spacing: .1em; text-transform: uppercase; padding: 2px 7px; border-radius: 2px; background: rgba(45,139,111,.1); color: var(--green); border: 1px solid rgba(45,139,111,.25); }
  .cd-ratio { font-family: var(--mono); font-size: 11px; color: var(--muted); }

  /* TYPOGRAPHY TABLE */
  .typo-table { margin-top: 40px; border: 1px solid var(--rule); border-radius: 4px; overflow: hidden; }
  .typo-head { display: grid; grid-template-columns: 80px 120px 120px 80px 1fr; background: var(--navy); padding: 12px 20px; gap: 8px; }
  .typo-head span { font-family: var(--mono); font-size: 9px; letter-spacing: .15em; text-transform: uppercase; color: rgba(255,255,255,.6); }
  .typo-row { display: grid; grid-template-columns: 80px 120px 120px 80px 1fr; padding: 16px 20px; gap: 8px; border-bottom: 1px solid var(--rule); align-items: center; opacity: 0; transform: translateX(-12px); transition: opacity .4s, transform .4s; }
  .typo-row.visible { opacity: 1; transform: none; }
  .typo-row:nth-child(even) { background: var(--card); }
  .typo-row:last-child { border-bottom: none; }
  .tc { font-size: 13px; color: var(--muted); font-family: var(--mono); }

  /* COMPONENTS */
  .comp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-top: 40px; }
  .comp-block { background: var(--card); padding: 32px; border-radius: 4px; opacity: 0; transform: translateY(16px); transition: opacity .5s, transform .5s; }
  .comp-block.visible { opacity: 1; transform: none; }
  .comp-label { font-family: var(--mono); font-size: 9px; letter-spacing: .18em; text-transform: uppercase; color: var(--orange); margin-bottom: 8px; }
  .comp-note { font-size: 13px; line-height: 1.6; color: var(--muted); }
  .rb { padding: 9px 20px; border-radius: 5px; font-size: 12px; font-weight: 600; font-family: var(--roboto); text-align: center; }
  .rb-primary { background: var(--orange); color: white; }
  .rb-secondary { background: rgba(232,66,26,.1); color: var(--orange); border: 1px solid rgba(232,66,26,.3); }
  .rb-navy { background: var(--navy); color: white; }
  .rb-disabled { background: #e0e0e0; color: #aaa; }
  .inp-wrap { display: flex; flex-direction: column; gap: 5px; }
  .inp-lbl { font-size: 8px; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; font-family: var(--mono); }
  .inp { padding: 8px 12px; border-radius: 5px; font-size: 11px; font-family: var(--roboto); }
  .inp-default { background: #f7f7f7; border: 1px solid #e0e0e0; color: #aaa; }
  .inp-focus { background: #fff; border: 1.5px solid var(--navy); color: var(--ink); }
  .inp-error { background: #fff; border: 1.5px solid var(--orange); color: var(--ink); }
  .inp-disabled { background: #f0f0f0; border: 1px solid #e0e0e0; color: #ccc; }

  /* FINAL SCREENS */
  .screens-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 40px; }
  .screen-card { background: #fff; border: 1px solid var(--rule); border-radius: 10px; overflow: hidden; opacity: 0; transform: translateY(24px); transition: opacity .6s, transform .6s; box-shadow: 0 4px 24px rgba(0,0,0,.06); }
  .screen-card.visible { opacity: 1; transform: none; }
  .screen-body { padding: 28px 24px; display: flex; flex-direction: column; gap: 10px; min-height: 320px; }
  .screen-cap { padding: 14px 20px; border-top: 1px solid var(--rule); background: var(--card); }
  .screen-cap-name { font-family: var(--mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
  .screen-cap-desc { font-size: 13px; color: var(--muted); margin-top: 4px; line-height: 1.5; }

  /* WCAG */
  .wcag-grid { display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid var(--rule); }
  .wcag-block { padding: 48px; border-right: 1px solid var(--rule); opacity: 0; transform: translateY(16px); transition: opacity .5s, transform .5s; }
  .wcag-block.visible { opacity: 1; transform: none; }
  .wcag-block:last-child { border-right: none; }
  .wcag-badge { font-family: var(--mono); font-size: 9px; letter-spacing: .15em; text-transform: uppercase; padding: 4px 10px; border-radius: 2px; display: inline-block; margin-bottom: 14px; }
  .wcag-fail { background: rgba(232,66,26,.1); color: var(--orange); border: 1px solid rgba(232,66,26,.3); }
  .wcag-pass { background: rgba(45,139,111,.1); color: var(--green); border: 1px solid rgba(45,139,111,.3); }
  .wcag-title { font-family: var(--display); font-size: 28px; letter-spacing: .02em; color: var(--ink); margin-bottom: 8px; }
  .wcag-text { font-size: 14px; line-height: 1.65; color: var(--muted); }

  /* RESULTS */
  .results-grid { display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid var(--rule); }
  .res-block { padding: 48px; border-right: 1px solid var(--rule); opacity: 0; transform: translateY(20px); transition: opacity .6s, transform .6s; }
  .res-block.visible { opacity: 1; transform: none; }
  .res-block:last-child { border-right: none; }
  .res-num { font-family: var(--display); font-size: 72px; line-height: 1; color: var(--ink); display: block; }
  .res-num span { color: var(--orange); }
  .res-label { font-family: var(--mono); font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: var(--muted); margin-top: 8px; }
  .res-desc { font-size: 14px; color: var(--muted); margin-top: 8px; line-height: 1.5; }

  /* LEARNINGS */
  .learn-wrap { padding: 80px 48px; }
  .learn-item { display: grid; grid-template-columns: 80px 1fr; gap: 32px; padding: 32px 0; border-bottom: 1px solid var(--rule); align-items: start; opacity: 0; transform: translateX(-16px); transition: opacity .5s, transform .5s; }
  .learn-item.visible { opacity: 1; transform: none; }
  .learn-item:last-child { border-bottom: none; }
  .learn-n { font-family: var(--display); font-size: 48px; line-height: 1; color: var(--rule); }
  .learn-title { font-family: var(--display); font-size: 28px; letter-spacing: .02em; color: var(--ink); margin-bottom: 8px; }
  .learn-text { font-size: 15px; line-height: 1.7; color: var(--muted); max-width: 600px; }

  /* NEXT */
  .next-wrap { padding: 80px 48px; display: flex; justify-content: space-between; align-items: center; background: var(--navy); }
  .next-label { font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.4); display: block; margin-bottom: 10px; }
  .next-title { font-family: var(--display); font-size: clamp(48px,6vw,80px); line-height: 1; color: white; text-decoration: none; display: block; transition: color .2s; }
  .next-title:hover { color: var(--orange); }
  .next-arrow { width: 64px; height: 64px; border: 1px solid rgba(255,255,255,.25); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,.5); text-decoration: none; transition: background .2s, color .2s; }
  .next-arrow:hover { background: var(--orange); color: white; border-color: var(--orange); }
  .es-footer { padding: 24px 48px; display: flex; justify-content: space-between; background: #111120; border-top: 1px solid rgba(255,255,255,.08); }
  .es-footer span { font-family: var(--mono); font-size: 10px; letter-spacing: .1em; color: rgba(255,255,255,.3); }

  /* IMG */
  .img-full { width: 100%; border-radius: 8px; border: 1px solid var(--rule); display: block; }
  .img-caption { font-family: var(--mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); margin-top: 12px; }

  /* DELAYS */
  .step-block:nth-child(2){transition-delay:.1s;} .step-block:nth-child(3){transition-delay:.2s;} .step-block:nth-child(4){transition-delay:.3s;} .step-block:nth-child(5){transition-delay:.4s;}
  .info-cell:nth-child(2){transition-delay:.1s;} .info-cell:nth-child(3){transition-delay:.2s;} .info-cell:nth-child(4){transition-delay:.3s;}
  .audit-block:nth-child(2){transition-delay:.1s;} .audit-block:nth-child(3){transition-delay:.1s;} .audit-block:nth-child(4){transition-delay:.2s;}
  .contrast-demo:nth-child(2){transition-delay:.1s;} .contrast-demo:nth-child(3){transition-delay:.2s;}
  .typo-row:nth-child(2){transition-delay:.05s;} .typo-row:nth-child(3){transition-delay:.1s;} .typo-row:nth-child(4){transition-delay:.15s;} .typo-row:nth-child(5){transition-delay:.2s;}
  .comp-block:nth-child(2){transition-delay:.1s;}
  .screen-card:nth-child(2){transition-delay:.15s;}
  .wcag-block:nth-child(2){transition-delay:.1s;} .wcag-block:nth-child(3){transition-delay:.2s;}
  .res-block:nth-child(2){transition-delay:.1s;} .res-block:nth-child(3){transition-delay:.2s;}
  .learn-item:nth-child(2){transition-delay:.1s;} .learn-item:nth-child(3){transition-delay:.2s;}
`;

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  es: {
    nav: { back: 'Volver al portafolio' },
    hero: {
      tagline: 'Auditoría de accesibilidad y rediseño completo del login de la plataforma educativa EsDesign — de un diseño visualmente llamativo pero inaccesible a una interfaz limpia que cumple WCAG AA.',
      before: { badge: '✕ Falla WCAG', label: 'Antes', school: 'ESCUELA SUPERIOR DE DISEÑO', loginBtn: 'Iniciar sesión', errors: ['⚠ Contraste ~2.8:1', '⚠ Labels ilegibles'] },
      after:  { badge: '✓ Cumple AA',  label: 'Después', school: 'ESCUELA SUPERIOR DE DISEÑO', platform: 'Blackboard ∧', sectionTitle: 'Inicio de sesión', emailLabel: 'Correo electrónico', passLabel: 'Contraseña', emailPh: 'correo@mail.com', passPh: '••••', forgot: '¿Olvidó contraseña?', loginBtn: 'Login', check: '✓ Ratio 21:1' },
    },
    infoBar: [
      { label: 'Tipo', value: 'Web · Rediseño' },
      { label: 'Contexto', value: 'Bootcamp TripleTen' },
      { label: 'Estándar', value: 'WCAG 2.1 AA' },
      { label: 'Tipografía', value: 'Roboto' },
    ],
    problem: {
      label: 'El problema', heading: 'Bonito no es accesible',
      p1: 'El login original de EsDesign tiene un fondo multicolor con gradiente pastel que forma parte de su identidad visual. Sobre ese fondo se superponen textos en naranja, labels en blanco semitransparente y campos con fondo oscuro — una combinación visualmente llamativa pero que falla sistemáticamente el estándar WCAG AA de contraste mínimo 4.5:1 para texto normal.',
      p2: 'El reto no era eliminar la identidad de EsDesign sino rediseñar el login para que cumpliera los criterios de accesibilidad sin perder la marca. El resultado: fondo blanco, jerarquía tipográfica clara con Roboto y el naranja EsDesign reservado para acciones y el logo — no para texto informativo.',
    },
    process: {
      label: 'Proceso', heading: 'Del diagnóstico al rediseño',
      intro: 'Cinco etapas progresivas — cada una valida la anterior antes de avanzar.',
      steps: [
        { num:'01', name:'Auditoría',    desc:'Análisis del diseño original: contraste, jerarquía, labels y cumplimiento WCAG AA. Documentación de cada falla con ratio exacto.' },
        { num:'02', name:'Wireframe',    desc:'Estructura limpia del nuevo login y pantalla de verificación de código — sin color ni tipografía final todavía.' },
        { num:'03', name:'Variables',    desc:'Sistema de variables de color y espaciado en Figma — tokens para fondo, texto, bordes, estados y feedback.' },
        { num:'04', name:'Componentes', desc:'Botones en 4 variantes con anatomía y spacing documentados. Inputs con 4 estados. Handoff listo para desarrollo.' },
        { num:'05', name:'UI Final',     desc:'Login + verificación de código navegables. Fondo blanco, Roboto, jerarquía clara y todos los criterios WCAG AA cumplidos.' },
      ],
    },
    original: {
      label: 'Diseño original', heading: 'Lo que existía — y sus problemas',
      text: 'El diseño actual de EsDesign se analizó contra el estándar WCAG 2.1 AA. Se identificaron 4 problemas críticos de contraste y legibilidad que hacen la pantalla inaccesible para usuarios con dificultades visuales.',
      caption: 'Diseño original — fondo multicolor con contraste insuficiente',
    },
    audit: {
      label: 'Auditoría WCAG', heading: '4 problemas, 4 soluciones',
      blocks: [
        { type:'fail', tag:'✕ Problema 01', title:'Contraste del logo',        text:'Naranja EsDesign (#F15A24 aprox.) sobre fondo pastel multicolor. El ratio varía pero no supera 2.8:1 — muy por debajo del mínimo 4.5:1 requerido para texto normal.',                                                           ratio:'Ratio estimado: ~2.8:1 · Requerido: 4.5:1' },
        { type:'pass', tag:'✓ Solución 01', title:'Logo sobre fondo blanco',   text:'El naranja EsDesign sobre fondo blanco puro alcanza ratio 3.8:1 para el logo grande. Los labels y textos de soporte se pasan a negro #0F0E0C — ratio 21:1.',                                                                    ratio:'Texto principal: 21:1 · Supera AA y AAA' },
        { type:'fail', tag:'✕ Problema 02', title:'Campos oscuros',            text:'Los inputs tienen fondo rgba(0,0,0,0.55) con texto blanco semitransparente. El placeholder es casi invisible (~1.8:1) y el campo se confunde con el fondo de la pantalla.',                                                     ratio:'Placeholder: ~1.8:1 · Falla gravemente' },
        { type:'pass', tag:'✓ Solución 02', title:'Campos claros con borde',   text:'Fondo #f7f7f7 con borde #e8e8e8 visible. El campo se distingue del fondo blanco de la pantalla. Estado focus con borde navy para indicar actividad — cumple criterio 2.4.7 Focus Visible.',                                    ratio:'Texto activo: negro sobre blanco · 21:1' },
      ],
    },
    contrast: {
      label: 'Análisis de contraste', heading: 'Tres elementos, tres diagnósticos',
      demos: [
        { label:'Logo + campos / fondo pastel', failBadge:'Falla AA',      ratio:'~2.8:1', fail:true },
        { label:'Links secundarios',            failBadge:'Casi invisible', ratio:'~1.5:1', fail:true },
        { label:'Rediseño final',               passBadge:'Cumple AA',      ratio:'21:1',   fail:false },
      ],
    },
    components: {
      label: 'Variables y componentes', heading: 'Sistema antes de pantallas',
      text: 'Antes de diseñar las pantallas finales se definieron las variables de color y espaciado, y se construyeron los componentes con anatomía y layout documentados.',
      caption: 'Variables de color, botones con anatomía y inputs documentados',
      buttons: { label:'Botones — 4 variantes', note:'El naranja EsDesign como primario para acciones de marca. Navy para Login — diferencia la acción de autenticación de acciones secundarias. Disabled en gris para estados inactivos.', variants:['Acción de marca','Login','Acción secundaria','Deshabilitado'] },
      inputs:  { label:'Inputs — 4 estados',    note:'Cada estado comunica algo distinto: default indica disponibilidad, focus confirma la selección, error señala el problema y disabled informa que no está disponible. Todos cumplen contraste AA.', states:['Default','Focus','Error','Disabled'], phs:['Correo electrónico','correo@esdesign.es','Correo inválido','No disponible'], errMsg:'Ingresa un correo válido' },
    },
    typo: {
      label: 'Tipografía', heading: 'Roboto — una familia, mucha jerarquía',
      text: 'Una sola familia tipográfica en toda la interfaz. El peso hace el trabajo de jerarquía — Bold para títulos, Semibold para subtítulos, Medium para labels y cuerpo. Sin mezclar familias innecesariamente.',
      cols: ['Nivel','Familia','Peso','Tamaño','Uso en EsDesign'],
      rows: [
        { level:'H1',      weight:'Bold',     size:'48px', sample:'DESIGN',                             sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'28px', fontWeight:700 } },
        { level:'H2',      weight:'Bold',     size:'40px', sample:'Inicio de sesión',                   sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'22px', fontWeight:700 } },
        { level:'H3',      weight:'Semibold', size:'32px', sample:'Por favor, introduzca el código.',   sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'17px', fontWeight:600 } },
        { level:'Body',    weight:'Medium',   size:'24px', sample:'Correo electrónico · Contraseña',    sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'14px', fontWeight:500, color:'#6B6860' } },
        { level:'Caption', weight:'Regular',  size:'14px', sample:'¿Olvidó contraseña? · Reenviar código', sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'12px', fontWeight:400, color:'#E8421A' } },
      ],
    },
    uiFinal: {
      label: 'Resultado final', heading: 'Las dos pantallas rediseñadas',
      text: 'Login + verificación de código. Fondo blanco, jerarquía Roboto, marca EsDesign preservada, todos los criterios WCAG AA cumplidos.',
      caption: 'Propuesta de rediseño — Login y verificación de código',
      screen1: { subtitle:'Iniciar sesión con tu cuenta educativa', sectionTitle:'Inicio de sesión', emailLabel:'Correo electrónico', emailPh:'correo@mail.com', passLabel:'Contraseña', passPh:'••••', forgot:'¿Olvidó contraseña?', loginBtn:'Login', capName:'Frame 1183 — Login', capDesc:'Fondo blanco, jerarquía Roboto, campos accesibles. Ratio 21:1 en texto principal.' },
      screen2: { heading:'Por favor, introduzca el código.', desc:'Revisa tu correo y copia el código de 6 dígitos que te enviamos.', codeLabel:'Código de 6 dígitos', codePh:'_ _ _ _ _ _', confirmBtn:'Confirmar', errMsg:'Puede que haya un error en el código.', resend:'Reenviar código de acceso', capName:'Frame 1184 — Verificación', capDesc:'Flujo de 2 pasos: código de 6 dígitos con estado de error y reenvío.' },
    },
    wcag: {
      label: 'Resultado WCAG', heading: 'De fallar a cumplir',
      blocks: [
        { badge:'Antes · Falla',  type:'fail', title:'~2.8:1 en texto principal', text:'Naranja sobre fondo pastel. El estándar WCAG AA exige mínimo 4.5:1 para texto normal. El diseño original no lo cumplía en ningún elemento de texto.' },
        { badge:'Después · Cumple', type:'pass', title:'21:1 en texto principal', text:'Negro #0F0E0C sobre blanco. Ratio máximo posible — cumple AA, AAA y todos los criterios de contraste de WCAG 2.1. El naranja se reserva solo para el logo y acciones.' },
        { badge:'Criterio 2.4.7',   type:'pass', title:'Focus Visible añadido',   text:'Los inputs tienen estado de focus con borde navy claramente diferenciado — criterio que el diseño original ignoraba completamente. Accesible para navegación por teclado.' },
      ],
    },
    results: {
      label: 'Resultados', heading: 'Lo que se entregó',
      items: [
        { num:'4', span:'+',  label:'Problemas WCAG documentados',      desc:'Contraste, jerarquía, labels y focus visible — cada uno con ratio exacto y solución implementada.' },
        { num:'21', span:':1', label:'Ratio de contraste obtenido',     desc:'De ~2.8:1 a 21:1 en texto principal. El máximo posible según WCAG — supera AA y AAA.' },
        { num:'2', span:'',   label:'Pantallas navegables entregadas', desc:'Login + verificación de código con todos los estados de input y manejo de error documentados.' },
      ],
    },
    learnings: {
      label: 'Aprendizajes', heading: 'Lo que me dejó',
      items: [
        { n:'01', title:'Identidad de marca y accesibilidad no se contradicen',   text:'El naranja de EsDesign no desapareció en el rediseño — sigue siendo el color del logo y del botón de confirmación. Lo que cambió fue el contexto: dejó de usarse como color de texto informativo sobre fondos de bajo contraste y se reservó para elementos de alta jerarquía sobre fondos limpios.' },
        { n:'02', title:'Las variables de color son la base del sistema',          text:'Definir tokens de color antes de diseñar las pantallas hizo que cualquier ajuste de color se propagara automáticamente. Cuando se decidió cambiar el tono exacto del navy del botón Login, el cambio afectó todos los estados de focus en un solo lugar.' },
        { n:'03', title:'La anatomía del componente es el handoff',               text:'Documentar padding, spacing y estados de cada componente en Figma con las herramientas de Layout and Spacing no fue burocracia — fue lo que convirtió el diseño en un entregable real para desarrollo. Sin esa documentación, el diseño se queda en pantalla bonita.' },
      ],
    },
    next:   { label: 'Siguiente proyecto', title: 'Sistema de Turnos →' },
    footer: { copy1: 'Juan Jose Bernal Núñez — UX/UI Designer', copy2: 'EsDesign Login · Proyecto 03 / 10' },
  },

  en: {
    nav: { back: 'Back to portfolio' },
    hero: {
      tagline: 'Accessibility audit and complete redesign of the EsDesign educational platform\'s login — from a visually striking but inaccessible design to a clean interface that meets WCAG AA.',
      before: { badge: '✕ Fails WCAG', label: 'Before', school: 'ESCUELA SUPERIOR DE DISEÑO', loginBtn: 'Sign in', errors: ['⚠ Contrast ~2.8:1', '⚠ Unreadable labels'] },
      after:  { badge: '✓ Passes AA', label: 'After', school: 'ESCUELA SUPERIOR DE DISEÑO', platform: 'Blackboard ∧', sectionTitle: 'Sign in', emailLabel: 'Email address', passLabel: 'Password', emailPh: 'email@mail.com', passPh: '••••', forgot: 'Forgot password?', loginBtn: 'Login', check: '✓ Ratio 21:1' },
    },
    infoBar: [
      { label: 'Type',       value: 'Web · Redesign' },
      { label: 'Context',    value: 'TripleTen Bootcamp' },
      { label: 'Standard',   value: 'WCAG 2.1 AA' },
      { label: 'Typography', value: 'Roboto' },
    ],
    problem: {
      label: 'The problem', heading: 'Pretty isn\'t accessible',
      p1: 'EsDesign\'s original login has a multicolor pastel gradient background that\'s part of their visual identity. Over that background, orange text, semi-transparent white labels, and dark-background fields are layered — visually striking but systematically failing the WCAG AA minimum contrast ratio of 4.5:1 for normal text.',
      p2: 'The challenge wasn\'t to eliminate EsDesign\'s identity but to redesign the login to meet accessibility criteria without losing the brand. The result: white background, clear typographic hierarchy with Roboto, and EsDesign orange reserved for actions and the logo — not for informational text.',
    },
    process: {
      label: 'Process', heading: 'From diagnosis to redesign',
      intro: 'Five progressive stages — each validates the previous before moving forward.',
      steps: [
        { num:'01', name:'Audit',      desc:'Analysis of the original design: contrast, hierarchy, labels and WCAG AA compliance. Each failure documented with its exact ratio.' },
        { num:'02', name:'Wireframe',  desc:'Clean structure of the new login and code verification screen — no color or final typography yet.' },
        { num:'03', name:'Variables',  desc:'Color and spacing variable system in Figma — tokens for background, text, borders, states and feedback.' },
        { num:'04', name:'Components', desc:'Buttons in 4 variants with documented anatomy and spacing. Inputs with 4 states. Developer-ready handoff.' },
        { num:'05', name:'Final UI',   desc:'Navigable login + code verification. White background, Roboto, clear hierarchy and all WCAG AA criteria met.' },
      ],
    },
    original: {
      label: 'Original design', heading: 'What existed — and its problems',
      text: 'EsDesign\'s current design was analyzed against the WCAG 2.1 AA standard. Four critical contrast and readability problems were identified that make the screen inaccessible for users with visual difficulties.',
      caption: 'Original design — multicolor background with insufficient contrast',
    },
    audit: {
      label: 'WCAG Audit', heading: '4 problems, 4 solutions',
      blocks: [
        { type:'fail', tag:'✕ Problem 01', title:'Logo contrast',        text:'EsDesign orange (~#F15A24) over multicolor pastel background. The ratio varies but never exceeds 2.8:1 — well below the 4.5:1 minimum required for normal text.',                                                                          ratio:'Estimated ratio: ~2.8:1 · Required: 4.5:1' },
        { type:'pass', tag:'✓ Solution 01', title:'Logo on white',       text:'EsDesign orange on pure white background reaches a 3.8:1 ratio for the large logo. Labels and support text are switched to black #0F0E0C — ratio 21:1.',                                                                                    ratio:'Main text: 21:1 · Exceeds AA and AAA' },
        { type:'fail', tag:'✕ Problem 02', title:'Dark fields',          text:'Inputs have an rgba(0,0,0,0.55) background with semi-transparent white text. The placeholder is nearly invisible (~1.8:1) and the field blends into the screen background.',                                                               ratio:'Placeholder: ~1.8:1 · Fails severely' },
        { type:'pass', tag:'✓ Solution 02', title:'Clear fields with border', text:'Background #f7f7f7 with a visible #e8e8e8 border. The field is distinct from the white screen background. Focus state with navy border indicates activity — meets criterion 2.4.7 Focus Visible.',                                      ratio:'Active text: black on white · 21:1' },
      ],
    },
    contrast: {
      label: 'Contrast analysis', heading: 'Three elements, three diagnoses',
      demos: [
        { label:'Logo + fields / pastel bg', failBadge:'Fails AA',      ratio:'~2.8:1', fail:true },
        { label:'Secondary links',           failBadge:'Nearly invisible', ratio:'~1.5:1', fail:true },
        { label:'Final redesign',            passBadge:'Passes AA',     ratio:'21:1',   fail:false },
      ],
    },
    components: {
      label: 'Variables & components', heading: 'System before screens',
      text: 'Before designing the final screens, color and spacing variables were defined, and components were built with documented anatomy and layout.',
      caption: 'Color variables, buttons with anatomy, and documented inputs',
      buttons: { label:'Buttons — 4 variants', note:'EsDesign orange as primary for brand actions. Navy for Login — differentiates the authentication action from secondary actions. Disabled in grey for inactive states.', variants:['Brand action','Login','Secondary action','Disabled'] },
      inputs:  { label:'Inputs — 4 states',    note:'Each state communicates something different: default signals availability, focus confirms selection, error signals the problem, disabled signals unavailability. All meet AA contrast.', states:['Default','Focus','Error','Disabled'], phs:['Email address','email@esdesign.es','Invalid email','Not available'], errMsg:'Enter a valid email' },
    },
    typo: {
      label: 'Typography', heading: 'Roboto — one family, lots of hierarchy',
      text: 'A single typeface throughout the interface. Weight does the hierarchy work — Bold for titles, Semibold for subtitles, Medium for labels and body. No unnecessary family mixing.',
      cols: ['Level','Family','Weight','Size','Use in EsDesign'],
      rows: [
        { level:'H1',      weight:'Bold',     size:'48px', sample:'DESIGN',                              sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'28px', fontWeight:700 } },
        { level:'H2',      weight:'Bold',     size:'40px', sample:'Sign in',                              sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'22px', fontWeight:700 } },
        { level:'H3',      weight:'Semibold', size:'32px', sample:'Please enter the code.',               sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'17px', fontWeight:600 } },
        { level:'Body',    weight:'Medium',   size:'24px', sample:'Email address · Password',             sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'14px', fontWeight:500, color:'#6B6860' } },
        { level:'Caption', weight:'Regular',  size:'14px', sample:'Forgot password? · Resend code',       sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'12px', fontWeight:400, color:'#E8421A' } },
      ],
    },
    uiFinal: {
      label: 'Final result', heading: 'The two redesigned screens',
      text: 'Login + code verification. White background, Roboto hierarchy, EsDesign brand preserved, all WCAG AA criteria met.',
      caption: 'Redesign proposal — Login and code verification',
      screen1: { subtitle:'Sign in with your educational account', sectionTitle:'Sign in', emailLabel:'Email address', emailPh:'email@mail.com', passLabel:'Password', passPh:'••••', forgot:'Forgot password?', loginBtn:'Login', capName:'Frame 1183 — Login', capDesc:'White background, Roboto hierarchy, accessible fields. 21:1 ratio on main text.' },
      screen2: { heading:'Please enter the code.', desc:'Check your email and copy the 6-digit code we sent you.', codeLabel:'6-digit code', codePh:'_ _ _ _ _ _', confirmBtn:'Confirm', errMsg:'There may be an error in the code.', resend:'Resend access code', capName:'Frame 1184 — Verification', capDesc:'2-step flow: 6-digit code with error state and resend option.' },
    },
    wcag: {
      label: 'WCAG result', heading: 'From failing to passing',
      blocks: [
        { badge:'Before · Fails',  type:'fail', title:'~2.8:1 on main text', text:'Orange over pastel background. WCAG AA requires a minimum 4.5:1 for normal text. The original design failed this on every text element.' },
        { badge:'After · Passes',  type:'pass', title:'21:1 on main text',   text:'Black #0F0E0C on white. The maximum possible ratio — passes AA, AAA and all WCAG 2.1 contrast criteria. Orange is reserved only for the logo and actions.' },
        { badge:'Criterion 2.4.7', type:'pass', title:'Focus Visible added', text:'Inputs have a focus state with a clearly differentiated navy border — a criterion the original design completely ignored. Accessible for keyboard navigation.' },
      ],
    },
    results: {
      label: 'Results', heading: 'What was delivered',
      items: [
        { num:'4',  span:'+',  label:'WCAG problems documented',     desc:'Contrast, hierarchy, labels and focus visible — each with exact ratio and implemented solution.' },
        { num:'21', span:':1', label:'Contrast ratio achieved',      desc:'From ~2.8:1 to 21:1 on main text. The maximum possible per WCAG — exceeds both AA and AAA.' },
        { num:'2',  span:'',   label:'Navigable screens delivered',  desc:'Login + code verification with all input states and error handling documented.' },
      ],
    },
    learnings: {
      label: 'Learnings', heading: 'What I took away',
      items: [
        { n:'01', title:'Brand identity and accessibility don\'t contradict each other', text:'EsDesign\'s orange didn\'t disappear in the redesign — it\'s still the color of the logo and the confirm button. What changed was the context: it stopped being used as informational text color over low-contrast backgrounds and was reserved for high-hierarchy elements on clean backgrounds.' },
        { n:'02', title:'Color variables are the foundation of the system',              text:'Defining color tokens before designing the screens meant any color adjustment propagated automatically. When the exact navy tone for the Login button was changed, the change affected all focus states in one place.' },
        { n:'03', title:'Component anatomy is the handoff',                              text:'Documenting padding, spacing and states of each component in Figma with the Layout and Spacing tools wasn\'t bureaucracy — it was what turned the design into a real development deliverable. Without that documentation, the design stays a pretty screen.' },
      ],
    },
    next:   { label: 'Next project', title: 'Queue System →' },
    footer: { copy1: 'Juan Jose Bernal Núñez — UX/UI Designer', copy2: 'EsDesign Login · Project 03 / 10' },
  },
} as const;

type Lang = keyof typeof T;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EsDesignCaseStudy() {
  const { lang, setLang } = useLanguage();
  const t = T[lang as Lang];

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(
      '.info-cell,.step-block,.audit-block,.contrast-demo,.typo-row,.comp-block,.screen-card,.wcag-block,.res-block,.learn-item',
    ).forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const a = t.hero.after;
  const b = t.hero.before;

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="es-page">

        {/* ── NAV ── */}
        <nav>
          <Link href="/#projects" className="es-nav-back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.nav.back}
          </Link>
          <div className="es-nav-right">
            <img src="/Images/LogoJJB/Logo%20JJB%20negro.png" alt="JJB" className="es-nav-logo" />
            <div className="es-lang-toggle">
              <button className={`es-lang-btn ${lang === 'es' ? 'active' : 'inactive'}`} onClick={() => setLang('es')}>ES</button>
              <span className="es-lang-sep">·</span>
              <button className={`es-lang-btn ${lang === 'en' ? 'active' : 'inactive'}`} onClick={() => setLang('en')}>EN</button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-meta">
              <span className="h-num">03</span>
              <span className="h-tag">Web · {lang === 'es' ? 'Rediseño' : 'Redesign'}</span>
              <span className="h-tag h-tag-dark">WCAG AA</span>
            </div>
            <h1 className="project-title">Es<span>Design</span></h1>
            <p className="hero-tagline">{t.hero.tagline}</p>
            <div className="hero-chips">
              <span className="chip chip-orange">Figma</span>
              <span className="chip chip-orange">WCAG AA</span>
              <span className="chip">Roboto</span>
              <span className="chip">{lang === 'es' ? 'Variables de color' : 'Color variables'}</span>
              <span className="chip">Atomic Design</span>
            </div>
          </div>

          {/* Before / After login cards */}
          <div className="hero-visual">
            <div className="lcard lcard-before">
              <div className="lc-badge lc-badge-fail">{b.badge}</div>
              <span style={{ fontFamily:'var(--mono)', fontSize:'8px', letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(0,0,0,.4)' }}>{b.label}</span>
              <div className="lc-brand"><span className="lc-es">ES</span><span className="lc-design-before">DESIGN</span></div>
              <div className="lc-sub" style={{ color:'rgba(0,0,0,.4)' }}>{b.school}</div>
              <div className="lc-field lc-field-before">juanjose@gmail.com</div>
              <div className="lc-field lc-field-before">••••••••</div>
              <div className="lc-btn lc-btn-before">{b.loginBtn}</div>
              {b.errors.map(e => <div key={e} className="lc-error-tag">{e}</div>)}
            </div>

            <div className="vs">VS</div>

            <div className="lcard lcard-after">
              <div className="lc-badge lc-badge-pass">{a.badge}</div>
              <span style={{ fontFamily:'var(--mono)', fontSize:'8px', letterSpacing:'.12em', textTransform:'uppercase', color:'#888' }}>{a.label}</span>
              <div className="lc-brand"><span className="lc-es">ES</span><span className="lc-design-after">DESIGN</span></div>
              <div className="lc-sub" style={{ color:'#888' }}>{a.school}</div>
              <div className="lc-blackboard">{a.platform}</div>
              <div className="lc-section">{a.sectionTitle}</div>
              <div style={{ fontSize:'12px', fontWeight:500, color:'var(--ink)', fontFamily:'var(--roboto)' }}>{a.emailLabel}</div>
              <div className="lc-field lc-field-after">{a.emailPh}</div>
              <div style={{ fontSize:'12px', fontWeight:500, color:'var(--ink)', fontFamily:'var(--roboto)' }}>{a.passLabel}</div>
              <div className="lc-field lc-field-after">{a.passPh}</div>
              <div className="lc-forgot">{a.forgot}</div>
              <div className="lc-btn lc-btn-after">{a.loginBtn}</div>
              <div className="lc-check-tag">{a.check}</div>
            </div>
          </div>
        </section>

        {/* ── INFO BAR ── */}
        <div className="info-bar">
          {t.infoBar.map(cell => (
            <div key={cell.label} className="info-cell">
              <div className="ic-label">{cell.label}</div>
              <div className="ic-val">{cell.value}</div>
            </div>
          ))}
        </div>

        {/* ── PROBLEMA ── */}
        <section>
          <div className="s-intro">
            <div className="s-label">{t.problem.label}</div>
            <div>
              <h2 className="s-headline">{t.problem.heading}</h2>
              <p className="s-text">{t.problem.p1}</p>
              <p className="s-text">{t.problem.p2}</p>
            </div>
          </div>
        </section>

        {/* ── PROCESO ── */}
        <section>
          <div className="s-intro" style={{ paddingBottom: 0 }}>
            <div className="s-label">{t.process.label}</div>
            <div>
              <h2 className="s-headline">{t.process.heading}</h2>
              <p className="s-text">{t.process.intro}</p>
            </div>
          </div>
          <div className="steps-grid">
            {t.process.steps.map(s => (
              <div key={s.num} className="step-block">
                <div className="step-num">{s.num}</div>
                <div className="step-name">{s.name}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DISEÑO ORIGINAL ── */}
        <section>
          <div className="s-intro" style={{ paddingBottom: 0 }}>
            <div className="s-label">{t.original.label}</div>
            <div>
              <h2 className="s-headline">{t.original.heading}</h2>
              <p className="s-text">{t.original.text}</p>
            </div>
          </div>
          <div style={{ padding: '40px 48px 80px' }}>
            <img src="/Images/EsDesign/Etapa%201%20redise%C3%B1o%20esdesign.png" alt="Diseño original EsDesign" className="img-full" />
            <div className="img-caption">{t.original.caption}</div>
          </div>
        </section>

        {/* ── AUDITORÍA WCAG ── */}
        <section>
          <div className="s-intro" style={{ paddingBottom: 0 }}>
            <div className="s-label">{t.audit.label}</div>
            <div><h2 className="s-headline">{t.audit.heading}</h2></div>
          </div>
          <div className="audit-grid">
            {t.audit.blocks.map(b => (
              <div key={b.tag} className={`audit-block ${b.type === 'fail' ? 'audit-fail' : 'audit-pass'}`}>
                <div className={`audit-tag ${b.type === 'fail' ? 'audit-tag-fail' : 'audit-tag-pass'}`}>{b.tag}</div>
                <div className="audit-title">{b.title}</div>
                <p className="audit-text">{b.text}</p>
                <div className="audit-ratio">{b.ratio}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTRASTE VISUAL ── */}
        <section>
          <div className="s-intro" style={{ paddingBottom: 0 }}>
            <div className="s-label">{t.contrast.label}</div>
            <div><h2 className="s-headline">{t.contrast.heading}</h2></div>
          </div>
          <div style={{ padding: '0 48px 80px' }}>
            <div className="contrast-grid">
              {/* Demo 1 — Before: logo on pastel */}
              <div className="contrast-demo">
                <div className="cd-screen" style={{ background:'linear-gradient(135deg,#d4c5e2,#b8d4e8,#e8d4c5)' }}>
                  <div style={{ fontWeight:900, fontSize:'22px', color:'#E8421A', fontFamily:'var(--roboto)' }}>ES<span style={{ fontSize:'17px', color:'#333' }}>DESIGN</span></div>
                  <div style={{ fontSize:'9px', color:'rgba(0,0,0,.4)' }}>ESCUELA SUPERIOR DE DISEÑO</div>
                  <div style={{ background:'rgba(0,0,0,.55)', padding:'7px 10px', borderRadius:'4px', color:'rgba(255,255,255,.4)', fontSize:'10px', marginTop:'4px' }}>usuario@mail.com</div>
                </div>
                <div className="cd-footer">
                  <span className="cd-footer-label">{t.contrast.demos[0].label}</span>
                  <div className="cd-status"><span className="cd-fail-badge">{t.contrast.demos[0].failBadge}</span><span className="cd-ratio">{t.contrast.demos[0].ratio}</span></div>
                </div>
              </div>
              {/* Demo 2 — Before: secondary links */}
              <div className="contrast-demo">
                <div className="cd-screen" style={{ background:'linear-gradient(135deg,#d4c5e2,#b8d4e8,#e8d4c5)', justifyContent:'center' }}>
                  <div style={{ fontSize:'11px', color:'rgba(255,255,255,.3)', fontFamily:'var(--roboto)' }}>{lang==='es'?'¿Olvidó contraseña?':'Forgot password?'}</div>
                  <div style={{ fontSize:'11px', color:'rgba(0,0,0,.35)', marginTop:'8px', fontFamily:'var(--roboto)' }}>{lang==='es'?'Términos · Condiciones':'Terms · Conditions'}</div>
                </div>
                <div className="cd-footer">
                  <span className="cd-footer-label">{t.contrast.demos[1].label}</span>
                  <div className="cd-status"><span className="cd-fail-badge">{t.contrast.demos[1].failBadge}</span><span className="cd-ratio">{t.contrast.demos[1].ratio}</span></div>
                </div>
              </div>
              {/* Demo 3 — After: final redesign */}
              <div className="contrast-demo">
                <div className="cd-screen" style={{ background:'#fff', border:'1px solid var(--rule)' }}>
                  <div style={{ fontWeight:900, fontSize:'22px', fontFamily:'var(--roboto)' }}><span style={{ color:'#E8421A' }}>ES</span><span style={{ color:'#1a1a2e' }}>DESIGN</span></div>
                  <div style={{ fontSize:'13px', fontWeight:700, color:'#0F0E0C', marginTop:'4px', fontFamily:'var(--roboto)' }}>{lang==='es'?'Inicio de sesión':'Sign in'}</div>
                  <div style={{ background:'#f7f7f7', border:'1px solid #e8e8e8', borderRadius:'4px', padding:'7px 10px', fontSize:'10px', color:'#888', marginTop:'4px' }}>{lang==='es'?'Correo electrónico':'Email address'}</div>
                  <div style={{ background:'var(--navy)', color:'white', borderRadius:'4px', padding:'8px', fontSize:'11px', fontWeight:600, textAlign:'center', marginTop:'4px', fontFamily:'var(--roboto)' }}>Login</div>
                </div>
                <div className="cd-footer">
                  <span className="cd-footer-label">{t.contrast.demos[2].label}</span>
                  <div className="cd-status"><span className="cd-pass-badge">{t.contrast.demos[2].passBadge}</span><span className="cd-ratio">{t.contrast.demos[2].ratio}</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VARIABLES Y COMPONENTES ── */}
        <section>
          <div className="s-intro" style={{ paddingBottom: 0 }}>
            <div className="s-label">{t.components.label}</div>
            <div>
              <h2 className="s-headline">{t.components.heading}</h2>
              <p className="s-text">{t.components.text}</p>
            </div>
          </div>
          <div style={{ padding: '40px 48px 0' }}>
            <img src="/Images/EsDesign/Etapa%203.png" alt="Variables y componentes EsDesign" className="img-full" />
            <div className="img-caption" style={{ marginBottom: '48px' }}>{t.components.caption}</div>
          </div>
          <div style={{ padding: '0 48px 80px' }}>
            <div className="comp-grid">
              <div className="comp-block">
                <div className="comp-label">{t.components.buttons.label}</div>
                <div className="comp-note">{t.components.buttons.note}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginTop:'16px' }}>
                  <div className="rb rb-primary">{t.components.buttons.variants[0]}</div>
                  <div className="rb rb-navy">{t.components.buttons.variants[1]}</div>
                  <div className="rb rb-secondary">{t.components.buttons.variants[2]}</div>
                  <div className="rb rb-disabled">{t.components.buttons.variants[3]}</div>
                </div>
              </div>
              <div className="comp-block">
                <div className="comp-label">{t.components.inputs.label}</div>
                <div className="comp-note">{t.components.inputs.note}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginTop:'16px' }}>
                  <div><div className="inp-lbl">{t.components.inputs.states[0]}</div><div className="inp inp-default">{t.components.inputs.phs[0]}</div></div>
                  <div><div className="inp-lbl">{t.components.inputs.states[1]}</div><div className="inp inp-focus">{t.components.inputs.phs[1]}</div></div>
                  <div>
                    <div className="inp-lbl">{t.components.inputs.states[2]}</div>
                    <div className="inp inp-error">{t.components.inputs.phs[2]}</div>
                    <div style={{ fontSize:'9px', color:'var(--orange)', marginTop:'2px' }}>{t.components.inputs.errMsg}</div>
                  </div>
                  <div><div className="inp-lbl">{t.components.inputs.states[3]}</div><div className="inp inp-disabled">{t.components.inputs.phs[3]}</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TIPOGRAFÍA ── */}
        <section>
          <div className="s-intro" style={{ paddingBottom: 0 }}>
            <div className="s-label">{t.typo.label}</div>
            <div>
              <h2 className="s-headline">{t.typo.heading}</h2>
              <p className="s-text">{t.typo.text}</p>
            </div>
          </div>
          <div style={{ padding: '0 48px 80px' }}>
            <div className="typo-table">
              <div className="typo-head">
                {t.typo.cols.map(c => <span key={c}>{c}</span>)}
              </div>
              {t.typo.rows.map(row => (
                <div key={row.level} className="typo-row">
                  <span className="tc">{row.level}</span>
                  <span className="tc">Roboto</span>
                  <span className="tc">{row.weight}</span>
                  <span className="tc">{row.size}</span>
                  <span style={row.sStyle as React.CSSProperties}>{row.sample}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── UI FINAL ── */}
        <section>
          <div className="s-intro" style={{ paddingBottom: 0 }}>
            <div className="s-label">{t.uiFinal.label}</div>
            <div>
              <h2 className="s-headline">{t.uiFinal.heading}</h2>
              <p className="s-text">{t.uiFinal.text}</p>
            </div>
          </div>
          <div style={{ padding: '40px 48px 0' }}>
            <img src="/Images/EsDesign/Propuesta%20redise%C3%B1o.png" alt="Propuesta rediseño EsDesign" className="img-full" />
            <div className="img-caption" style={{ marginBottom: '48px' }}>{t.uiFinal.caption}</div>
          </div>
          {/* Coded screen reproductions */}
          <div style={{ padding: '0 48px 80px' }}>
            <div className="screens-row">
              {/* Screen 1 — Login */}
              <div className="screen-card">
                <div className="screen-body">
                  <div style={{ display:'flex', alignItems:'baseline', gap:'4px' }}>
                    <span style={{ fontFamily:'var(--roboto)', fontSize:'28px', fontWeight:900, color:'var(--orange)' }}>ES</span>
                    <span style={{ fontFamily:'var(--roboto)', fontSize:'24px', fontWeight:700, color:'var(--navy)' }}>DESIGN</span>
                  </div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'10px', color:'#888', letterSpacing:'.04em' }}>ESCUELA SUPERIOR DE DISEÑO DE BARCELONA</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'13px', fontWeight:600, color:'var(--navy)', marginTop:'4px' }}>Blackboard ∧</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'12px', color:'var(--muted)', marginTop:'2px' }}>{t.uiFinal.screen1.subtitle}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'15px', fontWeight:700, color:'var(--ink)', marginTop:'8px' }}>{t.uiFinal.screen1.sectionTitle}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'13px', fontWeight:500, color:'var(--ink)' }}>{t.uiFinal.screen1.emailLabel}</div>
                  <div style={{ background:'#f7f7f7', border:'1px solid #e8e8e8', borderRadius:'6px', padding:'10px 14px', fontSize:'12px', color:'#aaa', fontFamily:'var(--roboto)' }}>{t.uiFinal.screen1.emailPh}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'13px', fontWeight:500, color:'var(--ink)' }}>{t.uiFinal.screen1.passLabel}</div>
                  <div style={{ background:'#f7f7f7', border:'1px solid #e8e8e8', borderRadius:'6px', padding:'10px 14px', fontSize:'12px', color:'#aaa', fontFamily:'var(--roboto)' }}>{t.uiFinal.screen1.passPh}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'12px', color:'var(--orange)' }}>{t.uiFinal.screen1.forgot}</div>
                  <div style={{ background:'#ccc', color:'#888', borderRadius:'6px', padding:'11px', fontSize:'13px', fontWeight:600, textAlign:'center', marginTop:'4px', fontFamily:'var(--roboto)' }}>{t.uiFinal.screen1.loginBtn}</div>
                </div>
                <div className="screen-cap">
                  <div className="screen-cap-name">{t.uiFinal.screen1.capName}</div>
                  <div className="screen-cap-desc">{t.uiFinal.screen1.capDesc}</div>
                </div>
              </div>
              {/* Screen 2 — Verification */}
              <div className="screen-card">
                <div className="screen-body">
                  <div style={{ display:'flex', alignItems:'baseline', gap:'4px' }}>
                    <span style={{ fontFamily:'var(--roboto)', fontSize:'28px', fontWeight:900, color:'var(--orange)' }}>ES</span>
                    <span style={{ fontFamily:'var(--roboto)', fontSize:'24px', fontWeight:700, color:'var(--navy)' }}>DESIGN</span>
                  </div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'10px', color:'#888', letterSpacing:'.04em' }}>ESCUELA SUPERIOR DE DISEÑO DE BARCELONA</div>
                  <div style={{ height:'16px' }} />
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'16px', fontWeight:700, color:'var(--ink)' }}>{t.uiFinal.screen2.heading}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'12px', color:'var(--muted)', lineHeight:1.5, marginTop:'4px' }}>{t.uiFinal.screen2.desc}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'13px', fontWeight:500, color:'var(--ink)', marginTop:'8px' }}>{t.uiFinal.screen2.codeLabel}</div>
                  <div style={{ background:'#f7f7f7', border:'1px solid #e8e8e8', borderRadius:'6px', padding:'10px 14px', fontSize:'12px', color:'#aaa', fontFamily:'var(--roboto)' }}>{t.uiFinal.screen2.codePh}</div>
                  <div style={{ background:'var(--orange)', color:'white', borderRadius:'6px', padding:'11px', fontSize:'13px', fontWeight:600, textAlign:'center', marginTop:'8px', fontFamily:'var(--roboto)' }}>{t.uiFinal.screen2.confirmBtn}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'12px', color:'var(--orange)', marginTop:'6px' }}>{t.uiFinal.screen2.errMsg}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'12px', color:'var(--navy)', textDecoration:'underline', marginTop:'4px' }}>{t.uiFinal.screen2.resend}</div>
                </div>
                <div className="screen-cap">
                  <div className="screen-cap-name">{t.uiFinal.screen2.capName}</div>
                  <div className="screen-cap-desc">{t.uiFinal.screen2.capDesc}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WCAG RESULTADO ── */}
        <section>
          <div className="s-intro" style={{ paddingBottom: 0 }}>
            <div className="s-label">{t.wcag.label}</div>
            <div><h2 className="s-headline">{t.wcag.heading}</h2></div>
          </div>
          <div className="wcag-grid">
            {t.wcag.blocks.map(w => (
              <div key={w.badge} className="wcag-block">
                <span className={`wcag-badge ${w.type === 'fail' ? 'wcag-fail' : 'wcag-pass'}`}>{w.badge}</span>
                <div className="wcag-title">{w.title}</div>
                <p className="wcag-text">{w.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── RESULTADOS ── */}
        <section>
          <div className="s-intro" style={{ paddingBottom: 0 }}>
            <div className="s-label">{t.results.label}</div>
            <div><h2 className="s-headline">{t.results.heading}</h2></div>
          </div>
          <div className="results-grid">
            {t.results.items.map(r => (
              <div key={r.label} className="res-block">
                <span className="res-num">{r.num}<span>{r.span}</span></span>
                <div className="res-label">{r.label}</div>
                <div className="res-desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── APRENDIZAJES ── */}
        <section className="learn-wrap">
          <div className="s-label" style={{ position:'static', marginBottom:'16px' }}>{t.learnings.label}</div>
          <h2 className="s-headline">{t.learnings.heading}</h2>
          <div style={{ marginTop:'40px' }}>
            {t.learnings.items.map(item => (
              <div key={item.n} className="learn-item">
                <div className="learn-n">{item.n}</div>
                <div>
                  <div className="learn-title">{item.title}</div>
                  <p className="learn-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── NEXT PROJECT ── */}
        <div className="next-wrap">
          <div>
            <span className="next-label">{t.next.label}</span>
            <Link href="/" className="next-title">{t.next.title}</Link>
          </div>
          <Link href="/" className="next-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="es-footer">
          <span>{t.footer.copy1}</span>
          <span>{t.footer.copy2}</span>
        </div>

      </div>
    </>
  );
}
