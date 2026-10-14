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

    setPhase('covering');

    setTimeout(() => {
      router.push(href);
      setTimeout(() => {
        setPhase('revealing');
        setTimeout(() => {
          setPhase('idle');
          busy.current = false;
        }, 520);
      }, 60);
    }, 520);
  }, [router]);

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
      {phase === 'covering' && <CoverPanel />}
      {phase === 'revealing' && <RevealPanel />}
    </TransitionContext.Provider>
  );
}

function CoverPanel() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: '#F0EAE0',
      // Shadow on the left edge simulates the page spine/fold
      boxShadow: '-6px 0 24px rgba(0,0,0,0.35)',
      animation: 'pageCover 0.5s cubic-bezier(0.86,0,0.07,1) forwards',
      pointerEvents: 'all',
    }} />
  );
}

function RevealPanel() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: '#F0EAE0',
      // Shadow on the right edge as the page slides away
      boxShadow: '6px 0 24px rgba(0,0,0,0.35)',
      animation: 'pageReveal 0.5s cubic-bezier(0.86,0,0.07,1) forwards',
      pointerEvents: 'all',
    }} />
  );
}

export function usePageTransition() {
  return useContext(TransitionContext);
}
