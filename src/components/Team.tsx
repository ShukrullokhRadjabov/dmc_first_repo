import { useEffect, useRef, useState } from 'react';
import { Linkedin, Instagram } from 'lucide-react';

const team = [
  {
    name: 'Alisher Nazarov',
    role: 'CEO & Strategy',
    specialization: 'Brand Strategy',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
    bio: '8 years scaling brands across Central Asia. Former CMO at two fintech startups. Believes marketing without data is just decoration.',
    tags: ['Strategy', 'Leadership'],
  },
  {
    name: 'Malika Tursunova',
    role: 'Head of SMM',
    specialization: 'Social Media',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
    bio: 'Grew 30+ brand accounts from zero to 6-figure followings. Content strategist who treats every scroll-stop as a conversion opportunity.',
    tags: ['Content', 'Community'],
  },
  {
    name: 'Sherzod Mirzaev',
    role: 'Performance Marketing Lead',
    specialization: 'Paid Ads & SEO',
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
    bio: 'Meta & Google certified. Managed $2M+ in ad spend with an average 4.2x ROAS across all accounts. Obsessed with attribution.',
    tags: ['Meta Ads', 'Google Ads'],
  },
  {
    name: 'Zulfiya Rakhimova',
    role: 'Creative Director',
    specialization: 'Brand Identity',
    image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
    bio: 'Rebranded 15+ companies in Uzbekistan. Studied design in Berlin, brings international aesthetics to local market realities.',
    tags: ['Branding', 'Design'],
  },
  {
    name: 'Timur Khasanov',
    role: 'SEO Specialist',
    specialization: 'Search & Analytics',
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
    bio: 'Consistently ranked clients on page 1 in competitive niches. Technical SEO nerd who codes custom tracking solutions.',
    tags: ['Technical SEO', 'Analytics'],
  },
];

function TeamCard({ member, index, visible }: {
  member: typeof team[0];
  index: number;
  visible: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative group cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${index * 100}ms, transform 0.7s ease ${index * 100}ms`,
        perspective: '1200px',
        height: 380,
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(to top, rgba(16,185,129,0.12), transparent)' }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="text-lg font-bold text-brand-text">{member.name}</div>
            <div className="text-sm text-brand-green font-medium">{member.role}</div>
            <div className="flex gap-2 mt-2">
              {member.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-brand-card border border-brand-border text-brand-text-muted px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl bg-brand-card border border-brand-green/30 p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div>
            <div className="text-xs font-semibold text-brand-green uppercase tracking-wider mb-3">
              {member.specialization}
            </div>
            <h3 className="text-xl font-bold text-brand-text mb-2">{member.name}</h3>
            <p className="text-sm text-brand-text-muted leading-relaxed">{member.bio}</p>
          </div>
          <div className="flex gap-3">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="w-9 h-9 rounded-lg border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-green hover:border-brand-green/50 transition-all duration-200"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="w-9 h-9 rounded-lg border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-green hover:border-brand-green/50 transition-all duration-200"
            >
              <Instagram size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

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
    <section id="team" className="relative py-28 bg-brand-darker overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleRef}
          className="mb-16"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className="section-label">The People</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-text">
              Meet the Team
              <br />
              <span className="green-gradient-text">Behind the Growth</span>
            </h2>
            <p className="text-brand-text-muted max-w-sm lg:text-right text-sm leading-relaxed">
              Hover each card to learn more. Every team member is a specialist — not a generalist.
            </p>
          </div>
        </div>

        {/* Team grid — asymmetric layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.slice(0, 3).map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} visible={titleVisible} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 lg:max-w-2xl">
          {team.slice(3).map((member, i) => (
            <TeamCard key={member.name} member={member} index={i + 3} visible={titleVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
