import Image from "next/image";
import { Sparkles, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  product: Product;
  onViewDetails: (product: Product) => void;
};

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart } = useCart();
  const accentBadge = product.bestSeller
    ? "Bestseller"
    : product.limitedEdition
      ? "Limited"
      : product.newArrival
        ? "New"
        : undefined;

  return (
    <article className="group flex flex-col overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-60 w-full overflow-hidden bg-neutral-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        {accentBadge && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-700 shadow-sm">
            <Sparkles className="h-3 w-3" />
            {accentBadge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              {product.name}
            </h3>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              {product.concentration} · {product.gender}
            </p>
          </div>
          <p className="text-base font-semibold text-neutral-900">
            €{product.price}
          </p>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-neutral-600">
          {product.description}
        </p>
        <div className="space-y-2 text-xs leading-5">
          <p className="font-semibold uppercase tracking-[0.35em] text-neutral-500">
            Notes
          </p>
          <div className="grid gap-1 text-neutral-700">
            <p>
              <span className="font-semibold text-neutral-500">Top:</span>{" "}
              {product.notes.top.join(", ")}
            </p>
            <p>
              <span className="font-semibold text-neutral-500">Heart:</span>{" "}
              {product.notes.heart.join(", ")}
            </p>
            <p>
              <span className="font-semibold text-neutral-500">Base:</span>{" "}
              {product.notes.base.join(", ")}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-200 px-3 py-1 text-xs uppercase tracking-[0.25em] text-neutral-500"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-1 text-sm text-neutral-600">
            <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
            {product.rating.toFixed(1)} rating
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => addToCart(product)}
              className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-neutral-700"
            >
              Add to Cart
            </button>
            <button
              onClick={() => onViewDetails(product)}
              className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
