"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });


const SITE_OFFICES = [
  {
    id: 1,
    title: "Prefab Site Office – Model A",
    description:
      "Factory-built site office cabins engineered for strength, insulation, and rapid installation.",
    image: "/products/offices/prefabsiteoffice.png",
    collection: "Office Solutions",
  },
  {
    id: 2,
    title: "Prefab Site Office – Model B",
    description:
      "Modular workspace units offering enhanced comfort for long-term project requirements.",
    image: "/products/offices/Prefab Site Office .jpg",
    collection: "Office Solutions",
  },
  {
    id: 3,
    title: "Prefab Site Office – Model C",
    description:
      "Premium site offices designed with superior finishes and optimized floor planning.",
    image: "/products/offices/siteoffice.jpg",
    collection: "Office Solutions",
  },
];

const CONTAINER_OFFICES = [
  {
    id: 4,
    title: "Container Office – Standard",
    description:
      "Portable container offices converted into professional workspaces with modern interiors.",
    image: "/products/offices/containeroffice.jpg",
    collection: "Office Solutions",
  },
  {
    id: 5,
    title: "Container Office – Executive",
    description:
      "High-end container offices featuring insulation, paneling, and premium electrical layouts.",
    image: "/products/offices/Portable Container Offices.png",
    collection: "Office Solutions",
  },
  {
    id: 6,
    title: "Container Office – Custom",
    description:
      "Fully customized container offices built as per operational and branding needs.",
    image: "/products/offices/container-3.png",
    collection: "Office Solutions",
  },
];

/* ===============================
   CARD COMPONENT (UNCHANGED)
================================ */

const ProductCard = ({
  product,
  style,
  delay,
}: {
  product: any;
  style?: any;
  delay: number;
}) => (
  <motion.div
    style={style}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: false }}
    transition={{
      duration: 0.9,
      delay: delay * 0.1,
      ease: [0.16, 1, 0.3, 1],
    }}
    className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer"
  >
    {/* Image */}
    <Image
      src={product.image}
      alt={product.title}
      fill
      className="object-cover group-hover:scale-110 transition duration-700"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-linear-to-br from-black/10 via-black/30 to-black/70 group-hover:from-black/40 group-hover:to-black/90 transition duration-700" />

    {/* Content */}
    <div className="absolute inset-0 p-8 flex flex-col justify-between">
      <span className="px-4 py-2 bg-[#d7a661] text-black text-xs font-bold rounded-full w-fit">
        {product.collection}
      </span>

      <div>
        <h3
          className={`${playfair.className} text-3xl font-semibold text-white mb-2 group-hover:text-[#d7a661] transition`}
        >
          {product.title}
        </h3>
        <p className={`${inter.className} text-white/90 text-sm max-w-xs`}>
          {product.description}
        </p>
      </div>
    </div>
  </motion.div>
);

/* ===============================
   MAIN SECTION
================================ */

export default function OfficeProducts() {
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

      {/* ================= SITE OFFICES ================= */}
      <div className="mb-28">
        <h3
          className={`${playfair.className} text-3xl md:text-4xl mb-10 text-center`}
        >
          Prefab Site Offices
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SITE_OFFICES.map((p, i) => (
            <ProductCard key={p.id} product={p} style={{ y: ySlow }} delay={i} />
          ))}
        </div>
      </div>

      {/* ================= CONTAINER OFFICES ================= */}
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
            />
          ))}
        </div>
      </div>

    </section>
  );
}
