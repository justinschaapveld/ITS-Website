// Hydraulic bottle jack, orthographic side elevation.
// Saddle (top, with concave dimple) -> cylinder body -> wide flat base.
// Handle socket protrudes from the right side of the cylinder, mid-upper.
// Total silhouette 32x46 units within the 64x64 viewBox (~1.5:1 height-to-width).
import type { SVGProps } from "react";

export function BottleJackIcon(props: SVGProps<SVGSVGElement>) {
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
      {/* Saddle: angular dimple in the centre for chassis load grip */}
      <path d="M 24 10 L 28 10 L 30 14 L 34 14 L 36 10 L 40 10 L 40 18 L 24 18 Z" />
      {/* Cylinder body + base, traced clockwise from cylinder top-left */}
      <path d="M 26 18 L 38 18 L 38 50 L 48 50 L 48 56 L 16 56 L 16 50 L 26 50 Z" />
      {/* Handle socket — horizontal protrusion from cylinder right side */}
      <path d="M 38 24 L 46 24 L 46 28 L 38 28 Z" />
    </svg>
  );
}
