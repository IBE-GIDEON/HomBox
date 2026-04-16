import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | HomBox',
  description: 'HomBox Privacy Policy — how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'April 16, 2026';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to HomBox
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-zinc-900 text-white px-10 py-10">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck size={32} className="text-emerald-400" />
              <h1 className="text-3xl font-black tracking-tight">Privacy Policy</h1>
            </div>
            <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
          </div>

          <div className="px-10 py-10 prose prose-gray max-w-none">
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              HomBox (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, and share information about you when you use our marketplace platform.
            </p>

            {[
              {
                title: '1. Information We Collect',
                content: `We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes:
                
• Full name and email address
• Shipping and billing addresses  
• Payment information (processed securely via Stripe — we do not store card numbers)
• Order history and transaction records
• Communications with our customer support team`
              },
              {
                title: '2. How We Use Your Information',
                content: `We use your information to:

• Process and fulfill your orders
• Send transactional emails (order confirmations, shipping updates)
• Provide customer support and resolve disputes
• Improve our platform, products, and services
• Detect and prevent fraudulent transactions
• Comply with legal obligations`
              },
              {
                title: '3. Information Sharing',
                content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:

• Shipping and logistics partners (to deliver your orders)
• Payment processors (Stripe, Paystack) for secure transaction handling
• Analytics providers to understand platform usage
• Law enforcement when required by applicable law`
              },
              {
                title: '4. Data Security',
                content: `We implement industry-standard security measures to protect your personal data including SSL/TLS encryption, secure data storage, and regular security audits. However, no method of electronic transmission is 100% secure.`
              },
              {
                title: '5. Your Rights',
                content: `You have the right to:

• Access the personal data we hold about you
• Request correction of inaccurate data
• Request deletion of your account and associated data
• Opt out of marketing communications at any time
• Lodge a complaint with a supervisory authority`
              },
              {
                title: '6. Cookies',
                content: `We use essential cookies to enable platform functionality (such as keeping you logged in and maintaining your shopping cart). We also use analytics cookies to understand how users interact with our platform. You can control cookie preferences through your browser settings.`
              },
              {
                title: '7. Contact Us',
                content: `If you have questions about this Privacy Policy, please contact us at privacy@hombox.ng or through our Help Center.`
              }
            ].map((section) => (
              <section key={section.title} className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">{section.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
              </section>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-center text-sm text-gray-500">
          <Link href="/terms" className="underline hover:text-gray-900">Terms of Service</Link>
          <span>•</span>
          <Link href="/refunds" className="underline hover:text-gray-900">Refund Policy</Link>
          <span>•</span>
          <Link href="/help" className="underline hover:text-gray-900">Help Center</Link>
        </div>
      </div>
    </div>
  );
}
