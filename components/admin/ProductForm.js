'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSave, FiX } from 'react-icons/fi';
import ImageUpload from './ImageUpload';
import { getAllCategories } from '@/services/categories';
import { createProduct, updateProduct, addProductImage, deleteProductImage } from '@/services/products';
import { generateSlug } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function ProductForm({ initialData = null, mode = 'create' }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState(
    initialData?.product_images?.map((img) => img.image_url) || []
  );

  const [form, setForm] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    category_id: initialData?.category_id || '',
    featured: initialData?.featured || false,
    trending: initialData?.trending || false,
    new_arrival: initialData?.new_arrival || false,
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        toast.error('Failed to load categories');
      }
    }
    loadCategories();
  }, []);

  const handleNameChange = (name) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: mode === 'create' ? generateSlug(name) : prev.slug,
    }));
  };

  const handleToggle = (field) => {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category_id) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (images.length === 0) {
      toast.error('Please upload at least one product image');
      return;
    }

    setIsLoading(true);

    try {
      const productData = {
        name: form.name,
        slug: form.slug || generateSlug(form.name),
        description: form.description,
        price: parseFloat(form.price),
        category_id: form.category_id,
        featured: form.featured,
        trending: form.trending,
        new_arrival: form.new_arrival,
      };

      let productId;

      if (mode === 'create') {
        const product = await createProduct(productData);
        productId = product.id;

        // Add images
        await Promise.all(
          images.map((url, index) => addProductImage(productId, url, index))
        );

        toast.success('Product created successfully!');
      } else {
        await updateProduct(initialData.id, productData);
        productId = initialData.id;

        // Handle images: delete old ones, add new ones
        const existingImages = initialData.product_images || [];
        const existingUrls = existingImages.map((img) => img.image_url);
        const newUrls = images;

        // Delete removed images
        const toDelete = existingImages.filter((img) => !newUrls.includes(img.image_url));
        await Promise.all(toDelete.map((img) => deleteProductImage(img.id)));

        // Add new images
        const toAdd = newUrls.filter((url) => !existingUrls.includes(url));
        await Promise.all(
          toAdd.map((url, i) => addProductImage(productId, url, existingUrls.length + i))
        );

        toast.success('Product updated successfully!');
      }

      router.push('/admin/products');
    } catch (err) {
      console.error('Failed to save product:', err);
      toast.error(err.message || 'Failed to save product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="font-sans font-semibold text-luxury-black mb-5 pb-3 border-b border-gray-100">
              Product Information
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-sans font-semibold text-luxury-black tracking-wide uppercase mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Royal Pearl Kundan Necklace Set"
                  className="luxury-input"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold text-luxury-black tracking-wide uppercase mb-2">
                  URL Slug *
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="royal-pearl-kundan-necklace-set"
                  className="luxury-input font-mono text-sm"
                  required
                />
                <p className="text-xs text-luxury-gray font-sans mt-1">
                  URL: /product/{form.slug || 'your-slug'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold text-luxury-black tracking-wide uppercase mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe this jewellery piece — materials, occasions, features..."
                  rows={5}
                  className="luxury-input resize-none"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="font-sans font-semibold text-luxury-black mb-5 pb-3 border-b border-gray-100">
              Product Images *
            </h3>
            <ImageUpload
              images={images}
              onImagesChange={setImages}
              maxImages={6}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="font-sans font-semibold text-luxury-black mb-5 pb-3 border-b border-gray-100">
              Pricing
            </h3>
            <div>
              <label className="block text-xs font-sans font-semibold text-luxury-black tracking-wide uppercase mb-2">
                Price (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gray font-sans">₹</span>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="999"
                  min="0"
                  step="0.01"
                  className="luxury-input pl-8"
                  required
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="font-sans font-semibold text-luxury-black mb-5 pb-3 border-b border-gray-100">
              Category *
            </h3>
            <select
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className="luxury-input"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="font-sans font-semibold text-luxury-black mb-5 pb-3 border-b border-gray-100">
              Product Tags
            </h3>
            <div className="space-y-4">
              {[
                { field: 'featured', label: 'Featured', desc: "Show in Editor's Picks" },
                { field: 'trending', label: 'Trending', desc: 'Show in Trending Now' },
                { field: 'new_arrival', label: 'New Arrival', desc: 'Show in New Arrivals' },
              ].map(({ field, label, desc }) => (
                <label key={field} className="flex items-center justify-between gap-3 cursor-pointer group">
                  <div>
                    <p className="font-sans text-sm font-semibold text-luxury-black group-hover:text-gold transition-colors">
                      {label}
                    </p>
                    <p className="font-sans text-xs text-luxury-gray">{desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle(field)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
                      form[field] ? 'bg-gold' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                        form[field] ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-gold w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
                  {mode === 'create' ? 'Creating...' : 'Updating...'}
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4" />
                  {mode === 'create' ? 'Create Product' : 'Save Changes'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="btn-outline-gold w-full justify-center"
            >
              <FiX className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
