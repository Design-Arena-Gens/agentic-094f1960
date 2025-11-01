import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";
import Image from "next/image";

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
};

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-10 backdrop-blur-sm">
      <div className="relative grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-[32px] bg-white shadow-2xl md:grid-cols-[1.1fr_0.9fr]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-white/40 bg-white/80 p-2 text-neutral-700 shadow-sm transition hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="relative hidden h-full md:block">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col gap-5 overflow-y-auto p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              {product.concentration} · {product.gender}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-neutral-900">
              {product.name}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-neutral-600">
            {product.description}
          </p>
          <div className="grid gap-3 rounded-3xl bg-neutral-50 p-6">
            <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Scent Architecture
            </h3>
            <dl className="grid gap-2 text-sm text-neutral-700">
              <div>
                <dt className="font-semibold text-neutral-500">Top</dt>
                <dd>{product.notes.top.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-500">Heart</dt>
                <dd>{product.notes.heart.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-500">Base</dt>
                <dd>{product.notes.base.join(", ")}</dd>
              </div>
            </dl>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold text-neutral-600">Size:</span>{" "}
              {product.size}
            </p>
            <p>
              <span className="font-semibold text-neutral-600">Stock:</span>{" "}
              {product.stock > 10 ? "Available" : `Only ${product.stock} left`}
            </p>
            <p className="text-xl font-semibold text-neutral-900">
              €{product.price}
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Ritual Notes
            </h3>
            <p className="leading-relaxed text-neutral-600">
              Wear during golden hour for a luminous trail. Atomise once on
              pulse points and twice in the air, stepping through the mist to
              cloak yourself evenly.
            </p>
          </div>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              className="flex-1 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-neutral-700"
            >
              Add to Cart
            </button>
            <button
              onClick={onClose}
              className="flex-1 rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
