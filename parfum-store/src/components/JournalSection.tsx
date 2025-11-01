import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { journalEntries } from "@/data/products";

export function JournalSection() {
  return (
    <section id="journal" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Journal & Atelier
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-neutral-900 md:text-4xl">
              Stories of origin, craft, and ritual.
            </h2>
         </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-700 underline-offset-8 hover:underline"
          >
            Receive atelier briefings
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {journalEntries.map((entry) => (
            <article
              key={entry.id}
              className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={entry.image}
                  alt={entry.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  Atelier Chronicle
                </p>
                <h3 className="text-lg font-semibold text-neutral-900">
                  {entry.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-neutral-600">
                  {entry.excerpt}
                </p>
                <a
                  href={entry.href}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-700 transition hover:text-neutral-900"
                >
                  Read insight
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
