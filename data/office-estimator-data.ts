import type { EstimatorConfig } from '@/lib/estimator';

/**
 * Office estimator configuration.
 * Product names and descriptions mirror the Office page sections
 * (components/OfficeProducts.tsx and components/ExtendedProducts.tsx).
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
    {
      id: 'ms-security-cabin',
      name: 'MS Security Cabin',
      category: 'Extended Products',
      description: 'Compact modular cabin ideal for entry gates and security checkpoints.',
      ratePerSqFt: 2000,
      defaultArea: 64,
    },
    {
      id: 'acp-security-cabin',
      name: 'ACP Security Cabin',
      category: 'Extended Products',
      description: 'Insulated premium security cabin with lighting and ventilation.',
      ratePerSqFt: 2800,
      defaultArea: 64,
    },
    {
      id: 'portable-toilets',
      name: 'Portable Toilets',
      category: 'Extended Products',
      description: 'Temporary sanitation solutions for construction sites and outdoor events.',
      ratePerSqFt: 1800,
      defaultArea: 24,
    },
    {
      id: 'modular-restrooms',
      name: 'Modular Restrooms',
      category: 'Extended Products',
      description: 'Prefab restroom facilities for commercial and public infrastructure.',
      ratePerSqFt: 2400,
      defaultArea: 150,
    },
  ],
};
