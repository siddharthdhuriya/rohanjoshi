import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — Stand-up Comedy`,
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
