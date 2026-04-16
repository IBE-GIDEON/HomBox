"use client";

import React, { useState, useEffect } from 'react';
import { X, Star, Minus, Plus, ShieldCheck, Truck } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

// We define the product type here so the modal knows what data to expect
export type FeedProduct = {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  sold: string;
  shipping: string;
  rating: number;
  image: string;
};

interface ProductModalProps {
  product: FeedProduct | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [modalQuantity, setModalQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  // Reset quantity and color when a new product is opened
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setModalQuantity(1);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedColor(0);
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      image: product.image 
    }, modalQuantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-xl shadow-2xl z-10 w-full max-w-5xl h-[85vh] lg:h-[600px] overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 text-gray-600">
          <X size={20} />
        </button>

        <div className="flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden">
          
          {/* Left Column: Image */}
          <div className="lg:w-1/3 bg-gray-50 p-6 flex flex-col items-center">
            <img src={product.image} alt={product.name} className="w-full max-w-[300px] aspect-square object-cover rounded-lg shadow-sm border border-gray-200 bg-white" />
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 w-full justify-center">
              {[1, 2, 3].map((thumb) => (
                <img key={thumb} src={product.image} className="w-12 h-12 rounded border border-gray-300 cursor-pointer hover:border-red-600 object-cover" alt="thumbnail" />
              ))}
            </div>
          </div>

          {/* Middle Column: Details */}
          <div className="lg:w-1/3 p-6 lg:border-r border-gray-100 flex flex-col">
            <h2 className="text-xl font-bold leading-tight mb-2 text-gray-900">{product.name}</h2>
            <div className="flex items-center gap-2 mb-4 text-sm">
              <span className="flex items-center text-amber-500 font-bold"><Star size={14} className="fill-amber-500 mr-1"/> {product.rating}</span>
              <span className="text-blue-600 underline cursor-pointer">129 Reviews</span>
              <span className="text-gray-500">| {product.sold}</span>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <div className="text-xs text-orange-600 font-bold mb-1 uppercase">Bundle deals</div>
              <div className="text-3xl font-black text-black mb-1">{product.price}</div>
              <div className="text-xs text-gray-500">Tax excluded, add at checkout if applicable</div>
            </div>

            <div className="mb-6">
              <span className="text-sm font-bold block mb-2">Color: <span className="font-normal text-gray-600">Option {selectedColor + 1}</span></span>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((color, idx) => (
                  <button key={idx} onClick={() => setSelectedColor(idx)} className={`w-10 h-10 rounded border-2 p-0.5 overflow-hidden transition-all ${selectedColor === idx ? 'border-red-600' : 'border-gray-200 hover:border-gray-400'}`}>
                    <img src={product.image} className="w-full h-full object-cover rounded-sm" alt={`color ${idx}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="lg:w-1/3 bg-gray-50/50 p-6 flex flex-col">
            <div className="border border-gray-200 rounded-lg p-4 bg-white mb-6">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] uppercase">Choice</span> 
                HomBox commitment
              </div>
              <div className="flex gap-3 mt-4 text-sm text-gray-700">
                <Truck size={18} className="text-gray-400 shrink-0" />
                <div>
                  <div className="font-bold">Free shipping</div>
                  <div className="text-xs text-gray-500 mt-0.5">Delivery: 2 - 4 Business Days</div>
                </div>
              </div>
              <div className="flex gap-3 mt-4 text-sm text-gray-700">
                <ShieldCheck size={18} className="text-gray-400 shrink-0" />
                <div>
                  <div className="font-bold">Security & Privacy</div>
                  <div className="text-xs text-gray-500 mt-0.5">Safe payments. We do not share your personal details.</div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="mb-4">
                <span className="text-sm font-bold block mb-2 text-gray-700">Quantity</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-full bg-white overflow-hidden w-32">
                    <button onClick={() => setModalQuantity(prev => Math.max(1, prev - 1))} className="px-3 py-2 hover:bg-gray-100 text-gray-600 transition-colors"><Minus size={16} /></button>
                    <input type="text" value={modalQuantity} readOnly className="w-full text-center outline-none font-bold text-gray-800 bg-transparent"/>
                    <button onClick={() => setModalQuantity(prev => prev + 1)} className="px-3 py-2 hover:bg-gray-100 text-gray-600 transition-colors"><Plus size={16} /></button>
                  </div>
                  <span className="text-xs text-gray-500">Max 10 pcs</span>
                </div>
              </div>

              <button onClick={handleAddToCart} className="w-full bg-[#ff0000] text-white font-bold py-4 rounded-full hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Add to cart
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}