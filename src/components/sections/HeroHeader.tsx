import { motion } from 'framer-motion';
import { ChevronDown, X, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useRegionFilter, regionLabels } from '@/hooks/useRegionFilter';
import type { RegionId } from '@/hooks/useRegionFilter';

export function HeroHeader() {
  const { activeRegion, setActiveRegion, regionLabel } = useRegionFilter();

  const regionOptions: RegionId[] = ['all', 'us', 'eu', 'cn', 'sg', 'sa', 'ae'];

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-12 md:pt-32 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Badge variant="default" pulse>2026 Research Report</Badge>
            <Badge variant="success">Interactive Edition</Badge>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
            <span className="gradient-text">The Strategic</span>
            <br />
            <span className="text-gray-900">Horizon</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-2 leading-relaxed"
          >
            Infrastructure, Sustainability, and Regulation
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm text-gray-400 mb-10"
          >
            Philippines Cloud & Datacenter Convention — March 26, 2026, Shangri-La Makati
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="relative inline-flex items-center">
              <Filter className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
              <select
                value={activeRegion}
                onChange={(e) => setActiveRegion(e.target.value as RegionId)}
                className="appearance-none pl-9 pr-10 py-2.5 rounded-xl bg-white/80 backdrop-blur-lg border border-gray-200 text-sm font-medium text-gray-700 shadow-sm hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all cursor-pointer"
              >
                {regionOptions.map((r) => (
                  <option key={r} value={r}>{regionLabels[r]}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {activeRegion !== 'all' && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setActiveRegion('all')}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear filter
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {activeRegion !== 'all' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-600 text-white text-center py-2 text-sm font-medium"
        >
          Viewing data for <strong>{regionLabel}</strong> —{' '}
          <button onClick={() => setActiveRegion('all')} className="underline ml-1 hover:text-indigo-200 transition-colors">
            Show all regions
          </button>
        </motion.div>
      )}
    </header>
  );
}
