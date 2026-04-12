import { Card, CardBody } from '@wsp/ui';
import type { ProjectSummary } from '@wsp/shared';

interface KpiSummaryCardsProps {
  summary: ProjectSummary;
}

export function KpiSummaryCards({ summary }: KpiSummaryCardsProps) {
  const cards = [
    { label: 'Total KPIs', value: summary.totalKpis, color: 'text-gray-700' },
    { label: 'Completed', value: summary.completed, color: 'text-success' },
    { label: 'On Track', value: summary.onTrack, color: 'text-primary' },
    { label: 'At Risk', value: summary.atRisk, color: 'text-warning' },
    { label: 'Behind', value: summary.behind, color: 'text-danger' },
    { label: 'Progress', value: `${summary.overallProgress}%`, color: 'text-gray-700' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardBody className="text-center py-3">
            <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-xs text-gray-500">{card.label}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
