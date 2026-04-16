export type QuestionType = 'mcq' | 'tf' | 'match';

export interface MCQQuestion {
  id: number; type: 'mcq';
  text: string; options: string[]; correct: string;
  explanation: string; xp: number;
}
export interface TFQuestion {
  id: number; type: 'tf';
  text: string; correct: 'true' | 'false';
  explanation: string; xp: number;
}
export interface MatchPair { left: string; right: string; }
export interface MatchQuestion {
  id: number; type: 'match';
  text: string; pairs: MatchPair[];
  explanation: string; xp: number;
}
export type Question = MCQQuestion | TFQuestion | MatchQuestion;

export const questions: Question[] = [
  {
    id: 1, type: 'mcq',
    text: 'İnternet ilk olarak hangi yılda icat edildi?',
    options: ['1969', '1985', '1993', '2000'],
    correct: '1969',
    explanation: '🎉 ARPANET 1969\'da sadece 4 bilgisayar arasında kuruldu!',
    xp: 10,
  },
  {
    id: 2, type: 'mcq',
    text: 'Türkiye internete ilk olarak hangi üniversite üzerinden bağlandı?',
    options: ['Boğaziçi Üniversitesi', 'İTÜ', 'ODTÜ', 'Hacettepe Üniversitesi'],
    correct: 'ODTÜ',
    explanation: '🏫 Türkiye 1993\'te ODTÜ (Ankara) aracılığıyla internete bağlandı!',
    xp: 10,
  },
  {
    id: 3, type: 'mcq',
    text: 'WWW\'yi (World Wide Web) kim icat etti?',
    options: ['Bill Gates', 'Tim Berners-Lee', 'Elon Musk', 'Mark Zuckerberg'],
    correct: 'Tim Berners-Lee',
    explanation: '👨‍💻 Tim Berners-Lee 1991\'de Web\'i icat ederek interneti herkese açtı!',
    xp: 15,
  },
  {
    id: 4, type: 'mcq',
    text: '5G ile 3 saatlik bir film yaklaşık kaç saniyede indirilir?',
    options: ['25 dakika', '5 dakika', '30 saniye', '3-4 saniye'],
    correct: '3-4 saniye',
    explanation: '⚡ 5G yaklaşık 10 Gb/s hıza ulaşabilir — 3 saatlik film 3-4 saniyede iner!',
    xp: 15,
  },
  {
    id: 5, type: 'mcq',
    text: 'Yapay zeka nasıl "öğrenir"?',
    options: ['Uyuyarak', 'Veri analiz ederek', 'Okula giderek', 'Rastgele tahmin ederek'],
    correct: 'Veri analiz ederek',
    explanation: '🧠 Yapay zeka milyonlarca veriyi analiz ederek örüntüleri öğrenir!',
    xp: 10,
  },
  {
    id: 6, type: 'tf',
    text: 'Türkiye\'de internet ilk önce evlere, sonra üniversitelere geldi.',
    correct: 'false',
    explanation: '❌ Yanlış! Önce üniversiteler (1993), sonra evler (1996) bağlandı.',
    xp: 10,
  },
  {
    id: 7, type: 'tf',
    text: '1G ile sesli arama yapılabilirdi ama internet yoktu.',
    correct: 'true',
    explanation: '✅ Doğru! 1G sadece sesli aramayı destekliyordu. İnternet 2G ile geldi.',
    xp: 10,
  },
  {
    id: 8, type: 'tf',
    text: 'Yapay zeka sadece bilgisayarlarda çalışır, akıllı telefonlarda çalışamaz.',
    correct: 'false',
    explanation: '❌ Yanlış! Siri, Google Asistan gibi yapay zekalar zaten telefonlarda çalışıyor!',
    xp: 10,
  },
  {
    id: 9, type: 'match',
    text: 'Yılları doğru olaylarla eşleştir!',
    pairs: [
      { left: '1969', right: 'ARPANET kuruldu' },
      { left: '1991', right: 'WWW icat edildi' },
      { left: '1993', right: 'Türkiye internete bağlandı' },
      { left: '1996', right: 'Evlere internet geldi' },
    ],
    explanation: '🎯 Teknoloji tarihini hatırladın!',
    xp: 20,
  },
  {
    id: 10, type: 'mcq',
    text: 'Hangisi bir yapay zeka asistanı DEĞİLDİR?',
    options: ['Siri', 'Alexa', 'Google Asistan', 'Bisiklet'],
    correct: 'Bisiklet',
    explanation: '🚲 Bisiklet bir ulaşım aracıdır! Siri, Alexa ve Google Asistan gerçek YZ asistanlarıdır.',
    xp: 10,
  },
];

export const TOTAL_XP = questions.reduce((s, q) => s + q.xp, 0); // 110
