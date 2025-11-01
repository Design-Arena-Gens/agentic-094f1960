import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { Product, discoveryFilters } from "@/data/products";
import { ProductCard } from "./ProductCard";

type ProductShowcaseProps = {
  products: Product[];
  onViewDetails: (product: Product) => void;
};

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export function ProductShowcase({
  products,
  onViewDetails,
}: ProductShowcaseProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortKey, setSortKey] = useState<SortKey>("featured");

  const filteredProducts = useMemo(() => {
    const normalizedFilter = selectedFilter.toLowerCase();
    const filtered = products.filter((product) => {
      const matchesSearch =
        searchTerm.length === 0 ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      if (!matchesSearch) return false;

      if (normalizedFilter === "all") {
        return true;
      }

      if (normalizedFilter === "limited edition") {
        return product.limitedEdition;
      }

      if (
        normalizedFilter === "masculine" ||
        normalizedFilter === "feminine" ||
        normalizedFilter === "unisex"
      ) {
        return product.gender.toLowerCase() === normalizedFilter;
      }

      return product.tags.some(
        (tag) => tag.toLowerCase() === normalizedFilter || tag.includes(normalizedFilter)
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === "price-asc") {
        return a.price - b.price;
      }
      if (sortKey === "price-desc") {
        return b.price - a.price;
      }
      if (sortKey === "name") {
        return a.name.localeCompare(b.name);
      }
      // featured: prioritize best sellers, limited, new
      const weight = (product: Product) =>
        (product.bestSeller ? 3 : 0) +
        (product.limitedEdition ? 2 : 0) +
        (product.newArrival ? 1 : 0);
      return weight(b) - weight(a);
    });

    return sorted;
  }, [products, searchTerm, selectedFilter, sortKey]);

  return (
    <section id="collections" className="bg-white py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
              Signature Collection
            </p>
            <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
              Eau de Parfum, Extrait, and parfumerie exclusives.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
              Curated for distinct olfactive journeys—each creation is released
              in limited batches and finished with recycled crystal stoppers.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="hidden h-5 w-5 text-neutral-400 md:block" />
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              {filteredProducts.length} fragrances
            </p>
          </div>
        </div>

        <div className="grid gap-4 rounded-[26px] border border-neutral-200 bg-neutral-50 p-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex flex-wrap gap-2">
            {discoveryFilters.map((filter) => {
              const active = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
                    active
                      ? "bg-neutral-900 text-white"
                      : "border border-neutral-200 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900"
                  }`}
                >
                  {filter === "All" ? (
                    <Filter className="h-3.5 w-3.5" />
                  ) : null}
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 md:flex-row md:items-center md:gap-4">
            <label className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="search"
                placeholder="Search by name, mood, or ingredient"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-full border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-sm text-neutral-700 outline-none transition focus:border-neutral-900 focus:bg-white"
              />
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Sort
              <select
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value as SortKey)}
                className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-medium lowercase text-neutral-700 outline-none transition focus:border-neutral-900"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price · Low</option>
                <option value="price-desc">Price · High</option>
                <option value="name">Name</option>
              </select>
            </label>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
            />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full rounded-[28px] border border-dashed border-neutral-200 bg-neutral-50 p-12 text-center text-sm leading-relaxed text-neutral-500">
              No fragrances matched your filters. Adjust your search to explore
              more from the Maison.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
