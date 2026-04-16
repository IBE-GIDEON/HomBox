"use client";

import React, { useState } from 'react';
import { Truck, Search, CheckCircle2, ChevronRight, Package, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useOrderStore, Order } from '../store/orderStore';
import toast from 'react-hot-toast';

export default function OrderTracking() {
  const [trackingId, setTrackingId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<Order | null>(null); // To store matched order
  const { orders } = useOrderStore(); // Look up the actual Zustand orders!!

  const handleTrack = () => {
    if (!trackingId.trim()) return;
    setIsSearching(true);
    setResult(null);

    // Simulate network delay
    setTimeout(() => {
      const foundOrder = orders.find(o => o.id === trackingId.trim());
      setIsSearching(false);
      
      if (foundOrder) {
        setResult(foundOrder);
        toast.success("Shipment found!");
      } else {
        toast.error("Invalid Tracking ID");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-20">
       <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-[1000px] mx-auto px-4 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-bold">Track Global Order</span>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 mt-8">
        
        {/* Tracking Input Box */}
        <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-6 md:p-10 mb-8 border border-gray-100 flex flex-col items-center">
          <Truck size={48} className="text-red-600 mb-4" />
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Track your shipment</h1>
          <p className="text-gray-500 mb-8 text-center max-w-md">Enter your HomBox Tracking Number (e.g. ORD-12345678) to see real-time updates.</p>
          
          <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Package size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Enter Tracking Number" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-red-600 outline-none text-lg transition-colors bg-gray-50 focus:bg-white"
              />
            </div>
            <button 
              onClick={handleTrack}
              disabled={isSearching || !trackingId}
              className="bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white font-bold px-8 py-4 rounded-xl transition-colors shrink-0 flex items-center justify-center gap-2"
            >
              {isSearching ? <Loader2 size={24} className="animate-spin" /> : <Search size={24} />}
              Track Now
            </button>
          </div>
        </div>

        {/* Tracking Results Area */}
        {result && (
           <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 p-6 md:p-10 animate-in slide-in-from-bottom-4 duration-500 fade-in">
             <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
                <div>
                  <h2 className="text-sm text-gray-500">Tracking Number</h2>
                  <div className="text-2xl font-black text-gray-900">{result.id}</div>
                </div>
                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 w-fit">
                  <CheckCircle2 size={18} /> {result.status}
                </div>
             </div>

             <h3 className="font-bold text-gray-900 mb-6 text-lg">Shipment Progress</h3>
             
             {/* Progress Stepper */}
             <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 pb-4">
               {/* Step 4 */}
               <div className="relative pl-8">
                 <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white ${result.trackingStep >= 4 ? 'bg-red-600' : 'bg-gray-300'}`}></div>
                 <h4 className={`font-bold ${result.trackingStep >= 4 ? 'text-gray-900' : 'text-gray-400'}`}>Delivered</h4>
                 {result.trackingStep >= 4 && <p className="text-sm text-gray-500 mt-1">Your package has been delivered successfully.</p>}
               </div>
               
               {/* Step 3 */}
               <div className="relative pl-8">
                 <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white ${result.trackingStep >= 3 ? 'bg-red-600' : 'bg-gray-300'}`}></div>
                 <h4 className={`font-bold ${result.trackingStep >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>Out for Delivery / Shipped</h4>
                 {result.trackingStep >= 3 && <p className="text-sm text-gray-500 mt-1">Package is in transit.</p>}
               </div>

               {/* Step 2 */}
               <div className="relative pl-8">
                 <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white ${result.trackingStep >= 2 ? 'bg-red-600' : 'bg-gray-300'}`}></div>
                 <h4 className={`font-bold ${result.trackingStep >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>Processing</h4>
                 {result.trackingStep >= 2 && <p className="text-sm text-gray-500 mt-1">Order confirmed. Warehouse is packaging your item.</p>}
               </div>

               {/* Step 1 */}
               <div className="relative pl-8">
                 <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white bg-red-600`}></div>
                 <h4 className="font-bold text-gray-900">Order Placed</h4>
                 <p className="text-sm text-gray-500 mt-1">{result.date} - Order successfully placed and paid.</p>
               </div>
             </div>

             {/* Order Details Match */}
             <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                  <img src={result.items[0]?.image} alt="Product" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{result.storeName}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">{result.items[0]?.name}</div>
                </div>
             </div>
           </div>
        )}

      </div>
    </div>
  );
}
