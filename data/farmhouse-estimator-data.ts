import type { EstimatorConfig } from '@/lib/estimator';

/**
 * Farmhouse estimator configuration.
 * Product names and descriptions mirror the "Explore Our Products" section (components/SolutionsSection.tsx).
 * Rates are DUMMY values in INR per sq. ft. — update them here; the UI and PDF pick them up automatically.
 */
export const FARMHOUSE_ESTIMATOR: EstimatorConfig = {
  minArea: 100,
  maxArea: 20000,
  areaStep: 50,
  products: [
    {
      id: 'barn-house',
      name: 'Resort Collection',
      description: 'High-ceiling homes inspired by traditional barn designs.',
      ratePerSqFt: 5000,
      defaultArea: 1200,
    },
    {
      id: 'prefab-homes',
      name: 'Prefab Homes',
      description: 'Factory-built homes assembled on-site quickly.',
      ratePerSqFt: 3500,
      defaultArea: 1000,
    },
    {
      id: 'container-homes',
      name: 'Container Homes',
      description: 'Habitable spaces created from shipping containers.',
      ratePerSqFt: 1500,
      defaultArea: 320,
    },
    {
      id: 'farmhouse',
      name: 'Farmhouse',
      description: 'Standalone homes built for farmland and open plots.',
      ratePerSqFt: 2500,
      defaultArea: 1500,
    },
  ],
};
