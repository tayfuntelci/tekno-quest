// ============================================================
// Teknoloji Quest — Quiz verisi, 3 dilde (tr / en / zh)
// Sorular, karakterler, rank, rozet, streak — dile göre
// NOT: `section` alanı TÜM dillerde aynı STABİL anahtar (TR string) —
// gruplama mantığı bozulmasın; sadece görünen ad SECTION_META'da çevrilir.
// ============================================================
import { Lang } from './i18n';
import { Question } from './questions-v2';
import { Character, CharacterId, Rank, StreakInfo, BadgeDef, BadgeEarnedInput } from './game-data';

// Stabil bölüm anahtarları (questions'taki `section` ile birebir)
export const SEC = {
  basics: '🌐 İnternet Temelleri',
  turkey: '🇹🇷 Türkiye Turu',
  speed: '⚡ Hız Macerası',
  ai: '🤖 Yapay Zeka',
  smart: '🧭 Akıllı Kullanım',
} as const;

// ─────────────────────────────────────────────
// SORULAR
// ─────────────────────────────────────────────
const QUESTIONS: Record<Lang, Question[]> = {
  tr: [
    { id: 1, type: 'mcq', section: SEC.basics, text: 'İnternet ilk olarak hangi yılda icat edildi?', options: ['1969', '1985', '1993', '2000'], correct: '1969', explanation: '🎉 ARPANET 1969\'da sadece 4 bilgisayar arasında kuruldu — internetin doğum yılı!', xp: 10 },
    { id: 2, type: 'mcq', section: SEC.basics, text: 'Bilgisayarda web sitesi açmak için kullandığın programa ne denir?', options: ['Hesap makinesi', 'Tarayıcı (Chrome, Safari)', 'Müzik çalar', 'Çizim programı'], correct: 'Tarayıcı (Chrome, Safari)', explanation: '🌐 Tarayıcı internete girip siteleri gösteren programdır — Chrome, Safari, Edge gibi.', xp: 12 },
    { id: 3, type: 'mcq', section: SEC.basics, text: 'İnternette bir bilgi aramak için aşağıdakilerden hangisini kullanırsın?', options: ['WhatsApp', 'Google', 'Spotify', 'Instagram'], correct: 'Google', explanation: '🔍 Google bir arama motorudur — istediğin bilgiyi milyonlarca site arasında saniyeler içinde bulur!', xp: 12 },
    { id: 4, type: 'mcq', section: SEC.turkey, text: 'Türkiye internete ilk olarak hangi üniversite üzerinden bağlandı?', options: ['Boğaziçi Üniversitesi', 'İTÜ', 'ODTÜ', 'Hacettepe Üniversitesi'], correct: 'ODTÜ', explanation: '🏫 Türkiye 1993\'te Ankara\'daki ODTÜ aracılığıyla internete bağlandı!', xp: 10 },
    { id: 5, type: 'tf', section: SEC.turkey, text: 'Türkiye\'de internet önce evlere, sonra üniversitelere geldi.', correct: 'false', explanation: '❌ Tam tersi! İlk önce üniversiteler (1993), sonra evler (1996) internete kavuştu.', xp: 10 },
    { id: 6, type: 'mcq', section: SEC.turkey, text: 'İnternet üzerinden gönderilen "elektronik mektup"a ne denir?', options: ['SMS', 'E-posta', 'Tweet', 'Sesli mesaj'], correct: 'E-posta', explanation: '💌 E-posta = "Elektronik Posta". İnternet üzerinden anında karşı tarafa ulaşan mektuptur. Türkiye\'nin ilk e-postası 1993\'te ODTÜ\'den gönderildi!', xp: 15 },
    { id: 7, type: 'mcq', section: SEC.speed, text: '5G ile 3 saatlik bir film yaklaşık kaç saniyede iner?', options: ['25 dakika', '5 dakika', '30 saniye', '3-4 saniye'], correct: '3-4 saniye', explanation: '⚡ 5G saniyede 10 Gb hıza ulaşır — 3 saatlik film 3-4 saniyede iner!', xp: 15 },
    { id: 8, type: 'tf', section: SEC.speed, text: '1G ile sadece sesli arama yapılabilirdi, internet yoktu.', correct: 'true', explanation: '✅ Doğru! 1G sadece sesli aramayı destekliyordu. İnternet 2G ile geldi.', xp: 10 },
    { id: 9, type: 'match', section: SEC.speed, text: 'Teknoloji kavramlarını anlamlarıyla eşleştir!', pairs: [{ left: 'WiFi', right: 'Kablosuz internet' }, { left: '5G', right: 'Çok hızlı mobil internet' }, { left: 'E-posta', right: 'İnternet mektubu' }, { left: 'Şifre', right: 'Hesabını korur' }], explanation: '🎯 Teknoloji kavramlarını harika biliyorsun!', xp: 20 },
    { id: 10, type: 'mcq', section: SEC.ai, text: 'Aşağıdakilerden hangisi günlük hayatta yapay zekanın yaptığı bir iştir?', options: ['Telefonda yüz tanıyıp kilidi açmak', 'Çamaşırları elde yıkamak', 'Kalemle resim çizmek', 'Bisiklet sürmek'], correct: 'Telefonda yüz tanıyıp kilidi açmak', explanation: '📱 Telefonda yüz tanıma, YouTube önerileri ve navigasyonun trafik tahmini — hepsi yapay zeka! YZ\'yi her gün farkında olmadan kullanıyoruz.', xp: 12 },
    { id: 11, type: 'tf', section: SEC.ai, text: 'Yapay zeka sadece bilgisayarlarda çalışır, telefonda çalışamaz.', correct: 'false', explanation: '❌ Yanlış! Telefonda yüz tanıma, fotoğraf albümü ve navigasyon gibi birçok yapay zeka çalışıyor!', xp: 10 },
    { id: 12, type: 'mcq', section: SEC.ai, text: 'Hangisi bir yapay zeka aracı DEĞİLDİR?', options: ['ChatGPT', 'Midjourney', 'Gemini', 'Bisiklet 🚲'], correct: 'Bisiklet 🚲', explanation: '🚲 Bisiklet bir ulaşım aracı! ChatGPT, Midjourney ve Gemini ise yapay zeka araçlarıdır.', xp: 10 },
    { id: 13, type: 'mcq', section: SEC.smart, text: '9-10 yaş için önerilen günlük MAKSİMUM eğlence ekran süresi kaçtır?', options: ['30 dakika', '2 saat', '5 saat', 'Sınır yok'], correct: '2 saat', explanation: '⏰ Sağlık uzmanları 9-10 yaş için günde max 2 saat eğlence ekranı öneriyor (ödev hariç)!', xp: 12 },
    { id: 14, type: 'tf', section: SEC.smart, text: 'İnternette tanımadığın biriyle ev adresini paylaşabilirsin.', correct: 'false', explanation: '🛡️ KESİNLİKLE HAYIR! Tam adını, adresini, okulunu, telefonunu ASLA paylaşma!', xp: 15 },
    { id: 15, type: 'match', section: SEC.smart, text: 'Mesleği ile günlük görevini eşleştir!', pairs: [{ left: 'YZ Mühendisi', right: 'Modellere veri öğretir' }, { left: 'Gen Mühendisi', right: 'DNA\'yı inceler' }, { left: 'Uzay Mühendisi', right: 'Roket tasarlar' }, { left: 'Siber Kahraman', right: 'Dijital tehlikeleri engeller' }], explanation: '🎯 Geleceğin meslekleri konusunda uzmansın!', xp: 22 },
  ],

  en: [
    { id: 1, type: 'mcq', section: SEC.basics, text: 'In what year was the internet first invented?', options: ['1969', '1985', '1993', '2000'], correct: '1969', explanation: '🎉 ARPANET was built in 1969 between just 4 computers — the birth year of the internet!', xp: 10 },
    { id: 2, type: 'mcq', section: SEC.basics, text: 'What is the program you use to open websites on a computer called?', options: ['Calculator', 'Browser (Chrome, Safari)', 'Music player', 'Drawing program'], correct: 'Browser (Chrome, Safari)', explanation: '🌐 A browser is the program that goes onto the internet and shows websites — like Chrome, Safari, Edge.', xp: 12 },
    { id: 3, type: 'mcq', section: SEC.basics, text: 'Which of these do you use to search for information on the internet?', options: ['WhatsApp', 'Google', 'Spotify', 'Instagram'], correct: 'Google', explanation: '🔍 Google is a search engine — it finds the information you want among millions of sites in seconds!', xp: 12 },
    { id: 4, type: 'mcq', section: SEC.turkey, text: 'Through which university did Turkey first connect to the internet?', options: ['Boğaziçi University', 'Istanbul Tech. Uni. (ITU)', 'METU (ODTÜ)', 'Hacettepe University'], correct: 'METU (ODTÜ)', explanation: '🏫 Turkey connected to the internet in 1993 through METU (ODTÜ) in Ankara!', xp: 10 },
    { id: 5, type: 'tf', section: SEC.turkey, text: 'In Turkey, the internet came to homes first, then to universities.', correct: 'false', explanation: '❌ It was the opposite! Universities connected first (1993), then homes (1996).', xp: 10 },
    { id: 6, type: 'mcq', section: SEC.turkey, text: 'What is an "electronic letter" sent over the internet called?', options: ['SMS', 'E-mail', 'Tweet', 'Voice message'], correct: 'E-mail', explanation: '💌 E-mail = "Electronic Mail". It is a letter that reaches the other side instantly over the internet. Turkey\'s first e-mail was sent from METU (ODTÜ) in 1993!', xp: 15 },
    { id: 7, type: 'mcq', section: SEC.speed, text: 'With 5G, about how many seconds does a 3-hour movie take to download?', options: ['25 minutes', '5 minutes', '30 seconds', '3-4 seconds'], correct: '3-4 seconds', explanation: '⚡ 5G reaches speeds of 10 Gb per second — a 3-hour movie downloads in 3-4 seconds!', xp: 15 },
    { id: 8, type: 'tf', section: SEC.speed, text: 'With 1G you could only make voice calls; there was no internet.', correct: 'true', explanation: '✅ Correct! 1G only supported voice calls. The internet arrived with 2G.', xp: 10 },
    { id: 9, type: 'match', section: SEC.speed, text: 'Match the technology terms with their meanings!', pairs: [{ left: 'WiFi', right: 'Wireless internet' }, { left: '5G', right: 'Very fast mobile internet' }, { left: 'E-mail', right: 'Internet letter' }, { left: 'Password', right: 'Protects your account' }], explanation: '🎯 You know your technology terms wonderfully!', xp: 20 },
    { id: 10, type: 'mcq', section: SEC.ai, text: 'Which of these is a job that artificial intelligence does in everyday life?', options: ['Unlocking a phone with face recognition', 'Washing clothes by hand', 'Drawing with a pencil', 'Riding a bicycle'], correct: 'Unlocking a phone with face recognition', explanation: '📱 Face recognition on your phone, YouTube recommendations and navigation traffic prediction — all artificial intelligence! We use AI every day without noticing.', xp: 12 },
    { id: 11, type: 'tf', section: SEC.ai, text: 'Artificial intelligence only works on computers; it cannot work on phones.', correct: 'false', explanation: '❌ Wrong! Many AIs run on phones, such as face recognition, photo albums and navigation!', xp: 10 },
    { id: 12, type: 'mcq', section: SEC.ai, text: 'Which one is NOT an artificial intelligence tool?', options: ['ChatGPT', 'Midjourney', 'Gemini', 'Bicycle 🚲'], correct: 'Bicycle 🚲', explanation: '🚲 A bicycle is a vehicle! ChatGPT, Midjourney and Gemini are artificial intelligence tools.', xp: 10 },
    { id: 13, type: 'mcq', section: SEC.smart, text: 'What is the recommended MAXIMUM daily entertainment screen time for ages 9-10?', options: ['30 minutes', '2 hours', '5 hours', 'No limit'], correct: '2 hours', explanation: '⏰ Health experts recommend a maximum of 2 hours of entertainment screen time per day for ages 9-10 (homework not included)!', xp: 12 },
    { id: 14, type: 'tf', section: SEC.smart, text: 'You can share your home address with someone you don\'t know on the internet.', correct: 'false', explanation: '🛡️ ABSOLUTELY NOT! NEVER share your full name, address, school or phone number!', xp: 15 },
    { id: 15, type: 'match', section: SEC.smart, text: 'Match each profession with its daily task!', pairs: [{ left: 'AI Engineer', right: 'Teaches data to models' }, { left: 'Gene Engineer', right: 'Studies DNA' }, { left: 'Space Engineer', right: 'Designs rockets' }, { left: 'Cyber Hero', right: 'Stops digital dangers' }], explanation: '🎯 You\'re an expert on the jobs of the future!', xp: 22 },
  ],

  zh: [
    { id: 1, type: 'mcq', section: SEC.basics, text: '互联网最早是在哪一年发明的？', options: ['1969', '1985', '1993', '2000'], correct: '1969', explanation: '🎉 ARPANET 于 1969 年在仅仅 4 台电脑之间建立 — 这是互联网的诞生之年！', xp: 10 },
    { id: 2, type: 'mcq', section: SEC.basics, text: '在电脑上用来打开网站的程序叫什么？', options: ['计算器', '浏览器（Chrome、Safari）', '音乐播放器', '绘图程序'], correct: '浏览器（Chrome、Safari）', explanation: '🌐 浏览器是连上互联网并显示网站的程序 — 比如 Chrome、Safari、Edge。', xp: 12 },
    { id: 3, type: 'mcq', section: SEC.basics, text: '在互联网上查找信息时，你会使用下列哪一个？', options: ['WhatsApp', 'Google', 'Spotify', 'Instagram'], correct: 'Google', explanation: '🔍 Google 是搜索引擎 — 它能在几秒内从数百万个网站中找到你想要的信息！', xp: 12 },
    { id: 4, type: 'mcq', section: SEC.turkey, text: '土耳其最早通过哪所大学连接到互联网？', options: ['博阿齐奇大学', '伊斯坦布尔技术大学', '中东技术大学（ODTÜ）', '哈杰泰佩大学'], correct: '中东技术大学（ODTÜ）', explanation: '🏫 土耳其于 1993 年通过安卡拉的中东技术大学（ODTÜ）连接到互联网！', xp: 10 },
    { id: 5, type: 'tf', section: SEC.turkey, text: '在土耳其，互联网先进入家庭，然后才进入大学。', correct: 'false', explanation: '❌ 正好相反！先是大学（1993 年），然后才是家庭（1996 年）连上互联网。', xp: 10 },
    { id: 6, type: 'mcq', section: SEC.turkey, text: '通过互联网发送的"电子信件"叫什么？', options: ['短信', '电子邮件', '推文', '语音消息'], correct: '电子邮件', explanation: '💌 电子邮件就是通过互联网瞬间送达对方的信件。土耳其的第一封电子邮件于 1993 年从中东技术大学（ODTÜ）发出！', xp: 15 },
    { id: 7, type: 'mcq', section: SEC.speed, text: '用 5G 下载一部 3 小时的电影大约需要几秒？', options: ['25 分钟', '5 分钟', '30 秒', '3-4 秒'], correct: '3-4 秒', explanation: '⚡ 5G 每秒可达 10 Gb 的速度 — 一部 3 小时的电影 3-4 秒就能下载完！', xp: 15 },
    { id: 8, type: 'tf', section: SEC.speed, text: '在 1G 时代只能打语音电话，没有互联网。', correct: 'true', explanation: '✅ 正确！1G 只支持语音通话。互联网是随 2G 出现的。', xp: 10 },
    { id: 9, type: 'match', section: SEC.speed, text: '把科技名词和它们的含义配对！', pairs: [{ left: 'WiFi', right: '无线网络' }, { left: '5G', right: '非常快的移动网络' }, { left: '电子邮件', right: '互联网信件' }, { left: '密码', right: '保护你的账号' }], explanation: '🎯 你对科技名词掌握得真棒！', xp: 20 },
    { id: 10, type: 'mcq', section: SEC.ai, text: '下列哪一项是人工智能在日常生活中做的事？', options: ['用人脸识别解锁手机', '用手洗衣服', '用铅笔画画', '骑自行车'], correct: '用人脸识别解锁手机', explanation: '📱 手机的人脸识别、YouTube 推荐和导航的路况预测 — 都是人工智能！我们每天都在不知不觉中使用 AI。', xp: 12 },
    { id: 11, type: 'tf', section: SEC.ai, text: '人工智能只能在电脑上运行，不能在手机上运行。', correct: 'false', explanation: '❌ 错！手机上有很多人工智能在运行，比如人脸识别、相册和导航！', xp: 10 },
    { id: 12, type: 'mcq', section: SEC.ai, text: '下列哪一个不是人工智能工具？', options: ['ChatGPT', 'Midjourney', 'Gemini', '自行车 🚲'], correct: '自行车 🚲', explanation: '🚲 自行车是交通工具！ChatGPT、Midjourney 和 Gemini 才是人工智能工具。', xp: 10 },
    { id: 13, type: 'mcq', section: SEC.smart, text: '9-10 岁儿童每天建议的最长娱乐屏幕时间是多少？', options: ['30 分钟', '2 小时', '5 小时', '没有限制'], correct: '2 小时', explanation: '⏰ 健康专家建议 9-10 岁儿童每天娱乐屏幕时间最多 2 小时（不包括作业）！', xp: 12 },
    { id: 14, type: 'tf', section: SEC.smart, text: '你可以把家庭住址告诉网上不认识的人。', correct: 'false', explanation: '🛡️ 绝对不可以！永远不要透露你的全名、住址、学校或电话号码！', xp: 15 },
    { id: 15, type: 'match', section: SEC.smart, text: '把职业和它的日常工作配对！', pairs: [{ left: 'AI 工程师', right: '教模型学习数据' }, { left: '基因工程师', right: '研究 DNA' }, { left: '航天工程师', right: '设计火箭' }, { left: '网络卫士', right: '阻止数字危险' }], explanation: '🎯 你是未来职业方面的专家！', xp: 22 },
  ],
};

export const getQuestions = (lang: Lang): Question[] => QUESTIONS[lang];
export const getTotalXp = (lang: Lang): number => QUESTIONS[lang].reduce((s, q) => s + q.xp, 0);

// ─────────────────────────────────────────────
// BÖLÜM META (renk/glow/emoji sabit, ad çevrilir) — stabil anahtarla
// ─────────────────────────────────────────────
interface SecMeta { color: string; glow: string; emoji: string; name: string; }
const SECTION_META_I18N: Record<Lang, Record<string, SecMeta>> = {
  tr: {
    [SEC.basics]: { color: '#00cfff', glow: 'rgba(0,207,255,0.35)', emoji: '🌐', name: 'İNTERNET TEMELLERİ' },
    [SEC.turkey]: { color: '#ff9f1c', glow: 'rgba(255,159,28,0.35)', emoji: '🇹🇷', name: 'TÜRKİYE TURU' },
    [SEC.speed]:  { color: '#39ff14', glow: 'rgba(57,255,20,0.35)',  emoji: '⚡', name: 'HIZ MACERASI' },
    [SEC.ai]:     { color: '#c084fc', glow: 'rgba(192,132,252,0.35)', emoji: '🤖', name: 'YAPAY ZEKA' },
    [SEC.smart]:  { color: '#4ecdc4', glow: 'rgba(78,205,196,0.35)', emoji: '🧭', name: 'AKILLI KULLANIM' },
  },
  en: {
    [SEC.basics]: { color: '#00cfff', glow: 'rgba(0,207,255,0.35)', emoji: '🌐', name: 'INTERNET BASICS' },
    [SEC.turkey]: { color: '#ff9f1c', glow: 'rgba(255,159,28,0.35)', emoji: '🇹🇷', name: 'TURKEY TOUR' },
    [SEC.speed]:  { color: '#39ff14', glow: 'rgba(57,255,20,0.35)',  emoji: '⚡', name: 'SPEED ADVENTURE' },
    [SEC.ai]:     { color: '#c084fc', glow: 'rgba(192,132,252,0.35)', emoji: '🤖', name: 'ARTIFICIAL INTELLIGENCE' },
    [SEC.smart]:  { color: '#4ecdc4', glow: 'rgba(78,205,196,0.35)', emoji: '🧭', name: 'SMART USE' },
  },
  zh: {
    [SEC.basics]: { color: '#00cfff', glow: 'rgba(0,207,255,0.35)', emoji: '🌐', name: '互联网基础' },
    [SEC.turkey]: { color: '#ff9f1c', glow: 'rgba(255,159,28,0.35)', emoji: '🇹🇷', name: '土耳其之旅' },
    [SEC.speed]:  { color: '#39ff14', glow: 'rgba(57,255,20,0.35)',  emoji: '⚡', name: '速度冒险' },
    [SEC.ai]:     { color: '#c084fc', glow: 'rgba(192,132,252,0.35)', emoji: '🤖', name: '人工智能' },
    [SEC.smart]:  { color: '#4ecdc4', glow: 'rgba(78,205,196,0.35)', emoji: '🧭', name: '智慧使用' },
  },
};
export const getSectionMeta = (lang: Lang, section: string): SecMeta =>
  SECTION_META_I18N[lang][section] ?? SECTION_META_I18N[lang][SEC.basics];

// ─────────────────────────────────────────────
// KARAKTERLER
// ─────────────────────────────────────────────
const CHARS: Record<Lang, Character[]> = {
  tr: [
    { id: 'aylin', emoji: '🦉', className: 'Bilge Baykuş', color: '#8b5cf6', glow: 'rgba(139,92,246,0.35)', bio: 'Gecenin zekâsıyla dikkatli bakar. Zor bir soruda iki yanlış seçeneği eleyip gerçeği aydınlatır.', power: 'fifty', powerLabel: '50/50', powerDesc: 'Bir soruda 2 yanlış seçeneği siler — cevap 2\'ye düşer!', powerEmoji: '✂️' },
    { id: 'kerem', emoji: '🐿️', className: 'Hızlı Sincap', color: '#16a34a', glow: 'rgba(22,163,74,0.35)', bio: 'Daldan dala sıçrar. Zor bir cevizi atlayıp bir sonraki soruya hızla koşar.', power: 'skip', powerLabel: 'Atla', powerDesc: 'Bir soruyu atla — XP kazanmazsın ama serin (streak) bozulmaz!', powerEmoji: '⏭️' },
    { id: 'selin', emoji: '🐝', className: 'Çalışkan Arı', color: '#f59e0b', glow: 'rgba(245,158,11,0.4)', bio: 'Doğru çiçeği buldukça ödülü ikiye katlar. Detay kaçırmaz, çalışkandır.', power: 'double', powerLabel: 'Çifte Bal', powerDesc: 'Bir soruyu seçersin, doğru cevap verirsen XP iki kat olur!', powerEmoji: '🍯' },
    { id: 'emir', emoji: '🦊', className: 'Şanslı Tilki', color: '#ea580c', glow: 'rgba(234,88,12,0.38)', bio: 'Kurnaz ve şanslı. Yarışa bir adım önde başlar, fırsatları görür.', power: 'lucky-start', powerLabel: 'Şanslı Başlangıç', powerDesc: 'Oyuna 20 bonus XP ile başlarsın — rakiplerden bir adım önde!', powerEmoji: '🍀' },
  ],
  en: [
    { id: 'aylin', emoji: '🦉', className: 'Wise Owl', color: '#8b5cf6', glow: 'rgba(139,92,246,0.35)', bio: 'Looks carefully with the wisdom of the night. On a hard question, it removes two wrong options and reveals the truth.', power: 'fifty', powerLabel: '50/50', powerDesc: 'Removes 2 wrong options on a question — the answer narrows to 2!', powerEmoji: '✂️' },
    { id: 'kerem', emoji: '🐿️', className: 'Quick Squirrel', color: '#16a34a', glow: 'rgba(22,163,74,0.35)', bio: 'Leaps from branch to branch. It skips a tough nut and races to the next question.', power: 'skip', powerLabel: 'Skip', powerDesc: 'Skip a question — you don\'t earn XP but your streak stays safe!', powerEmoji: '⏭️' },
    { id: 'selin', emoji: '🐝', className: 'Busy Bee', color: '#f59e0b', glow: 'rgba(245,158,11,0.4)', bio: 'Doubles the reward whenever it finds the right flower. Misses no detail, works hard.', power: 'double', powerLabel: 'Double Honey', powerDesc: 'Pick a question, and if you answer correctly your XP is doubled!', powerEmoji: '🍯' },
    { id: 'emir', emoji: '🦊', className: 'Lucky Fox', color: '#ea580c', glow: 'rgba(234,88,12,0.38)', bio: 'Clever and lucky. It starts the race one step ahead and spots opportunities.', power: 'lucky-start', powerLabel: 'Lucky Start', powerDesc: 'Start the game with 20 bonus XP — one step ahead of your rivals!', powerEmoji: '🍀' },
  ],
  zh: [
    { id: 'aylin', emoji: '🦉', className: '智慧猫头鹰', color: '#8b5cf6', glow: 'rgba(139,92,246,0.35)', bio: '用夜晚的智慧仔细观察。遇到难题时，它会去掉两个错误选项，照亮真相。', power: 'fifty', powerLabel: '50/50', powerDesc: '在一道题中去掉 2 个错误选项 — 答案缩小到 2 个！', powerEmoji: '✂️' },
    { id: 'kerem', emoji: '🐿️', className: '敏捷松鼠', color: '#16a34a', glow: 'rgba(22,163,74,0.35)', bio: '在树枝间跳跃。它会跳过难啃的坚果，飞快地跑向下一题。', power: 'skip', powerLabel: '跳过', powerDesc: '跳过一道题 — 不会得到 XP，但你的连击不会中断！', powerEmoji: '⏭️' },
    { id: 'selin', emoji: '🐝', className: '勤劳蜜蜂', color: '#f59e0b', glow: 'rgba(245,158,11,0.4)', bio: '每找到正确的花朵就把奖励翻倍。不放过细节，非常勤奋。', power: 'double', powerLabel: '双倍蜂蜜', powerDesc: '选择一道题，如果答对，XP 翻倍！', powerEmoji: '🍯' },
    { id: 'emir', emoji: '🦊', className: '幸运狐狸', color: '#ea580c', glow: 'rgba(234,88,12,0.38)', bio: '机灵又幸运。它在比赛中领先一步，善于发现机会。', power: 'lucky-start', powerLabel: '幸运开局', powerDesc: '游戏开始时就有 20 点奖励 XP — 比对手领先一步！', powerEmoji: '🍀' },
  ],
};
export const getCharacters = (lang: Lang): Character[] => CHARS[lang];
export const getCharacter = (lang: Lang, id: CharacterId): Character =>
  CHARS[lang].find(c => c.id === id) ?? CHARS[lang][0];

// ─────────────────────────────────────────────
// RANK
// ─────────────────────────────────────────────
const RANK_NAMES: Record<Lang, string[]> = {
  tr: ['Acemi Kaşif', 'Teknoloji Çırağı', 'Dijital Usta', 'Siber Kahraman', 'Teknoloji Efsanesi'],
  en: ['Rookie Explorer', 'Tech Apprentice', 'Digital Master', 'Cyber Hero', 'Technology Legend'],
  zh: ['新手探险家', '科技学徒', '数字大师', '网络英雄', '科技传奇'],
};
const RANK_BASE: Omit<Rank, 'name'>[] = [
  { min: 0,   max: 40,   emoji: '🌱', color: '#c084fc' },
  { min: 40,  max: 90,   emoji: '🚀', color: '#00cfff' },
  { min: 90,  max: 140,  emoji: '⚡', color: '#39ff14' },
  { min: 140, max: 190,  emoji: '🛡️', color: '#ff9f1c' },
  { min: 190, max: 9999, emoji: '🏆', color: '#ffe600' },
];
export const getRanks = (lang: Lang): Rank[] =>
  RANK_BASE.map((r, i) => ({ ...r, name: RANK_NAMES[lang][i] }));
export const getRank = (lang: Lang, xp: number): Rank => {
  const ranks = getRanks(lang);
  for (const r of ranks) if (xp >= r.min && xp < r.max) return r;
  return ranks[ranks.length - 1];
};

// ─────────────────────────────────────────────
// STREAK
// ─────────────────────────────────────────────
const STREAK_MSG: Record<Lang, Record<number, string>> = {
  tr: { 2: 'Süpersin!', 3: 'Muhteşem Seri!', 5: 'Efsane Oluyorsun!', 10: 'Mükemmel Seri!!!' },
  en: { 2: 'Awesome!', 3: 'Amazing Streak!', 5: 'You\'re Becoming a Legend!', 10: 'Perfect Streak!!!' },
  zh: { 2: '太棒了！', 3: '超级连击！', 5: '你要成为传奇了！', 10: '完美连击！！！' },
};
const STREAK_STYLE: Record<number, { bonusXp: number; color: string; emoji: string }> = {
  2:  { bonusXp: 5,  color: '#00cfff', emoji: '✨' },
  3:  { bonusXp: 10, color: '#39ff14', emoji: '🌟' },
  5:  { bonusXp: 25, color: '#ff9f1c', emoji: '🏆' },
  10: { bonusXp: 50, color: '#ffe600', emoji: '👑' },
};
export function getStreakInfo(lang: Lang, count: number): StreakInfo | null {
  const s = STREAK_STYLE[count];
  if (!s) return null;
  return { count, message: STREAK_MSG[lang][count], bonusXp: s.bonusXp, color: s.color, emoji: s.emoji };
}

// ─────────────────────────────────────────────
// ROZETLER
// ─────────────────────────────────────────────
const BADGE_BASE: Record<string, { emoji: string; color: string }> = {
  perfect:  { emoji: '🏆', color: '#ffe600' },
  harika:   { emoji: '⭐', color: '#ff9f1c' },
  uzman:    { emoji: '💎', color: '#00cfff' },
  hedef:    { emoji: '🎯', color: '#39ff14' },
  muhtesem: { emoji: '✨', color: '#00cfff' },
  efsane:   { emoji: '🌟', color: '#ff9f1c' },
  akilli:   { emoji: '🦉', color: '#A855F7' },
  kahraman: { emoji: '💪', color: '#ff6b35' },
  hizli:    { emoji: '⚡', color: '#ffe600' },
  kalpli:   { emoji: '💖', color: '#ff6b9d' },
};
const BADGE_TEXT: Record<Lang, Record<string, { name: string; desc: string }>> = {
  tr: {
    perfect:  { name: 'Mükemmel', desc: 'Tüm soruları doğru yaptın' },
    harika:   { name: 'Harika', desc: '%80 veya daha fazla doğru' },
    uzman:    { name: 'Uzman', desc: '170 XP ve üzeri kazandın' },
    hedef:    { name: 'Keskin Nişancı', desc: '10 soru veya fazlasını doğru yaptın' },
    muhtesem: { name: 'Süper Seri', desc: '3\'lü seri yaptın' },
    efsane:   { name: 'Efsane', desc: '5\'li seri yaptın' },
    akilli:   { name: 'Akıllı Kaşif', desc: 'Hiç güç kullanmadan bitirdin' },
    kahraman: { name: 'Pes Etmeyen', desc: '2. denemede doğru yaptın' },
    hizli:    { name: 'Şimşek Hız', desc: '5 saniyeden az sürede cevapladın' },
    kalpli:   { name: 'Gerçek Kahraman', desc: 'Quiz\'i tamamladın' },
  },
  en: {
    perfect:  { name: 'Perfect', desc: 'Answered every question correctly' },
    harika:   { name: 'Great', desc: '80% or more correct' },
    uzman:    { name: 'Expert', desc: 'Earned 170 XP or more' },
    hedef:    { name: 'Sharpshooter', desc: 'Answered 10 or more questions correctly' },
    muhtesem: { name: 'Super Streak', desc: 'Got a 3-in-a-row streak' },
    efsane:   { name: 'Legend', desc: 'Got a 5-in-a-row streak' },
    akilli:   { name: 'Smart Explorer', desc: 'Finished without using any power' },
    kahraman: { name: 'Never Gives Up', desc: 'Got it right on the second try' },
    hizli:    { name: 'Lightning Speed', desc: 'Answered in under 5 seconds' },
    kalpli:   { name: 'True Hero', desc: 'Completed the quiz' },
  },
  zh: {
    perfect:  { name: '完美', desc: '答对了所有题目' },
    harika:   { name: '出色', desc: '答对 80% 或以上' },
    uzman:    { name: '专家', desc: '获得 170 XP 或以上' },
    hedef:    { name: '神射手', desc: '答对 10 题或以上' },
    muhtesem: { name: '超级连击', desc: '达成 3 连击' },
    efsane:   { name: '传奇', desc: '达成 5 连击' },
    akilli:   { name: '聪明探险家', desc: '没用任何超能力就完成' },
    kahraman: { name: '永不放弃', desc: '第二次尝试答对' },
    hizli:    { name: '闪电速度', desc: '5 秒内作答' },
    kalpli:   { name: '真正的英雄', desc: '完成了测验' },
  },
};
export const getBadgeDefs = (lang: Lang): Record<string, BadgeDef> => {
  const out: Record<string, BadgeDef> = {};
  for (const id of Object.keys(BADGE_BASE)) {
    out[id] = { id, emoji: BADGE_BASE[id].emoji, color: BADGE_BASE[id].color, name: BADGE_TEXT[lang][id].name, desc: BADGE_TEXT[lang][id].desc };
  }
  return out;
};
export function computeBadges(lang: Lang, s: BadgeEarnedInput): BadgeDef[] {
  const B = getBadgeDefs(lang);
  const badges: BadgeDef[] = [];
  if (s.completed) badges.push(B.kalpli);
  if (s.pct === 100) badges.push(B.perfect);
  if (s.pct >= 80) badges.push(B.harika);
  if (s.totalXp >= 170) badges.push(B.uzman);
  if (s.correct >= 10) badges.push(B.hedef);
  if (s.bestStreak >= 3) badges.push(B.muhtesem);
  if (s.bestStreak >= 5) badges.push(B.efsane);
  if (s.powerUpsUsed === 0 && s.correct >= 8) badges.push(B.akilli);
  if (s.retrySuccess) badges.push(B.kahraman);
  if (s.fastestMs !== null && s.fastestMs < 5000) badges.push(B.hizli);
  return Array.from(new Map(badges.map(b => [b.id, b])).values());
}

// ─────────────────────────────────────────────
// HIZ BONUSU
// ─────────────────────────────────────────────
const SPEED_LABEL: Record<Lang, { fast: string; good: string }> = {
  tr: { fast: '⚡ HIZLI', good: '🏁 İYİ ZAMAN' },
  en: { fast: '⚡ FAST', good: '🏁 GOOD TIME' },
  zh: { fast: '⚡ 快速', good: '🏁 不错' },
};
export function getSpeedBonus(lang: Lang, ms: number): { xp: number; label: string | null } {
  if (ms < 3000) return { xp: 5, label: SPEED_LABEL[lang].fast };
  if (ms < 6000) return { xp: 3, label: SPEED_LABEL[lang].good };
  return { xp: 0, label: null };
}
