import { Link } from "react-router-dom";
import { productGroups } from "../data/categories";

const QUICK_LINKS: { label: string; to: string }[] = [
  { label: "Products",        to: "/products" },
  { label: "About Us",        to: "/about" },
  { label: "Training",        to: "/training" },
  { label: "Shipping",        to: "/shipping" },
  { label: "Returns",         to: "/returns" },
  { label: "Contact",         to: "/contact" },
  { label: "Request a Quote", to: "/request-a-quote" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-field border-t" style={{ borderColor: '#3a3a3a' }}>
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        {/* Navigation columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h3
              className="font-mono uppercase text-[11px] mb-6"
              style={{ color: 'var(--color-signal)', letterSpacing: '0.12em' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-1">
              {QUICK_LINKS.map((l) => (
                <li key={l.to + l.label}>
                  <Link
                    to={l.to}
                    className="block py-2 text-[15px] text-field opacity-90 hover:opacity-100 hover:underline decoration-[var(--color-signal)] underline-offset-[6px] decoration-1 transition-all"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="font-mono uppercase text-[11px] mb-6"
              style={{ color: 'var(--color-signal)', letterSpacing: '0.12em' }}
            >
              Product Categories
            </h3>
            <ul className="space-y-1">
              {productGroups.map((group) => (
                <li key={group.slug}>
                  <Link
                    to={`/products/${group.slug}`}
                    className="block py-2 text-[15px] text-field opacity-90 hover:opacity-100 hover:underline decoration-[var(--color-signal)] underline-offset-[6px] decoration-1 transition-all"
                  >
                    {group.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal strip */}
        <div
          className="mt-14 md:mt-16 pt-6 border-t"
          style={{ borderColor: '#3a3a3a' }}
        >
          <div
            className="font-mono uppercase text-[10px] sm:text-[11px] text-steel flex flex-col sm:flex-row sm:items-center sm:gap-3"
            style={{ letterSpacing: '0.08em' }}
          >
            <span>Industrial Tyre Supplies Pty Ltd</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>ABN 48 533 559 801</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>© {year} All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
