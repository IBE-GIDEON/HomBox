import React from 'react';
import Link from 'next/link';
import { ScrollText, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | HomBox',
  description: 'HomBox Terms of Service — rules and guidelines for using our marketplace platform.',
};

export default function TermsPage() {
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
              <ScrollText size={32} className="text-blue-400" />
              <h1 className="text-3xl font-black tracking-tight">Terms of Service</h1>
            </div>
            <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
          </div>

          <div className="px-10 py-10">
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Welcome to HomBox. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully before making any purchase or using any features of our marketplace.
            </p>

            {[
              {
                title: '1. Use of the Platform',
                content: `HomBox provides an online marketplace connecting buyers with sellers of consumer goods. By using our platform, you confirm that you are at least 18 years of age and possess the legal authority to enter into a binding agreement.

You agree not to use the platform to:
• Engage in illegal or fraudulent activity
• Post false, misleading, or deceptive product listings
• Infringe on intellectual property rights
• Harass, abuse, or harm other users`
              },
              {
                title: '2. Account Registration',
                content: `You must provide accurate, complete, and current information when creating your account. You are responsible for maintaining the confidentiality of your password and for all activities that occur under your account. You must notify us immediately of any unauthorized use.`
              },
              {
                title: '3. Product Listings and Purchases',
                content: `All product descriptions, images, and pricing are provided by HomBox. We make every effort to ensure accuracy, but we do not guarantee that all product information is error-free. 

Prices are displayed in Nigerian Naira (₦) and are inclusive of applicable VAT. We reserve the right to modify pricing without prior notice.`
              },
              {
                title: '4. Payment',
                content: `Payment is processed securely via our payment partners (Stripe, Paystack). By completing a purchase, you authorize us to charge the total amount displayed at checkout, including shipping fees and applicable taxes.

All transactions are encrypted using SSL/TLS technology. HomBox does not store credit card information.`
              },
              {
                title: '5. Shipping and Delivery',
                content: `Estimated delivery times are provided at checkout and may vary based on your location and product availability. HomBox is not responsible for delays caused by third-party shipping carriers or circumstances beyond our control (e.g., natural disasters, customs delays).`
              },
              {
                title: '6. Returns and Refunds',
                content: `Our refund policy is detailed on our dedicated Refund Policy page. Generally, items may be returned within 15 days of delivery, provided they are in their original condition. Please visit /refunds for full details.`
              },
              {
                title: '7. Limitation of Liability',
                content: `To the maximum extent permitted by law, HomBox shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including loss of data, revenue, or goodwill.`
              },
              {
                title: '8. Governing Law',
                content: `These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Rivers State, Nigeria.`
              },
              {
                title: '9. Modifications',
                content: `We may update these Terms from time to time. We will notify you of significant changes via email or prominent notice on the platform. Your continued use of HomBox after changes take effect constitutes acceptance of the new Terms.`
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
          <Link href="/privacy" className="underline hover:text-gray-900">Privacy Policy</Link>
          <span>•</span>
          <Link href="/refunds" className="underline hover:text-gray-900">Refund Policy</Link>
          <span>•</span>
          <Link href="/help" className="underline hover:text-gray-900">Help Center</Link>
        </div>
      </div>
    </div>
  );
}
