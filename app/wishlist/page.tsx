"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ChevronRight, PackageOpen, Tag, Info } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);
  const [movingId, setMovingId] = useState<number | null>(null);

  const formatMoney = (amount: number | string) => {
    // Basic handler if the price is passed as a pre-formatted string or number
    if (typeof amount === 'string' && amount.includes('₦')) return amount;
    const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g,"")) : amount;
    if (isNaN(num)) return amount;
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(num);
  };

  const handleMoveToCart = (e: React.MouseEvent, item: { id: number; name: string; price: string | number; image: string }) => {
    e.preventDefault();
    e.stopPropagation();
    setMovingId(item.id);
    
    // Simulate network delay for enterprise feel
    setTimeout(() => {
      // Ensure price is parsed correctly for the cart
      const priceVal = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g,"")) : item.price;
      
      addToCart({ 
        id: item.id, 
        name: item.name, 
        price: formatMoney(isNaN(priceVal) ? 0 : priceVal) as string, 
        image: item.image 
      }, 1);
      removeItem(item.id);
      setMovingId(null);
    }, 400);
  };

  const handleRemove = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    removeItem(id);
  };

  return (
    <div className="min-h-screen pb-20 bg-[#f2f2f2]">
      
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-[1200px] mx-auto px-4 text-[13px] text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-black hover:underline transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/account" className="hover:text-black hover:underline transition-colors">My Account</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-bold">Wish List</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 mt-6">
        {/* Title Bar */}
        <div className="bg-white p-4 rounded-t-xl border border-b-0 border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
              <Heart size={20} className="text-red-600 fill-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 leading-none">My Wish List</h1>
              <p className="text-xs text-gray-500 mt-1 font-medium">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
            </div>
          </div>
          {items.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <Info size={14} /> Items added to your cart will be removed from your wishlist.
            </div>
          )}
        </div>

        {items.length === 0 ? (
          /* EMPTY STATE */
          <div className="bg-white rounded-b-xl border border-t-0 border-gray-200 p-16 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
              <PackageOpen size={48} className="text-gray-300" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Your Wish List is empty</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-md leading-relaxed">
              Found something you like but not ready to buy? Tap the heart icon on any product to save it here for later.
            </p>
            <Link href="/">
              <button className="bg-black text-white font-bold px-10 py-3.5 rounded-full hover:bg-gray-800 transition-colors shadow-md text-sm">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          /* POPULATED LIST (List View for Enterprise feel) */
          <div className="bg-white rounded-b-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex flex-col">
              {items.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`flex flex-col sm:flex-row gap-4 p-4 sm:p-6 transition-colors hover:bg-gray-50 group ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  {/* Image */}
                  <Link href={`/product/${item.id}`} className="w-full sm:w-[180px] h-[180px] flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden relative block">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'; }}
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex flex-col flex-1 py-1">
                    <div className="flex justify-between items-start gap-4">
                      <Link href={`/product/${item.id}`} className="block">
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                          {item.name}
                        </h3>
                      </Link>
                      
                      <button 
                        onClick={(e) => handleRemove(e, item.id)}
                        className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors flex-shrink-0"
                        title="Remove from Wishlist"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div className="mt-2 flex items-center gap-2">
                      <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded border border-green-200 flex items-center gap-1">
                        <Tag size={10} /> In Stock
                      </span>
                    </div>

                    <div className="mt-auto pt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-0.5 font-medium">Price</div>
                        <div className="text-xl sm:text-2xl font-black text-red-600 leading-none">
                          {formatMoney(item.price)}
                        </div>
                      </div>

                      <button 
                        onClick={(e) => handleMoveToCart(e, item)}
                        disabled={movingId === item.id}
                        className={`flex items-center justify-center gap-2 font-bold py-2.5 px-8 rounded-full transition-all text-sm shadow-sm
                          ${movingId === item.id 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-black text-white hover:bg-gray-800'
                          }`}
                      >
                        {movingId === item.id ? (
                          <>Moving...</>
                        ) : (
                          <><ShoppingCart size={18} /> Add to Cart</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
