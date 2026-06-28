'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { BRAND } from '@/lib/constants';

const slides = [
  { image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80', heading: 'Timeless Elegance', sub: 'Crafted for Every Occasion', cta: 'Explore Collections', ctaLink: '/category/necklace' },
  { image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=80', heading: 'Royal Kundan', sub: 'Where Heritage Meets Modernity', cta: 'View Earrings', ctaLink: '/category/earrings' },
  { image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1920&q=80', heading: 'Luxurious Craft', sub: 'Premium Jewellery, Affordable Prices', cta: 'Shop Now', ctaLink: '/category/bracelets' },
];

export default function Hero() {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCur(p => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const s = slides[cur];

  return (
    <section className="relative h-[85vh] min-h-[520px] max-h-[800px] overflow-hidden pt-16 md:pt-20">
      {/* Slides */}
      {slides.map((sl, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === cur ? 1 : 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sl.image} alt={sl.heading} className="w-full h-full object-cover" />
          {/* Soft neutral overlay — light & airy */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 via-charcoal/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="section-container w-full">
          <motion.div key={cur} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center gap-3 text-gold text-xs md:text-sm font-sans tracking-ultra uppercase mb-5">
              <span className="w-8 h-px bg-gold" />
              Gaati Kundan Jewellery
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] mb-5">
              {s.heading}
            </motion.h1>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.7 }}
              className="w-20 h-px bg-gold mb-6 origin-left" />

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
              className="text-white/75 text-lg md:text-xl font-sans font-light leading-relaxed mb-10 max-w-lg">
              {s.sub}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4">
              <Link href={s.ctaLink} className="btn-gold group">
                {s.cta} <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent('Hello! I want to know more about your jewellery.')}`}
                target="_blank" rel="noopener noreferrer" className="btn-outline-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Enquire Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCur(i)}
            className={`transition-all duration-300 ${i === cur ? 'w-8 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/40 rounded-full hover:bg-white/70'}`} />
        ))}
      </div>
    </section>
  );
}
