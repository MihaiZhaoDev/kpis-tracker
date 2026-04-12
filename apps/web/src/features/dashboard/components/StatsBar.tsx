import { Card, CardBody } from '@wsp/ui';
import type { ProjectSummary } from '@wsp/shared';

interface StatsBarProps {
  summaries: ProjectSummary[];
  projectCount: number;
}

export function StatsBar({ summaries, projectCount }: StatsBarProps) {
  const totals = summaries.reduce(
    (acc, s) => ({
      kpis: acc.kpis + s.totalKpis,
      completed: acc.completed + s.completed,
      onTrack: acc.onTrack + s.onTrack,
      atRisk: acc.atRisk + s.atRisk,
      behind: acc.behind + s.behind,
    }),
    { kpis: 0, completed: 0, onTrack: 0, atRisk: 0, behind: 0 },
  );

  const stats = [
    { label: 'Projects', value: projectCount, color: 'text-gray-700' },
    { label: 'Total KPIs', value: totals.kpis, color: 'text-gray-700' },
    { label: 'Completed', value: totals.completed, color: 'text-success' },
    { label: 'On Track', value: totals.onTrack, color: 'text-primary' },
    { label: 'At Risk', value: totals.atRisk, color: 'text-warning' },
    { label: 'Behind', value: totals.behind, color: 'text-danger' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardBody className="text-center py-4">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
