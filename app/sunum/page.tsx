'use client';
/* ============================================================
 * ⚠️  V1 KİLİTLİ — DEĞİŞTİRMEYİN!
 * Bu dosya "Tekno Quest V1 (Uzay Teması)" sürümüne aittir.
 * V1 donduruldu (git tag: v1.0-frozen). Tüm yeni değişiklikler
 * V2 dosyalarında yapılmalıdır:
 *   - app/sunum-v2/page.tsx
 *   - public/sunum-v2.html
 * © 2026 Tayfun Telci — Tüm hakları saklıdır.
 * ============================================================ */
import Link from 'next/link';

// Cache-busting: her deploy için yeni versiyon değeri → browser eski sunum.html'i cache'den alamaz
const SUNUM_VERSION = '20250420-14';

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
