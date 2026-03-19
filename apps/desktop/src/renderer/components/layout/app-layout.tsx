import { UpdateBanner } from "@/components/feedback/update-banner";
import { TitleBar } from "@/components/window/title-bar";
import type { ReactElement } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./sidebar";

export function AppLayout(): ReactElement {
  return (
    <div className="flex h-screen flex-col">
      <TitleBar />
      <UpdateBanner />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
