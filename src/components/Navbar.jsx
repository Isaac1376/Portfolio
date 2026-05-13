import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fadeUp, staggerContainer } from '../animations/variants';
import { useActiveSection } from '../hooks/useActiveSection';
import ThemeToggle from './ThemeToggle';

const links = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const activeId = useActiveSection(links.map((l) => l.id));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 lg:px-8"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-2xl border border-white/20 bg-white/70 px-3 py-2.5 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-dark-card/55 sm:px-4 sm:py-3"
          aria-label="Primary"
        >
          <button
            type="button"
            onClick={() => scrollTo('hero')}
            className="min-h-11 min-w-0 touch-manipulation rounded-lg px-1 text-left font-display text-base font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg"
          >
            Dhivagar
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active = activeId === link.id;
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    aria-current={active ? 'true' : undefined}
                    className={`relative min-h-10 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? 'text-accent dark:text-cyan-300'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-lg bg-accent/10 dark:bg-cyan-400/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 md:hidden dark:border-white/15 dark:bg-dark-card/80"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-x-0 top-[calc(4.25rem+env(safe-area-inset-top))] z-40 max-h-[min(70vh,calc(100dvh-5.5rem))] overflow-y-auto px-3 pb-[env(safe-area-inset-bottom)] md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/20 bg-white/95 p-3 shadow-glass-lg backdrop-blur-xl dark:border-white/10 dark:bg-dark-card/95"
            >
              <ul className="flex flex-col gap-1">
                {links.map((link) => {
                  const active = activeId === link.id;
                  return (
                    <motion.li key={link.id} variants={fadeUp}>
                      <button
                        type="button"
                        onClick={() => scrollTo(link.id)}
                        aria-current={active ? 'page' : undefined}
                        className={`min-h-12 w-full touch-manipulation rounded-xl px-4 py-3 text-left text-base font-medium ${
                          active
                            ? 'bg-accent/10 text-accent dark:bg-cyan-400/10 dark:text-cyan-300'
                            : 'text-slate-700 active:bg-slate-100 dark:text-slate-200 dark:active:bg-white/5'
                        }`}
                      >
                        {link.label}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
