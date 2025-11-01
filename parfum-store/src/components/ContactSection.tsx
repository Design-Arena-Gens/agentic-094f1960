import { FormEvent, useState } from "react";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData.entries());
    console.info("Atelier request submitted", entries);
    setSubmitted(true);
    form.reset();
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-neutral-900 py-20 text-neutral-100"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_55%)]" />
      <div className="relative mx-auto grid max-w-5xl gap-12 px-4 md:grid-cols-2 md:px-6">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            Private Atelier Requests
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Book a scent portrait session or corporate atelier.
          </h2>
          <p className="text-sm leading-relaxed text-neutral-300 md:text-base">
            We host in-person ateliers in Paris, London, and New York monthly,
            and virtual consultations worldwide. Share a few details—we&apos;ll
            coordinate timing, venue, and personalised services.
          </p>
          <ul className="space-y-3 text-sm leading-relaxed text-neutral-300">
            <li>• Bespoke engraving and bottle painting available.</li>
            <li>• Up to six guests for atelier blending experiences.</li>
            <li>• Private corporate editions with custom scent branding.</li>
          </ul>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[32px] border border-neutral-700 bg-neutral-800/40 p-6 backdrop-blur md:p-8"
        >
          <div className="grid gap-3 text-sm">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                Full Name
              </span>
              <input
                name="name"
                required
                placeholder="Elena Marceau"
                className="w-full rounded-full border border-neutral-700 bg-neutral-900/60 px-4 py-3 text-sm text-neutral-100 outline-none transition focus:border-white"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                Email
              </span>
              <input
                name="email"
                required
                type="email"
                placeholder="elena@maisonclair.com"
                className="w-full rounded-full border border-neutral-700 bg-neutral-900/60 px-4 py-3 text-sm text-neutral-100 outline-none transition focus:border-white"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                Preferred City
              </span>
              <select
                name="city"
                className="w-full rounded-full border border-neutral-700 bg-neutral-900/60 px-4 py-3 text-sm text-neutral-100 outline-none transition focus:border-white"
              >
                <option>Paris</option>
                <option>London</option>
                <option>New York</option>
                <option>Virtual Atelier</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                Event Type
              </span>
              <select
                name="event"
                className="w-full rounded-full border border-neutral-700 bg-neutral-900/60 px-4 py-3 text-sm text-neutral-100 outline-none transition focus:border-white"
              >
                <option>Bespoke Scent Portrait</option>
                <option>Corporate Atelier</option>
                <option>Bridal Collection</option>
                <option>Gift Consultation</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                Message
              </span>
              <textarea
                name="message"
                rows={4}
                placeholder="Share desired dates, guest count, or olfactive direction."
                className="w-full rounded-3xl border border-neutral-700 bg-neutral-900/60 px-4 py-3 text-sm text-neutral-100 outline-none transition focus:border-white"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-900 transition hover:bg-neutral-200"
          >
            Submit Atelier Request
          </button>
          {submitted && (
            <p className="rounded-3xl border border-neutral-700 bg-neutral-900/60 px-4 py-3 text-xs leading-relaxed text-neutral-300">
              Merci! Our concierge will be in touch within 24 hours with
              availability and a tailored proposal.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
