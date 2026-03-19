import { TitleBar } from "@/components/window/title-bar";
import type { ReactElement } from "react";
import { Outlet } from "react-router";

export function AuthLayout(): ReactElement {
  return (
    <div className="flex h-screen flex-col">
      <TitleBar />
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
