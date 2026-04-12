import api from '../../lib/axios';
import type { CreateProjectInput, UpdateProjectInput } from '@wsp/shared';

export const projectsApi = {
  list: (page = 1, limit = 20) =>
    api.get('/projects', { params: { page, limit } }),
  get: (id: string) => api.get(`/projects/${id}`),
  create: (data: CreateProjectInput) => api.post('/projects', data),
  update: (id: string, data: UpdateProjectInput) => api.patch(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
  getSummary: (id: string) => api.get(`/projects/${id}/summary`),
};
