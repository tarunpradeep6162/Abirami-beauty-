BEGIN;
CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE TABLE IF NOT EXISTS bookings (
 id uuid PRIMARY KEY,
 request_key uuid NOT NULL UNIQUE,
 request_hash text NOT NULL,
 client_name text NOT NULL,
 treatment text NOT NULL,
 resource text NOT NULL DEFAULT 'salon',
 starts_at timestamptz NOT NULL,
 ends_at timestamptz NOT NULL CHECK(ends_at>starts_at),
 state text NOT NULL DEFAULT 'pending' CHECK(state IN ('pending','confirmed','expired','review')),
 checkout_id text UNIQUE,
 deposit integer NOT NULL DEFAULT 100000 CHECK(deposit=100000),
 created_at timestamptz NOT NULL DEFAULT now(),
 EXCLUDE USING gist (resource WITH =, tstzrange(starts_at,ends_at,'[)') WITH &&) WHERE (state IN ('pending','confirmed','review'))
);
CREATE TABLE IF NOT EXISTS payment_events (id text PRIMARY KEY, received_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS brides (
 id uuid PRIMARY KEY,
 name text NOT NULL,
 notes text NOT NULL DEFAULT '',
 timeline jsonb NOT NULL DEFAULT '[]' CHECK(jsonb_typeof(timeline)='array')
);
CREATE TABLE IF NOT EXISTS invitations (
 token_hash text PRIMARY KEY,
 bride_id uuid NOT NULL REFERENCES brides(id) ON DELETE CASCADE,
 expires_at timestamptz NOT NULL,
 used_at timestamptz
);
CREATE TABLE IF NOT EXISTS portal_sessions (
 token_hash text PRIMARY KEY,
 bride_id uuid NOT NULL REFERENCES brides(id) ON DELETE CASCADE,
 expires_at timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS references_private (
 id uuid PRIMARY KEY,
 bride_id uuid NOT NULL REFERENCES brides(id) ON DELETE CASCADE,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS request_limits (
 key text PRIMARY KEY,
 hits integer NOT NULL DEFAULT 1,
 expires_at timestamptz NOT NULL
);
COMMIT;
