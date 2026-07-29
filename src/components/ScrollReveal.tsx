"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@/lib/useGSAP";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function ScrollReveal({
  children,
  className,
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    if (prefersReducedMotion()) return;

    const targets = stagger ? Array.from(ref.current.children) : ref.current;

    gsap.from(targets, {
      opacity: 0,
      y: 32,
      duration: 0.8,
      ease: "power3.out",
      stagger: stagger ? 0.12 : 0,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
