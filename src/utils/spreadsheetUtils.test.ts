import { describe, it, expect } from 'vitest';
import { getColumnLabel } from './spreadsheetUtils';

describe('getColumnLabel', () => {
  it('should convert single digit indices to single letters', () => {
    expect(getColumnLabel(0)).toBe('A');
    expect(getColumnLabel(1)).toBe('B');
    expect(getColumnLabel(25)).toBe('Z');
  });

  it('should convert to double letters after Z', () => {
    expect(getColumnLabel(26)).toBe('AA');
    expect(getColumnLabel(27)).toBe('AB');
    expect(getColumnLabel(51)).toBe('AZ');
    expect(getColumnLabel(52)).toBe('BA');
    expect(getColumnLabel(701)).toBe('ZZ');
  });

  it('should convert to triple letters after ZZ', () => {
    expect(getColumnLabel(702)).toBe('AAA');
    expect(getColumnLabel(703)).toBe('AAB');
    expect(getColumnLabel(727)).toBe('AAZ');
    expect(getColumnLabel(728)).toBe('ABA');
  });

  it('should handle edge cases', () => {
    expect(getColumnLabel(0)).toBe('A');
    expect(getColumnLabel(675)).toBe('YZ');
    expect(getColumnLabel(676)).toBe('ZA');
    expect(getColumnLabel(701)).toBe('ZZ');
    expect(getColumnLabel(702)).toBe('AAA');
  });

  it('should handle large indices', () => {
    expect(getColumnLabel(18277)).toBe('ZZZ');
    expect(getColumnLabel(18278)).toBe('AAAA');
  });
});