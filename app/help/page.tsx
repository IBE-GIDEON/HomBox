import React from 'react';
import { Search, HeadphonesIcon, FileText, Truck, RefreshCcw, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function HelpCenter() {
  const commonTopics = [
    { icon: <Truck className="text-red-600" size={24} />, title: 'Delivery Options', desc: 'Track, manage, and understand shipping times to your country.' },
    { icon: <RefreshCcw className="text-red-600" size={24} />, title: 'Returns & Refunds', desc: 'How to easily return your order and receive your money back.' },
    { icon: <FileText className="text-red-600" size={24} />, title: 'Managing Orders', desc: 'Change your address, cancel orders, or update details.' },
    { icon: <ShieldCheck className="text-red-600" size={24} />, title: 'Buyer Protection', desc: 'Learn how HomBox guarantees your safety and satisfaction.' }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-20">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-20 -translate-y-10">
           <HeadphonesIcon size={200} />
        </div>
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-black mb-4">Hello! How can we help you?</h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Search our knowledge base or get in touch with our 24/7 customer support experts.</p>
          
          <div className="bg-white rounded-full p-2 flex items-center max-w-2xl mx-auto shadow-xl">
            <Search className="text-gray-400 mx-3" size={24} />
            <input 
              type="text" 
              placeholder="E.g. How to return a product?" 
              className="flex-1 text-black bg-transparent outline-none py-2 text-lg"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors hidden sm:block">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 -mt-8 relative z-10">
        
        {/* Common Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {commonTopics.map((topic, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {topic.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{topic.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{topic.desc}</p>
            </div>
          ))}
        </div>

        {/* Live Support Box */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
               <HeadphonesIcon size={40} className="text-gray-800" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Need immediate assistance?</h2>
              <p className="text-gray-500">Our customer service team is online 24/7. Average response time: <span className="font-bold text-green-600">under 1 min</span>.</p>
            </div>
          </div>
          <button className="w-full md:w-auto bg-gray-900 text-white font-bold px-8 py-4 rounded-full hover:bg-black transition-colors shrink-0">
            Chat with Eva (Ai Agent)
          </button>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-100 px-8 py-5 bg-gray-50">
            <h2 className="font-bold text-gray-900 text-lg">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col">
            {['I haven\'t received my order. What can I do?', 'How do I cancel my order?', 'My item arrived damaged, how do I get a refund?', 'How do I track my package?'].map((q, idx) => (
              <div key={idx} className="flex items-center justify-between px-8 py-5 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors group">
                <span className="text-gray-700 font-medium group-hover:text-red-600 transition-colors">{q}</span>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-red-600" />
              </div>
            ))}
          </div>
          <div className="p-4 text-center">
             <Link href="#" className="font-bold text-red-600 hover:text-red-700">View all FAQ articles</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
