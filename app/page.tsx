'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getLeaderboard, subscribeToLeaderboard, QuizResult } from '@/lib/supabase';

const presentations = [
  {
    version: 'v1',
    emoji: '🎨',
    title: 'Renkli & Eğlenceli',
    desc: 'Çizgi film tarzı, canlı renkler ve neşeli animasyonlarla teknoloji yolculuğu!',
    color: '#FFD93D',
    glow: 'rgba(255,217,61,0.15)',
    border: 'rgba(255,217,61,0.35)',
  },
  {
    version: 'v2',
    emoji: '🚀',
    title: 'Uzay & Fütüristik',
    desc: 'Hologram efektleri ve uzay temasıyla geleceğin teknolojisi!',
    color: '#00cfff',
    glow: 'rgba(0,207,255,0.15)',
    border: 'rgba(0,207,255,0.35)',
  },
  {
    version: 'v3',
    emoji: '🎮',
    title: 'Oyun Tarzı',
    desc: 'Level sistemi, XP puanlar ve rozet kazanımlarıyla eğlenceli öğrenme!',
    color: '#39ff14',
    glow: 'rgba(57,255,20,0.15)',
    border: 'rgba(57,255,20,0.35)',
  },
];

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
    <main className="min-h-screen relative z-10 px-4 py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4 animate-float inline-block">🌐</div>
        <h1
          className="font-game font-bold neon-yellow mb-2"
          style={{ fontSize: 'clamp(32px, 6vw, 64px)', letterSpacing: '2px' }}
        >
          TEKNOLOJİ QUEST
        </h1>
        <p className="text-lg" style={{ color: 'var(--muted)' }}>
          İnternetten Yapay Zekaya — Geleceğin Şifresi
        </p>
        <div className="mt-3 inline-block font-game text-xs px-4 py-1 rounded border"
          style={{ borderColor: 'rgba(57,255,20,0.3)', color: 'var(--success)', background: 'rgba(57,255,20,0.05)' }}>
          ▸ 9–10 YAŞ SINIFI
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Presentations */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-game text-sm mb-4" style={{ color: 'var(--muted)', letterSpacing: '2px' }}>
            ▸ SUNUM SEÇ
          </h2>
          {presentations.map((p) => (
            <div
              key={p.version}
              className="game-card p-5"
              style={{ borderColor: p.border, boxShadow: `0 0 20px ${p.glow}` }}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0 animate-float">{p.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-game font-bold text-lg" style={{ color: p.color }}>
                      {p.title}
                    </span>
                    <span className="xp-badge">+110 XP</span>
                  </div>
                  <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>{p.desc}</p>
                  <div className="flex gap-3 flex-wrap">
                    <Link href={`/sunum/${p.version}`}>
                      <button
                        className="btn-primary text-sm"
                        style={{ background: p.color }}
                      >
                        ▶ Sunumu Başlat
                      </button>
                    </Link>
                    <Link href={`/quiz/${p.version}`}>
                      <button className="btn-outline text-sm" style={{ color: p.color, borderColor: p.color }}>
                        🎯 Quiz'e Git
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Info box */}
          <div className="game-card p-4 mt-2"
            style={{ borderColor: 'rgba(192,132,252,0.3)', background: 'rgba(192,132,252,0.05)' }}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="font-game text-xs mb-1" style={{ color: '#c084fc' }}>NASIL KULLANILIR?</p>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  1. Bir sunum teması seç → 2. Sunumu sınıfa anlat → 3. Öğrenciler isimlerini yazarak quize katılır
                  → 4. Liderboard canlı güncellenir!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Leaderboard */}
        <div className="lg:col-span-1">
          <div className="game-card p-5 sticky top-6"
            style={{ borderColor: 'rgba(255,159,28,0.3)' }}>
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
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
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
                      <p className="text-xs" style={{ color: 'rgba(255,159,28,0.8)' }}>
                        {r.presentation_version.toUpperCase()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--success)' }} />
                <span className="text-xs" style={{ color: 'var(--success)' }}>Canlı güncelleniyor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
