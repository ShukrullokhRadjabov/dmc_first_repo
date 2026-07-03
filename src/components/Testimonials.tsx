import { useEffect, useRef, useState, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

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

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length), []);

  // Avtomatik almashtirish (auto-play)
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
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
          <div className="section-label mx-auto" style={{ justifyContent: 'center' }}>Client Stories</div>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-text mt-4">
            Don&apos;t Take <br />
            <span className="green-gradient-text">Our Word For It</span>
          </h2>
        </div>

        {/* Testimonial Card */}        
        <div 
          className="relative max-w-4xl mx-auto mb-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative h-[450px] lg:h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 bg-brand-card border border-brand-border rounded-2xl p-8 lg:p-12"
              >
                <Quote size={80} className="absolute top-6 right-8 text-brand-green opacity-10" />
                
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={16} className="text-brand-green" fill="currentColor" />
                  ))}
                </div>

                <blockquote className="text-lg lg:text-xl text-brand-text leading-relaxed mb-8 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-green/40" />
                  <div>
                    <div className="font-bold text-brand-text">{t.name}</div>
                    <div className="text-sm text-brand-text-muted">{t.role}, {t.company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-2 bg-brand-green' : 'w-2 h-2 bg-brand-border hover:bg-brand-muted'}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="w-10 h-10 rounded-lg border border-brand-border flex items-center justify-center hover:text-brand-green transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} className="w-10 h-10 rounded-lg border border-brand-border flex items-center justify-center hover:text-brand-green transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
