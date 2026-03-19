import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { LoginForm } from "./login-form";

function renderWithRouter(): void {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>,
  );
}

describe("LoginForm", () => {
  it("renders email and password fields", () => {
    renderWithRouter();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders the sign in button", () => {
    renderWithRouter();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("renders OAuth buttons", () => {
    renderWithRouter();
    expect(screen.getByText(/google/i)).toBeInTheDocument();
    expect(screen.getByText(/github/i)).toBeInTheDocument();
  });

  it("renders link to sign up", () => {
    renderWithRouter();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });
});
