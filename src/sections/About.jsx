import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Section from '../components/Section';
import { fadeInLeft, fadeInRight, popIn, staggerContainer, staggerContainerSlow } from '../animations/variants';

const skills = [
  { name: 'React & Modern JS', value: 92 },
  { name: 'WordPress / Elementor', value: 95 },
  { name: 'UI / UX Design', value: 88 },
  { name: 'Performance & SEO', value: 85 },
];

const stats = [
  { label: 'Projects', value: '15+' },
  { label: 'Clients', value: '12+' },
  { label: 'Coffee', value: '∞' },
];

function SkillBar({ name, value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <div ref={ref}>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-200">{name}</span>
        <span className="text-slate-500 dark:text-slate-400">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent to-cyan-400"
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Section id="about" subtitle="About" title="Building refined digital experiences">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px', amount: 0.12 }}
        className="grid gap-8 lg:grid-cols-2 lg:gap-10"
      >
        <motion.article
          variants={fadeInLeft}
          whileHover={{ y: -4, transition: { type: 'spring', stiffness: 360, damping: 26 } }}
          className="glass-card rounded-2xl p-6 shadow-glass-lg sm:rounded-3xl sm:p-8 lg:p-10"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">Hi, I&apos;m Dhivagar M</h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            I&apos;m a web developer and creative designer focused on polished interfaces, fast WordPress
            builds, and React-powered experiences. I blend systematic craft with expressive visuals —
            Apple-like clarity with a cyberpunk edge in motion and light.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            From diagnostic portals to academy platforms, I ship responsive, SEO-aware sites that feel
            premium on every breakpoint.
          </p>
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-8 grid grid-cols-3 gap-3 sm:gap-6"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={popIn}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-2xl border border-slate-200/80 bg-white/60 p-3 text-center shadow-md backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-4"
              >
                <p className="text-xl font-bold text-accent dark:text-cyan-300 sm:text-2xl">{s.value}</p>
                <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:text-xs">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.article>

        <motion.div
          variants={fadeInRight}
          whileHover={{ y: -4, transition: { type: 'spring', stiffness: 360, damping: 26 } }}
          className="glass-card rounded-2xl p-6 sm:rounded-3xl sm:p-8 lg:p-10"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">Core strengths</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Skill levels reflect my ongoing focus — always leveling up.
          </p>
          <div className="mt-8 space-y-6">
            {skills.map((s) => (
              <SkillBar key={s.name} name={s.name} value={s.value} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
