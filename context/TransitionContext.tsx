'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

type Phase = 'idle' | 'covering' | 'revealing';

interface TransitionCtx {
  navigateTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionCtx>({ navigateTo: () => {} });

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('idle');
  const busy = useRef(false);

  const navigateTo = useCallback((href: string) => {
    if (busy.current) return;
    busy.current = true;

    // 1. Mount the cover panel — animate in from right edge
    setPhase('covering');

    setTimeout(() => {
      // 2. Navigate while panel is fully visible
      router.push(href);

      setTimeout(() => {
        // 3. Swap to reveal panel — animate out to left edge
        setPhase('revealing');

        setTimeout(() => {
          setPhase('idle');
          busy.current = false;
        }, 700);
      }, 100);
    }, 600);
  }, [router]);

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
      {phase === 'covering' && <CoverPanel />}
      {phase === 'revealing' && <RevealPanel />}
    </TransitionContext.Provider>
  );
}

const PANEL_STYLE: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 500,
  // Off-white like magazine paper — contrasts against the dark pages so the 3D flip is visible
  background: '#F2EDE4',
  pointerEvents: 'all',
};

function CoverPanel() {
  return (
    <div style={{
      ...PANEL_STYLE,
      transformOrigin: 'right center',
      animation: 'pageCover 0.6s cubic-bezier(.77,0,.175,1) forwards',
    }} />
  );
}

function RevealPanel() {
  return (
    <div style={{
      ...PANEL_STYLE,
      transformOrigin: 'left center',
      animation: 'pageReveal 0.7s cubic-bezier(.77,0,.175,1) forwards',
    }} />
  );
}

export function usePageTransition() {
  return useContext(TransitionContext);
}
