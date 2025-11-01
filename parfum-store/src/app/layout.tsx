import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maison Clair | Haute Parfumerie",
  description:
    "Discover sculpted perfume artistry, bespoke scent services, and luminous fragrances from Maison Clair.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-b from-[#f7f4f2] via-white to-[#f7f4f2] text-neutral-900 antialiased`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
