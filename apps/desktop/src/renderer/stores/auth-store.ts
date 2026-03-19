import type { SessionInterface, UserInterface } from "@acme/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: UserInterface | null;
  session: SessionInterface | null;
  isLoading: boolean;
  setUser: (user: UserInterface | null) => void;
  setSession: (session: SessionInterface | null) => void;
  setLoading: (loading: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session, user: session?.user ?? null }),
      setLoading: (isLoading) => set({ isLoading }),
      clear: () => set({ user: null, session: null, isLoading: false }),
    }),
    {
      name: "acme-auth",
      // Only persist the user profile — never persist tokens to localStorage.
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
