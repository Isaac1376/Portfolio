import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useMemo, useState } from 'react';
import Section from '../components/Section';
import RippleButton from '../components/RippleButton';
import { fadeUp, staggerContainer, staggerContainerSlow } from '../animations/variants';
import { categories, projects } from '../data/projects';

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    if (filter === 'WordPress') return projects.filter((p) => p.stack === 'wordpress');
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <Section id="projects" subtitle="Portfolio" title="WordPress projects">
      <motion.div
        variants={staggerContainerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mb-10 flex flex-wrap justify-center gap-2 sm:mb-12"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            type="button"
            layout
            role="tab"
            aria-selected={filter === cat}
            onClick={() => setFilter(cat)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            variants={fadeUp}
            className={`touch-manipulation rounded-full px-4 py-2.5 text-xs font-semibold transition-colors sm:px-5 sm:text-sm ${
              filter === cat
                ? 'bg-accent text-white shadow-glow dark:bg-cyan-500 dark:text-dark-bg'
                : 'border border-slate-200/90 bg-white/70 text-slate-700 hover:border-accent/40 dark:border-white/15 dark:bg-dark-card/70 dark:text-slate-200'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8% 0px', amount: 0.12 }}
        className="grid gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.title}
              layout
              variants={fadeUp}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white/80 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-dark-card/75 sm:rounded-3xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} — website preview`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={500}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-semibold text-slate-800 backdrop-blur dark:bg-dark-card/90 dark:text-white sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
                  {project.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
                  <RippleButton
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 w-full flex-1 touch-manipulation items-center justify-center gap-2 bg-accent px-4 py-2.5 text-sm font-semibold text-white sm:w-auto dark:bg-cyan-500 dark:text-dark-bg"
                  >
                    <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                    Live Demo
                  </RippleButton>
                  <RippleButton
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 w-full flex-1 touch-manipulation items-center justify-center gap-2 border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 sm:w-auto dark:border-white/15 dark:bg-transparent dark:text-white"
                  >
                    <Github className="h-4 w-4 shrink-0" aria-hidden />
                    GitHub
                  </RippleButton>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
