import { z } from 'zod';
import { KpiValueType, KpiCategory, KpiStatus } from '../enums';

export const createKpiSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  category: z.nativeEnum(KpiCategory).optional(),
  unit: z.string().min(1).max(50),
  valueType: z.nativeEnum(KpiValueType),
  targetValue: z.number().positive(),
  sortOrder: z.number().int().min(0).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateKpiSchema = createKpiSchema.partial();

export const kpiResponseSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  category: z.string().nullable(),
  unit: z.string(),
  valueType: z.nativeEnum(KpiValueType),
  targetValue: z.number(),
  sortOrder: z.number(),
  metadata: z.record(z.unknown()),
  currentValue: z.number().nullable(),
  status: z.nativeEnum(KpiStatus).nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type CreateKpiInput = z.infer<typeof createKpiSchema>;
export type UpdateKpiInput = z.infer<typeof updateKpiSchema>;
export type KpiResponse = z.infer<typeof kpiResponseSchema>;
