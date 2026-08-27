'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const CSS = `
  :root {
    --acc: #ff1d44;
    --cream: #fbebaf;
    --sage: #74bf9d;
    --ink: #0E0E0C;
    --paper: #EFEBE1;
    --dark: #11151D;
    --display: 'Bricolage Grotesque', sans-serif;
    --body: 'Space Grotesk', sans-serif;
    --mono: 'Space Mono', monospace;
  }

  .nu-wrap { font-family: var(--body); color: var(--ink); background: var(--paper); min-height: 100vh; }

  /* NAV */
  .nu-nav {
    position: sticky; top: 0; z-index: 60;
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 40px; background: var(--paper); border-bottom: 3px solid var(--ink);
  }
  .nu-back {
    display: flex; align-items: center; gap: 8px;
    font-family: var(--mono); font-size: 11px; letter-spacing: .14em;
    text-transform: uppercase; color: var(--ink); text-decoration: none;
    transition: color .2s;
  }
  .nu-back:hover { color: var(--acc); }
  .nu-nav-right { display: flex; align-items: center; gap: 16px; }
  .nu-nav-logo { height: 28px; width: auto; display: block; }
  .nu-lang { display: flex; align-items: center; border: 2px solid var(--ink); }
  .nu-lang-btn {
    background: transparent; border: none; cursor: pointer;
    font-family: var(--mono); font-size: 11px; letter-spacing: .08em;
    padding: 5px 9px; color: var(--ink); transition: background .15s, color .15s;
  }
  .nu-lang-btn.active { background: var(--ink); color: var(--paper); }

  /* HERO */
  .nu-hero {
    background: var(--cream);
    border-bottom: 3px solid var(--ink);
    padding: 64px 40px 56px;
  }
  .nu-hero-eyebrow {
    font-family: var(--mono); font-size: 10px; letter-spacing: .25em;
    text-transform: uppercase; color: var(--ink); opacity: .5;
    margin-bottom: 24px;
  }
  .nu-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: end; }
  .nu-hero-bottom { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 0; }
  .nu-hero-meta-row { display: flex; gap: 24px; }
  .nu-hero-meta-item { font-family: var(--mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; opacity: .5; }
  .nu-hero-meta-item strong { font-family: var(--display); font-weight: 800; font-size: 13px; opacity: 1; margin-left: 6px; }
  .nu-hero-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 0; }
  .nu-hero-chip {
    font-family: var(--mono); font-size: 10px; letter-spacing: .15em;
    text-transform: uppercase; border: 2px solid var(--ink);
    padding: 5px 10px; color: var(--ink);
  }
  .nu-hero-desc { font-size: 16px; line-height: 1.65; max-width: 440px; }
  .nu-hero-right { display: flex; flex-direction: column; align-items: flex-end; gap: 20px; }
  .nu-hero-isotipo {
    width: 200px; height: 200px;
    border: 3px solid var(--ink);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; overflow: hidden;
  }
  .nu-hero-meta { text-align: right; }
  .nu-hero-meta-item { font-family: var(--mono); font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: var(--ink); opacity: .5; display: block; }
  .nu-hero-meta-val { font-family: var(--display); font-weight: 800; font-size: 15px; display: block; margin-bottom: 8px; }

  /* INFO BAR */
  .nu-infobar {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border-bottom: 3px solid var(--ink);
  }
  .nu-infobar-cell {
    padding: 20px 28px; border-right: 3px solid var(--ink);
  }
  .nu-infobar-cell:last-child { border-right: none; }
  .nu-infobar-label { font-family: var(--mono); font-size: 9px; letter-spacing: .2em; text-transform: uppercase; opacity: .45; display: block; margin-bottom: 4px; }
  .nu-infobar-val { font-family: var(--display); font-weight: 800; font-size: 14px; }

  /* CONCEPT */
  .nu-concept { padding: 72px 40px; border-bottom: 3px solid var(--ink); }
  .nu-concept-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
  .nu-section-title {
    font-family: var(--display); font-weight: 800;
    font-size: clamp(32px, 4vw, 48px); line-height: 1; letter-spacing: -.03em;
    margin: 0 0 32px;
  }
  .nu-concept-body { font-size: 16px; line-height: 1.7; }
  .nu-concept-body p { margin: 0 0 16px; }
  .nu-concept-cards { display: flex; flex-direction: column; gap: 16px; }
  .nu-concept-card {
    border: 3px solid var(--ink); padding: 20px 24px;
  }
  .nu-concept-card-tag { font-family: var(--mono); font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: var(--acc); display: block; margin-bottom: 6px; }
  .nu-concept-card-text { font-family: var(--display); font-weight: 800; font-size: 18px; line-height: 1.2; }

  /* LOGO SYSTEM */
  .nu-logos { border-bottom: 3px solid var(--ink); }
  .nu-logos-header {
    padding: 40px 40px 32px; border-bottom: 3px solid var(--ink);
    display: flex; align-items: baseline; gap: 24px;
  }
  .nu-logos-grid { display: grid; grid-template-columns: 1fr 1fr; }
  .nu-logo-block {
    padding: 48px 40px; border-right: 3px solid var(--ink); border-bottom: 3px solid var(--ink);
  }
  .nu-logo-block:nth-child(even) { border-right: none; }
  .nu-logo-block:nth-last-child(-n+2) { border-bottom: none; }
  .nu-logo-label { font-family: var(--mono); font-size: 9px; letter-spacing: .2em; text-transform: uppercase; opacity: .4; margin-bottom: 24px; display: block; }
  .nu-logo-img { width: 100%; max-width: 480px; height: auto; display: block; }
  .nu-logo-block-dark { background: var(--ink); }
  .nu-logo-block-cream { background: var(--cream); }

  /* PALETTE */
  .nu-palette { padding: 72px 40px; border-bottom: 3px solid var(--ink); }
  .nu-palette-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; margin-top: 40px; border: 3px solid var(--ink); }
  .nu-swatch { border-right: 3px solid var(--ink); }
  .nu-swatch:last-child { border-right: none; }
  .nu-swatch-color { height: 140px; }
  .nu-swatch-info { padding: 14px 16px; border-top: 3px solid var(--ink); }
  .nu-swatch-name { font-family: var(--display); font-weight: 800; font-size: 13px; display: block; }
  .nu-swatch-hex { font-family: var(--mono); font-size: 10px; letter-spacing: .1em; opacity: .5; display: block; margin-top: 2px; }
  .nu-swatch-role { font-family: var(--mono); font-size: 9px; letter-spacing: .15em; text-transform: uppercase; color: var(--acc); display: block; margin-top: 4px; }

  /* VARIATIONS */
  .nu-variations { border-bottom: 3px solid var(--ink); }
  .nu-variations-header { padding: 40px 40px 32px; border-bottom: 3px solid var(--ink); }
  .nu-var-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
  .nu-var-cell { border-right: 3px solid var(--ink); border-bottom: 3px solid var(--ink); aspect-ratio: 16/9; overflow: hidden; }
  .nu-var-cell:nth-child(3n) { border-right: none; }
  .nu-var-cell:nth-last-child(-n+3) { border-bottom: none; }
  .nu-var-img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* PATTERN */
  .nu-pattern { border-bottom: 3px solid var(--ink); overflow: hidden; }
  .nu-pattern-label { font-family: var(--mono); font-size: 9px; letter-spacing: .2em; text-transform: uppercase; padding: 20px 40px; border-bottom: 3px solid var(--ink); opacity: .5; }
  .nu-pattern-img { width: 100%; height: 280px; object-fit: cover; display: block; }

  /* NEXT */
  .nu-next {
    display: flex; align-items: center; justify-content: space-between;
    padding: 40px; border-bottom: 3px solid var(--ink);
    text-decoration: none; color: var(--ink);
    position: relative; overflow: hidden;
  }
  .nu-next::after {
    content: ''; position: absolute; inset: 0;
    background: var(--ink); transform: translateX(-101%);
    transition: transform .3s cubic-bezier(.16,.84,.34,1); z-index: 0;
  }
  .nu-next:hover::after { transform: translateX(0); }
  .nu-next > * { position: relative; z-index: 1; }
  .nu-next:hover { color: var(--paper); }
  .nu-next-label { font-family: var(--mono); font-size: 9px; letter-spacing: .2em; text-transform: uppercase; opacity: .4; display: block; margin-bottom: 6px; transition: opacity .3s; }
  .nu-next:hover .nu-next-label { opacity: .6; }
  .nu-next-name { font-family: var(--display); font-weight: 800; font-size: 28px; letter-spacing: -.02em; }
  .nu-next-arrow { font-family: var(--mono); font-size: 32px; transition: transform .3s; }
  .nu-next:hover .nu-next-arrow { transform: translateX(8px); }

  @media (max-width: 768px) {
    .nu-nav { padding: 14px 20px; }
    .nu-hero { padding: 40px 20px 36px; }
    .nu-hero-grid { grid-template-columns: 1fr; }
    .nu-hero-right { align-items: flex-start; }
    .nu-concept { padding: 48px 20px; }
    .nu-concept-grid { grid-template-columns: 1fr; }
    .nu-logos-grid { grid-template-columns: 1fr; }
    .nu-logo-block { border-right: none; }
    .nu-palette { padding: 48px 20px; }
    .nu-palette-grid { grid-template-columns: repeat(3, 1fr); }
    .nu-var-grid { grid-template-columns: 1fr 1fr; }
    .nu-infobar { grid-template-columns: 1fr 1fr; }
    .nu-next { padding: 28px 20px; }
  }
`;

export default function NurishPage() {
  const { lang, setLang } = useLanguage();
  const es = lang === 'es';

  return (
    <div className="nu-wrap">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* NAV */}
      <nav className="nu-nav">
        <Link href="/branding" className="nu-back">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {es ? 'Portafolio de branding' : 'Branding portfolio'}
        </Link>
        <div className="nu-nav-right">
          <img src="/Images/LogoJJB/Logo%20JJB%20negro.png" alt="JJB" className="nu-nav-logo" />
          <div className="nu-lang">
            <button className={`nu-lang-btn${lang === 'es' ? ' active' : ''}`} onClick={() => setLang('es')}>ES</button>
            <button className={`nu-lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>EN</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="nu-hero">
        <p className="nu-hero-eyebrow">
          {es ? 'Proyecto de branding · Identidad visual' : 'Branding project · Visual identity'}
        </p>
        <Image src="/Images/Branding/Nurish/Artboard 17.png" alt="nürish by Sarita" width={1600} height={900} style={{ width: '100%', height: 'auto', display: 'block', marginBottom: 40 }} priority />
        <div className="nu-hero-bottom">
          <div className="nu-hero-chips">
            <span className="nu-hero-chip">{es ? 'Identidad visual' : 'Visual identity'}</span>
            <span className="nu-hero-chip">Logobook</span>
            <span className="nu-hero-chip">{es ? 'Redes sociales' : 'Social media'}</span>
            <span className="nu-hero-chip">{es ? 'Sistema de color' : 'Color system'}</span>
          </div>
          <div className="nu-hero-meta-row">
            <span className="nu-hero-meta-item">{es ? 'Cliente' : 'Client'} <strong>Sarita</strong></span>
            <span className="nu-hero-meta-item">{es ? 'Año' : 'Year'} <strong>2024</strong></span>
          </div>
        </div>
        <p className="nu-hero-desc" style={{ marginTop: 20 }}>
          {es
            ? 'Creadora de contenido de nutrición que necesitaba una identidad visual que combinara energía educativa con calidez. El resultado: un sistema modular construido alrededor de un isotipo que es, al mismo tiempo, un tenedor y una sonrisa.'
            : 'A nutrition content creator who needed a visual identity combining educational energy with warmth. The result: a modular system built around an isotope that is, at once, a fork and a smile.'}
        </p>
      </section>

      {/* INFO BAR */}
      <div className="nu-infobar">
        <div className="nu-infobar-cell">
          <span className="nu-infobar-label">{es ? 'Sector' : 'Industry'}</span>
          <span className="nu-infobar-val">{es ? 'Nutrición & bienestar' : 'Nutrition & wellness'}</span>
        </div>
        <div className="nu-infobar-cell">
          <span className="nu-infobar-label">{es ? 'Entregables' : 'Deliverables'}</span>
          <span className="nu-infobar-val">Logobook completo</span>
        </div>
        <div className="nu-infobar-cell">
          <span className="nu-infobar-label">{es ? 'Colores' : 'Colors'}</span>
          <span className="nu-infobar-val">5 (3 + 2 secundarios)</span>
        </div>
        <div className="nu-infobar-cell">
          <span className="nu-infobar-label">{es ? 'Formatos' : 'Formats'}</span>
          <span className="nu-infobar-val">Imagotipo · Isotipo · Patrón</span>
        </div>
      </div>

      {/* CONCEPT */}
      <section className="nu-concept">
        <div className="nu-concept-grid">
          <div>
            <h2 className="nu-section-title">{es ? 'El concepto' : 'The concept'}</h2>
            <div className="nu-concept-body">
              <p>
                {es
                  ? 'El nombre "nürish" es un juego entre nutrition y nurture — nutrir el cuerpo y nutrir el alma. El reto fue traducir esa dualidad en un símbolo que funcionara tanto en un favicon de 16px como en el hero de un canal de YouTube.'
                  : '"nürish" plays on nutrition and nurture — feeding the body and the spirit. The challenge was translating that duality into a mark that works at 16px (favicon) and full-width (YouTube hero).'}
              </p>
              <p>
                {es
                  ? 'La solución llegó desde la forma de la ü: dos puntos sobre una U. Esos dos puntos son los dientes de un tenedor; la U es el cuenco — y juntos, desde la distancia, leen como una carita feliz.'
                  : 'The solution came from the ü shape: two dots above a U. Those dots are fork tines; the U is the bowl — and together, at a distance, they read as a smiley face.'}
              </p>
            </div>
          </div>
          <div className="nu-concept-cards">
            <div className="nu-concept-card">
              <span className="nu-concept-card-tag">{es ? 'Energía' : 'Energy'}</span>
              <span className="nu-concept-card-text">{es ? 'Rojo · Educación · Movimiento' : 'Red · Education · Motion'}</span>
            </div>
            <div className="nu-concept-card">
              <span className="nu-concept-card-tag">{es ? 'Calidez' : 'Warmth'}</span>
              <span className="nu-concept-card-text">{es ? 'Crema · Cercanía · Confianza' : 'Cream · Closeness · Trust'}</span>
            </div>
            <div className="nu-concept-card">
              <span className="nu-concept-card-tag">{es ? 'Calma' : 'Calm'}</span>
              <span className="nu-concept-card-text">{es ? 'Verde · Salud · Equilibrio' : 'Green · Health · Balance'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO SYSTEM */}
      <section className="nu-logos">
        <div className="nu-logos-header">
          <h2 className="nu-section-title" style={{ margin: 0 }}>{es ? 'Sistema de logo' : 'Logo system'}</h2>
        </div>
        <div className="nu-logos-grid">
          {/* Imagotipo */}
          <div className="nu-logo-block">
            <span className="nu-logo-label">Imagotipo</span>
            <Image src="/Images/Branding/Nurish/Artboard 17.png" alt="Imagotipo nürish" width={800} height={450} className="nu-logo-img" />
          </div>
          {/* Isotipo */}
          <div className="nu-logo-block">
            <span className="nu-logo-label">Isotipo</span>
            <Image src="/Images/Branding/Nurish/Artboard 18.png" alt="Isotipo nürish" width={800} height={450} className="nu-logo-img" style={{ maxWidth: 280 }} />
          </div>
          {/* Construcción wordmark */}
          <div className="nu-logo-block">
            <span className="nu-logo-label">{es ? 'Construcción · Wordmark' : 'Construction · Wordmark'}</span>
            <Image src="/Images/Branding/Nurish/Artboard 19.png" alt="Construcción wordmark" width={800} height={450} className="nu-logo-img" />
          </div>
          {/* Construcción isotipo */}
          <div className="nu-logo-block">
            <span className="nu-logo-label">{es ? 'Construcción · Isotipo' : 'Construction · Isotope'}</span>
            <Image src="/Images/Branding/Nurish/Artboard 21.png" alt="Construcción isotipo" width={800} height={450} className="nu-logo-img" style={{ maxWidth: 320 }} />
          </div>
          {/* Espacio seguro wordmark */}
          <div className="nu-logo-block">
            <span className="nu-logo-label">{es ? 'Espacio seguro · Wordmark' : 'Safe space · Wordmark'}</span>
            <Image src="/Images/Branding/Nurish/Artboard 20.png" alt="Espacio seguro wordmark" width={800} height={450} className="nu-logo-img" />
          </div>
          {/* Espacio seguro isotipo */}
          <div className="nu-logo-block">
            <span className="nu-logo-label">{es ? 'Espacio seguro · Isotipo' : 'Safe space · Isotope'}</span>
            <Image src="/Images/Branding/Nurish/Artboard 22.png" alt="Espacio seguro isotipo" width={800} height={450} className="nu-logo-img" />
          </div>
        </div>
      </section>

      {/* PALETTE */}
      <section className="nu-palette">
        <h2 className="nu-section-title">{es ? 'Paleta de color' : 'Color palette'}</h2>
        <div className="nu-palette-grid">
          {[
            { color: '#ff1d44', name: es ? 'Rojo nürish' : 'Nürish red', hex: '#ff1d44', role: es ? 'Energía · Principal' : 'Energy · Primary' },
            { color: '#fbebaf', name: es ? 'Crema' : 'Cream', hex: '#fbebaf', role: es ? 'Calidez · Fondo' : 'Warmth · Background' },
            { color: '#74bf9d', name: es ? 'Verde salvia' : 'Sage green', hex: '#74bf9d', role: es ? 'Calma · Soporte' : 'Calm · Support' },
            { color: '#fbb03b', name: es ? 'Ámbar' : 'Amber', hex: '#fbb03b', role: es ? 'Secundario · Acento' : 'Secondary · Accent' },
            { color: '#662d91', name: es ? 'Morado' : 'Purple', hex: '#662d91', role: es ? 'Secundario · Contraste' : 'Secondary · Contrast' },
          ].map(s => (
            <div key={s.hex} className="nu-swatch">
              <div className="nu-swatch-color" style={{ background: s.color }} />
              <div className="nu-swatch-info">
                <span className="nu-swatch-name">{s.name}</span>
                <span className="nu-swatch-hex">{s.hex}</span>
                <span className="nu-swatch-role">{s.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VARIATIONS */}
      <section className="nu-variations">
        <div className="nu-variations-header">
          <h2 className="nu-section-title" style={{ margin: 0 }}>{es ? 'Flexibilidad cromática' : 'Color flexibility'}</h2>
          <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.6, maxWidth: 560 }}>
            {es
              ? 'El sistema funciona en cualquier combinación de la paleta. Cada variante mantiene contraste y legibilidad sin importar el fondo.'
              : 'The system works in any palette combination. Every variant maintains contrast and legibility regardless of background.'}
          </p>
        </div>
        <div className="nu-var-grid">
          <div className="nu-var-cell">
            <Image src="/Images/Branding/Nurish/Artboard 13.png" alt="Variaciones del wordmark" width={800} height={450} className="nu-var-img" />
          </div>
          <div className="nu-var-cell">
            <Image src="/Images/Branding/Nurish/Artboard 14.png" alt="Variaciones del isotipo" width={800} height={450} className="nu-var-img" />
          </div>
          <div className="nu-var-cell">
            <Image src="/Images/Branding/Nurish/Artboard 12.png" alt="Paleta de colores aplicada" width={800} height={450} className="nu-var-img" />
          </div>
        </div>
      </section>

      {/* PATTERN */}
      <section className="nu-pattern">
        <p className="nu-pattern-label">{es ? 'Patrón de marca' : 'Brand pattern'}</p>
        <Image src="/Images/Branding/Nurish/Artboard 16.png" alt="Patrón de marca nürish" width={1600} height={600} className="nu-pattern-img" />
      </section>

      {/* NEXT */}
      <Link href="/branding" className="nu-next">
        <div>
          <span className="nu-next-label">{es ? 'Volver al portafolio' : 'Back to portfolio'}</span>
          <span className="nu-next-name">BRANDING →</span>
        </div>
        <span className="nu-next-arrow">←</span>
      </Link>
    </div>
  );
}
