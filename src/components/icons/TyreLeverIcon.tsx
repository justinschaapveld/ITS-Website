// Tyre lever / mounting iron, orthographic view, stood slightly upright.
// The defining feature is the flattened, hooked spoon at the top end (the bead
// lever) tapering into a straight shaft and a contoured grip at the base.
// Single object, consistent with the valve / jack / patch set.
import type { SVGProps } from "react";

export function TyreLeverIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      {/* Spoon / bead-lever head — flattened paddle with a hooked tip */}
      <path d="M 24 22 Q 18 12 26 8 Q 34 5 38 13 Q 40 18 36 22 Z" />
      {/* Shaft + contoured grip, traced from the spoon base to the rounded butt */}
      <path d="M 27 22 L 35 22 L 35 48 Q 35 56 31 56 Q 27 56 27 48 Z" />
      {/* Grip texture lines on the handle */}
      <line x1="27" y1="46" x2="35" y2="46" />
      <line x1="27" y1="50" x2="35" y2="50" />
    </svg>
  );
}
