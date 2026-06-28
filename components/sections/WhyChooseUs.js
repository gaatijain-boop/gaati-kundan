'use client';

import { motion } from 'framer-motion';

const features = [
  { icon: '💎', title: 'Premium Quality', desc: 'High-quality materials that look and feel like real gold Kundan jewellery.' },
  { icon: '💰', title: 'Best Prices', desc: 'Royal Kundan look at prices every woman can afford. No compromise on quality.' },
  { icon: '🚚', title: 'Fast Delivery', desc: 'Quick delivery across India. Your jewellery at your doorstep.' },
  { icon: '💬', title: 'WhatsApp Support', desc: 'Chat with us directly on WhatsApp. We reply within minutes.' },
  { icon: '✨', title: '500+ Designs', desc: 'New designs added every week. Always something fresh and beautiful.' },
  { icon: '🔄', title: 'Easy Returns', desc: 'Not happy? We make returns simple and hassle-free.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gold text-xs tracking-ultra uppercase font-sans font-semibold mb-2">Why Us</p>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-black mb-3">Why Choose Gaati Kundan</h2>
          <div className="gold-divider mb-4" />
          <p className="section-subtitle max-w-xl mx-auto">
            Trusted by 10,000+ women across India for premium Kundan jewellery at honest prices.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group text-center"
            >
              <div className="text-3xl md:text-4xl mb-3">{f.icon}</div>
              <h3 className="font-serif text-base md:text-lg text-luxury-black mb-2 group-hover:text-gold transition-colors">{f.title}</h3>
              <p className="font-sans text-xs md:text-sm text-luxury-gray leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-10 border-t border-luxury-light-gray flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center"
        >
          {[
            { n: '10,000+', l: 'Happy Customers' },
            { n: '500+', l: 'Unique Designs' },
            { n: '6', l: 'Collections' },
            { n: '4.9★', l: 'Customer Rating' },
          ].map(s => (
            <div key={s.l}>
              <p className="font-serif text-2xl md:text-3xl text-luxury-black font-bold">{s.n}</p>
              <p className="text-luxury-gray text-xs font-sans mt-0.5 tracking-wide">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
