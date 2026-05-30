'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiPackage, FiTag, FiStar, FiTrendingUp, FiPlusCircle, FiArrowRight } from 'react-icons/fi';
import { getProductsCount, getRecentUploads } from '@/services/products';
import { getAllCategories } from '@/services/categories';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    featuredCount: 0,
    trendingCount: 0,
  });
  const [recentUploads, setRecentUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [totalProducts, categories, recent] = await Promise.all([
          getProductsCount(),
          getAllCategories(),
          getRecentUploads(5),
        ]);

        setStats({
          totalProducts,
          totalCategories: categories.length,
          featuredCount: 0,
          trendingCount: 0,
        });
        setRecentUploads(recent);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const statCards = [
    {
      icon: FiPackage,
      label: 'Total Products',
      value: stats.totalProducts,
      color: 'bg-blue-50 text-blue-600',
      href: '/admin/products',
    },
    {
      icon: FiTag,
      label: 'Categories',
      value: stats.totalCategories,
      color: 'bg-purple-50 text-purple-600',
      href: '/admin/products',
    },
    {
      icon: FiStar,
      label: 'Featured',
      value: stats.featuredCount,
      color: 'bg-amber-50 text-amber-600',
      href: '/admin/products',
    },
    {
      icon: FiTrendingUp,
      label: 'Trending',
      value: stats.trendingCount,
      color: 'bg-green-50 text-green-600',
      href: '/admin/products',
    },
  ];

  return (
    <div className="p-6 md:p-8 md:ml-60">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-luxury-black">Dashboard</h1>
          <p className="text-luxury-gray font-sans text-sm mt-1">
            Welcome back to Gaati Kundan Admin
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="btn-gold text-sm px-5 py-2.5"
        >
          <FiPlusCircle className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-gold/30 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="font-sans text-2xl font-bold text-luxury-black mb-1">
                {isLoading ? '—' : card.value}
              </p>
              <p className="font-sans text-xs text-luxury-gray">{card.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Uploads */}
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-sans font-semibold text-luxury-black">Recent Products</h3>
            <Link href="/admin/products" className="text-xs text-gold hover:underline font-sans">
              View All →
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-12 h-14 bg-gray-200 shimmer flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 shimmer rounded w-3/4" />
                    <div className="h-3 bg-gray-200 shimmer rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentUploads.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-luxury-gray text-sm font-sans">No products yet</p>
              <Link href="/admin/products/new" className="text-gold text-sm font-sans hover:underline mt-2 inline-block">
                Add your first product →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentUploads.map((product) => (
                <Link
                  key={product.id}
                  href={`/admin/products/${product.id}/edit`}
                  className="flex items-center gap-3 group"
                >
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
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-semibold text-luxury-black group-hover:text-gold transition-colors line-clamp-1">
                      {product.name}
                    </p>
                    <p className="font-sans text-xs text-luxury-gray mt-0.5">
                      {new Date(product.created_at).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <FiArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gold transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <h3 className="font-sans font-semibold text-luxury-black mb-5">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { href: '/admin/products/new', icon: FiPlusCircle, label: 'Add New Product', desc: 'Upload a new jewellery piece' },
              { href: '/admin/products', icon: FiPackage, label: 'Manage Products', desc: 'Edit or delete existing products' },
              { href: '/', icon: FiArrowRight, label: 'View Website', desc: 'See how the store looks', external: true },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  target={action.external ? '_blank' : undefined}
                  className="flex items-center gap-4 p-4 border border-gray-100 hover:border-gold/30 hover:bg-luxury-cream transition-all duration-200 group"
                >
                  <div className="w-9 h-9 bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors duration-200">
                    <Icon className="w-4 h-4 text-gold group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-luxury-black group-hover:text-gold transition-colors">
                      {action.label}
                    </p>
                    <p className="font-sans text-xs text-luxury-gray">{action.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
