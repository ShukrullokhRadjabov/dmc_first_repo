import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const cases = [
  {
    industry: 'E-Commerce',
    client: 'FashionUZ',
    challenge: 'Brand awareness was near zero outside Tashkent. Low online sales despite good product.',
    solution: 'Full Instagram + TikTok SMM strategy with influencer seeding and Meta retargeting funnels.',
    image: 'https://images.pexels.com/photos/5632396/pexels-photo-5632396.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    metrics: [
      { value: 340, suffix: '%', label: 'Follower Growth' },
      { value: 2.5, suffix: 'M', label: 'Total Reach', isFloat: true },
      { value: 4.2, suffix: 'x', label: 'ROAS', isFloat: true },
    ],
    tag: 'SMM + Targeting',
    color: '#10B981',
  },
  {
    industry: 'Hospitality',
    client: 'Grand Hotel Tashkent',
    challenge: 'Relied entirely on OTAs. Low direct bookings and minimal brand presence online.',
    solution: 'SEO overhaul, Google Ads campaigns, and a full brand redesign to drive direct bookings.',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    metrics: [
      { value: 220, suffix: '%', label: 'Organic Traffic' },
      { value: 68, suffix: '%', label: 'Direct Bookings' },
      { value: 3.8, suffix: 'x', label: 'Revenue Growth', isFloat: true },
    ],
    tag: 'SEO + Branding',
    color: '#10B981',
  },
  {
    industry: 'EdTech',
    client: 'EduPlatform UZ',
    challenge: 'Competitive online education market. Low trial sign-ups and high cost per lead.',
    solution: 'Targeted Google and Meta Ads with A/B-tested landing pages, cutting CPL by 60%.',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    metrics: [
      { value: 60, suffix: '%', label: 'Lower CPL' },
      { value: 5400, suffix: '+', label: 'New Students' },
      { value: 280, suffix: '%', label: 'Conversion Lift' },
    ],
    tag: 'Targeting + SEO',
    color: '#10B981',
  },
];

function MetricCard({ value, suffix, label, isFloat, animate }: {
  value: number; suffix: string; label: string; isFloat?: boolean; animate: boolean;
}) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!animate) return;
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = isFloat ? parseFloat((value * eased).toFixed(1)) : Math.round(value * eased);
      setCount(next);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate, value, isFloat]);

  return (
    <div className="text-center">
      <div className="text-2xl lg:text-3xl font-bold text-brand-text tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-xs text-brand-text-muted mt-1">{label}</div>
    </div>
  );
}

function CaseCard({ c }: { c: typeof cases[0]; index: number }) {
  return (
    <div className="group bg-brand-card border border-brand-border rounded-xl overflow-hidden hover:border-brand-green/40 transition-all duration-300 hover:shadow-card-hover w-full">
      <div className="relative h-52 overflow-hidden">
        <img src={c.image} alt={c.client} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/40 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
          <div>
            <div className="text-xs font-semibold text-brand-green uppercase tracking-wider mb-1">{c.industry}</div>
            <div className="text-xl font-bold text-brand-text">{c.client}</div>
          </div>
          <span className="text-xs bg-brand-green/10 border border-brand-green/30 text-brand-green px-3 py-1 rounded-full font-medium">{c.tag}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4"><div className="text-xs font-semibold text-brand-text-dim uppercase tracking-wider mb-1">Challenge</div><p className="text-sm text-brand-text-muted leading-relaxed">{c.challenge}</p></div>
        <div className="mb-6"><div className="text-xs font-semibold text-brand-text-dim uppercase tracking-wider mb-1">Solution</div><p className="text-sm text-brand-text-muted leading-relaxed">{c.solution}</p></div>
        <div className="grid grid-cols-3 gap-3 pt-5 border-t border-brand-border">
          {c.metrics.map((m, mi) => (
            <div key={mi} className="text-center"><div className="text-xl font-bold text-brand-text">{m.value}{m.suffix}</div><div className="text-[10px] text-brand-text-muted mt-1 uppercase">{m.label}</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="cases" ref={containerRef} className="relative bg-brand-black" style={{ height: `${cases.length * 100}vh` }}>
      {/* Sticky konteyner */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Header */}
          <div className="lg:col-span-4">
            <h2 className="text-4xl xl:text-5xl font-bold text-brand-text">
              Brands We've <br />
              <span className="green-gradient-text">Dominated With</span>
            </h2>
          </div>

          {/* Kartalar maydoni */}
          <div className="lg:col-span-8 relative h-[500px]">
            {cases.map((c, i) => {
              // Har bir karta uchun 0-1 oralig'idagi aniq diapazon
              const start = i / cases.length;
              const end = (i + 1) / cases.length;

              // Faqat o'z diapazonida ko'rinadi va harakatlanadi
              const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
              const y = useTransform(scrollYProgress, [start, start + 0.1, end], [100, 0, -100]);

              return (
                <motion.div 
                  key={c.client} 
                  className="absolute inset-0 w-full" 
                  style={{ opacity, y }}
                >
                  <CaseCard c={c} index={i} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}