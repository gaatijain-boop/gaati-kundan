'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiMail } from 'react-icons/fi';
import { BRAND } from '@/lib/constants';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error('Please fill in all fields');
      return;
    }
    const msg = `Hello! My name is ${form.name}.\n\nPhone: ${form.phone}\n\nMessage: ${form.message}`;
    const url = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-luxury-cream border-b border-luxury-light-gray py-20 md:py-28">
        <div className="section-container text-center">
          <p className="text-gold text-xs tracking-ultra uppercase font-sans mb-3">Reach Out</p>
          <h1 className="font-serif text-5xl md:text-6xl text-luxury-black mb-4">Contact Us</h1>
          <div className="gold-divider mb-5" />
          <p className="section-subtitle max-w-lg mx-auto">
            We&apos;d love to hear from you. Whether you have a question about our collections or need help choosing the perfect piece — we&apos;re here.
          </p>
        </div>
      </div>

      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Contact Info */}
          <div>
            <p className="text-gold text-xs tracking-ultra uppercase font-sans mb-4">Get In Touch</p>
            <h2 className="font-serif text-4xl text-luxury-black mb-6 leading-tight">
              We&apos;re Here to Help You Shine
            </h2>
            <div className="w-12 h-0.5 bg-gold mb-8" />
            <p className="text-luxury-gray font-sans text-sm leading-relaxed mb-10">
              Have a question about a product? Want to enquire about availability? Looking for a custom recommendation for your wedding or festival? Our friendly team is ready to assist you.
            </p>

            <div className="space-y-6">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${BRAND.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-5 p-5 border border-luxury-light-gray hover:border-gold group transition-all duration-200"
              >
                <div className="w-12 h-12 bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366] transition-colors duration-200">
                  <svg className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-luxury-black text-sm mb-1 group-hover:text-gold transition-colors">
                    WhatsApp
                  </h4>
                  <p className="text-luxury-gray font-sans text-sm">+{BRAND.whatsappNumber}</p>
                  <p className="text-gold text-xs font-sans mt-1">Click to chat →</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-start gap-5 p-5 border border-luxury-light-gray hover:border-gold group transition-all duration-200"
              >
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors duration-200">
                  <FiMail className="w-5 h-5 text-gold group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-luxury-black text-sm mb-1 group-hover:text-gold transition-colors">
                    Email
                  </h4>
                  <p className="text-luxury-gray font-sans text-sm">{BRAND.email}</p>
                  <p className="text-gold text-xs font-sans mt-1">We reply within 24 hours →</p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-5 p-5 border border-luxury-light-gray hover:border-gold group transition-all duration-200"
              >
                <div className="w-12 h-12 bg-pink-50 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500 transition-colors duration-200">
                  <FiInstagram className="w-5 h-5 text-pink-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-luxury-black text-sm mb-1 group-hover:text-gold transition-colors">
                    Instagram
                  </h4>
                  <p className="text-luxury-gray font-sans text-sm">@gaatikundan</p>
                  <p className="text-gold text-xs font-sans mt-1">Follow for daily inspiration →</p>
                </div>
              </a>
            </div>

            <p className="text-xs text-luxury-gray font-sans mt-6">
              Available Mon–Sat, 10 AM – 7 PM IST
            </p>
          </div>

          {/* Contact Form → WhatsApp */}
          <div>
            <div className="bg-luxury-cream p-8 md:p-10">
              <h3 className="font-serif text-2xl text-luxury-black mb-2">
                Send Us a Message
              </h3>
              <p className="text-luxury-gray text-sm font-sans mb-8">
                Fill in your details below and we&apos;ll connect with you on WhatsApp.
              </p>

              <form onSubmit={handleWhatsApp} className="space-y-5">
                <div>
                  <label className="block text-xs font-sans font-semibold text-luxury-black tracking-wide uppercase mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="luxury-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-luxury-black tracking-wide uppercase mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="luxury-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-luxury-black tracking-wide uppercase mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about what you're looking for, your occasion, or any questions you have..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="luxury-input resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 py-4 bg-[#25D366] text-white font-sans font-semibold text-sm tracking-wide hover:bg-[#1ea952] transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Send via WhatsApp
                </button>

                <p className="text-xs text-luxury-gray font-sans text-center">
                  This will open WhatsApp with your message pre-filled
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
