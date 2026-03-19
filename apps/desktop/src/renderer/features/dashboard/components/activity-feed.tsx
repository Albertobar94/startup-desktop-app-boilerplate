import type { ReactElement } from "react";

export function ActivityFeed(): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <p className="text-sm text-muted-foreground">No recent activity.</p>
      <p className="text-xs text-muted-foreground">
        Your activity will show up here.
      </p>
    </div>
  );
}
