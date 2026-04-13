"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, ShieldCheck, Trash2, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function CartPage() {
  const { items, removeItem, addItem, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
      return total + (numericPrice * item.quantity);
    }, 0);
  };

  const formattedTotal = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(calculateTotal());

  const feedProducts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 100,
    name: "Luxury Smart Watch Men Women Bluetooth Call Sports Bracelet Fitness Tracker",
    price: "₦8,500.00",
    originalPrice: "₦15,000",
    sold: "1,000+ sold",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400"
  }));

  return (
    <div className="pb-20">
      {/* 1. CART CONTENT AREA */}
      <div className="max-w-[1200px] mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN: Cart Items */}
        <div className="flex-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Cart</h1>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <div className="w-32 h-32 mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                  <ShoppingCart size={64} className="text-gray-300" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-6">Your cart is empty</h2>
                <div className="flex flex-col gap-3 w-full max-w-[200px]">
                  <button className="bg-[#e53935] text-white font-bold py-2.5 rounded-full hover:bg-red-700 transition-colors">Sign in</button>
                  <Link href="/" className="bg-white border border-gray-300 text-gray-800 font-bold py-2.5 rounded-full hover:bg-gray-50 transition-colors block text-center">Explore items</Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-0 relative">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md border border-gray-200" />
                    <div className="flex flex-col flex-1">
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 pr-8">{item.name}</h3>
                      <p className="text-lg font-black text-gray-900 mt-2">{item.price}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4">
                        <div className="flex items-center border border-gray-300 rounded-full bg-white overflow-hidden w-28 h-8">
                          <button onClick={() => addItem(item, -1)} disabled={item.quantity <= 1} className="px-2 py-1 hover:bg-gray-100 text-gray-600 disabled:opacity-50"><Minus size={14} /></button>
                          <input type="text" value={item.quantity} readOnly className="w-full text-center outline-none font-bold text-sm text-gray-800 bg-transparent" />
                          <button onClick={() => addItem(item, 1)} className="px-2 py-1 hover:bg-gray-100 text-gray-600"><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="absolute top-4 right-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Summary */}
        <div className="w-full lg:w-[350px] flex-shrink-0">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Summary</h2>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-700 font-medium">Estimated total</span>
              <span className="text-2xl font-black text-gray-900">{formattedTotal}</span>
            </div>
           <Link href="/checkout" className="block mb-6">
              <button 
                disabled={items.length === 0}
                className="w-full bg-[#e53935] text-white font-bold py-3.5 rounded-full hover:bg-red-700 transition-colors shadow-md disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
              >
                Checkout ({totalItems})
              </button>
            </Link>
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <ShieldCheck size={24} className="text-gray-700 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Buyer protection</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">Get a full refund if the item is not as described or not delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 2. MORE TO LOVE SECTION */}
      <div className="max-w-[1200px] mx-auto px-4 mt-12">
        <h2 className="text-xl font-bold mb-6">More to love</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {feedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer flex flex-col group border border-gray-100">
              <div className="relative aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-xs text-gray-700 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors leading-tight">{product.name}</h3>
                <div className="mt-auto">
                  <div className="text-lg font-black text-black">{product.price}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-400 line-through">{product.originalPrice}</span>
                    <span className="text-[10px] text-gray-500">{product.sold}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}