import { Truck, Clock, MapPin, Package, AlertCircle } from "lucide-react";

const zones = [
  { zone: "Metro Melbourne", standard: "Same / Next Business Day", express: "Same Day (select suburbs)" },
  { zone: "Metro Sydney, Brisbane, Adelaide, Perth", standard: "2–3 Business Days", express: "Next Business Day" },
  { zone: "Regional NSW, VIC, QLD, SA, WA", standard: "3–5 Business Days", express: "2–3 Business Days" },
  { zone: "Northern Territory", standard: "5–8 Business Days", express: "3–5 Business Days" },
  { zone: "Regional WA (Remote)", standard: "7–10 Business Days", express: "5–7 Business Days" },
  { zone: "Tasmania", standard: "3–5 Business Days", express: "2–3 Business Days" },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-offwhite)' }}>
      <section className="border-b border-white/10 py-14" style={{ background: 'var(--color-teal)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-yellow)' }}>
            Delivery
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Shipping Information</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            We dispatch from our Dandenong South warehouse to customers across Australia. Fast, reliable freight with full tracking.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {[
            { icon: Truck, title: "Free Metro Delivery", text: "Orders over $500 ex-GST receive free delivery to Australian capital city metro areas." },
            { icon: Clock, title: "Order Cut-Off", text: "Orders placed before 2:00pm AEST Monday to Friday are processed same day." },
            { icon: MapPin, title: "Melbourne Dispatch", text: "All orders dispatched from our Dandenong South warehouse, 2 Venture Court." },
            { icon: Package, title: "Track Your Order", text: "A tracking link is emailed when your order is dispatched. All consignments are trackable." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white border border-zinc-200 rounded-lg p-5">
              <div
                className="w-10 h-10 rounded mb-3 flex items-center justify-center"
                style={{ background: 'var(--color-teal)' }}
              >
                <Icon size={18} className="text-white" />
              </div>
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

        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4" style={{ background: 'var(--color-teal)' }}>
            <h2 className="text-white font-bold uppercase tracking-wide text-sm">Estimated Delivery Timeframes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="px-6 py-3 text-left text-xs font-bold text-zinc-500 uppercase tracking-wide">Delivery Zone</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-zinc-500 uppercase tracking-wide">Standard</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-zinc-500 uppercase tracking-wide">Express</th>
                </tr>
              </thead>
              <tbody>
                {zones.map((z, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-zinc-50"}>
                    <td className="px-6 py-3 text-zinc-700 font-medium">{z.zone}</td>
                    <td className="px-6 py-3 text-zinc-600">{z.standard}</td>
                    <td className="px-6 py-3 text-zinc-600">{z.express}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 text-xs text-zinc-400 bg-zinc-50 border-t border-zinc-200">
            Timeframes are estimates from dispatch date and may vary during peak periods and for remote locations.
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3
                className="font-bold text-sm mb-2"
                style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
              >
                Important Notes
              </h3>
              <ul className="space-y-1.5 text-xs text-zinc-600 leading-relaxed">
                <li>• Dangerous goods (adhesives, solvents) may be subject to additional freight surcharges and restrictions.</li>
                <li>• Oversized items such as jacking equipment and hose reels may require a freight quote before dispatch.</li>
                <li>• We cannot deliver to P.O. Boxes. A street address is required.</li>
                <li>• International shipping is not currently available. Contact us for export enquiries.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
