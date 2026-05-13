import { motion } from 'framer-motion';
import {
  Box,
  Brush,
  Code2,
  Film,
  Globe,
  Keyboard,
  Layers,
  Layout,
  Palette,
  Shield,
  Terminal,
} from 'lucide-react';
import Section from '../components/Section';
import { fadeUp, staggerContainerSlow } from '../animations/variants';

const skillItems = [
  { name: 'React', icon: Code2, tag: 'Frontend' },
  { name: 'JavaScript', icon: Terminal, tag: 'Language' },
  { name: 'Tailwind CSS', icon: Palette, tag: 'Styling' },
  { name: 'WordPress', icon: Layers, tag: 'CMS' },
  { name: 'UI / UX', icon: Layout, tag: 'Design' },
  { name: 'Photoshop', icon: Brush, tag: 'Creative' },
  { name: 'Premiere Pro', icon: Film, tag: 'Motion' },
  { name: 'Python', icon: Box, tag: 'Scripting' },
  { name: 'Typewriting', icon: Keyboard, tag: 'Productivity' },
  { name: 'Cybersecurity Basics', icon: Shield, tag: 'Security' },
  { name: 'Kali Linux Tools', icon: Globe, tag: 'Security' },
];

export default function Skills() {
  return (
    <Section id="skills" subtitle="Skills" title="Tools & technologies">
      <motion.ul
        variants={staggerContainerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8% 0px', amount: 0.1 }}
        className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5"
      >
        {skillItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.li
              key={item.name}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -10, transition: { type: 'spring', stiffness: 380, damping: 22 } }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/70 p-5 shadow-md backdrop-blur-md transition-shadow hover:shadow-glow dark:border-white/10 dark:bg-dark-card/75 dark:hover:shadow-glow sm:p-6"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/15 blur-2xl transition-opacity group-hover:opacity-100 dark:bg-cyan-500/20" />
              <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent dark:bg-cyan-400/15 dark:text-cyan-300">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {item.tag}
              </p>
              <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{item.name}</h3>
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
}
