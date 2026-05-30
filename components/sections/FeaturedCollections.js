'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/lib/constants';

const categoryImages = {
  necklace: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
  earrings: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
  rings: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
  bangles: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
  bracelets: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80',
  pendants: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=600&q=80',
};

export default function FeaturedCollections() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-maroon text-xs tracking-ultra uppercase font-sans mb-3 font-semibold">
            Our Collections
          </p>
          <h2 className="section-title mb-4">Discover Your Style</h2>
          <div className="gold-divider mb-6" />
          <p className="section-subtitle max-w-2xl mx-auto">
            From delicate everyday pieces to statement jewellery for grand occasions — explore our curated Kundan collections.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
            >
              <Link
                href={`/category/${category.slug}`}
                className="group relative block overflow-hidden"
              >
                <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[4/3] md:aspect-[4/3]' : 'aspect-square'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={categoryImages[category.slug] || categoryImages.necklace}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    style={{ transition: 'transform 0.7s ease' }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  {/* Gradient — maroon tint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/80 via-maroon-dark/15 to-transparent" />
                  <div className="absolute inset-0 bg-maroon-dark/0 group-hover:bg-maroon-dark/25 transition-all duration-500" />
                </div>

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-gold text-xs tracking-ultra uppercase font-sans mb-1 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Explore →
                      </p>
                      <h3 className={`font-serif text-white leading-tight ${index === 0 ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                        {category.name}
                      </h3>
                    </div>
                    <div className="w-8 h-8 border border-white/30 flex items-center justify-center text-white group-hover:bg-gold group-hover:border-gold transition-all duration-300 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
