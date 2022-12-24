import { createClient, SupabaseClientOptions } from "@supabase/supabase-js";

const options: SupabaseClientOptions<"public"> = {
  db: {
    schema: "public",
  },
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);
