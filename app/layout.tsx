import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import TopHeader from "@/app/components/TopHeader";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer"; 
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomBox | The Premier Global Marketplace",
  description: "Shop millions of high-quality products at unbeatable prices. From fashion to electronics, enjoy free shipping and buyer protection worldwide.",
  openGraph: {
    title: "HomBox Global Marketplace",
    description: "Shop millions of high-quality products at unbeatable prices. Enjoy free shipping and buyer protection worldwide.",
    siteName: 'HomBox',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f2f2f2] text-slate-900 font-sans flex flex-col min-h-screen`}>
        <TopHeader />
        <Navbar />
        
        {/* flex-grow pushes the footer to the bottom if the page is short */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 2. PLACE FOOTER HERE */}
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}