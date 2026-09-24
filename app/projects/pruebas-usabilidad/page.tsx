'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const CSS = `
  .pu {
    --acc: #7C3AED;
    --acc2: #A78BFA;
    --ink: #0E0E0C;
    --paper: #F5F3FF;
    --dark: #13111C;
    --mid: #1E1A2E;
    --display: 'Bricolage Grotesque', sans-serif;
    --body: 'Satoshi', sans-serif;
    --mono: 'Hubot Sans', sans-serif;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--body);
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* NAV */
  .pu-nav {
    position: sticky; top: 0; z-index: 60;
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 40px;
    background: var(--paper);
    border-bottom: 3px solid var(--ink);
  }
  .pu-back {
    display: flex; align-items: center; gap: 8px;
    font-family: var(--mono); font-size: 11px; letter-spacing: .14em;
    text-transform: uppercase; color: var(--ink); text-decoration: none;
    transition: color .2s;
  }
  .pu-back:hover { color: var(--acc); }
  .pu-nav-right { display: flex; align-items: center; gap: 16px; }
  .pu-lang {
    display: flex; align-items: center;
    border: 2px solid var(--ink);
  }
  .pu-lang-btn {
    background: transparent; border: none; cursor: pointer;
    font-family: var(--mono); font-size: 11px; letter-spacing: .08em;
    padding: 5px 9px; color: var(--ink); transition: background .15s, color .15s;
  }
  .pu-lang-btn.active { background: var(--ink); color: var(--paper); }

  /* HERO */
  .pu-hero {
    background: var(--dark); color: var(--paper);
    padding: 100px 40px 80px;
    border-bottom: 3px solid var(--ink);
    display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
    min-height: 80vh;
  }
  .pu-hero-eyebrow {
    display: flex; align-items: center; gap: 10px; margin-bottom: 28px;
    flex-wrap: wrap;
  }
  .pu-hero-tag {
    font-family: var(--mono); font-size: 10px; letter-spacing: .14em;
    text-transform: uppercase; padding: 4px 12px;
    border: 2px solid rgba(167,139,250,.3); color: var(--acc2);
  }
  .pu-hero-tag.type {
    background: var(--acc); color: #fff;
    border-color: var(--acc);
  }
  .pu-hero-h1 {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(52px, 7vw, 108px); line-height: .92;
    letter-spacing: -.02em; color: var(--paper);
    margin: 0 0 24px;
  }
  .pu-hero-h1 em { color: var(--acc2); font-style: normal; display: block; }
  .pu-hero-sub {
    font-size: 17px; line-height: 1.75;
    color: rgba(245,243,255,.6); max-width: 440px; margin-bottom: 28px;
  }
  .pu-hero-project {
    font-family: var(--mono); font-size: 11px; letter-spacing: .12em;
    text-transform: uppercase; color: var(--acc2);
    margin-bottom: 8px;
  }
  .pu-hero-project-name {
    font-family: var(--display); font-weight: 700;
    font-size: 22px; color: var(--paper); margin-bottom: 24px;
  }
  .pu-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .pu-chip {
    font-family: var(--mono); font-size: 10px; letter-spacing: .1em;
    text-transform: uppercase; padding: 5px 12px;
    border: 2px solid rgba(167,139,250,.2); color: rgba(245,243,255,.65);
  }

  /* HERO RIGHT — stat burst */
  .pu-hero-stats {
    display: grid; grid-template-columns: 1fr 1fr; gap: 3px;
  }
  .pu-stat-card {
    background: var(--mid);
    padding: 32px 28px;
    border: 1px solid rgba(124,58,237,.2);
    opacity: 0; transform: translateY(18px);
    transition: opacity .5s, transform .5s;
  }
  .pu-stat-card.vis { opacity:1; transform:none; }
  .pu-stat-card:nth-child(2) { transition-delay: .1s; }
  .pu-stat-card:nth-child(3) { transition-delay: .2s; }
  .pu-stat-card:nth-child(4) { transition-delay: .3s; }
  .pu-stat-num {
    font-family: var(--display); font-weight: 800;
    font-size: 52px; color: var(--acc2); line-height: 1; display: block; margin-bottom: 6px;
  }
  .pu-stat-label {
    font-family: var(--mono); font-size: 10px; letter-spacing: .12em;
    text-transform: uppercase; color: rgba(245,243,255,.45);
  }

  /* INFO BAR */
  .pu-infobar {
    display: flex; border-bottom: 3px solid var(--ink);
    flex-wrap: wrap;
  }
  .pu-infocell {
    flex: 1; min-width: 160px; padding: 28px 36px;
    border-right: 3px solid var(--ink);
    opacity: 0; transform: translateY(14px);
    transition: opacity .4s, transform .4s;
  }
  .pu-infocell:last-child { border-right: none; }
  .pu-infocell.vis { opacity:1; transform:none; }
  .pu-infocell-label {
    font-family: var(--mono); font-size: 9px; letter-spacing: .2em;
    text-transform: uppercase; color: #7a7770; margin-bottom: 6px;
  }
  .pu-infocell-value {
    font-family: var(--display); font-weight: 700;
    font-size: 18px; color: var(--ink);
  }

  /* SECTION SHARED */
  .pu-section { border-bottom: 3px solid var(--ink); }
  .pu-section-inner { padding: 80px 40px; }
  .pu-label {
    font-family: var(--mono); font-size: 10px; letter-spacing: .2em;
    text-transform: uppercase; color: #7a7770;
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 28px;
  }
  .pu-label::before {
    content: ''; display: inline-block; width: 20px; height: 2px; background: #7a7770;
  }
  .pu-h2 {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(30px, 4vw, 50px); line-height: 1.05; margin: 0 0 20px;
    letter-spacing: -.01em;
  }
  .pu-body { font-size: 17px; line-height: 1.75; color: #4a4845; max-width: 620px; }
  .pu-body + .pu-body { margin-top: 14px; }

  /* SCENARIO BLOCK */
  .pu-scenario {
    margin-top: 40px;
    border-left: 4px solid var(--acc);
    background: rgba(124,58,237,.05);
    padding: 28px 32px;
    max-width: 620px;
  }
  .pu-scenario-label {
    font-family: var(--mono); font-size: 9px; letter-spacing: .2em;
    text-transform: uppercase; color: var(--acc); margin-bottom: 10px;
  }
  .pu-scenario-text {
    font-size: 18px; line-height: 1.65; color: var(--ink);
    font-style: italic;
  }

  /* METRICS TABLE */
  .pu-metrics-grid {
    margin-top: 48px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start;
  }
  .pu-table {
    border: 3px solid var(--ink);
    width: 100%;
  }
  .pu-table-head {
    display: grid; grid-template-columns: 1.4fr 1fr 2fr;
    background: var(--acc);
    padding: 12px 16px; gap: 16px;
  }
  .pu-table-head span {
    font-family: var(--mono); font-size: 10px; letter-spacing: .14em;
    text-transform: uppercase; color: #fff;
  }
  .pu-table-row {
    display: grid; grid-template-columns: 1.4fr 1fr 2fr;
    padding: 16px; gap: 16px; border-top: 2px solid var(--ink);
    opacity: 0; transform: translateX(-10px);
    transition: opacity .4s, transform .4s;
  }
  .pu-table-row:first-child { border-top: none; }
  .pu-table-row.vis { opacity:1; transform:none; }
  .pu-table-metric {
    font-family: var(--mono); font-size: 12px; color: var(--ink); font-weight: 600;
  }
  .pu-table-value {
    font-family: var(--display); font-weight: 700;
    font-size: 16px; color: var(--acc);
  }
  .pu-table-interp {
    font-size: 12px; line-height: 1.6; color: #4a4845;
  }
  .pu-heatmap-wrap {
    border: 3px solid var(--ink);
    overflow: hidden;
  }
  .pu-heatmap-wrap img { width: 100%; display: block; }
  .pu-heatmap-caption {
    padding: 12px 16px;
    border-top: 2px solid var(--ink);
    font-family: var(--mono); font-size: 10px; letter-spacing: .1em;
    text-transform: uppercase; color: #7a7770;
    background: var(--paper);
  }

  /* FINDINGS */
  .pu-findings {
    background: var(--dark);
  }
  .pu-findings-inner { padding: 80px 40px; }
  .pu-findings .pu-label { color: rgba(245,243,255,.4); }
  .pu-findings .pu-label::before { background: rgba(245,243,255,.2); }
  .pu-findings .pu-h2 { color: var(--paper); }
  .pu-finding-grid {
    margin-top: 48px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 3px;
  }
  .pu-finding-card {
    background: var(--mid); padding: 36px 32px;
    border: 1px solid rgba(124,58,237,.15);
    opacity: 0; transform: translateY(16px);
    transition: opacity .5s, transform .5s;
  }
  .pu-finding-card.vis { opacity:1; transform:none; }
  .pu-finding-card:nth-child(2) { transition-delay: .1s; }
  .pu-finding-card:nth-child(3) { transition-delay: .2s; }
  .pu-finding-card:nth-child(4) { transition-delay: .3s; }
  .pu-finding-title {
    font-family: var(--display); font-weight: 700;
    font-size: 20px; color: var(--paper); margin-bottom: 12px;
  }
  .pu-finding-evidence {
    font-family: var(--mono); font-size: 11px; letter-spacing: .08em;
    color: var(--acc2); margin-bottom: 16px;
    padding: 8px 12px; border-left: 3px solid var(--acc);
    background: rgba(124,58,237,.1);
  }
  .pu-finding-insight {
    font-size: 13px; line-height: 1.75; color: rgba(245,243,255,.6);
  }

  /* IMPROVEMENTS */
  .pu-improvements-inner { padding: 80px 40px; }
  .pu-improve-list {
    margin-top: 48px;
    display: flex; flex-direction: column; gap: 0;
    border: 3px solid var(--ink);
  }
  .pu-improve-item {
    display: grid; grid-template-columns: 120px 1fr;
    border-bottom: 2px solid var(--ink);
    opacity: 0; transform: translateX(-12px);
    transition: opacity .4s, transform .4s;
  }
  .pu-improve-item:last-child { border-bottom: none; }
  .pu-improve-item.vis { opacity:1; transform:none; }
  .pu-improve-priority {
    padding: 28px 20px;
    border-right: 2px solid var(--ink);
    display: flex; align-items: center; justify-content: center;
  }
  .pu-priority-badge {
    font-family: var(--mono); font-size: 9px; letter-spacing: .14em;
    text-transform: uppercase; padding: 4px 10px; border: 2px solid;
    white-space: nowrap;
  }
  .pu-priority-alta { color: #C2410C; border-color: #C2410C; background: rgba(194,65,12,.07); }
  .pu-priority-media { color: #B45309; border-color: #B45309; background: rgba(180,83,9,.07); }
  .pu-priority-baja { color: #1D6B3E; border-color: #1D6B3E; background: rgba(29,107,62,.07); }
  .pu-improve-content { padding: 28px 32px; }
  .pu-improve-title {
    font-family: var(--display); font-weight: 700;
    font-size: 18px; color: var(--ink); margin-bottom: 8px;
  }
  .pu-improve-desc { font-size: 14px; line-height: 1.7; color: #4a4845; }

  /* CONCLUSION */
  .pu-conclusion {
    background: var(--acc);
  }
  .pu-conclusion-inner {
    padding: 80px 40px;
    display: grid; grid-template-columns: 1fr 2fr; gap: 60px; align-items: center;
  }
  .pu-conclusion-label {
    font-family: var(--mono); font-size: 10px; letter-spacing: .2em;
    text-transform: uppercase; color: rgba(255,255,255,.6);
  }
  .pu-conclusion-word {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(40px, 6vw, 80px); color: #fff;
    line-height: .9; letter-spacing: -.02em;
  }
  .pu-conclusion-text {
    font-size: 18px; line-height: 1.75; color: rgba(255,255,255,.85);
  }
  .pu-conclusion-text strong { color: #fff; }

  /* FOOTER */
  .pu-footer {
    padding: 40px;
    display: flex; justify-content: space-between; align-items: center;
    border-top: 3px solid var(--ink);
    flex-wrap: wrap; gap: 16px;
  }
  .pu-footer-label {
    font-family: var(--mono); font-size: 10px; letter-spacing: .14em;
    text-transform: uppercase; color: #7a7770;
  }
  .pu-prototype-link {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--mono); font-size: 10px; letter-spacing: .1em;
    text-transform: uppercase; color: var(--ink);
    border: 2px solid var(--ink); padding: 8px 16px;
    text-decoration: none; transition: background .15s, color .15s;
  }
  .pu-prototype-link:hover { background: var(--acc); border-color: var(--acc); color: #fff; }

  @media (max-width: 768px) {
    .pu-hero { grid-template-columns: 1fr; min-height: auto; padding: 60px 20px; }
    .pu-hero-stats { grid-template-columns: 1fr 1fr; }
    .pu-metrics-grid { grid-template-columns: 1fr; }
    .pu-finding-grid { grid-template-columns: 1fr; }
    .pu-conclusion-inner { grid-template-columns: 1fr; gap: 24px; }
    .pu-section-inner, .pu-findings-inner, .pu-improvements-inner { padding: 48px 20px; }
    .pu-nav { padding: 14px 20px; }
    .pu-footer { padding: 28px 20px; }
    .pu-table-head, .pu-table-row { grid-template-columns: 1fr 1fr; }
    .pu-table-interp { display: none; }
    .pu-improve-item { grid-template-columns: 90px 1fr; }
  }
`;

const content = {
  es: {
    back: 'Proyectos',
    type: 'Prueba de Usabilidad',
    projectLabel: 'Prototipo evaluado',
    projectName: 'Elige al orador de apertura',
    h1a: 'Pruebas de',
    h1b: 'Usabilidad',
    sub: 'Evaluación asincrónica en Maze sobre qué tan fácil es para las personas elegir un orador dentro de un prototipo de interfaz.',
    tools: ['Figma', 'Maze', 'UX Research'],
    stats: [
      { num: '7', label: 'Participantes' },
      { num: '100%', label: 'Tasa de éxito' },
      { num: '26s', label: 'Tiempo promedio' },
      { num: '0%', label: 'Tasa de abandono' },
    ],
    infobar: [
      { label: 'Método', value: 'Test asincrónico' },
      { label: 'Herramienta', value: 'Maze' },
      { label: 'Participantes', value: '7 usuarios' },
      { label: 'Año', value: '2024' },
    ],
    contextLabel: 'Contexto',
    contextH2: 'El objetivo del estudio',
    contextBody: 'Evaluar qué tan fácil es para las personas elegir un orador dentro del prototipo de interfaz. Se trató de una prueba asincrónica realizada en Maze, con 7 participantes.',
    scenarioLabel: 'Escenario planteado',
    scenario: '"Imagina que vas a un evento de innovación y tú eliges quién dará la charla inicial. Vota por la persona que prefieras."',
    resultsLabel: 'Resultados',
    resultsH2: 'Resultados generales',
    heatmapCaption: 'Heatmap — concentración de clics en el primer bloque de elección',
    metrics: [
      { metric: 'Tasa de éxito', value: '100%', interp: 'Todas las personas lograron completar la tarea principal correctamente.' },
      { metric: 'Tiempo promedio', value: '26 seg', interp: 'Los participantes identificaron la acción sin dificultad ni demoras.' },
      { metric: 'Tasa de abandono', value: '0%', interp: 'Nadie interrumpió la prueba antes de completarla.' },
      { metric: 'Clicks promedio', value: '13', interp: 'Indica una exploración ligera antes de decidir; la navegación fue intuitiva.' },
      { metric: 'Tasa de misclicks', value: '15.3%', interp: 'Algunos clics innecesarios o confusos sugieren microproblemas de jerarquía visual o feedback.' },
    ],
    findingsLabel: 'Hallazgos clave',
    findingsH2: 'Lo que revelaron los datos',
    findings: [
      {
        title: 'Alta tasa de éxito y baja fricción',
        evidence: '100% de los usuarios completaron la tarea',
        insight: 'El flujo de elección es comprensible sin instrucciones adicionales, lo que refleja una buena arquitectura de la información.',
      },
      {
        title: 'Misclicks en zonas secundarias',
        evidence: '15% de clics fuera del botón principal',
        insight: 'Los elementos visuales cercanos al botón generan distracción o confusión leve sobre cuál es la acción principal.',
      },
      {
        title: 'Tiempo promedio estable',
        evidence: 'Ningún usuario superó el minuto de interacción',
        insight: 'La tarea fue simple y el tiempo constante sugiere eficiencia cognitiva; sin embargo, podría optimizarse con microcopy o feedback más claro.',
      },
      {
        title: 'Poca exploración lateral',
        evidence: 'Heatmap concentrado en un solo bloque de elección',
        insight: 'El prototipo invita a una acción directa, pero podría estimular comparación o exploración antes de votar.',
      },
    ],
    improveLabel: 'Propuestas de mejora',
    improveH2: 'Iteraciones recomendadas',
    improvements: [
      {
        priority: 'Alta',
        title: 'Ajustar jerarquía visual del botón principal',
        desc: 'Refinar color, tamaño y margen inferior del CTA para reducir la confusión con elementos adyacentes y disminuir los misclicks.',
      },
      {
        priority: 'Media',
        title: 'Incorporar feedback visual inmediato al votar',
        desc: 'Añadir un estado visual claro tras la acción: "Tu voto fue registrado" o una animación de confirmación que cierre el loop de interacción.',
      },
      {
        priority: 'Media',
        title: 'Añadir descripciones y fotos de los oradores',
        desc: 'Incluir pequeñas descripciones o imágenes de los speakers para promover la comparación antes del voto y reducir la poca exploración lateral.',
      },
      {
        priority: 'Baja',
        title: 'Pantalla de cierre post-voto',
        desc: 'Proponer una pantalla final tipo "Gracias por participar" con resumen del voto o link para continuar, evitando el cierre abrupto de la experiencia.',
      },
    ],
    conclusionLabel: 'Conclusión',
    conclusionWord: 'Listo\npara\niterar.',
    conclusionText: 'El prototipo demuestra una <strong>excelente usabilidad en tareas principales</strong>, con un flujo simple y directo que los participantes comprendieron sin guía. Las mejoras sugeridas se enfocan en refinar detalles visuales y de feedback para elevar la claridad de interacción y reducir los misclicks. En síntesis: el diseño es funcional y comprensible, y está listo para iterar en aspectos de <strong>microinteracción y jerarquía visual</strong>.',
    protoLink: 'Ver prototipo en Figma',
  },
  en: {
    back: 'Projects',
    type: 'Usability Test',
    projectLabel: 'Evaluated prototype',
    projectName: 'Choose the Opening Speaker',
    h1a: 'Usability',
    h1b: 'Testing',
    sub: 'Asynchronous evaluation in Maze assessing how easy it is for users to choose a speaker within an interface prototype.',
    tools: ['Figma', 'Maze', 'UX Research'],
    stats: [
      { num: '7', label: 'Participants' },
      { num: '100%', label: 'Success rate' },
      { num: '26s', label: 'Average time' },
      { num: '0%', label: 'Drop-off rate' },
    ],
    infobar: [
      { label: 'Method', value: 'Async test' },
      { label: 'Tool', value: 'Maze' },
      { label: 'Participants', value: '7 users' },
      { label: 'Year', value: '2024' },
    ],
    contextLabel: 'Context',
    contextH2: 'Study objective',
    contextBody: 'Evaluate how easy it is for people to choose a speaker within the interface prototype. An asynchronous test conducted on Maze with 7 participants.',
    scenarioLabel: 'Given scenario',
    scenario: '"Imagine you\'re going to an innovation event and you choose who gives the opening talk. Vote for the person you prefer."',
    resultsLabel: 'Results',
    resultsH2: 'General results',
    heatmapCaption: 'Heatmap — click concentration on the first selection block',
    metrics: [
      { metric: 'Success rate', value: '100%', interp: 'All participants successfully completed the main task.' },
      { metric: 'Avg. time per task', value: '26 sec', interp: 'Participants identified the action without difficulty or delays.' },
      { metric: 'Drop-off rate', value: '0%', interp: 'No one interrupted the test before completing it.' },
      { metric: 'Avg. clicks', value: '13', interp: 'Indicates light exploration before deciding; navigation was intuitive.' },
      { metric: 'Misclick rate', value: '15.3%', interp: 'Some unnecessary or confused clicks suggest micro-issues with visual hierarchy or feedback.' },
    ],
    findingsLabel: 'Key findings',
    findingsH2: 'What the data revealed',
    findings: [
      {
        title: 'High success rate, low friction',
        evidence: '100% of users completed the task',
        insight: 'The selection flow is understandable without additional instructions, reflecting good information architecture.',
      },
      {
        title: 'Misclicks in secondary areas',
        evidence: '15% of clicks outside the main button',
        insight: 'Visual elements near the button generate mild distraction or confusion about which is the primary action.',
      },
      {
        title: 'Stable average time',
        evidence: 'No user exceeded one minute of interaction',
        insight: 'The task was simple and consistent timing suggests cognitive efficiency; however, it could be optimized with microcopy or clearer feedback.',
      },
      {
        title: 'Little lateral exploration',
        evidence: 'Heatmap concentrated on a single selection block',
        insight: 'The prototype invites direct action, but could encourage comparison or exploration before voting.',
      },
    ],
    improveLabel: 'Improvement proposals',
    improveH2: 'Recommended iterations',
    improvements: [
      {
        priority: 'Alta',
        title: 'Adjust main button visual hierarchy',
        desc: 'Refine the CTA\'s color, size and bottom margin to reduce confusion with adjacent elements and lower misclicks.',
      },
      {
        priority: 'Media',
        title: 'Add immediate visual feedback on vote',
        desc: 'Add a clear visual state after the action: "Your vote was registered" or a confirmation animation that closes the interaction loop.',
      },
      {
        priority: 'Media',
        title: 'Add speaker descriptions and photos',
        desc: 'Include small descriptions or images of the speakers to promote comparison before voting and reduce low lateral exploration.',
      },
      {
        priority: 'Baja',
        title: 'Post-vote closing screen',
        desc: 'Propose a final "Thank you for participating" screen with a vote summary or link to continue, avoiding the abrupt end of the experience.',
      },
    ],
    conclusionLabel: 'Conclusion',
    conclusionWord: 'Ready\nto\niterate.',
    conclusionText: 'The prototype demonstrates <strong>excellent usability on primary tasks</strong>, with a simple, direct flow that participants understood without guidance. Suggested improvements focus on refining visual details and feedback to raise interaction clarity and reduce misclicks. In short: the design is functional and understandable, and is ready to iterate on <strong>micro-interaction and visual hierarchy</strong>.',
    protoLink: 'View prototype on Figma',
  },
};

function useObserver(ref: React.RefObject<Element | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('vis');
            const children = (e.target as HTMLElement).querySelectorAll<HTMLElement>(
              '.pu-stat-card, .pu-infocell, .pu-table-row, .pu-finding-card, .pu-improve-item'
            );
            children.forEach((c, i) => {
              setTimeout(() => c.classList.add('vis'), i * 80);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

export default function PruebasUsabilidad() {
  const { language, setLanguage } = useLanguage();
  const t = content[language as 'es' | 'en'] ?? content.es;

  const heroRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const findingsRef = useRef<HTMLDivElement>(null);
  const improveRef = useRef<HTMLDivElement>(null);

  useObserver(heroRef);
  useObserver(infoRef);
  useObserver(metricsRef);
  useObserver(findingsRef);
  useObserver(improveRef);

  const priorityClass = (p: string) =>
    p === 'Alta' ? 'pu-priority-alta' : p === 'Baja' ? 'pu-priority-baja' : 'pu-priority-media';

  return (
    <div className="pu">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="pu-nav">
        <Link href="/" className="pu-back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {t.back}
        </Link>
        <div className="pu-nav-right">
          <div className="pu-lang">
            <button className={`pu-lang-btn${language === 'es' ? ' active' : ''}`} onClick={() => setLanguage('es')}>ES</button>
            <button className={`pu-lang-btn${language === 'en' ? ' active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pu-hero">
        <div>
          <div className="pu-hero-eyebrow">
            <span className="pu-hero-tag type">{t.type}</span>
            <span className="pu-hero-tag">Maze</span>
            <span className="pu-hero-tag">Figma</span>
          </div>
          <h1 className="pu-hero-h1">
            {t.h1a}<em>{t.h1b}</em>
          </h1>
          <p className="pu-hero-sub">{t.sub}</p>
          <p className="pu-hero-project">{t.projectLabel}</p>
          <p className="pu-hero-project-name">{t.projectName}</p>
          <div className="pu-chips">
            {t.tools.map(tool => <span key={tool} className="pu-chip">{tool}</span>)}
          </div>
        </div>

        <div className="pu-hero-stats" ref={heroRef}>
          {t.stats.map((s) => (
            <div key={s.label} className="pu-stat-card">
              <span className="pu-stat-num">{s.num}</span>
              <span className="pu-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* INFO BAR */}
      <div className="pu-infobar" ref={infoRef}>
        {t.infobar.map((cell, i) => (
          <div key={cell.label} className="pu-infocell" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="pu-infocell-label">{cell.label}</div>
            <div className="pu-infocell-value">{cell.value}</div>
          </div>
        ))}
      </div>

      {/* CONTEXT */}
      <section className="pu-section">
        <div className="pu-section-inner">
          <div className="pu-label">{t.contextLabel}</div>
          <h2 className="pu-h2">{t.contextH2}</h2>
          <p className="pu-body">{t.contextBody}</p>
          <div className="pu-scenario">
            <div className="pu-scenario-label">{t.scenarioLabel}</div>
            <p className="pu-scenario-text">{t.scenario}</p>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="pu-section" ref={metricsRef}>
        <div className="pu-section-inner">
          <div className="pu-label">{t.resultsLabel}</div>
          <h2 className="pu-h2">{t.resultsH2}</h2>
          <div className="pu-metrics-grid">
            <div className="pu-table">
              <div className="pu-table-head">
                <span>Métrica</span>
                <span>Resultado</span>
                <span>Interpretación</span>
              </div>
              {t.metrics.map((row, i) => (
                <div key={row.metric} className="pu-table-row" style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="pu-table-metric">{row.metric}</span>
                  <span className="pu-table-value">{row.value}</span>
                  <span className="pu-table-interp">{row.interp}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="pu-heatmap-wrap">
                <img src="/Images/Pruebas de usabilidad/heatmap.png" alt="Heatmap de clics en el prototipo" />
                <div className="pu-heatmap-caption">{t.heatmapCaption}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINDINGS */}
      <section className="pu-findings">
        <div className="pu-findings-inner" ref={findingsRef}>
          <div className="pu-label">{t.findingsLabel}</div>
          <h2 className="pu-h2">{t.findingsH2}</h2>
          <div className="pu-finding-grid">
            {t.findings.map((f, i) => (
              <div key={f.title} className="pu-finding-card" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="pu-finding-title">{f.title}</div>
                <div className="pu-finding-evidence">{f.evidence}</div>
                <p className="pu-finding-insight">{f.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPROVEMENTS */}
      <section className="pu-section">
        <div className="pu-improvements-inner" ref={improveRef}>
          <div className="pu-label">{t.improveLabel}</div>
          <h2 className="pu-h2">{t.improveH2}</h2>
          <div className="pu-improve-list">
            {t.improvements.map((item, i) => (
              <div key={item.title} className="pu-improve-item" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="pu-improve-priority">
                  <span className={`pu-priority-badge ${priorityClass(item.priority)}`}>{item.priority}</span>
                </div>
                <div className="pu-improve-content">
                  <div className="pu-improve-title">{item.title}</div>
                  <p className="pu-improve-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONCLUSION */}
      <section className="pu-conclusion">
        <div className="pu-conclusion-inner">
          <div>
            <div className="pu-conclusion-label">{t.conclusionLabel}</div>
            <div className="pu-conclusion-word" style={{ whiteSpace: 'pre-line' }}>{t.conclusionWord}</div>
          </div>
          <p className="pu-conclusion-text" dangerouslySetInnerHTML={{ __html: t.conclusionText }} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pu-footer">
        <span className="pu-footer-label">Juan José Bernal — Pruebas de Usabilidad</span>
        <a
          href="https://www.figma.com/proto/R2YfrLvfXxPfeKXKrOUExq/UX-UI-%E2%80%93-Interactive-%E2%80%93-Sprint-11--Copy-?node-id=0-61&p=f&t=kQjfZhJPWUtTFiqd-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1"
          target="_blank"
          rel="noopener noreferrer"
          className="pu-prototype-link"
        >
          {t.protoLink}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </footer>
    </div>
  );
}
