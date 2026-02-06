/**
 * USD currency formatter using Intl.NumberFormat
 */
const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function isNumeric(value: string): boolean {
  if (value === '' || value === null || value === undefined) {
    return false;
  }
  // Remove currency symbols and commas for validation
  const cleaned = value.replace(/[$,]/g, '').trim();
  return cleaned !== '' && !isNaN(Number(cleaned)) && isFinite(Number(cleaned));
}

/**
 * Formats a value as USD currency if it's numeric
 * @param value - The value to format
 * @returns Formatted currency string if numeric, original value otherwise
 */
export function formatCell(value: string): string {
  if (!value || value.trim() === '') {
    return value;
  }

  if (!isNumeric(value)) {
    return value;
  }

  // Remove any existing formatting
  const cleaned = value.replace(/[$,]/g, '').trim();
  const numberValue = Number(cleaned);

  return usdFormatter.format(numberValue);
}
