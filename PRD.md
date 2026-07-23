# Product Requirements Document (PRD)
## Aethel Global — AI, Cloud & Data Center Infrastructure Intelligence Platform

| | |
|---|---|
| **Product** | Aethel Global Intelligence Platform |
| **Codename** | `agentic-cloud-datacenter-hub` |
| **Owner** | DocypherLabs — Research & Intelligence |
| **Status** | Live (Production) |
| **Live URL** | https://agentic-cloud-datacenter-hub.vercel.app |
| **Document version** | 1.0 |
| **Last updated** | 2026-07-23 |

---

## 1. Overview

### 1.1 Problem Statement

Executives, policy analysts, capital allocators, and infrastructure strategists tracking the global AI buildout — hyperscale data centers, sovereign AI clusters, semiconductor fabs, SMR nuclear power, subsea cables, and the geopolitical coordination frameworks around them (e.g., *Pax Silica*) — currently have to synthesize this picture from dozens of fragmented sources: government press releases, hyperscaler earnings calls, trade press, and static PDF research reports. There is no single, interactive, queryable surface that combines:

1. A **structured, filterable dataset** of countries, projects, and infrastructure metrics.
2. A **geospatial view** of where that infrastructure physically sits.
3. A **conversational research agent** that can answer natural-language questions grounded in that same dataset (rather than a generic web-search chatbot).
4. **Executive-ready outputs** (audit reports, exports, briefings) that can be acted on directly.

### 1.2 Product Vision

Aethel Global is a single-page **Infrastructure Intelligence Platform** that unifies a curated, versioned dataset with an interactive map, an executive dashboard, a natural-language research agent, and a documentary video briefing — all filterable by the same global **region selector**, so every surface (dashboard, map, research agent, deep-research reports) always reflects the same "lens" the user has chosen.

### 1.3 Target Users

| Persona | Need |
|---|---|
| **Executive / C-suite strategist** | Fast, digestible KPIs and regional comparisons to inform capital allocation and market-entry decisions |
| **Policy / geopolitical analyst** | Structured view of the Pax Silica coalition, signatories, capital vehicles, and multi-dimensional risk (environmental, sovereignty, geopolitical) |
| **Infrastructure / data center operator** | Country-level grid readiness, power/cooling trends, and project registry detail to benchmark markets |
| **Investor / research analyst** | Ability to ask targeted natural-language questions ("Which countries combine high AI capacity with grid or policy risk?") and get a grounded, cited answer instead of a generic LLM hallucination |

---

## 2. Goals & Non-Goals

### 2.1 Goals

- **G1.** Present a single, coherent global dataset (country registry + project registry + Pax Silica policy data) across dashboard, map, and research surfaces.
- **G2.** Provide a region filter that is the *single source of truth* — selecting a region anywhere (navbar, search autocomplete) must update the dashboard, the map, the AI Research Agent's context, and the Deep Research Engine's generated report simultaneously, with no stale or cross-region data leakage.
- **G3.** Offer a scoped, grounded conversational agent (not a general-purpose chatbot) that answers only from the platform's registry + Pax Silica knowledge base, with citations.
- **G4.** Offer a "Deep Research Engine" that produces a structured, region- and category-specific executive report (summary, project registry excerpt, risk matrix) without requiring the user to leave the app or manually prompt an external LLM.
- **G5.** Visualize infrastructure geospatially with multiple basemap styles (standard, satellite, terrain, dark, light, hybrid) and both 2D and pseudo-3D perspectives, using only free/tokenless tile providers.
- **G6.** Support a documentary-style video briefing as a first-class, dedicated content tab.
- **G7.** Ship as a fully static-first frontend with a minimal, stateless serverless API for the one feature (AI Research Agent) that requires a live LLM call — keeping infrastructure cost and operational surface area small.

### 2.2 Non-Goals (current version)

- **Not** a real-time data ingestion pipeline — the dataset is curated and versioned at build/deploy time (`DATA_VERSION` string), not live-scraped.
- **Not** a multi-tenant SaaS product — no accounts, auth, roles, or per-user persistence.
- **Not** a general-purpose AI chat assistant — the agent is deliberately scoped to infrastructure/geopolitical research topics.
- **Not** a transactional system — no purchasing, bidding, or contract execution flows.
- **Not** URL-routed (no distinct shareable links per tab) in this version — see §9 Future Work.

---

## 3. Core Features

### 3.1 Executive Dashboard (`dashboard` tab)
- Hero KPIs: hyperscaler CapEx ($602B), global data center power (GW), liquid cooling adoption (%), sovereign country registries (249 ISO territories).
- CapEx trend area chart (2022–2026E, +315% 4-yr CAGR).
- Regional data center capacity horizontal bar chart, region-filterable.
- Deep-link buttons into "Launch AI Deep Research" and "Explore Project Registry."

### 3.2 AI Deep Research Engine (`research` tab)
- Free-text research query box + 4 curated preset queries (Southeast Asia sovereign cloud, hyperscaler CapEx/SMR nuclear, liquid cooling architecture, 2nm semiconductor supply chain).
- Model parameters panel: **Target Geographic Coverage** (region dropdown), **Infrastructure Focus** (category dropdown), **Confidence Score Threshold** (All/High/Medium).
- "Execute Deep Research" runs a 4-step progress sequence, then renders a **region- and category-specific** Verified Audit Report:
  1. Executive Summary & Key Strategic Findings (bulleted, region-specific).
  2. Key Project & Development Registry (verified project rows, filtered by confidence threshold).
  3. Environmental & Grid Constraint Matrix (two risk/opportunity cards).
- Report content is keyed off the *executed* region/category (locked in at execution time), not a live-editing preview, so results are stable and reproducible.
- "Copy Research Prompt" — assembles the full structured prompt (template + region + category + user instruction) to clipboard for optional external LLM use.

### 3.3 AI Research Agent (persistent side panel)
- Floating chat panel (bot icon toggle), available from every tab, showing live **Context: `{region}` • `{tab}`** so the user always knows what scope their question will be answered against.
- 4 preset questions + free-text input (1200 char cap).
- Backend: calls DeepSeek (`deepseek-v4-flash`) via a Vercel serverless function (`/api/ai-research`), grounded in:
  - The **country registry** snapshot (top-capacity countries, constrained/at-risk countries, totals) scoped to the selected region.
  - The **Pax Silica knowledge base** (framework overview, capital vehicles, flagship projects, risk profile, value chain, key countries).
- Strict JSON response contract (`{ answer, citations[] }`); on any DeepSeek failure (timeout, malformed JSON, non-200), falls back to a deterministic, registry-derived answer — the user **always** gets a substantive answer, never a raw error.
- Eraser ("clear chat") button resets the conversation to empty state; input has no leftover placeholder text or stale character counters.

### 3.4 Global Map (`map` tab)
- Interactive world map (MapLibre GL) with per-country markers.
- Two overlay modes: **Status** (color = sovereign AI policy status) and **Capacity** (marker size = data center MW).
- Six basemap styles: Standard, Light, Dark, Satellite, Terrain, Hybrid — all free/tokenless.
- 2D / 3D Immersive toggle (tilted camera + building extrusion at city zoom).
- Click-to-select syncs with Country Explorer and Project Registry (shared `selectedCountryId`), and flies the camera to the selected country.
- Enhanced global **search** (navbar): autocomplete dropdown across 29 countries/locations, matching on name, region, or ISO code; selecting a suggestion sets the region filter.

### 3.5 Country Explorer (`countries` tab)
- Card grid of all ISO-registered countries, filterable by region and free-text search, with a detail modal per country.

### 3.6 Project Registry (`projects` tab)
- Filterable/searchable registry of named infrastructure projects (AI supercomputers, cloud regions, semiconductor fabs, SMR nuclear, subsea cables, sovereign AI clusters, colocation DCs) with status, CapEx, capacity, and confidence rating.

### 3.7 Power & Hardware (`tech` tab)
- Power/cooling technology trend content (PUE, liquid cooling, SMR/nuclear PPAs).

### 3.8 Video Briefing (`video` tab)
- Dedicated tab hosting *"Architecting the Silicon Divide"* — a documentary-style briefing video, served as a static asset with native HTML5 controls and range-request (seek/scrub) support.

### 3.9 Report Audit Log (`audit` tab)
- Chronological change log of dataset updates (manually maintained), giving users a sense of data provenance/freshness.

### 3.10 Export Suite (`export` tab)
- One-click JSON export of the full country + project registry.
- Clipboard export of the structured research prompt template.

---

## 4. Region Filter — Single Source of Truth (Critical Requirement)

This was identified as a **P0 correctness requirement** after a regression where selecting "North America" in the region filter still displayed Southeast Asia content in the Deep Research report.

**Requirement:** The selected region (`selectedRegion` state, lifted in `App.tsx`) must be the *only* signal that determines what data downstream components display. Specifically:

| Consumer | Behavior |
|---|---|
| `ExecutiveDashboard` | Receives `selectedRegion` prop; regional capacity chart reflects it |
| `InfrastructureMap` | Receives `selectedRegion` prop; markers filtered to region |
| `CountryExplorer` / `ProjectRegistrySection` | Receive `selectedRegion` prop; cards filtered to region |
| `DeepResearchEngine` | Receives `selectedRegion` prop; syncs local region state + default query text on change; **report content is looked up from a region-keyed dataset** (`getRegionReport(region)`), not hardcoded |
| `AIResearchAgent` | Receives `selectedRegion` prop; displayed in the "Context:" line and sent to the backend as the `region` field, which scopes the registry snapshot server-side |

**Acceptance criteria:**
1. Changing the region dropdown updates the Deep Research query text, the rendered report body (summary, project table, risk matrix), and the AI Research Agent's context label — with zero manual refresh.
2. No component may render another region's static/example content when a different region is selected (regression-tested against North America ↔ Southeast Asia ↔ Europe).
3. Executing a Deep Research run locks the rendered report to the region/category active *at execution time*, so results don't silently drift if the user changes the dropdown afterward without re-executing.

---

## 5. AI Research Agent — Functional Requirements

| ID | Requirement |
|---|---|
| FR-1 | The agent must only be able to answer using data present in the country registry and Pax Silica knowledge base supplied in the prompt — no invented external facts. |
| FR-2 | Every response must include a `citations` array (title + source) so the user can trace the claim. |
| FR-3 | If the upstream DeepSeek call fails for any reason (missing key, timeout, malformed JSON, non-200), the endpoint must still return `HTTP 200` with a deterministic, registry-computed answer — the user must never see a raw error state for a well-formed question. |
| FR-4 | Input must be capped at 1200 characters and validated server-side (`question` required, `tab` must be a known tab, `region` freeform but defaulted to "All Regions"). |
| FR-5 | The request must have a bounded timeout (28s `AbortController`) with matching serverless `maxDuration` (30s) so the platform doesn't kill the function before the model finishes. |
| FR-6 | All DeepSeek failure branches must log a descriptive, single-string `console.error` (HTTP status + body / JSON validation failure / thrown exception) so production issues are diagnosable via `vercel logs`. |
| FR-7 | The model must be told to keep answers under ~250 words so the strict-JSON response reliably finishes within its token budget (this was the root cause of an earlier intermittent-fallback bug — 900 tokens was too small for `answer` + `citations`; raised to 1600). |

---

## 6. Data Requirements

| Dataset | Source of truth | Scope |
|---|---|---|
| Country registry | `src/data/countryRegistry.ts` (client) + duplicated snapshot in `api/ai-research.js` (server, for agent grounding) | ISO code, region, sovereign AI status, data center capacity (MW), grid readiness (0–100), active project count |
| Project registry | `src/data/projectsRegistry.ts` | Named infrastructure projects, category, status, CapEx, capacity, confidence |
| Pax Silica knowledge base | `src/data/paxsilicaData.ts` (client-side structured reference) + `PAX_SILICA_KNOWLEDGE` constant in `api/ai-research.js` (server, for agent grounding) | Framework overview, capital vehicles (Project Vault, Seed Fund, FORGE Forum), flagship projects (New Clark City, Panama PaxPass, Stanford Foundry School), risk profile, value chain, signatory registry |
| Region-specific Deep Research reports | `src/data/regionResearchReports.ts` | Per-region executive summary bullets, project rows, and risk-matrix items for Southeast Asia, North America, East Asia, Europe, Middle East, and Global |
| Research/benchmark reference data | `src/data/researchData.ts` | Frontier AI model benchmarks and other dashboard chart datasets |
| Audit log | `src/data/updateAuditLog.ts` | Manually maintained dataset change history |
| Map coordinates | `src/data/countryCoordinates.ts` | ISO alpha-3 → `[lng, lat]` centroid lookup |

**Data versioning:** the AI Research Agent tags every response's `context.dataVersion` with a string (e.g., `country-registry-2026-07-22-pax-silica-v1`) that must be bumped whenever the underlying registry or Pax Silica context changes, so responses are auditable to a specific dataset snapshot.

---

## 7. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | Initial page must render the dashboard without blocking on the AI agent or map; map/agent are independent, lazy-interactive surfaces. |
| **Resilience** | Any single external dependency failure (DeepSeek API, map tile host) must degrade gracefully — deterministic fallback answers for the agent; a "tiles unavailable" message for the map — never a blank/broken page. |
| **Theming** | Full light/dark/system theme support with no flash-of-wrong-theme on load (blocking inline script in `index.html`). |
| **Accessibility** | Semantic headings, icon+label controls (not icon-only), keyboard-operable form controls. |
| **Security/Privacy** | No PII collected; no auth; DeepSeek API key stored only as a server-side Vercel environment variable, never exposed to the client bundle. |
| **Cost control** | No database, no persistent backend process — a single serverless function invoked only when a user submits an agent question. |

---

## 8. Success Metrics (Product)

| Metric | Target / Signal |
|---|---|
| AI Agent grounded-response rate | >95% of agent requests return a real DeepSeek-generated answer (vs. deterministic fallback) under normal operating conditions |
| Region-filter correctness | 0 cross-region content leakage across dashboard/map/research/agent on manual regression pass per release |
| Time-to-insight | A user can go from "select a region" to "read a cited, region-specific research report" in under 3 interactions (select region → click preset or type query → Execute Deep Research) |
| Map resilience | Map remains usable (markers + at least one basemap) even if one tile provider is unreachable |

---

## 9. Future Work / Out of Scope for v1

1. **Live data pipeline** — replace static TS modules with a real data API/CMS so the dataset can update without a redeploy.
2. **URL-based routing** — deep-linkable, shareable tab URLs (React Router).
3. **Persisted filters/state** — remember the last-selected region/tab across sessions.
4. **Choropleth map layer** — area-based (not just point-marker) encoding of country status/capacity via TopoJSON.
5. **Multi-provider LLM support** — allow the AI Research Agent to fail over between DeepSeek, Claude, or GPT if the primary provider is degraded.
6. **Authenticated, personalized views** — saved searches, custom watchlists, per-user export history.
7. **Video library** — expand the Video Briefing tab from a single documentary to a searchable library of briefings.

---

## 10. Appendix — Glossary

- **Pax Silica** — the platform's modeled/referenced US-led technology supply-chain security coordination framework (critical minerals, semiconductors, ATP, power/grid, data centers, logistics), used as grounding context for geopolitical questions.
- **ATP** — Assembly, Testing, and Packaging (semiconductor value-chain stage).
- **PUE** — Power Usage Effectiveness, a data center energy-efficiency metric.
- **SMR** — Small Modular Reactor (nuclear power).
- **Sovereign AI status** — a country-level classification (`Active Strategy`, `Developing Policy`, `Emerging Hub`, `Constrained`, `Baseline`) used for map/registry coloring and risk framing.

---

## 11. Development Tooling & Engineering Workflow

This product was built and is maintained using an AI-assisted, multi-agent engineering workflow rather than a traditional single-IDE process. This section documents the tools in that workflow for provenance and reproducibility.

| Tool | Role in this product |
|---|---|
| **Claude Code (Desktop / CLI)** | Primary coding agent — implementation, refactors, bug diagnosis (e.g., the region-filter sync regression in §4, the DeepSeek token-truncation fix in §5 FR-7), Vercel deployment execution, and authoring of this PRD and the companion Technical Architecture document. |
| **Antigravity CLI** | Agentic build/orchestration tooling used alongside Claude Code for scaffolding and iterating on platform features during active development sessions. |
| **OpenAI ChatGPT Codex** | Used for independent code review passes — a second-opinion review layer on generated diffs before/after deployment, catching issues a single-agent workflow might miss. |
| **Vercel CLI** | Deployment, environment-variable management (`vercel env pull`/`ls`), and production log inspection (`vercel logs`) used to diagnose the intermittent AI Research Agent fallback issue in production. |
| **GitHub** | Canonical source-of-truth repository (`Kaiserzanmato/agentic-cloud-datacenter-hub`), version history, and the deployment trigger surface for Vercel. |

**Why this matters for the PRD:** several requirements in this document (§4 region-filter single-source-of-truth, §5 FR-7 token-budget fix) originated from production issues found and root-caused through this workflow — using live `vercel logs` output to pinpoint exact failure causes rather than guessing — and the fixes were verified against the live production deployment before being considered complete.
