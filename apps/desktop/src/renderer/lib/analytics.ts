import { env } from "@/config/env";
import { initAnalytics } from "@acme/api";

export function initRendererAnalytics(): void {
  initAnalytics(env.RENDERER_VITE_POSTHOG_KEY, env.RENDERER_VITE_POSTHOG_HOST);
}
