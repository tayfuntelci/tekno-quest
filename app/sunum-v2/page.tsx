'use client';
import Link from 'next/link';

// V2 Cache-busting — V1'den bağımsız versiyon
const SUNUM_V2_VERSION = '20260608-2';

export default function SunumV2Page() {
  return (
    <div className="sunum-page sunum-v2-page flex flex-col" style={{ height: '100dvh' }}>
      {/* Top bar — V2 temalı */}
      <div className="sunum-topbar sunum-v2-topbar">
        <Link href="/" className="sunum-back">
          <span className="sunum-back-arrow">←</span>
          <span className="sunum-back-label">Geri</span>
        </Link>

        <span className="sunum-title">
          <span className="sunum-title-icon">🌤️</span>
          <span className="sunum-title-text">TEKNO QUEST · V2</span>
        </span>

        <Link href="/quiz-v2" className="sunum-cta">
          <span className="sunum-cta-icon">🎯</span>
          <span className="sunum-cta-label">Quize Geç</span>
          <span className="sunum-cta-arrow">→</span>
        </Link>
      </div>

      {/* Iframe: kalan yüksekliği doldurur */}
      <iframe
        src={`/sunum-v2.html?v=${SUNUM_V2_VERSION}`}
        className="sunum-iframe"
        title="Tekno Quest Sunum V2"
        allow="fullscreen"
      />
    </div>
  );
}
