import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Target, Award } from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────── */
const stats = [
  { value: 340, suffix: '%', label: 'Avg. Growth' },
  { value: 50, suffix: '+', label: 'Brands Scaled' },
  { value: 3.2, suffix: 'M+', label: 'Reach Generated', isFloat: true },
  { value: 4.8, suffix: 'x', label: 'Avg. ROAS', isFloat: true },
];

const floatingCards = [
  { icon: TrendingUp, label: '+340% Growth', sub: 'Meta Ads Campaign', x: 72, y: 22 },
  { icon: Users, label: '2.5M Reach', sub: 'Instagram SMM', x: 62, y: 55 },
  { icon: Target, label: '4.8x ROAS', sub: 'Google Targeting', x: 78, y: 72 },
  { icon: Award, label: '#1 Agency', sub: 'Tashkent 2024', x: 55, y: 30 },
];

/* ─── Variants ──────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 100, damping: 18 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const counterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.8 + i * 0.1 },
  }),
};

/* ─── Animated bar ──────────────────────────────────────── */
function AnimatedBar({ height, index }: { height: number; index: number }) {
  return (
    <motion.div
      className="w-5 rounded-t-sm bg-brand-green"
      style={{ height: `${height}%` }}
      initial={{ scaleY: 0, originY: 1 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.9, delay: 0.4 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

/* ─── Animated counter ──────────────────────────────────── */
function AnimatedCounter({ value, suffix, isFloat }: { value: number; suffix: string; isFloat?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(isFloat ? parseFloat((value * eased).toFixed(1)) : Math.round(value * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, isFloat]);

  return <>{count}{suffix}</>;
}

/* ─── Magnetic button ───────────────────────────────────── */
function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className="btn-primary relative overflow-hidden group"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Sheen sweep on hover */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-120%', skewX: '-20deg' }}
        whileHover={{ x: '120%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)', display: 'block' }}
      />
      {children}
    </motion.button>
  );
}

/* ─── Mouse-parallax floating card ─────────────────────── */
function FloatingCard({
  card, mouseX, mouseY,
}: {
  card: typeof floatingCards[0];
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
}) {
  const px = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);
  const py = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  return (
    <motion.div
      className="absolute hidden xl:flex items-center gap-3 bg-brand-card border border-brand-border rounded-lg px-4 py-3 shadow-card backdrop-blur-sm"
      style={{
        left: `${card.x}%`,
        top: `${card.y}%`,
        x: px,
        y: py,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.2 + floatingCards.indexOf(card) * 0.15, ease: 'backOut' }}
      whileHover={{ scale: 1.06, borderColor: 'rgba(16,185,129,0.5)', transition: { duration: 0.2 } }}
    >
      <div className="w-8 h-8 rounded-md bg-brand-green/10 flex items-center justify-center">
        <card.icon size={16} className="text-brand-green" />
      </div>
      <div>
        <div className="text-sm font-bold text-brand-text">{card.label}</div>
        <div className="text-xs text-brand-text-muted">{card.sub}</div>
      </div>
    </motion.div>
  );
}

/* ─── Hero ──────────────────────────────────────────────── */
const headlineWords = ['We', 'Make', 'Brands'];
const highlightWord = 'Dominant';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Raw mouse position normalised to [-0.5, 0.5]
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(rawY, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-black"
      onMouseMove={handleMouseMove}
    >
      {/* Background bar chart */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-end justify-end pr-12 pb-24 opacity-10 pointer-events-none select-none">
        <div className="flex items-end gap-4" style={{ height: 320 }}>
          {[35, 55, 45, 75, 60, 90, 70, 100, 80, 95].map((h, i) => (
            <AnimatedBar key={i} height={h} index={i} />
          ))}
        </div>
      </div>

      {/* Floating stat cards (parallax) */}
      {floatingCards.map((card) => (
        <FloatingCard key={card.label} card={card} mouseX={mouseX} mouseY={mouseY} />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="max-w-3xl">

          {/* Section label */}
          <motion.div
            className="section-label mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Based in Tashkent, Uzbekistan
          </motion.div>

          {/* Headline — word-by-word reveal */}
          <div className="mb-6 overflow-hidden" style={{ perspective: '1000px' }}>
            <motion.div
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-[-0.01em] text-brand-text flex flex-wrap gap-x-[0.15em]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {headlineWords.map((word) => (
                <motion.span key={word} variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              ))}

              {/* Highlighted word with green gradient + pulse glow */}
              <motion.span
                variants={wordVariants}
                className="inline-block green-gradient-text"
                animate={{ textShadow: ['0 0 0px rgba(16,185,129,0)', '0 0 20px rgba(16,185,129,0.25)', '0 0 0px rgba(16,185,129,0)'] }}
                transition={{ textShadow: { duration: 3, repeat: Infinity, delay: 1.4 } }}
              >
                {highlightWord}
                <span className="text-brand-green">.</span>
              </motion.span>
            </motion.div>
          </div>

          {/* Sub-headline */}
          <motion.p
            className="text-lg lg:text-xl text-brand-text-muted leading-relaxed max-w-2xl mb-10"
            custom={0.45}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Full-stack digital marketing for brands ready to lead their market.
            SMM, SEO, Targeting, and Branding — all under one roof, all driven by data.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mb-16"
            custom={0.6}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <MagneticButton onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Growing <ArrowRight size={18} />
            </MagneticButton>

            <motion.button
              className="btn-ghost"
              onClick={() => document.querySelector('#cases')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ borderColor: '#10B981', color: '#10B981', backgroundColor: 'rgba(16,185,129,0.05)' }}
              whileTap={{ scale: 0.97 }}
            >
              See Our Work
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-brand-border"
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} custom={i} variants={counterVariants}>
                <div className="text-3xl lg:text-4xl font-bold text-brand-text tabular-nums">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} isFloat={stat.isFloat} />
                </div>
                <div className="text-sm text-brand-text-muted mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-text-dim hover:text-brand-green transition-colors duration-300"
        onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-brand-green to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.button>
    </section>
  );
}
