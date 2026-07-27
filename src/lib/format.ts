/**
 * Format a number to Indian Rupee (₹) currency format.
 */
export const formatPrice = (amount: number): string => {
  if (amount % 1 !== 0) {
    return `₹${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};
