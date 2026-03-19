import type { UserInterface } from "@acme/types";

export function createTestUser(
  overrides: Partial<UserInterface> = {},
): UserInterface {
  return {
    id: "user-test-001",
    email: "test@example.com",
    fullName: "Test User",
    avatarUrl: null,
    createdAt: "2024-01-01T00:00:00.000Z",
    ...overrides,
  };
}
