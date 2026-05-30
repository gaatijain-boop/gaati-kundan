'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiChevronDown } from 'react-icons/fi';
import ProductCard from '@/components/ui/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/LoadingSkeleton';
import { CATEGORIES, SORT_OPTIONS } from '@/lib/constants';
import { getProductsByCategory } from '@/services/products';
import { getCategoryBySlug } from '@/services/categories';
import { debounce } from '@/lib/utils';

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug;

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryInfo = CATEGORIES.find((c) => c.slug === slug);

  const loadProducts = useCallback(
    async (searchQuery = '', sort = 'default') => {
      setIsLoading(true);
      try {
        let sortField = 'created_at';
        let sortOrder = 'desc';

        if (sort === 'price_asc') { sortField = 'price'; sortOrder = 'asc'; }
        else if (sort === 'price_desc') { sortField = 'price'; sortOrder = 'desc'; }
        else if (sort === 'newest') { sortField = 'created_at'; sortOrder = 'desc'; }

        const data = await getProductsByCategory(slug, {
          search: searchQuery,
          sortBy: sortField,
          sortOrder,
          limit: 40,
        });
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products:', err);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    },
    [slug]
  );

  useEffect(() => {
    if (slug) loadProducts();
  }, [slug, loadProducts]);

  const debouncedSearch = useCallback(
    debounce((value) => loadProducts(value, sortBy), 400),
    [loadProducts, sortBy]
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSort = (value) => {
    setSortBy(value);
    loadProducts(search, value);
    setIsFilterOpen(false);
  };

  const currentSort = SORT_OPTIONS.find((s) => s.value === sortBy);

  return (
    <div className="min-h-screen bg-white">
      {/* Category Hero Banner */}
      <div className="relative bg-luxury-cream py-20 md:py-28 overflow-hidden">
        {/* Decorative Gold Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gold/20" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gold/20" />

        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold text-xs tracking-ultra uppercase font-sans mb-3">
              Collections
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-luxury-black mb-4">
              {categoryInfo?.name || slug}
            </h1>
            <div className="gold-divider mb-6" />
            <p className="text-luxury-gray font-sans text-base max-w-xl mx-auto">
              {categoryInfo?.description || `Explore our beautiful ${categoryInfo?.name || slug} collection`}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="sticky top-[88px] z-30 bg-white border-b border-luxury-light-gray shadow-sm">
        <div className="section-container py-4">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gray" />
              <input
                type="text"
                placeholder={`Search ${categoryInfo?.name || 'products'}...`}
                value={search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2.5 border border-luxury-light-gray bg-luxury-cream text-sm font-sans text-luxury-black placeholder-luxury-gray focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2.5 border border-luxury-light-gray bg-white text-sm font-sans text-luxury-black hover:border-gold transition-colors"
              >
                <FiFilter className="w-4 h-4" />
                <span className="hidden sm:inline">{currentSort?.label || 'Sort By'}</span>
                <FiChevronDown className={`w-3 h-3 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-luxury-light-gray shadow-luxury z-40">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSort(option.value)}
                      className={`w-full text-left px-4 py-3 text-sm font-sans transition-colors hover:bg-luxury-cream hover:text-gold ${
                        sortBy === option.value ? 'text-gold bg-luxury-cream' : 'text-luxury-black'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Count */}
            {!isLoading && (
              <p className="text-sm text-luxury-gray font-sans hidden md:block flex-shrink-0">
                {products.length} {products.length === 1 ? 'piece' : 'pieces'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="section-container py-12 md:py-16">
        {isLoading ? (
          <ProductGridSkeleton count={8} />
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <p className="text-5xl mb-6">💎</p>
            <h3 className="font-serif text-3xl text-luxury-black mb-3">
              {search ? 'No results found' : 'Coming Soon'}
            </h3>
            <p className="text-luxury-gray font-sans text-sm max-w-sm mx-auto">
              {search
                ? `No products found for "${search}". Try a different search.`
                : "We're adding beautiful pieces to this collection. Check back soon!"}
            </p>
            {search && (
              <button
                onClick={() => { setSearch(''); loadProducts('', sortBy); }}
                className="mt-6 btn-gold"
              >
                Clear Search
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-14"
          >
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Category navigation */}
      <div className="bg-luxury-cream py-16 border-t border-luxury-light-gray">
        <div className="section-container">
          <p className="text-xs text-luxury-gray tracking-ultra uppercase font-sans text-center mb-8">
            More Collections
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.filter((c) => c.slug !== slug).map((cat) => (
              <a
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-5 py-2.5 border border-luxury-light-gray text-sm font-sans text-luxury-black hover:border-gold hover:text-gold transition-all duration-200 bg-white"
              >
                {cat.icon} {cat.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
