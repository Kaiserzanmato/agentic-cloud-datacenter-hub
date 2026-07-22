import { createContext, useContext } from 'react';

export type RegionId = 'all' | 'us' | 'eu' | 'cn' | 'sg' | 'sa' | 'ae';

export interface RegionFilterContext {
  activeRegion: RegionId;
  setActiveRegion: (region: RegionId) => void;
  regionLabel: string;
}

export const RegionContext = createContext<RegionFilterContext>({
  activeRegion: 'all',
  setActiveRegion: () => {},
  regionLabel: 'All Regions',
});

export function useRegionFilter() {
  return useContext(RegionContext);
}

export const regionLabels: Record<RegionId, string> = {
  all: 'All Regions',
  us: 'United States',
  eu: 'European Union',
  cn: 'China',
  sg: 'Singapore',
  sa: 'Saudi Arabia',
  ae: 'UAE',
};
