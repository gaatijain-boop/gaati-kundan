'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '@/hooks/useCart';
import { formatPrice, generateCartWhatsAppMessage } from '@/lib/utils';
import { BRAND } from '@/lib/constants';
import ProductSection from '@/components/sections/ProductSection';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();

  const handleWhatsAppEnquiry = () => {
    if (cart.length === 0) return;
    const waUrl = generateCartWhatsAppMessage(cart, BRAND.whatsappNumber);
    window.open(waUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="text-6xl mb-6">🛍️</div>
          <h1 className="font-serif text-4xl text-luxury-black mb-4">Your Cart is Empty</h1>
          <p className="text-luxury-gray font-sans text-sm leading-relaxed mb-8">
            Looks like you haven&apos;t added any pieces to your cart yet. Explore our beautiful Kundan jewellery collections!
          </p>
          <Link href="/category/necklace" className="btn-gold">
            Explore Collections
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
          <p className="text-gold text-xs tracking-ultra uppercase font-sans mb-3">Your Selection</p>
          <h1 className="font-serif text-4xl md:text-5xl text-luxury-black mb-2">Shopping Cart</h1>
          <div className="gold-divider mt-4" />
        </div>
      </div>

      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Header Row */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-luxury-light-gray text-xs font-sans text-luxury-gray tracking-wide uppercase">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-1 text-right">Remove</div>
            </div>

            {/* Items */}
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-12 gap-4 py-6 border-b border-luxury-light-gray items-center"
                >
                  {/* Image + Name */}
                  <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
                    <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                      <div className="w-20 h-24 relative overflow-hidden bg-luxury-cream">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-2xl opacity-20">💎</span>
                          </div>
                        )}
                      </div>
                    </Link>
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-serif text-base md:text-lg text-luxury-black hover:text-gold transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm font-sans font-semibold text-luxury-black mt-1 md:hidden">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="hidden md:flex col-span-2 items-center justify-center">
                    <span className="font-sans font-semibold text-luxury-black">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-9 md:col-span-3 flex items-center justify-start md:justify-center gap-3">
                    <div className="flex items-center border border-luxury-light-gray">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-luxury-cream hover:text-gold transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <FiMinus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center font-sans text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-luxury-cream hover:text-gold transition-colors"
                        aria-label="Increase quantity"
                      >
                        <FiPlus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <div className="col-span-3 md:col-span-1 flex items-center justify-end md:justify-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-luxury-gray hover:text-red-500 transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear Cart */}
            <div className="flex justify-end mt-4">
              <button
                onClick={clearCart}
                className="text-xs font-sans text-luxury-gray hover:text-red-500 transition-colors underline underline-offset-2"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-luxury-cream p-6 sticky top-24">
              <h3 className="font-serif text-xl text-luxury-black mb-5">Order Summary</h3>

              <div className="space-y-3 mb-5 pb-5 border-b border-luxury-light-gray">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-3">
                    <p className="text-sm font-sans text-luxury-black line-clamp-2 flex-1">
                      {item.name}
                      <span className="text-luxury-gray"> × {item.quantity}</span>
                    </p>
                    <p className="text-sm font-sans font-semibold text-luxury-black flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-1">
                <p className="font-sans text-sm text-luxury-gray">Subtotal ({cartCount} items)</p>
                <p className="font-sans font-semibold text-luxury-black">{formatPrice(cartTotal)}</p>
              </div>
              <div className="flex justify-between items-center mb-6">
                <p className="font-sans text-xs text-luxury-gray">Shipping</p>
                <p className="font-sans text-xs text-[#22c55e] font-semibold">To be confirmed</p>
              </div>

              <div className="flex justify-between items-center py-4 border-t border-luxury-light-gray mb-6">
                <p className="font-serif text-lg text-luxury-black">Total</p>
                <p className="font-serif text-2xl text-luxury-black">{formatPrice(cartTotal)}</p>
              </div>

              {/* WhatsApp CTA */}
              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full flex items-center justify-center gap-3 py-4 bg-[#25D366] text-white font-sans font-semibold text-sm tracking-wide hover:bg-[#1ea952] transition-all duration-200 mb-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enquire on WhatsApp
              </button>

              <p className="text-xs text-center font-sans text-luxury-gray">
                Our team will confirm availability & pricing via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
