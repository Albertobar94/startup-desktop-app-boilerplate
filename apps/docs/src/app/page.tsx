import Link from "next/link";
import type { ReactElement } from "react";

export default function DocsHomePage(): ReactElement {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Documentation
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Welcome to the Acme desktop application documentation. Here you will
        find guides on setting up your development environment, understanding
        the architecture, working with the IPC API, and deploying the
        application.
      </p>
      <div className="mt-8">
        <Link
          href="/getting-started"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
