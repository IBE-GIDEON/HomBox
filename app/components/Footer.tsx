import React from 'react';
import Link from 'next/link';


export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 text-sm">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* Top Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-900"> </div>
            <div>
              <h4 className="font-bold text-lg text-gray-900">24/7 Help Center</h4>
              <p className="text-gray-500">Round-the-clock assistance for a smooth shopping experience.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-900"></div>
            <div>
              <h4 className="font-bold text-lg text-gray-900">Safe Payment</h4>
              <p className="text-gray-500">Pay with the world’s most popular and secure payment methods.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-900"></div>
            <div>
              <h4 className="font-bold text-lg text-gray-900">Nationwide Delivery</h4>
              <p className="text-gray-500">Fast and reliable shipping to all 36 states in Nigeria.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12">
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-base">Customer Service</h4>
            <ul className="flex flex-col gap-3 text-gray-600">
              <li className="hover:text-red-600 cursor-pointer">Help Center</li>
              <li className="hover:text-red-600 cursor-pointer">Transaction Services</li>
              <li className="hover:text-red-600 cursor-pointer">Agreement for EU/UK</li>
              <li className="hover:text-red-600 cursor-pointer">Take our feedback survey</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-base">Shopping with us</h4>
            <ul className="flex flex-col gap-3 text-gray-600">
              <li className="hover:text-red-600 cursor-pointer">Making payments</li>
              <li className="hover:text-red-600 cursor-pointer">Delivery options</li>
              <li className="hover:text-red-600 cursor-pointer">Buyer Protection</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-base">Collaborate with us</h4>
            <ul className="flex flex-col gap-3 text-gray-600">
              <li className="hover:text-red-600 cursor-pointer">Partnerships</li>
              <li className="hover:text-red-600 cursor-pointer">Affiliate program</li>
              <li className="hover:text-red-600 cursor-pointer">Seller Log In</li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6 text-base">Stay connected</h4>
            <div className="flex gap-4 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white cursor-pointer transition-colors"></div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white cursor-pointer transition-colors"></div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white cursor-pointer transition-colors"></div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white cursor-pointer transition-colors"></div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 text-gray-500 gap-4">
          <p>© 2026 HomBox. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-gray-900 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-900 cursor-pointer">Terms of Use</span>
            <span className="hover:text-gray-900 cursor-pointer">Legal Enquiry Guide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}