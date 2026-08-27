'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  .esd {
    --acc: #E8421A;
    --navy: #1a1a2e;
    --green: #2D8B6F;
    --ink: #0E0E0C;
    --paper: #EFEBE1;
    --dark: #11151D;
    --display: 'Bricolage Grotesque', sans-serif;
    --body: 'Space Grotesk', sans-serif;
    --mono: 'Space Mono', monospace;
    --roboto: 'Roboto', sans-serif;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--body);
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* ── NAV ── */
  .esd-nav {
    position: sticky; top: 0; z-index: 60;
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 40px;
    background: var(--paper);
    border-bottom: 3px solid var(--ink);
  }
  .esd-back {
    display: flex; align-items: center; gap: 8px;
    font-family: var(--mono); font-size: 11px; letter-spacing: .14em;
    text-transform: uppercase; color: var(--ink); text-decoration: none;
    transition: color .2s;
  }
  .esd-back:hover { color: var(--acc); }
  .esd-nav-right { display: flex; align-items: center; gap: 16px; }
  .esd-nav-logo { height: 28px; width: auto; display: block; }
  .esd-lang {
    display: flex; align-items: center;
    border: 2px solid var(--ink);
  }
  .esd-lang-btn {
    background: transparent; border: none; cursor: pointer;
    font-family: var(--mono); font-size: 11px; letter-spacing: .08em;
    padding: 5px 9px; color: var(--ink); transition: background .15s, color .15s;
  }
  .esd-lang-btn.active { background: var(--ink); color: var(--paper); }

  /* ── HERO ── */
  .esd-hero {
    background: var(--dark); color: var(--paper);
    display: grid; grid-template-columns: 1fr 1fr;
    padding: 80px 40px; gap: 60px; align-items: center;
    border-bottom: 3px solid var(--ink);
    min-height: 90vh;
  }
  .esd-hero-eyebrow {
    display: flex; align-items: center; gap: 10px; margin-bottom: 28px;
  }
  .esd-hero-tag {
    font-family: var(--mono); font-size: 10px; letter-spacing: .14em;
    text-transform: uppercase; padding: 4px 10px;
    border: 2px solid rgba(239,235,225,.25); color: rgba(239,235,225,.7);
  }
  .esd-hero-tag.accent { background: var(--acc); color: var(--paper); border-color: var(--acc); }
  .esd-hero-h1 {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(72px, 10vw, 140px); line-height: .92;
    letter-spacing: -.02em; color: var(--paper);
    margin: 0 0 28px;
  }
  .esd-hero-h1 span { color: var(--acc); display: block; }
  .esd-hero-sub {
    font-size: 17px; line-height: 1.75;
    color: rgba(239,235,225,.7); max-width: 440px; margin-bottom: 28px;
  }
  .esd-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .esd-chip {
    font-family: var(--mono); font-size: 10px; letter-spacing: .1em;
    text-transform: uppercase; padding: 5px 12px;
    border: 2px solid rgba(239,235,225,.2); color: rgba(239,235,225,.65);
  }
  .esd-chip.acc { border-color: rgba(232,66,26,.5); color: var(--acc); }

  /* ── BEFORE / AFTER CARDS ── */
  .esd-ba {
    display: flex; gap: 14px; align-items: flex-start;
  }
  .esd-card {
    flex: 1; padding: 22px 18px;
    display: flex; flex-direction: column; gap: 9px;
    border: 3px solid rgba(255,255,255,.15);
    position: relative; overflow: hidden;
  }
  .esd-card-before { background: linear-gradient(150deg,#c8b8d8 0%,#a8c4d8 50%,#d8c4b0 100%); }
  .esd-card-after  { background: #fff; border-color: rgba(255,255,255,.3); }
  .esd-vs {
    width: 32px; height: 32px; background: var(--ink);
    display: flex; align-items: center; justify-content: center;
    color: white; font-family: var(--mono); font-size: 9px;
    flex-shrink: 0; align-self: center;
  }
  .esd-badge {
    font-family: var(--mono); font-size: 8px; letter-spacing: .15em;
    text-transform: uppercase; padding: 3px 7px;
    width: fit-content; margin-bottom: 4px;
  }
  .esd-badge-fail { background: rgba(232,66,26,.15); color: var(--acc); border: 2px solid rgba(232,66,26,.3); }
  .esd-badge-pass { background: rgba(45,139,111,.1); color: var(--green); border: 2px solid rgba(45,139,111,.3); }
  .esd-brand { display: flex; align-items: baseline; gap: 3px; }
  .esd-es { font-weight: 900; font-size: 18px; color: var(--acc); }
  .esd-design-b { font-weight: 700; font-size: 14px; color: #333; }
  .esd-design-a { font-weight: 700; font-size: 14px; color: var(--navy); }
  .esd-sub { font-size: 8px; line-height: 1.3; }
  .esd-bb { font-size: 11px; font-weight: 600; color: #111; }
  .esd-section { font-size: 13px; font-weight: 700; color: var(--ink); }
  .esd-field { padding: 7px 10px; font-size: 10px; font-family: var(--roboto); }
  .esd-field-b { background: rgba(0,0,0,.5); color: rgba(255,255,255,.45); }
  .esd-field-a { background: #f7f7f7; border: 1px solid #e8e8e8; color: #aaa; }
  .esd-forgot { font-size: 9px; color: var(--acc); }
  .esd-btn { padding: 8px; font-size: 10px; font-weight: 600; text-align: center; margin-top: 2px; font-family: var(--roboto); }
  .esd-btn-b { background: #fff; color: #666; }
  .esd-btn-a { background: var(--navy); color: white; }
  .esd-err-tag { font-size: 8px; color: var(--acc); background: rgba(232,66,26,.1); padding: 2px 6px; border: 1px solid rgba(232,66,26,.25); width: fit-content; }
  .esd-check-tag { font-size: 8px; color: var(--green); background: rgba(45,139,111,.08); padding: 2px 6px; border: 1px solid rgba(45,139,111,.25); width: fit-content; }

  /* ── INFO BAR ── */
  .esd-infobar { display: flex; border-bottom: 3px solid var(--ink); }
  .esd-infocell { flex: 1; padding: 32px 40px; border-right: 3px solid var(--ink); }
  .esd-infocell:last-child { border-right: none; }
  .esd-infocell-label { font-family: var(--mono); font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: #7a7770; margin-bottom: 6px; }
  .esd-infocell-value { font-family: var(--display); font-weight: 700; font-size: 20px; color: var(--ink); }

  /* ── SECTION SHARED ── */
  .esd-section-wrap { border-bottom: 3px solid var(--ink); }
  .esd-h2 {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(32px, 4vw, 52px); line-height: 1; margin: 0 0 20px;
    letter-spacing: -.01em;
  }
  .esd-body { font-size: 17px; line-height: 1.75; color: #4a4845; max-width: 640px; }
  .esd-body + .esd-body { margin-top: 16px; }
  .esd-pad { padding: 72px 40px; }
  .esd-pad-b { padding: 72px 40px 40px; }

  /* ── PROCESS STEPS ── */
  .esd-steps { display: grid; grid-template-columns: repeat(5,1fr); border-top: 3px solid var(--ink); }
  .esd-step { padding: 32px 28px; border-right: 3px solid var(--ink); }
  .esd-step:last-child { border-right: none; }
  .esd-step-name { font-family: var(--display); font-weight: 800; font-size: 20px; margin-bottom: 8px; }
  .esd-step-desc { font-size: 13px; line-height: 1.8; color: #4a4845; }

  /* ── IMAGE ── */
  .esd-img { width: 100%; border: 3px solid var(--ink); display: block; }
  .esd-img-cap { font-family: var(--mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: #7a7770; margin-top: 12px; }

  /* ── AUDIT GRID ── */
  .esd-audit { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-top: 40px; }
  .esd-audit-block { padding: 32px; border-left: 3px solid; }
  .esd-audit-fail { background: rgba(232,66,26,.05); border-color: var(--acc); }
  .esd-audit-pass { background: rgba(45,139,111,.05); border-color: var(--green); }
  .esd-audit-tag { font-family: var(--mono); font-size: 9px; letter-spacing: .15em; text-transform: uppercase; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
  .esd-audit-fail-tag { color: var(--acc); }
  .esd-audit-pass-tag { color: var(--green); }
  .esd-audit-title { font-family: var(--display); font-weight: 800; font-size: 22px; margin-bottom: 8px; }
  .esd-audit-text { font-size: 14px; line-height: 1.8; color: #4a4845; }
  .esd-audit-ratio { font-family: var(--mono); font-size: 10px; color: #7a7770; margin-top: 10px; padding: 8px 12px; background: rgba(239,235,225,.6); border: 2px solid #d8d4cc; }

  /* ── CONTRAST DEMOS ── */
  .esd-contrast { display: grid; grid-template-columns: repeat(3,1fr); gap: 3px; margin-top: 40px; }
  .esd-cd { border: 3px solid var(--ink); overflow: hidden; }
  .esd-cd-screen { padding: 20px; min-height: 110px; display: flex; flex-direction: column; gap: 7px; }
  .esd-cd-footer { padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; background: rgba(239,235,225,.8); border-top: 3px solid var(--ink); }
  .esd-cd-label { font-size: 12px; color: #4a4845; }
  .esd-cd-status { display: flex; gap: 6px; align-items: center; }
  .esd-cd-fail { font-family: var(--mono); font-size: 8px; letter-spacing: .1em; text-transform: uppercase; padding: 2px 7px; background: rgba(232,66,26,.12); color: var(--acc); border: 2px solid rgba(232,66,26,.25); }
  .esd-cd-pass { font-family: var(--mono); font-size: 8px; letter-spacing: .1em; text-transform: uppercase; padding: 2px 7px; background: rgba(45,139,111,.1); color: var(--green); border: 2px solid rgba(45,139,111,.25); }
  .esd-cd-ratio { font-family: var(--mono); font-size: 11px; color: #4a4845; }

  /* ── TYPOGRAPHY TABLE ── */
  .esd-typo-table { margin-top: 40px; border: 3px solid var(--ink); overflow: hidden; }
  .esd-typo-head { display: grid; grid-template-columns: 80px 120px 120px 80px 1fr; background: var(--dark); padding: 12px 20px; gap: 8px; }
  .esd-typo-head span { font-family: var(--mono); font-size: 9px; letter-spacing: .15em; text-transform: uppercase; color: rgba(239,235,225,.6); }
  .esd-typo-row { display: grid; grid-template-columns: 80px 120px 120px 80px 1fr; padding: 16px 20px; gap: 8px; border-bottom: 3px solid var(--ink); align-items: center; }
  .esd-typo-row:last-child { border-bottom: none; }
  .esd-typo-row:nth-child(even) { background: rgba(239,235,225,.5); }
  .etc { font-size: 13px; color: #7a7770; font-family: var(--mono); }

  /* ── COMPONENT BLOCKS ── */
  .esd-comp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-top: 40px; }
  .esd-comp-block { background: rgba(239,235,225,.5); padding: 32px; border: 3px solid var(--ink); }
  .esd-comp-label { font-family: var(--mono); font-size: 9px; letter-spacing: .18em; text-transform: uppercase; color: var(--acc); margin-bottom: 8px; }
  .esd-comp-note { font-size: 13px; line-height: 1.8; color: #4a4845; }
  .rb { padding: 9px 20px; font-size: 12px; font-weight: 600; font-family: var(--roboto); text-align: center; }
  .rb-primary { background: var(--acc); color: white; }
  .rb-secondary { background: rgba(232,66,26,.1); color: var(--acc); border: 2px solid rgba(232,66,26,.3); }
  .rb-navy { background: var(--navy); color: white; }
  .rb-disabled { background: #e0e0e0; color: #aaa; }
  .inp-wrap { display: flex; flex-direction: column; gap: 5px; }
  .inp-lbl { font-size: 8px; color: #7a7770; text-transform: uppercase; letter-spacing: .1em; font-family: var(--mono); }
  .inp { padding: 8px 12px; font-size: 11px; font-family: var(--roboto); }
  .inp-default { background: #f7f7f7; border: 1px solid #e0e0e0; color: #aaa; }
  .inp-focus { background: #fff; border: 2px solid var(--navy); color: var(--ink); }
  .inp-error { background: #fff; border: 2px solid var(--acc); color: var(--ink); }
  .inp-disabled { background: #f0f0f0; border: 1px solid #e0e0e0; color: #ccc; }

  /* ── SCREEN CARDS ── */
  .esd-screens { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-top: 40px; }
  .esd-screen { background: #fff; border: 3px solid var(--ink); overflow: hidden; }
  .esd-screen-body { padding: 28px 24px; display: flex; flex-direction: column; gap: 10px; min-height: 320px; }
  .esd-screen-cap { padding: 14px 20px; border-top: 3px solid var(--ink); background: rgba(239,235,225,.8); }
  .esd-screen-cap-name { font-family: var(--mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: #7a7770; }
  .esd-screen-cap-desc { font-size: 13px; color: #4a4845; margin-top: 4px; line-height: 1.5; }

  /* ── WCAG RESULT ── */
  .esd-wcag { display: grid; grid-template-columns: repeat(3,1fr); border-top: 3px solid var(--ink); }
  .esd-wcag-block { padding: 48px 40px; border-right: 3px solid var(--ink); }
  .esd-wcag-block:last-child { border-right: none; }
  .esd-wcag-badge { font-family: var(--mono); font-size: 9px; letter-spacing: .15em; text-transform: uppercase; padding: 4px 10px; display: inline-block; margin-bottom: 14px; }
  .esd-wcag-fail { background: rgba(232,66,26,.1); color: var(--acc); border: 2px solid rgba(232,66,26,.3); }
  .esd-wcag-pass { background: rgba(45,139,111,.1); color: var(--green); border: 2px solid rgba(45,139,111,.3); }
  .esd-wcag-title { font-family: var(--display); font-weight: 800; font-size: 26px; margin-bottom: 8px; }
  .esd-wcag-text { font-size: 14px; line-height: 1.8; color: #4a4845; }

  /* ── RESULTS ── */
  .esd-results { display: grid; grid-template-columns: repeat(3,1fr); border-top: 3px solid var(--ink); }
  .esd-result { padding: 48px 40px; border-right: 3px solid var(--ink); }
  .esd-result:last-child { border-right: none; }
  .esd-result-num { font-family: var(--display); font-weight: 800; font-size: 80px; line-height: 1; color: var(--ink); display: block; }
  .esd-result-num span { color: var(--acc); }
  .esd-result-label { font-family: var(--mono); font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: #7a7770; margin-top: 12px; }
  .esd-result-desc { font-size: 14px; color: #4a4845; margin-top: 10px; line-height: 1.8; }

  /* ── LEARNINGS ── */
  .esd-learn-item {
    display: grid; grid-template-columns: 80px 1fr; gap: 32px;
    padding: 32px 0; border-bottom: 3px solid var(--ink); align-items: start;
  }
  .esd-learn-item:last-child { border-bottom: none; }
  .esd-learn-num { font-family: var(--display); font-weight: 800; font-size: 52px; line-height: 1; color: #d8d4cc; }
  .esd-learn-title { font-family: var(--display); font-weight: 800; font-size: 26px; margin-bottom: 10px; }
  .esd-learn-text { font-size: 15px; line-height: 1.8; color: #4a4845; max-width: 600px; }

  /* ── NEXT PROJECT ── */
  .esd-next {
    background: var(--dark); padding: 80px 40px;
    border-top: 3px solid var(--ink);
  }
  .esd-next-label { font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: rgba(239,235,225,.45); display: block; margin-bottom: 12px; }
  .esd-next-title { font-family: var(--display); font-weight: 800; font-size: clamp(48px,7vw,96px); line-height: 1; color: var(--paper); text-decoration: none; transition: color .2s; }
  .esd-next-title:hover { color: var(--acc); }

  /* ── FOOTER ── */
  .esd-footer { padding: 20px 40px; display: flex; justify-content: space-between; border-top: 3px solid rgba(255,255,255,.1); background: var(--dark); }
  .esd-footer span { font-family: var(--mono); font-size: 10px; letter-spacing: .1em; color: rgba(239,235,225,.45); }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .esd-nav { padding: 14px 20px; }
    .esd-hero { grid-template-columns: 1fr; padding: 60px 20px 48px; min-height: auto; gap: 40px; }
    .esd-hero-h1 { font-size: clamp(56px,18vw,100px); }
    .esd-ba { flex-direction: column; }
    .esd-vs { align-self: center; }
    .esd-infobar { flex-direction: column; }
    .esd-infocell { border-right: none; border-bottom: 3px solid var(--ink); padding: 24px 20px; }
    .esd-pad, .esd-pad-b { padding: 48px 20px; }
    .esd-steps { grid-template-columns: repeat(3,1fr); }
    .esd-step:nth-child(3) { border-right: none; }
    .esd-audit { grid-template-columns: 1fr; gap: 3px; }
    .esd-contrast { grid-template-columns: 1fr; }
    .esd-typo-table { overflow-x: auto; }
    .esd-typo-head, .esd-typo-row { min-width: 480px; }
    .esd-comp-grid { grid-template-columns: 1fr; }
    .esd-screens { grid-template-columns: 1fr; }
    .esd-wcag { grid-template-columns: 1fr; }
    .esd-wcag-block { border-right: none; border-bottom: 3px solid var(--ink); padding: 36px 20px; }
    .esd-wcag-block:last-child { border-bottom: none; }
    .esd-results { grid-template-columns: 1fr; }
    .esd-result { border-right: none; border-bottom: 3px solid var(--ink); padding: 36px 20px; }
    .esd-result:last-child { border-bottom: none; }
    .esd-next { padding: 60px 20px; }
    .esd-footer { padding: 16px 20px; }
  }
  @media (max-width: 480px) {
    .esd-steps { grid-template-columns: 1fr; }
    .esd-step { border-right: none; border-bottom: 3px solid var(--ink); }
    .esd-step:last-child { border-bottom: none; }
  }
`;

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  es: {
    nav: { back: 'Volver' },
    hero: {
      tagline: 'Auditoría de accesibilidad y rediseño completo del login de la plataforma educativa EsDesign — de un diseño visualmente llamativo pero inaccesible a una interfaz limpia que cumple WCAG AA.',
      before: { badge: '✕ Falla WCAG', label: 'Antes', school: 'ESCUELA SUPERIOR DE DISEÑO', loginBtn: 'Iniciar sesión', errors: ['⚠ Contraste ~2.8:1', '⚠ Labels ilegibles'] },
      after:  { badge: '✓ Cumple AA', label: 'Después', school: 'ESCUELA SUPERIOR DE DISEÑO', platform: 'Blackboard ∧', sectionTitle: 'Inicio de sesión', emailLabel: 'Correo electrónico', passLabel: 'Contraseña', emailPh: 'correo@mail.com', passPh: '••••', forgot: '¿Olvidó contraseña?', loginBtn: 'Login', check: '✓ Ratio 21:1' },
    },
    infoBar: [
      { label: 'Tipo',         value: 'Web · Rediseño' },
      { label: 'Rol',          value: 'UX/UI Designer' },
      { label: 'Herramientas', value: 'Figma + WCAG AA' },
    ],
    problem: {
      heading: 'Bonito no es accesible',
      p1: 'El login original de EsDesign tiene un fondo multicolor con gradiente pastel que forma parte de su identidad visual. Sobre ese fondo se superponen textos en naranja, labels en blanco semitransparente y campos con fondo oscuro — una combinación visualmente llamativa pero que falla sistemáticamente el estándar WCAG AA de contraste mínimo 4.5:1 para texto normal.',
      p2: 'El reto no era eliminar la identidad de EsDesign sino rediseñar el login para que cumpliera los criterios de accesibilidad sin perder la marca. El resultado: fondo blanco, jerarquía tipográfica clara con Roboto y el naranja EsDesign reservado para acciones y el logo — no para texto informativo.',
    },
    process: {
      heading: 'Del diagnóstico al rediseño',
      intro: 'Cinco etapas progresivas — cada una valida la anterior antes de avanzar.',
      steps: [
        { name:'Auditoría',    desc:'Análisis del diseño original: contraste, jerarquía, labels y cumplimiento WCAG AA. Documentación de cada falla con ratio exacto.' },
        { name:'Wireframe',    desc:'Estructura limpia del nuevo login y pantalla de verificación de código — sin color ni tipografía final todavía.' },
        { name:'Variables',    desc:'Sistema de variables de color y espaciado en Figma — tokens para fondo, texto, bordes, estados y feedback.' },
        { name:'Componentes',  desc:'Botones en 4 variantes con anatomía y spacing documentados. Inputs con 4 estados. Handoff listo para desarrollo.' },
        { name:'UI Final',     desc:'Login + verificación de código navegables. Fondo blanco, Roboto, jerarquía clara y todos los criterios WCAG AA cumplidos.' },
      ],
    },
    original: {
      heading: 'Lo que existía — y sus problemas',
      text: 'El diseño actual de EsDesign se analizó contra el estándar WCAG 2.1 AA. Se identificaron 4 problemas críticos de contraste y legibilidad que hacen la pantalla inaccesible para usuarios con dificultades visuales.',
      caption: 'Diseño original — fondo multicolor con contraste insuficiente',
    },
    audit: {
      heading: '4 problemas, 4 soluciones',
      blocks: [
        { type:'fail', tag:'✕ Problema 01', title:'Contraste del logo',       text:'Naranja EsDesign (#F15A24 aprox.) sobre fondo pastel multicolor. El ratio varía pero no supera 2.8:1 — muy por debajo del mínimo 4.5:1 requerido para texto normal.', ratio:'Ratio estimado: ~2.8:1 · Requerido: 4.5:1' },
        { type:'pass', tag:'✓ Solución 01', title:'Logo sobre fondo blanco',  text:'El naranja EsDesign sobre fondo blanco puro alcanza ratio 3.8:1 para el logo grande. Los labels y textos de soporte se pasan a negro #0F0E0C — ratio 21:1.', ratio:'Texto principal: 21:1 · Supera AA y AAA' },
        { type:'fail', tag:'✕ Problema 02', title:'Campos oscuros',           text:'Los inputs tienen fondo rgba(0,0,0,0.55) con texto blanco semitransparente. El placeholder es casi invisible (~1.8:1) y el campo se confunde con el fondo de la pantalla.', ratio:'Placeholder: ~1.8:1 · Falla gravemente' },
        { type:'pass', tag:'✓ Solución 02', title:'Campos claros con borde',  text:'Fondo #f7f7f7 con borde #e8e8e8 visible. El campo se distingue del fondo blanco de la pantalla. Estado focus con borde navy para indicar actividad — cumple criterio 2.4.7 Focus Visible.', ratio:'Texto activo: negro sobre blanco · 21:1' },
      ],
    },
    contrast: {
      heading: 'Tres elementos, tres diagnósticos',
      demos: [
        { label:'Logo + campos / fondo pastel', failBadge:'Falla AA',       ratio:'~2.8:1', fail:true },
        { label:'Links secundarios',            failBadge:'Casi invisible',  ratio:'~1.5:1', fail:true },
        { label:'Rediseño final',               passBadge:'Cumple AA',       ratio:'21:1',   fail:false },
      ],
    },
    wireframe: {
      heading: 'La estructura antes del color',
      text: 'Resolver la arquitectura de las dos pantallas en gris antes de aplicar visual garantizó que cada decisión de UI tuviera una razón estructural detrás — sin distracciones de color ni tipografía definitiva.',
      caption: 'Wireframe — login y verificación de código',
    },
    components: {
      heading: 'Sistema antes de pantallas',
      text: 'Antes de diseñar las pantallas finales se definieron las variables de color y espaciado, y se construyeron los componentes con anatomía y layout documentados.',
      caption: 'Variables de color, botones con anatomía y inputs documentados',
      buttons: { label:'Botones — 4 variantes', note:'El naranja EsDesign como primario para acciones de marca. Navy para Login — diferencia la acción de autenticación de acciones secundarias. Disabled en gris para estados inactivos.', variants:['Acción de marca','Login','Acción secundaria','Deshabilitado'] },
      inputs:  { label:'Inputs — 4 estados',    note:'Cada estado comunica algo distinto: default indica disponibilidad, focus confirma la selección, error señala el problema y disabled informa que no está disponible. Todos cumplen contraste AA.', states:['Default','Focus','Error','Disabled'], phs:['Correo electrónico','correo@esdesign.es','Correo inválido','No disponible'], errMsg:'Ingresa un correo válido' },
    },
    typo: {
      heading: 'Roboto — una familia, mucha jerarquía',
      text: 'Una sola familia tipográfica en toda la interfaz. El peso hace el trabajo de jerarquía — Bold para títulos, Semibold para subtítulos, Medium para labels y cuerpo. Sin mezclar familias innecesariamente.',
      cols: ['Nivel','Familia','Peso','Tamaño','Uso en EsDesign'],
      rows: [
        { level:'H1',      weight:'Bold',     size:'48px', sample:'DESIGN',                            sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'28px', fontWeight:700 } },
        { level:'H2',      weight:'Bold',     size:'40px', sample:'Inicio de sesión',                  sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'22px', fontWeight:700 } },
        { level:'H3',      weight:'Semibold', size:'32px', sample:'Por favor, introduzca el código.',  sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'17px', fontWeight:600 } },
        { level:'Body',    weight:'Medium',   size:'24px', sample:'Correo electrónico · Contraseña',   sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'14px', fontWeight:500, color:'#6B6860' } },
        { level:'Caption', weight:'Regular',  size:'14px', sample:'¿Olvidó contraseña? · Reenviar código', sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'12px', fontWeight:400, color:'#E8421A' } },
      ],
    },
    uiFinal: {
      heading: 'Las dos pantallas rediseñadas',
      text: 'Login + verificación de código. Fondo blanco, jerarquía Roboto, marca EsDesign preservada, todos los criterios WCAG AA cumplidos.',
      caption: 'Propuesta de rediseño — Login y verificación de código',
      screen1: { subtitle:'Iniciar sesión con tu cuenta educativa', sectionTitle:'Inicio de sesión', emailLabel:'Correo electrónico', emailPh:'correo@mail.com', passLabel:'Contraseña', passPh:'••••', forgot:'¿Olvidó contraseña?', loginBtn:'Login', capName:'Frame 1183 — Login', capDesc:'Fondo blanco, jerarquía Roboto, campos accesibles. Ratio 21:1 en texto principal.' },
      screen2: { heading:'Por favor, introduzca el código.', desc:'Revisa tu correo y copia el código de 6 dígitos que te enviamos.', codeLabel:'Código de 6 dígitos', codePh:'_ _ _ _ _ _', confirmBtn:'Confirmar', errMsg:'Puede que haya un error en el código.', resend:'Reenviar código de acceso', capName:'Frame 1184 — Verificación', capDesc:'Flujo de 2 pasos: código de 6 dígitos con estado de error y reenvío.' },
    },
    wcag: {
      heading: 'De fallar a cumplir',
      blocks: [
        { badge:'Antes · Falla',    type:'fail', title:'~2.8:1 en texto principal', text:'Naranja sobre fondo pastel. El estándar WCAG AA exige mínimo 4.5:1 para texto normal. El diseño original no lo cumplía en ningún elemento de texto.' },
        { badge:'Después · Cumple', type:'pass', title:'21:1 en texto principal',   text:'Negro #0F0E0C sobre blanco. Ratio máximo posible — cumple AA, AAA y todos los criterios de contraste de WCAG 2.1. El naranja se reserva solo para el logo y acciones.' },
        { badge:'Criterio 2.4.7',   type:'pass', title:'Focus Visible añadido',     text:'Los inputs tienen estado de focus con borde navy claramente diferenciado — criterio que el diseño original ignoraba completamente. Accesible para navegación por teclado.' },
      ],
    },
    results: {
      heading: 'Lo que se entregó',
      items: [
        { num:'4',  span:'+',  label:'Problemas WCAG documentados',     desc:'Contraste, jerarquía, labels y focus visible — cada uno con ratio exacto y solución implementada.' },
        { num:'21', span:':1', label:'Ratio de contraste obtenido',     desc:'De ~2.8:1 a 21:1 en texto principal. El máximo posible según WCAG — supera AA y AAA.' },
        { num:'2',  span:'',   label:'Pantallas navegables entregadas', desc:'Login + verificación de código con todos los estados de input y manejo de error documentados.' },
      ],
    },
    learnings: {
      heading: 'Lo que aprendí',
      items: [
        { n:'01', title:'Identidad de marca y accesibilidad no se contradicen',   text:'El naranja de EsDesign no desapareció en el rediseño — sigue siendo el color del logo y del botón de confirmación. Lo que cambió fue el contexto: dejó de usarse como color de texto informativo sobre fondos de bajo contraste y se reservó para elementos de alta jerarquía sobre fondos limpios.' },
        { n:'02', title:'Las variables de color son la base del sistema',          text:'Definir tokens de color antes de diseñar las pantallas hizo que cualquier ajuste de color se propagara automáticamente. Cuando se decidió cambiar el tono exacto del navy del botón Login, el cambio afectó todos los estados de focus en un solo lugar.' },
        { n:'03', title:'La anatomía del componente es el handoff',               text:'Documentar padding, spacing y estados de cada componente en Figma no fue burocracia — fue lo que convirtió el diseño en un entregable real para desarrollo. Sin esa documentación, el diseño se queda en pantalla bonita.' },
      ],
    },
    next:   { label: 'Siguiente proyecto', title: 'Sistema de Turnos →' },
    footer: { copy1: 'Juan José Bernal Núñez — UX/UI Designer', copy2: 'EsDesign Login' },
  },

  en: {
    nav: { back: 'Back' },
    hero: {
      tagline: "Accessibility audit and complete redesign of the EsDesign educational platform's login — from a visually striking but inaccessible design to a clean interface that meets WCAG AA.",
      before: { badge: '✕ Fails WCAG', label: 'Before', school: 'ESCUELA SUPERIOR DE DISEÑO', loginBtn: 'Sign in', errors: ['⚠ Contrast ~2.8:1', '⚠ Unreadable labels'] },
      after:  { badge: '✓ Passes AA', label: 'After', school: 'ESCUELA SUPERIOR DE DISEÑO', platform: 'Blackboard ∧', sectionTitle: 'Sign in', emailLabel: 'Email address', passLabel: 'Password', emailPh: 'email@mail.com', passPh: '••••', forgot: 'Forgot password?', loginBtn: 'Login', check: '✓ Ratio 21:1' },
    },
    infoBar: [
      { label: 'Type',  value: 'Web · Redesign' },
      { label: 'Role',  value: 'UX/UI Designer' },
      { label: 'Tools', value: 'Figma + WCAG AA' },
    ],
    problem: {
      heading: "Pretty isn't accessible",
      p1: "EsDesign's original login has a multicolor pastel gradient background that's part of their visual identity. Over that background, orange text, semi-transparent white labels, and dark-background fields are layered — visually striking but systematically failing the WCAG AA minimum contrast ratio of 4.5:1 for normal text.",
      p2: "The challenge wasn't to eliminate EsDesign's identity but to redesign the login to meet accessibility criteria without losing the brand. The result: white background, clear typographic hierarchy with Roboto, and EsDesign orange reserved for actions and the logo — not for informational text.",
    },
    process: {
      heading: 'From diagnosis to redesign',
      intro: 'Five progressive stages — each validates the previous before moving forward.',
      steps: [
        { name:'Audit',      desc:'Analysis of the original design: contrast, hierarchy, labels and WCAG AA compliance. Each failure documented with its exact ratio.' },
        { name:'Wireframe',  desc:'Clean structure of the new login and code verification screen — no color or final typography yet.' },
        { name:'Variables',  desc:'Color and spacing variable system in Figma — tokens for background, text, borders, states and feedback.' },
        { name:'Components', desc:'Buttons in 4 variants with documented anatomy and spacing. Inputs with 4 states. Developer-ready handoff.' },
        { name:'Final UI',   desc:'Navigable login + code verification. White background, Roboto, clear hierarchy and all WCAG AA criteria met.' },
      ],
    },
    original: {
      heading: 'What existed — and its problems',
      text: "EsDesign's current design was analyzed against the WCAG 2.1 AA standard. Four critical contrast and readability problems were identified that make the screen inaccessible for users with visual difficulties.",
      caption: 'Original design — multicolor background with insufficient contrast',
    },
    audit: {
      heading: '4 problems, 4 solutions',
      blocks: [
        { type:'fail', tag:'✕ Problem 01', title:'Logo contrast',          text:"EsDesign orange (~#F15A24) over multicolor pastel background. The ratio varies but never exceeds 2.8:1 — well below the 4.5:1 minimum required for normal text.", ratio:'Estimated ratio: ~2.8:1 · Required: 4.5:1' },
        { type:'pass', tag:'✓ Solution 01', title:'Logo on white',         text:"EsDesign orange on pure white background reaches a 3.8:1 ratio for the large logo. Labels and support text are switched to black #0F0E0C — ratio 21:1.", ratio:'Main text: 21:1 · Exceeds AA and AAA' },
        { type:'fail', tag:'✕ Problem 02', title:'Dark fields',            text:"Inputs have an rgba(0,0,0,0.55) background with semi-transparent white text. The placeholder is nearly invisible (~1.8:1) and the field blends into the screen background.", ratio:'Placeholder: ~1.8:1 · Fails severely' },
        { type:'pass', tag:'✓ Solution 02', title:'Clear fields with border', text:"Background #f7f7f7 with a visible #e8e8e8 border. The field is distinct from the white screen background. Focus state with navy border indicates activity — meets criterion 2.4.7 Focus Visible.", ratio:'Active text: black on white · 21:1' },
      ],
    },
    contrast: {
      heading: 'Three elements, three diagnoses',
      demos: [
        { label:'Logo + fields / pastel bg', failBadge:'Fails AA',        ratio:'~2.8:1', fail:true },
        { label:'Secondary links',           failBadge:'Nearly invisible', ratio:'~1.5:1', fail:true },
        { label:'Final redesign',            passBadge:'Passes AA',        ratio:'21:1',   fail:false },
      ],
    },
    wireframe: {
      heading: 'Structure before color',
      text: 'Solving the two-screen architecture in grey before applying visual design ensured every UI decision had a structural reason behind it — no distractions from color or final typography.',
      caption: 'Wireframe — login and code verification',
    },
    components: {
      heading: 'System before screens',
      text: 'Before designing the final screens, color and spacing variables were defined, and components were built with documented anatomy and layout.',
      caption: 'Color variables, buttons with anatomy, and documented inputs',
      buttons: { label:'Buttons — 4 variants', note:"EsDesign orange as primary for brand actions. Navy for Login — differentiates the authentication action from secondary actions. Disabled in grey for inactive states.", variants:['Brand action','Login','Secondary action','Disabled'] },
      inputs:  { label:'Inputs — 4 states',    note:"Each state communicates something different: default signals availability, focus confirms selection, error signals the problem, disabled signals unavailability. All meet AA contrast.", states:['Default','Focus','Error','Disabled'], phs:['Email address','email@esdesign.es','Invalid email','Not available'], errMsg:'Enter a valid email' },
    },
    typo: {
      heading: 'Roboto — one family, lots of hierarchy',
      text: 'A single typeface throughout the interface. Weight does the hierarchy work — Bold for titles, Semibold for subtitles, Medium for labels and body. No unnecessary family mixing.',
      cols: ['Level','Family','Weight','Size','Use in EsDesign'],
      rows: [
        { level:'H1',      weight:'Bold',     size:'48px', sample:'DESIGN',                            sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'28px', fontWeight:700 } },
        { level:'H2',      weight:'Bold',     size:'40px', sample:'Sign in',                           sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'22px', fontWeight:700 } },
        { level:'H3',      weight:'Semibold', size:'32px', sample:'Please enter the code.',            sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'17px', fontWeight:600 } },
        { level:'Body',    weight:'Medium',   size:'24px', sample:'Email address · Password',          sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'14px', fontWeight:500, color:'#6B6860' } },
        { level:'Caption', weight:'Regular',  size:'14px', sample:'Forgot password? · Resend code',   sStyle:{ fontFamily:"'Roboto',sans-serif", fontSize:'12px', fontWeight:400, color:'#E8421A' } },
      ],
    },
    uiFinal: {
      heading: 'The two redesigned screens',
      text: 'Login + code verification. White background, Roboto hierarchy, EsDesign brand preserved, all WCAG AA criteria met.',
      caption: 'Redesign proposal — Login and code verification',
      screen1: { subtitle:'Sign in with your educational account', sectionTitle:'Sign in', emailLabel:'Email address', emailPh:'email@mail.com', passLabel:'Password', passPh:'••••', forgot:'Forgot password?', loginBtn:'Login', capName:'Frame 1183 — Login', capDesc:'White background, Roboto hierarchy, accessible fields. 21:1 ratio on main text.' },
      screen2: { heading:'Please enter the code.', desc:'Check your email and copy the 6-digit code we sent you.', codeLabel:'6-digit code', codePh:'_ _ _ _ _ _', confirmBtn:'Confirm', errMsg:'There may be an error in the code.', resend:'Resend access code', capName:'Frame 1184 — Verification', capDesc:'2-step flow: 6-digit code with error state and resend option.' },
    },
    wcag: {
      heading: 'From failing to passing',
      blocks: [
        { badge:'Before · Fails',   type:'fail', title:'~2.8:1 on main text', text:"Orange over pastel background. WCAG AA requires a minimum 4.5:1 for normal text. The original design failed this on every text element." },
        { badge:'After · Passes',   type:'pass', title:'21:1 on main text',   text:"Black #0F0E0C on white. The maximum possible ratio — passes AA, AAA and all WCAG 2.1 contrast criteria. Orange is reserved only for the logo and actions." },
        { badge:'Criterion 2.4.7',  type:'pass', title:'Focus Visible added', text:"Inputs have a focus state with a clearly differentiated navy border — a criterion the original design completely ignored. Accessible for keyboard navigation." },
      ],
    },
    results: {
      heading: 'What was delivered',
      items: [
        { num:'4',  span:'+',  label:'WCAG problems documented',     desc:'Contrast, hierarchy, labels and focus visible — each with exact ratio and implemented solution.' },
        { num:'21', span:':1', label:'Contrast ratio achieved',      desc:'From ~2.8:1 to 21:1 on main text. The maximum possible per WCAG — exceeds both AA and AAA.' },
        { num:'2',  span:'',   label:'Navigable screens delivered',  desc:'Login + code verification with all input states and error handling documented.' },
      ],
    },
    learnings: {
      heading: 'What I learned',
      items: [
        { n:'01', title:"Brand identity and accessibility don't contradict each other", text:"EsDesign's orange didn't disappear in the redesign — it's still the color of the logo and the confirm button. What changed was the context: it stopped being used as informational text color over low-contrast backgrounds and was reserved for high-hierarchy elements on clean backgrounds." },
        { n:'02', title:'Color variables are the foundation of the system',             text:"Defining color tokens before designing the screens meant any color adjustment propagated automatically. When the exact navy tone for the Login button was changed, the change affected all focus states in one place." },
        { n:'03', title:'Component anatomy is the handoff',                             text:"Documenting padding, spacing and states of each component in Figma wasn't bureaucracy — it was what turned the design into a real development deliverable. Without that documentation, the design stays a pretty screen." },
      ],
    },
    next:   { label: 'Next project', title: 'Queue System →' },
    footer: { copy1: 'Juan José Bernal Núñez — UX/UI Designer', copy2: 'EsDesign Login' },
  },
} as const;

type Lang = keyof typeof T;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EsDesignCaseStudy() {
  const { lang, setLang } = useLanguage();
  const t = T[lang as Lang];
  const a = t.hero.after;
  const b = t.hero.before;

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }),
      { threshold: 0 },
    );
    document.querySelectorAll('.esd-infocell').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="esd">

        {/* ── NAV ── */}
        <nav className="esd-nav">
          <Link href="/#projects" className="esd-back">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.nav.back}
          </Link>
          <div className="esd-nav-right">
            <img src="/Images/LogoJJB/Logo%20JJB%20negro.png" alt="JJB" className="esd-nav-logo" />
            <div className="esd-lang">
              <button className={`esd-lang-btn${lang==='es'?' active':''}`} onClick={() => setLang('es')}>ES</button>
              <button className={`esd-lang-btn${lang==='en'?' active':''}`} onClick={() => setLang('en')}>EN</button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="esd-hero">
          <div>
            <div className="esd-hero-eyebrow">
              <span className="esd-hero-tag accent">Web · {lang==='es'?'Rediseño':'Redesign'}</span>
              <span className="esd-hero-tag">WCAG AA</span>
            </div>
            <h1 className="esd-hero-h1">Es<span>Design</span></h1>
            <p className="esd-hero-sub">{t.hero.tagline}</p>
            <div className="esd-chips">
              <span className="esd-chip acc">Figma</span>
              <span className="esd-chip acc">WCAG AA</span>
              <span className="esd-chip">Roboto</span>
              <span className="esd-chip">{lang==='es'?'Variables de color':'Color variables'}</span>
              <span className="esd-chip">Atomic Design</span>
            </div>
          </div>

          {/* Before / After cards */}
          <div className="esd-ba">
            <div className="esd-card esd-card-before">
              <div className="esd-badge esd-badge-fail">{b.badge}</div>
              <span style={{ fontFamily:'var(--mono)', fontSize:'8px', letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(0,0,0,.4)' }}>{b.label}</span>
              <div className="esd-brand"><span className="esd-es">ES</span><span className="esd-design-b">DESIGN</span></div>
              <div className="esd-sub" style={{ color:'rgba(0,0,0,.4)' }}>{b.school}</div>
              <div className="esd-field esd-field-b">juanjose@gmail.com</div>
              <div className="esd-field esd-field-b">••••••••</div>
              <div className="esd-btn esd-btn-b">{b.loginBtn}</div>
              {b.errors.map(e => <div key={e} className="esd-err-tag">{e}</div>)}
            </div>

            <div className="esd-vs">VS</div>

            <div className="esd-card esd-card-after">
              <div className="esd-badge esd-badge-pass">{a.badge}</div>
              <span style={{ fontFamily:'var(--mono)', fontSize:'8px', letterSpacing:'.12em', textTransform:'uppercase', color:'#888' }}>{a.label}</span>
              <div className="esd-brand"><span className="esd-es">ES</span><span className="esd-design-a">DESIGN</span></div>
              <div className="esd-sub" style={{ color:'#888' }}>{a.school}</div>
              <div className="esd-bb">{a.platform}</div>
              <div className="esd-section">{a.sectionTitle}</div>
              <div style={{ fontSize:'12px', fontWeight:500, color:'var(--ink)', fontFamily:'var(--roboto)' }}>{a.emailLabel}</div>
              <div className="esd-field esd-field-a">{a.emailPh}</div>
              <div style={{ fontSize:'12px', fontWeight:500, color:'var(--ink)', fontFamily:'var(--roboto)' }}>{a.passLabel}</div>
              <div className="esd-field esd-field-a">{a.passPh}</div>
              <div className="esd-forgot">{a.forgot}</div>
              <div className="esd-btn esd-btn-a">{a.loginBtn}</div>
              <div className="esd-check-tag">{a.check}</div>
            </div>
          </div>
        </section>

        {/* ── INFO BAR ── */}
        <div className="esd-infobar">
          {t.infoBar.map(cell => (
            <div key={cell.label} className="esd-infocell">
              <div className="esd-infocell-label">{cell.label}</div>
              <div className="esd-infocell-value">{cell.value}</div>
            </div>
          ))}
        </div>

        {/* ── PROBLEMA ── */}
        <div className="esd-section-wrap">
          <div className="esd-pad">
            <h2 className="esd-h2">{t.problem.heading}</h2>
            <p className="esd-body">{t.problem.p1}</p>
            <p className="esd-body">{t.problem.p2}</p>
          </div>
        </div>

        {/* ── PROCESO ── */}
        <div className="esd-section-wrap">
          <div className="esd-pad-b">
            <h2 className="esd-h2">{t.process.heading}</h2>
            <p className="esd-body">{t.process.intro}</p>
          </div>
          <div className="esd-steps">
            {t.process.steps.map(s => (
              <div key={s.name} className="esd-step">
                <div className="esd-step-name">{s.name}</div>
                <div className="esd-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── DISEÑO ORIGINAL ── */}
        <div className="esd-section-wrap">
          <div className="esd-pad">
            <h2 className="esd-h2">{t.original.heading}</h2>
            <p className="esd-body">{t.original.text}</p>
            <div style={{ marginTop:40 }}>
              <img src="/Images/EsDesign/Dise%C3%B1o%20actual%20%2B%20identificaci%C3%B3n%20oportunidades%20de%20mejora.png" alt="Diseño original EsDesign" className="esd-img" />
              <div className="esd-img-cap">{t.original.caption}</div>
            </div>
          </div>
        </div>

        {/* ── AUDITORÍA WCAG ── */}
        <div className="esd-section-wrap">
          <div className="esd-pad-b">
            <h2 className="esd-h2">{t.audit.heading}</h2>
          </div>
          <div style={{ padding:'0 40px 72px' }}>
            <div className="esd-audit">
              {t.audit.blocks.map(b => (
                <div key={b.tag} className={`esd-audit-block ${b.type==='fail'?'esd-audit-fail':'esd-audit-pass'}`}>
                  <div className={`esd-audit-tag ${b.type==='fail'?'esd-audit-fail-tag':'esd-audit-pass-tag'}`}>{b.tag}</div>
                  <div className="esd-audit-title">{b.title}</div>
                  <p className="esd-audit-text">{b.text}</p>
                  <div className="esd-audit-ratio">{b.ratio}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTRASTE VISUAL ── */}
        <div className="esd-section-wrap">
          <div className="esd-pad-b">
            <h2 className="esd-h2">{t.contrast.heading}</h2>
          </div>
          <div style={{ padding:'0 40px 72px' }}>
            <div className="esd-contrast">
              <div className="esd-cd">
                <div className="esd-cd-screen" style={{ background:'linear-gradient(135deg,#d4c5e2,#b8d4e8,#e8d4c5)' }}>
                  <div style={{ fontWeight:900, fontSize:'22px', color:'#E8421A', fontFamily:'var(--roboto)' }}>ES<span style={{ fontSize:'17px', color:'#333' }}>DESIGN</span></div>
                  <div style={{ fontSize:'9px', color:'rgba(0,0,0,.4)' }}>ESCUELA SUPERIOR DE DISEÑO</div>
                  <div style={{ background:'rgba(0,0,0,.55)', padding:'7px 10px', color:'rgba(255,255,255,.4)', fontSize:'10px', marginTop:'4px' }}>usuario@mail.com</div>
                </div>
                <div className="esd-cd-footer">
                  <span className="esd-cd-label">{t.contrast.demos[0].label}</span>
                  <div className="esd-cd-status"><span className="esd-cd-fail">{t.contrast.demos[0].failBadge}</span><span className="esd-cd-ratio">{t.contrast.demos[0].ratio}</span></div>
                </div>
              </div>
              <div className="esd-cd">
                <div className="esd-cd-screen" style={{ background:'linear-gradient(135deg,#d4c5e2,#b8d4e8,#e8d4c5)', justifyContent:'center' }}>
                  <div style={{ fontSize:'11px', color:'rgba(255,255,255,.3)', fontFamily:'var(--roboto)' }}>{lang==='es'?'¿Olvidó contraseña?':'Forgot password?'}</div>
                  <div style={{ fontSize:'11px', color:'rgba(0,0,0,.35)', marginTop:'8px', fontFamily:'var(--roboto)' }}>{lang==='es'?'Términos · Condiciones':'Terms · Conditions'}</div>
                </div>
                <div className="esd-cd-footer">
                  <span className="esd-cd-label">{t.contrast.demos[1].label}</span>
                  <div className="esd-cd-status"><span className="esd-cd-fail">{t.contrast.demos[1].failBadge}</span><span className="esd-cd-ratio">{t.contrast.demos[1].ratio}</span></div>
                </div>
              </div>
              <div className="esd-cd">
                <div className="esd-cd-screen" style={{ background:'#fff' }}>
                  <div style={{ fontWeight:900, fontSize:'22px', fontFamily:'var(--roboto)' }}><span style={{ color:'#E8421A' }}>ES</span><span style={{ color:'#1a1a2e' }}>DESIGN</span></div>
                  <div style={{ fontSize:'13px', fontWeight:700, color:'#0F0E0C', marginTop:'4px', fontFamily:'var(--roboto)' }}>{lang==='es'?'Inicio de sesión':'Sign in'}</div>
                  <div style={{ background:'#f7f7f7', border:'1px solid #e8e8e8', padding:'7px 10px', fontSize:'10px', color:'#888', marginTop:'4px' }}>{lang==='es'?'Correo electrónico':'Email address'}</div>
                  <div style={{ background:'#1a1a2e', color:'white', padding:'8px', fontSize:'11px', fontWeight:600, textAlign:'center', marginTop:'4px', fontFamily:'var(--roboto)' }}>Login</div>
                </div>
                <div className="esd-cd-footer">
                  <span className="esd-cd-label">{t.contrast.demos[2].label}</span>
                  <div className="esd-cd-status"><span className="esd-cd-pass">{t.contrast.demos[2].passBadge}</span><span className="esd-cd-ratio">{t.contrast.demos[2].ratio}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── WIREFRAME ── */}
        <div className="esd-section-wrap">
          <div className="esd-pad">
            <h2 className="esd-h2">{t.wireframe.heading}</h2>
            <p className="esd-body">{t.wireframe.text}</p>
            <div style={{ marginTop:40 }}>
              <img src="/Images/EsDesign/Wireframe.png" alt="Wireframe EsDesign" className="esd-img" />
              <div className="esd-img-cap">{t.wireframe.caption}</div>
            </div>
          </div>
        </div>

        {/* ── VARIABLES Y COMPONENTES ── */}
        <div className="esd-section-wrap">
          <div className="esd-pad-b">
            <h2 className="esd-h2">{t.components.heading}</h2>
            <p className="esd-body">{t.components.text}</p>
            <div style={{ marginTop:40 }}>
              <img src="/Images/EsDesign/Etapa%203.png" alt="Variables y componentes EsDesign" className="esd-img" />
              <div className="esd-img-cap">{t.components.caption}</div>
            </div>
          </div>
          <div style={{ padding:'0 40px 72px' }}>
            <div className="esd-comp-grid">
              <div className="esd-comp-block">
                <div className="esd-comp-label">{t.components.buttons.label}</div>
                <div className="esd-comp-note">{t.components.buttons.note}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginTop:'16px' }}>
                  <div className="rb rb-primary">{t.components.buttons.variants[0]}</div>
                  <div className="rb rb-navy">{t.components.buttons.variants[1]}</div>
                  <div className="rb rb-secondary">{t.components.buttons.variants[2]}</div>
                  <div className="rb rb-disabled">{t.components.buttons.variants[3]}</div>
                </div>
              </div>
              <div className="esd-comp-block">
                <div className="esd-comp-label">{t.components.inputs.label}</div>
                <div className="esd-comp-note">{t.components.inputs.note}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginTop:'16px' }}>
                  <div><div className="inp-lbl">{t.components.inputs.states[0]}</div><div className="inp inp-default">{t.components.inputs.phs[0]}</div></div>
                  <div><div className="inp-lbl">{t.components.inputs.states[1]}</div><div className="inp inp-focus">{t.components.inputs.phs[1]}</div></div>
                  <div>
                    <div className="inp-lbl">{t.components.inputs.states[2]}</div>
                    <div className="inp inp-error">{t.components.inputs.phs[2]}</div>
                    <div style={{ fontSize:'9px', color:'var(--acc)', marginTop:'2px' }}>{t.components.inputs.errMsg}</div>
                  </div>
                  <div><div className="inp-lbl">{t.components.inputs.states[3]}</div><div className="inp inp-disabled">{t.components.inputs.phs[3]}</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TIPOGRAFÍA ── */}
        <div className="esd-section-wrap">
          <div className="esd-pad">
            <h2 className="esd-h2">{t.typo.heading}</h2>
            <p className="esd-body">{t.typo.text}</p>
            <div className="esd-typo-table">
              <div className="esd-typo-head">
                {t.typo.cols.map(c => <span key={c}>{c}</span>)}
              </div>
              {t.typo.rows.map(row => (
                <div key={row.level} className="esd-typo-row">
                  <span className="etc">{row.level}</span>
                  <span className="etc">Roboto</span>
                  <span className="etc">{row.weight}</span>
                  <span className="etc">{row.size}</span>
                  <span style={row.sStyle as React.CSSProperties}>{row.sample}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── UI FINAL ── */}
        <div className="esd-section-wrap">
          <div className="esd-pad-b">
            <h2 className="esd-h2">{t.uiFinal.heading}</h2>
            <p className="esd-body">{t.uiFinal.text}</p>
            <div style={{ marginTop:40 }}>
              <img src="/Images/EsDesign/Propuesta%20redise%C3%B1o.png" alt="Propuesta rediseño EsDesign" className="esd-img" />
              <div className="esd-img-cap">{t.uiFinal.caption}</div>
            </div>
          </div>
          <div style={{ padding:'0 40px 72px' }}>
            <div className="esd-screens">
              <div className="esd-screen">
                <div className="esd-screen-body">
                  <div style={{ display:'flex', alignItems:'baseline', gap:'4px' }}>
                    <span style={{ fontFamily:'var(--roboto)', fontSize:'28px', fontWeight:900, color:'var(--acc)' }}>ES</span>
                    <span style={{ fontFamily:'var(--roboto)', fontSize:'24px', fontWeight:700, color:'var(--navy)' }}>DESIGN</span>
                  </div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'10px', color:'#888', letterSpacing:'.04em' }}>ESCUELA SUPERIOR DE DISEÑO DE BARCELONA</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'13px', fontWeight:600, color:'var(--navy)', marginTop:'4px' }}>Blackboard ∧</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'12px', color:'#4a4845', marginTop:'2px' }}>{t.uiFinal.screen1.subtitle}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'15px', fontWeight:700, color:'var(--ink)', marginTop:'8px' }}>{t.uiFinal.screen1.sectionTitle}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'13px', fontWeight:500, color:'var(--ink)' }}>{t.uiFinal.screen1.emailLabel}</div>
                  <div style={{ background:'#f7f7f7', border:'1px solid #e8e8e8', padding:'10px 14px', fontSize:'12px', color:'#aaa', fontFamily:'var(--roboto)' }}>{t.uiFinal.screen1.emailPh}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'13px', fontWeight:500, color:'var(--ink)' }}>{t.uiFinal.screen1.passLabel}</div>
                  <div style={{ background:'#f7f7f7', border:'1px solid #e8e8e8', padding:'10px 14px', fontSize:'12px', color:'#aaa', fontFamily:'var(--roboto)' }}>{t.uiFinal.screen1.passPh}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'12px', color:'var(--acc)' }}>{t.uiFinal.screen1.forgot}</div>
                  <div style={{ background:'#ccc', color:'#888', padding:'11px', fontSize:'13px', fontWeight:600, textAlign:'center', marginTop:'4px', fontFamily:'var(--roboto)' }}>{t.uiFinal.screen1.loginBtn}</div>
                </div>
                <div className="esd-screen-cap">
                  <div className="esd-screen-cap-name">{t.uiFinal.screen1.capName}</div>
                  <div className="esd-screen-cap-desc">{t.uiFinal.screen1.capDesc}</div>
                </div>
              </div>
              <div className="esd-screen">
                <div className="esd-screen-body">
                  <div style={{ display:'flex', alignItems:'baseline', gap:'4px' }}>
                    <span style={{ fontFamily:'var(--roboto)', fontSize:'28px', fontWeight:900, color:'var(--acc)' }}>ES</span>
                    <span style={{ fontFamily:'var(--roboto)', fontSize:'24px', fontWeight:700, color:'var(--navy)' }}>DESIGN</span>
                  </div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'10px', color:'#888', letterSpacing:'.04em' }}>ESCUELA SUPERIOR DE DISEÑO DE BARCELONA</div>
                  <div style={{ height:'16px' }} />
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'16px', fontWeight:700, color:'var(--ink)' }}>{t.uiFinal.screen2.heading}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'12px', color:'#4a4845', lineHeight:1.5, marginTop:'4px' }}>{t.uiFinal.screen2.desc}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'13px', fontWeight:500, color:'var(--ink)', marginTop:'8px' }}>{t.uiFinal.screen2.codeLabel}</div>
                  <div style={{ background:'#f7f7f7', border:'1px solid #e8e8e8', padding:'10px 14px', fontSize:'12px', color:'#aaa', fontFamily:'var(--roboto)' }}>{t.uiFinal.screen2.codePh}</div>
                  <div style={{ background:'var(--acc)', color:'white', padding:'11px', fontSize:'13px', fontWeight:600, textAlign:'center', marginTop:'8px', fontFamily:'var(--roboto)' }}>{t.uiFinal.screen2.confirmBtn}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'12px', color:'var(--acc)', marginTop:'6px' }}>{t.uiFinal.screen2.errMsg}</div>
                  <div style={{ fontFamily:'var(--roboto)', fontSize:'12px', color:'var(--navy)', textDecoration:'underline', marginTop:'4px' }}>{t.uiFinal.screen2.resend}</div>
                </div>
                <div className="esd-screen-cap">
                  <div className="esd-screen-cap-name">{t.uiFinal.screen2.capName}</div>
                  <div className="esd-screen-cap-desc">{t.uiFinal.screen2.capDesc}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── WCAG RESULTADO ── */}
        <div className="esd-section-wrap">
          <div className="esd-pad-b">
            <h2 className="esd-h2">{t.wcag.heading}</h2>
          </div>
          <div className="esd-wcag">
            {t.wcag.blocks.map(w => (
              <div key={w.badge} className="esd-wcag-block">
                <span className={`esd-wcag-badge ${w.type==='fail'?'esd-wcag-fail':'esd-wcag-pass'}`}>{w.badge}</span>
                <div className="esd-wcag-title">{w.title}</div>
                <p className="esd-wcag-text">{w.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RESULTADOS ── */}
        <div className="esd-section-wrap">
          <div className="esd-pad-b">
            <h2 className="esd-h2">{t.results.heading}</h2>
          </div>
          <div className="esd-results">
            {t.results.items.map(r => (
              <div key={r.label} className="esd-result">
                <span className="esd-result-num">{r.num}<span>{r.span}</span></span>
                <div className="esd-result-label">{r.label}</div>
                <div className="esd-result-desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── APRENDIZAJES ── */}
        <div className="esd-section-wrap">
          <div className="esd-pad">
            <h2 className="esd-h2">{t.learnings.heading}</h2>
            <div style={{ marginTop:40 }}>
              {t.learnings.items.map(item => (
                <div key={item.n} className="esd-learn-item">
                  <div className="esd-learn-num">{item.n}</div>
                  <div>
                    <div className="esd-learn-title">{item.title}</div>
                    <p className="esd-learn-text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── NEXT PROJECT ── */}
        <div className="esd-next">
          <span className="esd-next-label">{t.next.label}</span>
          <Link href="/projects/sistema-de-turnos" className="esd-next-title">{t.next.title}</Link>
        </div>

        <div className="esd-footer">
          <span>{t.footer.copy1}</span>
          <span>{t.footer.copy2}</span>
        </div>

      </div>
    </>
  );
}
