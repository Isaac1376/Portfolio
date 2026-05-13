import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { fadeUp, popIn, staggerContainer } from '../animations/variants';
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
      className="section-anchor relative min-h-[100dvh] overflow-x-hidden overflow-y-visible px-4 pb-20 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-6 sm:pb-24 sm:pt-28 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[length:32px_32px] opacity-40 dark:opacity-25 sm:bg-[length:48px_48px]" />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-accent/25 blur-[100px] dark:bg-cyan-500/20 sm:-left-32 sm:top-20 sm:h-96 sm:w-96 sm:blur-[120px]" />
      <div className="pointer-events-none absolute -right-16 bottom-24 h-64 w-64 rounded-full bg-violet-500/20 blur-[80px] dark:bg-fuchsia-600/15 sm:-right-24 sm:bottom-32 sm:h-80 sm:w-80 sm:blur-[100px]" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[28%] h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 rounded-full bg-gradient-to-br from-accent/30 via-transparent to-violet-600/25 blur-3xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      />

      <ParticleField count={40} />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/60 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-widest text-accent shadow-sm backdrop-blur-md dark:border-cyan-400/30 dark:bg-dark-card/70 dark:text-cyan-300 sm:mb-6 sm:px-4 sm:text-xs sm:tracking-widest"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
            Open to creative collaborations
          </motion.div>

          <motion.div variants={fadeUp}>
            <h1 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-900 dark:text-white sm:text-4xl sm:leading-[1.08] lg:text-5xl xl:text-6xl">
              <span className="block break-words font-gothic text-[clamp(2.25rem,8vw,4.5rem)] leading-none text-neon text-slate-100 drop-shadow sm:text-6xl lg:text-7xl">
                Dhivagar M
              </span>
              <span className="mt-3 block font-display text-[clamp(1.35rem,4.5vw,2.75rem)] italic text-gradient text-neon sm:mt-4 lg:text-5xl xl:text-6xl">
                Web Developer & Creative Designer
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 min-h-[1.75rem] max-w-xl text-base text-slate-600 dark:text-slate-300 sm:mt-6 sm:text-lg lg:mx-0 lg:max-w-none xl:text-xl"
          >
            <span className="inline-block border-r-2 border-accent pr-1 dark:border-cyan-400">{typed}</span>
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4 lg:mx-0"
          >
            <motion.div variants={fadeUp} className="w-full sm:w-auto">
              <RippleButton
                onClick={() => scrollTo('projects')}
                className="w-full min-h-12 touch-manipulation items-center justify-center gap-2 bg-gradient-to-r from-accent to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-glow sm:w-auto sm:px-7 dark:from-accent dark:to-cyan-500"
              >
                View Projects
                <ArrowRight className="h-4 w-4" aria-hidden />
              </RippleButton>
            </motion.div>
            <motion.div variants={fadeUp} className="w-full sm:w-auto">
              <RippleButton
                onClick={() => scrollTo('contact')}
                className="w-full min-h-12 touch-manipulation items-center justify-center gap-2 border border-slate-200/90 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-md backdrop-blur sm:w-auto sm:px-7 dark:border-white/15 dark:bg-dark-card/70 dark:text-white"
              >
                Contact Me
              </RippleButton>
            </motion.div>
          </motion.div>

          <motion.dl
            variants={staggerContainer}
            className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-3 border-t border-slate-200/80 pt-8 dark:border-white/10 sm:mt-12 sm:gap-4 sm:pt-8 lg:mx-0 lg:max-w-lg"
          >
            {[
              ['8+', 'Sites shipped'],
              ['4+', 'Years in field'],
              ['100%', 'Detail obsessed'],
            ].map(([v, l]) => (
              <motion.div key={l} variants={popIn} className="text-center sm:text-left">
                <dt className="text-[0.65rem] uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:text-xs">
                  {l}
                </dt>
                <dd className="mt-0.5 text-xl font-bold tabular-nums text-slate-900 dark:text-white sm:mt-1 sm:text-2xl">
                  {v}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          className="relative mx-auto flex w-full max-w-[min(100%,20rem)] justify-center sm:max-w-md lg:mx-0 lg:max-w-none lg:justify-end"
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full max-w-sm">
            <motion.div
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/50 via-cyan-400/30 to-violet-600/40 opacity-80 blur-2xl dark:opacity-90 sm:-inset-4"
              animate={{ scale: [1, 1.05, 1], opacity: [0.7, 0.95, 0.7] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/30 bg-gradient-to-br from-white/40 to-white/5 p-1 shadow-glass-lg backdrop-blur-xl dark:border-white/10 dark:from-dark-card/90 dark:to-dark-bg/40 sm:rounded-[2rem]">
              <div className="overflow-hidden rounded-[1.5rem] bg-slate-100 dark:bg-slate-900/80 sm:rounded-[1.75rem]">
                <img
                  src={GITHUB_AVATAR_URL}
                  alt="Dhivagar M — GitHub profile photo"
                  className="aspect-square h-auto w-full object-cover"
                  loading="eager"
                  width={400}
                  height={400}
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 1024px) 80vw, 400px"
                />
              </div>
            </div>
            <motion.div
              className="absolute -bottom-2 right-0 flex max-w-[calc(100%-1rem)] items-center gap-2 rounded-xl border border-white/40 bg-white/90 px-3 py-2 text-[0.7rem] font-semibold text-slate-800 shadow-lg backdrop-blur dark:border-white/10 dark:bg-dark-card/90 dark:text-white sm:-bottom-4 sm:-right-2 sm:rounded-2xl sm:px-4 sm:text-xs"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.55, type: 'spring', stiffness: 260, damping: 22 }}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="truncate">Available for projects</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
