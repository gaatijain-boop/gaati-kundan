'use client';

import { motion } from 'framer-motion';

const features = [
  { icon: '◆', title: 'Premium Quality',      desc: 'Crafted using high-quality materials that replicate the look and feel of traditional gold Kundan jewellery.' },
  { icon: '◈', title: 'Affordable Luxury',    desc: 'Get the royal Kundan look without breaking the bank. Exceptional value at accessible prices.' },
  { icon: '✦', title: 'Exclusive Designs',    desc: 'Unique pieces that blend traditional Kundan artistry with modern aesthetic sensibilities.' },
  { icon: '◇', title: 'Every Occasion',       desc: 'Bridal sets to festive wear — we have pieces for weddings, parties, and everyday elegance.' },
  { icon: '◉', title: 'WhatsApp Ordering',    desc: 'Browse and enquire directly on WhatsApp. Our team responds quickly to help you choose.' },
  { icon: '✧', title: 'Trusted by Thousands', desc: 'Over 10,000 happy customers across India — synonymous with trust and quality.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-luxury-soft-bg">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-gold text-xs tracking-ultra uppercase font-sans mb-3 font-semibold">Why Us</p>
          <h2 className="section-title mb-4">Why Choose Gaati Kundan</h2>
          <div className="gold-divider mb-6" />
          <p className="section-subtitle max-w-xl mx-auto">We don&apos;t just sell jewellery — we create experiences that make you feel beautiful, confident, and royal.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white p-8 border border-luxury-light-gray hover:border-gold/40 hover:shadow-card-hover transition-all duration-400">
              <div className="w-12 h-12 border border-luxury-light-gray flex items-center justify-center mb-6 group-hover:bg-charcoal group-hover:border-charcoal transition-all duration-300">
                <span className="text-gold text-lg group-hover:text-white transition-colors duration-300">{f.icon}</span>
              </div>
              <h3 className="font-serif text-xl text-luxury-black mb-3 group-hover:text-charcoal transition-colors">{f.title}</h3>
              <p className="font-sans text-sm text-luxury-gray leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
