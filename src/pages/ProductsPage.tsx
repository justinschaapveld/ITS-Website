import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { productGroups } from "../data/categories";

export default function ProductsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-offwhite)' }}>
      {/* Page heading */}
      <section className="py-16 border-b border-zinc-200" style={{ background: 'var(--color-charcoal)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-teal)' }}>
            Product Catalogue
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold text-white uppercase leading-none mb-5"
            style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.02em' }}
          >
            Our Product Range
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Everything you need for tyre repair, fitting, balancing and workshop service — supplied to trade across Australia.
          </p>
        </div>
      </section>

      {/* Group cards grid — spec-panel format */}
      <section className="max-w-7xl mx-auto px-4 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {productGroups.map((group) => {
            const examples = group.categories.slice(0, 4).map((c) => c.name).join(' · ');
            return (
              <Link
                key={group.id}
                to={`/products/${group.slug}`}
                className="block bg-white border border-rule p-6 md:p-7 transition-colors hover:border-[var(--color-teal)]"
              >
                <h2
                  className="font-display uppercase text-ink text-[20px] md:text-[22px] leading-[1.1] mb-3"
                  style={{ letterSpacing: '0.04em', fontWeight: 800 }}
                >
                  {group.name}
                </h2>
                <div className="border-t border-rule" />
                <dl className="py-4 space-y-3">
                  <div className="grid grid-cols-[96px_1fr] gap-3 items-baseline">
                    <dt className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-steel">
                      {group.categories.length === 1 ? 'Category' : 'Categories'}
                    </dt>
                    <dd className="font-mono text-[13px] text-ink">
                      {group.categories.length}
                    </dd>
                  </div>
                  <div className="grid grid-cols-[96px_1fr] gap-3 items-baseline">
                    <dt className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-steel pt-0.5">
                      Examples
                    </dt>
                    <dd className="font-mono text-[12.5px] text-ink leading-relaxed line-clamp-2">
                      {examples}
                    </dd>
                  </div>
                </dl>
                <div className="border-t border-rule" />
                <div className="mt-4 flex justify-end">
                  <span
                    className="font-mono text-[11px] tracking-[0.12em] uppercase"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    Browse →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Strip — field background, rule border, signal CTA */}
      <section className="py-12 md:py-14 bg-field border-t border-rule">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-7">
          <div>
            <div className="font-sans font-medium uppercase mb-2 text-[11px] text-steel" style={{ letterSpacing: '0.15em' }}>
              Need help finding something?
            </div>
            <h2
              className="font-display uppercase text-ink text-[26px] md:text-[30px] leading-[1.1]"
              style={{ letterSpacing: '0.04em', fontWeight: 800 }}
            >
              Our specialists can source any tyre<br className="hidden md:block" /> or workshop supply.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
            <Link
              to="/contact"
              className="flex items-center justify-center px-7 py-3.5 font-sans font-medium uppercase text-sm hover:opacity-90 transition-opacity text-center"
              style={{ background: 'var(--color-signal)', color: 'var(--color-ink)', letterSpacing: '0.06em' }}
            >
              Contact Our Team
            </Link>
            <a
              href="tel:0387810600"
              className="flex items-center justify-center gap-2 border px-7 py-3.5 font-sans font-medium uppercase text-sm transition-colors"
              style={{ borderColor: 'var(--color-teal)', color: 'var(--color-teal)', letterSpacing: '0.06em' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-teal)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-teal)'; }}
            >
              <Phone size={15} /> 03 8781 0600
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
