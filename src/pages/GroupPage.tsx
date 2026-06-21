import { useParams, Link } from "react-router-dom";
import {
  Wrench, Gauge, Disc3, Hammer, Wind, Truck, BatteryCharging,
  RefreshCcw, Tent, Package, ArrowRight, Phone, Tag,
} from "lucide-react";
import { getGroupBySlug } from "../data/categories";
import { getProductsByGroup } from "../data/products";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductImage from "../components/ProductImage";

const groupIcons: Record<string, React.ElementType> = {
  "tyre-tube-repair": Wrench,
  "tyre-fitting-handling": Disc3,
  "valves-accessories": Gauge,
  "balance-weights": Hammer,
  "air-tools-airlines": Wind,
  "jacking-lifting": Truck,
  "cordless-tools": BatteryCharging,
  "retreading": RefreshCcw,
  "outdoor-leisure": Tent,
  "other-workshop": Package,
};

export default function GroupPage() {
  const { groupSlug } = useParams<{ groupSlug: string }>();
  const group = getGroupBySlug(groupSlug!);
  const allGroupProducts = getProductsByGroup(groupSlug!);
  const popularProducts = allGroupProducts.filter((p) => p.featured).slice(0, 8).length >= 4
    ? allGroupProducts.filter((p) => p.featured).slice(0, 8)
    : allGroupProducts.slice(0, 8);

  if (!group) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}>
          Category Not Found
        </h1>
        <Link to="/products" className="mt-4 inline-block font-semibold hover:opacity-70 transition-opacity" style={{ color: 'var(--color-teal)' }}>
          ← Back to Products
        </Link>
      </div>
    );
  }

  const GroupIcon = groupIcons[group.slug] ?? Package;

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-offwhite)' }}>
      {/* Hero header */}
      <section className="py-14" style={{ background: 'var(--color-charcoal)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-5">
            <Breadcrumbs items={[{ label: "Products", href: "/products" }, { label: group.name }]} />
          </div>
          <div className="flex items-start gap-6">
            <div
              className="hidden sm:flex flex-shrink-0 w-16 h-16 rounded-xl items-center justify-center"
              style={{ background: 'rgba(245,184,0,0.12)', border: '1px solid rgba(245,184,0,0.22)' }}
            >
              <GroupIcon size={30} style={{ color: '#f5b800' }} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-teal)' }}>
                Product Group
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold text-white uppercase leading-none mb-3"
                style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.02em' }}
              >
                {group.name}
              </h1>
              <p className="text-zinc-400 text-base max-w-2xl leading-relaxed">{group.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-lg font-bold uppercase tracking-wide"
            style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
          >
            {group.categories.length} {group.categories.length === 1 ? 'Category' : 'Categories'}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {group.categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products/${group.slug}/${cat.slug}`}
              className="group flex flex-col bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-teal)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#e4e4e7')}
            >
              {/* Icon strip */}
              <div
                className="flex items-center gap-3 px-5 py-4 border-b border-zinc-100"
                style={{ background: '#f9fafb' }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
                  style={{ background: 'rgba(50,88,99,0.1)', border: '1px solid rgba(50,88,99,0.15)' }}
                >
                  <Tag size={16} style={{ color: 'var(--color-teal)' }} />
                </div>
                <h3
                  className="font-bold text-sm uppercase tracking-tight leading-tight transition-colors group-hover:text-[color:var(--color-teal)]"
                  style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
                >
                  {cat.name}
                </h3>
              </div>
              <div className="flex flex-col flex-1 px-5 py-4">
                <p className="text-zinc-500 text-sm leading-relaxed flex-1 mb-4">{cat.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded"
                    style={{ background: 'rgba(50,88,99,0.08)', color: 'var(--color-teal)' }}
                  >
                    {cat.subcategories.length} {cat.subcategories.length === 1 ? 'subcategory' : 'subcategories'}
                  </span>
                  <span
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    Browse <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular products */}
      {popularProducts.length > 0 && (
        <section className="border-t border-zinc-200 py-12" style={{ background: '#fff' }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-teal)' }}>
                  From this group
                </div>
                <h2
                  className="text-2xl font-bold uppercase"
                  style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
                >
                  Popular Products
                </h2>
              </div>
              <Link
                to={`/products/${group.slug}/${group.categories[0]?.slug}`}
                className="hidden sm:flex items-center gap-1 text-xs font-bold uppercase tracking-wide transition-colors hover:opacity-70"
                style={{ color: 'var(--color-teal)' }}
              >
                View all <ArrowRight size={13} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {popularProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.groupSlug}/${product.categorySlug}/${product.subcategorySlug}/${product.id}`}
                  className="group bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-teal)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#e4e4e7')}
                >
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="h-40 p-3"
                    imgClassName="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-4">
                    <div className="text-xs text-zinc-400 font-mono font-semibold uppercase tracking-widest mb-1">
                      {product.sku}
                    </div>
                    <h3
                      className="font-bold text-sm mb-2 leading-tight line-clamp-2"
                      style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-zinc-500 text-xs line-clamp-2 mb-3">{product.shortDescription}</p>
                    <div
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide"
                      style={{ color: 'var(--color-teal)' }}
                    >
                      View details <ArrowRight size={11} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12" style={{ background: 'var(--color-teal)' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-yellow)' }}>
              Need a quote?
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              Our specialists are available Mon–Fri 8:00am–4:00pm.
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
              Request a Quote
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
