import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { capExData, hyperscalerCapExNote, frontierModels, hardwareRoadmap } from '@/data/researchData';
import { DollarSign, Cpu, ChevronRight, Calendar } from 'lucide-react';

export function InfrastructureSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <SectionHeader
        badge="Infrastructure & Investment"
        title="Capital Expenditure & Innovation"
        subtitle="$602B in hyperscaler CapEx meets the agentic era of AI models"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Left: CapEx */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-indigo-500" />
            Capital Expenditure Initiatives
          </h3>
          <p className="text-xs text-gray-500 mb-4">{hyperscalerCapExNote}</p>

          <div className="space-y-3">
            {capExData.map((item, i) => (
              <GlassCard key={item.initiative} delay={i * 0.08} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">{item.initiative}</h4>
                  <span className="text-sm font-bold text-indigo-600 whitespace-nowrap ml-2">{item.investment}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{item.details}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Right: Models & Hardware */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-violet-500" />
            Frontier Models (Feb 2026)
          </h3>
          <div className="space-y-3 mb-8">
            {frontierModels.map((model, i) => (
              <GlassCard key={model.name} delay={i * 0.08} className="p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm font-semibold text-gray-900">{model.name}</span>
                  <ChevronRight className="w-3 h-3 text-gray-300" />
                  <span className="text-xs text-gray-500">{model.org}</span>
                  <span className="ml-auto text-xs text-gray-400">{model.date}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{model.capability}</p>
              </GlassCard>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" />
            Hardware Roadmap
          </h3>
          <div className="space-y-3">
            {hardwareRoadmap.map((hw, i) => (
              <GlassCard key={hw.name} delay={i * 0.08} className="p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm font-semibold text-gray-900">{hw.name}</span>
                  <span className="text-xs text-gray-400">— {hw.vendor}</span>
                  <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-700 font-medium">{hw.status}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{hw.specs}</p>
                <p className="text-xs text-indigo-500 mt-1 font-medium">{hw.infra}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
