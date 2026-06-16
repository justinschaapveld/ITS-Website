import { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-offwhite)' }}>
      {/* Hero */}
      <section className="border-b border-white/10 py-14" style={{ background: 'var(--color-teal)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-yellow)' }}>
            Contact
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Our Melbourne-based team is available Monday to Friday. Call us, email, or fill in the form below — we'll respond within one business day.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left — company info + map */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company details card */}
          <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4" style={{ background: 'var(--color-teal)' }}>
              <h2 className="text-white font-bold uppercase tracking-wide text-sm">Our Details</h2>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div>
                <div className="font-bold text-zinc-800 text-base" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Industrial Tyre Supplies Pty Ltd
                </div>
                <div className="text-zinc-500 text-xs mt-0.5">ABN 48 533 559 801</div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-teal)' }} />
                <div className="text-zinc-600">
                  <div className="font-medium text-zinc-800">2 Venture Court</div>
                  <div>Dandenong South VIC 3175</div>
                  <a
                    href="https://maps.google.com/?q=2+Venture+Court+Dandenong+South+VIC+3175"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold mt-1 inline-block hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="flex-shrink-0" style={{ color: 'var(--color-teal)' }} />
                <div>
                  <a href="tel:0387810600" className="font-medium text-zinc-800 hover:opacity-70 transition-opacity">
                    03 8781 0600
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0" style={{ color: 'var(--color-teal)' }} />
                <a
                  href="mailto:its-office@itsindustrial.com.au"
                  className="font-medium text-zinc-800 hover:opacity-70 transition-opacity break-all"
                >
                  its-office@itsindustrial.com.au
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock size={16} className="flex-shrink-0" style={{ color: 'var(--color-teal)' }} />
                <div className="text-zinc-600">
                  <div className="font-medium text-zinc-800">Mon–Fri 8:00am–4:00pm</div>
                  <div className="text-xs text-zinc-400">Closed weekends and public holidays</div>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4" style={{ background: 'var(--color-teal)' }}>
              <h2 className="text-white font-bold uppercase tracking-wide text-sm">Warehouse Location</h2>
            </div>
            <div className="aspect-[4/3] w-full">
              <iframe
                title="Industrial Tyre Supplies — 2 Venture Court, Dandenong South VIC 3175"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3140.6435!2d145.2010!3d-38.0110!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad613a5e0f0f0f1%3A0x0!2s2%20Venture%20Court%2C%20Dandenong%20South%20VIC%203175!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
              />
            </div>
            <div className="px-5 py-3 bg-zinc-50 border-t border-zinc-100 text-xs text-zinc-500">
              2 Venture Court, Dandenong South VIC 3175 — approx. 35km south-east of Melbourne CBD
            </div>
          </div>
        </div>

        {/* Right — Contact form */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden h-full">
            <div className="px-6 py-4" style={{ background: 'var(--color-teal)' }}>
              <h2 className="text-white font-bold uppercase tracking-wide text-sm">Send a Message</h2>
            </div>
            <div className="p-6">
              {submitted ? (
                <div className="text-center py-16">
                  <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}>
                    Message Received!
                  </h3>
                  <p className="text-zinc-500">We'll be in touch within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wide mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-zinc-300 rounded px-3 py-2.5 text-sm transition-colors focus:outline-none"
                        style={{ '--tw-ring-color': 'var(--color-teal)' } as React.CSSProperties}
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--color-teal)'}
                        onBlur={e => e.currentTarget.style.borderColor = '#d4d4d8'}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wide mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-zinc-300 rounded px-3 py-2.5 text-sm transition-colors focus:outline-none"
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--color-teal)'}
                        onBlur={e => e.currentTarget.style.borderColor = '#d4d4d8'}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wide mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-zinc-300 rounded px-3 py-2.5 text-sm transition-colors focus:outline-none"
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--color-teal)'}
                        onBlur={e => e.currentTarget.style.borderColor = '#d4d4d8'}
                        placeholder="(00) 0000 0000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wide mb-1.5">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full border border-zinc-300 rounded px-3 py-2.5 text-sm bg-white transition-colors focus:outline-none"
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--color-teal)'}
                        onBlur={e => e.currentTarget.style.borderColor = '#d4d4d8'}
                      >
                        <option value="">Select a subject</option>
                        <option value="quote">Request a Quote</option>
                        <option value="order">Order Enquiry</option>
                        <option value="product">Product Information</option>
                        <option value="account">Trade Account</option>
                        <option value="training">Training Enquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wide mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-zinc-300 rounded px-3 py-2.5 text-sm resize-none transition-colors focus:outline-none"
                      onFocus={e => e.currentTarget.style.borderColor = 'var(--color-teal)'}
                      onBlur={e => e.currentTarget.style.borderColor = '#d4d4d8'}
                      placeholder="How can we help you? Include product names, SKUs or any specific requirements."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-sm font-bold uppercase tracking-wide rounded transition-colors"
                    style={{ background: 'var(--color-yellow)', color: 'var(--color-charcoal)', fontFamily: 'Oswald, sans-serif' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#ffc61a')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-yellow)')}
                  >
                    Send Message
                  </button>

                  <p className="text-xs text-zinc-400 text-center">
                    We respond to all enquiries within one business day (Mon–Fri).
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
