import { Link } from "react-router-dom";
import { CheckCircle, Users, Award, MapPin, ArrowRight } from "lucide-react";

const milestones = [
  { year: "1987", event: "Industrial Tyre Supplies founded in Melbourne by the Hanley family, supplying tyre repair materials to Victorian workshops." },
  { year: "1994", event: "Expanded product range to include a full complement of workshop tools, jacking equipment and valve accessories." },
  { year: "2001", event: "Moved to our current Dandenong South warehouse, enabling bulk stockholding for next-day dispatch across Australia." },
  { year: "2008", event: "Launched dedicated service to the mining and earthmoving sector with expanded OTR and heavy-duty product lines." },
  { year: "2015", event: "ISO 9001 Quality Management System certification achieved, formalising our commitment to consistent product and service quality." },
  { year: "2021", event: "Expanded TPMS product range and launched this online product catalogue to better serve customers Australia-wide." },
];

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
            38 Years Supplying<br />Australia's Tyre Industry
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Founded in Melbourne in 1987, Industrial Tyre Supplies (ITS) has grown to become a trusted wholesale distributor of tyre repair materials, automotive tools and workshop equipment.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-teal)' }}>
            Our Mission
          </div>
          <h2 className="text-3xl font-bold mb-5" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}>
            Keeping Australia's Wheels Turning
          </h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed text-sm">
            <p>
              Industrial Tyre Supplies exists to provide professional tyre workshops, fleet operators, and automotive businesses with access to the best repair materials and tools available — at trade prices, with reliable supply and genuine technical support.
            </p>
            <p>
              We don't just sell products. Our team are industry professionals who understand the pressures of a busy tyre bay and the critical importance of quality repair materials. We stock what works, not just what sells.
            </p>
            <p>
              If you work on tyres and wheels, ITS has the tools and materials you need — dispatched from our Melbourne warehouse, delivered anywhere in Australia.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Users, stat: "3,200+", label: "Active Customers" },
            { icon: Award, stat: "38", label: "Years in Business" },
            { icon: MapPin, stat: "Melbourne", label: "Dandenong South VIC" },
            { icon: CheckCircle, stat: "ISO 9001", label: "Quality Certified" },
          ].map(({ icon: Icon, stat, label }) => (
            <div key={label} className="bg-white border border-zinc-200 rounded-lg p-6 text-center">
              <Icon size={28} className="mx-auto mb-3" style={{ color: 'var(--color-teal)' }} />
              <div
                className="text-3xl font-bold"
                style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
              >
                {stat}
              </div>
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* History */}
      <section className="py-14" style={{ background: 'var(--color-teal)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-yellow)' }}>
            Our History
          </div>
          <h2 className="text-3xl font-bold text-white mb-10" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Key Milestones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {milestones.map((m) => (
              <div key={m.year} className="border border-white/20 rounded-lg p-5 bg-white/5">
                <div
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--color-yellow)', fontFamily: 'Oswald, sans-serif' }}
                >
                  {m.year}
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-teal)' }}>
          Our Team
        </div>
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}>
          Industry Professionals
        </h2>
        <p className="text-zinc-600 mb-8 max-w-2xl text-sm leading-relaxed">
          Every member of the ITS team has hands-on experience in the tyre industry. We hire from workshops, fleets and tyre manufacturers — people who understand the products they're selling.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { name: "Technical Sales", text: "Former workshop technicians who can specify the right product for any repair scenario." },
            { name: "Product Sourcing", text: "Our buying team travels internationally to source quality products from leading global manufacturers." },
            { name: "Customer Service", text: "Dedicated account managers for trade customers, with rapid response to queries and orders." },
          ].map((t) => (
            <div key={t.name} className="bg-white border border-zinc-200 rounded-lg p-6">
              <h3
                className="font-bold text-lg mb-2"
                style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
              >
                {t.name}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{t.text}</p>
            </div>
          ))}
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
