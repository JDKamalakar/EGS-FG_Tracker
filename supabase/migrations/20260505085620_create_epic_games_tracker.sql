/*
  # Epic Games Free Games Tracker

  1. New Tables
    - `game_ownership`
      - `id` (uuid, primary key)
      - `game_slug` (text) - unique identifier for a game title (slugified name)
      - `game_name` (text) - display name of the game
      - `owned_date` (date) - date user marked as owned
      - `user_session_id` (text) - anonymous session identifier for tracking
      - `created_at` (timestamptz)

  2. Notes
    - Uses anonymous session-based tracking (no auth required)
    - game_slug is a normalized key so the same game appearing multiple times
      in the free games list shares ownership status
    - UNIQUE constraint on (game_slug, user_session_id) prevents duplicate ownership entries
    - RLS restricts each session to only see/modify their own records

  3. Security
    - RLS enabled
    - Policies allow session-based access only
*/

CREATE TABLE IF NOT EXISTS game_ownership (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_slug text NOT NULL,
  game_name text NOT NULL,
  owned_date date NOT NULL DEFAULT CURRENT_DATE,
  user_session_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (game_slug, user_session_id)
);

ALTER TABLE game_ownership ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own ownership records"
  ON game_ownership FOR SELECT
  TO anon, authenticated
  USING (user_session_id = current_setting('request.headers', true)::json->>'x-session-id');

CREATE POLICY "Users can insert own ownership records"
  ON game_ownership FOR INSERT
  TO anon, authenticated
  WITH CHECK (user_session_id = current_setting('request.headers', true)::json->>'x-session-id');

CREATE POLICY "Users can delete own ownership records"
  ON game_ownership FOR DELETE
  TO anon, authenticated
  USING (user_session_id = current_setting('request.headers', true)::json->>'x-session-id');

CREATE INDEX IF NOT EXISTS idx_game_ownership_session ON game_ownership(user_session_id);
CREATE INDEX IF NOT EXISTS idx_game_ownership_slug ON game_ownership(game_slug);
