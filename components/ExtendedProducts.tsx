'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

/* ================================
   DATA
================================ */

const securityCabins = [
  {
    id: 1,
    title: 'MS Security Cabin',
    description:
      'Compact modular cabin ideal for entry gates and security checkpoints.',
    image: '/products/offices/securit-ms-cabin.webp',
    badge: 'Best Seller',
    price: 2000,
  },
  {
    id: 2,
    title: 'ACP Security Cabin',
    description:
      'Insulated premium security cabin with lighting and ventilation.',
    image: '/products/offices/security-acp-cabin.webp',
    badge: 'Premium Collection',
    price: 2800,
  },
  {
    id: 3,
    title: 'PUF Security Cabin',
    description:
      'Fully customizable security cabins built as per site requirement.',
    image: '/products/offices/security-puf-cabin.webp',
    badge: 'Custom Build',
    price: 3200,
  },
];

const otherProducts = [
  {
    id: 4,
    title: 'Portable Toilets',
    description:
      'Temporary sanitation solutions for construction sites and outdoor events.',
    image: '/products/Potable-Toilets.jpg',
    badge: 'Essential Unit',
    price: 1800,
  },
  {
    id: 5,
    title: 'Modular Restrooms',
    description:
      'Prefab restroom facilities for commercial and public infrastructure.',
    image: '/products/modular-toilets.jpeg',
    badge: 'Commercial Use',
    price: 2400,
  },
];

type Product = (typeof securityCabins)[number];

export default function ExtendedProducts({ onQuoteClick }: { onQuoteClick: () => void }) {
  return (
    <section className="py-32 bg-linear-to-b from-white via-[#faf8f4] to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= SECTION HEADING ================= */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 text-center"
        >
          <h2
            className={`${playfair.className} text-4xl md:text-6xl font-semibold bg-linear-to-r from-black via-[#886c46] to-black bg-clip-text text-transparent mb-4`}
          >
            Our Extended Products
          </h2>

          <p className={`${inter.className} text-zinc-600 text-lg max-w-2xl mx-auto`}>
            Premium prefab solutions crafted for functionality, durability and elegance.
          </p>
        </motion.div>

        {/* ================= SECURITY CABINS ================= */}
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={`${playfair.className} text-3xl md:text-4xl text-center mb-14`}
        >
          Security Cabins
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
          {securityCabins.map((product, idx) => (
            <ProductCard key={product.id} product={product} idx={idx} onQuoteClick={onQuoteClick} />
          ))}
        </div>

        {/* ================= OTHER PRODUCTS ================= */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full">
            {otherProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} idx={idx} onQuoteClick={onQuoteClick} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================
   CARD COMPONENT
================================ */

function ProductCard({
  product,
  idx,
  onQuoteClick,
}: {
  product: Product;
  idx: number;
  onQuoteClick: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{
        duration: 0.9,
        delay: idx * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white p-3 shadow-xl transition-[border-color,box-shadow] duration-500 hover:border-[#886c46]/40 hover:shadow-2xl"
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <span
          className={`${inter.className} absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black shadow-md backdrop-blur-sm`}
        >
          {product.badge}
        </span>
      </div>

      {/* BODY */}
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <h3
          className={`${playfair.className} mb-2 text-2xl font-semibold text-black transition-colors duration-500 group-hover:text-[#886c46]`}
        >
          {product.title}
        </h3>

        <p
          className={`${inter.className} mb-5 text-[15px] leading-relaxed text-zinc-600`}
        >
          {product.description}
        </p>

        <div className="mt-auto">
          <div className="mb-4 border-t border-black/10 pt-4">
            <p className={`${inter.className} text-sm text-zinc-500`}>
              Starting at{' '}
              <span className="text-lg font-bold text-black">
                ₹{product.price.toLocaleString('en-IN')}
              </span>{' '}
              / sq.ft
            </p>
          </div>

          <button
            type="button"
            onClick={onQuoteClick}
            className={`${inter.className} flex w-full items-center justify-center gap-2 rounded-xl border border-black/80 bg-white px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:border-[#886c46] hover:bg-[#886c46] hover:text-white`}
          >
            Get Quote
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}