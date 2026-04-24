'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getLeaderboard, subscribeToLeaderboard, QuizResult } from '@/lib/supabase';

function rankEmoji(i: number) {
  if (i === 0) return '🥇';
  if (i === 1) return '🥈';
  if (i === 2) return '🥉';
  return `${i + 1}.`;
}

export default function Portal() {
  const [leaders, setLeaders] = useState<QuizResult[]>([]);

  useEffect(() => {
    getLeaderboard(8).then(setLeaders).catch(() => {});
    const unsub = subscribeToLeaderboard(setLeaders);
    return unsub;
  }, []);

  return (
    <main className="min-h-screen relative z-10 px-3 xs:px-4 py-6 xs:py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-8 xs:mb-12">
        <div className="text-5xl xs:text-6xl mb-3 xs:mb-4 animate-float inline-block">🌐</div>
        <h1
          className="font-game font-bold neon-yellow mb-2"
          style={{ fontSize: 'clamp(22px, 7vw, 64px)', letterSpacing: '1.5px', lineHeight: 1.15 }}
        >
          TEKNOLOJİ QUEST
        </h1>
        <p className="text-sm xs:text-base sm:text-lg px-2" style={{ color: 'var(--muted)' }}>
          İnternetten Yapay Zekaya — Geleceğin Şifresi
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-6">
        {/* Left: Presentation (single card) */}
        <div className="lg:col-span-2 space-y-3 xs:space-y-4 min-w-0">
          <h2
            className="font-game text-xs xs:text-sm mb-3 xs:mb-4"
            style={{ color: 'var(--muted)', letterSpacing: '2px' }}
          >
            ▸ SUNUM &amp; QUIZ
          </h2>

          {/* V1 — Uzay Teması (orijinal) */}
          <div
            className="game-card p-4 xs:p-6"
            style={{
              borderColor: 'rgba(255,230,0,0.35)',
              boxShadow: '0 0 28px rgba(255,230,0,0.12)',
            }}
          >
            <div className="flex items-start gap-3 xs:gap-4">
              <div className="text-4xl xs:text-5xl flex-shrink-0 animate-float">🚀</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className="font-game font-bold text-base xs:text-xl neon-yellow"
                    style={{ letterSpacing: '1.5px' }}
                  >
                    TEKNO QUEST · V1
                  </span>
                  <span className="xp-badge">UZAY TEMASI</span>
                </div>
                <p className="text-xs xs:text-sm mb-4 xs:mb-5" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                  Orijinal uzay temalı sürüm — neon renkler, karanlık gökyüzü,
                  roket animasyonları. 10 level, XP barı, rozetler ve quiz.
                </p>

                <div className="flex gap-2 xs:gap-3 flex-wrap">
                  <Link href="/sunum" className="flex-1 xs:flex-none min-w-[140px]">
                    <button className="btn-primary text-xs xs:text-sm w-full">▶ V1 Sunum</button>
                  </Link>
                  <Link href="/quiz" className="flex-1 xs:flex-none min-w-[120px]">
                    <button
                      className="btn-outline text-xs xs:text-sm w-full"
                      style={{ color: 'var(--info)', borderColor: 'var(--info)' }}
                    >
                      🎯 V1 Quiz
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* V2 — Gökyüzü Teması (çocuk psikoloğu önerileri) */}
          <div
            className="game-card p-4 xs:p-6"
            style={{
              borderColor: 'rgba(249,115,22,0.45)',
              boxShadow: '0 0 28px rgba(249,115,22,0.12)',
              background:
                'linear-gradient(135deg, rgba(224,242,254,0.06) 0%, rgba(249,115,22,0.04) 100%)',
            }}
          >
            <div className="flex items-start gap-3 xs:gap-4">
              <div className="text-4xl xs:text-5xl flex-shrink-0 animate-float">🌤️</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className="font-game font-bold text-base xs:text-xl"
                    style={{ letterSpacing: '1.5px', color: '#fb923c' }}
                  >
                    TEKNO QUEST · V2
                  </span>
                  <span
                    className="xp-badge"
                    style={{
                      background: 'rgba(249,115,22,0.15)',
                      color: '#fb923c',
                      borderColor: 'rgba(249,115,22,0.4)',
                    }}
                  >
                    GÖKYÜZÜ · YENİ
                  </span>
                </div>
                <p className="text-xs xs:text-sm mb-4 xs:mb-5" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                  Çocuk psikoloğu önerilerine göre yeniden tasarlandı — açık mavi gökyüzü,
                  yumuşak renkler, sade animasyonlar. Aynı içerik, daha rahat gözler.
                </p>

                <div className="flex gap-2 xs:gap-3 flex-wrap">
                  <Link href="/sunum-v2" className="flex-1 xs:flex-none min-w-[140px]">
                    <button
                      className="btn-primary text-xs xs:text-sm w-full"
                      style={{
                        background: '#f97316',
                        color: '#fff',
                        borderColor: '#ea580c',
                      }}
                    >
                      ▶ V2 Sunum
                    </button>
                  </Link>
                  <Link href="/quiz-v2" className="flex-1 xs:flex-none min-w-[120px]">
                    <button
                      className="btn-outline text-xs xs:text-sm w-full"
                      style={{ color: '#fb923c', borderColor: '#fb923c' }}
                    >
                      🎯 V2 Quiz
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Info box */}
          <div
            className="game-card p-3 xs:p-4 mt-2"
            style={{
              borderColor: 'rgba(192,132,252,0.3)',
              background: 'rgba(192,132,252,0.05)',
            }}
          >
            <div className="flex items-start gap-2 xs:gap-3">
              <span className="text-xl xs:text-2xl flex-shrink-0">💡</span>
              <div className="min-w-0">
                <p className="font-game text-[10px] xs:text-xs mb-1" style={{ color: '#c084fc', letterSpacing: '1px' }}>
                  NASIL KULLANILIR?
                </p>
                <p className="text-xs xs:text-sm" style={{ color: 'var(--muted)', lineHeight: 1.55 }}>
                  1. <strong style={{ color: '#ffe600' }}>V1 = Uzay teması</strong> (neon / karanlık)
                  &nbsp;·&nbsp; <strong style={{ color: '#fb923c' }}>V2 = Gökyüzü teması</strong> (açık / sade).
                  Her iki sürümde de aynı içerik var ve liderboard ortak çalışır.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Leaderboard */}
        <div className="lg:col-span-1 min-w-0">
          <div
            className="game-card p-4 xs:p-5 lg:sticky lg:top-6"
            style={{ borderColor: 'rgba(255,159,28,0.3)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-game font-bold text-sm neon-yellow">🏆 LİDERBOARD</h2>
              <Link href="/liderboard">
                <span className="text-xs cursor-pointer" style={{ color: 'var(--info)' }}>
                  Tümü →
                </span>
              </Link>
            </div>

            {leaders.length === 0 ? (
              <div className="text-center py-8" style={{ color: 'var(--muted)' }}>
                <div className="text-4xl mb-3">🎮</div>
                <p className="text-sm font-game">Henüz kimse quiz çözmedi!</p>
                <p className="text-xs mt-1">İlk sen ol 🚀</p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaders.map((r, i) => (
                  <div
                    key={r.id}
                    className="flex items-center gap-3 p-2 rounded-lg"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <span className="font-game text-sm w-6 text-center flex-shrink-0">
                      {rankEmoji(i)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{r.player_name}</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>
                        {r.correct_count}/{r.total_questions} doğru
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-game text-sm neon-green">{r.total_xp} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div
              className="mt-4 pt-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: 'var(--success)' }}
                />
                <span className="text-xs" style={{ color: 'var(--success)' }}>
                  Canlı güncelleniyor
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
