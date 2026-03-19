import { useAuthStore } from "@/stores/auth-store";
import type { SubscriptionInterface } from "@acme/types";
import { useQuery } from "@tanstack/react-query";

async function fetchSubscription(
  _userId: string,
): Promise<SubscriptionInterface | null> {
  // @todo Implement subscription fetching from Supabase
  return null;
}

export function useSubscription(): {
  subscription: SubscriptionInterface | null;
  isLoading: boolean;
  isPro: boolean;
} {
  const user = useAuthStore((s) => s.user);

  const { data, isLoading } = useQuery({
    queryKey: ["subscription", user?.id],
    queryFn: () => fetchSubscription(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 60_000,
  });

  return {
    subscription: data ?? null,
    isLoading,
    isPro: data?.status === "active" && data?.planId !== "price_free",
  };
}
