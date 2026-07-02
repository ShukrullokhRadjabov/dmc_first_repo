import { useEffect, useRef, useState } from 'react';
import { Check, Zap, ArrowRight, Star } from 'lucide-react';
import { supabase, PricingPlan } from '../lib/supabase';

function PlanCard({ plan, index, billing, visible }: {
  plan: PricingPlan;
  index: number;
  billing: 'monthly' | 'quarterly';
  visible: boolean;
}) {
  const price = billing === 'monthly' ? plan.monthly_price : Math.round(plan.quarterly_price / 3);
  const savings = billing === 'quarterly'
    ? Math.round((plan.monthly_price * 3 - plan.quarterly_price) / plan.monthly_price / 3 * 100)
    : 0;

  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-xl"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
        transition: `opacity 0.7s ease ${index * 150}ms, transform 0.7s ease ${index * 150}ms`,
        background: plan.is_popular ? 'linear-gradient(145deg, #16241B, #0F1812)' : '#1A1A1A',
        border: plan.is_popular ? '1px solid rgba(16,185,129,0.4)' : '1px solid #262626',
        boxShadow: plan.is_popular ? '0 4px 12px rgba(16,185,129,0.08)' : undefined,
      }}
    >
      {/* Popular badge */}
      {plan.is_popular && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-green to-transparent" />
      )}

      <div className="p-7 flex flex-col flex-1">
        {/* Plan name + popular */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-brand-text">{plan.name}</h3>
          {plan.is_popular && (
            <div className="flex items-center gap-1 bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-bold px-2.5 py-1 rounded-full">
              <Star size={10} fill="currentColor" />
              Most Popular
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-brand-text-muted mb-6 leading-relaxed">{plan.description}</p>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-end gap-1">
            <span className="text-4xl font-bold text-brand-text">${price.toLocaleString()}</span>
            <span className="text-brand-text-muted text-sm mb-1.5">/mo</span>
          </div>
          {billing === 'quarterly' && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-brand-green font-semibold">Save {savings}%</span>
              <span className="text-xs text-brand-text-dim">billed ${plan.quarterly_price.toLocaleString()}/qtr</span>
            </div>
          )}
          {billing === 'monthly' && (
            <div className="text-xs text-brand-text-dim mt-1">billed monthly</div>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={scrollToContact}
          className={`w-full py-3 rounded-lg font-bold text-sm transition-all duration-300 mb-7 flex items-center justify-center gap-2 ${
            plan.is_popular
              ? 'bg-gradient-to-r from-brand-green to-brand-green-dim text-brand-black hover:shadow-green-md hover:-translate-y-0.5'
              : 'bg-transparent border border-brand-border text-brand-text hover:border-brand-green/50 hover:text-brand-green'
          }`}
        >
          Get Started <ArrowRight size={15} />
        </button>

        {/* Divider */}
        <div className="border-t border-brand-border mb-6" />

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm">
              <div className="mt-0.5 flex-shrink-0">
                <Check size={14} className="text-brand-green" />
              </div>
              <span className="text-brand-text-muted leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Pricing() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [billing, setBilling] = useState<'monthly' | 'quarterly'>('monthly');
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('pricing_plans')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data) setPlans(data as PricingPlan[]);
        setLoading(false);
      });
  }, []);

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
    <section id="pricing" className="relative py-28 bg-brand-darker overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-12"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className="section-label mx-auto" style={{ justifyContent: 'center' }}>
            Transparent Pricing
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-text mt-4 mb-4">
            Choose Your
            <span className="green-gradient-text"> Tier</span>
          </h2>
          <p className="text-brand-text-muted max-w-lg mx-auto text-sm leading-relaxed mb-8">
            No hidden fees. No lock-ins. Cancel anytime.
            All plans include onboarding, strategy, and monthly performance reviews.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-brand-card border border-brand-border rounded-lg p-1 gap-1">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                billing === 'monthly'
                  ? 'bg-brand-green text-brand-black'
                  : 'text-brand-text-muted hover:text-brand-text'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('quarterly')}
              className={`px-5 py-2 rounded-md text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                billing === 'quarterly'
                  ? 'bg-brand-green text-brand-black'
                  : 'text-brand-text-muted hover:text-brand-text'
              }`}
            >
              Quarterly
              <span className="text-xs bg-brand-green/10 text-brand-green border border-brand-green/30 px-2 py-0.5 rounded-full">
                Save up to 15%
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} billing={billing} visible={titleVisible} />
            ))}
          </div>
        )}

        {/* Enterprise CTA */}
        <div
          className="mt-10 text-center"
          style={{
            opacity: titleVisible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.6s',
          }}
        >
          <div className="inline-flex items-center gap-3 bg-brand-card border border-brand-border rounded-xl px-8 py-5">
            <Zap size={18} className="text-brand-green flex-shrink-0" />
            <span className="text-brand-text-muted text-sm">
              Need a custom package?{' '}
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-brand-green font-semibold hover:underline"
              >
                Talk to us
              </button>
              {' '}— we tailor solutions for every budget and goal.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
