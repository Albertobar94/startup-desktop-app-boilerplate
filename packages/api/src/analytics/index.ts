import posthog from "posthog-js";

let isInitialized = false;

export function initAnalytics(key: string | undefined, host?: string): void {
  if (!key) {
    return;
  }

  posthog.init(key, {
    api_host: host ?? "https://us.i.posthog.com",
    loaded: () => {
      isInitialized = true;
    },
  });
  isInitialized = true;
}

export function identifyUser(
  userId: string,
  properties?: Record<string, unknown>,
): void {
  if (!isInitialized) {
    return;
  }
  posthog.identify(userId, properties);
}

export function captureEvent(
  event: string,
  properties?: Record<string, unknown>,
): void {
  if (!isInitialized) {
    return;
  }
  posthog.capture(event, properties);
}

export function resetAnalytics(): void {
  if (!isInitialized) {
    return;
  }
  posthog.reset();
}
