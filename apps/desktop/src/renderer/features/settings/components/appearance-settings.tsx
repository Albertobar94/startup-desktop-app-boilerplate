import { useThemeStore } from "@/stores/theme-store";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui";
import { cn } from "@acme/ui";
import { Monitor, Moon, Sun } from "lucide-react";
import type { ReactElement } from "react";

const THEMES = [
  { value: "light" as const, label: "Light", icon: Sun },
  { value: "dark" as const, label: "Dark", icon: Moon },
  { value: "system" as const, label: "System", icon: Monitor },
];

export function AppearanceSettings(): ReactElement {
  const { theme, setTheme } = useThemeStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize how the app looks.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {THEMES.map((t) => (
            <Button
              key={t.value}
              variant="outline"
              className={cn(
                "flex h-auto flex-col gap-2 py-4",
                theme === t.value && "border-primary",
              )}
              onClick={() => setTheme(t.value)}
            >
              <t.icon className="h-5 w-5" />
              <span className="text-xs">{t.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
