import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { regions, insights } from '@/data/researchData';
import { useRegionFilter } from '@/hooks/useRegionFilter';
import { MapPin, Lightbulb, ChevronRight } from 'lucide-react';
import type { RegionId } from '@/hooks/useRegionFilter';

const priorityVariant = {
  critical: 'critical' as const,
  high: 'high' as const,
  medium: 'medium' as const,
};

export function RegulatorySection() {
  const { activeRegion, setActiveRegion } = useRegionFilter();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <SectionHeader
        badge="Global Regulatory Landscape"
        title="Regulation & Strategic Insights"
        subtitle="Navigating a fragmented global AI governance landscape"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-500" />
            Regulatory Regions
          </h3>
          <div className="space-y-3">
            {regions.map((region, i) => (
              <motion.button
                key={region.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setActiveRegion(region.id as RegionId)}
                className={`w-full text-left rounded-2xl p-4 backdrop-blur-xl border shadow-sm transition-all duration-300 cursor-pointer hover:shadow-md ${
                  activeRegion === region.id
                    ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20'
                    : 'bg-white/70 border-white/40 hover:bg-white/90'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{region.flag}</span>
                    <span className="text-sm font-semibold text-gray-900">{region.name}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                    {region.stance}
                  </span>
                </div>
                <div className="text-xs text-indigo-600 font-medium mb-1">{region.approach}</div>
                <div className="text-xs text-gray-500 mb-2">{region.policy}</div>
                <div className="text-[10px] text-gray-400">Timeline: {region.timeline}</div>

                {activeRegion === region.id && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-indigo-100 space-y-1.5"
                  >
                    {region.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                        <ChevronRight className="w-3 h-3 text-indigo-400 mt-0.5 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Actionable Insights
          </h3>
          <div className="space-y-3">
            {insights.map((insight, i) => (
              <GlassCard key={insight.category} delay={i * 0.06} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-gray-900 uppercase tracking-wide">{insight.category}</span>
                  <Badge variant={priorityVariant[insight.priority]}>{insight.priority}</Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2 leading-relaxed">{insight.recommendation}</p>
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-indigo-50/50 border border-indigo-100">
                  <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider shrink-0 mt-0.5">Action</span>
                  <span className="text-xs text-indigo-700">{insight.action}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
