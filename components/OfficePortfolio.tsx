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
    image: "/products/offices/EXT - KamaReddy - 1920 sqft.jpg",
    name: "KamaReddy",
    state: "Telangana",
    type: "Prefab Office",
    area: "1,920 sq.ft",
    days: "45 days",
  },
  {
    image: "/products/offices/EXT Toopran - 2,400 Sq.Ft.jpg",
    name: "Toopran",
    state: "Telangana",
    type: "Prefab Office",
    area: "2,400 sq.ft",
    days: "59 days",
  },
  {
    image: "/products/offices/EXT. 1 Siddipet- 1440 Sqft.jpg",
    name: "Siddipet",
    state: "Telangana",
    type: "Prefab Cabin",
    area: "1,440 sq.ft",
    days: "43 days",
  },
  {
    image: "/nizamabad.jpg",
    name: "Nizamabad",
    state: "Telangana",
    type: "Prefab Office",
    area: "1,440 sq.ft",
    days: "32 days",
  },
  {
    image: "/jeedimetla.jpg",
    name: "Jeedimetla",
    state: "Telangana",
    type: "Prefab Cabin",
    area: "960 sq.ft",
    days: "28 days",
  },
  {
    image: "/products/offices/INT 3. Digwal  - 890 SQFT .jpg",
    name: "Digwal",
    state: "Telangana",
    type: "Office Interior",
    area: "890 sq.ft",
    days: "35 days",
  },
];

export default function OfficePortfolio() {
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
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0.5, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2
            className={`${playfair.className} text-4xl md:text-6xl font-semibold bg-linear-to-r from-black via-[#886c46] to-black bg-clip-text text-transparent mb-4`}
          >
            Prefab Offices We’ve Built
          </h2>

          <p
            className={`${inter.className} text-zinc-600 text-lg max-w-2xl mx-auto`}
          >
            Discover our premium collection of prefabricated cabins & offices
            built with excellence and craftsmanship.
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          style={{ y: gridY }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.18 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {PORTFOLIO.map((item, i) => (
            <motion.article
              key={i}
              variants={{
                hidden: { opacity: 0.5, y: 60 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: "easeOut" },
                },
              }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl transition-[border-color,box-shadow] duration-500 hover:border-[#886c46]/40 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                <Image
                  src={item.image}
                  alt={`${item.type} in ${item.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Type pill */}
                {/* <span
                  className={`${inter.className} absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black shadow-md backdrop-blur-sm`}
                >
                  {item.type}
                </span> */}
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-4 p-5">
                {/* Location */}
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#886c46]" />
                  <h3
                    className={`${playfair.className} text-xl font-semibold text-black`}
                  >
                    {item.name}
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
                      {item.area}
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
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}