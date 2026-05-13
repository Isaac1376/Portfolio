import { motion } from 'framer-motion';
import { useScrollProgress } from '../hooks/useScrollProgress';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[60] h-1 bg-slate-200/30 dark:bg-white/5"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-accent via-cyan-400 to-violet-500 shadow-glow-sm"
        style={{ width: `${progress}%` }}
        layout
      />
    </div>
  );
}
