export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function supportsHeavyMotion() {
  if (typeof window === "undefined") return false;
  const isDesktopWidth = window.matchMedia("(min-width: 768px)").matches;
  const hasEnoughMemory =
    // deviceMemory is not on all browsers; treat unknown as "allow"
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory === undefined ||
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory! >= 4;

  let hasWebGL = false;
  try {
    const canvas = document.createElement("canvas");
    hasWebGL = !!(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    hasWebGL = false;
  }

  return isDesktopWidth && hasEnoughMemory && hasWebGL && !prefersReducedMotion();
}
