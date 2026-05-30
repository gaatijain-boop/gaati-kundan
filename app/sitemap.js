import { BRAND, CATEGORIES } from '@/lib/constants';
import { getAllProducts } from '@/services/products';

export default async function sitemap() {
  const baseUrl = BRAND.siteUrl;

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/wishlist`, lastModified: new Date(), changeFrequency: 'never', priority: 0.3 },
    { url: `${baseUrl}/cart`, lastModified: new Date(), changeFrequency: 'never', priority: 0.3 },
  ];

  // Category pages
  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Product pages
  let productPages = [];
  try {
    const products = await getAllProducts({ limit: 500 });
    productPages = products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(product.created_at),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (err) {
    console.error('Failed to generate product sitemap entries:', err);
  }

  return [...staticPages, ...categoryPages, ...productPages];
}
