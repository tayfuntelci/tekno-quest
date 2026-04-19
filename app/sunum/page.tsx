'use client';
import Link from 'next/link';

// Cache-busting: her deploy için yeni versiyon değeri → browser eski sunum.html'i cache'den alamaz
const SUNUM_VERSION = '20250420-9';

export default function SunumPage() {
  return (
    <div className="sunum-page flex flex-col" style={{ height: '100dvh' }}>
      {/* Top bar — her cihazda düzgün sığar */}
      <div className="sunum-topbar">
        <Link href="/" className="sunum-back">
          <span className="sunum-back-arrow">←</span>
          <span className="sunum-back-label">Geri</span>
        </Link>

        <span className="sunum-title">
          <span className="sunum-title-icon">🚀</span>
          <span className="sunum-title-text">TEKNO QUEST</span>
        </span>

        <Link href="/quiz" className="sunum-cta">
          <span className="sunum-cta-icon">🎯</span>
          <span className="sunum-cta-label">Quize Geç</span>
          <span className="sunum-cta-arrow">→</span>
        </Link>
      </div>

      {/* Iframe: kalan yüksekliği doldurur */}
      <iframe
        src={`/sunum.html?v=${SUNUM_VERSION}`}
        className="sunum-iframe"
        title="Tekno Quest Sunum"
        allow="fullscreen"
      />
    </div>
  );
}
