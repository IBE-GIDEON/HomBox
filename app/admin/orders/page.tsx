"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings,
  Truck, CheckCircle2, Clock, RefreshCw, Search, ChevronDown, 
  TrendingUp, DollarSign, ShoppingBag, Eye
} from 'lucide-react';
import { StoredOrder } from '@/lib/ordersDb';

const statusColors: Record<string, string> = {
  Processing: 'bg-amber-50 text-amber-700 border-amber-200',
  Shipped: 'bg-blue-50 text-blue-700 border-blue-200',
  Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Pending: 'bg-gray-100 text-gray-700 border-gray-200',
  'To Review': 'bg-purple-50 text-purple-700 border-purple-200',
};

const statusIcons: Record<string, React.ReactNode> = {
  Processing: <Clock size={14} />,
  Shipped: <Truck size={14} />,
  Delivered: <CheckCircle2 size={14} />,
  Pending: <RefreshCw size={14} />,
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        setOrders(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: StoredOrder['status']) => {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const filtered = orders.filter(o => {
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.customerEmail?.toLowerCase().includes(search.toLowerCase()) || o.customerName?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalRevenue = orders.reduce((sum, o) => {
    const num = parseFloat(o.total.replace(/[^0-9.-]+/g, ''));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const formatMoney = (n: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-300 flex-shrink-0 hidden lg:flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-gray-800">
          <Link href="/" className="text-2xl font-black text-white tracking-tighter">HomBox <span className="text-red-500">Admin</span></Link>
        </div>
        <nav className="flex-1 py-6 px-4 flex flex-col gap-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-white cursor-pointer transition-colors">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-white cursor-pointer transition-colors">
            <Package size={20} /> Products
          </Link>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600/10 text-red-400 font-bold cursor-pointer">
            <ShoppingCart size={20} /> Orders
          </div>
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

      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">Order Management</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm font-medium text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg px-4 py-2">
              ← Add Products
            </Link>
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
          </div>
        </header>

        <div className="p-8">

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { label: 'Total Orders', value: orders.length, icon: <ShoppingBag size={20} className="text-blue-500" />, color: 'bg-blue-50' },
              { label: 'Total Revenue', value: formatMoney(totalRevenue), icon: <DollarSign size={20} className="text-emerald-500" />, color: 'bg-emerald-50' },
              { label: 'Processing', value: orders.filter(o => o.status === 'Processing').length, icon: <Clock size={20} className="text-amber-500" />, color: 'bg-amber-50' },
              { label: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length, icon: <CheckCircle2 size={20} className="text-green-500" />, color: 'bg-green-50' },
            ].map(stat => (
              <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>{stat.icon}</div>
                  <TrendingUp size={16} className="text-gray-400" />
                </div>
                <div className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center shadow-sm">
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 gap-2 flex-1 min-w-[200px] focus-within:border-gray-900 transition-colors">
              <Search size={16} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="outline-none text-sm text-gray-700 w-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['All', 'Processing', 'Shipped', 'Delivered', 'Pending'].map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${statusFilter === s ? 'bg-zinc-900 text-white border-zinc-900' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['Order ID', 'Customer', 'Items', 'Total', 'Date', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan={7} className="text-center py-16 text-gray-400">Loading orders...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-20">
                        <ShoppingCart size={40} className="text-gray-300 mx-auto mb-3" />
                        <div className="text-gray-500 font-medium">No orders found</div>
                        <div className="text-gray-400 text-sm mt-1">Orders will appear here after customers check out</div>
                      </td>
                    </tr>
                  ) : filtered.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-sm text-gray-900 font-bold">{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">{order.customerName || '—'}</div>
                        <div className="text-xs text-gray-500">{order.customerEmail || 'Guest'}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{order.items?.length || 0} item(s)</td>
                      <td className="px-6 py-4 text-sm font-black text-gray-900">{order.total}</td>
                      <td className="px-6 py-4 text-xs text-gray-500">{order.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold border ${statusColors[order.status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                          {statusIcons[order.status]}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="relative group">
                            <select
                              value={order.status}
                              onChange={e => handleStatusChange(order.id, e.target.value as StoredOrder['status'])}
                              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-gray-900 cursor-pointer pr-7 appearance-none bg-white font-medium"
                            >
                              <option>Processing</option>
                              <option>Shipped</option>
                              <option>Delivered</option>
                              <option>Pending</option>
                              <option>To Review</option>
                            </select>
                            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filtered.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
                <span>Showing {filtered.length} of {orders.length} orders</span>
                <span className="font-bold text-gray-700">Total: {formatMoney(totalRevenue)}</span>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
