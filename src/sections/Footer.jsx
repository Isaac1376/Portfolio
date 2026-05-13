import { motion } from 'framer-motion';
import { Github, Heart, Linkedin, Sparkles } from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { fadeUp, staggerContainerSlow } from '../animations/variants';
import { getWhatsAppChatUrl } from '../constants/profile';

function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const whatsappHref = getWhatsAppChatUrl();

const links = [
  { href: 'https://github.com/Isaac1376', label: 'GitHub', icon: Github },
  { href: whatsappHref, label: 'WhatsApp', icon: WhatsAppIcon },
  { href: 'https://www.linkedin.com/in/dhivagar1376/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://x.com/Dhivagar1376', label: 'X', icon: XIcon },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-slate-200/80 bg-white/50 px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] backdrop-blur-md dark:border-white/10 dark:bg-dark-bg/80 sm:px-6 sm:py-12 lg:px-8"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-display text-lg font-bold text-slate-900 dark:text-white">Dhivagar M</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Web Developer & Creative Designer</p>
        </motion.div>

        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {links.map(({ href, label, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              variants={fadeUp}
              whileHover={{ y: -5, rotate: -3, transition: { type: 'spring', stiffness: 400, damping: 18 } }}
              whileTap={{ scale: 0.94 }}
              className="flex h-12 w-12 touch-manipulation items-center justify-center rounded-xl border border-slate-200/90 bg-white/90 text-slate-700 shadow-md transition-colors hover:border-accent/40 hover:text-accent dark:border-white/15 dark:bg-dark-card/80 dark:text-slate-200 dark:hover:text-cyan-300"
            >
              <Icon className="h-5 w-5" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-2 text-center text-sm text-slate-500 dark:text-slate-400 md:items-end"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-1">
            Built with <Sparkles className="h-4 w-4 text-accent dark:text-cyan-300" aria-hidden /> React + Tailwind
          </span>
          <span className="inline-flex items-center gap-1 text-xs">
            Crafted with <Heart className="h-3.5 w-3.5 text-rose-500" aria-hidden /> by Dhivagar
          </span>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Dhivagar M. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
