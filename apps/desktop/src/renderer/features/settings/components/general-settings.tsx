import { useElectron } from "@/hooks/use-electron";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Switch,
} from "@acme/ui";
import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";

export function GeneralSettings(): ReactElement {
  const electron = useElectron();
  const [version, setVersion] = useState("");
  const [autoUpdate, setAutoUpdate] = useState(true);

  useEffect(() => {
    electron.system.getVersion().then(setVersion);
  }, [electron]);

  const handleCheckUpdates = useCallback(() => {
    electron.updates.check();
  }, [electron]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
        <CardDescription>General application settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Auto-update</p>
            <p className="text-xs text-muted-foreground">
              Automatically download and install updates.
            </p>
          </div>
          <Switch checked={autoUpdate} onCheckedChange={setAutoUpdate} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Version</p>
            <p className="text-xs text-muted-foreground">
              {version || "Loading..."}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleCheckUpdates}>
            Check for updates
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
