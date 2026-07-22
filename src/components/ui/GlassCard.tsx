import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function GlassCard({ children, className, delay = 0, hover = true, onClick }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -4 } : undefined}
      onClick={onClick}
      className={cn(
        'rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800 shadow-xl',
        'transition-colors duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
