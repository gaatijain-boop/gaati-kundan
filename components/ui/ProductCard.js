'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPrice, generateProductWhatsAppMessage } from '@/lib/utils';
import { BRAND } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function ProductCard({ product, priority = false }) {
  const [imgError, setImgError] = useState(false);
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const mainImage = product.product_images?.[0]?.image_url;
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = generateProductWhatsAppMessage(product, BRAND.siteUrl, BRAND.whatsappNumber);
    window.open(url, '_blank');
  };

  const handleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="group flex flex-col bg-white"
    >
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-luxury-soft-bg flex-shrink-0">
        {mainImage && !imgError ? (
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl opacity-20">💎</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.new_arrival && (
            <span className="px-2 py-0.5 bg-charcoal text-white text-[10px] font-sans font-bold tracking-wide">NEW</span>
          )}
          {product.trending && (
            <span className="px-2 py-0.5 bg-gold text-white text-[10px] font-sans font-bold tracking-wide">TRENDING</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className={cn(
            'absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white/95 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50',
            inWishlist && 'opacity-100 text-red-500',
            !inWishlist && 'text-luxury-gray'
          )}
          aria-label="Wishlist"
        >
          <FiHeart className={cn('w-4 h-4', inWishlist && 'fill-current')} />
        </button>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 pt-3 md:pt-4">
        {/* Category */}
        {product.categories && (
          <p className="text-[10px] text-luxury-gray font-sans font-medium tracking-ultra uppercase mb-1">
            {product.categories.name}
          </p>
        )}

        {/* Name */}
        <Link href={`/product/${product.slug}`} className="block mb-1.5">
          <h3 className="font-sans text-sm text-luxury-black leading-snug line-clamp-2 group-hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <p className="font-sans text-sm md:text-base font-semibold text-luxury-black mb-3">
          {formatPrice(product.price)}
        </p>

        {/* CTAs */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleCart}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-sans font-semibold tracking-wide transition-colors duration-200',
              inCart
                ? 'bg-gold text-white'
                : 'bg-luxury-black text-white hover:bg-gold'
            )}
          >
            <FiShoppingBag className="w-3.5 h-3.5" />
            {inCart ? 'Added' : 'Add to Cart'}
          </button>

          <button
            onClick={handleWhatsApp}
            aria-label="Enquire on WhatsApp"
            className="w-9 h-9 flex-shrink-0 flex items-center justify-center border border-luxury-light-gray text-[#25D366] hover:border-[#25D366] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
