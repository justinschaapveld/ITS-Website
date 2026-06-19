// Pneumatic impact wrench, orthographic side elevation.
// The canonical tyre-shop air gun: motor housing (body) with the square-drive
// anvil protruding from the nose (left), pistol grip descending, air inlet at
// the base of the grip, trigger on the front of the grip.
// Nose points left so the square drive reads as the business end.
import type { SVGProps } from "react";

export function ImpactWrenchIcon(props: SVGProps<SVGSVGElement>) {
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
      {/* Motor housing — main horizontal body */}
      <rect x="18" y="14" width="28" height="16" rx="3" />
      {/* Square-drive anvil protruding from the nose (left) */}
      <rect x="8" y="18" width="10" height="8" rx="1" />
      {/* Hammer-case detail circle near the nose */}
      <circle cx="25" cy="22" r="3.5" />
      {/* Pistol grip — tapers slightly toward the base */}
      <path d="M 27 30 L 39 30 L 37 50 L 29 50 Z" />
      {/* Trigger on the front (left) face of the grip */}
      <path d="M 27 35 L 23 37 L 27 39" />
      {/* Air inlet fitting at the base of the grip */}
      <path d="M 29 50 L 37 50 L 38 56 L 28 56 Z" />
    </svg>
  );
}
