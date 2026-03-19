import { describe, expect, it } from "vitest";
import { emailSchema, paginationSchema, urlSchema } from "./common";

describe("emailSchema", () => {
  it("accepts valid emails", () => {
    const result = emailSchema.safeParse("user@example.com");
    expect(result.success).toBe(true);
  });

  it("rejects invalid emails", () => {
    const result = emailSchema.safeParse("not-an-email");
    expect(result.success).toBe(false);
  });
});

describe("urlSchema", () => {
  it("accepts valid URLs", () => {
    const result = urlSchema.safeParse("https://example.com");
    expect(result.success).toBe(true);
  });

  it("rejects invalid URLs", () => {
    const result = urlSchema.safeParse("not-a-url");
    expect(result.success).toBe(false);
  });
});

describe("paginationSchema", () => {
  it("accepts valid pagination params", () => {
    const result = paginationSchema.safeParse({ page: 1, perPage: 20 });
    expect(result.success).toBe(true);
  });

  it("uses defaults when not provided", () => {
    const result = paginationSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(1);
      expect(result.data.perPage).toBe(20);
    }
  });

  it("rejects invalid page numbers", () => {
    const result = paginationSchema.safeParse({ page: 0, perPage: 20 });
    expect(result.success).toBe(false);
  });
});
