export function MaisonSection() {
  const pillars = [
    {
      title: "Craft",
      description:
        "Every composition macerates for 48 hours in micro-batches of 100 flacons to preserve the integrity of raw ingredients.",
    },
    {
      title: "Sourcing",
      description:
        "We partner with third-generation growers in Grasse, Calabria, and Isparta to secure ethically harvested botanicals.",
    },
    {
      title: "Sustainability",
      description:
        "Crystal vessels and caps are recycled and refined locally. Refills arrive with compostable silk wraps and seeded cards.",
    },
  ];

  return (
    <section id="maison" className="bg-white py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 md:px-6 lg:flex-row lg:items-start">
        <div className="lg:max-w-md">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Maison Clair
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-neutral-900 md:text-4xl">
            A heritage atelier crafting olfactive sculptures since 1968.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
            Founded on the sun-drenched coast of Antibes, Maison Clair merges
            traditional French perfumery with modern, conscious luxury. Each
            fragrance is blended by hand, numbered, and signed by the perfumer.
          </p>
          <div className="mt-6 space-y-3 rounded-[28px] border border-neutral-200 bg-neutral-50 p-6 text-sm leading-relaxed text-neutral-600">
            <p>
              Book a private atelier session to layer accords, engrave your
              crystal stopper, and craft your personal scent ritual.
            </p>
            <a
              href="#contact"
              className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 underline-offset-8 hover:underline"
            >
              Request invitation
            </a>
          </div>
        </div>
        <div className="flex-1 space-y-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="grid gap-3 rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-200/40 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                {pillar.title}
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
