'use client';
import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { normalizeLang, sunumFile, UI } from '@/lib/i18n';

// V2 Cache-busting — V1'den bağımsız versiyon
const SUNUM_V2_VERSION = '20260616-i18n';

function SunumV2Inner() {
  const params = useSearchParams();
  const lang = normalizeLang(params.get('lang'));
  const t = UI[lang];
  const qs = `?v=${SUNUM_V2_VERSION}`;

  return (
    <div className="sunum-page sunum-v2-page flex flex-col" style={{ height: '100dvh' }}>
      {/* Top bar — V2 temalı */}
      <div className="sunum-topbar sunum-v2-topbar">
        <Link href="/" className="sunum-back">
          <span className="sunum-back-arrow">←</span>
          <span className="sunum-back-label">{t.back}</span>
        </Link>

        <span className="sunum-title">
          <span className="sunum-title-icon">🌤️</span>
          <span className="sunum-title-text">{t.sunumTitle}</span>
        </span>

        <Link href={`/quiz-v2?lang=${lang}`} className="sunum-cta">
          <span className="sunum-cta-icon">🎯</span>
          <span className="sunum-cta-label">{t.goToQuiz}</span>
          <span className="sunum-cta-arrow">→</span>
        </Link>
      </div>

      {/* Iframe: kalan yüksekliği doldurur — dile göre doğru HTML */}
      <iframe
        src={`${sunumFile(lang)}${qs}`}
        className="sunum-iframe"
        title="Tekno Quest Sunum V2"
        allow="fullscreen"
      />
    </div>
  );
}

export default function SunumV2Page() {
  return (
    <Suspense fallback={<div style={{ height: '100dvh' }} />}>
      <SunumV2Inner />
    </Suspense>
  );
}
