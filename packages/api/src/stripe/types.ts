export interface CheckoutOptions {
  priceId: string;
  customerId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface PortalOptions {
  customerId: string;
  returnUrl: string;
}
