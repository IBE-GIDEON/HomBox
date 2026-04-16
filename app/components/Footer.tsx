import React from 'react';
import { ShieldCheck, Truck, CreditCard, HeadphonesIcon, Smartphone, Send } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#e8e8e8] pt-12 pb-8 text-sm font-sans mt-12">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Enterprise Trust Badges */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12 flex flex-wrap lg:flex-nowrap justify-between gap-8 border border-gray-200">
          <div className="flex flex-col items-center text-center flex-1 min-w-[150px]">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center mb-4 text-gray-700 hover:text-black hover:border-black transition-colors cursor-pointer">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
            <h4 className="font-bold text-base text-gray-900 mb-2">Great value</h4>
            <p className="text-xs text-gray-500 leading-relaxed">We offer competitive prices on over 100 million items.</p>
          </div>
          
          <div className="flex flex-col items-center text-center flex-1 min-w-[150px]">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center mb-4 text-gray-700 hover:text-black hover:border-black transition-colors cursor-pointer">
              <Truck size={32} strokeWidth={1.5} />
            </div>
            <h4 className="font-bold text-base text-gray-900 mb-2">Worldwide delivery</h4>
            <p className="text-xs text-gray-500 leading-relaxed">With sites in 5 languages, we ship to over 200 countries & regions.</p>
          </div>
          
          <div className="flex flex-col items-center text-center flex-1 min-w-[150px]">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center mb-4 text-gray-700 hover:text-black hover:border-black transition-colors cursor-pointer">
              <CreditCard size={32} strokeWidth={1.5} />
            </div>
            <h4 className="font-bold text-base text-gray-900 mb-2">Safe payment</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Pay with the world’s most popular and secure payment methods.</p>
          </div>
          
          <div className="flex flex-col items-center text-center flex-1 min-w-[150px]">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center mb-4 text-gray-700 hover:text-black hover:border-black transition-colors cursor-pointer">
              <HeadphonesIcon size={32} strokeWidth={1.5} />
            </div>
            <h4 className="font-bold text-base text-gray-900 mb-2">24/7 Help Center</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Round-the-clock assistance for a smooth shopping experience.</p>
          </div>
          
          <div className="flex flex-col items-center text-center flex-1 min-w-[150px]">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center mb-4 text-gray-700 hover:text-black hover:border-black transition-colors cursor-pointer">
              <Smartphone size={32} strokeWidth={1.5} />
            </div>
            <h4 className="font-bold text-base text-gray-900 mb-2">Shop better</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Download the app for mobile-exclusive features & deals.</p>
          </div>
        </div>

        {/* Multi-column Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-gray-300">
          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-base tracking-tight">Customer Service</h4>
            <ul className="flex flex-col gap-2.5 text-[13px] text-gray-600">
              <li className="hover:text-black hover:underline cursor-pointer transition-colors"><Link href="/help">Help Center</Link></li>
              <li className="hover:text-black hover:underline cursor-pointer transition-colors">Transaction Services</li>
              <li className="hover:text-black hover:underline cursor-pointer transition-colors">Agreement for EU/UK</li>
              <li className="hover:text-black hover:underline cursor-pointer transition-colors">Take our feedback survey</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-base tracking-tight">Shopping with us</h4>
            <ul className="flex flex-col gap-2.5 text-[13px] text-gray-600">
              <li className="hover:text-black hover:underline cursor-pointer transition-colors">Making payments</li>
              <li className="hover:text-black hover:underline cursor-pointer transition-colors"><Link href="/track">Delivery options / Track Order</Link></li>
              <li className="hover:text-black hover:underline cursor-pointer transition-colors">Buyer Protection</li>
              <li className="hover:text-black hover:underline cursor-pointer transition-colors">New User Guide</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-base tracking-tight">Collaborate with us</h4>
            <ul className="flex flex-col gap-2.5 text-[13px] text-gray-600">
              <li className="hover:text-black hover:underline cursor-pointer transition-colors">Partnerships</li>
              <li className="hover:text-black hover:underline cursor-pointer transition-colors">Affiliate program</li>
              <li className="hover:text-black hover:underline cursor-pointer transition-colors"><Link href="/sell">Seller Log In</Link></li>
              <li className="hover:text-black hover:underline cursor-pointer transition-colors">B2B Trade</li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="font-bold text-gray-900 mb-5 text-base tracking-tight">Subscribe to our newsletter</h4>
            <div className="flex border border-gray-400 bg-white rounded-sm overflow-hidden w-full max-w-sm focus-within:border-black mb-6">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full px-4 py-2.5 outline-none text-[13px]"
              />
              <button className="bg-gray-800 text-white px-6 font-bold hover:bg-black transition-colors flex items-center justify-center">
                <Send size={16} />
              </button>
            </div>
            
            <h4 className="font-bold text-gray-900 mb-4 text-base tracking-tight">Connect with us</h4>
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] cursor-pointer transition-all shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </div>
              <div className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] cursor-pointer transition-all shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </div>
              <div className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] cursor-pointer transition-all shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </div>
              <div className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] cursor-pointer transition-all shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 6 3.4 5 4.5 5h15c1.1 0 2 .9 2 2.1v9.8c0 1.1-.9 2.1-2 2.1h-15c-1.1 0-2-.9-2-2.1V7.1z"/><path d="m10 15 5-3-5-3v6z"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Global Links & Bottom Bar */}
        <div className="pt-8">
          <div className="flex flex-wrap gap-4 text-[12px] text-gray-500 mb-6 justify-center md:justify-start">
             <span className="hover:text-black cursor-pointer hover:underline">Alibaba Group</span>
             <span>|</span>
             <span className="hover:text-black cursor-pointer hover:underline">Taobao Marketplace</span>
             <span>|</span>
             <span className="hover:text-black cursor-pointer hover:underline">Tmall</span>
             <span>|</span>
             <span className="hover:text-black cursor-pointer hover:underline">Juhuasuan</span>
             <span>|</span>
             <span className="hover:text-black cursor-pointer hover:underline">AliExpress</span>
             <span>|</span>
             <span className="hover:text-black cursor-pointer hover:underline">Alibaba Cloud</span>
             <span>|</span>
             <span className="hover:text-black cursor-pointer hover:underline">Alipay</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-500">
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
              <Link href="/privacy" className="hover:text-black cursor-pointer underline">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-black cursor-pointer underline">Terms of Service</Link>
              <Link href="/refunds" className="hover:text-black cursor-pointer underline">Refund Policy</Link>
            </div>
            <p>© 2026 HomBox. All rights reserved.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
