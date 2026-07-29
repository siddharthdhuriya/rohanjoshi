import shows from "@/content/shows.json";
import { siteConfig } from "@/config/site";
import { ScrollReveal } from "@/components/ScrollReveal";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function ShowsSection() {
  return (
    <section id="shows" className="relative bg-neutral-950 px-6 pb-24 pt-16 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.85fr_1.15fr] md:items-start">
        <ScrollReveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/getting-there-poster.png"
            alt='Official tour poster for "Getting There" by Rohan Joshi'
            className="mx-auto w-full max-w-xs rounded-lg shadow-[0_20px_60px_-15px_rgba(255,47,126,0.35)] md:max-w-none"
          />
        </ScrollReveal>

        <div>
          <ScrollReveal>
            <h2 className="font-display text-5xl font-bold text-white md:text-6xl">
              On tour. <span className="text-accent">Currently.</span>
            </h2>
            <p className="mt-3 max-w-xl text-lg text-neutral-300">
              &quot;Getting There&quot; — live dates, actual venues, real tickets.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-10 flex flex-col divide-y divide-neutral-800" stagger>
            {shows.map((show) => (
              <div
                key={`${show.city}-${show.date}`}
                className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-display text-3xl font-bold text-white">
                    {show.city}
                  </p>
                  <p className="text-base text-neutral-300">
                    {show.venue} · {formatDate(show.date)}
                  </p>
                </div>
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border-2 border-accent px-6 py-2 text-base font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
                >
                  Book tickets
                </a>
              </div>
            ))}
          </ScrollReveal>

          <p className="mt-8 text-base text-neutral-400">
            More dates and cities added regularly — full schedule always on{" "}
            <a
              href={siteConfig.ticketUrl}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-200 underline underline-offset-4 hover:text-white"
            >
              Zeppelin Entertainment
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
