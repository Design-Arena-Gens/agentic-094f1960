import { FormEvent, useMemo, useState } from "react";
import { Wand2 } from "lucide-react";
import { Product, products } from "@/data/products";

type PreferenceKey = "mood" | "time" | "intensity" | "texture";

const defaultPreferences: Record<PreferenceKey, string> = {
  mood: "radiant",
  time: "day",
  intensity: "airy",
  texture: "silken",
};

const matchMatrix: Record<PreferenceKey, Record<string, string[]>> = {
  mood: {
    radiant: ["floral", "citrus", "fresh"],
    enigmatic: ["oriental", "oud", "amber"],
    grounded: ["woody", "resinous", "amber"],
    romantic: ["rose", "floral", "powdery"],
  },
  time: {
    day: ["daytime", "fresh", "cologne"],
    night: ["evening", "oud", "oriental"],
    golden: ["signature", "floral", "spicy"],
  },
  intensity: {
    airy: ["cologne", "daytime", "fresh"],
    enveloping: ["amber", "powdery", "comfort"],
    dramatic: ["evening", "oud", "spicy"],
  },
  texture: {
    silken: ["signature", "floral", "powdery"],
    crystalline: ["marine", "fresh", "daytime"],
    velvet: ["oriental", "amber", "evening"],
    luminous: ["citrus", "floral", "daytime"],
  },
};

const preferenceOptions: Record<PreferenceKey, { value: string; label: string }[]> = {
  mood: [
    { value: "radiant", label: "Radiant & Uplifting" },
    { value: "enigmatic", label: "Enigmatic & Bold" },
    { value: "grounded", label: "Grounded & Warm" },
    { value: "romantic", label: "Romantic & Soft" },
  ],
  time: [
    { value: "day", label: "Dawn to Dusk" },
    { value: "night", label: "Midnight Soirée" },
    { value: "golden", label: "Golden Hour" },
  ],
  intensity: [
    { value: "airy", label: "Airy Presence" },
    { value: "enveloping", label: "Enveloping Cocoon" },
    { value: "dramatic", label: "Dramatic Trail" },
  ],
  texture: [
    { value: "silken", label: "Silken Petals" },
    { value: "crystalline", label: "Crystalline Mist" },
    { value: "velvet", label: "Velvet Ember" },
    { value: "luminous", label: "Luminous Sheen" },
  ],
};

export function FragranceFinder() {
  const [preferences, setPreferences] =
    useState<Record<PreferenceKey, string>>(defaultPreferences);
  const [recommendation, setRecommendation] = useState<Product | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const rankedProducts = useMemo(() => {
    return products
      .map((product) => {
        let score = product.bestSeller ? 1.5 : 1;
        score += product.limitedEdition ? 0.5 : 0;
        score += product.newArrival ? 0.25 : 0;

        (Object.keys(preferences) as PreferenceKey[]).forEach((key) => {
          const desiredTags = matchMatrix[key][preferences[key]] ?? [];
          const matchCount = product.tags.filter((tag) =>
            desiredTags.includes(tag)
          ).length;
          score += matchCount * 1.5;
        });

        return { product, score };
      })
      .sort((a, b) => b.score - a.score);
  }, [preferences]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setRecommendation(rankedProducts[0]?.product ?? null);
  };

  const updatePreference = (key: PreferenceKey, value: string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section
      id="atelier"
      className="relative overflow-hidden bg-gradient-to-br from-[#f2ece5] via-white to-[#f9f5f1] py-20"
    >
      <div className="absolute inset-y-0 left-0 hidden w-1/3 bg-[radial-gradient(circle_at_top,_rgba(216,154,114,0.25),_transparent_70%)] md:block" />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[0.85fr_1.15fr] md:px-6">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
            <Wand2 className="h-3.5 w-3.5" />
            Atelier Scent Match
          </p>
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
            Tell us how you wish to feel. We&apos;ll compose the right aura.
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
            Our perfumers can guide you to a tailored blend. Share a glimpse of
            your mood and the moment you&apos;re crafting—we&apos;ll suggest the
            fragrance that resonates most.
          </p>
          <div className="rounded-[32px] border border-neutral-200 bg-white/90 p-6 text-sm leading-relaxed text-neutral-600 shadow-sm">
            <p>
              Each selection refines the palette of naturals and aroma
              molecules we&apos;ll reach for. Expect your recommendation to be
              precise, but follow your intuition to confirm the match.
            </p>
          </div>
        </div>

        <div className="rounded-[36px] border border-neutral-200 bg-white p-6 shadow-xl shadow-neutral-200/60 md:p-8">
          <form className="space-y-8" onSubmit={onSubmit}>
            {(Object.keys(preferenceOptions) as PreferenceKey[]).map((key) => (
              <fieldset key={key} className="space-y-4">
                <legend className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  {key === "mood"
                    ? "Mood"
                    : key === "time"
                      ? "Moment"
                      : key === "intensity"
                        ? "Sillage"
                        : "Texture"}
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {preferenceOptions[key].map((option) => {
                    const active = preferences[key] === option.value;
                    return (
                      <label
                        key={option.value}
                        className={`cursor-pointer rounded-3xl border px-4 py-4 text-sm transition ${
                          active
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-900"
                        }`}
                      >
                        <input
                          type="radio"
                          name={key}
                          value={option.value}
                          checked={active}
                          onChange={() => updatePreference(key, option.value)}
                          className="hidden"
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="flex-1 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-neutral-700"
              >
                Reveal My Fragrance
              </button>
              <button
                type="button"
                onClick={() => {
                  setPreferences(defaultPreferences);
                  setRecommendation(null);
                  setSubmitted(false);
                }}
                className="flex-1 rounded-full border border-neutral-300 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
              >
                Reset Palette
              </button>
            </div>
          </form>

          {submitted && (
            <div className="mt-8 rounded-[28px] border border-neutral-200 bg-neutral-50 p-6">
              {recommendation ? (
                <div className="space-y-3 text-sm text-neutral-600">
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                    Suggested Aura
                  </p>
                  <h3 className="text-2xl font-semibold text-neutral-900">
                    {recommendation.name}
                  </h3>
                  <p className="leading-relaxed">
                    {recommendation.description}
                  </p>
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                    Key Notes
                  </p>
                  <p>
                    {recommendation.notes.top[0]} ·{" "}
                    {recommendation.notes.heart[0]} ·{" "}
                    {recommendation.notes.base[0]}
                  </p>
                  <p className="text-neutral-500">
                    Complete your experience by adding it to your cart from the
                    collection above. A dedicated perfumer will confirm your
                    pairing during checkout.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-neutral-500">
                  We&apos;re refining our palette for you. Adjust your
                  selections to reveal a tailored fragrance.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
