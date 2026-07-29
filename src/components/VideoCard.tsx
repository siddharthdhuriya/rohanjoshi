"use client";

import { useState } from "react";
import type { YoutubeVideo } from "@/lib/youtube";

export function VideoCard({ video }: { video: YoutubeVideo }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-lg bg-black text-left"
      aria-label={`Play video: ${video.title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        loading="lazy"
        className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-70"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/90 text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3 text-sm font-medium text-white">
        {video.title}
      </span>
    </button>
  );
}
