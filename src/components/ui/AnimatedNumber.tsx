import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { useInView } from '@/hooks/useInView';

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedNumber({ value, prefix = '', suffix = '', duration = 2000, className = '' }: AnimatedNumberProps) {
  const { ref, isInView } = useInView(0.3);
  const count = useAnimatedCounter(value, duration, isInView);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
