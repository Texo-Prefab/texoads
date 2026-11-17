'use client';

import { Playfair_Display, Inter } from 'next/font/google';
import { Minus, PhoneCall, Plus } from 'lucide-react';
import type { QuoteFormData } from '@/components/QuoteForm';
import { FARMHOUSE_ESTIMATOR } from '@/data/farmhouse-estimator-data';
import { BUDGET_RANGES } from '@/data/budget-ranges';
import { ESTIMATE_NOTE } from '@/data/estimator-copy';
import { formatINR, formatINRShort } from '@/lib/estimator';
import { useEstimator } from '@/lib/use-estimator';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['500', '600'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });

type FarmhouseEstimatorProps = {
  /** The page's existing quote-form state (read-only, except the budget). */
  formData: QuoteFormData;
  onBudgetChange: (budgetRange: string) => void;
  /** Opens the page's quote form (Farmhouse or Office variant from QuoteForm.tsx). */
  onScheduleCall: () => void;
};

export default function FarmhouseEstimator({ formData, onBudgetChange, onScheduleCall }: FarmhouseEstimatorProps) {
  const config = FARMHOUSE_ESTIMATOR;
  const estimator = useEstimator(config, formData);
  const { product, area, total, budgetStatus } = estimator;

  return (
    <section id="farmhouse-estimator" className="py-24 md:py-32 bg-linear-to-b from-white via-[#faf8f4] to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-14 text-center">
          <h2
            className={`${playfair.className} text-4xl md:text-6xl font-semibold bg-linear-to-r from-black via-[#886c46] to-black bg-clip-text text-transparent mb-4`}
          >
            Estimate Your Farmhouse
          </h2>
          <p className={`${inter.className} text-zinc-600 text-lg max-w-2xl mx-auto`}>
            Choose a design and enter the area you need to see an approximate project cost.
          </p>
        </div>

        <div className={`${inter.className} rounded-3xl border border-black/10 bg-white p-3 shadow-xl`}>
          {/* Header: title + budget in the corner */}
          <div className="flex flex-col gap-4 border-b border-black/10 px-3 pb-5 pt-3 sm:flex-row sm:items-end sm:justify-between sm:px-5 md:px-7 md:pt-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#886c46]">Cost Estimator</p>
              <h3 className={`${playfair.className} mt-1 text-2xl md:text-3xl font-semibold text-black`}>
                Farmhouse Project Estimate
              </h3>
            </div>

            <label className="flex flex-col sm:items-end">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Selected Budget</span>
              <select
                value={formData.budgetRange}
                onChange={(event) => onBudgetChange(event.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-[#886c46]/30 bg-[#faf8f4] px-4 py-2.5 text-sm font-semibold text-black focus:border-[#886c46] focus:outline-none sm:w-auto"
              >
                <option value="">Select Budget Range</option>
                {BUDGET_RANGES.map((budget) => (
                  <option key={budget.label} value={budget.label}>
                    {budget.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-3 lg:grid-cols-5">
            {/* Inputs */}
            <div className="space-y-10 px-3 py-5 sm:px-5 md:px-7 md:py-7 lg:col-span-3">
              <fieldset>
                <legend className="mb-4 text-sm font-semibold text-black">1. Choose your design</legend>
                <div role="radiogroup" aria-label="Farmhouse design" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {config.products.map((item) => {
                    const selected = item.id === product.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => estimator.selectProduct(item.id)}
                        className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#886c46] ${
                          selected
                            ? 'border-[#886c46] bg-[#faf8f4] ring-1 ring-[#886c46]'
                            : 'border-black/10 bg-white hover:border-[#886c46]/40'
                        }`}
                      >
                        <span className={`text-[15px] font-semibold ${selected ? 'text-[#886c46]' : 'text-black'}`}>
                          {item.name}
                        </span>
                        <span className="shrink-0 text-xs text-zinc-500">
                          {formatINR(item.ratePerSqFt)}/sq. ft.
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">{product.description}</p>
              </fieldset>

              <div>
                <label htmlFor="farmhouse-area" className="mb-4 block text-sm font-semibold text-black">
                  2. Required construction area
                </label>
                <div className="flex items-stretch overflow-hidden rounded-2xl border border-black/10 bg-white focus-within:border-[#886c46]">
                  <button
                    type="button"
                    onClick={() => estimator.stepArea(-1)}
                    aria-label="Decrease area"
                    className="px-4 text-zinc-500 transition hover:bg-[#faf8f4] hover:text-[#886c46]"
                  >
                    <Minus size={18} />
                  </button>
                  <input
                    id="farmhouse-area"
                    type="text"
                    inputMode="numeric"
                    value={estimator.areaInput}
                    onChange={(event) => estimator.changeArea(event.target.value)}
                    aria-describedby="farmhouse-area-hint"
                    className="w-full min-w-0 bg-transparent px-2 py-3 text-center text-lg font-semibold text-black focus:outline-none"
                  />
                  <span className="flex items-center whitespace-nowrap pr-3 text-sm text-zinc-500">sq. ft.</span>
                  <button
                    type="button"
                    onClick={() => estimator.stepArea(1)}
                    aria-label="Increase area"
                    className="border-l border-black/10 px-4 text-zinc-500 transition hover:bg-[#faf8f4] hover:text-[#886c46]"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <p
                  id="farmhouse-area-hint"
                  className={`mt-2 text-xs ${area === null ? 'text-red-600' : 'text-zinc-500'}`}
                >
                  Enter an area between {config.minArea.toLocaleString('en-IN')} and{' '}
                  {config.maxArea.toLocaleString('en-IN')} sq. ft.
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="flex flex-col rounded-2xl bg-[#111110] p-6 text-white md:p-8 lg:col-span-2" aria-live="polite">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#d7a661]">Your Estimate</p>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Product</dt>
                  <dd className="text-right font-medium">{product.name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Required area</dt>
                  <dd className="text-right font-medium">{area === null ? '—' : `${area.toLocaleString('en-IN')} sq. ft.`}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Cost per sq. ft.</dt>
                  <dd className="text-right font-medium">{formatINR(product.ratePerSqFt)}</dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="text-sm text-white/60">Estimated total cost</p>
                <p className={`${playfair.className} mt-1 text-4xl font-semibold text-[#d7a661] md:text-5xl`}>
                  {total === null ? '—' : formatINR(total)}
                </p>
                {total !== null && <p className="mt-1 text-sm text-white/60">≈ {formatINRShort(total)}</p>}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 px-4 py-3 text-sm">
                {!formData.budgetRange ? (
                  <span className="text-white/60">Select a budget range to compare.</span>
                ) : budgetStatus === null ? (
                  <span className="text-white/60">Enter a valid area to compare with your budget.</span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${budgetStatus === 'within' ? 'bg-emerald-400' : 'bg-red-400'}`}
                    />
                    <span>
                      {budgetStatus === 'within' ? 'Within' : 'Above'} your budget of{' '}
                      <span className="font-semibold">{formData.budgetRange}</span>
                    </span>
                  </span>
                )}
              </div>

              <p className="mt-5 text-xs leading-relaxed text-white/50">{ESTIMATE_NOTE}</p>

              <div className="mt-auto pt-6">
                <button
                  type="button"
                  onClick={onScheduleCall}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#886c46] py-3 text-sm font-semibold text-white transition hover:bg-[#d7a661]"
                >
                  <PhoneCall size={16} />
                  Schedule a Free Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
