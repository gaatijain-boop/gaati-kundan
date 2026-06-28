import { Suspense } from 'react';
import Hero from '@/components/sections/Hero';
import FeaturedCollections from '@/components/sections/FeaturedCollections';
import BrandStory from '@/components/sections/BrandStory';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import WhatsAppCTA from '@/components/sections/WhatsAppCTA';
import InstagramFollow from '@/components/sections/InstagramFollow';
import HomeProductSections from '@/components/sections/HomeProductSections';
import { BRAND } from '@/lib/constants';

export const metadata = {
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description: BRAND.description,
};

export const revalidate = 3600; // Revalidate every hour

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Collections */}
      <FeaturedCollections />

      {/* Product Sections (Trending, New Arrivals, Featured) */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-luxury-soft-bg" />}>
        <HomeProductSections />
      </Suspense>

      {/* Brand Story */}
      <BrandStory />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* WhatsApp CTA */}
      <WhatsAppCTA />

      {/* Instagram Follow */}
      <InstagramFollow />
    </div>
  );
}
