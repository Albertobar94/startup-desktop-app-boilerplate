import { AppLayout } from "@/components/layout/app-layout";
import { AuthLayout } from "@/components/layout/auth-layout";
import { createBrowserRouter } from "react-router";
import { DashboardPage } from "./app/dashboard";
import { FilesPage } from "./app/files";
import { SettingsPage } from "./app/settings";
import { CallbackPage } from "./auth/callback";
import { LoginPage } from "./auth/login";
import { SignupPage } from "./auth/signup";
import { OnboardingPage } from "./onboarding";
import { RootRoute } from "./root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootRoute,
    children: [
      {
        element: AuthLayout(),
        children: [
          { path: "login", Component: LoginPage },
          { path: "signup", Component: SignupPage },
          { path: "auth/callback", Component: CallbackPage },
        ],
      },
      {
        path: "app",
        element: AppLayout(),
        children: [
          { path: "dashboard", Component: DashboardPage },
          { path: "settings", Component: SettingsPage },
          { path: "files", Component: FilesPage },
        ],
      },
      { path: "onboarding", Component: OnboardingPage },
    ],
  },
]);
