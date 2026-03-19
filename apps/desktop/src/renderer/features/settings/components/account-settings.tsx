import { useAuthStore } from "@/stores/auth-store";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@acme/ui";
import type { ReactElement } from "react";
import { useNavigate } from "react-router";

export function AccountSettings(): ReactElement {
  const user = useAuthStore((s) => s.user);
  const clear = useAuthStore((s) => s.clear);
  const navigate = useNavigate();

  function handleSignOut(): void {
    window.electron.auth.clearSession();
    clear();
    navigate("/login", { replace: true });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Manage your account details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm text-muted-foreground">
            {user?.email ?? "Not signed in"}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">Name</p>
          <p className="text-sm text-muted-foreground">
            {user?.fullName ?? "Not set"}
          </p>
        </div>

        <Separator />

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSignOut}>
            Sign out
          </Button>
          <Button variant="destructive">Delete account</Button>
        </div>
      </CardContent>
    </Card>
  );
}
