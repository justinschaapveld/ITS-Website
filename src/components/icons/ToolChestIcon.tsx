// Roller tool cabinet, orthographic front elevation.
// Matches the "Trolleys & Cabinets" subcategory under Other / Workshop.
// Drawered body with recessed handles and two castors — reads unambiguously
// as workshop storage.
import type { SVGProps } from "react";

export function ToolChestIcon(props: SVGProps<SVGSVGElement>) {
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
      {/* Cabinet body */}
      <rect x="16" y="12" width="32" height="40" rx="2" />
      {/* Drawer dividers */}
      <line x1="16" y1="24" x2="48" y2="24" />
      <line x1="16" y1="34" x2="48" y2="34" />
      <line x1="16" y1="44" x2="48" y2="44" />
      {/* Recessed drawer handles, centred in each band */}
      <line x1="27" y1="18" x2="37" y2="18" />
      <line x1="27" y1="29" x2="37" y2="29" />
      <line x1="27" y1="39" x2="37" y2="39" />
      <line x1="27" y1="48" x2="37" y2="48" />
      {/* Castors */}
      <circle cx="23" cy="56" r="3" />
      <circle cx="41" cy="56" r="3" />
    </svg>
  );
}
