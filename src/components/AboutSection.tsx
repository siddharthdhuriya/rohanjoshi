import { ScrollReveal } from "@/components/ScrollReveal";
import { SpotlightReveal } from "@/components/SpotlightReveal";

export function AboutSection() {
  return (
    <section id="about" className="bg-black px-6 py-28 md:px-12">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
        <ScrollReveal>
          <h2 className="font-display text-5xl font-bold text-white md:text-6xl">
            Stand-up since the internet still had AIB in it.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-neutral-200 md:text-xl">
            <p>
              Rohan Joshi has been doing comedy since before &quot;content&quot;
              was a career. Co-founder of All India Bakchod, writer and
              performer on <em>On Air with AIB</em>, and the guy behind the
              Amazon Prime special <strong className="text-white">Wake N Bake</strong>.
            </p>
            <p>
              These days he splits time between the stage, YouTube, and
              arguing with Tanmay Bhat on stream — still one of the most
              consistently inconsistent uploaders on the internet.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <SpotlightReveal
            src="/images/rohan-portrait.jpg"
            alt="Rohan Joshi, studio portrait"
            className="aspect-[4/5] w-full rounded-2xl"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
