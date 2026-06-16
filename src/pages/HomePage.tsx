import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, MapPin } from "lucide-react";
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

      {/* Customer References */}
      <section className="py-16" style={{ background: 'var(--color-offwhite)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center border border-zinc-200 bg-white rounded-lg p-10">
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-teal)' }}>
              Customer References
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}>
              References available on request
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-md mx-auto">
              We're happy to put you in touch with workshops and fleets we currently supply. Contact our team to request references.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wide rounded text-sm transition-colors text-white"
              style={{ background: 'var(--color-teal)', fontFamily: 'Oswald, sans-serif' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-teal-dark)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-teal)')}
            >
              Contact Us <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14" style={{ background: 'var(--color-yellow)' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-teal)' }}>
              Get Started Today
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
            >
              Ready to place an order?<br />Talk to our team.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              to="/contact"
              className="px-7 py-4 font-bold uppercase tracking-wide rounded transition-colors text-center text-white"
              style={{ background: 'var(--color-teal)', fontFamily: 'Oswald, sans-serif' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-teal-dark)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-teal)')}
            >
              Request a Quote
            </Link>
            <a
              href="tel:0387810600"
              className="flex items-center justify-center gap-2 border-2 px-7 py-4 font-bold uppercase tracking-wide rounded transition-colors"
              style={{ borderColor: 'var(--color-charcoal)', color: 'var(--color-charcoal)', fontFamily: 'Oswald, sans-serif' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-charcoal)'; e.currentTarget.style.color = 'var(--color-yellow)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-charcoal)'; }}
            >
              <Phone size={16} /> 03 8781 0600
            </a>
          </div>
        </div>
      </section>

      {/* Single location callout */}
      <section className="py-12" style={{ background: 'var(--color-charcoal)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-yellow)' }}>
              Our Location
            </div>
            <h2
              className="text-2xl font-bold text-white"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              Visit Our Dandenong South Warehouse
            </h2>
          </div>
          <div className="max-w-md mx-auto border border-white/10 rounded-lg p-6 text-center">
            <div
              className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'var(--color-teal)' }}
            >
              <MapPin size={22} className="text-white" />
            </div>
            <div
              className="text-white font-bold text-xl mb-1"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              Industrial Tyre Supplies
            </div>
            <div className="text-zinc-400 text-sm mb-1">2 Venture Court, Dandenong South VIC 3175</div>
            <div className="text-zinc-500 text-xs mb-4">Mon–Fri 8:00am–4:00pm · 03 8781 0600</div>
            <Link
              to="/contact"
              className="inline-block text-sm font-bold uppercase tracking-wide px-5 py-2.5 rounded transition-colors text-white"
              style={{ background: 'var(--color-teal)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-teal-dark)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-teal)')}
            >
              Get Directions & Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}