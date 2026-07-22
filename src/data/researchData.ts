// ─── Types ───────────────────────────────────────────────────────────────────

export interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface CapExItem {
  initiative: string;
  investment: string;
  details: string;
}

export interface EnergyScenario {
  scenario: string;
  y2025: number;
  y2030: number;
  y2035: number;
}

export interface CoolingTech {
  label: string;
  value: number;
  color: string;
}

export interface RegionData {
  id: string;
  name: string;
  flag: string;
  approach: string;
  policy: string;
  stance: string;
  timeline: string;
  details: string[];
}

export interface InsightCard {
  category: string;
  priority: 'critical' | 'high' | 'medium';
  recommendation: string;
  action: string;
}

export interface FrontierModel {
  name: string;
  org: string;
  date: string;
  capability: string;
}

export interface ChineseModel {
  model: string;
  developer: string;
  specs: string;
  capability: string;
}

export interface HardwareItem {
  name: string;
  vendor: string;
  status: string;
  specs: string;
  infra: string;
}

export interface NuclearDeal {
  company: string;
  deal: string;
  capacity: string;
  timeline: string;
}

export interface WaterMetric {
  metric: string;
  figure: string;
  source: string;
}

export interface AgenticPlatform {
  name: string;
  description: string;
  features: string[];
}

// ─── Global KPI Metrics ─────────────────────────────────────────────────────

export const globalMetrics: Metric[] = [
  {
    label: 'Hyperscaler CapEx 2026',
    value: '$602B',
    change: '+36% YoY',
    trend: 'up',
    icon: 'trending-up',
  },
  {
    label: 'Data Center Power (2025)',
    value: '~500 TWh',
    change: 'Up to 1,300 TWh by 2030',
    trend: 'up',
    icon: 'zap',
  },
  {
    label: 'Stargate Investment',
    value: '$500B',
    change: '20 DCs by 2029',
    trend: 'up',
    icon: 'building',
  },
  {
    label: 'Liquid Cooling CAGR',
    value: '28.7–52%',
    change: '1,129% growth by 2030',
    trend: 'up',
    icon: 'droplets',
  },
];

// ─── CapEx Initiatives ───────────────────────────────────────────────────────

export const capExData: CapExItem[] = [
  {
    initiative: 'Project Stargate (US)',
    investment: 'Up to $500B by 2029',
    details: '20 data centers across the US, each ~500K sqft; "Stargate I" in Abilene, TX operational; 10GW power capacity target by 2029; ~64K GB200 GPUs by 2026',
  },
  {
    initiative: 'Stargate UAE',
    investment: '1GW (Phase 1 of 5GW)',
    details: 'G42/Khazna in Abu Dhabi with OpenAI, Oracle, NVIDIA, Cisco, SoftBank; first 200MW under construction; 2026 delivery',
  },
  {
    initiative: 'AWS Federal Expansion',
    investment: '$50B',
    details: '1.3 GW of AI compute capacity for US government agencies (Top Secret/Secret clouds); breaking ground 2026',
  },
  {
    initiative: 'Google Compute Growth',
    investment: 'Multiple billions',
    details: 'Targeting 1,000x compute capacity growth by 2029, doubling serving power every six months',
  },
];

export const hyperscalerCapExTotal = '$602B';
export const hyperscalerCapExNote = 'Big Five (Amazon, Microsoft, Google, Meta, Oracle) projected 2026 spend. Each of Amazon, Microsoft, Google, and Meta individually exceeding $100B. Capital intensity at 45–57% of revenue.';

// ─── Energy Scenarios (IEA April 2025) ───────────────────────────────────────

export const energyScenarios: EnergyScenario[] = [
  { scenario: 'Headwinds', y2025: 500, y2030: 700, y2035: 700 },
  { scenario: 'High Efficiency', y2025: 500, y2030: 750, y2035: 1000 },
  { scenario: 'Base Case', y2025: 500, y2030: 1000, y2035: 1250 },
  { scenario: 'Lift-Off', y2025: 500, y2030: 1300, y2035: 1750 },
];

// ─── Water Metrics ───────────────────────────────────────────────────────────

export const waterMetrics: WaterMetric[] = [
  { metric: 'US DC water consumption (2022)', figure: '~60B liters (17B gallons)', source: 'Forbes / DOE' },
  { metric: 'Projected US hyperscale (2028)', figure: '150–275B liters', source: 'NYT / Federal analysis' },
  { metric: 'Microsoft global water (2020)', figure: '~7B liters', source: 'NYT' },
  { metric: 'Microsoft projected (2030)', figure: '~18B liters (+150%)', source: 'NYT' },
  { metric: 'Google per-facility average', figure: '550K gallons/day', source: 'GRESB' },
  { metric: '1 MW DC annual cooling water', figure: 'Up to 25.5M liters', source: 'CloudComputing News' },
];

// ─── Nuclear Deals ───────────────────────────────────────────────────────────

export const nuclearDeals: NuclearDeal[] = [
  { company: 'Microsoft', deal: 'Three Mile Island restart — 20yr, $16B PPA', capacity: '835 MW', timeline: '2028' },
  { company: 'Google', deal: 'Kairos Power SMR fleet — first US corporate SMR deal', capacity: '500 MW', timeline: '2030+' },
  { company: 'Amazon', deal: 'Susquehanna nuclear campus conversion', capacity: '$20B+', timeline: 'Under development' },
  { company: 'Meta', deal: 'RFP for new nuclear generation', capacity: '1–4 GW', timeline: 'Under development' },
  { company: 'Oracle', deal: 'Gigawatt-scale DC powered by 3 SMRs', capacity: '1+ GW', timeline: 'Permits secured' },
];

// ─── Cooling Technology ──────────────────────────────────────────────────────

export const coolingKeyPoints = [
  'Liquid Cooling Market: 28.7–52% CAGR; 1,129% absolute growth 2024–2030',
  '45°C Warm-Water Cooling: NVIDIA Vera Rubin design point; eliminates traditional chillers',
  'AI GPU Thermal Demands: Next-gen GPUs exceed 700W TDP; liquid cooling is mandatory',
  'Membrane Cooling: Reduces water usage by up to 90%; critical for APAC tropical climates',
  'NVIDIA Vera Rubin: 120–130 kW per rack; Rubin Ultra: 600 kW per rack — air cooling obsolete',
];

// ─── Frontier Models (Western) ───────────────────────────────────────────────

export const frontierModels: FrontierModel[] = [
  {
    name: 'GPT-5.3 Codex',
    org: 'OpenAI',
    date: 'Feb 9, 2026',
    capability: '25% faster than GPT-5.2 on agentic coding; new highs on coding & agentic benchmarks',
  },
  {
    name: 'GPT-5.3-Codex-Spark',
    org: 'OpenAI + Cerebras',
    date: 'Feb 12, 2026',
    capability: '1,000+ tokens/sec via Cerebras WSE-3; 128K context; real-time coding model',
  },
  {
    name: 'Claude Opus 4.6',
    org: 'Anthropic',
    date: 'Feb 4, 2026',
    capability: 'Huge leap for agentic planning; Agent Teams (parallel subagents); adaptive thinking',
  },
  {
    name: 'Claude Sonnet 4.6',
    org: 'Anthropic',
    date: 'Feb 15, 2026',
    capability: '80.2% SWE-bench Verified; 70% preferred over Sonnet 4.5; near human-level computer use',
  },
  {
    name: 'Gemini 3.1 Pro',
    org: 'Google DeepMind',
    date: 'Feb 18, 2026',
    capability: '77.1% ARC-AGI-2 (2x Gemini 3 Pro); optimized for agentic workflows',
  },
];

// ─── Frontier Models (Chinese) ───────────────────────────────────────────────

export const chineseModels: ChineseModel[] = [
  {
    model: 'DeepSeek V3.2',
    developer: 'DeepSeek',
    specs: 'MoE with DSA; 128K context',
    capability: 'GPT-5-level reasoning at ~10x lower cost; 96% AIME 2025; IMO 2025 gold medal',
  },
  {
    model: 'GLM-4.7',
    developer: 'Zhipu AI',
    specs: '358B/32B active MoE; 200K context',
    capability: 'SWE-bench 73.8%; AIME 95.7%; 124 tokens/s',
  },
  {
    model: 'GLM-5',
    developer: 'Zhipu AI',
    specs: '~745B/44B active MoE',
    capability: 'Next-gen coding & agentic; trained on Huawei Ascend 910C',
  },
  {
    model: 'Kimi K2.5',
    developer: 'Moonshot AI',
    specs: '1T/32B active MoE; 256K context',
    capability: '4 modes including Agent Swarm; 100 parallel sub-agents; 109.5 tok/s',
  },
  {
    model: 'Qwen3-Coder-Next',
    developer: 'Alibaba',
    specs: '80B/3B active',
    capability: 'Outperforms DeepSeek V3.2 and Kimi K2.5 on coding despite smaller size',
  },
];

// ─── SWE-bench Leaderboard ───────────────────────────────────────────────────

export const sweBenchData = [
  { model: 'Claude Code (Opus 4.6)', score: 52.9, isLeader: true },
  { model: 'Claude Opus 4.6 / GPT-5.2-xhigh', score: 51.7, isLeader: false },
  { model: 'Kimi K2 Thinking', score: 43.8, isLeader: false },
  { model: 'GLM-5', score: 42.1, isLeader: false },
  { model: 'Qwen3-Coder-Next', score: 40.0, isLeader: false },
  { model: 'MiniMax M2.5', score: 39.6, isLeader: false },
];

// ─── Hardware Roadmap ────────────────────────────────────────────────────────

export const hardwareRoadmap: HardwareItem[] = [
  {
    name: 'Blackwell Ultra (B300)',
    vendor: 'NVIDIA',
    status: 'Shipping in volume, 2026',
    specs: 'Bridge to next-gen architecture',
    infra: '25% QoQ DC revenue growth driver',
  },
  {
    name: 'Vera Rubin',
    vendor: 'NVIDIA',
    status: 'Full production Q1 2026',
    specs: '336B transistors; 288GB HBM4; 13 TB/s; 3.6 EFLOPS (FP4) per NVL144',
    infra: '120–130 kW per rack; liquid cooling mandatory',
  },
  {
    name: 'Rubin Ultra (Preview)',
    vendor: 'NVIDIA',
    status: 'Expected 2027',
    specs: '~500B transistors; 384GB HBM4E; 32 TB/s',
    infra: '600 kW per rack; purpose-built DCs required',
  },
  {
    name: 'Vera Rubin NVL72',
    vendor: 'NVIDIA',
    status: 'Announced',
    specs: '72 Rubin GPUs, 36 Vera CPUs, 3.6 EFLOPS, 75TB memory',
    infra: 'Fully liquid-cooled; 45°C warm-water design',
  },
];

// ─── Agentic Platforms ───────────────────────────────────────────────────────

export const agenticPlatforms: AgenticPlatform[] = [
  {
    name: 'OpenAI Codex Platform',
    description: 'Command center for agents — multiple AI agents execute long-horizon tasks simultaneously',
    features: [
      'Cloud Sandbox Mode: Isolated containers with repos for parallel background tasks',
      'CLI Mode: Local terminal with Suggest, Auto Edit, and Full Auto approval levels',
      'Integrated into Xcode 26.3 for agentic coding in Apple\'s IDE',
    ],
  },
  {
    name: 'Google Antigravity',
    description: 'Agent-first IDE with Three-Surface Architecture — Editor, Terminal, and Browser',
    features: [
      'Browser Sub-Agent: Uses Gemini 3 multimodal vision to "see" rendered apps',
      'Plan Generation & Review: Structured plans for human approval before execution',
      'Supports Gemini 3.1 Pro; free for individuals in public preview',
    ],
  },
  {
    name: 'Anthropic Claude Code',
    description: 'Agentic coding across terminal, VS Code, JetBrains, Slack, and web',
    features: [
      'Agent Teams: Multiple Claude agents working in parallel, coordinating autonomously',
      'Optimized with Opus 4.6 — "a huge leap for agentic planning"',
      '89% AI adoption across orgs using Claude Code; 800+ agents deployed internally',
    ],
  },
  {
    name: 'Replit Agent 3',
    description: 'Autonomous vibe coding agent with reflection loop — builds, tests, and fixes continuously',
    features: [
      'Can build other agents and automations via natural language',
      'Claude Opus 4.5 support; agent production SQL database access',
      'Automation preview for all Agent builders',
    ],
  },
];

// ─── Regulatory Regions ──────────────────────────────────────────────────────

export const regions: RegionData[] = [
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    approach: 'Innovation-First / Deregulation',
    policy: 'AI Action Plan (July 2025)',
    stance: 'Pro-Growth',
    timeline: 'Ongoing',
    details: [
      'Rescission of Biden-era AI regulations (Jan 2025)',
      'Accelerated DC permitting & AI infrastructure expansion (Jul 2025)',
      'Federal preemption of state-level AI regulations (Dec 2025)',
      'Technology Prosperity Deals with UK, Japan, Korea',
    ],
  },
  {
    id: 'eu',
    name: 'European Union',
    flag: '🇪🇺',
    approach: 'Regulation-First / Enforcement',
    policy: 'EU AI Act (Aug 2, 2026 milestone)',
    stance: 'Cautious / Compliance-Heavy',
    timeline: 'Aug 2, 2026 — High-risk obligations',
    details: [
      'Documented risk management systems throughout lifecycle',
      'Conformity assessments, CE marking, EU database registration',
      'Human oversight, accuracy, robustness & cybersecurity safeguards',
      'Significantly higher compliance barrier vs. US approach',
    ],
  },
  {
    id: 'cn',
    name: 'China',
    flag: '🇨🇳',
    approach: 'State-Directed / Dual Track',
    policy: 'Amended Cybersecurity Law (Jan 1, 2026)',
    stance: 'Strategic Independence',
    timeline: '70% AI penetration by 2027',
    details: [
      'First statutory-level AI clause (Article 20)',
      'Expanded state support for foundational AI research',
      'Strengthened AI ethics regulation & risk monitoring',
      'Tiered penalty regime with stricter fines',
    ],
  },
  {
    id: 'sg',
    name: 'Singapore',
    flag: '🇸🇬',
    approach: 'Smart-Nation / Governance Pioneer',
    policy: 'World\'s first agentic AI governance framework (Jan 22, 2026)',
    stance: 'Pro-Innovation with Guardrails',
    timeline: 'Jan 2026 — Active',
    details: [
      'Four governance pillars: risk bounding, human accountability, technical controls, end-user responsibility',
      'Addresses autonomous AI systems that select tools & execute actions',
      'First framework specifically designed for agentic AI',
    ],
  },
  {
    id: 'sa',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    approach: 'Sovereign AI / Vision 2030',
    policy: 'SDAIA enforcing PDPL in 2026',
    stance: 'Aggressive Investment',
    timeline: '2026 — GAIN Summit Host',
    details: [
      'Hosting Global AI Summit (GAIN) 2026',
      '"Data Embassies" — foreign entities operate under own legal frameworks',
      'Full PDPL enforcement in 2026',
    ],
  },
  {
    id: 'ae',
    name: 'UAE',
    flag: '🇦🇪',
    approach: 'AI Strategy 2031',
    policy: '100% AI adoption in government services',
    stance: 'Hyper-Growth',
    timeline: 'Stargate UAE — 2026 delivery',
    details: [
      'Stargate UAE: 1GW AI cluster within 5GW campus in Abu Dhabi',
      'Partners: OpenAI, Oracle, NVIDIA, Cisco, SoftBank',
      'First 200MW under construction with 2026 delivery target',
    ],
  },
];

// ─── Actionable Insights ─────────────────────────────────────────────────────

export const insights: InsightCard[] = [
  {
    category: 'Infrastructure',
    priority: 'critical',
    recommendation: 'Accelerate liquid cooling adoption — air cooling is physically obsolete for frontier AI',
    action: 'Pilot immersion cooling and 45°C warm-water systems for Vera Rubin-class deployments',
  },
  {
    category: 'Energy',
    priority: 'critical',
    recommendation: 'Secure renewable energy PPAs and explore nuclear — demand may reach 1,300 TWh by 2030',
    action: 'Lock in clean energy contracts; engage SMR providers for feasibility assessment',
  },
  {
    category: 'Supply Chain',
    priority: 'high',
    recommendation: 'Diversify GPU procurement — 90%+ TSMC dependence creates systemic risk',
    action: 'Qualify AMD, Intel, and cloud-native accelerators as production alternatives',
  },
  {
    category: 'Regulation',
    priority: 'high',
    recommendation: 'Prepare for EU AI Act Aug 2026 deadline — high-risk system obligations take full effect',
    action: 'Complete system classification and conformity assessments before August 2026',
  },
  {
    category: 'Sustainability',
    priority: 'high',
    recommendation: 'Address water crisis — US DC water could increase 5x to 275B liters by 2028',
    action: 'Deploy membrane cooling (90% water reduction) and water-recycling strategies',
  },
  {
    category: 'Workforce',
    priority: 'medium',
    recommendation: 'Build internal AI infrastructure expertise to match the agentic era',
    action: 'Upskill engineering teams on agentic platforms, liquid cooling, and AI ops',
  },
];

// ─── Pillar Cards (Executive Summary) ────────────────────────────────────────

export const pillarCards = [
  {
    title: 'Infrastructure',
    description: '$602B in hyperscaler CapEx for 2026 signals unprecedented build-out. GPU supply chains (90%+ TSMC dependency), cooling systems (120–600 kW/rack), and power infrastructure (10GW+ targets) are the critical bottlenecks.',
    icon: 'server',
    color: '#6366f1',
  },
  {
    title: 'Sustainability',
    description: 'Data center energy on track for 500 TWh in 2025, potentially 1,300 TWh by 2030. Water consumption could increase fivefold to 275B liters by 2028. Nuclear, renewables, and membrane cooling are emerging solutions.',
    icon: 'leaf',
    color: '#34c759',
  },
  {
    title: 'Regulation',
    description: 'Fragmented global landscape: US deregulates, EU enforces AI Act (Aug 2026), China writes AI into cybersecurity law, Singapore pioneers agentic AI governance. Compliance costs rising 30-40%.',
    icon: 'shield',
    color: '#ff9f0a',
  },
];

// ─── Critical Risks ──────────────────────────────────────────────────────────

export const criticalRisks = [
  'GPU supply chain concentration: 90%+ dependence on TSMC for advanced node manufacturing creates systemic risk across the entire AI ecosystem.',
  'Energy grid constraints: Multiple US markets face 3–5 year wait times for new grid connections, potentially stalling data center expansion at scale.',
  'Regulatory fragmentation: Divergent AI governance frameworks across US, EU, China, and ASEAN increase operational complexity and compliance costs by 30–40%.',
  'Water sustainability: US data center water use projected to increase fivefold by 2028; Microsoft alone expects 150% water increase by 2030.',
  'Capital intensity risk: Hyperscalers at 45–57% capital intensity with $1.5T projected debt — systemic financial risk if AI returns underperform.',
];

// ─── Recommended Actions ─────────────────────────────────────────────────────

export const recommendedActions = [
  'Conduct comprehensive AI infrastructure audit — identify capacity gaps, cooling upgrade needs, and power constraints across all facilities.',
  'Establish dedicated sustainability team — manage renewable energy procurement, nuclear SMR engagement, and water-reduction strategies.',
  'Initiate EU AI Act compliance program — risk classification and conformity assessments for all deployed AI systems by Q2 2026.',
  'Diversify GPU procurement — qualify AMD MI400, Intel Gaudi 3, and cloud-native accelerators alongside NVIDIA.',
  'Develop 5-year data center power strategy — incorporate SMR nuclear, co-located renewables (Google/Intersect model), and grid battery storage.',
];

// ─── Trilemma Data ───────────────────────────────────────────────────────────

export const trilemmaNodes = [
  { id: 'demand', label: 'AI Demand', sublabel: '$602B CapEx, frontier models, agentic workloads' },
  { id: 'resources', label: 'Physical Resources', sublabel: 'Power (1,300 TWh), water (275B liters), cooling (600 kW/rack)' },
  { id: 'regulation', label: 'Global Regulation', sublabel: 'EU AI Act, China CSL, Singapore agentic framework' },
];

export const trilemmaQuestion = 'We have a collision between net-zero commitments (2030), explosive AI demand, and grid constraints. The IEA shows scenarios from 700 TWh to 1,300 TWh by 2030. Something has to break — will climate pledges roll back, or will AI deployment stall in regulated markets?';
