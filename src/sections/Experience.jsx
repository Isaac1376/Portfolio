import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import Section from '../components/Section';
import { fadeUp } from '../animations/variants';
import { timeline } from '../data/experience';

export default function Experience() {
  return (
    <Section id="experience" subtitle="Journey" title="Experience">
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute bottom-0 left-[22px] top-4 w-px bg-gradient-to-b from-accent via-cyan-400/50 to-violet-500 sm:left-8" />

        <ul className="space-y-12">
          {timeline.map((item, index) => (
            <motion.li
              key={item.title + item.period}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={index}
              className="relative flex gap-6 sm:gap-10"
            >
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/40 bg-white shadow-md dark:border-cyan-400/40 dark:bg-dark-card">
                <Briefcase className="h-6 w-6 text-accent dark:text-cyan-300" />
              </div>
              <article className="glass-card flex-1 rounded-3xl p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent dark:text-cyan-300">
                  {item.period}
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{item.company}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
