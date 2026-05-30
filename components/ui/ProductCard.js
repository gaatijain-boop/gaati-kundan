'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPrice, getImagePlaceholder } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function ProductCard({ product, variant = 'default', priority = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const mainImage = product.product_images?.[0]?.image_url;
  const secondImage = product.product_images?.[1]?.image_url;
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const displayImage = isHovered && secondImage ? secondImage : mainImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-luxury-cream aspect-product">
        {/* Product Image */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className={cn(
                'object-cover transition-all duration-700',
                isHovered && secondImage ? 'opacity-0' : 'opacity-100'
              )}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-luxury-cream">
              <span className="text-4xl opacity-30">💎</span>
            </div>
          )}

          {/* Second Image on Hover */}
          {secondImage && (
            <Image
              src={secondImage}
              alt={`${product.name} - alternate view`}
              fill
              className={cn(
                'object-cover transition-all duration-700',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
        </Link>

        {/* Overlay on Hover */}
        <div className={cn(
          'absolute inset-0 bg-luxury-black/10 transition-opacity duration-300',
          isHovered ? 'opacity-100' : 'opacity-0'
        )} />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.new_arrival && (
            <span className="px-2 py-1 bg-luxury-black text-white text-xs font-sans font-semibold tracking-wide">
              NEW
            </span>
          )}
          {product.trending && (
            <span className="px-2 py-1 bg-gold text-luxury-black text-xs font-sans font-semibold tracking-wide">
              TRENDING
            </span>
          )}
          {product.featured && !product.trending && !product.new_arrival && (
            <span className="px-2 py-1 bg-white/90 text-luxury-black text-xs font-sans font-semibold tracking-wide">
              FEATURED
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className={cn(
          'absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300',
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        )}>
          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={cn(
              'w-9 h-9 flex items-center justify-center bg-white shadow-md transition-all duration-200 hover:bg-gold hover:text-white',
              inWishlist ? 'text-red-500' : 'text-luxury-black'
            )}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <FiHeart
              className={cn('w-4 h-4', inWishlist && 'fill-current')}
            />
          </button>

          {/* Quick View */}
          <Link
            href={`/product/${product.slug}`}
            className="w-9 h-9 flex items-center justify-center bg-white shadow-md text-luxury-black hover:bg-gold hover:text-white transition-all duration-200"
            aria-label="Quick view"
          >
            <FiEye className="w-4 h-4" />
          </Link>
        </div>

        {/* Add to Cart - Bottom Slide */}
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          initial={false}
          animate={{ y: isHovered ? 0 : '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className={cn(
              'w-full py-3 text-xs font-sans font-semibold tracking-luxury uppercase transition-all duration-200 flex items-center justify-center gap-2',
              inCart
                ? 'bg-gold text-luxury-black'
                : 'bg-luxury-black text-white hover:bg-gold hover:text-luxury-black'
            )}
          >
            <FiShoppingBag className="w-3.5 h-3.5" />
            {inCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="pt-4 pb-2">
        {product.categories && (
          <p className="text-xs text-luxury-gray font-sans tracking-ultra uppercase mb-1">
            {product.categories.name}
          </p>
        )}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-base md:text-lg text-luxury-black leading-tight mb-1.5 hover:text-gold transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="font-sans text-base font-semibold text-luxury-black">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.div>
  );
}
