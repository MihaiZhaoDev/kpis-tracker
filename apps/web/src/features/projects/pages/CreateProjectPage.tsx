import { useNavigate } from 'react-router-dom';
import { useCreateProject } from '../hooks/useProjects';
import { ProjectForm } from '../components/ProjectForm';

export function CreateProjectPage() {
  const navigate = useNavigate();
  const createProject = useCreateProject();

  const handleSubmit = async (data: { name: string; description?: string }) => {
    await createProject.mutateAsync(data);
    navigate('/projects');
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Create Project</h1>
      <ProjectForm onSubmit={handleSubmit} submitLabel="Create Project" />
    </div>
  );
}
