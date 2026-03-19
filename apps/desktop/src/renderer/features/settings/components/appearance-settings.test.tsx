import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AppearanceSettings } from "./appearance-settings";

const mockSetTheme = vi.fn();

vi.mock("@/stores/theme-store", () => ({
  useThemeStore: vi.fn(() => ({
    theme: "system",
    setTheme: mockSetTheme,
  })),
}));

describe("AppearanceSettings", () => {
  it("renders theme options", () => {
    render(<AppearanceSettings />);
    expect(screen.getByText("Light")).toBeInTheDocument();
    expect(screen.getByText("Dark")).toBeInTheDocument();
    expect(screen.getByText("System")).toBeInTheDocument();
  });

  it("calls setTheme when a theme is selected", async () => {
    const user = userEvent.setup();
    render(<AppearanceSettings />);

    await user.click(screen.getByText("Dark"));
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});
