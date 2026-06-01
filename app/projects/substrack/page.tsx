'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  .sb-page {
    --bg: #F5F2ED;
    --ink: #0F0E0C;
    --muted: #6B6860;
    --rule: #D8D4CC;
    --card: #EDEAE3;
    --purple: #7B2FBE;
    --purple-light: #f3eaff;
    --purple-dim: rgba(123,47,190,.12);
    --sb-black: #0F0E0C;
    --display: 'Bebas Neue', sans-serif;
    --mono: 'DM Mono', monospace;
    --body: 'DM Sans', sans-serif;
    --poppins: 'Poppins', sans-serif;
    background: var(--bg);
    color: var(--ink);
    font-family: var(--body);
    overflow-x: hidden;
    min-height: 100vh;
  }

  .sb-page section { border-bottom: 1px solid var(--rule); }
  @keyframes sb-up { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }

  /* NAV — Habita style */
  .sb-page nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 48px;
    background: rgba(245,242,237,0.92); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--rule);
  }
  .sb-nav-back {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--muted); text-decoration: none;
    transition: color 0.2s;
  }
  .sb-nav-back:hover { color: var(--purple); }
  .sb-nav-back:hover svg { transform: translateX(-4px); }
  .sb-nav-back svg { transition: transform 0.2s; }
  .sb-nav-right { display: flex; align-items: center; gap: 20px; }
  .sb-nav-logo { height: 36px; width: auto; display: block; }
  .sb-lang-toggle { display: flex; align-items: center; gap: 6px; }
  .sb-lang-btn {
    font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em;
    text-transform: uppercase; background: none; border: none; padding: 2px 0;
    transition: color 0.2s; cursor: pointer;
  }
  .sb-lang-btn.active  { color: var(--ink); font-weight: 600; cursor: default; }
  .sb-lang-btn.inactive { color: var(--muted); }
  .sb-lang-btn.inactive:hover { color: var(--purple); }
  .sb-lang-sep { font-family: var(--mono); font-size: 10px; color: var(--muted); opacity: 0.4; user-select: none; }

  /* HERO */
  .hero { min-height:100vh; padding:120px 48px 80px; display:grid; grid-template-columns:1fr 1fr; align-items:center; gap:80px; background:#0F0E0C; position:relative; overflow:hidden; border-bottom:1px solid rgba(255,255,255,.06); }
  .hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 75% 50%, rgba(123,47,190,.14), transparent 60%); pointer-events:none; }
  .hero-meta { display:flex; align-items:center; gap:12px; margin-bottom:28px; opacity:0; animation:sb-up .8s .2s forwards; }
  .h-num { font-family:var(--mono); font-size:11px; letter-spacing:.2em; color:var(--purple); }
  .h-tag { font-family:var(--mono); font-size:9px; letter-spacing:.15em; text-transform:uppercase; padding:4px 10px; border:1px solid rgba(123,47,190,.4); color:rgba(123,47,190,.8); border-radius:2px; }
  .project-title { font-family:var(--display); font-size:clamp(72px,10vw,160px); line-height:.9; color:white; opacity:0; animation:sb-up 1s .3s forwards; }
  .project-title span { color:var(--purple); display:block; }
  .hero-tagline { font-size:17px; line-height:1.65; color:rgba(255,255,255,.5); max-width:400px; margin-top:20px; opacity:0; animation:sb-up .9s .45s forwards; }
  .hero-chips { display:flex; flex-wrap:wrap; gap:8px; margin-top:28px; opacity:0; animation:sb-up .9s .55s forwards; }
  .chip { font-family:var(--mono); font-size:9px; letter-spacing:.12em; text-transform:uppercase; padding:5px 12px; border:1px solid rgba(255,255,255,.15); color:rgba(255,255,255,.45); border-radius:2px; }

  /* Hero UI mock */
  .hero-ui { opacity:0; animation:sb-up 1.1s .5s forwards; background:#fff; border-radius:10px; overflow:hidden; border:1px solid rgba(255,255,255,.1); box-shadow:0 24px 80px rgba(0,0,0,.5); }
  .ui-topbar { background:#f0f0f0; padding:8px 14px; display:flex; align-items:center; gap:6px; }
  .ui-dot { width:9px; height:9px; border-radius:50%; }
  .ui-body { display:flex; height:260px; }
  .ui-sidebar { width:60px; background:var(--sb-black); display:flex; flex-direction:column; align-items:center; padding:14px 0; gap:20px; }
  .ui-logo { font-family:var(--display); font-size:16px; color:white; letter-spacing:.03em; }
  .ui-nav-icon { width:22px; height:22px; border-radius:5px; background:rgba(255,255,255,.08); }
  .ui-nav-icon.active { background:var(--purple); }
  .ui-main { flex:1; padding:14px 16px; display:flex; flex-direction:column; gap:8px; border-right:1px solid #eee; overflow:hidden; }
  .ui-header { display:flex; align-items:center; gap:8px; }
  .ui-title { font-family:var(--display); font-size:18px; color:var(--ink); flex:1; }
  .ui-search { flex:2; border:1px solid #ddd; border-radius:20px; padding:5px 10px; font-size:10px; color:#aaa; font-family:var(--poppins); background:#fafafa; }
  .ui-btn { background:var(--purple); color:white; border-radius:20px; padding:5px 14px; font-size:10px; font-family:var(--poppins); font-weight:500; white-space:nowrap; }
  .ui-filters { display:flex; gap:6px; }
  .ui-pill { border:1px solid #ccc; border-radius:20px; padding:3px 10px; font-size:9px; color:#888; font-family:var(--poppins); }
  .ui-pill.active { border-color:var(--purple); color:var(--purple); background:var(--purple-light); }
  .ui-thead { display:grid; grid-template-columns:2fr 1fr 1.5fr 1fr 1fr; background:#e8e8e8; padding:5px 8px; border-radius:3px; gap:4px; margin-bottom:2px; }
  .ui-thead span { font-size:9px; font-weight:600; color:#444; font-family:var(--poppins); }
  .ui-trow { display:grid; grid-template-columns:2fr 1fr 1.5fr 1fr 1fr; padding:5px 8px; border-bottom:1px solid #f0f0f0; gap:4px; }
  .ui-trow span { font-size:9px; color:#555; font-family:var(--poppins); }
  .ui-detail { width:150px; padding:14px 12px; display:flex; flex-direction:column; gap:8px; }
  .ui-detail-title { font-family:var(--display); font-size:15px; line-height:1.1; color:var(--ink); }
  .ui-detail-row { border-bottom:1px solid #f0f0f0; padding-bottom:5px; }
  .ui-detail-row .dl { font-size:8px; color:#aaa; text-transform:uppercase; letter-spacing:.08em; font-family:var(--mono); }
  .ui-detail-row .dv { font-size:10px; color:#333; font-weight:500; font-family:var(--poppins); }
  .ui-action { margin-top:auto; border:1px solid var(--purple); color:var(--purple); border-radius:4px; padding:5px; font-size:9px; text-align:center; font-family:var(--mono); }

  /* INFO BAR */
  .info-bar { display:grid; grid-template-columns:repeat(4,1fr); border-bottom:1px solid var(--rule); }
  .info-cell { padding:32px 48px; border-right:1px solid var(--rule); opacity:0; transform:translateY(16px); transition:opacity .5s, transform .5s; }
  .info-cell.visible { opacity:1; transform:none; }
  .info-cell:last-child { border-right:none; }
  .ic-label { font-family:var(--mono); font-size:9px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); margin-bottom:6px; }
  .ic-val { font-family:var(--display); font-size:22px; letter-spacing:.02em; color:var(--ink); }

  /* SECTIONS */
  .s-intro { padding:80px 48px; display:grid; grid-template-columns:200px 1fr; gap:80px; align-items:start; }
  .s-label { font-family:var(--mono); font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted); display:flex; align-items:center; gap:10px; position:sticky; top:100px; align-self:start; }
  .s-label::before { content:''; display:inline-block; width:20px; height:1px; background:var(--muted); }
  .s-headline { font-family:var(--display); font-size:clamp(36px,4vw,56px); line-height:1; color:var(--ink); margin-bottom:16px; }
  .s-text { font-size:16px; line-height:1.75; color:var(--muted); max-width:600px; }
  .s-text + .s-text { margin-top:14px; }

  /* USER STORIES */
  .stories-grid { margin-top:40px; display:flex; flex-direction:column; gap:0; }
  .story-item { display:grid; grid-template-columns:32px 1fr; gap:24px; padding:24px 0; border-bottom:1px solid var(--rule); align-items:start; opacity:0; transform:translateX(-16px); transition:opacity .5s, transform .5s; }
  .story-item.visible { opacity:1; transform:none; }
  .story-item:last-child { border-bottom:none; }
  .story-num { font-family:var(--display); font-size:28px; line-height:1; color:var(--rule); }
  .story-title { font-family:var(--display); font-size:22px; letter-spacing:.02em; color:var(--ink); margin-bottom:8px; }
  .story-text { font-size:14px; line-height:1.7; color:var(--muted); max-width:580px; }
  .story-text strong { color:var(--purple); font-weight:500; }
  .story-badge { display:inline-flex; align-items:center; gap:6px; font-family:var(--mono); font-size:9px; letter-spacing:.12em; text-transform:uppercase; color:#2D8B6F; background:rgba(45,139,111,.1); border:1px solid rgba(45,139,111,.25); padding:3px 8px; border-radius:2px; margin-bottom:10px; }

  /* PROCESS STEPS */
  .steps-grid { display:grid; grid-template-columns:repeat(4,1fr); border-top:1px solid var(--rule); }
  .step-block { padding:36px 32px; border-right:1px solid var(--rule); opacity:0; transform:translateY(20px); transition:opacity .5s, transform .5s; }
  .step-block.visible { opacity:1; transform:none; }
  .step-block:last-child { border-right:none; }
  .step-num { font-family:var(--mono); font-size:9px; letter-spacing:.2em; color:white; background:var(--purple); padding:3px 8px; border-radius:2px; display:inline-block; margin-bottom:14px; }
  .step-name { font-family:var(--display); font-size:22px; letter-spacing:.02em; color:var(--ink); margin-bottom:8px; }
  .step-desc { font-size:13px; line-height:1.6; color:var(--muted); }

  /* IMAGES */
  .img-section { padding:80px 48px; }
  .img-full { width:100%; border-radius:8px; border:1px solid var(--rule); display:block; opacity:0; transform:translateY(20px); transition:opacity .6s, transform .6s; }
  .img-full.visible { opacity:1; transform:none; }
  .img-caption { font-family:var(--mono); font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-top:12px; }

  /* ATOMIC DESIGN */
  .atomic-grid { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid var(--rule); }
  .atomic-block { padding:40px 36px; border-right:1px solid var(--rule); opacity:0; transform:translateY(16px); transition:opacity .5s, transform .5s; }
  .atomic-block.visible { opacity:1; transform:none; }
  .atomic-block:last-child { border-right:none; }
  .atomic-icon { font-size:28px; display:block; margin-bottom:14px; }
  .atomic-title { font-family:var(--display); font-size:26px; letter-spacing:.02em; color:var(--ink); margin-bottom:10px; }
  .atomic-text { font-size:14px; line-height:1.65; color:var(--muted); }
  .atomic-examples { display:flex; flex-wrap:wrap; gap:6px; margin-top:12px; }
  .atomic-tag { font-family:var(--mono); font-size:9px; letter-spacing:.1em; padding:3px 8px; border:1px solid var(--rule); color:var(--muted); border-radius:2px; }

  /* TYPOGRAPHY */
  .typo-section { padding:80px 48px; }
  .typo-table { margin-top:40px; border:1px solid var(--rule); border-radius:4px; overflow:hidden; }
  .typo-head { display:grid; grid-template-columns:80px 140px 100px 80px 1fr; background:var(--purple); padding:12px 20px; gap:8px; }
  .typo-head span { font-family:var(--mono); font-size:9px; letter-spacing:.15em; text-transform:uppercase; color:rgba(255,255,255,.7); }
  .typo-row { display:grid; grid-template-columns:80px 140px 100px 80px 1fr; padding:16px 20px; gap:8px; border-bottom:1px solid var(--rule); align-items:center; opacity:0; transform:translateX(-12px); transition:opacity .4s, transform .4s; }
  .typo-row.visible { opacity:1; transform:none; }
  .typo-row:last-child { border-bottom:none; }
  .typo-row:nth-child(even) { background:var(--card); }
  .tc { font-size:13px; color:var(--muted); font-family:var(--mono); }
  .te { font-family:'Poppins', sans-serif; color:var(--ink); }

  /* DECISIONS */
  .decisions-grid { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid var(--rule); }
  .dec-block { padding:48px; border-right:1px solid var(--rule); opacity:0; transform:translateY(16px); transition:opacity .5s, transform .5s; }
  .dec-block.visible { opacity:1; transform:none; }
  .dec-block:last-child { border-right:none; }
  .dec-icon { font-size:24px; display:block; margin-bottom:14px; color:var(--purple); }
  .dec-title { font-family:var(--display); font-size:24px; letter-spacing:.02em; color:var(--ink); margin-bottom:10px; }
  .dec-text { font-size:14px; line-height:1.65; color:var(--muted); }

  /* RESULTS */
  .results-grid { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid var(--rule); }
  .res-block { padding:48px; border-right:1px solid var(--rule); opacity:0; transform:translateY(20px); transition:opacity .6s, transform .6s; }
  .res-block.visible { opacity:1; transform:none; }
  .res-block:last-child { border-right:none; }
  .res-num { font-family:var(--display); font-size:72px; line-height:1; color:var(--ink); display:block; }
  .res-num span { color:var(--purple); }
  .res-label { font-family:var(--mono); font-size:10px; letter-spacing:.15em; text-transform:uppercase; color:var(--muted); margin-top:8px; }
  .res-desc { font-size:14px; color:var(--muted); margin-top:8px; line-height:1.5; }

  /* LEARNINGS */
  .learn-wrap { padding:80px 48px; }
  .learn-item { display:grid; grid-template-columns:80px 1fr; gap:32px; padding:32px 0; border-bottom:1px solid var(--rule); align-items:start; opacity:0; transform:translateX(-16px); transition:opacity .5s, transform .5s; }
  .learn-item.visible { opacity:1; transform:none; }
  .learn-item:last-child { border-bottom:none; }
  .learn-n { font-family:var(--display); font-size:48px; line-height:1; color:var(--rule); }
  .learn-title { font-family:var(--display); font-size:28px; letter-spacing:.02em; color:var(--ink); margin-bottom:8px; }
  .learn-text { font-size:15px; line-height:1.7; color:var(--muted); max-width:600px; }

  /* NEXT */
  .next-wrap { padding:80px 48px; display:flex; justify-content:space-between; align-items:center; background:var(--purple); }
  .next-label { font-family:var(--mono); font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.5); display:block; margin-bottom:10px; }
  .next-title { font-family:var(--display); font-size:clamp(48px,6vw,80px); line-height:1; color:white; text-decoration:none; display:block; transition:opacity .2s; }
  .next-title:hover { opacity:.75; }
  .next-arrow { width:64px; height:64px; border:1px solid rgba(255,255,255,.3); border-radius:50%; display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,.6); text-decoration:none; transition:background .2s, color .2s; }
  .next-arrow:hover { background:white; color:var(--purple); }
  .sb-footer { padding:24px 48px; display:flex; justify-content:space-between; background:#2a0a4a; border-top:1px solid rgba(255,255,255,.08); }
  .sb-footer span { font-family:var(--mono); font-size:10px; letter-spacing:.1em; color:rgba(255,255,255,.3); }

  /* DELAYS */
  .step-block:nth-child(2){transition-delay:.1s;} .step-block:nth-child(3){transition-delay:.2s;} .step-block:nth-child(4){transition-delay:.3s;}
  .info-cell:nth-child(2){transition-delay:.1s;} .info-cell:nth-child(3){transition-delay:.2s;} .info-cell:nth-child(4){transition-delay:.3s;}
  .story-item:nth-child(2){transition-delay:.05s;} .story-item:nth-child(3){transition-delay:.1s;} .story-item:nth-child(4){transition-delay:.15s;} .story-item:nth-child(5){transition-delay:.2s;} .story-item:nth-child(6){transition-delay:.25s;}
  .atomic-block:nth-child(2){transition-delay:.1s;} .atomic-block:nth-child(3){transition-delay:.2s;}
  .dec-block:nth-child(2){transition-delay:.1s;} .dec-block:nth-child(3){transition-delay:.2s;}
  .res-block:nth-child(2){transition-delay:.1s;} .res-block:nth-child(3){transition-delay:.2s;}
  .learn-item:nth-child(2){transition-delay:.1s;} .learn-item:nth-child(3){transition-delay:.2s;}
  .typo-row:nth-child(2){transition-delay:.05s;} .typo-row:nth-child(3){transition-delay:.1s;} .typo-row:nth-child(4){transition-delay:.15s;} .typo-row:nth-child(5){transition-delay:.2s;}
`;

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  es: {
    nav: { back: 'Volver al portafolio' },
    hero: {
      tagline: 'Dashboard para centralizar todas las suscripciones activas — streaming, gimnasios, plataformas IA — con gestión de estado, búsqueda y panel de detalle en una sola vista.',
    },
    infoBar: [
      { label: 'Tipo',       value: 'Web App' },
      { label: 'Contexto',   value: 'Bootcamp TripleTen' },
      { label: 'Rol',        value: 'UI Designer' },
      { label: 'Tipografía', value: 'Poppins' },
    ],
    uiMock: { title: 'Module', search: 'Nombre de la membresía...', filters: ['Activas', 'Inactivas', 'Por vencer'], search_btn: 'Buscar', rows: ['Activa', 'Activa', 'Vence', 'Activa'], detail: [['Proveedor','Netflix Inc.'],['Ciclo','Mensual'],['Próx. cobro','15 Jun'],['Total/año','$216']], action: 'Acciones ▾' },
    problem: {
      label: 'El problema', heading: 'El cobro que nadie espera',
      p1: 'Los usuarios acumulan suscripciones en múltiples servicios — streaming, gimnasios, herramientas de trabajo, plataformas IA — sin una vista unificada de lo que pagan ni cuándo se renueva cada una. El resultado son cobros inesperados, servicios olvidados y ningún control real sobre el gasto mensual recurrente.',
      p2: 'Substrack centraliza todo en un único dashboard: búsqueda rápida, filtros por estado, tabla de gestión y panel de detalle por suscripción — sin cambiar de pantalla.',
    },
    stories: {
      label: 'User Stories', heading: '6 necesidades del usuario',
      intro: 'El diseño partió de historias de usuario reales en formato Como / Quiero / Para — cada una validada antes de avanzar al wireframe.',
      badge: '✓ Completada',
      kw: { as: 'Como', want: 'quiero', soThat: 'para' },
      items: [
        { num:'01', title:'Navegación fija',       as:'usuario de la aplicación',              want:'tener siempre visible una barra de navegación con accesos clave',                                soThat:'poder acceder rápidamente a funciones esenciales sin perder el contexto actual.' },
        { num:'02', title:'Vista lista + detalle', as:'usuario que gestiona varias suscripciones', want:'ver en un mismo espacio el listado y el detalle de la seleccionada',                          soThat:'no tener que cambiar de pantalla cada vez que quiera consultar una.' },
        { num:'03', title:'Cambio de estado',      as:'usuario que necesita organizar sus servicios', want:'poder alternar entre suscripciones activas, inactivas y por vencer mediante filtros',     soThat:'segmentar la información de manera clara sin perder el contexto.' },
        { num:'04', title:'Búsqueda rápida',       as:'usuario con muchas suscripciones registradas', want:'contar con un campo de búsqueda visible en la pantalla principal',                       soThat:'encontrar rápidamente una suscripción específica por su nombre.' },
        { num:'05', title:'Gestión de suscripción',as:'usuario que administra sus propios gastos',   want:'poder editar, cancelar o ver detalles directamente desde la vista de detalle',             soThat:'tomar decisiones sin navegar por menús complejos.' },
        { num:'06', title:'Escalabilidad futura',  as:'usuario que seguirá usando esta app a largo plazo', want:'que la interfaz tenga una estructura clara y modular',                               soThat:'cuando se agreguen nuevas secciones no se rompa la lógica de navegación.' },
      ],
    },
    process: {
      label: 'Proceso', heading: 'De las historias a la interfaz',
      intro: 'Cuatro etapas progresivas — cada una construida sobre la anterior, sin saltar pasos.',
      steps: [
        { num:'01', name:'User Stories',   desc:'6 historias Como/Quiero/Para que definieron los requisitos funcionales antes de abrir Figma.' },
        { num:'02', name:'Wireframe',      desc:'Estructura de 3 columnas en gris: sidebar de nav, módulo principal con búsqueda y filtros, panel de detalle.' },
        { num:'03', name:'Atomic Design',  desc:'8 pasos de construcción en Figma: análisis atómico, autolayout, componentes reutilizables y verificación responsive.' },
        { num:'04', name:'UI Final',       desc:'App navegable con sidebar negro, botón púrpura, tabla de datos y panel de detalle con acciones.' },
      ],
    },
    wireframe: {
      label: 'Wireframe', heading: 'La estructura antes del color',
      text: 'Resolver la arquitectura de 3 columnas en gris antes de aplicar visual garantizó que cada decisión de UI tuviera una razón estructural detrás.',
      caption: 'Wireframe — estructura de 3 columnas: sidebar / módulo principal / panel de detalle',
    },
    atomic: {
      label: 'Atomic Design', heading: 'Construido de lo pequeño a lo grande',
      intro: 'El proyecto aplicó los 8 pasos del proceso de construcción en Figma — desde identificar átomos hasta verificar el responsive en 1024px.',
      blocks: [
        { icon:'◎', title:'Átomos',     text:'Los elementos más pequeños: inputs, botones individuales, chips, iconos y celdas de tabla. Cada uno nombrado por su función usando kebab-case.', tags:['input-search','btn-primary','chip-filter','table-cell','icon-bell'] },
        { icon:'▦', title:'Moléculas',  text:'Combinaciones de átomos con autolayout: la barra de búsqueda con botón, la fila de filtros, el header del módulo y la fila completa de tabla.',     tags:['search-bar','filter-row','table-row','module-header'] },
        { icon:'◈', title:'Organismos', text:'Secciones completas de la interfaz: la tabla con su header y filas, el panel de detalle con todos sus campos, y el sidebar de navegación completo.',  tags:['data-table','detail-panel','nav-sidebar','actions-table'] },
      ],
      placeholder: 'Checklist Atomic Design — Figma',
      caption: 'Checklist de 8 pasos de construcción — todos completados',
    },
    components: {
      label: 'Componentes', heading: 'Sistema de componentes documentado',
      text: 'Tabla, inputs con 5 estados, botones en 6 variantes, chips, dropdowns, iconos y sidebar — cada componente creado como instancia reutilizable en Figma.',
      caption: 'Componentes — tabla, inputs, botones, chips, dropdown, iconos, sidebar',
    },
    typo: {
      label: 'Tipografía', heading: 'Poppins — limpia y legible',
      text: 'Una sola familia tipográfica en toda la app. Poppins Regular garantiza legibilidad en tablas densas de datos sin sacrificar elegancia. Los pesos se usan para jerarquía, no familias distintas.',
      cols: ['Nivel','Familia','Peso','Tamaño','Uso en Substrack'],
    },
    decisions: {
      label: 'Decisiones de diseño', heading: 'Por qué cada elección',
      items: [
        { icon:'◈', title:'3 columnas sin navegación entre páginas', text:'Sidebar + tabla + detalle en una sola vista cumple directamente la User Story 02: ver listado y detalle simultáneamente. Elimina el flujo de ir y volver que genera frustración en apps de gestión de datos.' },
        { icon:'◉', title:'Púrpura como único color de acción',      text:'En un dashboard con mucho texto y datos, un solo color de acción evita la fatiga visual. El púrpura del botón "Buscar" y el chip activo son los únicos elementos que piden atención inmediata del usuario.' },
        { icon:'▦', title:'Autolayout desde el átomo',               text:'Cada componente fue construido con autolayout y fill container / hug contents correctamente configurados. Resultado: la interfaz se adapta de 1440px a 1024px sin romper ningún elemento. Escalabilidad desde el día uno.' },
      ],
    },
    results: {
      label: 'Resultados', heading: 'Lo que se entregó',
      items: [
        { num:'6', span:'/6',      label:'User Stories implementadas',       desc:'Cada historia de usuario se tradujo en una decisión de diseño visible en la pantalla final.' },
        { num:'8', span:' pasos',  label:'De construcción en Figma',         desc:'Análisis atómico, autolayout, componentes reutilizables, instancias y verificación responsive completados.' },
        { num:'2', span:'px',      label:'Breakpoints verificados',           desc:'1440px y 1024px — la interfaz se comporta correctamente en ambos anchos gracias al sistema de autolayout.' },
      ],
    },
    learnings: {
      label: 'Aprendizajes', heading: 'Lo que me dejó',
      items: [
        { n:'01', title:'Las User Stories evitan el diseño arbitrario',       text:'Empezar con 6 historias de usuario antes de abrir Figma dio una razón justificable para cada decisión. La estructura de 3 columnas no fue un capricho visual — fue la respuesta directa a "quiero ver listado y detalle sin cambiar de pantalla".' },
        { n:'02', title:'El autolayout es la base del responsive, no el final', text:'Configurar fill container y hug contents desde el primer átomo hizo que el responsive de 1440 a 1024px fuera casi automático. Los proyectos que aplican autolayout al final siempre tienen que rehacerlo todo.' },
        { n:'03', title:'Nombrar las capas es documentar el sistema',           text:'Usar kebab-case funcional (cards-container, inputs-container, actions-table) hizo que el archivo de Figma fuera navegable para cualquier diseñador o desarrollador que lo abriera sin contexto previo. El naming no es cosmético — es arquitectura.' },
      ],
    },
    next:   { label: 'Siguiente proyecto', title: 'EsDesign Login →' },
    footer: { copy1: 'Juan Jose Bernal Núñez — UX/UI Designer', copy2: 'Substrack · Proyecto 02 / 10' },
  },

  en: {
    nav: { back: 'Back to portfolio' },
    hero: {
      tagline: 'Dashboard to centralize all active subscriptions — streaming, gyms, AI platforms — with status management, search, and a detail panel in a single view.',
    },
    infoBar: [
      { label: 'Type',        value: 'Web App' },
      { label: 'Context',     value: 'TripleTen Bootcamp' },
      { label: 'Role',        value: 'UI Designer' },
      { label: 'Typography',  value: 'Poppins' },
    ],
    uiMock: { title: 'Module', search: 'Membership name...', filters: ['Active', 'Inactive', 'Expiring'], search_btn: 'Search', rows: ['Active', 'Active', 'Expires', 'Active'], detail: [['Provider','Netflix Inc.'],['Cycle','Monthly'],['Next charge','Jun 15'],['Year total','$216']], action: 'Actions ▾' },
    problem: {
      label: 'The problem', heading: 'The charge nobody expected',
      p1: 'Users accumulate subscriptions across multiple services — streaming, gyms, work tools, AI platforms — with no unified view of what they pay or when each one renews. The result: unexpected charges, forgotten services, and zero real control over monthly recurring spend.',
      p2: 'Substrack centralizes everything in one dashboard: fast search, status filters, a management table, and a per-subscription detail panel — without switching screens.',
    },
    stories: {
      label: 'User Stories', heading: '6 user needs',
      intro: 'The design started from real user stories in As / I want / So that format — each one validated before moving to wireframe.',
      badge: '✓ Done',
      kw: { as: 'As', want: 'I want', soThat: 'so that' },
      items: [
        { num:'01', title:'Fixed navigation',        as:'an app user',                                    want:'to always see a navigation bar with key access points',                          soThat:'I can quickly reach essential functions without losing my current context.' },
        { num:'02', title:'List + detail view',      as:'a user managing multiple subscriptions',          want:'to see both the list and the selected item\'s detail in one place',              soThat:'I don\'t have to switch screens every time I want to check on one.' },
        { num:'03', title:'Status switching',        as:'a user who needs to organize their services',     want:'to toggle between active, inactive, and expiring subscriptions using filters',   soThat:'I can segment information clearly without losing context.' },
        { num:'04', title:'Quick search',            as:'a user with many registered subscriptions',       want:'to have a visible search field on the main screen',                             soThat:'I can quickly find a specific subscription by name.' },
        { num:'05', title:'Subscription management', as:'a user managing my own expenses',                 want:'to edit, cancel, or view details directly from the detail view',                soThat:'I can make decisions without navigating complex menus.' },
        { num:'06', title:'Future scalability',      as:'a user who will keep using this app long-term',   want:'the interface to have a clear, modular structure',                              soThat:'when new sections are added, the navigation logic doesn\'t break.' },
      ],
    },
    process: {
      label: 'Process', heading: 'From stories to interface',
      intro: 'Four progressive stages — each built on top of the previous one, no steps skipped.',
      steps: [
        { num:'01', name:'User Stories',   desc:'6 As/I want/So that stories that defined functional requirements before opening Figma.' },
        { num:'02', name:'Wireframe',      desc:'3-column structure in grey: nav sidebar, main module with search and filters, detail panel.' },
        { num:'03', name:'Atomic Design',  desc:'8 build steps in Figma: atomic analysis, autolayout, reusable components and responsive verification.' },
        { num:'04', name:'Final UI',       desc:'Navigable app with black sidebar, purple button, data table and detail panel with actions.' },
      ],
    },
    wireframe: {
      label: 'Wireframe', heading: 'Structure before color',
      text: 'Solving the 3-column architecture in grey before applying visuals ensured every UI decision had a structural reason behind it.',
      caption: 'Wireframe — 3-column structure: sidebar / main module / detail panel',
    },
    atomic: {
      label: 'Atomic Design', heading: 'Built from small to large',
      intro: 'The project applied all 8 build steps in Figma — from identifying atoms all the way to verifying responsive at 1024px.',
      blocks: [
        { icon:'◎', title:'Atoms',     text:'The smallest elements: inputs, individual buttons, chips, icons, and table cells. Each named by function using kebab-case.',       tags:['input-search','btn-primary','chip-filter','table-cell','icon-bell'] },
        { icon:'▦', title:'Molecules', text:'Atom combinations with autolayout: the search bar with button, the filter row, the module header, and the full table row.',           tags:['search-bar','filter-row','table-row','module-header'] },
        { icon:'◈', title:'Organisms', text:'Complete interface sections: the table with header and rows, the detail panel with all fields, and the full navigation sidebar.',      tags:['data-table','detail-panel','nav-sidebar','actions-table'] },
      ],
      placeholder: 'Atomic Design Checklist — Figma',
      caption: '8-step build checklist — all completed',
    },
    components: {
      label: 'Components', heading: 'Documented component system',
      text: 'Table, inputs with 5 states, buttons in 6 variants, chips, dropdowns, icons and sidebar — each component built as a reusable instance in Figma.',
      caption: 'Components — table, inputs, buttons, chips, dropdown, icons, sidebar',
    },
    typo: {
      label: 'Typography', heading: 'Poppins — clean and readable',
      text: 'A single typeface throughout the app. Poppins Regular ensures readability in dense data tables without sacrificing elegance. Weights are used for hierarchy, not different families.',
      cols: ['Level','Family','Weight','Size','Use in Substrack'],
    },
    decisions: {
      label: 'Design decisions', heading: 'Why each choice',
      items: [
        { icon:'◈', title:'3 columns, no page navigation',       text:'Sidebar + table + detail in one view directly fulfills User Story 02: see list and detail simultaneously. It eliminates the back-and-forth flow that causes frustration in data management apps.' },
        { icon:'◉', title:'Purple as the only action color',     text:'In a dashboard with lots of text and data, a single action color prevents visual fatigue. The purple "Search" button and the active chip are the only elements asking for the user\'s immediate attention.' },
        { icon:'▦', title:'Autolayout from the atom',            text:'Every component was built with autolayout and fill container / hug contents correctly configured. Result: the interface adapts from 1440px to 1024px without breaking anything. Scalability from day one.' },
      ],
    },
    results: {
      label: 'Results', heading: 'What was delivered',
      items: [
        { num:'6', span:'/6',      label:'User Stories implemented',       desc:'Every user story was translated into a design decision visible in the final screen.' },
        { num:'8', span:' steps',  label:'Build steps in Figma',           desc:'Atomic analysis, autolayout, reusable components, instances and responsive verification — all completed.' },
        { num:'2', span:'px',      label:'Breakpoints verified',           desc:'1440px and 1024px — the interface behaves correctly at both widths thanks to the autolayout system.' },
      ],
    },
    learnings: {
      label: 'Learnings', heading: 'What I took away',
      items: [
        { n:'01', title:'User Stories prevent arbitrary design',         text:'Starting with 6 user stories before opening Figma gave a justifiable reason for every decision. The 3-column structure wasn\'t a visual whim — it was the direct response to "I want to see list and detail without switching screens".' },
        { n:'02', title:'Autolayout is the foundation of responsive, not the finish', text:'Setting fill container and hug contents from the first atom made the 1440 to 1024px responsive almost automatic. Projects that apply autolayout at the end always have to redo everything.' },
        { n:'03', title:'Naming layers is documenting the system',       text:'Using functional kebab-case (cards-container, inputs-container, actions-table) made the Figma file navigable for any designer or developer who opened it without prior context. Naming is not cosmetic — it\'s architecture.' },
      ],
    },
    next:   { label: 'Next project', title: 'EsDesign Login →' },
    footer: { copy1: 'Juan Jose Bernal Núñez — UX/UI Designer', copy2: 'Substrack · Project 02 / 10' },
  },
} as const;

type Lang = keyof typeof T;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SubstrackCaseStudy() {
  const { lang, setLang } = useLanguage();
  const t = T[lang as Lang];

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(
      '.info-cell,.step-block,.story-item,.atomic-block,.typo-row,.dec-block,.res-block,.learn-item,.img-full',
    ).forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="sb-page">

        {/* ── NAV — Habita style ── */}
        <nav>
          <Link href="/#projects" className="sb-nav-back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.nav.back}
          </Link>
          <div className="sb-nav-right">
            <img src="/Images/LogoJJB/Logo%20JJB%20negro.png" alt="JJB" className="sb-nav-logo" />
            <div className="sb-lang-toggle">
              <button className={`sb-lang-btn ${lang === 'es' ? 'active' : 'inactive'}`} onClick={() => setLang('es')}>ES</button>
              <span className="sb-lang-sep">·</span>
              <button className={`sb-lang-btn ${lang === 'en' ? 'active' : 'inactive'}`} onClick={() => setLang('en')}>EN</button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="hero">
          <div>
            <div className="hero-meta">
              <span className="h-num">02</span>
              <span className="h-tag">Web App</span>
              <span className="h-tag">Design System</span>
            </div>
            <h1 className="project-title">Sub<span>strack</span></h1>
            <p className="hero-tagline">{t.hero.tagline}</p>
            <div className="hero-chips">
              {['Figma','Poppins','Atomic Design','Autolayout','Responsive'].map(c => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </div>

          {/* Coded dashboard preview */}
          <div className="hero-ui">
            <div className="ui-topbar">
              <div className="ui-dot" style={{ background: '#ff5f57' }} />
              <div className="ui-dot" style={{ background: '#febc2e' }} />
              <div className="ui-dot" style={{ background: '#28c840' }} />
              <div style={{ flex: 1, background: '#ddd', borderRadius: '3px', height: '16px', marginLeft: '8px' }} />
            </div>
            <div className="ui-body">
              <div className="ui-sidebar">
                <span className="ui-logo">JB</span>
                <div className="ui-nav-icon" />
                <div className="ui-nav-icon active" />
                <div className="ui-nav-icon" />
                <div className="ui-nav-icon" />
                <div className="ui-nav-icon" style={{ marginTop: 'auto', borderRadius: '50%' }} />
              </div>
              <div className="ui-main">
                <div className="ui-header">
                  <span className="ui-title">{t.uiMock.title}</span>
                  <div className="ui-search">{t.uiMock.search}</div>
                  <div className="ui-btn">{t.uiMock.search_btn}</div>
                </div>
                <div className="ui-filters">
                  {t.uiMock.filters.map((f, i) => (
                    <span key={f} className={`ui-pill${i === 0 ? ' active' : ''}`}>{f}</span>
                  ))}
                </div>
                <div className="ui-thead">
                  {['Producto','Estado','Renovación','Plan','Costo'].map(c => <span key={c}>{c}</span>)}
                </div>
                {[
                  { name:'Netflix',  color:'#2D8B6F', date:'15 Jun', plan:'Premium', cost:'$18', op:1 },
                  { name:'Spotify',  color:'#2D8B6F', date:'20 Jun', plan:'Duo',     cost:'$12', op:1 },
                  { name:'Gym XL',   color:'#E8421A', date:'30 Jun', plan:lang==='es'?'Mensual':'Monthly', cost:'$35', op:1 },
                  { name:'Claude',   color:'#555',    date:'01 Jul', plan:'Pro',      cost:'$20', op:0.5 },
                ].map((row, i) => (
                  <div key={row.name} className="ui-trow" style={{ opacity: row.op }}>
                    <span>{row.name}</span>
                    <span style={{ color: row.color }}>{t.uiMock.rows[i]}</span>
                    <span>{row.date}</span><span>{row.plan}</span><span>{row.cost}</span>
                  </div>
                ))}
              </div>
              <div className="ui-detail">
                <div className="ui-detail-title">Subscription product</div>
                {t.uiMock.detail.map(([k, v]) => (
                  <div key={k} className="ui-detail-row"><div className="dl">{k}</div><div className="dv">{v}</div></div>
                ))}
                <div className="ui-action">{t.uiMock.action}</div>
              </div>
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

        {/* ── USER STORIES ── */}
        <section>
          <div className="s-intro" style={{ paddingBottom: 0 }}>
            <div className="s-label">{t.stories.label}</div>
            <div>
              <h2 className="s-headline">{t.stories.heading}</h2>
              <p className="s-text">{t.stories.intro}</p>
            </div>
          </div>
          <div style={{ padding: '0 48px 80px' }}>
            <div className="stories-grid">
              {t.stories.items.map(s => (
                <div key={s.num} className="story-item">
                  <div className="story-num">{s.num}</div>
                  <div>
                    <div className="story-badge">{t.stories.badge}</div>
                    <div className="story-title">{s.title}</div>
                    <p className="story-text">
                      <strong>{t.stories.kw.as}</strong> {s.as}, <strong>{t.stories.kw.want}</strong> {s.want}, <strong>{t.stories.kw.soThat}</strong> {s.soThat}
                    </p>
                  </div>
                </div>
              ))}
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

        {/* ── WIREFRAME ── */}
        <section className="img-section">
          <div className="s-label" style={{ position: 'static', marginBottom: '16px' }}>{t.wireframe.label}</div>
          <h2 className="s-headline">{t.wireframe.heading}</h2>
          <p className="s-text" style={{ marginTop: '8px', marginBottom: 0 }}>{t.wireframe.text}</p>
          <div style={{ marginTop: '40px' }}>
            <img src="/Images/Substrack/Wireframe%20Substrack.png" alt="Wireframe Substrack" className="img-full" />
            <div className="img-caption">{t.wireframe.caption}</div>
          </div>
        </section>

        {/* ── ATOMIC DESIGN ── */}
        <section>
          <div className="s-intro" style={{ paddingBottom: 0 }}>
            <div className="s-label">{t.atomic.label}</div>
            <div>
              <h2 className="s-headline">{t.atomic.heading}</h2>
              <p className="s-text">{t.atomic.intro}</p>
            </div>
          </div>
          <div className="atomic-grid">
            {t.atomic.blocks.map(b => (
              <div key={b.title} className="atomic-block">
                <span className="atomic-icon">{b.icon}</span>
                <div className="atomic-title">{b.title}</div>
                <p className="atomic-text">{b.text}</p>
                <div className="atomic-examples">
                  {b.tags.map(tag => <span key={tag} className="atomic-tag">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '0 48px 80px' }}>
            <div
              className="img-full"
              style={{ marginTop: '40px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card)', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {t.atomic.placeholder}
            </div>
            <div className="img-caption" style={{ marginTop: '12px' }}>{t.atomic.caption}</div>
          </div>
        </section>

        {/* ── COMPONENTES ── */}
        <section className="img-section">
          <div className="s-label" style={{ position: 'static', marginBottom: '16px' }}>{t.components.label}</div>
          <h2 className="s-headline">{t.components.heading}</h2>
          <p className="s-text" style={{ marginTop: '8px' }}>{t.components.text}</p>
          <div style={{ marginTop: '40px' }}>
            <img src="/Images/Substrack/Components%20Substrack.png" alt="Componentes Substrack" className="img-full" />
            <div className="img-caption">{t.components.caption}</div>
          </div>
        </section>

        {/* ── TIPOGRAFÍA ── */}
        <section className="typo-section">
          <div className="s-label" style={{ position: 'static', marginBottom: '16px' }}>{t.typo.label}</div>
          <h2 className="s-headline">{t.typo.heading}</h2>
          <p className="s-text" style={{ marginTop: '8px' }}>{t.typo.text}</p>
          <div className="typo-table">
            <div className="typo-head">
              {t.typo.cols.map(c => <span key={c}>{c}</span>)}
            </div>
            <div className="typo-row"><span className="tc">H1</span><span className="tc">Poppins</span><span className="tc">{lang==='es'?'Semibold':'Semibold'}</span><span className="tc">32px</span><span className="te" style={{ fontSize:'26px', fontWeight:600 }}>Module</span></div>
            <div className="typo-row"><span className="tc">H2</span><span className="tc">Poppins</span><span className="tc">Medium</span><span className="tc">24px</span><span className="te" style={{ fontSize:'20px', fontWeight:500 }}>Subscription product</span></div>
            <div className="typo-row"><span className="tc">Label</span><span className="tc">Poppins</span><span className="tc">Semibold</span><span className="tc">14px</span><span className="te" style={{ fontSize:'14px', fontWeight:600 }}>{lang==='es'?'Producto · Estado · Plan':'Product · Status · Plan'}</span></div>
            <div className="typo-row"><span className="tc">Body</span><span className="tc">Poppins</span><span className="tc">Regular</span><span className="tc">14px</span><span className="te" style={{ fontSize:'14px', fontWeight:400, color:'#555' }}>Netflix · {lang==='es'?'Activa':'Active'} · 15 Jun · Premium · $18</span></div>
            <div className="typo-row"><span className="tc">Caption</span><span className="tc">Poppins</span><span className="tc">Regular</span><span className="tc">12px</span><span className="te" style={{ fontSize:'12px', fontWeight:400, color:'#888' }}>Detail Subscription — {lang==='es'?'Text de soporte':'Support text'}</span></div>
          </div>
        </section>

        {/* ── UI FINAL ── */}
        <section className="img-section">
          <div className="s-label" style={{ position: 'static', marginBottom: '16px' }}>UI Final</div>
          <h2 className="s-headline">{lang==='es'?'El prototipo navegable':'The navigable prototype'}</h2>
          <p className="s-text" style={{ marginTop: '8px' }}>
            {lang==='es'
              ? 'La pantalla principal con sidebar negro, botón primario púrpura, tabla de membresías con filtros Activas / Inactivas / Por vencer y panel de detalle lateral con acciones. Verificado en 1440px y 1024px.'
              : 'The main screen with a black sidebar, purple primary button, memberships table with Active / Inactive / Expiring filters, and a side detail panel with actions. Verified at 1440px and 1024px.'}
          </p>
          <div style={{ marginTop: '40px' }}>
            <img src="/Images/Substrack/Ui%20Substrack.png" alt="UI Final Substrack" className="img-full" />
            <div className="img-caption">{lang==='es'?'Prototipo final — pantalla principal navegable':'Final prototype — navigable main screen'}</div>
          </div>
        </section>

        {/* ── DECISIONES DE DISEÑO ── */}
        <section>
          <div className="s-intro" style={{ paddingBottom: 0 }}>
            <div className="s-label">{t.decisions.label}</div>
            <div><h2 className="s-headline">{t.decisions.heading}</h2></div>
          </div>
          <div className="decisions-grid">
            {t.decisions.items.map(d => (
              <div key={d.title} className="dec-block">
                <span className="dec-icon">{d.icon}</span>
                <div className="dec-title">{d.title}</div>
                <p className="dec-text">{d.text}</p>
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
          <div className="s-label" style={{ position: 'static', marginBottom: '16px' }}>{t.learnings.label}</div>
          <h2 className="s-headline">{t.learnings.heading}</h2>
          <div style={{ marginTop: '40px' }}>
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
            <Link href="/projects/esdesign" className="next-title">{t.next.title}</Link>
          </div>
          <Link href="/projects/esdesign" className="next-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="sb-footer">
          <span>{t.footer.copy1}</span>
          <span>{t.footer.copy2}</span>
        </div>

      </div>
    </>
  );
}
