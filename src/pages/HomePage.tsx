import { useState } from "react";
import type { SVGProps } from "react";
import { Link } from "react-router-dom";
import { productGroups } from "../data/categories";
import { getFeaturedProducts } from "../data/products";
import { ValveIcon } from "../components/icons/ValveIcon";
import { BottleJackIcon } from "../components/icons/BottleJackIcon";
import { RepairPatchIcon } from "../components/icons/RepairPatchIcon";
import { ImpactWrenchIcon } from "../components/icons/ImpactWrenchIcon";
import { TyreLeverIcon } from "../components/icons/TyreLeverIcon";
import { BalanceWeightIcon } from "../components/icons/BalanceWeightIcon";
import { ToolChestIcon } from "../components/icons/ToolChestIcon";

// Custom line-art icons, one per category tile.
// Slugs not in this map render without an icon (e.g. the All Categories tile).
const TILE_ICONS: Record<string, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  'tyre-fitting-handling': TyreLeverIcon,
  'valves-accessories':    ValveIcon,
  'tyre-tube-repair':      RepairPatchIcon,
  'jacking-lifting':       BottleJackIcon,
  'balance-weights':       BalanceWeightIcon,
  'air-tools-airlines':    ImpactWrenchIcon,
  'other-workshop':        ToolChestIcon,
};

// Spec-format card image:
// - Default state: SKU rendered as the visual identity on a field-coloured tile.
// - Override: if a product has a real image URL that loads, show it instead.
// All Unsplash URLs in the seed data are treated as placeholders (Bolt leftovers, not real product photos).
function ProductImage({ src, sku, alt }: { src?: string; sku: string; alt: string }) {
  const isPlaceholder = !src || src.includes('images.unsplash.com');
  const [errored, setErrored] = useState(false);

  if (isPlaceholder || errored) {
    return (
      <div className="aspect-[4/3] flex items-center justify-center bg-field border-b border-rule">
        <div
          className="font-mono text-steel leading-none text-[26px] sm:text-[28px] md:text-[30px]"
          style={{ letterSpacing: '0.04em' }}
        >
          {sku}
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-[4/3] bg-field border-b border-rule overflow-hidden">
      <img
        src={src}
        alt={alt}
        onError={() => setErrored(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

const specials: { label: string; text: string; to?: string }[] = [
  { label: "TRADE PRICING", text: "Volume orders — ask about trade pricing", to: "/contact" },
  { label: "CATALOGUE", text: "Browse the full product catalogue", to: "/products" },
];

// Editorial order for the category-tiles section below the hero banner.
// Slug references productGroups in src/data/categories.ts. Label is the
// display string for the tile heading (allows a small re-spelling for tile 7).
const HERO_TILE_ORDER: { slug: string; label: string }[] = [
  { slug: 'tyre-fitting-handling', label: 'Tyre Fitting & Handling' },
  { slug: 'valves-accessories',    label: 'Valves & Accessories' },
  { slug: 'tyre-tube-repair',      label: 'Tyre & Tube Repair' },
  { slug: 'jacking-lifting',       label: 'Jacking & Lifting' },
  { slug: 'balance-weights',       label: 'Balance Weights' },
  { slug: 'air-tools-airlines',    label: 'Air Tools & Airlines' },
  { slug: 'other-workshop',        label: 'Other / Workshop' },
];

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <div>
      {/* Specials marquee — site-wide announcement strip, directly under the header.
          Border on the bottom only; the header already supplies a 7px teal divider above. */}
      <section className="border-b border-zinc-700 overflow-hidden" style={{ background: '#222' }}>
        <div className="flex animate-scroll whitespace-nowrap" aria-label="Trade information">
          {[...specials, ...specials, ...specials].map((s, i) => {
            const inner = (
              <>
                <span
                  className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded"
                  style={{ background: 'var(--color-yellow)', color: 'var(--color-charcoal)' }}
                >
                  {s.label}
                </span>
                <span className="text-zinc-300 text-sm font-medium">{s.text}</span>
                <span className="text-zinc-600 mx-4 text-xl" aria-hidden="true">|</span>
              </>
            );
            return s.to ? (
              <Link key={i} to={s.to} className="inline-flex items-center gap-3 px-8 py-3.5 flex-shrink-0 hover:opacity-80 transition-opacity">
                {inner}
              </Link>
            ) : (
              <div key={i} className="inline-flex items-center gap-3 px-8 py-3.5 flex-shrink-0">
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* Hero — full-bleed banner with overlay headline + CTAs */}
      <section
        className="relative bg-ink min-h-[420px] sm:min-h-[480px] md:min-h-[540px] lg:min-h-[600px] flex items-center"
        style={{
          backgroundImage: "url('/hero/hero-4.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        {/* Dark gradient overlay — strongest on the left where the copy sits */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.05))',
          }}
        />

        {/* Overlay content — no card chrome, sits directly on the image */}
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1
              className="font-display uppercase leading-[1.02] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[58px] mb-5 md:mb-6"
              style={{
                color: 'var(--color-field)',
                letterSpacing: '0.02em',
                fontWeight: 800,
              }}
            >
              Tools and Materials<br className="hidden md:inline" /> for the Tyre Trade.
            </h1>
            <p
              className="font-sans text-base md:text-[18px] lg:text-[19px] leading-relaxed mb-7 md:mb-8 max-w-xl"
              style={{ color: 'rgba(237,238,240,0.85)' }}
            >
              If you work on tyres and wheels, ITS has what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/products"
                className="flex items-center justify-center px-7 py-3.5 font-sans font-medium uppercase text-sm hover:opacity-90 transition-opacity"
                style={{
                  background: 'var(--color-signal)',
                  color: 'var(--color-ink)',
                  letterSpacing: '0.05em',
                }}
              >
                View Catalogue
              </Link>
              <a
                href="tel:0387810600"
                className="flex items-center justify-center px-7 py-3.5 font-sans font-medium uppercase text-sm border transition-colors"
                style={{
                  borderColor: 'rgba(237,238,240,0.6)',
                  color: 'var(--color-field)',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(237,238,240,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(237,238,240,1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(237,238,240,0.6)';
                }}
              >
                Call 03 8781 0600
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Category tiles — 4×2 editorial grid */}
      <section className="bg-field py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {HERO_TILE_ORDER.map((tile) => {
              const group = productGroups.find((g) => g.slug === tile.slug);
              if (!group) return null;
              const count = group.categories.length;
              const Icon = TILE_ICONS[tile.slug];
              return (
                <Link
                  key={tile.slug}
                  to={`/products/${tile.slug}`}
                  className={`${Icon ? 'group ' : ''}block bg-white border border-rule p-5 md:p-6 transition-colors hover:border-[var(--color-teal)]`}
                >
                  {Icon && (
                    <Icon className="w-10 h-10 md:w-12 md:h-12 mb-3 text-steel group-hover:text-[var(--color-teal)] transition-colors" />
                  )}
                  <h3
                    className="font-display uppercase text-ink text-[18px] md:text-[20px] leading-[1.1]"
                    style={{ letterSpacing: '0.04em', fontWeight: 800 }}
                  >
                    {tile.label}
                  </h3>
                  <div className="border-t border-rule mt-3 mb-3" />
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-steel">
                    {count} {count === 1 ? 'category' : 'categories'}
                  </div>
                </Link>
              );
            })}
            {/* Tile 8 — All Categories wayfinding tile */}
            <Link
              to="/products"
              className="block bg-white border border-rule p-5 md:p-6 transition-colors hover:border-[var(--color-teal)]"
            >
              <h3
                className="font-display uppercase text-[18px] md:text-[20px] leading-[1.1]"
                style={{
                  color: 'var(--color-teal)',
                  letterSpacing: '0.04em',
                  fontWeight: 800,
                }}
              >
                All Categories →
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products — spec-panel cards with SKU-as-image fallback */}
      {featured.length > 0 && (
        <section className="border-t border-rule py-14 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-8 md:mb-10">
              <div className="font-mono text-[11px] uppercase mb-2" style={{ color: 'var(--color-teal)', letterSpacing: '0.12em' }}>
                Featured
              </div>
              <h2
                className="font-display uppercase text-ink text-[36px] md:text-[42px] lg:text-[46px] leading-[1.02] mb-5"
                style={{ letterSpacing: '0.04em', fontWeight: 800 }}
              >
                Featured Products
              </h2>
              <div className="flex items-center gap-5">
                <div className="flex-1 border-t border-rule" aria-hidden="true" />
                <Link
                  to="/products"
                  className="font-mono text-[11px] uppercase whitespace-nowrap hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-teal)', letterSpacing: '0.12em' }}
                >
                  View All Catalogue →
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((product) => {
                const group = productGroups.find((g) => g.slug === product.groupSlug);
                const category = group?.categories.find((c) => c.slug === product.categorySlug);
                const groupName = group?.name ?? '';
                const breadcrumb = category ? `${groupName} / ${category.name}` : groupName;
                return (
                  <Link
                    key={product.id}
                    to={`/products/${product.groupSlug}/${product.categorySlug}/${product.subcategorySlug}/${product.id}`}
                    className="flex flex-col bg-white border border-rule transition-colors hover:border-[var(--color-teal)]"
                  >
                    <ProductImage
                      src={product.image}
                      sku={product.sku}
                      alt={product.name}
                    />
                    <div className="flex flex-col flex-1 px-5 py-5">
                      <div
                        className="font-mono text-[11px] uppercase text-steel mb-2"
                        style={{ letterSpacing: '0.05em' }}
                      >
                        {product.sku}
                      </div>
                      <h3
                        className="font-display uppercase text-ink text-[18px] md:text-[20px] leading-[1.1] mb-2 line-clamp-2"
                        style={{ letterSpacing: '0.03em', fontWeight: 800 }}
                      >
                        {product.name}
                      </h3>
                      <div className="font-sans text-[12.5px] leading-snug text-steel mb-5">
                        {breadcrumb}
                      </div>
                      <div className="mt-auto">
                        <span
                          className="font-mono text-[11px] uppercase"
                          style={{ color: 'var(--color-teal)', letterSpacing: '0.05em' }}
                        >
                          Contact for Pricing →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Why ITS — spec-panel cards on field bg */}
      <section className="py-14 md:py-16 lg:py-20 bg-field border-t border-rule">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 md:mb-12 max-w-4xl">
            <div className="font-mono text-[11px] uppercase mb-3" style={{ color: 'var(--color-teal)', letterSpacing: '0.12em' }}>
              Why ITS
            </div>
            <h2
              className="font-display uppercase text-ink text-[34px] md:text-[40px] lg:text-[44px] leading-[1.04] mb-4"
              style={{ letterSpacing: '0.04em', fontWeight: 800 }}
            >
              Trade Supplier of Tyre Repair<br className="hidden md:inline" /> Materials, Tools & Workshop Equipment
            </h2>
            <p className="font-sans text-[16px] md:text-[17px] leading-relaxed" style={{ color: 'var(--color-steel)' }}>
              Based in Dandenong South. Dispatching Australia-wide since 1978.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Since 1978",
                text: "Supplying the Australian tyre trade since 1978 from our base in Dandenong South.",
              },
              {
                title: "Australia-wide Dispatch",
                text: "Dispatching nationwide from our Melbourne warehouse. Freight rates by quote.",
              },
              {
                title: "Trade Specialist",
                text: "Specialist supplier focused exclusively on the tyre trade — repair materials, tools, valves, balance weights, workshop equipment.",
              },
              {
                title: "Genuine Product",
                text: "We supply original branded product from established manufacturers.",
              },
            ].map(({ title, text }) => (
              <div key={title} className="bg-white border border-rule p-5 md:p-6">
                <h3
                  className="font-display uppercase text-ink text-[18px] md:text-[20px] leading-[1.1] mb-3"
                  style={{ letterSpacing: '0.04em', fontWeight: 800 }}
                >
                  {title}
                </h3>
                <div className="border-t border-rule mb-3" />
                <p className="font-sans text-[14.5px] leading-[1.4] text-ink">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign-off — dark spec format, inverted. Closes the page. */}
      <section
        className="relative py-20 md:py-28"
        style={{
          backgroundColor: 'var(--color-ink)',
          borderTop: '2px solid var(--color-signal)',
        }}
      >
        {/* Documentary backdrop — workshop photo at ~5–8% visibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,26,26,0.90), rgba(26,26,26,0.92)), url('/hero/hero-1.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16">
            {/* Left — the conversion column */}
            <div>
              <div
                className="font-mono text-[11px] uppercase mb-6"
                style={{ color: 'var(--color-signal)', letterSpacing: '0.12em' }}
              >
                Ready to Order
              </div>

              <a
                href="tel:0387810600"
                className="block font-display leading-[0.95] text-[44px] sm:text-[56px] md:text-[64px] lg:text-[76px] hover:opacity-90 transition-opacity"
                style={{
                  color: 'var(--color-field)',
                  letterSpacing: '0.02em',
                  fontWeight: 800,
                }}
                aria-label="Call ITS on 03 8781 0600"
              >
                03 8781 0600
              </a>

              <p
                className="font-sans text-[15px] md:text-[17px] leading-relaxed mt-5"
                style={{ color: 'var(--color-steel)' }}
              >
                Mon–Fri 8:00am–4:00pm · Trade enquiries welcome.
              </p>

              <div className="border-t my-8 md:my-10" style={{ borderColor: '#3a3a3a' }} />

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-10 gap-y-4 items-start">
                <Link
                  to="/request-a-quote"
                  className="font-mono text-[12px] uppercase whitespace-nowrap hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-signal)', letterSpacing: '0.1em' }}
                >
                  Request a Quote →
                </Link>
                <a
                  href="mailto:its-office@itsindustrial.com.au"
                  className="font-mono text-[12px] uppercase break-all hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-signal)', letterSpacing: '0.1em' }}
                >
                  Email its-office@itsindustrial.com.au →
                </a>
              </div>

            </div>

            {/* Right — warehouse spec block */}
            <div>
              <h2
                className="font-display uppercase text-[28px] md:text-[34px] lg:text-[40px] leading-none mb-6 md:mb-8"
                style={{ color: 'var(--color-field)', letterSpacing: '0.04em', fontWeight: 800 }}
              >
                Warehouse
              </h2>
              <dl
                className="border-y border-[#3a3a3a] divide-y divide-[#3a3a3a]"
              >
                {[
                  {
                    label: 'ADDRESS',
                    value: (
                      <>
                        2 Venture Court
                        <br />
                        Dandenong South, Victoria 3175
                      </>
                    ),
                  },
                  { label: 'HOURS', value: 'Mon–Fri 8:00am–4:00pm' },
                  { label: 'PHONE', value: '03 8781 0600' },
                  { label: 'EMAIL', value: 'its-office@itsindustrial.com.au' },
                  { label: 'ABN', value: '48 533 559 801' },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] sm:items-baseline py-3 gap-y-1 sm:gap-y-0"
                  >
                    <dt
                      className="font-mono text-[10.5px] uppercase"
                      style={{ color: 'var(--color-steel)', letterSpacing: '0.1em' }}
                    >
                      {row.label}
                    </dt>
                    <dd
                      className="font-sans text-[14.5px] md:text-[15px] leading-snug break-all sm:break-normal"
                      style={{ color: 'var(--color-field)' }}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}