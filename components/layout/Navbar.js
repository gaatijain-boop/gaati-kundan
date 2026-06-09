'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiHeart, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { CATEGORIES, BRAND } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setIsMobileOpen(false), [pathname]);

  const isHome = pathname === '/';
  const scrolled = isScrolled || !isHome;

  return (
    <>
      {/* Main nav */}
      <header className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        scrolled ? 'bg-white/96 backdrop-blur-md shadow-sm border-b border-luxury-light-gray' : 'bg-transparent'
      )}>
        <nav className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <p className={cn('font-serif font-bold text-xl md:text-2xl leading-none transition-colors duration-300',
                scrolled ? 'text-charcoal' : 'text-white')}>
                Gaati Kundan
              </p>
              <p className="text-[10px] text-gold tracking-ultra uppercase font-sans mt-0.5">Jewellery</p>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }].map(l => (
                <Link key={l.href} href={l.href} className={cn(
                  'text-sm font-sans tracking-wide transition-colors duration-200 hover:text-gold',
                  scrolled ? 'text-luxury-black' : 'text-white',
                  pathname === l.href && 'text-gold font-semibold'
                )}>{l.label}</Link>
              ))}

              {/* Collections dropdown */}
              <div className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}>
                <button className={cn(
                  'text-sm font-sans tracking-wide transition-colors hover:text-gold flex items-center gap-1',
                  scrolled ? 'text-luxury-black' : 'text-white'
                )}>
                  Collections
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-white border border-luxury-light-gray shadow-luxury overflow-hidden"
                    >
                      <div className="h-0.5 bg-gold-gradient" />
                      <div className="py-1">
                        {CATEGORIES.map(cat => (
                          <Link key={cat.slug} href={`/category/${cat.slug}`}
                            className="flex items-center gap-3 px-5 py-2.5 text-sm font-sans text-luxury-black hover:bg-luxury-soft-bg hover:text-gold transition-colors">
                            <span className="text-gold/70 text-xs">◆</span>
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2 md:gap-3">
              <Link href="/wishlist" aria-label="Wishlist"
                className={cn('relative p-2 transition-colors hover:text-gold', scrolled ? 'text-luxury-black' : 'text-white')}>
                <FiHeart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">{wishlistCount}</span>
                )}
              </Link>

              <Link href="/cart" aria-label="Cart"
                className={cn('relative p-2 transition-colors hover:text-gold', scrolled ? 'text-luxury-black' : 'text-white')}>
                <FiShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount > 9 ? '9+' : cartCount}</span>
                )}
              </Link>

              <button onClick={() => setIsMobileOpen(!isMobileOpen)} aria-label="Menu"
                className={cn('md:hidden p-2 transition-colors hover:text-gold', scrolled ? 'text-luxury-black' : 'text-white')}>
                {isMobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }} className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-charcoal/60" onClick={() => setIsMobileOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white overflow-y-auto shadow-luxury">
              <div className="h-0.5 bg-gold-gradient" />
              <div className="p-6 pt-20">
                <div className="mb-8 pb-5 border-b border-luxury-light-gray">
                  <p className="font-serif text-2xl text-charcoal font-bold">Gaati Kundan</p>
                  <p className="text-[10px] text-gold tracking-ultra uppercase font-sans">Jewellery</p>
                </div>
                <nav className="space-y-1 mb-8">
                  {[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }].map(l => (
                    <Link key={l.href} href={l.href}
                      className="block py-3 border-b border-luxury-light-gray text-sm font-sans text-luxury-black hover:text-gold transition-colors">
                      {l.label}
                    </Link>
                  ))}
                  <div className="py-3">
                    <p className="text-[10px] text-gold tracking-ultra uppercase font-sans font-semibold mb-3">Collections</p>
                    {CATEGORIES.map(cat => (
                      <Link key={cat.slug} href={`/category/${cat.slug}`}
                        className="flex items-center gap-2 py-2 pl-2 text-sm font-sans text-luxury-black hover:text-gold transition-colors">
                        <span className="text-gold/60 text-[10px]">◆</span>{cat.name}
                      </Link>
                    ))}
                  </div>
                </nav>
                <a href={`https://wa.me/${BRAND.whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                  className="whatsapp-btn w-full justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
