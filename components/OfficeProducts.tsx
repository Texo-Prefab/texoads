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
    title: "Prefab Site Office",
    description:
      "Practical, durable spaces with efficient layouts for everyday site operations.",
    image: "/products/offices/siteoffice.jpg",
    collection: "Standard",
    price: 2500,
  },
  {
    id: 1,
    title: "Prefab Site Office",
    description:
      "Premium finishes and comfortable interiors for a professional working environment.",
    image: "/products/offices/EXT Toopran - 2,400 Sq.Ft.jpg",
    collection: "Executive",
    price: 3000,
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

const CONTAINER_OFFICES = [
  {
    id: 4,
    title: "Container Office",
    description:
      "Portable, ready-to-use offices with practical layouts and modern interiors for everyday operations.",
    image: "/products/offices/Portable Container Offices.jpg",
    collection: "Standard",
    price: 2200,
  },
  {
    id: 5,
    title: "Container Office",
    description:
      "Enhanced insulation, refined finishes, and premium fittings for a more comfortable workspace.",
    image: "/products/offices/containeroffice.jpg",
    collection: "Executive",
    price: 2800,
  },
  {
    id: 6,
    title: "Container Office",
    description:
      "Purpose-built container offices tailored to your operational needs, space, and branding.",
    image: "/products/offices/container-3.jpg",
    collection: "Custom",
    price: 3300,
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
    <section className="py-32 max-w-7xl mx-auto px-6 overflow-hidden bg-linear-to-b from-white via-[#faf8f4] to-white">
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

        <p className={`${inter.className}`}>
          Starting at{" "}
          <span className="bg-linear-to-r from-[#886c46] to-[#d7a661] bg-clip-text text-transparent font-bold text-2xl">
            ₹<CountUp end={2500} duration={1.6} /> per sq.ft
          </span>
        </p>
      </div>

      {/* SITE OFFICES */}
      <div className="mb-28">
        <h3
          className={`${playfair.className} text-3xl md:text-4xl mb-10 text-center`}
        >
          Prefab Site Offices
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SITE_OFFICES.map((p, i) => (
            <ProductCard key={p.id} product={p} style={{ y: ySlow }} delay={i} onQuoteClick={onQuoteClick} />
          ))}
        </div>
      </div>

      {/* CONTAINER OFFICES */}
      <div>
        <h3
          className={`${playfair.className} text-3xl md:text-4xl mb-10 text-center`}
        >
          Container Offices
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONTAINER_OFFICES.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              style={{ y: ySlow }}
              delay={i + 3}
              onQuoteClick={onQuoteClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}