import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { trilemmaNodes, trilemmaQuestion } from '@/data/researchData';
import { AlertTriangle, Cpu, Globe, Leaf } from 'lucide-react';
import type { ReactNode } from 'react';

const nodeIcons: ReactNode[] = [
  <Cpu className="w-6 h-6" key="cpu" />,
  <Leaf className="w-6 h-6" key="leaf" />,
  <Globe className="w-6 h-6" key="globe" />,
];

const nodeColors = ['#6366f1', '#f59e0b', '#10b981'];

export function TrilemmaSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <SectionHeader
        badge="The 2026 Challenge"
        title="The Infrastructure Trilemma"
        subtitle="Three forces colliding: infinite demand, finite resources, and fractured regulation"
      />

      <div className="relative max-w-xl mx-auto mb-12" style={{ minHeight: 350 }}>
        <svg viewBox="0 0 400 350" className="w-full h-auto" fill="none">
          <motion.path
            d="M200 40 L60 300 L340 300 Z"
            stroke="url(#triGrad)"
            strokeWidth="2"
            strokeDasharray="8 4"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>

        {trilemmaNodes.map((node, i) => {
          const positions = [
            'top-0 left-1/2 -translate-x-1/2',
            'bottom-0 left-0 sm:left-4',
            'bottom-0 right-0 sm:right-4',
          ];
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
              className={`absolute ${positions[i]} w-40 sm:w-48`}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg mb-2"
                  style={{ backgroundColor: nodeColors[i] }}
                >
                  {nodeIcons[i]}
                </div>
                <div className="text-sm font-semibold text-gray-900">{node.label}</div>
                <div className="text-xs text-gray-500 mt-1 leading-snug hidden sm:block">{node.sublabel}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <GlassCard className="max-w-3xl mx-auto p-6 md:p-8 border-l-4 border-l-amber-400" hover={false}>
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Critical Question</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{trilemmaQuestion}</p>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
