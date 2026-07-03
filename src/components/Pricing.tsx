import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    monthly_price: 499,
    quarterly_price: 1297,
    description: 'Perfect for small businesses ready to grow their online presence.',
    features: ['SMM management (2 platforms)', 'Up to 12 posts per month', 'Basic SEO audit', 'Monthly analytics report', 'Email support'],
    is_popular: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    monthly_price: 999,
    quarterly_price: 2597,
    description: 'For brands serious about scaling fast with data-driven marketing.',
    features: ['SMM management (4 platforms)', 'Up to 30 posts per month', 'Full SEO optimization', 'Targeted ad campaigns', 'Weekly analytics reports'],
    is_popular: true,
  },
  {
    id: 'dominant',
    name: 'Dominant',
    monthly_price: 1999,
    quarterly_price: 5197,
    description: 'Full-stack marketing domination for ambitious market leaders.',
    features: ['SMM management (all platforms)', 'Unlimited content creation', 'Advanced SEO + link building', 'Multi-channel ad campaigns', 'Real-time analytics dashboard'],
    is_popular: false,
  }
];

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'quarterly'>('monthly');
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="pricing" className="relative py-28 bg-brand-darker overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-text mb-8">
            Choose Your <span className="green-gradient-text">Tier</span>
          </h2>
          
          <div className="inline-flex items-center bg-brand-card border border-brand-border rounded-lg p-1 gap-1">
            <button onClick={() => setBilling('monthly')} className={`px-5 py-2 rounded-md text-sm font-semibold transition-all ${billing === 'monthly' ? 'bg-brand-green text-brand-black' : 'text-brand-text-muted hover:text-brand-text'}`}>Monthly</button>
            <button onClick={() => setBilling('quarterly')} className={`px-5 py-2 rounded-md text-sm font-semibold transition-all ${billing === 'quarterly' ? 'bg-brand-green text-brand-black' : 'text-brand-text-muted hover:text-brand-text'}`}>Quarterly</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`group relative flex flex-col rounded-xl p-7 border transition-all duration-300 ${
                plan.is_popular ? 'border-brand-green bg-gradient-to-b from-brand-card to-brand-black' : 'border-brand-border bg-brand-card'
              } hover:border-brand-green hover:-translate-y-2`}
            >
              {plan.is_popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-green text-brand-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>}
              
              <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-green transition-colors duration-300 mb-2">
                {plan.name}
              </h3>
              <p className="text-sm text-brand-text-muted group-hover:text-brand-text transition-colors duration-300 mb-6 h-10">
                {plan.description}
              </p>
              
              <div className="mb-6 flex items-end gap-1">
                <span className="text-4xl font-bold text-brand-text group-hover:text-brand-green transition-colors duration-300">
                  ${billing === 'monthly' ? plan.monthly_price : Math.round(plan.quarterly_price / 3)}
                </span>
                <span className="text-brand-text-muted text-sm mb-1.5">/mo</span>
              </div>

              <button 
                onClick={scrollToContact} 
                className={`w-full py-3 rounded-lg font-bold text-sm transition-all duration-300 mb-7 ${
                  plan.is_popular 
                    ? 'bg-brand-green text-brand-black' 
                    : 'bg-transparent border border-brand-border text-brand-text group-hover:bg-brand-green group-hover:text-brand-black'
                }`}
              >
                Get Started
              </button>

              <ul className="space-y-3 mt-auto">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-brand-text-muted group-hover:text-brand-text transition-colors duration-300">
                    <Check size={16} className="text-brand-green mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}