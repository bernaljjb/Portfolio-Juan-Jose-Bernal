'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import { TransitionProvider } from '@/context/TransitionContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <TransitionProvider>{children}</TransitionProvider>
    </LanguageProvider>
  );
}
