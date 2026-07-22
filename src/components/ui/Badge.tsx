import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'critical' | 'high' | 'medium' | 'success';
  className?: string;
  pulse?: boolean;
}

const variantStyles = {
  default: 'bg-indigo-50 text-indigo-700',
  critical: 'bg-red-50 text-red-700',
  high: 'bg-orange-50 text-orange-700',
  medium: 'bg-yellow-50 text-yellow-700',
  success: 'bg-emerald-50 text-emerald-700',
};

export function Badge({ children, variant = 'default', className, pulse }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        pulse && 'pulse-glow',
        className
      )}
    >
      {children}
    </span>
  );
}
