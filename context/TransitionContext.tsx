'use client';

import { createContext, useContext, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface TransitionCtx {
  navigateTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionCtx>({ navigateTo: () => {} });

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const busy = useRef(false);

  const navigateTo = useCallback((href: string) => {
    if (busy.current) return;
    busy.current = true;
    router.push(href);
    setTimeout(() => { busy.current = false; }, 500);
  }, [router]);

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  return useContext(TransitionContext);
}
