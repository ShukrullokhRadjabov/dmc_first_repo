import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Share2, Search, Crosshair, Palette,
  BarChart3, CheckCircle2, ArrowRight, Sparkles,
} from 'lucide-react';

/* ─── Scroll Tilt Wrapper ────────────────────────────── */
function ScrollTiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, y, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─────────────────────────────────────────────── */
const services = [
  {
    id: 'smm',
    icon: Share2,
    title: 'Social Media Marketing',
    short: 'SMM',
    description:
      'We build and manage your social presence across all major platforms. Content strategy, production, community management — all handled.',
    features: ['Content calendar & production', 'Community management', 'Influencer outreach', 'Stories & Reels strategy'],
    metric: '200+',
    metricLabel: 'campaigns launched',
    accent: 'Full service — from zero to dominant presence.',
  },
  {
    id: 'seo',
    icon: Search,
    title: 'Search Engine Optimization',
    short: 'SEO',
    description:
      'Rank higher, be found first. Technical audits, on-page optimization, and link building that drives long-term organic growth.',
    features: ['Technical SEO audit', 'Keyword research & mapping', 'On-page optimization', 'Link building outreach'],
    metric: '+180%',
    metricLabel: 'avg. organic traffic',
    accent: null,
  },
  {
    id: 'targeting',
    icon: Crosshair,
    title: 'Paid Ads & Targeting',
    short: 'Targeting',
    description:
      'Precision ad campaigns on Meta, Google, and TikTok. Every dollar tracked, every audience tested, maximum ROAS delivered.',
    features: ['Meta & Google Ads', 'A/B testing', 'Retargeting funnels'],
    metric: '4.8x',
    metricLabel: 'average ROAS',
    accent: null,
  },
  {
    id: 'branding',
    icon: Palette,
    title: 'Brand Identity & Strategy',
    short: 'Branding',
    description:
      'From logo to brand guidelines, we craft identities that stick. A brand people trust is a brand that sells.',
    features: ['Logo & visual identity', 'Brand guidelines', 'Competitive positioning'],
    metric: '95%',
    metricLabel: 'client satisfaction',
    accent: null,
  },
];

/* ─── Variants ──────────────────────────────────────────── */
const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── Wide card (SMM — col-span-2) ─────────────────────── */
function WideCard({ service }: { service: typeof services[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      className="relative rounded-2xl overflow-hidden border border-brand-border bg-brand-card group cursor-default"
      whileHover="hovered"
      initial="rest"
      animate="rest"
    >
      {/* Animated border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        variants={{
          rest: { boxShadow: '0 0 0px rgba(16,185,129,0)', borderColor: 'transparent' },
          hovered: { boxShadow: '0 4px 12px rgba(16,185,129,0.08) inset' },
        }}
        transition={{ duration: 0.4 }}
        style={{ border: '1px solid transparent' }}
      />

      {/* Top green accent bar */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-brand-green to-brand-green-dim"
        variants={{ rest: { scaleX: 0, originX: 0 }, hovered: { scaleX: 1, originX: 0 } }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative p-8 lg:p-10 h-full flex flex-col lg:flex-row gap-8">
        {/* Left: icon + headline + description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="w-14 h-14 rounded-xl flex items-center justify-center bg-brand-green/10"
              variants={{
                rest: { scale: 1, backgroundColor: 'rgba(16,185,129,0.08)' },
                hovered: { scale: 1.1, backgroundColor: 'rgba(16,185,129,0.15)' },
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ boxShadow: undefined }}
            >
              <motion.div
                variants={{ rest: { rotate: 0 }, hovered: { rotate: -8 } }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <service.icon size={26} className="text-brand-green" />
              </motion.div>
            </motion.div>

            <div>
              <div className="text-xs font-bold tracking-widest text-brand-text-dim uppercase mb-1">{service.short}</div>
              <h3 className="text-2xl font-bold text-brand-text">{service.title}</h3>
            </div>
          </div>

          <p className="text-brand-text-muted leading-relaxed mb-6 max-w-lg">{service.description}</p>

          {service.accent && (
            <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 text-brand-green text-xs font-semibold px-4 py-2 rounded-full mb-4">
              <Sparkles size={12} />
              {service.accent}
            </div>
          )}

          <motion.button
            className="flex items-center gap-2 text-sm font-semibold text-brand-text-muted mt-2 group/btn"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ color: '#10B981' }}
          >
            Learn more
            <motion.span
              variants={{ rest: { x: 0 }, hovered: { x: 6 } }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ArrowRight size={14} />
            </motion.span>
          </motion.button>
        </div>

        {/* Right: features + metric */}
        <div className="lg:w-64 flex flex-col justify-between gap-6">
          <ul className="space-y-3">
            {service.features.map((f, fi) => (
              <motion.li
                key={f}
                className="flex items-center gap-2.5 text-sm text-brand-text-muted"
                variants={{
                  rest: { x: 0 },
                  hovered: { x: 4, transition: { delay: fi * 0.05 } },
                }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle2 size={14} className="text-brand-green flex-shrink-0" />
                {f}
              </motion.li>
            ))}
          </ul>

          <div className="pt-5 border-t border-brand-border">
            <BarChart3 size={14} className="text-brand-text-dim mb-1" />
            <div className="text-3xl font-bold text-brand-green">{service.metric}</div>
            <div className="text-xs text-brand-text-dim">{service.metricLabel}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Tall card (SEO — row-span-2) ─────────────────────── */
function TallCard({ service }: { service: typeof services[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      className="relative rounded-2xl overflow-hidden border border-brand-border bg-brand-card group cursor-default flex flex-col"
      whileHover="hovered"
      initial="rest"
      animate="rest"
    >
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-brand-green to-brand-green-dim"
        variants={{ rest: { scaleX: 0, originX: 0 }, hovered: { scaleX: 1, originX: 0 } }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Subtle radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 30%, rgba(16,185,129,0.05) 0%, transparent 60%)' }}
        variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
      />

      <div className="p-7 flex flex-col flex-1 gap-6">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center bg-brand-green/10"
          variants={{
            rest: { scale: 1 },
            hovered: { scale: 1.12, backgroundColor: 'rgba(16,185,129,0.15)', boxShadow: '0 4px 12px rgba(16,185,129,0.1)' },
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          <service.icon size={22} className="text-brand-green" />
        </motion.div>

        <div>
          <div className="text-xs font-bold tracking-widest text-brand-text-dim uppercase mb-2">{service.short}</div>
          <h3 className="text-xl font-bold text-brand-text mb-3">{service.title}</h3>
          <p className="text-sm text-brand-text-muted leading-relaxed">{service.description}</p>
        </div>

        <ul className="space-y-2.5 flex-1">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-brand-text-muted">
              <CheckCircle2 size={13} className="text-brand-green flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="pt-5 border-t border-brand-border">
          <div className="text-3xl font-bold text-brand-green">{service.metric}</div>
          <div className="text-xs text-brand-text-dim mt-0.5">{service.metricLabel}</div>
        </div>

        {/* Bar chart decoration */}
        <div className="flex items-end gap-1.5 h-16 opacity-20">
          {[40, 60, 50, 80, 65, 90, 75].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-brand-green rounded-t-sm"
              style={{ height: `${h}%` }}
              variants={{ rest: { opacity: 0.5 }, hovered: { opacity: 1 } }}
              transition={{ delay: i * 0.04 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Regular card (Targeting, Branding) ────────────────── */
function RegularCard({ service }: { service: typeof services[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      className="relative rounded-2xl overflow-hidden border border-brand-border bg-brand-card group cursor-default"
      whileHover="hovered"
      initial="rest"
      animate="rest"
    >
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-brand-green to-brand-green-dim"
        variants={{ rest: { scaleX: 0, originX: 0 }, hovered: { scaleX: 1, originX: 0 } }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.04) 0%, transparent 55%)' }}
        variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.35 }}
      />

      <div className="p-7">
        <div className="flex items-start justify-between mb-5">
          <motion.div
            className="w-11 h-11 rounded-lg flex items-center justify-center bg-brand-green/10"
            variants={{
              rest: { scale: 1 },
              hovered: { scale: 1.1, backgroundColor: 'rgba(16,185,129,0.15)' },
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            <service.icon size={20} className="text-brand-green" />
          </motion.div>
          <div className="text-xs font-bold tracking-widest text-brand-text-dim uppercase">{service.short}</div>
        </div>

        <h3 className="text-lg font-bold text-brand-text mb-2">{service.title}</h3>
        <p className="text-sm text-brand-text-muted leading-relaxed mb-5">{service.description}</p>

        <ul className="space-y-2 mb-5">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-brand-text-muted">
              <CheckCircle2 size={12} className="text-brand-green flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-4 border-t border-brand-border">
          <div>
            <div className="text-2xl font-bold text-brand-green">{service.metric}</div>
            <div className="text-xs text-brand-text-dim">{service.metricLabel}</div>
          </div>
          <motion.div
            variants={{ rest: { x: 0, opacity: 0.4 }, hovered: { x: 4, opacity: 1, color: '#10B981' } }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="text-brand-text-dim"
          >
            <ArrowRight size={16} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Services section ──────────────────────────────────── */
export default function Services() {
  return (
    <section id="services" className="relative py-28 bg-brand-darker overflow-hidden">
      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-brand-green/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <div className="section-label">What We Do</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-text">
              Four Services.
              <br />
              <span className="green-gradient-text">One Goal.</span>
            </h2>
            <p className="text-brand-text-muted max-w-md lg:text-right text-sm leading-relaxed">
              Every service we offer is built around a single outcome — making your brand impossible to ignore in your market.
            </p>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          {/* SMM — wide (col-span-2) */}
          <ScrollTiltCard className="col-span-1 md:col-span-2">
            <WideCard service={services[0]} />
          </ScrollTiltCard>

          {/* SEO — tall (row-span-2), on mobile renders as regular */}
          <ScrollTiltCard className="row-span-1 md:row-span-2">
            <TallCard service={services[1]} />
          </ScrollTiltCard>

          {/* Targeting — regular */}
          <ScrollTiltCard>
            <RegularCard service={services[2]} />
          </ScrollTiltCard>

          {/* Branding — regular */}
          <ScrollTiltCard>
            <RegularCard service={services[3]} />
          </ScrollTiltCard>
        </motion.div>
      </div>
    </section>
  );
}
