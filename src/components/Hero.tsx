"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@/lib/useGSAP";
import { prefersReducedMotion, supportsHeavyMotion } from "@/lib/motion";
import { TicketButton } from "@/components/TicketButton";
import { siteConfig } from "@/config/site";

const SpotlightScene = dynamic(
  () => import("@/components/SpotlightScene").then((m) => m.SpotlightScene),
  { ssr: false }
);

export function Hero() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [enableScene, setEnableScene] = useState(false);

  useEffect(() => {
    setEnableScene(supportsHeavyMotion());
  }, []);

  useGSAP(() => {
    if (!headingRef.current) return;
    if (prefersReducedMotion()) return;

    const lines = headingRef.current.querySelectorAll("[data-line]");
    gsap.from(lines, {
      yPercent: 110,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      stagger: 0.12,
      delay: 0.2,
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-6 text-center"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/rohan-stage.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[center_20%] opacity-60"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,47,126,0.25),_transparent_60%)]"
        aria-hidden
      />
      {enableScene && (
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <SpotlightScene />
        </div>
      )}

      <div ref={headingRef} className="relative z-10 max-w-3xl">
        <p
          data-line
          className="mb-4 font-display text-sm uppercase tracking-[0.35em] text-accent"
        >
          Stand-up comedian
        </p>
        <h1 className="overflow-hidden">
          <span
            data-line
            className="block font-display text-7xl font-black leading-[0.95] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-8xl md:text-9xl"
          >
            {siteConfig.name}
          </span>
        </h1>
        <p
          data-line
          className="mx-auto mt-6 max-w-xl text-balance text-xl font-medium text-neutral-100 md:text-2xl"
        >
          {siteConfig.tagline}
        </p>
        <div data-line className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <TicketButton />
          <a
            href="#videos"
            className="text-base font-semibold text-neutral-200 underline-offset-4 hover:text-white hover:underline"
          >
            Watch clips ↓
          </a>
        </div>
      </div>
    </section>
  );
}
