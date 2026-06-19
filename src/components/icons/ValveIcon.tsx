// TR-413 style snap-in rubber tyre valve, orthographic side elevation.
//
// Structural rebuild from the previous attempt. Key changes:
//   - Cap is now wide and chunky relative to the body, not a small box.
//   - Cap-to-neck and neck-to-collar transitions are SHARP horizontal steps
//     (not diagonals). This is what reads as "mechanical valve" rather than
//     "bottle silhouette" at small sizes.
//   - Brass collar flares out wider than the cap — diagnostic feature of
//     the snap-in valve profile.
//   - Body has a clear horizontal seam separating it from the bulbous base.
//
// Silhouette: 36 wide x 50 tall within the 64x64 viewBox.
import type { SVGProps } from "react";

export function ValveIcon(props: SVGProps<SVGSVGElement>) {
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
      {/* Outline, clockwise from cap top-left.
          Cap -> sharp step to brass neck -> sharp step out to wider collar
          -> rubber body taper -> rounded base bulb. */}
      <path d="M 24 6 L 40 6 L 40 18 L 35 18 L 35 23 L 42 23 L 42 26 L 50 46 Q 50 51 46 56 L 18 56 Q 14 51 14 46 L 22 26 L 22 23 L 29 23 L 29 18 L 24 18 Z" />
      {/* Vertical knurled grip on cap (5 ribs) */}
      <line x1="26" y1="8" x2="26" y2="16" />
      <line x1="29" y1="8" x2="29" y2="16" />
      <line x1="32" y1="8" x2="32" y2="16" />
      <line x1="35" y1="8" x2="35" y2="16" />
      <line x1="38" y1="8" x2="38" y2="16" />
      {/* Seam where the rubber body meets the bulbous base */}
      <line x1="18" y1="46" x2="46" y2="46" />
      {/* Concentric seating groove on the base */}
      <line x1="17" y1="50" x2="47" y2="50" />
    </svg>
  );
}
