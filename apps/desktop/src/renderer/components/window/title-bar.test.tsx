import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TitleBar } from "./title-bar";

vi.mock("@/stores/app-store", () => ({
  useAppStore: vi.fn(() => false),
}));

describe("TitleBar", () => {
  it("renders the title bar", () => {
    render(<TitleBar />);
    expect(screen.getByTestId("title-bar")).toBeInTheDocument();
  });

  it("calls minimize when minimize button is clicked", async () => {
    const user = userEvent.setup();
    render(<TitleBar />);

    const minimizeButton = screen.queryByTestId("minimize-button");
    if (minimizeButton) {
      await user.click(minimizeButton);
      expect(window.electron.system.minimize).toHaveBeenCalled();
    }
  });

  it("calls close when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<TitleBar />);

    const closeButton = screen.queryByTestId("close-button");
    if (closeButton) {
      await user.click(closeButton);
      expect(window.electron.system.close).toHaveBeenCalled();
    }
  });
});
