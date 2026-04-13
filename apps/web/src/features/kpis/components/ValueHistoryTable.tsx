import { DataTable, type Column } from '@wsp/ui';
import { formatDate, formatValue } from '../../../lib/utils';

interface ValueRow {
  id: string;
  actualValue: number;
  recordedAt: string;
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
      key: 'recordedAt',
      label: 'Date',
      render: (item) => formatDate(item.recordedAt),
    },
    {
      key: 'actualValue',
      label: 'Value',
      render: (item) => formatValue(Number(item.actualValue), unit, valueType),
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
