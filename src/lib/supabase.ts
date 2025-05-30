import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that the URL is properly formatted
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase credentials. Please click the "Connect to Supabase" button in the top right corner to set up your project.'
  );
}

if (!isValidUrl(supabaseUrl)) {
  throw new Error(
    'Invalid Supabase URL format. Please ensure you have connected your Supabase project correctly.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);