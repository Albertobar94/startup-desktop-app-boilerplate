import { Button } from "@acme/ui";
import Link from "next/link";
import type { ReactElement } from "react";

export function Header(): ReactElement {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold text-foreground">
          Acme
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Button size="sm">Download</Button>
        </nav>
      </div>
    </header>
  );
}
