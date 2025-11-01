import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } =
    useCart();

  if (!isOpen) return null;

  const shippingThreshold = 250;
  const difference = Math.max(0, shippingThreshold - total);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col overflow-hidden border-l border-neutral-200 bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Votre Panier
            </p>
            <h2 className="text-xl font-semibold text-neutral-900">
              {itemCount} item{itemCount === 1 ? "" : "s"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            Close
          </button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          {items.length === 0 && (
            <div className="rounded-[24px] border border-dashed border-neutral-200 bg-neutral-50 p-10 text-center text-sm leading-relaxed text-neutral-500">
              Your cart is empty. Explore the collection and add a fragrance to
              begin your ritual.
            </div>
          )}
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="grid grid-cols-[auto_1fr_auto] gap-4 rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <div
                className="aspect-square h-20 rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url(${product.image})` }}
                aria-hidden
              />
              <div className="space-y-1 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  {product.concentration}
                </p>
                <h3 className="text-base font-semibold text-neutral-900">
                  {product.name}
                </h3>
                <p className="text-neutral-500">€{product.price}</p>
                <div className="flex items-center gap-2 pt-1 text-xs uppercase tracking-[0.25em] text-neutral-400">
                  <span>Top: {product.notes.top[0]}</span>
                  <span className="h-1 w-1 rounded-full bg-neutral-200" />
                  <span>{product.size}</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-neutral-300 transition hover:text-neutral-900"
                  aria-label={`Remove ${product.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-xs uppercase tracking-[0.3em]">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="rounded-full p-1 text-neutral-500 transition hover:text-neutral-900"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="min-w-[1.5rem] text-center font-semibold text-neutral-700">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="rounded-full p-1 text-neutral-500 transition hover:text-neutral-900"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="border-t border-neutral-200 bg-neutral-50 px-6 py-6">
          {items.length > 0 && (
            <div className="space-y-4">
              <div className="space-y-2 rounded-[24px] border border-neutral-200 bg-white p-4 text-sm">
                <div className="flex items-center justify-between text-neutral-600">
                  <span>Fragrance Total</span>
                  <span className="font-semibold text-neutral-900">
                    €{total.toFixed(2)}
                  </span>
                </div>
                <div className="text-xs leading-relaxed text-neutral-500">
                  {difference === 0 ? (
                    <span>
                      Complimentary worldwide shipping unlocked. A silk travel
                      vial will arrive with your order.
                    </span>
                  ) : (
                    <span>
                      Add €{difference.toFixed(2)} to unlock complimentary
                      worldwide shipping and travel vial.
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-neutral-700">
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="rounded-full border border-neutral-300 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500 transition hover:border-neutral-900 hover:text-neutral-900"
                >
                  Clear Cart
                </button>
              </div>
              <p className="text-[11px] leading-5 text-neutral-500">
                Checkout includes a bespoke consultation to personalise your
                engraved bottle and scent ritual instructions.
              </p>
            </div>
          )}
        </footer>
      </aside>
    </div>
  );
}
