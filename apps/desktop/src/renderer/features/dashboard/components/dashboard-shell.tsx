import { useAuthStore } from "@/stores/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui";
import { Activity, FileText, Zap } from "lucide-react";
import type { ReactElement } from "react";
import { ActivityFeed } from "./activity-feed";
import { StatsCard } from "./stats-card";

export function DashboardShell(): ReactElement {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.fullName ?? user?.email ?? "there"}.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Total Files"
          value="0"
          icon={FileText}
          description="No files yet"
        />
        <StatsCard
          title="Activity"
          value="0"
          icon={Activity}
          description="No recent activity"
        />
        <StatsCard
          title="Quick Actions"
          value="3"
          icon={Zap}
          description="Available actions"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityFeed />
        </CardContent>
      </Card>
    </div>
  );
}
