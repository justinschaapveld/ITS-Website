import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-offwhite)' }}>
      <section className="border-b border-white/10 py-14" style={{ background: 'var(--color-teal)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-yellow)' }}>
            Returns
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Returns and Warranty</h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-zinc-600 text-lg leading-relaxed mb-8">
          For returns or warranty claims, contact our team with your order details and we'll arrange the right outcome. Faulty product is covered by manufacturer warranty.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-bold uppercase tracking-wide rounded transition-colors whitespace-nowrap text-white"
            style={{ background: 'var(--color-teal)', fontFamily: 'Oswald, sans-serif' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-teal-dark)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-teal)')}
          >
            Contact Us <ArrowRight size={16} />
          </Link>
          <a
            href="tel:0387810600"
            className="inline-flex items-center justify-center gap-2 border-2 px-7 py-3.5 font-bold uppercase tracking-wide rounded transition-colors whitespace-nowrap"
            style={{ borderColor: 'var(--color-teal)', color: 'var(--color-teal)', fontFamily: 'Oswald, sans-serif' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-teal)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-teal)'; }}
          >
            <Phone size={16} /> 03 8781 0600
          </a>
        </div>
      </div>
    </div>
  );
}
