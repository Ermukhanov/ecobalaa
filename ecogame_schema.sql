-- ============================================================
--  EcoGame — Supabase PostgreSQL Schema
--  Platform: EcoBala (ecobalakz.vercel.app)
--  Version: 1.0 | 2026
-- ============================================================

-- ─────────────────────────────────────────────
--  1. GAME ROOMS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ecogame_rooms (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code          CHAR(6) NOT NULL UNIQUE,          -- join code, e.g. "AX7B2Q"
  title         TEXT NOT NULL,
  teacher_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  teacher_name  TEXT,
  status        TEXT NOT NULL DEFAULT 'lobby'     -- lobby | active | finished
                CHECK (status IN ('lobby','active','finished')),
  current_q     INT  DEFAULT 0,                   -- index of current question (0-based)
  q_started_at  TIMESTAMPTZ,                      -- when current question started
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  started_at    TIMESTAMPTZ,
  finished_at   TIMESTAMPTZ
);

-- ─────────────────────────────────────────────
--  2. QUESTIONS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ecogame_questions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id     UUID NOT NULL REFERENCES ecogame_rooms(id) ON DELETE CASCADE,
  position    INT  NOT NULL DEFAULT 0,            -- order index
  q_type      TEXT NOT NULL DEFAULT 'text'
              CHECK (q_type IN ('text','image','video')),
  question    TEXT NOT NULL,
  media_url   TEXT,                               -- image or video URL
  time_sec    INT  NOT NULL DEFAULT 20            -- seconds to answer
              CHECK (time_sec BETWEEN 5 AND 120),
  points      INT  NOT NULL DEFAULT 1000,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
--  3. ANSWER OPTIONS (4 per question)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ecogame_options (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES ecogame_questions(id) ON DELETE CASCADE,
  position    INT  NOT NULL DEFAULT 0,            -- 0-3
  text        TEXT NOT NULL,
  is_correct  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
--  4. PARTICIPANTS (players in a room)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ecogame_participants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id     UUID NOT NULL REFERENCES ecogame_rooms(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES auth.users(id),    -- NULL = anonymous guest
  nickname    TEXT NOT NULL,
  avatar_emoji TEXT DEFAULT '🌱',
  role        TEXT NOT NULL DEFAULT 'player'
              CHECK (role IN ('player','teacher')),
  score       INT  NOT NULL DEFAULT 0,
  rank        INT,                               -- filled at game end
  is_online   BOOLEAN DEFAULT TRUE,
  joined_at   TIMESTAMPTZ DEFAULT NOW(),
  last_seen   TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
--  5. PLAYER ANSWERS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ecogame_answers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id         UUID NOT NULL REFERENCES ecogame_rooms(id) ON DELETE CASCADE,
  question_id     UUID NOT NULL REFERENCES ecogame_questions(id) ON DELETE CASCADE,
  participant_id  UUID NOT NULL REFERENCES ecogame_participants(id) ON DELETE CASCADE,
  option_id       UUID REFERENCES ecogame_options(id),  -- NULL = time expired
  is_correct      BOOLEAN DEFAULT FALSE,
  answered_in_ms  INT,                           -- response time in milliseconds
  points_earned   INT DEFAULT 0,
  answered_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(question_id, participant_id)
);

-- ─────────────────────────────────────────────
--  6. FINAL SCORES LEADERBOARD (denormalized for speed)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ecogame_leaderboard (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id        UUID NOT NULL REFERENCES ecogame_rooms(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL REFERENCES ecogame_participants(id) ON DELETE CASCADE,
  nickname       TEXT NOT NULL,
  avatar_emoji   TEXT DEFAULT '🌱',
  total_score    INT  NOT NULL DEFAULT 0,
  correct_count  INT  NOT NULL DEFAULT 0,
  rank           INT  NOT NULL,
  badge_points   INT  NOT NULL DEFAULT 0,        -- 100/50/20 for top 3
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
--  7. REVIEWS (post-game feedback)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ecogame_reviews (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id        UUID REFERENCES ecogame_rooms(id) ON DELETE SET NULL,
  participant_id UUID REFERENCES ecogame_participants(id) ON DELETE SET NULL,
  nickname       TEXT,
  avatar_emoji   TEXT DEFAULT '🌱',
  rating         INT  NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment        TEXT,
  is_public      BOOLEAN DEFAULT TRUE,
  platform       TEXT DEFAULT 'ecogame',          -- for future platform reviews
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
--  INDEXES for performance
-- ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_rooms_code        ON ecogame_rooms(code);
CREATE INDEX IF NOT EXISTS idx_rooms_teacher     ON ecogame_rooms(teacher_id);
CREATE INDEX IF NOT EXISTS idx_questions_room    ON ecogame_questions(room_id, position);
CREATE INDEX IF NOT EXISTS idx_options_question  ON ecogame_options(question_id, position);
CREATE INDEX IF NOT EXISTS idx_participants_room ON ecogame_participants(room_id);
CREATE INDEX IF NOT EXISTS idx_answers_room      ON ecogame_answers(room_id, question_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_room  ON ecogame_leaderboard(room_id, rank);
CREATE INDEX IF NOT EXISTS idx_reviews_public    ON ecogame_reviews(is_public, created_at DESC);

-- ─────────────────────────────────────────────
--  ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────
ALTER TABLE ecogame_rooms        ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecogame_questions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecogame_options      ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecogame_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecogame_answers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecogame_leaderboard  ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecogame_reviews      ENABLE ROW LEVEL SECURITY;

-- Rooms: anyone can read, only teachers can write
CREATE POLICY "rooms_read_all"   ON ecogame_rooms FOR SELECT USING (true);
CREATE POLICY "rooms_teacher_ins" ON ecogame_rooms FOR INSERT WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "rooms_teacher_upd" ON ecogame_rooms FOR UPDATE USING (auth.uid() = teacher_id);

-- Questions: public read, teacher write
CREATE POLICY "q_read_all" ON ecogame_questions FOR SELECT USING (true);
CREATE POLICY "q_teacher_write" ON ecogame_questions FOR ALL
  USING (EXISTS (SELECT 1 FROM ecogame_rooms r WHERE r.id = room_id AND r.teacher_id = auth.uid()));

-- Options: public read, teacher write
CREATE POLICY "opt_read_all" ON ecogame_options FOR SELECT USING (true);
CREATE POLICY "opt_teacher_write" ON ecogame_options FOR ALL
  USING (EXISTS (
    SELECT 1 FROM ecogame_questions q
    JOIN ecogame_rooms r ON r.id = q.room_id
    WHERE q.id = question_id AND r.teacher_id = auth.uid()
  ));

-- Participants: public read, insert for authenticated
CREATE POLICY "part_read_all"    ON ecogame_participants FOR SELECT USING (true);
CREATE POLICY "part_insert"      ON ecogame_participants FOR INSERT WITH CHECK (true);
CREATE POLICY "part_update_self" ON ecogame_participants FOR UPDATE USING (user_id = auth.uid() OR user_id IS NULL);

-- Answers: public read in same room, player inserts own
CREATE POLICY "ans_read_all"     ON ecogame_answers FOR SELECT USING (true);
CREATE POLICY "ans_insert"       ON ecogame_answers FOR INSERT WITH CHECK (true);

-- Leaderboard: public read, system write
CREATE POLICY "lb_read_all"      ON ecogame_leaderboard FOR SELECT USING (true);
CREATE POLICY "lb_insert"        ON ecogame_leaderboard FOR INSERT WITH CHECK (true);

-- Reviews: public read of public reviews
CREATE POLICY "rev_read_public"  ON ecogame_reviews FOR SELECT USING (is_public = true);
CREATE POLICY "rev_insert"       ON ecogame_reviews FOR INSERT WITH CHECK (true);

-- ─────────────────────────────────────────────
--  REALTIME — enable for live game sync
-- ─────────────────────────────────────────────
-- Run in Supabase Dashboard → Database → Replication:
-- ALTER PUBLICATION supabase_realtime ADD TABLE ecogame_rooms;
-- ALTER PUBLICATION supabase_realtime ADD TABLE ecogame_participants;
-- ALTER PUBLICATION supabase_realtime ADD TABLE ecogame_answers;
-- ALTER PUBLICATION supabase_realtime ADD TABLE ecogame_leaderboard;

-- ─────────────────────────────────────────────
--  HELPER: generate 6-char room code
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION generate_room_code()
RETURNS CHAR(6) LANGUAGE plpgsql AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  code  CHAR(6) := '';
  i     INT;
BEGIN
  FOR i IN 1..6 LOOP
    code := code || substr(chars, floor(random() * length(chars) + 1)::INT, 1);
  END LOOP;
  RETURN code;
END;
$$;

-- ─────────────────────────────────────────────
--  HELPER: calculate points with speed bonus
--  max_points * (remaining_time / total_time) * 0.5 + max_points * 0.5
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION calc_points(
  max_pts    INT,
  answered_ms INT,
  time_sec   INT
) RETURNS INT LANGUAGE plpgsql AS $$
BEGIN
  IF answered_ms IS NULL THEN RETURN 0; END IF;
  RETURN GREATEST(
    (max_pts * 0.5)::INT,
    (max_pts * (1.0 - (answered_ms::FLOAT / (time_sec * 1000)) * 0.5))::INT
  );
END;
$$;

-- ─────────────────────────────────────────────
--  BADGE POINTS TABLE (for user profiles)
-- ─────────────────────────────────────────────
-- These are added to the users' main score in your existing tables.
-- 1st place → +100 pts | 2nd place → +50 pts | 3rd place → +20 pts
COMMENT ON COLUMN ecogame_leaderboard.badge_points IS
  '1st=100, 2nd=50, 3rd=20 — add to profile score';
