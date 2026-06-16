'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getLeaderboard, subscribeToLeaderboard, QuizResult } from '@/lib/supabase';
import { Lang, LANGS, LANG_META, UI } from '@/lib/i18n';

function rankEmoji(i: number) {
  if (i === 0) return '🥇';
  if (i === 1) return '🥈';
  if (i === 2) return '🥉';
  return `${i + 1}.`;
}

export default function Portal() {
  const [leaders, setLeaders] = useState<QuizResult[]>([]);
  const [lang, setLang] = useState<Lang>('tr');

  useEffect(() => {
    getLeaderboard(8).then(setLeaders).catch(() => {});
    const unsub = subscribeToLeaderboard(setLeaders);
    return unsub;
  }, []);

  // Tarayıcı dilini ilk açılışta otomatik öner (kullanıcı yine değiştirebilir)
  useEffect(() => {
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('zh')) setLang('zh');
    else if (nav.startsWith('en')) setLang('en');
  }, []);

  const t = UI[lang];

  return (
    <main className="min-h-screen relative z-10 px-3 xs:px-4 py-6 xs:py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-6 xs:mb-8">
        <div className="text-5xl xs:text-6xl mb-3 xs:mb-4 animate-float inline-block">🌐</div>
        <h1
          className="font-game font-bold neon-yellow mb-2"
          style={{ fontSize: 'clamp(22px, 7vw, 64px)', letterSpacing: '1.5px', lineHeight: 1.15 }}
        >
          TEKNOLOJİ QUEST
        </h1>
        <p className="text-sm xs:text-base sm:text-lg px-2" style={{ color: 'var(--muted)' }}>
          {t.homeSubtitle}
        </p>
      </div>

      {/* Dil seçici */}
      <div className="flex flex-col items-center gap-2 mb-8 xs:mb-10">
        <span className="font-game text-[10px] xs:text-xs" style={{ color: 'var(--muted)', letterSpacing: '2px' }}>
          🌍 {t.langPickTitle}
        </span>
        <div className="flex gap-2 xs:gap-3 flex-wrap justify-center">
          {LANGS.map((l) => {
            const active = l === lang;
            return (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="font-game text-xs xs:text-sm px-3 xs:px-4 py-2 rounded-lg transition-all"
                style={{
                  background: active ? 'rgba(249,115,22,0.18)' : 'rgba(255,255,255,0.04)',
                  color: active ? '#fb923c' : 'var(--muted)',
                  border: `1px solid ${active ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: active ? '0 0 16px rgba(249,115,22,0.18)' : 'none',
                  letterSpacing: '0.5px',
                }}
                aria-pressed={active}
                aria-label={LANG_META[l].label}
              >
                {LANG_META[l].flag}&nbsp;{LANG_META[l].native}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-6">
        {/* Left: Presentation (single card) */}
        <div className="lg:col-span-2 space-y-3 xs:space-y-4 min-w-0">
          <h2
            className="font-game text-xs xs:text-sm mb-3 xs:mb-4"
            style={{ color: 'var(--muted)', letterSpacing: '2px' }}
          >
            {t.sectionLabel}
          </h2>

          {/* TEKNO QUEST — Gökyüzü Teması */}
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
                    TEKNO QUEST
                  </span>
                  <span
                    className="xp-badge"
                    style={{
                      background: 'rgba(249,115,22,0.15)',
                      color: '#fb923c',
                      borderColor: 'rgba(249,115,22,0.4)',
                    }}
                  >
                    {t.cardBadge}
                  </span>
                </div>
                <p className="text-xs xs:text-sm mb-4 xs:mb-5" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                  {t.cardDesc}
                </p>

                <div className="flex gap-2 xs:gap-3 flex-wrap">
                  <Link href={`/sunum-v2?lang=${lang}`} className="flex-1 xs:flex-none min-w-[140px]">
                    <button
                      className="btn-primary text-xs xs:text-sm w-full"
                      style={{
                        background: '#f97316',
                        color: '#fff',
                        borderColor: '#ea580c',
                      }}
                    >
                      {t.btnPresentation}
                    </button>
                  </Link>
                  <Link href={`/quiz-v2?lang=${lang}`} className="flex-1 xs:flex-none min-w-[120px]">
                    <button
                      className="btn-outline text-xs xs:text-sm w-full"
                      style={{ color: '#fb923c', borderColor: '#fb923c' }}
                    >
                      {t.btnQuiz}
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
                  {t.howToTitle}
                </p>
                <p className="text-xs xs:text-sm" style={{ color: 'var(--muted)', lineHeight: 1.55 }}>
                  {t.howToDesc}
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
              <h2 className="font-game font-bold text-sm neon-yellow">{t.leaderboard}</h2>
              <Link href="/liderboard">
                <span className="text-xs cursor-pointer" style={{ color: 'var(--info)' }}>
                  {t.leaderboardAll}
                </span>
              </Link>
            </div>

            {leaders.length === 0 ? (
              <div className="text-center py-8" style={{ color: 'var(--muted)' }}>
                <div className="text-4xl mb-3">🎮</div>
                <p className="text-sm font-game">{t.leaderEmpty1}</p>
                <p className="text-xs mt-1">{t.leaderEmpty2}</p>
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
                        {r.correct_count}/{r.total_questions} {t.correctWord}
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
                  {t.liveUpdating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
