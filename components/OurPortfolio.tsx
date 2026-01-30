"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const PORTFOLIO = [
  {
    image: "/products/portfolio-1.jpg",
    hoverImage: "/products/portfolio-1-hover.jpg",
    area: "Gajwel",
    size: "1200 sq.ft",
  },
  {
    image: "/products/portfolio-2.jpg",
    hoverImage: "/products/portfolio-2-hover.jpg",
    area: "Kuntloor",
    size: "950 sq.ft",
  },
  {
    image: "/products/portfolio-3.jpg",
    hoverImage: "/products/portfolio-3-hover.jpg",
    area: "Medchal",
    size: "1500 sq.ft",
  },
  {
    image: "/products/portfolio-4.jpg",
    hoverImage: "/products/portfolio-4-hover.jpg",
    area: "Nizamabad",
    size: "1800 sq.ft",
  },
  {
    image: "/products/portfolio-5.jpeg",
    hoverImage: "/products/portfolio-5-hover.jpg",
    area: "Ameenpur",
    size: "1100 sq.ft",
  },
  {
    image: "/products/Wooden House.jpg",
    hoverImage: "/products/Wooden House-hover.jpg",
    area: "Bangalore",
    size: "1400 sq.ft",
  },
];

export default function OurPortfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-10 py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className={`${playfair.className} text-4xl md:text-6xl font-semibold bg-linear-to-r from-black via-[#886c46] to-black bg-clip-text text-transparent mb-4`}>
            Prefab Homes & Farmhouses We’ve Built
          </h2>
          <p className={`${inter.className} text-zinc-600 text-lg max-w-2xl mx-auto`}>
            A curated collection of premium prefab homes crafted across India.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          style={{ y: gridY }}
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[260px] gap-6"
        >
          {PORTFOLIO.map((item, i) => {
            const bentoStyles = [
              "md:col-span-2 md:row-span-2",
              "md:col-span-2 md:row-span-1",
              "md:col-span-1 md:row-span-1",
              "md:col-span-1 md:row-span-2",
              "md:col-span-2 md:row-span-1",
              "md:col-span-1 md:row-span-1",
            ];

            return (
              <div
                key={i}
                className={`
                  group relative overflow-hidden rounded-3xl
                  border border-black/10 bg-black
                  shadow-xl
                  ${bentoStyles[i % bentoStyles.length]}
                `}
              >

                {/* DEFAULT IMAGE */}
                <Image
                  src={item.image}
                  alt={item.area}
                  fill
                  className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                />

                {/* HOVER IMAGE (desktop only) */}
                <Image
                  src={item.hoverImage}
                  alt={item.area}
                  fill
                  className="
                    object-cover opacity-0
                    transition-opacity duration-500
                    group-hover:opacity-100
                    hidden md:block
                  "
                />

                {/* Overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-linear-to-t from-black/80 via-black/40 to-transparent
                    flex items-end p-6
                    md:opacity-0 md:group-hover:opacity-100
                    transition-opacity duration-300
                  "
                >
                  <div className="flex items-center justify-between w-full">

                    {/* Location */}
                    <div className="flex items-center gap-2 text-white">
                      <MapPin size={16} />
                      <span className="text-lg font-semibold">
                        {item.area}
                      </span>
                    </div>

                    {/* Size */}
                    <span className="text-white/90 text-sm font-medium">
                      {item.size}
                    </span>

                  </div>
                </div>

              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
