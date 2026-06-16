import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import QuoteRequestForm from "./QuoteRequestForm";

interface Props {
  open: boolean;
  onClose: () => void;
  productName?: string;
  productSku?: string;
}

export default function QuoteRequestModal({ open, onClose, productName, productSku }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus trap + Esc key
  useEffect(() => {
    if (!open) return;

    // Move focus into modal
    closeBtnRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a,button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      style={{
        animation: 'fadeIn 200ms ease',
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-xl shadow-2xl flex flex-col"
        style={{
          background: '#fff',
          animation: 'slideUp 200ms ease',
        }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between px-7 py-5 border-b border-zinc-100 flex-shrink-0 sticky top-0 z-10"
          style={{ background: '#fff' }}
        >
          <div>
            <h2
              id="quote-modal-title"
              className="text-2xl font-bold leading-none"
              style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
            >
              Request a Quote
            </h2>
            <p className="text-zinc-500 text-sm mt-1 leading-snug">
              Tell us what you need and our team will get back to you within one business day.
            </p>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="flex-shrink-0 ml-4 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
            aria-label="Close quote request modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form body */}
        <div className="px-7 py-6">
          {productName && productSku && (
            <div
              className="flex items-center gap-3 mb-5 px-4 py-3 rounded-lg text-sm"
              style={{ background: 'rgba(50,88,99,0.07)', border: '1px solid rgba(50,88,99,0.15)' }}
            >
              <div
                className="w-1.5 h-8 rounded-full flex-shrink-0"
                style={{ background: 'var(--color-teal)' }}
              />
              <div>
                <div className="font-semibold text-zinc-700">{productName}</div>
                <div className="text-xs font-mono text-zinc-500">SKU: {productSku}</div>
              </div>
            </div>
          )}
          <QuoteRequestForm
            productName={productName}
            productSku={productSku}
            onSuccess={onClose}
            compact
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
