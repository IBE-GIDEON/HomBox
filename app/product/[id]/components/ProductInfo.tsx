import React, { useState } from 'react';
import { Star, Truck, ShieldCheck, Heart, Share2, Check, Info } from 'lucide-react';
import { DBProduct } from '../../../../lib/data';

interface ProductInfoProps {
  product: DBProduct;
  isSaved: boolean;
  onToggleSave: () => void;
  formatMoney: (val: number) => string;
}

export default function ProductInfo({ product, isSaved, onToggleSave, formatMoney }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const colors = ["Default", "Obsidian Black", "Titanium Silver"];

  return (
    <div className="flex-1">
      <span className="text-gray-500 font-bold tracking-widest text-[10px] uppercase mb-4 block border border-gray-200 w-fit px-3 py-1 rounded-md bg-white">{product.category || 'Premium Category'}</span>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
        {product.name}
      </h1>
      
      <div className="flex flex-wrap items-center gap-4 text-sm mb-8 pb-8 border-b border-gray-200">
        <div className="flex items-center text-gray-900 font-bold px-3 py-1 rounded-md border border-gray-200">
          <Star size={16} className="fill-gray-900 mr-1.5" />
          {product.rating} (1,284)
        </div>
        <span className="text-gray-300">•</span>
        <span className="text-gray-500 font-medium">{product.sold_count}+ units sold</span>
        
        <div className="ml-auto flex gap-3">
          <button 
            onClick={onToggleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all border ${isSaved ? 'border-gray-900 bg-gray-900 text-white font-bold' : 'border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900 bg-white'}`}
          >
            <Heart size={18} className={isSaved ? 'fill-white' : ''}/> 
            {isSaved ? 'Saved' : 'Save'}
          </button>
          <button className="w-11 h-11 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-all"><Share2 size={18}/></button>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-end gap-4 mb-3">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">{formatMoney(product.price)}</h2>
          <span className="text-xl text-gray-400 line-through font-medium mb-1.5">{formatMoney(product.original_price)}</span>
          <span className="bg-gray-100 text-gray-900 border border-gray-200 font-bold px-3 py-1 rounded text-[10px] mb-2.5 uppercase tracking-widest">Sale</span>
        </div>
        <p className="text-sm text-gray-500 flex items-center gap-1.5 font-medium">
          <Info size={14} className="text-gray-400" /> Including VAT, taxes, and handling fees.
        </p>
      </div>

      <div className="mb-10">
        <h3 className="text-[11px] font-bold text-gray-500 mb-4 uppercase tracking-widest">
          Variant <span className="text-gray-900 ml-2">{colors[selectedColor]}</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color, idx) => (
            <button 
              key={idx}
              onClick={() => setSelectedColor(idx)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all ${selectedColor === idx ? 'border-gray-900 bg-gray-900 text-white font-bold' : 'border-gray-200 hover:border-gray-400 text-gray-700 bg-white'}`}
            >
              <span className="text-sm font-medium">{color}</span>
              {selectedColor === idx && <Check size={16} className="ml-1" />}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <div className="flex gap-5 mb-8 text-gray-900">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
             <Truck size={24} />
          </div>
          <div>
            <div className="font-bold text-base mb-1">Fast Delivery Options</div>
            <div className="text-sm text-gray-500 leading-relaxed">Order within <span className="font-bold text-gray-900">3 hrs 15 mins</span> for dispatch today.</div>
          </div>
        </div>
        <div className="h-px w-full bg-gray-100 mb-8"></div>
        <div className="flex gap-5 text-gray-900">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
             <ShieldCheck size={24} />
          </div>
          <div>
            <div className="font-bold text-base mb-1">Buyer Protection</div>
            <div className="text-sm text-gray-500 leading-relaxed">Full refund if the item is not as described or doesn&apos;t arrive.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
