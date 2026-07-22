import React, { useState } from 'react';
import { History, Filter, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { ATTACHED_REPORT_UPDATE_LOG } from '../../data/updateAuditLog';

export const AuditLogSection: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');

  const filteredLogs = ATTACHED_REPORT_UPDATE_LOG.filter((entry) => {
    return filterType === 'All' ? true : entry.changeType === filterType;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
              <History className="w-6 h-6" />
            </div>
            <span>Attached Report Update & Audit Log</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Section 9 verification log tracking claim updates, corrections, extensions, delays, and source audits
          </p>
        </div>

        {/* Change Type Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            aria-label="Filter by audit change type"
            className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
          >
            <option value="All">All Change Types</option>
            <option value="Updated">Updated</option>
            <option value="Corrected">Corrected</option>
            <option value="Expanded">Expanded</option>
            <option value="Delayed">Delayed</option>
          </select>
        </div>
      </div>

      {/* Audit Log Entries */}
      <div className="space-y-4">
        {filteredLogs.map((entry) => (
          <GlassCard key={entry.id} className="p-6 space-y-4 border-l-4 border-l-cyan-500">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${
                  entry.changeType === 'Updated' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' :
                  entry.changeType === 'Corrected' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                  entry.changeType === 'Expanded' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                  'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}>
                  {entry.changeType}
                </span>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400">ID: {entry.id}</span>
              </div>

              <div className="flex items-center space-x-1 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sources Audited: {entry.supportingSources.length}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Baseline Original Claim</span>
                <p className="text-slate-700 dark:text-slate-300 italic">{entry.originalClaim}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Verified Updated Finding</span>
                <p className="text-slate-900 dark:text-white font-medium">{entry.updatedFinding}</p>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-slate-600 dark:text-slate-400 font-mono block">Verification Rationale & Evidence:</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{entry.reason}</p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-400">
              <span className="text-slate-500 dark:text-slate-500">Supporting Citations:</span>
              {entry.supportingSources.map((src, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                  {src}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
