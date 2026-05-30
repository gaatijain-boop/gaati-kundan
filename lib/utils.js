import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  if (!price && price !== 0) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getWhatsAppUrl(phoneNumber, message) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function getSupabaseImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET || 'jewellery-images';
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

export function generateProductWhatsAppMessage(product, brandSiteUrl, whatsappNumber) {
  const message = `Hello! I am interested in the following product from Gaati Kundan Jewellery:\n\n*${product.name}*\nPrice: ${formatPrice(product.price)}\n\nPlease share more details regarding availability and pricing.\n\nProduct Link: ${brandSiteUrl}/product/${product.slug}`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function generateCartWhatsAppMessage(items, whatsappNumber) {
  const itemList = items
    .map((item, i) => `${i + 1}. ${item.name} (Qty: ${item.quantity}) - ${formatPrice(item.price)}`)
    .join('\n');

  const message = `Hello! I am interested in the following products from Gaati Kundan Jewellery:\n\n${itemList}\n\nPlease share more details regarding availability and pricing.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function getImagePlaceholder(width = 400, height = 500) {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='100%25' height='100%25' fill='%23F8F7F4'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='14' fill='%23D4AF37' text-anchor='middle' dy='.3em'%3EGaati Kundan%3C/text%3E%3C/svg%3E`;
}

export function getMetaDescription(text, maxLength = 160) {
  if (!text) return '';
  const stripped = text.replace(/<[^>]*>/g, '');
  return truncateText(stripped, maxLength);
}
