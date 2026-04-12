"use client";

import React, { useState, useEffect } from 'react';
// ADDED 'Package' to imports
import { Search, ShoppingCart, Menu, ChevronDown, User, Heart, X, Star, Minus, Plus, ShieldCheck, Truck, Package } from 'lucide-react';
import { useCartStore } from './store/cartStore';
import Link from 'next/link';

type FeedProduct = {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  sold: string;
  shipping: string;
  rating: number;
  image: string;
};

export default function MegaMarketplace() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FeedProduct | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);

  const addItem = useCartStore((state) => state.addItem);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setModalQuantity(1);
    setSelectedColor(0);
  }, [selectedProduct]);

  const feedProducts: FeedProduct[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: "Luxury Smart Watch Men Women Bluetooth Call Sports Bracelet Fitness Tracker",
    price: "₦8,500.00",
    originalPrice: "₦15,000",
    sold: "1,000+ sold",
    shipping: "Free shipping",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600"
  }));

  const handleAddToCart = () => {
    if (selectedProduct) {
      addItem({ 
        id: selectedProduct.id, 
        name: selectedProduct.name, 
        price: selectedProduct.price, 
        image: selectedProduct.image 
      }, modalQuantity);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-slate-900 font-sans pb-20 relative overflow-x-hidden">
      
      {/* 1. TOP HEADER */}
      <div className="bg-black text-white text-xs py-1.5 px-4 justify-between items-center hidden md:flex">
        <div className="flex gap-4">
          <span className="hover:text-gray-300 cursor-pointer">Sell on Store</span>
          <span className="hover:text-gray-300 cursor-pointer">Help Center</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="hover:text-gray-300 cursor-pointer flex items-center gap-1">Ship to 🇳🇬 <ChevronDown size={12}/></span>
          <span className="hover:text-gray-300 cursor-pointer flex items-center gap-1">English <ChevronDown size={12}/></span>
          <span className="hover:text-gray-300 cursor-pointer flex items-center gap-1">NGN <ChevronDown size={12}/></span>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200 shadow-sm relative">
        <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center gap-4 lg:gap-8">
          
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-1 hover:bg-gray-100 rounded-md">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-black tracking-tighter text-red-600 hidden sm:block">HomBox</h1>
          </div>

          <div className="flex-1 hidden md:flex">
            <div className="flex w-full max-w-3xl border-2 border-red-600 rounded-full overflow-hidden h-10">
              <input type="text" placeholder="search for appliances, gadgets, clothes..." className="w-full px-4 outline-none text-sm" />
              <button className="bg-red-600 text-white px-8 font-bold hover:bg-red-700 transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 flex-shrink-0 ml-auto h-full">
            
            {/* --- NEW HOVER DROPDOWN MENU --- */}
            <div className="group hidden lg:flex flex-col items-center cursor-pointer h-full justify-center relative px-2">
              <div className="flex flex-col items-center group-hover:text-red-600 transition-colors">
                <User size={20} />
                <span className="text-[10px] font-medium mt-1">Sign In</span>
              </div>

              {/* The Dropdown Card (Invisible until hovered) */}
              <div className="absolute top-full right-1/2 translate-x-1/2 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {/* The little pointer triangle */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-white z-10"></div>
                
                <div className="bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100 w-64 p-5 flex flex-col relative mt-1">
                  
                  {/* Auth Buttons */}
                  <button className="w-full bg-[#1a1a1a] text-white font-bold py-3 rounded-full hover:bg-black transition-colors mb-3 shadow-md">
                    Sign in
                  </button>
                  <div className="text-center text-sm text-gray-500 hover:text-red-600 mb-4 cursor-pointer font-medium">
                    Register
                  </div>

                  <hr className="border-gray-100 mb-3" />

                  {/* Core Features */}
                  <div className="flex flex-col gap-1 mb-3">
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-gray-700 hover:text-red-600 transition-colors cursor-pointer">
                      <Package size={18} />
                      <span className="text-sm font-medium">My Orders</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-gray-700 hover:text-red-600 transition-colors cursor-pointer">
                      <Heart size={18} />
                      <span className="text-sm font-medium">Wish List</span>
                    </div>
                  </div>

                  <hr className="border-gray-100 mb-3" />

                  {/* Support & Settings (Trimmed down for MVP) */}
                  <div className="flex flex-col gap-1">
                    <div className="p-2 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">Account Settings</div>
                    <div className="p-2 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">Help Center</div>
                    <div className="p-2 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">Returns & Refunds</div>
                  </div>

                </div>
              </div>
            </div>
            {/* --- END HOVER DROPDOWN MENU --- */}
            
            <div className="flex flex-col items-center cursor-pointer hover:text-red-600 relative">
               <Link href="/cart" className="flex flex-col items-center cursor-pointer hover:text-red-600 relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-md">
                  {totalItems}
                </span>
              )}
              <span className="text-[10px] font-medium mt-1 hidden lg:block">Cart</span>
            </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HERO BANNER SECTION */}
      <div className="max-w-[1400px] mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[400px]">
          <div className="lg:col-span-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl overflow-hidden relative flex items-center px-6 lg:px-10 h-[250px] lg:h-full cursor-pointer">
            <div className="z-10 max-w-md relative">
              <h2 className="text-3xl lg:text-4xl font-black mb-2">Smart watch</h2>
              <p className="text-sm lg:text-lg text-gray-700 mb-6">Health trackers, combined.</p>
              <button className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800">Shop now</button>
            </div>
            <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800" alt="Promo" className="absolute right-0 top-0 h-full w-1/2 object-cover object-left" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }} />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 h-[250px] lg:h-full">
            <div className="bg-orange-50 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow">
              <div>
                <h3 className="font-bold text-lg">Welcome Deal</h3>
                <p className="text-red-600 font-bold text-xl">₦1,500</p>
              </div>
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400" alt="Deal" className="h-20 object-contain self-end" />
            </div>
            <div className="bg-green-50 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg">Top Brands</h3>
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400" alt="Brands" className="h-20 object-contain self-end" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. MORE TO LOVE (Product Grid) */}
      <div className="max-w-[1400px] mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">More to love</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {feedProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
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
            </div>
          ))}
        </div>
      </div>

      {/* 5. THE QUICK VIEW PRODUCT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
          
          <div className="bg-white rounded-xl shadow-2xl z-10 w-full max-w-5xl h-[85vh] lg:h-[600px] overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-600">
              <X size={20} />
            </button>

            <div className="flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden">
              
              <div className="lg:w-1/3 bg-gray-50 p-6 flex flex-col items-center">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full max-w-[300px] aspect-square object-cover rounded-lg shadow-sm border border-gray-200 bg-white" />
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2 w-full justify-center">
                  {[1, 2, 3].map((thumb) => (
                    <img key={thumb} src={selectedProduct.image} className="w-12 h-12 rounded border border-gray-300 cursor-pointer hover:border-red-600 object-cover" alt="thumbnail" />
                  ))}
                </div>
              </div>

              <div className="lg:w-1/3 p-6 lg:border-r border-gray-100 flex flex-col">
                <h2 className="text-xl font-bold leading-tight mb-2 text-gray-900">{selectedProduct.name}</h2>
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <span className="flex items-center text-amber-500 font-bold"><Star size={14} className="fill-amber-500 mr-1"/> {selectedProduct.rating}</span>
                  <span className="text-blue-600 underline cursor-pointer">129 Reviews</span>
                  <span className="text-gray-500">| {selectedProduct.sold}</span>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                  <div className="text-xs text-orange-600 font-bold mb-1 uppercase">Bundle deals</div>
                  <div className="text-3xl font-black text-black mb-1">{selectedProduct.price}</div>
                  <div className="text-xs text-gray-500">Tax excluded, add at checkout if applicable</div>
                </div>

                <div className="mb-6">
                  <span className="text-sm font-bold block mb-2">Color: <span className="font-normal text-gray-600">Option {selectedColor + 1}</span></span>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6].map((color, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setSelectedColor(idx)}
                        className={`w-10 h-10 rounded border-2 p-0.5 overflow-hidden transition-all ${selectedColor === idx ? 'border-red-600' : 'border-gray-200 hover:border-gray-400'}`}
                      >
                        <img src={selectedProduct.image} className="w-full h-full object-cover rounded-sm" alt={`color ${idx}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3 bg-gray-50/50 p-6 flex flex-col">
                <div className="border border-gray-200 rounded-lg p-4 bg-white mb-6">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                    <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] uppercase">Choice</span> 
                    HomBox commitment
                  </div>
                  
                  <div className="flex gap-3 mt-4 text-sm text-gray-700">
                    <Truck size={18} className="text-gray-400 shrink-0" />
                    <div>
                      <div className="font-bold">Free shipping</div>
                      <div className="text-xs text-gray-500 mt-0.5">Delivery: 2 - 4 Business Days</div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4 text-sm text-gray-700">
                    <ShieldCheck size={18} className="text-gray-400 shrink-0" />
                    <div>
                      <div className="font-bold">Security & Privacy</div>
                      <div className="text-xs text-gray-500 mt-0.5">Safe payments. We do not share your personal details.</div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="mb-4">
                    <span className="text-sm font-bold block mb-2 text-gray-700">Quantity</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-full bg-white overflow-hidden w-32">
                        <button 
                          onClick={() => setModalQuantity(prev => Math.max(1, prev - 1))}
                          className="px-3 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <input 
                          type="text" 
                          value={modalQuantity} 
                          readOnly 
                          className="w-full text-center outline-none font-bold text-gray-800 bg-transparent"
                        />
                        <button 
                          onClick={() => setModalQuantity(prev => prev + 1)}
                          className="px-3 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500">Max 10 pcs</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-[#ff0000] text-white font-bold py-4 rounded-full hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}

      {/* 6. MOBILE SLIDE-OUT MENU */}
      <div className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`fixed top-0 left-0 w-[80%] max-w-sm h-full bg-white z-[70] p-6 shadow-2xl transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
            <h1 className="text-2xl font-black text-red-600">HomBox</h1>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} className="text-gray-600" /></button>
          </div>
          <div className="flex flex-col gap-6 text-lg font-medium text-gray-800">
            <div className="flex items-center gap-3 hover:text-red-600 cursor-pointer p-2 rounded-lg hover:bg-red-50"><User size={20} /> Sign In / Register</div>
            <div className="flex items-center gap-3 hover:text-red-600 cursor-pointer p-2 rounded-lg hover:bg-red-50"><Package size={20} /> My Orders</div>
            <hr className="my-2 border-gray-100" />
            <span className="hover:text-red-600 cursor-pointer pl-2">Account Settings</span>
            <span className="hover:text-red-600 cursor-pointer pl-2">Help Center</span>
          </div>
        </div>
      </div>

    </div>
  );
}