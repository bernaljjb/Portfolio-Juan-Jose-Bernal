import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Habita — Juan José Bernal Núñez',
  description:
    'Case study: Habita Smart Home App. Diseño end-to-end: UI KIT, branding, prototipado navegable y pruebas de usuario.',
};

export default function HabitaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
