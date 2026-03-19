import { env } from "@/config/env";
import { createSupabaseClient } from "@acme/api";

export const supabase =
  env.RENDERER_VITE_SUPABASE_URL && env.RENDERER_VITE_SUPABASE_ANON_KEY
    ? createSupabaseClient(
        env.RENDERER_VITE_SUPABASE_URL,
        env.RENDERER_VITE_SUPABASE_ANON_KEY,
      )
    : null;
