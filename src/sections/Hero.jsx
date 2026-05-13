import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTypingEffect } from '../hooks/useTypingEffect';
import ParticleField from '../components/ParticleField';
import RippleButton from '../components/RippleButton';
import { GITHUB_AVATAR_URL } from '../constants/profile';

const TYPING_PHRASES = [
  'I craft fast, accessible web experiences.',
  'WordPress & React — shipped with precision.',
  'UI that feels intentional and alive.',
];

export default function Hero() {
  const typed = useTypingEffect(TYPING_PHRASES, 72, 2400);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="section-anchor relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[length:48px_48px] opacity-40 dark:opacity-25" />
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-accent/25 blur-[120px] dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute -right-24 bottom-32 h-80 w-80 rounded-full bg-violet-500/20 blur-[100px] dark:bg-fuchsia-600/15" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-accent/30 via-transparent to-violet-600/25 blur-3xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      />

      <ParticleField count={48} />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-accent shadow-sm backdrop-blur-md dark:border-cyan-400/30 dark:bg-dark-card/70 dark:text-cyan-300"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Sparkles className="h-4 w-4" />
            Open to creative collaborations
          </motion.div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            <span className="block tracking-[0.18em] text-slate-700 dark:text-slate-200">
              Script&nbsp;Bold
            </span>
            <span className="mt-4 block text-4xl italic text-gradient text-neon sm:text-5xl lg:text-6xl">
              Web Developer & Creative Designer
            </span>
          </h1>

          <p className="mt-6 min-h-[1.75rem] text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
            <span className="border-r-2 border-accent pr-1 dark:border-cyan-400">{typed}</span>
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <RippleButton
              onClick={() => scrollTo('projects')}
              className="items-center gap-2 bg-gradient-to-r from-accent to-sky-500 px-7 py-3.5 text-sm font-semibold text-white shadow-glow dark:from-accent dark:to-cyan-500"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </RippleButton>
            <RippleButton
              onClick={() => scrollTo('contact')}
              className="items-center gap-2 border border-slate-200/90 bg-white/80 px-7 py-3.5 text-sm font-semibold text-slate-800 shadow-md backdrop-blur dark:border-white/15 dark:bg-dark-card/70 dark:text-white"
            >
              Contact Me
            </RippleButton>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-200/80 pt-8 dark:border-white/10 sm:max-w-lg">
            {[
              ['8+', 'Sites shipped'],
              ['4+', 'Years in field'],
              ['100%', 'Detail obsessed'],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{l}</dt>
                <dd className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="relative mx-auto flex max-w-md justify-center lg:mx-0 lg:justify-end"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/50 via-cyan-400/30 to-violet-600/40 opacity-80 blur-2xl dark:opacity-90"
              animate={{ scale: [1, 1.05, 1], opacity: [0.7, 0.95, 0.7] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-gradient-to-br from-white/40 to-white/5 p-1 shadow-glass-lg backdrop-blur-xl dark:border-white/10 dark:from-dark-card/90 dark:to-dark-bg/40">
              <div className="overflow-hidden rounded-[1.75rem] bg-slate-100 dark:bg-slate-900/80">
                <img
                  src={GITHUB_AVATAR_URL}
                  alt="Dhivagar M — GitHub profile photo"
                  className="aspect-square h-auto w-full max-w-sm object-cover"
                  loading="eager"
                  width={400}
                  height={400}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <motion.div
              className="absolute -bottom-4 -right-2 flex items-center gap-2 rounded-2xl border border-white/40 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-800 shadow-lg backdrop-blur dark:border-white/10 dark:bg-dark-card/90 dark:text-white"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for projects
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
