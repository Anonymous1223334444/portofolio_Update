import { createClient } from "@supabase/supabase-js";

// Type guard to ensure environment variables exist
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);