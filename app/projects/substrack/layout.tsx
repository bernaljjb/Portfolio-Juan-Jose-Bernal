import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Substrack — Juan José Bernal Núñez',
  description:
    'Case study: Substrack Dashboard App. Diseño UI de un dashboard web para centralizar suscripciones activas con sistema de componentes en Atomic Design.',
};

export default function SubstrackLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&family=DM+Mono:wght@400;500&family=Poppins:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
