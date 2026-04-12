import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from '@wsp/ui';
import { useProjects } from '../hooks/useProjects';
import { ProjectCard } from '../../dashboard/components/ProjectCard';

export function ProjectListPage() {
  const navigate = useNavigate();
  const [page] = useState(1);
  const { data, isLoading } = useProjects(page);
  const projects = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" label="Loading projects..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button color="primary" onPress={() => navigate('/projects/new')}>
          New Project
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p: any) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      {projects.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No projects yet. Create your first project to get started.
        </div>
      )}
    </div>
  );
}
