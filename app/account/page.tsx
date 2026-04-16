"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Package, Heart, Ticket, Settings, LogOut, 
  Search, Truck, CheckCircle2, MapPin,
  MessageSquare, Wallet, Coins, Headset, Star, Store,
  ChevronRight, Box, CreditCard as CardIcon
} from 'lucide-react';
import { useOrderStore } from '../store/orderStore';
import { useAuthStore } from '../store/authStore';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('All');
  const { orders } = useOrderStore();
  const { user, logout } = useAuthStore();

  const orderTabs = [
    { id: 'All', label: 'All Orders' },
    { id: 'Unpaid', label: 'Unpaid' },
    { id: 'Processing', label: 'Processing' },
    { id: 'Shipped', label: 'Shipped' },
    { id: 'Review', label: 'To Review' }
  ];

  /* REMOVED DUMMY ORDERS - Reading directly from OrderStore now! */

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans pb-20 pt-6">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col lg:flex-row gap-6">
        
        {/* 1. LEFT SIDEBAR */}
        <aside className="w-full lg:w-[260px] flex-shrink-0">
          
          {/* User Profile Widget */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-4 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-red-600 to-orange-500"></div>
            <div className="relative pt-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-3 shadow-[0_0_0_4px_rgba(255,255,255,1)]">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-white text-2xl font-black">
                  {user ? user.avatar : 'G'}
                </div>
              </div>
              <h2 className="font-black text-gray-900 text-lg">{user ? user.name : 'Guest User'}</h2>
              <div className="flex items-center gap-1 bg-[#fff0f0] text-red-600 px-3 py-1 rounded-full text-xs font-bold mt-2">
                <Star size={12} className="fill-red-600" /> {user ? 'Diamond Member' : 'Register Now'}
              </div>
              
              <div className="flex items-center justify-evenly w-full mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-col items-center cursor-pointer group/stat">
                  <span className="font-black text-gray-900 text-lg group-hover/stat:text-red-600 transition-colors">12</span>
                  <span className="text-[11px] text-gray-500 font-medium">Following</span>
                </div>
                <div className="w-px h-8 bg-gray-100"></div>
                <div className="flex flex-col items-center cursor-pointer group/stat">
                  <span className="font-black text-gray-900 text-lg group-hover/stat:text-red-600 transition-colors">45</span>
                  <span className="text-[11px] text-gray-500 font-medium">Reviews</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar Menu */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
            <nav className="flex flex-col py-2">
              <Link href="/account" className="flex items-center justify-between px-6 py-3.5 bg-red-50 text-red-600 font-bold border-r-4 border-red-600">
                <div className="flex items-center gap-3"><Package size={18} /> My Orders</div>
              </Link>
              <Link href="/wishlist" className="flex items-center justify-between px-6 py-3.5 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors font-medium">
                <div className="flex items-center gap-3"><Heart size={18} /> Wish List</div>
              </Link>
              <Link href="#" className="flex items-center justify-between px-6 py-3.5 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors font-medium">
                <div className="flex items-center gap-3"><MessageSquare size={18} /> Messages <div className="bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full ml-1 font-bold">2</div></div>
              </Link>
              <Link href="#" className="flex items-center justify-between px-6 py-3.5 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors font-medium">
                <div className="flex items-center gap-3"><Wallet size={18} /> Payment Methods</div>
              </Link>
              <Link href="#" className="flex items-center justify-between px-6 py-3.5 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors font-medium">
                <div className="flex items-center gap-3"><MapPin size={18} /> Shipping Addresses</div>
              </Link>
              <Link href="/settings" className="flex items-center justify-between px-6 py-3.5 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors font-medium">
                <div className="flex items-center gap-3"><Settings size={18} /> Settings</div>
              </Link>
            </nav>
          </div>

          {/* Help Center CTA */}
          <Link href="/help">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 text-white text-center relative overflow-hidden shadow-lg mb-4 cursor-pointer hover:shadow-xl transition-shadow">
               <div className="absolute top-0 right-0 opacity-10"><Headset size={100} className="-mr-6 -mt-6" /></div>
               <Headset size={24} className="mb-3 mx-auto text-red-500" />
               <h3 className="font-bold text-sm mb-1 z-10 relative">Need help?</h3>
               <p className="text-xs text-gray-400 z-10 relative">24/7 Customer Service</p>
            </div>
          </Link>

          <button onClick={logout} className="w-full flex items-center justify-center gap-2 bg-white rounded-2xl p-4 shadow-sm text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors font-bold group">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> Sign Out
          </button>
        </aside>

        {/* 2. MAIN CONTENT */}
        <main className="flex-1 space-y-6">
          
          {/* Quick Stats / Wallet Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-center">
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-xl text-gray-900">₦0.00</span>
                <Wallet className="text-blue-500" size={24} />
              </div>
              <span className="text-xs font-medium text-gray-500">Wallet Balance</span>
            </div>
            
            <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-center">
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-xl text-gray-900">3</span>
                <Ticket className="text-red-500" size={24} />
              </div>
              <span className="text-xs font-medium text-gray-500">My Coupons</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-center">
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-xl text-gray-900">450</span>
                <Coins className="text-amber-500" size={24} />
              </div>
              <span className="text-xs font-medium text-gray-500">Coins</span>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-center">
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-xl text-gray-900">1</span>
                <CardIcon className="text-emerald-500" size={24} />
              </div>
              <span className="text-xs font-medium text-gray-500">Cards Saved</span>
            </div>
          </div>

          {/* Quick Order Status Bar */}
          <div className="bg-white rounded-2xl shadow-sm p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-black text-gray-900">My Orders</h1>
              <span className="text-sm text-gray-500 hover:text-red-600 cursor-pointer flex items-center transition-colors font-medium">View all <ChevronRight size={16}/></span>
            </div>
            
            <div className="flex justify-between md:justify-around items-center border-t border-gray-50 pt-6 px-2">
              <div className="flex flex-col items-center gap-3 cursor-pointer group relative w-1/4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                    <CardIcon size={24} strokeWidth={1.5} />
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-700 group-hover:text-red-600 transition-colors text-center">Unpaid</span>
              </div>
              
              <div className="flex flex-col items-center gap-3 cursor-pointer group relative w-1/4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                    <Box size={24} strokeWidth={1.5} />
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-700 group-hover:text-red-600 transition-colors text-center">To Ship</span>
              </div>

              <div className="flex flex-col items-center gap-3 cursor-pointer group relative w-1/4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                    <Truck size={24} strokeWidth={1.5} />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">1</div>
                </div>
                <span className="text-xs font-medium text-gray-700 group-hover:text-red-600 transition-colors text-center">Shipped</span>
              </div>

              <div className="flex flex-col items-center gap-3 cursor-pointer group relative w-1/4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                    <Star size={24} strokeWidth={1.5} />
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-700 group-hover:text-red-600 transition-colors text-center">To Review</span>
              </div>
            </div>
          </div>

          {/* Orders List Container */}
          <div className="bg-white rounded-2xl shadow-sm border-transparent overflow-hidden">
            
            {/* Context Header & Search */}
            <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {orderTabs.map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full font-bold text-sm transition-all ${
                      activeTab === tab.id 
                        ? 'bg-black text-white hover:bg-gray-800 shadow-md' 
                        : 'bg-transparent border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center border border-gray-300 bg-white rounded-full px-4 py-2 w-full md:w-64 focus-within:border-red-600 transition-colors shadow-sm">
                <input type="text" placeholder="Search orders..." className="w-full outline-none text-sm text-gray-700 bg-transparent" />
                <Search size={16} className="text-gray-400" />
              </div>
            </div>

            {/* Rendered Order Items */}
            <div className="flex flex-col">
              {orders.map((order, idx) => (
                <div key={order.id} className={`p-6 hover:bg-gray-50/30 transition-colors ${idx !== orders.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  
                  {/* Store & Order Header */}
                  <div className="flex flex-wrap justify-between items-center gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                       <Store size={16} className="text-gray-900" />
                       <span className="font-bold text-gray-900">{order.storeName}</span>
                       <ChevronRight size={14} className="text-gray-400" />
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 font-medium">Order: {order.id}</span>
                      <div className="h-3 w-px bg-gray-300"></div>
                      <div className="font-bold flex items-center gap-1.5">
                        {order.status === 'Delivered' ? (
                          <><CheckCircle2 size={16} className="text-green-600"/><span className="text-green-600">Delivered</span></>
                        ) : (
                          <><Truck size={16} className="text-orange-500" /><span className="text-orange-500">Shipped</span></>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Products */}
                  <div className="bg-gray-50/80 rounded-xl p-4 mb-4 border border-gray-100">
                    {order.items.map((item, idxx) => (
                      <div key={idxx} className="flex gap-4">
                        <div className="w-24 h-24 bg-white rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 relative">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 py-1">
                          <h3 className="font-medium text-gray-900 line-clamp-2 pr-4 leading-snug">{item.name}</h3>
                          <div className="mt-2 text-xs flex gap-2">
                             <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-medium">Qty: {item.quantity}</span>
                          </div>
                          <div className="font-black text-gray-900 text-lg mt-2">{item.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="text-sm font-medium text-gray-600">
                      Total: <span className="font-black text-lg text-gray-900 ml-1">{order.total}</span>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-300 rounded-full font-bold text-gray-700 hover:bg-gray-100 transition-colors text-sm shadow-sm">
                        Track Order
                      </button>
                      {order.status !== 'Delivered' ? (
                        <button className="flex-1 sm:flex-none px-6 py-2.5 bg-[#ff4747] text-white rounded-full font-bold hover:bg-red-700 transition-colors text-sm shadow-md shadow-red-600/20">
                          Confirm Receipt
                        </button>
                      ) : (
                        <button className="flex-1 sm:flex-none px-6 py-2.5 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors text-sm shadow-md">
                          Leave Review
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="p-6 border-t border-gray-100 flex justify-center bg-gray-50/50">
              <button className="px-6 py-2 border border-gray-300 rounded-full text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors shadow-sm bg-white">Hide previous orders</button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}