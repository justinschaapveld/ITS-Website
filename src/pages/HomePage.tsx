import { useState } from "react";
import { Link } from "react-router-dom";
import { productGroups } from "../data/categories";
import { getFeaturedProducts } from "../data/products";

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
  { label: "TRADE PRICING", text: "Volume orders — ask about trade pricing" },
  { label: "CATALOGUE", text: "Browse the full product catalogue", to: "/products" },
];

// Confirmed company data — used in the hero spec block.
const heroSpecRows: { label: string; value: string }[] = [
  { label: "SUPPLIER", value: "Industrial Tyre Supplies" },
  { label: "FOUNDED",  value: "1978" },
  { label: "ABN",      value: "48 533 559 801" },
  { label: "BASE",     value: "Dandenong South, Victoria" },
  { label: "DISPATCH", value: "Australia-wide" },
];

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <div>
      {/* Hero — spec-format identity card */}
      <section className="bg-field border-b border-rule">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-5 lg:gap-6">
            {/* Left: identity spec block + headline + CTAs */}
            <div className="bg-white border border-rule p-6 md:p-8 lg:p-10">
              <dl className="border-y border-rule divide-y divide-[var(--color-rule)]">
                {heroSpecRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col sm:grid sm:grid-cols-[110px_1fr] sm:items-baseline py-2.5 gap-y-1 sm:gap-y-0"
                  >
                    <dt className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-steel">
                      {row.label}
                    </dt>
                    <dd className="font-sans text-[15px] leading-snug text-ink">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <h1
                className="font-display uppercase text-ink mt-8 md:mt-10 leading-[1.02] text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem]"
                style={{ letterSpacing: '0.05em', fontWeight: 800 }}
              >
                Tools and<br className="hidden md:inline" /> Materials for the Tyre Trade.
              </h1>

              <p className="font-sans text-base md:text-[17px] leading-relaxed mt-4 md:mt-5 max-w-md" style={{ color: 'rgba(26,26,26,0.65)' }}>
                If you work on tyres and wheels, ITS has what you need.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-7 md:mt-8">
                <Link
                  to="/products"
                  className="flex items-center justify-center px-6 py-3.5 font-sans font-medium uppercase text-sm hover:opacity-90 transition-opacity"
                  style={{ background: 'var(--color-signal)', color: 'var(--color-ink)', letterSpacing: '0.06em' }}
                >
                  View Catalogue
                </Link>
                <a
                  href="tel:0387810600"
                  className="flex items-center justify-center px-6 py-3.5 font-sans font-medium uppercase text-sm border transition-colors hover:text-white"
                  style={{ borderColor: 'var(--color-teal)', color: 'var(--color-teal)', letterSpacing: '0.06em' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-teal)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-teal)'; }}
                >
                  Call 03 8781 0600
                </a>
              </div>
            </div>

            {/* Right: catalogue grid — all 10 product groups */}
            <div className="bg-white border border-rule p-5 md:p-6 lg:p-8 flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {productGroups.map((group) => (
                  <Link
                    key={group.id}
                    to={`/products/${group.slug}`}
                    className="block bg-white border border-rule p-4 md:p-5 transition-colors hover:border-[var(--color-teal)]"
                  >
                    <div
                      className="font-display uppercase text-ink text-[15px] md:text-[16px] leading-[1.1]"
                      style={{ letterSpacing: '0.04em', fontWeight: 800 }}
                    >
                      {group.name}
                    </div>
                    <div className="border-t border-rule mt-2.5 mb-2.5" />
                    <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-steel">
                      {group.categories.length} {group.categories.length === 1 ? 'category' : 'categories'}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-5 md:mt-6 flex justify-end">
                <Link
                  to="/products"
                  className="font-mono text-[11px] tracking-[0.12em] uppercase hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-teal)' }}
                >
                  All Categories →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specials strip */}
      <section className="border-y border-zinc-700 overflow-hidden" style={{ background: '#222' }}>
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

              <p
                className="font-mono text-[11px] uppercase mt-8"
                style={{ color: 'var(--color-steel)', letterSpacing: '0.1em' }}
              >
                Trade references available on request.
              </p>
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