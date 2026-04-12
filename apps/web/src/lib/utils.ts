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

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
