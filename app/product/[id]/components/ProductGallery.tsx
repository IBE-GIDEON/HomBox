import React from 'react';

export default function ProductGallery({ image_url, name }: { image_url: string, name: string }) {
  return (
    <div className="w-full lg:w-[450px] xl:w-[500px] flex-shrink-0">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 mb-6 aspect-square relative flex items-center justify-center p-2 group">
        <img 
          src={image_url} 
          alt={name} 
          className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-700 ease-out cursor-crosshair"
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'; }}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-[10px] uppercase tracking-widest font-bold text-gray-900 border border-gray-200 flex items-center gap-2 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> IN STOCK
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
         {[1, 2, 3, 4].map((i) => (
           <div key={i} className={`w-24 h-24 rounded-lg border-2 overflow-hidden flex-shrink-0 cursor-pointer ${i === 1 ? 'border-gray-900 ring-2 ring-gray-100' : 'border-gray-200 hover:border-gray-400 opacity-60 hover:opacity-100 transition-all'}`}>
             <img src={image_url} className="w-full h-full object-cover" />
           </div>
         ))}
      </div>
    </div>
  );
}
