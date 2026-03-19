import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui";
import type { ReactElement } from "react";
import { useState } from "react";
import { PlanCard } from "./plan-card";

const PLANS = [
  {
    name: "Free",
    price: "Free",
    description: "For individuals getting started.",
    priceId: "price_free",
    features: ["Up to 3 projects", "Basic analytics", "Community support"],
  },
  {
    name: "Pro",
    price: "$19",
    description: "For professionals and small teams.",
    priceId: "price_pro",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "Team collaboration",
    ],
  },
];

export function UpgradeDialog(): ReactElement {
  const [open, setOpen] = useState(false);

  function handleSelect(priceId: string): void {
    window.electron.payments.openCheckout(priceId);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>View plans</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Choose a plan</DialogTitle>
          <DialogDescription>
            Select the plan that works best for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 pt-4">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isCurrentPlan={plan.priceId === "price_free"}
              onSelect={() => handleSelect(plan.priceId)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
