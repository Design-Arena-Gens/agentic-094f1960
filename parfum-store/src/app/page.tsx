"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { FragranceFinder } from "@/components/FragranceFinder";
import { MaisonSection } from "@/components/MaisonSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { JournalSection } from "@/components/JournalSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductModal } from "@/components/ProductModal";
import { ExperienceSection } from "@/components/ExperienceSection";
import { products, type Product } from "@/data/products";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f6f4] via-white to-[#f3ede8]">
      <Navbar onCartToggle={() => setIsCartOpen(true)} />
      <main className="flex flex-col gap-0">
        <Hero />
        <ProductShowcase
          products={products}
          onViewDetails={(product) => setModalProduct(product)}
        />
        <ExperienceSection />
        <FragranceFinder />
        <MaisonSection />
        <TestimonialsSection />
        <JournalSection />
        <ContactSection />
      </main>
      <Footer />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
        }}
      />
      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </div>
  );
}
