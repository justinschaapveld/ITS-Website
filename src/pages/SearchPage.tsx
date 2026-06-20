import { useSearchParams, Link } from "react-router-dom";
import { ArrowRight, SearchX } from "lucide-react";
import { searchProducts } from "../data/products";
import { getGroupBySlug, getCategoryBySlug } from "../data/categories";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const results = query.trim().length >= 2 ? searchProducts(query) : [];

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-offwhite)' }}>
      <section className="border-b border-white/10 py-12" style={{ background: 'var(--color-teal)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-yellow)' }}>
            Search Results
          </div>
          <h1 className="text-4xl font-bold text-white">"{query}"</h1>
          <p className="text-white/60 mt-2 text-sm">{results.length} result{results.length !== 1 ? "s" : ""} found</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((product) => {
              const group = getGroupBySlug(product.groupSlug);
              const category = getCategoryBySlug(product.groupSlug, product.categorySlug);
              return (
                <Link
                  key={product.id}
                  to={`/products/${product.groupSlug}/${product.categorySlug}/${product.subcategorySlug}/${product.id}`}
                  className="group bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-teal)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#e4e4e7')}
                >
                  <div className="h-40 overflow-hidden bg-white p-3">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mb-1">{product.sku}</div>
                    <h3
                      className="font-bold text-base mb-2 leading-tight line-clamp-2"
                      style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-zinc-500 text-xs mb-3 line-clamp-2">{product.shortDescription}</p>
                    <div className="text-xs text-zinc-400 mb-2">
                      {group?.name} › {category?.name}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-teal)' }}>
                      View Details <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <SearchX size={56} className="text-zinc-300 mx-auto mb-4" />
            <h2
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
            >
              No Results Found
            </h2>
            <p className="text-zinc-500 mb-6">
              We couldn't find products matching "{query}". Try a different search or browse our categories.
            </p>
            <Link
              to="/products"
              className="inline-block px-7 py-3.5 font-bold uppercase tracking-wide rounded transition-colors text-white"
              style={{ background: 'var(--color-teal)', fontFamily: 'Oswald, sans-serif' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-teal-dark)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-teal)')}
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
