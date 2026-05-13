import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../animations/variants';

export default function Section({ id, title, subtitle, children, className = '' }) {
  return (
    <section id={id} className={`section-anchor px-4 py-24 sm:px-6 lg:px-8 ${className}`}>
      <motion.div
        className="mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {(title || subtitle) && (
          <motion.div variants={fadeUp} className="mb-12 text-center">
            {subtitle && (
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent dark:text-cyan-400">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-accent via-cyan-400 to-violet-500 opacity-90" />
          </motion.div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
