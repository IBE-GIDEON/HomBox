"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Settings, 
  Plus, CheckCircle2, AlertCircle, Loader2 
} from 'lucide-react';



export default function AdminDashboard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    original_price: '',
    category: 'Consumer Electronics',
    image_url: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      // Clean up strings into numbers for the database
      const numericPrice = parseFloat(formData.price);
      const numericOriginalPrice = parseFloat(formData.original_price);

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name, 
          price: numericPrice, 
          original_price: numericOriginalPrice, 
          category: formData.category,
          image_url: formData.image_url,
          description: formData.description,
          stock_count: 100,
          sold_count: 0,
          rating: 5.0
        })
      });

      if (!res.ok) throw new Error('Failed to save to database');


      setStatus('success');
      // Reset form on success
      setFormData({
        name: '', price: '', original_price: '', category: 'Consumer Electronics', image_url: '', description: ''
      });

      // Clear success message after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);

    } catch (err: unknown) {
      console.error(err);
      setStatus('error');
      const errorMessageString = err instanceof Error ? err.message : String(err);
      setErrorMessage(errorMessageString || "Failed to add product. Check database connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* 1. ADMIN SIDEBAR (Enterprise Dark Mode) */}
      <aside className="w-64 bg-gray-900 text-gray-300 flex-shrink-0 hidden lg:flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-gray-800">
          <Link href="/" className="text-2xl font-black text-white tracking-tighter">HomBox <span className="text-red-500">Admin</span></Link>
        </div>
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-white cursor-pointer transition-colors">
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600/10 text-red-500 font-bold cursor-pointer transition-colors">
            <Package size={20} /> Products
          </div>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-white cursor-pointer transition-colors">
            <ShoppingCart size={20} /> Orders
          </Link>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-white cursor-pointer transition-colors">
            <Users size={20} /> Customers
          </div>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-white cursor-pointer transition-colors text-sm">
            <Settings size={20} /> Store Settings
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Top Bar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-gray-800">Product Management</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">Logged in as <span className="text-gray-900 font-bold">Admin</span></span>
            <div className="w-10 h-10 bg-gray-900 rounded-full border-2 border-gray-200 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-4xl mx-auto">
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Add New Product</h2>
              <p className="text-gray-500 mt-1">Upload a new item to your storefront catalog.</p>
            </div>
            <Link href="/" target="_blank">
              <button className="text-sm font-bold text-gray-600 hover:text-red-600 transition-colors border border-gray-300 rounded-lg px-4 py-2 hover:bg-red-50 hover:border-red-200">
                View Live Store &rarr;
              </button>
            </Link>
          </div>

          {/* Status Alerts */}
          {status === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
              <CheckCircle2 className="text-green-600 shrink-0" />
              <div>
                <h4 className="text-green-800 font-bold">Product Added Successfully!</h4>
                <p className="text-green-700 text-sm mt-0.5">Your product is now live in the database.</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
              <AlertCircle className="text-red-600 shrink-0" />
              <div>
                <h4 className="text-red-800 font-bold">Upload Failed</h4>
                <p className="text-red-700 text-sm mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Product Form */}
          <form onSubmit={handleAddProduct} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                <input 
                  required 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text" 
                  placeholder="e.g., Luxury Smart Watch Series 8" 
                  className="w-full border border-gray-300 rounded-xl p-3.5 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Selling Price (₦)</label>
                <input 
                  required 
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  type="number" 
                  placeholder="8500" 
                  className="w-full border border-gray-300 rounded-xl p-3.5 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Original Price (₦)</label>
                <input 
                  required 
                  name="original_price"
                  value={formData.original_price}
                  onChange={handleChange}
                  type="number" 
                  placeholder="15000" 
                  className="w-full border border-gray-300 rounded-xl p-3.5 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-mono text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3.5 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all bg-white"
                >
                  <option>Consumer Electronics</option>
                  <option>Women&apos;s Clothing</option>
                  <option>Men&apos;s Clothing</option>
                  <option>Home Appliances</option>
                  <option>Beauty & Health</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                <input 
                  required 
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  type="url" 
                  placeholder="https://images.unsplash.com/..." 
                  className="w-full border border-gray-300 rounded-xl p-3.5 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Description</label>
                <textarea 
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4} 
                  placeholder="Detail the key features, specifications, and selling points of this product..." 
                  className="w-full border border-gray-300 rounded-xl p-3.5 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all resize-y"
                ></textarea>
              </div>

            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 flex justify-end">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gray-900 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
                {isSubmitting ? 'Uploading...' : 'Publish Product'}
              </button>
            </div>

          </form>

        </div>
      </main>
    </div>
  );
}