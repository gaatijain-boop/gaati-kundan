'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="text-6xl mb-6">🤍</div>
          <h1 className="font-serif text-4xl text-luxury-black mb-4">Your Wishlist is Empty</h1>
          <p className="text-luxury-gray font-sans text-sm leading-relaxed mb-8">
            Save pieces you love to your wishlist and come back to them anytime.
          </p>
          <Link href="/category/necklace" className="btn-gold">
            Discover Collections
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-luxury-cream border-b border-luxury-light-gray py-14 md:py-20">
        <div className="section-container text-center">
          <p className="text-gold text-xs tracking-ultra uppercase font-sans mb-3">Saved Pieces</p>
          <h1 className="font-serif text-4xl md:text-5xl text-luxury-black mb-2">My Wishlist</h1>
          <p className="text-luxury-gray font-sans text-sm mt-3">
            {wishlist.length} {wishlist.length === 1 ? 'piece' : 'pieces'} saved
          </p>
          <div className="gold-divider mt-4" />
        </div>
      </div>

      <div className="section-container py-12 md:py-16">
        <AnimatePresence>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-14">
            {wishlist.map((item) => {
              const inCart = isInCart(item.id);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  {/* Image */}
                  <div className="relative aspect-product overflow-hidden bg-luxury-cream mb-4">
                    <Link href={`/product/${item.slug}`}>
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-3xl opacity-20">💎</span>
                        </div>
                      )}
                    </Link>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white shadow-md flex items-center justify-center text-luxury-black hover:bg-red-50 hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      aria-label="Remove from wishlist"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Info */}
                  <div>
                    <Link href={`/product/${item.slug}`}>
                      <h3 className="font-serif text-base md:text-lg text-luxury-black hover:text-gold transition-colors line-clamp-2 mb-1.5">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="font-sans font-semibold text-luxury-black mb-3">
                      {formatPrice(item.price)}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(item)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-sans font-semibold tracking-wide transition-all duration-200 ${
                          inCart
                            ? 'bg-gold text-luxury-black'
                            : 'bg-luxury-black text-white hover:bg-gold hover:text-luxury-black'
                        }`}
                      >
                        <FiShoppingBag className="w-3.5 h-3.5" />
                        {inCart ? 'In Cart' : 'Add to Cart'}
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="w-9 flex items-center justify-center border border-luxury-light-gray text-luxury-gray hover:border-red-300 hover:text-red-500 transition-all duration-200"
                        aria-label="Remove"
                      >
                        <FiHeart className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
