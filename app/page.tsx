"use client";

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, ShieldCheck, Zap, Package, Menu, Star } from 'lucide-react';

export default function HomBoxLanding() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { id: 1, name: "Smart French Door Refrigerator", price: "$1,899", rating: 4.9, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "UltraQuiet Front Load Washer", price: "$749", rating: 4.8, image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Pro-Style Gas Range Stove", price: "$2,100", rating: 5.0, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "RoboVac Elite Series", price: "$399", rating: 4.7, image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=800" },
    { id: 5, name: "Premium Espresso Machine", price: "$599", rating: 4.9, image: "https://images.unsplash.com/photo-1520286820063-47525fc9e198?auto=format&fit=crop&q=80&w=800" },
    { id: 6, name: "Smart Air Purifier Pro", price: "$249", rating: 4.8, image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-900 font-sans overflow-x-hidden selection:bg-slate-200">
      
      {/* --- CUSTOM STYLES FOR MOTIONLIGHT EFFECT --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .text-motionlight {
          background: linear-gradient(
            110deg, 
            #0f172a 35%, 
            #94a3b8 50%, 
            #0f172a 65%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 4s linear infinite;
        }
      `}} />

      {/* STRONGER BACKGROUND GRADIENTS: Placed directly behind the nav to force the water refraction effect to show */}
      <div className="fixed top-[-5%] left-[5%] w-[40vw] h-[40vw] bg-cyan-300/40 rounded-full blur-[100px] opacity-80 -z-10 pointer-events-none" />
      <div className="fixed top-[5%] right-[5%] w-[35vw] h-[35vw] bg-purple-300/40 rounded-full blur-[100px] opacity-80 -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-indigo-200/40 rounded-full blur-[120px] opacity-60 -z-10 pointer-events-none" />

      {/* Dynamic Navigation with PURE CLEAR WATER DISTORTION */}
      <div className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-700 ease-in-out ${isScrolled ? 'pt-6 px-4' : 'pt-0 px-0'}`}>
        <nav className={`
          flex items-center justify-between transition-all duration-700 ease-in-out
          
          /* THE MAGIC CLEAR WATER FORMULA */
          bg-transparent backdrop-blur-[0px] backdrop-saturate-[200%] 
          border border-white/20 border-[3px] shadow-[0_10px_39px_rgba(0,0,0,0.04)]
          
          ${isScrolled 
            ? 'w-full max-w-5xl h-20 rounded-full px-8' 
            : 'w-full max-w-none h-24 rounded-none px-6 md:px-12 border-x-0 border-t-0'
          }
        `}>
          {/* Logo Container */}
          <div className="flex items-center h-full py-2">
            <img 
              src="/logo.jpeg" 
              alt="HomBox Logo" 
              className={`w-auto object-contain transition-all duration-500 ${isScrolled ? 'h-12' : 'h-16'}`} 
            />
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wide text-slate-800">
            <a href="#" className="hover:text-black transition-colors mix-blend-color-burn">Catalog</a>
            <a href="#" className="hover:text-black transition-colors mix-blend-color-burn">Collections</a>
            <a href="#" className="hover:text-black transition-colors mix-blend-color-burn">Support</a>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2.5 text-slate-800 hover:bg-black/5 rounded-full transition-all">
              <Search size={22} />
            </button>
            <button className="p-2.5 text-slate-800 hover:bg-black/5 rounded-full transition-all">
              <ShoppingCart size={22} />
            </button>
            <button className="hidden md:block bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Sign In
            </button>
            <button className="md:hidden p-2 text-slate-800">
              <Menu size={28} />
            </button>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-6 max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-sm text-xs font-bold text-slate-800 mb-8 tracking-widest uppercase">
          <Zap size={16} className="text-amber-500 fill-amber-500" /> Welcome to the future of home
        </div>
        
        <h1 className="text-6xl md:text-[5.5rem] font-black tracking-tighter mb-8 leading-[1.1]">
          <span className="text-motionlight">Click it and</span> <br className="hidden md:block" /> 
          <span className="text-motionlight">it's home.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-700 font-medium tracking-tight mb-12 max-w-3xl mx-auto leading-relaxed">
          The everything store, elevated. Skip the clutter and discover premium appliances through an interface designed for human beings.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button className="w-full sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-full text-lg font-semibold tracking-wide hover:bg-black transition-all shadow-2xl hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-1">
            Shop the Catalog
          </button>
          <button className="w-full sm:w-auto bg-white/30 backdrop-blur-xl backdrop-saturate-150 border border-white/60 text-slate-900 px-10 py-4 rounded-full text-lg font-bold tracking-wide hover:bg-white/50 transition-all shadow-sm">
            Watch Experience
          </button>
        </div>
      </section>

      {/* Showcase Feature */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="relative rounded-[3rem] p-4 bg-white/20 backdrop-blur-3xl backdrop-saturate-[1.5] border border-white/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden transition-transform duration-700 hover:scale-[1.02]">
          <div className="rounded-[2.5rem] overflow-hidden relative h-[500px] md:h-[700px]">
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=2000" 
              alt="Modern Kitchen Showcase" 
              className="w-full h-full object-cover"
            />
            {/* Hovering Glass UI inside image */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-[30px] backdrop-saturate-[2] px-8 py-5 rounded-[2rem] flex gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-white/20">
               <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl shadow-lg flex items-center justify-center text-white hover:-translate-y-2 transition-transform cursor-pointer"><Package size={28} /></div>
               <div className="w-14 h-14 bg-gradient-to-tr from-rose-500 to-orange-400 rounded-2xl shadow-lg flex items-center justify-center text-white hover:-translate-y-2 transition-transform cursor-pointer"><Zap size={28} /></div>
               <div className="w-14 h-14 bg-slate-900 rounded-2xl shadow-lg flex items-center justify-center text-white hover:-translate-y-2 transition-transform cursor-pointer"><ShieldCheck size={28} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Curated Selection</h2>
            <p className="text-xl text-slate-600 font-medium">Exceptional appliances, zero friction.</p>
          </div>
          <button className="text-slate-900 font-bold hover:underline underline-offset-8 decoration-2 transition-all">
            View All Products &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-transparent backdrop-blur-2xl backdrop-saturate-[1.5] border border-white/50 rounded-[2.5rem] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:bg-white/10 hover:border-blue-500/30 transition-all duration-500">
              {/* Product Image Box */}
              <div className="relative rounded-[2rem] overflow-hidden h-72 mb-6 bg-slate-100 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                
                {/* Floating Add to Cart Button on Hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/70 backdrop-blur-xl text-black font-bold px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 hover:bg-black hover:text-white">
                    <ShoppingCart size={18} /> Quick Add
                  </button>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="px-3 pb-3">
                <div className="flex items-center gap-1 mb-2">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-slate-700">{product.rating}</span>
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3 tracking-tight leading-snug">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-800 tracking-tight">{product.price}</span>
                  <div className="w-10 h-10 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                    <span className="font-bold text-xl leading-none">+</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="relative bg-cover bg-center rounded-[3rem] overflow-hidden shadow-2xl" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&q=80&w=2000')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/50 backdrop-blur-[4px]"></div>
          <div className="relative z-10 py-28 px-8 text-center text-white flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Ready to upgrade?</h2>
            <p className="text-slate-200 text-xl font-medium mb-12 max-w-2xl mx-auto">
              Join thousands of homes powered by HomBox. Premium quality, guaranteed privacy, and delivery that feels like magic.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
               <button className="bg-white text-slate-900 px-10 py-4 rounded-full text-lg font-bold hover:bg-slate-100 transition-colors shadow-2xl">
                 Create Account
               </button>
               <button className="bg-transparent backdrop-blur-2xl text-white border border-white/20 px-10 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-colors">
                 Talk to an Expert
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer & Social Links */}
      <footer className="border-t border-slate-200/60 bg-transparent backdrop-blur-2xl pt-16 pb-12 px-6 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
             <img src="/logo.jpeg" alt="HomBox Logo" className="h-12 w-auto object-contain rounded-lg drop-shadow-sm grayscale opacity-80" />
             <span className="text-slate-600 font-medium text-sm tracking-wide">© 2026 HomBox Inc. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-3">
            <SocialIcon href="https://facebook.com" path="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            <SocialIcon href="https://twitter.com" path="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            <SocialIcon href="https://linkedin.com" path="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />
            <SocialIcon href="https://instagram.com" path="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M6 2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z" />
            <SocialIcon href="https://tiktok.com" path="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
            <SocialIcon href="https://youtube.com" path="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z M9.75 15.02l0-6.53 6.3 3.27-6.3 3.26z" />
          </div>
        </div>
      </footer>
    </div>
  );
}

function SocialIcon({ href, path }: { href: string, path: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-slate-600 hover:text-black hover:bg-black/5 hover:shadow-lg backdrop-blur-md transition-all duration-300 p-3 rounded-2xl border border-transparent hover:border-slate-300/50"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="22" 
        height="22" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d={path} />
      </svg>
    </a>
  );
}