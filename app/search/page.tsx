"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, ChevronDown, Filter, ChevronRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function SearchPage() {
  const [priceRange, setPriceRange] = useState(50000);
  const addItem = useCartStore((state) => state.addItem);

  // Dummy search results
  const feedProducts = Array.from({ length: 16 }, (_, i) => ({
    id: i + 200,
    name: "Luxury Smart Watch Men Women Bluetooth Call Sports Bracelet Fitness Tracker",
    price: `₦${(Math.floor(Math.random() * 20) + 5)},500.00`,
    originalPrice: "₦25,000",
    sold: "1,000+ sold",
    shipping: "Free shipping",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400"
  }));

  return (
    <div className="min-h-screen pb-20">
      
      {/* Search Header / Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-[1400px] mx-auto px-4 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-bold">Search Results</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: Filters Sidebar */}
        <aside className="w-full lg:w-[250px] flex-shrink-0">
          <div className="bg-white rounded-xl p-5 border border-gray-200 sticky top-24">
            <div className="flex items-center gap-2 font-black text-lg border-b border-gray-100 pb-4 mb-4">
              <Filter size={20} /> Filters
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Price (₦)</h3>
              <input 
                type="range" 
                min="1000" 
                max="100000" 
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-red-600"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>₦1,000</span>
                <span className="font-bold text-gray-900">Up to ₦{priceRange.toLocaleString()}</span>
              </div>
            </div>

            <hr className="border-gray-100 mb-4" />

            {/* Ratings Filter */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Rating</h3>
              <div className="flex flex-col gap-2">
                {[4, 3, 2, 1].map((stars) => (
                  <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 accent-red-600" />
                    <div className="flex text-amber-400 group-hover:opacity-80">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} className={i < stars ? "fill-amber-400" : "text-gray-300"} />
                      ))}
                      <span className="text-gray-600 ml-2 text-sm">& Up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-gray-100 mb-4" />

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Features</h3>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-red-600" />
                  <span className="text-sm text-gray-700">Free Shipping</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-red-600" />
                  <span className="text-sm text-gray-700">Welcome Deal</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-red-600" />
                  <span className="text-sm text-gray-700">Pay on Delivery</span>
                </label>
              </div>
            </div>

            <button className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black transition-colors">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* RIGHT COLUMN: Search Results Grid */}
        <main className="flex-1">
          
          {/* Sort Bar */}
          <div className="bg-white rounded-xl p-3 border border-gray-200 mb-6 flex flex-wrap justify-between items-center gap-4">
            <span className="text-sm text-gray-600"><span className="font-bold text-gray-900">10,000+</span> items found</span>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sort by:</span>
              <select className="border border-gray-300 rounded-md px-3 py-1.5 outline-none focus:border-red-600 font-medium text-gray-800">
                <option>Best Match</option>
                <option>Orders (High to Low)</option>
                <option>Price (Low to High)</option>
                <option>Price (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {feedProducts.map((product) => (
              <Link 
                href={`/product/${product.id}`}
                key={product.id} 
                className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer flex flex-col group border border-gray-100"
              >
                <div className="relative aspect-square">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-xs text-gray-700 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <div className="mt-auto">
                    <div className="text-lg font-black text-black">{product.price}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-400 line-through">{product.originalPrice}</span>
                      <span className="text-[10px] text-gray-500">{product.sold}</span>
                    </div>
                    <div className="text-[10px] text-green-600 font-medium mt-1">{product.shipping}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12 gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-500 disabled:opacity-50">Previous</button>
            <button className="w-10 h-10 bg-red-600 text-white font-bold rounded-lg">1</button>
            <button className="w-10 h-10 border border-gray-300 hover:bg-gray-50 font-bold rounded-lg transition-colors">2</button>
            <button className="w-10 h-10 border border-gray-300 hover:bg-gray-50 font-bold rounded-lg transition-colors">3</button>
            <span className="flex items-center px-2 text-gray-500">...</span>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-bold transition-colors">Next</button>
          </div>
        </main>

      </div>
    </div>
  );
}