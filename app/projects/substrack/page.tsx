'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  .sb {
    --acc: #7B2FBE;
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
  .sb-nav {
    position: sticky; top: 0; z-index: 60;
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 40px;
    background: var(--paper);
    border-bottom: 3px solid var(--ink);
  }
  .sb-back {
    display: flex; align-items: center; gap: 8px;
    font-family: var(--mono); font-size: 11px; letter-spacing: .14em;
    text-transform: uppercase; color: var(--ink); text-decoration: none;
    transition: color .2s;
  }
  .sb-back:hover { color: var(--acc); }
  .sb-nav-right { display: flex; align-items: center; gap: 16px; }
  .sb-nav-logo { height: 28px; width: auto; display: block; }
  .sb-lang {
    display: flex; align-items: center;
    border: 2px solid var(--ink);
  }
  .sb-lang-btn {
    background: transparent; border: none; cursor: pointer;
    font-family: var(--mono); font-size: 11px; letter-spacing: .08em;
    padding: 5px 9px; color: var(--ink); transition: background .15s, color .15s;
  }
  .sb-lang-btn.active { background: var(--ink); color: var(--paper); }

  /* ── HERO ── */
  .sb-hero {
    background: var(--dark); color: var(--paper);
    display: grid; grid-template-columns: 1fr 1fr;
    padding: 80px 40px; gap: 60px; align-items: center;
    border-bottom: 3px solid var(--ink);
    min-height: 90vh;
  }
  .sb-hero-eyebrow {
    display: flex; align-items: center; gap: 10px; margin-bottom: 28px;
  }
  .sb-hero-tag {
    font-family: var(--mono); font-size: 10px; letter-spacing: .14em;
    text-transform: uppercase; padding: 4px 10px;
    border: 2px solid rgba(239,235,225,.25); color: rgba(239,235,225,.7);
  }
  .sb-hero-tag.flagship {
    background: var(--acc); color: var(--paper); border-color: var(--acc);
  }
  .sb-hero-h1 {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(72px, 10vw, 140px); line-height: .92;
    letter-spacing: -.02em; color: var(--paper);
    margin: 0 0 28px;
  }
  .sb-hero-h1 span { color: var(--acc); display: block; }
  .sb-hero-sub {
    font-size: 17px; line-height: 1.75;
    color: rgba(239,235,225,.7); max-width: 440px; margin-bottom: 28px;
  }
  .sb-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .sb-chip {
    font-family: var(--mono); font-size: 10px; letter-spacing: .1em;
    text-transform: uppercase; padding: 5px 12px;
    border: 2px solid rgba(239,235,225,.2); color: rgba(239,235,225,.65);
  }

  /* ── DASHBOARD PREVIEW ── */
  .sb-ui {
    background: #fff; border: 3px solid rgba(255,255,255,.15);
    overflow: hidden;
  }
  .sb-ui-topbar {
    background: #f0f0f0; padding: 8px 14px;
    display: flex; align-items: center; gap: 6px;
  }
  .sb-ui-dot { width: 9px; height: 9px; border-radius: 50%; }
  .sb-ui-body { display: flex; height: 260px; }
  .sb-ui-sidebar {
    width: 60px; background: var(--dark);
    display: flex; flex-direction: column; align-items: center;
    padding: 14px 0; gap: 20px;
  }
  .sb-ui-logo { font-family: var(--display); font-size: 16px; color: white; }
  .sb-ui-icon { width: 22px; height: 22px; background: rgba(255,255,255,.08); }
  .sb-ui-icon.on { background: var(--acc); }
  .sb-ui-main {
    flex: 1; padding: 14px 16px;
    display: flex; flex-direction: column; gap: 8px;
    border-right: 1px solid #eee; overflow: hidden;
  }
  .sb-ui-hdr { display: flex; align-items: center; gap: 8px; }
  .sb-ui-title { font-family: var(--display); font-size: 18px; color: var(--ink); flex: 1; }
  .sb-ui-search { flex: 2; border: 1px solid #ddd; padding: 5px 10px; font-size: 10px; color: #aaa; background: #fafafa; }
  .sb-ui-btn { background: var(--acc); color: white; padding: 5px 14px; font-size: 10px; white-space: nowrap; }
  .sb-ui-filters { display: flex; gap: 6px; }
  .sb-ui-pill { border: 1px solid #ccc; padding: 3px 10px; font-size: 9px; color: #888; }
  .sb-ui-pill.on { border-color: var(--acc); color: var(--acc); background: rgba(123,47,190,.08); }
  .sb-ui-thead { display: grid; grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr; background: #e8e8e8; padding: 5px 8px; gap: 4px; margin-bottom: 2px; }
  .sb-ui-thead span { font-size: 9px; font-weight: 600; color: #444; }
  .sb-ui-trow { display: grid; grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr; padding: 5px 8px; border-bottom: 1px solid #f0f0f0; gap: 4px; }
  .sb-ui-trow span { font-size: 9px; color: #555; }
  .sb-ui-detail { width: 150px; padding: 14px 12px; display: flex; flex-direction: column; gap: 8px; }
  .sb-ui-detail-title { font-family: var(--display); font-size: 15px; line-height: 1.1; color: var(--ink); }
  .sb-ui-dr { border-bottom: 1px solid #f0f0f0; padding-bottom: 5px; }
  .sb-ui-dr .dl { font-size: 8px; color: #aaa; text-transform: uppercase; letter-spacing: .08em; }
  .sb-ui-dr .dv { font-size: 10px; color: #333; font-weight: 500; }
  .sb-ui-action { margin-top: auto; border: 1px solid var(--acc); color: var(--acc); padding: 5px; font-size: 9px; text-align: center; font-family: var(--mono); }

  /* ── INFO BAR ── */
  .sb-infobar { display: flex; border-bottom: 3px solid var(--ink); }
  .sb-infocell {
    flex: 1; padding: 32px 40px;
    border-right: 3px solid var(--ink);
  }
  .sb-infocell:last-child { border-right: none; }
  .sb-infocell-label {
    font-family: var(--mono); font-size: 9px; letter-spacing: .2em;
    text-transform: uppercase; color: #7a7770; margin-bottom: 6px;
  }
  .sb-infocell-value {
    font-family: var(--display); font-weight: 700;
    font-size: 20px; color: var(--ink);
  }

  /* ── SECTION SHARED ── */
  .sb-section { border-bottom: 3px solid var(--ink); }
  .sb-h2 {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(32px, 4vw, 52px); line-height: 1; margin: 0 0 20px;
    letter-spacing: -.01em;
  }
  .sb-body { font-size: 17px; line-height: 1.75; color: #4a4845; max-width: 640px; }
  .sb-body + .sb-body { margin-top: 16px; }
  .sb-pad { padding: 72px 40px; }
  .sb-pad-b { padding: 72px 40px 40px; }

  /* ── USER STORIES ── */
  .sb-story {
    display: grid; grid-template-columns: 72px 1fr; gap: 28px;
    padding: 28px 0; border-bottom: 3px solid var(--ink); align-items: start;
  }
  .sb-story:last-child { border-bottom: none; }
  .sb-story-num { font-family: var(--display); font-weight: 800; font-size: 40px; line-height: 1; color: #d8d4cc; }
  .sb-story-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--mono); font-size: 9px; letter-spacing: .12em;
    text-transform: uppercase; color: #2D8B6F;
    background: rgba(45,139,111,.08); border: 2px solid rgba(45,139,111,.25);
    padding: 3px 8px; margin-bottom: 10px;
  }
  .sb-story-title { font-family: var(--display); font-weight: 800; font-size: 22px; margin-bottom: 8px; }
  .sb-story-text { font-size: 14px; line-height: 1.8; color: #4a4845; max-width: 580px; }
  .sb-story-text strong { color: var(--acc); font-weight: 600; }

  /* ── PROCESS STEPS ── */
  .sb-steps { display: grid; grid-template-columns: repeat(4,1fr); border-top: 3px solid var(--ink); }
  .sb-step {
    padding: 36px 32px; border-right: 3px solid var(--ink);
  }
  .sb-step:last-child { border-right: none; }
  .sb-step-name { font-family: var(--display); font-weight: 800; font-size: 22px; margin-bottom: 10px; }
  .sb-step-desc { font-size: 13px; line-height: 1.8; color: #4a4845; }

  /* ── IMAGE SECTIONS ── */
  .sb-img-wrap { margin-top: 40px; }
  .sb-img { width: 100%; border: 3px solid var(--ink); display: block; }
  .sb-img-cap {
    font-family: var(--mono); font-size: 10px; letter-spacing: .12em;
    text-transform: uppercase; color: #7a7770; margin-top: 12px;
  }

  /* ── ATOMIC DESIGN ── */
  .sb-atomic { display: grid; grid-template-columns: repeat(3,1fr); border-top: 3px solid var(--ink); }
  .sb-atomic-block { padding: 40px; border-right: 3px solid var(--ink); }
  .sb-atomic-block:last-child { border-right: none; }
  .sb-atomic-icon { font-size: 28px; display: block; margin-bottom: 14px; }
  .sb-atomic-title { font-family: var(--display); font-weight: 800; font-size: 24px; margin-bottom: 10px; }
  .sb-atomic-text { font-size: 14px; line-height: 1.8; color: #4a4845; }
  .sb-atomic-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
  .sb-atomic-tag {
    font-family: var(--mono); font-size: 9px; letter-spacing: .1em;
    padding: 3px 8px; border: 2px solid #d8d4cc; color: #7a7770;
  }

  /* ── TYPOGRAPHY TABLE ── */
  .sb-typo-table { margin-top: 40px; border: 3px solid var(--ink); overflow: hidden; }
  .sb-typo-head {
    display: grid; grid-template-columns: 80px 140px 100px 80px 1fr;
    background: var(--acc); padding: 12px 20px; gap: 8px;
  }
  .sb-typo-head span { font-family: var(--mono); font-size: 9px; letter-spacing: .15em; text-transform: uppercase; color: rgba(255,255,255,.8); }
  .sb-typo-row {
    display: grid; grid-template-columns: 80px 140px 100px 80px 1fr;
    padding: 16px 20px; gap: 8px; border-bottom: 3px solid var(--ink); align-items: center;
  }
  .sb-typo-row:last-child { border-bottom: none; }
  .sb-typo-row:nth-child(even) { background: rgba(239,235,225,.5); }
  .stc { font-size: 13px; color: #7a7770; font-family: var(--mono); }

  /* ── DECISIONS ── */
  .sb-decs { display: grid; grid-template-columns: repeat(3,1fr); border-top: 3px solid var(--ink); }
  .sb-dec { padding: 48px 40px; border-right: 3px solid var(--ink); }
  .sb-dec:last-child { border-right: none; }
  .sb-dec-icon { font-size: 24px; display: block; margin-bottom: 14px; color: var(--acc); }
  .sb-dec-title { font-family: var(--display); font-weight: 800; font-size: 22px; margin-bottom: 10px; }
  .sb-dec-text { font-size: 14px; line-height: 1.8; color: #4a4845; }

  /* ── RESULTS ── */
  .sb-results { display: grid; grid-template-columns: repeat(3,1fr); border-top: 3px solid var(--ink); }
  .sb-result { padding: 48px 40px; border-right: 3px solid var(--ink); }
  .sb-result:last-child { border-right: none; }
  .sb-result-num { font-family: var(--display); font-weight: 800; font-size: 80px; line-height: 1; color: var(--ink); display: block; }
  .sb-result-num span { color: var(--acc); }
  .sb-result-label { font-family: var(--mono); font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: #7a7770; margin-top: 12px; }
  .sb-result-desc { font-size: 14px; color: #4a4845; margin-top: 10px; line-height: 1.8; }

  /* ── LEARNINGS ── */
  .sb-learn-item {
    display: grid; grid-template-columns: 80px 1fr; gap: 32px;
    padding: 32px 0; border-bottom: 3px solid var(--ink); align-items: start;
  }
  .sb-learn-item:last-child { border-bottom: none; }
  .sb-learn-num { font-family: var(--display); font-weight: 800; font-size: 52px; line-height: 1; color: #d8d4cc; }
  .sb-learn-title { font-family: var(--display); font-weight: 800; font-size: 26px; margin-bottom: 10px; }
  .sb-learn-text { font-size: 15px; line-height: 1.8; color: #4a4845; max-width: 600px; }

  /* ── NEXT PROJECT ── */
  .sb-next {
    background: var(--dark); padding: 80px 40px;
    border-top: 3px solid var(--ink);
  }
  .sb-next-label {
    font-family: var(--mono); font-size: 10px; letter-spacing: .2em;
    text-transform: uppercase; color: rgba(239,235,225,.45); display: block; margin-bottom: 12px;
  }
  .sb-next-title {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(48px,7vw,96px); line-height: 1;
    color: var(--paper); text-decoration: none; transition: color .2s;
  }
  .sb-next-title:hover { color: var(--acc); }

  /* ── FOOTER ── */
  .sb-footer {
    padding: 20px 40px; display: flex; justify-content: space-between;
    border-top: 3px solid rgba(255,255,255,.1); background: var(--dark);
  }
  .sb-footer span { font-family: var(--mono); font-size: 10px; letter-spacing: .1em; color: rgba(239,235,225,.45); }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .sb-nav { padding: 14px 20px; }
    .sb-hero { grid-template-columns: 1fr; padding: 60px 20px 48px; min-height: auto; gap: 40px; }
    .sb-hero-h1 { font-size: clamp(56px,18vw,100px); }
    .sb-infobar { flex-direction: column; }
    .sb-infocell { border-right: none; border-bottom: 3px solid var(--ink); padding: 24px 20px; }
    .sb-pad, .sb-pad-b { padding: 48px 20px; }
    .sb-steps { grid-template-columns: repeat(2,1fr); }
    .sb-step:nth-child(2) { border-right: none; }
    .sb-step:nth-child(3), .sb-step:nth-child(4) { border-top: 3px solid var(--ink); }
    .sb-step:nth-child(4) { border-right: none; }
    .sb-atomic { grid-template-columns: 1fr; }
    .sb-atomic-block { border-right: none; border-bottom: 3px solid var(--ink); }
    .sb-atomic-block:last-child { border-bottom: none; }
    .sb-decs { grid-template-columns: 1fr; }
    .sb-dec { border-right: none; border-bottom: 3px solid var(--ink); padding: 36px 20px; }
    .sb-dec:last-child { border-bottom: none; }
    .sb-results { grid-template-columns: 1fr; }
    .sb-result { border-right: none; border-bottom: 3px solid var(--ink); padding: 36px 20px; }
    .sb-result:last-child { border-bottom: none; }
    .sb-typo-table { overflow-x: auto; }
    .sb-typo-head, .sb-typo-row { min-width: 500px; }
    .sb-next { padding: 60px 20px; }
    .sb-footer { padding: 16px 20px; }
  }
  @media (max-width: 480px) {
    .sb-steps { grid-template-columns: 1fr; }
    .sb-step { border-right: none; border-bottom: 3px solid var(--ink); }
    .sb-step:last-child { border-bottom: none; }
  }
`;

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  es: {
    nav: { back: 'Volver' },
    hero: {
      tagline: 'Dashboard para centralizar todas las suscripciones activas — streaming, gimnasios, plataformas IA — con gestión de estado, búsqueda y panel de detalle en una sola vista.',
    },
    infoBar: [
      { label: 'Tipo',         value: 'Web App' },
      { label: 'Rol',          value: 'UI Designer' },
      { label: 'Herramientas', value: 'Figma + Atomic Design' },
    ],
    uiMock: { title: 'Module', search: 'Nombre de la membresía...', filters: ['Activas', 'Inactivas', 'Por vencer'], search_btn: 'Buscar', rows: ['Activa', 'Activa', 'Vence', 'Activa'], detail: [['Proveedor','Netflix Inc.'],['Ciclo','Mensual'],['Próx. cobro','15 Jun'],['Total/año','$216']], action: 'Acciones ▾' },
    problem: {
      heading: 'El cobro que nadie espera',
      p1: 'Los usuarios acumulan suscripciones en múltiples servicios — streaming, gimnasios, herramientas de trabajo, plataformas IA — sin una vista unificada de lo que pagan ni cuándo se renueva cada una. El resultado son cobros inesperados, servicios olvidados y ningún control real sobre el gasto mensual recurrente.',
      p2: 'Substrack centraliza todo en un único dashboard: búsqueda rápida, filtros por estado, tabla de gestión y panel de detalle por suscripción — sin cambiar de pantalla.',
    },
    stories: {
      heading: '6 necesidades del usuario',
      intro: 'El diseño partió de historias de usuario reales en formato Como / Quiero / Para — cada una validada antes de avanzar al wireframe.',
      badge: '✓ Completada',
      kw: { as: 'Como', want: 'quiero', soThat: 'para' },
      items: [
        { num:'01', title:'Navegación fija',        as:'usuario de la aplicación',               want:'tener siempre visible una barra de navegación con accesos clave',                             soThat:'poder acceder rápidamente a funciones esenciales sin perder el contexto actual.' },
        { num:'02', title:'Vista lista + detalle',  as:'usuario que gestiona varias suscripciones', want:'ver en un mismo espacio el listado y el detalle de la seleccionada',                       soThat:'no tener que cambiar de pantalla cada vez que quiera consultar una.' },
        { num:'03', title:'Cambio de estado',       as:'usuario que necesita organizar sus servicios', want:'poder alternar entre suscripciones activas, inactivas y por vencer mediante filtros',   soThat:'segmentar la información de manera clara sin perder el contexto.' },
        { num:'04', title:'Búsqueda rápida',        as:'usuario con muchas suscripciones registradas', want:'contar con un campo de búsqueda visible en la pantalla principal',                     soThat:'encontrar rápidamente una suscripción específica por su nombre.' },
        { num:'05', title:'Gestión de suscripción', as:'usuario que administra sus propios gastos',  want:'poder editar, cancelar o ver detalles directamente desde la vista de detalle',            soThat:'tomar decisiones sin navegar por menús complejos.' },
        { num:'06', title:'Escalabilidad futura',   as:'usuario que seguirá usando esta app a largo plazo', want:'que la interfaz tenga una estructura clara y modular',                            soThat:'cuando se agreguen nuevas secciones no se rompa la lógica de navegación.' },
      ],
    },
    process: {
      heading: 'De las historias a la interfaz',
      intro: 'Cuatro etapas progresivas — cada una construida sobre la anterior, sin saltar pasos.',
      steps: [
        { name:'User Stories',   desc:'6 historias Como/Quiero/Para que definieron los requisitos funcionales antes de abrir Figma.' },
        { name:'Wireframe',      desc:'Estructura de 3 columnas en gris: sidebar de nav, módulo principal con búsqueda y filtros, panel de detalle.' },
        { name:'Atomic Design',  desc:'8 pasos de construcción en Figma: análisis atómico, autolayout, componentes reutilizables y verificación responsive.' },
        { name:'UI Final',       desc:'App navegable con sidebar negro, botón púrpura, tabla de datos y panel de detalle con acciones.' },
      ],
    },
    wireframe: {
      heading: 'La estructura antes del color',
      text: 'Resolver la arquitectura de 3 columnas en gris antes de aplicar visual garantizó que cada decisión de UI tuviera una razón estructural detrás.',
      caption: 'Wireframe — estructura de 3 columnas: sidebar / módulo principal / panel de detalle',
    },
    atomic: {
      heading: 'Construido de lo pequeño a lo grande',
      intro: 'El proyecto aplicó los 8 pasos del proceso de construcción en Figma — desde identificar átomos hasta verificar el responsive en 1024px.',
      blocks: [
        { icon:'◎', title:'Átomos',     text:'Los elementos más pequeños: inputs, botones individuales, chips, íconos y celdas de tabla. Cada uno nombrado por su función usando kebab-case.', tags:['input-search','btn-primary','chip-filter','table-cell','icon-bell'] },
        { icon:'▦', title:'Moléculas',  text:'Combinaciones de átomos con autolayout: la barra de búsqueda con botón, la fila de filtros, el header del módulo y la fila completa de tabla.',     tags:['search-bar','filter-row','table-row','module-header'] },
        { icon:'◈', title:'Organismos', text:'Secciones completas de la interfaz: la tabla con su header y filas, el panel de detalle con todos sus campos, y el sidebar de navegación completo.',  tags:['data-table','detail-panel','nav-sidebar','actions-table'] },
      ],
      placeholder: 'Checklist Atomic Design — Figma',
      caption: 'Checklist de 8 pasos de construcción — todos completados',
    },
    components: {
      heading: 'Sistema de componentes documentado',
      text: 'Tabla, inputs con 5 estados, botones en 6 variantes, chips, dropdowns, iconos y sidebar — cada componente creado como instancia reutilizable en Figma.',
      caption: 'Componentes — tabla, inputs, botones, chips, dropdown, iconos, sidebar',
    },
    typo: {
      heading: 'Poppins — limpia y legible',
      text: 'Una sola familia tipográfica en toda la app. Poppins Regular garantiza legibilidad en tablas densas de datos sin sacrificar elegancia. Los pesos se usan para jerarquía, no familias distintas.',
      cols: ['Nivel','Familia','Peso','Tamaño','Uso en Substrack'],
    },
    decisions: {
      heading: 'Por qué cada elección',
      items: [
        { icon:'◈', title:'3 columnas sin navegación entre páginas', text:'Sidebar + tabla + detalle en una sola vista cumple directamente la User Story 02: ver listado y detalle simultáneamente. Elimina el flujo de ir y volver que genera frustración en apps de gestión de datos.' },
        { icon:'◉', title:'Púrpura como único color de acción',      text:'En un dashboard con mucho texto y datos, un solo color de acción evita la fatiga visual. El púrpura del botón "Buscar" y el chip activo son los únicos elementos que piden atención inmediata del usuario.' },
        { icon:'▦', title:'Autolayout desde el átomo',               text:'Cada componente fue construido con autolayout y fill container / hug contents correctamente configurados. Resultado: la interfaz se adapta de 1440px a 1024px sin romper ningún elemento. Escalabilidad desde el día uno.' },
      ],
    },
    results: {
      heading: 'Lo que se entregó',
      items: [
        { num:'6', span:'/6',     label:'User Stories implementadas',     desc:'Cada historia de usuario se tradujo en una decisión de diseño visible en la pantalla final.' },
        { num:'8', span:' pasos', label:'De construcción en Figma',        desc:'Análisis atómico, autolayout, componentes reutilizables, instancias y verificación responsive completados.' },
        { num:'2', span:'px',     label:'Breakpoints verificados',          desc:'1440px y 1024px — la interfaz se comporta correctamente en ambos anchos gracias al sistema de autolayout.' },
      ],
    },
    learnings: {
      heading: 'Lo que aprendí',
      items: [
        { n:'01', title:'Las User Stories evitan el diseño arbitrario',        text:'Empezar con 6 historias de usuario antes de abrir Figma dio una razón justificable para cada decisión. La estructura de 3 columnas no fue un capricho visual — fue la respuesta directa a "quiero ver listado y detalle sin cambiar de pantalla".' },
        { n:'02', title:'El autolayout es la base del responsive, no el final', text:'Configurar fill container y hug contents desde el primer átomo hizo que el responsive de 1440 a 1024px fuera casi automático. Los proyectos que aplican autolayout al final siempre tienen que rehacerlo todo.' },
        { n:'03', title:'Nombrar las capas es documentar el sistema',           text:'Usar kebab-case funcional (cards-container, inputs-container, actions-table) hizo que el archivo de Figma fuera navegable para cualquier diseñador o desarrollador que lo abriera sin contexto previo. El naming no es cosmético — es arquitectura.' },
      ],
    },
    next:   { label: 'Siguiente proyecto', title: 'EsDesign Login →' },
    footer: { copy1: 'Juan José Bernal Núñez — UX/UI Designer', copy2: 'Substrack' },
  },

  en: {
    nav: { back: 'Back' },
    hero: {
      tagline: 'Dashboard to centralize all active subscriptions — streaming, gyms, AI platforms — with status management, search, and a detail panel in a single view.',
    },
    infoBar: [
      { label: 'Type',  value: 'Web App' },
      { label: 'Role',  value: 'UI Designer' },
      { label: 'Tools', value: 'Figma + Atomic Design' },
    ],
    uiMock: { title: 'Module', search: 'Membership name...', filters: ['Active', 'Inactive', 'Expiring'], search_btn: 'Search', rows: ['Active', 'Active', 'Expires', 'Active'], detail: [['Provider','Netflix Inc.'],['Cycle','Monthly'],['Next charge','Jun 15'],['Year total','$216']], action: 'Actions ▾' },
    problem: {
      heading: 'The charge nobody expected',
      p1: 'Users accumulate subscriptions across multiple services — streaming, gyms, work tools, AI platforms — with no unified view of what they pay or when each one renews. The result: unexpected charges, forgotten services, and zero real control over monthly recurring spend.',
      p2: 'Substrack centralizes everything in one dashboard: fast search, status filters, a management table, and a per-subscription detail panel — without switching screens.',
    },
    stories: {
      heading: '6 user needs',
      intro: 'The design started from real user stories in As / I want / So that format — each one validated before moving to wireframe.',
      badge: '✓ Done',
      kw: { as: 'As', want: 'I want', soThat: 'so that' },
      items: [
        { num:'01', title:'Fixed navigation',        as:'an app user',                                   want:'to always see a navigation bar with key access points',                         soThat:"I can quickly reach essential functions without losing my current context." },
        { num:'02', title:'List + detail view',      as:'a user managing multiple subscriptions',         want:"to see both the list and the selected item's detail in one place",             soThat:"I don't have to switch screens every time I want to check on one." },
        { num:'03', title:'Status switching',        as:'a user who needs to organize their services',    want:'to toggle between active, inactive, and expiring subscriptions using filters',  soThat:'I can segment information clearly without losing context.' },
        { num:'04', title:'Quick search',            as:'a user with many registered subscriptions',      want:'to have a visible search field on the main screen',                            soThat:'I can quickly find a specific subscription by name.' },
        { num:'05', title:'Subscription management', as:'a user managing my own expenses',                want:'to edit, cancel, or view details directly from the detail view',               soThat:'I can make decisions without navigating complex menus.' },
        { num:'06', title:'Future scalability',      as:'a user who will keep using this app long-term',  want:'the interface to have a clear, modular structure',                             soThat:"when new sections are added, the navigation logic doesn't break." },
      ],
    },
    process: {
      heading: 'From stories to interface',
      intro: 'Four progressive stages — each built on top of the previous one, no steps skipped.',
      steps: [
        { name:'User Stories',  desc:'6 As/I want/So that stories that defined functional requirements before opening Figma.' },
        { name:'Wireframe',     desc:'3-column structure in grey: nav sidebar, main module with search and filters, detail panel.' },
        { name:'Atomic Design', desc:'8 build steps in Figma: atomic analysis, autolayout, reusable components and responsive verification.' },
        { name:'Final UI',      desc:'Navigable app with black sidebar, purple button, data table and detail panel with actions.' },
      ],
    },
    wireframe: {
      heading: 'Structure before color',
      text: 'Solving the 3-column architecture in grey before applying visuals ensured every UI decision had a structural reason behind it.',
      caption: 'Wireframe — 3-column structure: sidebar / main module / detail panel',
    },
    atomic: {
      heading: 'Built from small to large',
      intro: 'The project applied all 8 build steps in Figma — from identifying atoms all the way to verifying responsive at 1024px.',
      blocks: [
        { icon:'◎', title:'Atoms',     text:'The smallest elements: inputs, individual buttons, chips, icons, and table cells. Each named by function using kebab-case.',      tags:['input-search','btn-primary','chip-filter','table-cell','icon-bell'] },
        { icon:'▦', title:'Molecules', text:'Atom combinations with autolayout: the search bar with button, the filter row, the module header, and the full table row.',          tags:['search-bar','filter-row','table-row','module-header'] },
        { icon:'◈', title:'Organisms', text:'Complete interface sections: the table with header and rows, the detail panel with all fields, and the full navigation sidebar.',     tags:['data-table','detail-panel','nav-sidebar','actions-table'] },
      ],
      placeholder: 'Atomic Design Checklist — Figma',
      caption: '8-step build checklist — all completed',
    },
    components: {
      heading: 'Documented component system',
      text: 'Table, inputs with 5 states, buttons in 6 variants, chips, dropdowns, icons and sidebar — each component built as a reusable instance in Figma.',
      caption: 'Components — table, inputs, buttons, chips, dropdown, icons, sidebar',
    },
    typo: {
      heading: 'Poppins — clean and readable',
      text: 'A single typeface throughout the app. Poppins Regular ensures readability in dense data tables without sacrificing elegance. Weights are used for hierarchy, not different families.',
      cols: ['Level','Family','Weight','Size','Use in Substrack'],
    },
    decisions: {
      heading: 'Why each choice',
      items: [
        { icon:'◈', title:'3 columns, no page navigation',   text:'Sidebar + table + detail in one view directly fulfills User Story 02: see list and detail simultaneously. It eliminates the back-and-forth flow that causes frustration in data management apps.' },
        { icon:'◉', title:'Purple as the only action color', text:"In a dashboard with lots of text and data, a single action color prevents visual fatigue. The purple 'Search' button and the active chip are the only elements asking for the user's immediate attention." },
        { icon:'▦', title:'Autolayout from the atom',        text:"Every component was built with autolayout and fill container / hug contents correctly configured. Result: the interface adapts from 1440px to 1024px without breaking anything. Scalability from day one." },
      ],
    },
    results: {
      heading: 'What was delivered',
      items: [
        { num:'6', span:'/6',    label:'User Stories implemented',  desc:'Every user story was translated into a design decision visible in the final screen.' },
        { num:'8', span:' steps',label:'Build steps in Figma',      desc:'Atomic analysis, autolayout, reusable components, instances and responsive verification — all completed.' },
        { num:'2', span:'px',   label:'Breakpoints verified',       desc:'1440px and 1024px — the interface behaves correctly at both widths thanks to the autolayout system.' },
      ],
    },
    learnings: {
      heading: 'What I learned',
      items: [
        { n:'01', title:'User Stories prevent arbitrary design',               text:"Starting with 6 user stories before opening Figma gave a justifiable reason for every decision. The 3-column structure wasn't a visual whim — it was the direct response to 'I want to see list and detail without switching screens'." },
        { n:'02', title:'Autolayout is the foundation of responsive, not the finish', text:'Setting fill container and hug contents from the first atom made the 1440 to 1024px responsive almost automatic. Projects that apply autolayout at the end always have to redo everything.' },
        { n:'03', title:'Naming layers is documenting the system',             text:"Using functional kebab-case (cards-container, inputs-container, actions-table) made the Figma file navigable for any designer or developer who opened it without prior context. Naming is not cosmetic — it's architecture." },
      ],
    },
    next:   { label: 'Next project', title: 'EsDesign Login →' },
    footer: { copy1: 'Juan José Bernal Núñez — UX/UI Designer', copy2: 'Substrack' },
  },
} as const;

type Lang = keyof typeof T;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SubstrackCaseStudy() {
  const { lang, setLang } = useLanguage();
  const t = T[lang as Lang];

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }),
      { threshold: 0 },
    );
    document.querySelectorAll('.sb-infocell').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="sb">

        {/* ── NAV ── */}
        <nav className="sb-nav">
          <Link href="/#projects" className="sb-back">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.nav.back}
          </Link>
          <div className="sb-nav-right">
            <img src="/Images/LogoJJB/Logo%20JJB%20negro.png" alt="JJB" className="sb-nav-logo" />
            <div className="sb-lang">
              <button className={`sb-lang-btn${lang==='es'?' active':''}`} onClick={() => setLang('es')}>ES</button>
              <button className={`sb-lang-btn${lang==='en'?' active':''}`} onClick={() => setLang('en')}>EN</button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="sb-hero">
          <div>
            <div className="sb-hero-eyebrow">
              <span className="sb-hero-tag flagship">Web App</span>
              <span className="sb-hero-tag">Design System</span>
            </div>
            <h1 className="sb-hero-h1">Sub<span>strack</span></h1>
            <p className="sb-hero-sub">{t.hero.tagline}</p>
            <div className="sb-chips">
              {['Figma','Poppins','Atomic Design','Autolayout','Responsive'].map(c => (
                <span key={c} className="sb-chip">{c}</span>
              ))}
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="sb-ui">
            <div className="sb-ui-topbar">
              <div className="sb-ui-dot" style={{ background:'#ff5f57' }} />
              <div className="sb-ui-dot" style={{ background:'#febc2e' }} />
              <div className="sb-ui-dot" style={{ background:'#28c840' }} />
              <div style={{ flex:1, background:'#ddd', height:'16px', marginLeft:'8px' }} />
            </div>
            <div className="sb-ui-body">
              <div className="sb-ui-sidebar">
                <span className="sb-ui-logo">JB</span>
                <div className="sb-ui-icon" /><div className="sb-ui-icon on" />
                <div className="sb-ui-icon" /><div className="sb-ui-icon" />
                <div className="sb-ui-icon" style={{ marginTop:'auto', borderRadius:'50%' }} />
              </div>
              <div className="sb-ui-main">
                <div className="sb-ui-hdr">
                  <span className="sb-ui-title">{t.uiMock.title}</span>
                  <div className="sb-ui-search">{t.uiMock.search}</div>
                  <div className="sb-ui-btn">{t.uiMock.search_btn}</div>
                </div>
                <div className="sb-ui-filters">
                  {t.uiMock.filters.map((f,i) => (
                    <span key={f} className={`sb-ui-pill${i===0?' on':''}`}>{f}</span>
                  ))}
                </div>
                <div className="sb-ui-thead">
                  {['Producto','Estado','Renovación','Plan','Costo'].map(c => <span key={c}>{c}</span>)}
                </div>
                {[
                  { name:'Netflix', color:'#2D8B6F', date:'15 Jun', plan:'Premium', cost:'$18', op:1 },
                  { name:'Spotify', color:'#2D8B6F', date:'20 Jun', plan:'Duo',     cost:'$12', op:1 },
                  { name:'Gym XL',  color:'#E8421A', date:'30 Jun', plan:lang==='es'?'Mensual':'Monthly', cost:'$35', op:1 },
                  { name:'Claude',  color:'#555',    date:'01 Jul', plan:'Pro',      cost:'$20', op:0.5 },
                ].map((row,i) => (
                  <div key={row.name} className="sb-ui-trow" style={{ opacity:row.op }}>
                    <span>{row.name}</span>
                    <span style={{ color:row.color }}>{t.uiMock.rows[i]}</span>
                    <span>{row.date}</span><span>{row.plan}</span><span>{row.cost}</span>
                  </div>
                ))}
              </div>
              <div className="sb-ui-detail">
                <div className="sb-ui-detail-title">Subscription product</div>
                {t.uiMock.detail.map(([k,v]) => (
                  <div key={k} className="sb-ui-dr"><div className="dl">{k}</div><div className="dv">{v}</div></div>
                ))}
                <div className="sb-ui-action">{t.uiMock.action}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INFO BAR ── */}
        <div className="sb-infobar">
          {t.infoBar.map(cell => (
            <div key={cell.label} className="sb-infocell">
              <div className="sb-infocell-label">{cell.label}</div>
              <div className="sb-infocell-value">{cell.value}</div>
            </div>
          ))}
        </div>

        {/* ── PROBLEMA ── */}
        <section className="sb-section">
          <div className="sb-pad">
            <h2 className="sb-h2">{t.problem.heading}</h2>
            <p className="sb-body">{t.problem.p1}</p>
            <p className="sb-body">{t.problem.p2}</p>
          </div>
        </section>

        {/* ── USER STORIES ── */}
        <section className="sb-section">
          <div className="sb-pad-b">
            <h2 className="sb-h2">{t.stories.heading}</h2>
            <p className="sb-body">{t.stories.intro}</p>
            <div style={{ marginTop:40 }}>
              {t.stories.items.map(s => (
                <div key={s.num} className="sb-story">
                  <div className="sb-story-num">{s.num}</div>
                  <div>
                    <div className="sb-story-badge">{t.stories.badge}</div>
                    <div className="sb-story-title">{s.title}</div>
                    <p className="sb-story-text">
                      <strong>{t.stories.kw.as}</strong> {s.as}, <strong>{t.stories.kw.want}</strong> {s.want}, <strong>{t.stories.kw.soThat}</strong> {s.soThat}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESO ── */}
        <section className="sb-section">
          <div className="sb-pad-b">
            <h2 className="sb-h2">{t.process.heading}</h2>
            <p className="sb-body">{t.process.intro}</p>
          </div>
          <div className="sb-steps">
            {t.process.steps.map(s => (
              <div key={s.name} className="sb-step">
                <div className="sb-step-name">{s.name}</div>
                <div className="sb-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WIREFRAME ── */}
        <section className="sb-section">
          <div className="sb-pad">
            <h2 className="sb-h2">{t.wireframe.heading}</h2>
            <p className="sb-body">{t.wireframe.text}</p>
            <div className="sb-img-wrap">
              <img src="/Images/Substrack/Wireframe%20Substrack.png" alt="Wireframe Substrack" className="sb-img" />
              <div className="sb-img-cap">{t.wireframe.caption}</div>
            </div>
          </div>
        </section>

        {/* ── ATOMIC DESIGN ── */}
        <section className="sb-section">
          <div className="sb-pad-b">
            <h2 className="sb-h2">{t.atomic.heading}</h2>
            <p className="sb-body">{t.atomic.intro}</p>
          </div>
          <div className="sb-atomic">
            {t.atomic.blocks.map(b => (
              <div key={b.title} className="sb-atomic-block">
                <span className="sb-atomic-icon">{b.icon}</span>
                <div className="sb-atomic-title">{b.title}</div>
                <p className="sb-atomic-text">{b.text}</p>
                <div className="sb-atomic-tags">
                  {b.tags.map(tag => <span key={tag} className="sb-atomic-tag">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="sb-pad" style={{ paddingTop:40 }}>
            <div style={{ height:'200px', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(239,235,225,.5)', border:'3px solid var(--ink)', fontFamily:'var(--mono)', fontSize:'13px', letterSpacing:'.1em', textTransform:'uppercase', color:'#7a7770' }}>
              {t.atomic.placeholder}
            </div>
            <div className="sb-img-cap" style={{ marginTop:12 }}>{t.atomic.caption}</div>
          </div>
        </section>

        {/* ── COMPONENTES ── */}
        <section className="sb-section">
          <div className="sb-pad">
            <h2 className="sb-h2">{t.components.heading}</h2>
            <p className="sb-body">{t.components.text}</p>
            <div className="sb-img-wrap">
              <img src="/Images/Substrack/Components%20Substrack.png" alt="Componentes" className="sb-img" />
              <div className="sb-img-cap">{t.components.caption}</div>
            </div>
          </div>
        </section>

        {/* ── TIPOGRAFÍA ── */}
        <section className="sb-section">
          <div className="sb-pad">
            <h2 className="sb-h2">{t.typo.heading}</h2>
            <p className="sb-body">{t.typo.text}</p>
            <div className="sb-typo-table">
              <div className="sb-typo-head">
                {t.typo.cols.map(c => <span key={c}>{c}</span>)}
              </div>
              <div className="sb-typo-row"><span className="stc">H1</span><span className="stc">Poppins</span><span className="stc">Semibold</span><span className="stc">32px</span><span style={{ fontFamily:"'Poppins',sans-serif", fontSize:'26px', fontWeight:600 }}>Module</span></div>
              <div className="sb-typo-row"><span className="stc">H2</span><span className="stc">Poppins</span><span className="stc">Medium</span><span className="stc">24px</span><span style={{ fontFamily:"'Poppins',sans-serif", fontSize:'20px', fontWeight:500 }}>Subscription product</span></div>
              <div className="sb-typo-row"><span className="stc">Label</span><span className="stc">Poppins</span><span className="stc">Semibold</span><span className="stc">14px</span><span style={{ fontFamily:"'Poppins',sans-serif", fontSize:'14px', fontWeight:600 }}>{lang==='es'?'Producto · Estado · Plan':'Product · Status · Plan'}</span></div>
              <div className="sb-typo-row"><span className="stc">Body</span><span className="stc">Poppins</span><span className="stc">Regular</span><span className="stc">14px</span><span style={{ fontFamily:"'Poppins',sans-serif", fontSize:'14px', color:'#555' }}>Netflix · {lang==='es'?'Activa':'Active'} · 15 Jun · Premium · $18</span></div>
              <div className="sb-typo-row"><span className="stc">Caption</span><span className="stc">Poppins</span><span className="stc">Regular</span><span className="stc">12px</span><span style={{ fontFamily:"'Poppins',sans-serif", fontSize:'12px', color:'#888' }}>Detail — {lang==='es'?'Texto de soporte':'Support text'}</span></div>
            </div>
          </div>
        </section>

        {/* ── UI FINAL ── */}
        <section className="sb-section">
          <div className="sb-pad">
            <h2 className="sb-h2">{lang==='es'?'El prototipo navegable':'The navigable prototype'}</h2>
            <p className="sb-body">
              {lang==='es'
                ? 'La pantalla principal con sidebar negro, botón primario púrpura, tabla de membresías con filtros Activas / Inactivas / Por vencer y panel de detalle lateral con acciones. Verificado en 1440px y 1024px.'
                : 'The main screen with a black sidebar, purple primary button, memberships table with Active / Inactive / Expiring filters, and a side detail panel with actions. Verified at 1440px and 1024px.'}
            </p>
            <div className="sb-img-wrap">
              <img src="/Images/Substrack/Ui%20Substrack.png" alt="UI Final" className="sb-img" />
              <div className="sb-img-cap">{lang==='es'?'Prototipo final — pantalla principal navegable':'Final prototype — navigable main screen'}</div>
            </div>
          </div>
        </section>

        {/* ── DECISIONES ── */}
        <section className="sb-section">
          <div className="sb-pad-b">
            <h2 className="sb-h2">{t.decisions.heading}</h2>
          </div>
          <div className="sb-decs">
            {t.decisions.items.map(d => (
              <div key={d.title} className="sb-dec">
                <span className="sb-dec-icon">{d.icon}</span>
                <div className="sb-dec-title">{d.title}</div>
                <p className="sb-dec-text">{d.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── RESULTADOS ── */}
        <section className="sb-section">
          <div className="sb-pad-b">
            <h2 className="sb-h2">{t.results.heading}</h2>
          </div>
          <div className="sb-results">
            {t.results.items.map(r => (
              <div key={r.label} className="sb-result">
                <span className="sb-result-num">{r.num}<span>{r.span}</span></span>
                <div className="sb-result-label">{r.label}</div>
                <div className="sb-result-desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── APRENDIZAJES ── */}
        <section className="sb-section">
          <div className="sb-pad">
            <h2 className="sb-h2">{t.learnings.heading}</h2>
            <div style={{ marginTop:40 }}>
              {t.learnings.items.map(item => (
                <div key={item.n} className="sb-learn-item">
                  <div className="sb-learn-num">{item.n}</div>
                  <div>
                    <div className="sb-learn-title">{item.title}</div>
                    <p className="sb-learn-text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEXT PROJECT ── */}
        <div className="sb-next">
          <span className="sb-next-label">{t.next.label}</span>
          <Link href="/projects/esdesign" className="sb-next-title">{t.next.title}</Link>
        </div>

        <div className="sb-footer">
          <span>{t.footer.copy1}</span>
          <span>{t.footer.copy2}</span>
        </div>

      </div>
    </>
  );
}
