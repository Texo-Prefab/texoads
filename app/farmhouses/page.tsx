'use client';

import Image from 'next/image';
import { Playfair_Display, Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import OurPortfolio from '@/components/OurPortfolio';
import SolutionsSection from '@/components/SolutionsSection';
import { Move, Palette, Plug, Zap } from 'lucide-react';
import {  PhoneCall, PenTool, Factory, Truck } from "lucide-react";
import { Home, Star, ChevronLeft, ChevronRight, Target, Eye, Plus, Minus, Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

function CountUpNumber({ end, duration = 2000, trigger = true }: { end: number; duration?: number; trigger?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    
    let start = 0;
    setCount(0);
    const increment = end / (duration / 16);
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [end, duration, trigger]);

  return <>{count}</>;
}

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
});

export default function FarmHouses() {
  const [statsInView, setStatsInView] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroFormData, setHeroFormData] = useState({ name: '', phone: '', email: '', budgetRange: '', projectType: '' });
  const [heroFormLoading, setHeroFormLoading] = useState(false);
  const [heroFormSuccess, setHeroFormSuccess] = useState(false);
  const [contactFormData, setContactFormData] = useState({ name: '', phone: '', email: '', budgetRange: '', projectType: '' });
  const [contactFormLoading, setContactFormLoading] = useState(false);
  const [contactFormSuccess, setContactFormSuccess] = useState(false);

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: typeof heroFormData,
    setLoading: (loading: boolean) => void,
    setSuccess: (success: boolean) => void,
    setFormData: (data: typeof heroFormData) => void
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', phone: '', email: '', budgetRange: '', projectType: '' });
        setTimeout(() => setSuccess(false), 10000); // Hide message after 10 seconds
      } else {
        alert('Failed to send the form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      id: 1,
      question: "Can I customize my Farmhouse ?",
      answer: "Absolutely! Texo Prefab World Specializes in tailored solutions. From layout and finishes, we work with you to create a Farmhouse that meets your exact requirements, ensuring a comfortable, durable, and aesthetically elevated living space for luxurious weekend getaways or full-time residence."
    },
    {
      id: 2,
      question: "What amenities can I expect in a Farm House?",
      answer: "At Texo Prefab World, our Farm Houses come equipped with essential features such as pre-installed electrical systems, thermal insulation, climate control, soundproofing, and premium flooring. Additional options include designer interiors, expansive decks, smart home features, modular kitchens, and premium bath fittings to enhance lifestyle and comfort."
    },
    {
      id: 3,
      question: "How do I maintain a Farm House?",
      answer: "Farm Houses from Texo Prefab World are built with low-maintenance, high-quality materials. Routine upkeep includes inspecting electrical fittings, checking HVAC systems, and ensuring the structural integrity of walls and flooring. Our structures are designed for longevity, offering a hassle-free and refined living experience."
    },
    {
      id: 4,
      question: "What is the cost difference compared to traditional construction?",
      answer: "Prefab homes typically cost 10-20% less than traditional construction while saving significant time and labor costs. The exact savings depend on your specific requirements and design choices."
    },
    {
      id: 5,
      question: "Are Farm Houses eco-friendly?",
      answer: "Sustainability is a core value at Texo Prefab World. Our Farm Houses are designed with eco-friendly materials and energy-efficient systems. Features like PUF insulated walls, LED lighting, rainwater harvesting, and solar integration make them a luxurious yet environmentally responsible choice."
    },
    {
      id: 6,
      question: "Can prefab homes be relocated or expanded?",
      answer: "Yes, one of the major advantages of modular construction is the ability to relocate or expand your structure in the future. Our designs are flexible and scalable to accommodate your changing needs."
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Murali Krishna",
      rating: 5,
      text: "I have worked with Mr. Saif sir closely on my requirements. He was patient enough to consider all of them and provided me a beautiful plan. He was also considered the issues of transporting it to our location and built the entire container home onsite. ",
    },
    {
      id: 6,
      name: "Saurav Mishra",
      rating: 5,
      text: "I recently explored Texo Prefab World’s services, Their expertise in designing and constructing container houses, offices, and other prefab structures is evident in the quality of their products.The materials used are durable and eco-friendly, aligning perfectly with modern sustainability needs",
    },
    {
      id: 3,
      name: "Bharath G.N",
      rating: 4,
      text: "Fantastic ideas for a new world ofhomes",
    },
    {
      id: 4,
      name: "Shiva Krishna",
      rating: 5,
      text: "They are committed and excellent service and on time delivery.",
    },
    {
      id: 5,
      name: "Vikram Reddy",
      rating: 5,
      text: "Fast, efficient, and reliable. The quality of construction is premium. Texo Prefab sets new standards in the prefab industry.",
    },
    {
      id: 2,
      name: "Lakshmi Vide",
      rating: 4,
      text: "Very supportive and user friendly. Clear in taking the specifications and while delivering the product",
    },
  ];

  const nextReview = () => {
    setReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };
const extendedProducts = [
  {
    id: 1,
    title: "Portable Toilets",
    description: "Temporary sanitation solutions for construction sites and events.",
    image: "/products/Potable-Toilets.jpg",
  },
  {
    id: 2,
    title: "Security Cabins",
    description: "Compact modular units for security personnel and checkpoints.",
    image: "/products/Security-Cabin.png",
  },
  {
    id: 3,
    title: "Modular Restrooms",
    description: "Prefabricated restroom facilities for commercial and public spaces.",
    image: "/products/modular-toilets.jpeg",
  },
];

const processSteps = [
  {
    id: 1,
    title: "Day-0: Inquiry",
    icon: PhoneCall,
    image: "/process-1.webp",
  },
  {
    id: 2,
    title: "Day-3: Design & Customization",
    icon: PenTool,
    image: "/process-2.webp",
  },
  {
    id: 3,
    title: "Day-14/30: Factory Manufacturing",
    icon: Factory,
    image: "/products/factory manufacturing.png",
  },
  {
    id: 4,
    title: "Day-15/31: Dispatch & Installation",
    icon: Truck,
    image: "/process-4.webp",
  },
];




  return (
    <main className="w-full bg-white text-black overflow-hidden">

      <section className="relative min-h-screen w-full overflow-hidden">

      <Image
        src="/hero.png"
        alt="Luxury Farm Houses"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-8 left-8 z-20"
      >
        <Image
          src="/logo.webp"
          alt="Texo Prefab"
          width={140}
          height={40}
          priority
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        <div className="text-white space-y-8 relative">

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute -top-20 -left-20 w-80 h-80 bg-[#d7a661] rounded-full blur-3xl pointer-events-none"
          />
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block w-fit"
          >
            <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-[#d7a661] rounded-full"
              />
              <span className={`${inter.className} text-white text-sm font-medium`}>Texo Signature builds</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={`${playfair.className} text-4xl md:text-6xl leading-tight tracking-wide font-bold`}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Prefab Homes
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-linear-to-r from-[#d7a661] via-white to-[#d7a661] bg-clip-text text-transparent"
            >
              Delivered in Weeks
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-white/70 text-4xl md:text-5xl"
            >
              Not Months
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="space-y-4"
          >
            <p className={`${inter.className} text-white/80 text-lg max-w-xl leading-relaxed`}>
              Skip long construction timelines. Our prefab homes are expertly designed,
              factory-built, and installed within weeks — without compromising on
              quality, structural strength, or finishing standards.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="flex gap-6 pt-6 flex-wrap"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="w-3 h-3 bg-[#d7a661] rounded-full"
                />
                <span className={`${inter.className} text-white/90 text-sm`}>56+ CITIES COVERED</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="w-3 h-3 bg-[#d7a661] rounded-full"
                />
                <span className={`${inter.className} text-white/90 text-sm`}>1300+ PROJECTS</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  className="w-3 h-3 bg-[#d7a661] rounded-full"
                />
                <span className={`${inter.className} text-white/90 text-sm`}>9+ YEARS EXPERIENCE</span>
              </div>
            </motion.div>
          </motion.div>

        </div>

        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#111110] backdrop-blur rounded-2xl p-6 shadow-4xl shadow-white/10 border border-white/10 max-w-md ml-auto"
            >
            <h3 className={`${playfair.className} text-white text-xl mb-5`}>
                Schedule a Project Discussion
            </h3>

            {heroFormSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 px-4 space-y-4"
              >
                <h3 className="text-white text-2xl font-bold text-center">
                  Thank you!
                </h3>
                <p className="text-white/90 text-center text-2xl font-semibold">
                  Your Dream Project Awaits.
                </p>
                <div className="space-y-3 w-full">
                  <p className="text-white/80 text-center text-xs leading-relaxed">
                    Choose a time now or talk to a concierge on <span className="font-semibold">WhatsApp</span>
                  </p>
                  <p className="text-white/70 text-center text-xs italic">
                    We reply in &lt; 15 Minutes (Mon-Sat, 10am-7pm IST)
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={(e) => handleFormSubmit(e, heroFormData, setHeroFormLoading, setHeroFormSuccess, setHeroFormData)} className={`${inter.className} space-y-3`}>

                <input
                  type="text"
                  required
                  value={heroFormData.name}
                  onChange={(e) => setHeroFormData({ ...heroFormData, name: e.target.value })}
                  className="w-full border my-4 bg-white border-white/20 text-black px-3 py-2.5 rounded-2xl text-sm placeholder:text-black/80 focus:outline-none focus:border-white"
                  placeholder="Full Name"
                />

                <input
                  type="number"
                  required
                  value={heroFormData.phone}
                  onChange={(e) => setHeroFormData({ ...heroFormData, phone: e.target.value })}
                  className="w-full border my-4 bg-white border-white/20 text-black px-3 py-2.5 rounded-2xl text-sm placeholder:text-black/80 focus:outline-none focus:border-white"
                  placeholder="Phone Number"
                />

                <input
                  type="email"
                  value={heroFormData.email}
                  onChange={(e) => setHeroFormData({ ...heroFormData, email: e.target.value })}
                  className="w-full bg-white border my-4 border-white/20 text-black px-3 py-2.5 rounded-2xl text-sm placeholder:text-black/80 focus:outline-none focus:border-white"
                  placeholder="Email Address"
                />

                <select
                  value={heroFormData.budgetRange}
                  required
                  onChange={(e) => setHeroFormData({ ...heroFormData, budgetRange: e.target.value })}
                  className="w-full bg-white border my-4 border-white/20 text-black px-3 py-2.5 rounded-2xl text-sm"
                >
                  <option value="">Select Budget Range</option>
                  <option>₹3 - 5 Lakhs</option>
                  <option>₹5 - 8 Lakhs</option>
                  <option>₹12 - 15 Lakhs</option>
                  <option>₹20L - 1Cr+</option>
                </select>

                <select
                  value={heroFormData.projectType}
                  required
                  onChange={(e) => setHeroFormData({ ...heroFormData, projectType: e.target.value })}
                  className="w-full bg-white border my-4 border-white/20 text-black px-3 py-2.5 rounded-2xl text-sm"
                >
                  <option value="">Select Project Type</option>
                  <option>A-Frame</option>
                  <option>Wooden House</option>
                  <option>Arc Pod</option>
                  <option>Farmhouse</option>
                  <option>Barn House</option>
                  <option>Container House</option>
                  <option>Prefab Home</option>
                  <option>Portable Toilets</option>
                  <option>Security Cabins</option>
                  <option>Modular Restrooms</option>
                </select>

                <button
                  type="submit"
                  disabled={heroFormLoading}
                  className="w-full mt-3 bg-[#886c46] my-4 text-black py-2.5 rounded-2xl text-sm font-medium hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {heroFormLoading ? 'Sending...' : 'Request Callback'}
                </button>

              </form>
            )}
        </motion.div>


      </div>
    </section>

    <SolutionsSection />

<section className="py-32 bg-linear-to-b from-white via-[#faf8f4] to-white">
  <div className="max-w-7xl mx-auto px-6">

    <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20 text-center"
      >
        <motion.h2 className={`${playfair.className} text-4xl md:text-6xl font-semibold bg-linear-to-r from-black via-[#886c46] to-black bg-clip-text text-transparent mb-4`}>
         Our Extended Products
        </motion.h2>
        <p className={`${inter.className} text-zinc-600 text-lg max-w-2xl mx-auto`}>
          Premium products crafted to fit your lifestyle.
        </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {extendedProducts.map((product, idx) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-110 transition duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-br from-black/1 via-black/20 to-black/40 group-hover:from-black/40 group-hover:via-black/60 group-hover:to-black/90 transition duration-700" />
          </div>

          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
              className="self-start"
            >
              <span className="px-4 py-2 bg-[#d7a661] text-black text-xs font-bold rounded-full backdrop-blur-md">
                PREMIUM COLLECTION
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
              className="space-y-4"
            >
              <div>
                <h3
                  className={`${playfair.className} text-3xl md:text-4xl font-semibold text-white mb-2 group-hover:text-[#d7a661] transition duration-500`}
                >
                  {product.title}
                </h3>
                <p className={`${inter.className} text-white/90 text-sm leading-relaxed max-w-xs`}>
                  {product.description}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileHover={{ opacity: 0.2, x: 200 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent pointer-events-none"
          />
        </motion.div>
      ))}
    </div>

  </div>
</section>


    <OurPortfolio />


      
      <section className="py-32 bg-linear-to-b from-white via-[#faf8f4] to-white text-black overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 mb-22"
      >
        <h2 className={`${playfair.className} text-4xl md:text-6xl font-semibold bg-linear-to-r from-black via-[#886c46] to-black bg-clip-text text-transparent text-center`}>
          Why Choose Texo Prefab
        </h2>
        <p className={`${inter.className} text-zinc-600 text-lg text-center`}>
          Discover the key advantages that set us apart in the prefab construction industry
        </p>
      </motion.div>
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center mt-12">

    <div className="space-y-12">

      

      <div className="flex flex-col gap-4">

  {[
    {
      title: "Rapid Installation",
      desc: "Factory-built structures installed on-site in weeks, not months.",
      Icon: Zap,
    },
    {
      title: "Custom Designs",
      desc: "Tailored layouts, finishes, colors, and interior designs. Our design team works closely with you.",
      Icon: Palette,
    },
    {
      title: "Plug & Play",
      desc: "Electrical, plumbing, interiors — everything ready on delivery.",
      Icon: Plug,
    },
    {
      title: "Relocatable & Scalable",
      desc: "Expand, relocate, or reconfigure structures as your needs grow.",
      Icon: Move,
    },
  ].map((item, index) => (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative p-6 rounded-2xl bg-linear-to-br from-white to-[#f8f5f0] border border-[#886c46]/20 hover:border-[#886c46]/40 shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-br from-[#886c46]/5 to-[#d7a661]/5 opacity-0 group-hover:opacity-100 transition duration-300" />
      
      <div className="relative flex gap-4">
        <div className="shrink-0">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: false }}
            transition={{
              duration: 0.6,
              delay: index * 0.12 + 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#886c46] to-[#d7a661] flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition duration-300"
          >
            <item.Icon className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        <div className="grow">
          <h4 className={`${playfair.className} font-semibold text-xl text-black group-hover:text-[#886c46] transition duration-300 mb-2`}>{item.title}</h4>
          <p className={`${inter.className} text-black/70 text-sm leading-relaxed group-hover:text-black/80 transition`}>
            {item.desc}
          </p>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1 h-0 bg-linear-to-b from-[#d7a661] to-transparent group-hover:h-full transition-all duration-500" />
    </motion.div>
  ))}

</div>

    </div>

    <motion.div
      initial={{ opacity: 0.5, scale: 0.95, x: 40 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-130 md:h-130 overflow-hidden rounded-3xl shadow-2xl shadow-black/20 group"
    >
      <Image
        src="/products/why-choose-final.jpg"
        alt="Why Choose Texo Prefab"
        fill
        className="object-fill group-hover:scale-105 transition duration-700"
      />
      <div className="absolute inset-0 bg-linear-to-tr from-black/20 via-transparent to-transparent group-hover:from-black/30 transition duration-700" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-8 left-8 bg-white/95 backdrop-blur px-6 py-4 rounded-2xl shadow-xl"
      >
        <p className={`${inter.className} text-sm font-semibold text-[#886c46]`}>Industry Leading</p>
        <p className={`${playfair.className} text-2xl font-bold text-black mt-1`}>9+ Years</p>
      </motion.div>
    </motion.div>

  </div>
</section>


      <section className="py-32 bg-linear-to-b from-white via-[#faf8f4] to-white">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 text-center"
          >
            <motion.h2 className={`${playfair.className} text-4xl md:text-6xl font-semibold bg-linear-to-r from-black via-[#886c46] to-black bg-clip-text text-transparent mb-4`}>
              Our Process
            </motion.h2>
            <p className={`${inter.className} text-zinc-600 text-lg max-w-2xl mx-auto`}>
              From consultation to installation, we guide you through every step of your prefab journey with expertise and care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <div className="relative rounded-3xl overflow-hidden bg-white border border-[#886c46]/20 hover:border-[#886c46]/40 shadow-lg hover:shadow-2xl transition duration-300 h-full flex flex-col">
                  
                  <div className="relative h-56 overflow-hidden bg-linear-to-br from-[#f8f5f0] to-[#f0ebe0]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  <motion.div
                    initial={{ scale: 0.8, y: -10 }}
                    whileInView={{ scale: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: index * 0.12 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute  right-6 z-10"
                  >
                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#886c46] to-[#d7a661] text-white flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">
                      {index + 1}
                    </div>
                  </motion.div>

                  {/* Content Section */}
                  <div className="p-8 flex-1 flex flex-col">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#886c46]/10 to-[#d7a661]/10 flex items-center justify-center group-hover:from-[#886c46]/20 group-hover:to-[#d7a661]/20 transition duration-300">
                        <step.icon className="w-8 h-8 text-[#886c46]" />
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className={`${playfair.className} font-semibold text-2xl text-black mb-3 group-hover:text-[#886c46] transition duration-300`}>
                      {step.title}
                    </h4>

                    {/* Description based on step */}
                    <p className={`${inter.className} text-black/70 text-sm leading-relaxed grow`}>
                      {index === 0 && "Discuss your vision, requirements, and budget with our expert team."}
                      {index === 1 && "Our architects create custom designs tailored to your specifications."}
                      {index === 2 && "Precision-built in our state-of-the-art facilities with quality control."}
                      {index === 3 && "Professional installation and handover of your dream prefab home."}
                    </p>

                    {/* Connecting Line (for desktop) */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 w-8 h-1 bg-linear-to-r from-[#886c46] to-transparent group-hover:from-[#d7a661] transition duration-300" style={{ transform: 'translateY(-50%)' }} />
                    )}
                  </div>

                  {/* Hover Border Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#886c46]/0 via-[#d7a661] to-[#886c46]/0 opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-linear-to-b from-white via-[#faf8f4] to-white">
  <div className="max-w-7xl mx-auto px-6">

    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="mb-20 text-center max-w-3xl mx-auto"
    >
      <motion.h2 className={`${playfair.className} text-4xl md:text-6xl font-semibold bg-linear-to-r from-black via-[#886c46] to-black bg-clip-text text-transparent mb-4`}>
        About Texo Prefab World
      </motion.h2>
      <p className={`${inter.className} text-zinc-600 text-lg`}>
        Texo Prefab World transforms modern living with precision-engineered,  sustainable modular structures. Headquartered in Hyderabad and proudly ISO 9001:2025 certified, we design and deliver prefabricated homes, offices, farmhouses, and specialty units – faster, smarter, and greener.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 0.7,
          delay: 0,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="group relative p-8 rounded-3xl bg-white border border-[#886c46]/20 hover:border-[#886c46]/40 shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden h-fit"
      >
        <div className="absolute inset-0 bg-linear-to-br from-[#886c46]/5 to-[#d7a661]/5 opacity-0 group-hover:opacity-100 transition duration-300" />
        
        <div className="relative flex flex-col gap-6">
          <div className="shrink-0">
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#886c46]/10 to-[#d7a661]/10 flex items-center justify-center group-hover:from-[#886c46]/20 group-hover:to-[#d7a661]/20 transition duration-300"
            >
              <Target className="w-8 h-8 text-[#886c46]" />
            </motion.div>
          </div>

          <div className="grow">
            <h4 className={`${playfair.className} font-semibold text-2xl text-black mb-3 group-hover:text-[#886c46] transition duration-300`}>
              Our Mission
            </h4>
            <p className={`${inter.className} text-black/70 text-sm leading-relaxed group-hover:text-black/80 transition`}>
              To revolutionize the construction industry by making high-quality, sustainable prefabricated structures accessible to everyone, transforming how people live and work.
            </p>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-1 h-0 bg-linear-to-b from-[#d7a661] to-transparent group-hover:h-full transition-all duration-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0.5, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-96 md:h-130 rounded-3xl overflow-hidden shadow-2xl shadow-black/20 group"
      >
        <Image
          src="/products/about.jpg"
          alt="Texo Prefab construction"
          fill
          className="object-cover group-hover:scale-105 transition duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-black/20 via-transparent to-transparent group-hover:from-black/30 transition duration-700" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 0.7,
          delay: 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="group relative p-8 rounded-3xl bg-white border border-[#886c46]/20 hover:border-[#886c46]/40 shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden h-fit"
      >
        <div className="absolute inset-0 bg-linear-to-br from-[#886c46]/5 to-[#d7a661]/5 opacity-0 group-hover:opacity-100 transition duration-300" />
        
        <div className="relative flex flex-col gap-6">
          <div className="shrink-0">
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.6,
                delay: 0.32,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#886c46]/10 to-[#d7a661]/10 flex items-center justify-center group-hover:from-[#886c46]/20 group-hover:to-[#d7a661]/20 transition duration-300"
            >
              <Eye className="w-8 h-8 text-[#886c46]" />
            </motion.div>
          </div>

          <div className="grow">
            <h4 className={`${playfair.className} font-semibold text-2xl text-black mb-3 group-hover:text-[#886c46] transition duration-300`}>
              Our Vision
            </h4>
            <p className={`${inter.className} text-black/70 text-sm leading-relaxed group-hover:text-black/80 transition`}>
             To deliver exceptional prefabricated structures with unmatched speed, quality, and sustainability. We aim to exceed client expectations through innovative design and dedicated service.
            </p>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-1 h-0 bg-linear-to-b from-[#d7a661] to-transparent group-hover:h-full transition-all duration-500" />
      </motion.div>

    </div>

  </div>
</section>


      <section className="py-24 overflow-hidden bg-white">
        <div className="mb-16">
          <h2 className={`${playfair.className} text-3xl md:text-6xl font-semibold text-center bg-linear-to-r from-black via-[#886c46] to-black bg-clip-text text-transparent`}>
            Our Clients
          </h2>
        </div>
  <div className="marquee flex gap-16 px-6">
    {[
      "/clients/int-1.webp",
      "/clients/int-2.png",
      "/clients/int-3.png",
      "/clients/int-4.png",
      "/clients/int-6.png",
      "/clients/int-16.webp",
      "/clients/int-18.png",
      "/clients/int-19.png",
      "/clients/int-11.avif",
      "/clients/int-13.jpeg",
      "/clients/int-17.webp",
      "/clients/int-20.jpg",
      "/clients/int-12.webp",

      "/clients/int-1.webp",
      "/clients/int-2.png",
      "/clients/int-3.png",
      "/clients/int-4.png",
      "/clients/int-6.png",
      "/clients/int-16.webp",
      "/clients/int-18.png",
      "/clients/int-19.png",
      "/clients/int-11.avif",
      "/clients/int-13.jpeg",
      "/clients/int-17.webp",
      "/clients/int-20.jpg",
      "/clients/int-12.webp",

    ].map((logo, i) => (
      <div key={i} className="relative w-40 h-16 shrink-0">
        <Image src={logo} alt="" fill className="object-contain" />
      </div>
    ))}
  </div>
</section>


      <section className="pb-12 bg-white text-black">
        <motion.div 
          initial={{ opacity: 0.7, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => setStatsInView(prev => !prev)}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
        >
          <div>
            <p className={`${inter.className} text-black/70 mt-2 text-2xl`}>Cities Covered</p>
            <h3 className={`${playfair.className} text-6xl font-bold text-[#886c46]`}><CountUpNumber end={56} trigger={statsInView} />+</h3>
          </div>
          <div>
            <p className={`${inter.className} text-black/70 mt-2 text-2xl`}>Projects Completed</p>
            <h3 className={`${playfair.className} text-6xl font-bold text-[#886c46]`}><CountUpNumber end={1300} trigger={statsInView} />+</h3>
          </div>
          <div>
            <p className={`${inter.className} text-black/70 mt-2 text-2xl`}>Experience</p>
            <h3 className={`${playfair.className} text-6xl font-bold text-[#886c46]`}><CountUpNumber end={9} trigger={statsInView} />+</h3>
          </div>
        </motion.div>
      </section>

      {/* ================= CUSTOMER REVIEWS ================= */}
      <section className="py-32 bg-linear-to-b from-white via-[#faf8f4] to-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 text-center max-w-3xl mx-auto"
          >
            <motion.h2 className={`${playfair.className} text-4xl md:text-6xl font-semibold bg-linear-to-r from-black via-[#886c46] to-black bg-clip-text text-transparent mb-4`}>
              What Our Clients Say
            </motion.h2>
            <p className={`${inter.className} text-zinc-600 text-lg`}>
              Hear from our satisfied customers about their experience with Texo Prefab and how we`ve transformed their vision into reality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-20">
          
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition border border-[#886c46]/20 flex flex-col items-center justify-center"
            >
              <div className="flex items-center gap-3 mb-4">
                <Home className="w-6 h-6 text-[#886c46]" />
                <span className={`${playfair.className} text-xl font-semibold text-[#886c46]`}>Texo Prefab World</span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className={`${playfair.className} text-5xl font-bold text-[#886c46]`}>4.6</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-300 text-yellow-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className={`${inter.className} text-black/70 text-sm mb-6`}>
                Based on 63 reviews
              </p>

              <div className={`${inter.className} text-sm`}>
                <span className="text-black/70">Powered by </span>
                <span className="inline-flex gap-0.5 font-semibold">
                  <span style={{ color: '#4285F4' }}>G</span>
                  <span style={{ color: '#EA4335' }}>o</span>
                  <span style={{ color: '#FBBC05' }}>o</span>
                  <span style={{ color: '#4285F4' }}>g</span>
                  <span style={{ color: '#EA4335' }}>l</span>
                  <span style={{ color: '#34A853' }}>e</span>
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div>
                <h3 className={`${playfair.className} text-3xl md:text-4xl font-semibold mb-4 bg-linear-to-r from-[#886c46] via-black to-[#886c46] bg-clip-text text-transparent`}>
                  Excellence in Every Project
                </h3>
              </div>
              <p className={`${inter.className} text-black/70 text-lg leading-relaxed`}>
                Our clients trust us to deliver exceptional prefab solutions that exceed expectations. With a 4.6-star rating based on 63 reviews, we`re committed to maintaining the highest standards of quality and customer satisfaction in every project we undertake.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="bg-linear-to-br from-[#f8f5f0] to-[#f0ebe0] rounded-2xl p-6 border border-[#886c46]/20">
                  <p className={`${playfair.className} text-3xl font-bold text-[#886c46] mb-1`}>1300+</p>
                  <p className={`${inter.className} text-black/70 text-sm`}>Projects Delivered</p>
                </div>
                <div className="bg-linear-to-br from-[#f8f5f0] to-[#f0ebe0] rounded-2xl p-6 border border-[#886c46]/20">
                  <p className={`${playfair.className} text-3xl font-bold text-[#886c46] mb-1`}>98%</p>
                  <p className={`${inter.className} text-black/70 text-sm`}>Client Satisfaction</p>
                </div>
              </div>
            </motion.div>

          </div>

        <div className="max-w-7xl mx-4 px-6 mt-20 overflow-hidden">
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((offset, cardIndex) => {
                const idx = (reviewIndex + offset) % reviews.length;
                const review = reviews[idx];
                return (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0.3, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition ${cardIndex > 0 ? 'hidden md:block' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-200 text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex gap-0.5 font-bold text-xs">
                        <span style={{ color: '#4285F4' }}>G</span>
                        <span style={{ color: '#EA4335' }}>o</span>
                        <span style={{ color: '#FBBC05' }}>o</span>
                        <span style={{ color: '#4285F4' }}>g</span>
                        <span style={{ color: '#EA4335' }}>l</span>
                        <span style={{ color: '#34A853' }}>e</span>
                      </div>
                    </div>

                    <p className={`${inter.className} text-black/80 text-sm mb-4 leading-relaxed`}>
                      &quot;{review.text}&quot;
                    </p>

                    <div>
                      <h4 className={`${playfair.className} font-semibold text-black`}>
                        {review.name}
                      </h4>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={prevReview}
              className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 bg-[#886c46] text-white p-3 rounded-full hover:bg-[#6b5236] transition z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 bg-[#886c46] text-white p-3 rounded-full hover:bg-[#6b5236] transition z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setReviewIndex(idx)}
                className={`w-2 h-2 rounded-full transition ${
                  idx === reviewIndex ? 'bg-[#886c46]' : 'bg-black/20'
                }`}
              />
            ))}
          </div>
        </div>
        </div>
      </section>

      <section className="py-32 bg-linear-to-b from-white via-[#faf8f4] to-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <motion.h2 className={`${playfair.className} text-4xl md:text-6xl font-semibold bg-linear-to-r from-black via-[#886c46] to-black bg-clip-text text-transparent mb-4`}>
              Frequently Asked Questions
            </motion.h2>
            <p className={`${inter.className} text-zinc-600 text-lg`}>
              Find answers to common questions about our prefab solutions and construction process.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="border border-[#886c46]/20 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-[#f8f5f0] transition"
                >
                  <h3 className={`${playfair.className} font-semibold text-lg text-left text-black`}>
                    {faq.question}
                  </h3>
                  <div className="shrink-0 ml-4">
                    {openFaq === faq.id ? (
                      <Minus className="w-6 h-6 text-[#886c46]" />
                    ) : (
                      <Plus className="w-6 h-6 text-[#886c46]" />
                    )}
                  </div>
                </button>
                {openFaq === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5 border-t border-[#886c46]/10 bg-linear-to-br from-[#f8f5f0]/50 to-[#f0ebe0]/50"
                  >
                    <p className={`${inter.className} text-black/70 leading-relaxed`}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32">
        <Image
          src="/hero.png"
          alt="Contact"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 text-white">
          <div className="flex flex-col justify-center space-y-6">
            <h2 className={`${playfair.className} text-4xl md:text-6xl font-semibold leading-tight`}>
              Ready to Build Your Dream Home?
            </h2>
            <p className={`${inter.className} text-white/80 text-lg leading-relaxed max-w-xl`}>
              Take the first step towards your perfect prefab home. Our team is ready to understand your vision and deliver excellence.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#111110] backdrop-blur rounded-2xl p-6 shadow-4xl shadow-white/10 border border-white/10"
            >
            <h3 className={`${playfair.className} text-white text-xl mb-5`}>
                Schedula a Project Discussion
            </h3>

            {contactFormSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 px-4 space-y-4"
              >
                <h3 className="text-white text-2xl font-bold text-center">
                  Thank you!
                </h3>
                <p className="text-white/90 text-center text-2xl font-semibold">
                  Your Dream Project Awaits.
                </p>
                <div className="space-y-3 w-full">
                  <p className="text-white/80 text-center text-xs leading-relaxed">
                    Choose a time now or talk to a concierge on <span className="font-semibold">WhatsApp</span>
                  </p>
                  <p className="text-white/70 text-center text-xs italic">
                    We reply within 15 Minutes (Mon-Sat, 10am-7pm IST)
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={(e) => handleFormSubmit(e, contactFormData, setContactFormLoading, setContactFormSuccess, setContactFormData)} className={`${inter.className} space-y-3`}>

                <input
                  type="text"
                  required
                  value={contactFormData.name}
                  onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                  className="w-full border my-4 bg-white border-white/20 text-black px-3 py-2.5 rounded-2xl text-sm placeholder:text-black/80 focus:outline-none focus:border-white"
                  placeholder="Full Name"
                />

                <input
                  type="tel"
                  required
                  value={contactFormData.phone}
                  onChange={(e) => setContactFormData({ ...contactFormData, phone: e.target.value })}
                  className="w-full border my-4 bg-white border-white/20 text-black px-3 py-2.5 rounded-2xl text-sm placeholder:text-black/80 focus:outline-none focus:border-white"
                  placeholder="Phone Number"
                />

                <input
                  type="email"
                  value={contactFormData.email}
                  onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                  className="w-full bg-white border my-4 border-white/20 text-black px-3 py-2.5 rounded-2xl text-sm placeholder:text-black/80 focus:outline-none focus:border-white"
                  placeholder="Email Address"
                />

                <select
                  value={contactFormData.budgetRange}
                  required
                  onChange={(e) => setContactFormData({ ...contactFormData, budgetRange: e.target.value })}
                  className="w-full bg-white border my-4 border-white/20 text-black px-3 py-2.5 rounded-2xl text-sm"
                >
                  <option value="">Select Budget Range</option>
                  <option>₹3 - 5 Lakhs</option>
                  <option>₹5 - 8 Lakhs</option>
                  <option>₹12 - 15 Lakhs</option>
                  <option>₹20L - 1Cr+</option>
                </select>

                <select
                  value={contactFormData.projectType}
                  required
                  onChange={(e) => setContactFormData({ ...contactFormData, projectType: e.target.value })}
                  className="w-full bg-white border my-4 border-white/20 text-black px-3 py-2.5 rounded-2xl text-sm"
                >
                  <option value="">Select Project Type</option>
                  <option>A-Frame</option>
                  <option>Wooden House</option>
                  <option>Arc Pod</option>
                  <option>Farmhouse</option>
                  <option>Barn House</option>
                  <option>Container House</option>
                  <option>Prefab Home</option>
                  <option>Portable Toilets</option>
                  <option>Security Cabins</option>
                  <option>Modular Restrooms</option>
                </select>

                <button
                  type="submit"
                  disabled={contactFormLoading}
                  className="w-full mt-3 bg-[#886c46] my-4 text-black py-2.5 rounded-2xl text-sm font-medium hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactFormLoading ? 'Sending...' : 'Request Callback'}
                </button>

              </form>
            )}
        </motion.div>
        </div>
      </section>

      <footer className="bg-linear-to-b from-[#f8f5f0] via-[#faf8f4] to-[#efe8de] text-black relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d7a661]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#886c46]/5 rounded-full blur-3xl -z-10" />

        <div className="py-12 border-b border-black/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-4"
              >
                <div className="inline-block">
                  <Image
                    src="/logo-black.png"
                    alt="Texo Prefab"
                    width={160}
                    height={50}
                    className="hover:scale-105 transition duration-300"
                  />
                </div>
                <p className={`${inter.className} text-black/70 text-sm leading-relaxed max-w-xs font-light`}>
                  Building dreams with precision and excellence in prefab construction.
                </p>
                <div className="flex gap-3 pt-2">
                  <a href="#" className="w-10 h-10 bg-[#886c46]/10 hover:bg-[#886c46]/20 text-[#886c46] rounded-lg flex items-center justify-center transition duration-300 border border-[#886c46]/20">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#886c46]/10 hover:bg-[#886c46]/20 text-[#886c46] rounded-lg flex items-center justify-center transition duration-300 border border-[#886c46]/20">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#886c46]/10 hover:bg-[#886c46]/20 text-[#886c46] rounded-lg flex items-center justify-center transition duration-300 border border-[#886c46]/20">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#886c46]/10 hover:bg-[#886c46]/20 text-[#886c46] rounded-lg flex items-center justify-center transition duration-300 border border-[#886c46]/20">
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/50 backdrop-blur border border-[#886c46]/10 rounded-2xl p-6 hover:shadow-lg transition duration-300"
              >
                <h4 className={`${playfair.className} text-lg font-semibold mb-4 text-[#886c46]`}>
                  Contact Us
                </h4>
                <div className="space-y-3">
                  <a href="tel:+919876543210" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-[#886c46]/10 group-hover:bg-[#886c46]/20 rounded-lg flex items-center justify-center transition duration-300">
                      <Phone className="w-4 h-4 text-[#886c46]" />
                    </div>
                    <span className={`${inter.className} text-sm text-black/80 group-hover:text-[#886c46] transition`}>
                      +91 9000800665
                    </span>
                  </a>
                  <a href="tel:+919876543211" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-[#886c46]/10 group-hover:bg-[#886c46]/20 rounded-lg flex items-center justify-center transition duration-300">
                      <Phone className="w-4 h-4 text-[#886c46]" />
                    </div>
                    <span className={`${inter.className} text-sm text-black/80 group-hover:text-[#886c46] transition`}>
                      +91 8185892514
                    </span>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/50 backdrop-blur border border-[#886c46]/10 rounded-2xl p-6 hover:shadow-lg transition duration-300"
              >
                <h4 className={`${playfair.className} text-lg font-semibold mb-4 text-[#886c46]`}>
                  Support
                </h4>
                <div className="space-y-3">
                  <a href="mailto:info@texoprefab.com" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-[#886c46]/10 group-hover:bg-[#886c46]/20 rounded-lg flex items-center justify-center transition duration-300">
                      <Mail className="w-4 h-4 text-[#886c46]" />
                    </div>
                    <span className={`${inter.className} text-sm text-black/80 group-hover:text-[#886c46] transition`}>
                      info@texoprefab.com
                    </span>
                  </a>
                  <a href="mailto:support@texoprefab.com" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-[#886c46]/10 group-hover:bg-[#886c46]/20 rounded-lg flex items-center justify-center transition duration-300">
                      <Mail className="w-4 h-4 text-[#886c46]" />
                    </div>
                    <span className={`${inter.className} text-sm text-black/80 group-hover:text-[#886c46] transition`}>
                      sales@texoprefab.com
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="py-16 border-b border-black/5">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className={`${playfair.className} text-2xl font-semibold mb-10 text-center text-[#886c46]`}
            >
              Our Offices
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group bg-linear-to-br from-white/80 to-[#f8f5f0]/80 backdrop-blur border border-[#886c46]/20 rounded-2xl p-8 hover:shadow-xl transition duration-300 hover:border-[#886c46]/40"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#886c46]/10 group-hover:bg-[#886c46]/20 rounded-xl flex items-center justify-center transition duration-300">
                    <MapPin className="w-6 h-6 text-[#886c46]" />
                  </div>
                  <div>
                    <h4 className={`${playfair.className} text-xl font-semibold text-[#886c46] mb-1`}>
                      Manufacturing unit & Sales office
                    </h4>
                    <div className="h-1 w-12 bg-[#d7a661]/30 rounded-full" />
                  </div>
                </div>
                
                <p className={`${inter.className} text-sm text-black/75 leading-relaxed mb-6 font-light`}>
                  Texo Prefab, Plot No.22, Phase-1, I.D.A,Jeedimetla,<br />
                   Shapur Nagar,Hyderabad,<br />
                  Telangana 500055<br />
                    India
                </p>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#886c46] hover:bg-[#6b5236] text-white rounded-xl transition duration-300 font-medium shadow-lg hover:shadow-xl group/btn"
                >
                  <MapPin className="w-4 h-4 group-hover/btn:scale-110 transition" />
                  View on Maps
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group bg-linear-to-br from-white/80 to-[#f8f5f0]/80 backdrop-blur border border-[#886c46]/20 rounded-2xl p-8 hover:shadow-xl transition duration-300 hover:border-[#886c46]/40"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#886c46]/10 group-hover:bg-[#886c46]/20 rounded-xl flex items-center justify-center transition duration-300">
                    <MapPin className="w-6 h-6 text-[#886c46]" />
                  </div>
                  <div>
                    <h4 className={`${playfair.className} text-xl font-semibold text-[#886c46] mb-1`}>
                      Experience Centre & Branch Office
                    </h4>
                    <div className="h-1 w-12 bg-[#d7a661]/30 rounded-full" />
                  </div>
                </div>
                
                <p className={`${inter.className} text-sm text-black/75 leading-relaxed mb-6 font-light`}>
                  Texo Prefab World<br />
                  Muthangi, Patancheruvu ORR Exit No.03<br />
                  Hyderabad, Telangana 502300<br />
                  India
                </p>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#886c46] hover:bg-[#6b5236] text-white rounded-xl transition duration-300 font-medium shadow-lg hover:shadow-xl group/btn"
                >
                  <MapPin className="w-4 h-4 group-hover/btn:scale-110 transition" />
                  View on Maps
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="py-8 bg-linear-to-r from-[#886c46]/5 via-transparent to-[#886c46]/5"
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className={`${inter.className} text-xs text-black/60 font-light tracking-wide`}>
              © 2016:2026 Texo Prefab. All rights reserved. <span className="text-[#886c46]">•</span> Crafting Quality Homes, Building Better Futures
            </p>
          </div>
        </motion.div>
      </footer>

      <motion.a
        href="https://wa.me/919000800665"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 left-8 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition duration-300"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      <motion.a
        href="tel:+919000800665"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition duration-300"
      >
        <Phone className="w-6 h-6" />
      </motion.a>

    </main>
  );
}
