import { useParams } from 'react-router-dom';
import { Spinner, Card, CardHeader, CardBody } from '@wsp/ui';
import { useKpi, useKpiValues, useRecordValue } from '../hooks/useKpis';
import { KpiProgressCard } from '../components/KpiProgressCard';
import { TrendLineChart } from '../components/TrendLineChart';
import { ValueHistoryTable } from '../components/ValueHistoryTable';
import { RecordValueForm } from '../components/RecordValueForm';

export function KpiDetailPage() {
  const { id: projectId, kpiId } = useParams<{ id: string; kpiId: string }>();
  const { data: kpi, isLoading } = useKpi(projectId!, kpiId!);
  const { data: valuesData } = useKpiValues(projectId!, kpiId!);
  const recordValue = useRecordValue(projectId!, kpiId!);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!kpi) return <p>KPI not found</p>;

  const values = valuesData?.data ?? [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{kpi.name}</h1>
      {kpi.description && <p className="text-gray-500">{kpi.description}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <KpiProgressCard kpi={kpi} />
          <TrendLineChart values={values} targetValue={kpi.target_value} />
          <div>
            <h2 className="text-lg font-semibold mb-4">History</h2>
            <ValueHistoryTable values={values} unit={kpi.unit} valueType={kpi.value_type} />
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Record Value</h3>
            </CardHeader>
            <CardBody>
              <RecordValueForm
                onSubmit={async (data) => {
                  await recordValue.mutateAsync(data);
                }}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
