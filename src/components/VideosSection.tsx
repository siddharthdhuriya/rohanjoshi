import { getLatestVideos } from "@/lib/youtube";
import { siteConfig } from "@/config/site";
import { VideoCard } from "@/components/VideoCard";
import { ScrollReveal } from "@/components/ScrollReveal";

export async function VideosSection() {
  const videos = await getLatestVideos(6);

  return (
    <section id="videos" className="bg-black px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-display text-5xl font-bold text-white md:text-6xl">
            Fresh off the <span className="text-accent">mic</span>.
          </h2>
          <p className="mt-3 max-w-xl text-lg text-neutral-300">
            Latest uploads, pulled straight from the channel — no stale clips.
          </p>
        </ScrollReveal>

        <ScrollReveal
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger
        >
          {videos.length === 0 ? (
            <p className="text-neutral-400">
              Couldn&apos;t load videos right now — check back soon.
            </p>
          ) : (
            videos.map((video) => <VideoCard key={video.id} video={video} />)
          )}
        </ScrollReveal>

        <a
          href={siteConfig.youtube.channelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-block text-base font-semibold text-accent underline-offset-4 hover:underline"
        >
          Watch more on YouTube →
        </a>
      </div>
    </section>
  );
}
