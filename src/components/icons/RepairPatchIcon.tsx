// Mushroom-style radial repair patch, side cross-section view.
// Flat pill-shaped patch disc at top, narrow cylindrical plug extending downward
// from the centre with a rounded tip.
// Disc 36x8 units (4.5:1 width-to-height); stem 8 wide x ~20 tall (incl. rounded tip).
import type { SVGProps } from "react";

export function RepairPatchIcon(props: SVGProps<SVGSVGElement>) {
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
      {/* Patch disc — flat pill shape */}
      <rect x="14" y="20" width="36" height="8" rx="4" />
      {/* Plug stem — straight sides, rounded bottom */}
      <path d="M 28 28 L 36 28 L 36 44 A 4 4 0 0 1 28 44 Z" />
    </svg>
  );
}
