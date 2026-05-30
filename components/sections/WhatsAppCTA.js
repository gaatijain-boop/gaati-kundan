'use client';

import { motion } from 'framer-motion';
import { BRAND } from '@/lib/constants';

export default function WhatsAppCTA() {
  const msg = encodeURIComponent('Hello! I am interested in Gaati Kundan Jewellery. Can you help me choose the perfect piece?');
  return (
    <section className="py-20 md:py-24 bg-charcoal relative overflow-hidden">
      {/* Subtle gold diagonal lines */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: `repeating-linear-gradient(45deg,#C6973F,#C6973F 1px,transparent 1px,transparent 38px)` }} />

      <div className="relative z-10 section-container text-center">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-2xl mx-auto">

          <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}
            className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </motion.div>

          <p className="text-gold text-xs tracking-ultra uppercase font-sans mb-4 font-semibold">Need Help Choosing?</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight">Chat With Us on WhatsApp</h2>
          <div className="w-12 h-px bg-gold mx-auto mb-6" />
          <p className="text-white/55 font-sans text-base leading-relaxed mb-10">
            Have questions? Want personalised recommendations for your special occasion? Our team is here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${BRAND.whatsappNumber}?text=${msg}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white font-sans font-semibold text-sm tracking-wide rounded-full hover:bg-[#1ea952] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Start Chatting Now
            </a>
            <a href={`tel:+${BRAND.whatsappNumber}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white font-sans font-semibold text-sm tracking-wide rounded-full hover:border-gold hover:text-gold transition-all duration-300">
              Call Us Directly
            </a>
          </div>
          <p className="text-white/25 text-xs font-sans mt-8">Available Mon–Sat, 10 AM – 7 PM IST</p>
        </motion.div>
      </div>
    </section>
  );
}
