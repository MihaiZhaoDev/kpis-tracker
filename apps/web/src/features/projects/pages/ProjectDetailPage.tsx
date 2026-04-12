import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button, Spinner } from '@wsp/ui';
import { useProject } from '../hooks/useProjects';
import { projectsApi } from '../api';
import { KpiSummaryCards } from '../components/KpiSummaryCards';
import { KpiTable } from '../components/KpiTable';
import api from '../../../lib/axios';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [kpiPage, setKpiPage] = useState(1);

  const { data: project, isLoading: projectLoading } = useProject(id!);

  const { data: summary } = useQuery({
    queryKey: ['projects', id, 'summary'],
    queryFn: async () => {
      const res = await projectsApi.getSummary(id!);
      return res.data.data;
    },
  });

  const { data: kpisData, isLoading: kpisLoading } = useQuery({
    queryKey: ['projects', id, 'kpis', kpiPage],
    queryFn: async () => {
      const res = await api.get(`/projects/${id}/kpis`, {
        params: { page: kpiPage, limit: 20 },
      });
      return res.data;
    },
  });

  if (projectLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!project) return <p>Project not found</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          {project.description && (
            <p className="text-gray-500 mt-1">{project.description}</p>
          )}
        </div>
        <Button color="primary" onPress={() => navigate(`/projects/${id}/kpis/new`)}>
          Add KPI
        </Button>
      </div>

      {summary && <KpiSummaryCards summary={summary} />}

      <div>
        <h2 className="text-lg font-semibold mb-4">KPIs</h2>
        <KpiTable
          kpis={kpisData?.data ?? []}
          projectId={id!}
          page={kpiPage}
          totalPages={kpisData?.meta?.totalPages ?? 1}
          onPageChange={setKpiPage}
          isLoading={kpisLoading}
        />
      </div>
    </div>
  );
}
