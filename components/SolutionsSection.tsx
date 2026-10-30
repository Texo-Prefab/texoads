"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";
import CountUp from "react-countup";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const products = [
  {
    id: 1,
    title: "Barn House",
    description: "High-ceiling homes inspired by traditional barn designs.",
    image: "/products/Barn House.jpg",
    price: 2500,
  },
  {
    id: 2,
    title: "Arc Pod",
    description: "Curved modular units used for premium stays and cafes.",
    image: "/products/arc-pod.jpg",
    price: 3200,
  },
  {
    id: 3,
    title: "A Frame",
    description: "Triangular prefab structures ideal for resorts and weekend homes.",
    image: "/products/A frame.png",
    price: 2800,
  },
  {
    id: 4,
    title: "Wooden House",
    description: "Engineered steel structures with wooden finishes.",
    image: "/products/Wooden House.jpg",
    price: 2600,
  },
  {
    id: 5,
    title: "Prefab Homes",
    description: "Factory-built homes assembled on-site quickly.",
    image: "/products/Prefab-Homes.jpg",
    price: 2500,
  },
  {
    id: 6,
    title: "Container Homes",
    description: "Habitable spaces created from shipping containers.",
    image: "/products/Container-home-1.jpg",
    price: 2200,
  },
  {
    id: 7,
    title: "Farmhouse",
    description: "Standalone homes built for farmland and open plots.",
    image: "/products/Farmhouses.jpg",
    price: 2400,
  },
];

type Product = (typeof products)[number];

function ProductCard({
  product,
  style,
  delay,
  onQuoteClick,
}: {
  product: Product;
  style?: MotionStyle;
  delay: number;
  onQuoteClick: () => void;
}) {
  return (
    <motion.article
      style={style}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.9, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white p-3 shadow-xl transition-[border-color,box-shadow] duration-500 hover:border-[#886c46]/40 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Body */}
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
              Starting at{" "}
              <span className="text-lg font-bold text-black">
                ₹{product.price.toLocaleString("en-IN")}
              </span>{" "}
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

export default function SolutionsSection({ onQuoteClick }: { onQuoteClick: () => void }) {
  const { scrollYProgress } = useScroll();
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const firstRow = products.slice(0, 3);
  const secondRow = products.slice(3, 5);
  const thirdRow = products.slice(5, 7);

  return (
    <section className="py-32 max-w-7xl mx-auto px-6 overflow-hidden bg-linear-to-b from-white via-[#faf8f4] to-white">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20 text-center"
      >
        <motion.h2
          className={`${playfair.className} text-4xl md:text-6xl font-semibold bg-linear-to-r from-black via-[#886c46] to-black bg-clip-text text-transparent mb-4`}
        >
          Explore Our Products
        </motion.h2>

        <p className={`${inter.className} text-zinc-600 text-lg max-w-2xl mx-auto mb-6`}>
          Discover our premium collection of architecturally designed prefab solutions, each crafted to perfection
        </p>

        {/* <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-block"
        >
          <p className={`${inter.className} text-center`}>
            Modern prefab products starting at{" "}
            <span className="bg-linear-to-r from-[#886c46] to-[#d7a661] bg-clip-text text-transparent font-bold text-2xl">
              <span>₹</span>
              <CountUp start={0} end={2500} decimals={0} duration={1.6} /> per sq.ft
            </span>
          </p>
        </motion.div> */}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {firstRow.map((product, idx) => (
          <ProductCard key={product.id} product={product} style={{ y: ySlow }} delay={idx} onQuoteClick={onQuoteClick} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 md:px-24">
        {secondRow.map((product, idx) => (
          <ProductCard key={product.id} product={product} style={{ y: yFast }} delay={idx + 3} onQuoteClick={onQuoteClick} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:px-24">
        {thirdRow.map((product, idx) => (
          <ProductCard key={product.id} product={product} style={{ y: ySlow }} delay={idx + 5} onQuoteClick={onQuoteClick} />
        ))}
      </div>
    </section>
  );
}