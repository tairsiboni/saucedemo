// Helper functions for working with prices

// Extracts a price from text, e.g. "$29.99" or "Item total: $59.98" -> 29.99 / 59.98
export const moneyFrom = (text: string): number => {
  const match = text.match(/\$(\d+\.\d{2})/);
  if (!match) throw new Error(`No price found in "${text}"`);
  return parseFloat(match[1]);
};

// Converts an amount to whole cents, to avoid floating-point errors: 29.99 -> 2999
export const toCents = (amount: number): number => Math.round(amount * 100);