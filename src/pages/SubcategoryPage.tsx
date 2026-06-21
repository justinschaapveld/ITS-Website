import { useParams, Link } from "react-router-dom";
import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import { getGroupBySlug, getCategoryBySlug, getSubcategoryBySlug } from "../data/categories";
import { getProductsBySubcategory } from "../data/products";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductImage from "../components/ProductImage";

export default function SubcategoryPage() {
  const { groupSlug, categorySlug, subcategorySlug } = useParams<{
    groupSlug: string;
    categorySlug: string;
    subcategorySlug: string;
  }>();
  const group = getGroupBySlug(groupSlug!);
  const category = getCategoryBySlug(groupSlug!, categorySlug!);
  const subcategory = getSubcategoryBySlug(groupSlug!, categorySlug!, subcategorySlug!);
  const products = getProductsBySubcategory(groupSlug!, categorySlug!, subcategorySlug!);

  if (!group || !category || !subcategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}>
          Not Found
        </h1>
        <Link to="/products" className="mt-4 inline-block font-semibold hover:opacity-70 transition-opacity" style={{ color: 'var(--color-teal)' }}>
          ← Back to Products
        </Link>
      </div>
    );
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
                { label: category.name, href: `/products/${group.slug}/${category.slug}` },
                { label: subcategory.name },
              ]}
            />
          </div>
          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-teal)' }}>
            {category.name}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white uppercase leading-none mb-3"
            style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.02em' }}
          >
            {subcategory.name}
          </h1>
          {subcategory.description && (
            <p className="text-zinc-400 text-base max-w-2xl leading-relaxed">{subcategory.description}</p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {products.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-sm font-bold uppercase tracking-widest"
                style={{ color: 'var(--color-charcoal)', opacity: 0.55 }}
              >
                {products.length} Product{products.length !== 1 ? 's' : ''}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-teal)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#e4e4e7')}
                >
                  <Link
                    to={`/products/${group.slug}/${category.slug}/${subcategory.slug}/${product.id}`}
                    className="block"
                  >
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      className="h-48 p-3"
                      imgClassName="group-hover:scale-105 transition-transform duration-500"
                    />
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
                      to={`/products/${group.slug}/${category.slug}/${subcategory.slug}/${product.id}#quote-form`}
                      className="flex-1 text-center py-2.5 text-xs font-bold uppercase tracking-wide rounded transition-colors"
                      style={{ background: 'var(--color-yellow)', color: 'var(--color-charcoal)', fontFamily: 'Oswald, sans-serif' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#ffc61a')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-yellow)')}
                    >
                      Request a Quote
                    </Link>
                    <Link
                      to={`/products/${group.slug}/${category.slug}/${subcategory.slug}/${product.id}`}
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
          </>
        ) : (
          <div className="bg-white border border-zinc-200 rounded-lg p-16 text-center max-w-lg mx-auto">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(50,88,99,0.08)', border: '1px solid rgba(50,88,99,0.15)' }}
            >
              <MessageSquare size={28} style={{ color: 'var(--color-teal)' }} />
            </div>
            <h2
              className="text-xl font-bold mb-2"
              style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
            >
              Products Available on Request
            </h2>
            <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
              Products in this subcategory are available — contact our team for current stock, specifications and trade pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="px-6 py-3 font-bold uppercase tracking-wide rounded transition-colors"
                style={{ background: 'var(--color-yellow)', color: 'var(--color-charcoal)', fontFamily: 'Oswald, sans-serif' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#ffc61a')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-yellow)')}
              >
                Contact for Availability
              </Link>
              <a
                href="tel:0387810600"
                className="flex items-center justify-center gap-2 px-6 py-3 font-bold uppercase tracking-wide rounded border-2 transition-colors"
                style={{ borderColor: 'var(--color-teal)', color: 'var(--color-teal)', fontFamily: 'Oswald, sans-serif' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-teal)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-teal)'; }}
              >
                <Phone size={14} /> Call Us
              </a>
            </div>
          </div>
        )}
      </div>

      {/* CTA strip */}
      <section className="py-10 mt-4" style={{ background: 'var(--color-teal)' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-yellow)' }}>
              Trade enquiries welcome
            </div>
            <div className="text-white font-bold text-xl" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Need volume pricing or a custom spec?
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
              Get a Quote
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
