import React from 'react';
import { Zap, Flame, Cpu } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export const PowerCoolingSection: React.FC = () => {
  const gpuSpecs = [
    { name: 'NVIDIA GB200 NVL72', architecture: 'Blackwell', powerPerRack: '120 kW', coolingRequired: 'Direct-to-Chip Liquid', memory: '13.5 TB HBM3e', fp4Flops: '1.4 ExaFLOPS' },
    { name: 'NVIDIA B200 HGX', architecture: 'Blackwell', powerPerRack: '40 kW', coolingRequired: 'Hybrid Liquid / Air', memory: '192 GB HBM3e', fp4Flops: '18 PFLOPS' },
    { name: 'NVIDIA H100 SXM', architecture: 'Hopper', powerPerRack: '10.2 kW', coolingRequired: 'Air Cooling', memory: '80 GB HBM3', fp8Flops: '4 PFLOPS' },
    { name: 'AMD Instinct MI300X', architecture: 'CDNA 3', powerPerRack: '12 kW', coolingRequired: 'Liquid Cold Plate', memory: '192 GB HBM3', fp8Flops: '5.3 PFLOPS' },
    { name: 'Google TPU v6e (Trillium)', architecture: 'Custom TPU', powerPerRack: '35 kW', coolingRequired: 'Direct Liquid Cooling', memory: '32 GB HBM3', int8Flops: '922 TFLOPS' },
  ];

  const nuclearDeals = [
    { company: 'Microsoft', provider: 'Constellation Energy', plant: 'Three Mile Island Unit 1, PA', capacity: '835 MW', status: 'Under Contract (2028-2048)' },
    { company: 'Amazon Web Services', provider: 'Talen Energy', plant: 'Susquehanna Nuclear Campus, PA', capacity: '960 MW', status: 'Operational & Expanding' },
    { company: 'Google', provider: 'Kairos Power', plant: 'Commercial SMR Fleet (7 Reactors)', capacity: '500 MW', status: 'Target First SMR 2030' },
    { company: 'Oracle', provider: 'SMR Utility Partner', plant: 'Tri-SMR AI Data Center Campus', capacity: '1,000 MW', status: 'Site Selection Phase' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-2xl font-extrabold text-white flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <span>Power Grid, Nuclear SMR & Cooling Benchmark</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Nuclear PPA agreements, direct-to-chip liquid cooling thresholds, and GPU rack thermal metrics
        </p>
      </div>

      {/* SMR & Nuclear Deals */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider font-mono flex items-center space-x-2">
          <Flame className="w-4 h-4 text-cyan-400" />
          <span>Nuclear & Small Modular Reactor (SMR) Power Purchase Agreements</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nuclearDeals.map((deal, idx) => (
            <GlassCard key={idx} className="p-5 space-y-3 border-l-4 border-l-cyan-500">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-white text-base">{deal.company}</span>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                  {deal.capacity}
                </span>
              </div>
              <div className="space-y-1 text-xs text-slate-300">
                <p>Provider: <strong className="text-slate-100">{deal.provider}</strong></p>
                <p>Facility: <span className="text-slate-400">{deal.plant}</span></p>
                <p className="text-emerald-400 font-mono text-[11px] pt-1">Status: {deal.status}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* GPU Rack Specs & Cooling Table */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider font-mono flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>AI Accelerator Hardware & Rack Thermal Dissipation Specs</span>
        </h3>

        <GlassCard className="p-0 overflow-hidden border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-3 px-4">Accelerator Model</th>
                  <th className="py-3 px-4">Architecture</th>
                  <th className="py-3 px-4">Power Per Rack</th>
                  <th className="py-3 px-4">Cooling Requirement</th>
                  <th className="py-3 px-4">HBM Memory</th>
                  <th className="py-3 px-4">Peak Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {gpuSpecs.map((gpu, i) => (
                  <tr key={i} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">{gpu.name}</td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono">{gpu.architecture}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{gpu.powerPerRack}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[11px]">
                        {gpu.coolingRequired}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">{gpu.memory}</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">{gpu.fp4Flops || gpu.fp8Flops || gpu.int8Flops}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
