"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2, PackageOpen } from 'lucide-react';


// Define the shape of our database products
type DBProduct = {
  id: number;
  name: string;
  price: number;
  original_price: number;
  sold_count: number;
  rating: number;
  image_url: string;
};

export default function MegaMarketplace() {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH FROM DATABASE ON LOAD
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false }) // Newest products first
          .limit(20); // Only grab top 20 for homepage
        
        if (error) throw error;
        if (data) setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper to format money dynamically
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="pb-20 relative overflow-x-hidden">
      
      {/* 1. HERO BANNER SECTION (Kept static for promotions) */}
      <div className="max-w-[1400px] mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[400px]">
          <div className="lg:col-span-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl overflow-hidden relative flex items-center px-6 lg:px-10 h-[250px] lg:h-full cursor-pointer border border-gray-100">
            <div className="z-10 max-w-md relative">
              <h2 className="text-3xl lg:text-4xl font-black mb-2 text-gray-900">Smart watch</h2>
              <p className="text-sm lg:text-lg text-gray-700 mb-6">Health trackers, combined.</p>
              <button className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-md">Shop now</button>
            </div>
            <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800" alt="Promo" className="absolute right-0 top-0 h-full w-1/2 object-cover object-left" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }} />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 h-[250px] lg:h-full">
            <div className="bg-orange-50 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow border border-orange-100">
              <div>
                <h3 className="font-bold text-lg text-gray-900">Welcome Deal</h3>
                <p className="text-red-600 font-black text-xl">₦1,500</p>
              </div>
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400" alt="Deal" className="h-20 object-contain self-end" />
            </div>
            <div className="bg-green-50 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow border border-green-100">
              <h3 className="font-bold text-lg text-gray-900">Top Brands</h3>
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400" alt="Brands" className="h-20 object-contain self-end" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. REAL DATABASE PRODUCTS GRID */}
      <div className="max-w-[1400px] mx-auto px-4 mt-12">
        <h2 className="text-2xl font-black mb-6 text-center text-gray-900">More to love</h2>
        
        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 size={48} className="animate-spin text-red-600 mb-4" />
            <p className="font-medium">Loading catalog...</p>
          </div>
        ) : products.length === 0 ? (
          /* Empty Database State */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100">
            <PackageOpen size={64} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Your catalog is currently empty. Go to the Admin dashboard to add products.</p>
            <Link href="/admin">
              <button className="bg-gray-900 text-white font-bold px-6 py-3 rounded-full hover:bg-black transition-colors">
                Go to Admin Dashboard
              </button>
            </Link>
          </div>
        ) : (
          /* Populated Database State */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {products.map((product) => (
              <Link 
                href={`/product/${product.id}`}
                key={product.id} 
                className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer flex flex-col group border border-gray-100"
              >
                <div className="relative aspect-square bg-gray-50">
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'; }} // Fallback if image fails
                  />
                </div>
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-xs text-gray-700 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors leading-tight font-medium">
                    {product.name}
                  </h3>
                  <div className="mt-auto">
                    <div className="text-lg font-black text-gray-900">{formatMoney(product.price)}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-400 line-through">{formatMoney(product.original_price)}</span>
                      <span className="text-[10px] text-gray-500 font-medium">{product.sold_count}+ sold</span>
                    </div>
                    <div className="text-[10px] text-[#00b259] font-bold mt-1 tracking-wide">Free shipping</div>
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