import { Card, CardHeader, CardBody, DonutChart } from '@wsp/ui';
import type { ProjectSummary } from '@wsp/shared';

interface StatusDonutChartProps {
  summaries: ProjectSummary[];
}

export function StatusDonutChart({ summaries }: StatusDonutChartProps) {
  const totals = summaries.reduce(
    (acc, s) => ({
      completed: acc.completed + s.completed,
      onTrack: acc.onTrack + s.onTrack,
      atRisk: acc.atRisk + s.atRisk,
      behind: acc.behind + s.behind,
    }),
    { completed: 0, onTrack: 0, atRisk: 0, behind: 0 },
  );

  const data = [
    { name: 'Completed', value: totals.completed, color: '#17c964' },
    { name: 'On Track', value: totals.onTrack, color: '#006FEE' },
    { name: 'At Risk', value: totals.atRisk, color: '#f5a524' },
    { name: 'Behind', value: totals.behind, color: '#f31260' },
  ].filter((d) => d.value > 0);

  if (data.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">KPI Status Distribution</h3>
      </CardHeader>
      <CardBody>
        <DonutChart data={data} height={280} />
      </CardBody>
    </Card>
  );
}
