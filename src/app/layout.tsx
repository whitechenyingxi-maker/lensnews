import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { FollowingProvider } from "@/context/FollowingContext";
import { SearchProvider } from "@/context/SearchContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lens News - 360度认知坐标系",
  description: "拒绝碎片化，为你提供新闻热点的深度视角",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SearchProvider>
          <FollowingProvider>
            <Navbar />
            {children}
          </FollowingProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
