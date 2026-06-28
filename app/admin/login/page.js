'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { toast.error('Invalid email or password'); return; }
      if (data.user?.app_metadata?.role !== 'admin') {
        await supabase.auth.signOut();
        toast.error('This account does not have admin access');
        return;
      }
      toast.success('Welcome back!');
      router.push('/admin');
    } catch { toast.error('Something went wrong'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: `repeating-linear-gradient(45deg,#C6973F,#C6973F 1px,transparent 1px,transparent 40px)` }} />

      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md">

        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-white font-bold mb-1">Gaati Kundan</h1>
          <p className="text-gold text-xs tracking-ultra uppercase font-sans">Admin Portal</p>
        </div>

        <div className="bg-white p-8 md:p-10">
          <div className="h-0.5 bg-gold-gradient -mt-8 mb-8 -mx-8 md:-mx-10" />
          <h2 className="font-serif text-2xl text-luxury-black mb-2">Admin Login</h2>
          <p className="text-luxury-gray font-sans text-sm mb-8">Enter your admin credentials to continue.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-sans font-semibold text-luxury-black tracking-wide uppercase mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="admin@gaatikundan.com" className="luxury-input" required autoFocus />
            </div>
            <div>
              <label className="block text-xs font-sans font-semibold text-luxury-black tracking-wide uppercase mb-2">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password" className="luxury-input pr-12" required />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-gray hover:text-charcoal transition-colors">
                  {showPw ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="btn-dark w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-2">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Logging in...</>
              ) : 'Login to Admin'}
            </button>
          </form>
        </div>
        <p className="text-center text-white/25 text-xs font-sans mt-6">Secure admin access only.</p>
      </motion.div>
    </div>
  );
}
