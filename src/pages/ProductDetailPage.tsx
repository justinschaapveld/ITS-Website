import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Phone, ChevronRight, Package, Truck, Shield, Headphones,
  ZoomIn, Download, FileText, Copy, Check, ArrowRight, X,
} from "lucide-react";
import { getGroupBySlug, getCategoryBySlug, getSubcategoryBySlug } from "../data/categories";
import { getProductById, getProductsByCategory } from "../data/products";
import Breadcrumbs from "../components/Breadcrumbs";
import QuoteRequestModal from "../components/QuoteRequestModal";

// Local images live at /products/<sku>.jpg, with optional extra shots at
// /products/<sku>-1.jpg, -2.jpg, … (auto-detected by probing — see effect below).
function isLocalImage(image: string): boolean {
  return image.startsWith("/products/");
}

// Legacy Unsplash placeholders fake a multi-shot gallery via URL params.
// Real local images don't support this, so they're handled separately.
function unsplashGallery(image: string): string[] {
  const base = image.replace(/\?.*$/, "");
  return [
    `${base}?w=1000&q=85`,
    `${base}?w=800&q=80&sat=-30`,
    `${base}?w=800&q=80&flip=h`,
    `${base}?w=800&q=80&bri=15`,
  ];
}

function initialGallery(image: string): string[] {
  return isLocalImage(image) ? [image] : unsplashGallery(image);
}

const TRUST_ITEMS = [
  { icon: Package, text: "Trade pricing available" },
  { icon: Truck, text: "Same-day Melbourne dispatch" },
  { icon: Shield, text: "Nationwide shipping" },
  { icon: Headphones, text: "Expert technical support" },
];

const PLACEHOLDER_DOCS = [
  { label: "Product Datasheet", type: "PDF" },
  { label: "Safety Data Sheet (SDS)", type: "PDF" },
  { label: "Installation Guide", type: "PDF" },
];

const TABS = ["Description", "Specifications", "Technical Documents"] as const;
type Tab = (typeof TABS)[number];

export default function ProductDetailPage() {
  const { groupSlug, categorySlug, subcategorySlug, productId } = useParams<{
    groupSlug: string;
    categorySlug: string;
    subcategorySlug: string;
    productId: string;
  }>();

  const group = getGroupBySlug(groupSlug!);
  const category = getCategoryBySlug(groupSlug!, categorySlug!);
  const subcategory = getSubcategoryBySlug(groupSlug!, categorySlug!, subcategorySlug!);
  const product = getProductById(productId!);
  const relatedRaw = getProductsByCategory(groupSlug!, categorySlug!);
  const related = relatedRaw.filter((p) => p.id !== product?.id).slice(0, 6);

  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Description");
  const [skuCopied, setSkuCopied] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroCTARef = useRef<HTMLDivElement>(null);

  const [gallery, setGallery] = useState<string[]>(
    product ? initialGallery(product.image) : []
  );

  // Build the gallery for the active product. Unsplash placeholders use the
  // synchronous param trick; local images start with /products/<sku>.jpg and
  // then probe for extra shots (<sku>-1.jpg, -2.jpg, …), appending each that
  // loads and stopping at the first gap. No data field, no broken images.
  useEffect(() => {
    if (!product) {
      setGallery([]);
      return;
    }
    setActiveImage(0);

    if (!isLocalImage(product.image)) {
      setGallery(unsplashGallery(product.image));
      return;
    }

    let cancelled = false;
    const base = `/products/${product.sku}`;
    const found = [product.image];
    setGallery([...found]);

    const probe = (n: number) => {
      const url = `${base}-${n}.jpg`;
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        found.push(url);
        setGallery([...found]);
        probe(n + 1);
      };
      img.onerror = () => {};
      img.src = url;
    };
    probe(1);

    return () => {
      cancelled = true;
    };
  }, [product]);

  useEffect(() => {
    const el = heroCTARef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setStickyVisible(!entry.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [product]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function copySku() {
    if (!product) return;
    navigator.clipboard.writeText(product.sku).then(() => {
      setSkuCopied(true);
      setTimeout(() => setSkuCopied(false), 2000);
    });
  }

  if (!group || !category || !subcategory || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "Oswald, sans-serif", color: "var(--color-charcoal)" }}>
          Product Not Found
        </h1>
        <Link to="/products" className="mt-4 inline-block font-semibold hover:opacity-70 transition-opacity" style={{ color: "var(--color-teal)" }}>
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--color-offwhite)" }}>
      {/* Sticky breadcrumb bar — desktop only */}
      <div
        className="hidden lg:block sticky top-[91px] z-30 border-b border-zinc-200"
        style={{ background: "rgba(245,245,243,0.95)", backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm flex-wrap text-zinc-500">
            <Link to="/" className="hover:text-zinc-800 transition-colors">Home</Link>
            <ChevronRight size={13} className="text-zinc-300" />
            <Link to="/products" className="hover:text-zinc-800 transition-colors">Products</Link>
            <ChevronRight size={13} className="text-zinc-300" />
            <Link to={`/products/${group.slug}`} className="hover:text-zinc-800 transition-colors">{group.name}</Link>
            <ChevronRight size={13} className="text-zinc-300" />
            <Link to={`/products/${group.slug}/${category.slug}`} className="hover:text-zinc-800 transition-colors">{category.name}</Link>
            <ChevronRight size={13} className="text-zinc-300" />
            <span className="text-zinc-800 font-semibold truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Mobile breadcrumbs */}
      <div className="lg:hidden py-4 px-4 border-b border-zinc-200 bg-white">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: group.name, href: `/products/${group.slug}` },
            { label: category.name, href: `/products/${group.slug}/${category.slug}` },
            { label: product.name },
          ]}
        />
      </div>

      {/* Two-column hero */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* LEFT — Gallery */}
          <div className="lg:w-[55%] flex-shrink-0">
            <div
              className="relative rounded-xl overflow-hidden border border-zinc-200 bg-white cursor-zoom-in"
              style={{ aspectRatio: "4/3" }}
              onClick={() => setLightboxOpen(true)}
              role="button"
              tabIndex={0}
              aria-label="View full-size image"
              onKeyDown={e => e.key === "Enter" && setLightboxOpen(true)}
            >
              <img
                src={gallery[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.45)" }}
                aria-hidden="true"
              >
                <ZoomIn size={15} className="text-white" />
              </div>
              {product.featured && (
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold uppercase tracking-wide rounded"
                  style={{ background: "var(--color-yellow)", color: "var(--color-charcoal)" }}
                >
                  Featured
                </div>
              )}
            </div>

            <div className={`gap-3 mt-3 ${gallery.length > 1 ? "flex" : "hidden"}`}>
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-150 flex-shrink-0"
                  style={activeImage === i ? { borderColor: "var(--color-teal)" } : { borderColor: "#e4e4e7" }}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={activeImage === i}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  {activeImage !== i && <div className="absolute inset-0 bg-white/30" />}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Product info */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb labels */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Link
                to={`/products/${group.slug}`}
                className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded transition-colors hover:opacity-80"
                style={{ background: "rgba(50,88,99,0.1)", color: "var(--color-teal)" }}
              >
                {group.name}
              </Link>
              <ChevronRight size={12} className="text-zinc-300" />
              <Link
                to={`/products/${group.slug}/${category.slug}`}
                className="text-xs font-semibold text-zinc-500 hover:text-zinc-800 transition-colors"
              >
                {category.name}
              </Link>
            </div>

            <h1
              className="text-3xl md:text-4xl font-bold leading-tight mb-3"
              style={{ fontFamily: "Oswald, sans-serif", color: "var(--color-charcoal)", letterSpacing: "0.02em" }}
            >
              {product.name}
            </h1>

            {/* SKU + copy */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-xs font-mono font-semibold px-2.5 py-1 rounded"
                style={{ background: "#f4f4f5", color: "#52525b" }}
              >
                SKU: {product.sku}
              </span>
              <button
                onClick={copySku}
                className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded transition-colors"
                style={{
                  color: skuCopied ? "#22c55e" : "var(--color-teal)",
                  background: skuCopied ? "rgba(34,197,94,0.08)" : "rgba(50,88,99,0.07)",
                }}
                aria-label="Copy SKU to clipboard"
              >
                {skuCopied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy SKU</>}
              </button>
            </div>

            {/* Tagline */}
            <p
              className="text-zinc-600 text-base leading-relaxed mb-7 pl-4 border-l-2"
              style={{ borderColor: "var(--color-teal)" }}
            >
              {product.shortDescription}
            </p>

            {/* CTAs */}
            <div ref={heroCTARef} className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => setQuoteOpen(true)}
                className="flex-1 py-3.5 font-bold uppercase tracking-wide rounded transition-colors text-center"
                style={{ background: "var(--color-yellow)", color: "var(--color-charcoal)", fontFamily: "Oswald, sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#ffc61a")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--color-yellow)")}
              >
                Request a Quote
              </button>
              <a
                href="tel:0387810600"
                className="flex items-center justify-center gap-2 px-6 py-3.5 font-bold uppercase tracking-wide rounded border-2 transition-colors"
                style={{ borderColor: "var(--color-teal)", color: "var(--color-teal)", fontFamily: "Oswald, sans-serif" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--color-teal)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--color-teal)"; }}
              >
                <Phone size={15} /> 03 8781 0600
              </a>
            </div>

            {/* Trust block */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {TRUST_ITEMS.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 rounded-lg px-4 py-3"
                  style={{ background: "#fff", border: "1px solid #e4e4e7" }}
                >
                  <Icon size={16} style={{ color: "var(--color-teal)", flexShrink: 0 }} />
                  <span className="text-xs font-semibold text-zinc-600 leading-snug">{text}</span>
                </div>
              ))}
            </div>

            {/* Filed under */}
            <div className="pt-5 border-t border-zinc-200 flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
              <span className="font-semibold text-zinc-500">Filed under:</span>
              <Link to={`/products/${group.slug}`} className="hover:opacity-70 transition-opacity font-semibold" style={{ color: "var(--color-teal)" }}>{group.name}</Link>
              <ChevronRight size={11} />
              <Link to={`/products/${group.slug}/${category.slug}`} className="hover:opacity-70 transition-opacity font-semibold" style={{ color: "var(--color-teal)" }}>{category.name}</Link>
              <ChevronRight size={11} />
              <Link to={`/products/${group.slug}/${category.slug}/${subcategory.slug}`} className="hover:opacity-70 transition-opacity font-semibold" style={{ color: "var(--color-teal)" }}>{subcategory.name}</Link>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-14">
          <div className="flex border-b border-zinc-200 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-3.5 text-sm font-bold uppercase tracking-wide whitespace-nowrap border-b-2 transition-colors -mb-px"
                style={activeTab === tab
                  ? { borderColor: "var(--color-teal)", color: "var(--color-teal)" }
                  : { borderColor: "transparent", color: "#71717a" }
                }
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white border border-t-0 border-zinc-200 rounded-b-xl p-7">
            {activeTab === "Description" && (
              <div className="space-y-4 text-zinc-600 text-sm leading-relaxed max-w-3xl">
                <p>
                  {product.description} Engineered for professional workshop use, this product meets or exceeds OEM specifications and is backed by our technical team who can advise on the correct application for your specific requirements.
                </p>
                <p>
                  ITS has supplied {category.name.toLowerCase()} products to Australian tyre workshops, fleet operators and road transport companies for over 30 years. Every product in our range is sourced from manufacturers with proven quality management systems, and we hold comprehensive technical documentation for all stocked lines.
                </p>
                <p>
                  Whether you're running a single-bay workshop or a multi-location fleet operation, our team can help you select the right product variant, pack size and quantity to suit your volume and budget requirements. Contact us for trade pricing, bulk discounts and account setup.
                </p>
              </div>
            )}

            {activeTab === "Specifications" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "var(--color-charcoal)" }}>
                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-white/70 w-52">Specification</th>
                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-white/70">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ...product.specs,
                      { label: "Pack Size", value: "Each / Box of 10 / Box of 25 (contact for options)" },
                      { label: "Country of Manufacture", value: "Germany / USA (brand dependent)" },
                      { label: "Warranty", value: "12 months from date of purchase" },
                      { label: "Min. Order Qty", value: "1 unit — volume pricing available" },
                    ].map((spec, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#f9fafb" : "#fff" }}>
                        <td className="px-5 py-3 font-bold text-zinc-500 uppercase tracking-wide text-xs">{spec.label}</td>
                        <td className="px-5 py-3 text-zinc-700">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "Technical Documents" && (
              <div className="space-y-3">
                <p className="text-sm text-zinc-500 mb-5">
                  Technical documentation is available for trade customers. Contact us if you require documents not listed here.
                </p>
                {PLACEHOLDER_DOCS.map((doc) => (
                  <a
                    key={doc.label}
                    href="#"
                    onClick={e => e.preventDefault()}
                    className="flex items-center gap-4 p-4 rounded-lg border transition-colors group"
                    style={{ borderColor: "#e4e4e7", background: "#f9fafb" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-teal)"; e.currentTarget.style.background = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#e4e4e7"; e.currentTarget.style.background = "#f9fafb"; }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(50,88,99,0.1)" }}
                    >
                      <FileText size={18} style={{ color: "var(--color-teal)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-zinc-700 text-sm">{doc.label}</div>
                      <div className="text-xs text-zinc-400">{doc.type} · {product.sku}</div>
                    </div>
                    <Download size={16} className="text-zinc-400 group-hover:text-zinc-600 transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <div className="mt-14">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--color-teal)" }}>
                  Same category
                </div>
                <h2
                  className="text-2xl font-bold uppercase"
                  style={{ fontFamily: "Oswald, sans-serif", color: "var(--color-charcoal)" }}
                >
                  Related Products
                </h2>
              </div>
              <Link
                to={`/products/${group.slug}/${category.slug}`}
                className="hidden sm:flex items-center gap-1 text-xs font-bold uppercase tracking-wide transition-colors hover:opacity-70"
                style={{ color: "var(--color-teal)" }}
              >
                View all <ArrowRight size={13} />
              </Link>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <div
                  key={p.id}
                  className="group bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col flex-shrink-0 sm:flex-shrink w-72 sm:w-auto"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-teal)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#e4e4e7")}
                >
                  <Link to={`/products/${p.groupSlug}/${p.categorySlug}/${p.subcategorySlug}/${p.id}`} className="block">
                    <div className="h-40 overflow-hidden bg-zinc-100">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="px-4 pt-3 pb-2">
                      <div className="text-xs text-zinc-400 font-mono font-semibold uppercase tracking-widest mb-1">{p.sku}</div>
                      <h3
                        className="font-bold text-sm mb-1 leading-tight line-clamp-2"
                        style={{ fontFamily: "Oswald, sans-serif", color: "var(--color-charcoal)" }}
                      >
                        {p.name}
                      </h3>
                      <p className="text-zinc-500 text-xs line-clamp-2">{p.shortDescription}</p>
                    </div>
                  </Link>
                  <div className="px-4 pb-4 mt-auto pt-2 border-t border-zinc-100">
                    <button
                      onClick={() => setQuoteOpen(true)}
                      className="w-full text-center py-2 text-xs font-bold uppercase tracking-wide rounded transition-colors"
                      style={{ background: "var(--color-yellow)", color: "var(--color-charcoal)", fontFamily: "Oswald, sans-serif" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#ffc61a")}
                      onMouseLeave={e => (e.currentTarget.style.background = "var(--color-yellow)")}
                    >
                      Request a Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky CTA */}
      {stickyVisible && (
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 border-t border-zinc-200"
          style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)", animation: "slideUp 200ms ease" }}
        >
          <button
            onClick={() => setQuoteOpen(true)}
            className="w-full py-3.5 font-bold uppercase tracking-wide rounded"
            style={{ background: "var(--color-yellow)", color: "var(--color-charcoal)", fontFamily: "Oswald, sans-serif" }}
          >
            Request a Quote — {product.sku}
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
          style={{ animation: "fadeIn 200ms ease" }}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
          >
            <X size={22} />
          </button>
          <img
            src={gallery[activeImage]}
            alt={product.name}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 gap-2 ${gallery.length > 1 ? "flex" : "hidden"}`}>
            {gallery.map((src, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setActiveImage(i); }}
                className="w-12 h-10 rounded border-2 overflow-hidden transition-all"
                style={activeImage === i ? { borderColor: "var(--color-yellow)" } : { borderColor: "rgba(255,255,255,0.3)" }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quote modal */}
      <QuoteRequestModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        productName={product.name}
        productSku={product.sku}
      />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
