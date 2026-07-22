import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { pillarCards, criticalRisks, recommendedActions } from '@/data/researchData';
import { Server, Leaf, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { ReactNode } from 'react';

const pillarIcons: Record<string, ReactNode> = {
  server: <Server className="w-5 h-5" />,
  leaf: <Leaf className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
};

export function ExecutiveSummary() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <SectionHeader
        badge="Executive Summary"
        title="Strategic Recommendations"
        subtitle="Key pillars, critical risks, and recommended actions for Q1 2026"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
        {pillarCards.map((pillar, i) => (
          <GlassCard key={pillar.title} delay={i * 0.1} className="p-6 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5"
              style={{ backgroundColor: pillar.color, transform: 'translate(30%, -30%)' }}
            />
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4"
              style={{ backgroundColor: pillar.color }}
            >
              {pillarIcons[pillar.icon]}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{pillar.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{pillar.description}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <GlassCard className="p-6 border-l-4 border-l-red-400" hover={false}>
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            Critical Risk Assessment
          </h3>
          <div className="space-y-3">
            {criticalRisks.map((risk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed">{risk}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-l-4 border-l-emerald-400" hover={false}>
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Recommended Actions for Q1 2026
          </h3>
          <div className="space-y-3">
            {recommendedActions.map((action, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed">{action}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
