import { Link } from "react-router-dom";
import {
  Wrench, Gauge, Disc3, Hammer, Wind, Truck, BatteryCharging,
  RefreshCcw, Tent, Package, ArrowRight, Phone,
} from "lucide-react";
import { productGroups } from "../data/categories";

const groupMeta: Record<string, { Icon: React.ElementType; shortDesc: string }> = {
  "tyre-tube-repair": {
    Icon: Wrench,
    shortDesc: "Repair materials, patches, cements and carbide tools",
  },
  "tyre-fitting-handling": {
    Icon: Disc3,
    shortDesc: "Tyre levers, mounting paste, demount tools and more",
  },
  "valves-accessories": {
    Icon: Gauge,
    shortDesc: "Valve stems, caps, TPMS sensors and accessories",
  },
  "balance-weights": {
    Icon: Hammer,
    shortDesc: "Steel, zinc and adhesive balance weights for all wheels",
  },
  "air-tools-airlines": {
    Icon: Wind,
    shortDesc: "Air guns, gauges, couplings and airline fittings",
  },
  "jacking-lifting": {
    Icon: Truck,
    shortDesc: "Air jacks, hydraulic jacks and vehicle support stands",
  },
  "cordless-tools": {
    Icon: BatteryCharging,
    shortDesc: "Battery-powered torque tools and impact wrenches",
  },
  "retreading": {
    Icon: RefreshCcw,
    shortDesc: "Pre-cure tread rubber, envelopes and retread materials",
  },
  "outdoor-leisure": {
    Icon: Tent,
    shortDesc: "Tyre repair kits for 4WD, camping and recreational use",
  },
  "other-workshop": {
    Icon: Package,
    shortDesc: "Workshop consumables, signage and miscellaneous supplies",
  },
};

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

      {/* Group cards grid */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {productGroups.map((group) => {
            const meta = groupMeta[group.slug];
            const Icon = meta?.Icon ?? Package;
            const shortDesc = meta?.shortDesc ?? group.description;

            return (
              <Link
                key={group.id}
                to={`/products/${group.slug}`}
                className="group flex flex-col rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5"
                style={{
                  background: '#1e2a2e',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-teal)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
              >
                {/* Icon area */}
                <div
                  className="flex items-center justify-center pt-8 pb-6 px-6"
                  style={{ background: '#152028' }}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ background: 'rgba(245,184,0,0.12)', border: '1px solid rgba(245,184,0,0.2)' }}
                  >
                    <Icon size={30} style={{ color: '#f5b800' }} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-5 pb-6">
                  <h2
                    className="text-white font-bold uppercase text-base leading-snug mb-2 transition-colors group-hover:text-[#f5b800]"
                    style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.03em' }}
                  >
                    {group.name}
                  </h2>
                  <p className="text-zinc-400 text-xs leading-relaxed flex-1 mb-4">
                    {shortDesc}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded"
                      style={{ background: 'rgba(50,88,99,0.3)', color: 'var(--color-teal)' }}
                    >
                      {group.categories.length} {group.categories.length === 1 ? 'category' : 'categories'}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide transition-colors"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      Browse <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-14" style={{ background: 'var(--color-teal)' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-yellow)' }}>
              Need help finding something?
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-white leading-snug"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              Our specialists can source any tyre<br className="hidden md:block" /> or workshop supply.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              to="/contact"
              className="px-8 py-3.5 font-bold uppercase tracking-wide rounded transition-colors whitespace-nowrap text-center"
              style={{ background: 'var(--color-yellow)', color: 'var(--color-charcoal)', fontFamily: 'Oswald, sans-serif' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#ffc61a')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-yellow)')}
            >
              Contact Our Team
            </Link>
            <a
              href="tel:0387810600"
              className="flex items-center justify-center gap-2 border-2 border-white/40 px-8 py-3.5 font-bold uppercase tracking-wide rounded transition-colors whitespace-nowrap text-white hover:border-white hover:bg-white/10"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              <Phone size={15} /> 03 8781 0600
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
