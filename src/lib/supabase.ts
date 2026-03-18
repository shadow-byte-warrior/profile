import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('CRITICAL: Missing Supabase environment variables! Check your Vercel Dashboard settings.');
} else {
  console.log('Supabase client initialized with reference:', supabaseUrl.split('.')[0].split('//')[1]);
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);
