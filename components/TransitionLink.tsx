'use client';

import { usePageTransition } from '@/context/TransitionContext';
import { AnchorHTMLAttributes } from 'react';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function TransitionLink({ href, children, onClick, ...props }: Props) {
  const { navigateTo } = usePageTransition();

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
        navigateTo(href);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
