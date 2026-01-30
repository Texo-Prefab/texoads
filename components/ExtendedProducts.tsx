'use client';

import Image from 'next/image';
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
    title: 'Security Cabin – Standard',
    description:
      'Compact modular cabin ideal for entry gates and security checkpoints.',
    image: '/products/Security-Cabin.png',
    badge: 'BEST SELLER',
  },
  {
    id: 2,
    title: 'Security Cabin – Premium',
    description:
      'Insulated premium security cabin with lighting and ventilation.',
    image: '/products/Security-Cabin-2.png',
    badge: 'PREMIUM COLLECTION',
  },
  {
    id: 3,
    title: 'Security Cabin – Custom',
    description:
      'Fully customizable security cabins built as per site requirement.',
    image: '/products/Security-Cabin-3.png',
    badge: 'CUSTOM BUILD',
  },
];

const otherProducts = [
  {
    id: 4,
    title: 'Portable Toilets',
    description:
      'Temporary sanitation solutions for construction sites and outdoor events.',
    image: '/products/Potable-Toilets.jpg',
    badge: 'ESSENTIAL UNIT',
  },
  {
    id: 5,
    title: 'Modular Restrooms',
    description:
      'Prefab restroom facilities for commercial and public infrastructure.',
    image: '/products/modular-toilets.jpeg',
    badge: 'COMMERCIAL USE',
  },
];

export default function ExtendedProducts() {
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
            <ProductCard key={product.id} product={product} idx={idx} />
          ))}
        </div>

        {/* ================= OTHER PRODUCTS (NO HEADING) ================= */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full">
            {otherProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} idx={idx} />
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

function ProductCard({ product, idx }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{
        duration: 0.9,
        delay: idx * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer"
    >
      {/* IMAGE */}
      <div className="absolute inset-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-br from-black/10 via-black/30 to-black/60 group-hover:to-black/90 transition duration-700" />
      </div>

      {/* CONTENT */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <span className="px-4 py-2 bg-[#d7a661] text-black text-xs font-bold rounded-full w-fit">
          {product.badge}
        </span>

        <div>
          <h3
            className={`${playfair.className} text-3xl md:text-4xl font-semibold text-white mb-2 group-hover:text-[#d7a661] transition duration-500`}
          >
            {product.title}
          </h3>

          <p className={`${inter.className} text-white/90 text-sm leading-relaxed max-w-xs`}>
            {product.description}
          </p>
        </div>
      </div>

      {/* LIGHT SWEEP */}
      <motion.div
        initial={{ opacity: 0, x: -120 }}
        whileHover={{ opacity: 0.25, x: 260 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent pointer-events-none"
      />
    </motion.div>
  );
}
