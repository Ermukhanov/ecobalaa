-- ============================================================
--  ECOGAME COMPLETE SETUP — Выполни этот скрипт целиком
--  Копируй ВСЕ содержимое и вставь в Supabase → SQL Editor
-- ============================================================

-- 🔴 ВАЖНО: Выполни это ВСЕ ВМЕСТЕ, не по частям!

-- ═══════════════════════════════════════════════════════════
--  ТАБЛИЦА 1: ИГРОВЫЕ КОМНАТЫ (основная)
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS ecogame_rooms (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code          CHAR(6) NOT NULL UNIQUE,
  title         TEXT NOT NULL,
  teacher_id    UUID NOT NULL,
  teacher_name  TEXT,
  status        TEXT NOT NULL DEFAULT 'lobby' CHECK (status IN ('lobby','active','finished')),
  current_q     INT DEFAULT 0,
  q_started_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  started_at    TIMESTAMPTZ,
  finished_at   TIMESTAMPTZ
);

-- ═══════════════════════════════════════════════════════════
--  ТАБЛИЦА 2: ВОПРОСЫ
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS ecogame_questions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id     UUID NOT NULL REFERENCES ecogame_rooms(id) ON DELETE CASCADE,
  position    INT NOT NULL DEFAULT 0,
  q_type      TEXT NOT NULL DEFAULT 'text' CHECK (q_type IN ('text','image','video')),
  question    TEXT NOT NULL,
  media_url   TEXT,
  time_sec    INT NOT NULL DEFAULT 20 CHECK (time_sec BETWEEN 5 AND 120),
  points      INT NOT NULL DEFAULT 1000,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════
--  ТАБЛИЦА 3: ВАРИАНТЫ ОТВЕТОВ
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS ecogame_options (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES ecogame_questions(id) ON DELETE CASCADE,
  position    INT NOT NULL DEFAULT 0,
  text        TEXT NOT NULL,
  is_correct  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════
--  ТАБЛИЦА 4: УЧАСТНИКИ ИГРЫ
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS ecogame_participants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id     UUID NOT NULL REFERENCES ecogame_rooms(id) ON DELETE CASCADE,
  user_id     UUID,
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
--  ТАБЛИЦА 5: ОТВЕТЫ ИГРОКОВ
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS ecogame_answers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id         UUID NOT NULL REFERENCES ecogame_rooms(id) ON DELETE CASCADE,
  question_id     UUID NOT NULL REFERENCES ecogame_questions(id) ON DELETE CASCADE,
  participant_id  UUID NOT NULL REFERENCES ecogame_participants(id) ON DELETE CASCADE,
  option_id       UUID REFERENCES ecogame_options(id),
  is_correct      BOOLEAN DEFAULT FALSE,
  answered_in_ms  INT,
  points_earned   INT DEFAULT 0,
  answered_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(question_id, participant_id)
);

-- ═══════════════════════════════════════════════════════════
--  ТАБЛИЦА 6: ФИНАЛЬНЫЙ РЕЙТИНГ
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS ecogame_leaderboard (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id        UUID NOT NULL REFERENCES ecogame_rooms(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL REFERENCES ecogame_participants(id) ON DELETE CASCADE,
  nickname       TEXT NOT NULL,
  avatar_emoji   TEXT DEFAULT '🌱',
  total_score    INT NOT NULL DEFAULT 0,
  correct_count  INT NOT NULL DEFAULT 0,
  rank           INT NOT NULL,
  badge_points   INT NOT NULL DEFAULT 0,
  UNIQUE(room_id, participant_id)
);

-- ═══════════════════════════════════════════════════════════
--  ИНДЕКСЫ для быстрого поиска
-- ═══════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_ecogame_rooms_code ON ecogame_rooms(code);
CREATE INDEX IF NOT EXISTS idx_ecogame_rooms_teacher ON ecogame_rooms(teacher_id);
CREATE INDEX IF NOT EXISTS idx_ecogame_rooms_status ON ecogame_rooms(status);
CREATE INDEX IF NOT EXISTS idx_questions_room ON ecogame_questions(room_id);
CREATE INDEX IF NOT EXISTS idx_options_question ON ecogame_options(question_id);
CREATE INDEX IF NOT EXISTS idx_participants_room ON ecogame_participants(room_id);
CREATE INDEX IF NOT EXISTS idx_answers_room ON ecogame_answers(room_id);
CREATE INDEX IF NOT EXISTS idx_answers_participant ON ecogame_answers(participant_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_room ON ecogame_leaderboard(room_id);

-- ═══════════════════════════════════════════════════════════
--  БАЗОВЫЕ ВОПРОСЫ ДЛЯ ТЕСТА (опционально)
-- ═══════════════════════════════════════════════════════════

-- Функция для генерации тестовой комнаты
CREATE OR REPLACE FUNCTION create_test_room()
RETURNS UUID AS $$
DECLARE
  room_id UUID;
  q1_id UUID;
  q2_id UUID;
BEGIN
  -- 1. Создаем комнату
  INSERT INTO ecogame_rooms (code, title, teacher_id, teacher_name, status)
  VALUES ('TEST01', 'Тестовая викторина', gen_random_uuid(), 'Test Teacher', 'lobby')
  RETURNING id INTO room_id;
  
  -- 2. Добавляем вопрос 1
  INSERT INTO ecogame_questions (room_id, position, question, time_sec, points)
  VALUES (room_id, 0, 'Сколько % поверхности Земли покрыто водой?', 15, 1000)
  RETURNING id INTO q1_id;
  
  -- 3. Добавляем варианты ответов для вопроса 1
  INSERT INTO ecogame_options (question_id, position, text, is_correct)
  VALUES
    (q1_id, 0, '50%', false),
    (q1_id, 1, '71%', true),
    (q1_id, 2, '90%', false),
    (q1_id, 3, '30%', false);
  
  -- 4. Добавляем вопрос 2
  INSERT INTO ecogame_questions (room_id, position, question, time_sec, points)
  VALUES (room_id, 1, 'Сколько % воды является пресной?', 15, 1000)
  RETURNING id INTO q2_id;
  
  -- 5. Добавляем варианты ответов для вопроса 2
  INSERT INTO ecogame_options (question_id, position, text, is_correct)
  VALUES
    (q2_id, 0, '10%', false),
    (q2_id, 1, '50%', false),
    (q2_id, 2, '3%', true),
    (q2_id, 3, '25%', false);
  
  RETURN room_id;
END;
$$ LANGUAGE plpgsql;

-- ═══════════════════════════════════════════════════════════
--  ДОПОЛНИТЕЛЬНЫЕ СОРТИРОВКИ И ТИПЫ
-- ═══════════════════════════════════════════════════════════

-- Представление для получения активных комнат
CREATE OR REPLACE VIEW active_rooms AS
SELECT 
  r.id,
  r.code,
  r.title,
  r.teacher_name,
  r.status,
  COUNT(DISTINCT p.id) as player_count,
  COUNT(DISTINCT q.id) as question_count
FROM ecogame_rooms r
LEFT JOIN ecogame_participants p ON r.id = p.room_id
LEFT JOIN ecogame_questions q ON r.id = q.room_id
WHERE r.status != 'finished'
GROUP BY r.id;

-- Представление для рейтинга игроков
CREATE OR REPLACE VIEW player_rankings AS
SELECT 
  p.room_id,
  p.id as participant_id,
  p.nickname,
  p.avatar_emoji,
  COUNT(DISTINCT CASE WHEN a.is_correct THEN 1 END) as correct_answers,
  COALESCE(SUM(a.points_earned), 0) as total_points,
  AVG(a.answered_in_ms) as avg_response_time,
  ROW_NUMBER() OVER (PARTITION BY p.room_id ORDER BY COALESCE(SUM(a.points_earned), 0) DESC) as rank
FROM ecogame_participants p
LEFT JOIN ecogame_answers a ON p.id = a.participant_id
GROUP BY p.id, p.room_id, p.nickname, p.avatar_emoji;

-- ═══════════════════════════════════════════════════════════
--  СЕКУРНОСТЬ: RLS (Row Level Security)
-- ═══════════════════════════════════════════════════════════

-- Включаем RLS для всех таблиц
ALTER TABLE ecogame_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecogame_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecogame_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecogame_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecogame_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecogame_leaderboard ENABLE ROW LEVEL SECURITY;

-- Политики доступа

-- 1. Комнаты: учител может видеть свои комнаты, дети видят только присоед
CREATE POLICY "rooms_select" ON ecogame_rooms
  FOR SELECT USING (true);

CREATE POLICY "rooms_insert" ON ecogame_rooms
  FOR INSERT WITH CHECK (teacher_id = auth.uid());

CREATE POLICY "rooms_update" ON ecogame_rooms
  FOR UPDATE USING (teacher_id = auth.uid());

-- 2. Вопросы: видимы для просмотра всем
CREATE POLICY "questions_select" ON ecogame_questions
  FOR SELECT USING (true);

-- 3. Опции: видимы для просмотра всем
CREATE POLICY "options_select" ON ecogame_options
  FOR SELECT USING (true);

-- 4. Участники: видны в своей комнате
CREATE POLICY "participants_select" ON ecogame_participants
  FOR SELECT USING (true);

CREATE POLICY "participants_insert" ON ecogame_participants
  FOR INSERT WITH CHECK (true);

-- 5. Ответы: игроки могут писать свои ответы
CREATE POLICY "answers_select" ON ecogame_answers
  FOR SELECT USING (true);

CREATE POLICY "answers_insert" ON ecogame_answers
  FOR INSERT WITH CHECK (true);

-- 6. Рейтинг таблица: видна всем
CREATE POLICY "leaderboard_select" ON ecogame_leaderboard
  FOR SELECT USING (true);

-- ═══════════════════════════════════════════════════════════
--  ЗАВЕРШЕНИЕ
-- ═══════════════════════════════════════════════════════════

-- Проверка: выбираем все таблицы
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE 'ecogame%'
ORDER BY tablename;

-- Готово! 🎮
COMMIT;
