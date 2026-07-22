import { motion } from 'framer-motion';
import { TrendingUp, Zap, Building, Droplets } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { globalMetrics } from '@/data/researchData';
import type { ReactNode } from 'react';

const iconMap: Record<string, ReactNode> = {
  'trending-up': <TrendingUp className="w-5 h-5" />,
  'zap': <Zap className="w-5 h-5" />,
  'building': <Building className="w-5 h-5" />,
  'droplets': <Droplets className="w-5 h-5" />,
};

const accentColors = [
  'from-indigo-500 to-violet-500',
  'from-amber-500 to-orange-500',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
];

export function KPICards() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gray-100 text-gray-600 mb-4">
          The Big Picture
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          Key Metrics at a Glance
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {globalMetrics.map((metric, i) => (
          <GlassCard key={metric.label} delay={i * 0.1} className="relative overflow-hidden p-6">
            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${accentColors[i]}`} />

            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${accentColors[i]} text-white`}>
                {iconMap[metric.icon]}
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                {metric.change}
              </span>
            </div>

            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 tracking-tight">
              {metric.value}
            </div>
            <div className="text-sm text-gray-500 leading-snug">
              {metric.label}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
