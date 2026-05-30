import { Cormorant_Garamond, Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { BRAND } from '@/lib/constants';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: `${BRAND.name} | ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: [
    'Gaati Kundan Jewellery',
    'Kundan jewellery',
    'artificial jewellery',
    'luxury jewellery',
    'Indian jewellery',
    'Kundan necklace',
    'bridal jewellery',
    'festival jewellery',
    'fashion jewellery',
    'premium artificial jewellery',
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: BRAND.description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: BRAND.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: BRAND.description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D4AF37" />
      </head>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#111111',
              color: '#FFFFFF',
              fontSize: '14px',
              fontFamily: 'var(--font-inter)',
              borderRadius: '0',
              padding: '12px 20px',
            },
            success: {
              iconTheme: {
                primary: '#D4AF37',
                secondary: '#111111',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
