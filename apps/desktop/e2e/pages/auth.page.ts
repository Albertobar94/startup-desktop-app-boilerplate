import type { Page } from "@playwright/test";

export class AuthPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  async fillEmail(email: string): Promise<void> {
    await this.page.getByLabel(/email/i).fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.page.getByLabel(/password/i).fill(password);
  }

  async clickSignIn(): Promise<void> {
    await this.page.getByRole("button", { name: /sign in/i }).click();
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignIn();
  }
}
