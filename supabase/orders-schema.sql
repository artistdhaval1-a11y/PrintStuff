-- PrintStuff order tracking schema
-- Run this in Supabase SQL Editor for project btewoecetdabpbmdgagt.
-- No anonymous policies are created: customer data must be accessed through
-- the secured server-side API, never directly from the browser.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  tracking_token_hash text not null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  delivery_address text not null,
  city text not null,
  pincode text not null,
  order_items jsonb not null,
  total_quantity integer not null check (total_quantity > 0),
  subtotal numeric(12,2) not null check (subtotal >= 0),
  order_status text not null default 'received'
    check (order_status in ('received','confirmed','in_production','dispatched','delivered','cancelled')),
  payment_status text not null default 'pending'
    check (payment_status in ('pending','partially_paid','paid','refunded')),
  courier_name text,
  courier_tracking_number text,
  customer_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- Intentionally no anon/authenticated policies. The browser must not query
-- this table directly. Server-side API access uses a secret stored in Vercel.
