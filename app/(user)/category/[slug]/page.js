'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSearch, FiChevronDown, FiSliders } from 'react-icons/fi';
import ProductCard from '@/components/ui/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/LoadingSkeleton';
import { CATEGORIES, SORT_OPTIONS } from '@/lib/constants';
import { getProductsByCategory } from '@/services/products';
import { debounce } from '@/lib/utils';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug;

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryInfo = CATEGORIES.find((c) => c.slug === slug);

  const loadProducts = useCallback(async (searchQuery = '', sort = 'default') => {
    setIsLoading(true);
    try {
      let sortField = 'created_at', sortOrder = 'desc';
      if (sort === 'price_asc') { sortField = 'price'; sortOrder = 'asc'; }
      else if (sort === 'price_desc') { sortField = 'price'; sortOrder = 'desc'; }

      const data = await getProductsByCategory(slug, { search: searchQuery, sortBy: sortField, sortOrder, limit: 40 });
      setProducts(data);
    } catch { setProducts([]); }
    finally { setIsLoading(false); }
  }, [slug]);

  useEffect(() => { if (slug) loadProducts(); }, [slug, loadProducts]);

  const debouncedSearch = useCallback(debounce((v) => loadProducts(v, sortBy), 400), [loadProducts, sortBy]);

  const handleSearch = (e) => { setSearch(e.target.value); debouncedSearch(e.target.value); };
  const handleSort = (v) => { setSortBy(v); loadProducts(search, v); setIsFilterOpen(false); };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="bg-luxury-off-white pt-28 pb-10 md:pt-36 md:pb-14 border-b border-luxury-light-gray">
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-gold text-xs tracking-ultra uppercase font-sans mb-3">Collections</p>
            <h1 className="font-serif text-4xl md:text-6xl text-luxury-black mb-3">{categoryInfo?.name || slug}</h1>
            <div className="w-12 h-0.5 bg-gold mx-auto mb-4" />
            <p className="text-luxury-gray font-sans text-sm max-w-md mx-auto">{categoryInfo?.description}</p>
          </motion.div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-white border-b border-luxury-light-gray shadow-sm">
        <div className="section-container py-3">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gray" />
              <input
                type="text"
                placeholder={`Search ${categoryInfo?.name || ''}...`}
                value={search}
                onChange={handleSearch}
                className="w-full pl-9 pr-4 py-2.5 border border-luxury-light-gray text-sm font-sans focus:outline-none focus:border-gold bg-luxury-soft-bg transition-colors"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <button onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2.5 border border-luxury-light-gray text-sm font-sans hover:border-gold transition-colors bg-white">
                <FiSliders className="w-4 h-4" />
                <span className="hidden sm:inline">{SORT_OPTIONS.find(s => s.value === sortBy)?.label || 'Sort'}</span>
                <FiChevronDown className={`w-3 h-3 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-luxury-light-gray shadow-luxury z-40">
                  {SORT_OPTIONS.map(opt => (
                    <button key={opt.value} onClick={() => handleSort(opt.value)}
                      className={`w-full text-left px-4 py-3 text-sm font-sans hover:bg-luxury-soft-bg transition-colors ${sortBy === opt.value ? 'text-gold font-semibold' : 'text-luxury-black'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Count */}
            {!isLoading && (
              <p className="text-xs text-luxury-gray font-sans hidden md:block flex-shrink-0">
                {products.length} pieces
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="section-container py-10 md:py-14">
        {isLoading ? (
          <ProductGridSkeleton count={8} />
        ) : products.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <p className="text-5xl mb-5">💎</p>
            <h3 className="font-serif text-3xl text-luxury-black mb-3">
              {search ? 'No results found' : 'Coming Soon'}
            </h3>
            <p className="text-luxury-gray font-sans text-sm mb-6">
              {search ? `No products found for "${search}"` : 'We are adding beautiful pieces soon!'}
            </p>
            {search && (
              <button onClick={() => { setSearch(''); loadProducts('', sortBy); }} className="btn-gold">
                Clear Search
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-14">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </motion.div>
        )}
      </div>

      {/* Other Categories */}
      <div className="bg-luxury-soft-bg border-t border-luxury-light-gray py-12">
        <div className="section-container">
          <p className="text-xs text-luxury-gray tracking-ultra uppercase font-sans text-center mb-6">Browse More</p>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.filter(c => c.slug !== slug).map(cat => (
              <Link key={cat.slug} href={`/category/${cat.slug}`}
                className="flex items-center gap-2 px-4 py-2 border border-luxury-light-gray text-sm font-sans text-luxury-black hover:border-gold hover:text-gold bg-white transition-all duration-200">
                <span>{cat.icon}</span> {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
