// Clip-on wheel balance weight shown on a wheel section.
// The three curved lines are concentric circular arcs — a shared centre at
// (32, 80), below the frame, with radii 56 / 46 / 36 (even 10-unit spacing).
// They read as a cutout of three nested circles (tyre / rim / bead) rather than
// three independent curves. Each arc is drawn as left + right segments that
// stop where they meet the weight's outline, so nothing crosses the body in
// this stroke-only (fill-less) form.
import type { SVGProps } from "react";

export function BalanceWeightIcon(props: SVGProps<SVGSVGElement>) {
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
      {/* Outer arc (r=56) — emerges from the clip neck */}
      <path d="M 5 30.94 A 56 56 0 0 1 27 24.22" />
      <path d="M 37 24.22 A 56 56 0 0 1 59 30.94" />
      {/* Middle arc (r=46) — emerges from the body shoulders */}
      <path d="M 5 42.76 A 46 46 0 0 1 23 34.89" />
      <path d="M 41 34.89 A 46 46 0 0 1 59 42.76" />
      {/* Inner arc (r=36) — emerges from the body base */}
      <path d="M 5 56.19 A 36 36 0 0 1 24 44.90" />
      <path d="M 40 44.90 A 36 36 0 0 1 59 56.19" />
      {/* Clip-on weight — clip neck flaring into the body, one continuous outline */}
      <path d="M 27 16 L 37 16 L 37 27 L 42 29 L 40 46 L 24 46 L 22 29 L 27 27 Z" />
      {/* Mounting dots on the weight body */}
      <circle cx="28" cy="40" r="2" />
      <circle cx="36" cy="40" r="2" />
    </svg>
  );
}
