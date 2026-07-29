"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@/lib/useGSAP";
import { prefersReducedMotion } from "@/lib/motion";

export function SpotlightReveal({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!wrapRef.current || !imgRef.current) return;

    if (prefersReducedMotion()) {
      imgRef.current.style.filter = "none";
      imgRef.current.style.clipPath = "none";
      return;
    }

    const state = { radius: 0 };
    gsap.set(imgRef.current, { filter: "grayscale(1) brightness(0.5)" });

    gsap.to(state, {
      radius: 140,
      ease: "none",
      scrollTrigger: {
        trigger: wrapRef.current,
        start: "top 75%",
        end: "top 20%",
        scrub: 0.5,
      },
      onUpdate: () => {
        if (!imgRef.current) return;
        imgRef.current.style.filter = `grayscale(${1 - state.radius / 140}) brightness(${0.5 + (state.radius / 140) * 0.5})`;
      },
    });
  }, []);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-[filter] duration-100"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_35%,rgba(0,0,0,0.35)_100%)]"
        aria-hidden
      />
    </div>
  );
}
