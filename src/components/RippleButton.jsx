import { motion } from 'framer-motion';
import { useState } from 'react';

export default function RippleButton({
  children,
  className = '',
  href,
  onClick,
  type = 'button',
  disabled,
  ...rest
}) {
  const [ripples, setRipples] = useState([]);

  const handlePointer = (e) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    setRipples((r) => [...r, { id, x, y }]);
    setTimeout(() => setRipples((r) => r.filter((i) => i.id !== id)), 650);
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute rounded-full bg-white/35"
            style={{ left: r.x, top: r.y, width: 12, height: 12, marginLeft: -6, marginTop: -6 }}
            initial={{ scale: 0, opacity: 0.55 }}
            animate={{ scale: 28, opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          />
        ))}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`relative inline-flex overflow-hidden rounded-xl ${className}`}
        onPointerDown={handlePointer}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        {...rest}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={`relative inline-flex overflow-hidden rounded-xl ${className}`}
      onPointerDown={handlePointer}
      onClick={onClick}
      whileHover={disabled ? {} : { y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      {...rest}
    >
      {content}
    </motion.button>
  );
}
