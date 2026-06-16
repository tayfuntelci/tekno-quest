// ============================================================
// Teknoloji Quest — Çoklu Dil (i18n) Altyapısı
// Diller: tr (Türkçe), en (English), zh (简体中文)
// ============================================================

export type Lang = 'tr' | 'en' | 'zh';
export const LANGS: Lang[] = ['tr', 'en', 'zh'];

export const LANG_META: Record<Lang, { label: string; native: string; flag: string }> = {
  tr: { label: 'Türkçe', native: 'Türkçe', flag: '🇹🇷' },
  en: { label: 'English', native: 'English', flag: '🇬🇧' },
  zh: { label: 'Chinese', native: '中文', flag: '🇨🇳' },
};

// URL ?lang= değerini güvenli Lang'e çevir
export function normalizeLang(v: string | null | undefined): Lang {
  if (v === 'en' || v === 'zh' || v === 'tr') return v;
  return 'tr';
}

// Sunum HTML dosya yolu (public/ altında)
export function sunumFile(lang: Lang): string {
  if (lang === 'en') return '/sunum-v2-en.html';
  if (lang === 'zh') return '/sunum-v2-zh.html';
  return '/sunum-v2.html';
}

// ─────────────────────────────────────────────
// ARAYÜZ METİNLERİ (Homepage + Sunum topbar + Quiz)
// ─────────────────────────────────────────────
export interface UIStrings {
  // Homepage
  homeSubtitle: string;
  sectionLabel: string;
  cardBadge: string;
  cardDesc: string;
  btnPresentation: string;
  btnQuiz: string;
  howToTitle: string;
  howToDesc: string;
  langPickTitle: string;
  leaderboard: string;
  leaderboardAll: string;
  leaderEmpty1: string;
  leaderEmpty2: string;
  correctWord: string; // "doğru" / "correct" / "正确"
  liveUpdating: string;

  // Sunum topbar
  back: string;
  goToQuiz: string;
  sunumTitle: string;

  // Quiz — giriş
  quizNamePlaceholder: string;
  quizQuestionsCount: string; // "15 soru"
  quizHeroes: string;         // "4 kahraman"
  quizSections: string;       // "5 Bölüm"
  quizYourPower: string;      // "SÜPER GÜCÜN:"
  quizComboHint: string;
  quizSpeedHint: string;
  quizSpeedBonus: string;     // "Hız bonusu"
  quizRetryHint: string;
  quizSecondChance: string;   // "2. şans"
  quizStartBtn: string;       // "MACERAYA BAŞLA" benzeri

  // Quiz — oynanış
  correctLabel: string;       // "DOĞRU"
  wrongLabel: string;         // "YANLIŞ"
  yourAnswer: string;         // "senin cevabın"
  correctAnswer: string;      // "doğru cevap"
  correctTick: string;        // "✓ doğru"
  matchTarget: string;        // "EŞLEŞTİR"
  matchDrag: string;          // "SÜRÜKLE"
  matchDropHint: string;      // "↘ buraya sürükle"
  matchDropHere: string;      // "BURAYA BIRAK"
  matchAllCorrect: string;
  matchNotAll: string;
  newSectionUnlocked: string; // "YENİ BÖLÜM AÇILDI"
  readyQuestion: string;      // "Hazır mısın?"
  newLevel: string;           // "YENİ SEVİYE!"
  stagePassPrompt: string;    // "BU AŞAMAYI GEÇMEK İÇİN..."
  usePower: string;           // "SÜPER GÜÇ KULLAN"
  powerOnlyMcq: string;       // tooltip
  typeMcq: string;            // "Çoktan Seçmeli"
  typeTf: string;             // "Doğru / Yanlış"
  typeMatch: string;          // "Eşleştirme"
  flyToVictory: string;       // "ZAFERE UÇ →"

  // Quiz — sonuç
  resultPerfect: string;
  resultGreat: string;
  resultGood: string;
  resultStart: string;
  statCorrect: string;        // "DOĞRU"
  statSuccess: string;        // "BAŞARI"
  statStreak: string;         // "EN UZUN SERİ"
  backToHome: string;         // "ANA SAYFAYA DÖN"
  scoreSaved: string;

  // Review (geçmiş soru) overlay
  reviewSkipped: string;      // "Bu soruyu atladın"
  reviewRetrySuccess: string; // "İkinci denemede doğru!"
  reviewCorrect: string;      // "Doğru cevapladın"
  reviewWrong: string;        // "Yanlış cevapladın"
  reviewClose: string;        // "Kapat"
}

export const UI: Record<Lang, UIStrings> = {
  // ══════════════════════════ TÜRKÇE ══════════════════════════
  tr: {
    homeSubtitle: 'İnternetten Yapay Zekaya — Geleceğin Şifresi',
    sectionLabel: '▸ SUNUM & QUIZ',
    cardBadge: 'GÖKYÜZÜ TEMASI',
    cardDesc: 'Çocuklar için tasarlanmış sunum ve quiz — açık mavi gökyüzü teması, yumuşak renkler, sade animasyonlar. 9-10 yaş için uygun içerik.',
    btnPresentation: '▶ Sunum',
    btnQuiz: '🎯 Quiz',
    howToTitle: 'NASIL KULLANILIR?',
    howToDesc: 'Önce Sunum\'u izle ve teknoloji yolculuğunu keşfet. Sonra Quiz\'i çöz, XP kazan ve liderboard\'da yerini al!',
    langPickTitle: 'DİL SEÇ',
    leaderboard: '🏆 LİDERBOARD',
    leaderboardAll: 'Tümü →',
    leaderEmpty1: 'Henüz kimse quiz çözmedi!',
    leaderEmpty2: 'İlk sen ol 🚀',
    correctWord: 'doğru',
    liveUpdating: 'Canlı güncelleniyor',

    back: 'Geri',
    goToQuiz: 'Quize Geç',
    sunumTitle: 'TEKNO QUEST',

    quizNamePlaceholder: 'Adın ne?',
    quizQuestionsCount: '15 soru',
    quizHeroes: '4 kahraman',
    quizSections: '5 Bölüm',
    quizYourPower: 'SÜPER GÜCÜN:',
    quizComboHint: 'Üst üste doğru cevap = Kombo bonusu',
    quizSpeedHint: 'Hızlı cevap = ',
    quizSpeedBonus: 'Hız bonusu',
    quizRetryHint: 'Yanlışta panik yok — ',
    quizSecondChance: '2. şans',
    quizStartBtn: 'MACERAYA BAŞLA',

    correctLabel: 'DOĞRU',
    wrongLabel: 'YANLIŞ',
    yourAnswer: 'senin cevabın',
    correctAnswer: 'doğru cevap',
    correctTick: '✓ doğru',
    matchTarget: 'EŞLEŞTİR',
    matchDrag: 'SÜRÜKLE',
    matchDropHint: '↘ buraya sürükle',
    matchDropHere: 'BURAYA BIRAK',
    matchAllCorrect: '🎉 Hepsini doğru eşleştirmiştin!',
    matchNotAll: '😊 Hepsini doğru eşleştiremedin — şimdi öğrendin!',
    newSectionUnlocked: '🔓 YENİ BÖLÜM AÇILDI',
    readyQuestion: 'Hazır mısın?',
    newLevel: 'YENİ SEVİYE!',
    stagePassPrompt: 'BU AŞAMAYI GEÇMEK İÇİN SORUYU ÇÖZ!',
    usePower: '⚡ SÜPER GÜÇ KULLAN',
    powerOnlyMcq: 'Sadece çoktan seçmeli sorularda',
    typeMcq: '📝 Çoktan Seçmeli',
    typeTf: '⚡ Doğru / Yanlış',
    typeMatch: '🔗 Eşleştirme',
    flyToVictory: '🏁 ZAFERE UÇ →',

    resultPerfect: 'İnanılmaz! Sen bir teknoloji efsanesisin! 🌟',
    resultGreat: 'Harika iş çıkardın! Büyük bir kaşifsin!',
    resultGood: 'İyi gidiyorsun! Pes etme, her deneme seni güçlendirir!',
    resultStart: 'Maceran yeni başlıyor! Sunumu tekrar izle ve tekrar dene — başaracaksın!',
    statCorrect: 'DOĞRU',
    statSuccess: 'BAŞARI',
    statStreak: 'EN UZUN SERİ',
    backToHome: '← ANA SAYFAYA DÖN',
    scoreSaved: '✅ Skor liderboard\'a kaydedildi',

    reviewSkipped: '⏭️ Bu soruyu atladın',
    reviewRetrySuccess: '💪 İkinci denemede doğru!',
    reviewCorrect: '✅ Doğru cevapladın',
    reviewWrong: '❌ Yanlış cevapladın',
    reviewClose: 'Kapat',
  },

  // ══════════════════════════ ENGLISH ══════════════════════════
  en: {
    homeSubtitle: 'From the Internet to Artificial Intelligence — The Code of the Future',
    sectionLabel: '▸ PRESENTATION & QUIZ',
    cardBadge: 'SKY THEME',
    cardDesc: 'A presentation and quiz designed for children — light blue sky theme, soft colors, gentle animations. Content suitable for ages 9-10.',
    btnPresentation: '▶ Presentation',
    btnQuiz: '🎯 Quiz',
    howToTitle: 'HOW TO USE?',
    howToDesc: 'First watch the Presentation and explore the technology journey. Then take the Quiz, earn XP and claim your spot on the leaderboard!',
    langPickTitle: 'CHOOSE LANGUAGE',
    leaderboard: '🏆 LEADERBOARD',
    leaderboardAll: 'All →',
    leaderEmpty1: 'No one has taken the quiz yet!',
    leaderEmpty2: 'Be the first 🚀',
    correctWord: 'correct',
    liveUpdating: 'Updating live',

    back: 'Back',
    goToQuiz: 'Go to Quiz',
    sunumTitle: 'TEKNO QUEST',

    quizNamePlaceholder: 'What\'s your name?',
    quizQuestionsCount: '15 questions',
    quizHeroes: '4 heroes',
    quizSections: '5 Sections',
    quizYourPower: 'YOUR SUPERPOWER:',
    quizComboHint: 'Correct answers in a row = Combo bonus',
    quizSpeedHint: 'Fast answer = ',
    quizSpeedBonus: 'Speed bonus',
    quizRetryHint: 'No panic if you\'re wrong — ',
    quizSecondChance: '2nd chance',
    quizStartBtn: 'START THE ADVENTURE',

    correctLabel: 'CORRECT',
    wrongLabel: 'WRONG',
    yourAnswer: 'your answer',
    correctAnswer: 'correct answer',
    correctTick: '✓ correct',
    matchTarget: 'MATCH',
    matchDrag: 'DRAG',
    matchDropHint: '↘ drag here',
    matchDropHere: 'DROP HERE',
    matchAllCorrect: '🎉 You matched them all correctly!',
    matchNotAll: '😊 You didn\'t match them all — now you\'ve learned!',
    newSectionUnlocked: '🔓 NEW SECTION UNLOCKED',
    readyQuestion: 'Are you ready?',
    newLevel: 'NEW LEVEL!',
    stagePassPrompt: 'SOLVE THE QUESTION TO PASS THIS STAGE!',
    usePower: '⚡ USE SUPERPOWER',
    powerOnlyMcq: 'Only on multiple-choice questions',
    typeMcq: '📝 Multiple Choice',
    typeTf: '⚡ True / False',
    typeMatch: '🔗 Matching',
    flyToVictory: '🏁 FLY TO VICTORY →',

    resultPerfect: 'Incredible! You\'re a technology legend! 🌟',
    resultGreat: 'Great job! You\'re a real explorer!',
    resultGood: 'You\'re doing well! Don\'t give up, every try makes you stronger!',
    resultStart: 'Your adventure is just beginning! Watch the presentation again and retry — you\'ll make it!',
    statCorrect: 'CORRECT',
    statSuccess: 'SUCCESS',
    statStreak: 'LONGEST STREAK',
    backToHome: '← BACK TO HOME',
    scoreSaved: '✅ Score saved to the leaderboard',

    reviewSkipped: '⏭️ You skipped this question',
    reviewRetrySuccess: '💪 Correct on the second try!',
    reviewCorrect: '✅ You answered correctly',
    reviewWrong: '❌ You answered incorrectly',
    reviewClose: 'Close',
  },

  // ══════════════════════════ 中文 ══════════════════════════
  zh: {
    homeSubtitle: '从互联网到人工智能 — 通往未来的密码',
    sectionLabel: '▸ 演示 & 测验',
    cardBadge: '天空主题',
    cardDesc: '为孩子设计的演示和测验 — 浅蓝天空主题、柔和色彩、简洁动画。适合 9-10 岁的内容。',
    btnPresentation: '▶ 演示',
    btnQuiz: '🎯 测验',
    howToTitle: '如何使用？',
    howToDesc: '先观看演示，探索科技之旅。然后完成测验，赢取 XP，登上排行榜！',
    langPickTitle: '选择语言',
    leaderboard: '🏆 排行榜',
    leaderboardAll: '全部 →',
    leaderEmpty1: '还没有人完成测验！',
    leaderEmpty2: '成为第一个吧 🚀',
    correctWord: '正确',
    liveUpdating: '实时更新中',

    back: '返回',
    goToQuiz: '进入测验',
    sunumTitle: 'TEKNO QUEST',

    quizNamePlaceholder: '你叫什么名字？',
    quizQuestionsCount: '15 道题',
    quizHeroes: '4 个英雄',
    quizSections: '5 个部分',
    quizYourPower: '你的超能力：',
    quizComboHint: '连续答对 = 连击奖励',
    quizSpeedHint: '快速作答 = ',
    quizSpeedBonus: '速度奖励',
    quizRetryHint: '答错也别慌 — ',
    quizSecondChance: '第二次机会',
    quizStartBtn: '开始冒险',

    correctLabel: '正确',
    wrongLabel: '错误',
    yourAnswer: '你的答案',
    correctAnswer: '正确答案',
    correctTick: '✓ 正确',
    matchTarget: '配对',
    matchDrag: '拖动',
    matchDropHint: '↘ 拖到这里',
    matchDropHere: '放在这里',
    matchAllCorrect: '🎉 你全部配对正确！',
    matchNotAll: '😊 没有全部配对正确 — 现在你学会了！',
    newSectionUnlocked: '🔓 解锁新部分',
    readyQuestion: '准备好了吗？',
    newLevel: '新关卡！',
    stagePassPrompt: '解答问题以通过本关！',
    usePower: '⚡ 使用超能力',
    powerOnlyMcq: '仅限选择题',
    typeMcq: '📝 选择题',
    typeTf: '⚡ 判断题',
    typeMatch: '🔗 配对题',
    flyToVictory: '🏁 飞向胜利 →',

    resultPerfect: '太棒了！你是科技传奇！🌟',
    resultGreat: '做得很好！你是真正的探险家！',
    resultGood: '你做得不错！不要放弃，每次尝试都会让你更强！',
    resultStart: '你的冒险才刚刚开始！再看一遍演示，再试一次 — 你一定行！',
    statCorrect: '正确',
    statSuccess: '成功率',
    statStreak: '最长连击',
    backToHome: '← 返回首页',
    scoreSaved: '✅ 成绩已保存到排行榜',

    reviewSkipped: '⏭️ 你跳过了这道题',
    reviewRetrySuccess: '💪 第二次答对了！',
    reviewCorrect: '✅ 你答对了',
    reviewWrong: '❌ 你答错了',
    reviewClose: '关闭',
  },
};
