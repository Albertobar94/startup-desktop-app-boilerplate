import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth-store";
import type { SessionInterface, UserInterface } from "@acme/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

async function fetchSession(): Promise<{
  user: UserInterface | null;
  session: SessionInterface | null;
}> {
  if (!supabase) {
    // The electron store only persists tokens, not user metadata.
    // Without Supabase configured there is no user profile to restore,
    // so we return null to redirect the user to login.
    return { user: null, session: null };
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { user: null, session: null };
  }

  return {
    user: {
      id: session.user.id,
      email: session.user.email ?? "",
      fullName: session.user.user_metadata?.full_name ?? null,
      avatarUrl: session.user.user_metadata?.avatar_url ?? null,
      createdAt: session.user.created_at,
    },
    session: {
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
      expiresAt: session.expires_at ?? 0,
      userId: session.user.id,
      email: session.user.email ?? "",
      fullName: session.user.user_metadata?.full_name ?? null,
    },
  };
}

export function useSession(): {
  isLoading: boolean;
  isAuthenticated: boolean;
} {
  const setUser = useAuthStore((s) => s.setUser);
  const setSession = useAuthStore((s) => s.setSession);
  const setLoading = useAuthStore((s) => s.setLoading);

  const { data, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: 60_000,
    retry: false,
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (data) {
      setUser(data.user);
      setSession(data.session);
    }
  }, [data, setUser, setSession]);

  return {
    isLoading,
    isAuthenticated: data?.user !== null && data?.user !== undefined,
  };
}
