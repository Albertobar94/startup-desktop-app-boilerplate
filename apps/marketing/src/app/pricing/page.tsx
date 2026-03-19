import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/ui";
import { Check } from "lucide-react";
import type { ReactElement } from "react";

interface PlanFeature {
  text: string;
}

interface Plan {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  isPopular: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals and small projects.",
    features: [
      { text: "Up to 3 projects" },
      { text: "Basic analytics" },
      { text: "Community support" },
      { text: "1 GB storage" },
      { text: "Standard security" },
    ],
    cta: "Get Started",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$19",
    description: "For teams who need more power.",
    features: [
      { text: "Unlimited projects" },
      { text: "Advanced analytics" },
      { text: "Priority support" },
      { text: "100 GB storage" },
      { text: "Enterprise security" },
      { text: "Team collaboration" },
      { text: "Custom integrations" },
      { text: "API access" },
    ],
    cta: "Start Free Trial",
    isPopular: true,
  },
];

export default function PricingPage(): ReactElement {
  return (
    <>
      <Header />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Choose the plan that fits your team. No hidden fees, no surprises.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-2">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.isPopular
                  ? "relative border-primary shadow-md"
                  : "relative"
              }
            >
              {plan.isPopular ? (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
              ) : null}

              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.text}
                      className="flex items-center gap-3 text-sm"
                    >
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.isPopular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
