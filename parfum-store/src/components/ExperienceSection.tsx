import Image from "next/image";
import { products } from "@/data/products";

const limited = products.find((product) => product.limitedEdition);
const bestSeller = products.find((product) => product.bestSeller);

export function ExperienceSection() {
  if (!limited || !bestSeller) return null;

  return (
    <section className="bg-neutral-900 py-20 text-neutral-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-6">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            Limited Edition
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            {limited.name}
          </h2>
          <p className="text-sm leading-relaxed text-neutral-300 md:text-base">
            {limited.description}
          </p>
          <div className="grid gap-4 rounded-[30px] border border-neutral-800 bg-neutral-800/40 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
              Olfactive Tapestry
            </p>
            <div className="grid gap-3 text-sm text-neutral-300 md:grid-cols-3">
              <div>
                <p className="text-neutral-500">Top</p>
                <p>{limited.notes.top.join(", ")}</p>
              </div>
              <div>
                <p className="text-neutral-500">Heart</p>
                <p>{limited.notes.heart.join(", ")}</p>
              </div>
              <div>
                <p className="text-neutral-500">Base</p>
                <p>{limited.notes.base.join(", ")}</p>
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Only {limited.stock} editions remain
            </p>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="relative overflow-hidden rounded-[36px] border border-neutral-800">
            <Image
              src={limited.image}
              alt={limited.name}
              width={860}
              height={640}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <div className="grid gap-4 rounded-[30px] border border-neutral-800 bg-neutral-800/60 p-6 text-sm text-neutral-300">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Maison Favorite
            </p>
            <h3 className="text-xl font-semibold text-white">
              {bestSeller.name}
            </h3>
            <p className="leading-relaxed">{bestSeller.description}</p>
            <div className="flex flex-wrap gap-2">
              {bestSeller.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-neutral-700 px-3 py-1 text-xs uppercase tracking-[0.3em] text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
