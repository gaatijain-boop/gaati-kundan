import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import ProductForm from '@/components/admin/ProductForm';

export const metadata = {
  title: 'Add Product | Admin',
};

export default function NewProductPage() {
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
          <h1 className="font-serif text-3xl text-luxury-black">Add Product</h1>
          <p className="text-luxury-gray font-sans text-sm mt-1">Create a new jewellery product</p>
        </div>
      </div>

      <ProductForm mode="create" />
    </div>
  );
}
