import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
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

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-1 z-50 px-4 pt-3 sm:px-6 lg:px-8"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/20 bg-white/70 px-4 py-3 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-dark-card/55"
          aria-label="Primary"
        >
          <button
            type="button"
            onClick={() => scrollTo('hero')}
            className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white"
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
                    className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
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

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 md:hidden dark:border-white/15 dark:bg-dark-card/80"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 top-[5.25rem] z-40 px-4 md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/20 bg-white/95 p-4 shadow-glass-lg backdrop-blur-xl dark:border-white/10 dark:bg-dark-card/95">
              <ul className="flex flex-col gap-1">
                {links.map((link) => {
                  const active = activeId === link.id;
                  return (
                    <li key={link.id}>
                      <button
                        type="button"
                        onClick={() => scrollTo(link.id)}
                        className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium ${
                          active
                            ? 'bg-accent/10 text-accent dark:bg-cyan-400/10 dark:text-cyan-300'
                            : 'text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {link.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
