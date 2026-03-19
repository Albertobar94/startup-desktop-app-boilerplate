import { useAuthStore } from "@/stores/auth-store";
import type { ReactElement } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

export function RootRoute(): ReactElement {
  const { user, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
      </div>
    );
  }

  const isAuthRoute =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/auth/");

  if (!user && !isAuthRoute) {
    return <Navigate to="/login" replace />;
  }

  if (user && isAuthRoute) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Outlet />;
}
