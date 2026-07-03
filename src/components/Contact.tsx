import { useEffect, useRef, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle, AlertCircle, Instagram, MessageCircle } from 'lucide-react';
import { supabase, Lead } from '../lib/supabase';


const services = [
  'Social Media Marketing (SMM)',
  'Search Engine Optimization (SEO)',
  'Paid Ads & Targeting',
  'Brand Identity & Strategy',
  'Full Package (All Services)',
  'Custom / Other',
];

const contactInfo = [
  {
    icon: MapPin,
    label: 'Office',
    value: 'Toshkent, Yunusobod tumani, Amir Temur shoh ko\'chasi 108',
    href: undefined,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+998 71 200 00 00',
    href: 'tel:+998712000000',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@dmc.uz',
    href: 'mailto:hello@dmc.uz',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon – Fri: 9:00 – 18:00',
    href: undefined,
  },
];

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: MessageCircle, label: 'Telegram', href: '#' },
];

function FloatingInput({
  label, name, type = 'text', required, value, onChange,
}: {
  label: string; name: string; type?: string;
  required?: boolean; value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-brand-card border rounded-lg px-4 pt-6 pb-2 text-sm text-brand-text outline-none transition-all duration-200 peer"
        style={{
          borderColor: focused ? 'rgba(16,185,129,0.5)' : '#262626',
          boxShadow: focused ? '0 0 0 3px rgba(16,185,129,0.06)' : 'none',
        }}
        placeholder=" "
      />
      <label
        className="absolute left-4 transition-all duration-200 pointer-events-none"
        style={{
          top: focused || hasValue ? '8px' : '50%',
          transform: focused || hasValue ? 'translateY(0)' : 'translateY(-50%)',
          fontSize: focused || hasValue ? '10px' : '14px',
          color: focused ? '#10B981' : '#6B6B6B',
          fontWeight: focused || hasValue ? 600 : 400,
          letterSpacing: focused || hasValue ? '0.05em' : 0,
          textTransform: focused || hasValue ? 'uppercase' : 'none',
        }}
      >
        {label}{required && ' *'}
      </label>
    </div>
  );
}

function FloatingTextarea({
  label, name, required, value, onChange,
}: {
  label: string; name: string; required?: boolean; value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <textarea
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={5}
        className="w-full bg-brand-card border rounded-lg px-4 pt-8 pb-3 text-sm text-brand-text outline-none resize-none transition-all duration-200"
        style={{
          borderColor: focused ? 'rgba(16,185,129,0.5)' : '#262626',
          boxShadow: focused ? '0 0 0 3px rgba(16,185,129,0.06)' : 'none',
        }}
        placeholder=" "
      />
      <label
        className="absolute left-4 top-3 transition-all duration-200 pointer-events-none"
        style={{
          fontSize: focused || hasValue ? '10px' : '14px',
          color: focused ? '#10B981' : '#6B6B6B',
          fontWeight: focused || hasValue ? 600 : 400,
          letterSpacing: focused || hasValue ? '0.05em' : 0,
          textTransform: focused || hasValue ? 'uppercase' : 'none',
        }}
      >
        {label}{required && ' *'}
      </label>
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState<Lead>({
    name: '', email: '', phone: '', company: '', service: '', message: '',
  });

  const setField = (field: keyof Lead) => (v: string) => setForm((prev) => ({ ...prev, [field]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('leads').insert({ ...form });
    if (error) { setStatus('error'); return; }
    setStatus('success');
    setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-28 bg-brand-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Animatsiyasi */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="section-label">Get In Touch</div>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-text mt-4">
            Ready to <span className="green-gradient-text">Dominate?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Kontakt ma'lumotlari */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            {contactInfo.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
                  <item.icon size={16} className="text-brand-green" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-brand-text-dim uppercase mb-1">{item.label}</div>
                  <div className="text-sm text-brand-text">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form Animatsiyasi */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-brand-card border border-brand-green/30 rounded-2xl p-12 text-center"
                >
                  <CheckCircle size={48} className="text-brand-green mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-brand-text mb-3">Message Received!</h3>
                  <button onClick={() => setStatus('idle')} className="text-brand-green font-bold underline">Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-brand-card border border-brand-border rounded-2xl p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FloatingInput label="Full Name" name="name" required value={form.name} onChange={setField('name')} />
                    <FloatingInput label="Email Address" name="email" type="email" required value={form.email} onChange={setField('email')} />
                  </div>
                  <FloatingTextarea label="Tell Us About Your Goals" name="message" required value={form.message} onChange={setField('message')} />
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'loading'}
                    type="submit" 
                    className="w-full py-4 bg-brand-green text-brand-black font-bold rounded-lg flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? 'Sending...' : <>Send Message <Send size={16} /></>}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


// export default function Contact() {
//   const titleRef = useRef<HTMLDivElement>(null);
//   const [titleVisible, setTitleVisible] = useState(false);
//   const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

//   const [form, setForm] = useState<Lead>({
//     name: '', email: '', phone: '', company: '', service: '', message: '',
//   });

//   const setField = (field: keyof Lead) => (v: string) =>
//     setForm((prev) => ({ ...prev, [field]: v }));

//   useEffect(() => {
//     const el = titleRef.current;
//     if (!el) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) { setTitleVisible(true); observer.disconnect(); } },
//       { threshold: 0.15 }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setStatus('loading');

//     const { error } = await supabase.from('leads').insert({
//       name: form.name,
//       email: form.email,
//       phone: form.phone || null,
//       company: form.company || null,
//       service: form.service || null,
//       message: form.message,
//     });

//     if (error) {
//       setStatus('error');
//       return;
//     }

//     setStatus('success');
//     setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' });
//   };

//   return (
//     <section id="contact" className="relative py-28 bg-brand-black overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
//         {/* Header */}
//         <div
//           ref={titleRef}
//           className="mb-16"
//           style={{
//             opacity: titleVisible ? 1 : 0,
//             transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
//             transition: 'opacity 0.7s ease, transform 0.7s ease',
//           }}
//         >
//           <div className="section-label">Get In Touch</div>
//           <h2 className="text-4xl lg:text-5xl font-bold text-brand-text">
//             Ready to
//             <span className="green-gradient-text"> Dominate?</span>
//           </h2>
//           <p className="text-brand-text-muted mt-4 max-w-lg text-sm leading-relaxed">
//             Tell us about your brand and goals. We&apos;ll get back within 24 hours with a free strategy audit.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
//           {/* Contact info */}
//           <div
//             className="lg:col-span-2 space-y-8"
//             style={{
//               opacity: titleVisible ? 1 : 0,
//               transform: titleVisible ? 'translateX(0)' : 'translateX(-30px)',
//               transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
//             }}
//           >
//             {contactInfo.map((item) => (
//               <div key={item.label} className="flex gap-4">
//                 <div className="w-10 h-10 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center flex-shrink-0">
//                   <item.icon size={16} className="text-brand-green" />
//                 </div>
//                 <div>
//                   <div className="text-xs font-semibold text-brand-text-dim uppercase tracking-wider mb-1">
//                     {item.label}
//                   </div>
//                   {item.href ? (
//                     <a href={item.href} className="text-sm text-brand-text hover:text-brand-green transition-colors">
//                       {item.value}
//                     </a>
//                   ) : (
//                     <div className="text-sm text-brand-text">{item.value}</div>
//                   )}
//                 </div>
//               </div>
//             ))}

//             {/* Socials */}
//             <div className="pt-6 border-t border-brand-border">
//               <div className="text-xs font-semibold text-brand-text-dim uppercase tracking-wider mb-4">
//                 Follow Us
//               </div>
//               <div className="flex gap-3">
//                 {socials.map((s) => (
//                   <a
//                     key={s.label}
//                     href={s.href}
//                     className="w-10 h-10 rounded-lg border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-green hover:border-brand-green/50 transition-all duration-200"
//                     aria-label={s.label}
//                   >
//                     <s.icon size={16} />
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Response time badge */}
//             <div className="bg-brand-card border border-brand-border rounded-xl p-5">
//               <div className="flex items-center gap-2 mb-2">
//                 <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
//                 <span className="text-sm font-semibold text-brand-text">We respond fast</span>
//               </div>
//               <p className="text-xs text-brand-text-muted leading-relaxed">
//                 Average first response: <span className="text-brand-green font-semibold">under 2 hours</span> during business hours.
//               </p>
//             </div>
//           </div>

//           {/* Form */}
//           <div
//             className="lg:col-span-3"
//             style={{
//               opacity: titleVisible ? 1 : 0,
//               transform: titleVisible ? 'translateX(0)' : 'translateX(30px)',
//               transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
//             }}
//           >
//             {status === 'success' ? (
//               <div className="h-full min-h-80 flex flex-col items-center justify-center text-center bg-brand-card border border-brand-green/30 rounded-2xl p-12">
//                 <div className="w-16 h-16 rounded-full bg-brand-green/10 border border-brand-green/30 flex items-center justify-center mb-6">
//                   <CheckCircle size={28} className="text-brand-green" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-brand-text mb-3">Message Received!</h3>
//                 <p className="text-brand-text-muted text-sm max-w-sm leading-relaxed mb-6">
//                   Thank you for reaching out. Our team will review your request and get back to you within 24 hours with a free strategy audit.
//                 </p>
//                 <button
//                   onClick={() => setStatus('idle')}
//                   className="btn-ghost text-sm"
//                 >
//                   Send Another Message
//                 </button>
//               </div>
//             ) : (
//               <form
//                 onSubmit={handleSubmit}
//                 className="bg-brand-card border border-brand-border rounded-2xl p-8 space-y-5"
//               >
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                   <FloatingInput label="Full Name" name="name" required value={form.name} onChange={setField('name')} />
//                   <FloatingInput label="Email Address" name="email" type="email" required value={form.email} onChange={setField('email')} />
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                   <FloatingInput label="Phone Number" name="phone" type="tel" value={form.phone ?? ''} onChange={setField('phone')} />
//                   <FloatingInput label="Company Name" name="company" value={form.company ?? ''} onChange={setField('company')} />
//                 </div>

//                 {/* Service select */}
//                 <div className="relative">
//                   <select
//                     value={form.service}
//                     onChange={(e) => setField('service')(e.target.value)}
//                     className="w-full bg-brand-card border border-brand-border rounded-lg px-4 py-3.5 text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
//                     style={{
//                       color: form.service ? '#F5F5F5' : '#6B6B6B',
//                     }}
//                   >
//                     <option value="" disabled>Select a Service</option>
//                     {services.map((s) => (
//                       <option key={s} value={s} className="text-brand-text bg-brand-card">{s}</option>
//                     ))}
//                   </select>
//                   <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-text-dim">▾</div>
//                 </div>

//                 <FloatingTextarea label="Tell Us About Your Goals" name="message" required value={form.message} onChange={setField('message')} />

//                 {status === 'error' && (
//                   <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
//                     <AlertCircle size={16} />
//                     Something went wrong. Please try again or email us directly.
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={status === 'loading'}
//                   className="btn-primary w-full justify-center"
//                 >
//                   {status === 'loading' ? (
//                     <span className="flex items-center gap-2">
//                       <div className="w-4 h-4 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
//                       Sending...
//                     </span>
//                   ) : (
//                     <span className="flex items-center gap-2">
//                       Send Message <Send size={16} />
//                     </span>
//                   )}
//                 </button>

//                 <p className="text-xs text-brand-text-dim text-center">
//                   No spam. No commitment. Just a free strategy session.
//                 </p>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

