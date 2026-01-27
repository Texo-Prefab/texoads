'use client';

import { useEffect } from 'react';
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
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://texoprefab.com';
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      <Image
        src="/bg.jpg" 
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
        className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-6"
      >
        <h1
          className={`${playfair.className} text-white text-4xl md:text-6xl tracking-wide`}
        >
          TEXO PREFAB
        </h1>

        <p
          className={`${inter.className} mt-4 text-white/80 text-lg md:text-xl max-w-xl`}
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

          <span className="text-white/60 text-sm">
            Redirecting automatically…
          </span>
        </div>
      </motion.div>
    </div>
  );
}
