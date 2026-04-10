import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
} from '@heroui/react';
import { Key, ReactNode } from 'react';

export interface Column<T> { key: string; label: string; render?: (item: T) => ReactNode; }

export interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[]; data: T[]; page?: number; totalPages?: number;
  onPageChange?: (page: number) => void; onRowAction?: (key: Key) => void;
  isLoading?: boolean; emptyContent?: string;
}

export function DataTable<T extends { id: string }>({
  columns, data, page, totalPages, onPageChange, onRowAction, isLoading,
  emptyContent = 'No data found',
}: DataTableProps<T>) {
  return (
    <div className="flex flex-col gap-4">
      <Table aria-label="Data table" onRowAction={onRowAction}
        selectionMode={onRowAction ? 'single' : undefined}>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={data} isLoading={isLoading} emptyContent={emptyContent}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                const column = columns.find((c) => c.key === String(columnKey));
                const value = item[columnKey as keyof T];
                return <TableCell>{column?.render ? column.render(item) : String(value ?? '')}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {totalPages && totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination total={totalPages} page={page} onChange={onPageChange} />
        </div>
      )}
    </div>
  );
}
