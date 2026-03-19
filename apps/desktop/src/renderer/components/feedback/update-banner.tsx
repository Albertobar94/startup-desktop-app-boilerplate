import { useAppStore } from "@/stores/app-store";
import { Button } from "@acme/ui";
import { Download } from "lucide-react";
import type { ReactElement } from "react";

export function UpdateBanner(): ReactElement | null {
  const { updateAvailable, updateVersion } = useAppStore();

  if (!updateAvailable) {
    return null;
  }

  return (
    <div className="flex items-center justify-between bg-brand-500 px-4 py-1.5 text-sm text-white">
      <span>
        A new version{updateVersion ? ` (${updateVersion})` : ""} is available.
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 text-white hover:bg-white/20 hover:text-white"
        onClick={() => window.electron.updates.download()}
      >
        <Download className="mr-1 h-3.5 w-3.5" />
        Update
      </Button>
    </div>
  );
}
