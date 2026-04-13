export function formatValue(value: number, unit: string, valueType: string): string {
  switch (valueType) {
    case 'currency':
      return `${unit === 'USD' ? '$' : unit}${value.toLocaleString()}`;
    case 'percentage':
      return `${value}%`;
    case 'integer':
      return `${Math.round(value).toLocaleString()} ${unit}`;
    default:
      return `${value.toLocaleString()} ${unit}`;
  }
}

export function formatDate(dateStr: string | Date): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  if (isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
