'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { CATEGORIES } from '@/lib/constants';

const categoryImages = {
  necklace:  'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
  earrings:  'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
  rings:     'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
  bangles:   'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
  bracelets: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80',
  pendants:  'https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=600&q=80',
};

export default function FeaturedCollections() {
  return (
    <section className="py-16 md:py-24 bg-luxury-soft-bg">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gold text-xs tracking-ultra uppercase font-sans font-semibold mb-2">Shop by Category</p>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-black mb-3">Our Collections</h2>
          <div className="gold-divider mb-4" />
          <p className="text-luxury-gray font-sans text-sm max-w-lg mx-auto">
            From everyday elegance to grand bridal occasions — find your perfect Kundan piece.
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link href={`/category/${cat.slug}`} className="group block relative overflow-hidden">
                <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[4/3] md:aspect-[16/9]' : 'aspect-square'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={categoryImages[cat.slug]}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-108"
                    style={{ transition: 'transform 0.6s ease' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-300" />
                </div>

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-serif text-white font-semibold ${i === 0 ? 'text-xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                        {cat.name}
                      </h3>
                      <p className="text-white/60 text-xs font-sans mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Explore →
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-white/10 border border-white/30 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                      <FiArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Product count badge */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 text-charcoal text-[10px] font-sans font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  SHOP NOW
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
