import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { agenticPlatforms, chineseModels, sweBenchData } from '@/data/researchData';
import { Bot, Trophy, ChevronRight } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export function AgenticSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <SectionHeader
        badge="The Agentic Era"
        title="Agentic Platforms & Model Race"
        subtitle="From chat to autonomous multi-agent workflows spanning hours, days, or weeks"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
        {agenticPlatforms.map((platform, i) => (
          <GlassCard key={platform.name} delay={i * 0.08} className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-4 h-4 text-indigo-500" />
              <h4 className="text-sm font-semibold text-gray-900">{platform.name}</h4>
            </div>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">{platform.description}</p>
            <ul className="space-y-1.5">
              {platform.features.map((feat, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                  <ChevronRight className="w-3 h-3 text-indigo-400 mt-0.5 shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <GlassCard className="p-6" hover={false}>
          <h3 className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            SWE-bench Verified (Jan 2026)
          </h3>
          <p className="text-xs text-gray-500 mb-4">Resolution rates — higher is better</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sweBenchData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <XAxis type="number" domain={[0, 60]} tick={{ fontSize: 11, fill: '#6e6e73' }} unit="%" />
                <YAxis type="category" dataKey="model" tick={{ fontSize: 10, fill: '#6e6e73' }} width={160} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  }}
                  formatter={(value) => [`${value}%`, 'Score']}
                />
                <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={20}>
                  {sweBenchData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isLeader ? '#6366f1' : index < 2 ? '#818cf8' : '#c7d2fe'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6" hover={false}>
          <h3 className="text-base font-semibold text-gray-900 mb-1">Frontier Chinese Models</h3>
          <p className="text-xs text-gray-500 mb-4">Top 9 positions on open-model leaderboards</p>
          <div className="space-y-3">
            {chineseModels.map((model, i) => (
              <motion.div
                key={model.model}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="py-2.5 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-900">{model.model}</span>
                  <span className="text-[10px] text-gray-400">{model.developer}</span>
                </div>
                <div className="text-[10px] text-indigo-500 font-medium mb-0.5">{model.specs}</div>
                <div className="text-xs text-gray-500">{model.capability}</div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
