import { useEffect, useRef, useState, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Jasur Karimov',
    role: 'CEO',
    company: 'FashionUZ',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    quote:
      'DMC completely transformed how we show up online. In 6 months our Instagram went from 2,000 to over 80,000 followers — and more importantly, our sales tripled. These guys don\'t just manage pages, they build brands.',
    stars: 5,
  },
  {
    name: 'Nilufar Yusupova',
    role: 'Marketing Director',
    company: 'Grand Hotel Tashkent',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    quote:
      'We were overpaying OTAs for bookings we should have been getting directly. DMC\'s SEO work changed everything — our direct bookings are now 68% of revenue. The ROI is unlike anything we\'ve seen from an agency.',
    stars: 5,
  },
  {
    name: 'Bobur Toshmatov',
    role: 'Founder',
    company: 'EduPlatform UZ',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    quote:
      'Our cost per lead dropped by 60% in the first month. The team at DMC genuinely understands the Uzbek market in a way international agencies never could. Strategic, fast, and accountable.',
    stars: 5,
  },
  {
    name: 'Dilnoza Rashidova',
    role: 'Brand Manager',
    company: 'Savdo Group',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    quote:
      'The branding work DMC delivered was world-class. Our new identity positioned us as a premium brand in a crowded market, and our customer perception surveys showed a 45% improvement in brand trust. Exceptional team.',
    stars: 5,
  },
];

const clientLogos = [
  'FashionUZ', 'Grand Hotel', 'EduPlatform', 'Savdo Group',
  'TechStart UZ', 'Nexus Trade', 'BuildCo', 'MedGroup',
];

export default function Testimonials() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, next]);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTitleVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="relative py-28 bg-brand-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className="section-label mx-auto" style={{ justifyContent: 'center' }}>
            Client Stories
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-text mt-4">
            Don&apos;t Take
            <br />
            <span className="green-gradient-text">Our Word For It</span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div
          className="relative max-w-4xl mx-auto mb-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            key={current}
            className="bg-brand-card border border-brand-border rounded-2xl p-8 lg:p-12 relative overflow-hidden"
            style={{ animation: 'testimonialIn 0.5s ease' }}
          >
            {/* Decorative quote mark */}
            <div className="absolute top-6 right-8 text-brand-green opacity-10">
              <Quote size={80} />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} size={16} className="text-brand-green" fill="currentColor" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-lg lg:text-xl text-brand-text leading-relaxed mb-8 relative z-10">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-brand-green/40"
              />
              <div>
                <div className="font-bold text-brand-text">{t.name}</div>
                <div className="text-sm text-brand-text-muted">{t.role}, {t.company}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-8 h-2 bg-brand-green'
                      : 'w-2 h-2 bg-brand-border hover:bg-brand-muted'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-lg border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-green hover:border-brand-green/50 transition-all duration-200"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-lg border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-green hover:border-brand-green/50 transition-all duration-200"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Client logo marquee */}
        <div
          className="mt-16 overflow-hidden"
          style={{
            opacity: titleVisible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.4s',
          }}
        >
          <div className="text-center text-xs font-semibold tracking-widest text-brand-text-dim uppercase mb-6">
            Trusted By
          </div>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, #0A0A0A, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(-90deg, #0A0A0A, transparent)' }} />
            <div className="flex gap-12 items-center" style={{ animation: 'marquee 25s linear infinite', width: 'max-content' }}>
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div key={i} className="text-brand-text-dim font-bold text-sm tracking-wide whitespace-nowrap px-2 opacity-50 hover:opacity-100 transition-opacity">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes testimonialIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
