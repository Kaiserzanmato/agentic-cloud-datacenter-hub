import React from 'react';
import { 
  Globe, 
  Cpu, 
  Search, 
  Database, 
  Zap, 
  History, 
  Download, 
  Sparkles, 
  Layers,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedRegion,
  setSelectedRegion,
  searchQuery,
  setSearchQuery
}) => {
  const regions = [
    'All Regions',
    'North America',
    'Southeast Asia',
    'East Asia',
    'Europe',
    'Middle East',
    'South Asia',
    'Latin America',
    'Africa',
    'Oceania'
  ];

  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: Layers },
    { id: 'research', label: 'AI Deep Research', icon: Sparkles },
    { id: 'countries', label: 'Country Explorer', icon: Globe },
    { id: 'projects', label: 'Project Registry', icon: Database },
    { id: 'tech', label: 'Power & Hardware', icon: Zap },
    { id: 'audit', label: 'Report Audit Log', icon: History },
    { id: 'export', label: 'Export Suite', icon: Download },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 text-slate-100 shadow-2xl">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/30">
            <Cpu className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-cyan-400">
                AETHEL GLOBAL
              </span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 tracking-wider">
                2026 Horizon
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              AI, Cloud, Data Center & Digital Infrastructure Intelligence
            </p>
          </div>
        </div>

        {/* Global Controls: Search & Region Filter */}
        <div className="flex items-center space-x-3 flex-1 max-w-md">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search 249 countries, projects, GPUs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-900/90 border border-slate-700/60 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
            />
          </div>

          {/* Region Dropdown */}
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              aria-label="Filter by region"
              className="appearance-none bg-slate-900/90 border border-slate-700/60 rounded-xl px-3 py-1.5 pr-8 text-xs text-cyan-300 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer"
            >
              {regions.map((reg) => (
                <option key={reg} value={reg} className="bg-slate-900 text-slate-200">
                  {reg}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/40">
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/40 shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
