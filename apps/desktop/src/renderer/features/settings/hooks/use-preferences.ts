import { useElectron } from "@/hooks/use-electron";
import { useThemeStore } from "@/stores/theme-store";
import { useCallback } from "react";

interface UsePreferencesReturn {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export function usePreferences(): UsePreferencesReturn {
  const electron = useElectron();
  const { theme, setTheme: setThemeStore } = useThemeStore();

  const setTheme = useCallback(
    (newTheme: "light" | "dark" | "system") => {
      setThemeStore(newTheme);
      electron.system.setTheme(newTheme);
    },
    [electron, setThemeStore],
  );

  return { theme, setTheme };
}
