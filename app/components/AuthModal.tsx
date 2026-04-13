"use client";

import React, { useState } from 'react';
import { X, ShieldCheck, ChevronDown } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [emailInput, setEmailInput] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-2xl shadow-2xl z-10 w-full max-w-md p-8 relative animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Register/Sign in</h2>
        
        <div className="flex justify-center items-center gap-1.5 text-sm text-gray-600 mb-8 font-medium">
          <ShieldCheck size={16} className="text-[#00b259]" />
          Your information is protected
        </div>

        <div className="mb-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3.5 outline-none focus:border-red-600 transition-colors text-gray-900 placeholder-gray-400" 
          />
        </div>

        <button className={`w-full font-bold py-3.5 rounded-lg mb-6 transition-colors ${emailInput.length > 0 ? 'bg-[#ff0000] text-white hover:bg-red-700' : 'bg-gray-200 text-white cursor-not-allowed'}`}>
          Continue
        </button>

        <div className="text-center text-sm text-gray-500 hover:text-gray-800 underline cursor-pointer mb-8">
          Trouble signing in?
        </div>

        <div className="flex items-center gap-4 mb-8">
          <hr className="flex-1 border-gray-200"/>
          <span className="text-sm text-gray-400 font-medium">Or continue with</span>
          <hr className="flex-1 border-gray-200"/>
        </div>

        <div className="flex justify-center items-center gap-6 mb-8">
          <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </button>
        </div>

        <div className="text-center text-sm mb-6 text-gray-700">
          Location: <span className="font-bold cursor-pointer hover:text-red-600 transition-colors">Nigeria <ChevronDown size={14} className="inline ml-1" /></span>
        </div>

        <div className="text-center text-xs text-gray-400 leading-relaxed px-4">
          By continuing, you confirm that you are an adult and have read and accepted our <span className="underline hover:text-gray-600 cursor-pointer">HomBox Free Membership Agreement</span> and <span className="underline hover:text-gray-600 cursor-pointer">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
}