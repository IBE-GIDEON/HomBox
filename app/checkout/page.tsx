"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, CreditCard, Landmark, Truck, ChevronLeft, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import { useAuthStore } from '../store/authStore';

export default function CheckoutPage() {
  const { items, getTotalItems, clearCart } = useCartStore();
  const addOrder = useOrderStore((state) => state.addOrder);
  const { user } = useAuthStore();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [activeStep, setActiveStep] = useState(2);

  const totalItems = getTotalItems();

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
      return total + (numericPrice * item.quantity);
    }, 0);
  };

  const subtotal = calculateTotal();
  const shippingFee = subtotal > 0 ? 1500 : 0; 
  const finalTotal = subtotal + shippingFee;

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing delay
    await new Promise(r => setTimeout(r, 2000));

    const newOrderId = `ORD-${Math.floor(Math.random() * 90000000) + 10000000}`;
    const newOrder = {
      id: newOrderId,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Processing' as const,
      storeName: 'HomBox Verified Shipping',
      total: formatMoney(finalTotal),
      trackingStep: 1,
      items: items,
      customerEmail: user?.email,
      customerName: user?.name,
    };
    
    // Save to local orderStore (browser)
    addOrder(newOrder);
    
    // Save to JSON database (server-side for admin)
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
    } catch (err) {
      console.error('Failed to persist order to DB:', err);
    }
    
    clearCart();
    setOrderId(newOrderId);
    setIsProcessing(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-12 rounded-xl shadow-lg max-w-lg w-full text-center animate-in zoom-in duration-500 border border-gray-200">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Order Confirmed</h1>
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-4 font-mono text-sm text-gray-700 font-bold">{orderId}</div>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">Your order is being processed. A confirmation will be sent to {user?.email || 'your email'}.</p>
          <Link href="/account">
            <button className="w-full bg-zinc-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-md text-base">
              Track My Order
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans pb-32">
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-40">
        <div className="max-w-[1300px] mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/cart" className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors font-bold uppercase tracking-widest text-xs">
            <ChevronLeft size={16} /> Back to Cart
          </Link>
          <Link href="/" className="text-3xl font-black tracking-tighter text-gray-900">
            HomBox<span className="text-red-500">.</span>
          </Link>
          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold tracking-widest uppercase">
            <Lock size={14} /> Secure
          </div>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 mt-12 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* LEFT COLUMN: Checkout Flow */}
        <div className="flex-[1.2]">
          
          {/* Visual Stepper */}
          <div className="flex items-center gap-4 mb-12 text-sm font-bold uppercase tracking-widest">
             <div className="flex items-center gap-2 text-gray-400">Cart <ChevronRight size={14} /></div>
             <div className="flex items-center gap-2 text-gray-900">Information <ChevronRight size={14} className="text-gray-400" /></div>
             <div className="flex items-center gap-2 text-gray-400">Payment</div>
          </div>

          <form onSubmit={handlePayment} id="checkout-form">
            
            {/* Express Checkout Options */}
            <div className="mb-12">
               <h2 className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Express Checkout</h2>
               <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 bg-black text-white h-14 rounded-xl flex items-center justify-center font-bold text-lg cursor-pointer hover:bg-gray-800 transition-colors">
                     Apple Pay
                  </div>
                  <div className="flex-1 bg-[#1A73E8] text-white h-14 rounded-xl flex items-center justify-center font-bold text-lg cursor-pointer hover:bg-[#155DB1] transition-colors">
                     Google Pay
                  </div>
               </div>
               <div className="relative mt-10 mb-8">
                 <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                 <div className="relative flex justify-center"><span className="bg-[#fafafa] px-6 text-xs font-bold uppercase tracking-widest text-gray-400">Or pay with card</span></div>
               </div>
            </div>

            {/* Information Section */}
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm border border-gray-200 mb-8">
              <div className="flex items-center justify-between mb-8 cursor-pointer group" onClick={() => setActiveStep(1)}>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Shipping Information</h2>
                {activeStep === 2 && <span className="text-sm font-bold text-red-600 hover:text-red-700">Edit</span>}
              </div>
              
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-300 ${activeStep === 1 ? 'opacity-100 block' : 'opacity-50 pointer-events-none hidden'}`}>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">First Name</label>
                  <input required type="text" className="border border-gray-200 bg-white rounded-lg p-4 focus:border-gray-900 outline-none transition-colors" defaultValue="Gideon" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Last Name</label>
                  <input required type="text" className="border border-gray-200 bg-white rounded-lg p-4 focus:border-gray-900 outline-none transition-colors" defaultValue="Ibe" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Street Address</label>
                  <input required type="text" className="border border-gray-200 bg-white rounded-lg p-4 focus:border-gray-900 outline-none transition-colors" defaultValue="123 Startup Avenue" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">City</label>
                  <input required type="text" className="border border-gray-200 bg-white rounded-lg p-4 focus:border-gray-900 outline-none transition-colors" defaultValue="Port Harcourt" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Phone Number</label>
                  <input required type="tel" className="border border-gray-200 bg-white rounded-lg p-4 focus:border-gray-900 outline-none transition-colors" defaultValue="+234 800 000 0000" />
                </div>
              </div>
              
              {activeStep === 2 && (
                <div className="text-sm font-medium text-gray-600">
                  Gideon Ibe <br/> 123 Startup Avenue, Port Harcourt <br/> +234 800 000 0000
                </div>
              )}
            </div>

            <div className={`bg-white rounded-xl p-8 md:p-10 shadow-sm border border-gray-200 transition-all ${activeStep === 2 ? 'ring-2 ring-gray-900 border-transparent shadow-md' : ''}`}>
              <h2 className="text-xl font-black text-gray-900 tracking-tight mb-8">Payment Method</h2>

              <div className="flex flex-col gap-4">
                {/* Credit Card */}
                <div 
                  className={`border-2 rounded-2xl overflow-hidden transition-all ${paymentMethod === 'card' ? 'border-gray-900 bg-white' : 'border-gray-100 bg-gray-50/50 hover:border-gray-300 cursor-pointer'}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="p-6 flex items-center gap-4">
                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'card' ? 'border-gray-900 bg-gray-900' : 'border-gray-300'}`}>
                       {paymentMethod === 'card' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                     </div>
                     <span className="font-bold text-gray-900 text-lg">Credit / Debit Card</span>
                     <CreditCard size={24} className="ml-auto text-gray-400" />
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="p-6 pt-0 animate-in fade-in slide-in-from-top-4">
                       {/* Animated Mock Card Graphic */}
                       <div className="bg-[#111] text-white p-6 rounded-xl mb-8 relative overflow-hidden shadow-md">
                          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                          <div className="flex justify-between items-center mb-6">
                             <div className="w-10 h-7 bg-white/20 rounded-md backdrop-blur-sm"></div>
                             <span className="font-black italic text-lg tracking-wider">VISA</span>
                          </div>
                          <div className="font-mono text-xl tracking-widest mb-3 opacity-90">•••• •••• •••• 4242</div>
                          <div className="flex justify-between font-mono text-[10px] uppercase opacity-70">
                             <span className="tracking-widest">Gideon Ibe</span>
                             <span className="tracking-widest">12/28</span>
                          </div>
                       </div>

                       <div className="grid gap-5">
                          <div>
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Card Number</label>
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full mt-2 border border-gray-200 rounded-xl p-4 outline-none focus:border-gray-900 font-mono focus:bg-gray-50 transition-colors" />
                          </div>
                          <div className="flex gap-5">
                            <div className="flex-1">
                              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Expiry</label>
                              <input type="text" placeholder="MM/YY" className="w-full mt-2 border border-gray-200 rounded-xl p-4 outline-none focus:border-gray-900 font-mono focus:bg-gray-50 transition-colors" />
                            </div>
                            <div className="flex-1">
                              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">CVC</label>
                              <input type="password" placeholder="123" maxLength={3} className="w-full mt-2 border border-gray-200 rounded-xl p-4 outline-none focus:border-gray-900 font-mono focus:bg-gray-50 transition-colors" />
                            </div>
                          </div>
                       </div>
                    </div>
                  )}
                </div>

                {/* Bank Transfer */}
                <div 
                  className={`border-2 rounded-2xl p-6 flex items-center gap-4 transition-all ${paymentMethod === 'transfer' ? 'border-gray-900 bg-white' : 'border-gray-100 bg-gray-50/50 hover:border-gray-300 cursor-pointer'}`}
                  onClick={() => setPaymentMethod('transfer')}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'transfer' ? 'border-gray-900 bg-gray-900' : 'border-gray-300'}`}>
                    {paymentMethod === 'transfer' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-gray-900 text-lg">Bank Transfer</span>
                    <p className="text-gray-500 text-sm mt-1">Make an automated transfer via Paystack</p>
                  </div>
                  <Landmark size={24} className="text-gray-400" />
                </div>
              </div>

            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Floating Summary */}
        <div className="flex-1 lg:max-w-[400px]">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 sticky top-32">
            
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-lg font-black text-gray-900 tracking-tight">Order Summary</h2>
               <span className="bg-gray-100 text-gray-900 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-md">{totalItems} items</span>
            </div>
            
            <div className="flex flex-col gap-6 mb-8 max-h-[300px] overflow-y-auto pr-2 hide-scrollbar">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="relative w-20 h-20 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl border border-gray-100 group-hover:scale-105 transition-transform" />
                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <span className="text-sm font-bold text-gray-900 line-clamp-2 mb-1">{item.name}</span>
                    <span className="font-bold text-gray-500">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <div className="flex justify-between items-center mb-4 text-sm font-medium text-gray-600">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center mb-4 text-sm font-medium text-gray-600">
                <span>Shipping</span>
                <span>{formatMoney(shippingFee)}</span>
              </div>
              <div className="h-px w-full bg-gray-200 mb-4"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-3xl font-black text-gray-900 tracking-tighter">{formatMoney(finalTotal)}</span>
              </div>
            </div>

            <button 
              form="checkout-form"
              type="submit"
              disabled={isProcessing || items.length === 0}
              className="w-full bg-zinc-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center text-base gap-3 group"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  Pay {formatMoney(finalTotal)} <Lock size={16} className="group-hover:scale-110 transition-transform"/>
                </>
              )}
            </button>

            <p className="text-center text-[11px] font-bold text-gray-400 mt-6 uppercase tracking-widest flex justify-center items-center gap-2">
               <ShieldCheck size={14} /> Secured by 256-bit SSL
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}