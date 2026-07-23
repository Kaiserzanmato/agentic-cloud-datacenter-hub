export interface AuditLogEntry {
  id: string;
  originalClaim: string;
  updatedFinding: string;
  changeType: 'Updated' | 'Corrected' | 'Expanded' | 'Delayed' | 'Cancelled' | 'Completed' | 'Unverified' | 'Removed' | 'No material change';
  reason: string;
  supportingSources: string[];
}

export const ATTACHED_REPORT_UPDATE_LOG: AuditLogEntry[] = [
  {
    id: 'log-001',
    originalClaim: 'Hyperscaler CapEx projected to reach $350B globally by 2026.',
    updatedFinding: 'Hyperscaler CapEx updated to $602B for 2026 across Big 5 (Microsoft, AWS, Google, Meta, Oracle).',
    changeType: 'Updated',
    reason: 'Significant upward revision driven by massive AI cluster deployments and custom chip infrastructure.',
    supportingSources: ['Synergy Research Group 2026 Q1', 'Morgan Stanley Equity Research']
  },
  {
    id: 'log-002',
    originalClaim: 'Three Mile Island Unit 1 nuclear reactor decommissioned permanently.',
    updatedFinding: 'Unit 1 being restarted by Constellation Energy under 20-year PPA dedicated 100% to Microsoft AI data centers.',
    changeType: 'Updated',
    reason: 'First-of-its-kind nuclear restart specifically contracted for AI cloud power demand.',
    supportingSources: ['Constellation Energy SEC 8-K', 'US Dept of Energy Nuclear Office']
  },
  {
    id: 'log-003',
    originalClaim: 'TSMC Arizona Fab 1 planned for 3nm production by end of 2024.',
    updatedFinding: 'Fab 1 shifted to N4 (4nm) production in 2025; Fab 2/3 expanded to 2nm with CHIPS Act $6.6B grant.',
    changeType: 'Delayed',
    reason: 'Tool installation delays and cleanroom labor training timelines in Phoenix.',
    supportingSources: ['TSMC Investor Relations Call Q4', 'U.S. Dept of Commerce CHIPS Office']
  },
  {
    id: 'log-004',
    originalClaim: 'Dublin, Ireland data center moratorium to end in 2025.',
    updatedFinding: 'EirGrid grid power caps remain strictly active through 2028; new connection approvals restricted to self-generating gas/hydrogen hybrid facilities.',
    changeType: 'Corrected',
    reason: 'National electrical grid capacity constraints forced extending the connection cap.',
    supportingSources: ['EirGrid Ireland Power System Statement', 'Commission for Regulation of Utilities (CRU)']
  },
  {
    id: 'log-005',
    originalClaim: 'Philippine data center capacity estimated at 100 MW by 2026.',
    updatedFinding: 'Philippine operational & under-construction pipeline expanded to 450+ MW across STT GDC, Digital Edge, Yondr, and ePLDT campuses.',
    changeType: 'Expanded',
    reason: 'Surge in hyperscale subsea landing points and sovereign cloud incentives in Luzon & Clark.',
    supportingSources: ['DICT Philippines 2026 Roadmap', 'Structure Research ASEAN Report']
  },
  {
    id: 'log-006',
    originalClaim: 'Direct-to-chip liquid cooling represents 5% of global data center cooling.',
    updatedFinding: 'Liquid cooling adoption skyrocketed to 34% of new AI rack builds (>40kW/rack density requiring NVIDIA GB200 specs).',
    changeType: 'Updated',
    reason: 'Thermal dissipation limits of air cooling exceeded by next-gen GPUs (1000W+ per package).',
    supportingSources: ['Uptime Institute Global Data Center Survey 2026', 'Vertiv Tech Brief']
  },
  {
    id: 'log-007',
    originalClaim: 'Minerals Security Partnership (MSP) serves as the primary critical mineral coordination forum.',
    updatedFinding: 'Pax Silica framework launched (Dec 2025) and FORGE forum established as successor/expansion; $10.25B public funding approved.',
    changeType: 'Expanded',
    reason: 'Formalization of the Pax Silica multilateral declaration with 24 formal signatories and flagship hubs in PH, Panama, and US.',
    supportingSources: ['US Dept of State Pax Silica Declaration', 'Reuters April 2026', 'EU Commission Press Release June 2026']
  }
];
