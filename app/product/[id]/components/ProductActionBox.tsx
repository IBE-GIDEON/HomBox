import React from 'react';
import { Minus, Plus, ShoppingBag, Zap } from 'lucide-react';
import Link from 'next/link';

interface ProductActionBoxProps {
  priceStr: string;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  onAddToCart: () => void;
}

export default function ProductActionBox({ priceStr, quantity, setQuantity, onAddToCart }: ProductActionBoxProps) {
  return (
    <div className="w-full lg:w-[350px] flex-shrink-0">
      <div className="bg-white border border-gray-200 rounded-xl p-8 sticky top-24 z-10 shadow-sm">
        
        <h3 className="font-bold text-gray-500 mb-2 uppercase tracking-widest text-[11px]">Total Target</h3>
        <div className="text-4xl font-black text-gray-900 tracking-tighter mb-8">{priceStr}</div>
        
        <div className="mb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 block mb-3">Quantity</span>
          <div className="flex items-center border border-gray-200 rounded-lg bg-white h-14 overflow-hidden">
            <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="hover:bg-gray-50 text-gray-900 transition-colors h-full px-6 border-r border-gray-200"><Minus size={18} /></button>
            <input type="text" value={quantity} readOnly className="flex-1 h-full text-center outline-none font-bold text-lg text-gray-900 bg-transparent w-16"/>
            <button onClick={() => setQuantity(prev => prev + 1)} className="hover:bg-gray-50 text-gray-900 transition-colors h-full px-6 border-l border-gray-200"><Plus size={18} /></button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={onAddToCart}
            className="w-full bg-white text-gray-900 border border-gray-200 font-bold py-4 rounded-lg hover:border-gray-900 transition-all flex justify-center items-center gap-2 group text-base shadow-sm"
          >
            <ShoppingBag size={18} /> Add to Cart
          </button>
          
          <Link href="/checkout" onClick={onAddToCart} className="block w-full">
            <button 
              className="w-full bg-zinc-900 text-white font-bold py-4 rounded-lg hover:bg-black transition-all flex justify-center items-center gap-2 text-base shadow-md"
            >
             <Zap size={18} className="fill-white" /> Express Checkout
            </button>
          </Link>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6 font-medium">Encrypted checkout processing by Stripe.</p>
      </div>
    </div>
  );
}
