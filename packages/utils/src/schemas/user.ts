import { z } from "zod";
import { emailSchema } from "./common";

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(8).max(128),
});

export const signupSchema = z.object({
  email: emailSchema,
  password: z.string().min(8).max(128),
  fullName: z.string().min(1).max(200),
});

export const updateProfileSchema = z.object({
  fullName: z.string().min(1).max(200).optional(),
  avatarUrl: z.string().url().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
