import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useMemo, useState } from 'react';
import Section from '../components/Section';
import RippleButton from '../components/RippleButton';
import { fadeUp, staggerContainer } from '../animations/variants';
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
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-12 flex flex-wrap justify-center gap-2"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              filter === cat
                ? 'bg-accent text-white shadow-glow dark:bg-cyan-500 dark:text-dark-bg'
                : 'border border-slate-200/90 bg-white/70 text-slate-700 hover:border-accent/40 dark:border-white/15 dark:bg-dark-card/70 dark:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.title}
              layout
              variants={fadeUp}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white/80 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-dark-card/75"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur dark:bg-dark-card/90 dark:text-white">
                  {project.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <RippleButton
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 bg-accent px-4 py-2.5 text-sm font-semibold text-white dark:bg-cyan-500 dark:text-dark-bg"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </RippleButton>
                  <RippleButton
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 dark:border-white/15 dark:bg-transparent dark:text-white"
                  >
                    <Github className="h-4 w-4" />
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
