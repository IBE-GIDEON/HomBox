"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ChevronRight } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);

  const handleMoveToCart = (item: any) => {
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image }, 1);
    removeItem(item.id); // Remove from wishlist once it's in the cart
    alert("Moved to Cart!");
  };

  return (
    <div className="min-h-screen pb-20 bg-[#f2f2f2]">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-[1200px] mx-auto px-4 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/account" className="hover:text-red-600 transition-colors">My Account</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-bold">Wish List</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 mt-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart size={28} className="text-red-600 fill-red-600" />
          <h1 className="text-3xl font-black text-gray-900">My Wish List</h1>
          <span className="text-gray-500 font-medium ml-2">({items.length} items)</span>
        </div>

        {items.length === 0 ? (
          /* EMPTY STATE */
          <div className="bg-white rounded-xl border border-gray-200 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <Heart size={40} className="text-red-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">It feels a bit empty here</h2>
            <p className="text-gray-500 mb-6 max-w-md">Save the items you love by clicking the heart icon while shopping. They will safely wait for you here.</p>
            <Link href="/">
              <button className="bg-[#ff0000] text-white font-bold px-8 py-3 rounded-full hover:bg-red-700 transition-colors shadow-md">
                Start Exploring
              </button>
            </Link>
          </div>
        ) : (
          /* POPULATED GRID */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer flex flex-col group border border-gray-100 relative">
                
                {/* Delete Button */}
                <button 
                  onClick={(e) => { e.preventDefault(); removeItem(item.id); }}
                  className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors shadow-sm"
                >
                  <Trash2 size={16} />
                </button>

                <div className="relative aspect-square">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xs text-gray-700 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <div className="mt-auto">
                    <div className="text-lg font-black text-black mb-3">{item.price}</div>
                    
                    <button 
                      onClick={(e) => { e.preventDefault(); handleMoveToCart(item); }}
                      className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-bold py-2.5 rounded-lg hover:bg-black transition-colors text-sm"
                    >
                      <ShoppingCart size={16} /> Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}