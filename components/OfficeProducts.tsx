"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";
import CountUp from "react-countup";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const SITE_OFFICES = [
  {
    id: 3,
    title: "Container Office",
    description:
      "Practical, durable spaces with efficient layouts for everyday site operations.",
    image: "/products/offices/container-img.jpg",
    collection: "Basic",
    price: 1500,
  },
  {
    id: 1,
    title: "Modular Office",
    description:
      "Premium finishes and comfortable interiors for a professional working environment.",
    image: "/products/offices/EXT Toopran - 2,400 Sq.Ft.jpg",
    collection: "Standard",
    price: 2500,
  },
  {
    id: 2,
    title: "Prefab Site Office",
    description:
      "Tailor-made solutions designed around your site, specifications, and project needs.",
    image: "/siteoffice-2.webp",
    collection: "Custom",
    price: 3500,
  },
];



type Product = (typeof SITE_OFFICES)[number];

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: delay * 0.05, ease: "easeOut" }}
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

        <span
          className={`${inter.className} absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black shadow-md backdrop-blur-sm`}
        >
          {product.collection}
        </span>
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

export default function OfficeProducts({ onQuoteClick }: { onQuoteClick: () => void }) {
  const { scrollYProgress } = useScroll();
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section className="py-22 max-w-7xl mx-auto px-6 overflow-hidden bg-linear-to-b from-white via-[#faf8f4] to-white">
      {/* MAIN HEADING */}
      <div className="mb-24 text-center">
        <h2
          className={`${playfair.className} text-4xl md:text-6xl font-semibold bg-linear-to-r from-black via-[#886c46] to-black bg-clip-text text-transparent mb-4`}
        >
          Explore Our Office Solutions
        </h2>

        <p className={`${inter.className} text-zinc-600 text-lg max-w-2xl mx-auto mb-6`}>
          Premium prefab and container-based office solutions engineered for speed,
          durability, and professional environments.
        </p>

        
      </div>

      {/* SITE OFFICES */}
      <div>
        

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SITE_OFFICES.map((p, i) => (
            <ProductCard key={p.id} product={p} style={{ y: ySlow }} delay={i} onQuoteClick={onQuoteClick} />
          ))}
        </div>
      </div>
      
    </section>
  );
}