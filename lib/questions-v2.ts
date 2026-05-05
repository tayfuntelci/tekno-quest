// ============================================================
// Teknoloji Quest — Quiz Soruları
// 9-10 yaş için sade, somut, eğlenceli sorular
// 5 bölüm, 15 soru — sunumdaki içerikle uyumlu (LV1-LV9)
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
    text: 'Aşağıdakilerden hangisi internet OLMADAN çalışmaz?',
    options: ['Kalem ile yazmak', 'Kitap okumak', 'YouTube video izlemek', 'Top oynamak'],
    correct: 'YouTube video izlemek',
    explanation: '🌐 YouTube videoları internet üzerinden gelir. İnternet yoksa video açılmaz!',
    xp: 10,
  },
  {
    id: 2, type: 'mcq',
    section: '🌐 İnternet Temelleri',
    text: 'Bilgisayarda web sitesi açmak için kullandığın programa ne denir?',
    options: ['Hesap makinesi', 'Tarayıcı (Chrome, Safari)', 'Müzik çalar', 'Çizim programı'],
    correct: 'Tarayıcı (Chrome, Safari)',
    explanation: '🌐 Tarayıcı internete girip siteleri gösteren programdır — Chrome, Safari, Edge gibi.',
    xp: 10,
  },
  {
    id: 3, type: 'mcq',
    section: '🌐 İnternet Temelleri',
    text: 'İnternette bir bilgi aramak için aşağıdakilerden hangisini kullanırsın?',
    options: ['WhatsApp', 'Google', 'Spotify', 'Instagram'],
    correct: 'Google',
    explanation: '🔍 Google bir arama motorudur — istediğin bilgiyi milyonlarca site arasında saniyeler içinde bulur!',
    xp: 10,
  },

  // ─────────────────────────────────────────────
  // BÖLÜM 2 — TÜRKİYE TURU
  // ─────────────────────────────────────────────
  {
    id: 4, type: 'mcq',
    section: '🇹🇷 Türkiye Turu',
    text: 'Türkiye\'ye internet ilk geldiğinde önce nereye bağlandı?',
    options: ['Evlere', 'Üniversiteye', 'Okullara', 'Hastanelere'],
    correct: 'Üniversiteye',
    explanation: '🏫 Türkiye 1993\'te önce ODTÜ adında bir üniversite ile internete bağlandı. Evlere ise 3 yıl sonra geldi!',
    xp: 10,
  },
  {
    id: 5, type: 'tf',
    section: '🇹🇷 Türkiye Turu',
    text: 'Türkiye\'de internet önce evlere geldi, sonra üniversitelere.',
    correct: 'false',
    explanation: '❌ Tam tersi! Önce üniversiteler (1993), sonra evler (1996) internete kavuştu.',
    xp: 10,
  },
  {
    id: 6, type: 'mcq',
    section: '🇹🇷 Türkiye Turu',
    text: 'İnternet üzerinden gönderilen "elektronik mektup"a ne denir?',
    options: ['SMS', 'E-posta', 'Tweet', 'Sesli mesaj'],
    correct: 'E-posta',
    explanation: '💌 E-posta = "Elektronik Posta". İnternet üzerinden anında karşı tarafa ulaşan mektuptur.',
    xp: 10,
  },

  // ─────────────────────────────────────────────
  // BÖLÜM 3 — HIZ MACERASI
  // ─────────────────────────────────────────────
  {
    id: 7, type: 'mcq',
    section: '⚡ Hız Macerası',
    text: '5G internet, 4G\'den nasıldır?',
    options: ['Aynıdır', 'Biraz daha yavaştır', 'Çok daha hızlıdır', 'Sadece sesli arama yapılır'],
    correct: 'Çok daha hızlıdır',
    explanation: '⚡ 5G, 4G\'den onlarca kat daha hızlıdır! 3 saatlik film 5G ile birkaç saniyede iner.',
    xp: 12,
  },
  {
    id: 8, type: 'tf',
    section: '⚡ Hız Macerası',
    text: 'Telefon nesilleri ilerledikçe (1G → 5G) internet hızı artar.',
    correct: 'true',
    explanation: '✅ Doğru! Her yeni nesil daha hızlıdır. 1G\'de internet yoktu, 5G ise çok hızlı!',
    xp: 10,
  },
  {
    id: 9, type: 'match',
    section: '⚡ Hız Macerası',
    text: 'Teknoloji kavramlarını anlamlarıyla eşleştir!',
    pairs: [
      { left: 'WiFi', right: 'Kablosuz internet' },
      { left: '5G', right: 'Çok hızlı mobil internet' },
      { left: 'E-posta', right: 'İnternet mektubu' },
      { left: 'Şifre', right: 'Hesabını korur' },
    ],
    explanation: '🎯 Teknoloji kavramlarını harika biliyorsun!',
    xp: 15,
  },

  // ─────────────────────────────────────────────
  // BÖLÜM 4 — YAPAY ZEKA
  // ─────────────────────────────────────────────
  {
    id: 10, type: 'mcq',
    section: '🤖 Yapay Zeka',
    text: 'Yapay zeka nasıl öğrenir?',
    options: ['Uyuyarak', 'Birçok bilgi ve resmi inceleyerek', 'Spor yaparak', 'Rastgele tahmin ederek'],
    correct: 'Birçok bilgi ve resmi inceleyerek',
    explanation: '🧠 YZ\'ye binlerce kedi resmi gösterirsen "kedi"yi öğrenir. Tıpkı senin okula gider gibi!',
    xp: 10,
  },
  {
    id: 11, type: 'tf',
    section: '🤖 Yapay Zeka',
    text: 'Yapay zeka sadece bilgisayarlarda çalışır, telefonda çalışamaz.',
    correct: 'false',
    explanation: '❌ Yanlış! Siri, Google Asistan ve yüz tanıma gibi yapay zekalar telefonlarda da çalışıyor!',
    xp: 10,
  },
  {
    id: 12, type: 'mcq',
    section: '🤖 Yapay Zeka',
    text: 'Hangisi bir yapay zeka aracı DEĞİLDİR?',
    options: ['ChatGPT', 'Midjourney', 'Bisiklet 🚲', 'Google Asistan'],
    correct: 'Bisiklet 🚲',
    explanation: '🚲 Bisiklet bir taşıt! ChatGPT, Midjourney ve Google Asistan ise yapay zeka araçlarıdır.',
    xp: 10,
  },

  // ─────────────────────────────────────────────
  // BÖLÜM 5 — AKILLI KULLANIM
  // ─────────────────────────────────────────────
  {
    id: 13, type: 'mcq',
    section: '🧭 Akıllı Kullanım',
    text: '9-10 yaş için günde EN FAZLA kaç saat eğlence ekranı önerilir?',
    options: ['30 dakika', '2 saat', '5 saat', 'Sınır yok'],
    correct: '2 saat',
    explanation: '⏰ Sağlık uzmanları 9-10 yaş için günde en fazla 2 saat eğlence ekranı öneriyor (ödev hariç)!',
    xp: 10,
  },
  {
    id: 14, type: 'tf',
    section: '🧭 Akıllı Kullanım',
    text: 'İnternette tanımadığın biriyle ev adresini paylaşabilirsin.',
    correct: 'false',
    explanation: '🛡️ KESİNLİKLE HAYIR! Tam adını, adresini, okulunu, telefonunu ASLA paylaşma!',
    xp: 12,
  },
  {
    id: 15, type: 'match',
    section: '🧭 Akıllı Kullanım',
    text: 'Teknoloji aletlerini görevleriyle eşleştir!',
    pairs: [
      { left: 'GPS', right: 'Yol tarif eder' },
      { left: 'Şarj aleti', right: 'Telefonu doldurur' },
      { left: 'Tarayıcı', right: 'Web sitesi açar' },
      { left: 'Antivirüs', right: 'Bilgisayarı korur' },
    ],
    explanation: '🎯 Teknolojinin nasıl çalıştığını harika biliyorsun!',
    xp: 15,
  },
];

// Toplam temel XP (bonuslar hariç): 10+10+10 + 10+10+10 + 12+10+15 + 10+10+10 + 10+12+15 = 164
export const TOTAL_XP = questions.reduce((s, q) => s + q.xp, 0);

// Bölüm başlıkları sıralı liste
export const SECTIONS = [
  '🌐 İnternet Temelleri',
  '🇹🇷 Türkiye Turu',
  '⚡ Hız Macerası',
  '🤖 Yapay Zeka',
  '🧭 Akıllı Kullanım',
];
