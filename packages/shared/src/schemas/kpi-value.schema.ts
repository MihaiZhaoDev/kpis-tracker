import { z } from 'zod';

export const createKpiValueSchema = z.object({
  actualValue: z.number(),
  notes: z.string().max(1000).optional(),
});

export const kpiValueResponseSchema = z.object({
  id: z.string().uuid(),
  kpiId: z.string().uuid(),
  actualValue: z.number(),
  recordedAt: z.string().datetime(),
  recordedBy: z.string().uuid().nullable(),
  notes: z.string().nullable(),
});

export type CreateKpiValueInput = z.infer<typeof createKpiValueSchema>;
export type KpiValueResponse = z.infer<typeof kpiValueResponseSchema>;
