"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function ThankYouPage() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      <Image
        src="/hero.png"
        alt="Thank you"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-center"
        >
          <h1
            className={`${playfair.className} text-4xl md:text-6xl text-white mb-6`}
          >
            Thank you for reaching out
          </h1>

          <p
            className={`${inter.className} text-white/90 text-lg md:text-xl leading-relaxed mb-10`}
          >
            Your enquiry has been successfully received.
            <br />
            Our design concierge will connect with you shortly to
            understand your vision and guide you further.
          </p>

          <p className="text-white/70 text-sm mb-12 italic">
            We usually respond within <span className="font-semibold">15 minutes</span>
            <br className="hidden md:block" />
            (Mon–Sat · 10 AM – 7 PM IST)
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">

            {/* WhatsApp */}
            <Link
              href="https://wa.me/919000800665"
              target="_blank"
              className="
                px-8 py-4 rounded-2xl
                bg-[#d7a661] text-black
                font-medium text-sm
                hover:bg-[#e6bb78]
                transition
              "
            >
              Chat with us on WhatsApp
            </Link>

            <Link
  href="https://texoprefab.com"
  target="_blank"
  rel="noopener noreferrer"
  className="
    px-8 py-4 rounded-2xl
    border border-white/30
    text-white text-sm font-medium
    hover:bg-white/10
    transition
 items-center gap-2 text-center flex justify-center 
  "
>
  Browse other solutions <ArrowRight size={16} />
</Link>


          </div>
        </motion.div>
      </div>
    </section>
  );
}
