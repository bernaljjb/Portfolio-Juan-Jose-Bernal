'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  .hb {
    --acc: #F5C518;
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
  .hb-nav {
    position: sticky; top: 0; z-index: 60;
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 40px;
    background: var(--paper);
    border-bottom: 3px solid var(--ink);
  }
  .hb-back {
    display: flex; align-items: center; gap: 8px;
    font-family: var(--mono); font-size: 11px; letter-spacing: .14em;
    text-transform: uppercase; color: var(--ink); text-decoration: none;
    transition: color .2s;
  }
  .hb-back:hover { color: var(--acc); }
  .hb-nav-right { display: flex; align-items: center; gap: 16px; }
  .hb-nav-logo { height: 28px; width: auto; display: block; }
  .hb-lang {
    display: flex; align-items: center;
    border: 2px solid var(--ink);
  }
  .hb-lang-btn {
    background: transparent; border: none; cursor: pointer;
    font-family: var(--mono); font-size: 11px; letter-spacing: .08em;
    padding: 5px 9px; color: var(--ink); transition: background .15s, color .15s;
  }
  .hb-lang-btn.active { background: var(--ink); color: var(--paper); }

  /* ── HERO ── */
  .hb-hero {
    background: var(--dark); color: var(--paper);
    display: grid; grid-template-columns: 1fr 1fr;
    padding: 80px 40px; gap: 60px; align-items: center;
    border-bottom: 3px solid var(--ink);
    min-height: 90vh;
  }
  .hb-hero-eyebrow {
    display: flex; align-items: center; gap: 10px; margin-bottom: 28px;
  }
  .hb-hero-tag {
    font-family: var(--mono); font-size: 10px; letter-spacing: .14em;
    text-transform: uppercase; padding: 4px 10px;
    border: 2px solid rgba(239,235,225,.25); color: rgba(239,235,225,.7);
  }
  .hb-hero-tag.flagship {
    background: var(--acc); color: var(--paper);
    border-color: var(--acc);
  }
  .hb-hero-h1 {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(72px, 10vw, 140px); line-height: .92;
    letter-spacing: -.02em; color: var(--paper);
    margin: 0 0 28px;
  }
  .hb-hero-h1 span { color: var(--acc); display: block; }
  .hb-hero-sub {
    font-size: 17px; line-height: 1.75;
    color: rgba(239,235,225,.7); max-width: 440px; margin-bottom: 28px;
  }
  .hb-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .hb-chip {
    font-family: var(--mono); font-size: 10px; letter-spacing: .1em;
    text-transform: uppercase; padding: 5px 12px;
    border: 2px solid rgba(239,235,225,.2); color: rgba(239,235,225,.65);
  }

  /* ── PHONE FAN (same as home) ── */
  .hb-phones {
    position: relative; height: 480px;
    display: flex; align-items: center; justify-content: center;
  }
  .hb-phone {
    position: absolute;
    background: #0d1117;
    border: 3px solid rgba(255,255,255,.12);
    overflow: hidden;
    transition: transform .5s cubic-bezier(.23,1,.32,1);
  }
  .hb-phone img { width:100%; height:100%; object-fit:cover; object-position:top; display:block; }
  .hb-phone-1 { width:145px; height:290px; transform: translateX(-85px) rotate(-12deg) translateY(18px); z-index:1; }
  .hb-phone-2 { width:165px; height:330px; transform: translateY(-12px); z-index:3; }
  .hb-phone-3 { width:145px; height:290px; transform: translateX(85px) rotate(12deg) translateY(18px); z-index:1; }
  .hb-phones:hover .hb-phone-1 { transform: translateX(-115px) rotate(-15deg) translateY(8px); }
  .hb-phones:hover .hb-phone-2 { transform: translateY(-28px); }
  .hb-phones:hover .hb-phone-3 { transform: translateX(115px) rotate(15deg) translateY(8px); }

  /* ── INFO BAR ── */
  .hb-infobar {
    display: flex; border-bottom: 3px solid var(--ink);
  }
  .hb-infocell {
    flex: 1; padding: 32px 40px;
    border-right: 3px solid var(--ink);
    opacity: 0; transform: translateY(14px);
    transition: opacity .4s, transform .4s;
  }
  .hb-infocell:last-child { border-right: none; }
  .hb-infocell.vis { opacity:1; transform:none; }
  .hb-infocell-label {
    font-family: var(--mono); font-size: 9px; letter-spacing: .2em;
    text-transform: uppercase; color: #7a7770; margin-bottom: 6px;
  }
  .hb-infocell-value {
    font-family: var(--display); font-weight: 700;
    font-size: 20px; color: var(--ink);
  }

  /* ── SECTION SHARED ── */
  .hb-section { border-bottom: 3px solid var(--ink); }
  .hb-section-header {
    padding: 72px 40px;
  }
  .hb-section-label {
    font-family: var(--mono); font-size: 10px; letter-spacing: .2em;
    text-transform: uppercase; color: #7a7770;
    position: sticky; top: 80px;
    display: flex; align-items: center; gap: 10px;
  }
  .hb-section-label::before {
    content: ''; display: inline-block; width: 20px; height: 2px; background: #7a7770;
  }
  .hb-h2 {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(32px, 4vw, 52px); line-height: 1; margin: 0 0 20px;
    letter-spacing: -.01em;
  }
  .hb-body { font-size: 17px; line-height: 1.75; color: #4a4845; max-width: 600px; }
  .hb-body + .hb-body { margin-top: 16px; }

  /* ── PROCESS GRID ── */
  .hb-process-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    border-top: 3px solid var(--ink);
    background: var(--dark);
  }
  .hb-step {
    padding: 40px;
    border-right: 3px solid rgba(255,255,255,.1);
    border-bottom: 3px solid rgba(255,255,255,.1);
    opacity: 0; transform: translateY(18px);
    transition: opacity .4s, transform .4s;
  }
  .hb-step.vis { opacity:1; transform:none; }
  .hb-step:nth-child(even) { border-right: none; }
  .hb-step-last {
    grid-column: 1 / -1;
    display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
    padding: 40px; border-bottom: none;
    border-top: 3px solid rgba(255,255,255,.1);
  }
  .hb-step-num {
    font-family: var(--mono); font-size: 10px; letter-spacing: .18em;
    color: var(--acc); background: rgba(229,64,42,.1);
    border: 2px solid rgba(229,64,42,.3);
    padding: 3px 10px; display: inline-block; margin-bottom: 16px;
  }
  .hb-step-name {
    font-family: var(--display); font-weight: 800;
    font-size: 26px; color: var(--paper); margin-bottom: 10px;
  }
  .hb-step-desc { font-size: 13px; line-height: 1.8; color: rgba(239,235,225,.65); }
  .hb-step-result {
    background: rgba(229,64,42,.06);
    border: 2px solid rgba(229,64,42,.25);
    padding: 24px;
  }
  .hb-step-result-label {
    font-family: var(--mono); font-size: 9px; letter-spacing: .15em;
    text-transform: uppercase; color: rgba(239,235,225,.5); margin-bottom: 10px;
  }
  .hb-step-result-stat {
    font-family: var(--display); font-weight: 800;
    font-size: 56px; color: var(--acc); line-height: 1; display: block; margin-bottom: 8px;
  }
  .hb-step-result-desc { font-size: 13px; color: rgba(239,235,225,.6); line-height: 1.7; }
  .hb-step-bar { height: 3px; background: rgba(255,255,255,.08); margin-top: 16px; }
  .hb-step-bar-fill { height: 3px; background: var(--acc); width: 100%; }

  /* ── SCREENS SECTION ── */
  .hb-screens {
    background: var(--dark); padding: 72px 40px;
    border-bottom: 3px solid var(--ink);
  }
  .hb-screens-header { margin-bottom: 40px; }
  .hb-screens-label {
    font-family: var(--mono); font-size: 10px; letter-spacing: .2em;
    text-transform: uppercase; color: rgba(239,235,225,.4); margin-bottom: 16px;
    display: flex; align-items: center; gap: 10px;
  }
  .hb-screens-label::before { content:''; display:inline-block; width:20px; height:2px; background: rgba(239,235,225,.4); }
  .hb-screens-h2 {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(32px, 4vw, 52px); line-height: 1;
    color: var(--paper); margin: 0;
  }

  /* ── VERTICAL CAROUSEL ── */
  .hb-vc-wrap {
    overflow: hidden; position: relative; height: 680px;
    background: #0a0e15; border: 3px solid rgba(255,255,255,.08);
  }
  .hb-vc-track {
    display: flex; flex-direction: column;
    transition: transform .6s cubic-bezier(.23,1,.32,1);
    will-change: transform;
  }
  .hb-vc-slide {
    flex-shrink: 0; height: 680px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 40px 100px 40px 48px; gap: 20px;
  }
  .hb-vc-img-wrap {
    flex: 1; display: flex; align-items: center; justify-content: center;
    width: 100%; max-width: 320px;
  }
  .hb-vc-img {
    max-height: 500px; max-width: 100%; width: auto; height: auto;
    object-fit: contain; object-position: top;
    border: 3px solid rgba(255,255,255,.08);
  }
  .hb-vc-lbl {
    font-family: var(--mono); font-size: 9px; letter-spacing: .2em;
    text-transform: uppercase; color: var(--acc); margin-bottom: 8px;
  }
  .hb-vc-cap { font-size: 13px; line-height: 1.8; color: rgba(239,235,225,.65); max-width: 420px; text-align: center; }
  .hb-vc-counter {
    position: absolute; top: 20px; left: 40px;
    font-family: var(--mono); font-size: 10px; letter-spacing: .15em;
    color: rgba(239,235,225,.5);
  }
  .hb-vc-nav {
    position: absolute; right: 28px; top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 12px;
  }
  .hb-vbtn {
    width: 40px; height: 40px;
    border: 2px solid var(--acc); color: var(--acc);
    background: transparent; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; transition: background .2s, color .2s;
  }
  .hb-vbtn:hover { background: var(--acc); color: var(--paper); }
  .hb-vbtn:disabled { opacity: .2; cursor: not-allowed; }
  .hb-vdot {
    border: none; cursor: pointer; padding: 0;
    background: rgba(255,255,255,.2); width: 6px; height: 6px;
    transition: all .3s; display: block;
  }
  .hb-vdot.active { background: var(--acc); height: 20px; }

  /* ── UI KIT ── */
  .hb-uikit { background: var(--dark); border-bottom: 3px solid var(--ink); }
  .hb-uikit-intro {
    padding: 72px 40px 56px;
    border-bottom: 3px solid rgba(255,255,255,.08);
  }
  .hb-uikit-label {
    font-family: var(--mono); font-size: 10px; letter-spacing: .2em;
    text-transform: uppercase; color: rgba(239,235,225,.35);
    display: flex; align-items: center; gap: 10px;
  }
  .hb-uikit-label::before { content:''; width:20px; height:2px; background: rgba(239,235,225,.35); }
  .hb-uikit-h2 {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(32px,4vw,52px); line-height:1; color:var(--paper); margin:0 0 16px;
  }
  .hb-uikit-body { font-size:16px; line-height:1.75; color:rgba(239,235,225,.55); max-width:600px; }
  .hb-uikit-row {
    display: grid; grid-template-columns: 300px 1fr;
    border-top: 3px solid rgba(255,255,255,.08);
  }
  .hb-uikit-row-label {
    padding: 48px 40px; border-right: 3px solid rgba(255,255,255,.08);
  }
  .hb-uikit-big {
    font-family: var(--display); font-weight: 800;
    font-size: 72px; color: rgba(255,255,255,.05); line-height:1; display:block; margin-bottom:4px;
  }
  .hb-uikit-row-title { font-family:var(--display); font-weight:700; font-size:28px; color:var(--paper); margin-bottom:12px; }
  .hb-uikit-row-desc { font-size:13px; line-height:1.8; color:rgba(239,235,225,.6); }
  .hb-uikit-row-content { padding: 48px 40px; }
  .hb-uikit-img {
    width:100%; border:3px solid rgba(255,255,255,.08); display:block; margin-bottom:12px;
  }
  .hb-uikit-cap { font-size:13px; color:rgba(239,235,225,.5); line-height:1.6; }

  /* ── INSIGHTS ── */
  .hb-insights { display:grid; grid-template-columns:repeat(3,1fr); border-top: 3px solid var(--ink); }
  .hb-insight {
    padding: 48px 40px; border-right: 3px solid var(--ink);
  }
  .hb-insight:last-child { border-right:none; }
  .hb-insight-icon { font-size:28px; margin-bottom:16px; display:block; }
  .hb-insight-title { font-family:var(--display); font-weight:800; font-size:24px; margin-bottom:10px; }
  .hb-insight-text { font-size:14px; line-height:1.8; color:#4a4845; }

  /* ── RESULTS ── */
  .hb-results { display:grid; grid-template-columns:repeat(3,1fr); border-top: 3px solid var(--ink); }
  .hb-result {
    padding: 48px 40px; border-right: 3px solid var(--ink);
  }
  .hb-result:last-child { border-right:none; }
  .hb-result-num {
    font-family:var(--display); font-weight:800;
    font-size:80px; line-height:1; color:var(--ink); display:block;
  }
  .hb-result-num span { color:var(--acc); }
  .hb-result-label {
    font-family:var(--mono); font-size:10px; letter-spacing:.15em;
    text-transform:uppercase; color:#7a7770; margin-top:12px;
  }
  .hb-result-desc { font-size:14px; color:#4a4845; margin-top:10px; line-height:1.8; }

  /* ── LEARNINGS ── */
  .hb-learnings { padding: 72px 40px; border-bottom: 3px solid var(--ink); }
  .hb-learn-item {
    display:grid; grid-template-columns:80px 1fr; gap:32px;
    padding:32px 0; border-bottom: 3px solid var(--ink); align-items:start;
  }
  .hb-learn-item:last-child { border-bottom:none; }
  .hb-learn-num { font-family:var(--display); font-weight:800; font-size:52px; line-height:1; color:#d8d4cc; }
  .hb-learn-title { font-family:var(--display); font-weight:800; font-size:26px; margin-bottom:10px; }
  .hb-learn-text { font-size:15px; line-height:1.8; color:#4a4845; max-width:600px; }

  /* ── NEXT PROJECT ── */
  .hb-next {
    background: var(--dark); padding: 80px 40px;
    display:flex; justify-content:space-between; align-items:center;
    border-top: 3px solid var(--ink);
  }
  .hb-next-label {
    font-family:var(--mono); font-size:10px; letter-spacing:.2em;
    text-transform:uppercase; color:rgba(239,235,225,.45); display:block; margin-bottom:12px;
  }
  .hb-next-title {
    font-family:var(--display); font-weight:800;
    font-size:clamp(48px,7vw,96px); line-height:1;
    color:var(--paper); text-decoration:none;
    transition:color .2s;
  }
  .hb-next-title:hover { color:var(--acc); }

  /* ── FOOTER ── */
  .hb-footer {
    padding: 20px 40px; display:flex; justify-content:space-between; align-items:center;
    border-top: 3px solid rgba(255,255,255,.1); background:var(--dark);
  }
  .hb-footer span { font-family:var(--mono); font-size:10px; letter-spacing:.1em; color:rgba(239,235,225,.45); }

  /* ── TRANSITIONS STAGGER ── */
  .hb-step:nth-child(2)  { transition-delay:.1s; }
  .hb-step:nth-child(3)  { transition-delay:.2s; }
  .hb-step:nth-child(4)  { transition-delay:.3s; }
  .hb-infocell:nth-child(2) { transition-delay:.1s; }
  .hb-infocell:nth-child(3) { transition-delay:.2s; }
  .hb-insight:nth-child(2)  { transition-delay:.1s; }
  .hb-insight:nth-child(3)  { transition-delay:.2s; }
  .hb-result:nth-child(2)   { transition-delay:.1s; }
  .hb-result:nth-child(3)   { transition-delay:.2s; }
  .hb-learn-item:nth-child(2) { transition-delay:.1s; }
  .hb-learn-item:nth-child(3) { transition-delay:.2s; }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .hb-nav { padding: 14px 20px; }
    .hb-hero { grid-template-columns:1fr; padding:60px 20px 48px; min-height:auto; gap:40px; }
    .hb-hero-h1 { font-size: clamp(56px,18vw,100px); }
    .hb-phones { height:300px; }
    .hb-phone-1 { width:110px; height:220px; transform:translateX(-62px) rotate(-12deg) translateY(14px); }
    .hb-phone-2 { width:125px; height:255px; }
    .hb-phone-3 { width:110px; height:220px; transform:translateX(62px) rotate(12deg) translateY(14px); }
    .hb-infobar { flex-direction:column; }
    .hb-infocell { border-right:none; border-bottom:3px solid var(--ink); padding:24px 20px; }
    .hb-section-header { grid-template-columns:1fr; padding:48px 20px; gap:20px; }
    .hb-section-label { position:relative; top:0; }
    .hb-process-grid { grid-template-columns:1fr; }
    .hb-step:nth-child(even) { border-right:none; }
    .hb-step-last { grid-template-columns:1fr; }
    .hb-screens { padding:48px 20px; }
    .hb-vc-wrap, .hb-vc-slide { height:500px; }
    .hb-vc-slide { padding:24px 72px 24px 20px; }
    .hb-uikit-intro { grid-template-columns:1fr; padding:48px 20px; gap:20px; }
    .hb-uikit-row { grid-template-columns:1fr; }
    .hb-uikit-row-label { padding:32px 20px; border-right:none; border-bottom:3px solid rgba(255,255,255,.08); }
    .hb-uikit-row-content { padding:32px 20px; }
    .hb-insights { grid-template-columns:1fr; }
    .hb-insight { border-right:none; border-bottom:3px solid var(--ink); padding:36px 20px; }
    .hb-results { grid-template-columns:1fr; }
    .hb-result { border-right:none; border-bottom:3px solid var(--ink); padding:36px 20px; }
    .hb-learnings { padding:48px 20px; }
    .hb-next { padding:60px 20px; }
    .hb-footer { padding:16px 20px; }
  }
`;

// ─── Images ───────────────────────────────────────────────────────────────────
const IMG = {
  colors:     '/Images/Habita/Colors.png',
  typography: '/Images/Habita/Typography.png',
  buttons:    '/Images/Habita/Buttons.jpg',
};

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  es: {
    nav: { back: 'Volver' },
    hero: {
      tag2: 'Proyecto Insignia', tag3: 'App Móvil',
      subtitle: 'Una app que centraliza el control total de tu hogar inteligente — sin malabarismos entre múltiples aplicaciones.',
      tags: ['Figma','Maze','Claude AI','ChatGPT','UI Kit','User Testing'],
    },
    overview: [
      { label: 'Tipo',         value: 'App Móvil' },
      { label: 'Rol',          value: 'End-to-End Designer' },
      { label: 'Herramientas', value: 'Figma + Maze' },
    ],
    problem: {
      label: 'Contexto', heading: 'El problema',
      p1: 'Los usuarios de smart home se ven obligados a manejar múltiples aplicaciones para controlar distintos dispositivos — luces, temperatura, cámaras, audio. Esto fragmenta la experiencia y genera fricción en tareas cotidianas que deberían ser instantáneas.',
      p2: 'Habita propone un punto de control único: toda la casa, desde una sola interfaz elegante, organizada por entornos (Sala, Dormitorio, Cocina) con acceso rápido a los dispositivos más usados.',
    },
    process: {
      label: 'Proceso', heading: 'De la idea al producto',
      intro: 'Proyecto final del bootcamp — aplicación de todos los módulos aprendidos en un flujo de diseño completo.',
      steps: [
        { num: '01', name: 'Research',     desc: 'Definición del usuario objetivo, sus necesidades y contexto de uso del hogar inteligente.' },
        { num: '02', name: 'Arquitectura', desc: 'Flujos de usuario y estructura de información: navegación por entornos y acceso rápido.' },
        { num: '03', name: 'UI Kit',        desc: 'Sistema de componentes completo: colores, tipografía, botones, toggles, cards y estados.' },
        { num: '04', name: 'Prototipo',     desc: 'App navegable con todas las pantallas e interacciones definidas para pruebas de usuario.' },
      ],
      step5: { name: 'User Testing', desc: 'Prueba moderada con 5 usuarios reales en Maze — métricas de tiempo en tarea, fricción de navegación y síntesis de hallazgos accionables.' },
      resultLabel: 'Resultado principal', resultStat: '5/5',
      resultDesc: 'Usuarios completaron todas las tareas sin errores de navegación entre entornos.',
    },
    screens: {
      label: 'Pantallas', heading: 'La app en detalle',
      items: [
        { src:'/Images/Habita/Home%20Habita.png',            label:'Home — Dashboard',      caption:'Saludo personalizado, entornos con conteo de dispositivos activos y acceso rápido a funciones frecuentes.' },
        { src:'/Images/Habita/Sala%20Habita.jpg',            label:'Sala — Entorno',        caption:'Luces principales, A/C a 22°, TV, sistema de audio y cámara de seguridad. Slider de brillo al 75%.' },
        { src:'/Images/Habita/Dormitorio%20Habita.jpg',      label:'Dormitorio — Entorno',  caption:'Climatizador a 20°, luces de techo activas, televisor y altavoz inteligente con control individual.' },
        { src:'/Images/Habita/Cocina%20Habita.jpg',          label:'Cocina — Entorno',      caption:'Luces LED encendidas y cámara de seguridad activa. Brillo ajustado al 75% desde el slider.' },
        { src:'/Images/Habita/Configuracion%20Habita.png',   label:'Configuración',         caption:'Panel de ajustes: nombre, mi casa, miembros del hogar, ubicación, notificaciones, estadísticas e idioma.' },
        { src:'/Images/Habita/Perfil%20Habita.png',          label:'Perfil & Actividad',    caption:'Historial de acciones del día: luces encendidas, A/C apagado, cerradura inteligente, consumo energético.' },
      ],
    },
    uikit: {
      label: 'Sistema de Diseño', heading: 'UI Kit de Habita',
      intro: 'Antes de diseñar una sola pantalla, se construyó el sistema completo. Cada decisión — desde el color hasta el radio de los toggles — responde a una necesidad funcional de la app.',
      color:      { num:'01', title:'Color',       desc:'Paleta completa para una app de lujo. La escala primaria en dorados define la identidad — elegancia técnica con calidez doméstica.', caption:'Escala completa: primarios, feedback (error, warning, info, success) y neutrales.' },
      typo:       { num:'02', title:'Tipografía',  desc:'Sistema de dos familias: display para jerarquía de navegación y sans para contenido informativo. Mono para datos técnicos.', caption:'Bebas Neue para displays · Inter para headings · Open Sans para body y captions.' },
      components: { num:'03', title:'Componentes', desc:'Cada pieza resuelve una necesidad específica. 3 tipos de botón, toggles con estados semánticos, chips, slider de brillo y nav bar.', caption:'Botones primary/secondary/tertiary con todos los estados: default, hover, pressed, disabled.' },
    },
    testing: {
      label: 'User Testing', heading: 'Pruebas con 5 usuarios',
      intro: 'Prueba moderada en Maze: tareas de navegación específicas mientras se medía tiempo en tarea y errores de navegación.',
      insights: [
        { icon:'⚡', title:'Acceso rápido',          text:'Los usuarios valoraron los iconos de acceso rápido en el home para llegar a sus dispositivos más usados sin navegar por entornos.' },
        { icon:'◎', title:'Claridad de estados',     text:'Los toggles activo/inactivo con color amarillo resultaron intuitivos. Los usuarios identificaban el estado en menos de 2 segundos.' },
        { icon:'→', title:'Navegación por entornos', text:'La organización por habitación coincidía con el modelo mental de los usuarios. Cero errores en la navegación entre entornos.' },
      ],
    },
    results: {
      label: 'Resultados', heading: 'Métricas clave',
      items: [
        { num:'5', numSpan:'/5',  label:'Usuarios completaron todas las tareas', desc:'Tasa de éxito del 100% en las tareas de navegación principales.' },
        { num:'<', numSpan:'2s',  label:'Para identificar estado de dispositivo', desc:'Los toggles con acento amarillo permitieron lectura instantánea del estado activo/inactivo.' },
        { num:'0', numSpan:'',    label:'Errores de navegación entre entornos',   desc:'La arquitectura de información por habitación coincidió con el modelo mental de todos los usuarios.' },
      ],
    },
    learnings: {
      label: 'Aprendizajes', heading: 'Lo que aprendí',
      items: [
        { num:'01', title:'El branding no es decoración',              text:'Definir la paleta, tipografía y voz de Habita antes de diseñar pantallas hizo que cada decisión de UI tuviera una razón.' },
        { num:'02', title:'El design system ahorra tiempo de verdad',  text:'Construir el UI Kit antes de las pantallas finales permitió iterar rápidamente. Cambiar el radio de las cards se propagaba automáticamente por toda la app.' },
        { num:'03', title:'La IA como copiloto, no como piloto',        text:'Usar Claude y ChatGPT para explorar variantes de copy, revisar contraste y generar ideas aceleró el proceso sin reemplazar el criterio de diseño.' },
      ],
    },
    next: { label: 'Siguiente proyecto', title: 'Substrack →' },
    footer: { copy1: 'Juan José Bernal Núñez — UX/UI Designer', copy2: 'Habita' },
  },

  en: {
    nav: { back: 'Back' },
    hero: {
      tag2: 'Flagship Project', tag3: 'Mobile App',
      subtitle: 'An app that centralizes full control of your smart home — no more juggling between multiple applications.',
      tags: ['Figma','Maze','Claude AI','ChatGPT','UI Kit','User Testing'],
    },
    overview: [
      { label: 'Type',    value: 'Mobile App' },
      { label: 'Role',    value: 'End-to-End Designer' },
      { label: 'Tools',   value: 'Figma + Maze' },
    ],
    problem: {
      label: 'Context', heading: 'The problem',
      p1: 'Smart home users are forced to juggle multiple apps to control different devices — lights, temperature, cameras, audio. This fragments the experience and creates friction in everyday tasks that should be instant.',
      p2: 'Habita proposes a single control point: the entire home from a single elegant interface, organized by environments (Living Room, Bedroom, Kitchen) with quick access to most-used devices.',
    },
    process: {
      label: 'Process', heading: 'From idea to product',
      intro: 'Final bootcamp project — applying all learned modules in a complete design flow.',
      steps: [
        { num:'01', name:'Research',                  desc:'Target user definition, needs, and smart home usage context.' },
        { num:'02', name:'Information Architecture',  desc:'User flows and information structure: environment navigation and quick access.' },
        { num:'03', name:'UI Kit',                    desc:'Full component system: colors, typography, buttons, toggles, cards and states.' },
        { num:'04', name:'Prototype',                 desc:'Navigable app with all screens and interactions defined for user testing.' },
      ],
      step5: { name:'User Testing', desc:'Moderated test with 5 real users in Maze — task time metrics, navigation friction and actionable findings synthesis.' },
      resultLabel:'Main result', resultStat:'5/5',
      resultDesc:'Users completed all tasks with no navigation errors between environments.',
    },
    screens: {
      label: 'Screens', heading: 'The app in detail',
      items: [
        { src:'/Images/Habita/Home%20Habita.png',          label:'Home — Dashboard',   caption:'Personalized greeting, environments with active device count, quick access to frequent functions.' },
        { src:'/Images/Habita/Sala%20Habita.jpg',          label:'Living Room',         caption:'Main lights, A/C at 22°, TV, audio system and security camera. Brightness slider at 75%.' },
        { src:'/Images/Habita/Dormitorio%20Habita.jpg',    label:'Bedroom',             caption:'Climate control at 20°, active ceiling lights, TV and smart speaker with individual control.' },
        { src:'/Images/Habita/Cocina%20Habita.jpg',        label:'Kitchen',             caption:'LED lights on and active security camera. Brightness adjusted to 75% from the slider.' },
        { src:'/Images/Habita/Configuracion%20Habita.png', label:'Settings',            caption:'Settings panel: name, my home, household members, location, notifications, stats and language.' },
        { src:'/Images/Habita/Perfil%20Habita.png',        label:'Profile & Activity',  caption:"Day's action log: lights on, A/C off, smart lock activity, energy consumption." },
      ],
    },
    uikit: {
      label: 'Design System', heading: 'Habita UI Kit',
      intro: 'Before designing a single screen, the full system was built. Every decision — from color to toggle radius — responds to a functional need of the app.',
      color:      { num:'01', title:'Color',      desc:'Complete design system palette for a luxury app. The golden primary scale defines the identity — technical elegance with domestic warmth.', caption:'Full scale: primary, feedback (error, warning, info, success) and neutral.' },
      typo:       { num:'02', title:'Typography', desc:'Two-family system: display for navigation hierarchy, sans for informational content. Mono reserved for technical data.', caption:'Bebas Neue for displays · Inter for headings · Open Sans for body and captions.' },
      components: { num:'03', title:'Components', desc:'Each piece solves a specific user need. 3 button types, semantic state toggles, chips, brightness slider and nav bar.', caption:'Primary/secondary/tertiary buttons with all states: default, hover, pressed, disabled.' },
    },
    testing: {
      label: 'User Testing', heading: 'Tests with 5 users',
      intro: 'Moderated test on Maze: specific navigation tasks while measuring task time and navigation errors.',
      insights: [
        { icon:'⚡', title:'Quick access',           text:'Users valued quick-access icons on home to reach their most-used devices without navigating through environments.' },
        { icon:'◎', title:'State clarity',           text:'Active/inactive toggles with yellow color proved intuitive. Users identified device state in under 2 seconds.' },
        { icon:'→', title:'Environment navigation',  text:"Room-based organization matched users' mental model. Zero errors navigating between environments." },
      ],
    },
    results: {
      label: 'Results', heading: 'Key metrics',
      items: [
        { num:'5', numSpan:'/5',  label:'Users completed all tasks',             desc:'100% success rate on main navigation tasks defined in the test.' },
        { num:'<', numSpan:'2s',  label:'To identify device state',              desc:'Yellow accent toggles allowed instant active/inactive state reading.' },
        { num:'0', numSpan:'',    label:'Navigation errors between environments', desc:"Room-based information architecture matched every user's mental model." },
      ],
    },
    learnings: {
      label: 'Learnings', heading: 'What I learned',
      items: [
        { num:'01', title:'Branding is not decoration',        text:"Defining Habita's palette, typography and voice before designing screens meant every UI decision had a reason." },
        { num:'02', title:'Design systems really save time',    text:'Building the UI Kit before final screens allowed rapid iteration. Changing card radius propagated automatically throughout the app.' },
        { num:'03', title:'AI as co-pilot, not pilot',          text:'Using Claude and ChatGPT to explore copy variants, review contrast and generate ideas accelerated the process without replacing design judgment.' },
      ],
    },
    next: { label: 'Next project', title: 'Substrack →' },
    footer: { copy1: 'Juan José Bernal Núñez — UX/UI Designer', copy2: 'Habita' },
  },
} as const;

type Lang = keyof typeof T;

// ─── Vertical Carousel ────────────────────────────────────────────────────────
const SLIDE_H = 680;

function VerticalCarousel({ items }: { items: { src: string; label: string; caption: string }[] }) {
  const [current, setCurrent] = useState(0);
  const total = items.length;
  return (
    <div className="hb-vc-wrap">
      <span className="hb-vc-counter">
        {String(current + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}
      </span>
      <div className="hb-vc-track" style={{ transform: `translateY(-${current * SLIDE_H}px)` }}>
        {items.map((item, i) => (
          <div key={i} className="hb-vc-slide">
            <div className="hb-vc-img-wrap">
              <img src={item.src} alt={item.label} className="hb-vc-img" />
            </div>
            <div style={{ textAlign:'center' }}>
              <div className="hb-vc-lbl">{item.label}</div>
              <div className="hb-vc-cap">{item.caption}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="hb-vc-nav">
        <button className="hb-vbtn" onClick={() => setCurrent(c => Math.max(0, c-1))} disabled={current===0} aria-label="Previous">↑</button>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {items.map((_,i) => (
            <button key={i} className={`hb-vdot${i===current?' active':''}`} onClick={() => setCurrent(i)} aria-label={`Slide ${i+1}`} />
          ))}
        </div>
        <button className="hb-vbtn" onClick={() => setCurrent(c => Math.min(total-1, c+1))} disabled={current===total-1} aria-label="Next">↓</button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HabitaCaseStudy() {
  const { lang, setLang } = useLanguage();
  const t = T[lang as Lang];

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }),
      { threshold: 0 },
    );
    document.querySelectorAll('.hb-infocell, .hb-step, .hb-learn-item').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="hb">

        {/* ── NAV ── */}
        <nav className="hb-nav">
          <Link href="/#projects" className="hb-back">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.nav.back}
          </Link>
          <div className="hb-nav-right">
            <img src="/Images/LogoJJB/Logo%20JJB%20negro.png" alt="JJB" className="hb-nav-logo" />
            <div className="hb-lang">
              <button className={`hb-lang-btn${lang==='es'?' active':''}`} onClick={() => setLang('es')}>ES</button>
              <button className={`hb-lang-btn${lang==='en'?' active':''}`} onClick={() => setLang('en')}>EN</button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="hb-hero">
          <div>
            <div className="hb-hero-eyebrow">
              <span className="hb-hero-tag flagship">{t.hero.tag2}</span>
              <span className="hb-hero-tag">{t.hero.tag3}</span>
            </div>
            <h1 className="hb-hero-h1">Habita<span>Smart Home</span></h1>
            <p className="hb-hero-sub">{t.hero.subtitle}</p>
            <div className="hb-chips">
              {t.hero.tags.map(tag => <span key={tag} className="hb-chip">{tag}</span>)}
            </div>
          </div>
          <div className="hb-phones">
            <div className="hb-phone hb-phone-1"><img src="/Images/Habita/Cocina%20Habita.jpg" alt="Cocina" /></div>
            <div className="hb-phone hb-phone-2"><img src="/Images/Habita/Home%20Habita.png"   alt="Home" /></div>
            <div className="hb-phone hb-phone-3"><img src="/Images/Habita/Sala%20Habita.jpg"   alt="Sala" /></div>
          </div>
        </section>

        {/* ── INFO BAR ── */}
        <div className="hb-infobar">
          {t.overview.map((cell, i) => (
            <div key={cell.label} className="hb-infocell" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="hb-infocell-label">{cell.label}</div>
              <div className="hb-infocell-value">{cell.value}</div>
            </div>
          ))}
        </div>

        {/* ── PROBLEM ── */}
        <section className="hb-section">
          <div className="hb-section-header">
            <div>
              <h2 className="hb-h2">{t.problem.heading}</h2>
              <p className="hb-body">{t.problem.p1}</p>
              <p className="hb-body">{t.problem.p2}</p>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="hb-section">
          <div className="hb-section-header" style={{ paddingBottom: 40 }}>
            <div>
              <h2 className="hb-h2">{t.process.heading}</h2>
              <p className="hb-body">{t.process.intro}</p>
            </div>
          </div>
          <div className="hb-process-grid">
            {t.process.steps.map(step => (
              <div key={step.num} className="hb-step">
                <div className="hb-step-name">{step.name}</div>
                <div className="hb-step-desc">{step.desc}</div>
              </div>
            ))}
            <div className="hb-step hb-step-last">
              <div>
                <div className="hb-step-name">{t.process.step5.name}</div>
                <div className="hb-step-desc">{t.process.step5.desc}</div>
              </div>
              <div className="hb-step-result">
                <div className="hb-step-result-label">{t.process.resultLabel}</div>
                <span className="hb-step-result-stat">{t.process.resultStat}</span>
                <div className="hb-step-result-desc">{t.process.resultDesc}</div>
                <div className="hb-step-bar"><div className="hb-step-bar-fill" /></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SCREENS ── */}
        <div className="hb-screens">
          <div className="hb-screens-header">
            <h2 className="hb-screens-h2">{t.screens.heading}</h2>
          </div>
          <VerticalCarousel items={[...t.screens.items]} />
        </div>

        {/* ── UI KIT ── */}
        <div className="hb-uikit">
          <div className="hb-uikit-intro">
            <div>
              <h2 className="hb-uikit-h2">{t.uikit.heading}</h2>
              <p className="hb-uikit-body">{t.uikit.intro}</p>
            </div>
          </div>
          {[
            { data: t.uikit.color,      img: IMG.colors },
            { data: t.uikit.typo,       img: IMG.typography },
            { data: t.uikit.components, img: IMG.buttons },
          ].map(row => (
            <div key={row.data.num} className="hb-uikit-row">
              <div className="hb-uikit-row-label">
                <div className="hb-uikit-row-title">{row.data.title}</div>
                <p className="hb-uikit-row-desc">{row.data.desc}</p>
              </div>
              <div className="hb-uikit-row-content">
                <img src={row.img} alt={row.data.title} className="hb-uikit-img" />
                <p className="hb-uikit-cap">{row.data.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── USER TESTING ── */}
        <section className="hb-section">
          <div className="hb-section-header" style={{ paddingBottom: 40 }}>
            <div>
              <h2 className="hb-h2">{t.testing.heading}</h2>
              <p className="hb-body">{t.testing.intro}</p>
            </div>
          </div>
          <div className="hb-insights">
            {t.testing.insights.map(ins => (
              <div key={ins.title} className="hb-insight">
                <span className="hb-insight-icon">{ins.icon}</span>
                <div className="hb-insight-title">{ins.title}</div>
                <p className="hb-insight-text">{ins.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section className="hb-section">
          <div className="hb-section-header" style={{ paddingBottom: 0 }}>
            <div><h2 className="hb-h2">{t.results.heading}</h2></div>
          </div>
          <div className="hb-results">
            {t.results.items.map(r => (
              <div key={r.label} className="hb-result">
                <span className="hb-result-num">{r.num}<span>{r.numSpan}</span></span>
                <div className="hb-result-label">{r.label}</div>
                <div className="hb-result-desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── LEARNINGS ── */}
        <div className="hb-learnings">
          <h2 className="hb-h2">{t.learnings.heading}</h2>
          <div style={{ marginTop: 40 }}>
            {t.learnings.items.map(item => (
              <div key={item.num} className="hb-learn-item">
                <div className="hb-learn-num">{item.num}</div>
                <div>
                  <div className="hb-learn-title">{item.title}</div>
                  <p className="hb-learn-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── NEXT PROJECT ── */}
        <div className="hb-next">
          <div>
            <span className="hb-next-label">{t.next.label}</span>
            <Link href="/projects/substrack" className="hb-next-title">{t.next.title}</Link>
          </div>
        </div>

        <div className="hb-footer">
          <span>{t.footer.copy1}</span>
          <span>{t.footer.copy2}</span>
        </div>

      </div>
    </>
  );
}
