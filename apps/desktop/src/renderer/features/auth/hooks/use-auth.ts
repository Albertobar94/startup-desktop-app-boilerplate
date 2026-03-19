import { useAuthStore } from "@/stores/auth-store";
import type { UserInterface } from "@acme/types";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { signOut as apiSignOut } from "../api";

interface UseAuthReturn {
  user: UserInterface | null;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const user = useAuthStore((s) => s.user);
  const clear = useAuthStore((s) => s.clear);
  const navigate = useNavigate();

  const signOut = useCallback(async () => {
    await apiSignOut();
    clear();
    navigate("/login", { replace: true });
  }, [clear, navigate]);

  return {
    user,
    isAuthenticated: user !== null,
    signOut,
  };
}
