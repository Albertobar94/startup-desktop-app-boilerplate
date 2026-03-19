import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth-store";
import type { ReactElement } from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

export function CallbackPage(): ReactElement {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code || !supabase) {
      navigate("/login", { replace: true });
      return;
    }

    supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
      if (error || !data.session) {
        navigate("/login", { replace: true });
        return;
      }

      setSession({
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at ?? 0,
        user: {
          id: data.session.user.id,
          email: data.session.user.email ?? "",
          fullName:
            (data.session.user.user_metadata?.full_name as string | null) ??
            null,
          avatarUrl:
            (data.session.user.user_metadata?.avatar_url as string | null) ??
            null,
          createdAt: data.session.user.created_at,
          updatedAt: data.session.user.updated_at ?? "",
        },
      });

      window.electron.auth.setSession({
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at ?? 0,
        user: {
          id: data.session.user.id,
          email: data.session.user.email ?? "",
          fullName:
            (data.session.user.user_metadata?.full_name as string | null) ??
            null,
          avatarUrl:
            (data.session.user.user_metadata?.avatar_url as string | null) ??
            null,
          createdAt: data.session.user.created_at,
          updatedAt: data.session.user.updated_at ?? "",
        },
      });

      navigate("/app/dashboard", { replace: true });
    });
  }, [searchParams, navigate, setSession]);

  return (
    <div className="flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
    </div>
  );
}
