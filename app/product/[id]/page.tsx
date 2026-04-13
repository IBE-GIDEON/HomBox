"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, Truck, ShieldCheck, Heart, Share2, ChevronRight, Check, Minus, Plus, Info, Loader2 } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';


// Match the database schema
type DBProduct = {
  id: number;
  name: string;
  price: number;
  original_price: number;
  sold_count: number;
  rating: number;
  image_url: string;
  description: string;
  category: string;
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<DBProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [modalQuantity, setModalQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();

  // Temporary colors array since we haven't added variants to the DB yet
  const colors = ["Default", "Black", "Silver"];

  // FETCH THE SPECIFIC PRODUCT BY ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.id)
          .single(); // Get exactly one row
        
        if (error) throw error;
        if (data) setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f2f2f2]">
        <Loader2 size={48} className="animate-spin text-red-600 mb-4" />
        <h2 className="text-xl font-bold text-gray-700">Loading product details...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f2f2f2]">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">This item might have been removed or the link is broken.</p>
        <Link href="/">
          <button className="bg-black text-white font-bold px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
            Back to Homepage
          </button>
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({ 
      id: product.id, 
      name: product.name, 
      price: formatMoney(product.price), // Convert number to formatted string for the cart
      image: product.image_url 
    }, modalQuantity);
    
    alert("Added to cart!");
  };

  return (
    <div className="min-h-screen pb-20">
      
      {/* 1. BREADCRUMBS */}
      <div className="max-w-[1200px] mx-auto px-4 py-4 text-xs text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
        <ChevronRight size={12} />
        <span className="hover:text-red-600 cursor-pointer transition-colors">{product.category || 'Category'}</span>
        <ChevronRight size={12} />
        <span className="text-gray-800 font-medium truncate w-48 md:w-auto">{product.name}</span>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 mt-2 flex flex-col lg:flex-row gap-8">
        
        {/* 2. LEFT COLUMN: IMAGE */}
        <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0">
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 mb-4 aspect-square relative flex items-center justify-center">
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-zoom-in"
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'; }}
            />
          </div>
        </div>

        {/* 3. MIDDLE COLUMN: PRODUCT DETAILS */}
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-3">
            {product.name}
          </h1>
          
          {/* Ratings & Orders */}
          <div className="flex flex-wrap items-center gap-4 text-sm mb-6 border-b border-gray-100 pb-4">
            <div className="flex items-center text-amber-500 font-bold">
              <Star size={16} className="fill-amber-500 mr-1" />
              {product.rating}
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 hover:text-red-600 cursor-pointer underline">Reviews</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">{product.sold_count}+ sold</span>
            
            <div className="ml-auto flex gap-4">
              <button 
                onClick={() => {
                  if (isSaved) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist({ id: product.id, name: product.name, price: formatMoney(product.price), image: product.image_url });
                  }
                }}
                className={`flex items-center gap-1 transition-colors ${isSaved ? 'text-red-600 font-bold' : 'text-gray-500 hover:text-red-600'}`}
              >
                <Heart size={18} className={isSaved ? 'fill-red-600' : ''}/> 
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors"><Share2 size={18}/> Share</button>
            </div>
          </div>

          {/* Pricing Block */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl p-5 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
              Welcome Deal
            </div>
            <div className="text-red-600 font-black text-4xl mb-1">{formatMoney(product.price)}</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through text-sm">{formatMoney(product.original_price)}</span>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded">Promo</span>
            </div>
            <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <Info size={12} /> Prices include VAT where applicable
            </div>
          </div>

          {/* Variants / Colors */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              Variant: <span className="font-normal text-gray-600">{colors[selectedColor]}</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((color, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedColor(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded border-2 transition-colors ${selectedColor === idx ? 'border-red-600 bg-red-50 text-red-700 font-bold' : 'border-gray-200 hover:border-gray-400 text-gray-700'}`}
                >
                  <span className="text-sm">{color}</span>
                  {selectedColor === idx && <Check size={14} className="text-red-600 ml-1" />}
                </button>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
            <div className="flex gap-3 mb-4">
              <Truck size={20} className="text-gray-700 shrink-0" />
              <div>
                <div className="font-bold text-gray-900">Free Shipping</div>
                <div className="text-sm text-gray-600 mt-0.5">Estimated delivery: <span className="font-bold">2-4 Business Days</span></div>
                <div className="text-xs text-gray-500 mt-1">Tracking Available</div>
              </div>
            </div>
            <hr className="border-gray-200 mb-4" />
            <div className="flex gap-3">
              <ShieldCheck size={20} className="text-gray-700 shrink-0" />
              <div>
                <div className="font-bold text-gray-900">75-Day Buyer Protection</div>
                <div className="text-sm text-gray-600 mt-0.5">Get a refund if the item arrives late or not as described.</div>
              </div>
            </div>
          </div>

        </div>

        {/* 4. RIGHT COLUMN: BUY BOX (Sticky) */}
        <div className="w-full lg:w-[300px] flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sticky top-24">
            
            <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
            
            <div className="mb-6">
              <span className="text-sm font-medium block mb-2 text-gray-700">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-full bg-white overflow-hidden w-full max-w-[150px] h-10">
                  <button onClick={() => setModalQuantity(prev => Math.max(1, prev - 1))} className="px-3 hover:bg-gray-100 text-gray-600 transition-colors h-full flex items-center justify-center w-1/3"><Minus size={16} /></button>
                  <input type="text" value={modalQuantity} readOnly className="w-1/3 h-full text-center outline-none font-bold text-gray-800 bg-transparent"/>
                  <button onClick={() => setModalQuantity(prev => prev + 1)} className="px-3 hover:bg-gray-100 text-gray-600 transition-colors h-full flex items-center justify-center w-1/3"><Plus size={16} /></button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-[#fff0f0] text-red-600 border border-red-200 font-bold py-3.5 rounded-full hover:bg-red-50 transition-colors"
              >
                Add to Cart
              </button>
              
              <Link href="/cart">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#ff0000] text-white font-bold py-3.5 rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30 flex justify-center items-center"
                >
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
      
      {/* 5. LONG SCROLLING PRODUCT DESCRIPTION */}
      <div className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200 bg-gray-50">
            <button className="px-6 py-4 font-bold text-red-600 border-b-2 border-red-600 bg-white">Product Description</button>
            <button className="px-6 py-4 font-medium text-gray-600 hover:text-red-600 transition-colors">Specifications</button>
          </div>
          
          <div className="p-8 max-w-4xl mx-auto flex flex-col gap-8 text-gray-700">
            <div className="whitespace-pre-wrap text-lg leading-relaxed">
              {product.description || "No description provided for this product."}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}