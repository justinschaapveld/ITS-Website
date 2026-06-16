import { Link } from "react-router-dom";
import { RefreshCw, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-offwhite)' }}>
      <section className="border-b border-white/10 py-14" style={{ background: 'var(--color-teal)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-yellow)' }}>
            Returns
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Returns Policy</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            We want you to be completely satisfied with every order. If something isn't right, here's how we handle it.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: CheckCircle, color: "text-green-500", title: "30-Day Returns", text: "Eligible items can be returned within 30 days of delivery for a full credit." },
            { icon: RefreshCw, color: "", title: "Exchange Option", text: "Prefer an exchange? We can swap for an equivalent product at no additional charge.", teal: true },
            { icon: AlertCircle, color: "text-red-500", title: "Defective Goods", text: "Manufacturing defects are covered by a 12-month product warranty from date of purchase." },
          ].map(({ icon: Icon, color, title, text, teal }) => (
            <div key={title} className="bg-white border border-zinc-200 rounded-lg p-5 text-center">
              <Icon size={32} className={`${color} mx-auto mb-3`} style={teal ? { color: 'var(--color-teal)' } : {}} />
              <h3
                className="font-bold text-sm mb-2"
                style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
              >
                {title}
              </h3>
              <p className="text-zinc-500 text-xs leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4" style={{ background: 'var(--color-teal)' }}>
            <h2 className="text-white font-bold uppercase tracking-wide text-sm">Eligible for Return</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-2.5">
              {[
                "Unused items in original, undamaged packaging",
                "Incorrect items supplied (we will cover return freight)",
                "Items received in damaged condition (report within 48 hours of delivery)",
                "Manufacturing defects within 12 months of purchase",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4" style={{ background: 'var(--color-teal)' }}>
            <h2 className="text-white font-bold uppercase tracking-wide text-sm">Not Eligible for Return</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-2.5">
              {[
                "Used or installed products",
                "Items returned more than 30 days after delivery",
                "Special-order and custom-cut items",
                "Hazardous goods (cement, solvents, adhesives) once opened",
                "Items damaged due to misuse, incorrect application or storage",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <XCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4" style={{ background: 'var(--color-teal)' }}>
            <h2 className="text-white font-bold uppercase tracking-wide text-sm">How to Return an Item</h2>
          </div>
          <div className="p-6 space-y-5">
            {[
              { step: "1", title: "Contact ITS", text: "Call 03 8781 0600 or email its-office@itsindustrial.com.au with your order number and reason for return." },
              { step: "2", title: "Receive a Return Authorisation", text: "We'll issue a Return Authorisation (RA) number, which must be included with your return." },
              { step: "3", title: "Ship the Item", text: "Pack the item securely and send it to our Dandenong South warehouse. Use a trackable service." },
              { step: "4", title: "Receive Your Credit", text: "Once received and inspected, a credit note will be issued to your account within 3 business days." },
            ].map(({ step, title, text }) => (
              <div key={step} className="flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-sm"
                  style={{ background: 'var(--color-teal)', fontFamily: 'Oswald, sans-serif' }}
                >
                  {step}
                </div>
                <div>
                  <h4
                    className="font-bold text-sm mb-1"
                    style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
                  >
                    {title}
                  </h4>
                  <p className="text-zinc-500 text-sm">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-sm text-zinc-600 leading-relaxed">
            For all returns enquiries, please call{" "}
            <a href="tel:0387810600" className="font-semibold hover:opacity-70" style={{ color: 'var(--color-teal)' }}>
              03 8781 0600
            </a>{" "}
            or email{" "}
            <a href="mailto:its-office@itsindustrial.com.au" className="font-semibold hover:opacity-70" style={{ color: 'var(--color-teal)' }}>
              its-office@itsindustrial.com.au
            </a>
            . Include your order number in all correspondence.{" "}
            <Link to="/contact" className="font-semibold hover:opacity-70" style={{ color: 'var(--color-teal)' }}>
              Contact us →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
