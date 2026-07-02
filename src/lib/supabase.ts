import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  created_at?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  monthly_price: number;
  quarterly_price: number;
  description: string;
  features: string[];
  is_popular: boolean;
  sort_order: number;
}
