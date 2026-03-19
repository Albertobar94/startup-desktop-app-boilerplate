import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui";
import type { ReactElement } from "react";

export function BillingSettings(): ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>Manage your subscription and billing.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">Current plan</p>
          <p className="text-sm text-muted-foreground">Free</p>
        </div>

        <Button
          onClick={() => window.electron.payments.openCheckout("price_free")}
        >
          Upgrade to Pro
        </Button>

        <Button
          variant="outline"
          onClick={() => window.electron.payments.openPortal()}
        >
          Manage subscription
        </Button>
      </CardContent>
    </Card>
  );
}
