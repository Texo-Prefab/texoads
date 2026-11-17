/**
 * Budget ranges offered by the quote forms.
 * `label` must match the <option> text used by the forms exactly,
 * because the estimators read the customer's selection from that shared form state.
 * `max: null` means the range is open-ended.
 */
export type BudgetRange = {
  label: string;
  min: number;
  max: number | null;
};

export const BUDGET_RANGES: BudgetRange[] = [
  { label: '₹5 - 10 Lakhs', min: 5_00_000, max: 10_00_000 },
  { label: '₹10 - 15 Lakhs', min: 10_00_000, max: 15_00_000 },
  { label: '₹15 - 20 Lakhs', min: 15_00_000, max: 20_00_000 },
  { label: '₹20L - 1Cr+', min: 20_00_000, max: null },
];
