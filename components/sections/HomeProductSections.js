import ProductSection from './ProductSection';
import {
  getTrendingProducts,
  getNewArrivals,
  getFeaturedProducts,
} from '@/services/products';

export default async function HomeProductSections() {
  let trending = [];
  let newArrivals = [];
  let featured = [];

  try {
    [trending, newArrivals, featured] = await Promise.all([
      getTrendingProducts(8),
      getNewArrivals(8),
      getFeaturedProducts(8),
    ]);
  } catch (error) {
    console.error('Failed to load products:', error);
  }

  return (
    <>
      <ProductSection
        title="Trending Now"
        badge="Hot Picks"
        subtitle="Our most loved pieces — worn and adored by thousands of women across India."
        products={trending}
        viewAllLink="/category/necklace"
        viewAllLabel="View All Trending"
        bgColor="bg-white"
      />

      <ProductSection
        title="New Arrivals"
        badge="Fresh In"
        subtitle="Just landed — be the first to discover our newest Kundan creations."
        products={newArrivals}
        viewAllLink="/category/earrings"
        viewAllLabel="View All New Arrivals"
        bgColor="bg-luxury-off-white"
      />

      <ProductSection
        title="Editor's Picks"
        badge="Featured"
        subtitle="Handpicked by our team — the finest pieces from our exclusive collection."
        products={featured}
        viewAllLink="/category/necklace"
        viewAllLabel="View All Featured"
        bgColor="bg-white"
      />
    </>
  );
}
