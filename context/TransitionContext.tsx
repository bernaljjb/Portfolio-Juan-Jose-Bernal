'use client';

import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

type Phase = 'idle' | 'covering' | 'covered' | 'revealing';

interface TransitionCtx {
  navigateTo: (href: string) => void;
  phase: Phase;
}

const TransitionContext = createContext<TransitionCtx>({
  navigateTo: () => {},
  phase: 'idle',
});

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('idle');
  const busy = useRef(false);

  const navigateTo = useCallback((href: string) => {
    if (busy.current) return;
    busy.current = true;

    setPhase('covering');
    setTimeout(() => {
      setPhase('covered');
      router.push(href);
      setTimeout(() => {
        setPhase('revealing');
        setTimeout(() => {
          setPhase('idle');
          busy.current = false;
        }, 650);
      }, 80);
    }, 550);
  }, [router]);

  return (
    <TransitionContext.Provider value={{ navigateTo, phase }}>
      {children}
      <PageTurnOverlay phase={phase} />
    </TransitionContext.Provider>
  );
}

function PageTurnOverlay({ phase }: { phase: Phase }) {
  if (phase === 'idle') return null;
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: '#0E0E0C',
        transformOrigin: phase === 'covering' ? 'right center' : 'left center',
        animation: phase === 'covering' || phase === 'covered'
          ? 'pageCover 0.55s cubic-bezier(.77,0,.175,1) forwards'
          : 'pageReveal 0.65s cubic-bezier(.77,0,.175,1) forwards',
        pointerEvents: 'all',
      }}
    />
  );
}

export function usePageTransition() {
  return useContext(TransitionContext);
}
