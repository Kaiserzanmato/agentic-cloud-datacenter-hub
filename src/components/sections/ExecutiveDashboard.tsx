import React from 'react';
import { 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Globe, 
  ArrowUpRight, 
  Building2, 
  Sparkles,
  ThermometerSnowflake,
  Flame
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';

interface ExecutiveDashboardProps {
  onNavigateToTab: (tab: string) => void;
  selectedRegion?: string;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  onNavigateToTab
}) => {
  // Sample Data for Hyperscale CapEx
  const capexData = [
    { year: '2022', capex: 145 },
    { year: '2023', capex: 185 },
    { year: '2024', capex: 290 },
    { year: '2025', capex: 442 },
    { year: '2026E', capex: 602 },
  ];

  // Regional Capacity MW
  const regionalCapacity = [
    { region: 'North America', capacity: 18500 },
    { region: 'East Asia', capacity: 19730 },
    { region: 'Europe', capacity: 10500 },
    { region: 'Southeast Asia', capacity: 4510 },
    { region: 'Middle East', capacity: 2770 },
    { region: 'South Asia', capacity: 1850 },
    { region: 'Latin America', capacity: 1600 },
    { region: 'Oceania', capacity: 1620 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2026 Strategic Intelligence Benchmark</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Global AI, Cloud & Data Center <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              Infrastructure Intelligence Platform
            </span>
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed font-light">
            Comprehensive on-device research suite synthesizing Big-5 hyperscaler CapEx ($602B), 249 ISO country registries, nuclear SMR power agreements, direct-to-chip liquid cooling metrics, and verified project registries.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigateToTab('research')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch AI Deep Research</span>
            </button>
            <button
              onClick={() => onNavigateToTab('projects')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-medium text-xs transition-all cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Explore 17-Column Project Registry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <GlassCard className="p-5 border-l-4 border-l-cyan-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Hyperscaler CapEx</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">$</span>
            <AnimatedNumber value={602} className="text-3xl font-extrabold text-white" />
            <span className="text-lg font-bold text-cyan-400">B</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 flex items-center">
            <span className="text-emerald-400 font-semibold mr-1.5">+36% YoY</span> across MSFT, AWS, GOOG, META
          </p>
        </GlassCard>

        <GlassCard className="p-5 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Global Data Center Power</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <AnimatedNumber value={61} className="text-3xl font-extrabold text-white" />
            <span className="text-lg font-bold text-blue-400">GW</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 flex items-center">
            <span className="text-cyan-400 font-semibold mr-1.5">60% AI Density</span> projected by 2030
          </p>
        </GlassCard>

        <GlassCard className="p-5 border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Liquid Cooling Adoption</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <ThermometerSnowflake className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <AnimatedNumber value={60} className="text-3xl font-extrabold text-white" />
            <span className="text-lg font-bold text-indigo-400">%</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            For &gt;40kW high-density AI rack deployments
          </p>
        </GlassCard>

        <GlassCard className="p-5 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Sovereign Country Registries</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <AnimatedNumber value={249} className="text-xs font-bold text-white" />
            <span className="text-xs font-bold text-emerald-400">ISO Territories</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            ISO 3166-1 mapped with risk & grid status
          </p>
        </GlassCard>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CapEx Growth Area Chart */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Hyperscaler CapEx Surge ($B)</span>
              </h3>
              <p className="text-xs text-slate-400">Annual infrastructure capital deployment (2022 - 2026E)</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
              +315% 4-Yr CAGR
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={capexData}>
                <defs>
                  <linearGradient id="capexGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} unit="B" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Area type="monotone" dataKey="capex" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#capexGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Regional Power Capacity Bar Chart */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span>Regional Data Center Capacity (MW)</span>
              </h3>
              <p className="text-xs text-slate-400">Total operational and planned MW by continent/region</p>
            </div>
            <button
              onClick={() => onNavigateToTab('countries')}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 cursor-pointer"
            >
              <span>View Countries</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalCapacity} layout="vertical">
                <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis dataKey="region" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={100} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  formatter={(val: any) => [`${val} MW`, 'Capacity']}
                />
                <Bar dataKey="capacity" radius={[0, 8, 8, 0]}>
                  {regionalCapacity.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : index === 1 ? '#06b6d4' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Strategic Nuclear & Cooling Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <GlassCard className="p-5 space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Flame className="w-4 h-4" />
            <h4 className="text-sm font-bold text-white">Nuclear & SMR Agreements</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Hyperscalers contracted 3.4 GW of nuclear power, including Constellation-Microsoft (Three Mile Island), Amazon-Talen (Susquehanna), and Google-Kairos SMRs.
          </p>
          <div className="pt-1 text-[11px] font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-md inline-block">
            Baseload PPA Target: 100% Clean
          </div>
        </GlassCard>

        <GlassCard className="p-5 space-y-3">
          <div className="flex items-center space-x-2 text-blue-400">
            <ThermometerSnowflake className="w-4 h-4" />
            <h4 className="text-sm font-bold text-white">Liquid Cooling Breakthroughs</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            NVIDIA GB200 NVL72 racks output 120kW per cabinet, making direct-to-chip cold plate liquid cooling mandatory for PUE sub-1.15 performance.
          </p>
          <div className="pt-1 text-[11px] font-mono text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-md inline-block">
            Water Reclamation: &gt;90%
          </div>
        </GlassCard>

        <GlassCard className="p-5 space-y-3">
          <div className="flex items-center space-x-2 text-indigo-400">
            <ShieldCheck className="w-4 h-4" />
            <h4 className="text-sm font-bold text-white">Sovereign AI & Export Controls</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Over 38 nations established sovereign cloud frameworks and local LLM clusters to safeguard national data while operating under US/EU chip export licenses.
          </p>
          <div className="pt-1 text-[11px] font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-md inline-block">
            ISO 3166-1 Mapped Coverage
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
