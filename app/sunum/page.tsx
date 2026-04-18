'use client';
import Link from 'next/link';

export default function SunumPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{
          background: 'rgba(10,10,24,0.95)',
          borderBottom: '1px solid rgba(255,230,0,0.15)',
          zIndex: 10,
        }}
      >
        <div className="flex items-center gap-3">
          <Link href="/">
            <button
              className="text-sm px-3 py-1 rounded font-game"
              style={{ color: 'var(--muted)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              ← Geri
            </button>
          </Link>
          <span className="font-game text-sm neon-yellow">
            🚀 TEKNO QUEST
          </span>
        </div>
        <Link href="/quiz">
          <button className="btn-primary text-sm">
            🎯 Quize Geç →
          </button>
        </Link>
      </div>

      {/* Iframe: kalan yüksekliği doldurur */}
      <iframe
        src="/sunum.html"
        className="flex-1 w-full border-0"
        title="Tekno Quest Sunum"
        allow="fullscreen"
      />
    </div>
  );
}
