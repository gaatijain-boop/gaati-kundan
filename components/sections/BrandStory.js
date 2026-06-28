'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function BrandStory() {
  return (
    <section className="py-20 md:py-28 bg-luxury-off-white overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80" alt="Craftsmanship" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 -z-10" />
            <div className="absolute bottom-8 left-6 right-6 glass p-4 border-l-2 border-gold">
              <p className="font-serif text-luxury-black text-lg leading-snug">
                &ldquo;Every piece tells a story of timeless Indian elegance&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="text-gold text-xs tracking-ultra uppercase font-sans mb-4">Our Story</p>
            <h2 className="font-serif text-4xl md:text-5xl text-luxury-black leading-tight mb-6">
              The Art of<br /><span className="text-gold">Kundan Jewellery</span>
            </h2>
            <div className="w-12 h-px bg-gold mb-8" />

            <div className="space-y-5 text-luxury-gray font-sans text-sm leading-relaxed">
              <p>At Gaati Kundan Jewellery, we believe every woman deserves to feel like royalty. Our collections are inspired by the ancient Kundan tradition of Rajasthan, reimagined for the modern Indian woman.</p>
              <p>We craft each piece with meticulous attention to detail — ensuring our jewellery looks and feels luxurious at prices that make it accessible to every woman who deserves to shine.</p>
              <p>From wedding ceremonies to festive celebrations — our jewellery is designed to be with you at every milestone of your beautiful life.</p>
            </div>

            <div className="grid grid-cols-3 gap-6 my-10 py-8 border-y border-luxury-light-gray">
              {[{ n: '500+', l: 'Designs' }, { n: '10K+', l: 'Customers' }, { n: '6+', l: 'Collections' }].map(s => (
                <div key={s.l} className="text-center">
                  <p className="font-serif text-3xl text-luxury-black mb-1">{s.n}</p>
                  <p className="text-luxury-gray text-xs font-sans tracking-wide">{s.l}</p>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-outline-gold group">
              Read Our Story <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
