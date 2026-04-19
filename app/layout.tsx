import type { Metadata, Viewport } from 'next';
import './globals.css';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Teknoloji Quest 🚀',
  description: '9-10 yaş için teknoloji sunumu ve interaktif quiz platformu',
  authors: [{ name: 'Tayfun Telci' }],
  creator: 'Tayfun Telci',
  publisher: 'Tayfun Telci',
  robots: { index: true, follow: true },
};

// Responsive: tüm cihazlar (Samsung Fold kapalı 280px'ten, masaüstüne kadar)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#0a0a18',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        {/* Copyright watermark — izinsiz kopyalamaya karşı yasal kanıt */}
        <meta name="copyright" content="© 2026 Tayfun Telci — Tüm hakları saklıdır" />
        <meta name="rights" content="All Rights Reserved" />
      </head>
      <body className="relative z-10 min-h-screen flex flex-col">
        {/* HTML yorumu — DevTools'ta görünür imza */}
        <div
          dangerouslySetInnerHTML={{
            __html: `<!--
  TEKNO QUEST © 2026 Tayfun Telci — Tüm hakları saklıdır.
  Bu kaynak kodun veya içeriğin izinsiz kopyalanması 5846 sayılı
  yasa gereği suçtur. İmza: TK-TQ-2026-TAYFUN-TELCII-MKETUN9M
  İletişim: t.telcii@gmail.com
-->`,
          }}
        />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
