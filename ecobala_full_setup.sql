-- ============================================================
--  COMPLETE ECOBALA SETUP — Auth + Game System
--  Копируй ВСЕ содержимое и вставь в Supabase → SQL Editor
--  Выполни ВСЕ вместе, не по частям!
-- ============================================================

-- ═══════════════════════════════════════════════════════════
--  ТАБЛИЦА: ПОЛЬЗОВАТЕЛИ (Auth profiles)
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.users (
  id                UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email             TEXT UNIQUE,
  role              TEXT NOT NULL CHECK (role IN ('kids','teen','teacher')),
  full_name         TEXT,
  child_name        TEXT,
  child_surname     TEXT,
  nickname          TEXT,
  age               INT,
  class             TEXT,
  school            TEXT,
  parent_phone      TEXT,
  points            INT DEFAULT 0,
  level             INT DEFAULT 1,
  badges            JSONB DEFAULT '[]',
  is_active         BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════
--  ТАБЛИЦА: УЧИТЕЛИ
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.teachers (
  id               UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name        TEXT NOT NULL,
  email            TEXT UNIQUE,
  school_name      TEXT,
  subject          TEXT,
  is_verified      BOOLEAN DEFAULT FALSE,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════
--  ТАБЛИЦА: ИГРОВЫЕ КОМНАТЫ
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.ecogame_rooms (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code          CHAR(6) NOT NULL UNIQUE,
  title         TEXT NOT NULL,
  teacher_id    UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  teacher_name  TEXT,
  status        TEXT NOT NULL DEFAULT 'lobby' CHECK (status IN ('lobby','active','finished')),
  current_q     INT DEFAULT 0,
  q_started_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  started_at    TIMESTAMPTZ,
  finished_at   TIMESTAMPTZ
);

-- ═══════════════════════════════════════════════════════════
--  ТАБЛИЦА: ВОПРОСЫ
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.ecogame_questions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id     UUID NOT NULL REFERENCES public.ecogame_rooms(id) ON DELETE CASCADE,
  position    INT NOT NULL DEFAULT 0,
  q_type      TEXT NOT NULL DEFAULT 'text' CHECK (q_type IN ('text','image','video')),
  question    TEXT NOT NULL,
  media_url   TEXT,
  time_sec    INT NOT NULL DEFAULT 20 CHECK (time_sec BETWEEN 5 AND 120),
  points      INT NOT NULL DEFAULT 1000,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════
--  ТАБЛИЦА: ВАРИАНТЫ ОТВЕТОВ
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.ecogame_options (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.ecogame_questions(id) ON DELETE CASCADE,
  position    INT NOT NULL DEFAULT 0,
  text        TEXT NOT NULL,
  is_correct  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════
--  ТАБЛИЦА: УЧАСТНИКИ ИГРЫ
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.ecogame_participants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id     UUID NOT NULL REFERENCES public.ecogame_rooms(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES public.users(id) ON DELETE SET NULL,
  nickname    TEXT NOT NULL,
  avatar_emoji TEXT DEFAULT '🌱',
  role        TEXT NOT NULL DEFAULT 'player' CHECK (role IN ('player','teacher')),
  score       INT NOT NULL DEFAULT 0,
  rank        INT,
  is_online   BOOLEAN DEFAULT TRUE,
  joined_at   TIMESTAMPTZ DEFAULT NOW(),
  last_seen   TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════
--  ТАБЛИЦА: ОТВЕТЫ ИГРОКОВ
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.ecogame_answers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id         UUID NOT NULL REFERENCES public.ecogame_rooms(id) ON DELETE CASCADE,
  question_id     UUID NOT NULL REFERENCES public.ecogame_questions(id) ON DELETE CASCADE,
  participant_id  UUID NOT NULL REFERENCES public.ecogame_participants(id) ON DELETE CASCADE,
  option_id       UUID REFERENCES public.ecogame_options(id),
  is_correct      BOOLEAN DEFAULT FALSE,
  answered_in_ms  INT,
  points_earned   INT DEFAULT 0,
  answered_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(question_id, participant_id)
);

-- ═══════════════════════════════════════════════════════════
--  ТАБЛИЦА: ФИНАЛЬНЫЙ РЕЙТИНГ
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.ecogame_leaderboard (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id        UUID NOT NULL REFERENCES public.ecogame_rooms(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL REFERENCES public.ecogame_participants(id) ON DELETE CASCADE,
  nickname       TEXT NOT NULL,
  avatar_emoji   TEXT DEFAULT '🌱',
  total_score    INT NOT NULL DEFAULT 0,
  correct_count  INT NOT NULL DEFAULT 0,
  rank           INT NOT NULL,
  badge_points   INT NOT NULL DEFAULT 0,
  UNIQUE(room_id, participant_id)
);

-- ═══════════════════════════════════════════════════════════
--  INDEXES для производительности
-- ═══════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_teachers_email ON public.teachers(email);
CREATE INDEX IF NOT EXISTS idx_ecogame_rooms_code ON public.ecogame_rooms(code);
CREATE INDEX IF NOT EXISTS idx_ecogame_rooms_teacher_id ON public.ecogame_rooms(teacher_id);
CREATE INDEX IF NOT EXISTS idx_ecogame_questions_room_id ON public.ecogame_questions(room_id);
CREATE INDEX IF NOT EXISTS idx_ecogame_options_question_id ON public.ecogame_options(question_id);
CREATE INDEX IF NOT EXISTS idx_ecogame_participants_room_id ON public.ecogame_participants(room_id);
CREATE INDEX IF NOT EXISTS idx_ecogame_participants_user_id ON public.ecogame_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_ecogame_answers_room_id ON public.ecogame_answers(room_id);
CREATE INDEX IF NOT EXISTS idx_ecogame_answers_participant_id ON public.ecogame_answers(participant_id);

-- ═══════════════════════════════════════════════════════════
--  ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════

-- Users table — только сам юзер может видеть свой профиль
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_profile" ON public.users 
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_insert_own" ON public.users 
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Teachers table — открытый доступ на чтение
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "teachers_public_read" ON public.teachers 
  FOR SELECT USING (TRUE);
CREATE POLICY "teachers_own_edit" ON public.teachers 
  FOR UPDATE USING (auth.uid() = id);

-- EcoGame rooms — любой может читать активные комнаты
ALTER TABLE public.ecogame_rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rooms_public_read" ON public.ecogame_rooms 
  FOR SELECT USING (TRUE);
CREATE POLICY "rooms_teacher_insert" ON public.ecogame_rooms 
  FOR INSERT WITH CHECK (auth.uid() = teacher_id);

-- Questions — любой может читать вопросы
ALTER TABLE public.ecogame_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "questions_public_read" ON public.ecogame_questions 
  FOR SELECT USING (TRUE);

-- Options — любой может читать варианты
ALTER TABLE public.ecogame_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "options_public_read" ON public.ecogame_options 
  FOR SELECT USING (TRUE);

-- Participants — публичный доступ
ALTER TABLE public.ecogame_participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "participants_public_read" ON public.ecogame_participants 
  FOR SELECT USING (TRUE);
CREATE POLICY "participants_insert" ON public.ecogame_participants 
  FOR INSERT WITH CHECK (TRUE);

-- Answers — публичный доступ для синхронизации
ALTER TABLE public.ecogame_answers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "answers_public_read" ON public.ecogame_answers 
  FOR SELECT USING (TRUE);
CREATE POLICY "answers_insert" ON public.ecogame_answers 
  FOR INSERT WITH CHECK (TRUE);

-- Leaderboard — публичный доступ
ALTER TABLE public.ecogame_leaderboard ENABLE ROW LEVEL SECURITY;
CREATE POLICY "leaderboard_public_read" ON public.ecogame_leaderboard 
  FOR SELECT USING (TRUE);
