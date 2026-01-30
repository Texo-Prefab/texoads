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
    image: "/products/potfolio-1.jpg",
    hoverImage: "/products/potfolio-1-hover.jpg",
    name: "Gajwel",
    area: "1,250 sq.ft",
  },
  {
    image: "/products/portfolio-2.jpg",
    hoverImage: "/products/portfolio-2-hover.jpg",
    name: "Kuntloor",
    area: "980 sq.ft",
  },
  {
    image: "/products/portfolio-3.jpg",
    hoverImage: "/products/portfolio-3-hover.jpg",
    name: "Medchal",
    area: "1,400 sq.ft",
  },
  {
    image: "/products/portfolio-4.jpg",
    hoverImage: "/products/portfolio-4-hover.jpg",
    name: "Nizamabad",
    area: "1,100 sq.ft",
  },
  {
    image: "/products/portfolio-5.jpeg",
    hoverImage: "/products/portfolio-5-hover.jpeg",
    name: "Ameenpur",
    area: "1,300 sq.ft",
  },
  {
    image: "/products/Wooden House.jpg",
    hoverImage: "/products/Wooden House-hover.jpg",
    name: "Bangalore",
    area: "1,600 sq.ft",
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
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0.5, y: 60 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.9,
                      ease: "easeOut",
                    },
                  },
                }}
                className={`
                  group relative overflow-hidden rounded-3xl
                  border border-black/10 bg-black
                  shadow-2xl shadow-black/60
                  ${bentoStyles[i % bentoStyles.length]}
                `}
              >
                {/* IMAGE SWITCH */}
                <div className="relative w-full h-full">

                  {/* DEFAULT IMAGE */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="
                      object-cover
                      transition-opacity duration-500
                      group-hover:opacity-0
                    "
                  />

                  {/* HOVER IMAGE (DESKTOP ONLY) */}
                  <Image
                    src={item.hoverImage}
                    alt={item.name}
                    fill
                    className="
                      object-cover
                      opacity-0
                      transition-opacity duration-500
                      group-hover:opacity-100
                      hidden md:block
                    "
                  />
                </div>

                {/* TEXT OVERLAY */}
                <div
                  className="
                    absolute inset-0
                    bg-linear-to-t from-black/80 via-black/40 to-transparent
                    flex items-end p-6
                    opacity-100 md:opacity-0 md:group-hover:opacity-100
                    transition-opacity duration-300
                    z-10
                  "
                >
                  <div className="flex items-center justify-between w-full">

                    {/* LOCATION */}
                    <div className="flex items-center gap-2 text-white">
                      <MapPin size={16} />
                      <span className="text-base font-medium">
                        {item.name}
                      </span>
                    </div>

                    {/* AREA */}
                    <span className="text-white text-sm font-medium">
                      {item.area}
                    </span>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
