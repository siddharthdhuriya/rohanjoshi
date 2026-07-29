"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@/lib/useGSAP";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * A comedy-club sight gag: the mic "drops" from the hero, tumbling and
 * bouncing as the user scrolls into the tour section, then settles —
 * a literal mic drop tied to scroll position instead of time.
 */
export function MicDrop() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const micRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapRef.current || !micRef.current) return;
    if (prefersReducedMotion()) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    tl.fromTo(
      micRef.current,
      { y: -40, rotate: -18, opacity: 0 },
      { y: 260, rotate: 25, opacity: 1, ease: "power1.in", duration: 0.6 }
    )
      .to(micRef.current, {
        y: 340,
        rotate: 12,
        ease: "bounce.out",
        duration: 0.3,
      })
      .to(micRef.current, {
        y: 330,
        rotate: 18,
        scaleX: 1.15,
        scaleY: 0.85,
        duration: 0.08,
      })
      .to(micRef.current, { scaleX: 1, scaleY: 1, duration: 0.12 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none relative z-20 -mb-1 h-0 overflow-visible"
      aria-hidden
    >
      <div
        ref={micRef}
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{ willChange: "transform" }}
      >
        <svg width="34" height="90" viewBox="0 0 34 90" fill="none">
          <rect x="9" y="0" width="16" height="30" rx="8" fill="#e8e8e8" />
          <rect x="9" y="0" width="16" height="30" rx="8" fill="url(#micgrad)" />
          <circle cx="17" cy="10" r="2" fill="#333" opacity="0.5" />
          <circle cx="17" cy="18" r="2" fill="#333" opacity="0.5" />
          <line
            x1="17"
            y1="30"
            x2="17"
            y2="88"
            stroke="#444"
            strokeWidth="2.5"
          />
          <defs>
            <linearGradient id="micgrad" x1="9" y1="0" x2="25" y2="30">
              <stop stopColor="#fff" />
              <stop offset="1" stopColor="#b5b5b5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
