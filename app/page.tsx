'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
});

export default function Home() {
  

  return (
    <div className="w-full overflow-hidden bg-black">
      <section className="relative min-h-screen">
        <Image
          src="/hero.jpg"
          alt="Texo Prefab"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/65" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
        >
          <h1
            className={`${playfair.className} text-4xl tracking-wide text-white md:text-6xl`}
          >
            TEXO PREFAB
          </h1>

          <p
            className={`${inter.className} mt-4 max-w-xl text-lg text-white/80 md:text-xl`}
          >
            Premium prefab homes, modular structures & turnkey cabin solutions.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <a
              href="https://texoprefab.com"
              className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Visit Website
            </a>

            <span className="text-sm text-white/60">
              Redirecting automatically...
            </span>
          </div>
        </motion.div>
      </section>

      <section
        aria-label="Project scope notice"
        className="border-y border-white/15 bg-zinc-950 py-4 text-white"
      >
        <div className="marquee flex min-w-max items-center">
          <p
            className={`${inter.className} px-8 text-xs font-medium uppercase tracking-[0.2em] text-white/80 md:text-sm`}
          >
            We do not undertake rooftop projects. Our expertise is focused on
            ground-level prefab homes, offices, and modular structures.
          </p>
          <p
            aria-hidden="true"
            className={`${inter.className} px-8 text-xs font-medium uppercase tracking-[0.2em] text-white/80 md:text-sm`}
          >
            We do not undertake rooftop projects. Our expertise is focused on
            ground-level prefab homes, offices, and modular structures.
          </p>
        </div>
      </section>
    </div>
  );
}
