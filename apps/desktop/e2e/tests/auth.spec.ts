import { expect, test } from "@playwright/test";
import { AuthPage } from "../pages/auth.page";

test.describe("Authentication", () => {
  test("shows login form", async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.goto();

    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test("shows validation errors for empty form", async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.clickSignIn();

    await expect(page.getByText(/invalid/i)).toBeVisible();
  });
});
