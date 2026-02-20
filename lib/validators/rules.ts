import { z } from "zod";

export const createRuleSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must be under 255 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be under 500 characters"),
  content: z
    .string()
    .min(20, "Rule content must be at least 20 characters")
    .max(10_000, "Rule content must be under 10,000 characters"),
  categoryId: z.string().uuid("Invalid category ID"),
  tags: z
    .array(z.string().max(30))
    .max(8, "Maximum 8 tags")
    .default([]),
  isPublic: z.boolean().default(true),
});

export const updateRuleSchema = createRuleSchema.partial();

export const rateRuleSchema = z.object({
  score: z.number().int().min(1).max(5),
});

export const queryRulesSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  sort: z.enum(["newest", "popular", "top-rated"]).default("newest"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

export type CreateRuleInput = z.infer<typeof createRuleSchema>;
export type UpdateRuleInput = z.infer<typeof updateRuleSchema>;
export type QueryRulesInput = z.infer<typeof queryRulesSchema>;
