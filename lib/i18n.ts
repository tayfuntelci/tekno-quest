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

export function normalizeLang(v: string | null | undefined): Lang {
  if (v === 'en' || v === 'zh' || v === 'tr') return v;
  return 'tr';
}

export function sunumFile(lang: Lang): string {
  if (lang === 'en') return '/sunum-v2-en.html';
  if (lang === 'zh') return '/sunum-v2-zh.html';
  return '/sunum-v2.html';
}

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
  correctWord: string;
  liveUpdating: string;

  // Sunum topbar
  back: string;
  goToQuiz: string;
  sunumTitle: string;

  // Quiz — isim/karakter/hazır
  quizNamePlaceholder: string;
  nameWriteStart: string;
  continueArrow: string;
  quizQuestionsCount: string;       // "15 soru"
  quizQuestionsCountShort: string;  // "15 Soru"
  quizHeroes: string;               // "4 kahraman"
  quizSections: string;             // "5 Bölüm"
  helloPrefix: string;              // "Merhaba"
  chooseClass: string;
  chooseClassDesc: string;
  quizYourPower: string;            // "SÜPER GÜCÜN:"
  yourPowerInline: string;          // "Süper Gücün:"
  backShort: string;                // "← Geri"
  adventureBegins: string;          // "MACERA BAŞLASIN! 🚀"
  startExclaim: string;             // "🚀 BAŞLA!"
  comboHintPre: string;
  comboBonus: string;
  quizSpeedHint: string;
  quizSpeedBonus: string;
  quizRetryHint: string;
  quizSecondChance: string;

  // Oynanış — board / HUD / overlay
  tapHint: string;                  // "▼ TIKLA"
  victoryShort: string;             // "ZAFER"
  newSectionUnlocked: string;
  readyQuestion: string;
  newLevel: string;
  stage: string;                    // "AŞAMA"
  stagePassPrompt: string;
  powersReadyMsg: string;           // "süper güç hazır · soruya gir!"
  usePower: string;
  powerOnlyMcq: string;
  powerSkip: string;                // "ATLA"
  powerLucky: string;               // "ŞANSLI"
  secondChanceBadge: string;        // "💪 İkinci Şans"
  doubleXpActive: string;           // "💎 2X XP Aktif"
  retryTitle: string;
  retryDesc: string;
  typeMcq: string;
  typeTf: string;
  typeMatch: string;
  feedbackRetryWin: string;
  feedbackCorrect: string;          // "...{xp}..." → {xp} değişir
  feedbackSkipped: string;
  feedbackWrong: string;
  flyToVictory: string;
  nextPlanet: string;

  // Soru kartları / TF / Match
  correctLabel: string;
  wrongLabel: string;
  matchTarget: string;
  matchDrag: string;
  matchDropHint: string;
  matchDropHere: string;

  // Review (geçmiş soru)
  reviewPastStage: string;          // "GEÇMİŞ AŞAMA"
  reviewQuestionTitle: string;      // "Bu soruda ne cevap verdim?"
  reviewClose: string;
  secondChanceUsed: string;         // "💪 İkinci Şans Kullandın"
  correctAnswerExplanation: string; // "💡 Doğru Cevap & Açıklama"
  backToMap: string;                // "← HARİTAYA DÖN"
  yourAnswer: string;
  correctAnswer: string;
  correctTick: string;
  skippedWithPower: string;
  correctMatches: string;           // "DOĞRU EŞLEŞMELER"
  matchAllCorrect: string;
  matchNotAll: string;
  reviewSkipped: string;
  reviewRetrySuccess: string;
  reviewCorrect: string;
  reviewWrong: string;

  // Sonuç
  resultPerfect: string;
  resultGreat: string;
  resultGood: string;
  resultStart: string;
  statCorrect: string;
  statSuccess: string;
  statStreak: string;
  statFastest: string;              // "EN HIZLI"
  badgesEarned: string;             // "🏅 KAZANILAN ROZETLER"
  scoreSaved: string;
  scoreSaving: string;
  seeLeaderboard: string;           // "🏆 LİDERBOARD'U GÖR"
  backToHome: string;
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
    nameWriteStart: 'İsmini yaz ve maceraya başla!',
    continueArrow: 'DEVAM →',
    quizQuestionsCount: '15 soru',
    quizQuestionsCountShort: '15 Soru',
    quizHeroes: '4 kahraman',
    quizSections: '5 Bölüm',
    helloPrefix: 'Merhaba',
    chooseClass: 'SINIFINI SEÇ',
    chooseClassDesc: 'Her sınıfın özel bir süper gücü var — sana uyanı seç!',
    quizYourPower: 'SÜPER GÜCÜN:',
    yourPowerInline: 'Süper Gücün:',
    backShort: '← Geri',
    adventureBegins: 'MACERA BAŞLASIN! 🚀',
    startExclaim: '🚀 BAŞLA!',
    comboHintPre: 'Üst üste doğru cevap = ',
    comboBonus: 'Kombo bonusu',
    quizSpeedHint: 'Hızlı cevap = ',
    quizSpeedBonus: 'Hız bonusu',
    quizRetryHint: 'Yanlışta panik yok — ',
    quizSecondChance: '2. şans',

    tapHint: '▼ TIKLA',
    victoryShort: 'ZAFER',
    newSectionUnlocked: '🔓 YENİ BÖLÜM AÇILDI',
    readyQuestion: 'Hazır mısın?',
    newLevel: 'YENİ SEVİYE!',
    stage: 'AŞAMA',
    stagePassPrompt: 'Bu aşamayı geçmek için soruyu çöz!',
    powersReadyMsg: 'süper güç hazır · soruya gir!',
    usePower: '⚡ SÜPER GÜÇ KULLAN',
    powerOnlyMcq: 'Sadece çoktan seçmeli sorularda',
    powerSkip: 'ATLA',
    powerLucky: 'ŞANSLI',
    secondChanceBadge: '💪 İkinci Şans',
    doubleXpActive: '💎 2X XP Aktif',
    retryTitle: '😊 Oops! Yakındı — İkinci bir şansın var!',
    retryDesc: 'Düşün ve tekrar dene 💪',
    typeMcq: '📝 Çoktan Seçmeli',
    typeTf: '⚡ Doğru / Yanlış',
    typeMatch: '🔗 Eşleştirme',
    feedbackRetryWin: '💪 Süpersin! İkinci denemede doğru — cesurluk işte bu!',
    feedbackCorrect: '🎉 Harika! +{xp} XP kazandın — roket ateşleniyor!',
    feedbackSkipped: '⏭️ Bu soruyu atladın — bir sonrakinde gücünü göster!',
    feedbackWrong: '😊 Doğrusu işte bu — şimdi öğrendin, bir sonraki senin olsun!',
    flyToVictory: '🏁 ZAFERE UÇ →',
    nextPlanet: '🚀 SONRAKİ GEZEGENE UÇ →',

    correctLabel: 'DOĞRU',
    wrongLabel: 'YANLIŞ',
    matchTarget: 'EŞLEŞTİR',
    matchDrag: 'SÜRÜKLE',
    matchDropHint: '↘ buraya sürükle',
    matchDropHere: 'BURAYA BIRAK',

    reviewPastStage: 'GEÇMİŞ AŞAMA',
    reviewQuestionTitle: 'Bu soruda ne cevap verdim?',
    reviewClose: 'Kapat',
    secondChanceUsed: '💪 İkinci Şans Kullandın',
    correctAnswerExplanation: '💡 Doğru Cevap & Açıklama',
    backToMap: '← HARİTAYA DÖN',
    yourAnswer: 'senin cevabın',
    correctAnswer: 'doğru cevap',
    correctTick: '✓ doğru',
    skippedWithPower: '⏭️ Bu soruyu süper gücünle atladın — üstteki doğru cevaba dikkat!',
    correctMatches: 'DOĞRU EŞLEŞMELER',
    matchAllCorrect: '🎉 Hepsini doğru eşleştirmiştin!',
    matchNotAll: '😊 Hepsini doğru eşleştiremedin — şimdi öğrendin!',
    reviewSkipped: '⏭️ Bu soruyu atladın',
    reviewRetrySuccess: '💪 İkinci denemede doğru!',
    reviewCorrect: '✅ Doğru cevapladın',
    reviewWrong: '❌ Yanlış cevapladın',

    resultPerfect: 'İnanılmaz! Sen bir teknoloji efsanesisin! 🌟',
    resultGreat: 'Harika iş çıkardın! Büyük bir kaşifsin!',
    resultGood: 'İyi gidiyorsun! Pes etme, her deneme seni güçlendirir!',
    resultStart: 'Maceran yeni başlıyor! Sunumu tekrar izle ve tekrar dene — başaracaksın!',
    statCorrect: 'DOĞRU',
    statSuccess: 'BAŞARI',
    statStreak: 'EN UZUN SERİ',
    statFastest: 'EN HIZLI',
    badgesEarned: '🏅 KAZANILAN ROZETLER',
    scoreSaved: '✅ Skor liderboard\'a kaydedildi!',
    scoreSaving: '⏳ Skor kaydediliyor...',
    seeLeaderboard: '🏆 LİDERBOARD\'U GÖR',
    backToHome: '← ANA SAYFAYA DÖN',
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
    nameWriteStart: 'Type your name and start the adventure!',
    continueArrow: 'CONTINUE →',
    quizQuestionsCount: '15 questions',
    quizQuestionsCountShort: '15 Questions',
    quizHeroes: '4 heroes',
    quizSections: '5 Sections',
    helloPrefix: 'Hello',
    chooseClass: 'CHOOSE YOUR CLASS',
    chooseClassDesc: 'Each class has a special superpower — pick the one that fits you!',
    quizYourPower: 'YOUR SUPERPOWER:',
    yourPowerInline: 'Your Superpower:',
    backShort: '← Back',
    adventureBegins: 'LET THE ADVENTURE BEGIN! 🚀',
    startExclaim: '🚀 START!',
    comboHintPre: 'Correct answers in a row = ',
    comboBonus: 'Combo bonus',
    quizSpeedHint: 'Fast answer = ',
    quizSpeedBonus: 'Speed bonus',
    quizRetryHint: 'No panic if you\'re wrong — ',
    quizSecondChance: '2nd chance',

    tapHint: '▼ TAP',
    victoryShort: 'VICTORY',
    newSectionUnlocked: '🔓 NEW SECTION UNLOCKED',
    readyQuestion: 'Are you ready?',
    newLevel: 'NEW LEVEL!',
    stage: 'STAGE',
    stagePassPrompt: 'Solve the question to pass this stage!',
    powersReadyMsg: 'superpower(s) ready · enter the question!',
    usePower: '⚡ USE SUPERPOWER',
    powerOnlyMcq: 'Only on multiple-choice questions',
    powerSkip: 'SKIP',
    powerLucky: 'LUCKY',
    secondChanceBadge: '💪 Second Chance',
    doubleXpActive: '💎 2X XP Active',
    retryTitle: '😊 Oops! So close — you have a second chance!',
    retryDesc: 'Think and try again 💪',
    typeMcq: '📝 Multiple Choice',
    typeTf: '⚡ True / False',
    typeMatch: '🔗 Matching',
    feedbackRetryWin: '💪 Awesome! Correct on the second try — that\'s real courage!',
    feedbackCorrect: '🎉 Great! You earned +{xp} XP — the rocket is launching!',
    feedbackSkipped: '⏭️ You skipped this question — show your power on the next one!',
    feedbackWrong: '😊 Here\'s the right one — now you\'ve learned it, the next is yours!',
    flyToVictory: '🏁 FLY TO VICTORY →',
    nextPlanet: '🚀 FLY TO THE NEXT PLANET →',

    correctLabel: 'TRUE',
    wrongLabel: 'FALSE',
    matchTarget: 'MATCH',
    matchDrag: 'DRAG',
    matchDropHint: '↘ drag here',
    matchDropHere: 'DROP HERE',

    reviewPastStage: 'PAST STAGE',
    reviewQuestionTitle: 'What did I answer on this question?',
    reviewClose: 'Close',
    secondChanceUsed: '💪 You Used a Second Chance',
    correctAnswerExplanation: '💡 Correct Answer & Explanation',
    backToMap: '← BACK TO MAP',
    yourAnswer: 'your answer',
    correctAnswer: 'correct answer',
    correctTick: '✓ correct',
    skippedWithPower: '⏭️ You skipped this with your superpower — note the correct answer above!',
    correctMatches: 'CORRECT MATCHES',
    matchAllCorrect: '🎉 You matched them all correctly!',
    matchNotAll: '😊 You didn\'t match them all — now you\'ve learned!',
    reviewSkipped: '⏭️ You skipped this question',
    reviewRetrySuccess: '💪 Correct on the second try!',
    reviewCorrect: '✅ You answered correctly',
    reviewWrong: '❌ You answered incorrectly',

    resultPerfect: 'Incredible! You\'re a technology legend! 🌟',
    resultGreat: 'Great job! You\'re a real explorer!',
    resultGood: 'You\'re doing well! Don\'t give up, every try makes you stronger!',
    resultStart: 'Your adventure is just beginning! Watch the presentation again and retry — you\'ll make it!',
    statCorrect: 'CORRECT',
    statSuccess: 'SUCCESS',
    statStreak: 'LONGEST STREAK',
    statFastest: 'FASTEST',
    badgesEarned: '🏅 BADGES EARNED',
    scoreSaved: '✅ Score saved to the leaderboard!',
    scoreSaving: '⏳ Saving score...',
    seeLeaderboard: '🏆 SEE LEADERBOARD',
    backToHome: '← BACK TO HOME',
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
    nameWriteStart: '写下你的名字，开始冒险吧！',
    continueArrow: '继续 →',
    quizQuestionsCount: '15 道题',
    quizQuestionsCountShort: '15 道题',
    quizHeroes: '4 个英雄',
    quizSections: '5 个部分',
    helloPrefix: '你好',
    chooseClass: '选择你的角色',
    chooseClassDesc: '每个角色都有特殊的超能力 — 选一个适合你的！',
    quizYourPower: '你的超能力：',
    yourPowerInline: '你的超能力：',
    backShort: '← 返回',
    adventureBegins: '冒险开始！🚀',
    startExclaim: '🚀 开始！',
    comboHintPre: '连续答对 = ',
    comboBonus: '连击奖励',
    quizSpeedHint: '快速作答 = ',
    quizSpeedBonus: '速度奖励',
    quizRetryHint: '答错也别慌 — ',
    quizSecondChance: '第二次机会',

    tapHint: '▼ 点击',
    victoryShort: '胜利',
    newSectionUnlocked: '🔓 解锁新部分',
    readyQuestion: '准备好了吗？',
    newLevel: '新关卡！',
    stage: '关卡',
    stagePassPrompt: '解答问题以通过本关！',
    powersReadyMsg: '个超能力就绪 · 进入题目！',
    usePower: '⚡ 使用超能力',
    powerOnlyMcq: '仅限选择题',
    powerSkip: '跳过',
    powerLucky: '幸运',
    secondChanceBadge: '💪 第二次机会',
    doubleXpActive: '💎 2倍 XP 已激活',
    retryTitle: '😊 哎呀！就差一点 — 你还有一次机会！',
    retryDesc: '想一想再试一次 💪',
    typeMcq: '📝 选择题',
    typeTf: '⚡ 判断题',
    typeMatch: '🔗 配对题',
    feedbackRetryWin: '💪 太棒了！第二次就答对了 — 这就是勇气！',
    feedbackCorrect: '🎉 太好了！你获得了 +{xp} XP — 火箭发射！',
    feedbackSkipped: '⏭️ 你跳过了这道题 — 在下一题展示你的实力！',
    feedbackWrong: '😊 正确答案是这个 — 现在你学会了，下一题就是你的！',
    flyToVictory: '🏁 飞向胜利 →',
    nextPlanet: '🚀 飞向下一颗星球 →',

    correctLabel: '正确',
    wrongLabel: '错误',
    matchTarget: '配对',
    matchDrag: '拖动',
    matchDropHint: '↘ 拖到这里',
    matchDropHere: '放在这里',

    reviewPastStage: '过往关卡',
    reviewQuestionTitle: '这道题我答了什么？',
    reviewClose: '关闭',
    secondChanceUsed: '💪 你用了第二次机会',
    correctAnswerExplanation: '💡 正确答案与解析',
    backToMap: '← 返回地图',
    yourAnswer: '你的答案',
    correctAnswer: '正确答案',
    correctTick: '✓ 正确',
    skippedWithPower: '⏭️ 你用超能力跳过了这道题 — 注意上面的正确答案！',
    correctMatches: '正确配对',
    matchAllCorrect: '🎉 你全部配对正确！',
    matchNotAll: '😊 没有全部配对正确 — 现在你学会了！',
    reviewSkipped: '⏭️ 你跳过了这道题',
    reviewRetrySuccess: '💪 第二次答对了！',
    reviewCorrect: '✅ 你答对了',
    reviewWrong: '❌ 你答错了',

    resultPerfect: '太棒了！你是科技传奇！🌟',
    resultGreat: '做得很好！你是真正的探险家！',
    resultGood: '你做得不错！不要放弃，每次尝试都会让你更强！',
    resultStart: '你的冒险才刚刚开始！再看一遍演示，再试一次 — 你一定行！',
    statCorrect: '正确',
    statSuccess: '成功率',
    statStreak: '最长连击',
    statFastest: '最快',
    badgesEarned: '🏅 获得的徽章',
    scoreSaved: '✅ 成绩已保存到排行榜！',
    scoreSaving: '⏳ 正在保存成绩...',
    seeLeaderboard: '🏆 查看排行榜',
    backToHome: '← 返回首页',
  },
};
