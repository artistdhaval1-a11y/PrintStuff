-- Run once in Supabase SQL Editor for the PrintStuff project.
-- The server uses SUPABASE_SERVICE_ROLE_KEY; never expose that key to the browser.
create table if not exists public.google_oauth_tokens (
  provider text primary key check (provider = 'google_drive'),
  refresh_token text not null,
  updated_at timestamptz not null default now()
);

alter table public.google_oauth_tokens enable row level security;

-- Do not add anon/authenticated policies. Server-side service-role access bypasses RLS.
