import { useState } from "react";
import { ImageOff } from "lucide-react";

// A product image with a graceful "Image coming soon" fallback. Used on every
// product card + the detail hero so the ~half of the catalogue that has no photo
// yet reads as intentional rather than a broken <img>.
//
// A source counts as "missing" when it is empty OR a leftover Unsplash
// placeholder (the old seed data) OR it fails to load at runtime.

export function isUsableImage(src?: string): src is string {
  return !!src && !src.includes("images.unsplash.com");
}

// Presentational placeholder — also used directly by the detail-page hero, which
// has its own surrounding box (zoom overlay, badges).
export function ImageComingSoon({ alt, className = "" }: { alt: string; className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1.5 bg-field ${className}`}
      role="img"
      aria-label={`${alt} — image coming soon`}
    >
      <ImageOff className="w-6 h-6 text-steel opacity-30" aria-hidden="true" />
      <span
        className="font-mono uppercase text-steel opacity-60 text-[10px]"
        style={{ letterSpacing: "0.12em" }}
      >
        Image coming soon
      </span>
    </div>
  );
}

interface ProductImageProps {
  src?: string;
  alt: string;
  /** Classes on the outer box — controls size + padding, e.g. "h-44 p-3". */
  className?: string;
  /** Extra classes on the <img> only (e.g. hover scale). */
  imgClassName?: string;
}

export default function ProductImage({ src, alt, className = "", imgClassName = "" }: ProductImageProps) {
  const [errored, setErrored] = useState(false);

  if (!isUsableImage(src) || errored) {
    return <ImageComingSoon alt={alt} className={className} />;
  }

  return (
    <div className={`bg-white overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setErrored(true)}
        className={`w-full h-full object-contain ${imgClassName}`}
      />
    </div>
  );
}
