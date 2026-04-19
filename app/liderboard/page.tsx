'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLeaderboard, subscribeToLeaderboard, resetLeaderboard, QuizResult } from '@/lib/supabase';

// Öğretmen şifresi — sınıf-içi kullanım için yeterli
const ADMIN_PASSWORD = 'TEKNO2026';

function rankDisplay(i: number) {
  if (i === 0) return { emoji: '🥇', cls: 'rank-1' };
  if (i === 1) return { emoji: '🥈', cls: 'rank-2' };
  if (i === 2) return { emoji: '🥉', cls: 'rank-3' };
  return { emoji: `${i + 1}`, cls: '' };
}

export default function Leaderboard() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [resetStage, setResetStage] = useState<'idle' | 'ask' | 'working' | 'done' | 'wrong'>('idle');
  const [pwInput, setPwInput] = useState('');

  useEffect(() => {
    getLeaderboard(50)
      .then(setResults)
      .catch(() => {})
      .finally(() => setLoading(false));
    const unsub = subscribeToLeaderboard(setResults);
    return unsub;
  }, []);

  const sorted = [...results].sort((a, b) => b.total_xp - a.total_xp);

  const handleReset = async () => {
    if (pwInput !== ADMIN_PASSWORD) {
      setResetStage('wrong');
      setTimeout(() => setResetStage('ask'), 1400);
      return;
    }
    setResetStage('working');
    try {
      await resetLeaderboard();
      setResults([]);
      setResetStage('done');
      setTimeout(() => {
        setResetStage('idle');
        setPwInput('');
      }, 1800);
    } catch (err) {
      console.error(err);
      alert('Sıfırlama başarısız oldu. Supabase policy kontrol et.');
      setResetStage('idle');
    }
  };

  return (
    <main className="min-h-screen relative z-10 px-3 xs:px-4 py-6 xs:py-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-6 xs:mb-8">
        <Link href="/" className="flex-shrink-0">
          <button className="btn-outline text-xs xs:text-sm px-2 xs:px-3 py-1 xs:py-2">← Geri</button>
        </Link>
        <div className="text-center min-w-0 flex-1">
          <h1 className="font-game font-bold text-lg xs:text-2xl neon-yellow whitespace-nowrap overflow-hidden text-ellipsis">🏆 LİDERBOARD</h1>
          <div className="flex items-center gap-2 justify-center mt-1">
            <div className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: 'var(--success)' }} />
            <span className="text-[10px] xs:text-xs" style={{ color: 'var(--success)' }}>Canlı güncelleniyor</span>
          </div>
        </div>
        <div className="hidden xs:block flex-shrink-0" style={{ width: 72 }} />
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
          <Link href="/quiz">
            <button className="btn-primary">Quize Git →</button>
          </Link>
        </div>
      )}

      {/* Results */}
      <div className="space-y-3">
        {sorted.map((r, i) => {
          const rank = rankDisplay(i);
          const pct = Math.round((r.correct_count / r.total_questions) * 100);
          return (
            <div
              key={r.id}
              className="game-card liderboard-card p-4 animate-slide-up"
              style={{
                borderColor: i < 3 ? 'rgba(255,230,0,0.35)' : undefined,
                boxShadow: i === 0 ? `0 0 25px rgba(255,215,0,0.12)` : undefined,
              }}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Rank */}
                <div className={`rank-num font-game font-bold text-xl w-8 text-center flex-shrink-0 ${rank.cls}`}>
                  {rank.emoji}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="player-name font-bold text-base truncate">{r.player_name}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="flex items-center gap-2 mt-1">
                    <div className="progress-bar flex-1" style={{ height: '4px' }}>
                      <div className="progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs flex-shrink-0 whitespace-nowrap" style={{ color: 'var(--muted)' }}>
                      {r.correct_count}/{r.total_questions}
                    </span>
                  </div>
                </div>

                {/* XP */}
                <div className="text-right flex-shrink-0">
                  <div className="xp-value font-game font-bold text-lg neon-green">{r.total_xp}</div>
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

      {/* Sıfırla butonu — sağ altta sabit, küçük */}
      <div className="mt-12 pt-6" style={{ borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
        <div className="text-center">
          <p className="text-xs mb-3" style={{ color: 'var(--muted)', fontFamily: 'Chakra Petch' }}>
            🧑‍🏫 ÖĞRETMEN ARAÇLARI
          </p>
          {resetStage === 'idle' && (
            <button
              onClick={() => setResetStage('ask')}
              className="text-xs px-3 py-2 rounded"
              style={{
                background: 'rgba(255,68,68,0.08)',
                border: '1px solid rgba(255,68,68,0.3)',
                color: 'var(--danger)',
                fontFamily: 'Chakra Petch',
                letterSpacing: '1px',
              }}
            >
              🗑️ LİDERBOARD'U SIFIRLA
            </button>
          )}

          {(resetStage === 'ask' || resetStage === 'wrong') && (
            <div className="max-w-sm mx-auto">
              <div className="game-card p-4" style={{
                borderColor: resetStage === 'wrong' ? 'var(--danger)' : 'rgba(255,159,28,0.4)',
              }}>
                <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>
                  ⚠️ Tüm skorlar silinecek. Geri alınamaz!
                </p>
                <input
                  type="password"
                  placeholder="Öğretmen şifresi"
                  value={pwInput}
                  onChange={e => setPwInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleReset()}
                  className="w-full px-3 py-2 rounded mb-2 outline-none text-center"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,159,28,0.4)',
                    color: 'var(--text)',
                    fontFamily: 'Exo 2',
                    fontSize: '14px',
                    letterSpacing: '2px',
                  }}
                  autoFocus
                />
                {resetStage === 'wrong' && (
                  <p className="text-xs mb-2" style={{ color: 'var(--danger)' }}>
                    ❌ Şifre yanlış — tekrar dene
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => { setResetStage('idle'); setPwInput(''); }}
                    className="flex-1 text-xs py-2 rounded"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'var(--muted)',
                      fontFamily: 'Chakra Petch',
                    }}
                  >
                    VAZGEÇ
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 text-xs py-2 rounded"
                    style={{
                      background: 'var(--danger)',
                      color: '#000',
                      fontFamily: 'Chakra Petch',
                      fontWeight: 700,
                      letterSpacing: '1px',
                    }}
                  >
                    🗑️ SİL
                  </button>
                </div>
              </div>
            </div>
          )}

          {resetStage === 'working' && (
            <p className="text-xs" style={{ color: 'var(--orange)' }}>
              ⏳ Siliniyor...
            </p>
          )}
          {resetStage === 'done' && (
            <p className="text-xs" style={{ color: 'var(--success)' }}>
              ✅ Liderboard sıfırlandı — yeni bir başlangıç!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
