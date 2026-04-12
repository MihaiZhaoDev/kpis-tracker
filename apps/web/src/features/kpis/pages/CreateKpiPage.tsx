import { useParams, useNavigate } from 'react-router-dom';
import { useCreateKpi } from '../hooks/useKpis';
import { KpiForm } from '../components/KpiForm';

export function CreateKpiPage() {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const createKpi = useCreateKpi(projectId!);

  const handleSubmit = async (data: any) => {
    await createKpi.mutateAsync(data);
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Add KPI</h1>
      <KpiForm onSubmit={handleSubmit} />
    </div>
  );
}
