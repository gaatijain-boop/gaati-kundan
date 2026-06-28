export const BRAND = {
  name: 'Gaati Kundan Jewellery',
  tagline: 'Timeless Elegance, Crafted for Every Occasion',
  description:
    'Discover premium artificial jewellery collections that bring royal charm and modern sophistication together.',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999',
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/gaati_kundanjwellery?igsh=dzA4eGdybDB4NWtu',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://gaatikundan.com',
  email: 'gaatijain@gmail.com',
};

export const CATEGORIES = [
  {
    name: 'Necklace',
    slug: 'necklace',
    description: 'Elegant Kundan necklaces for every occasion',
    image: '/images/categories/necklace.jpg',
    icon: '📿',
  },
  {
    name: 'Earrings',
    slug: 'earrings',
    description: 'Stunning earrings that frame your beauty',
    image: '/images/categories/earrings.jpg',
    icon: '💎',
  },
  {
    name: 'Rings',
    slug: 'rings',
    description: 'Timeless rings for every finger',
    image: '/images/categories/rings.jpg',
    icon: '💍',
  },
  {
    name: 'Bangles',
    slug: 'bangles',
    description: 'Traditional bangles with modern elegance',
    image: '/images/categories/bangles.jpg',
    icon: '⭕',
  },
  {
    name: 'Bracelets',
    slug: 'bracelets',
    description: 'Delicate bracelets for a touch of luxury',
    image: '/images/categories/bracelets.jpg',
    icon: '✨',
  },
  {
    name: 'Pendants',
    slug: 'pendants',
    description: 'Exquisite pendants that tell a story',
    image: '/images/categories/pendants.jpg',
    icon: '🌟',
  },
];

export const WHATSAPP_MESSAGES = {
  productEnquiry: (product) =>
    `Hello! I am interested in the following product from Gaati Kundan Jewellery:\n\n*${product.name}*\nPrice: ₹${product.price}\n\nPlease share more details regarding availability and pricing.\n\nProduct Link: ${BRAND.siteUrl}/product/${product.slug}`,

  cartEnquiry: (items) => {
    const itemList = items
      .map((item, i) => `${i + 1}. ${item.name} (Qty: ${item.quantity}) - ₹${item.price}`)
      .join('\n');
    return `Hello! I am interested in the following products from Gaati Kundan Jewellery:\n\n${itemList}\n\nPlease share more details regarding availability and pricing.`;
  },

  generalEnquiry: () =>
    `Hello! I am interested in your jewellery collections at Gaati Kundan Jewellery. Can you please share more details?`,
};

export const RECENTLY_VIEWED_KEY = 'gk_recently_viewed';
export const CART_KEY = 'gk_cart';
export const WISHLIST_KEY = 'gk_wishlist';
export const MAX_RECENTLY_VIEWED = 8;

export const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest First', value: 'newest' },
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/category/necklace' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin', icon: 'dashboard' },
  { label: 'Products', href: '/admin/products', icon: 'products' },
  { label: 'Categories', href: '/admin/categories', icon: 'categories' },
];
