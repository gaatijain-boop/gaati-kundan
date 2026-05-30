'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import ProductForm from '@/components/admin/ProductForm';
import { getProductById } from '@/services/products';
import { ProductDetailSkeleton } from '@/components/ui/LoadingSkeleton';
import toast from 'react-hot-toast';

export default function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        toast.error('Failed to load product');
      } finally {
        setIsLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  return (
    <div className="p-6 md:p-8 md:ml-60">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/products"
          className="flex items-center gap-1 text-sm text-luxury-gray hover:text-gold transition-colors font-sans"
        >
          <FiChevronLeft className="w-4 h-4" />
          Back
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-luxury-black">Edit Product</h1>
          {product && (
            <p className="text-luxury-gray font-sans text-sm mt-1 line-clamp-1">{product.name}</p>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="md:ml-0">
          <ProductDetailSkeleton />
        </div>
      ) : !product ? (
        <div className="text-center py-16">
          <p className="font-serif text-2xl text-luxury-black mb-3">Product Not Found</p>
          <Link href="/admin/products" className="btn-gold">
            Back to Products
          </Link>
        </div>
      ) : (
        <ProductForm initialData={product} mode="edit" />
      )}
    </div>
  );
}
