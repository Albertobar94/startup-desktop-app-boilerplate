import { ErrorBoundary } from "@/components/feedback/error-boundary";
import { initRendererAnalytics } from "@/lib/analytics";
import { queryClient } from "@/lib/query-client";
import { initRendererSentry } from "@/lib/sentry";
import { initTheme } from "@/stores/theme-store";
import { Toaster } from "@acme/ui";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

export function App(): ReactElement {
  useEffect(() => {
    initRendererSentry();
    initRendererAnalytics();
    initTheme();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
