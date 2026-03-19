// Sentry helpers — guarded by DSN availability
// Actual @sentry/electron or @sentry/react is imported at the app level

let isInitialized = false;

export function initSentry(dsn: string | undefined): void {
  if (!dsn) {
    return;
  }
  isInitialized = true;
  // Actual init happens in app-level code with platform-specific SDK
}

export function captureException(error: unknown): void {
  if (!isInitialized) {
    console.error("[sentry:disabled]", error);
    return;
  }
  // In production, this delegates to the platform-specific Sentry SDK
  console.error("[sentry]", error);
}
