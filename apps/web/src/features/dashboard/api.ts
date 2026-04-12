import api from '../../lib/axios';

export const dashboardApi = {
  getProjects: (page = 1, limit = 50) =>
    api.get('/projects', { params: { page, limit } }),
  getProjectSummary: (projectId: string) =>
    api.get(`/projects/${projectId}/summary`),
};
