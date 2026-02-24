import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Navigation from "@/components/common/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Farmer Assistant",
  description: "Smart Farmer Assistant - Empowering farmers with technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex flex-1">
            <Navigation />
            <main className="flex-1 p-4 md:p-6">
              {children}
            </main>
          </div>
          <footer className="bg-gray-800 text-white p-4 text-center">
            <p className="text-sm text-gray-300">
              &copy; {new Date().getFullYear()} Smart Farmer Assistant. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}