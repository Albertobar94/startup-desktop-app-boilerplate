import Link from "next/link";
import type { ReactElement } from "react";

export function DocsHeader(): ReactElement {
  return (
    <header className="flex h-14 items-center border-b border-border px-6">
      <Link href="/" className="text-lg font-semibold text-foreground">
        Acme Docs
      </Link>
      <nav className="ml-auto">
        <Link
          href="http://localhost:3000"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to Main Site
        </Link>
      </nav>
    </header>
  );
}
