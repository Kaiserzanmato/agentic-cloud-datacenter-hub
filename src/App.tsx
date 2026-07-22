import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/layout/Navbar';
import { ExecutiveDashboard } from './components/sections/ExecutiveDashboard';
import { DeepResearchEngine } from './components/sections/DeepResearchEngine';
import { InfrastructureMap } from './components/map/InfrastructureMap';
import { CountryExplorer } from './components/sections/CountryExplorer';
import { ProjectRegistrySection } from './components/sections/ProjectRegistrySection';
import { PowerCoolingSection } from './components/sections/PowerCoolingSection';
import { AuditLogSection } from './components/sections/AuditLogSection';
import { ExportSuite } from './components/sections/ExportSuite';
import { Footer } from './components/sections/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const { mode: themeMode, setMode: setThemeMode } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'dashboard' && (
          <ExecutiveDashboard
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'research' && <DeepResearchEngine />}

        {activeTab === 'map' && (
          <InfrastructureMap
            selectedRegion={selectedRegion}
            searchQuery={searchQuery}
            selectedCountryId={selectedCountryId}
            onSelectCountry={setSelectedCountryId}
          />
        )}

        {activeTab === 'countries' && (
          <CountryExplorer
            selectedRegion={selectedRegion}
            searchQuery={searchQuery}
            selectedCountryId={selectedCountryId}
            onSelectCountry={setSelectedCountryId}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectRegistrySection
            selectedRegion={selectedRegion}
            searchQuery={searchQuery}
            onSelectCountry={setSelectedCountryId}
          />
        )}

        {activeTab === 'tech' && <PowerCoolingSection />}

        {activeTab === 'audit' && <AuditLogSection />}

        {activeTab === 'export' && <ExportSuite />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
