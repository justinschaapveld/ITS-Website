import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone, Mail, Clock, Wrench } from "lucide-react";
import { productGroups } from "../data/categories";

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-offwhite)' }}>
      {/* Hero */}
      <section className="border-b border-white/10 py-16" style={{ background: 'var(--color-teal)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-yellow)' }}>
            About Us
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Supplying the Australian<br />Tyre Trade Since 1978
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Industrial Tyre Supplies (ITS) is a wholesale distributor of tyre repair materials, automotive tools and workshop equipment, based in Dandenong South, Victoria.
          </p>
        </div>
      </section>

      {/* Who we supply / what we specialise in */}
      <section className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-teal)' }}>
            Who We Supply
          </div>
          <h2 className="text-3xl font-bold mb-5" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}>
            Trade Customers Across Australia
          </h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed text-sm">
            <p>
              ITS supplies tyre workshops, fleet operators and agricultural businesses with the materials and tools they rely on for day-to-day repair and service work.
            </p>
            <p>
              We dispatch Australia-wide from our Dandenong South warehouse — wherever your business is based, we can supply it.
            </p>
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-teal)' }}>
            What We Specialise In
          </div>
          <h2 className="text-3xl font-bold mb-5" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}>
            Our Product Range
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {productGroups.map((group) => (
              <Link
                key={group.id}
                to={`/products/${group.slug}`}
                className="flex items-center gap-2 text-sm text-zinc-600 hover:text-[var(--color-teal)] transition-colors py-1"
              >
                <Wrench size={13} className="flex-shrink-0" style={{ color: 'var(--color-teal)' }} />
                {group.name}
              </Link>
            ))}
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold uppercase tracking-wide transition-colors hover:opacity-70"
            style={{ color: 'var(--color-teal)' }}
          >
            View Full Catalogue <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Confirmed details */}
      <section className="py-14" style={{ background: 'var(--color-teal)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-yellow)' }}>
            Company Details
          </div>
          <h2 className="text-3xl font-bold text-white mb-10" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Industrial Tyre Supplies Pty Ltd
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: MapPin, label: "Warehouse", value: "2 Venture Court, Dandenong South VIC 3175" },
              { icon: Clock, label: "Trading Hours", value: "Mon–Fri 8:00am–4:00pm" },
              { icon: Phone, label: "Phone", value: "03 8781 0600" },
              { icon: Mail, label: "Email", value: "its-office@itsindustrial.com.au" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="border border-white/20 rounded-lg p-5 bg-white/5">
                <Icon size={20} className="mb-3" style={{ color: 'var(--color-yellow)' }} />
                <div className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">{label}</div>
                <div className="text-white text-sm leading-relaxed">{value}</div>
              </div>
            ))}
          </div>
          <div className="text-white/50 text-xs mt-6">ABN 48 533 559 801</div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12" style={{ background: 'var(--color-yellow)' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div
              className="font-bold text-2xl"
              style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
            >
              Want to open a trade account?
            </div>
            <p className="text-zinc-700 mt-1 text-sm">Talk to our team about trade pricing and account terms.</p>
          </div>
          <Link
            to="/contact"
            className="flex items-center gap-2 px-7 py-3.5 font-bold uppercase tracking-wide rounded transition-colors whitespace-nowrap text-white"
            style={{ background: 'var(--color-teal)', fontFamily: 'Oswald, sans-serif' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-teal-dark)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-teal)')}
          >
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
