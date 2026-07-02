/*
# DMC Landing Page — Leads and Pricing Tables

## Summary
Creates two tables to support the DMC marketing agency landing page:
1. `leads` — stores contact form submissions from website visitors
2. `pricing_plans` — stores the three service tiers shown on the Pricing section

## New Tables

### leads
Captures visitor inquiries from the contact form.
- `id` (uuid, PK) — auto-generated
- `name` (text) — visitor's full name
- `email` (text) — visitor's email address
- `phone` (text, nullable) — optional phone number
- `company` (text, nullable) — visitor's company name
- `service` (text, nullable) — which service they're interested in
- `message` (text) — free-text message
- `created_at` (timestamptz) — submission timestamp

### pricing_plans
Stores the three pricing tiers displayed on the landing page so they can be updated without code changes.
- `id` (uuid, PK) — auto-generated
- `name` (text) — tier name (e.g. "Starter")
- `monthly_price` (integer) — price in USD per month
- `quarterly_price` (integer) — price in USD per quarter (discounted)
- `description` (text) — short plan tagline
- `features` (text[]) — list of included features
- `is_popular` (boolean) — marks the highlighted/recommended tier
- `sort_order` (integer) — controls display ordering

## Security
- RLS enabled on both tables.
- `leads`: anon + authenticated INSERT (visitors submit without logging in); no SELECT/UPDATE/DELETE for anon (admin reads via service key).
- `pricing_plans`: anon + authenticated SELECT (public pricing display); no public writes.

## Notes
- No auth is required for this landing page; all policies use `TO anon, authenticated`.
- Seed data for three pricing tiers is inserted after table creation.
*/

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  company     text,
  service     text,
  message     text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads" ON leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Pricing plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name             text NOT NULL,
  monthly_price    integer NOT NULL,
  quarterly_price  integer NOT NULL,
  description      text NOT NULL,
  features         text[] NOT NULL DEFAULT '{}',
  is_popular       boolean NOT NULL DEFAULT false,
  sort_order       integer NOT NULL DEFAULT 0
);

ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_pricing" ON pricing_plans;
CREATE POLICY "anon_select_pricing" ON pricing_plans FOR SELECT
  TO anon, authenticated USING (true);

-- Seed pricing data (idempotent via DELETE + INSERT)
DELETE FROM pricing_plans;

INSERT INTO pricing_plans (name, monthly_price, quarterly_price, description, features, is_popular, sort_order) VALUES
(
  'Starter',
  499,
  1297,
  'Perfect for small businesses ready to grow their online presence.',
  ARRAY[
    'SMM management (2 platforms)',
    'Up to 12 posts per month',
    'Basic SEO audit',
    'Monthly analytics report',
    'Email support',
    '1 ad campaign setup'
  ],
  false,
  1
),
(
  'Growth',
  999,
  2597,
  'For brands serious about scaling fast with data-driven marketing.',
  ARRAY[
    'SMM management (4 platforms)',
    'Up to 30 posts per month',
    'Full SEO optimization',
    'Targeted ad campaigns (Meta + Google)',
    'Weekly analytics reports',
    'Dedicated account manager',
    'Brand identity consultation',
    'A/B testing'
  ],
  true,
  2
),
(
  'Dominant',
  1999,
  5197,
  'Full-stack marketing domination for ambitious market leaders.',
  ARRAY[
    'SMM management (all platforms)',
    'Unlimited content creation',
    'Advanced SEO + link building',
    'Multi-channel ad campaigns',
    'Real-time analytics dashboard',
    'Dedicated 3-person team',
    'Full brand identity & strategy',
    'Influencer partnerships',
    'Video content production',
    'Priority 24/7 support'
  ],
  false,
  3
);
