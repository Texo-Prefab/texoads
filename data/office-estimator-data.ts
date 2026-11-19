import type { EstimatorConfig } from '@/lib/estimator';

/**
 * Office estimator configuration.
 * Product names and descriptions mirror the Office page's office solutions.
 * Rates are DUMMY values in INR per sq. ft., kept in line with the "Starting at" prices shown on the product cards.
 * Update them here; the UI and PDF pick them up automatically.
 */
export const OFFICE_ESTIMATOR: EstimatorConfig = {
  minArea: 20,
  maxArea: 20000,
  areaStep: 10,
  products: [
    {
      id: 'container-office',
      name: 'Container Office',
      category: 'Office Solutions',
      description: 'Practical, durable spaces with efficient layouts for everyday site operations.',
      ratePerSqFt: 1500,
      defaultArea: 320,
    },
    {
      id: 'modular-office',
      name: 'Modular Office',
      category: 'Office Solutions',
      description: 'Premium finishes and comfortable interiors for a professional working environment.',
      ratePerSqFt: 2500,
      defaultArea: 1000,
    },
    {
      id: 'prefab-site-office',
      name: 'Prefab Site Office',
      category: 'Office Solutions',
      description: 'Tailor-made solutions designed around your site, specifications, and project needs.',
      ratePerSqFt: 3500,
      defaultArea: 800,
    },
  ],
};
