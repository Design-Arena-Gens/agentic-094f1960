import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "#collections", label: "Collections" },
  { href: "#maison", label: "Maison" },
  { href: "#atelier", label: "Atelier" },
  { href: "#journal", label: "Journal" },
  { href: "#contact", label: "Contact" },
];

export function Navbar({ onCartToggle }: { onCartToggle: () => void }) {
  const { itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/70 border-b border-neutral-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link
          href="#top"
          className="font-semibold tracking-[0.35em] text-xs uppercase text-neutral-600"
        >
          Maison Clair
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-600 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-neutral-900">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onCartToggle}
            className="relative flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-full border border-neutral-300 p-2 text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm font-medium text-neutral-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-neutral-200 px-4 py-3 hover:border-neutral-900 hover:text-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
