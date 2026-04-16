"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Lock, Bell, Shield, ChevronRight, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = () => {
    toast.success('Settings updated successfully!');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans pb-32">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-40">
        <div className="max-w-[1000px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Link href="/account" className="hover:text-red-600 transition-colors">My Account</Link> 
            <ChevronRight size={12} /> <span className="text-gray-900">Settings</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 mt-12 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-[1.5rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 p-3">
            <button 
              onClick={() => setActiveTab('profile')} 
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all text-sm ${activeTab === 'profile' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <User size={18} /> Public Profile
            </button>
            <button 
              onClick={() => setActiveTab('security')} 
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all text-sm ${activeTab === 'security' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Lock size={18} /> Account Security
            </button>
            <button 
              onClick={() => setActiveTab('notifications')} 
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all text-sm ${activeTab === 'notifications' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Bell size={18} /> Notifications
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 p-8 md:p-12">
          
          {activeTab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h1 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Public Profile</h1>
              <div className="flex items-center gap-6 mb-10">
                <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center text-white text-4xl font-black shadow-lg">
                  {user ? user.avatar : 'U'}
                </div>
                <button className="px-5 py-2.5 bg-gray-50 border border-gray-200 font-bold text-sm text-gray-900 rounded-full hover:bg-gray-100 transition-colors shadow-sm">Change Photo</button>
              </div>

              <div className="grid gap-6">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Display Name</label>
                  <input type="text" defaultValue={user?.name || ''} className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-gray-900 focus:bg-white transition-all font-bold text-gray-900" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Email Address</label>
                  <input type="email" defaultValue={user?.email || ''} className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-gray-900 focus:bg-white transition-all font-bold text-gray-900" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Phone Number</label>
                  <input type="tel" defaultValue="+234 800 000 0000" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-gray-900 focus:bg-white transition-all font-bold text-gray-900" />
                </div>
              </div>

              <button onClick={handleSave} className="mt-10 bg-gray-900 text-white font-bold px-8 py-4 rounded-2xl hover:bg-black transition-all shadow-xl flex items-center gap-2 ml-auto hover:-translate-y-0.5">
                <Save size={18} /> Save Changes
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h1 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Account Security</h1>
              
              <div className="bg-green-50/50 border border-green-100 text-green-800 p-6 rounded-2xl flex items-start gap-4 mb-10">
                 <Shield className="text-green-600 shrink-0" />
                 <p className="text-sm font-medium leading-relaxed">Your account is well protected. We recommend enabling Two-Factor Authentication for maximum security against unauthorized access.</p>
              </div>

              <div className="grid gap-6 mb-12">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-gray-900 focus:bg-white transition-all text-gray-900 font-mono tracking-widest placeholder:tracking-normal" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-gray-900 focus:bg-white transition-all text-gray-900 font-mono tracking-widest placeholder:tracking-normal" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Confirm New</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-gray-900 focus:bg-white transition-all text-gray-900 font-mono tracking-widest placeholder:tracking-normal" />
                  </div>
                </div>
                <button onClick={handleSave} className="bg-gray-100 text-gray-900 font-bold px-8 py-4 rounded-2xl hover:bg-gray-200 transition-all w-fit mt-2 text-sm shadow-sm">
                  Update Password
                </button>
              </div>

              <div className="border-t border-gray-100 pt-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50/50 p-6 sm:p-8 rounded-[2rem] border border-gray-100 gap-6">
                   <div>
                     <h3 className="font-black text-gray-900 text-lg mb-2">Two-Factor Auth</h3>
                     <p className="text-sm text-gray-500 font-medium">Secure your account via SMS code.</p>
                   </div>
                   <button onClick={handleSave} className="bg-red-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 whitespace-nowrap">Enable 2FA</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h1 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Notification Preferences</h1>
              
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex justify-between items-center mb-6">
                 <div>
                   <h3 className="font-black text-gray-900 text-lg mb-2">Order Updates</h3>
                   <p className="text-sm text-gray-500 font-medium leading-relaxed">Get live tracking info on your purchases.</p>
                 </div>
                 <div className="w-14 h-8 bg-red-600 rounded-full flex items-center p-1 justify-end cursor-pointer transition-colors shadow-inner"><div className="w-6 h-6 bg-white rounded-full shadow-sm"></div></div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex justify-between items-center mb-6">
                 <div>
                   <h3 className="font-black text-gray-900 text-lg mb-2">Promotions & Deals</h3>
                   <p className="text-sm text-gray-500 font-medium leading-relaxed">Weekly discounts, coupons, and flash sales.</p>
                 </div>
                 <div className="w-14 h-8 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer transition-colors shadow-inner"><div className="w-6 h-6 bg-white rounded-full shadow-sm"></div></div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
