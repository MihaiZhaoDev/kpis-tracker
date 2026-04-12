import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, StatusBadge, Spinner } from '@wsp/ui';
import { useProjectSummary } from '../hooks/useDashboard';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string | null;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const { data: summary, isLoading } = useProjectSummary(project.id);

  return (
    <Card isPressable onPress={() => navigate(`/projects/${project.id}`)}>
      <CardHeader className="flex flex-col items-start gap-1">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        {project.description && (
          <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
        )}
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <Spinner size="sm" />
        ) : summary ? (
          <div className="flex flex-wrap gap-2">
            {summary.completed > 0 && <StatusBadge status="completed" />}
            {summary.onTrack > 0 && <StatusBadge status="on_track" />}
            {summary.atRisk > 0 && <StatusBadge status="at_risk" />}
            {summary.behind > 0 && <StatusBadge status="behind" />}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No KPIs yet</p>
        )}
      </CardBody>
      <CardFooter>
        <p className="text-sm text-gray-500">
          {summary ? `${summary.totalKpis} KPIs · ${summary.overallProgress}% complete` : '...'}
        </p>
      </CardFooter>
    </Card>
  );
}
