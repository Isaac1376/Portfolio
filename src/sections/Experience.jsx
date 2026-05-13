import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import Section from '../components/Section';
import { fadeUp, staggerContainerSlow } from '../animations/variants';
import { timeline } from '../data/experience';

export default function Experience() {
  return (
    <Section id="experience" subtitle="Journey" title="Experience">
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute bottom-0 left-[18px] top-4 w-px bg-gradient-to-b from-accent via-cyan-400/50 to-violet-500 sm:left-8" />

        <motion.ul
          className="space-y-10 sm:space-y-12"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px', amount: 0.12 }}
        >
          {timeline.map((item) => (
            <motion.li
              key={item.title + item.period}
              variants={fadeUp}
              className="relative flex gap-4 sm:gap-10"
            >
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/40 bg-white shadow-md sm:h-14 sm:w-14 dark:border-cyan-400/40 dark:bg-dark-card">
                <Briefcase className="h-5 w-5 text-accent sm:h-6 sm:w-6 dark:text-cyan-300" />
              </div>
              <motion.article
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 380, damping: 28 } }}
                whileTap={{ scale: 0.995 }}
                className="glass-card flex-1 rounded-2xl p-5 sm:rounded-3xl sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-accent sm:text-sm dark:text-cyan-300">
                  {item.period}
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{item.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:mt-4">
                  {item.description}
                </p>
              </motion.article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}
