import { z } from "zod";

const rendererEnvSchema = z.object({
  RENDERER_VITE_SUPABASE_URL: z.string().url().optional(),
  RENDERER_VITE_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  RENDERER_VITE_SENTRY_DSN: z.string().url().optional(),
  RENDERER_VITE_POSTHOG_KEY: z.string().min(1).optional(),
  RENDERER_VITE_POSTHOG_HOST: z.string().url().optional(),
  RENDERER_VITE_STRIPE_PUBLISHABLE_KEY: z.string().min(1).optional(),
});

export const env = rendererEnvSchema.parse(import.meta.env);
