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

    // 550ms = animation duration. Navigate at peak (page fully flat).
    setTimeout(() => {
      router.push(href);
      // Small gap so new page has time to render before revealing
      setTimeout(() => {
        setPhase('revealing');
        setTimeout(() => {
          setPhase('idle');
          busy.current = false;
        }, 600);
      }, 80);
    }, 550);
  }, [router]);

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
      {phase === 'covering' && <CoverPanel />}
      {phase === 'revealing' && <RevealPanel />}
    </TransitionContext.Provider>
  );
}

// Wrapper provides the perspective so the child's rotateY has real 3D depth
const wrapStyle: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 500,
  perspective: '1400px',
  perspectiveOrigin: '50% 50%',
  pointerEvents: 'all',
};

// Paper gradient: slightly darker at edges, lighter in the middle — simulates a curved page
const paperBg =
  'linear-gradient(to right, rgba(0,0,0,0.06) 0%, #F0EAE0 8%, #F6F1EA 50%, #F0EAE0 92%, rgba(0,0,0,0.06) 100%)';

function CoverPanel() {
  return (
    <div style={wrapStyle}>
      <div style={{
        position: 'absolute', inset: 0,
        background: paperBg,
        transformOrigin: 'right center',
        // Shadow on the LEFT edge = spine shadow as page swings in from the right
        boxShadow: '-10px 0 30px rgba(0,0,0,0.4)',
        animation: 'pageCoverInner 0.55s cubic-bezier(0.4,0,0.2,1) forwards',
      }} />
    </div>
  );
}

function RevealPanel() {
  return (
    <div style={wrapStyle}>
      <div style={{
        position: 'absolute', inset: 0,
        background: paperBg,
        transformOrigin: 'left center',
        // Shadow on the RIGHT edge = spine shadow as page swings away to the left
        boxShadow: '10px 0 30px rgba(0,0,0,0.4)',
        animation: 'pageRevealInner 0.55s cubic-bezier(0.4,0,0.2,1) forwards',
      }} />
    </div>
  );
}

export function usePageTransition() {
  return useContext(TransitionContext);
}
