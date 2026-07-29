import { getLatestVideos } from "@/lib/youtube";
import { ScrollReveal } from "@/components/ScrollReveal";

const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "rotate-1", "-rotate-2"];

export async function PressSection() {
  const videos = await getLatestVideos(3);

  const items = [
    { src: "/images/rohan-smile.jpg", alt: "Rohan Joshi smiling" },
    ...videos.map((v) => ({ src: v.thumbnailUrl, alt: `Still from: ${v.title}` })),
    { src: "/images/rohan-stage.jpg", alt: "Rohan Joshi performing on stage" },
  ];

  return (
    <section id="press" className="relative overflow-hidden bg-neutral-950 px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-display text-5xl font-bold text-white md:text-6xl">
            The green room wall.
          </h2>
          <p className="mt-3 max-w-xl text-lg text-neutral-300">
            Stills from stage and screen — swap in the full press kit as
            more shows and shoots come in.
          </p>
        </ScrollReveal>

        <ScrollReveal
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4"
          stagger
        >
          {items.map((item, i) => (
            <div
              key={item.src + i}
              className={`group relative bg-white p-2 pb-6 shadow-xl transition-transform duration-300 hover:z-10 hover:scale-105 hover:rotate-0 ${rotations[i % rotations.length]}`}
            >
              <div className="aspect-[3/4] overflow-hidden bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="absolute -top-3 left-1/2 h-6 w-14 -translate-x-1/2 -rotate-2 rounded-sm bg-accent/70 shadow-sm" />
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
