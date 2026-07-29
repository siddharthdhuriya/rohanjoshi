"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Wraps the whole page in a buttery-smooth scroll, plus a velocity-driven
 * "wobble": the page skews and stretches slightly under fast scrolling —
 * like yanking a stage curtain — and snaps back to true once you settle.
 * The gag lives at the document level, not on any one section.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const skewSetter = wrapperRef.current
      ? gsap.quickTo(wrapperRef.current, "skewY", {
          duration: 0.7,
          ease: "power3.out",
        })
      : null;
    const scaleSetter = wrapperRef.current
      ? gsap.quickTo(wrapperRef.current, "scaleY", {
          duration: 0.7,
          ease: "power3.out",
        })
      : null;

    const onFrame = (time: number) => {
      lenis.raf(time * 1000);

      const velocity = lenis.velocity;
      const skew = gsap.utils.clamp(-2.5, 2.5, velocity * 0.09);
      const scale = 1 - Math.min(Math.abs(velocity) * 0.0009, 0.02);
      skewSetter?.(skew);
      scaleSetter?.(scale);
    };

    gsap.ticker.add(onFrame);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onFrame);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ transformOrigin: "50% 0%" }}>
      {children}
    </div>
  );
}
