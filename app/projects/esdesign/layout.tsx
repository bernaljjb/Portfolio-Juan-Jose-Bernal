import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EsDesign Login — Juan José Bernal Núñez',
  description:
    'Case study: Auditoría WCAG AA y rediseño completo del login de la plataforma educativa EsDesign. De un diseño inaccesible a una interfaz limpia que cumple el estándar.',
};

export default function EsDesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&family=DM+Mono:wght@400;500&family=Roboto:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
