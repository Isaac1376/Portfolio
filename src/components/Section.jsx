import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, underlineGrow } from '../animations/variants';

export default function Section({ id, title, subtitle, children, className = '' }) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-heading` : undefined}
      className={`section-anchor px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 ${className}`}
    >
      <motion.div
        className="mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8% 0px -12% 0px', amount: 0.15 }}
      >
        {(title || subtitle) && (
          <motion.div variants={fadeUp} className="mb-10 text-center sm:mb-12">
            {subtitle && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm sm:tracking-[0.2em] dark:text-cyan-400">
                {subtitle}
              </p>
            )}
            {title && (
              <h2
                id={`${id}-heading`}
                className="text-balance text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl md:text-4xl lg:text-5xl"
              >
                {title}
              </h2>
            )}
            <motion.div
              variants={underlineGrow}
              className="mx-auto mt-4 h-1 w-20 origin-center rounded-full bg-gradient-to-r from-accent via-cyan-400 to-violet-500 opacity-90 sm:w-24"
            />
          </motion.div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
