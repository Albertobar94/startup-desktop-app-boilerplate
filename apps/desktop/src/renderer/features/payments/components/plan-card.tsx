import { Button, Card, CardContent, CardHeader, CardTitle } from "@acme/ui";
import { cn } from "@acme/ui";
import { Check } from "lucide-react";
import type { ReactElement } from "react";

interface PlanCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isCurrentPlan?: boolean;
  onSelect: () => void;
}

export function PlanCard({
  name,
  price,
  description,
  features,
  isCurrentPlan = false,
  onSelect,
}: PlanCardProps): ReactElement {
  return (
    <Card className={cn(isCurrentPlan && "border-primary")}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Free" && (
            <span className="text-sm text-muted-foreground">/month</span>
          )}
        </div>

        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              {feature}
            </li>
          ))}
        </ul>

        <Button
          className="w-full"
          variant={isCurrentPlan ? "outline" : "default"}
          disabled={isCurrentPlan}
          onClick={onSelect}
        >
          {isCurrentPlan ? "Current plan" : `Upgrade to ${name}`}
        </Button>
      </CardContent>
    </Card>
  );
}
