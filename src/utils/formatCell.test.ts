import { describe, it, expect } from 'vitest';
import { formatCell } from './formatCell';

describe('formatCell', () => {
  it('should format numeric strings as USD currency', () => {
    expect(formatCell('1000')).toBe('$1,000.00');
    expect(formatCell('1234.56')).toBe('$1,234.56');
    expect(formatCell('0')).toBe('$0.00');
    expect(formatCell('999999')).toBe('$999,999.00');
  });

  it('should handle decimal values correctly', () => {
    expect(formatCell('10.5')).toBe('$10.50');
    expect(formatCell('10.99')).toBe('$10.99');
    expect(formatCell('10.999')).toBe('$11.00'); // Rounds to 2 decimal places
  });

  it('should handle negative values', () => {
    expect(formatCell('-100')).toBe('-$100.00');
    expect(formatCell('-1234.56')).toBe('-$1,234.56');
  });

  it('should return original value for non-numeric strings', () => {
    expect(formatCell('hello')).toBe('hello');
    expect(formatCell('12abc')).toBe('12abc');
    expect(formatCell('N/A')).toBe('N/A');
  });

  it('should handle empty strings', () => {
    expect(formatCell('')).toBe('');
    expect(formatCell('  ')).toBe('  ');
  });

  it('should handle already formatted currency', () => {
    expect(formatCell('$1,234.56')).toBe('$1,234.56');
    expect(formatCell('$100')).toBe('$100.00');
  });
});
