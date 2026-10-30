"use client";

import Image from "next/image";
import { MapPin, Maximize, Clock } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const PORTFOLIO = [
  {
    image: "/products/portfolio-1.jpg",
    area: "Gajwel",
    state: "Telangana",
    type: "Prefab Farmhouse",
    size: "1,200 sq.ft",
    days: "45 days",
  },
  {
    image: "/products/portfolio-2.jpg",
    area: "Kuntloor",
    state: "Telangana",
    type: "Prefab Home",
    size: "950 sq.ft",
    days: "35 days",
  },
  {
    image: "/products/portfolio-3.jpg",
    area: "Medchal",
    state: "Telangana",
    type: "Prefab Farmhouse",
    size: "1,500 sq.ft",
    days: "50 days",
  },
  {
    image: "/products/portfolio-4.jpg",
    area: "Nizamabad",
    state: "Telangana",
    type: "Prefab Home",
    size: "1,800 sq.ft",
    days: "60 days",
  },
  {
    image: "/products/portfolio-5.jpeg",
    area: "Ameenpur",
    state: "Telangana",
    type: "Prefab Villa",
    size: "1,100 sq.ft",
    days: "40 days",
  },
  {
    image: "/products/Wooden House.jpg",
    area: "Bangalore",
    state: "Karnataka",
    type: "Wooden House",
    size: "1,400 sq.ft",
    days: "55 days",
  },
];

export default function OurPortfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-10 py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2
            className={`${playfair.className} text-4xl md:text-6xl font-semibold bg-linear-to-r from-black via-[#886c46] to-black bg-clip-text text-transparent mb-4`}
          >
            Prefab Homes & Farmhouses We’ve Built
          </h2>
          <p
            className={`${inter.className} text-zinc-600 text-lg max-w-2xl mx-auto`}
          >
            A curated collection of premium prefab homes crafted across India.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          style={{ y: gridY }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {PORTFOLIO.map((item, i) => (
            <article
              key={i}
              className="group flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#886c46]/40 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                <Image
                  src={item.image}
                  alt={`${item.type} in ${item.area}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Home type pill */}
                <span
                  className={`${inter.className} absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black shadow-md backdrop-blur-sm`}
                >
                  {item.type}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-4 p-5">
                {/* Location */}
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#886c46]" />
                  <h3
                    className={`${playfair.className} text-xl font-semibold text-black`}
                  >
                    {item.area}
                  </h3>
                  <span
                    className={`${inter.className} text-sm text-[#886c46]`}
                  >
                    · {item.state}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-[#886c46]/15 bg-[#886c46]/5 px-4 py-3">
                    <div
                      className={`${inter.className} flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500`}
                    >
                      <Maximize size={12} />
                      Built-up Area
                    </div>
                    <p
                      className={`${inter.className} mt-1 text-base font-bold text-black`}
                    >
                      {item.size}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#886c46]/15 bg-[#886c46]/5 px-4 py-3">
                    <div
                      className={`${inter.className} flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500`}
                    >
                      <Clock size={12} />
                      Completed In
                    </div>
                    <p
                      className={`${inter.className} mt-1 text-base font-bold text-[#886c46]`}
                    >
                      {item.days}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}