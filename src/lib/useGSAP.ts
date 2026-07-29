"use client";

import { useEffect, type DependencyList } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensureRegistered() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function useGSAP(setup: () => void | (() => void), deps: DependencyList) {
  useEffect(() => {
    ensureRegistered();
    const ctx = gsap.context(() => {
      setup();
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
