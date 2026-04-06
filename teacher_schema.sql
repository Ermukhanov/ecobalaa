-- ============================================================
--  EcoBala Teachers & Schools — Supabase PostgreSQL Schema
--  Teachers authentication & management
--  Version: 1.0 | 2026
-- ============================================================

-- ─────────────────────────────────────────────
--  SCHOOLS TABLE
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS schools (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL UNIQUE,
  region        TEXT,                           -- регион, область
  city          TEXT,
  address       TEXT,
  phone         TEXT,
  email         TEXT,
  website       TEXT,
  established_year INT,
  student_count INT,
  logo_url      TEXT,
  status        TEXT DEFAULT 'active',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
--  TEACHERS TABLE
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS teachers (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name      TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT,
  school_id      UUID REFERENCES schools(id) ON DELETE SET NULL,
  school_name    TEXT,                         -- fallback if school not in DB
  subject        TEXT DEFAULT 'Экология',      -- teaching subject
  bio            TEXT,
  avatar_url     TEXT,
  status         TEXT DEFAULT 'active'
                 CHECK (status IN ('active','inactive','banned')),
  verification_status  TEXT DEFAULT 'pending'
                 CHECK (verification_status IN ('pending','verified','rejected')),
  verified_at    TIMESTAMPTZ,
  last_login     TIMESTAMPTZ,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email, school_id)
);

-- ─────────────────────────────────────────────
--  TEACHER GAMES (track created games)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS teacher_games (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id     UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  room_id        UUID NOT NULL REFERENCES ecogame_rooms(id) ON DELETE CASCADE,
  template_name  TEXT,
  students_count INT DEFAULT 0,
  duration_sec   INT,
  is_published   BOOLEAN DEFAULT FALSE,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  ended_at       TIMESTAMPTZ
);

-- ─────────────────────────────────────────────
--  TEACHER ANALYTICS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS teacher_stats (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id     UUID NOT NULL UNIQUE REFERENCES teachers(id) ON DELETE CASCADE,
  total_games    INT DEFAULT 0,
  total_students INT DEFAULT 0,
  avg_score      DECIMAL(5,2) DEFAULT 0,
  games_this_month INT DEFAULT 0,
  last_game_date TIMESTAMPTZ,
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
--  INDEXES FOR PERFORMANCE
-- ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_teachers_user_id ON teachers(user_id);
CREATE INDEX IF NOT EXISTS idx_teachers_school_id ON teachers(school_id);
CREATE INDEX IF NOT EXISTS idx_teachers_email ON teachers(email);
CREATE INDEX IF NOT EXISTS idx_teacher_games_teacher_id ON teacher_games(teacher_id);
CREATE INDEX IF NOT EXISTS idx_teacher_games_room_id ON teacher_games(room_id);
CREATE INDEX IF NOT EXISTS idx_schools_city ON schools(city);

-- ─────────────────────────────────────────────
--  DEFAULT SCHOOLS DATA
-- ─────────────────────────────────────────────
INSERT INTO schools (name, city, region) VALUES
('СШ №1 г. Астана', 'Астана', 'Акмола'),
('СШ №2 г. Алматы', 'Алматы', 'Алматы город'),
('Лицей имени В.В.Маяковского', 'Алматы', 'Алматы город'),
('Международная школа NUrica', 'Нур-Султан', 'Акмола'),
('СШ №15 "Природа"', 'Караганда', 'Карагандинская'),
('Гимназия №5', 'Шымкент', 'Түркістан'),
('Bilingual School Aktobe', 'Актобе', 'Актюбинская'),
('Школа "Гимназия творческого развития"', 'Павлодар', 'Павлодарская')
ON CONFLICT (name) DO NOTHING;

-- ─────────────────────────────────────────────
--  RLS POLICIES FOR SECURITY
-- ─────────────────────────────────────────────

-- Teachers can read schools
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "schools_readable_to_all" ON schools
  FOR SELECT USING (true);

-- Teachers can only see their own profile
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "teachers_own_profile" ON teachers
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "teachers_insert_own" ON teachers
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "teachers_update_own" ON teachers
  FOR UPDATE USING (auth.uid() = user_id);

-- Games are readable by teacher
CREATE POLICY "teacher_games_own" ON teacher_games
  FOR SELECT USING (
    teacher_id = (SELECT id FROM teachers WHERE user_id = auth.uid())
  );

-- Stats are readable by teacher
CREATE POLICY "teacher_stats_own" ON teacher_stats
  FOR SELECT USING (
    teacher_id = (SELECT id FROM teachers WHERE user_id = auth.uid())
  );

-- ─────────────────────────────────────────────
--  FUNCTIONS & TRIGGERS
-- ─────────────────────────────────────────────

-- Auto-create teacher_stats when teacher is created
CREATE OR REPLACE FUNCTION create_teacher_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO teacher_stats (teacher_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS teacher_stats_trigger ON teachers;
CREATE TRIGGER teacher_stats_trigger
  AFTER INSERT ON teachers
  FOR EACH ROW
  EXECUTE FUNCTION create_teacher_stats();

-- Update teacher last_login
CREATE OR REPLACE FUNCTION update_teacher_login()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE teachers SET last_login = NOW()
  WHERE user_id = auth.uid();
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- ─────────────────────────────────────────────
--  VIEWS FOR ANALYTICS
-- ─────────────────────────────────────────────

CREATE OR REPLACE VIEW teacher_leaderboard AS
SELECT 
  t.id,
  t.full_name,
  t.email,
  t.school_name,
  COUNT(DISTINCT tg.id) as total_games,
  COUNT(DISTINCT ep.id) as total_players,
  TRUNC(AVG(CAST(ep.score AS DECIMAL)), 2) as avg_student_score,
  COUNT(DISTINCT CASE WHEN tg.created_at > NOW() - INTERVAL '30 days' THEN tg.id END) as games_month
FROM teachers t
LEFT JOIN teacher_games tg ON t.id = tg.teacher_id
LEFT JOIN ecogame_rooms er ON tg.room_id = er.id
LEFT JOIN ecogame_participants ep ON er.id = ep.room_id
WHERE t.status = 'active'
GROUP BY t.id
ORDER BY total_games DESC;

-- ─────────────────────────────────────────────
--  SAMPLE SQL FOR OPERATIONS
-- ─────────────────────────────────────────────

/*
-- Get teacher's games
SELECT tg.*, er.code, er.status, COUNT(DISTINCT ep.id) as players
FROM teacher_games tg
JOIN ecogame_rooms er ON tg.room_id = er.id
LEFT JOIN ecogame_participants ep ON er.id = ep.room_id
WHERE tg.teacher_id = $1
GROUP BY tg.id, er.id
ORDER BY tg.created_at DESC;

-- Update teacher stats
UPDATE teacher_stats
SET total_games = (SELECT COUNT(*) FROM teacher_games WHERE teacher_id = $1),
    last_game_date = (SELECT MAX(created_at) FROM teacher_games WHERE teacher_id = $1)
WHERE teacher_id = $1;

-- Get school list with teacher count
SELECT s.id, s.name, COUNT(DISTINCT t.id) as teacher_count
FROM schools s
LEFT JOIN teachers t ON s.id = t.school_id
GROUP BY s.id
ORDER BY teacher_count DESC;
*/
