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

function CaseCard({ c, index }: { c: typeof cases[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.85, 1], [0.3, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.85, 1], [0.95, 1, 1, 0.97]);
  const y = useTransform(scrollYProgress, [0, 0.4, 1], [40, 0, -20]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className="group bg-brand-card border border-brand-border rounded-xl overflow-hidden hover:border-brand-green/40 transition-colors duration-300 hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={c.image}
          alt={c.client}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/40 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
          <div>
            <div className="text-xs font-semibold text-brand-green uppercase tracking-wider mb-1">{c.industry}</div>
            <div className="text-xl font-bold text-brand-text">{c.client}</div>
          </div>
          <span className="text-xs bg-brand-green/10 border border-brand-green/30 text-brand-green px-3 py-1 rounded-full font-medium">
            {c.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <div className="text-xs font-semibold text-brand-text-dim uppercase tracking-wider mb-1">Challenge</div>
          <p className="text-sm text-brand-text-muted leading-relaxed">{c.challenge}</p>
        </div>
        <div className="mb-6">
          <div className="text-xs font-semibold text-brand-text-dim uppercase tracking-wider mb-1">Solution</div>
          <p className="text-sm text-brand-text-muted leading-relaxed">{c.solution}</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 pt-5 border-t border-brand-border">
          {c.metrics.map((m, mi) => (
            <MetricCard key={mi} {...m} animate={visible} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0.5]);
  const headerY = useTransform(scrollYProgress, [0, 0.05, 1], [20, 0, -10]);

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

  return (
    <section id="cases" className="relative bg-brand-black overflow-hidden">
      {/* Mobile header (non-sticky, stacked) */}
      <div className="lg:hidden py-20 px-6">
        <div
          ref={titleRef}
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className="section-label">Real Results</div>
          <h2 className="text-4xl font-bold text-brand-text mb-4">
            Brands We&apos;ve
            <br />
            <span className="green-gradient-text">Dominated With</span>
          </h2>
          <div className="flex items-center gap-2 text-brand-text-muted text-sm">
            <TrendingUp size={16} className="text-brand-green" />
            All metrics verified and real
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-10">
          {cases.map((c, i) => (
            <CaseCard key={c.client} c={c} index={i} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-ghost inline-flex items-center gap-2"
          >
            Get Similar Results <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* Desktop sticky scroll narrative */}
      <div
        ref={sectionRef}
        className="hidden lg:block relative"
        style={{ height: `${cases.length * 90}vh` }}
      >
        {/* Sticky left panel */}
        <div className="sticky top-0 h-screen flex items-center">
          <motion.div
            style={{ opacity: headerOpacity, y: headerY }}
            className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-12 gap-8"
          >
            <div className="col-span-4">
              <div className="section-label">Real Results</div>
              <h2 className="text-4xl xl:text-5xl font-bold text-brand-text mb-6">
                Brands We&apos;ve
                <br />
                <span className="green-gradient-text">Dominated With</span>
              </h2>
              <div className="flex items-center gap-2 text-brand-text-muted text-sm mb-8">
                <TrendingUp size={16} className="text-brand-green" />
                All metrics verified and real
              </div>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-ghost inline-flex items-center gap-2"
              >
                Get Similar Results <ArrowUpRight size={16} />
              </button>
            </div>

            {/* Right: scrollable cards container */}
            <div className="col-span-8 relative">
              {cases.map((c, i) => (
                <div
                  key={c.client}
                  className="absolute inset-0"
                  style={{ top: `${i * 90}vh` }}
                >
                  <div className="h-screen flex items-center py-12">
                    <div className="w-full">
                      <CaseCard c={c} index={i} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
