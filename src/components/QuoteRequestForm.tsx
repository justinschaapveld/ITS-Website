import { useState, useId } from "react";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

export interface QuoteFormProps {
  productName?: string;
  productSku?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  state: string;
  product: string;
  qty: string;
  qtyType: "one-off" | "per-month";
  message: string;
  source: string;
  subscribe: boolean;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
}

const STATES = ["VIC", "NSW", "QLD", "SA", "WA", "TAS", "NT", "ACT"];
const SOURCES = ["Google", "Referral", "Trade Show", "Existing Customer", "Other"];

const inputBase =
  "w-full border rounded px-3 py-2.5 text-sm bg-white text-zinc-800 placeholder-zinc-400 focus:outline-none transition-colors";

function fieldStyle(hasError?: boolean) {
  return hasError
    ? { borderColor: '#ef4444' }
    : { borderColor: '#d4d4d8' };
}

function useFocusHandlers(hasError?: boolean) {
  return {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = hasError ? '#ef4444' : 'var(--color-teal)';
      e.currentTarget.style.boxShadow = hasError
        ? '0 0 0 2px rgba(239,68,68,0.15)'
        : '0 0 0 2px rgba(50,88,99,0.15)';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = hasError ? '#ef4444' : '#d4d4d8';
      e.currentTarget.style.boxShadow = 'none';
    },
  };
}

export default function QuoteRequestForm({ productName = "", productSku = "", onSuccess, compact = false }: QuoteFormProps) {
  const uid = useId();
  const [data, setData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    state: "",
    product: productName && productSku ? `${productName} (${productSku})` : productName || productSku || "",
    qty: "1",
    qtyType: "one-off",
    message: "",
    source: "",
    subscribe: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!data.name.trim()) e.name = "Your name is required.";
    if (!data.email.trim()) {
      e.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!data.phone.trim()) e.phone = "Phone number is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Quote Request Submitted:", { ...data, timestamp: new Date().toISOString() });
    setStatus("success");
    onSuccess?.();
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-10 px-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)' }}
        >
          <CheckCircle size={36} className="text-green-500" />
        </div>
        <h3
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
        >
          Thanks — we've got your request!
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mb-7">
          Our team will review your enquiry and get back to you within one business day. If it's urgent, call us directly on{' '}
          <a href="tel:0387810600" className="font-semibold" style={{ color: 'var(--color-teal)' }}>
            03 8781 0600
          </a>.
        </p>
        {onSuccess && (
          <button
            onClick={onSuccess}
            className="px-6 py-3 text-sm font-bold uppercase tracking-wide rounded transition-colors"
            style={{ background: 'var(--color-teal)', color: '#fff', fontFamily: 'Oswald, sans-serif' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-teal-dark)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-teal)')}
          >
            Continue browsing
          </button>
        )}
      </div>
    );
  }

  const gap = compact ? "space-y-4" : "space-y-5";

  return (
    <form onSubmit={handleSubmit} noValidate className={gap} aria-label="Quote request form">
      {/* Row: Name + Company */}
      <div className={`grid grid-cols-1 ${compact ? 'sm:grid-cols-2' : 'md:grid-cols-2'} gap-4`}>
        <div>
          <label htmlFor={`${uid}-name`} className="block text-xs font-bold text-zinc-600 uppercase tracking-wide mb-1.5">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            value={data.name}
            onChange={e => set("name", e.target.value)}
            placeholder="Full name"
            className={inputBase}
            style={fieldStyle(!!errors.name)}
            {...useFocusHandlers(!!errors.name)}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-company`} className="block text-xs font-bold text-zinc-600 uppercase tracking-wide mb-1.5">
            Company Name
          </label>
          <input
            id={`${uid}-company`}
            type="text"
            value={data.company}
            onChange={e => set("company", e.target.value)}
            placeholder="Trading name"
            className={inputBase}
            style={fieldStyle()}
            {...useFocusHandlers()}
          />
        </div>
      </div>

      {/* Row: Email + Phone */}
      <div className={`grid grid-cols-1 ${compact ? 'sm:grid-cols-2' : 'md:grid-cols-2'} gap-4`}>
        <div>
          <label htmlFor={`${uid}-email`} className="block text-xs font-bold text-zinc-600 uppercase tracking-wide mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            value={data.email}
            onChange={e => set("email", e.target.value)}
            placeholder="you@company.com"
            className={inputBase}
            style={fieldStyle(!!errors.email)}
            {...useFocusHandlers(!!errors.email)}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className="block text-xs font-bold text-zinc-600 uppercase tracking-wide mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id={`${uid}-phone`}
            type="tel"
            value={data.phone}
            onChange={e => set("phone", e.target.value)}
            placeholder="(00) 0000 0000"
            className={inputBase}
            style={fieldStyle(!!errors.phone)}
            {...useFocusHandlers(!!errors.phone)}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Row: State */}
      <div className={`grid grid-cols-1 ${compact ? 'sm:grid-cols-2' : 'md:grid-cols-2'} gap-4`}>
        <div>
          <label htmlFor={`${uid}-state`} className="block text-xs font-bold text-zinc-600 uppercase tracking-wide mb-1.5">
            State
          </label>
          <select
            id={`${uid}-state`}
            value={data.state}
            onChange={e => set("state", e.target.value)}
            className={`${inputBase} cursor-pointer`}
            style={fieldStyle()}
            {...useFocusHandlers()}
          >
            <option value="">Select state…</option>
            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-source`} className="block text-xs font-bold text-zinc-600 uppercase tracking-wide mb-1.5">
            How did you hear about us?
          </label>
          <select
            id={`${uid}-source`}
            value={data.source}
            onChange={e => set("source", e.target.value)}
            className={`${inputBase} cursor-pointer`}
            style={fieldStyle()}
            {...useFocusHandlers()}
          >
            <option value="">Optional…</option>
            {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Product */}
      <div>
        <label htmlFor={`${uid}-product`} className="block text-xs font-bold text-zinc-600 uppercase tracking-wide mb-1.5">
          Product / Item
        </label>
        <input
          id={`${uid}-product`}
          type="text"
          value={data.product}
          onChange={e => set("product", e.target.value)}
          placeholder="Product name, SKU or description"
          className={inputBase}
          style={fieldStyle()}
          {...useFocusHandlers()}
        />
      </div>

      {/* Quantity */}
      <div>
        <label htmlFor={`${uid}-qty`} className="block text-xs font-bold text-zinc-600 uppercase tracking-wide mb-1.5">
          Quantity Required
        </label>
        <div className="flex items-center gap-3">
          <input
            id={`${uid}-qty`}
            type="number"
            min="1"
            value={data.qty}
            onChange={e => set("qty", e.target.value)}
            className={`${inputBase} w-28 flex-shrink-0`}
            style={fieldStyle()}
            {...useFocusHandlers()}
          />
          <div className="flex rounded overflow-hidden border" style={{ borderColor: '#d4d4d8' }}>
            {(["one-off", "per-month"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("qtyType", t)}
                className="px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors"
                style={data.qtyType === t
                  ? { background: 'var(--color-teal)', color: '#fff' }
                  : { background: '#fff', color: '#71717a' }
                }
              >
                {t === "one-off" ? "One-off" : "Per month"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor={`${uid}-message`} className="block text-xs font-bold text-zinc-600 uppercase tracking-wide mb-1.5">
          Message / Additional Details
        </label>
        <textarea
          id={`${uid}-message`}
          rows={4}
          value={data.message}
          onChange={e => set("message", e.target.value)}
          placeholder="Specific requirements, delivery address, preferred brands, technical questions…"
          className={`${inputBase} resize-none`}
          style={fieldStyle()}
          {...useFocusHandlers()}
        />
      </div>

      {/* Subscribe */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={data.subscribe}
          onChange={e => set("subscribe", e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded flex-shrink-0 cursor-pointer accent-[color:var(--color-teal)]"
        />
        <span className="text-xs text-zinc-500 leading-relaxed">
          I'd like to receive occasional updates from ITS about new products and trade specials.
        </span>
      </label>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2 py-3.5 font-bold uppercase tracking-wide rounded transition-all"
          style={{
            background: status === "loading" ? '#d4a800' : 'var(--color-yellow)',
            color: 'var(--color-charcoal)',
            fontFamily: 'Oswald, sans-serif',
          }}
          onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.background = '#ffc61a'; }}
          onMouseLeave={e => { if (status !== "loading") e.currentTarget.style.background = 'var(--color-yellow)'; }}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Quote Request
              <ArrowRight size={15} />
            </>
          )}
        </button>
        <p className="text-center text-xs text-zinc-400 mt-2.5 leading-relaxed">
          We respect your privacy. Your details will only be used to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}
