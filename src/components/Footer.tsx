import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 text-zinc-400" style={{ background: 'var(--color-charcoal)' }}>
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="block mb-5">
              <img
                src="/ITS_Logo.png"
                alt="Industrial Tyre Supplies"
                className="h-9 w-auto object-contain bg-transparent"
              />
            </Link>
            <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-yellow)' }}>
              Since 1978
            </div>
            <p className="text-sm leading-relaxed mb-5 text-zinc-400">
              Melbourne-based wholesale supplier of tyre repair materials, automotive tools and workshop equipment, dispatching Australia-wide.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:0387810600" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} style={{ color: 'var(--color-yellow)' }} />
                03 8781 0600
              </a>
              <a href="mailto:its-office@itsindustrial.com.au" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={14} style={{ color: 'var(--color-yellow)' }} />
                its-office@itsindustrial.com.au
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-yellow)' }} />
                <span>2 Venture Court, Dandenong South VIC 3175</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} style={{ color: 'var(--color-yellow)' }} />
                Mon–Fri 8:00am–4:00pm
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Products", to: "/products" },
                { label: "About Us", to: "/about" },
                { label: "Training & Education", to: "/training" },
                { label: "Shipping Information", to: "/shipping" },
                { label: "Returns Policy", to: "/returns" },
                { label: "Contact Us", to: "/contact" },
                { label: "Request a Quote", to: "/contact" },
              ].map((l) => (
                <li key={l.to + l.label}>
                  <Link to={l.to} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Product Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Tyre & Tube Repair", slug: "tyre-tube-repair" },
                { name: "Tyre Fitting & Handling", slug: "tyre-fitting-handling" },
                { name: "Valves & Accessories", slug: "valves-accessories" },
                { name: "Balance Weights", slug: "balance-weights" },
                { name: "Air Tools & Airlines", slug: "air-tools-airlines" },
                { name: "Jacking & Lifting", slug: "jacking-lifting" },
                { name: "Cordless Tools", slug: "cordless-tools" },
                { name: "Retreading", slug: "retreading" },
              ].map(({ name, slug }) => (
                <li key={slug}>
                  <Link to={`/products/${slug}`} className="hover:text-white transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Our Warehouse
            </h3>
            <div className="border border-white/10 rounded-lg p-4 text-sm space-y-3">
              <div>
                <div className="text-white font-semibold mb-0.5">Industrial Tyre Supplies Pty Ltd</div>
                <div className="text-xs text-zinc-500">ABN 48 533 559 801</div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-yellow)' }} />
                <div>
                  <div>2 Venture Court</div>
                  <div>Dandenong South VIC 3175</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} style={{ color: 'var(--color-yellow)' }} />
                <a href="tel:0387810600" className="hover:text-white transition-colors">03 8781 0600</a>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} style={{ color: 'var(--color-yellow)' }} />
                <span className="text-xs">Mon–Fri 8:00am–4:00pm</span>
              </div>
              <Link
                to="/contact"
                className="block text-center text-xs font-bold py-2 rounded mt-1 transition-colors"
                style={{ background: 'var(--color-teal)', color: 'white' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-teal-dark)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-teal)')}
              >
                Get Directions
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} Industrial Tyre Supplies Pty Ltd — All Rights Reserved. ABN 48 533 559 801</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-zinc-400 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
