import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from '@wsp/ui';
import { useDashboardProjects } from '../hooks/useDashboard';
import { ProjectCard } from '../components/ProjectCard';
import { StatsBar } from '../components/StatsBar';
import { StatusDonutChart } from '../components/StatusDonutChart';
import { useQueries } from '@tanstack/react-query';
import { dashboardApi } from '../api';
import type { ProjectSummary } from '@wsp/shared';

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: projectsData, isLoading } = useDashboardProjects();
  const projects = projectsData?.data ?? [];

  const summaryQueries = useQueries({
    queries: projects.map((p: any) => ({
      queryKey: ['projects', p.id, 'summary'],
      queryFn: async () => {
        const res = await dashboardApi.getProjectSummary(p.id);
        return res.data.data;
      },
    })),
  });

  const summaries = summaryQueries
    .filter((q) => q.isSuccess)
    .map((q) => q.data) as ProjectSummary[];

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" label="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button color="primary" onPress={() => navigate('/projects/new')}>
          New Project
        </Button>
      </div>

      <StatsBar summaries={summaries} projectCount={projects.length} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p: any) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
          {projects.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No projects yet. Create your first project to get started.</p>
            </div>
          )}
        </div>
        <div>
          <StatusDonutChart summaries={summaries} />
        </div>
      </div>
    </div>
  );
}
