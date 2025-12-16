import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Catálogo | +18 Apenas',
  description: 'Catálogo de vapes, pods descartáveis, refis e acessórios. Proibido para menores de 18 anos.',
  keywords: ['vape', 'pod', 'descartável', 'ignite', 'elfbar', 'refil', 'catálogo'],
  robots: 'index, follow',
  icons: {
    icon: '/smoke.png',
    shortcut: '/smoke.png',
    apple: '/smoke.png',
  },
  openGraph: {
    title: 'Catálogo | +18 Apenas',
    description: 'Catálogo de vapes, pods descartáveis, refis e acessórios. Proibido para menores de 18 anos.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="bg-bg text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
