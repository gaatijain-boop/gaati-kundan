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
  const skeletonCount = 4;

  return (
    <section className={`py-20 md:py-28 ${bgColor}`}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            {badge && (
              <p className="text-gold text-xs tracking-ultra uppercase font-sans mb-3">{badge}</p>
            )}
            <h2 className="section-title">{title}</h2>
            {subtitle && (
              <p className="section-subtitle mt-3 max-w-xl">{subtitle}</p>
            )}
            <div className="w-12 h-0.5 bg-gold mt-4" />
          </div>

          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="group flex items-center gap-2 text-luxury-black text-sm font-sans font-semibold tracking-wide hover:text-gold transition-colors duration-200 flex-shrink-0"
            >
              {viewAllLabel}
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-14">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">💎</p>
            <p className="font-serif text-2xl text-luxury-black mb-2">Coming Soon</p>
            <p className="text-luxury-gray text-sm font-sans">
              We&apos;re adding beautiful pieces to this collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-14">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
