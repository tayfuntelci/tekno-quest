'use client';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { questions, Question, MatchPair, TOTAL_XP } from '@/lib/questions';
import { saveQuizResult } from '@/lib/supabase';

type Stage = 'name' | 'ready' | 'playing' | 'result';

const versionLabel: Record<string, string> = {
  v1: 'Renkli & Eğlenceli 🎨',
  v2: 'Uzay & Fütüristik 🚀',
  v3: 'Oyun Tarzı 🎮',
};

// ───── Name Entry ─────────────────────────────────────────────────────────────
function NameEntry({ onStart }: { onStart: (name: string) => void }) {
  const [name, setName] = useState('');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="game-card p-8 w-full max-w-sm text-center animate-slide-up">
        <div className="text-6xl mb-4">🎮</div>
        <h2 className="font-game font-bold text-xl neon-yellow mb-2">QUIZE BAŞLA</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          İsmini yaz ve hemen başla!
        </p>
        <input
          className="w-full text-center text-lg font-bold rounded-lg px-4 py-3 mb-4 outline-none"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,230,0,0.3)',
            color: 'var(--text)',
            fontFamily: 'Exo 2, sans-serif',
          }}
          placeholder="Adın nedir?"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && name.trim() && onStart(name.trim())}
          maxLength={30}
          autoFocus
        />
        <button
          className="btn-primary w-full text-base"
          onClick={() => name.trim() && onStart(name.trim())}
          disabled={!name.trim()}
          style={{ opacity: name.trim() ? 1 : 0.4 }}
        >
          ▶ Başla
        </button>
        <div className="mt-4 flex justify-center gap-4 text-xs" style={{ color: 'var(--muted)' }}>
          <span>📝 {questions.length} soru</span>
          <span>⭐ {TOTAL_XP} XP toplam</span>
        </div>
      </div>
    </div>
  );
}

// ───── Ready Screen ───────────────────────────────────────────────────────────
function ReadyScreen({ name, version, onGo }: { name: string; version: string; onGo: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="game-card p-8 w-full max-w-md text-center animate-slide-up">
        <div className="text-5xl mb-2">👋</div>
        <h2 className="font-game font-bold text-2xl neon-yellow mb-1">MERHABA, {name.toUpperCase()}!</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>{versionLabel[version] ?? ''}</p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: '📝', label: `${questions.length} Soru` },
            { icon: '⭐', label: `${TOTAL_XP} XP` },
            { icon: '🏆', label: 'Liderboard' },
          ].map(c => (
            <div key={c.label} className="rounded-lg p-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-2xl mb-1">{c.icon}</div>
              <div className="font-game text-xs neon-yellow">{c.label}</div>
            </div>
          ))}
        </div>
        <div className="text-left text-sm mb-6 space-y-2 p-4 rounded-lg"
          style={{ background: 'rgba(255,230,0,0.05)', border: '1px solid rgba(255,230,0,0.15)' }}>
          <p>✅ <strong>Çoktan seçmeli</strong> sorular</p>
          <p>✅ <strong>Doğru / Yanlış</strong> soruları</p>
          <p>✅ <strong>Eşleştirme</strong> soruları</p>
          <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>Doğru cevap = XP kazan!</p>
        </div>
        <button className="btn-primary w-full text-base" onClick={onGo}>
          🚀 Quize Başla!
        </button>
      </div>
    </div>
  );
}

// ───── MCQ Question ───────────────────────────────────────────────────────────
function MCQCard({
  q, onAnswer, answered,
}: {
  q: { text: string; options: string[]; correct: string; explanation: string };
  onAnswer: (ans: string) => void;
  answered: string | null;
}) {
  return (
    <div className="space-y-3">
      {q.options.map(opt => {
        let cls = 'answer-option';
        if (answered) {
          if (opt === q.correct) cls += ' correct';
          else if (opt === answered) cls += ' wrong';
        }
        return (
          <button
            key={opt}
            className={cls}
            onClick={() => !answered && onAnswer(opt)}
            disabled={!!answered}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ───── TF Question ────────────────────────────────────────────────────────────
function TFCard({
  q, onAnswer, answered,
}: {
  q: { text: string; correct: 'true' | 'false'; explanation: string };
  onAnswer: (ans: string) => void;
  answered: string | null;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {(['true', 'false'] as const).map(val => {
        let cls = 'answer-option text-center py-6';
        if (answered) {
          if (val === q.correct) cls += ' correct';
          else if (val === answered) cls += ' wrong';
        }
        return (
          <button
            key={val}
            className={cls}
            onClick={() => !answered && onAnswer(val)}
            disabled={!!answered}
          >
            <div className="text-3xl mb-2">{val === 'true' ? '✅' : '❌'}</div>
            <div className="font-game font-bold text-sm">
              {val === 'true' ? 'DOĞRU' : 'YANLIŞ'}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ───── Match Question ─────────────────────────────────────────────────────────
function MatchCard({
  pairs, onAnswer, answered,
}: {
  pairs: MatchPair[];
  onAnswer: (correct: boolean) => void;
  answered: boolean | null;
}) {
  const shuffledRight = useState(() => [...pairs].sort(() => Math.random() - 0.5))[0];
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<string[]>([]);

  const handleLeft = (left: string) => { if (answered !== null) return; setSelected(left); };
  const handleRight = (right: string) => {
    if (!selected || answered !== null) return;
    const correct = pairs.find(p => p.left === selected)?.right;
    if (correct === right) {
      const next = { ...matched, [selected]: right };
      setMatched(next);
      setSelected(null);
      if (Object.keys(next).length === pairs.length) onAnswer(true);
    } else {
      setErrors(e => [...e, selected]);
      setSelected(null);
      if (Object.keys(matched).length + 1 < pairs.length) {
        // allow retry for wrong matches
      } else {
        onAnswer(false);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <p className="font-game text-xs mb-2" style={{ color: 'var(--muted)' }}>YIL / KAVRAM</p>
        {pairs.map(p => {
          const isMatched = !!matched[p.left];
          const isSelected = selected === p.left;
          return (
            <button
              key={p.left}
              className="answer-option text-center font-game font-bold"
              style={{
                borderColor: isMatched ? 'var(--success)' : isSelected ? 'var(--primary)' : '',
                background: isMatched ? 'rgba(57,255,20,0.1)' : isSelected ? 'rgba(255,230,0,0.1)' : '',
                color: isMatched ? 'var(--success)' : isSelected ? 'var(--primary)' : '',
                cursor: isMatched ? 'default' : 'pointer',
              }}
              onClick={() => !isMatched && handleLeft(p.left)}
              disabled={isMatched}
            >
              {p.left}
            </button>
          );
        })}
      </div>
      <div className="space-y-2">
        <p className="font-game text-xs mb-2" style={{ color: 'var(--muted)' }}>OLAY</p>
        {shuffledRight.map(p => {
          const isMatched = Object.values(matched).includes(p.right);
          return (
            <button
              key={p.right}
              className="answer-option text-sm"
              style={{
                borderColor: isMatched ? 'var(--success)' : '',
                background: isMatched ? 'rgba(57,255,20,0.1)' : '',
                color: isMatched ? 'var(--success)' : '',
                cursor: isMatched ? 'default' : selected ? 'pointer' : 'not-allowed',
                opacity: isMatched ? 1 : selected ? 1 : 0.5,
              }}
              onClick={() => handleRight(p.right)}
              disabled={isMatched}
            >
              {p.right}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ───── Playing Stage ──────────────────────────────────────────────────────────
function PlayingStage({
  version, playerName, onFinish,
}: {
  version: string;
  playerName: string;
  onFinish: (xp: number, correct: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);
  const [matchAnswered, setMatchAnswered] = useState<boolean | null>(null);
  const [totalXP, setTotalXP] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [xpAnim, setXpAnim] = useState<string | null>(null);

  const q = questions[idx];
  const progress = ((idx) / questions.length) * 100;

  const triggerXP = (xp: number) => {
    setXpAnim(`+${xp} XP`);
    setTimeout(() => setXpAnim(null), 1000);
  };

  const handleMCQTF = useCallback((ans: string) => {
    if (answered) return;
    setAnswered(ans);
    const isCorrect =
      q.type === 'mcq' ? ans === (q as any).correct :
      q.type === 'tf'  ? ans === (q as any).correct : false;
    if (isCorrect) {
      setTotalXP(x => x + q.xp);
      setCorrect(c => c + 1);
      triggerXP(q.xp);
    }
    setShowExplanation(true);
  }, [answered, q]);

  const handleMatch = useCallback((isCorrect: boolean) => {
    setMatchAnswered(isCorrect);
    if (isCorrect) {
      setTotalXP(x => x + q.xp);
      setCorrect(c => c + 1);
      triggerXP(q.xp);
    }
    setShowExplanation(true);
  }, [q]);

  const next = () => {
    if (idx + 1 >= questions.length) {
      onFinish(totalXP + (answered || matchAnswered !== null ? 0 : 0), correct);
    } else {
      setIdx(i => i + 1);
      setAnswered(null);
      setMatchAnswered(null);
      setShowExplanation(false);
    }
  };

  const isAnswered = answered !== null || matchAnswered !== null;
  const wasCorrect =
    q.type === 'match' ? matchAnswered === true :
    q.type === 'mcq'   ? answered === (q as any).correct :
    q.type === 'tf'    ? answered === (q as any).correct : false;

  return (
    <div className="min-h-screen px-4 py-6 flex flex-col items-center">
      {/* HUD */}
      <div className="w-full max-w-xl mb-4">
        <div className="flex items-center justify-between mb-2 font-game text-xs">
          <span style={{ color: 'var(--muted)' }}>SORU {idx + 1} / {questions.length}</span>
          <span className="neon-green">{totalXP} XP</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* XP animation */}
      {xpAnim && (
        <div className="fixed top-20 right-8 font-game font-bold text-xl neon-green xp-pop pointer-events-none" style={{ zIndex: 100 }}>
          {xpAnim}
        </div>
      )}

      {/* Question card */}
      <div className="game-card p-6 w-full max-w-xl animate-slide-up">
        {/* Type badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="xp-badge">
            {q.type === 'mcq' ? '📝 Çoktan Seçmeli' : q.type === 'tf' ? '⚡ Doğru/Yanlış' : '🔗 Eşleştirme'}
          </span>
          <span className="xp-badge">+{q.xp} XP</span>
        </div>

        {/* Question text */}
        <p className="font-bold text-lg mb-5" style={{ lineHeight: '1.5' }}>{q.text}</p>

        {/* Question UI */}
        {q.type === 'mcq' && (
          <MCQCard q={q as any} onAnswer={handleMCQTF} answered={answered} />
        )}
        {q.type === 'tf' && (
          <TFCard q={q as any} onAnswer={handleMCQTF} answered={answered} />
        )}
        {q.type === 'match' && (
          <MatchCard pairs={(q as any).pairs} onAnswer={handleMatch} answered={matchAnswered} />
        )}

        {/* Explanation + Next */}
        {(isAnswered || showExplanation) && (
          <div className="mt-4 animate-slide-up">
            <div className="p-4 rounded-lg mb-4"
              style={{
                background: wasCorrect ? 'rgba(57,255,20,0.08)' : 'rgba(255,68,68,0.08)',
                border: `1px solid ${wasCorrect ? 'rgba(57,255,20,0.3)' : 'rgba(255,68,68,0.3)'}`,
              }}>
              <p className="text-sm font-bold mb-1" style={{ color: wasCorrect ? 'var(--success)' : 'var(--danger)' }}>
                {wasCorrect ? `🎉 Harika! +${q.xp} XP kazandın!` : '😅 Yanlış — ama öğreniyorsun!'}
              </p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{(q as any).explanation}</p>
            </div>
            <button className="btn-primary w-full" onClick={next}>
              {idx + 1 >= questions.length ? '🏁 Sonuçlara Git →' : 'Sonraki Soru →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ───── Result Stage ───────────────────────────────────────────────────────────
function ResultStage({
  playerName, version, totalXP, correct, saved,
}: {
  playerName: string;
  version: string;
  totalXP: number;
  correct: number;
  saved: boolean;
}) {
  const pct = Math.round((correct / questions.length) * 100);
  const star = pct >= 80 ? '🌟' : pct >= 50 ? '⭐' : '💪';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="game-card p-8 w-full max-w-md text-center animate-pop">
        <div className="text-6xl mb-3 animate-float">{star}</div>
        <h2 className="font-game font-bold text-2xl neon-yellow mb-1">TAMAMLANDI!</h2>
        <p className="mb-6" style={{ color: 'var(--muted)' }}>{playerName}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-lg p-3" style={{ background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.25)' }}>
            <div className="font-game font-bold text-xl neon-green">{totalXP}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>XP</div>
          </div>
          <div className="rounded-lg p-3" style={{ background: 'rgba(255,230,0,0.08)', border: '1px solid rgba(255,230,0,0.25)' }}>
            <div className="font-game font-bold text-xl neon-yellow">{correct}/{questions.length}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Doğru</div>
          </div>
          <div className="rounded-lg p-3" style={{ background: 'rgba(0,207,255,0.08)', border: '1px solid rgba(0,207,255,0.25)' }}>
            <div className="font-game font-bold text-xl neon-cyan">%{pct}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Başarı</div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {pct === 100 && <span className="xp-badge">🏆 MÜKEMMEL</span>}
          {pct >= 80 && <span className="xp-badge">⭐ HARIKA</span>}
          {correct >= 5 && <span className="xp-badge">🎯 HEDEF</span>}
          {totalXP > 80 && <span className="xp-badge">💎 UZMAN</span>}
        </div>

        <p className="text-xs mb-4" style={{ color: saved ? 'var(--success)' : 'var(--muted)' }}>
          {saved ? '✅ Skor kaydedildi!' : '⏳ Skor kaydediliyor...'}
        </p>

        <div className="space-y-3">
          <Link href="/liderboard" className="block">
            <button className="btn-primary w-full">🏆 Liderboard'u Gör</button>
          </Link>
          <Link href="/" className="block">
            <button className="btn-outline w-full">← Ana Sayfaya Dön</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ───── Main Quiz Page ─────────────────────────────────────────────────────────
export default function QuizPage() {
  const { version } = useParams<{ version: string }>();
  const [stage, setStage] = useState<Stage>('name');
  const [playerName, setPlayerName] = useState('');
  const [result, setResult] = useState<{ xp: number; correct: number } | null>(null);
  const [saved, setSaved] = useState(false);

  const handleName = (name: string) => { setPlayerName(name); setStage('ready'); };
  const handleReady  = () => setStage('playing');
  const handleFinish = async (xp: number, correct: number) => {
    setResult({ xp, correct });
    setStage('result');
    try {
      await saveQuizResult({
        player_name: playerName,
        presentation_version: version,
        score: Math.round((correct / questions.length) * 100),
        total_xp: xp,
        correct_count: correct,
        total_questions: questions.length,
      });
      setSaved(true);
    } catch { /* ignore */ }
  };

  if (stage === 'name')    return <NameEntry onStart={handleName} />;
  if (stage === 'ready')   return <ReadyScreen name={playerName} version={version} onGo={handleReady} />;
  if (stage === 'playing') return <PlayingStage version={version} playerName={playerName} onFinish={handleFinish} />;
  if (stage === 'result' && result)
    return <ResultStage playerName={playerName} version={version} totalXP={result.xp} correct={result.correct} saved={saved} />;
  return null;
}
