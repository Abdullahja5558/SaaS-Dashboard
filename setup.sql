-- SUPABASE SETUP SQL
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS sb_users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  business_name text NOT NULL,
  business_category text NOT NULL,
  role text DEFAULT 'Admin',
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sb_transactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES sb_users(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  amount numeric NOT NULL,
  status text NOT NULL CHECK (status IN ('Paid','Pending','Failed')),
  category text,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sb_products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES sb_users(id) ON DELETE CASCADE,
  name text NOT NULL,
  sales_count integer DEFAULT 0,
  revenue numeric DEFAULT 0,
  category text
);

CREATE TABLE IF NOT EXISTS sb_analytics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES sb_users(id) ON DELETE CASCADE,
  month text NOT NULL,
  revenue numeric DEFAULT 0,
  orders integer DEFAULT 0,
  new_users integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS sb_notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES sb_users(id) ON DELETE CASCADE,
  message text NOT NULL,
  type text DEFAULT 'info',
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- DISABLE RLS FOR SIMPLICITY (AS REQUESTED)
ALTER TABLE sb_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE sb_transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE sb_products DISABLE ROW LEVEL SECURITY;
ALTER TABLE sb_analytics DISABLE ROW LEVEL SECURITY;
ALTER TABLE sb_notifications DISABLE ROW LEVEL SECURITY;
