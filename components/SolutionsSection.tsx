"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const products = [
  {
    id: 1,
    title: "Barn House",
    description: "High-ceiling homes inspired by traditional barn designs.",
    image: "/products/Barn House.png",
  },
  {
    id: 2,
    title: "Arc Pod",
    description: "Curved modular units used for premium stays and cafes.",
    image: "/products/arc-pod.jpg",
  },
  {
    id: 3,
    title: "A Frame",
    description: "Triangular prefab structures ideal for resorts and weekend homes.",
    image: "/products/A frame.png",
  },
  {
    id: 4,
    title: "Wooden House",
    description: "Engineered steel structures with wooden finishes.",
    image: "/products/Wooden House.jpg",
  },
  
  {
    id: 5,
    title: "Prefab Homes",
    description: "Factory-built homes assembled on-site quickly.",
    image: "/products/Prefab-Homes.png",
  },
  
  
  {
    id: 6,
    title: "Container Homes",
    description: "Habitable spaces created from shipping containers.",
    image: "/products/Container-home-1.png",
  },
  {
    id: 7,
    title: "Farmhouse",
    description: "Standalone homes built for farmland and open plots.",
    image: "/products/Farmhouses.png",
  },
  
];

export default function SolutionsSection() {
  const { scrollYProgress } = useScroll();
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const firstRow = products.slice(0, 3);
  const secondRow = products.slice(3, 5);
  const thirdRow = products.slice(5, 7);

  const ProductCard = ({ product, style, delay }: { product: typeof products[0]; style?: any; delay: number }) => (
    <motion.div
      style={style}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.9, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition duration-700"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-black/1 via-black/20 to-black/40 group-hover:from-black/40 group-hover:via-black/60 group-hover:to-black/90 transition duration-700" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: delay * 0.1 + 0.3 }}
          className="self-start"
        >
          <span className="px-4 py-2 bg-[#d7a661] text-black text-xs font-bold rounded-full backdrop-blur-md">
            PREMIUM COLLECTION
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: delay * 0.1 + 0.2 }}
          className="space-y-4"
        >
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
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileHover={{ opacity: 0.2, x: 200 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent pointer-events-none"
      />
    </motion.div>
  );

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
          Explore Our Solutions
        </motion.h2>

        <p className={`${inter.className} text-zinc-600 text-lg max-w-2xl mx-auto mb-6`}>
          Discover our premium collection of architecturally designed prefab solutions, each crafted to perfection
        </p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-block"
        >
          <p className={`${inter.className} text-center`}>
            Modern prefab products starting at{" "}
            <span className="bg-linear-to-r from-[#886c46] to-[#d7a661] bg-clip-text text-transparent font-bold text-2xl">
              <CountUp start={0} end={2.5} decimals={1} duration={1.6} />K per sq.ft
            </span>
          </p>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {firstRow.map((product, idx) => (
          <ProductCard key={product.id} product={product} style={{ y: ySlow }} delay={idx} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 md:px-24">
        {secondRow.map((product, idx) => (
          <ProductCard key={product.id} product={product} style={{ y: yFast }} delay={idx + 3} />
        ))}
      </div>

      {/* Row 3 - 2 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:px-24">
        {thirdRow.map((product, idx) => (
          <ProductCard key={product.id} product={product} style={{ y: ySlow }} delay={idx + 5} />
        ))}
      </div>
    </section>
  );
}
