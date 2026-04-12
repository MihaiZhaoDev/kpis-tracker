import { Card, CardHeader, CardBody, LineChart } from '@wsp/ui';
import { formatDate } from '../../../lib/utils';

interface TrendLineChartProps {
  values: { actual_value: number; recorded_at: string }[];
  targetValue: number;
}

export function TrendLineChart({ values, targetValue }: TrendLineChartProps) {
  const chartData = [...values]
    .reverse()
    .map((v) => ({
      date: formatDate(v.recorded_at),
      actual: Number(v.actual_value),
    }));

  if (chartData.length === 0) {
    return (
      <Card>
        <CardBody className="text-center py-8 text-gray-400">
          No recorded values yet. Record your first measurement.
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Trend</h3>
      </CardHeader>
      <CardBody>
        <LineChart
          data={chartData}
          xKey="date"
          series={[{ key: 'actual', color: '#006FEE', name: 'Actual' }]}
          referenceLine={{ y: Number(targetValue), label: 'Target', color: '#17c964' }}
          height={300}
        />
      </CardBody>
    </Card>
  );
}
