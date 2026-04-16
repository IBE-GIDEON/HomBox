"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, Loader2, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { DBProduct } from '../../../lib/data';

import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ProductActionBox from './components/ProductActionBox';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<DBProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalQuantity, setModalQuantity] = useState(1);
  
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params?.id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params?.id) {
      fetchProduct();
    }
  }, [params?.id]);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
        <Loader2 size={48} className="animate-spin text-red-600 mb-6" />
        <h2 className="text-xl font-bold text-gray-700">Loading product details...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md text-center">This item might have been removed or the link is broken.</p>
        <Link href="/">
          <button className="bg-gray-900 text-white font-bold px-10 py-4 rounded-full hover:bg-black transition-all shadow-xl hover:-translate-y-1">
            Return to Homepage
          </button>
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);

  const handleToggleSave = () => {
    if (isSaved) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({ id: product.id, name: product.name, price: formatMoney(product.price), image: product.image_url });
    }
  };

  const handleAddToCart = () => {
    addItem({ 
      id: product.id, 
      name: product.name, 
      price: formatMoney(product.price),
      image: product.image_url 
    }, modalQuantity);
    
    toast.success("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pb-32">
      
      {/* Premium Breadcrumbs */}
      <div className="border-b border-gray-200/60 bg-white/50 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-[1300px] mx-auto px-6 py-4 text-[11px] font-black text-gray-400 flex items-center gap-3 uppercase tracking-[0.15em]">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="hover:text-red-600 cursor-pointer transition-colors">{product.category || 'Category'}</span>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-gray-900 truncate max-w-[200px] md:max-w-none">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 mt-12 flex flex-col lg:flex-row gap-12 lg:gap-16 relative">
        <ProductGallery image_url={product.image_url} name={product.name} />
        <ProductInfo product={product} isSaved={isSaved} onToggleSave={handleToggleSave} formatMoney={formatMoney} />
        <ProductActionBox 
          priceStr={formatMoney(product.price)} 
          quantity={modalQuantity} 
          setQuantity={setModalQuantity} 
          onAddToCart={handleAddToCart} 
        />
      </div>
      
      {/* Detailed Description */}
      <div className="max-w-[1300px] mx-auto px-6 mt-16">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="flex border-b border-gray-200 bg-gray-50/50">
            <button className="px-10 py-5 font-bold text-gray-900 border-b-2 border-gray-900 bg-white uppercase tracking-wider text-sm outline-none">Product Overview</button>
            <button className="px-10 py-5 font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider text-sm outline-none">Specifications</button>
            <button className="px-10 py-5 font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider text-sm outline-none flex items-center gap-2">Reviews <span className="bg-gray-200 text-gray-900 px-2 py-0.5 rounded-md text-[10px]">1,284</span></button>
          </div>
          
          <div className="p-10 md:p-14 max-w-6xl mx-auto flex gap-12 flex-col lg:flex-row">
             <div className="flex-[2] text-gray-700">
               <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">Description</h3>
               <div className="whitespace-pre-wrap text-base leading-[2] font-medium">
                 {product.description || "No description provided for this product."}
               </div>

               <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mt-16 mb-6 border-b border-gray-100 pb-2">Customer Reviews</h3>
               <div className="flex flex-col gap-6">
                 <div className="border border-gray-200 p-6 rounded-lg bg-gray-50/30">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm">MI</div>
                       <div>
                         <div className="font-bold text-gray-900 text-sm">Michael I.</div>
                         <div className="flex text-gray-900"><Star size={12} className="fill-gray-900"/><Star size={12} className="fill-gray-900"/><Star size={12} className="fill-gray-900"/><Star size={12} className="fill-gray-900"/><Star size={12} className="fill-gray-900"/></div>
                       </div>
                       <span className="ml-auto text-xs font-medium text-gray-400">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">Absolutely incredible build quality. I was skeptical about the price point but the enterprise-grade materials really stand out. Arrived in completely protective packaging too.</p>
                 </div>
                 
                 <div className="border border-gray-200 p-6 rounded-lg bg-gray-50/30">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">SK</div>
                       <div>
                         <div className="font-bold text-gray-900 text-sm">Sarah K.</div>
                         <div className="flex text-gray-900"><Star size={12} className="fill-gray-900"/><Star size={12} className="fill-gray-900"/><Star size={12} className="fill-gray-900"/><Star size={12} className="fill-gray-900"/><Star size={12} className="text-gray-200 fill-gray-200"/></div>
                       </div>
                       <span className="ml-auto text-xs font-medium text-gray-400">1 week ago</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">Great functionality and speed. The interface is completely devoid of blurs and shadows which I appreciate being an enterprise user. 4 stars because shipping took an extra day.</p>
                 </div>
               </div>
               
               <button className="mt-8 border-2 border-gray-900 text-gray-900 font-bold w-full py-4 rounded-lg hover:bg-gray-900 hover:text-white transition-colors text-sm uppercase tracking-widest shadow-sm">Write a Review</button>
             </div>

             <div className="flex-1">
               <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-32">
                 <div className="flex items-center gap-4 border-b border-gray-200 pb-6 mb-6">
                   <div className="text-5xl font-black text-gray-900">{product.rating}</div>
                   <div>
                     <div className="flex text-gray-900 mb-1"><Star size={16} className="fill-gray-900"/><Star size={16} className="fill-gray-900"/><Star size={16} className="fill-gray-900"/><Star size={16} className="fill-gray-900"/><Star size={16} className="fill-gray-900"/></div>
                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Based on 1,284 reviews</span>
                   </div>
                 </div>

                 {/* Rating Bars */}
                 <div className="flex flex-col gap-3">
                   {[5,4,3,2,1].map((stars, idx) => {
                     const percentages = [75, 15, 5, 3, 2];
                     const p = percentages[idx];
                     return (
                       <div key={stars} className="flex items-center gap-3 text-xs font-bold text-gray-500">
                         <span className="w-4">{stars}</span> <Star size={10} className="text-gray-400" />
                         <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                           <div className="h-full bg-gray-900 rounded-full" style={{ width: `${p}%` }}></div>
                         </div>
                         <span className="w-8 text-right text-gray-900">{p}%</span>
                       </div>
                     )
                   })}
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}