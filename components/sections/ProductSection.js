'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '@/components/ui/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/LoadingSkeleton';

export default function ProductSection({
  title,
  subtitle,
  badge,
  products = [],
  isLoading = false,
  viewAllLink,
  viewAllLabel = 'View All',
  bgColor = 'bg-white',
}) {
  return (
    <section className={`py-16 md:py-24 ${bgColor}`}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            {badge && (
              <p className="text-gold text-xs tracking-ultra uppercase font-sans font-semibold mb-2">{badge}</p>
            )}
            <h2 className="font-serif text-3xl md:text-4xl text-luxury-black">{title}</h2>
            {subtitle && (
              <p className="text-luxury-gray font-sans text-sm mt-2 max-w-lg">{subtitle}</p>
            )}
            <div className="w-10 h-0.5 bg-gold mt-3" />
          </div>

          {viewAllLink && (
            <Link href={viewAllLink}
              className="group flex items-center gap-2 text-sm font-sans font-semibold text-charcoal hover:text-gold transition-colors flex-shrink-0 border border-luxury-light-gray px-4 py-2 hover:border-gold">
              {viewAllLabel}
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-14">
            {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-luxury-light-gray">
            <p className="text-4xl mb-4">💎</p>
            <p className="font-serif text-2xl text-luxury-black mb-2">Coming Soon</p>
            <p className="text-luxury-gray text-sm font-sans">Beautiful pieces being added soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-14">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
