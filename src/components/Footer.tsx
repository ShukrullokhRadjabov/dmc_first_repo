import { useState, useEffect } from 'react';
import { ArrowUp, Instagram, MessageCircle, Linkedin } from 'lucide-react';

const quickLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '#cases' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  { label: 'SMM Management', href: '#services' },
  { label: 'SEO Optimization', href: '#services' },
  { label: 'Paid Advertising', href: '#services' },
  { label: 'Brand Identity', href: '#services' },
];

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: MessageCircle, label: 'Telegram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-brand-darker border-t border-brand-border">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="/image.png"
              alt="DMC"
              className="h-10 w-auto object-contain brightness-0 invert mb-4"
            />
            <p className="text-brand-text-muted text-sm leading-relaxed max-w-sm mb-6">
              Dominant Marketing Company — Tashkent&apos;s premier full-service digital marketing agency.
              We make brands impossible to ignore.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-green hover:border-brand-green/50 transition-all duration-200"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-text-dim mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-brand-text-muted hover:text-brand-green transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-text-dim mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-brand-text-muted hover:text-brand-green transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-brand-text-dim">
            © {new Date().getFullYear()} Dominant Marketing Company. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-xs text-brand-text-dim">
            Made with <span className="text-brand-green mx-1">♥</span> in Tashkent, Uzbekistan
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-lg bg-brand-green text-brand-black flex items-center justify-center shadow-green-md transition-all duration-300 hover:shadow-green-lg hover:-translate-y-1"
        style={{
          opacity: showTop ? 1 : 0,
          pointerEvents: showTop ? 'auto' : 'none',
          transform: showTop ? 'translateY(0)' : 'translateY(16px)',
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}
