'use client';

import { motion } from 'framer-motion';
import { FiInstagram } from 'react-icons/fi';
import { BRAND } from '@/lib/constants';

const instagramPosts = [
  'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80',
  'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80',
  'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80',
  'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80',
];

export default function InstagramFollow() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiInstagram className="w-6 h-6 text-gold" />
            <p className="text-gold text-xs tracking-ultra uppercase font-sans">Instagram</p>
          </div>
          <h2 className="section-title mb-3">Follow Our Journey</h2>
          <div className="gold-divider mb-5" />
          <p className="section-subtitle max-w-lg mx-auto mb-6">
            Stay inspired with our latest collections, styling tips, and behind-the-scenes.
          </p>
          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-luxury-black font-sans font-semibold text-sm hover:text-gold transition-colors duration-200"
          >
            <FiInstagram className="w-4 h-4" />
            @gaati_kundanjwellery
          </a>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {instagramPosts.map((src, index) => (
            <motion.a
              key={index}
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative aspect-square overflow-hidden block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/50 transition-all duration-300 flex items-center justify-center">
                <FiInstagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <FiInstagram className="w-4 h-4" />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
