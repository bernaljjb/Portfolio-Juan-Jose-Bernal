'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  :root {
    --bg: #F5F2ED; --ink: #0F0E0C; --ink-muted: #6B6860;
    --accent2: #E8421A; --rule: #D8D4CC; --card-bg: #EDEAE3;
    --habita-dark: #0d1117; --habita-yellow: #F5C518;
    --mono: 'DM Mono', monospace;
    --display: 'Bebas Neue', sans-serif;
    --body: 'DM Sans', sans-serif;
  }
  .habita-page { background: var(--bg); color: var(--ink); font-family: var(--body); font-size: 16px; line-height: 1.5; overflow-x: hidden; min-height: 100vh; }

  /* NAV */
  .habita-page nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 48px;
    background: rgba(245,242,237,0.92); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--rule);
  }
  .nav-back {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--ink-muted); text-decoration: none;
    transition: color 0.2s;
  }
  .nav-back:hover { color: var(--accent2); }
  .nav-back:hover svg { transform: translateX(-4px); }
  .nav-back svg { transition: transform 0.2s; }
  .nav-right { display: flex; align-items: center; gap: 20px; }
  .nav-logo-img { height: 36px; width: auto; display: block; }
  .h-lang-toggle { display: flex; align-items: center; gap: 6px; }
  .h-lang-btn { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; background: none; border: none; padding: 2px 0; transition: color 0.2s; cursor: pointer; }
  .h-lang-btn.active  { color: var(--ink); font-weight: 600; cursor: default; }
  .h-lang-btn.inactive { color: var(--ink-muted); }
  .h-lang-btn.inactive:hover { color: var(--accent2); }
  .h-lang-sep { font-family: var(--mono); font-size: 10px; color: var(--ink-muted); opacity: 0.4; user-select: none; }

  /* HERO */
  .project-hero {
    background: var(--habita-dark); min-height: 100vh;
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; padding: 120px 48px 80px; gap: 80px;
    position: relative; overflow: hidden;
  }
  .project-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 80% 50%, rgba(245,197,24,0.08), transparent 60%); pointer-events: none; }
  .hero-content { position: relative; z-index: 1; }
  .hero-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; opacity: 0; animation: fadeUp 0.8s 0.2s forwards; }
  .hero-num { font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em; color: var(--habita-yellow); }
  .hero-tag { font-family: var(--mono); font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border: 1px solid rgba(245,197,24,0.3); color: rgba(245,197,24,0.7); border-radius: 2px; }
  .hero-tag.flagship { background: var(--habita-yellow); color: var(--habita-dark); border-color: var(--habita-yellow); font-weight: 600; }
  .project-title { font-family: var(--display); font-size: clamp(80px, 12vw, 180px); line-height: 0.9; color: white; letter-spacing: -0.01em; opacity: 0; animation: fadeUp 1s 0.3s forwards; }
  .project-title span { color: var(--habita-yellow); display: block; }
  .hero-tagline { font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.55); max-width: 420px; margin-top: 24px; opacity: 0; animation: fadeUp 0.9s 0.45s forwards; }
  .hero-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 32px; opacity: 0; animation: fadeUp 0.9s 0.55s forwards; }
  .chip { font-family: var(--mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; padding: 5px 12px; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.5); border-radius: 2px; }
  .hero-screens { position: relative; height: 500px; display: flex; align-items: center; justify-content: center; opacity: 0; animation: fadeUp 1.1s 0.5s forwards; }
  .phone { position: absolute; background: #0d1117; border-radius: 28px; border: 2px solid rgba(255,255,255,0.1); overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05); transition: transform 0.5s cubic-bezier(0.23,1,0.32,1); }
  .phone img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
  .phone-1 { width: 160px; height: 320px; left: 50%; transform: translateX(-50%) translateX(-75px) rotate(-13deg) translateY(20px); z-index: 1; }
  .phone-2 { width: 180px; height: 360px; left: 50%; transform: translateX(-50%) translateY(-15px); z-index: 3; }
  .phone-3 { width: 160px; height: 320px; left: 50%; transform: translateX(-50%) translateX(75px) rotate(13deg) translateY(20px); z-index: 1; }
  .phone-4 { display: none; }
  .hero-screens:hover .phone-1 { transform: translateX(-50%) translateX(-100px) rotate(-16deg) translateY(10px); }
  .hero-screens:hover .phone-2 { transform: translateX(-50%) translateY(-32px); }
  .hero-screens:hover .phone-3 { transform: translateX(-50%) translateX(100px) rotate(16deg) translateY(10px); }

  /* INFO BAR */
  .info-bar { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid var(--rule); }
  .info-cell { padding: 32px 48px; border-right: 1px solid var(--rule); opacity: 0; transform: translateY(16px); transition: opacity 0.5s, transform 0.5s; }
  .info-cell.visible { opacity: 1; transform: none; }
  .info-cell:last-child { border-right: none; }
  .info-cell-label { font-family: var(--mono); font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 6px; }
  .info-cell-value { font-family: var(--display); font-size: 22px; letter-spacing: 0.02em; color: var(--ink); }

  /* SECTIONS */
  section { border-bottom: 1px solid var(--rule); }
  .section-intro { padding: 80px 48px; display: grid; grid-template-columns: 1fr 2fr; gap: 80px; align-items: start; }
  .section-label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-muted); position: sticky; top: 100px; display: flex; align-items: center; gap: 10px; }
  .section-label::before { content: ''; display: inline-block; width: 24px; height: 1px; background: var(--ink-muted); }
  .section-headline { font-family: var(--display); font-size: clamp(36px, 4vw, 56px); line-height: 1; letter-spacing: 0.01em; color: var(--ink); margin-bottom: 20px; }
  .section-headline-dark { color: white; }
  .section-text { font-size: 17px; line-height: 1.75; color: var(--ink-muted); max-width: 600px; }
  .section-text + .section-text { margin-top: 16px; }

  /* PROCESS — 8px gap */
  .process-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 40px 48px 48px; background: var(--habita-dark); }
  .process-step { background: #161c27; border-radius: 10px; padding: 28px; border: 1px solid rgba(255,255,255,.06); opacity: 0; transform: translateY(20px); transition: opacity 0.5s, transform 0.5s; position: relative; overflow: hidden; }
  .process-step:hover { border-color: rgba(245,197,24,.2); }
  .process-step.visible { opacity: 1; transform: none; }
  .process-step:last-child { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
  .process-step-num { font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em; color: var(--habita-yellow); background: rgba(245,197,24,.1); padding: 3px 10px; border-radius: 2px; display: inline-block; margin-bottom: 16px; border: 1px solid rgba(245,197,24,.3); }
  .process-step-name { font-family: var(--display); font-size: 28px; letter-spacing: 0.02em; color: white; margin-bottom: 12px; }
  .process-step-desc { font-size: 13px; line-height: 1.65; color: rgba(255,255,255,.45); }
  .process-step-result { background: rgba(245,197,24,.05); border: 1px solid rgba(245,197,24,.2); border-radius: 8px; padding: 20px 24px; }
  .process-step-result-label { font-family: var(--mono); font-size: 9px; letter-spacing: .15em; text-transform: uppercase; color: rgba(255,255,255,.3); margin-bottom: 10px; }
  .process-step-result-stat { font-family: var(--display); font-size: 48px; color: var(--habita-yellow); line-height: 1; display: block; margin-bottom: 4px; }
  .process-step-result-desc { font-size: 12px; color: rgba(255,255,255,.4); line-height: 1.5; }
  .process-bar { height: 3px; background: rgba(255,255,255,.08); border-radius: 2px; margin-top: 14px; }
  .process-bar-fill { height: 3px; background: var(--habita-yellow); border-radius: 2px; width: 100%; }

  /* SCREENS SECTION */
  .screens-section { padding: 80px 48px; background: var(--habita-dark); }
  .screens-header { margin-bottom: 48px; }

  /* VERTICAL CAROUSEL */
  .v-carousel-wrap { overflow: hidden; position: relative; height: 700px; background: #0a0e15; border-radius: 12px; }
  .v-carousel-track { display: flex; flex-direction: column; transition: transform 0.65s cubic-bezier(0.23,1,0.32,1); will-change: transform; }
  .v-carousel-slide { flex-shrink: 0; height: 700px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 100px 40px 48px; gap: 20px; }
  .v-carousel-img-wrap { flex: 1; display: flex; align-items: center; justify-content: center; width: 100%; max-width: 340px; }
  .v-carousel-img { max-height: 520px; max-width: 100%; width: auto; height: auto; object-fit: contain; object-position: top; border-radius: 16px; box-shadow: 0 24px 64px rgba(0,0,0,0.5); }
  .v-carousel-label { font-family: var(--mono); font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: var(--habita-yellow); margin-bottom: 8px; }
  .v-carousel-caption { font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.5); max-width: 440px; text-align: center; }
  .v-carousel-counter { position: absolute; top: 24px; left: 48px; font-family: var(--mono); font-size: 10px; letter-spacing: .15em; color: rgba(255,255,255,.25); }
  .v-carousel-nav { position: absolute; right: 32px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; align-items: center; gap: 14px; }
  .v-btn { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--habita-yellow); color: var(--habita-yellow); background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; transition: background .2s, color .2s; }
  .v-btn:hover { background: var(--habita-yellow); color: var(--habita-dark); }
  .v-btn:disabled { opacity: 0.22; cursor: not-allowed; }
  .v-dot { border: none; cursor: pointer; border-radius: 999px; transition: all .3s; padding: 0; background: rgba(255,255,255,.2); width: 8px; height: 8px; display: block; }
  .v-dot.active { background: var(--habita-yellow); height: 24px; }

  /* UI KIT */
  .uikit-section { background: var(--habita-dark); }
  .s-intro-uikit { padding: 80px 48px 48px; display: grid; grid-template-columns: 200px 1fr; gap: 80px; align-items: start; border-bottom: 1px solid rgba(255,255,255,.06); }
  .uikit-row { display: grid; grid-template-columns: 320px 1fr; border-top: 1px solid rgba(255,255,255,.06); }
  .uikit-row-label { padding: 56px 48px; border-right: 1px solid rgba(255,255,255,.06); }
  .uikit-num { font-family: var(--display); font-size: 64px; color: rgba(255,255,255,.06); line-height: 1; display: block; margin-bottom: 4px; }
  .uikit-row-title { font-family: var(--display); font-size: 32px; color: white; letter-spacing: .02em; margin-bottom: 14px; }
  .uikit-row-desc { font-size: 14px; line-height: 1.7; color: rgba(255,255,255,.4); }
  .uikit-row-content { padding: 56px 48px; }
  .uikit-img { width: 100%; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,.08); display: block; margin-bottom: 12px; }
  .uikit-img-caption { font-size: 13px; color: rgba(255,255,255,.35); line-height: 1.5; margin-top: 12px; }

  /* INSIGHTS */
  .insights-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--rule); }
  .insight-block { padding: 48px; border-right: 1px solid var(--rule); opacity: 0; transform: translateY(16px); transition: opacity 0.5s, transform 0.5s; }
  .insight-block.visible { opacity: 1; transform: none; }
  .insight-block:last-child { border-right: none; }
  .insight-icon { font-size: 28px; margin-bottom: 16px; display: block; }
  .insight-title { font-family: var(--display); font-size: 26px; letter-spacing: 0.02em; color: var(--ink); margin-bottom: 10px; }
  .insight-text { font-size: 14px; line-height: 1.65; color: var(--ink-muted); }

  /* RESULTS */
  .results-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--rule); }
  .result-block { padding: 48px; border-right: 1px solid var(--rule); opacity: 0; transform: translateY(20px); transition: opacity 0.6s, transform 0.6s; }
  .result-block.visible { opacity: 1; transform: none; }
  .result-block:last-child { border-right: none; }
  .result-num { font-family: var(--display); font-size: 72px; line-height: 1; color: var(--ink); display: block; }
  .result-num span { color: var(--habita-yellow); }
  .result-label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-muted); margin-top: 12px; }
  .result-desc { font-size: 14px; color: var(--ink-muted); margin-top: 12px; line-height: 1.5; }

  /* LEARNINGS */
  .learnings-section { padding: 80px 48px; }
  .learnings-list { margin-top: 48px; }
  .learning-item { display: grid; grid-template-columns: 80px 1fr; gap: 32px; padding: 32px 0; border-bottom: 1px solid var(--rule); align-items: start; opacity: 0; transform: translateX(-16px); transition: opacity 0.5s, transform 0.5s; }
  .learning-item.visible { opacity: 1; transform: none; }
  .learning-item:last-child { border-bottom: none; }
  .learning-num { font-family: var(--display); font-size: 48px; line-height: 1; color: var(--rule); }
  .learning-title { font-family: var(--display); font-size: 28px; letter-spacing: 0.02em; color: var(--ink); margin-bottom: 12px; }
  .learning-text { font-size: 15px; line-height: 1.7; color: var(--ink-muted); max-width: 600px; }

  /* NEXT / FOOTER */
  .next-project { padding: 80px 48px; display: flex; justify-content: space-between; align-items: center; background: var(--habita-dark); }
  .next-label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.4); display: block; margin-bottom: 12px; }
  .next-title { font-family: var(--display); font-size: clamp(48px, 6vw, 80px); line-height: 1; color: white; text-decoration: none; display: block; transition: color 0.2s; }
  .next-title:hover { color: var(--habita-yellow); }
  .next-arrow { width: 64px; height: 64px; border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.5); border-radius: 50%; transition: background 0.2s, color 0.2s; text-decoration: none; }
  .next-arrow:hover { background: var(--habita-yellow); color: var(--habita-dark); border-color: var(--habita-yellow); }
  .case-footer { padding: 24px 48px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); background: var(--habita-dark); }
  .case-footer span { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; color: rgba(255,255,255,0.3); }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  .process-step:nth-child(2) { transition-delay: 0.1s; }
  .process-step:nth-child(3) { transition-delay: 0.2s; }
  .process-step:nth-child(4) { transition-delay: 0.3s; }
  .process-step:nth-child(5) { transition-delay: 0.4s; }
  .insight-block:nth-child(2) { transition-delay: 0.1s; }
  .insight-block:nth-child(3) { transition-delay: 0.2s; }
  .result-block:nth-child(2) { transition-delay: 0.1s; }
  .result-block:nth-child(3) { transition-delay: 0.2s; }
  .learning-item:nth-child(2) { transition-delay: 0.1s; }
  .learning-item:nth-child(3) { transition-delay: 0.2s; }
  .info-cell:nth-child(2) { transition-delay: 0.1s; }
  .info-cell:nth-child(3) { transition-delay: 0.2s; }
  .info-cell:nth-child(4) { transition-delay: 0.3s; }
`;

// ─── Screen base path ──────────────────────────────────────────────────────────
const S = '/Images/Habita/Smart%20Home%20Mobile%20App%20Prototype';
const IMG = {
  hero:       '/Images/Habita/Hero%20Iamge.png',
  mockup:     '/Images/Habita/Prorotipo%20home.png',
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
      { label: 'Tipo',          value: 'App Móvil' },
      { label: 'Contexto',      value: 'Bootcamp TripleTen' },
      { label: 'Rol',           value: 'End-to-End Designer' },
      { label: 'Herramientas',  value: 'Figma + Maze' },
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
        { src:'/Images/Habita/Home%20Habita.png',   label:'Home — Dashboard',      caption:'Saludo personalizado, entornos con conteo de dispositivos activos y acceso rápido a funciones frecuentes.' },
        { src:'/Images/Habita/Sala%20Habita.jpg', label:'Sala — Entorno',        caption:'Luces principales, A/C a 22°, TV, sistema de audio y cámara de seguridad. Slider de brillo al 75%.' },
        { src:'/Images/Habita/Dormitorio%20Habita.jpg', label:'Dormitorio — Entorno',  caption:'Climatizador a 20°, luces de techo activas, televisor y altavoz inteligente con control individual.' },
        { src:'/Images/Habita/Cocina%20Habita.jpg', label:'Cocina — Entorno',      caption:'Luces LED encendidas y cámara de seguridad activa. Brillo ajustado al 75% desde el slider.' },
        { src:'/Images/Habita/Configuracion%20Habita.png', label:'Configuración',          caption:'Panel de ajustes: nombre, mi casa, miembros del hogar, ubicación, notificaciones, estadísticas e idioma.' },
        { src:'/Images/Habita/Perfil%20Habita.png', label:'Perfil & Actividad',    caption:'Historial de acciones del día: luces encendidas, A/C apagado, cerradura inteligente, consumo energético.' },
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
      label: 'Aprendizajes', heading: 'Lo que me llevé',
      items: [
        { num:'01', title:'El branding no es decoración',              text:'Definir la paleta, tipografía y voz de Habita antes de diseñar pantallas hizo que cada decisión de UI tuviera una razón.' },
        { num:'02', title:'El design system ahorra tiempo de verdad',  text:'Construir el UI Kit antes de las pantallas finales permitió iterar rápidamente. Cambiar el radio de las cards se propagaba automáticamente por toda la app.' },
        { num:'03', title:'La IA como copiloto, no como piloto',        text:'Usar Claude y ChatGPT para explorar variantes de copy, revisar contraste y generar ideas aceleró el proceso sin reemplazar el criterio de diseño.' },
      ],
    },
    next: { label: 'Siguiente proyecto', title: 'Substrack →' },
    footer: { copy1: 'Juan José Bernal Núñez — UX/UI Designer', copy2: 'Habita · Proyecto 01 / 10' },
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
      { label: 'Context', value: 'TripleTen Bootcamp' },
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
        { src:'/Images/Habita/Home%20Habita.png',   label:'Home — Dashboard',   caption:'Personalized greeting, environments with active device count, quick access to frequent functions.' },
        { src:'/Images/Habita/Sala%20Habita.jpg', label:'Living Room',         caption:'Main lights, A/C at 22°, TV, audio system and security camera. Brightness slider at 75%.' },
        { src:'/Images/Habita/Dormitorio%20Habita.jpg', label:'Bedroom',             caption:'Climate control at 20°, active ceiling lights, TV and smart speaker with individual control.' },
        { src:'/Images/Habita/Cocina%20Habita.jpg', label:'Kitchen',             caption:'LED lights on and active security camera. Brightness adjusted to 75% from the slider.' },
        { src:'/Images/Habita/Configuracion%20Habita.png', label:'Settings',            caption:'Settings panel: name, my home, household members, location, notifications, stats and language.' },
        { src:'/Images/Habita/Perfil%20Habita.png', label:'Profile & Activity',  caption:"Day's action log: lights on, A/C off, smart lock activity, energy consumption." },
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
        { icon:'→', title:'Environment navigation',  text:'Room-based organization matched users\' mental model. Zero errors navigating between environments.' },
      ],
    },
    results: {
      label: 'Results', heading: 'Key metrics',
      items: [
        { num:'5', numSpan:'/5',  label:'Users completed all tasks',             desc:'100% success rate on main navigation tasks defined in the test.' },
        { num:'<', numSpan:'2s',  label:'To identify device state',              desc:'Yellow accent toggles allowed instant active/inactive state reading.' },
        { num:'0', numSpan:'',    label:'Navigation errors between environments', desc:'Room-based information architecture matched every user\'s mental model.' },
      ],
    },
    learnings: {
      label: 'Learnings', heading: 'What I took away',
      items: [
        { num:'01', title:'Branding is not decoration',        text:"Defining Habita's palette, typography and voice before designing screens meant every UI decision had a reason." },
        { num:'02', title:'Design systems really save time',    text:'Building the UI Kit before final screens allowed rapid iteration. Changing card radius propagated automatically throughout the app.' },
        { num:'03', title:'AI as co-pilot, not pilot',          text:'Using Claude and ChatGPT to explore copy variants, review contrast and generate ideas accelerated the process without replacing design judgment.' },
      ],
    },
    next: { label: 'Next project', title: 'Substrack →' },
    footer: { copy1: 'Juan José Bernal Núñez — UX/UI Designer', copy2: 'Habita · Project 01 / 10' },
  },
} as const;

type Lang = keyof typeof T;

// ─── Vertical Carousel ────────────────────────────────────────────────────────
const SLIDE_H = 700;

function VerticalCarousel({ items }: { items: { src: string; label: string; caption: string }[] }) {
  const [current, setCurrent] = useState(0);
  const total = items.length;

  return (
    <div className="v-carousel-wrap">
      <span className="v-carousel-counter">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>

      <div
        className="v-carousel-track"
        style={{ transform: `translateY(-${current * SLIDE_H}px)` }}
      >
        {items.map((item, i) => (
          <div key={i} className="v-carousel-slide">
            <div className="v-carousel-img-wrap">
              <img src={item.src} alt={item.label} className="v-carousel-img" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="v-carousel-label">{item.label}</div>
              <div className="v-carousel-caption">{item.caption}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="v-carousel-nav">
        <button
          className="v-btn"
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          aria-label="Previous"
        >↑</button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((_, i) => (
            <button
              key={i}
              className={`v-dot${i === current ? ' active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="v-btn"
          onClick={() => setCurrent(c => Math.min(total - 1, c + 1))}
          disabled={current === total - 1}
          aria-label="Next"
        >↓</button>
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
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 },
    );
    document.querySelectorAll('.info-cell, .process-step, .insight-block, .result-block, .learning-item').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="habita-page">

        {/* ── NAV ── */}
        <nav>
          <Link href="/#projects" className="nav-back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.nav.back}
          </Link>
          <div className="nav-right">
            <img src="/Images/LogoJJB/Logo%20JJB%20negro.png" alt="JJB" className="nav-logo-img" />
            <div className="h-lang-toggle">
              <button className={`h-lang-btn ${lang === 'es' ? 'active' : 'inactive'}`} onClick={() => setLang('es')}>ES</button>
              <span className="h-lang-sep">·</span>
              <button className={`h-lang-btn ${lang === 'en' ? 'active' : 'inactive'}`} onClick={() => setLang('en')}>EN</button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="project-hero">
          <div className="hero-content">
            <div className="hero-meta">
              <span className="hero-num">01</span>
              <span className="hero-tag flagship">{t.hero.tag2}</span>
              <span className="hero-tag">{t.hero.tag3}</span>
            </div>
            <h1 className="project-title">Habita<span>Smart Home</span></h1>
            <p className="hero-tagline">{t.hero.subtitle}</p>
            <div className="hero-chips">
              {t.hero.tags.map(tag => <span key={tag} className="chip">{tag}</span>)}
            </div>
          </div>
          <div className="hero-screens">
            <div className="phone phone-1"><img src={'/Images/Habita/Cocina%20Habita.jpg'} alt="Cocina" /></div>
            <div className="phone phone-2"><img src={'/Images/Habita/Home%20Habita.png'}   alt="Home" /></div>
            <div className="phone phone-3"><img src={'/Images/Habita/Sala%20Habita.jpg'} alt="Sala" /></div>
            <div className="phone phone-4"><img src={'/Images/Habita/Dormitorio%20Habita.jpg'} alt="Config" /></div>
          </div>
        </section>

        {/* ── INFO BAR ── */}
        <div className="info-bar">
          {t.overview.map(cell => (
            <div key={cell.label} className="info-cell">
              <div className="info-cell-label">{cell.label}</div>
              <div className="info-cell-value">{cell.value}</div>
            </div>
          ))}
        </div>

        {/* ── PROBLEM ── */}
        <section>
          <div className="section-intro">
            <div className="section-label">{t.problem.label}</div>
            <div>
              <h2 className="section-headline">{t.problem.heading}</h2>
              <p className="section-text">{t.problem.p1}</p>
              <p className="section-text">{t.problem.p2}</p>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section>
          <div className="section-intro" style={{ paddingBottom: 40 }}>
            <div className="section-label">{t.process.label}</div>
            <div>
              <h2 className="section-headline">{t.process.heading}</h2>
              <p className="section-text">{t.process.intro}</p>
            </div>
          </div>
          <div className="process-grid">
            {t.process.steps.map(step => (
              <div key={step.num} className="process-step">
                <div className="process-step-num">{step.num}</div>
                <div className="process-step-name">{step.name}</div>
                <div className="process-step-desc">{step.desc}</div>
              </div>
            ))}
            <div className="process-step">
              <div>
                <div className="process-step-num">05</div>
                <div className="process-step-name">{t.process.step5.name}</div>
                <div className="process-step-desc">{t.process.step5.desc}</div>
              </div>
              <div className="process-step-result">
                <div className="process-step-result-label">{t.process.resultLabel}</div>
                <span className="process-step-result-stat">{t.process.resultStat}</span>
                <div className="process-step-result-desc">{t.process.resultDesc}</div>
                <div className="process-bar"><div className="process-bar-fill" /></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SCREENS — vertical carousel ── */}
        <section className="screens-section">
          <div className="screens-header">
            <div className="section-label" style={{ position: 'static', marginBottom: 16 }}>{t.screens.label}</div>
            <h2 className="section-headline section-headline-dark">{t.screens.heading}</h2>
          </div>
          <VerticalCarousel items={[...t.screens.items]} />
        </section>

        {/* ── UI KIT ── */}
        <section className="uikit-section">
          <div className="s-intro-uikit">
            <div className="section-label" style={{ position: 'static', color: 'rgba(255,255,255,.4)' }}>{t.uikit.label}</div>
            <div>
              <h2 className="section-headline section-headline-dark">{t.uikit.heading}</h2>
              <p className="section-text" style={{ color: 'rgba(255,255,255,.5)', maxWidth: 600 }}>{t.uikit.intro}</p>
            </div>
          </div>

          {/* 01 Color */}
          <div className="uikit-row">
            <div className="uikit-row-label">
              <span className="uikit-num">{t.uikit.color.num}</span>
              <div className="uikit-row-title">{t.uikit.color.title}</div>
              <p className="uikit-row-desc">{t.uikit.color.desc}</p>
            </div>
            <div className="uikit-row-content">
              <img src={IMG.colors} alt="Habita color system" className="uikit-img" />
              <p className="uikit-img-caption">{t.uikit.color.caption}</p>
            </div>
          </div>

          {/* 02 Typography */}
          <div className="uikit-row">
            <div className="uikit-row-label">
              <span className="uikit-num">{t.uikit.typo.num}</span>
              <div className="uikit-row-title">{t.uikit.typo.title}</div>
              <p className="uikit-row-desc">{t.uikit.typo.desc}</p>
            </div>
            <div className="uikit-row-content">
              <img src={IMG.typography} alt="Habita typography system" className="uikit-img" />
              <p className="uikit-img-caption">{t.uikit.typo.caption}</p>
            </div>
          </div>

          {/* 03 Components */}
          <div className="uikit-row">
            <div className="uikit-row-label">
              <span className="uikit-num">{t.uikit.components.num}</span>
              <div className="uikit-row-title">{t.uikit.components.title}</div>
              <p className="uikit-row-desc">{t.uikit.components.desc}</p>
            </div>
            <div className="uikit-row-content">
              <img src={IMG.buttons} alt="Habita components" className="uikit-img" />
              <p className="uikit-img-caption">{t.uikit.components.caption}</p>
            </div>
          </div>
        </section>

        {/* ── USER TESTING ── */}
        <section>
          <div className="section-intro" style={{ paddingBottom: 40 }}>
            <div className="section-label">{t.testing.label}</div>
            <div>
              <h2 className="section-headline">{t.testing.heading}</h2>
              <p className="section-text">{t.testing.intro}</p>
            </div>
          </div>
          <div className="insights-grid">
            {t.testing.insights.map(ins => (
              <div key={ins.title} className="insight-block">
                <span className="insight-icon">{ins.icon}</span>
                <div className="insight-title">{ins.title}</div>
                <p className="insight-text">{ins.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section>
          <div className="section-intro" style={{ paddingBottom: 0 }}>
            <div className="section-label">{t.results.label}</div>
            <div><h2 className="section-headline">{t.results.heading}</h2></div>
          </div>
          <div className="results-grid">
            {t.results.items.map(r => (
              <div key={r.label} className="result-block">
                <span className="result-num">{r.num}<span>{r.numSpan}</span></span>
                <div className="result-label">{r.label}</div>
                <div className="result-desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── LEARNINGS ── */}
        <section className="learnings-section">
          <div className="section-label" style={{ position: 'static', marginBottom: 16 }}>{t.learnings.label}</div>
          <h2 className="section-headline">{t.learnings.heading}</h2>
          <div className="learnings-list">
            {t.learnings.items.map(item => (
              <div key={item.num} className="learning-item">
                <div className="learning-num">{item.num}</div>
                <div>
                  <div className="learning-title">{item.title}</div>
                  <p className="learning-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── NEXT PROJECT ── */}
        <div className="next-project">
          <div>
            <span className="next-label">{t.next.label}</span>
            <Link href="/projects/substrack" className="next-title">{t.next.title}</Link>
          </div>
          <Link href="/projects/substrack" className="next-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="case-footer">
          <span>{t.footer.copy1}</span>
          <span>{t.footer.copy2}</span>
        </div>

      </div>
    </>
  );
}
