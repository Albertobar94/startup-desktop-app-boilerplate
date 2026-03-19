import { useAppStore } from "@/stores/app-store";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@acme/ui";
import {
  FileText,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
} from "lucide-react";
import type { ReactElement } from "react";
import { NavLink } from "react-router";

const NAV_ITEMS = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/files", label: "Files", icon: FileText },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function Sidebar(): ReactElement {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const user = useAuthStore((s) => s.user);

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-background transition-all duration-200",
        sidebarCollapsed ? "w-16" : "w-56",
      )}
    >
      <nav className="flex-1 space-y-1 p-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                sidebarCollapsed && "justify-center px-2",
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-2">
        {!sidebarCollapsed && user && (
          <div className="mb-2 truncate px-3 py-1 text-xs text-muted-foreground">
            {user.email}
          </div>
        )}
        <button
          type="button"
          onClick={toggleSidebar}
          className="flex w-full items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  );
}
