import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { waterMetrics, nuclearDeals, coolingKeyPoints } from '@/data/researchData';
import { Zap, Droplets, Atom, Wind } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';

const chartData = [
  { year: '2025', Headwinds: 500, 'High Efficiency': 500, 'Base Case': 500, 'Lift-Off': 500 },
  { year: '2030', Headwinds: 700, 'High Efficiency': 750, 'Base Case': 1000, 'Lift-Off': 1300 },
  { year: '2035', Headwinds: 700, 'High Efficiency': 1000, 'Base Case': 1250, 'Lift-Off': 1750 },
];

const lineColors = ['#94a3b8', '#6366f1', '#f59e0b', '#ef4444'];
const scenarios = ['Headwinds', 'High Efficiency', 'Base Case', 'Lift-Off'] as const;

export function SustainabilitySection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <SectionHeader
        badge="Sustainability & Energy"
        title="The Energy & Water Crisis"
        subtitle="Physical reality collides with environmental limits on multiple fronts"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <GlassCard className="p-6" hover={false}>
          <h3 className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Global Data Center Electricity (IEA Scenarios)
          </h3>
          <p className="text-xs text-gray-500 mb-4">Source: IEA "Energy and AI" Report, April 2025</p>

          <div className="h-72 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6e6e73' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6e6e73' }} unit=" TWh" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <ReferenceLine
                  y={1000}
                  stroke="#ef4444"
                  strokeDasharray="6 3"
                  label={{ value: '1,000 TWh threshold', position: 'right', fontSize: 10, fill: '#ef4444' }}
                />
                {scenarios.map((s, i) => (
                  <Line
                    key={s}
                    type="monotone"
                    dataKey={s}
                    stroke={lineColors[i]}
                    strokeWidth={s === 'Base Case' ? 3 : 2}
                    dot={{ r: 4, fill: lineColors[i] }}
                    activeDot={{ r: 6 }}
                    strokeDasharray={s === 'Headwinds' ? '6 3' : undefined}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-6" hover={false}>
            <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              Water Consumption Crisis
            </h3>
            <div className="space-y-2.5">
              {waterMetrics.map((wm, i) => (
                <motion.div
                  key={wm.metric}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start justify-between gap-3 py-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <div className="text-xs text-gray-500">{wm.metric}</div>
                    <div className="text-sm font-semibold text-gray-900">{wm.figure}</div>
                  </div>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap mt-0.5">{wm.source}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6" hover={false}>
            <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Atom className="w-4 h-4 text-emerald-500" />
              Nuclear Power Deals (10 GW+)
            </h3>
            <div className="space-y-2.5">
              {nuclearDeals.map((nd, i) => (
                <motion.div
                  key={nd.company}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-sm font-semibold text-gray-900 w-20 shrink-0">{nd.company}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 truncate">{nd.deal}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-semibold text-indigo-600">{nd.capacity}</div>
                    <div className="text-[10px] text-gray-400">{nd.timeline}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8"
      >
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Wind className="w-4 h-4 text-cyan-500" />
          Cooling Technology Shift
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-3">
          {coolingKeyPoints.map((point, i) => (
            <div
              key={i}
              className="shrink-0 px-4 py-3 rounded-xl bg-white/70 backdrop-blur-lg border border-white/40 shadow-sm text-xs text-gray-600 max-w-xs leading-relaxed"
            >
              {point}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
