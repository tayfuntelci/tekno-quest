// ============================================================
// Teknoloji Quest — Karakter, Rank, Rozet, Streak tanımları
// 9-10 yaş için pozitif dil, oyunlaştırma
// ============================================================

// ───────── KARAKTERLER (Sınıflar) ─────────
export type CharacterId = 'aylin' | 'kerem' | 'selin' | 'emir';
export type PowerUpId = 'fifty' | 'skip' | 'double' | 'lucky-start';

export interface Character {
  id: CharacterId;
  emoji: string;
  className: string;         // "Bilge Baykuş" vs
  color: string;             // renk kodu
  glow: string;              // glow rengi
  bio: string;               // kısa tanıtım
  power: PowerUpId;          // başlangıç gücü
  powerLabel: string;        // "İki Seçenek Sil" vs
  powerDesc: string;         // güç açıklaması
  powerEmoji: string;
}

export const CHARACTERS: Character[] = [
  {
    id: 'aylin',
    emoji: '🦉',
    className: 'Bilge Baykuş',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.35)',
    bio: 'Gecenin zekâsıyla dikkatli bakar. Zor bir soruda iki yanlış seçeneği eleyip gerçeği aydınlatır.',
    power: 'fifty',
    powerLabel: '50/50',
    powerDesc: 'Bir soruda 2 yanlış seçeneği siler — cevap 2\'ye düşer!',
    powerEmoji: '✂️',
  },
  {
    id: 'kerem',
    emoji: '🐿️',
    className: 'Hızlı Sincap',
    color: '#16a34a',
    glow: 'rgba(22,163,74,0.35)',
    bio: 'Daldan dala sıçrar. Zor bir cevizi atlayıp bir sonraki soruya hızla koşar.',
    power: 'skip',
    powerLabel: 'Atla',
    powerDesc: 'Bir soruyu atla — XP kazanmazsın ama serin (streak) bozulmaz!',
    powerEmoji: '⏭️',
  },
  {
    id: 'selin',
    emoji: '🐝',
    className: 'Çalışkan Arı',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.4)',
    bio: 'Doğru çiçeği buldukça ödülü ikiye katlar. Detay kaçırmaz, çalışkandır.',
    power: 'double',
    powerLabel: 'Çifte Bal',
    powerDesc: 'Bir soruyu seçersin, doğru cevap verirsen XP iki kat olur!',
    powerEmoji: '🍯',
  },
  {
    id: 'emir',
    emoji: '🦊',
    className: 'Şanslı Tilki',
    color: '#ea580c',
    glow: 'rgba(234,88,12,0.38)',
    bio: 'Kurnaz ve şanslı. Yarışa bir adım önde başlar, fırsatları görür.',
    power: 'lucky-start',
    powerLabel: 'Şanslı Başlangıç',
    powerDesc: 'Oyuna 20 bonus XP ile başlarsın — rakiplerden bir adım önde!',
    powerEmoji: '🍀',
  },
];

export const getCharacter = (id: CharacterId): Character =>
  CHARACTERS.find(c => c.id === id)!;

// ───────── RANK (Seviye) ─────────
export interface Rank {
  min: number;
  max: number;
  name: string;
  emoji: string;
  color: string;
}

export const RANKS: Rank[] = [
  { min: 0,   max: 40,  name: 'Acemi Kaşif',        emoji: '🌱', color: '#c084fc' },
  { min: 40,  max: 90,  name: 'Teknoloji Çırağı',   emoji: '🚀', color: '#00cfff' },
  { min: 90,  max: 140, name: 'Dijital Usta',       emoji: '⚡', color: '#39ff14' },
  { min: 140, max: 190, name: 'Siber Kahraman',     emoji: '🛡️', color: '#ff9f1c' },
  { min: 190, max: 9999,name: 'Teknoloji Efsanesi', emoji: '🏆', color: '#ffe600' },
];

export const getRank = (xp: number): Rank => {
  for (const r of RANKS) if (xp >= r.min && xp < r.max) return r;
  return RANKS[RANKS.length - 1];
};

// ───────── STREAK (Seri) ─────────
export interface StreakInfo {
  count: number;
  message: string;
  bonusXp: number;
  color: string;
  emoji: string;
}

// Doğru cevap arka arkaya geldikçe tetiklenen mesajlar
export function getStreakInfo(count: number): StreakInfo | null {
  if (count === 2) return {
    count, message: 'Süpersin!', bonusXp: 5,
    color: '#00cfff', emoji: '✨',
  };
  if (count === 3) return {
    count, message: 'Muhteşem Seri!', bonusXp: 10,
    color: '#39ff14', emoji: '🌟',
  };
  if (count === 5) return {
    count, message: 'Efsane Oluyorsun!', bonusXp: 25,
    color: '#ff9f1c', emoji: '🏆',
  };
  if (count === 10) return {
    count, message: 'Mükemmel Seri!!!', bonusXp: 50,
    color: '#ffe600', emoji: '👑',
  };
  return null;
}

// ───────── ROZETLER (Başarı Rozetleri) ─────────
export interface BadgeDef {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  color: string;
}

export const BADGE_DEFS: Record<string, BadgeDef> = {
  perfect:      { id: 'perfect',      emoji: '🏆', name: 'Mükemmel',       desc: 'Tüm soruları doğru yaptın',           color: '#ffe600' },
  harika:       { id: 'harika',       emoji: '⭐', name: 'Harika',         desc: '%80 veya daha fazla doğru',           color: '#ff9f1c' },
  uzman:        { id: 'uzman',        emoji: '💎', name: 'Uzman',          desc: '170 XP ve üzeri kazandın',            color: '#00cfff' },
  hedef:        { id: 'hedef',        emoji: '🎯', name: 'Keskin Nişancı', desc: '10 soru veya fazlasını doğru yaptın', color: '#39ff14' },
  muhtesem:     { id: 'muhtesem',     emoji: '✨', name: 'Süper Seri',     desc: '3\'lü seri yaptın',                    color: '#00cfff' },
  efsane:       { id: 'efsane',       emoji: '🌟', name: 'Efsane',         desc: '5\'li seri yaptın',                    color: '#ff9f1c' },
  akilli:       { id: 'akilli',       emoji: '🦉', name: 'Akıllı Kaşif',   desc: 'Hiç güç kullanmadan bitirdin',        color: '#A855F7' },
  kahraman:     { id: 'kahraman',     emoji: '💪', name: 'Pes Etmeyen',    desc: '2. denemede doğru yaptın',            color: '#ff6b35' },
  hizli:        { id: 'hizli',        emoji: '⚡', name: 'Şimşek Hız',     desc: '5 saniyeden az sürede cevapladın',    color: '#ffe600' },
  kalpli:       { id: 'kalpli',       emoji: '💖', name: 'Gerçek Kahraman',desc: 'Quiz\'i tamamladın',                   color: '#ff6b9d' },
};

export interface BadgeEarnedInput {
  pct: number;              // doğru yüzdesi
  totalXp: number;          // toplam XP
  correct: number;          // doğru sayısı
  bestStreak: number;
  fastestMs: number | null;
  powerUpsUsed: number;
  retrySuccess: boolean;    // 2. denemede doğru mu yaptı
  completed: boolean;
}

export function computeBadges(s: BadgeEarnedInput): BadgeDef[] {
  const badges: BadgeDef[] = [];
  if (s.completed) badges.push(BADGE_DEFS.kalpli);
  if (s.pct === 100) badges.push(BADGE_DEFS.perfect);
  if (s.pct >= 80) badges.push(BADGE_DEFS.harika);
  if (s.totalXp >= 170) badges.push(BADGE_DEFS.uzman);
  if (s.correct >= 10) badges.push(BADGE_DEFS.hedef);
  if (s.bestStreak >= 3) badges.push(BADGE_DEFS.muhtesem);
  if (s.bestStreak >= 5) badges.push(BADGE_DEFS.efsane);
  if (s.powerUpsUsed === 0 && s.correct >= 8) badges.push(BADGE_DEFS.akilli);
  if (s.retrySuccess) badges.push(BADGE_DEFS.kahraman);
  if (s.fastestMs !== null && s.fastestMs < 5000) badges.push(BADGE_DEFS.hizli);
  // Tekrar eden ID'leri uniquify et
  return Array.from(new Map(badges.map(b => [b.id, b])).values());
}

// ───────── HIZ BONUSU ─────────
export function getSpeedBonus(ms: number): { xp: number; label: string | null } {
  if (ms < 3000) return { xp: 5, label: '⚡ HIZLI' };
  if (ms < 6000) return { xp: 3, label: '🏁 İYİ ZAMAN' };
  return { xp: 0, label: null };
}
