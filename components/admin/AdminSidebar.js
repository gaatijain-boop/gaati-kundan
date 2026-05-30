'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FiHome,
  FiPackage,
  FiTag,
  FiLogOut,
  FiMenu,
  FiX,
  FiGrid,
  FiPlusCircle,
} from 'react-icons/fi';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

const navItems = [
  { href: '/admin', icon: FiHome, label: 'Dashboard' },
  { href: '/admin/products', icon: FiPackage, label: 'Products' },
  { href: '/admin/products/new', icon: FiPlusCircle, label: 'Add Product' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-luxury-black">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10">
        <h2 className="font-serif text-lg text-white">Gaati Kundan</h2>
        <p className="text-gold text-xs tracking-ultra uppercase font-sans mt-0.5">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 text-sm font-sans transition-all duration-200',
                isActive
                  ? 'bg-gold text-luxury-black font-semibold'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-sans text-gray-400 hover:text-red-400 hover:bg-white/5 transition-all duration-200"
        >
          <FiLogOut className="w-4 h-4" />
          Sign Out
        </button>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 text-sm font-sans text-gray-500 hover:text-gold transition-colors mt-1"
        >
          <FiGrid className="w-4 h-4" />
          View Website ↗
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-60 flex-shrink-0 flex-col">
        <div className="h-full fixed w-60 top-0 left-0 z-20">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 w-10 h-10 bg-luxury-black text-white flex items-center justify-center shadow-lg"
        aria-label="Open sidebar"
      >
        <FiMenu className="w-5 h-5" />
      </button>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-60">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gold"
              aria-label="Close sidebar"
            >
              <FiX className="w-5 h-5" />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
