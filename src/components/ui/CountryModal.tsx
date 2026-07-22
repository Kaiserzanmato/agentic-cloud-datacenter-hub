import React from 'react';
import { X, Zap, ShieldCheck } from 'lucide-react';
import type { CountryRegistryItem } from '../../data/countryRegistry';

interface CountryModalProps {
  country: CountryRegistryItem | null;
  onClose: () => void;
}

export const CountryModal: React.FC<CountryModalProps> = ({ country, onClose }) => {
  if (!country) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-slate-100 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-6 text-slate-900 dark:text-slate-100 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-4 pr-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-mono font-extrabold text-xl shadow-lg shadow-cyan-500/20">
            {country.alpha2}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                ISO: {country.alpha3} ({country.numeric})
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">{country.region}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">{country.name}</h2>
            {country.officialName && (
              <p className="text-xs text-slate-600 dark:text-slate-400 font-light">{country.officialName}</p>
            )}
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-600 dark:text-slate-400 block">Sovereign AI Stance</span>
            <span className="text-xs font-bold text-cyan-400 block mt-1">{country.sovereignAiStatus}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-600 dark:text-slate-400 block">Data Center Capacity</span>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-1">{country.dataCenterCapacityMW} MW</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-600 dark:text-slate-400 block">Grid Readiness</span>
            <span className="text-sm font-extrabold text-emerald-400 block mt-1">{country.gridReadinessScore}/100</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-600 dark:text-slate-400 block">Active Projects</span>
            <span className="text-sm font-extrabold text-blue-400 block mt-1">{country.activeProjectsCount} Major Hubs</span>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 pb-2">
            Infrastructure & Policy Profile
          </h3>

          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Power Grid Stability & Renewable PPAs</span>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                  Grid stability score of {country.gridReadinessScore}/100 indicates {country.gridReadinessScore > 85 ? 'high readiness for 100MW+ AI hyper-clusters.' : country.gridReadinessScore > 70 ? 'moderate readiness requiring dedicated micro-grid solar/gas hybrids.' : 'significant power grid bottlenecks requiring utility upgrades.'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Sovereign Data Governance & Regulatory Policy</span>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                  Status: <strong className="text-cyan-300">{country.sovereignAiStatus}</strong>. ISO 3166-1 standard compliance guarantees alignment with local banking, health, and national security data sovereignty laws.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium transition-all cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
