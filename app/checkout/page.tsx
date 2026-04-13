"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Lock, CreditCard, Landmark, Truck, 
  ChevronLeft, CheckCircle2 
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function CheckoutPage() {
  const { items, getTotalItems } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalItems = getTotalItems();

  // Calculate Subtotal
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
      return total + (numericPrice * item.quantity);
    }, 0);
  };

  const subtotal = calculateTotal();
  const shippingFee = subtotal > 0 ? 1500 : 0; // Flat ₦1,500 shipping
  const finalTotal = subtotal + shippingFee;

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Mock Payment Function
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Fake a 2-second payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // In a real app, you would call useCartStore.getState().clearCart() here
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center animate-in zoom-in duration-500">
          <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-black text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">Your order has been placed successfully. We will send you a confirmation email shortly.</p>
          <Link href="/">
            <button className="w-full bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-colors">
              Return to Homepage
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] font-sans pb-20">
      {/* 1. SIMPLE CHECKOUT HEADER */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/cart" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors font-medium">
            <ChevronLeft size={20} /> Back to Cart
          </Link>
          <Link href="/" className="text-2xl font-black tracking-tighter text-red-600">
            HomBox
          </Link>
          <div className="flex items-center gap-2 text-green-600 text-sm font-bold">
            <Lock size={16} /> Secure Checkout
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: Forms */}
        <div className="flex-1">
          <form onSubmit={handlePayment} id="checkout-form">
            
            {/* Shipping Address Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                Shipping Address
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">First Name</label>
                  <input required type="text" className="border border-gray-300 rounded-lg p-3 focus:border-red-600 outline-none" placeholder="Gideon" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Last Name</label>
                  <input required type="text" className="border border-gray-300 rounded-lg p-3 focus:border-red-600 outline-none" placeholder="Ibe" />
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">Street Address</label>
                  <input required type="text" className="border border-gray-300 rounded-lg p-3 focus:border-red-600 outline-none" placeholder="123 Startup Avenue" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">City</label>
                  <input required type="text" className="border border-gray-300 rounded-lg p-3 focus:border-red-600 outline-none" placeholder="Port Harcourt" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Phone Number</label>
                  <input required type="tel" className="border border-gray-300 rounded-lg p-3 focus:border-red-600 outline-none" placeholder="+234 800 000 0000" />
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                Payment Method
              </h2>

              <div className="flex flex-col gap-3">
                {/* Option: Card */}
                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 accent-red-600" />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 flex items-center gap-2"><CreditCard size={18}/> Pay with Card (Paystack/Flutterwave)</div>
                    <div className="text-xs text-gray-500 mt-1">Visa, MasterCard, Verve</div>
                  </div>
                </label>

                {/* Option: Bank Transfer */}
                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'transfer' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="w-5 h-5 accent-red-600" />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 flex items-center gap-2"><Landmark size={18}/> Bank Transfer</div>
                    <div className="text-xs text-gray-500 mt-1">Automated transfer to a dedicated account</div>
                  </div>
                </label>

                {/* Option: Pay on Delivery */}
                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'pod' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'pod'} onChange={() => setPaymentMethod('pod')} className="w-5 h-5 accent-red-600" />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 flex items-center gap-2"><Truck size={18}/> Pay on Delivery</div>
                    <div className="text-xs text-gray-500 mt-1">Pay with cash or POS when your item arrives</div>
                  </div>
                </label>
              </div>

              {/* Fake Card Details Form (Only shows if Card is selected) */}
              {paymentMethod === 'card' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase">Card Number</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full mt-1 border border-gray-300 rounded p-2.5 outline-none focus:border-red-600 font-mono text-sm" />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full mt-1 border border-gray-300 rounded p-2.5 outline-none focus:border-red-600 font-mono text-sm" />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">CVV</label>
                        <input type="password" placeholder="123" maxLength={3} className="w-full mt-1 border border-gray-300 rounded p-2.5 outline-none focus:border-red-600 font-mono text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Order Summary</h2>
            
            {/* Mini Cart Display */}
            <div className="flex flex-col gap-4 mb-6 max-h-[250px] overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border border-gray-200" />
                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-sm text-gray-800 line-clamp-1">{item.name}</span>
                    <span className="font-bold text-gray-900">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-gray-100 mb-4" />

            <div className="flex flex-col gap-3 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-medium text-gray-900">{formatMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping fee</span>
                <span className="font-medium text-gray-900">{formatMoney(shippingFee)}</span>
              </div>
            </div>

            <hr className="border-gray-100 mb-4" />

            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-900 font-bold">Total</span>
              <div className="text-right">
                <span className="text-xs text-gray-500 block">NGN</span>
                <span className="text-3xl font-black text-red-600">{formatMoney(finalTotal)}</span>
              </div>
            </div>

            <button 
              form="checkout-form"
              type="submit"
              disabled={isProcessing || items.length === 0}
              className="w-full bg-[#ff0000] text-white font-bold py-4 rounded-full hover:bg-red-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                `Pay ${formatMoney(finalTotal)}`
              )}
            </button>

            <div className="mt-6 flex items-start gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
              <ShieldCheck size={24} className="text-green-600 shrink-0" />
              <p className="text-xs text-gray-600 leading-relaxed">
                Payments are securely processed. We do not store your full card details on our servers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}