import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { kpisApi } from '../api';
import type { CreateKpiInput, CreateKpiValueInput } from '@wsp/shared';

export function useKpi(projectId: string, kpiId: string) {
  return useQuery({
    queryKey: ['projects', projectId, 'kpis', kpiId],
    queryFn: async () => {
      const res = await kpisApi.get(projectId, kpiId);
      return res.data.data;
    },
  });
}

export function useKpiValues(projectId: string, kpiId: string) {
  return useQuery({
    queryKey: ['projects', projectId, 'kpis', kpiId, 'values'],
    queryFn: async () => {
      const res = await kpisApi.listValues(projectId, kpiId);
      return res.data;
    },
  });
}

export function useCreateKpi(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateKpiInput) => kpisApi.create(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'kpis'] });
      queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'summary'] });
    },
  });
}

export function useRecordValue(projectId: string, kpiId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateKpiValueInput) => kpisApi.recordValue(projectId, kpiId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'kpis', kpiId] });
      queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'kpis', kpiId, 'values'] });
      queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'summary'] });
    },
  });
}
