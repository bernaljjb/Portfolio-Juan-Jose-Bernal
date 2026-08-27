'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  .st {
    --acc: #1a1f8f;
    --acc-mid: #2d34b0;
    --ink: #0E0E0C;
    --paper: #EFEBE1;
    --dark: #11151D;
    --display: 'Bricolage Grotesque', sans-serif;
    --body: 'Space Grotesk', sans-serif;
    --mono: 'Space Mono', monospace;
    --inter: 'Inter', sans-serif;
    --roboto: 'Roboto', sans-serif;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--body);
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* ── NAV ── */
  .st-nav {
    position: sticky; top: 0; z-index: 60;
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 40px;
    background: var(--paper);
    border-bottom: 3px solid var(--ink);
  }
  .st-back {
    display: flex; align-items: center; gap: 8px;
    font-family: var(--mono); font-size: 11px; letter-spacing: .14em;
    text-transform: uppercase; color: var(--ink); text-decoration: none;
    transition: color .2s;
  }
  .st-back:hover { color: var(--acc); }
  .st-nav-right { display: flex; align-items: center; gap: 16px; }
  .st-nav-logo { height: 28px; width: auto; display: block; }
  .st-lang {
    display: flex; align-items: center;
    border: 2px solid var(--ink);
  }
  .st-lang-btn {
    background: transparent; border: none; cursor: pointer;
    font-family: var(--mono); font-size: 11px; letter-spacing: .08em;
    padding: 5px 9px; color: var(--ink); transition: background .15s, color .15s;
  }
  .st-lang-btn.active { background: var(--ink); color: var(--paper); }

  /* ── HERO ── */
  .st-hero {
    background: var(--dark); color: var(--paper);
    display: grid; grid-template-columns: 1fr 1fr;
    padding: 80px 40px; gap: 60px; align-items: center;
    border-bottom: 3px solid var(--ink);
    min-height: 90vh;
  }
  .st-hero-eyebrow {
    display: flex; align-items: center; gap: 10px; margin-bottom: 28px;
  }
  .st-hero-tag {
    font-family: var(--mono); font-size: 10px; letter-spacing: .14em;
    text-transform: uppercase; padding: 4px 10px;
    border: 2px solid rgba(239,235,225,.25); color: rgba(239,235,225,.7);
  }
  .st-hero-tag.accent { background: var(--acc); color: var(--paper); border-color: var(--acc); }
  .st-hero-h1 {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(72px, 10vw, 140px); line-height: .92;
    letter-spacing: -.02em; color: var(--paper);
    margin: 0 0 28px;
  }
  .st-hero-h1 span { color: var(--acc); display: block; }
  .st-hero-sub {
    font-size: 17px; line-height: 1.75;
    color: rgba(239,235,225,.7); max-width: 440px; margin-bottom: 28px;
  }
  .st-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .st-chip {
    font-family: var(--mono); font-size: 10px; letter-spacing: .1em;
    text-transform: uppercase; padding: 5px 12px;
    border: 2px solid rgba(239,235,225,.2); color: rgba(239,235,225,.65);
  }
  .st-chip.acc { border-color: rgba(26,31,143,.5); color: #8891f8; }

  /* ── PHONE MOCKUP ── */
  .st-phone-wrap {
    width: 240px; background: #fff;
    border: 3px solid rgba(255,255,255,.15);
    overflow: hidden; margin: 0 auto;
  }
  .ph-hdr { background: var(--acc); padding: 20px 16px 16px; text-align: center; }
  .ph-hdr-t { font-family: var(--inter); font-size: 14px; font-weight: 600; color: white; }
  .ph-hdr-s { font-family: var(--roboto); font-size: 11px; color: rgba(255,255,255,.7); margin-top: 2px; }
  .ph-bdy { padding: 16px; background: #fff; display: flex; flex-direction: column; gap: 12px; }
  .ph-sec { display: flex; align-items: center; gap: 8px; }
  .ph-ico { width: 20px; height: 20px; border: 2px solid var(--acc); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .ph-sec-lbl { font-family: var(--roboto); font-size: 11px; color: var(--ink); }
  .ph-drop { border: 1px solid #ddd; padding: 8px 12px; display: flex; justify-content: space-between; align-items: center; }
  .ph-drop span { font-family: var(--roboto); font-size: 10px; color: #aaa; }
  .ph-times { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .ph-time { border: 1px solid #ddd; padding: 8px; text-align: center; font-family: var(--roboto); font-size: 11px; color: var(--ink); }
  .ph-cta { background: #ccc; padding: 10px; text-align: center; font-family: var(--inter); font-size: 11px; font-weight: 600; color: white; }
  .ph-note { font-family: var(--roboto); font-size: 9px; color: #aaa; text-align: center; line-height: 1.4; }

  /* ── INFO BAR ── */
  .st-infobar { display: flex; border-bottom: 3px solid var(--ink); }
  .st-infocell { flex: 1; padding: 32px 40px; border-right: 3px solid var(--ink); }
  .st-infocell:last-child { border-right: none; }
  .st-infocell-label { font-family: var(--mono); font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: #7a7770; margin-bottom: 6px; }
  .st-infocell-value { font-family: var(--display); font-weight: 700; font-size: 20px; color: var(--ink); }

  /* ── SECTION SHARED ── */
  .st-section-wrap { border-bottom: 3px solid var(--ink); }
  .st-h2 {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(32px, 4vw, 52px); line-height: 1; margin: 0 0 20px;
    letter-spacing: -.01em;
  }
  .st-body { font-size: 17px; line-height: 1.75; color: #4a4845; max-width: 640px; }
  .st-body + .st-body { margin-top: 16px; }
  .st-pad { padding: 72px 40px; }
  .st-pad-b { padding: 72px 40px 40px; }

  /* ── PROCESS STEPS ── */
  .st-steps { display: grid; grid-template-columns: repeat(4,1fr); border-top: 3px solid var(--ink); }
  .st-step { padding: 32px 28px; border-right: 3px solid var(--ink); }
  .st-step:last-child { border-right: none; }
  .st-step-name { font-family: var(--display); font-weight: 800; font-size: 20px; margin-bottom: 8px; }
  .st-step-desc { font-size: 13px; line-height: 1.8; color: #4a4845; }

  /* ── ATOMIC GRID ── */
  .st-atomic { display: grid; grid-template-columns: repeat(3,1fr); border-top: 3px solid var(--ink); }
  .st-atomic-block { padding: 40px 32px; border-right: 3px solid var(--ink); }
  .st-atomic-block:last-child { border-right: none; }
  .st-atomic-level { font-family: var(--mono); font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: var(--acc); margin-bottom: 12px; }
  .st-atomic-title { font-family: var(--display); font-weight: 800; font-size: 28px; margin-bottom: 10px; }
  .st-atomic-text { font-size: 14px; line-height: 1.7; color: #4a4845; margin-bottom: 14px; }
  .st-atomic-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .st-atomic-tag { font-family: var(--mono); font-size: 9px; letter-spacing: .08em; padding: 3px 8px; border: 2px solid #d8d4cc; color: #7a7770; }

  /* ── IMAGE ── */
  .st-img { width: 100%; border: 3px solid var(--ink); display: block; }
  .st-img-cap { font-family: var(--mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: #7a7770; margin-top: 12px; }
  .st-img-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-top: 40px; }
  .st-img-block img { width: 100%; border: 3px solid var(--ink); display: block; }
  .st-img-block-cap { font-family: var(--mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: #7a7770; margin-top: 8px; }
  .st-img-block-desc { font-size: 13px; color: #4a4845; margin-top: 4px; line-height: 1.5; }

  /* ── COMPONENTS ── */
  .st-comp-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 3px; margin-top: 40px; }
  .st-comp-block { background: rgba(239,235,225,.5); padding: 32px; border: 3px solid var(--ink); }
  .st-comp-label { font-family: var(--mono); font-size: 9px; letter-spacing: .18em; text-transform: uppercase; color: var(--acc); margin-bottom: 8px; }
  .st-comp-note { font-size: 13px; line-height: 1.8; color: #4a4845; }

  /* ── TIME SLOTS ── */
  .ts-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; margin-top: 14px; }
  .ts { padding: 10px 8px; text-align: center; font-family: var(--inter); font-size: 12px; font-weight: 500; }
  .ts-available   { background: var(--acc); color: white; }
  .ts-unavailable { background: #1a1a1a; color: rgba(255,255,255,.3); border: 1px solid rgba(255,255,255,.1); }
  .ts-selected    { background: var(--acc); color: white; outline: 3px solid rgba(26,31,143,.35); }
  .ts-empty       { background: #f0f0f0; color: #ccc; border: 2px solid #e8e8e8; }
  .ts-lbl { font-family: var(--mono); font-size: 8px; letter-spacing: .1em; text-transform: uppercase; color: #7a7770; text-align: center; margin-top: 4px; }

  /* ── PHONE DETAIL ── */
  .st-phone-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .st-feature-item { display: grid; grid-template-columns: 80px 1fr; gap: 24px; padding: 28px 0; border-bottom: 3px solid var(--ink); align-items: start; }
  .st-feature-item:last-child { border-bottom: none; }
  .st-feature-num { font-family: var(--display); font-weight: 800; font-size: 52px; line-height: 1; color: #d8d4cc; }
  .st-feature-title { font-family: var(--display); font-weight: 800; font-size: 22px; margin-bottom: 6px; }
  .st-feature-desc { font-size: 14px; line-height: 1.8; color: #4a4845; }

  /* ── TYPOGRAPHY TABLE ── */
  .st-typo-table { margin-top: 40px; border: 3px solid var(--ink); overflow: hidden; }
  .st-typo-head { display: grid; grid-template-columns: 70px 90px 130px 100px 80px 1fr; background: var(--dark); padding: 12px 20px; gap: 8px; }
  .st-typo-head span { font-family: var(--mono); font-size: 9px; letter-spacing: .15em; text-transform: uppercase; color: rgba(239,235,225,.6); }
  .st-typo-row { display: grid; grid-template-columns: 70px 90px 130px 100px 80px 1fr; padding: 16px 20px; gap: 8px; border-bottom: 3px solid var(--ink); align-items: center; }
  .st-typo-row:last-child { border-bottom: none; }
  .st-typo-row:nth-child(even) { background: rgba(239,235,225,.5); }
  .stc { font-size: 12px; color: #7a7770; font-family: var(--mono); }

  /* ── DECISIONS ── */
  .st-decisions { display: grid; grid-template-columns: repeat(3,1fr); border-top: 3px solid var(--ink); }
  .st-dec { padding: 48px 40px; border-right: 3px solid var(--ink); }
  .st-dec:last-child { border-right: none; }
  .st-dec-icon { font-size: 24px; display: block; margin-bottom: 14px; }
  .st-dec-title { font-family: var(--display); font-weight: 800; font-size: 24px; margin-bottom: 10px; }
  .st-dec-text { font-size: 14px; line-height: 1.75; color: #4a4845; }

  /* ── RESULTS ── */
  .st-results { display: grid; grid-template-columns: repeat(3,1fr); border-top: 3px solid var(--ink); }
  .st-result { padding: 48px 40px; border-right: 3px solid var(--ink); }
  .st-result:last-child { border-right: none; }
  .st-result-num { font-family: var(--display); font-weight: 800; font-size: 80px; line-height: 1; color: var(--ink); display: block; }
  .st-result-num span { color: var(--acc); }
  .st-result-label { font-family: var(--mono); font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: #7a7770; margin-top: 12px; }
  .st-result-desc { font-size: 14px; color: #4a4845; margin-top: 10px; line-height: 1.8; }

  /* ── LEARNINGS ── */
  .st-learn-item {
    display: grid; grid-template-columns: 80px 1fr; gap: 32px;
    padding: 32px 0; border-bottom: 3px solid var(--ink); align-items: start;
  }
  .st-learn-item:last-child { border-bottom: none; }
  .st-learn-num { font-family: var(--display); font-weight: 800; font-size: 52px; line-height: 1; color: #d8d4cc; }
  .st-learn-title { font-family: var(--display); font-weight: 800; font-size: 26px; margin-bottom: 10px; }
  .st-learn-text { font-size: 15px; line-height: 1.8; color: #4a4845; max-width: 600px; }

  /* ── NEXT ── */
  .st-next { background: var(--dark); padding: 80px 40px; border-top: 3px solid var(--ink); }
  .st-next-label { font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: rgba(239,235,225,.45); display: block; margin-bottom: 12px; }
  .st-next-title { font-family: var(--display); font-weight: 800; font-size: clamp(48px,7vw,96px); line-height: 1; color: var(--paper); text-decoration: none; transition: color .2s; }
  .st-next-title:hover { color: var(--acc); }

  /* ── FOOTER ── */
  .st-footer { padding: 20px 40px; display: flex; justify-content: space-between; border-top: 3px solid rgba(255,255,255,.1); background: var(--dark); }
  .st-footer span { font-family: var(--mono); font-size: 10px; letter-spacing: .1em; color: rgba(239,235,225,.45); }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .st-nav { padding: 14px 20px; }
    .st-hero { grid-template-columns: 1fr; padding: 60px 20px 48px; min-height: auto; gap: 40px; }
    .st-hero-h1 { font-size: clamp(56px,18vw,100px); }
    .st-infobar { flex-direction: column; }
    .st-infocell { border-right: none; border-bottom: 3px solid var(--ink); padding: 24px 20px; }
    .st-pad, .st-pad-b { padding: 48px 20px; }
    .st-steps { grid-template-columns: 1fr 1fr; }
    .st-step:nth-child(2) { border-right: none; }
    .st-atomic { grid-template-columns: 1fr; }
    .st-atomic-block { border-right: none; border-bottom: 3px solid var(--ink); }
    .st-img-grid { grid-template-columns: 1fr; }
    .st-comp-grid { grid-template-columns: 1fr; }
    .st-phone-detail { grid-template-columns: 1fr; }
    .st-typo-table { overflow-x: auto; }
    .st-typo-head, .st-typo-row { min-width: 480px; }
    .st-decisions { grid-template-columns: 1fr; }
    .st-dec { border-right: none; border-bottom: 3px solid var(--ink); padding: 36px 20px; }
    .st-dec:last-child { border-bottom: none; }
    .st-results { grid-template-columns: 1fr; }
    .st-result { border-right: none; border-bottom: 3px solid var(--ink); padding: 36px 20px; }
    .st-result:last-child { border-bottom: none; }
    .st-next { padding: 60px 20px; }
    .st-footer { padding: 16px 20px; flex-direction: column; gap: 4px; }
  }
  @media (max-width: 480px) {
    .st-steps { grid-template-columns: 1fr; }
    .st-step { border-right: none; border-bottom: 3px solid var(--ink); }
    .st-step:last-child { border-bottom: none; }
  }
`;

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  es: {
    nav: { back: 'Volver' },
    hero: {
      tags: ['App Móvil', 'Design System'],
      h1: 'Sistema',
      h1span: 'de Turnos',
      tagline: 'App móvil para pedir turnos en servicios públicos — selección de sede, tipo de trámite y horario disponible en una sola pantalla. Diseñada con Atomic Design desde átomo hasta organismo.',
      chips: ['Figma', 'Inter · Roboto', 'Atomic Design', 'Servicios públicos'],
    },
    phone: {
      title: 'Sistema de turnos',
      sub: 'Servicios públicos',
      officeLabel: 'Selecciona Oficina',
      officePh: 'Selecciona una sede',
      tramiteLabel: 'Tipo de tramite',
      tramitePh: 'Selecciona tramite',
      horariosLabel: 'Horarios disponibles — Hoy',
      btn: 'Completa todos los campos',
      note: 'Recuerda llevar tu DNI y llegar 10 min antes',
    },
    infoBar: [
      { label: 'Tipo',         value: 'App Móvil' },
      { label: 'Rol',          value: 'UX/UI Designer' },
      { label: 'Herramientas', value: 'Figma + Maze' },
    ],
    problem: {
      heading: 'Pedir un turno no debería ser un trámite',
      p1: 'Los sistemas de turno en servicios públicos suelen ser confusos, con interfaces sobrecargadas que obligan al usuario a navegar por múltiples pantallas para agendar una cita. El resultado: frustración, errores y tiempo perdido.',
      p2: 'El objetivo de este proyecto fue diseñar una app móvil que condensara todo el flujo en una sola pantalla clara: seleccionar la sede, el tipo de trámite y el horario disponible — sin fricciones innecesarias. Un sistema construido desde los componentes más pequeños hasta la pantalla completa usando Atomic Design.',
    },
    process: {
      heading: 'De lo más pequeño a lo más grande',
      intro: 'El proyecto aplicó Atomic Design de forma rigurosa — ningún organismo se construyó antes de tener sus átomos y moléculas definidos.',
      steps: [
        { name: 'Átomos',     desc: 'Header azul, iconos de sección, slots de tiempo, dropdown y botón principal — cada elemento definido de forma independiente.' },
        { name: 'Moléculas',  desc: 'Combinación de átomos: sección de selección de sede (icono + label + dropdown), sección de horarios (icono + label + grid de slots).' },
        { name: 'Organismos', desc: 'La pantalla completa como organismo: header + secciones + grid de horarios + botón de confirmación + nota informativa.' },
        { name: 'UI Final',   desc: 'App navegable con estados reales: slots disponibles vs no disponibles, dropdown abierto/cerrado y botón activo/inactivo.' },
      ],
    },
    atomic: {
      heading: 'Tres niveles de complejidad',
      intro: 'Cada nivel agrupa elementos del anterior y añade una capa de contexto funcional — hasta llegar a la pantalla completa.',
      levels: [
        { level: 'Nivel 01', title: 'Átomos', text: 'Los elementos más básicos del sistema — no se pueden descomponer más sin perder su función. Cada átomo tiene un propósito único y no depende de otros componentes.', tags: ['slot-time','icon-location','icon-document','icon-clock','header-blue','btn-confirm','label-section','note-text'] },
        { level: 'Nivel 02', title: 'Moléculas', text: 'Combinaciones de átomos que forman unidades funcionales con sentido propio. Una molécula resuelve una tarea específica del usuario dentro del flujo.', tags: ['sede-selector','tramite-selector','horarios-grid','dropdown-open','time-slot-row'] },
        { level: 'Nivel 03', title: 'Organismos', text: 'La pantalla completa como organismo: una sección autónoma que reúne todas las moléculas en un flujo coherente. El usuario puede completar su tarea de principio a fin.', tags: ['turnos-screen','form-container','confirmation-zone'] },
      ],
      imgCap: 'Átomos · Moléculas · Organismos — documentados en Figma',
    },
    components: {
      heading: 'Cada pieza con su propósito',
      intro: 'Tres componentes clave resuelven las decisiones de interacción más importantes del sistema.',
      imgs: [
        { src: '/Images/Sistema de turnos/Componentes horarios.png', cap: 'Slots de horario', desc: 'Dos estados: azul sólido para horarios disponibles, negro para no disponibles. El color como comunicador de disponibilidad sin necesidad de texto adicional.' },
        { src: '/Images/Sistema de turnos/Filter chip components.png', cap: 'Dropdown de trámite', desc: 'Lista de opciones con nombre y duración estimada. Información útil antes de confirmar.' },
      ],
      slots: {
        label: 'Slots de tiempo — estados',
        note: 'El color comunica disponibilidad al instante — sin texto, sin íconos extra.',
        states: [
          { cls: 'ts-available',   time: '9:00',  label: 'Disponible' },
          { cls: 'ts-unavailable', time: '10:00', label: 'Ocupado' },
          { cls: 'ts-selected',    time: '11:00', label: 'Seleccionado' },
          { cls: 'ts-empty',       time: '—',     label: 'Sin turno' },
        ],
      },
      dropdown: {
        label: 'Dropdown de trámite',
        note: 'Muestra tipo de trámite y duración estimada — el usuario sabe cuánto tiempo necesita antes de elegir horario.',
        ph: 'Selecciona tramite',
        options: [
          { name: 'DNI - Documento Nacional', dur: '(30 min)' },
          { name: 'Pasaporte', dur: '(45 min)' },
          { name: 'Licencia de conducir', dur: '(60 min)' },
          { name: 'Certificados', dur: '(15 min)' },
        ],
      },
      btn: {
        label: 'Botón de confirmación',
        note: 'Estado deshabilitado hasta que el usuario completa los 3 campos. Previene errores sin bloquear la exploración.',
        incompleteLabel: 'Incompleto',
        incompleteBtn: 'Completa todos los campos',
        readyLabel: 'Listo para confirmar',
        readyBtn: 'Confirmar turno',
      },
    },
    typo: {
      heading: 'Dos familias, roles distintos',
      intro: 'Inter para títulos y navegación — geométrica, moderna, alta legibilidad a cualquier tamaño. Roboto para el cuerpo y datos — neutral, diseñada para pantallas.',
      cols: ['Nivel', 'Familia', 'Uso', 'Peso', 'Tamaño', 'Ejemplo en la app'],
    },
    uiFinal: {
      heading: 'Todo el flujo en una pantalla',
      intro: 'La pantalla principal condensa el flujo completo — sin cambios de pantalla innecesarios.',
      imgAlt: 'Pantalla final Sistema de Turnos',
      features: [
        { num: '01', title: 'Header como ancla visual',      desc: 'El azul del header establece la identidad del sistema desde el primer vistazo. "Servicios públicos" como subtítulo contextualiza inmediatamente el propósito de la app.' },
        { num: '02', title: 'Flujo progresivo de 3 pasos',   desc: 'Sede → Trámite → Horario. El orden es lógico: primero ubicación, luego tipo de servicio, finalmente disponibilidad. Cada sección tiene su icono como referencia visual.' },
        { num: '03', title: 'Grid de horarios legible',      desc: '10 slots en grid de 2 columnas — fácil de escanear en mobile. El estado activo/inactivo en color evita texto redundante y acelera la decisión del usuario.' },
        { num: '04', title: 'Nota contextual al final',      desc: '"Recuerda llevar tu DNI" aparece después del botón — información útil en el momento correcto, sin interrumpir el flujo de selección.' },
      ],
    },
    decisions: {
      heading: 'Por qué cada elección',
      items: [
        { icon: '◈', title: 'Una pantalla, flujo completo',         text: 'Condensar sede + trámite + horario en una sola vista elimina la fricción de navegar entre pantallas. El usuario ve todo el contexto disponible antes de confirmar — sin volver atrás.' },
        { icon: '◉', title: 'Color como estado, no como decoración', text: 'El azul de los slots disponibles es el mismo azul del header — el usuario aprende una sola asociación: azul = activo/disponible. Los slots ocupados en negro refuerzan la distinción sin texto adicional.' },
        { icon: '▦', title: 'Duración en el dropdown',              text: 'Mostrar cuánto dura cada trámite (30 min, 45 min, 60 min) en el selector permite al usuario tomar una decisión informada antes de elegir el horario — no después.' },
      ],
    },
    results: {
      heading: 'Lo que se entregó',
      items: [
        { num: '3', span: ' niveles', label: 'Atomic Design completo',             desc: 'Átomos, moléculas y organismos documentados en Figma antes de construir la pantalla final.' },
        { num: '1', span: ' pantalla', label: 'Flujo completo sin cambios de pantalla', desc: 'Sede + trámite + horario en una sola vista — el flujo más eficiente posible para el usuario.' },
        { num: '4', span: ' estados',  label: 'Por componente de slot',            desc: 'Disponible, ocupado, seleccionado y vacío — todos documentados con su lógica de color.' },
      ],
    },
    learnings: {
      heading: 'Lo que aprendí',
      items: [
        { n: '01', title: 'Atomic Design no es un método, es una disciplina', text: 'Obligarte a definir cada átomo antes de construir moléculas parece lento al principio. Pero cuando llegué al organismo, todos los componentes encajaron sin conflictos de espaciado ni inconsistencias visuales. El tiempo invertido en los átomos se recupera en los organismos.' },
        { n: '02', title: 'El color semántico reduce la carga cognitiva',      text: 'Usar el mismo azul del header para los slots disponibles no fue una decisión estética — fue una decisión de UX. El usuario aprende una sola regla de color y la aplica en toda la pantalla. Menos reglas que aprender, menos errores.' },
        { n: '03', title: 'La información tiene un momento correcto',         text: 'Poner la duración del trámite en el dropdown y la nota del DNI después del botón fueron decisiones de jerarquía de información. Mostrar datos en el momento en que el usuario los necesita — ni antes ni después — es diseño invisible pero efectivo.' },
      ],
    },
    next: { label: 'Siguiente proyecto', title: 'Pruebas de Usabilidad →' },
    footer: { left: 'Juan José Bernal Núñez — UX/UI Designer', right: 'Sistema de Turnos' },
  },

  en: {
    nav: { back: 'Back' },
    hero: {
      tags: ['Mobile App', 'Design System'],
      h1: 'Queue',
      h1span: 'System',
      tagline: 'Mobile app to book appointments at public service offices — office selection, procedure type and available time slot in a single screen. Built with Atomic Design from atom to organism.',
      chips: ['Figma', 'Inter · Roboto', 'Atomic Design', 'Public services'],
    },
    phone: {
      title: 'Queue system',
      sub: 'Public services',
      officeLabel: 'Select Office',
      officePh: 'Select a branch',
      tramiteLabel: 'Procedure type',
      tramitePh: 'Select procedure',
      horariosLabel: 'Available slots — Today',
      btn: 'Complete all fields',
      note: 'Remember to bring your ID and arrive 10 min early',
    },
    infoBar: [
      { label: 'Type',  value: 'Mobile App' },
      { label: 'Role',  value: 'UX/UI Designer' },
      { label: 'Tools', value: 'Figma + Maze' },
    ],
    problem: {
      heading: "Booking an appointment shouldn't feel like a chore",
      p1: 'Queue management systems in public services are often confusing, with overloaded interfaces that force users to navigate multiple screens just to book a single appointment. The result: frustration, mistakes, and lost time.',
      p2: 'The goal of this project was to design a mobile app that condensed the entire flow into one clear screen: select the office, the procedure type and an available time slot — with no unnecessary friction. A system built from the smallest components up to the full screen using Atomic Design.',
    },
    process: {
      heading: 'From the smallest to the largest',
      intro: 'The project applied Atomic Design rigorously — no organism was built before its atoms and molecules were defined.',
      steps: [
        { name: 'Atoms',      desc: 'Blue header, section icons, time slots, dropdown and primary button — each element defined independently.' },
        { name: 'Molecules',  desc: 'Atom combinations: office selection section (icon + label + dropdown), time slots section (icon + label + slot grid).' },
        { name: 'Organisms',  desc: 'The full screen as an organism: header + sections + time grid + confirm button + informational note.' },
        { name: 'Final UI',   desc: 'Interactive app with real states: available vs unavailable slots, open/closed dropdown, active/inactive button.' },
      ],
    },
    atomic: {
      heading: 'Three levels of complexity',
      intro: 'Each level groups elements from the previous one and adds a layer of functional context — up to the full screen.',
      levels: [
        { level: 'Level 01', title: 'Atoms', text: 'The most basic elements of the system — they cannot be broken down further without losing their function. Each atom has a unique purpose and doesn\'t depend on other components.', tags: ['slot-time','icon-location','icon-document','icon-clock','header-blue','btn-confirm','label-section','note-text'] },
        { level: 'Level 02', title: 'Molecules', text: 'Atom combinations that form functional units with their own meaning. A molecule solves a specific user task within the flow.', tags: ['office-selector','procedure-selector','schedule-grid','dropdown-open','time-slot-row'] },
        { level: 'Level 03', title: 'Organisms', text: 'The full screen as an organism: an autonomous section that brings all molecules together into a coherent flow. The user can complete their task from start to finish.', tags: ['queue-screen','form-container','confirmation-zone'] },
      ],
      imgCap: 'Atoms · Molecules · Organisms — documented in Figma',
    },
    components: {
      heading: 'Each piece with its purpose',
      intro: 'Three key components solve the most important interaction decisions of the system.',
      imgs: [
        { src: '/Images/Sistema de turnos/Componentes horarios.png', cap: 'Time slots', desc: 'Two states: solid blue for available slots, black for unavailable. Color as an availability communicator without extra text.' },
        { src: '/Images/Sistema de turnos/Filter chip components.png', cap: 'Procedure dropdown', desc: 'Option list with name and estimated duration. Useful info before confirming.' },
      ],
      slots: {
        label: 'Time slot — states',
        note: 'Color communicates availability instantly — no text, no extra icons.',
        states: [
          { cls: 'ts-available',   time: '9:00',  label: 'Available' },
          { cls: 'ts-unavailable', time: '10:00', label: 'Taken' },
          { cls: 'ts-selected',    time: '11:00', label: 'Selected' },
          { cls: 'ts-empty',       time: '—',     label: 'No slot' },
        ],
      },
      dropdown: {
        label: 'Procedure dropdown',
        note: 'Shows procedure type and estimated duration — the user knows how much time they need before picking a slot.',
        ph: 'Select procedure',
        options: [
          { name: 'National ID', dur: '(30 min)' },
          { name: 'Passport', dur: '(45 min)' },
          { name: "Driver's license", dur: '(60 min)' },
          { name: 'Certificates', dur: '(15 min)' },
        ],
      },
      btn: {
        label: 'Confirm button',
        note: 'Disabled state until the user completes all 3 required fields. Prevents errors without blocking slot exploration.',
        incompleteLabel: 'Incomplete',
        incompleteBtn: 'Complete all fields',
        readyLabel: 'Ready to confirm',
        readyBtn: 'Confirm appointment',
      },
    },
    typo: {
      heading: 'Two families, distinct roles',
      intro: 'Inter for headings and navigation — geometric, modern, highly legible at any size. Roboto for body and data — neutral, designed specifically for digital screens.',
      cols: ['Level', 'Family', 'Use', 'Weight', 'Size', 'Example in app'],
    },
    uiFinal: {
      heading: 'The full flow in one screen',
      intro: 'The main screen condenses the complete flow — no unnecessary screen changes.',
      imgAlt: 'Final screen Queue Management System',
      features: [
        { num: '01', title: 'Header as visual anchor',         desc: 'The blue header establishes the system\'s identity at first glance. "Public services" as subtitle immediately contextualizes the app\'s purpose.' },
        { num: '02', title: 'Progressive 3-step flow',         desc: 'Office → Procedure → Time slot. The order is logical: first location, then service type, finally availability. Each section has its icon as a visual reference.' },
        { num: '03', title: 'Scannable time grid',             desc: '10 slots in a 2-column grid — easy to scan on mobile. Active/inactive state in color avoids redundant text and speeds up the user\'s decision.' },
        { num: '04', title: 'Contextual note at the end',      desc: '"Remember to bring your ID" appears after the button — useful information at the right moment, without interrupting the selection flow.' },
      ],
    },
    decisions: {
      heading: 'Why each choice',
      items: [
        { icon: '◈', title: 'One screen, complete flow',          text: 'Condensing office + procedure + time slot into a single view eliminates the friction of navigating between screens. The user sees all available context before confirming — without going back.' },
        { icon: '◉', title: 'Color as state, not decoration',     text: 'The blue of available slots is the same blue as the header — the user learns a single association: blue = active/available. Taken slots in black reinforce the distinction without extra text.' },
        { icon: '▦', title: 'Duration in the dropdown',           text: 'Showing how long each procedure takes (30, 45, 60 min) in the selector allows the user to make an informed decision before choosing a time slot — not after.' },
      ],
    },
    results: {
      heading: 'What was delivered',
      items: [
        { num: '3', span: ' levels',  label: 'Complete Atomic Design',             desc: 'Atoms, molecules and organisms documented in Figma before building the final screen.' },
        { num: '1', span: ' screen',  label: 'Full flow, no screen changes',       desc: 'Office + procedure + time slot in a single view — the most efficient flow possible for the user.' },
        { num: '4', span: ' states',  label: 'Per slot component',                 desc: 'Available, taken, selected and empty — all documented with their color logic.' },
      ],
    },
    learnings: {
      heading: 'What I learned',
      items: [
        { n: '01', title: 'Atomic Design is not a method, it\'s a discipline', text: 'Forcing yourself to define each atom before building molecules feels slow at first. But when I reached the organism, all components fit together with no spacing conflicts or visual inconsistencies. Time invested in atoms is recovered in organisms.' },
        { n: '02', title: 'Semantic color reduces cognitive load',              text: 'Using the same header blue for available slots was not an aesthetic decision — it was a UX decision. The user learns a single color rule and applies it across the entire screen. Fewer rules to learn, fewer mistakes.' },
        { n: '03', title: 'Information has a right moment',                    text: 'Placing procedure duration in the dropdown and the ID note after the button were information hierarchy decisions. Showing data when the user needs it — not before, not after — is invisible but effective design.' },
      ],
    },
    next: { label: 'Next project', title: 'Usability Testing →' },
    footer: { left: 'Juan José Bernal Núñez — UX/UI Designer', right: 'Queue System' },
  },
} as const;

type Lang = keyof typeof T;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SistemaDeTurnosPage() {
  const { lang, setLang } = useLanguage();
  const t = T[lang as Lang];
  const ph = t.phone;

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }),
      { threshold: 0 },
    );
    document.querySelectorAll('.st-infocell').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="st">

        {/* ── NAV ── */}
        <nav className="st-nav">
          <Link href="/#projects" className="st-back">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.nav.back}
          </Link>
          <div className="st-nav-right">
            <img src="/Images/LogoJJB/Logo%20JJB%20negro.png" alt="JJB" className="st-nav-logo" />
            <div className="st-lang">
              <button className={`st-lang-btn${lang==='es'?' active':''}`} onClick={() => setLang('es')}>ES</button>
              <button className={`st-lang-btn${lang==='en'?' active':''}`} onClick={() => setLang('en')}>EN</button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="st-hero">
          <div>
            <div className="st-hero-eyebrow">
              <span className="st-hero-tag accent">App Móvil</span>
              <span className="st-hero-tag">Atomic Design</span>
            </div>
            <h1 className="st-hero-h1">{t.hero.h1}<span>{t.hero.h1span}</span></h1>
            <p className="st-hero-sub">{t.hero.tagline}</p>
            <div className="st-chips">
              {t.hero.chips.map(c => <span key={c} className="st-chip">{c}</span>)}
            </div>
          </div>

          {/* Phone mockup */}
          <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
            <div className="st-phone-wrap">
              <div className="ph-hdr">
                <div className="ph-hdr-t">{ph.title}</div>
                <div className="ph-hdr-s">{ph.sub}</div>
              </div>
              <div className="ph-bdy">
                <div>
                  <div className="ph-sec">
                    <div className="ph-ico">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="5" r="2.5" stroke="#1a1f8f" strokeWidth="1.2"/>
                        <path d="M6 12C6 12 2 7.5 2 5a4 4 0 018 0c0 2.5-4 7-4 7z" stroke="#1a1f8f" strokeWidth="1.2"/>
                      </svg>
                    </div>
                    <span className="ph-sec-lbl">{ph.officeLabel}</span>
                  </div>
                  <div className="ph-drop" style={{ marginTop:6 }}>
                    <span>{ph.officePh}</span><span style={{ color:'#aaa' }}>▼</span>
                  </div>
                </div>
                <div>
                  <div className="ph-sec">
                    <div className="ph-ico">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <rect x="1.5" y="1.5" width="9" height="9" rx="1" stroke="#1a1f8f" strokeWidth="1.2"/>
                        <path d="M3.5 4h5M3.5 6h5M3.5 8h3" stroke="#1a1f8f" strokeWidth="1.2"/>
                      </svg>
                    </div>
                    <span className="ph-sec-lbl">{ph.tramiteLabel}</span>
                  </div>
                  <div className="ph-drop" style={{ marginTop:6 }}>
                    <span>{ph.tramitePh}</span><span style={{ color:'#aaa' }}>▲</span>
                  </div>
                </div>
                <div>
                  <div className="ph-sec">
                    <div className="ph-ico">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="4.5" stroke="#1a1f8f" strokeWidth="1.2"/>
                        <path d="M6 3.5V6l2 1.5" stroke="#1a1f8f" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="ph-sec-lbl">{ph.horariosLabel}</span>
                  </div>
                  <div className="ph-times" style={{ marginTop:6 }}>
                    {['9:00','9:30','10:00','10:30','11:00','11:30'].map(s => (
                      <div key={s} className="ph-time">{s}</div>
                    ))}
                  </div>
                </div>
                <div className="ph-cta">{ph.btn}</div>
                <div className="ph-note">{ph.note}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INFO BAR ── */}
        <div className="st-infobar">
          {t.infoBar.map(cell => (
            <div key={cell.label} className="st-infocell">
              <div className="st-infocell-label">{cell.label}</div>
              <div className="st-infocell-value">{cell.value}</div>
            </div>
          ))}
        </div>

        {/* ── PROBLEMA ── */}
        <div className="st-section-wrap">
          <div className="st-pad">
            <h2 className="st-h2">{t.problem.heading}</h2>
            <p className="st-body">{t.problem.p1}</p>
            <p className="st-body">{t.problem.p2}</p>
          </div>
        </div>

        {/* ── PROCESO ── */}
        <div className="st-section-wrap">
          <div className="st-pad-b">
            <h2 className="st-h2">{t.process.heading}</h2>
            <p className="st-body">{t.process.intro}</p>
          </div>
          <div className="st-steps">
            {t.process.steps.map(s => (
              <div key={s.name} className="st-step">
                <div className="st-step-name">{s.name}</div>
                <div className="st-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ATOMIC DESIGN ── */}
        <div className="st-section-wrap">
          <div className="st-pad-b">
            <h2 className="st-h2">{t.atomic.heading}</h2>
            <p className="st-body">{t.atomic.intro}</p>
          </div>
          <div className="st-atomic">
            {t.atomic.levels.map(lvl => (
              <div key={lvl.level} className="st-atomic-block">
                <div className="st-atomic-level">{lvl.level}</div>
                <div className="st-atomic-title">{lvl.title}</div>
                <p className="st-atomic-text">{lvl.text}</p>
                <div className="st-atomic-tags">
                  {lvl.tags.map(tag => <span key={tag} className="st-atomic-tag">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding:'0 40px 72px' }}>
            <img src="/Images/Sistema de turnos/componentes.png" alt="Atomic Design" className="st-img" style={{ marginTop:40 }} />
            <div className="st-img-cap">{t.atomic.imgCap}</div>
          </div>
        </div>

        {/* ── COMPONENTES ── */}
        <div className="st-section-wrap">
          <div className="st-pad-b">
            <h2 className="st-h2">{t.components.heading}</h2>
            <p className="st-body">{t.components.intro}</p>
            <div className="st-img-grid">
              {t.components.imgs.map(img => (
                <div key={img.cap} className="st-img-block">
                  <img src={img.src} alt={img.cap} />
                  <div className="st-img-block-cap">{img.cap}</div>
                  <div className="st-img-block-desc">{img.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding:'0 40px 72px' }}>
            <div className="st-comp-grid">
              {/* Slots */}
              <div className="st-comp-block">
                <div className="st-comp-label">{t.components.slots.label}</div>
                <div className="st-comp-note">{t.components.slots.note}</div>
                <div className="ts-grid" style={{ marginTop:14 }}>
                  {t.components.slots.states.map(s => (
                    <div key={s.label}>
                      <div className={`ts ${s.cls}`}>{s.time}</div>
                      <div className="ts-lbl">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Dropdown */}
              <div className="st-comp-block">
                <div className="st-comp-label">{t.components.dropdown.label}</div>
                <div className="st-comp-note">{t.components.dropdown.note}</div>
                <div style={{ marginTop:16, background:'#fff', border:'2px solid var(--ink)', overflow:'hidden' }}>
                  <div style={{ background:'#1a1a1a', padding:'10px 14px', textAlign:'center' }}>
                    <span style={{ fontFamily:'var(--inter)', fontSize:12, fontWeight:500, color:'rgba(255,255,255,.5)' }}>{t.components.dropdown.ph}</span>
                  </div>
                  <div>
                    {t.components.dropdown.options.map((opt, i) => (
                      <div key={opt.name} style={{ padding:'10px 14px', borderBottom: i < t.components.dropdown.options.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                        <div style={{ fontFamily:'var(--roboto)', fontSize:13, color:'var(--ink)' }}>{opt.name}</div>
                        <div style={{ fontFamily:'var(--roboto)', fontSize:11, color:'#aaa' }}>{opt.dur}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Button */}
              <div className="st-comp-block">
                <div className="st-comp-label">{t.components.btn.label}</div>
                <div className="st-comp-note">{t.components.btn.note}</div>
                <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:10 }}>
                  <div>
                    <div style={{ fontFamily:'var(--mono)', fontSize:8, color:'#7a7770', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:4 }}>{t.components.btn.incompleteLabel}</div>
                    <div style={{ background:'#ccc', padding:12, textAlign:'center', fontFamily:'var(--inter)', fontSize:13, fontWeight:600, color:'white' }}>{t.components.btn.incompleteBtn}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily:'var(--mono)', fontSize:8, color:'#7a7770', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:4 }}>{t.components.btn.readyLabel}</div>
                    <div style={{ background:'var(--acc)', padding:12, textAlign:'center', fontFamily:'var(--inter)', fontSize:13, fontWeight:600, color:'white' }}>{t.components.btn.readyBtn}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TIPOGRAFÍA ── */}
        <div className="st-section-wrap">
          <div className="st-pad">
            <h2 className="st-h2">{t.typo.heading}</h2>
            <p className="st-body">{t.typo.intro}</p>
            <div className="st-typo-table">
              <div className="st-typo-head">
                {t.typo.cols.map(c => <span key={c}>{c}</span>)}
              </div>
              <div className="st-typo-row">
                <span className="stc">H1</span><span className="stc">Inter</span><span className="stc">{lang==='es'?'Título header':'Header title'}</span><span className="stc">Semibold</span><span className="stc">18px</span>
                <span style={{ fontFamily:'var(--inter)', fontSize:18, fontWeight:600, color:'white', background:'var(--acc)', padding:'4px 12px', display:'inline-block' }}>{lang==='es'?'Sistema de turnos':'Queue system'}</span>
              </div>
              <div className="st-typo-row">
                <span className="stc">H2</span><span className="stc">Inter</span><span className="stc">{lang==='es'?'Label sección':'Section label'}</span><span className="stc">Regular</span><span className="stc">14px</span>
                <span style={{ fontFamily:'var(--inter)', fontSize:14, color:'var(--ink)' }}>{lang==='es'?'Selecciona Oficina · Tipo de tramite':'Select Office · Procedure type'}</span>
              </div>
              <div className="st-typo-row">
                <span className="stc">Slot</span><span className="stc">Inter</span><span className="stc">{lang==='es'?'Horario':'Time slot'}</span><span className="stc">Medium</span><span className="stc">14px</span>
                <div style={{ display:'flex', gap:6 }}>
                  <span style={{ fontFamily:'var(--inter)', fontSize:14, fontWeight:500, background:'var(--acc)', color:'white', padding:'4px 12px' }}>9:00</span>
                  <span style={{ fontFamily:'var(--inter)', fontSize:14, fontWeight:500, background:'#1a1a1a', color:'rgba(255,255,255,.3)', padding:'4px 12px' }}>14:00</span>
                </div>
              </div>
              <div className="st-typo-row">
                <span className="stc">Body</span><span className="stc">Roboto</span><span className="stc">{lang==='es'?'Opciones':'Options'}</span><span className="stc">Regular</span><span className="stc">14px</span>
                <span style={{ fontFamily:'var(--roboto)', fontSize:14, color:'var(--ink)' }}>{lang==='es'?'DNI - Documento Nacional de Identidad':'National ID Document'}</span>
              </div>
              <div className="st-typo-row">
                <span className="stc">Caption</span><span className="stc">Roboto</span><span className="stc">{lang==='es'?'Nota informativa':'Info note'}</span><span className="stc">Regular</span><span className="stc">12px</span>
                <span style={{ fontFamily:'var(--roboto)', fontSize:12, color:'#aaa' }}>{lang==='es'?'Recuerda llevar tu DNI y llegar 10 min antes':'Remember to bring your ID and arrive 10 min early'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── UI FINAL ── */}
        <div className="st-section-wrap">
          <div className="st-pad">
            <h2 className="st-h2">{t.uiFinal.heading}</h2>
            <p className="st-body">{t.uiFinal.intro}</p>
            <div className="st-phone-detail" style={{ marginTop:48 }}>
              <div style={{ display:'flex', justifyContent:'center' }}>
                <img src="/Images/Sistema de turnos/Pantalla.png" alt={t.uiFinal.imgAlt} style={{ maxWidth:280, width:'100%', border:'3px solid var(--ink)', display:'block' }} />
              </div>
              <div>
                {t.uiFinal.features.map(f => (
                  <div key={f.num} className="st-feature-item">
                    <div className="st-feature-num">{f.num}</div>
                    <div>
                      <div className="st-feature-title">{f.title}</div>
                      <div className="st-feature-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── DECISIONES ── */}
        <div className="st-section-wrap">
          <div className="st-pad-b">
            <h2 className="st-h2">{t.decisions.heading}</h2>
          </div>
          <div className="st-decisions">
            {t.decisions.items.map(d => (
              <div key={d.title} className="st-dec">
                <span className="st-dec-icon">{d.icon}</span>
                <div className="st-dec-title">{d.title}</div>
                <p className="st-dec-text">{d.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RESULTADOS ── */}
        <div className="st-section-wrap">
          <div className="st-pad-b">
            <h2 className="st-h2">{t.results.heading}</h2>
          </div>
          <div className="st-results">
            {t.results.items.map(r => (
              <div key={r.label} className="st-result">
                <span className="st-result-num">{r.num}<span>{r.span}</span></span>
                <div className="st-result-label">{r.label}</div>
                <div className="st-result-desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── APRENDIZAJES ── */}
        <div className="st-section-wrap">
          <div className="st-pad">
            <h2 className="st-h2">{t.learnings.heading}</h2>
            <div style={{ marginTop:40 }}>
              {t.learnings.items.map(item => (
                <div key={item.n} className="st-learn-item">
                  <div className="st-learn-num">{item.n}</div>
                  <div>
                    <div className="st-learn-title">{item.title}</div>
                    <p className="st-learn-text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── NEXT ── */}
        <div className="st-next">
          <span className="st-next-label">{t.next.label}</span>
          <Link href="/projects/pruebas-de-usabilidad" className="st-next-title">{t.next.title}</Link>
        </div>
        <div className="st-footer">
          <span>{t.footer.left}</span>
          <span>{t.footer.right}</span>
        </div>

      </div>
    </>
  );
}
