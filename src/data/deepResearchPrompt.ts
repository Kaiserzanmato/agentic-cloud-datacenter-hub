export interface ResearchPromptTemplate {
  id: string;
  title: string;
  category: string;
  promptText: string;
}

export const DEEP_RESEARCH_PROMPT_TEMPLATE = `
# Deep Research System Instruction: Global AI, Cloud, Data Center, and Digital Infrastructure

## Role & Mission
Act as an expert research scientist, industry analyst, and evidence auditor specializing in global AI compute, cloud regions, hyperscale data centers, semiconductor supply chains, energy/cooling infrastructure, and sovereign cloud policy.

## Primary Objective
Execute structured deep research, verify raw evidence against primary authoritative sources, compute confidence scores (High, Medium, Low), and generate cited research reports following ISO 3166-1 country standards.

## Required Output Structure
1. Executive Summary & Key Strategic Trends
2. Research Methodology & Verification Cutoff
3. Global Infrastructure Overview (CapEx, Power MW/GW, GPU Clusters)
4. Regional Infrastructure Breakdown (North America, LatAm, Europe, Middle East, Africa, South Asia, Southeast Asia, East Asia, Central Asia, Oceania)
5. Country and Project Registry Table (17 columns: Region, Country, Location, Project, Organizations, Category, Announced, Status, Completion, Investment, Capacity, Jobs, Energy/Cooling, Benefits, Risks, Sources, Confidence)
6. Benefits & Economic Value Creation Matrix (Direct vs Indirect, Confirmed vs Projected)
7. ESG, Power, Cooling & Geopolitical Exposure Analysis
8. Attached Report Update & Audit Log (Change Types: Updated, Corrected, Expanded, Delayed, Cancelled, Completed, Unverified, Removed)
9. Key Gaps, Unknowns & Critical Risk Points
10. Conclusions & Policy/Investment Recommendations
11. Comprehensive Source Register

## Verification & Confidence Guidelines
- **High Confidence**: Verified by official government filings, SEC 10-K/8-K, or primary company press releases.
- **Medium Confidence**: Supported by top-tier financial press (Bloomberg, Reuters, FT) or leading industry research firms (Synergy, IDC, Gartner).
- **Low Confidence**: Preliminary unconfirmed leaks or single secondary press mentions.
`;

export const PRESET_RESEARCH_QUERIES: ResearchPromptTemplate[] = [
  {
    id: 'preset-01',
    title: 'Southeast Asia Sovereign Cloud & AI Hub Acceleration',
    category: 'Southeast Asia',
    promptText: 'Analyze the convergence of sovereign cloud, agentic AI workloads, and hyperscale data center power constraints across the Philippines, Malaysia (Johor), Singapore, and Indonesia in 2026.'
  },
  {
    id: 'preset-02',
    title: 'Hyperscaler CapEx & SMR Nuclear Energy Powering AI',
    category: 'Energy & Power',
    promptText: 'Evaluate the $602B Big-5 hyperscaler CapEx cycle and the adoption of Small Modular Reactors (SMRs), nuclear PPAs, and geothermal power for 100MW+ AI clusters.'
  },
  {
    id: 'preset-03',
    title: 'Next-Gen Liquid Cooling & High-Density Rack Architecture',
    category: 'Cooling & Hardware',
    promptText: 'Benchmark direct-to-chip vs immersion liquid cooling efficiency, PUE impacts, and water reclamation metrics for 40kW-120kW per rack NVIDIA GB200/B200 deployments.'
  },
  {
    id: 'preset-04',
    title: 'Global 2nm Semiconductor Supply Chain & Export Controls',
    category: 'Semiconductors',
    promptText: 'Compare TSMC Arizona, Rapidus Japan, and Samsung Foundry progress on 2nm GAAFET nodes alongside US/EU export restrictions and critical mineral supply chains.'
  },
  {
    id: 'preset-05',
    title: 'Pax Silica: Global AI Supply Chain & Strategic Hubs',
    category: 'Geopolitics & Supply Chain',
    promptText: 'Evaluate the Pax Silica framework impact on global AI supply chains, focusing on the $10B Project Vault, the 1,620ha New Clark City Hub, and the 24-country coalition alignment as of July 2026.'
  }
];
