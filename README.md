# Gaati Kundan Jewellery — Website

A premium luxury artificial jewellery catalog website built with Next.js 15, Tailwind CSS, and Supabase.

---

## Tech Stack

- **Next.js 15** (App Router, JavaScript)
- **Tailwind CSS** — Luxury design system
- **Supabase** — Database, Storage, Auth
- **Framer Motion** — Smooth animations
- **Vercel** — Deployment

---

## Project Structure

```
gaati-kundan/
├── app/
│   ├── (user)/               # Customer-facing pages
│   │   ├── page.js           # Homepage
│   │   ├── category/[slug]/  # Category listing
│   │   ├── product/[slug]/   # Product detail
│   │   ├── cart/             # Shopping cart
│   │   ├── wishlist/         # Saved items
│   │   ├── about/            # About Us
│   │   └── contact/          # Contact Us
│   ├── admin/                # Admin panel
│   │   ├── login/            # OTP Login
│   │   ├── page.js           # Dashboard
│   │   └── products/         # Product management
│   ├── layout.js             # Root layout
│   ├── globals.css           # Global styles
│   ├── sitemap.js            # Dynamic sitemap
│   └── robots.js             # Robots.txt
├── components/
│   ├── layout/               # Navbar, Footer, WhatsApp button
│   ├── sections/             # Homepage sections
│   ├── ui/                   # Reusable UI components
│   └── admin/                # Admin-specific components
├── lib/
│   ├── supabase.js           # Supabase client
│   ├── constants.js          # Brand config, categories
│   └── utils.js              # Helper functions
├── hooks/
│   ├── useCart.js            # Cart (LocalStorage)
│   ├── useWishlist.js        # Wishlist (LocalStorage)
│   └── useRecentlyViewed.js  # Recently viewed (LocalStorage)
├── services/
│   ├── products.js           # Product CRUD
│   └── categories.js         # Category CRUD
└── supabase/
    └── schema.sql            # Database schema + setup instructions
```

---

## Setup Instructions

### Step 1: Install Dependencies

```bash
cd gaati-kundan
npm install
```

### Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your **Project URL** and **Anon Key** (Settings → API)
3. Also note your **Service Role Key** (keep this secret!)

### Step 3: Run Database Schema

1. Open your Supabase project
2. Go to **SQL Editor** → **New Query**
3. Paste the contents of `supabase/schema.sql`
4. Click **Run**

This will create:
- `categories` table (pre-seeded with 6 categories)
- `products` table
- `product_images` table
- `product_videos` table
- Row Level Security policies

### Step 4: Create Storage Bucket

1. Go to **Storage** → **Create New Bucket**
2. Bucket name: `jewellery-images`
3. Toggle **Public** to ON
4. Click Create

Then add Storage Policies:
- Go to **Storage Policies** → Add new policy
- **For SELECT**: Allow all (public read)
- **For INSERT/UPDATE/DELETE**: Allow authenticated users only

### Step 5: Set Up Admin User

1. Go to **Authentication** → **Users** → **Invite User**
2. Enter admin email (e.g., `admin@gaatikundan.com`)
3. Enable Email OTP: **Authentication** → **Providers** → **Email** → Enable OTP

### Step 6: Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
NEXT_PUBLIC_BRAND_NAME=Gaati Kundan Jewellery
NEXT_PUBLIC_BRAND_TAGLINE=Timeless Elegance, Crafted for Every Occasion
NEXT_PUBLIC_SITE_URL=https://gaatikundan.com
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/gaatikundan
NEXT_PUBLIC_STORAGE_BUCKET=jewellery-images
```

> **Important**: Replace `919999999999` with your actual WhatsApp business number (include country code, no +)

### Step 7: Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Deployment on Vercel

### Method 1: Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

### Method 2: GitHub + Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your repository
4. Add all environment variables from `.env.local`
5. Click Deploy

### Environment Variables on Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_SITE_URL` (update to your actual domain)
- `NEXT_PUBLIC_INSTAGRAM_URL`
- `NEXT_PUBLIC_STORAGE_BUCKET`

---

## Customization Guide

### Update WhatsApp Number
In `.env.local`, change:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
```

### Update Instagram Link
In `.env.local`, change:
```
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/your_handle
```

### Add Logo
1. Place your logo file in `/public/logo.png`
2. Update `components/layout/Navbar.js` to use `<Image>` with the logo instead of the text logo

### Update Brand Colors
In `tailwind.config.js`, modify the `gold` color values.

### Add Products (Admin)
1. Go to `/admin/login`
2. Enter admin email → receive OTP → login
3. Go to Products → Add Product
4. Fill in details, upload images, set tags

---

## Features

### Customer Features
- Browse products by category
- Search and sort products
- Product detail with image zoom
- Add to cart (LocalStorage)
- Add to wishlist (LocalStorage)
- WhatsApp enquiry (product, cart, general)
- Share products (WhatsApp, copy link)
- Recently viewed products
- Mobile-first responsive design
- Smooth Framer Motion animations

### Admin Features
- OTP-based secure login (no password)
- Dashboard with product stats
- Add/Edit/Delete products
- Multiple image upload with auto-compression
- Tag products as Featured, Trending, New Arrival
- Product search and management

### SEO
- Dynamic meta tags
- Open Graph tags
- Dynamic sitemap
- Robots.txt
- SEO-friendly URLs

---

## Phase 2 Roadmap (Future)

- Customer accounts & authentication
- Online payment gateway (Razorpay)
- Order management system
- Product reviews & ratings
- Analytics dashboard
- Push notifications
- Coupon/discount system
- Email notifications

---

## Support

For issues or customizations, contact the development team.

Built with love for Gaati Kundan Jewellery.
