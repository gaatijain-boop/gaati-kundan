'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    function isAdminSession(session) {
      return !!session && session.user?.app_metadata?.role === 'admin';
    }

    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (isAdminSession(session)) {
        setIsAuthenticated(true);
      } else if (!isLoginPage) {
        if (session) {
          await supabase.auth.signOut();
        }
        router.push('/admin/login');
      }
      setIsLoading(false);
    }

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isAdminSession(session)) {
        setIsAuthenticated(true);
      } else if (!isLoginPage) {
        setIsAuthenticated(false);
        router.push('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [router, isLoginPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-white text-sm font-sans">Loading...</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return children;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
