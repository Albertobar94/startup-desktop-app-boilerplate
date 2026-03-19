import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function createStripeClient(secretKey: string): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(secretKey, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });
  }
  return stripeInstance;
}
