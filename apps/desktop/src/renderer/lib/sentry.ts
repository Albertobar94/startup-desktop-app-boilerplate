import { env } from "@/config/env";

export function initRendererSentry(): void {
  if (!env.RENDERER_VITE_SENTRY_DSN) {
    return;
  }
  // @todo import and init @sentry/react with DSN
}
