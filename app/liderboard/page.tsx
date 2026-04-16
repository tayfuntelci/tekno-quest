'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLeaderboard, subscribeToLeaderboard, QuizResult } from '@/lib/supabase';

function rankDisplay(i: number) {
  if (i === 0) return { emoji: '🥇', cls: 'rank-1' };
  if (i === 1) return { emoji: '🥈', cls: 'rank-2' };
  if (i === 2) return { emoji: '🥉', cls: 'rank-3' };
  return { emoji: `${i + 1}`, cls: '' };
}

const versionColors: Record<string, string> = {
  v1: '#FFD93D', v2: '#00cfff', v3: '#39ff14',
};
const versionLabel: Record<string, string> = {
  v1: '🎨 Renkli', v2: '🚀 Uzay', v3: '🎮 Oyun',
};

export default function Leaderboard() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'v1' | 'v2' | 'v3'>('all');

  useEffect(() => {
    getLeaderboard(50)
      .then(setResults)
      .catch(() => {})
      .finally(() => setLoading(false));
    const unsub = subscribeToLeaderboard(setResults);
    return unsub;
  }, []);

  const filtered = filter === 'all' ? results : results.filter(r => r.presentation_version === filter);
  const sorted = [...filtered].sort((a, b) => b.total_xp - a.total_xp);

  return (
    <main className="min-h-screen relative z-10 px-4 py-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/">
          <button className="btn-outline text-sm">← Geri</button>
        </Link>
        <div className="text-center">
          <h1 className="font-game font-bold text-2xl neon-yellow">🏆 LİDERBOARD</h1>
          <div className="flex items-center gap-2 justify-center mt-1">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--success)' }} />
            <span className="text-xs" style={{ color: 'var(--success)' }}>Canlı güncelleniyor</span>
          </div>
        </div>
        <div style={{ width: 80 }} />
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'v1', 'v2', 'v3'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="text-sm px-4 py-2 rounded-lg font-game transition-all"
            style={{
              background: filter === f ? 'rgba(255,230,0,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${filter === f ? 'rgba(255,230,0,0.5)' : 'rgba(255,255,255,0.1)'}`,
              color: filter === f ? 'var(--primary)' : 'var(--muted)',
            }}
          >
            {f === 'all' ? '🌐 Tümü' : versionLabel[f]}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16" style={{ color: 'var(--muted)' }}>
          <div className="text-4xl mb-3 animate-float">⏳</div>
          <p className="font-game text-sm">Yükleniyor...</p>
        </div>
      )}

      {/* Empty */}
      {!loading && sorted.length === 0 && (
        <div className="text-center py-16" style={{ color: 'var(--muted)' }}>
          <div className="text-5xl mb-4">🎮</div>
          <p className="font-game text-lg neon-yellow mb-2">Henüz kimse yok!</p>
          <p className="text-sm mb-6">İlk quiz çözeni sen ol!</p>
          <Link href="/">
            <button className="btn-primary">Quize Git →</button>
          </Link>
        </div>
      )}

      {/* Results */}
      <div className="space-y-3">
        {sorted.map((r, i) => {
          const rank = rankDisplay(i);
          const pct = Math.round((r.correct_count / r.total_questions) * 100);
          const color = versionColors[r.presentation_version] ?? 'var(--primary)';
          return (
            <div
              key={r.id}
              className="game-card p-4 animate-slide-up"
              style={{
                borderColor: i < 3 ? `${color}40` : undefined,
                boxShadow: i === 0 ? `0 0 25px rgba(255,215,0,0.12)` : undefined,
              }}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className={`font-game font-bold text-xl w-8 text-center flex-shrink-0 ${rank.cls}`}>
                  {rank.emoji}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-base truncate">{r.player_name}</span>
                    <span className="text-xs px-2 py-0.5 rounded font-game"
                      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                      {versionLabel[r.presentation_version] ?? r.presentation_version}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="flex items-center gap-2 mt-1">
                    <div className="progress-bar flex-1" style={{ height: '4px' }}>
                      <div className="progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs flex-shrink-0" style={{ color: 'var(--muted)' }}>
                      {r.correct_count}/{r.total_questions} doğru
                    </span>
                  </div>
                </div>

                {/* XP */}
                <div className="text-right flex-shrink-0">
                  <div className="font-game font-bold text-lg neon-green">{r.total_xp}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>XP</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {sorted.length > 0 && (
        <p className="text-center text-xs mt-6" style={{ color: 'var(--muted)' }}>
          {sorted.length} öğrenci • Yeni skorlar otomatik eklenir
        </p>
      )}
    </main>
  );
}
