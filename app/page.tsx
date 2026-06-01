'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  .home-root {
    --bg: #F5F2ED;
    --ink: #0F0E0C;
    --ink-muted: #6B6860;
    --accent: #1A1464;
    --accent2: #E8421A;
    --rule: #D8D4CC;
    --card-bg: #EDEAE3;
    --mono: 'DM Mono', monospace;
    --display: 'Bebas Neue', sans-serif;
    --body: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--ink);
    font-family: var(--body);
    font-size: 16px;
    line-height: 1.5;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* NAV */
  .home-root nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 24px 48px;
    transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
  }
  .home-root nav.scrolled {
    background: rgba(245,242,237,0.94);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--rule);
    box-shadow: 0 2px 24px rgba(0,0,0,0.05);
  }
  .nav-logo {
    height: 40px; width: auto; display: block;
    opacity: 0; animation: fadeUp 0.8s 0.1s forwards;
  }
  .nav-right { display: flex; align-items: center; gap: 36px; }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a {
    font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--ink-muted); text-decoration: none;
    transition: color 0.25s ease; opacity: 0; animation: fadeUp 0.8s forwards;
    position: relative; padding-bottom: 3px;
  }
  .nav-links li:nth-child(1) a { animation-delay: 0.2s; }
  .nav-links li:nth-child(2) a { animation-delay: 0.3s; }
  .nav-links li:nth-child(3) a { animation-delay: 0.4s; }
  .nav-links a::after {
    content: ''; position: absolute;
    bottom: 0; left: 0; width: 0; height: 1px;
    background: var(--accent2);
    transition: width 0.35s cubic-bezier(0.23,1,0.32,1);
  }
  .nav-links a:hover { color: var(--accent2); }
  .nav-links a:hover::after { width: 100%; }

  /* LANG TOGGLE */
  .lang-toggle {
    display: flex; align-items: center; gap: 6px;
    opacity: 0; animation: fadeUp 0.8s 0.45s forwards;
  }
  .lang-btn {
    font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em;
    text-transform: uppercase; background: none; border: none; padding: 2px 0;
    transition: color 0.25s ease;
  }
  .lang-btn.active  { color: var(--ink); font-weight: 600; cursor: default; }
  .lang-btn.inactive { color: var(--ink-muted); cursor: pointer; }
  .lang-btn.inactive:hover { color: var(--accent2); }
  .lang-sep { font-family: var(--mono); font-size: 10px; color: var(--ink-muted); opacity: 0.4; user-select: none; }

  /* HERO */
  .hero {
    min-height: 100vh; padding: 120px 48px 80px;
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: end; gap: 0; position: relative;
    border-bottom: 1px solid var(--rule);
  }
  .hero::before {
    content: ''; position: absolute; top: 0; right: 0;
    width: 40%; height: 100%; background: var(--card-bg); z-index: 0;
  }
  .hero-left { position: relative; z-index: 1; padding-bottom: 0; }
  .hero-eyebrow {
    font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--ink-muted); margin-bottom: 28px;
    opacity: 0; animation: fadeUp 0.9s 0.3s forwards;
    display: flex; align-items: center; gap: 12px;
  }
  .hero-eyebrow::before { content: ''; display: inline-block; width: 32px; height: 1px; background: var(--ink-muted); }
  .hero-name {
    font-family: var(--display); font-size: clamp(80px, 10vw, 160px);
    line-height: 0.92; letter-spacing: -0.01em; color: var(--ink);
    opacity: 0; animation: fadeUp 1s 0.4s forwards;
  }
  .hero-name span { color: var(--accent2); display: block; }
  .hero-title {
    font-family: var(--display); font-size: clamp(28px, 4vw, 52px);
    letter-spacing: 0.02em; color: var(--ink-muted); margin-top: 16px;
    opacity: 0; animation: fadeUp 1s 0.55s forwards;
  }
  .hero-right {
    position: relative; z-index: 1; padding: 0 0 0 60px;
    display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 12px;
  }
  .hero-desc {
    font-size: 17px; line-height: 1.7; color: var(--ink-muted); max-width: 360px;
    opacity: 0; animation: fadeUp 1s 0.65s forwards; margin-bottom: 40px;
  }
  .hero-cta {
    display: inline-flex; align-items: center; gap: 12px;
    background: var(--accent); color: white; text-decoration: none;
    font-family: var(--mono); font-size: 11px; letter-spacing: 0.15em;
    text-transform: uppercase; padding: 16px 28px;
    opacity: 0; animation: fadeUp 1s 0.75s forwards;
    transition: background 0.35s cubic-bezier(0.23,1,0.32,1), gap 0.3s cubic-bezier(0.23,1,0.32,1), transform 0.25s ease;
    width: fit-content;
  }
  .hero-cta:hover { background: var(--accent2); gap: 20px; transform: translateY(-2px); }
  .hero-cta svg { transition: transform 0.3s cubic-bezier(0.23,1,0.32,1); }
  .hero-cta:hover svg { transform: translateX(4px); }
  .hero-scroll-indicator {
    position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    opacity: 0; animation: fadeUp 1s 1.2s forwards;
  }
  .hero-scroll-indicator span {
    font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--ink-muted); writing-mode: vertical-rl;
  }
  .scroll-line {
    width: 1px; height: 48px;
    background: linear-gradient(to bottom, var(--ink-muted), transparent);
    animation: scrollPulse 2s 1.5s infinite;
  }

  /* SECTION HEADER */
  .section-header {
    display: flex; align-items: baseline; justify-content: space-between;
    padding: 72px 48px 44px; border-bottom: 1px solid var(--rule);
  }
  .section-title { font-family: var(--display); font-size: clamp(40px, 6vw, 80px); line-height: 1; color: var(--ink); }
  .section-count { font-family: var(--mono); font-size: 11px; letter-spacing: 0.15em; color: var(--ink-muted); }

  /* PROJECT GRID */
  .projects { display: grid; grid-template-columns: 1fr 1fr; }
  .project-card {
    border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule);
    overflow: hidden; position: relative;
    opacity: 0; transform: translateY(30px);
    transition: opacity 0.7s, transform 0.7s, box-shadow 0.4s ease;
  }
  .project-card.visible { opacity: 1; transform: none; }
  .project-card:hover { box-shadow: 0 8px 48px rgba(0,0,0,0.08); z-index: 1; transition-delay: 0s; }
  .project-card:nth-child(even) { border-right: none; }
  .project-card::after {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: var(--accent2);
    transform: scaleX(0); transform-origin: left center;
    transition: transform 0.5s cubic-bezier(0.23,1,0.32,1);
    z-index: 2;
  }
  .project-card:hover::after { transform: scaleX(1); }
  .project-card-inner {
    padding: 40px 48px; height: 100%; display: flex; flex-direction: column;
    position: relative; transition: background 0.35s ease;
  }
  .project-card:hover .project-card-inner { background: var(--card-bg); transition-delay: 0s; }
  .project-card.featured { grid-column: 1 / -1; border-right: none; }
  .project-card.featured .project-card-inner {
    display: grid; grid-template-columns: 1fr 1fr; gap: 60px;
    padding: 60px 48px; min-height: 480px;
  }
  .project-meta { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
  .project-num { font-family: var(--mono); font-size: 10px; letter-spacing: 0.15em; color: var(--ink-muted); }
  .project-tag {
    font-family: var(--mono); font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 4px 10px; border: 1px solid var(--rule); color: var(--ink-muted); border-radius: 2px;
    transition: border-color 0.3s ease;
  }
  .project-tag.flagship { background: var(--accent); color: white; border-color: var(--accent); }
  .project-name {
    font-family: var(--display); font-size: clamp(36px, 4vw, 56px); line-height: 1;
    letter-spacing: 0.01em; color: var(--ink); margin-bottom: 16px;
    transition: color 0.3s cubic-bezier(0.23,1,0.32,1);
  }
  .project-card:hover .project-name { color: var(--accent2); }
  .project-desc { font-size: 15px; line-height: 1.65; color: var(--ink-muted); max-width: 380px; flex: 1; }
  .project-footer {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--rule);
  }
  .project-tools { display: flex; gap: 8px; flex-wrap: wrap; }
  .tool-chip {
    font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 3px 8px; background: transparent; border: 1px solid var(--rule);
    color: var(--ink-muted); border-radius: 1px;
    transition: border-color 0.3s ease, color 0.3s ease;
  }
  .project-card:hover .tool-chip { border-color: rgba(232,66,26,0.25); color: var(--ink-muted); }
  .project-arrow {
    width: 40px; height: 40px; border: 1px solid var(--rule);
    display: flex; align-items: center; justify-content: center; color: var(--ink-muted);
    transition: background 0.3s cubic-bezier(0.23,1,0.32,1), color 0.3s, border-color 0.3s, transform 0.4s cubic-bezier(0.23,1,0.32,1);
    flex-shrink: 0; text-decoration: none;
  }
  .project-card:hover .project-arrow {
    background: var(--accent2); color: white; border-color: var(--accent2); transform: rotate(45deg);
  }
  .project-card:nth-child(2) .project-num { color: var(--accent2); }
  .project-card:nth-child(3) .project-num { color: var(--accent); }
  .project-card:nth-child(4) .project-num { color: #2D8B6F; }
  .project-card:nth-child(5) .project-num { color: #8B2D6F; }
  .project-card:nth-child(6) .project-num { color: #E8B41A; }

  /* ── HABITA FAN — phones cluster near center with overlap ── */
  .habita-screens { display: flex; align-items: center; justify-content: center; position: relative; height: 320px; }
  .phone-mock {
    width: 130px; height: 260px; background: #0d1117; border-radius: 20px; overflow: hidden;
    border: 2px solid #1e2433; position: absolute;
    box-shadow: 0 20px 60px rgba(0,0,0,0.25);
    transition: transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s ease;
  }
  .phone-mock img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
  .phone-mock:nth-child(1) {
    left: 50%;
    transform: translateX(-50%) translateX(-90px) rotate(-12deg) translateY(20px);
    z-index: 1;
  }
  .phone-mock:nth-child(2) {
    left: 50%;
    transform: translateX(-50%) translateY(-5px);
    z-index: 3; width: 145px; height: 290px;
  }
  .phone-mock:nth-child(3) {
    left: 50%;
    transform: translateX(-50%) translateX(90px) rotate(12deg) translateY(20px);
    z-index: 1;
  }
  .project-card:hover .phone-mock:nth-child(1) {
    transform: translateX(-50%) translateX(-115px) rotate(-14deg) translateY(8px);
    box-shadow: 0 28px 72px rgba(0,0,0,0.32);
  }
  .project-card:hover .phone-mock:nth-child(2) {
    transform: translateX(-50%) translateY(-22px);
    box-shadow: 0 32px 80px rgba(0,0,0,0.38);
  }
  .project-card:hover .phone-mock:nth-child(3) {
    transform: translateX(-50%) translateX(115px) rotate(14deg) translateY(8px);
    box-shadow: 0 28px 72px rgba(0,0,0,0.32);
  }

  /* ESDESIGN */
  .es-comparison { display: flex; align-items: center; gap: 12px; margin: 24px 0 0; }
  .es-panel { flex: 1; display: flex; flex-direction: column; gap: 8px; }
  .es-label-tag { font-family: var(--mono); font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-muted); padding: 3px 8px; border: 1px solid var(--rule); border-radius: 2px; width: fit-content; }
  .es-label-after { border-color: #E8421A; color: #E8421A; }
  .es-divider { font-family: var(--mono); font-size: 18px; color: var(--ink-muted); flex-shrink: 0; opacity: 0.4; }
  .es-screen { border-radius: 6px; padding: 16px 14px; display: flex; flex-direction: column; gap: 7px; font-size: 10px; position: relative; overflow: hidden; min-height: 200px; }
  .es-screen-before { background: linear-gradient(135deg, #d4c5e2 0%, #b8d4e8 40%, #e8d4c5 100%); border: 1px solid #ccc; }
  .es-screen-after { background: #fff; border: 1px solid #e0e0e0; }
  .es-bg-blob { position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; border-radius: 50%; background: radial-gradient(circle, rgba(255,200,150,0.4), transparent); pointer-events: none; }
  .es-brand-before, .es-brand-after { display: flex; align-items: baseline; gap: 3px; }
  .es-es-before, .es-es-after { font-weight: 900; font-size: 13px; color: #E8421A; }
  .es-design-before { font-weight: 700; font-size: 11px; color: #333; }
  .es-design-after { font-weight: 700; font-size: 11px; color: #1a1a2e; }
  .es-sub-before { font-size: 7px; color: rgba(0,0,0,0.4); line-height: 1.3; }
  .es-sub-after { font-size: 7px; color: #888; line-height: 1.3; }
  .es-field-dark { background: rgba(0,0,0,0.55); color: rgba(255,255,255,0.5); padding: 5px 8px; border-radius: 3px; font-size: 9px; }
  .es-btn-before { background: #fff; color: #555; text-align: center; padding: 6px; border-radius: 3px; font-size: 9px; font-weight: 500; margin-top: 4px; }
  .es-error-badge { font-size: 8px; color: #E8421A; background: rgba(232,66,26,0.1); padding: 2px 6px; border-radius: 2px; border: 1px solid rgba(232,66,26,0.3); width: fit-content; }
  .es-blackboard { font-size: 9px; font-weight: 600; color: #222; }
  .es-section-label { font-size: 11px; font-weight: 700; color: #111; margin-top: 4px; }
  .es-field-clean { background: #f7f7f7; color: #aaa; padding: 5px 8px; border-radius: 3px; font-size: 9px; border: 1px solid #e8e8e8; }
  .es-forgot { font-size: 8px; color: #E8421A; }
  .es-btn-after { background: #ccc; color: #888; text-align: center; padding: 6px; border-radius: 3px; font-size: 9px; font-weight: 600; margin-top: 4px; }

  /* SUBSTRACK */
  .substrack-preview { display: flex; border: 1px solid var(--rule); border-radius: 6px; overflow: hidden; margin: 24px 0 0; height: 220px; background: #fff; font-family: var(--body); font-size: 11px; flex-shrink: 0; }
  .sp-sidebar { width: 52px; background: #0F0E0C; display: flex; flex-direction: column; align-items: center; padding: 12px 0; gap: 16px; flex-shrink: 0; }
  .sp-logo { font-family: var(--display); font-size: 14px; color: white; letter-spacing: 0.05em; margin-bottom: 4px; }
  .sp-nav-item { font-size: 13px; color: rgba(255,255,255,0.35); cursor: default; padding: 6px; border-radius: 4px; }
  .sp-nav-item.active { color: white; background: rgba(255,255,255,0.12); }
  .sp-main { flex: 1; display: flex; flex-direction: column; padding: 14px 16px; overflow: hidden; border-right: 1px solid #eee; }
  .sp-topbar { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .sp-module-title { font-family: var(--display); font-size: 16px; color: #0F0E0C; flex: 1; }
  .sp-search { flex: 2; border: 1px solid #ddd; border-radius: 20px; padding: 4px 10px; font-size: 10px; color: #aaa; background: #fafafa; }
  .sp-btn { background: #7B2FBE; color: white; border-radius: 20px; padding: 4px 12px; font-size: 10px; font-weight: 500; white-space: nowrap; flex-shrink: 0; }
  .sp-filters { display: flex; gap: 6px; margin-bottom: 10px; }
  .sp-chip { border: 1px solid #ddd; border-radius: 20px; padding: 2px 10px; font-size: 9px; color: #888; }
  .sp-chip.active { border-color: #7B2FBE; color: #7B2FBE; background: #f3eaff; }
  .sp-thead { display: grid; grid-template-columns: 2fr 1.2fr 1.5fr 1fr 1fr; background: #f5f5f5; padding: 5px 8px; border-radius: 3px; gap: 4px; margin-bottom: 2px; }
  .sp-thead span { font-size: 9px; font-weight: 600; color: #555; text-transform: uppercase; letter-spacing: 0.05em; }
  .sp-trow { display: grid; grid-template-columns: 2fr 1.2fr 1.5fr 1fr 1fr; padding: 5px 8px; border-bottom: 1px solid #f0f0f0; gap: 4px; }
  .sp-trow.muted span { color: #bbb; }
  .sp-trow span { font-size: 10px; color: #444; }
  .sp-status { color: #2D8B6F !important; font-weight: 500; }
  .sp-status.warn { color: #E8421A !important; }
  .sp-detail { width: 140px; padding: 14px 12px; display: flex; flex-direction: column; gap: 8px; flex-shrink: 0; }
  .sp-detail-title { font-family: var(--display); font-size: 14px; line-height: 1.1; color: #0F0E0C; margin-bottom: 4px; }
  .sp-detail-row { display: flex; flex-direction: column; gap: 1px; border-bottom: 1px solid #f0f0f0; padding-bottom: 6px; }
  .sp-detail-row span:first-child { font-size: 8px; color: #aaa; text-transform: uppercase; letter-spacing: 0.08em; }
  .sp-detail-row span:last-child { font-size: 10px; color: #333; font-weight: 500; }
  .sp-actions-btn { margin-top: auto; border: 1px solid #7B2FBE; color: #7B2FBE; border-radius: 4px; padding: 5px 8px; font-size: 9px; text-align: center; }

  /* ── MARQUEE — inline-flex fixes the infinite loop ── */
  .marquee-wrap { overflow: hidden; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); padding: 28px 0; background: var(--accent); }
  .marquee-track { display: inline-flex; white-space: nowrap; animation: marquee 30s linear infinite; will-change: transform; }
  .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
  .marquee-item { font-family: var(--display); font-size: 30px; letter-spacing: 0.05em; color: rgba(255,255,255,0.7); padding: 0 52px; flex-shrink: 0; }
  .marquee-item span { color: var(--accent2); margin-right: 8px; }

  /* SUB-SECTION HEADER */
  .sub-section-header {
    padding: 32px 48px;
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    display: flex; align-items: baseline; gap: 20px;
  }
  .sub-section-title {
    font-family: var(--display);
    font-size: clamp(24px, 3vw, 40px);
    color: var(--ink); letter-spacing: 0.02em;
  }
  .sub-section-tag {
    font-family: var(--mono); font-size: 9px; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--ink-muted);
  }

  /* BRANDING SECTION */
  .branding-section { border-bottom: 1px solid var(--rule); }
  .branding-placeholder {
    padding: 80px 48px;
    background: repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(0,0,0,0.018) 8px, rgba(0,0,0,0.018) 16px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    min-height: 300px; gap: 16px;
  }
  .coming-soon-badge {
    font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--ink-muted); opacity: 0.55;
    border: 1px dashed var(--rule); padding: 12px 28px;
  }
  .branding-coming-text {
    font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
    color: var(--ink-muted); opacity: 0.45; text-align: center;
    max-width: 360px; line-height: 1.7;
  }

  /* SKILLS */
  .skills-section { border-bottom: 1px solid var(--rule); }
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
  .skill-block {
    padding: 56px 48px; border-right: 1px solid var(--rule);
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.6s, transform 0.6s, background 0.35s ease;
  }
  .skill-block.visible { opacity: 1; transform: none; }
  .skill-block:hover { background: var(--card-bg); }
  .skill-block:last-child { border-right: none; }
  .skill-icon {
    font-size: 28px; margin-bottom: 20px; display: inline-block;
    transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
  }
  .skill-block:hover .skill-icon { transform: translateY(-4px) scale(1.15); }
  .skill-name { font-family: var(--display); font-size: 30px; letter-spacing: 0.02em; color: var(--ink); margin-bottom: 14px; }
  .skill-desc { font-size: 14px; line-height: 1.7; color: var(--ink-muted); }

  /* FOOTER */
  .home-root footer { padding: 80px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: end; }
  .footer-headline { font-family: var(--display); font-size: clamp(48px, 7vw, 96px); line-height: 0.95; letter-spacing: -0.01em; color: var(--ink); }
  .footer-headline em { font-style: normal; color: var(--accent2); }
  .footer-right { display: flex; flex-direction: column; gap: 32px; align-items: flex-end; }
  .footer-email {
    font-family: var(--mono); font-size: 13px; letter-spacing: 0.08em;
    color: var(--ink-muted); text-decoration: none;
    position: relative; display: inline-block;
    transition: color 0.25s ease;
  }
  .footer-email::after {
    content: ''; position: absolute;
    bottom: -2px; left: 0; width: 0; height: 1px;
    background: var(--accent2);
    transition: width 0.4s cubic-bezier(0.23,1,0.32,1);
  }
  .footer-email:hover { color: var(--accent2); }
  .footer-email:hover::after { width: 100%; }
  .footer-socials { display: flex; gap: 24px; }
  .footer-socials a {
    font-family: var(--mono); font-size: 10px; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--ink-muted); text-decoration: none;
    transition: color 0.25s ease;
    position: relative; padding-bottom: 2px;
  }
  .footer-socials a::after {
    content: ''; position: absolute;
    bottom: 0; left: 0; width: 0; height: 1px;
    background: var(--accent2);
    transition: width 0.35s cubic-bezier(0.23,1,0.32,1);
  }
  .footer-socials a:hover { color: var(--accent2); }
  .footer-socials a:hover::after { width: 100%; }
  .footer-copy { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; color: var(--ink-muted); border-top: 1px solid var(--rule); padding: 24px 48px; display: flex; justify-content: space-between; }

  /* ANIMATIONS */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scrollPulse { 0%, 100% { opacity: 0.4; transform: scaleY(1); } 50% { opacity: 1; transform: scaleY(1.2); } }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  .project-card:nth-child(1) { transition-delay: 0s; }
  .project-card:nth-child(2) { transition-delay: 0.1s; }
  .project-card:nth-child(3) { transition-delay: 0.15s; }
  .project-card:nth-child(4) { transition-delay: 0.2s; }
  .project-card:nth-child(5) { transition-delay: 0.25s; }
  .project-card:nth-child(6) { transition-delay: 0.3s; }
  .skill-block:nth-child(2) { transition-delay: 0.1s; }
  .skill-block:nth-child(3) { transition-delay: 0.2s; }
`;

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  es: {
    nav: { projects: 'Proyectos', skills: 'Skills', contact: 'Contacto' },
    hero: {
      eyebrow: 'UX/UI & Product Designer',
      desc: 'Diseño experiencias digitales centradas en las personas — desde la investigación hasta el prototipado y los sistemas de diseño. Especialista en apps móviles, design systems y estrategia UX.',
      cta: 'Ver proyectos',
      scroll: 'scroll',
    },
    projects: {
      label: 'Proyectos', count: '10 casos de diseño',
      uxuiLabel: 'UX / UI', brandingLabel: 'Branding', comingSoon: 'Próximamente',
      habita: {
        tag1: 'Proyecto Insignia', tag2: 'App Móvil',
        desc: 'App de smart home que centraliza el control de todos los dispositivos del hogar en una sola interfaz. Diseño end-to-end: UI Kit, branding, prototipado navegable y pruebas de usuario con 5 participantes.',
        tools: ['Figma','Maze','Claude','ChatGPT','UI Kit','User Testing'],
      },
      substrack: {
        tag1: 'Web App · UI', tag2: 'Design System',
        desc: 'Dashboard web para centralizar suscripciones activas — streaming, gimnasios, plataformas IA — con gestión de estado y panel de detalle en una sola vista.',
        tools: ['Figma','Atomic Design','Autolayout','Responsive'],
        ui: { title: 'Membresías', search: 'Nombre de la membresía', filters: ['Activas','Inactivas','Por vencer'], cols: ['Producto','Estado','Renovación','Plan','Costo'] },
      },
      esdesign: {
        tag1: 'Web · Rediseño', tag2: 'WCAG · Accesibilidad',
        desc: 'Auditoría WCAG AA del login de EsDesign — contraste insuficiente, jerarquía visual rota, labels ilegibles. Rediseño completo hasta UI final limpia y accesible.',
        tools: ['Figma','WCAG AA','Wireframe','Componentes'],
        before: 'Antes', after: 'Después',
      },
      simple: [
        { num:'04', tags:['Design System'],           name:'Sistema de Turnos',        desc:'Design system completo para una app de gestión de turnos: átomos, moléculas y organismos, prototipo navegable y pruebas de usuario con Maze.', tools:['Figma','Maze','Atomic Design'] },
        { num:'05', tags:['UX Research'],              name:'Pruebas de Usabilidad',    desc:'Prueba moderada con 5 usuarios para medir tiempo en tarea y detectar fricciones de navegación. Síntesis de hallazgos y recomendaciones documentadas.', tools:['Maze','Figma'] },
        { num:'06', tags:['Design System · Handoff'],  name:'Cards Documentation',      desc:'Documentación exhaustiva de componentes card: especificaciones visuales, reglas de comportamiento, estados de interacción y entregable de handoff.', tools:['Figma','Claude'] },
      ],
    },
    skills: {
      label: 'Expertise',
      items: [
        { icon:'◎', name:'UX Research',          desc:'User personas, flujos de usuario, arquitectura de información, pruebas de usabilidad moderadas y síntesis de hallazgos en recomendaciones accionables.' },
        { icon:'▦', name:'UI & Design Systems',   desc:'Atomic design, componentes reutilizables, tokens de diseño, documentación de handoff y sistemas escalables desde wireframe hasta UI final.' },
        { icon:'◈', name:'Producto & Estrategia', desc:'Traducción de necesidades de usuario en decisiones de diseño concretas. Manejo de IA como herramienta de diseño para mejorar accesibilidad y legibilidad.' },
      ],
    },
    footer: {
      headlineHtml: 'Hablemos<br>de tu<br><em>próximo</em><br>proyecto.',
      cta: 'Ver todos los proyectos',
      copy1: '© 2025 Juan José Bernal Núñez',
      copy2: 'UX/UI & Product Designer — Bogotá, CO',
    },
  },
  en: {
    nav: { projects: 'Projects', skills: 'Skills', contact: 'Contact' },
    hero: {
      eyebrow: 'UX/UI & Product Designer',
      desc: 'I design human-centered digital experiences — from research and user flows to prototyping and design systems. Specialized in mobile apps, design systems and UX strategy.',
      cta: 'View projects',
      scroll: 'scroll',
    },
    projects: {
      label: 'Projects', count: '10 design cases',
      uxuiLabel: 'UX / UI', brandingLabel: 'Branding', comingSoon: 'Coming soon',
      habita: {
        tag1: 'Flagship Project', tag2: 'Mobile App',
        desc: 'Smart home app that centralizes control of all household devices in a single interface. End-to-end design: UI Kit, branding, interactive prototype, and user testing with 5 participants.',
        tools: ['Figma','Maze','Claude','ChatGPT','UI Kit','User Testing'],
      },
      substrack: {
        tag1: 'Web App · UI', tag2: 'Design System',
        desc: 'Web dashboard to centralize active subscriptions — streaming, gyms, AI platforms — with status management and detail panel in a single view.',
        tools: ['Figma','Atomic Design','Autolayout','Responsive'],
        ui: { title: 'Memberships', search: 'Membership name', filters: ['Active','Inactive','Expiring'], cols: ['Product','Status','Renewal','Plan','Cost'] },
      },
      esdesign: {
        tag1: 'Web · Redesign', tag2: 'WCAG · Accessibility',
        desc: 'WCAG AA audit of EsDesign\'s login — insufficient contrast, broken visual hierarchy, unreadable labels. Full redesign to a clean, accessible final UI.',
        tools: ['Figma','WCAG AA','Wireframe','Components'],
        before: 'Before', after: 'After',
      },
      simple: [
        { num:'04', tags:['Design System'],           name:'Queue Management System',  desc:'Complete design system for a queue management app: atoms, molecules and organisms, interactive prototype, and user testing with Maze.', tools:['Figma','Maze','Atomic Design'] },
        { num:'05', tags:['UX Research'],              name:'Usability Testing',        desc:'Moderated test with 5 users to measure task completion time and detect navigation friction. Findings synthesis and documented improvement recommendations.', tools:['Maze','Figma'] },
        { num:'06', tags:['Design System · Handoff'],  name:'Cards Documentation',      desc:'Comprehensive component documentation: visual specs, behavior rules, interaction states, and developer-ready handoff deliverable.', tools:['Figma','Claude'] },
      ],
    },
    skills: {
      label: 'Expertise',
      items: [
        { icon:'◎', name:'UX Research',          desc:'User personas, user flows, information architecture, moderated usability testing, and synthesis of findings into actionable recommendations.' },
        { icon:'▦', name:'UI & Design Systems',   desc:'Atomic design, reusable components, design tokens, handoff documentation, and scalable systems from wireframe to final UI.' },
        { icon:'◈', name:'Product & Strategy',    desc:'Translating user needs into concrete design decisions. Using AI as a design tool to improve accessibility, legibility, and iteration speed.' },
      ],
    },
    footer: {
      headlineHtml: "Let's<br>talk about<br>your <em>next</em><br>project.",
      cta: 'View all projects',
      copy1: '© 2025 Juan José Bernal Núñez',
      copy2: 'UX/UI & Product Designer — Bogotá, CO',
    },
  },
} as const;

type Lang = keyof typeof T;

// ─── Constants ────────────────────────────────────────────────────────────────
const S = '/Images/Habita/Smart%20Home%20Mobile%20App%20Prototype';

const MARQUEE = [
  'UX Research','Design Systems','Prototyping','User Testing',
  'Figma','Mobile Apps','Information Architecture','UI Design',
  'Claude Code','Accessibility','Wireframing','Branding',
];

const ARROW_SVG = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const { lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const t = T[lang as Lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 },
    );
    document.querySelectorAll('.project-card, .skill-block').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="home-root">

        {/* ── NAV ── */}
        <nav className={scrolled ? 'scrolled' : ''}>
          <img
            src="/Images/LogoJJB/Logo%20JJB%20negro.png"
            alt="Juan José Bernal"
            className="nav-logo"
          />
          <div className="nav-right">
            <ul className="nav-links">
              <li><a href="#projects">{t.nav.projects}</a></li>
              <li><a href="#skills">{t.nav.skills}</a></li>
              <li><a href="#contact">{t.nav.contact}</a></li>
            </ul>
            <div className="lang-toggle">
              <button
                className={`lang-btn ${lang === 'es' ? 'active' : 'inactive'}`}
                onClick={() => setLang('es')}
              >ES</button>
              <span className="lang-sep">·</span>
              <button
                className={`lang-btn ${lang === 'en' ? 'active' : 'inactive'}`}
                onClick={() => setLang('en')}
              >EN</button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-left">
            <div className="hero-eyebrow">{t.hero.eyebrow}</div>
            <h1 className="hero-name">
              Juan<br />Jose
              <span>Bernal</span>
            </h1>
            <p className="hero-title">Bogotá, Colombia</p>
          </div>
          <div className="hero-right">
            <p className="hero-desc">{t.hero.desc}</p>
            <a href="#projects" className="hero-cta">
              {t.hero.cta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          <div className="hero-scroll-indicator">
            <div className="scroll-line" />
            <span>{t.hero.scroll}</span>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} className="marquee-item"><span>✦</span> {item}</span>
            ))}
          </div>
        </div>

        {/* ── PROJECTS ── */}
        <section id="projects">
          <div className="section-header">
            <h2 className="section-title">{t.projects.label}</h2>
          </div>

          {/* UX/UI sub-section */}
          <div className="sub-section-header">
            <span className="sub-section-title">{t.projects.uxuiLabel}</span>
            <span className="sub-section-tag">UX · UI · Product</span>
          </div>

          <div className="projects">

            {/* 01 Habita — featured */}
            <div className="project-card featured">
              <div className="project-card-inner">
                <div>
                  <div className="project-meta">
                    <span className="project-num">01</span>
                    <span className="project-tag flagship">{t.projects.habita.tag1}</span>
                    <span className="project-tag">{t.projects.habita.tag2}</span>
                  </div>
                  <h3 className="project-name">Habita</h3>
                  <p className="project-desc">{t.projects.habita.desc}</p>
                  <div className="project-footer">
                    <div className="project-tools">
                      {t.projects.habita.tools.map(tool => (
                        <span key={tool} className="tool-chip">{tool}</span>
                      ))}
                    </div>
                    <Link href="/projects/habita" className="project-arrow">{ARROW_SVG}</Link>
                  </div>
                </div>
                <div className="habita-screens">
                  <div className="phone-mock"><img src="/Images/Habita/Sala%20Habita.jpg"       alt="Habita Sala" /></div>
                  <div className="phone-mock"><img src="/Images/Habita/Home%20Habita.png"       alt="Habita Home" /></div>
                  <div className="phone-mock"><img src="/Images/Habita/Dormitorio%20Habita.jpg" alt="Habita Dormitorio" /></div>
                </div>
              </div>
            </div>

            {/* 02 Substrack */}
            <div className="project-card">
              <div className="project-card-inner">
                <div className="project-meta">
                  <span className="project-num">02</span>
                  <span className="project-tag">{t.projects.substrack.tag1}</span>
                  <span className="project-tag">{t.projects.substrack.tag2}</span>
                </div>
                <h3 className="project-name">Substrack</h3>
                <p className="project-desc">{t.projects.substrack.desc}</p>
                <div className="substrack-preview">
                  <div className="sp-sidebar">
                    <div className="sp-logo">JB</div>
                    <div className="sp-nav-item active">▦</div>
                    <div className="sp-nav-item">🔔</div>
                    <div className="sp-nav-item">◷</div>
                    <div className="sp-nav-item" style={{ marginTop: 'auto' }}>👤</div>
                  </div>
                  <div className="sp-main">
                    <div className="sp-topbar">
                      <span className="sp-module-title">{t.projects.substrack.ui.title}</span>
                      <div className="sp-search">{t.projects.substrack.ui.search}</div>
                      <div className="sp-btn">{lang === 'es' ? 'Buscar' : 'Search'}</div>
                    </div>
                    <div className="sp-filters">
                      {t.projects.substrack.ui.filters.map((f, i) => (
                        <span key={f} className={`sp-chip${i === 0 ? ' active' : ''}`}>{f}</span>
                      ))}
                    </div>
                    <div className="sp-table">
                      <div className="sp-thead">
                        {t.projects.substrack.ui.cols.map(c => <span key={c}>{c}</span>)}
                      </div>
                      {[
                        { name:'Netflix', status: lang==='es'?'Activa':'Active', date:'15 Jun', plan:'Premium', cost:'$18', warn:false },
                        { name:'Spotify', status: lang==='es'?'Activa':'Active', date:'20 Jun', plan:'Duo',     cost:'$12', warn:false },
                        { name:'Gym',     status: lang==='es'?'Vence':'Expires', date:'30 Jun', plan:lang==='es'?'Mensual':'Monthly', cost:'$35', warn:true, muted:true },
                        { name:'Claude',  status: lang==='es'?'Activa':'Active', date:'01 Jul', plan:'Pro',     cost:'$20', warn:false, muted:true },
                      ].map(row => (
                        <div key={row.name} className={`sp-trow${(row as { muted?: boolean }).muted ? ' muted' : ''}`}>
                          <span>{row.name}</span>
                          <span className={`sp-status${row.warn ? ' warn' : ''}`}>{row.status}</span>
                          <span>{row.date}</span><span>{row.plan}</span><span>{row.cost}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="sp-detail">
                    <div className="sp-detail-title">Subscription<br />product</div>
                    {(lang === 'es'
                      ? [['Proveedor','Netflix Inc.'],['Ciclo','Mensual'],['Próximo cobro','15 Jun'],['Total año','$216']]
                      : [['Provider','Netflix Inc.'],['Cycle','Monthly'],['Next charge','Jun 15'],['Year total','$216']]
                    ).map(([k, v]) => (
                      <div key={k} className="sp-detail-row"><span>{k}</span><span>{v}</span></div>
                    ))}
                    <div className="sp-actions-btn">{lang === 'es' ? 'Acciones ▾' : 'Actions ▾'}</div>
                  </div>
                </div>
                <div className="project-footer">
                  <div className="project-tools">
                    {t.projects.substrack.tools.map(tool => <span key={tool} className="tool-chip">{tool}</span>)}
                  </div>
                  <Link href="/projects/substrack" className="project-arrow">{ARROW_SVG}</Link>
                </div>
              </div>
            </div>

            {/* 03 EsDesign */}
            <div className="project-card">
              <div className="project-card-inner">
                <div className="project-meta">
                  <span className="project-num">03</span>
                  <span className="project-tag">{t.projects.esdesign.tag1}</span>
                  <span className="project-tag">{t.projects.esdesign.tag2}</span>
                </div>
                <h3 className="project-name">EsDesign Login</h3>
                <p className="project-desc">{t.projects.esdesign.desc}</p>
                <div className="es-comparison">
                  <div className="es-panel">
                    <div className="es-label-tag">{t.projects.esdesign.before}</div>
                    <div className="es-screen es-screen-before">
                      <div className="es-brand-before">
                        <span className="es-es-before">ES</span>
                        <span className="es-design-before">DESIGN</span>
                      </div>
                      <div className="es-sub-before">ESCUELA SUPERIOR<br />DE DISEÑO DE BARCELONA</div>
                      <div className="es-bg-blob" />
                      <div className="es-field-dark">juanjose-bernal4@gmail.com</div>
                      <div className="es-field-dark">••••••••</div>
                      <div className="es-btn-before">{lang === 'es' ? 'Iniciar sesión' : 'Sign in'}</div>
                      <div className="es-error-badge">⚠ {lang === 'es' ? 'Bajo contraste' : 'Low contrast'}</div>
                    </div>
                  </div>
                  <div className="es-divider">→</div>
                  <div className="es-panel">
                    <div className="es-label-tag es-label-after">{t.projects.esdesign.after}</div>
                    <div className="es-screen es-screen-after">
                      <div className="es-brand-after">
                        <span className="es-es-after">ES</span>
                        <span className="es-design-after">DESIGN</span>
                      </div>
                      <div className="es-sub-after">ESCUELA SUPERIOR DE DISEÑO<br />DE BARCELONA</div>
                      <div className="es-blackboard">Blackboard ∧</div>
                      <div className="es-section-label">{lang === 'es' ? 'Inicio de sesión' : 'Sign in'}</div>
                      <div className="es-field-clean">{lang === 'es' ? 'Correo electrónico' : 'Email address'}</div>
                      <div className="es-field-clean">••••</div>
                      <div className="es-forgot">{lang === 'es' ? '¿Olvidó contraseña?' : 'Forgot password?'}</div>
                      <div className="es-btn-after">Login</div>
                    </div>
                  </div>
                </div>
                <div className="project-footer">
                  <div className="project-tools">
                    {t.projects.esdesign.tools.map(tool => <span key={tool} className="tool-chip">{tool}</span>)}
                  </div>
                  <div className="project-arrow">{ARROW_SVG}</div>
                </div>
              </div>
            </div>

            {/* 04–06 simple cards */}
            {t.projects.simple.map(p => (
              <div key={p.num} className="project-card">
                <div className="project-card-inner">
                  <div className="project-meta">
                    <span className="project-num">{p.num}</span>
                    {p.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
                  </div>
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-footer">
                    <div className="project-tools">
                      {p.tools.map(tool => <span key={tool} className="tool-chip">{tool}</span>)}
                    </div>
                    <div className="project-arrow">{ARROW_SVG}</div>
                  </div>
                </div>
              </div>
            ))}

          </div>

        </section>

        {/* ── BRANDING ── */}
        <section id="branding" className="branding-section">
          <div className="section-header">
            <h2 className="section-title">{t.projects.brandingLabel}</h2>
            <span className="section-count">{lang === 'es' ? 'Identidad visual · Sistemas de marca' : 'Visual identity · Brand systems'}</span>
          </div>
          <div className="branding-placeholder">
            <span className="coming-soon-badge">{t.projects.comingSoon}</span>
            <p className="branding-coming-text">
              {lang === 'es'
                ? 'Proyectos de identidad visual y sistemas de marca en proceso.'
                : 'Visual identity and brand system projects in progress.'}
            </p>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="skills-section">
          <div className="section-header">
            <h2 className="section-title">{t.skills.label}</h2>
          </div>
          <div className="skills-grid">
            {t.skills.items.map(s => (
              <div key={s.name} className="skill-block">
                <span className="skill-icon">{s.icon}</span>
                <div className="skill-name">{s.name}</div>
                <p className="skill-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER / CONTACT ── */}
        <footer id="contact">
          <div>
            <h2
              className="footer-headline"
              dangerouslySetInnerHTML={{ __html: t.footer.headlineHtml }}
            />
          </div>
          <div className="footer-right">
            <a href="mailto:juanjose.bernal14@gmail.com" className="footer-email">
              juanjose.bernal14@gmail.com
            </a>
            <div className="footer-socials">
              <a href="https://www.linkedin.com/in/juanjosebernal-uxuidesigner/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.behance.net/juanjoseb" target="_blank" rel="noopener noreferrer">Behance</a>
              <a href="#">Figma Community</a>
            </div>
            <a href="#projects" className="hero-cta" style={{ marginTop: 8 }}>
              {t.footer.cta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </footer>

        <div className="footer-copy">
          <span>{t.footer.copy1}</span>
          <span>{t.footer.copy2}</span>
        </div>

      </div>
    </>
  );
}
