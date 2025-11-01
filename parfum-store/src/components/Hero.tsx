import Image from "next/image";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(216,154,114,0.25),_transparent_60%)]"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-[#f5ede7] to-white" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-6 md:py-24 lg:gap-16">
        <div className="space-y-8">
          <p className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Haute Parfumerie
          </p>
          <h1 className="text-4xl font-light leading-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Sculpted fragrances inspired by light, texture, and memory.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">
            Maison Clair curates small-batch perfumes crafted in Grasse. Each
            composition is blended by hand and bottled in recycled crystal, ready
            to become your signature.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#collections"
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-neutral-700"
            >
              Discover Collection
            </a>
            <a
              href="#atelier"
              className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900"
            >
              Book Atelier Session
            </a>
          </div>
          <div className="grid grid-cols-2 gap-6 pt-8 sm:grid-cols-4">
            {[
              { value: "24", label: "Limited batches / year" },
              { value: "92%", label: "Naturally derived essences" },
              { value: "48h", label: "Maceration period" },
              { value: "3", label: "Complimentary refills" },
            ].map((fact) => (
              <div key={fact.label} className="space-y-1">
                <p className="text-2xl font-semibold text-neutral-900">
                  {fact.value}
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  {fact.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-6 -z-10 rounded-[30px] bg-gradient-to-br from-[#ead6c8] via-white to-[#f4ede8] blur-2xl" />
          <div className="overflow-hidden rounded-[32px] border border-white/60 shadow-xl shadow-neutral-200/50">
            <Image
              src="https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=900&q=80"
              alt="Maison Clair perfume bottles displayed on marble"
              width={720}
              height={900}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
