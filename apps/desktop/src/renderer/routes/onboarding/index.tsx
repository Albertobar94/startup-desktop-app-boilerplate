import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/ui";
import type { ReactElement } from "react";
import { useNavigate } from "react-router";

export function OnboardingPage(): ReactElement {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Welcome to Acme App</CardTitle>
          <CardDescription>
            Let&apos;s get you set up in just a few steps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This is a placeholder for the onboarding flow. You can customize
            this to collect user preferences, connect accounts, or introduce key
            features.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate("/app/dashboard")}>
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
