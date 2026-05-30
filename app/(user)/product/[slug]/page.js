'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiShare2, FiCopy, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { getProductBySlug, getRelatedProducts } from '@/services/products';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { formatPrice, generateProductWhatsAppMessage, getImagePlaceholder } from '@/lib/utils';
import { BRAND } from '@/lib/constants';
import { ProductDetailSkeleton } from '@/components/ui/LoadingSkeleton';
import ProductCard from '@/components/ui/ProductCard';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed, recentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    async function load() {
      if (!slug) return;
      setIsLoading(true);
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
        addToRecentlyViewed(data);

        if (data?.category_id) {
          const related = await getRelatedProducts(data.category_id, data.id, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [slug]);

  const handleImageZoom = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleShare = async (type) => {
    const url = window.location.href;
    const text = `Check out ${product.name} at Gaati Kundan Jewellery! ${formatPrice(product.price)}`;

    if (type === 'whatsapp') {
      const waUrl = generateProductWhatsAppMessage(product, BRAND.siteUrl, BRAND.whatsappNumber);
      window.open(waUrl, '_blank');
    } else if (type === 'copy') {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied!');
    }
    setIsShareOpen(false);
  };

  const handleWhatsAppEnquiry = () => {
    if (!product) return;
    const waUrl = generateProductWhatsAppMessage(product, BRAND.siteUrl, BRAND.whatsappNumber);
    window.open(waUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="section-container py-20">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">💎</p>
          <h2 className="font-serif text-3xl text-luxury-black mb-3">Product Not Found</h2>
          <p className="text-luxury-gray font-sans mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="btn-gold">Back to Home</Link>
        </div>
      </div>
    );
  }

  const images = product.product_images || [];
  const currentImage = images[selectedImageIndex]?.image_url;
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const recentlyViewedFiltered = recentlyViewed.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-luxury-light-gray">
        <div className="section-container py-3">
          <nav className="flex items-center gap-2 text-xs font-sans text-luxury-gray">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            {product.categories && (
              <>
                <Link href={`/category/${product.categories.slug}`} className="hover:text-gold transition-colors capitalize">
                  {product.categories.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-luxury-black line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Images Column */}
          <div>
            {/* Main Image */}
            <div
              className="relative aspect-square overflow-hidden bg-luxury-cream mb-4 cursor-zoom-in"
              onMouseMove={handleImageZoom}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  style={{
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transform: isZoomed ? 'scale(1.8)' : 'scale(1)',
                    transition: isZoomed ? 'transform 0.1s' : 'transform 0.3s',
                  }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl opacity-20">💎</span>
                </div>
              )}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center shadow-md hover:bg-gold hover:text-white transition-all duration-200"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center shadow-md hover:bg-gold hover:text-white transition-all duration-200"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.new_arrival && (
                  <span className="px-2.5 py-1 bg-luxury-black text-white text-xs font-sans font-semibold tracking-wide">NEW</span>
                )}
                {product.trending && (
                  <span className="px-2.5 py-1 bg-gold text-luxury-black text-xs font-sans font-semibold tracking-wide">TRENDING</span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`flex-shrink-0 w-20 h-20 relative overflow-hidden border-2 transition-all duration-200 ${
                      i === selectedImageIndex ? 'border-gold' : 'border-transparent hover:border-gold/40'
                    }`}
                  >
                    <Image
                      src={img.image_url}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Video */}
            {product.product_videos?.[0]?.video_url && (
              <div className="mt-4">
                <video
                  src={product.product_videos[0].video_url}
                  controls
                  className="w-full"
                  poster={currentImage}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          {/* Product Info Column */}
          <div className="flex flex-col">
            {/* Category */}
            {product.categories && (
              <Link
                href={`/category/${product.categories.slug}`}
                className="text-xs text-gold tracking-ultra uppercase font-sans mb-3 hover:text-gold-dark transition-colors"
              >
                {product.categories.name}
              </Link>
            )}

            {/* Product Name */}
            <h1 className="font-serif text-3xl md:text-4xl text-luxury-black leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-sans text-3xl font-semibold text-luxury-black">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-luxury-gray font-sans">Inclusive of all taxes</span>
            </div>

            <div className="w-full h-px bg-luxury-light-gray mb-6" />

            {/* Description */}
            {product.description && (
              <div className="mb-8">
                <h3 className="font-sans text-sm font-semibold text-luxury-black tracking-wide uppercase mb-3">
                  About This Piece
                </h3>
                <div className="product-description">
                  <p className="text-luxury-gray font-sans text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            )}

            {/* Highlights */}
            <div className="bg-luxury-cream p-5 mb-8 space-y-3">
              {[
                '✦ Premium quality artificial jewellery',
                '✦ Kundan-inspired royal design',
                '✦ Lightweight and comfortable to wear',
                '✦ Perfect for weddings and festivities',
              ].map((point) => (
                <p key={point} className="text-sm font-sans text-luxury-gray">
                  {point}
                </p>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              {/* WhatsApp Enquiry - Primary */}
              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full flex items-center justify-center gap-3 py-4 bg-[#25D366] text-white font-sans font-semibold text-sm tracking-wide hover:bg-[#1ea952] transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enquire on WhatsApp
              </button>

              {/* Add to Cart + Wishlist Row */}
              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(product)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 font-sans font-semibold text-sm tracking-wide transition-all duration-200 ${
                    inCart
                      ? 'bg-gold text-luxury-black'
                      : 'bg-luxury-black text-white hover:bg-gold hover:text-luxury-black'
                  }`}
                >
                  <FiShoppingBag className="w-4 h-4" />
                  {inCart ? 'Added to Cart' : 'Add to Cart'}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-12 flex items-center justify-center border transition-all duration-200 ${
                    inWishlist
                      ? 'border-red-400 bg-red-50 text-red-500'
                      : 'border-luxury-light-gray hover:border-gold hover:text-gold text-luxury-black'
                  }`}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <FiHeart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>

                {/* Share */}
                <div className="relative">
                  <button
                    onClick={() => setIsShareOpen(!isShareOpen)}
                    className="w-12 flex items-center justify-center border border-luxury-light-gray hover:border-gold hover:text-gold text-luxury-black transition-all duration-200 h-full"
                    aria-label="Share product"
                  >
                    <FiShare2 className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {isShareOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 5 }}
                        className="absolute right-0 bottom-full mb-2 w-44 bg-white border border-luxury-light-gray shadow-luxury z-10"
                      >
                        <button
                          onClick={() => handleShare('whatsapp')}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-sans text-luxury-black hover:bg-luxury-cream hover:text-gold transition-colors"
                        >
                          <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          Share on WhatsApp
                        </button>
                        <button
                          onClick={() => handleShare('copy')}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-sans text-luxury-black hover:bg-luxury-cream hover:text-gold transition-colors"
                        >
                          <FiCopy className="w-4 h-4" />
                          Copy Link
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-luxury-light-gray">
              {[
                { icon: '✦', text: 'Premium Quality' },
                { icon: '◈', text: 'Authentic Kundan' },
                { icon: '✧', text: 'Easy Returns' },
              ].map((badge) => (
                <div key={badge.text} className="text-center">
                  <p className="text-gold text-lg mb-1">{badge.icon}</p>
                  <p className="text-xs font-sans text-luxury-gray">{badge.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-luxury-cream py-16">
          <div className="section-container">
            <div className="text-center mb-10">
              <p className="text-gold text-xs tracking-ultra uppercase font-sans mb-2">Similar Pieces</p>
              <h2 className="font-serif text-3xl text-luxury-black">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      {recentlyViewedFiltered.length > 0 && (
        <div className="bg-white py-16 border-t border-luxury-light-gray">
          <div className="section-container">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl text-luxury-black">Recently Viewed</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
              {recentlyViewedFiltered.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="aspect-product bg-luxury-cream overflow-hidden mb-3">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={300}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-3xl opacity-20">💎</span>
                      </div>
                    )}
                  </div>
                  <p className="font-serif text-base text-luxury-black group-hover:text-gold transition-colors line-clamp-2">
                    {p.name}
                  </p>
                  <p className="font-sans text-sm font-semibold mt-1">{formatPrice(p.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
