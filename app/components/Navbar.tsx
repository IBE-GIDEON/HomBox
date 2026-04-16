"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, User, Heart, Package, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import AuthModal from './AuthModal';
import { useRouter } from 'next/navigation';
import { useWishlistStore } from '../store/wishlistStore';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalWishlistItems = useWishlistStore((state) => state.getTotalItems());
  const { user, logout } = useAuthStore();
  
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); if(searchQuery) router.push(`/search?q=${searchQuery}`); };

  return (
    <>
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200 shadow-sm relative">
        <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center gap-4 lg:gap-8">
          
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-1 hover:bg-gray-100 rounded-md">
              <Menu size={24} />
            </button>
            <Link href="/" className="text-2xl font-black tracking-tighter text-black hidden sm:block">
              HomBox
            </Link>
          </div>

          <div className="flex-1 hidden md:flex">
            <form onSubmit={handleSearch} className="flex w-full max-w-3xl border-2 border-black rounded-full overflow-hidden h-10">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search for appliances, gadgets, clothes..." 
                className="w-full px-4 outline-none text-sm text-gray-700" 
              />
              <button type="submit" className="bg-black text-white px-8 font-bold hover:bg-gray-800 transition-colors">
                <Search size={18} />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-6 flex-shrink-0 ml-auto h-full text-black">
            <div className="group hidden lg:flex flex-col items-center cursor-pointer h-full justify-center relative px-2">
              <div className="flex flex-col items-center group-hover:text-gray-600 transition-colors">
                {user ? (
                   <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs">{user.avatar}</div>
                ) : (
                   <User size={24} strokeWidth={2.5} />
                )}
                <span className="text-xs font-bold mt-1">{user ? user.name : 'Sign In'}</span>
              </div>

              <div className="absolute top-full right-1/2 translate-x-1/2 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-white z-10"></div>
                <div className="bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100 w-64 p-5 flex flex-col relative mt-1">
                  {!user ? (
                    <>
                      <button onClick={() => setIsAuthModalOpen(true)} className="w-full bg-[#1a1a1a] text-white font-bold py-3 rounded-full hover:bg-black transition-colors mb-3 shadow-md">
                        Sign in
                      </button>
                      <div onClick={() => setIsAuthModalOpen(true)} className="text-center text-sm text-gray-500 hover:text-black mb-4 cursor-pointer font-medium">
                        Register
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center font-bold text-gray-900 mb-1">{user.email}</div>
                      <button onClick={logout} className="w-full bg-gray-100 text-gray-700 font-bold py-2 rounded-full hover:bg-gray-200 transition-colors mb-4 text-sm mt-3">
                        Sign Out
                      </button>
                    </>
                  )}
                  <hr className="border-gray-100 mb-3" />
                  <div className="flex flex-col gap-1 mb-3">
                    <Link href="/account">
                      <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-gray-700 hover:text-black transition-colors cursor-pointer"><Package size={18} /><span className="text-sm font-medium">My Orders</span></div>
                    </Link>
                    <Link href="/wishlist">
                      <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-gray-700 hover:text-black transition-colors cursor-pointer">
                        <Heart size={18} />
                        <span className="text-sm font-medium">Wish List</span>
                        {totalWishlistItems > 0 && <span className="ml-auto bg-gray-100 text-black text-xs font-bold px-2 py-0.5 rounded-full">{totalWishlistItems}</span>}
                      </div>
                    </Link>
                  </div>
                  <hr className="border-gray-100 mb-3" />
                  <div className="flex flex-col gap-1">
                    <Link href="/settings">
                      <div className="p-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">Account Settings</div>
                    </Link>
                    <Link href="/help">
                      <div className="p-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">Help Center</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <Link href="/returns" className="hidden lg:flex flex-col items-center cursor-pointer hover:text-gray-600">
              <Package size={20} />
              <span className="text-[10px] font-medium mt-1">Returns Center</span>
            </Link>
            
            <Link href="/cart" className="flex flex-col items-center cursor-pointer hover:text-gray-600 relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-md">
                  {totalItems}
                </span>
              )}
              <span className="text-[10px] font-medium mt-1 hidden lg:block">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`fixed top-0 left-0 w-[80%] max-w-sm h-full bg-white z-[70] p-6 shadow-2xl transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
            <h1 className="text-2xl font-black text-black">HomBox</h1>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} className="text-gray-600" /></button>
          </div>
          <div className="flex flex-col gap-6 text-lg font-medium text-gray-800">
            {!user ? (
              <button onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 hover:text-black cursor-pointer p-2 rounded-lg hover:bg-gray-50 text-left w-full">
                <User size={20} /> Sign In / Register
              </button>
            ) : (
              <div className="flex items-center gap-3 p-2 text-left w-full">
                <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm">{user.avatar}</div>
                <span className="flex-1 line-clamp-1">{user.email}</span>
              </div>
            )}
            <Link href="/returns" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center gap-3 hover:text-black cursor-pointer p-2 rounded-lg hover:bg-gray-50"><Package size={20} /> Returns & Orders</div>
            </Link>
            <hr className="my-2 border-gray-100" />
            <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="hover:text-black cursor-pointer pl-2 block">Account Settings</span>
            </Link>
            <Link href="/help" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="hover:text-black cursor-pointer pl-2 block mt-3">Help Center</span>
            </Link>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
