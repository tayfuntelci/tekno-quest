import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Teknoloji Quest 🚀',
  description: '9-10 yaş için teknoloji sunumu ve interaktif quiz platformu',
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
      <body className="relative z-10 min-h-screen">{children}</body>
    </html>
  );
}
