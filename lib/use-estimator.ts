'use client';

import { useState } from 'react';
import type { QuoteFormData } from '@/components/QuoteForm';
import { compareWithBudget, parseArea, type EstimatorConfig } from '@/lib/estimator';

/**
 * State and derived values for a cost estimator.
 * The budget is read from the page's existing quote-form state (never copied),
 * so the comparison always reflects what the customer has selected.
 */
export function useEstimator(config: EstimatorConfig, customer: QuoteFormData) {
  const [productId, setProductId] = useState(config.products[0].id);
  const [areaInput, setAreaInput] = useState(String(config.products[0].defaultArea));
  const [areaEdited, setAreaEdited] = useState(false);
  const [fitoutLevel, setFitoutLevel] = useState<'standard' | 'premium'>('standard');

  const product = config.products.find((item) => item.id === productId) ?? config.products[0];
  const area = parseArea(areaInput, config);
  const fitoutPremiumPerSqFt = fitoutLevel === 'premium' ? 650 : 0;
  const effectiveRatePerSqFt = product.ratePerSqFt + fitoutPremiumPerSqFt;
  const total = area === null ? null : area * effectiveRatePerSqFt;
  const budgetStatus = total === null ? null : compareWithBudget(total, customer.budgetRange);

  const selectProduct = (id: string) => {
    const next = config.products.find((item) => item.id === id);
    if (!next) return;
    setProductId(id);
    // Pre-fill a typical size for the product until the customer types their own area.
    if (!areaEdited) setAreaInput(String(next.defaultArea));
  };

  const changeArea = (value: string) => {
    setAreaInput(value.replace(/[^\d]/g, '').slice(0, 6));
    setAreaEdited(true);
  };

  const stepArea = (direction: 1 | -1) => {
    const current = Number(areaInput) || 0;
    const next = Math.min(config.maxArea, Math.max(config.minArea, current + direction * config.areaStep));
    setAreaInput(String(next));
    setAreaEdited(true);
  };

  return {
    product,
    selectProduct,
    areaInput,
    area,
    changeArea,
    stepArea,
    total,
    budgetStatus,
    fitoutLevel,
    setFitoutLevel,
    effectiveRatePerSqFt,
  };
}
