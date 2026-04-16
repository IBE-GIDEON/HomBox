import React from 'react';
import Link from 'next/link';
import { PackageX, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Refund Policy | HomBox',
  description: 'HomBox Refund and Return Policy — how to return items and get your money back.',
};

export default function RefundPolicyPage() {
  const lastUpdated = 'April 16, 2026';

  const steps = [
    { step: '01', title: 'Initiate Your Return', desc: 'Go to My Account → My Orders and click "Return Item" within 15 days of delivery.' },
    { step: '02', title: 'Pack the Item', desc: 'Securely pack the item in its original packaging with all accessories and documentation.' },
    { step: '03', title: 'Ship It Back', desc: 'Use the prepaid return label we email you. Drop it off at any DHL or FedEx location.' },
    { step: '04', title: 'Receive Your Refund', desc: 'Once we receive and inspect the item, your refund will be processed within 5–7 business days.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-6">

        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to HomBox
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-zinc-900 text-white px-10 py-10">
            <div className="flex items-center gap-3 mb-4">
              <PackageX size={32} className="text-orange-400" />
              <h1 className="text-3xl font-black tracking-tight">Refund & Return Policy</h1>
            </div>
            <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
          </div>

          <div className="px-10 py-10">
            
            {/* Quick Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[
                { label: 'Return Window', value: '15 Days', note: 'from date of delivery' },
                { label: 'Refund Timeline', value: '5–7 Days', note: 'after item is received' },
                { label: 'Free Returns', value: '100%', note: 'on eligible items' },
              ].map(card => (
                <div key={card.label} className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
                  <div className="text-2xl font-black text-gray-900">{card.value}</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">{card.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{card.note}</div>
                </div>
              ))}
            </div>

            {/* Return Process Steps */}
            <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">How to Return an Item</h2>
            <div className="flex flex-col gap-4 mb-10">
              {steps.map(s => (
                <div key={s.step} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-zinc-900 text-white rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0">{s.step}</div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{s.title}</div>
                    <div className="text-gray-500 text-sm mt-1">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Eligible items */}
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Eligible Items for Return</h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {[
                'Item arrived damaged or defective',
                'Wrong item was delivered',
                'Item significantly different from description',
                'Item arrived with missing parts',
                'Change of mind (unopened, original condition)',
                'Quality does not match product listing',
              ].map(item => (
                <div key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>

            {/* Non-eligible */}
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Items Not Eligible for Return</h2>
            <ul className="text-sm text-gray-600 space-y-2 mb-8 list-disc pl-5">
              <li>Items returned after the 15-day window</li>
              <li>Items that have been used, washed, or damaged by the customer</li>
              <li>Perishable goods, food products, and personal hygiene items</li>
              <li>Digital products and software licenses once activated</li>
              <li>Custom-made or personalized items</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 text-sm text-blue-800">
              <span className="font-bold">Need help with a return?</span> Visit our{' '}
              <Link href="/returns" className="underline font-bold hover:text-blue-900">Returns Center</Link>{' '}
              or contact our support team at{' '}
              <span className="font-bold">support@hombox.ng</span>.
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-center text-sm text-gray-500">
          <Link href="/privacy" className="underline hover:text-gray-900">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms" className="underline hover:text-gray-900">Terms of Service</Link>
          <span>•</span>
          <Link href="/help" className="underline hover:text-gray-900">Help Center</Link>
        </div>
      </div>
    </div>
  );
}
