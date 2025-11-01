import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12 text-sm text-neutral-600">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="space-y-2">
          <Link
            href="#top"
            className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-500"
          >
            Maison Clair
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            © {new Date().getFullYear()} Maison Clair Haute Parfumerie. All
            rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-neutral-500">
          <a href="#collections" className="hover:text-neutral-900">
            Collection
          </a>
          <a href="#maison" className="hover:text-neutral-900">
            Maison
          </a>
          <a href="#atelier" className="hover:text-neutral-900">
            Atelier
          </a>
          <a href="#journal" className="hover:text-neutral-900">
            Journal
          </a>
          <a href="#contact" className="hover:text-neutral-900">
            Contact
          </a>
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
          Crafted in Grasse · Bottled in Paris
        </p>
      </div>
    </footer>
  );
}
