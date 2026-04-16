# 🚀 Teknoloji Quest

9-10 yaş için **sunum + gamified quiz** platformu.  
Next.js 14 · Supabase · Vercel

---

## 📁 Proje Yapısı

```
tekno-quest/
├── app/
│   ├── page.tsx              ← Portal (3 sunum kartı + liderboard)
│   ├── sunum/[version]/      ← Sunum görüntüleyici (iframe)
│   ├── quiz/[version]/       ← Quiz (isim giriş → sorular → sonuç)
│   └── liderboard/           ← Canlı liderboard
├── lib/
│   ├── supabase.ts           ← Supabase istemci + fonksiyonlar
│   └── questions.ts          ← 10 quiz sorusu (MCQ, T/F, Eşleştirme)
├── public/                   ← HTML sunumları buraya kopyalanır
│   ├── sunum-v1-cizgifilm.html
│   ├── sunum-v2-uzay.html
│   └── sunum-v3-oyun.html
└── supabase/
    └── schema.sql            ← Veritabanı şeması
```

---

## ⚡ Kurulum (5 Adım)

### 1. Supabase Projesi Oluştur
1. [supabase.com](https://supabase.com) → Yeni proje oluştur
2. **SQL Editor** → `supabase/schema.sql` dosyasını yapıştır → Çalıştır
3. **Database > Replication** → `quiz_results` tablosunu etkinleştir (Realtime için)
4. **Settings > API** → `URL` ve `anon key`'i kopyala

### 2. Ortam Değişkenlerini Ayarla
```bash
cp .env.local.example .env.local
```
`.env.local` dosyasını düzenle:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 3. HTML Sunumlarını Kopyala
Sunumları `public/` klasörüne kopyala:
```bash
cp sunum-v1-cizgifilm.html public/
cp sunum-v2-uzay.html public/
cp sunum-v3-oyun.html public/
```

### 4. Bağımlılıkları Yükle
```bash
npm install
```

### 5. Geliştirme Sunucusunu Başlat
```bash
npm run dev
```
Tarayıcıda → [http://localhost:3000](http://localhost:3000)

---

## 🚀 Vercel'e Deploy

### Seçenek A: GitHub üzerinden (önerilen)
1. Projeyi GitHub'a push'la
2. [vercel.com](https://vercel.com) → "New Project" → GitHub repo seç
3. Environment Variables ekle:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Seçenek B: Vercel CLI
```bash
npm i -g vercel
vercel
# Sorulara cevap ver, env değişkenlerini ekle
```

---

## 🎮 Kullanım Rehberi

### Öğretmen için:
1. Siteyi projeksiyonda aç → Sunum temasını seç → "Sunumu Başlat"
2. Sunumu anlatırken öğrenciler telefonlarıyla URL'yi açar
3. Sunum bittikten sonra → "Quize Geç" butonuna tıkla
4. Öğrenciler isimlerini yazarak quize katılır
5. Liderboard'u projeksiyona yansıt → Gerçek zamanlı güncellenir! 🏆

### Öğrenci için:
1. Öğretmenin verdiği URL'yi aç
2. İsmini yaz → Başla
3. 10 soruyu cevapla (MCQ + Doğru/Yanlış + Eşleştirme)
4. XP kazan, liderboard'da yerini gör!

---

## 📊 Quiz Soruları

| # | Tür | Konu | XP |
|---|-----|------|----|
| 1 | MCQ | İnternetin doğuşu (1969) | 10 |
| 2 | MCQ | Türkiye'de internet (ODTÜ, 1993) | 10 |
| 3 | MCQ | WWW'nin icadı (Tim Berners-Lee) | 15 |
| 4 | MCQ | 5G hızı | 15 |
| 5 | MCQ | Yapay zekanın öğrenmesi | 10 |
| 6 | T/F | İnternet sırası (önce üniversite) | 10 |
| 7 | T/F | 1G'de internet yoktu | 10 |
| 8 | T/F | YZ telefonda çalışır | 10 |
| 9 | Eşleştirme | Yıl-Olay (1969-1991-1993-1996) | 20 |
| 10 | MCQ | YZ asistanı hangisi değil? | 10 |

**Toplam: 110 XP**

---

## 🛠 Teknik Detaylar

- **Framework:** Next.js 14 (App Router)
- **Veritabanı:** Supabase (PostgreSQL)
- **Realtime:** Supabase Realtime (WebSocket)
- **Stil:** Tailwind CSS + özel CSS değişkenleri
- **Font:** Chakra Petch (başlık) + Exo 2 (gövde) — Türkçe tam destek
- **Deploy:** Vercel (tek tıkla)

---

## 📝 Sorular Nasıl Eklenir?

`lib/questions.ts` dosyasını düzenle:

```typescript
// MCQ (Çoktan seçmeli)
{
  id: 11, type: 'mcq',
  text: 'Soru metni?',
  options: ['A', 'B', 'C', 'D'],
  correct: 'B',
  explanation: 'Açıklama metni',
  xp: 10,
}

// T/F (Doğru/Yanlış)
{
  id: 12, type: 'tf',
  text: 'Doğru mu yanlış mı?',
  correct: 'true', // veya 'false'
  explanation: 'Açıklama',
  xp: 10,
}

// Match (Eşleştirme)
{
  id: 13, type: 'match',
  text: 'Eşleştir!',
  pairs: [
    { left: 'Sol 1', right: 'Sağ 1' },
    { left: 'Sol 2', right: 'Sağ 2' },
  ],
  explanation: 'Açıklama',
  xp: 20,
}
```

---

## 🎨 Sunum Temaları

| URL | Tema |
|-----|------|
| `/sunum/v1` | 🎨 Renkli & Çizgi Film (Baloo 2 font) |
| `/sunum/v2` | 🚀 Uzay & Fütüristik (Exo 2 font) |
| `/sunum/v3` | 🎮 Oyun Tarzı (Chakra Petch font) |

Quiz URL: `/quiz/v1`, `/quiz/v2`, `/quiz/v3`  
Liderboard: `/liderboard`
