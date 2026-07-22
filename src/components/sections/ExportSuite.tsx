import React, { useState } from 'react';
import { Download, Code, Check, Copy, Database } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { COUNTRY_REGISTRY } from '../../data/countryRegistry';
import { GLOBAL_PROJECTS_REGISTRY } from '../../data/projectsRegistry';
import { DEEP_RESEARCH_PROMPT_TEMPLATE } from '../../data/deepResearchPrompt';

export const ExportSuite: React.FC = () => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleDownloadJSON = () => {
    const data = {
      meta: {
        title: 'Global AI, Cloud, Data Center & Digital Infrastructure Platform Dataset',
        cutoffDate: '2026-07-22',
        totalCountries: COUNTRY_REGISTRY.length,
        totalProjects: GLOBAL_PROJECTS_REGISTRY.length,
      },
      countries: COUNTRY_REGISTRY,
      projects: GLOBAL_PROJECTS_REGISTRY,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'global_infrastructure_intelligence_2026.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(DEEP_RESEARCH_PROMPT_TEMPLATE);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
            <Download className="w-6 h-6" />
          </div>
          <span>Export & Intelligence Suite</span>
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Download structured JSON/CSV datasets, full markdown research prompts, and intelligence briefings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dataset JSON Export */}
        <GlassCard className="p-6 space-y-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Full Platform Dataset (JSON)</h3>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Includes all 249 ISO country records, 17-column global project registries, SMR nuclear power deals, and thermal cooling benchmarks.
          </p>
          <button
            onClick={handleDownloadJSON}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Full JSON Dataset</span>
          </button>
        </GlassCard>

        {/* Prompt Export */}
        <GlassCard className="p-6 space-y-4">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 w-fit">
            <Code className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Deep Research System Prompt (.md)</h3>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Copy or download the complete 12-section research prompt specification for use with Gemini Flash, Claude Sonnet, or GPT models.
          </p>
          <button
            onClick={handleCopyPrompt}
            className="w-full py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            {copiedPrompt ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
            <span>{copiedPrompt ? 'Copied Prompt to Clipboard!' : 'Copy Deep Research Prompt'}</span>
          </button>
        </GlassCard>
      </div>
    </div>
  );
};
