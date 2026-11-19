'use client';

import { Playfair_Display, Inter } from 'next/font/google';
import { FileText, Minus, Plus } from 'lucide-react';
import { OFFICE_ESTIMATOR } from '@/data/office-estimator-data';
import { ESTIMATE_NOTE } from '@/data/estimator-copy';
import { formatINR, formatINRRange, type EstimatorProduct } from '@/lib/estimator';
import { useEstimator } from '@/lib/use-estimator';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['500', '600'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });

type OfficeEstimatorProps = {
  /** Opens the page's quote form (Farmhouse or Office variant from QuoteForm.tsx). */
  onScheduleCall: (configuration: string) => void;
};

const productGroups = OFFICE_ESTIMATOR.products.reduce<{ category: string; products: EstimatorProduct[] }[]>(
  (groups, product) => {
    const category = product.category ?? 'Products';
    const group = groups.find((item) => item.category === category);
    if (group) group.products.push(product);
    else groups.push({ category, products: [product] });
    return groups;
  },
  [],
);

export default function OfficeEstimator({ onScheduleCall }: OfficeEstimatorProps) {
  const config = OFFICE_ESTIMATOR;
  const estimator = useEstimator(config);
  const { product, area, total } = estimator;
  const configuration = `${product.name} | ${area === null ? 'Area not selected' : `${area.toLocaleString('en-IN')} sq. ft.`} | ${estimator.fitoutLevel === 'premium' ? 'Premium' : 'Standard'} fit-out | ${total === null ? 'Estimated cost unavailable' : `${formatINR(total)} estimated cost`}`;

  return (
    <section id="office-estimator" className="py-24 md:py-32 bg-linear-to-b from-white via-[#faf8f4] to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-14 text-center">
          <h2
            className={`${playfair.className} text-4xl md:text-6xl font-semibold bg-linear-to-r from-black via-[#886c46] to-black bg-clip-text text-transparent mb-4`}
          >
            Estimate Your Office
          </h2>
          <p className={`${inter.className} text-zinc-600 text-lg max-w-2xl mx-auto`}>
            Select an office solution and enter the space you need to see an approximate project cost.
          </p>
        </div>

        <div className={`${inter.className} rounded-3xl border border-black/10 bg-white p-3 shadow-xl`}>
          <div className="border-b border-black/10 px-3 pb-5 pt-3 sm:px-5 md:px-7 md:pt-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#886c46]">Cost Estimator</p>
              <h3 className={`${playfair.className} mt-1 text-2xl md:text-3xl font-semibold text-black`}>
                Office Project Estimate
              </h3>
            </div>

          </div>

          <div className="grid grid-cols-1 gap-3 pt-3 lg:grid-cols-5">
            {/* Inputs */}
            <div className="space-y-10 px-3 py-5 sm:px-5 md:px-7 md:py-7 lg:col-span-3">
              <fieldset>
                <legend className="mb-4 text-sm font-semibold text-black">1. Choose your office solution</legend>
                <div role="radiogroup" aria-label="Office solution" className="space-y-6">
                  {productGroups.map((group) => (
                    <div key={group.category}>
                      <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">
                        {group.category}
                      </p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {group.products.map((item) => {
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
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">{product.description}</p>
              </fieldset>

              <div>
                <label htmlFor="office-area" className="mb-4 block text-sm font-semibold text-black">
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
                    id="office-area"
                    type="text"
                    inputMode="numeric"
                    value={estimator.areaInput}
                    onChange={(event) => estimator.changeArea(event.target.value)}
                    aria-describedby="office-area-hint"
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
                <p id="office-area-hint" className={`mt-2 text-xs ${area === null ? 'text-red-600' : 'text-zinc-500'}`}>
                  Enter an area between {config.minArea.toLocaleString('en-IN')} and{' '}
                  {config.maxArea.toLocaleString('en-IN')} sq. ft.
                </p>
              </div>

              <fieldset>
                <legend className="mb-4 text-sm font-semibold text-black">3. Fit-out level</legend>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={estimator.fitoutLevel === 'standard'}
                    onClick={() => estimator.setFitoutLevel('standard')}
                    className={`rounded-2xl border px-3 py-4 text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#886c46] ${
                      estimator.fitoutLevel === 'standard'
                        ? 'border-[#886c46] bg-[#faf8f4] ring-1 ring-[#886c46]'
                        : 'border-black/10 bg-white hover:border-[#886c46]/40'
                    }`}
                  >
                    <span className="block text-base font-semibold text-[#886c46]">Standard</span>
                    <span className="mt-1 block text-xs text-zinc-500">Ready-to-use interiors</span>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={estimator.fitoutLevel === 'premium'}
                    onClick={() => estimator.setFitoutLevel('premium')}
                    className={`rounded-2xl border px-3 py-4 text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#886c46] ${
                      estimator.fitoutLevel === 'premium'
                        ? 'border-[#886c46] bg-[#faf8f4] ring-1 ring-[#886c46]'
                        : 'border-black/10 bg-white hover:border-[#886c46]/40'
                    }`}
                  >
                    <span className="block text-base font-semibold text-[#886c46]">Premium</span>
                    <span className="mt-1 block text-xs text-zinc-500">Upgraded finishes</span>
                  </button>
                </div>
              </fieldset>
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
                  <dd className="text-right font-medium">{formatINR(estimator.effectiveRatePerSqFt)}</dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="text-sm text-white/60">Estimated cost range</p>
                <p className={`${playfair.className} mt-1 max-w-full break-words text-2xl font-semibold leading-tight text-[#d7a661] sm:text-3xl md:text-4xl`}>
                  {total === null ? '—' : formatINRRange(total)}
                </p>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-white/50">{ESTIMATE_NOTE}</p>

              <div className="mt-auto pt-6">
                <button
                  type="button"
                  onClick={() => onScheduleCall(configuration)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#886c46] py-3 text-sm font-semibold text-white transition hover:bg-[#d7a661]"
                >
                  <FileText size={16} />
                  Get the Free Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
