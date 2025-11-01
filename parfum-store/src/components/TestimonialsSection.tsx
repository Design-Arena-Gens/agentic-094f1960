import { testimonials } from "@/data/products";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="bg-neutral-50 py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Archivist Notes
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-neutral-900 md:text-4xl">
              Whispered impressions from our patrons.
            </h2>
          </div>
          <Quote className="hidden h-10 w-10 text-neutral-200 md:block" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex h-full flex-col justify-between gap-6 rounded-[28px] border border-neutral-200 bg-white p-6 text-sm leading-relaxed text-neutral-600 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <blockquote>“{testimonial.quote}”</blockquote>
              <figcaption className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                {testimonial.name}
                <br />
                <span className="text-[11px] tracking-[0.2em] text-neutral-400">
                  {testimonial.title}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
