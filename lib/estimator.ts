export type EstimatorProduct = {
  id: string;
  name: string;
  description: string;
  /** Optional grouping label shown in the product picker. */
  category?: string;
  /** Dummy rate in INR per sq. ft. */
  ratePerSqFt: number;
  /** Area pre-filled when the product is picked and the customer hasn't typed one yet. */
  defaultArea: number;
};

export type EstimatorConfig = {
  products: EstimatorProduct[];
  minArea: number;
  maxArea: number;
  areaStep: number;
};

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatINR(amount: number) {
  return inrFormatter.format(Math.round(amount));
}

/** Human-friendly lakh / crore figure, e.g. "₹12.50 Lakhs". */
export function formatINRShort(amount: number) {
  if (amount >= 1_00_00_000) return `₹${(amount / 1_00_00_000).toFixed(2)} Cr`;
  if (amount >= 1_00_000) return `₹${(amount / 1_00_000).toFixed(2)} Lakhs`;
  return formatINR(amount);
}

export function formatINRRange(amount: number) {
  const variance = amount < 5_00_000 ? 1_50_000 : amount > 10_00_000 ? 3_00_000 : 2_00_000;
  return `${formatINR(Math.max(0, amount - variance))} - ${formatINR(amount + variance)}`;
}

export function parseArea(value: string, config: Pick<EstimatorConfig, 'minArea' | 'maxArea'>) {
  const area = Number(value);
  if (!Number.isFinite(area) || area < config.minArea || area > config.maxArea) return null;
  return area;
}
