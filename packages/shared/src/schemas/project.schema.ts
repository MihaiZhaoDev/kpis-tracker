import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export const projectResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  ownerId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const projectSummarySchema = z.object({
  totalKpis: z.number(),
  completed: z.number(),
  onTrack: z.number(),
  atRisk: z.number(),
  behind: z.number(),
  overallProgress: z.number(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectResponse = z.infer<typeof projectResponseSchema>;
export type ProjectSummary = z.infer<typeof projectSummarySchema>;
