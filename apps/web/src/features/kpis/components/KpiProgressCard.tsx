import { Card, CardHeader, CardBody, StatusBadge } from '@wsp/ui';
import { formatValue } from '../../../lib/utils';

interface KpiProgressCardProps {
  kpi: {
    name: string;
    target_value: number;
    actual_value: number | null;
    unit: string;
    value_type: string;
    status: string | null;
  };
}

export function KpiProgressCard({ kpi }: KpiProgressCardProps) {
  const actual = kpi.actual_value != null ? Number(kpi.actual_value) : 0;
  const target = Number(kpi.target_value);
  const progress = target > 0 ? Math.min((actual / target) * 100, 100) : 0;

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{kpi.name}</h3>
        {kpi.status && <StatusBadge status={kpi.status as any} />}
      </CardHeader>
      <CardBody className="flex flex-col gap-3">
        <div className="flex justify-between text-sm">
          <span>Actual: <strong>{formatValue(actual, kpi.unit, kpi.value_type)}</strong></span>
          <span>Target: <strong>{formatValue(target, kpi.unit, kpi.value_type)}</strong></span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 text-right">{progress.toFixed(1)}%</p>
      </CardBody>
    </Card>
  );
}
