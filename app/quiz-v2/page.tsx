'use client';
import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MatchPair, Question } from '@/lib/questions-v2';
import { Character, CharacterId, PowerUpId, BadgeEarnedInput } from '@/lib/game-data';
import {
  getQuestions, getTotalXp, getCharacters,
  getRank as getRankI18n, getStreakInfo as getStreakInfoI18n,
  computeBadges as computeBadgesI18n, getSpeedBonus as getSpeedBonusI18n,
  getSectionMeta as getSectionMetaI18n,
} from '@/lib/quiz-data-i18n';
import { Lang, UI, UIStrings, normalizeLang } from '@/lib/i18n';
import { saveQuizResult } from '@/lib/supabase';

// ============================================================
// Quiz Oyunu — Teknoloji Quest (Arena Edition)
// Akış: name → character → ready → playing → result
// Çoklu dil: QuizApp en üstte ?lang'a göre ACTIVE_LANG'i ve veri
// binding'lerini set eder; tüm alt bileşenler bunları okur
// (lang oturum boyunca sabit olduğu için güvenli).
// ============================================================

type Stage = 'name' | 'character' | 'ready' | 'playing' | 'result';

// ── Render-kapsamlı dil durumu ──
let ACTIVE_LANG: Lang = 'tr';
let questions: Question[] = getQuestions('tr');
let CHARACTERS: Character[] = getCharacters('tr');
let TOTAL_XP: number = getTotalXp('tr');
const tr = (): UIStrings => UI[ACTIVE_LANG];
const getSectionMeta = (section: string) => getSectionMetaI18n(ACTIVE_LANG, section);
const getRank = (xp: number) => getRankI18n(ACTIVE_LANG, xp);
const getStreakInfo = (count: number) => getStreakInfoI18n(ACTIVE_LANG, count);
const computeBadges = (s: BadgeEarnedInput) => computeBadgesI18n(ACTIVE_LANG, s);
const getSpeedBonus = (ms: number) => getSpeedBonusI18n(ACTIVE_LANG, ms);

// ════════════════════════ YARDIMCI BİLEŞENLER ════════════════════════

// Uzay haritası — soru düğümleri için pozisyonlar (% bazlı, responsive)
// Aşağıdan yukarı kıvrılan yılan deseni: 15 soru + finiş
const NODE_POSITIONS: { x: number; y: number }[] = [
  // Row bottom — soru 1-5 (sol→sağ)
  { x: 8,  y: 86 },
  { x: 26, y: 78 },
  { x: 44, y: 86 },
  { x: 62, y: 78 },
  { x: 80, y: 86 },
  // Row middle — soru 6-10 (sağ→sol)
  { x: 90, y: 58 },
  { x: 72, y: 50 },
  { x: 54, y: 58 },
  { x: 36, y: 50 },
  { x: 16, y: 58 },
  // Row top — soru 11-15 (sol→sağ)
  { x: 10, y: 26 },
  { x: 30, y: 18 },
  { x: 50, y: 26 },
  { x: 70, y: 18 },
  { x: 88, y: 26 },
];
const TROPHY_POSITION = { x: 92, y: 8 };

// Zafere giden yolu çizen SVG path (polyline)
function MapPath({ currentIdx, total }: { currentIdx: number; total: number }) {
  const allPoints = [...NODE_POSITIONS, TROPHY_POSITION]
    .map(p => `${p.x},${p.y}`).join(' ');
  // "Tamamlanan" yol: başlangıçtan mevcut soruya kadar (current dahil)
  const doneCount = Math.min(currentIdx + 1, total);
  const donePoints = NODE_POSITIONS.slice(0, doneCount)
    .map(p => `${p.x},${p.y}`).join(' ');
  return (
    <svg className="map-path-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Arka: donuk kesikli yol */}
      <polyline
        points={allPoints}
        className="map-path-bg"
        vectorEffect="non-scaling-stroke"
      />
      {/* Ön: ışıklı ilerleme yolu */}
      {doneCount > 0 && (
        <polyline
          points={donePoints}
          className="map-path-fg"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}

// Harita düğümü (gezegen tarzı soru node'u)
function BoardNode({
  idx, status, sectionMeta, onClick,
}: {
  idx: number;
  status: 'done' | 'current' | 'future';
  sectionMeta: { color: string; glow: string; emoji: string; name: string };
  onClick?: () => void;
}) {
  const pos = NODE_POSITIONS[idx];
  const clickable = !!onClick;
  const ariaLabel =
    status === 'done' ? `Soru ${idx + 1} — tekrar bak`
    : status === 'current' ? `Soru ${idx + 1} — şimdi`
    : `Soru ${idx + 1} — kilitli`;
  return (
    <div
      className={`board-node ${status}${clickable ? ' clickable' : ''}`}
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        ['--node-color' as any]: sectionMeta.color,
        ['--node-glow' as any]: sectionMeta.glow,
        animationDelay: `${idx * 0.05}s`,
      }}
      onClick={onClick}
      role={clickable ? 'button' : undefined}
      aria-label={ariaLabel}
    >
      <div className="node-inner">
        {status === 'done'
          ? <span className="node-check">✓</span>
          : status === 'current'
            ? <span className="node-current">{sectionMeta.emoji}</span>
            : <span className="node-num">{idx + 1}</span>
        }
      </div>
      {status === 'future' && <span className="node-lock">🔒</span>}
      {status === 'current' && <div className="node-tap-hint">{tr().tapHint}</div>}
      {status === 'done' && <div className="node-review-hint">👁️</div>}
    </div>
  );
}

// Trophy (finiş noktası)
function BoardTrophy({ reached }: { reached: boolean }) {
  return (
    <div
      className={`board-trophy ${reached ? 'reached' : ''}`}
      style={{ left: `${TROPHY_POSITION.x}%`, top: `${TROPHY_POSITION.y}%` }}
    >
      <div className="trophy-inner">🏆</div>
      <div className="trophy-label">{tr().victoryShort}</div>
    </div>
  );
}

// Uzay gemisi / karakter rokı — mevcut node'da durur, animasyonla sonrakine geçer
function BoardRocket({
  idx, character, moving,
}: { idx: number; character: Character; moving: boolean }) {
  const pos = NODE_POSITIONS[idx];
  return (
    <div
      className={`board-rocket ${moving ? 'moving' : ''}`}
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        ['--rocket-color' as any]: character.color,
        ['--rocket-glow' as any]: character.glow,
      }}
    >
      <div className="rocket-thrust" />
      <div className="rocket-body">{character.emoji}</div>
    </div>
  );
}

// Uzay arka planı — çok katmanlı yıldız alanı + nebulalar
function SpaceBackdrop() {
  return (
    <div className="space-backdrop">
      <div className="sb-layer sb-stars-a" />
      <div className="sb-layer sb-stars-b" />
      <div className="sb-layer sb-stars-c" />
      <div className="sb-nebula sb-nebula-1" />
      <div className="sb-nebula sb-nebula-2" />
      <div className="sb-nebula sb-nebula-3" />
    </div>
  );
}

// Bölüm geçiş sahnesi — büyük overlay (cinematic, emoji-rendering'den bağımsız)
function SectionChangeOverlay({
  meta,
}: { meta: { color: string; glow: string; emoji: string; name: string } }) {
  // Yükselen kıvılcım partikülleri — her geçişte farklı konum
  const sparks = Array.from({ length: 18 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.9,
    size: 3 + Math.random() * 5,
    duration: 1.4 + Math.random() * 0.9,
  }));
  // Orbit eden parçacıklar (badge etrafında)
  const orbits = Array.from({ length: 8 }, (_, i) => ({ angle: (i / 8) * 360 }));

  return (
    <div className="section-overlay" style={{
      ['--sec-color' as any]: meta.glow,
      ['--sec-color-solid' as any]: meta.color,
    }}>
      {/* Yatay ışık taraması */}
      <div className="so-sweep" />

      {/* Yükselen kıvılcımlar */}
      <div className="so-sparks">
        {sparks.map((s, i) => (
          <span
            key={i}
            className="so-spark"
            style={{
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="section-overlay-inner">
        {/* Büyük glowing badge — emoji nasıl render olursa olsun dramatik kalır */}
        <div className="so-badge">
          <div className="so-ring so-ring-1" />
          <div className="so-ring so-ring-2" />
          <div className="so-ring so-ring-3" />
          {orbits.map((o, i) => (
            <span
              key={i}
              className="so-orbit-dot"
              style={{ transform: `rotate(${o.angle}deg) translateY(-78px)` }}
            />
          ))}
          <div className="so-emoji">{meta.emoji}</div>
        </div>

        <div className="so-label">{tr().newSectionUnlocked}</div>
        <div className="so-name">{meta.name}</div>
        <div className="so-sub">{tr().readyQuestion}</div>
      </div>
    </div>
  );
}

// Burst efekti (doğru cevap parçacık patlaması)
function BurstEffect({ x, y, color }: { x: number; y: number; color: string }) {
  const particles = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const dist = 90 + Math.random() * 70;
    return {
      bx: Math.cos(angle) * dist,
      by: Math.sin(angle) * dist,
      delay: Math.random() * 0.1,
    };
  });
  return (
    <div className="burst-container" style={{ left: x, top: y }}>
      {particles.map((p, i) => (
        <div
          key={i}
          className="burst-particle"
          style={{
            background: color,
            boxShadow: `0 0 12px ${color}`,
            ['--bx' as any]: `${p.bx}px`,
            ['--by' as any]: `${p.by}px`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// Streak banner
function StreakBanner({
  emoji, text, bonus, color,
}: { emoji: string; text: string; bonus: number; color: string }) {
  return (
    <div className="streak-banner" style={{ ['--streak-color' as any]: color }}>
      <div className="flex items-center gap-2">
        <span className="sb-emoji">{emoji}</span>
        <span className="sb-text">{text}</span>
        <span className="sb-bonus">+{bonus} XP</span>
      </div>
    </div>
  );
}

// Rank-up banner
function RankUpBanner({ emoji, name }: { emoji: string; name: string }) {
  return (
    <div className="rank-up-banner">
      <div className="ru-label">{tr().newLevel}</div>
      <div className="ru-emoji">{emoji}</div>
      <div className="ru-name">{name.toUpperCase()}</div>
    </div>
  );
}

// ════════════════════════ REVIEW (Geçmiş Cevap) ════════════════════════

interface AnswerRecordLite {
  userAnswer: string | null;
  matchResult: boolean | null;
  wasCorrect: boolean;
  wasSkipped: boolean;
  usedRetry: boolean;
}

function ReviewModal({
  questionIdx, record, onClose,
}: {
  questionIdx: number;
  record: AnswerRecordLite;
  onClose: () => void;
}) {
  const q = questions[questionIdx];
  const meta = getSectionMeta(q.section);

  const statusBadge = record.wasSkipped
    ? { bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.5)', color: '#c084fc', text: tr().reviewSkipped }
    : record.wasCorrect
    ? { bg: 'rgba(57,255,20,0.14)', border: 'rgba(57,255,20,0.5)', color: 'var(--success)', text: record.usedRetry ? tr().reviewRetrySuccess : tr().reviewCorrect }
    : { bg: 'rgba(255,68,68,0.14)', border: 'rgba(255,68,68,0.5)', color: 'var(--danger)', text: tr().reviewWrong };

  return (
    <div className="q-modal review-wrap" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="q-modal-backdrop" />
      <div
        className="q-modal-card arena-card review-card"
        style={{
          ['--arena-color' as any]: meta.color,
          ['--arena-glow' as any]: meta.glow,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Review header */}
        <div className="review-header">
          <div className="rh-icon">📜</div>
          <div className="rh-texts">
            <div className="rh-small">{tr().reviewPastStage} {questionIdx + 1} / {questions.length}</div>
            <div className="rh-big">{tr().reviewQuestionTitle}</div>
          </div>
          <button className="rh-close" onClick={onClose} aria-label={tr().reviewClose}>✕</button>
        </div>

        {/* Section pill */}
        <div className="text-center mb-3 mt-3">
          <span className="inline-block px-3 py-1 rounded-full font-game text-xs" style={{
            background: meta.glow,
            border: `1px solid ${meta.color}55`,
            color: meta.color,
            letterSpacing: '1.5px',
          }}>
            {meta.emoji} {meta.name}
          </span>
        </div>

        {/* Status badges */}
        <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
          <span className="xp-badge" style={{
            background: statusBadge.bg,
            borderColor: statusBadge.border,
            color: statusBadge.color,
          }}>
            {statusBadge.text}
          </span>
          <span className="xp-badge">+{q.xp} XP</span>
          {record.usedRetry && (
            <span className="xp-badge" style={{
              background: 'rgba(255,159,28,0.12)',
              borderColor: 'rgba(255,159,28,0.4)',
              color: 'var(--orange)',
            }}>
              {tr().secondChanceUsed}
            </span>
          )}
        </div>

        {/* Question text */}
        <p className="font-bold text-lg md:text-xl mb-5 text-center" style={{ lineHeight: '1.5' }}>
          {q.text}
        </p>

        {/* Answer display (read-only) */}
        <ReviewAnswerView q={q} record={record} />

        {/* Explanation */}
        <div className="p-4 rounded-lg mt-4"
          style={{
            background: 'rgba(0,207,255,0.08)',
            border: '1px solid rgba(0,207,255,0.3)',
          }}>
          <p className="text-sm font-bold mb-1" style={{ color: 'var(--info)' }}>
            {tr().correctAnswerExplanation}
          </p>
          <p className="text-sm" style={{ color: 'var(--text)', lineHeight: 1.5 }}>
            {(q as any).explanation}
          </p>
        </div>

        {/* Close */}
        <button className="btn-outline w-full mt-4" onClick={onClose} style={{ padding: '12px' }}>
          {tr().backToMap}
        </button>
      </div>
    </div>
  );
}

// Review için cevap görüntüleme (read-only, interaksiyon yok)
function ReviewAnswerView({ q, record }: { q: Question; record: AnswerRecordLite }) {
  if (q.type === 'mcq') {
    return (
      <div className="space-y-3">
        {q.options.map(opt => {
          const isUser = opt === record.userAnswer;
          const isCorrect = opt === q.correct;
          let cls = 'review-opt';
          if (isCorrect) cls += ' correct';
          else if (isUser) cls += ' wrong';
          return (
            <div key={opt} className={cls}>
              <span className="ro-text">{opt}</span>
              {isUser && <span className="ro-tag ro-tag-user">{tr().yourAnswer}</span>}
              {isCorrect && !isUser && <span className="ro-tag ro-tag-ok">{tr().correctAnswer}</span>}
              {isCorrect && isUser && <span className="ro-tag ro-tag-ok">{tr().correctTick}</span>}
            </div>
          );
        })}
        {record.wasSkipped && (
          <p className="text-xs text-center mt-2" style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
            {tr().skippedWithPower}
          </p>
        )}
      </div>
    );
  }
  if (q.type === 'tf') {
    return (
      <div className="grid grid-cols-2 gap-4">
        {(['true', 'false'] as const).map(v => {
          const isUser = v === record.userAnswer;
          const isCorrect = v === q.correct;
          let cls = 'review-opt review-opt-tf';
          if (isCorrect) cls += ' correct';
          else if (isUser) cls += ' wrong';
          return (
            <div key={v} className={cls}>
              <span className="ro-big">{v === 'true' ? '✅' : '❌'}</span>
              <span className="ro-label">{v === 'true' ? tr().correctLabel : tr().wrongLabel}</span>
              {isUser && <span className="ro-tag ro-tag-user">{tr().yourAnswer}</span>}
              {isCorrect && !isUser && <span className="ro-tag ro-tag-ok">{tr().correctAnswer}</span>}
              {isCorrect && isUser && <span className="ro-tag ro-tag-ok">{tr().correctTick}</span>}
            </div>
          );
        })}
      </div>
    );
  }
  if (q.type === 'match') {
    return (
      <div className="space-y-2">
        <p className="text-xs mb-2 text-center font-game" style={{ color: 'var(--muted)', letterSpacing: '1.5px' }}>
          {tr().correctMatches}
        </p>
        {q.pairs.map(p => (
          <div key={p.left} className="review-match-row">
            <span className="rm-left">{p.left}</span>
            <span className="rm-arrow">→</span>
            <span className="rm-right">{p.right}</span>
          </div>
        ))}
        {record.matchResult !== null && (
          <p className="text-sm text-center mt-3 font-bold" style={{
            color: record.matchResult ? 'var(--success)' : 'var(--orange)',
          }}>
            {record.matchResult ? tr().matchAllCorrect : tr().matchNotAll}
          </p>
        )}
      </div>
    );
  }
  return null;
}

// Karakter mini avatar (quiz sırasında sürekli görünür)
function CharMini({ character }: { character: Character }) {
  return (
    <div className="char-mini" style={{
      ['--char-color' as any]: character.color,
      ['--char-glow' as any]: character.glow,
    }}>
      {character.emoji}
    </div>
  );
}

// ════════════════════════ STAGE — İSİM ════════════════════════
function NameStage({ onNext }: { onNext: (name: string) => void }) {
  const [name, setName] = useState('');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="hero-card w-full max-w-md text-center animate-slide-up">
        <div className="text-7xl mb-4 animate-float inline-block">🎮</div>
        <h2 className="font-game font-bold text-2xl neon-yellow mb-2" style={{ letterSpacing: '1.5px' }}>
          TEKNOLOJİ QUEST
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          {tr().nameWriteStart}
        </p>
        <input
          className="w-full text-center text-xl font-bold rounded-lg px-4 py-4 mb-4 outline-none"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '2px solid rgba(255,230,0,0.3)',
            color: 'var(--text)',
            fontFamily: 'Exo 2, sans-serif',
          }}
          placeholder={tr().quizNamePlaceholder}
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && name.trim() && onNext(name.trim())}
          maxLength={20}
          autoFocus
        />
        <button
          className="btn-primary w-full"
          onClick={() => name.trim() && onNext(name.trim())}
          disabled={!name.trim()}
          style={{ opacity: name.trim() ? 1 : 0.4, fontSize: '16px', padding: '14px' }}
        >
          {tr().continueArrow}
        </button>
        <div className="mt-6 flex justify-center gap-4 text-xs" style={{ color: 'var(--muted)' }}>
          <span>📝 {tr().quizQuestionsCount}</span>
          <span>⭐ {TOTAL_XP}+ XP</span>
          <span>🎯 {tr().quizHeroes}</span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════ STAGE — KARAKTER SEÇİMİ ════════════════════════
function CharacterStage({
  name, onSelect, onBack,
}: { name: string; onSelect: (id: CharacterId) => void; onBack: () => void }) {
  const [selected, setSelected] = useState<CharacterId | null>(null);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-4xl animate-slide-up">
        <div className="text-center mb-6">
          <p className="text-sm mb-1" style={{ color: 'var(--muted)' }}>{tr().helloPrefix} {name.toUpperCase()}! 👋</p>
          <h2 className="font-game font-bold text-2xl neon-yellow" style={{ letterSpacing: '1.5px' }}>
            {tr().chooseClass}
          </h2>
          <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
            {tr().chooseClassDesc}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {CHARACTERS.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`char-card ${selected === c.id ? 'selected' : ''}`}
              style={{
                ['--char-color' as any]: c.color,
                ['--char-glow' as any]: c.glow,
              }}
            >
              <span className="char-emoji">{c.emoji}</span>
              <div className="char-class">{c.className}</div>
              <div className="char-bio">{c.bio}</div>
              <div className="char-power">
                {c.powerEmoji} {c.powerLabel}
              </div>
            </button>
          ))}
        </div>

        {selected && (() => {
          const ch = CHARACTERS.find(x => x.id === selected)!;
          return (
            <div className="hero-card animate-pop mb-4" style={{
              borderColor: ch.color,
              boxShadow: `0 0 32px ${ch.glow}`,
            }}>
              <div className="text-center">
                <p className="text-xs mb-1" style={{ color: 'var(--muted)', letterSpacing: '1px' }}>{tr().quizYourPower}</p>
                <p className="font-bold text-lg mb-1" style={{ color: ch.color }}>
                  {ch.powerEmoji} {ch.powerLabel}
                </p>
                <p className="text-sm" style={{ color: 'var(--text)' }}>
                  {ch.powerDesc}
                </p>
              </div>
            </div>
          );
        })()}

        <div className="flex gap-3 justify-center">
          <button className="btn-outline" onClick={onBack}>{tr().backShort}</button>
          <button
            className="btn-primary"
            onClick={() => selected && onSelect(selected)}
            disabled={!selected}
            style={{ opacity: selected ? 1 : 0.4, fontSize: '16px', padding: '14px 32px' }}
          >
            {tr().adventureBegins}
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════ STAGE — HAZIR ════════════════════════
function ReadyStage({
  name, character, onGo,
}: { name: string; character: Character; onGo: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="hero-card w-full max-w-md text-center animate-slide-up"
        style={{ borderColor: character.color }}>
        <div className="text-7xl mb-2 animate-heartbeat" style={{ filter: `drop-shadow(0 0 20px ${character.glow})` }}>
          {character.emoji}
        </div>
        <h2 className="font-game font-bold text-2xl mb-1" style={{ color: character.color, letterSpacing: '1.5px' }}>
          {name.toUpperCase()}
        </h2>
        <p className="text-sm mb-5" style={{ color: 'var(--muted)', letterSpacing: '1px' }}>
          {character.className.toUpperCase()}
        </p>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { icon: '📝', label: tr().quizQuestionsCountShort },
            { icon: '🎯', label: tr().quizSections },
            { icon: '⭐', label: `${TOTAL_XP}+ XP` },
          ].map(c => (
            <div key={c.label} className="rounded-lg p-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-2xl mb-1">{c.icon}</div>
              <div className="font-game text-xs neon-yellow">{c.label}</div>
            </div>
          ))}
        </div>
        <div className="text-left text-sm mb-5 p-4 rounded-lg"
          style={{ background: `${character.glow}`, border: `1px solid ${character.color}55` }}>
          <p className="font-bold mb-2" style={{ color: character.color }}>
            {character.powerEmoji} {tr().yourPowerInline} {character.powerLabel}
          </p>
          <p className="text-xs" style={{ color: 'var(--text)' }}>
            {character.powerDesc}
          </p>
        </div>
        <div className="text-left text-xs mb-5 space-y-1" style={{ color: 'var(--muted)' }}>
          <p>✨ {tr().comboHintPre}<strong style={{ color: 'var(--info)' }}>{tr().comboBonus}</strong></p>
          <p>⚡ {tr().quizSpeedHint}<strong style={{ color: 'var(--primary)' }}>{tr().quizSpeedBonus}</strong></p>
          <p>💪 {tr().quizRetryHint}<strong style={{ color: 'var(--success)' }}>{tr().quizSecondChance}</strong></p>
        </div>
        <button className="btn-primary w-full" onClick={onGo}
          style={{ fontSize: '16px', padding: '14px', background: character.color }}>
          {tr().startExclaim}
        </button>
      </div>
    </div>
  );
}

// ════════════════════════ Soru Kartları ════════════════════════

// MCQ — oyunsu 3D butonlar
function MCQCard({
  q, onAnswer, answered, hiddenOptions,
}: {
  q: { text: string; options: string[]; correct: string; explanation: string };
  onAnswer: (ans: string) => void;
  answered: string | null;
  hiddenOptions: string[];
}) {
  return (
    <div className="space-y-3">
      {q.options.map(opt => {
        if (hiddenOptions.includes(opt)) return null;
        let cls = 'game-option';
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

// TF — büyük oyunsu karte
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
        let cls = 'game-tf';
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
            <span className="tf-big">{val === 'true' ? '✅' : '❌'}</span>
            {val === 'true' ? tr().correctLabel : tr().wrongLabel}
          </button>
        );
      })}
    </div>
  );
}

// Match — sürükle-bırak eşleştirme (pointer events: hem fare hem dokunmatik)
function MatchCard({
  pairs, onAnswer, answered,
}: {
  pairs: MatchPair[];
  onAnswer: (correct: boolean) => void;
  answered: boolean | null;
}) {
  // Sağ sütunu rastgele sırala
  const shuffledRight = useState(() => [...pairs].sort(() => Math.random() - 0.5))[0];
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<{
    right: string;
    x: number; y: number;
    width: number; height: number;
    offsetX: number; offsetY: number;
  } | null>(null);
  const [hoverLeft, setHoverLeft] = useState<string | null>(null);
  const [shake, setShake] = useState<string | null>(null);

  // Drop hedefi ref'lerini takip et
  const leftRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const findHoverLeft = (clientX: number, clientY: number): string | null => {
    let result: string | null = null;
    leftRefs.current.forEach((el, left) => {
      if (result || matched[left]) return;
      const r = el.getBoundingClientRect();
      if (clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom) {
        result = left;
      }
    });
    return result;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, right: string) => {
    if (answered !== null) return;
    if (Object.values(matched).includes(right)) return;
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragging({
      right,
      x: e.clientX, y: e.clientY,
      width: rect.width, height: rect.height,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    });
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    e.preventDefault();
    setDragging(d => d ? { ...d, x: e.clientX, y: e.clientY } : null);
    setHoverLeft(findHoverLeft(e.clientX, e.clientY));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const right = dragging.right;
    const targetLeft = findHoverLeft(e.clientX, e.clientY);
    setDragging(null);
    setHoverLeft(null);
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
    if (!targetLeft) return;
    const correctRight = pairs.find(p => p.left === targetLeft)?.right;
    if (correctRight === right) {
      const next = { ...matched, [targetLeft]: right };
      setMatched(next);
      if (Object.keys(next).length === pairs.length) {
        // Tüm eşleşmeler doğru — kazandı
        setTimeout(() => onAnswer(true), 250);
      }
    } else {
      // Yanlış bırakma — sallama animasyonu, sonsuz deneme hakkı
      setShake(targetLeft);
      setTimeout(() => setShake(null), 500);
    }
  };

  const handlePointerCancel = () => {
    setDragging(null);
    setHoverLeft(null);
  };

  return (
    <div className="match-grid" style={{ position: 'relative' }}>
      {/* Sol sütun — drop hedefleri (sabit) */}
      <div className="match-col">
        <p className="match-col-label">{tr().matchTarget}</p>
        {pairs.map(p => {
          const isMatched = !!matched[p.left];
          const isHover = hoverLeft === p.left;
          const isShaking = shake === p.left;
          return (
            <div
              key={p.left}
              ref={el => { if (el) leftRefs.current.set(p.left, el); else leftRefs.current.delete(p.left); }}
              className={`match-target${isMatched ? ' matched' : ''}${isHover ? ' hover' : ''}${isShaking ? ' shake' : ''}`}
            >
              <div className="match-left-text">{p.left}</div>
              {isMatched ? (
                <div className="match-paired">{matched[p.left]} ✓</div>
              ) : (
                <div className="match-slot">{isHover ? tr().matchDropHere : tr().matchDropHint}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sağ sütun — sürüklenebilir kartlar */}
      <div className="match-col">
        <p className="match-col-label">{tr().matchDrag}</p>
        {shuffledRight.map(p => {
          const isMatched = Object.values(matched).includes(p.right);
          const isDragging = dragging?.right === p.right;
          return (
            <div
              key={p.right}
              className={`match-source${isMatched ? ' matched' : ''}${isDragging ? ' dragging' : ''}`}
              style={{ visibility: isDragging ? 'hidden' : 'visible' }}
              onPointerDown={e => handlePointerDown(e, p.right)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              {!isMatched && <span className="match-grip">⋮⋮</span>}
              <span>{p.right}</span>
              {isMatched && <span style={{ color: 'var(--success)', marginLeft: 'auto' }}>✓</span>}
            </div>
          );
        })}
      </div>

      {/* Sürüklenen kartın "ghost" görüntüsü */}
      {dragging && (
        <div
          className="match-ghost"
          style={{
            left: dragging.x - dragging.offsetX,
            top: dragging.y - dragging.offsetY,
            width: dragging.width,
            height: dragging.height,
          }}
        >
          <span className="match-grip">⋮⋮</span>
          <span>{dragging.right}</span>
        </div>
      )}
    </div>
  );
}

// ════════════════════════ STAGE — PLAYING ════════════════════════

interface PlayingProps {
  character: Character;
  onFinish: (stats: FinalStats) => void;
}

interface FinalStats {
  totalXp: number;
  correct: number;
  bestStreak: number;
  fastestMs: number | null;
  powerUpsUsed: number;
  retrySuccess: boolean;
}

// Cevap kaydı — geçmiş soruları review için
interface AnswerRecord {
  userAnswer: string | null;      // MCQ/TF seçeneği, '__skipped__', veya null
  matchResult: boolean | null;     // eşleştirme sonucu
  wasCorrect: boolean;
  wasSkipped: boolean;
  usedRetry: boolean;
}

function PlayingStage({ character, onFinish }: PlayingProps) {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);
  const [matchAnswered, setMatchAnswered] = useState<boolean | null>(null);

  // Modal açık mı? (soru modal'ı)
  const [modalOpen, setModalOpen] = useState(false);
  // Review modal — geçmiş aşamalara dönmek için (null veya soru indeksi)
  const [reviewIdx, setReviewIdx] = useState<number | null>(null);
  // Roket hareket halinde mi? (düğümler arası animasyon)
  const [rocketMoving, setRocketMoving] = useState(false);
  // Cevap geçmişi — her soruya verilen cevap
  const [history, setHistory] = useState<Record<number, AnswerRecord>>({});

  // Güç durumu
  const lucky = character.power === 'lucky-start' ? 20 : 0;
  const [totalXp, setTotalXp] = useState(lucky);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [fastestMs, setFastestMs] = useState<number | null>(null);
  const [retryUsed, setRetryUsed] = useState(false);
  const [retrySuccessFlag, setRetrySuccessFlag] = useState(false);

  // Power-up'lar (Emir hariç — onunki otomatik)
  const initialPowerUps: PowerUpId[] = character.power === 'lucky-start'
    ? []
    : [character.power];
  const [availablePowers, setAvailablePowers] = useState<PowerUpId[]>(initialPowerUps);
  const [powerUpsUsed, setPowerUpsUsed] = useState(0);
  const [doubleXpActive, setDoubleXpActive] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);

  // UI efektleri
  const [xpAnim, setXpAnim] = useState<string | null>(null);
  const [burst, setBurst] = useState<{ x: number; y: number; color: string } | null>(null);
  const [streakBanner, setStreakBanner] = useState<ReturnType<typeof getStreakInfo> | null>(null);
  const [rankUpDisplay, setRankUpDisplay] = useState<{ emoji: string; name: string } | null>(null);
  const [screenShake, setScreenShake] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
  const [sectionOverlay, setSectionOverlay] = useState<ReturnType<typeof getSectionMeta> | null>(null);

  // Zaman takibi
  const questionStartRef = useRef<number>(Date.now());
  const prevRankRef = useRef<string>(getRank(lucky).name);
  const prevSectionRef = useRef<string>(questions[0].section);

  const q = questions[idx];
  const progress = (idx / questions.length) * 100;
  const currentRank = getRank(totalXp);
  const currentSection = getSectionMeta(q.section);

  // Soru değişince başlangıç zamanı sıfırla + hiddenOptions temizle
  useEffect(() => {
    questionStartRef.current = Date.now();
    setHiddenOptions([]);
    setDoubleXpActive(false);
    setRetryUsed(false);
  }, [idx]);

  // Rank değişimini izle
  useEffect(() => {
    if (currentRank.name !== prevRankRef.current && idx > 0) {
      setRankUpDisplay({ emoji: currentRank.emoji, name: currentRank.name });
      setTimeout(() => setRankUpDisplay(null), 1800);
      prevRankRef.current = currentRank.name;
    }
  }, [currentRank.name, idx]);

  // Bölüm değişimini yedek olarak izle — ref'i güncelle (overlay goNext'te tetiklenir)
  useEffect(() => {
    prevSectionRef.current = q.section;
  }, [q.section]);

  const triggerXpPop = (xp: number) => {
    setXpAnim(`+${xp} XP`);
    setTimeout(() => setXpAnim(null), 1000);
  };

  const triggerBurst = (color: string) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setBurst({ x: centerX, y: centerY, color });
    setTimeout(() => setBurst(null), 1000);
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 500);
  };

  const triggerStreak = (newStreak: number) => {
    const info = getStreakInfo(newStreak);
    if (info) {
      setStreakBanner(info);
      setTotalXp(x => x + info.bonusXp);
      setTimeout(() => setStreakBanner(null), 1800);
    }
  };

  // Doğru cevap işlemi
  const processCorrect = useCallback(() => {
    let xpGain = q.xp;
    const elapsed = Date.now() - questionStartRef.current;
    const speed = getSpeedBonus(elapsed);
    xpGain += speed.xp;
    if (doubleXpActive) xpGain *= 2;

    setTotalXp(x => x + xpGain);
    setCorrect(c => c + 1);
    const newStreak = streak + 1;
    setStreak(newStreak);
    setBestStreak(bs => Math.max(bs, newStreak));
    if (fastestMs === null || elapsed < fastestMs) setFastestMs(elapsed);
    triggerXpPop(xpGain);
    triggerBurst(currentSection.color);
    setTimeout(() => triggerStreak(newStreak), 400);
  }, [q, streak, doubleXpActive, fastestMs, currentSection.color]);

  const handleMCQTF = useCallback((ans: string) => {
    if (answered || showRetry) return;
    const isCorrect =
      q.type === 'mcq' ? ans === (q as any).correct :
      q.type === 'tf'  ? ans === (q as any).correct : false;

    if (isCorrect) {
      setAnswered(ans);
      processCorrect();
      if (retryUsed) setRetrySuccessFlag(true);
      setShowExplanation(true);
    } else {
      if (!retryUsed) {
        setAnswered(ans);
        setShowRetry(true);
        setTimeout(() => {
          setAnswered(null);
          setRetryUsed(true);
          setShowRetry(false);
        }, 1500);
      } else {
        setAnswered(ans);
        setStreak(0);
        setShowExplanation(true);
      }
    }
  }, [answered, q, showRetry, retryUsed, processCorrect]);

  const handleMatch = useCallback((isCorrect: boolean) => {
    setMatchAnswered(isCorrect);
    if (isCorrect) {
      processCorrect();
    } else {
      setStreak(0);
    }
    setShowExplanation(true);
  }, [processCorrect]);

  // Harita düğüm tıklaması:
  //  - Mevcut node  → soru modal aç
  //  - Geçmiş node  → review modal aç (ne cevap verdiğini gör)
  //  - Kilitli node → hiçbir şey
  const handleNodeAction = (nodeIdx: number) => {
    if (nodeIdx < idx) {
      // Geçmiş aşama — review aç
      setReviewIdx(nodeIdx);
      return;
    }
    if (nodeIdx === idx) {
      // Mevcut aşama — canlı soru modal'ı
      if (rocketMoving) return;
      if (answered !== null || matchAnswered !== null) return;
      setModalOpen(true);
    }
  };

  // Sonraki soruya geç: cevabı kaydet → modal kapat → roket uç → yeni idx
  // Ayrıca: bölüm değişiyorsa cinematic overlay'i ROKET UÇMADAN hemen önce başlat
  const goNext = () => {
    // Mevcut cevabı geçmişe kaydet
    const record: AnswerRecord = {
      userAnswer: answered,
      matchResult: matchAnswered,
      wasCorrect,
      wasSkipped,
      usedRetry: retryUsed,
    };
    setHistory(h => ({ ...h, [idx]: record }));

    if (idx + 1 >= questions.length) {
      // Final: bitir
      onFinish({
        totalXp,
        correct,
        bestStreak,
        fastestMs,
        powerUpsUsed,
        retrySuccess: retrySuccessFlag,
      });
      return;
    }
    const nextIdx = idx + 1;
    const nextSection = questions[nextIdx].section;
    const sectionChanging = nextSection !== q.section;

    // Modal kapat
    setModalOpen(false);

    // Bölüm değişiyorsa → cinematic overlay HEMEN
    if (sectionChanging) {
      setSectionOverlay(getSectionMeta(nextSection));
      setTimeout(() => setSectionOverlay(null), 2200);
    }

    // Kısa gecikme → roket hareket başlar
    setTimeout(() => {
      setRocketMoving(true);
      setIdx(nextIdx);
      setAnswered(null);
      setMatchAnswered(null);
      setShowExplanation(false);
      setShowRetry(false);
      setRetryUsed(false);
      // Hareket bittiğinde
      setTimeout(() => {
        setRocketMoving(false);
      }, 1000);
    }, 260);
  };

  const usePower = (p: PowerUpId) => {
    if (answered || matchAnswered !== null) return;
    if (p === 'fifty' && q.type === 'mcq') {
      const wrong = (q as any).options.filter((o: string) => o !== (q as any).correct);
      const shuffled = wrong.sort(() => Math.random() - 0.5);
      setHiddenOptions(shuffled.slice(0, 2));
    } else if (p === 'skip') {
      setAnswered('__skipped__');
      setShowExplanation(true);
    } else if (p === 'double') {
      setDoubleXpActive(true);
    } else {
      return;
    }
    setAvailablePowers(powers => powers.filter(x => x !== p));
    setPowerUpsUsed(u => u + 1);
  };

  const isAnswered = answered !== null || matchAnswered !== null;
  const wasCorrect =
    q.type === 'match' ? matchAnswered === true :
    q.type === 'mcq'   ? answered === (q as any).correct :
    q.type === 'tf'    ? answered === (q as any).correct : false;
  const wasSkipped = answered === '__skipped__';

  const powerEmoji = (p: PowerUpId) => {
    if (p === 'fifty') return '✂️';
    if (p === 'skip') return '⏭️';
    if (p === 'double') return '💎';
    return '🍀';
  };
  const powerLabel = (p: PowerUpId) => {
    if (p === 'fifty') return '50/50';
    if (p === 'skip') return tr().powerSkip;
    if (p === 'double') return '2X XP';
    return tr().powerLucky;
  };

  return (
    <>
      {/* ---------- UZAY ARKA PLANI ---------- */}
      <SpaceBackdrop />

      {/* Karakter mini avatar — sabit sol üst */}
      <CharMini character={character} />

      {/* Bölüm geçiş overlay */}
      {sectionOverlay && <SectionChangeOverlay meta={sectionOverlay} />}

      {/* Global efektler */}
      {xpAnim && (
        <div className="fixed top-24 right-8 font-game font-bold text-2xl neon-green xp-pop pointer-events-none" style={{ zIndex: 300 }}>
          {xpAnim}
        </div>
      )}
      {streakBanner && (
        <StreakBanner
          emoji={streakBanner.emoji}
          text={streakBanner.message}
          bonus={streakBanner.bonusXp}
          color={streakBanner.color}
        />
      )}
      {rankUpDisplay && <RankUpBanner emoji={rankUpDisplay.emoji} name={rankUpDisplay.name} />}
      {burst && <BurstEffect {...burst} />}

      {/* ---------- OYUN TAHTASI ---------- */}
      <div className={`game-board-wrap ${screenShake ? 'screen-shake-trigger' : ''}`}>

        {/* TOP HUD */}
        <div className="game-hud">
          <div className="hud-left">
            <div className="hud-title" style={{ color: character.color }}>
              {character.emoji} {character.className.toUpperCase()}
            </div>
            <div className="hud-sub">
              {tr().stage} {idx + 1} / {questions.length} · {currentSection.emoji} {currentSection.name}
            </div>
            <div className="progress-bar mt-2" style={{ maxWidth: 220 }}>
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="hud-right">
            <span className="rank-pill" style={{
              ['--rank-color' as any]: currentRank.color,
              ['--rank-bg' as any]: `${currentRank.color}15`,
            }}>
              {currentRank.emoji} {currentRank.name}
            </span>
            <div className="hud-xp">
              <div className="hud-xp-num">{totalXp}</div>
              <div className="hud-xp-label">XP</div>
            </div>
            {streak > 0 && (
              <div className="hud-streak">
                🔥 <strong>{streak}</strong>
              </div>
            )}
          </div>
        </div>

        {/* HARİTA — gezegen düğümleri + roket */}
        <div className="game-map">
          <MapPath currentIdx={idx} total={questions.length} />

          {NODE_POSITIONS.map((_, i) => {
            const nodeQ = questions[i];
            const nodeMeta = getSectionMeta(nodeQ.section);
            const status: 'done' | 'current' | 'future' =
              i < idx ? 'done' : i === idx ? 'current' : 'future';
            return (
              <BoardNode
                key={i}
                idx={i}
                status={status}
                sectionMeta={nodeMeta}
                onClick={status === 'future' ? undefined : () => handleNodeAction(i)}
              />
            );
          })}

          <BoardTrophy reached={idx >= questions.length} />

          <BoardRocket idx={idx} character={character} moving={rocketMoving} />
        </div>

        {/* Güç kullanılmadı hatırlatıcı — harita üzerinde küçük rozet
            (Modal kapalıyken görünür, tıklama soruyu açar) */}
        {availablePowers.length > 0 && !modalOpen && reviewIdx === null && (
          <div className="powerbar-reminder" onClick={() => handleNodeAction(idx)}>
            <span className="pr-icon">⚡</span>
            <span className="pr-text">
              {availablePowers.length} {tr().powersReadyMsg}
            </span>
          </div>
        )}
      </div>

      {/* ---------- SORU MODAL ---------- */}
      {modalOpen && (
        <div className="q-modal" role="dialog" aria-modal="true">
          <div className="q-modal-backdrop" />
          <div className={`q-modal-card arena-card ${screenShake ? 'screen-shake-trigger' : ''}`} style={{
            ['--arena-color' as any]: currentSection.color,
            ['--arena-glow' as any]: currentSection.glow,
          }}>
            {/* Gate banner (üstte büyük "BU AŞAMAYI GEÇMEK İÇİN...") */}
            <div className="q-gate" style={{
              borderColor: `${currentSection.color}55`,
              background: currentSection.glow,
            }}>
              <div className="q-gate-icon">🔒</div>
              <div className="q-gate-texts">
                <div className="q-gate-small">
                  {tr().stage} {idx + 1} / {questions.length}
                </div>
                <div className="q-gate-big" style={{ color: currentSection.color }}>
                  {tr().stagePassPrompt}
                </div>
              </div>
            </div>

            {/* Section pill */}
            <div className="text-center mb-3 mt-3">
              <span className="inline-block px-3 py-1 rounded-full font-game text-xs" style={{
                background: currentSection.glow,
                border: `1px solid ${currentSection.color}55`,
                color: currentSection.color,
                letterSpacing: '1.5px',
              }}>
                {currentSection.emoji} {currentSection.name}
              </span>
            </div>

            {/* Type + XP badges */}
            <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
              <span className="xp-badge" style={{
                background: 'rgba(0,207,255,0.08)',
                borderColor: 'rgba(0,207,255,0.3)',
                color: 'var(--info)',
              }}>
                {q.type === 'mcq' ? tr().typeMcq : q.type === 'tf' ? tr().typeTf : tr().typeMatch}
              </span>
              <span className="xp-badge">+{q.xp} XP</span>
              {retryUsed && !answered && (
                <span className="xp-badge" style={{
                  background: 'rgba(255,159,28,0.12)',
                  borderColor: 'rgba(255,159,28,0.4)',
                  color: 'var(--orange)',
                }}>
                  {tr().secondChanceBadge}
                </span>
              )}
              {doubleXpActive && (
                <span className="xp-badge" style={{
                  background: 'rgba(255,230,0,0.14)',
                  borderColor: 'rgba(255,230,0,0.5)',
                  color: 'var(--primary)',
                }}>
                  {tr().doubleXpActive}
                </span>
              )}
            </div>

            {/* Süper güç barı — SORU CEVAPLANMADAN önce kullanılabilir */}
            {availablePowers.length > 0 && !isAnswered && !showRetry && (
              <div className="modal-powerbar">
                <div className="mp-label">{tr().usePower}</div>
                <div className="mp-slots">
                  {availablePowers.map(p => {
                    const disabled = p === 'fifty' && q.type !== 'mcq';
                    return (
                      <button
                        key={p}
                        className="powerup-slot"
                        onClick={() => usePower(p)}
                        disabled={disabled}
                        title={disabled ? tr().powerOnlyMcq : ''}
                      >
                        <span className="pu-emoji">{powerEmoji(p)}</span>
                        <span>{powerLabel(p)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Soru metni */}
            <p className="font-bold text-lg md:text-xl mb-5 text-center" style={{ lineHeight: '1.5' }}>
              {q.text}
            </p>

            {/* Soru UI */}
            {q.type === 'mcq' && (
              <MCQCard q={q as any} onAnswer={handleMCQTF} answered={answered} hiddenOptions={hiddenOptions} />
            )}
            {q.type === 'tf' && (
              <TFCard q={q as any} onAnswer={handleMCQTF} answered={answered} />
            )}
            {q.type === 'match' && (
              <MatchCard pairs={(q as any).pairs} onAnswer={handleMatch} answered={matchAnswered} />
            )}

            {/* Retry bildirimi */}
            {showRetry && (
              <div className="mt-4 p-4 rounded-lg text-center animate-pop"
                style={{
                  background: 'rgba(255,159,28,0.1)',
                  border: '1px solid rgba(255,159,28,0.4)',
                }}>
                <p className="text-sm font-bold mb-1" style={{ color: 'var(--orange)' }}>
                  {tr().retryTitle}
                </p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  {tr().retryDesc}
                </p>
              </div>
            )}

            {/* Açıklama + Sonraki */}
            {(isAnswered && showExplanation) && (
              <div className="mt-4 animate-slide-up">
                <div className="p-4 rounded-lg mb-4"
                  style={{
                    background: wasCorrect
                      ? 'rgba(57,255,20,0.1)'
                      : wasSkipped
                      ? 'rgba(192,132,252,0.1)'
                      : 'rgba(255,159,28,0.1)',
                    border: `1px solid ${
                      wasCorrect
                        ? 'rgba(57,255,20,0.4)'
                        : wasSkipped
                        ? 'rgba(192,132,252,0.4)'
                        : 'rgba(255,159,28,0.4)'
                    }`,
                  }}>
                  <p className="text-sm font-bold mb-1" style={{
                    color: wasCorrect ? 'var(--success)' : wasSkipped ? 'var(--purple)' : 'var(--orange)',
                  }}>
                    {wasCorrect
                      ? (retrySuccessFlag && retryUsed
                          ? tr().feedbackRetryWin
                          : tr().feedbackCorrect.replace('{xp}', String(q.xp)))
                      : wasSkipped
                      ? tr().feedbackSkipped
                      : tr().feedbackWrong
                    }
                  </p>
                  <p className="text-sm" style={{ color: 'var(--muted)', lineHeight: 1.5 }}>
                    {(q as any).explanation}
                  </p>
                </div>
                <button className="btn-primary w-full" onClick={goNext} style={{ fontSize: '16px', padding: '14px' }}>
                  {idx + 1 >= questions.length ? tr().flyToVictory : tr().nextPlanet}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------- REVIEW MODAL — geçmiş soruya dön ---------- */}
      {reviewIdx !== null && history[reviewIdx] && (
        <ReviewModal
          questionIdx={reviewIdx}
          record={history[reviewIdx]}
          onClose={() => setReviewIdx(null)}
        />
      )}
    </>
  );
}

// ════════════════════════ STAGE — SONUÇ ════════════════════════

function ResultStage({
  name, character, stats, saved,
}: {
  name: string;
  character: Character;
  stats: FinalStats;
  saved: boolean;
}) {
  const pct = Math.round((stats.correct / questions.length) * 100);
  const rank = getRank(stats.totalXp);
  const badges = computeBadges({
    pct,
    totalXp: stats.totalXp,
    correct: stats.correct,
    bestStreak: stats.bestStreak,
    fastestMs: stats.fastestMs,
    powerUpsUsed: stats.powerUpsUsed,
    retrySuccess: stats.retrySuccess,
    completed: true,
  });

  const encouragement =
    pct === 100 ? tr().resultPerfect :
    pct >= 80 ? tr().resultGreat :
    pct >= 50 ? tr().resultGood :
    tr().resultStart;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="result-card w-full max-w-2xl animate-pop">
        <div className="rc-head" style={{
          ['--char-color' as any]: character.color,
          background: `linear-gradient(135deg, ${character.color}, ${character.color}aa)`,
        }}>
          <div className="rc-avatar animate-float">{character.emoji}</div>
          <div className="rc-name">{name.toUpperCase()}</div>
          <div className="rc-class">{character.className.toUpperCase()}</div>
          <div className="mt-3 inline-flex items-center gap-2 bg-black bg-opacity-20 rounded-full px-4 py-1">
            <span style={{ fontSize: '18px' }}>{rank.emoji}</span>
            <span className="font-game font-bold text-sm" style={{ letterSpacing: '1px' }}>
              {rank.name.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="p-5 pt-5 text-center">
          <p className="text-sm md:text-base font-bold mb-5" style={{ color: 'var(--text)', lineHeight: 1.5 }}>
            {encouragement}
          </p>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-5">
            <div className="stat-card" style={{ ['--s-color' as any]: 'var(--success)' }}>
              <div className="sc-num">{stats.totalXp}</div>
              <div className="sc-label">XP</div>
            </div>
            <div className="stat-card" style={{ ['--s-color' as any]: 'var(--primary)' }}>
              <div className="sc-num">{stats.correct}/{questions.length}</div>
              <div className="sc-label">{tr().statCorrect}</div>
            </div>
            <div className="stat-card" style={{ ['--s-color' as any]: 'var(--info)' }}>
              <div className="sc-num">%{pct}</div>
              <div className="sc-label">{tr().statSuccess}</div>
            </div>
            <div className="stat-card" style={{ ['--s-color' as any]: '#ff9f1c' }}>
              <div className="sc-num">{stats.bestStreak}</div>
              <div className="sc-label">{tr().statStreak}</div>
            </div>
            <div className="stat-card" style={{ ['--s-color' as any]: '#ff6b9d' }}>
              <div className="sc-num">
                {stats.fastestMs !== null ? `${(stats.fastestMs / 1000).toFixed(1)}s` : '—'}
              </div>
              <div className="sc-label">{tr().statFastest}</div>
            </div>
          </div>

          {badges.length > 0 && (
            <div className="mb-5">
              <p className="font-game text-xs mb-3" style={{ color: 'var(--muted)', letterSpacing: '1.5px' }}>
                {tr().badgesEarned} ({badges.length})
              </p>
              <div className="badge-grid">
                {badges.map((b, i) => (
                  <div key={b.id} className="badge-chip"
                    style={{
                      ['--b-color' as any]: b.color,
                      animationDelay: `${i * 0.08}s`,
                    }}>
                    <div className="bc-emoji">{b.emoji}</div>
                    <div className="bc-name">{b.name}</div>
                    <div className="bc-desc">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs mb-4" style={{ color: saved ? 'var(--success)' : 'var(--muted)' }}>
            {saved ? tr().scoreSaved : tr().scoreSaving}
          </p>

          <div className="space-y-3">
            <Link href="/liderboard" className="block">
              <button className="btn-primary w-full" style={{ fontSize: '16px', padding: '14px' }}>
                {tr().seeLeaderboard}
              </button>
            </Link>
            <Link href="/" className="block">
              <button className="btn-outline w-full">{tr().backToHome}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════ ANA QUIZ SAYFASI ════════════════════════

function QuizApp() {
  // ?lang'a göre dili ve veri binding'lerini set et (render başında, çocuklardan önce)
  const params = useSearchParams();
  ACTIVE_LANG = normalizeLang(params.get('lang'));
  questions = getQuestions(ACTIVE_LANG);
  CHARACTERS = getCharacters(ACTIVE_LANG);
  TOTAL_XP = getTotalXp(ACTIVE_LANG);

  const [stage, setStage] = useState<Stage>('name');
  const [playerName, setPlayerName] = useState('');
  const [characterId, setCharacterId] = useState<CharacterId | null>(null);
  const [finalStats, setFinalStats] = useState<FinalStats | null>(null);
  const [saved, setSaved] = useState(false);

  // V2 teması — body sınıfı ile scoped CSS aktifleştirilir
  useEffect(() => {
    document.body.classList.add('theme-v2');
    return () => { document.body.classList.remove('theme-v2'); };
  }, []);

  const character = characterId ? CHARACTERS.find(c => c.id === characterId)! : null;

  const handleFinish = async (stats: FinalStats) => {
    setFinalStats(stats);
    setStage('result');
    try {
      await saveQuizResult({
        player_name: playerName,
        presentation_version: 'v2',
        score: Math.round((stats.correct / questions.length) * 100),
        total_xp: stats.totalXp,
        correct_count: stats.correct,
        total_questions: questions.length,
      });
      setSaved(true);
    } catch { /* sessizce geç */ }
  };

  if (stage === 'name') {
    return <NameStage onNext={(name) => { setPlayerName(name); setStage('character'); }} />;
  }
  if (stage === 'character') {
    return (
      <CharacterStage
        name={playerName}
        onSelect={(id) => { setCharacterId(id); setStage('ready'); }}
        onBack={() => setStage('name')}
      />
    );
  }
  if (stage === 'ready' && character) {
    return (
      <ReadyStage
        name={playerName}
        character={character}
        onGo={() => setStage('playing')}
      />
    );
  }
  if (stage === 'playing' && character) {
    return <PlayingStage character={character} onFinish={handleFinish} />;
  }
  if (stage === 'result' && character && finalStats) {
    return <ResultStage name={playerName} character={character} stats={finalStats} saved={saved} />;
  }
  return null;
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <QuizApp />
    </Suspense>
  );
}
