"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { PackageX, Search, ChevronRight, ShieldCheck, MailCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReturnsPage() {
  const [orderQuery, setOrderQuery] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSearched(true);
    }, 1500);
  };

  const handleReturn = () => {
    toast.success('Return Request Authorized! Check your email for shipping labels.');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans pb-32">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-40">
        <div className="max-w-[800px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link> 
            <ChevronRight size={12} /> <span className="text-gray-900">Returns Center</span>
          </div>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-6 mt-16">
        
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="w-24 h-24 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600 shadow-sm">
              <PackageX size={48} />
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Initiate a Return</h1>
           <p className="text-lg text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">Not quite what you expected? No problem. Simply enter your Order ID below to instantly generate a return shipping label.</p>
        </div>

        <form onSubmit={handleSearch} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col items-center mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 to-rose-600"></div>
          
          <div className="w-full relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            <input 
              type="text" 
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="e.g. ORD-12345678" 
              className="w-full bg-gray-50 border-2 border-transparent rounded-[1.5rem] py-6 pl-16 pr-6 text-xl font-black outline-none focus:bg-white focus:border-red-600 focus:shadow-[0_0_0_4px_rgba(220,38,38,0.1)] transition-all text-gray-900 placeholder:font-medium placeholder:text-gray-400 uppercase"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isProcessing}
            className="mt-6 bg-gray-900 text-white font-bold w-full py-5 rounded-[1.5rem] hover:bg-black transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isProcessing ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Locate Order Data'}
          </button>
        </form>

        {isSearched && (
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 mb-12">
            <div className="flex items-start gap-5 mb-8">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex-shrink-0 flex items-center justify-center border border-gray-200">
                 <MailCheck className="text-gray-400" size={32} />
              </div>
              <div>
                 <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md inline-block mb-3">Eligible for return</span>
                 <h3 className="font-black text-gray-900 text-xl leading-tight mb-2">Invoice for {orderQuery}</h3>
                 <p className="text-sm font-medium text-gray-500">Auto-approved. Purchased within the 75 day guarantee window.</p>
              </div>
            </div>
            <button onClick={handleReturn} className="bg-red-600 text-white font-bold w-full py-5 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 text-lg hover:-translate-y-1">
              Confirm & Generate Label
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start gap-6 p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100">
           <div className="bg-white p-4 rounded-2xl shadow-sm"><ShieldCheck size={32} className="text-blue-500" /></div>
           <div>
             <h4 className="font-black text-gray-900 mb-2 text-lg">The 75-Day Master Guarantee</h4>
             <p className="text-sm font-medium text-gray-600 leading-relaxed">
               You are absolutely protected by our industry-leading return window. As long as the item is in its original condition and shipped back with the provided label, you will receive a full refund within 3-5 business days. No questions asked.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
}
