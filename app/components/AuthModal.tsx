"use client";

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Loader2, Eye, EyeOff, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, register, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    if (!isOpen) {
      setEmail(''); setName(''); setPassword('');
      setMode('login'); clearError();
    }
  }, [isOpen]);

  // Clear error when clearError ref changes
  // eslint-disable-next-line react-hooks/exhaustive-deps

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;
    if (mode === 'login') {
      success = await login(email, password);
      if (success) toast.success(`Welcome back!`);
    } else {
      success = await register(email, name, password);
      if (success) toast.success(`Account created! Welcome to HomBox.`);
    }
    if (success) onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-2xl shadow-2xl z-10 w-full max-w-md p-8 relative animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
          <X size={24} />
        </button>

        {/* Mode Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => { setMode('login'); clearError(); }}
            className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${mode === 'login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('register'); clearError(); }}
            className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${mode === 'register' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
          >
            Create Account
          </button>
        </div>

        <div className="flex justify-center items-center gap-1.5 text-sm text-gray-600 mb-6 font-medium">
          <ShieldCheck size={16} className="text-emerald-500" />
          Your information is encrypted and protected
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === 'register' && (
            <input
              required
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3.5 outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-400"
            />
          )}
          
          <input
            required
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3.5 outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-400"
          />

          <div className="relative">
            <input
              required
              type={showPassword ? 'text' : 'password'}
              placeholder="Password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-3.5 pr-12 outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-zinc-900 text-white font-bold py-3.5 rounded-xl hover:bg-black transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading ? (
              <><Loader2 size={20} className="animate-spin" /> Please wait...</>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create My Account'
            )}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <hr className="flex-1 border-gray-200"/>
          <span className="text-sm text-gray-400 font-medium">Or continue with</span>
          <hr className="flex-1 border-gray-200"/>
        </div>

        <div className="flex justify-center items-center gap-4 mb-6">
          <button className="flex-1 h-11 rounded-lg border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 shadow-sm">
            <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>
          <button className="flex-1 h-11 rounded-lg border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 shadow-sm">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Apple
          </button>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span>Free shipping</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span>Buyer protection</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span>Easy returns</span>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-400 leading-relaxed px-4">
          By continuing, you accept our{' '}
          <Link href="/terms" onClick={onClose} className="underline hover:text-gray-600">Terms of Service</Link>{' '}
          and{' '}
          <Link href="/privacy" onClick={onClose} className="underline hover:text-gray-600">Privacy Policy</Link>.
        </div>
      </div>
    </div>
  );
}