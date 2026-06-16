import { Package, Truck, Shield, Headphones, Phone, Mail, Clock } from "lucide-react";
import QuoteRequestForm from "../components/QuoteRequestForm";

const WHY_ITEMS = [
  {
    icon: Package,
    title: "Trade Pricing for Volume Buyers",
    desc: "Account customers and high-volume purchasers receive preferential pricing and extended payment terms.",
  },
  {
    icon: Headphones,
    title: "Direct Access to Product Specialists",
    desc: "Our team has decades of hands-on tyre industry experience and can advise on the right product for your application.",
  },
  {
    icon: Truck,
    title: "Same-Day Melbourne Dispatch",
    desc: "Orders confirmed before 2pm (AEST) on stocked items are dispatched same business day from Dandenong South.",
  },
  {
    icon: Shield,
    title: "Nationwide Shipping",
    desc: "We ship to all states and territories. Freight rates available on request for regional and remote locations.",
  },
];

export default function RequestAQuotePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-offwhite)" }}>
      {/* Page hero */}
      <section className="py-14" style={{ background: "var(--color-charcoal)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--color-teal)" }}>
            Trade Enquiries
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white uppercase leading-none mb-3"
            style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.02em" }}
          >
            Request a Quote
          </h1>
          <p className="text-zinc-400 text-base max-w-xl leading-relaxed">
            Tell us what you need and our team will get back to you within one business day.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* LEFT — Form */}
          <div className="lg:w-[60%] flex-shrink-0">
            <div className="bg-white border border-zinc-200 rounded-xl p-7 md:p-10 shadow-sm">
              <QuoteRequestForm />
            </div>
          </div>

          {/* RIGHT — Trust panel */}
          <div className="flex-1 min-w-0">
            <div className="space-y-8 lg:sticky lg:top-32">
              {/* Heading */}
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--color-teal)" }}>
                  Why ITS?
                </div>
                <h2
                  className="text-2xl font-bold uppercase leading-tight"
                  style={{ fontFamily: "Oswald, sans-serif", color: "var(--color-charcoal)" }}
                >
                  Why request a quote from ITS
                </h2>
              </div>

              {/* Why items */}
              <div className="space-y-5">
                {WHY_ITEMS.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(50,88,99,0.1)", border: "1px solid rgba(50,88,99,0.15)" }}
                    >
                      <Icon size={18} style={{ color: "var(--color-teal)" }} />
                    </div>
                    <div>
                      <div
                        className="font-bold text-sm mb-1 uppercase tracking-tight"
                        style={{ fontFamily: "Oswald, sans-serif", color: "var(--color-charcoal)" }}
                      >
                        {title}
                      </div>
                      <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact block */}
              <div
                className="rounded-xl p-6 space-y-4"
                style={{ background: "var(--color-charcoal)" }}
              >
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: "var(--color-teal)" }}
                >
                  Contact us directly
                </div>
                <a
                  href="tel:0387810600"
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(245,184,0,0.15)" }}
                  >
                    <Phone size={16} style={{ color: "#f5b800" }} />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wide">Phone</div>
                    <div className="text-white font-bold text-sm group-hover:text-yellow-400 transition-colors">03 8781 0600</div>
                  </div>
                </a>
                <a
                  href="mailto:its-office@itsindustrial.com.au"
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(245,184,0,0.15)" }}
                  >
                    <Mail size={16} style={{ color: "#f5b800" }} />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wide">Email</div>
                    <div className="text-white font-bold text-sm group-hover:text-yellow-400 transition-colors break-all">
                      its-office@itsindustrial.com.au
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(245,184,0,0.15)" }}
                  >
                    <Clock size={16} style={{ color: "#f5b800" }} />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wide">Hours</div>
                    <div className="text-white text-sm font-semibold">Mon–Fri 8:00am – 4:00pm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
