import React, { useState, useMemo } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  Download
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GLOBAL_PROJECTS_REGISTRY } from '../../data/projectsRegistry';
import { COUNTRY_REGISTRY } from '../../data/countryRegistry';

interface ProjectRegistrySectionProps {
  selectedRegion: string;
  searchQuery: string;
  onSelectCountry?: (id: string) => void;
}

// Maps a project's free-text country name to the registry's ISO id, so
// clicking a project's country stays in sync with the Map / Country Explorer.
const COUNTRY_NAME_TO_ID: Record<string, string> = COUNTRY_REGISTRY.reduce(
  (acc, c) => ({ ...acc, [c.name]: c.id }),
  {} as Record<string, string>
);

export const ProjectRegistrySection: React.FC<ProjectRegistrySectionProps> = ({
  selectedRegion,
  searchQuery: externalSearchQuery,
  onSelectCountry
}) => {
  const [internalQuery, setInternalQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const query = externalSearchQuery || internalQuery;

  const filteredProjects = useMemo(() => {
    return GLOBAL_PROJECTS_REGISTRY.filter((p) => {
      const regionMatch = selectedRegion !== 'All Regions' ? p.region === selectedRegion : true;
      const categoryMatch = categoryFilter !== 'All' ? p.category === categoryFilter : true;
      const statusMatch = statusFilter !== 'All' ? p.status === statusFilter : true;

      const q = query.toLowerCase().trim();
      const queryMatch = 
        !q ||
        p.projectName.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.organizations.some((o) => o.toLowerCase().includes(q));

      return regionMatch && categoryMatch && statusMatch && queryMatch;
    });
  }, [selectedRegion, categoryFilter, statusFilter, query]);

  const handleExportCSV = () => {
    const headers = [
      'Region', 'Country', 'Location', 'Project', 'Organizations', 'Category', 
      'Announced', 'Status', 'Completion', 'Investment', 'Capacity', 'Jobs', 
      'Energy & Cooling', 'Confidence'
    ];
    const rows = filteredProjects.map((p) => [
      `"${p.region}"`, `"${p.country}"`, `"${p.location}"`, `"${p.projectName}"`, 
      `"${p.organizations.join(', ')}"`, `"${p.category}"`, `"${p.announcedDate}"`, 
      `"${p.status}"`, `"${p.expectedCompletion}"`, `"${p.investmentValue}"`, 
      `"${p.capacity}"`, `"${p.jobsEstimate}"`, `"${p.energyAndCooling}"`, `"${p.confidence}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Global_AI_Cloud_Infrastructure_Registry_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
              <Database className="w-6 h-6" />
            </div>
            <span>Global Country & Project Registry (17 Columns)</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Structured database mapping project status, MW/GW capacity, SMR power, CapEx value, cooling tech, and confidence levels
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Registry CSV</span>
        </button>
      </div>

      {/* Filter Controls */}
      <GlassCard className="p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400" />
          <input
            type="text"
            placeholder="Search projects by name, company, location..."
            value={internalQuery}
            onChange={(e) => setInternalQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300/80 dark:border-slate-700/80 rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by project category"
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="AI Supercomputer">AI Supercomputer</option>
            <option value="Sovereign AI Cluster">Sovereign AI Cluster</option>
            <option value="Cloud Region">Cloud Region</option>
            <option value="Semiconductor Fab">Semiconductor Fab</option>
            <option value="SMR Nuclear">SMR Nuclear</option>
            <option value="Colocation DC">Colocation DC</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by project status"
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Operational">Operational</option>
            <option value="Under Construction">Under Construction</option>
            <option value="Announced">Announced</option>
            <option value="Delayed">Delayed</option>
          </select>
        </div>
      </GlassCard>

      {/* Structured Table */}
      <GlassCard className="p-0 overflow-hidden border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                <th className="py-3 px-4">Region / Country</th>
                <th className="py-3 px-4">Project & Location</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">CapEx ($)</th>
                <th className="py-3 px-4">Capacity</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 text-slate-800 dark:text-slate-200">
              {filteredProjects.map((p) => {
                const isExpanded = expandedProjectId === p.id;
                return (
                  <React.Fragment key={p.id}>
                    <tr className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-3.5 px-4 font-medium">
                        {COUNTRY_NAME_TO_ID[p.country] ? (
                          <button
                            type="button"
                            onClick={() => onSelectCountry?.(COUNTRY_NAME_TO_ID[p.country])}
                            className="text-slate-900 dark:text-white font-bold block hover:text-cyan-400 transition-colors cursor-pointer text-left"
                          >
                            {p.country}
                          </button>
                        ) : (
                          <span className="text-slate-900 dark:text-white font-bold block">{p.country}</span>
                        )}
                        <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono">{p.region}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-cyan-300 block">{p.projectName}</span>
                        <span className="text-[10px] text-slate-600 dark:text-slate-400 block line-clamp-1">{p.location}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-500 font-mono block mt-0.5">
                          Orgs: {p.organizations.join(', ')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-cyan-400 border border-slate-200 dark:border-slate-800">
                          {p.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                          p.status === 'Operational' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                          p.status === 'Under Construction' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' :
                          'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}>
                          {p.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        {p.investmentValue}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-cyan-300">
                        {p.capacity}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          p.confidence === 'High' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {p.confidence}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setExpandedProjectId(isExpanded ? null : p.id)}
                          className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] transition-all cursor-pointer"
                        >
                          {isExpanded ? 'Hide' : '17-Cols'}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded 17-Column Details */}
                    {isExpanded && (
                      <tr className="bg-slate-50/80 dark:bg-slate-950/80">
                        <td colSpan={8} className="p-4 space-y-3 text-xs">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                            <div>
                              <span className="text-slate-600 dark:text-slate-400 font-mono block">Energy & Cooling Approach:</span>
                              <span className="text-slate-800 dark:text-slate-200">{p.energyAndCooling}</span>
                            </div>

                            <div>
                              <span className="text-slate-600 dark:text-slate-400 font-mono block">Jobs Estimate:</span>
                              <span className="text-slate-800 dark:text-slate-200">{p.jobsEstimate}</span>
                            </div>

                            <div>
                              <span className="text-slate-600 dark:text-slate-400 font-mono block">Timeline:</span>
                              <span className="text-slate-800 dark:text-slate-200">Announced: {p.announcedDate} | Expected: {p.expectedCompletion}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                              <span className="font-bold text-emerald-400 block mb-1">Key Evidence-Supported Benefits:</span>
                              <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300">
                                {p.keyBenefits.map((b, i) => (
                                  <li key={i}>{b}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                              <span className="font-bold text-amber-400 block mb-1">Material Risks & Grid Bottlenecks:</span>
                              <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300">
                                {p.keyRisks.map((r, i) => (
                                  <li key={i}>{r}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
