-- ============================================================
-- Teknoloji Quest — Supabase Schema
-- Supabase Dashboard > SQL Editor'de çalıştır
-- ============================================================

-- UUID extension (genellikle zaten aktif)
create extension if not exists "uuid-ossp";

-- ─── Quiz sonuçları tablosu ──────────────────────────────────
create table if not exists quiz_results (
  id                   uuid default uuid_generate_v4() primary key,
  player_name          text        not null,
  presentation_version text        not null check (presentation_version in ('v1','v2','v3')),
  score                integer     not null default 0,   -- % başarı (0-100)
  total_xp             integer     not null default 0,   -- kazanılan XP
  correct_count        integer     not null default 0,   -- doğru soru sayısı
  total_questions      integer     not null default 0,   -- toplam soru sayısı
  created_at           timestamptz default now()
);

-- ─── Row Level Security ──────────────────────────────────────
alter table quiz_results enable row level security;

-- Herkes okuyabilir (liderboard için)
create policy "Herkes okuyabilir"
  on quiz_results for select
  to anon
  using (true);

-- Herkes ekleyebilir (öğrenciler skor kaydeder)
create policy "Herkes ekleyebilir"
  on quiz_results for insert
  to anon
  with check (true);

-- Herkes silebilir (liderboard sıfırlama için — client'ta şifre ile korunur)
-- Güvenlik notu: Sınıf-içi oyun için yeterli. Hassas veri yok.
create policy "Herkes silebilir"
  on quiz_results for delete
  to anon
  using (true);

-- ─── Realtime aktif et ───────────────────────────────────────
-- Supabase Dashboard > Database > Replication bölümünden
-- "quiz_results" tablosunu etkinleştir
-- VEYA aşağıdaki komutu çalıştır:
alter publication supabase_realtime add table quiz_results;

-- ─── Test verisi (opsiyonel) ──────────────────────────────────
-- insert into quiz_results (player_name, presentation_version, score, total_xp, correct_count, total_questions)
-- values
--   ('Ahmet',  'v1', 90, 100, 9, 10),
--   ('Ayşe',   'v3', 80, 90,  8, 10),
--   ('Mehmet', 'v2', 70, 80,  7, 10);
