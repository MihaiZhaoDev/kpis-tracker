import { describe, it, expect } from 'vitest';
import { formatValue, formatDate } from './utils';

describe('formatValue', () => {
  it('formats currency with USD', () => {
    expect(formatValue(10000, 'USD', 'currency')).toBe('$10,000');
  });

  it('formats currency with non-USD', () => {
    expect(formatValue(5000, 'EUR', 'currency')).toBe('EUR5,000');
  });

  it('formats percentage', () => {
    expect(formatValue(85.5, '%', 'percentage')).toBe('85.5%');
  });

  it('formats integer with unit', () => {
    expect(formatValue(42, 'count', 'integer')).toBe('42 count');
  });

  it('formats decimal with unit', () => {
    expect(formatValue(3.14, 'hours', 'decimal')).toBe('3.14 hours');
  });
});

describe('formatDate', () => {
  it('formats ISO date string', () => {
    const result = formatDate('2026-04-10T09:15:00.000Z');
    expect(result).toContain('Apr');
    expect(result).toContain('2026');
  });

  it('handles Date object', () => {
    const result = formatDate(new Date('2026-04-10'));
    expect(result).toContain('Apr');
  });

  it('returns dash for invalid date', () => {
    expect(formatDate('not-a-date')).toBe('-');
  });
});
