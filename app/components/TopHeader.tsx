import React from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function TopHeader() {
  return (
    <div className="bg-black text-white text-xs py-1.5 px-4 justify-between items-center hidden md:flex">
      <div className="flex gap-4">
        <Link href="/sell" className="hover:text-gray-300 cursor-pointer">Sell on Store</Link>
        <Link href="/help" className="hover:text-gray-300 cursor-pointer">Help Center</Link>
        <Link href="/track" className="hover:text-gray-300 cursor-pointer">Track Order</Link>
      </div>
      <div className="flex gap-4 items-center">
        <span className="hover:text-gray-300 cursor-pointer flex items-center gap-1">Ship to 🇳🇬 <ChevronDown size={12}/></span>
        <span className="hover:text-gray-300 cursor-pointer flex items-center gap-1">English <ChevronDown size={12}/></span>
        <span className="hover:text-gray-300 cursor-pointer flex items-center gap-1">NGN <ChevronDown size={12}/></span>
      </div>
    </div>
  );
}