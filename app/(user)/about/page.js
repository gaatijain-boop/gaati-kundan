import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { BRAND } from '@/lib/constants';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Gaati Kundan Jewellery — our story, our mission, and our commitment to premium artificial jewellery crafted with love.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-luxury-black py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920&q=80"
            alt="About Gaati Kundan"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-luxury-black/60" />
        <div className="relative z-10 section-container text-center">
          <p className="text-gold text-xs tracking-ultra uppercase font-sans mb-4">Our Story</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-5">About Us</h1>
          <div className="gold-divider" />
        </div>
      </div>

      {/* Main Story */}
      <div className="section-container py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold text-xs tracking-ultra uppercase font-sans mb-4">Who We Are</p>
            <h2 className="font-serif text-4xl md:text-5xl text-luxury-black leading-tight mb-6">
              Bringing Royal Kundan Elegance to Every Home
            </h2>
            <div className="w-12 h-0.5 bg-gold mb-8" />
            <div className="space-y-5 text-luxury-gray font-sans text-sm leading-relaxed">
              <p>
                Gaati Kundan Jewellery was born from a deep love for traditional Indian jewellery and a desire to make luxury accessible to every woman. We believe that feeling beautiful and adorned should not require a fortune.
              </p>
              <p>
                Our name, "Gaati" (गाती), means "to sing" in Sanskrit — because we believe every piece of jewellery should make a woman feel like she is singing with joy, radiating confidence and beauty wherever she goes.
              </p>
              <p>
                Inspired by the ancient Kundan jewellery tradition of Rajasthan — the royal art of setting uncut gemstones in gold — we recreate these timeless designs using premium artificial materials that capture the same essence of grandeur and elegance.
              </p>
              <p>
                Today, Gaati Kundan serves thousands of women across India — from brides preparing for their big day to fashionistas looking for that perfect statement piece for a festive celebration.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80"
                alt="Kundan Jewellery Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-full h-full border border-gold/30 -z-10" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-luxury-black py-16">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Unique Designs' },
              { number: '10K+', label: 'Happy Customers' },
              { number: '6', label: 'Collections' },
              { number: '3+', label: 'Years of Trust' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-4xl md:text-5xl text-gold mb-2">{stat.number}</p>
                <p className="text-gray-400 text-sm font-sans tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="section-container py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-ultra uppercase font-sans mb-3">Our Values</p>
          <h2 className="section-title mb-4">Mission & Values</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '◈',
              title: 'Our Mission',
              desc: 'To make every Indian woman feel like royalty by offering premium Kundan-inspired jewellery that combines timeless elegance with modern sensibility — at prices that celebrate her worth without exceeding her budget.',
            },
            {
              icon: '✦',
              title: 'Our Vision',
              desc: 'To become India\'s most trusted and loved artificial jewellery brand — synonymous with quality, authenticity, and the celebration of Indian femininity and heritage.',
            },
            {
              icon: '✧',
              title: 'Our Promise',
              desc: 'Every piece we create is crafted with care, tested for quality, and designed to make you feel beautiful. Your satisfaction is our highest priority.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-luxury-cream p-8 border border-luxury-light-gray">
              <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mb-6">
                <span className="text-gold text-xl">{item.icon}</span>
              </div>
              <h3 className="font-serif text-xl text-luxury-black mb-4">{item.title}</h3>
              <p className="text-luxury-gray font-sans text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-luxury-cream border-t border-luxury-light-gray py-16">
        <div className="section-container text-center">
          <h3 className="font-serif text-3xl text-luxury-black mb-4">
            Experience the Gaati Kundan Difference
          </h3>
          <p className="text-luxury-gray font-sans text-sm mb-8 max-w-md mx-auto">
            Browse our collections and find the perfect piece that speaks to your soul.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/category/necklace" className="btn-gold">
              Shop Collections
              <FiArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent('Hello! I want to learn more about Gaati Kundan Jewellery.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold"
            >
              Talk to Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
