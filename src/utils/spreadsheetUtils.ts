/**
 * Converts a zero-based column index to an Excel-style column label
 * Examples: 0 -> 'A', 1 -> 'B', 25 -> 'Z', 26 -> 'AA', 27 -> 'AB', etc.
 */
export function getColumnLabel(index: number): string {
  let label = '';
  let num = index;

  while (num >= 0) {
    label = String.fromCharCode(65 + (num % 26)) + label;
    num = Math.floor(num / 26) - 1;
  }

  return label;
}
