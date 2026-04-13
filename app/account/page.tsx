"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Package, Heart, Ticket, Settings, LogOut, 
  Search, Truck, CheckCircle2, Clock, MapPin, ChevronRight
} from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('All Orders');

  const tabs = ['All Orders', 'Unpaid', 'To be shipped', 'Shipped', 'To be reviewed'];

  // Dummy order data (In production, fetch this from Supabase where user_id matches)
  const orders = [
    {
      id: "ORD-84729104",
      date: "April 10, 2026",
      status: "Shipped",
      total: "₦8,500.00",
      trackingStep: 3, // 1: Ordered, 2: Packed, 3: Shipped, 4: Delivered
      items: [
        {
          name: "Luxury Smart Watch Men Women Bluetooth Call...",
          price: "₦8,500.00",
          quantity: 1,
          image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=200"
        }
      ]
    },
    {
      id: "ORD-39281177",
      date: "March 28, 2026",
      status: "Delivered",
      total: "₦12,000.00",
      trackingStep: 4,
      items: [
        {
          name: "Wireless Noise Cancelling Earbuds BT5.4 HiFi Sound",
          price: "₦12,000.00",
          quantity: 1,
          image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=200"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f2f2f2] font-sans pb-20 pt-8">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col lg:flex-row gap-6">
        
        {/* 1. LEFT SIDEBAR: User Account Menu */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-white text-xl font-bold border-2 border-gray-200">
                G
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Gideon Ibe</h2>
                <p className="text-xs text-gray-500">Free Member</p>
              </div>
            </div>
            
            <nav className="flex flex-col gap-1">
              <Link href="/account" className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-red-50 text-red-600 font-bold transition-colors">
                <div className="flex items-center gap-3"><Package size={18} /> My Orders</div>
              </Link>
              <Link href="#" className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors">
                <div className="flex items-center gap-3"><Heart size={18} /> Wish List</div>
              </Link>
              <Link href="#" className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors">
                <div className="flex items-center gap-3"><Ticket size={18} /> Coupons</div>
              </Link>
              <Link href="#" className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors">
                <div className="flex items-center gap-3"><Settings size={18} /> Account Settings</div>
              </Link>
            </nav>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors font-bold">
            <LogOut size={18} /> Sign Out
          </button>
        </aside>

        {/* 2. MAIN CONTENT: Orders & Tracking */}
        <main className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Dashboard Header & Search */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-2xl font-black text-gray-900">My Orders</h1>
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-full md:w-72 focus-within:border-red-600 transition-colors">
                <input type="text" placeholder="Search order ID or item..." className="w-full outline-none text-sm text-gray-700" />
                <Search size={16} className="text-gray-400" />
              </div>
            </div>

            {/* Order Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-100 hide-scrollbar">
              {tabs.map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-6 py-4 font-bold text-sm transition-colors border-b-2 ${
                    activeTab === tab ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Order List */}
            <div className="p-6 flex flex-col gap-6 bg-gray-50/50">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  
                  {/* Order Header */}
                  <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4 text-sm">
                    <div className="flex items-center gap-6">
                      <div><span className="text-gray-500">Order ID:</span> <span className="font-bold text-gray-900">{order.id}</span></div>
                      <div><span className="text-gray-500">Date:</span> <span className="font-medium text-gray-900">{order.date}</span></div>
                    </div>
                    <div className="font-bold text-red-600 flex items-center gap-1">
                      {order.status === 'Delivered' ? <CheckCircle2 size={16} className="text-green-600"/> : <Truck size={16} />}
                      {order.status === 'Delivered' ? <span className="text-green-600">Delivered</span> : 'Shipped'}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6 border-b border-gray-100">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 line-clamp-2 pr-4">{item.name}</h3>
                          <p className="text-gray-500 text-sm mt-1">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-black text-gray-900">{item.price}</div>
                      </div>
                    ))}
                  </div>

                  {/* Order Tracking Timeline & Actions */}
                  <div className="p-6 bg-white">
                    {/* Visual Progress Bar */}
                    <div className="relative max-w-3xl mx-auto mb-8 mt-2">
                      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
                      <div 
                        className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 rounded-full transition-all duration-1000"
                        style={{ width: `${(order.trackingStep - 1) * 33.33}%` }}
                      ></div>
                      
                      <div className="relative flex justify-between">
                        {/* Step 1: Ordered */}
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white relative z-10 ${order.trackingStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-300 text-white'}`}>
                            <Clock size={14} />
                          </div>
                          <span className={`text-xs font-bold ${order.trackingStep >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>Ordered</span>
                        </div>
                        {/* Step 2: Packed */}
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white relative z-10 ${order.trackingStep >= 2 ? 'bg-green-500 text-white' : 'bg-gray-300 text-white'}`}>
                            <Package size={14} />
                          </div>
                          <span className={`text-xs font-bold ${order.trackingStep >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>Packed</span>
                        </div>
                        {/* Step 3: Shipped */}
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white relative z-10 ${order.trackingStep >= 3 ? 'bg-green-500 text-white' : 'bg-gray-300 text-white'}`}>
                            <Truck size={14} />
                          </div>
                          <span className={`text-xs font-bold ${order.trackingStep >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>Shipped</span>
                        </div>
                        {/* Step 4: Delivered */}
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white relative z-10 ${order.trackingStep >= 4 ? 'bg-green-500 text-white' : 'bg-gray-300 text-white'}`}>
                            <MapPin size={14} />
                          </div>
                          <span className={`text-xs font-bold ${order.trackingStep >= 4 ? 'text-gray-900' : 'text-gray-400'}`}>Delivered</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div className="text-sm text-gray-600">
                        Order Total: <span className="font-black text-xl text-gray-900 ml-1">{order.total}</span>
                      </div>
                      <div className="flex gap-3 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none px-6 py-2 border border-gray-300 rounded-full font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                          Track Item
                        </button>
                        {order.status !== 'Delivered' ? (
                          <button className="flex-1 sm:flex-none px-6 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors">
                            Confirm Receipt
                          </button>
                        ) : (
                          <button className="flex-1 sm:flex-none px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors">
                            Leave Review
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}