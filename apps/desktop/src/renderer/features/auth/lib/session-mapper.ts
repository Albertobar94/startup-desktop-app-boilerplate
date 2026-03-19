import type { SessionInterface, UserInterface } from "@acme/types";
import type { Session } from "@supabase/supabase-js";

/**
 * Maps a raw Supabase Session to the internal UserInterface + SessionInterface pair.
 *
 * Centralising this transformation here means that any change to UserInterface or
 * SessionInterface will produce a compile error at this exact location, not silently
 * at runtime. Consumers should import this function rather than constructing these
 * objects inline.
 */
export function mapSupabaseSession(raw: Session): {
  user: UserInterface;
  session: SessionInterface;
} {
  const user: UserInterface = {
    id: raw.user.id,
    email: raw.user.email ?? "",
    fullName: raw.user.user_metadata?.full_name ?? null,
    avatarUrl: raw.user.user_metadata?.avatar_url ?? null,
    createdAt: raw.user.created_at,
    updatedAt: raw.user.updated_at ?? "",
  };

  const session: SessionInterface = {
    accessToken: raw.access_token,
    refreshToken: raw.refresh_token,
    expiresAt: raw.expires_at ?? 0,
    user,
  };

  return { user, session };
}
