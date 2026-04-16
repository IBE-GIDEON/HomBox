"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, Filter, ChevronRight } from 'lucide-react';
import { DBProduct } from '../../lib/data';

export default function SearchPage() {
  const [priceRange, setPriceRange] = useState(100000);
  const [feedProducts, setFeedProducts] = useState<DBProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<DBProduct[]>([]);
  const [sortBy, setSortBy] = useState('Best Match');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setFeedProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...feedProducts];
    
    result = result.filter(p => p.price <= priceRange);
    
    if (ratingFilter !== null) {
      result = result.filter(p => p.rating >= ratingFilter);
    }
    
    if (sortBy === 'Price (Low to High)') {
      result.sort((a,b) => a.price - b.price);
    } else if (sortBy === 'Price (High to Low)') {
      result.sort((a,b) => b.price - a.price);
    } else if (sortBy === 'Orders (High to Low)') {
      result.sort((a,b) => b.sold_count - a.sold_count);
    }
    
    setFilteredProducts(result);
  }, [priceRange, sortBy, ratingFilter, feedProducts]);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen pb-20 bg-[#f5f5f5]">
      
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
                className="w-full accent-gray-900"
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
                    <input 
                       type="radio" 
                       name="rating" 
                       className="w-4 h-4 accent-gray-900" 
                       checked={ratingFilter === stars}
                       onChange={() => setRatingFilter(stars)}
                    />
                    <div className="flex text-gray-900 group-hover:opacity-80">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} className={i < stars ? "fill-gray-900" : "text-gray-300"} />
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

            <button onClick={() => { setPriceRange(100000); setRatingFilter(null); setSortBy('Best Match'); }} className="w-full border border-gray-200 text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Clear Filters
            </button>
          </div>
        </aside>

        {/* RIGHT COLUMN: Search Results Grid */}
        <main className="flex-1">
          
          {/* Sort Bar */}
          <div className="bg-white rounded-xl p-3 border border-gray-200 mb-6 flex flex-wrap justify-between items-center gap-4 shadow-sm">
            <span className="text-sm text-gray-600"><span className="font-bold text-gray-900">{filteredProducts.length}</span> items found</span>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 outline-none focus:border-gray-900 font-medium text-gray-800"
              >
                <option>Best Match</option>
                <option>Orders (High to Low)</option>
                <option>Price (Low to High)</option>
                <option>Price (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4">
            {filteredProducts.map((product) => (
              <Link 
                href={`/product/${product.id}`}
                key={product.id} 
                className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer flex flex-col group border border-gray-100"
              >
                <div className="relative aspect-square">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400'; }} />
                </div>
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-[13px] text-gray-800 line-clamp-2 mb-1 group-hover:text-red-600 transition-colors leading-tight">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={10} className="fill-black text-black" />
                    <span className="text-[11px] text-gray-600 font-medium">{product.rating}</span>
                    <span className="text-[11px] text-gray-400">|</span>
                    <span className="text-[11px] text-gray-500">{product.sold_count}+ sold</span>
                  </div>

                  <div className="mt-auto">
                    <div className="text-lg font-black text-gray-900 leading-none">{formatMoney(product.price)}</div>
                    {product.original_price > product.price && (
                       <div className="text-[11px] text-gray-400 line-through mt-0.5">{formatMoney(product.original_price)}</div>
                    )}
                    <div className="text-[10px] text-green-600 font-medium mt-1.5 bg-green-50 px-1.5 py-0.5 rounded-sm inline-block">Free shipping</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12 gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-500 disabled:opacity-50">Previous</button>
            <button className="w-10 h-10 bg-zinc-900 text-white font-bold rounded-lg">1</button>
            <button className="w-10 h-10 border border-gray-300 hover:bg-white font-bold text-gray-700 bg-white rounded-lg transition-colors shadow-sm">2</button>
            <span className="flex items-center px-2 text-gray-500">...</span>
            <button className="px-4 py-2 border border-gray-300 bg-white rounded-lg text-gray-700 hover:bg-gray-50 font-bold transition-colors shadow-sm">Next</button>
          </div>
        </main>

      </div>
    </div>
  );
}