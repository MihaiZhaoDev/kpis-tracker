import { useNavigate } from 'react-router-dom';
import { DataTable, StatusBadge, type Column } from '@wsp/ui';
import { formatValue } from '../../../lib/utils';

interface KpiRow {
  id: string;
  name: string;
  category: string | null;
  unit: string;
  value_type: string;
  target_value: number;
  actual_value: number | null;
  status: string | null;
}

interface KpiTableProps {
  kpis: KpiRow[];
  projectId: string;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export function KpiTable({ kpis, projectId, page, totalPages, onPageChange, isLoading }: KpiTableProps) {
  const navigate = useNavigate();

  const columns: Column<KpiRow>[] = [
    { key: 'name', label: 'KPI Name' },
    { key: 'category', label: 'Category', render: (item) => item.category ?? '-' },
    {
      key: 'target_value',
      label: 'Target',
      render: (item) => formatValue(Number(item.target_value), item.unit, item.value_type),
    },
    {
      key: 'actual_value',
      label: 'Actual',
      render: (item) =>
        item.actual_value != null
          ? formatValue(Number(item.actual_value), item.unit, item.value_type)
          : '-',
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) =>
        item.status ? <StatusBadge status={item.status as any} /> : <span className="text-gray-400">No data</span>,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={kpis}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onRowAction={(key) => navigate(`/projects/${projectId}/kpis/${key}`)}
      isLoading={isLoading}
      emptyContent="No KPIs yet. Add your first KPI to start tracking."
    />
  );
}
