"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2, PackageOpen, ChevronRight, ChevronLeft, Menu, Flame, Tag, Star, User } from 'lucide-react';

import { DBProduct } from '../lib/data';

// --- Mock Data for Categories and Sliders to avoid hardcoding everywhere ---
const CATEGORIES = [
  "Women's Fashion", "Men's Fashion", "Phones & Telecommunications", 
  "Computer, Office & Security", "Consumer Electronics", "Jewelry & Watches", 
  "Home, Pet & Appliances", "Bags & Shoes", "Toys, Kids & Babies", 
  "Outdoor Fun & Sports", "Beauty, Health & Hair", "Automobiles & Motorcycles"
];

const SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200", // Tech
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200", // Shopping
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200"  // Fashion
];

export default function MegaMarketplace() {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // FETCH FROM DATABASE ON LOAD
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // SLIDER AUTO-PLAY
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === SLIDER_IMAGES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === SLIDER_IMAGES.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? SLIDER_IMAGES.length - 1 : prev - 1));

  // Helper to format money dynamically
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="pb-20 relative overflow-x-hidden bg-[#f2f2f2] min-h-screen pt-4">
      
      {/* --- TOP HERO SECTION (Categories + Slider + Welcome Box) --- */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[400px]">
          
          {/* 1. LEFT: Categories (Hidden on mobile) */}
          <div className="hidden lg:flex flex-col w-[250px] bg-white rounded-xl shadow-sm overflow-hidden flex-shrink-0 py-2">
            <div className="px-4 py-2 font-bold flex items-center gap-2 border-b border-gray-50 mb-2">
              <Menu size={20} /> Categories
            </div>
            <ul className="overflow-y-auto overflow-x-hidden text-[13px] text-gray-700 flex-1">
              {CATEGORIES.map((cat, idx) => (
                <li key={idx} className="px-4 py-2 hover:bg-gray-100 hover:text-red-600 cursor-pointer transition-colors flex justify-between items-center group">
                  {cat}
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 text-red-600" />
                </li>
              ))}
            </ul>
          </div>

          {/* 2. CENTER: Dynamic Slider */}
          <div className="flex-1 bg-gray-200 rounded-xl overflow-hidden relative group cursor-pointer">
            <div 
              className="w-full h-full flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {SLIDER_IMAGES.map((img, idx) => (
                <div key={idx} className="w-full h-full flex-shrink-0 relative">
                  <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              ))}
            </div>

            {/* Slider Controls */}
            <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md">
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md">
              <ChevronRight size={24} className="text-gray-800" />
            </button>

            {/* Slider Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {SLIDER_IMAGES.map((_, idx) => (
                <div 
                  key={idx} 
                  onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${currentSlide === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </div>

          {/* 3. RIGHT: Welcome & Quick Deals (Hidden on mobile) */}
          <div className="hidden lg:flex flex-col w-[250px] gap-4 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <User size={24} className="text-gray-500" />
              </div>
              <p className="text-sm font-bold text-gray-800 mb-1">Welcome to HomBox!</p>
              <div className="flex gap-2 w-full mt-3">
                <button className="flex-1 bg-red-600 text-white text-xs font-bold py-2 rounded-full hover:bg-red-700 transition">Register</button>
                <button className="flex-1 bg-gray-100 text-gray-800 text-xs font-bold py-2 rounded-full hover:bg-gray-200 transition">Sign In</button>
              </div>
            </div>

            <div className="bg-[#fff5f5] rounded-xl shadow-sm p-4 flex-1 border border-red-100 flex flex-col cursor-pointer hover:shadow-md transition">
              <div className="flex items-center gap-1 text-red-600 font-bold mb-2">
                <Flame size={18} /> Welcome Deal
              </div>
              {products.length > 0 ? (
                <Link href={`/product/${products[0].id}`} className="bg-white rounded-lg p-2 flex-1 flex flex-col items-center justify-center relative overflow-hidden group">
                  {products[0].original_price > products[0].price && (
                    <span className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-br-lg z-10">
                      -{Math.round((1 - products[0].price / products[0].original_price) * 100)}%
                    </span>
                  )}
                  <img src={products[0].image_url} alt={products[0].name} className="h-24 object-contain group-hover:scale-110 transition-transform mb-2" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200'; }} />
                  <div className="text-lg font-black text-gray-900">{formatMoney(products[0].price)}</div>
                  {products[0].original_price > products[0].price && (
                    <div className="text-xs text-gray-400 line-through">{formatMoney(products[0].original_price)}</div>
                  )}
                </Link>
              ) : (
                <div className="bg-white rounded-lg p-2 flex-1 flex flex-col items-center justify-center">
                  <span className="text-xs text-gray-400">Loading deal...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- MIDDLE BANNER (SuperDeals style) --- */}
      <div className="max-w-[1200px] mx-auto px-4 mt-6">
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <Tag size={28} className="text-red-600" />
            <div>
              <h2 className="text-xl font-black text-gray-900 italic">Super<span className="text-red-600">Deals</span></h2>
              <p className="text-xs text-gray-500 font-medium">Top products. Incredible prices.</p>
            </div>
          </div>
          <div className="flex gap-3">
            {/* Displaying dynamic items from database for the deals banner */}
            {products.slice(0, 4).map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="hidden md:flex flex-col items-center w-20 group">
                <div className="bg-gray-50 rounded-md w-16 h-16 flex items-center justify-center overflow-hidden mb-1 border border-gray-100 group-hover:border-red-200 transition-colors">
                   <img src={product.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={product.name} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100'; }} />
                </div>
                <span className="text-red-600 font-bold text-xs">{formatMoney(product.price).replace('.00', '')}</span>
              </Link>
            ))}
            <div className="flex items-center text-gray-500 font-medium text-sm pl-2">
              View more <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* --- REAL DATABASE PRODUCTS GRID (More to love) --- */}
      <div className="max-w-[1200px] mx-auto px-4 mt-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-[1px] w-12 bg-gray-300"></div>
          <h2 className="text-2xl font-black text-gray-900 text-center">More to love</h2>
          <div className="h-[1px] w-12 bg-gray-300"></div>
        </div>
        
        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-xl shadow-sm">
            <Loader2 size={48} className="animate-spin text-red-600 mb-4" />
            <p className="font-medium">Finding the best deals...</p>
          </div>
        ) : products.length === 0 ? (
          /* Empty Database State */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
            <PackageOpen size={64} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Your catalog is currently empty. Go to the Admin dashboard to add products.</p>
            <Link href="/admin">
              <button className="bg-red-600 text-white font-bold px-6 py-3 rounded-full hover:bg-red-700 transition-colors shadow-md">
                Go to Admin Dashboard
              </button>
            </Link>
          </div>
        ) : (
          /* Populated Database State */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
            {products.map((product) => (
              <Link 
                href={`/product/${product.id}`}
                key={product.id} 
                className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col group border border-transparent hover:border-red-100"
              >
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'; }} // Fallback if image fails
                  />
                  {/* Mock Discount Badge based on original price */}
                  {product.original_price > product.price && (
                    <div className="absolute top-0 right-0 bg-[#fff0f0] text-red-600 text-[11px] font-bold px-1.5 py-0.5 rounded-bl-lg z-10">
                      -{Math.round((1 - product.price / product.original_price) * 100)}%
                    </div>
                  )}
                </div>
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-[13px] text-gray-800 line-clamp-2 mb-1 group-hover:text-red-600 transition-colors leading-tight">
                    {product.name}
                  </h3>
                  
                  {/* Rating Mock */}
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={10} className="fill-black text-black" />
                    <span className="text-[11px] text-gray-600 font-medium">{product.rating || '4.8'}</span>
                    <span className="text-[11px] text-gray-400">|</span>
                    <span className="text-[11px] text-gray-500">{product.sold_count}+ sold</span>
                  </div>

                  <div className="mt-auto">
                    <div className="text-lg font-black text-gray-900 leading-none">{formatMoney(product.price)}</div>
                    {product.original_price > product.price && (
                       <div className="text-[11px] text-gray-400 line-through mt-0.5">{formatMoney(product.original_price)}</div>
                    )}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      <span className="text-[10px] text-red-600 border border-red-200 bg-red-50 font-medium px-1 rounded-sm">Welcome deal</span>
                      <span className="text-[10px] text-gray-600 border border-gray-200 bg-gray-50 font-medium px-1 rounded-sm">Free shipping</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
