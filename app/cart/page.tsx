"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, ShieldCheck, Trash2, Minus, Plus, ChevronRight, Store, CreditCard, Loader2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';


// Define the shape of our database products for the "More to love" section
type DBProduct = {
  id: number;
  name: string;
  price: number;
  original_price: number;
  sold_count: number;
  rating: number;
  image_url: string;
};

export default function CartPage() {
  const { items, removeItem, addItem, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  const [recommendedProducts, setRecommendedProducts] = useState<DBProduct[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);

  // FETCH RECOMMENDATIONS ON LOAD
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        /*
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('sold_count', { ascending: false }) // Best sellers first
          .limit(12); 
        
        if (error) throw error;
        if (data) setRecommendedProducts(data);
        */
        setRecommendedProducts([]);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setIsLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, []);

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      // Ensure price is properly parsed whether it's a string with Naira symbol or a number
      const numericPrice = typeof item.price === 'string' 
        ? parseFloat(item.price.replace(/[^0-9.-]+/g,"")) 
        : item.price;
      
      const validPrice = isNaN(numericPrice) ? 0 : numericPrice;
      return total + (validPrice * item.quantity);
    }, 0);
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formattedTotal = formatMoney(calculateTotal());

  return (
    <div className="pb-20 bg-[#f2f2f2] min-h-screen">
      
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-gray-200 py-3 hidden md:block">
        <div className="max-w-[1200px] mx-auto px-4 text-[13px] text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-black hover:underline transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-bold">Shopping Cart</span>
        </div>
      </div>

      {/* 1. CART CONTENT AREA */}
      <div className="max-w-[1200px] mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN: Cart Items */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
             <h1 className="text-2xl font-black text-gray-900 tracking-tight">Shopping Cart ({totalItems})</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[400px] overflow-hidden">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <div className="w-32 h-32 mb-6 bg-gray-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                  <ShoppingCart size={48} className="text-gray-300" strokeWidth={1.5} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-sm text-gray-500 mb-8 max-w-md">Browse our categories and discover our best deals! Just click on the cart icon to add items.</p>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center">
                  <Link href="/account" className="w-full sm:w-auto">
                    <button className="w-full bg-black text-white font-bold py-3.5 px-8 rounded-full hover:bg-gray-800 transition-colors shadow-md text-sm">Sign in</button>
                  </Link>
                  <Link href="/">
                    <button className="w-full bg-white border border-gray-300 text-gray-800 font-bold py-3.5 px-8 rounded-full hover:bg-gray-50 transition-colors shadow-sm text-sm">Explore items</button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                {/* Enterprise List Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50">
                  <div className="col-span-6">Item</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                {items.map((item, index) => {
                  const itemPrice = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g,"")) : item.price;
                  const itemSubtotal = (isNaN(itemPrice) ? 0 : itemPrice) * item.quantity;

                  return (
                    <div key={item.id} className={`flex flex-col md:grid md:grid-cols-12 gap-4 p-4 sm:p-6 transition-colors hover:bg-gray-50 group relative ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      
                      {/* Mobile Remove Button (Absolute Top Right) */}
                      <button onClick={() => removeItem(item.id)} className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>

                      {/* Product Details (Col 1-6) */}
                      <div className="col-span-6 flex gap-4 pr-8 md:pr-0">
                        <Link href={`/product/${item.id}`} className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden block">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform" />
                        </Link>
                        <div className="flex flex-col py-1">
                          <Link href={`/product/${item.id}`} className="block">
                            <h3 className="text-sm sm:text-base font-bold text-gray-900 hover:text-red-600 transition-colors line-clamp-2 leading-snug mb-1">
                              {item.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-2">
                            <Store size={12} /> HomBox Official Store
                          </div>
                          {/* Desktop Remove Button */}
                          <button onClick={() => removeItem(item.id)} className="hidden md:flex items-center gap-1 text-[12px] text-gray-400 hover:text-red-600 font-medium mt-auto transition-colors w-max">
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Unit Price (Col 7-8) */}
                      <div className="col-span-2 hidden md:flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-900">{formatMoney(itemPrice)}</span>
                      </div>

                      {/* Quantity (Col 9-10) */}
                      <div className="col-span-2 flex items-center md:justify-center mt-2 md:mt-0">
                        <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden w-[100px] h-9 shadow-sm">
                          <button onClick={() => addItem(item, -1)} disabled={item.quantity <= 1} className="w-8 h-full flex items-center justify-center hover:bg-gray-100 text-gray-600 disabled:opacity-30 disabled:hover:bg-white transition-colors border-r border-gray-200">
                            <Minus size={14} />
                          </button>
                          <input type="text" value={item.quantity} readOnly className="flex-1 w-full text-center outline-none font-bold text-sm text-gray-900 bg-transparent" />
                          <button onClick={() => addItem(item, 1)} className="w-8 h-full flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors border-l border-gray-200">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal (Col 11-12) */}
                      <div className="col-span-2 flex md:items-center justify-between md:justify-end mt-2 md:mt-0">
                        <span className="md:hidden text-sm text-gray-500 font-medium">Subtotal:</span>
                        <span className="text-lg font-black text-red-600 leading-none">{formatMoney(itemSubtotal)}</span>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Summary */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-24">
            <h2 className="text-lg font-bold mb-4 text-gray-900 border-b border-gray-100 pb-4">Order Summary</h2>
            
            <div className="flex flex-col gap-3 mb-6 border-b border-gray-100 pb-4 text-sm">
              <div className="flex justify-between items-center text-gray-600">
                <span>Items total ({totalItems})</span>
                <span className="font-medium text-gray-900">{formattedTotal}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free Delivery</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Taxes</span>
                <span className="font-medium text-gray-900">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-6">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-3xl font-black text-red-600 leading-none">{formattedTotal}</span>
            </div>
            
            <Link href="/checkout" className="block mb-4">
              <button 
                disabled={items.length === 0}
                className="w-full bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-colors shadow-md disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed text-sm"
              >
                Checkout ({totalItems})
              </button>
            </Link>

            {/* Enterprise Badges */}
            <div className="flex flex-col gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[13px] font-bold text-gray-900">Buyer Protection</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Full refund if the item is not as described or not delivered</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-[12px] font-bold text-gray-900 mb-2">Accepted Payment Methods</h3>
                <div className="flex gap-2">
                  <div className="w-10 h-6 border border-gray-200 rounded flex items-center justify-center bg-gray-50 text-gray-400"><CreditCard size={14} /></div>
                  <div className="w-10 h-6 border border-gray-200 rounded flex items-center justify-center bg-gray-50 text-gray-400"><CreditCard size={14} /></div>
                  <div className="w-10 h-6 border border-gray-200 rounded flex items-center justify-center bg-gray-50 text-gray-400"><CreditCard size={14} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 2. REAL DATABASE PRODUCTS GRID (More to love) */}
      <div className="max-w-[1200px] mx-auto px-4 mt-16">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-[1px] w-12 bg-gray-300"></div>
          <h2 className="text-2xl font-black text-gray-900 text-center tracking-tight">More to love</h2>
          <div className="h-[1px] w-12 bg-gray-300"></div>
        </div>
        
        {/* Loading State */}
        {isLoadingRecommendations ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400 bg-white rounded-xl shadow-sm border border-gray-200">
            <Loader2 size={40} className="animate-spin text-gray-400 mb-4" />
            <p className="font-medium text-sm">Finding recommendations...</p>
          </div>
        ) : recommendedProducts.length === 0 ? (
          <div className="hidden" /> // Hide section if no recommendations available
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
            {recommendedProducts.map((product) => (
              <Link 
                href={`/product/${product.id}`}
                key={product.id} 
                className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col group border border-transparent hover:border-gray-200"
              >
                <div className="relative aspect-square bg-gray-50 overflow-hidden border-b border-gray-100">
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'; }}
                  />
                  {product.original_price > product.price && (
                    <div className="absolute top-0 right-0 bg-[#fff0f0] text-red-600 text-[11px] font-bold px-1.5 py-0.5 rounded-bl-lg z-10">
                      -{Math.round((1 - product.price / product.original_price) * 100)}%
                    </div>
                  )}
                </div>
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-[13px] text-gray-800 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors leading-tight">
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto">
                    <div className="text-lg font-black text-gray-900 leading-none">{formatMoney(product.price)}</div>
                    {product.original_price > product.price && (
                       <div className="text-[11px] text-gray-400 line-through mt-1">{formatMoney(product.original_price)}</div>
                    )}
                    <div className="flex flex-wrap gap-1 mt-2">
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
