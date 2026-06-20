import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, ChevronDown, ChevronRight, Phone, MapPin } from "lucide-react";
import { productGroups } from "../data/categories";
import { searchProducts } from "../data/products";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchProducts>>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim().length >= 2) {
      setSearchResults(searchProducts(q).slice(0, 6));
    } else {
      setSearchResults([]);
    }
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchResults([]);
      setSearchFocused(false);
    }
  }

  function openMega() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setMegaOpen(true);
  }

  function scheduleMegaClose(e?: React.MouseEvent) {
    // Guard against the open-render race: when the pointer first enters the
    // trigger, React hasn't yet flipped the panel to pointer-events:auto, so a
    // quick move toward the panel (typical when approaching from below) fires a
    // spurious mouseleave through the still-click-through panel. If the pointer
    // is actually within the panel's rectangle, keep the menu open.
    if (e && megaRef.current) {
      const panel = megaRef.current.querySelector("[data-mega-panel]");
      if (panel) {
        const r = panel.getBoundingClientRect();
        if (
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top - 6 &&
          e.clientY <= r.bottom
        ) {
          return;
        }
      }
    }
    // Hover-intent delay: tolerate a brief overshoot past the button.
    closeTimerRef.current = setTimeout(() => setMegaOpen(false), 250);
  }

  return (
    <header className="sticky top-0 z-50 shadow-xl" style={{ background: '#000', borderBottom: '7px solid var(--color-teal)' }}>
      {/* Top bar */}
      <div className="border-b border-white/[0.08]" style={{ background: '#000' }}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <MapPin size={12} className="flex-shrink-0" style={{ color: 'var(--color-yellow)' }} />
            <span>Dandenong South, Victoria — Melbourne's Tyre Industry Specialists</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:0387810600" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone size={12} />
              <span>03 8781 0600</span>
            </a>
            <a href="mailto:its-office@itsindustrial.com.au" className="hidden sm:block hover:text-white transition-colors">
              its-office@itsindustrial.com.au
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" onClick={() => setMobileOpen(false)}>
            <img
              src="/ITS_Logo.png"
              alt="Industrial Tyre Supplies"
              className="h-12 sm:h-16 md:h-[4.75rem] w-auto object-contain bg-transparent"
            />
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search products, SKU or category..."
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={e => {
                    setSearchFocused(true);
                    e.currentTarget.style.borderColor = 'var(--color-teal)';
                    e.currentTarget.style.background = '#333';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = '#3a3a3a';
                    e.currentTarget.style.background = '#2a2a2a';
                  }}
                  className="w-full border text-white placeholder-zinc-500 pl-9 pr-4 py-2 text-sm rounded focus:outline-none transition-all"
                  style={{ background: '#2a2a2a', borderColor: '#3a3a3a' }}
                  aria-label="Search products"
                />
              </div>
            </form>
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded shadow-2xl overflow-hidden z-50">
                {searchResults.map((p) => (
                  <Link
                    key={p.id}
                    to={`/products/${p.groupSlug}/${p.categorySlug}/${p.subcategorySlug}/${p.id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors"
                    onClick={() => { setSearchFocused(false); setSearchQuery(""); }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-zinc-800 text-sm font-semibold truncate">{p.name}</div>
                      <div className="text-zinc-400 text-xs">{p.sku}</div>
                    </div>
                    <ChevronRight size={14} className="text-zinc-300 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            <Link to="/" className="px-3 py-2 text-sm font-semibold text-white/80 hover:text-white transition-colors tracking-wide">
              Home
            </Link>

            {/* Products with hover mega-menu */}
            <div
              ref={megaRef}
              className="relative"
              onMouseEnter={openMega}
              onMouseLeave={scheduleMegaClose}
            >
              <button
                onClick={() => setMegaOpen(!megaOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold tracking-wide transition-colors ${megaOpen ? "text-white" : "text-white/80 hover:text-white"}`}
                aria-expanded={megaOpen}
                aria-haspopup="true"
              >
                Products
                <ChevronDown size={14} className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
              </button>
              <MegaMenu
                open={megaOpen}
                onClose={() => setMegaOpen(false)}
                onMouseEnter={openMega}
                onMouseLeave={scheduleMegaClose}
              />
            </div>

            <Link to="/about" className="px-3 py-2 text-sm font-semibold text-white/80 hover:text-white transition-colors tracking-wide">
              About
            </Link>
            <Link to="/training" className="px-3 py-2 text-sm font-semibold text-white/80 hover:text-white transition-colors tracking-wide">
              Training
            </Link>
            <Link to="/contact" className="px-3 py-2 text-sm font-semibold text-white/80 hover:text-white transition-colors tracking-wide">
              Contact
            </Link>
            <Link
              to="/request-a-quote"
              className="ml-2 px-4 py-2 text-sm font-bold rounded transition-colors"
              style={{ background: 'var(--color-yellow)', color: 'var(--color-charcoal)' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#ffc61a')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-yellow)')}
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden ml-auto text-white/80 hover:text-white transition-colors p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 max-h-[80vh] overflow-y-auto" style={{ background: 'var(--color-charcoal)' }}>
          <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
            <Link to="/" className="block py-3 text-white font-semibold border-b border-white/10" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <div className="border-b border-white/10">
              <button
                className="flex items-center justify-between w-full py-3 text-white font-semibold"
                onClick={() => setExpandedGroup(expandedGroup === "products" ? null : "products")}
              >
                Products
                <ChevronDown size={16} className={`transition-transform ${expandedGroup === "products" ? "rotate-180" : ""}`} />
              </button>
              {expandedGroup === "products" && (
                <div className="pb-3 space-y-1">
                  <Link
                    to="/products"
                    className="block pl-4 py-2 text-sm font-semibold"
                    style={{ color: 'var(--color-yellow)' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    All Categories
                  </Link>
                  {productGroups.map((group) => (
                    <div key={group.id}>
                      <button
                        className="flex items-center justify-between w-full pl-4 py-2 text-zinc-300 text-sm font-medium hover:text-white transition-colors"
                        onClick={() => setExpandedGroup(expandedGroup === group.id ? "products" : group.id)}
                      >
                        {group.name}
                        <ChevronDown size={14} className={`transition-transform ${expandedGroup === group.id ? "rotate-180" : ""}`} />
                      </button>
                      {expandedGroup === group.id && (
                        <div className="pl-8 space-y-1 pb-1">
                          <Link
                            to={`/products/${group.slug}`}
                            className="block py-1.5 text-xs font-bold uppercase tracking-wide transition-colors"
                            style={{ color: 'var(--color-teal)' }}
                            onClick={() => setMobileOpen(false)}
                          >
                            All {group.name}
                          </Link>
                          {group.categories.map((cat) => (
                            <Link
                              key={cat.id}
                              to={`/products/${group.slug}/${cat.slug}`}
                              className="block py-1.5 text-zinc-400 text-sm hover:text-white transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {[
              { to: "/about", label: "About" },
              { to: "/training", label: "Training" },
              { to: "/shipping", label: "Shipping" },
              { to: "/returns", label: "Returns" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="block py-3 text-white font-semibold border-b border-white/10" onClick={() => setMobileOpen(false)}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function MegaMenu({ open, onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const [activeGroup, setActiveGroup] = useState(productGroups[0].id);
  const active = productGroups.find((g) => g.id === activeGroup)!;

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 mt-0 pt-3 z-50"
      data-mega-panel
      style={{
        width: 'min(900px, 90vw)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transform: `translateX(-50%) translateY(${open ? '0' : '-6px'})`,
        transition: 'opacity 200ms ease, transform 200ms ease',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="rounded-lg overflow-hidden shadow-2xl flex"
        style={{
          background: '#1a1a1a',
          borderTop: '3px solid var(--color-teal)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderTopColor: 'var(--color-teal)',
        }}
      >
        {/* Left: group list */}
        <div className="w-56 flex-shrink-0 py-3 border-r border-white/[0.07]" style={{ background: '#111' }}>
          {productGroups.map((group) => (
            <button
              key={group.id}
              className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-semibold text-left transition-all duration-150"
              style={
                activeGroup === group.id
                  ? { background: 'var(--color-teal)', color: '#fff' }
                  : { color: 'rgba(255,255,255,0.65)' }
              }
              onMouseEnter={() => setActiveGroup(group.id)}
            >
              <span className="uppercase tracking-wide text-xs leading-snug">{group.name}</span>
              <ChevronRight size={13} className="flex-shrink-0 opacity-60" />
            </button>
          ))}
          <div className="px-4 pt-3 mt-1 border-t border-white/[0.07]">
            <Link
              to="/products"
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors hover:opacity-80"
              style={{ color: '#f5b800' }}
              onClick={onClose}
            >
              View all products <ChevronRight size={11} />
            </Link>
          </div>
        </div>

        {/* Right: category grid */}
        <div className="flex-1 p-6 min-w-0">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <Link
                to={`/products/${active.slug}`}
                className="text-base font-bold uppercase tracking-wide transition-colors hover:opacity-80"
                style={{ color: 'var(--color-teal)', fontFamily: 'Oswald, sans-serif' }}
                onClick={onClose}
              >
                {active.name}
              </Link>
              <p className="text-zinc-500 text-xs mt-0.5 leading-relaxed">{active.description}</p>
            </div>
            <Link
              to={`/products/${active.slug}`}
              className="flex-shrink-0 text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded transition-colors"
              style={{ background: 'rgba(50,88,99,0.25)', color: 'var(--color-teal)', border: '1px solid rgba(50,88,99,0.4)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-teal)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(50,88,99,0.25)'; e.currentTarget.style.color = 'var(--color-teal)'; }}
              onClick={onClose}
            >
              Browse all
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-0.5 max-h-64 overflow-y-auto pr-1">
            {active.categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products/${active.slug}/${cat.slug}`}
                className="flex items-center gap-1.5 py-1.5 text-sm transition-colors group"
                style={{ color: 'rgba(255,255,255,0.55)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f5b800')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                onClick={onClose}
              >
                <ChevronRight
                  size={11}
                  className="flex-shrink-0 transition-colors"
                  style={{ color: 'rgba(255,255,255,0.2)' }}
                />
                <span className="truncate">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
