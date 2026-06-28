import Link from 'next/link';
import { FiInstagram, FiMail } from 'react-icons/fi';
import { CATEGORIES, BRAND } from '@/lib/constants';

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="h-px bg-gold-gradient" />

      <div className="section-container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">

          {/* Brand */}
          <div>
            <p className="font-serif text-2xl md:text-3xl text-white font-bold mb-1">Gaati Kundan</p>
            <p className="text-[10px] text-gold tracking-ultra uppercase font-sans mb-5">Jewellery</p>
            <p className="text-white/45 text-sm leading-relaxed font-sans mb-6">
              Premium artificial jewellery that brings royal charm and modern sophistication together.
            </p>
            <div className="flex gap-3">
              {[
                { href: BRAND.instagramUrl, icon: <FiInstagram className="w-4 h-4" />, label: 'Instagram' },
                { href: `https://wa.me/${BRAND.whatsappNumber}`, icon: <WhatsAppIcon />, label: 'WhatsApp' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/45 hover:text-gold hover:border-gold transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <p className="text-xs font-sans font-semibold tracking-ultra uppercase text-gold mb-6">Collections</p>
            <ul className="space-y-3">
              {CATEGORIES.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`}
                    className="flex items-center gap-2 text-white/45 text-sm font-sans hover:text-gold transition-colors duration-200">
                    <span className="text-gold/30 text-[10px]">◆</span>{cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-sans font-semibold tracking-ultra uppercase text-gold mb-6">Quick Links</p>
            <ul className="space-y-3">
              {[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Contact', href: '/contact' }, { label: 'Wishlist', href: '/wishlist' }, { label: 'Cart', href: '/cart' }].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/45 text-sm font-sans hover:text-gold transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-sans font-semibold tracking-ultra uppercase text-gold mb-6">Get In Touch</p>
            <ul className="space-y-4 mb-6">
              <li>
                <a href={`https://wa.me/${BRAND.whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/45 text-sm font-sans hover:text-gold transition-colors">
                  <WhatsAppIcon /> +{BRAND.whatsappNumber}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-3 text-white/45 text-sm font-sans hover:text-gold transition-colors">
                  <FiMail className="w-4 h-4" /> {BRAND.email}
                </a>
              </li>
            </ul>
            <a href={`https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent('Hello! I am interested in Gaati Kundan Jewellery.')}`}
              target="_blank" rel="noopener noreferrer" className="whatsapp-btn text-xs px-4 py-2 w-full justify-center">
              <WhatsAppIcon /> Chat Now
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="section-container py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs font-sans">© {new Date().getFullYear()} Gaati Kundan Jewellery. All rights reserved.</p>
          <p className="text-white/15 text-xs font-sans">Crafted with <span className="text-gold">♥</span> for the modern Indian woman</p>
        </div>
      </div>
    </footer>
  );
}
