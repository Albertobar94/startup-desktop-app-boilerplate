import { create } from "zustand";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()((set) => ({
  theme: "system",
  setTheme: (theme) => {
    set({ theme });
    window.electron.system.setTheme(theme);
    applyTheme(theme);
  },
}));

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    root.classList.toggle("dark", prefersDark);
  } else {
    root.classList.toggle("dark", theme === "dark");
  }
}

// Initialize theme on load
export function initTheme(): void {
  window.electron.system.getTheme().then((theme) => {
    useThemeStore.getState().setTheme(theme);
  });
}
