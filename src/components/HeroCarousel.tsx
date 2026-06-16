import { useState, useEffect, useRef, useCallback } from "react";

const heroSlides = [
  { src: "/Hero/hero-1.jpg", alt: "Tyre technician mounting a tyre on a tyre machine using tyre levers, wearing full PPE" },
  { src: "/Hero/hero-5.jpg", alt: "Tyre fitter using a hydraulic jack to raise a vehicle, wheel brace in hand" },
  { src: "/Hero/hero-2.jpg", alt: "Close-up of a tyre being demounted from a rim using a demount tool" },
  { src: "/Hero/hero-4.jpg", alt: "Inflation gauge connected to a tyre valve, filling the tyre with air" },
  { src: "/Hero/hero-3.jpg", alt: "Tractor ploughing a field — ITS supplies repair materials for agricultural tyres" },
];

const INTERVAL = 6000;

export default function HeroCarousel({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(advance, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, advance]);

  function goTo(idx: number) {
    setCurrent(idx);
    setPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  return (
    <section
      className="relative overflow-hidden min-h-[580px] flex items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero image carousel"
    >
      {/* Slides */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
          aria-hidden={i !== current}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            loading={i === 0 ? "eager" : "lazy"}
            className="w-full h-full object-cover object-center"
            style={{ display: 'block' }}
          />
          {/* Dark overlay — heavier on the left where text sits */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.48) 50%, rgba(0,0,0,0.30) 100%)' }}
          />
        </div>
      ))}

      {/* Teal left accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5"
        style={{ background: 'var(--color-teal)', zIndex: 2 }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full" style={{ zIndex: 2 }}>
        {children}
      </div>

      {/* Pagination dots */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5"
        style={{ zIndex: 3 }}
        role="tablist"
        aria-label="Select hero image"
      >
        {heroSlides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Show image ${i + 1}`}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              background: i === current ? '#f5b800' : 'rgba(255,255,255,0.45)',
            }}
          />
        ))}
      </div>

      {/* Bottom wedge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-14"
        style={{ background: 'var(--color-offwhite)', clipPath: 'polygon(0 100%, 100% 0, 100% 100%)', zIndex: 2 }}
        aria-hidden="true"
      />
    </section>
  );
}
