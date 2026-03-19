import type { ReactElement } from "react";

export default function GettingStartedPage(): ReactElement {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Getting Started
      </h1>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-foreground">Prerequisites</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
          <li>Node.js 22 or later</li>
          <li>pnpm package manager</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-muted p-4">
          <code className="text-sm text-foreground">
            {[
              "git clone https://github.com/acme/desktop-app.git",
              "cd desktop-app",
              "pnpm install",
            ].join("\n")}
          </code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-foreground">
          Running the App
        </h2>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-muted p-4">
          <code className="text-sm text-foreground">
            {[
              "# Start the desktop app in development mode",
              "pnpm dev",
              "",
              "# Start the docs site",
              "pnpm --filter acme-docs dev",
            ].join("\n")}
          </code>
        </pre>
      </section>
    </div>
  );
}
