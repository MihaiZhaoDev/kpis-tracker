import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api';

export function useDashboardProjects() {
  return useQuery({
    queryKey: ['dashboard', 'projects'],
    queryFn: async () => {
      const res = await dashboardApi.getProjects(1, 50);
      return res.data;
    },
  });
}

export function useProjectSummary(projectId: string) {
  return useQuery({
    queryKey: ['projects', projectId, 'summary'],
    queryFn: async () => {
      const res = await dashboardApi.getProjectSummary(projectId);
      return res.data.data;
    },
  });
}
