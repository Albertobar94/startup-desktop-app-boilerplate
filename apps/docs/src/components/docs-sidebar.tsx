import { Button } from "@acme/ui";
import Link from "next/link";
import type { ReactElement } from "react";

const NAV_ITEMS = [
  { href: "/getting-started", label: "Getting Started" },
  { href: "/architecture", label: "Architecture" },
  { href: "/ipc-api", label: "IPC API" },
  { href: "/deployment", label: "Deployment" },
];

export function DocsSidebar(): ReactElement {
  return (
    <aside className="w-64 shrink-0 border-r border-border p-4">
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className="justify-start"
            asChild
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </nav>
    </aside>
  );
}
