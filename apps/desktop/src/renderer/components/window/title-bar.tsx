import { useElectron } from "@/hooks/use-electron";
import { Minus, Square, X } from "lucide-react";
import { type ReactElement, useCallback, useEffect, useState } from "react";

export function TitleBar(): ReactElement {
  const electron = useElectron();
  const [isMaximized, setIsMaximized] = useState(false);
  const [platform, setPlatform] = useState<NodeJS.Platform>("darwin");

  useEffect(() => {
    electron.system.getPlatform().then(setPlatform);
    electron.system.isMaximized().then(setIsMaximized);

    const cleanup = electron.system.onMaximizedChange(setIsMaximized);
    return cleanup;
  }, [electron]);

  const handleMinimize = useCallback(() => {
    electron.system.minimize();
  }, [electron]);

  const handleMaximize = useCallback(() => {
    electron.system.maximize();
  }, [electron]);

  const handleClose = useCallback(() => {
    electron.system.close();
  }, [electron]);

  const isMac = platform === "darwin";

  return (
    <div className="drag-region flex h-10 items-center justify-between border-b border-border bg-background">
      {/* macOS: offset for traffic lights */}
      {isMac ? <div className="w-[70px]" /> : <div className="w-4" />}

      <div className="flex-1" />

      {/* Windows/Linux: window controls */}
      {!isMac && (
        <div className="no-drag flex h-full">
          <button
            type="button"
            onClick={handleMinimize}
            className="flex h-full w-11 items-center justify-center transition-colors hover:bg-muted"
            aria-label="Minimize"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleMaximize}
            className="flex h-full w-11 items-center justify-center transition-colors hover:bg-muted"
            aria-label={isMaximized ? "Restore" : "Maximize"}
          >
            <Square className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-full w-11 items-center justify-center transition-colors hover:bg-destructive hover:text-destructive-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
