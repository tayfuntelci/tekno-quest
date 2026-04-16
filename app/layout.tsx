import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Teknoloji Quest 🚀',
  description: '9-10 yaş için teknoloji sunumu ve interaktif quiz platformu',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="relative z-10 min-h-screen">{children}</body>
    </html>
  );
}
