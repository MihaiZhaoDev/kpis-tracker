import { DataTable, type Column } from '@wsp/ui';
import { formatDate, formatValue } from '../../../lib/utils';

interface ValueRow {
  id: string;
  actual_value: number;
  recorded_at: string;
  notes: string | null;
}

interface ValueHistoryTableProps {
  values: ValueRow[];
  unit: string;
  valueType: string;
}

export function ValueHistoryTable({ values, unit, valueType }: ValueHistoryTableProps) {
  const columns: Column<ValueRow>[] = [
    {
      key: 'recorded_at',
      label: 'Date',
      render: (item) => formatDate(item.recorded_at),
    },
    {
      key: 'actual_value',
      label: 'Value',
      render: (item) => formatValue(Number(item.actual_value), unit, valueType),
    },
    {
      key: 'notes',
      label: 'Notes',
      render: (item) => item.notes ?? '-',
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={values}
      emptyContent="No recorded values yet."
    />
  );
}
