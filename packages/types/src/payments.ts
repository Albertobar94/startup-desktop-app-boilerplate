export type PlanTier = "free" | "pro" | "enterprise";

export interface PlanInterface {
  id: string;
  name: string;
  tier: PlanTier;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
}

export interface SubscriptionInterface {
  id: string;
  userId: string;
  planId: string;
  status: "active" | "canceled" | "past_due" | "trialing" | "incomplete";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}
