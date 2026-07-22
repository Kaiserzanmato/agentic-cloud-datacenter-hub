import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  Search, 
  Filter, 
  SlidersHorizontal,
  CheckSquare,
  Square
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { COUNTRY_REGISTRY, type CountryRegistryItem } from '../../data/countryRegistry';
import { CountryModal } from '../ui/CountryModal';

interface CountryExplorerProps {
  selectedRegion: string;
  searchQuery: string;
  selectedCountryId?: string | null;
  onSelectCountry?: (id: string) => void;
}

export const CountryExplorer: React.FC<CountryExplorerProps> = ({
  selectedRegion,
  searchQuery: externalSearchQuery,
  selectedCountryId,
  onSelectCountry
}) => {
  const [internalQuery, setInternalQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState<CountryRegistryItem | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareMode, setIsCompareMode] = useState(false);

  const query = externalSearchQuery || internalQuery;

  // Filter countries
  const filteredCountries = useMemo(() => {
    return COUNTRY_REGISTRY.filter((item) => {
      // Region match
      const regionMatch = 
        selectedRegion !== 'All Regions' ? item.region === selectedRegion :
        regionFilter !== 'All' ? item.region === regionFilter : true;

      // Status match
      const statusMatch = statusFilter !== 'All' ? item.sovereignAiStatus === statusFilter : true;

      // Search query match
      const q = query.toLowerCase().trim();
      const queryMatch = 
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.alpha2.toLowerCase().includes(q) ||
        item.alpha3.toLowerCase().includes(q) ||
        (item.officialName && item.officialName.toLowerCase().includes(q)) ||
        (item.aliases && item.aliases.some((a) => a.toLowerCase().includes(q)));

      return regionMatch && statusMatch && queryMatch;
    });
  }, [selectedRegion, regionFilter, statusFilter, query]);

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompareList((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const comparedCountries = useMemo(() => {
    return COUNTRY_REGISTRY.filter((c) => compareList.includes(c.id));
  }, [compareList]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
              <Globe className="w-6 h-6" />
            </div>
            <span>Global 249 Country & Territory Explorer</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            ISO 3166-1 mapped country registry with sovereign AI posture, data center MW capacity, and power grid stability scores
          </p>
        </div>

        {compareList.length > 0 && (
          <button
            onClick={() => setIsCompareMode(!isCompareMode)}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500 text-cyan-300 text-xs font-bold transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{isCompareMode ? 'Exit Comparison' : `Compare Selected (${compareList.length}/4)`}</span>
          </button>
        )}
      </div>

      {/* Comparison Matrix view */}
      {isCompareMode && comparedCountries.length > 0 && (
        <GlassCard className="p-6 space-y-4 border-cyan-500/50">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider font-mono">
            Side-by-Side Infrastructure Comparison
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {comparedCountries.map((c) => (
              <div key={c.id} className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white text-base">{c.name}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">
                    {c.alpha3}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  <p>Region: <span className="text-slate-900 dark:text-slate-100">{c.region}</span></p>
                  <p>DC Capacity: <span className="text-cyan-400 font-bold">{c.dataCenterCapacityMW} MW</span></p>
                  <p>Grid Score: <span className="text-emerald-400 font-bold">{c.gridReadinessScore}/100</span></p>
                  <p>Sovereign AI: <span className="text-blue-300">{c.sovereignAiStatus}</span></p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Filter Controls Bar */}
      <GlassCard className="p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400" />
          <input
            type="text"
            placeholder="Search by country name, ISO code (US, PHL, DEU)..."
            value={internalQuery}
            onChange={(e) => setInternalQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300/80 dark:border-slate-700/80 rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Region Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            aria-label="Filter by region category"
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
          >
            <option value="All">All Regions</option>
            <option value="North America">North America</option>
            <option value="Southeast Asia">Southeast Asia</option>
            <option value="East Asia">East Asia</option>
            <option value="Europe">Europe</option>
            <option value="Middle East">Middle East</option>
            <option value="South Asia">South Asia</option>
            <option value="Latin America">Latin America</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        {/* Sovereign AI Stance Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by sovereign AI posture"
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
          >
            <option value="All">All Sovereign Stances</option>
            <option value="Active Strategy">Active Strategy</option>
            <option value="Developing Policy">Developing Policy</option>
            <option value="Emerging Hub">Emerging Hub</option>
            <option value="Constrained">Constrained</option>
          </select>
        </div>
      </GlassCard>

      {/* Country Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCountries.map((c) => {
          const isComparing = compareList.includes(c.id);
          const isFocused = selectedCountryId === c.id;
          return (
            <GlassCard
              key={c.id}
              onClick={() => {
                setSelectedCountry(c);
                onSelectCountry?.(c.id);
              }}
              className={`p-5 hover:border-cyan-500/60 transition-all cursor-pointer space-y-4 group relative ${
                isFocused ? 'ring-2 ring-cyan-500/70 border-cyan-500/60' : ''
              }`}
            >
              {/* Compare toggle button */}
              <button
                onClick={(e) => toggleCompare(c.id, e)}
                className="absolute top-4 right-4 text-slate-500 dark:text-slate-500 hover:text-cyan-400 cursor-pointer"
                title="Select to compare"
              >
                {isComparing ? (
                  <CheckSquare className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-mono font-bold text-cyan-400 text-sm border border-slate-300 dark:border-slate-700 group-hover:border-cyan-500">
                  {c.alpha2}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-cyan-300 transition-colors">
                    {c.name}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 block">{c.region}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                <div>
                  <span className="text-slate-500 dark:text-slate-500 block">DC Capacity</span>
                  <span className="text-slate-900 dark:text-white font-bold">{c.dataCenterCapacityMW} MW</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-500 block">Grid Readiness</span>
                  <span className="text-emerald-400 font-bold">{c.gridReadinessScore}/100</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {c.sovereignAiStatus}
                </span>
                <span className="text-slate-600 dark:text-slate-400">{c.activeProjectsCount} Hubs</span>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Country Detail Modal */}
      <CountryModal
        country={selectedCountry}
        onClose={() => setSelectedCountry(null)}
      />
    </div>
  );
};
