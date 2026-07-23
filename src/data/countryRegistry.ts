export interface CountryRegistryItem {
  id: string;
  name: string;
  alpha2: string;
  alpha3: string;
  numeric: string;
  officialName: string;
  region: 'North America' | 'Latin America' | 'Europe' | 'Middle East' | 'Africa' | 'South Asia' | 'Southeast Asia' | 'East Asia' | 'Central Asia' | 'Oceania';
  sovereignAiStatus: 'Active Strategy' | 'Developing Policy' | 'Emerging Hub' | 'Constrained' | 'Baseline';
  dataCenterCapacityMW: number;
  gridReadinessScore: number; // 0-100
  activeProjectsCount: number;
  aliases: string[];
  enabled: boolean;
}

export const COUNTRY_REGISTRY: CountryRegistryItem[] = [
  // North America
  { id: 'USA', name: 'United States', alpha2: 'US', alpha3: 'USA', numeric: '840', officialName: 'United States of America', region: 'North America', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 18500, gridReadinessScore: 82, activeProjectsCount: 142, aliases: ['US', 'America'], enabled: true },
  { id: 'CAN', name: 'Canada', alpha2: 'CA', alpha3: 'CAN', numeric: '124', officialName: 'Canada', region: 'North America', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 1400, gridReadinessScore: 91, activeProjectsCount: 18, aliases: ['CA'], enabled: true },
  { id: 'MEX', name: 'Mexico', alpha2: 'MX', alpha3: 'MEX', numeric: '484', officialName: 'United Mexican States', region: 'Latin America', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 620, gridReadinessScore: 68, activeProjectsCount: 12, aliases: ['MX'], enabled: true },

  // Southeast Asia
  { id: 'PHL', name: 'Philippines', alpha2: 'PH', alpha3: 'PHL', numeric: '608', officialName: 'Republic of the Philippines', region: 'Southeast Asia', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 450, gridReadinessScore: 71, activeProjectsCount: 17, aliases: ['PH', 'Filipinas'], enabled: true },
  { id: 'SGP', name: 'Singapore', alpha2: 'SG', alpha3: 'SGP', numeric: '702', officialName: 'Republic of Singapore', region: 'Southeast Asia', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 1100, gridReadinessScore: 96, activeProjectsCount: 22, aliases: ['SG'], enabled: true },
  { id: 'MYS', name: 'Malaysia', alpha2: 'MY', alpha3: 'MYS', numeric: '458', officialName: 'Malaysia', region: 'Southeast Asia', sovereignAiStatus: 'Emerging Hub', dataCenterCapacityMW: 1350, gridReadinessScore: 84, activeProjectsCount: 28, aliases: ['MY', 'Johor Hub'], enabled: true },
  { id: 'IDN', name: 'Indonesia', alpha2: 'ID', alpha3: 'IDN', numeric: '360', officialName: 'Republic of Indonesia', region: 'Southeast Asia', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 780, gridReadinessScore: 74, activeProjectsCount: 19, aliases: ['ID'], enabled: true },
  { id: 'VNM', name: 'Viet Nam', alpha2: 'VN', alpha3: 'VNM', numeric: '704', officialName: 'Socialist Republic of Viet Nam', region: 'Southeast Asia', sovereignAiStatus: 'Emerging Hub', dataCenterCapacityMW: 310, gridReadinessScore: 69, activeProjectsCount: 9, aliases: ['VN', 'Vietnam'], enabled: true },
  { id: 'THA', name: 'Thailand', alpha2: 'TH', alpha3: 'THA', numeric: '764', officialName: 'Kingdom of Thailand', region: 'Southeast Asia', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 520, gridReadinessScore: 78, activeProjectsCount: 14, aliases: ['TH'], enabled: true },

  // East Asia
  { id: 'JPN', name: 'Japan', alpha2: 'JP', alpha3: 'JPN', numeric: '392', officialName: 'Japan', region: 'East Asia', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 2900, gridReadinessScore: 92, activeProjectsCount: 38, aliases: ['JP', 'Nippon'], enabled: true },
  { id: 'KOR', name: 'Korea, Republic of', alpha2: 'KR', alpha3: 'KOR', numeric: '410', officialName: 'Republic of Korea', region: 'East Asia', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 1650, gridReadinessScore: 94, activeProjectsCount: 26, aliases: ['KR', 'South Korea'], enabled: true },
  { id: 'TWN', name: 'Taiwan', alpha2: 'TW', alpha3: 'TWN', numeric: '158', officialName: 'Taiwan, Province of China', region: 'East Asia', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 980, gridReadinessScore: 88, activeProjectsCount: 21, aliases: ['TW'], enabled: true },
  { id: 'CHN', name: 'China', alpha2: 'CN', alpha3: 'CHN', numeric: '156', officialName: "People's Republic of China", region: 'East Asia', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 14200, gridReadinessScore: 86, activeProjectsCount: 110, aliases: ['CN', 'PRC'], enabled: true },

  // Europe
  { id: 'DEU', name: 'Germany', alpha2: 'DE', alpha3: 'DEU', numeric: '276', officialName: 'Federal Republic of Germany', region: 'Europe', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 2400, gridReadinessScore: 89, activeProjectsCount: 34, aliases: ['DE', 'Frankfurt Hub'], enabled: true },
  { id: 'GBR', name: 'United Kingdom', alpha2: 'GB', alpha3: 'GBR', numeric: '826', officialName: 'United Kingdom of Great Britain and Northern Ireland', region: 'Europe', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 2150, gridReadinessScore: 87, activeProjectsCount: 31, aliases: ['UK', 'Britain'], enabled: true },
  { id: 'IRL', name: 'Ireland', alpha2: 'IE', alpha3: 'IRL', numeric: '372', officialName: 'Ireland', region: 'Europe', sovereignAiStatus: 'Constrained', dataCenterCapacityMW: 1300, gridReadinessScore: 65, activeProjectsCount: 15, aliases: ['IE', 'Dublin Hub'], enabled: true },
  { id: 'FRA', name: 'France', alpha2: 'FR', alpha3: 'FRA', numeric: '250', officialName: 'French Republic', region: 'Europe', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 1750, gridReadinessScore: 95, activeProjectsCount: 24, aliases: ['FR', 'Paris Hub'], enabled: true },
  { id: 'NLD', name: 'Netherlands', alpha2: 'NL', alpha3: 'NLD', numeric: '528', officialName: 'Kingdom of the Netherlands', region: 'Europe', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 1200, gridReadinessScore: 78, activeProjectsCount: 13, aliases: ['NL', 'Amsterdam Hub'], enabled: true },
  { id: 'NOR', name: 'Norway', alpha2: 'NO', alpha3: 'NOR', numeric: '578', officialName: 'Kingdom of Norway', region: 'Europe', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 650, gridReadinessScore: 98, activeProjectsCount: 11, aliases: ['NO', 'Nordic Hub'], enabled: true },
  { id: 'SWE', name: 'Sweden', alpha2: 'SE', alpha3: 'SWE', numeric: '752', officialName: 'Kingdom of Sweden', region: 'Europe', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 850, gridReadinessScore: 94, activeProjectsCount: 14, aliases: ['SE'], enabled: true },
  { id: 'FIN', name: 'Finland', alpha2: 'FI', alpha3: 'FIN', numeric: '246', officialName: 'Republic of Finland', region: 'Europe', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 480, gridReadinessScore: 96, activeProjectsCount: 9, aliases: ['FI'], enabled: true },
  { id: 'GRC', name: 'Greece', alpha2: 'GR', alpha3: 'GRC', numeric: '300', officialName: 'Hellenic Republic', region: 'Europe', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 150, gridReadinessScore: 72, activeProjectsCount: 4, aliases: ['GR'], enabled: true },

  // Middle East & South Asia
  { id: 'ARE', name: 'United Arab Emirates', alpha2: 'AE', alpha3: 'ARE', numeric: '784', officialName: 'United Arab Emirates', region: 'Middle East', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 920, gridReadinessScore: 93, activeProjectsCount: 23, aliases: ['UAE', 'Dubai', 'Abu Dhabi'], enabled: true },
  { id: 'SAU', name: 'Saudi Arabia', alpha2: 'SA', alpha3: 'SAU', numeric: '682', officialName: 'Kingdom of Saudi Arabia', region: 'Middle East', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 850, gridReadinessScore: 90, activeProjectsCount: 27, aliases: ['KSA', 'Riyadh'], enabled: true },
  { id: 'IND', name: 'India', alpha2: 'IN', alpha3: 'IND', numeric: '356', officialName: 'Republic of India', region: 'South Asia', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 1850, gridReadinessScore: 79, activeProjectsCount: 46, aliases: ['IN', 'Mumbai Hub'], enabled: true },
  { id: 'ISR', name: 'Israel', alpha2: 'IL', alpha3: 'ISR', numeric: '376', officialName: 'State of Israel', region: 'Middle East', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 580, gridReadinessScore: 88, activeProjectsCount: 12, aliases: ['IL'], enabled: true },
  { id: 'QAT', name: 'Qatar', alpha2: 'QA', alpha3: 'QAT', numeric: '634', officialName: 'State of Qatar', region: 'Middle East', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 240, gridReadinessScore: 89, activeProjectsCount: 7, aliases: ['QA'], enabled: true },
  { id: 'KAZ', name: 'Kazakhstan', alpha2: 'KZ', alpha3: 'KAZ', numeric: '398', officialName: 'Republic of Kazakhstan', region: 'Central Asia', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 110, gridReadinessScore: 64, activeProjectsCount: 3, aliases: ['KZ'], enabled: true },

  // Latin America & Africa & Oceania
  { id: 'BRA', name: 'Brazil', alpha2: 'BR', alpha3: 'BRA', numeric: '076', officialName: 'Federative Republic of Brazil', region: 'Latin America', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 980, gridReadinessScore: 81, activeProjectsCount: 17, aliases: ['BR', 'Sao Paulo'], enabled: true },
  { id: 'ARG', name: 'Argentina', alpha2: 'AR', alpha3: 'ARG', numeric: '032', officialName: 'Argentine Republic', region: 'Latin America', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 210, gridReadinessScore: 68, activeProjectsCount: 6, aliases: ['AR'], enabled: true },
  { id: 'CHL', name: 'Chile', alpha2: 'CL', alpha3: 'CHL', numeric: '152', officialName: 'Republic of Chile', region: 'Latin America', sovereignAiStatus: 'Emerging Hub', dataCenterCapacityMW: 340, gridReadinessScore: 85, activeProjectsCount: 8, aliases: ['CL'], enabled: true },
  { id: 'CRI', name: 'Costa Rica', alpha2: 'CR', alpha3: 'CRI', numeric: '188', officialName: 'Republic of Costa Rica', region: 'Latin America', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 45, gridReadinessScore: 74, activeProjectsCount: 2, aliases: ['CR'], enabled: true },
  { id: 'SLV', name: 'El Salvador', alpha2: 'SV', alpha3: 'SLV', numeric: '222', officialName: 'Republic of El Salvador', region: 'Latin America', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 30, gridReadinessScore: 61, activeProjectsCount: 2, aliases: ['SV'], enabled: true },
  { id: 'PAN', name: 'Panama', alpha2: 'PA', alpha3: 'PAN', numeric: '591', officialName: 'Republic of Panama', region: 'Latin America', sovereignAiStatus: 'Emerging Hub', dataCenterCapacityMW: 85, gridReadinessScore: 76, activeProjectsCount: 4, aliases: ['PA'], enabled: true },
  { id: 'ZAF', name: 'South Africa', alpha2: 'ZA', alpha3: 'ZAF', numeric: '710', officialName: 'Republic of South Africa', region: 'Africa', sovereignAiStatus: 'Emerging Hub', dataCenterCapacityMW: 420, gridReadinessScore: 62, activeProjectsCount: 8, aliases: ['ZA', 'Johannesburg'], enabled: true },
  { id: 'KEN', name: 'Kenya', alpha2: 'KE', alpha3: 'KEN', numeric: '404', officialName: 'Republic of Kenya', region: 'Africa', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 190, gridReadinessScore: 73, activeProjectsCount: 5, aliases: ['KE', 'Nairobi'], enabled: true },
  { id: 'AUS', name: 'Australia', alpha2: 'AU', alpha3: 'AUS', numeric: '036', officialName: 'Commonwealth of Australia', region: 'Oceania', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 1620, gridReadinessScore: 89, activeProjectsCount: 29, aliases: ['AU', 'Sydney Hub'], enabled: true },
];
