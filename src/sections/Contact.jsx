import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import Section from '../components/Section';
import RippleButton from '../components/RippleButton';
import { getWhatsAppChatUrl } from '../constants/profile';
import { submitPortfolioMessage } from '../services/contactSubmit';
import { fadeUp, staggerContainer } from '../animations/variants';

function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dhivagar1376/',
    icon: Linkedin,
  },
  { label: 'X', href: 'https://x.com/Dhivagar1376', icon: XIcon },
];

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [providerMsg, setProviderMsg] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const whatsappHref = getWhatsAppChatUrl(
    "Hi Dhivagar — I saw your portfolio and I'd like to discuss a project."
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setProviderMsg('');
    setStatus('sending');

    try {
      const result = await submitPortfolioMessage(form);
      if (result.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
        if (result.providerMessage) setProviderMsg(result.providerMessage);
        window.setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('idle');
        setError(result.message);
      }
    } catch {
      setStatus('idle');
      setError('Network issue — try WhatsApp or email instead.');
    }
  };

  return (
    <Section id="contact" subtitle="Contact" title={"Let's build something bold"}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-10 lg:grid-cols-[1fr_1.1fr]"
      >
        <motion.div variants={fadeUp} className="space-y-6">
          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Have a WordPress build, a React microsite, or a full redesign in mind? Drop a message — submissions go
            straight to my inbox. Prefer chat? WhatsApp opens in one tap.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent dark:text-cyan-300" />
              <a href="mailto:dhivagar1376@gmail.com" className="hover:text-accent dark:hover:text-cyan-300">
                dhivagar1376@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent dark:text-cyan-300" />
              <a href="tel:+917358404880" className="hover:text-accent dark:hover:text-cyan-300">
                +91 73584 04880
              </a>
            </li>
            <li className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
              <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Message me on WhatsApp
              </a>
            </li>
            <li className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent dark:text-cyan-300" />
              <span>India · Remote-friendly worldwide</span>
            </li>
          </ul>

          <motion.a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-800 shadow-md backdrop-blur transition hover:bg-emerald-500/15 dark:border-emerald-400/35 dark:bg-emerald-500/15 dark:text-emerald-200 dark:hover:bg-emerald-500/25"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chat on WhatsApp
          </motion.a>

          <div className="flex flex-wrap gap-4 pt-2">
            <motion.a
              href="https://github.com/Isaac1376"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow-md backdrop-blur transition hover:border-accent/40 hover:shadow-glow dark:border-white/15 dark:bg-dark-card/70 dark:text-white"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github className="h-5 w-5 text-accent dark:text-cyan-300" />
              GitHub
            </motion.a>
            {socials.map(({ label, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow-md backdrop-blur transition hover:border-accent/40 hover:shadow-glow dark:border-white/15 dark:bg-dark-card/70 dark:text-white"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon className="h-5 w-5 text-accent dark:text-cyan-300" />
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="glass-card rounded-3xl border border-white/30 p-8 shadow-glass-lg backdrop-blur-xl dark:border-white/10"
        >
          <p className="mb-5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Messages are emailed to me directly (no signup on your side).{' '}
            <strong className="font-semibold text-slate-600 dark:text-slate-300">First time only:</strong> FormSubmit
            sends a one-time activation link to <span className="font-mono text-[0.7rem]">dhivagar1376@gmail.com</span>{' '}
            — click it so future submissions are delivered. Check spam/promotions if nothing appears.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Name
              </span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-xl border border-slate-200/90 bg-white/80 px-4 py-3 text-slate-900 shadow-inner outline-none ring-accent/0 transition focus:border-accent focus:ring-2 focus:ring-accent/30 dark:border-white/15 dark:bg-dark-bg/80 dark:text-white"
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Email
              </span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-xl border border-slate-200/90 bg-white/80 px-4 py-3 text-slate-900 shadow-inner outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 dark:border-white/15 dark:bg-dark-bg/80 dark:text-white"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Message
              </span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full resize-none rounded-xl border border-slate-200/90 bg-white/80 px-4 py-3 text-slate-900 shadow-inner outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 dark:border-white/15 dark:bg-dark-bg/80 dark:text-white"
                placeholder="Tell me about your project…"
              />
            </label>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <RippleButton
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-sky-500 px-8 py-3.5 text-sm font-semibold text-white shadow-glow disabled:opacity-60 dark:from-cyan-500 dark:to-violet-500 dark:text-dark-bg"
            >
              {status === 'sending' ? (
                'Sending…'
              ) : (
                <>
                  Send message
                  <Send className="h-4 w-4" />
                </>
              )}
            </RippleButton>
            <div className="min-h-[1.25rem] flex-1 space-y-1">
              {status === 'sent' && (
                <motion.p
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm font-medium text-emerald-600 dark:text-emerald-400"
                >
                  Sent — I&apos;ll reply soon. Check spam if you don&apos;t hear back.
                </motion.p>
              )}
              {providerMsg && (
                <p className="text-xs text-slate-500 dark:text-slate-400">{providerMsg}</p>
              )}
              {error && (
                <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
              )}
            </div>
          </div>
        </motion.form>
      </motion.div>
    </Section>
  );
}
