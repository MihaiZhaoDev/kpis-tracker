import api from '../../lib/axios';
import type { CreateKpiInput, UpdateKpiInput, CreateKpiValueInput } from '@wsp/shared';

export const kpisApi = {
  list: (projectId: string, page = 1, limit = 20) =>
    api.get(`/projects/${projectId}/kpis`, { params: { page, limit } }),
  get: (projectId: string, kpiId: string) =>
    api.get(`/projects/${projectId}/kpis/${kpiId}`),
  create: (projectId: string, data: CreateKpiInput) =>
    api.post(`/projects/${projectId}/kpis`, data),
  update: (projectId: string, kpiId: string, data: UpdateKpiInput) =>
    api.patch(`/projects/${projectId}/kpis/${kpiId}`, data),
  delete: (projectId: string, kpiId: string) =>
    api.delete(`/projects/${projectId}/kpis/${kpiId}`),
  listValues: (projectId: string, kpiId: string, page = 1, limit = 50) =>
    api.get(`/projects/${projectId}/kpis/${kpiId}/values`, { params: { page, limit } }),
  recordValue: (projectId: string, kpiId: string, data: CreateKpiValueInput) =>
    api.post(`/projects/${projectId}/kpis/${kpiId}/values`, data),
};
