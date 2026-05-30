'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPlusCircle, FiSearch, FiStar, FiTrendingUp, FiPackage } from 'react-icons/fi';
import { getAllProducts, deleteProduct } from '@/services/products';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllProducts({ limit: 100 });
      setProducts(data);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async (product) => {
    if (deleteConfirm !== product.id) {
      setDeleteConfirm(product.id);
      toast('Click again to confirm deletion', { icon: '⚠️' });
      setTimeout(() => setDeleteConfirm(null), 3000);
      return;
    }

    try {
      await deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      toast.success('Product deleted');
      setDeleteConfirm(null);
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 md:ml-60">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-luxury-black">Products</h1>
          <p className="text-luxury-gray font-sans text-sm mt-1">
            {products.length} total products
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-gold text-sm px-5 py-2.5">
          <FiPlusCircle className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gray" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="luxury-input pl-10"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-luxury-cream border-b border-gray-100 text-xs font-sans font-semibold text-luxury-gray uppercase tracking-wide">
          <div className="col-span-5">Product</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Tags</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="w-12 h-14 bg-gray-200 shimmer flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 shimmer rounded w-1/2" />
                  <div className="h-3 bg-gray-200 shimmer rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <FiPackage className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="font-sans text-luxury-black font-semibold mb-1">
              {search ? 'No products found' : 'No products yet'}
            </p>
            <p className="font-sans text-sm text-luxury-gray mb-4">
              {search ? `No results for "${search}"` : 'Add your first jewellery piece to get started'}
            </p>
            {!search && (
              <Link href="/admin/products/new" className="btn-gold text-sm">
                Add Product
              </Link>
            )}
          </div>
        ) : (
          <div>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-50 hover:bg-luxury-cream/50 transition-colors items-center"
              >
                {/* Product Info */}
                <div className="col-span-12 md:col-span-5 flex items-center gap-3">
                  <div className="w-12 h-14 relative overflow-hidden bg-luxury-cream flex-shrink-0">
                    {product.product_images?.[0]?.image_url ? (
                      <Image
                        src={product.product_images[0].image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs text-gray-400">💎</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-sm font-semibold text-luxury-black line-clamp-2 leading-snug">
                      {product.name}
                    </p>
                    <p className="font-sans text-xs text-luxury-gray mt-0.5 font-mono">
                      /{product.slug}
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div className="hidden md:block col-span-2">
                  <span className="px-2 py-1 bg-luxury-cream text-xs font-sans text-luxury-gray">
                    {product.categories?.name || '—'}
                  </span>
                </div>

                {/* Price */}
                <div className="hidden md:block col-span-2">
                  <span className="font-sans text-sm font-semibold text-luxury-black">
                    {formatPrice(product.price)}
                  </span>
                </div>

                {/* Tags */}
                <div className="hidden md:flex col-span-2 gap-1 flex-wrap">
                  {product.featured && (
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-sans font-semibold">
                      <FiStar className="w-2.5 h-2.5" /> Feat
                    </span>
                  )}
                  {product.trending && (
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-green-50 text-green-600 text-[10px] font-sans font-semibold">
                      <FiTrendingUp className="w-2.5 h-2.5" /> Trend
                    </span>
                  )}
                  {product.new_arrival && (
                    <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-sans font-semibold">
                      New
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="col-span-12 md:col-span-1 flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="w-8 h-8 flex items-center justify-center text-luxury-gray hover:text-gold hover:bg-gold/10 transition-all duration-200"
                    aria-label="Edit"
                  >
                    <FiEdit2 className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(product)}
                    className={`w-8 h-8 flex items-center justify-center transition-all duration-200 ${
                      deleteConfirm === product.id
                        ? 'text-white bg-red-500'
                        : 'text-luxury-gray hover:text-red-500 hover:bg-red-50'
                    }`}
                    aria-label="Delete"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
