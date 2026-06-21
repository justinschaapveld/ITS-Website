import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { productGroups } from "../data/categories";
import type { Product } from "../data/products";
import ProductImage from "./ProductImage";

// Home "Featured Products" row. Shows up to 4 cards at once and auto-advances ONE
// product at a time, looping seamlessly. Which products appear is driven by the
// `Featured (Y/N)` column in data/products.xlsx (product.featured), so the
// selection is edited in the spreadsheet — not hard-coded here.

const AUTO_MS = 3500;

function FeaturedCard({ product }: { product: Product }) {
  const group = productGroups.find((g) => g.slug === product.groupSlug);
  const category = group?.categories.find((c) => c.slug === product.categorySlug);
  const groupName = group?.name ?? "";
  const breadcrumb = category ? `${groupName} / ${category.name}` : groupName;
  return (
    <Link
      to={`/products/${product.groupSlug}/${product.categorySlug}/${product.subcategorySlug}/${product.id}`}
      className="flex flex-col h-full bg-white border border-rule transition-colors hover:border-[var(--color-teal)]"
    >
      <ProductImage src={product.image} alt={product.name} className="aspect-[4/3] p-3 border-b border-rule" />
      <div className="flex flex-col flex-1 px-5 py-5">
        <div className="font-mono text-[11px] uppercase text-steel mb-2" style={{ letterSpacing: "0.05em" }}>
          {product.sku}
        </div>
        <h3
          className="font-display uppercase text-ink text-[18px] md:text-[20px] leading-[1.1] mb-2 line-clamp-2"
          style={{ letterSpacing: "0.03em", fontWeight: 800 }}
        >
          {product.name}
        </h3>
        <div className="font-sans text-[12.5px] leading-snug text-steel mb-5">{breadcrumb}</div>
        <div className="mt-auto">
          <span className="font-mono text-[11px] uppercase" style={{ color: "var(--color-teal)", letterSpacing: "0.05em" }}>
            Contact for Pricing →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedCarousel({ items }: { items: Product[] }) {
  // Responsive visible count: 1 (mobile) / 2 (sm) / 4 (lg).
  const [visible, setVisible] = useState(4);
  useEffect(() => {
    const calc = () => setVisible(window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const n = items.length;
  const loop = n > visible;

  // Index points into the clone-padded slide list; the first real slide is at `visible`.
  const [index, setIndex] = useState(visible);
  const [animate, setAnimate] = useState(true);
  const pausedRef = useRef(false);

  // Reset to the first real slide whenever the layout (visible count) changes.
  useEffect(() => {
    setAnimate(false);
    setIndex(visible);
  }, [visible, n]);

  // Auto-advance forward, paused on hover.
  useEffect(() => {
    if (!loop) return;
    const id = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => i + 1);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [loop]);

  // Re-enable the transition on the frame after a no-animation jump.
  useEffect(() => {
    if (animate) return;
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(r);
  }, [animate]);

  const step = useCallback((dir: number) => setIndex((i) => i + dir), []);

  if (!loop) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((p) => (
          <FeaturedCard key={p.id} product={p} />
        ))}
      </div>
    );
  }

  // Clone `visible` items on each end so stepping past either edge stays seamless.
  const slides = [...items.slice(n - visible), ...items, ...items.slice(0, visible)];
  const basis = 100 / visible;

  // After a transition, if we've landed in a clone zone, jump (no animation) to the
  // matching real slide so the loop is invisible.
  function onSettle() {
    if (index >= visible + n) {
      setAnimate(false);
      setIndex(index - n);
    } else if (index < visible) {
      setAnimate(false);
      setIndex(index + n);
    }
  }

  const arrowCls =
    "absolute top-[28%] -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center " +
    "bg-white border border-rule text-ink shadow-sm hover:border-[var(--color-teal)] hover:text-[var(--color-teal)] transition-colors";

  return (
    <div
      className="relative"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            transform: `translateX(-${index * basis}%)`,
            transition: animate ? "transform 500ms ease" : "none",
          }}
          onTransitionEnd={(e) => {
            if (e.propertyName === "transform") onSettle();
          }}
        >
          {slides.map((p, i) => (
            <div key={`${p.id}-${i}`} className="px-3" style={{ flex: `0 0 ${basis}%` }}>
              <FeaturedCard product={p} />
            </div>
          ))}
        </div>
      </div>

      <button type="button" aria-label="Previous products" className={`${arrowCls} left-0 -ml-1 sm:-ml-4`} onClick={() => step(-1)}>
        <ChevronLeft size={18} />
      </button>
      <button type="button" aria-label="Next products" className={`${arrowCls} right-0 -mr-1 sm:-mr-4`} onClick={() => step(1)}>
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
