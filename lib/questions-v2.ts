// ============================================================
// Teknoloji Quest — Quiz Soruları
// 9-10 yaş için hazırlanmış, 5 bölüm, 15 soru, 205 temel XP
// Sunumdaki içerikle uyumlu (LV1-LV9)
// ============================================================

export type QuestionType = 'mcq' | 'tf' | 'match';

export interface MCQQuestion {
  id: number;
  type: 'mcq';
  section: string;      // bölüm başlığı (HUD'da gösterilir)
  text: string;
  options: string[];
  correct: string;
  explanation: string;
  xp: number;
}
export interface TFQuestion {
  id: number;
  type: 'tf';
  section: string;
  text: string;
  correct: 'true' | 'false';
  explanation: string;
  xp: number;
}
export interface MatchPair { left: string; right: string; }
export interface MatchQuestion {
  id: number;
  type: 'match';
  section: string;
  text: string;
  pairs: MatchPair[];
  explanation: string;
  xp: number;
}
export type Question = MCQQuestion | TFQuestion | MatchQuestion;

export const questions: Question[] = [
  // ─────────────────────────────────────────────
  // BÖLÜM 1 — İNTERNET TEMELLERİ
  // ─────────────────────────────────────────────
  {
    id: 1, type: 'mcq',
    section: '🌐 İnternet Temelleri',
    text: 'İnternet ilk olarak hangi yılda icat edildi?',
    options: ['1969', '1985', '1993', '2000'],
    correct: '1969',
    explanation: '🎉 ARPANET 1969\'da sadece 4 bilgisayar arasında kuruldu — internetin doğum yılı!',
    xp: 10,
  },
  {
    id: 2, type: 'mcq',
    section: '🌐 İnternet Temelleri',
    text: 'WWW\'yi (Web\'i) icat eden bilim insanı kimdir?',
    options: ['Bill Gates', 'Tim Berners-Lee', 'Elon Musk', 'Mark Zuckerberg'],
    correct: 'Tim Berners-Lee',
    explanation: '👨‍💻 Tim Berners-Lee 1991\'de Web\'i icat ederek interneti herkese açtı!',
    xp: 12,
  },
  {
    id: 3, type: 'mcq',
    section: '🌐 İnternet Temelleri',
    text: '1 saniyede dünyada yaklaşık kaç Google araması yapılır?',
    options: ['100', '1.000', '100.000', '1 milyar'],
    correct: '100.000',
    explanation: '🔍 Her saniye 100.000 Google araması yapılıyor — bir gün içinde 5 milyardan fazla!',
    xp: 12,
  },

  // ─────────────────────────────────────────────
  // BÖLÜM 2 — TÜRKİYE TURU
  // ─────────────────────────────────────────────
  {
    id: 4, type: 'mcq',
    section: '🇹🇷 Türkiye Turu',
    text: 'Türkiye internete ilk olarak hangi üniversite üzerinden bağlandı?',
    options: ['Boğaziçi Üniversitesi', 'İTÜ', 'ODTÜ', 'Hacettepe Üniversitesi'],
    correct: 'ODTÜ',
    explanation: '🏫 Türkiye 1993\'te Ankara\'daki ODTÜ aracılığıyla internete bağlandı!',
    xp: 10,
  },
  {
    id: 5, type: 'tf',
    section: '🇹🇷 Türkiye Turu',
    text: 'Türkiye\'de internet önce evlere, sonra üniversitelere geldi.',
    correct: 'false',
    explanation: '❌ Tam tersi! İlk önce üniversiteler (1993), sonra evler (1996) internete kavuştu.',
    xp: 10,
  },
  {
    id: 6, type: 'mcq',
    section: '🇹🇷 Türkiye Turu',
    text: 'Türkiye\'den ilk e-postayı kim attı? (İnternetin Dedesi olarak anılır)',
    options: ['Mustafa Akgül', 'Aziz Sancar', 'Selçuk Bayraktar', 'Cahit Arf'],
    correct: 'Mustafa Akgül',
    explanation: '💌 Mustafa Akgül ODTÜ\'den Türkiye\'nin ilk e-postasını attı — "İnternetin Dedesi"!',
    xp: 15,
  },

  // ─────────────────────────────────────────────
  // BÖLÜM 3 — HIZ MACERASI
  // ─────────────────────────────────────────────
  {
    id: 7, type: 'mcq',
    section: '⚡ Hız Macerası',
    text: '5G ile 3 saatlik bir film yaklaşık kaç saniyede iner?',
    options: ['25 dakika', '5 dakika', '30 saniye', '3-4 saniye'],
    correct: '3-4 saniye',
    explanation: '⚡ 5G saniyede 10 Gb hıza ulaşır — 3 saatlik film 3-4 saniyede iner!',
    xp: 15,
  },
  {
    id: 8, type: 'tf',
    section: '⚡ Hız Macerası',
    text: '1G ile sadece sesli arama yapılabilirdi, internet yoktu.',
    correct: 'true',
    explanation: '✅ Doğru! 1G sadece sesli aramayı destekliyordu. İnternet 2G ile geldi.',
    xp: 10,
  },
  {
    id: 9, type: 'match',
    section: '⚡ Hız Macerası',
    text: 'Yılları doğru olaylarla eşleştir!',
    pairs: [
      { left: '1969', right: 'ARPANET başladı' },
      { left: '1991', right: 'WWW icat edildi' },
      { left: '1993', right: 'Türkiye internete bağlandı' },
      { left: '1996', right: 'Evlere internet geldi' },
    ],
    explanation: '🎯 Teknoloji tarihini tam olarak biliyorsun!',
    xp: 20,
  },

  // ─────────────────────────────────────────────
  // BÖLÜM 4 — YAPAY ZEKA
  // ─────────────────────────────────────────────
  {
    id: 10, type: 'mcq',
    section: '🤖 Yapay Zeka',
    text: 'Yapay zeka nasıl "öğrenir"?',
    options: ['Uyuyarak', 'Veri analiz ederek', 'Spor yaparak', 'Rastgele tahmin ederek'],
    correct: 'Veri analiz ederek',
    explanation: '🧠 Yapay zeka milyonlarca veriyi analiz ederek öğrenir — tıpkı sen ders çalışır gibi!',
    xp: 12,
  },
  {
    id: 11, type: 'tf',
    section: '🤖 Yapay Zeka',
    text: 'Yapay zeka sadece bilgisayarlarda çalışır, telefonda çalışamaz.',
    correct: 'false',
    explanation: '❌ Yanlış! Siri, Google Asistan ve yüz tanıma gibi yapay zekalar telefonlarda çalışıyor!',
    xp: 10,
  },
  {
    id: 12, type: 'mcq',
    section: '🤖 Yapay Zeka',
    text: 'Hangisi bir yapay zeka aracı DEĞİLDİR?',
    options: ['ChatGPT', 'Midjourney', 'Suno', 'Bisiklet 🚲'],
    correct: 'Bisiklet 🚲',
    explanation: '🚲 Bisiklet bir ulaşım aracı! ChatGPT, Midjourney ve Suno ise yapay zeka araçlarıdır.',
    xp: 10,
  },

  // ─────────────────────────────────────────────
  // BÖLÜM 5 — AKILLI KULLANIM
  // ─────────────────────────────────────────────
  {
    id: 13, type: 'mcq',
    section: '🧭 Akıllı Kullanım',
    text: '9-10 yaş için önerilen günlük MAKSİMUM eğlence ekran süresi kaçtır?',
    options: ['30 dakika', '2 saat', '5 saat', 'Sınır yok'],
    correct: '2 saat',
    explanation: '⏰ Sağlık uzmanları 9-10 yaş için günde max 2 saat eğlence ekranı öneriyor (ödev hariç)!',
    xp: 12,
  },
  {
    id: 14, type: 'tf',
    section: '🧭 Akıllı Kullanım',
    text: 'İnternette tanımadığın biriyle ev adresini paylaşabilirsin.',
    correct: 'false',
    explanation: '🛡️ KESİNLİKLE HAYIR! Tam adını, adresini, okulunu, telefonunu ASLA paylaşma!',
    xp: 15,
  },
  {
    id: 15, type: 'match',
    section: '🧭 Akıllı Kullanım',
    text: 'Mesleği ile günlük görevini eşleştir!',
    pairs: [
      { left: 'YZ Mühendisi', right: 'Modellere veri öğretir' },
      { left: 'Gen Mühendisi', right: 'DNA\'yı inceler' },
      { left: 'Uzay Mühendisi', right: 'Roket tasarlar' },
      { left: 'Siber Kahraman', right: 'Dijital tehlikeleri engeller' },
    ],
    explanation: '🎯 Geleceğin meslekleri konusunda uzmansın!',
    xp: 22,
  },
];

// Toplam temel XP (bonuslar hariç): 10+12+12 + 10+10+15 + 15+10+20 + 12+10+10 + 12+15+22 = 195
export const TOTAL_XP = questions.reduce((s, q) => s + q.xp, 0);

// Bölüm başlıkları sıralı liste
export const SECTIONS = [
  '🌐 İnternet Temelleri',
  '🇹🇷 Türkiye Turu',
  '⚡ Hız Macerası',
  '🤖 Yapay Zeka',
  '🧭 Akıllı Kullanım',
];
