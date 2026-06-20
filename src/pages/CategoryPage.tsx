import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, SlidersHorizontal, X, Phone, MessageSquare } from "lucide-react";
import { getGroupBySlug, getCategoryBySlug } from "../data/categories";
import { getProductsByCategory } from "../data/products";
import Breadcrumbs from "../components/Breadcrumbs";

export default function CategoryPage() {
  const { groupSlug, categorySlug } = useParams<{ groupSlug: string; categorySlug: string }>();
  const group = getGroupBySlug(groupSlug!);
  const category = getCategoryBySlug(groupSlug!, categorySlug!);
  const allProducts = getProductsByCategory(groupSlug!, categorySlug!);
  const [filterSubcat, setFilterSubcat] = useState<string>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!group || !category) {
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

  const hasSubcats = category.subcategories.length > 0;
  const filteredProducts = filterSubcat === "all"
    ? allProducts
    : allProducts.filter((p) => p.subcategorySlug === filterSubcat);

  const activeSubcatName = filterSubcat === "all"
    ? null
    : category.subcategories.find((s) => s.slug === filterSubcat)?.name;

  function selectFilter(slug: string) {
    setFilterSubcat(slug);
    setDrawerOpen(false);
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-offwhite)' }}>
      {/* Hero */}
      <section className="py-14" style={{ background: 'var(--color-charcoal)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-5">
            <Breadcrumbs
              items={[
                { label: "Products", href: "/products" },
                { label: group.name, href: `/products/${group.slug}` },
                { label: category.name },
              ]}
            />
          </div>
          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-teal)' }}>
            {group.name}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white uppercase leading-none mb-3"
            style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.02em' }}
          >
            {category.name}
          </h1>
          <p className="text-zinc-400 text-base max-w-2xl leading-relaxed">{category.description}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex gap-8">

          {/* Sidebar — desktop */}
          {hasSubcats && (
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden sticky top-28">
                <div
                  className="px-4 py-3 text-xs font-bold uppercase tracking-widest border-b border-zinc-100"
                  style={{ background: 'var(--color-charcoal)', color: 'var(--color-teal)' }}
                >
                  Filter by subcategory
                </div>
                <nav className="py-2">
                  <button
                    onClick={() => selectFilter("all")}
                    className="w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors flex items-center justify-between"
                    style={filterSubcat === "all"
                      ? { background: 'rgba(50,88,99,0.08)', color: 'var(--color-teal)' }
                      : { color: 'var(--color-charcoal)' }
                    }
                  >
                    All subcategories
                    {filterSubcat === "all" && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded font-bold"
                        style={{ background: 'var(--color-teal)', color: '#fff' }}
                      >
                        {allProducts.length}
                      </span>
                    )}
                  </button>
                  {category.subcategories.map((sub) => {
                    const count = allProducts.filter((p) => p.subcategorySlug === sub.slug).length;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => selectFilter(sub.slug)}
                        className="w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between group"
                        style={filterSubcat === sub.slug
                          ? { background: 'rgba(50,88,99,0.08)', color: 'var(--color-teal)', fontWeight: 600 }
                          : { color: '#52525b' }
                        }
                        onMouseEnter={e => { if (filterSubcat !== sub.slug) e.currentTarget.style.background = '#f4f4f5'; }}
                        onMouseLeave={e => { if (filterSubcat !== sub.slug) e.currentTarget.style.background = 'transparent'; }}
                      >
                        <span className="leading-snug">{sub.name}</span>
                        {count > 0 && (
                          <span className="text-xs text-zinc-400 font-semibold ml-2 flex-shrink-0">{count}</span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Mobile filter bar */}
            {hasSubcats && (
              <div className="lg:hidden flex items-center gap-3 mb-5">
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded border transition-colors"
                  style={{ background: 'white', borderColor: '#d4d4d8', color: 'var(--color-charcoal)' }}
                >
                  <SlidersHorizontal size={15} />
                  Filter
                </button>
                {activeSubcatName && (
                  <button
                    onClick={() => setFilterSubcat("all")}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-full"
                    style={{ background: 'var(--color-teal)', color: '#fff' }}
                  >
                    {activeSubcatName} <X size={12} />
                  </button>
                )}
              </div>
            )}

            {/* Product count + active filter */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2
                  className="text-sm font-bold uppercase tracking-widest"
                  style={{ color: 'var(--color-charcoal)', opacity: 0.55 }}
                >
                  {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''}
                </h2>
                {activeSubcatName && (
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{ background: 'rgba(50,88,99,0.1)', color: 'var(--color-teal)' }}
                  >
                    {activeSubcatName}
                  </span>
                )}
              </div>
            </div>

            {/* Product grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col"
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-teal)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#e4e4e7')}
                  >
                    <Link
                      to={`/products/${group.slug}/${category.slug}/${product.subcategorySlug}/${product.id}`}
                      className="block"
                    >
                      <div className="h-44 overflow-hidden bg-white p-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="px-5 pt-4 pb-3">
                        <div className="text-xs text-zinc-400 font-mono font-semibold uppercase tracking-widest mb-1">
                          {product.sku}
                        </div>
                        <h3
                          className="font-bold text-base mb-1.5 leading-tight line-clamp-2"
                          style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
                        >
                          {product.name}
                        </h3>
                        <p className="text-zinc-500 text-sm line-clamp-2">{product.shortDescription}</p>
                      </div>
                    </Link>
                    <div className="px-5 pb-5 mt-auto pt-3 border-t border-zinc-100 flex items-center gap-2">
                      <Link
                        to={`/products/${group.slug}/${category.slug}/${product.subcategorySlug}/${product.id}#quote-form`}
                        className="flex-1 text-center py-2.5 text-xs font-bold uppercase tracking-wide rounded transition-colors"
                        style={{ background: 'var(--color-yellow)', color: 'var(--color-charcoal)', fontFamily: 'Oswald, sans-serif' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#ffc61a')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-yellow)')}
                      >
                        Request a Quote
                      </Link>
                      <Link
                        to={`/products/${group.slug}/${category.slug}/${product.subcategorySlug}/${product.id}`}
                        className="flex items-center justify-center w-9 h-9 rounded border transition-colors flex-shrink-0"
                        style={{ borderColor: '#d4d4d8', color: 'var(--color-charcoal)' }}
                        aria-label="View details"
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-teal)'; e.currentTarget.style.color = 'var(--color-teal)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#d4d4d8'; e.currentTarget.style.color = 'var(--color-charcoal)'; }}
                      >
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-zinc-200 rounded-lg p-12 text-center">
                <div className="text-zinc-400 text-lg font-semibold mb-2">No products in this filter</div>
                <button
                  onClick={() => setFilterSubcat("all")}
                  className="text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: 'var(--color-teal)' }}
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col">
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ background: 'var(--color-charcoal)' }}
            >
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-teal)' }}>
                Filter by subcategory
              </span>
              <button onClick={() => setDrawerOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-3">
              <button
                onClick={() => selectFilter("all")}
                className="w-full text-left px-5 py-3 text-sm font-semibold transition-colors"
                style={filterSubcat === "all"
                  ? { background: 'rgba(50,88,99,0.08)', color: 'var(--color-teal)' }
                  : { color: 'var(--color-charcoal)' }
                }
              >
                All subcategories
              </button>
              {category.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => selectFilter(sub.slug)}
                  className="w-full text-left px-5 py-3 text-sm transition-colors"
                  style={filterSubcat === sub.slug
                    ? { background: 'rgba(50,88,99,0.08)', color: 'var(--color-teal)', fontWeight: 600 }
                    : { color: '#52525b' }
                  }
                >
                  {sub.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-10 mt-4" style={{ background: 'var(--color-teal)' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-yellow)' }}>
              Can't find what you need?
            </div>
            <div
              className="text-white font-bold text-xl"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              Our team can source any {category.name.toLowerCase()} product.
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 px-7 py-3 font-bold uppercase tracking-wide rounded transition-colors whitespace-nowrap"
              style={{ background: 'var(--color-yellow)', color: 'var(--color-charcoal)', fontFamily: 'Oswald, sans-serif' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#ffc61a')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-yellow)')}
            >
              <MessageSquare size={15} /> Contact Team
            </Link>
            <a
              href="tel:0387810600"
              className="flex items-center justify-center gap-2 border-2 border-white/40 px-7 py-3 font-bold uppercase tracking-wide rounded transition-colors whitespace-nowrap text-white hover:border-white hover:bg-white/10"
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
