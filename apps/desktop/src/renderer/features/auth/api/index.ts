import { supabase } from "@/lib/supabase";

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<{ error: string | null }> {
  if (!supabase) {
    return { error: "Supabase is not configured" };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { error: error?.message ?? null };
}

export async function signUpWithEmail(
  email: string,
  password: string,
  fullName: string,
): Promise<{ error: string | null }> {
  if (!supabase) {
    return { error: "Supabase is not configured" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });

  return { error: error?.message ?? null };
}

export async function signInWithOAuth(
  provider: "google" | "github" | "apple",
): Promise<void> {
  if (!supabase) {
    return;
  }

  const { data } = await supabase.auth.signInWithOAuth({
    provider,
    options: { skipBrowserRedirect: true },
  });

  if (data.url) {
    window.electron.auth.openOAuth(data.url);
  }
}

export async function signOut(): Promise<void> {
  if (supabase) {
    await supabase.auth.signOut();
  }
  window.electron.auth.clearSession();
}
