import React from 'react';
import { Store, TrendingUp, Globe, CreditCard, CheckCircle2 } from 'lucide-react';

export default function SellerCenter() {
  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* Hero */}
      <div className="bg-gradient-to-br from-red-600 to-red-800 text-white pt-24 pb-32 px-4 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Sell globally, scale rapidly.</h1>
            <p className="text-xl text-red-100 mb-8">Join thousands of merchants on HomBox reaching millions of active buyers worldwide every day.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-red-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors text-lg">
                Start Selling Now
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-lg">
                Calculate Fees
              </button>
            </div>
          </div>
          <div className="hidden lg:block w-[400px] h-[300px] bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20 p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
             <div className="h-4 w-1/3 bg-white/20 rounded mb-6"></div>
             <div className="h-8 w-2/3 bg-white/30 rounded mb-8"></div>
             <div className="flex items-end gap-3 h-32 border-b border-white/20 pb-4">
               <div className="w-1/4 bg-white/40 h-1/3 rounded-t"></div>
               <div className="w-1/4 bg-white/50 h-2/3 rounded-t"></div>
               <div className="w-1/4 bg-white/80 h-full rounded-t relative"><div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-400 rounded-full animate-ping"></div></div>
               <div className="w-1/4 bg-white/40 h-1/2 rounded-t"></div>
             </div>
             <div className="flex justify-between mt-4 text-xs text-red-100 font-bold">
               <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4 (You)</span>
             </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-[1200px] mx-auto px-4 -mt-16 relative z-20 mb-20">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12">
          <h2 className="text-center font-black text-2xl md:text-3xl text-gray-900 mb-12">Why sell on HomBox?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-6"><Globe size={32} /></div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">Global Audience</h3>
              <p className="text-gray-500">Reach buyers in 200+ countries with automatic translation and currency conversion.</p>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-6"><TrendingUp size={32} /></div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">Zero Marketing Costs</h3>
              <p className="text-gray-500">Our algorithm places your products directly in front of buyers actively searching for them.</p>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-6"><CreditCard size={32} /></div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">Low Commission Rates</h3>
              <p className="text-gray-500">Keep more of your profits with transparent fees starting as low as 5% per sale.</p>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-6"><Store size={32} /></div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">Custom Storefronts</h3>
              <p className="text-gray-500">Build your brand identity with customizable shop designs and marketing tools.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer / CTA */}
      <div className="max-w-[800px] mx-auto text-center px-4">
        <h2 className="text-3xl font-black text-gray-900 mb-4">Ready to start your journey?</h2>
        <p className="text-gray-600 mb-8">Registration takes less than 5 minutes. You only need a valid ID and a bank account.</p>
        <button className="bg-black text-white font-bold px-12 py-4 rounded-full hover:bg-gray-800 transition-colors text-lg shadow-xl mb-4">
          Create Seller Account
        </button>
        <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
           <CheckCircle2 size={16} className="text-green-500" /> No setup fees
           <span className="mx-2">|</span>
           <CheckCircle2 size={16} className="text-green-500" /> Cancel anytime
        </div>
      </div>
    </div>
  );
}
