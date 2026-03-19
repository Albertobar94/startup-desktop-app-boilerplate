import type { SessionInterface } from "@acme/types";

export function createTestSession(
  overrides: Partial<SessionInterface> = {},
): SessionInterface {
  return {
    accessToken: "test-access-token",
    refreshToken: "test-refresh-token",
    expiresAt: Math.floor(Date.now() / 1000) + 3600,
    userId: "user-test-001",
    email: "test@example.com",
    fullName: "Test User",
    ...overrides,
  };
}
