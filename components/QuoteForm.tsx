'use client';

import type { FormEvent } from 'react';

export type QuoteFormData = {
  name: string;
  phone: string;
  email: string;
  budgetRange: string;
  plotLocation: string;
  source: string;
};

type QuoteFormProps = {
  formData: QuoteFormData;
  loading: boolean;
  onChange: (data: QuoteFormData) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function QuoteFormFields({
  formData,
  loading,
  onChange,
  onSubmit,
}: QuoteFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        type="text"
        required
        value={formData.name}
        onChange={(event) => onChange({ ...formData, name: event.target.value })}
        className="w-full border my-4 bg-white border-white/20 text-black px-3 py-2.5 rounded-2xl text-sm placeholder:text-black/80 focus:outline-none focus:border-white"
        placeholder="Full Name"
      />

      <div className="flex items-center my-4 bg-white border border-white/20 rounded-2xl text-black">
        <span className="px-3 text-sm font-medium">+91</span>
        <input
          type="tel"
          inputMode="numeric"
          required
          maxLength={10}
          pattern="[0-9]{10}"
          value={formData.phone}
          onChange={(event) =>
            onChange({
              ...formData,
              phone: event.target.value.replace(/\D/g, '').slice(0, 10),
            })
          }
          className="w-full bg-transparent px-3 py-2.5 text-sm placeholder:text-black/80 focus:outline-none"
          placeholder="Phone Number"
        />
      </div>

      <input
        type="email"
        value={formData.email}
        onChange={(event) => onChange({ ...formData, email: event.target.value })}
        className="w-full bg-white border my-4 border-white/20 text-black px-3 py-2.5 rounded-2xl text-sm placeholder:text-black/80 focus:outline-none focus:border-white"
        placeholder="Email Address"
      />

      <input
        type="text"
        required
        value={formData.plotLocation}
        onChange={(event) =>
          onChange({ ...formData, plotLocation: event.target.value })
        }
        className="w-full bg-white border my-4 border-white/20 text-black px-3 py-2.5 rounded-2xl text-sm placeholder:text-black/80 focus:outline-none focus:border-white"
        placeholder="Enter Plot Location"
      />

      <select
        value={formData.budgetRange}
        required
        onChange={(event) =>
          onChange({ ...formData, budgetRange: event.target.value })
        }
        className="w-full bg-white border my-4 border-white/20 text-black px-3 py-2.5 rounded-2xl text-sm"
      >
        <option value="">Select Budget Range</option>
        <option>₹5 - 10 Lakhs</option>
        <option>₹10 - 15 Lakhs</option>
        <option>₹15 - 20 Lakhs</option>
        <option>₹20L - 1Cr+</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-3 bg-[#886c46] my-4 text-black py-2.5 rounded-2xl text-sm font-medium hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : 'Request Callback'}
      </button>
    </form>
  );
}

export function OfficeQuoteForm(props: QuoteFormProps) {
  return <QuoteFormFields {...props} />;
}

export function FarmhouseQuoteForm(props: QuoteFormProps) {
  return <QuoteFormFields {...props} />;
}
