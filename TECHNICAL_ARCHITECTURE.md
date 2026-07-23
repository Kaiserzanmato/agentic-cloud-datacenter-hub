# Technical Architecture Documentation
## Aethel Global — AI, Cloud, Data Center & Digital Infrastructure Intelligence Platform

---

## 1. Executive Summary

Aethel Global is a **static-first React SPA with one lightweight serverless API route**. It visualizes the global build-out of AI infrastructure — data centers, sovereign AI clusters, cloud regions, semiconductor fabs, SMR nuclear power, subsea cables — and the geopolitical coordination framework around it (*Pax Silica*), through an executive-style dashboard, an interactive map, a region- and category-aware Deep Research report generator, a grounded conversational AI Research Agent, and a documentary video briefing.

| Aspect | Summary |
|---|---|
| Type | Hybrid: static SPA (Vite + React) + 1 Vercel serverless function |
| Backend | One stateless API route: `api/ai-research.js` (Node serverless function on Vercel) |
| Database | None — domain data is versioned, hard-coded TypeScript modules bundled into the client; the serverless function keeps its own in-memory snapshot for grounding |
| AI integration | **Live.** `api/ai-research.js` calls DeepSeek (`deepseek-v4-flash`) via `fetch`, grounded in the country registry + Pax Silica knowledge base, with a deterministic same-shape fallback on any failure |
| Map integration | MapLibre GL JS + 6 free/tokenless basemap styles (OpenFreeMap, CARTO, Esri, OpenTopoMap) |
| Video | Native HTML5 `<video>` serving a static MP4 asset from `public/media/`, dedicated "Video Briefing" tab |
| Hosting | Vercel (static build output + serverless function, SPA rewrite to `index.html`) |

---

## 2. Full-Stack Architecture — Visual Overview

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                   BROWSER (Client)                                │
│                                                                                    │
│   React 19 SPA (Vite build)                                                      │
│   ┌──────────────────────────────────────────────────────────────────────────┐   │
│   │ App.tsx  — single source of truth for cross-cutting state:               │   │
│   │   activeTab · selectedRegion · searchQuery · selectedCountryId · theme   │   │
│   └───────────────┬───────────────────────────┬──────────────────┬───────────┘   │
│                    │                           │                  │               │
│         ┌──────────▼─────────┐   ┌────────────▼──────────┐   ┌────▼───────────┐  │
│         │      Navbar         │   │   Tab Content Router    │   │ AIResearchAgent│  │
│         │ (region/search/     │   │  (activeTab switch)     │   │ (floating panel│  │
│         │  theme/nav tabs)    │   │                         │   │  every tab)    │  │
│         └─────────────────────┘   └────────────┬────────────┘   └───────┬────────┘  │
│                                                  │                        │           │
│      ┌───────────────┬───────────────┬──────────┼───────────┬────────────┼───────┐  │
│      ▼               ▼               ▼          ▼           ▼            ▼       │  │
│  Executive       Deep Research     Global      Country    Project     Video       │  │
│  Dashboard        Engine            Map        Explorer   Registry   Briefing     │  │
│  (KPIs, charts)  (region+category  (MapLibre   (cards +   (cards +   (HTML5       │  │
│                   -keyed reports)   GL map)      modal)     modal)    <video>)    │  │
│      │               │               │            │           │                  │  │
│      └───────────────┴───────────────┴────────────┴───────────┴──────────────────┘  │
│                             all read from:                                            │
│      ┌──────────────────────────────────────────────────────────────────────────┐    │
│      │   Static TS Knowledge Base (src/data/*.ts) — bundled at build time         │    │
│      │   countryRegistry · projectsRegistry · paxsilicaData · regionResearchReports│   │
│      │   researchData · countryCoordinates · updateAuditLog · deepResearchPrompt   │    │
│      └──────────────────────────────────────────────────────────────────────────┘    │
│                                                                                    │
└──────────────┬──────────────────────────────┬───────────────────────┬─────────────┘
               │ static asset fetch            │ HTTPS POST             │ HTTPS GET (tiles)
               │ (HTML/JS/CSS/video)           │ /api/ai-research       │
               ▼                               ▼                       ▼
     ┌─────────────────┐          ┌───────────────────────┐   ┌──────────────────────┐
     │  Vercel Static   │          │  Vercel Serverless     │   │  Free Map Tile Hosts  │
     │  Hosting + CDN   │          │  Function (Node)       │   │  OpenFreeMap · CARTO  │
     │  (SPA rewrite)   │          │  api/ai-research.js     │   │  Esri · OpenTopoMap   │
     └─────────────────┘          └───────────┬───────────┘   └──────────────────────┘
                                               │ HTTPS POST (server-side only)
                                               ▼
                                     ┌───────────────────┐
                                     │   DeepSeek API      │
                                     │ deepseek-v4-flash   │
                                     │ (Bearer key from     │
                                     │  Vercel env var)     │
                                     └───────────────────┘
```

**Key architectural principle:** the browser never talks to DeepSeek directly — the API key lives only in the serverless function's environment (`process.env.DEEPSEEK_API_KEY`), never in client-bundled code.

---

## 3. Frontend

- **Framework:** React 19 (`react`, `react-dom` ^19.2.0), function components + hooks only.
- **Build tool:** Vite 7 with `@vitejs/plugin-react` (Fast Refresh).
- **Language:** TypeScript 5.9, strict project references (`tsconfig.app.json` / `tsconfig.node.json`), path alias `@` → `src/`.
- **Styling:** Tailwind CSS 4 via `@tailwindcss/vite`. Global styles in `src/index.css`. Dark "executive/ops-center" theme (`slate-950` base, cyan/indigo accents) with full light-mode parity (see §6.1).
- **Animation:** `framer-motion` for section/element transitions.
- **Icons:** `lucide-react`.
- **Charts:** `recharts` 3.7 (SVG, `ResponsiveContainer`-wrapped).
- **Map:** `maplibre-gl` 4.7.
- **Utilities:** `clsx` for conditional classNames; `src/lib/utils.ts` for shared helpers.
- **Routing:** No routing library. Navigation is a single `activeTab` string in `App.tsx`, switched by the `Navbar`. No distinct URLs per view (see §12, Future Work).
- **State management:** Local `useState` lifted to `App.tsx` for cross-cutting state (`activeTab`, `selectedRegion`, `searchQuery`, `selectedCountryId`, theme mode), passed down as props to every consumer — this is the mechanism that keeps region filtering consistent across dashboard, map, research engine, and AI agent (see §8).
- **Custom hooks:**
  - `useAnimatedCounter.ts` — count-up animation for numeric KPIs.
  - `useInView.ts` — IntersectionObserver-based scroll-reveal.
  - `useRegionFilter.ts` — typed region context/selector helper.
  - `useTheme.ts` — light/dark/system theme resolution + persistence.

### 3.1 Application Shell (`src/App.tsx`)

Renders a persistent `PoweredByBar` (top), `Navbar`, `Footer`, and swaps the main content area between **nine** tabs:

| Tab key | Component | Purpose |
|---|---|---|
| `dashboard` | `ExecutiveDashboard` | KPIs, capex trend, regional capacity charts |
| `research` | `DeepResearchEngine` | Region/category-aware research report generator |
| `map` | `InfrastructureMap` | Interactive geospatial infrastructure map |
| `countries` | `CountryExplorer` | Filterable/searchable country registry cards |
| `projects` | `ProjectRegistrySection` | Filterable/searchable global project registry |
| `tech` | `PowerCoolingSection` | Power & cooling technology trends |
| `video` | `VideoBriefingSection` | Documentary video briefing player |
| `audit` | `AuditLogSection` | Dataset update/audit history |
| `export` | `ExportSuite` | JSON dataset download + research-prompt export |

The `AIResearchAgent` is mounted once, outside the tab switch, as a persistent floating panel (see §7).

### 3.2 UI Component Library (`src/components/ui/`)

`GlassCard` (glassmorphism panel), `Badge` (status/category pill), `SectionHeader`, `AnimatedNumber` (count-up KPI figure), `CountryModal` (country detail modal), `ThemeToggle` (3-way theme switcher).

---

## 4. Backend

**One serverless function:** `api/ai-research.js`, deployed as a Vercel Node serverless function (auto-detected from the `api/` directory convention; no separate server framework, no Express/Fastify).

```
POST /api/ai-research
Body:  { question: string, tab: string, region: string }
Reply: { answer: string, citations: [{title, source}], context: {...} }
```

**Responsibilities:**
1. Validate the request (method, body size ≤16KB, question ≤1200 chars, `tab` must be one of a known allowlist, `region` freeform).
2. Build a **registry snapshot** scoped to the requested region (top-5 capacity countries, up to 4 constrained/at-risk countries, totals).
3. Call DeepSeek with a system prompt scoping it to infrastructure/Pax Silica research, the registry snapshot, and the full `PAX_SILICA_KNOWLEDGE` object as grounding context, requesting strict JSON (`response_format: { type: 'json_object' }`).
4. Validate/parse the model's JSON; on any failure (non-200, missing content, unparsable/invalid JSON, thrown exception/timeout), **log a descriptive error** and fall back to `buildDeterministicAnswer()` — a registry-computed, template-based answer in the exact same response shape.
5. Always respond `HTTP 200` with either the live model answer or the deterministic fallback — the client never has to special-case "the AI failed."

**Configuration:**
- `export const config = { maxDuration: 30 }` — Vercel function timeout, matched to a 28s internal `AbortController` timeout on the DeepSeek `fetch` (with headroom so the platform never kills the function mid-request).
- `DEEPSEEK_API_KEY` — Vercel environment variable, read via `process.env`, never bundled client-side.

If it were absent, `callDeepSeek()` short-circuits to `null` immediately and the deterministic fallback is used — i.e., **the app is fully functional even with zero AI configuration**, just without live-model answers.

**No other backend surface exists** — no auth, no database driver, no queue, no cron. Everything else in the product (dashboard, map, exports) runs entirely client-side against the bundled static data.

---

## 5. Database / Knowledge Base

**No database.** All domain data is authored as typed TypeScript literals under `src/data/`, compiled into the JS bundle at build time. A parallel, server-side copy of the two "grounding" datasets is embedded directly in `api/ai-research.js` (duplicated intentionally, so the serverless function has zero external dependencies and zero cold-start data-fetch latency).

| File | Contents | Consumed by |
|---|---|---|
| `countryRegistry.ts` | ISO codes, region, sovereign AI status, DC capacity (MW), grid readiness (0–100), active project count — 26+ countries | Dashboard, Map, Country Explorer, Project Registry |
| `projectsRegistry.ts` | Named infrastructure projects (AI supercomputers, cloud regions, fabs, SMR nuclear, subsea cables, sovereign AI clusters, colocation DCs) with status/CapEx/capacity/confidence | Project Registry, Map (via country resolution) |
| `paxsilicaData.ts` | Structured Pax Silica reference: framework overview, capital vehicles, flagship projects (New Clark City, Panama PaxPass, Stanford Foundry School), signatory registry, risk dimensions, timeline, value chain | Available as structured reference data (client-side); mirrored server-side as `PAX_SILICA_KNOWLEDGE` in `api/ai-research.js` for agent grounding |
| `regionResearchReports.ts` | Per-region (Southeast Asia, North America, East Asia, Europe, Middle East, Global) executive summary bullets, project rows, and risk-matrix cards | `DeepResearchEngine` — the region-keyed report content (see §8) |
| `researchData.ts` | Frontier AI model benchmark data, capex trends, regional capacity figures | Dashboard charts |
| `deepResearchPrompt.ts` | `DEEP_RESEARCH_PROMPT_TEMPLATE` + `PRESET_RESEARCH_QUERIES` | Deep Research Engine, Export Suite |
| `updateAuditLog.ts` | Manually maintained dataset change log | Audit Log tab |
| `countryCoordinates.ts` | ISO alpha-3 → `[lng, lat]` centroid lookup | Map marker placement |

**Data versioning:** the AI Research Agent tags every response's `context.dataVersion` (e.g., `country-registry-2026-07-22-pax-silica-v1`), bumped whenever the registry or Pax Silica context changes, so answers are auditable to a specific dataset snapshot.

Because there is no persistence layer beyond this bundle, user interactions (filters, searches, chat messages, "research runs") are stateless client-side state and reset on page reload.

---

## 6. UI/UX Design System

- **Visual language:** Dark "executive/ops-center" aesthetic — `slate-950` base, glassmorphic `GlassCard` panels, cyan/indigo accent gradients — with full light-mode parity.
- **Layout:** Fixed top `PoweredByBar` + `Navbar` (tab switcher, region selector, autocomplete search, theme toggle) and `Footer`, centered `max-w-7xl` content column swapped per active tab.
- **Motion:** `framer-motion` fade/slide-in on mount and scroll-into-view; animated KPI counters.
- **Data density patterns:** Card grids with client-side filter/search (`CountryExplorer`, `ProjectRegistrySection`); modal drill-down (`CountryModal`); badges for status/confidence.
- **Responsiveness:** Tailwind responsive utilities throughout.

### 6.1 Theme System (Light / Dark / System)

- `useTheme.ts` reads/writes an `aethel-theme` localStorage key, resolves `'system'` via `matchMedia`, toggles a `.dark` class + `data-theme` attribute on `<html>`.
- `ThemeToggle.tsx` — 3-button Sun/Moon/Monitor control in the `Navbar`.
- A blocking inline script in `index.html` applies the resolved theme *before* the app mounts (no flash of wrong theme); defaults to **dark** when nothing is stored.
- Tailwind v4 wiring: `@custom-variant dark (&:where(.dark, .dark *));` in `src/index.css`.

### 6.2 "Powered By DocypherLabs" Attribution

Rendered in **two places**, both linking to `https://docypherlabs.com/` (`target="_blank" rel="noopener noreferrer"`):
1. **`PoweredByBar.tsx`** — a slim, always-dark strip at the very top of the app, above the `Navbar`.
2. **`Footer.tsx`** — the bottom-of-page attribution line, styled to match the top bar (uppercase, mono, amber "DocypherLabs" + muted "Research & Intelligence"), plus a second `PoweredByBar` render at the very bottom.

---

## 7. AI Model Integration

**This is a live integration** (superseding an earlier "prompt-only" design):

```
┌──────────────────┐   POST /api/ai-research      ┌───────────────────────────┐
│ AIResearchAgent   │ ────────────────────────────▶ │  Vercel Serverless          │
│ (floating panel,  │  { question, tab, region }    │  Function                  │
│  every tab)       │ ◀──────────────────────────── │  api/ai-research.js        │
└──────────────────┘   { answer, citations,         └─────────────┬─────────────┘
                          context }                                 │
                                                                     │ grounded prompt:
                                                                     │  • registry snapshot
                                                                     │    (scoped to `region`)
                                                                     │  • PAX_SILICA_KNOWLEDGE
                                                                     │  • system prompt (scope +
                                                                     │    JSON-only contract)
                                                                     ▼
                                                          ┌────────────────────┐
                                                          │   DeepSeek API      │
                                                          │  deepseek-v4-flash  │
                                                          │  response_format:   │
                                                          │  json_object        │
                                                          └─────────┬──────────┘
                                                                    │
                                       success: parsed {answer,     │  failure (any reason):
                                       citations} ──────────────────┼──────────────────────┐
                                                                    │                       ▼
                                                                    │            buildDeterministicAnswer()
                                                                    │            (registry-computed template,
                                                                    ▼             same response shape)
                                                          HTTP 200 JSON response (always)
```

- **Scope enforcement:** the system prompt explicitly restricts the agent to "risk, hazard/infrastructure, historical/geopolitical, and resilience/preparedness"-style questions grounded in the supplied registry + Pax Silica context — it is told not to invent live external facts and to always return `{answer, citations}`.
- **Grounding data:** a per-request registry snapshot (top-capacity + constrained countries for the selected region) plus the full Pax Silica knowledge object (capital vehicles, flagship projects, risk profile, value chain, key countries) are serialized directly into the user message sent to DeepSeek.
- **Reliability engineering:**
  - `AbortController` with a 28s timeout, matched to a Vercel `maxDuration: 30` config, so the platform's own function timeout never fires before the internal one.
  - `max_tokens: 1600` with an explicit "keep answer under 250 words" instruction — raised from an original 900 after production logs showed DeepSeek's strict-JSON output being truncated mid-object at the smaller budget, causing `JSON.parse` failures and silent fallback.
  - Every failure branch (non-200 response, missing `message.content`, JSON parse/validation failure, thrown exception) is logged as a single descriptive string via `console.error`, so `vercel logs` shows the real cause instead of a generic "it fell back" signal.
- **Client resilience:** the chat panel always renders *something* — a real model answer or the deterministic fallback — and only shows a distinct error state if the HTTP request itself fails outright (network error, non-JSON 5xx from the platform).
- **Reference/benchmark data:** `researchData.ts` still contains static, pre-authored benchmark entries *about* AI models (e.g., frontier model SWE-bench-style scores) used purely as dashboard chart content — these are reference data points, not live model calls, and are unrelated to the DeepSeek integration above.

---

## 8. Region Filter Propagation (Cross-Feature State Sync)

This is the platform's most important cross-cutting mechanism and the subject of a dedicated regression fix.

```
                         ┌───────────────────────────────┐
                         │           App.tsx              │
                         │  useState: selectedRegion       │
                         └───────┬───────────┬────────────┘
                 (prop)          │           │          (prop)
        ┌────────────────────────┘           └─────────────────────────┐
        ▼                                                                ▼
┌───────────────┐  ┌───────────────┐  ┌────────────────┐  ┌────────────────────┐
│ Executive      │  │ Infrastructure│  │ DeepResearch    │  │ AIResearchAgent      │
│ Dashboard       │  │ Map           │  │ Engine          │  │                      │
│                 │  │               │  │                 │  │                      │
│ regional        │  │ marker filter │  │ useEffect syncs │  │ contextLabel =        │
│ capacity chart  │  │               │  │ local region +  │  │ `${region} • ${tab}`  │
│ filtered        │  │               │  │ default query;  │  │ sent as `region` in   │
│                 │  │               │  │ getRegionReport │  │ POST body → scopes    │
│                 │  │               │  │ (region) drives │  │ server-side registry  │
│                 │  │               │  │ rendered report │  │ snapshot              │
└───────────────┘  └───────────────┘  └────────────────┘  └────────────────────┘
```

**Root cause of the regression this design fixes:** `DeepResearchEngine` originally held its own default (`'Southeast Asia'`) `useState` with no prop wired from `App.tsx`, and its rendered report (summary, project table, risk matrix) was **hardcoded JSX**, not derived from any state at all — so selecting "North America" in the navbar updated the query *text* but the underlying report content never changed.

**Fix, in two layers:**
1. `DeepResearchEngine` now accepts `selectedRegion` as a prop, mirrors it into local state via `useEffect`, and regenerates its default query text on change.
2. The rendered report itself is looked up via `getRegionReport(reportRegion)` from `regionResearchReports.ts` — a `Record<string, RegionReport>` keyed by region name — instead of being inlined JSX. `reportRegion`/`reportCategory` are captured *at the moment "Execute Deep Research" is clicked* (or on an external region change before first execution), so the displayed report is always a faithful, stable snapshot of what was actually requested.

The same `selectedRegion` prop flows unchanged into `InfrastructureMap`, `CountryExplorer`, and `ProjectRegistrySection` (pre-existing, unaffected by this fix), and into `AIResearchAgent`, where it is both displayed (`Context: {region} • {tab}`) and transmitted to `/api/ai-research` to scope the server-side registry snapshot.

---

## 9. Chart Types Used

All charts render with **Recharts 3.7** (`ResponsiveContainer`-wrapped SVG), dark/light-theme aware:

| Chart type | Recharts components | Location | Purpose |
|---|---|---|---|
| Area chart | `AreaChart`, `Area`, `XAxis`, `YAxis`, `Tooltip` | `ExecutiveDashboard.tsx` | Global AI infrastructure CapEx trend (2022–2026E) |
| Horizontal bar chart | `BarChart` (`layout="vertical"`), `Bar`, `Cell` | `ExecutiveDashboard.tsx` | Regional data center capacity comparison, per-bar coloring |
| Horizontal bar chart | `BarChart` (`layout="vertical"`), `Bar`, `Cell` | `AgenticSection.tsx` | Agentic coding / model benchmark comparison |
| Line chart | `LineChart`, `Line`, `XAxis`, `YAxis`, `Tooltip` | `SustainabilitySection.tsx` | Efficiency/sustainability metric trend |

---

## 10. Map Integration

The **Global Map** tab (`src/components/map/InfrastructureMap.tsx`) is built on **MapLibre GL JS**, with all tile sources free and tokenless.

```
┌──────────────────────────────────────────────────────────────────┐
│                     InfrastructureMap.tsx                         │
│                                                                    │
│  countryCoordinates.ts ──┐                                        │
│  (ISO alpha-3 → lng/lat) │                                        │
│                           ▼                                        │
│  COUNTRY_REGISTRY  ──▶  join  ──▶  maplibregl.Marker per country   │
│                                     │                              │
│                    ┌────────────────┼─────────────────┐            │
│                    ▼                ▼                 ▼            │
│              Status Overlay   Capacity Overlay   Click → CountryModal│
│              (color = policy  (size = MW,        + camera flyTo     │
│               status)          sqrt-scaled)        (cross-tab sync) │
└──────────────────────────────────────────────────────────────────┘
```

**Basemap styles** (`src/components/map/mapStyles.ts`, switched via `MapViewSelector.tsx`):

| View | Source | Type |
|---|---|---|
| Standard | OpenFreeMap "Liberty" | vector (supports 3D buildings) |
| Light | OpenFreeMap "Positron" | vector (supports 3D buildings) |
| Dark | CARTO `dark_all` | raster |
| Satellite | Esri World Imagery | raster |
| Terrain | OpenTopoMap | raster |
| Hybrid | Esri World Imagery + Esri World Boundaries & Places | two stacked raster layers |

**Features:**
- **2D / 3D Immersive toggle** — re-configures the same map instance (`pitch`/`bearing` ease + `fill-extrusion` "3d-buildings" layer, city-zoom only), no second map/data source.
- **Cross-tab selection sync** — a shared `selectedCountryId` (lifted in `App.tsx`) is set from `CountryExplorer`, `ProjectRegistrySection`, or the map itself; the map flies the camera to and highlights whichever country is currently selected, regardless of origin tab.
- **Failure handling** — `try/catch` around map construction + a scoped `error` handler (`!map.isStyleLoaded()` guard) sets a `mapFailed` fallback UI only for genuine load failures, not transient single-tile errors.
- **Security:** MapLibre popups are built from DOM nodes with `textContent` assignment only — never `innerHTML`/`setHTML` — so registry data can never inject markup.

---

## 11. Video Briefing Integration

`src/components/sections/VideoBriefingSection.tsx` — a dedicated `video` tab hosting a documentary-style briefing ("Architecting the Silicon Divide").

- **Asset location:** `public/media/architecting-the-silicon-divide.mp4`, served as a static file by Vercel's CDN (no transcoding/streaming service).
- **Player:** native HTML5 `<video controls preload="metadata" playsInline>` — no external player library.
- **Range-request support:** verified the asset responds to `HTTP Range` requests (`206 Partial Content`), which is required for seek/scrub to work in-browser.
- **Navigation:** a dedicated nav item (clapperboard icon) in `Navbar.tsx`'s `navItems` array, rendered like any other tab in `App.tsx`.

---

## 12. Global Search (Navbar Autocomplete)

`Navbar.tsx` includes an enhanced search box backed by a local `COUNTRIES_LOCATIONS` list (29 countries/notable locations, each with `{ name, region, code }`):

- Real-time, client-side filtering (`useMemo`) as the user types, matching against name, region, or ISO code (case-insensitive substring match), capped to 8 suggestions.
- Dropdown renders below the input; selecting a suggestion sets `searchQuery` **and** `selectedRegion` (the suggestion's region), immediately propagating through the same region-filter mechanism described in §8.
- `onBlur` closes the dropdown with a short delay so a suggestion click registers before the blur handler fires.

---

## 13. Data Flow Summary

```
Static TS data modules (src/data/*.ts)
        │  (imported directly, no fetch — dashboard/map/explorer/registry/export)
        ▼
Section components, scoped by shared App.tsx state
 (selectedRegion, searchQuery, selectedCountryId, activeTab)
        │
        ├─▶ Recharts (SVG) render  /  Card & table render  /  Modal detail render
        │
        └─▶ AI Research Agent — the one path that leaves the client:
                fetch('/api/ai-research', { question, tab, region })
                        │
                        ▼
                Vercel serverless function
                        │  (registry snapshot + Pax Silica context → DeepSeek)
                        ▼
                DeepSeek API  →  strict JSON  →  validated  →  HTTP 200 response
                        (or deterministic fallback on any failure, same shape)
```

Two additional **client-side-only** output paths:
1. **Clipboard export** — `DeepResearchEngine` / `ExportSuite` build a text prompt string, copied via `navigator.clipboard.writeText`.
2. **File download** — `ExportSuite` serializes the country + project registry to JSON via `Blob` + a temporary `<a download>` element.

---

## 14. Build & Deployment

- **Build:** `tsc -b && vite build` → static assets emitted to `dist/`, including the `api/` directory auto-detected by Vercel as serverless functions.
- **Hosting:** Vercel — `vercel.json` sets `framework: vite`, `outputDirectory: dist`, and a catch-all rewrite `/(.*) → /index.html` so client-side tab state survives a hard refresh/deep link at `/`.
- **Serverless function config:** `api/ai-research.js` exports `config = { maxDuration: 30 }`.
- **Environment variables:** `DEEPSEEK_API_KEY` (required for live AI answers; app degrades gracefully to deterministic answers if unset). No other secrets required.
- **Linting:** ESLint 9 flat config (`eslint.config.js`) with `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.
- **Static assets:** `public/media/*.mp4` copied as-is into the build output and served from the CDN.

---

## 15. Notable Gaps / Next Steps

1. **Live data pipeline** — move `src/data/*.ts` behind a real data API/CMS so the dataset can update without a redeploy (would also let the serverless function fetch a single shared source instead of maintaining its own embedded copy).
2. **Multi-provider LLM failover** — allow `/api/ai-research` to fail over to a second provider if DeepSeek is degraded, rather than only falling back to the deterministic template.
3. **Choropleth map layer** — area-based (not just point-marker) encoding of country status/capacity via a TopoJSON world layer.
4. **URL-based routing** — introduce React Router so tabs/regions are deep-linkable and shareable.
5. **Persistence** — persist user filter/search state and chat history beyond a single page session.
6. **Dead code cleanup** — `HeroHeader.tsx`, `RegulatorySection.tsx`, `SustainabilitySection.tsx`, `AgenticSection.tsx`, `TrilemmaSection.tsx`, `ExecutiveSummary.tsx`, `InfrastructureSection.tsx` are not imported anywhere in `App.tsx` and appear to be leftover scaffolding from an earlier design pass; safe to delete once confirmed unneeded.
7. **Video library** — the Video Briefing tab currently hosts a single asset; a searchable multi-video library is a natural extension.

---

## 16. Development Tooling & Engineering Workflow

The application code (React/TypeScript frontend, Vercel serverless function, static knowledge base) is the runtime tech stack. Separately, the following tools make up the **engineering/delivery stack** used to build, debug, and ship this platform:

| Tool | Purpose in this project |
|---|---|
| **Claude Code (Desktop / CLI)** | Primary agentic coding tool — used for feature implementation (region-filter fix, AI Research Agent integration, map/video/search features), production debugging (diagnosed the DeepSeek token-truncation bug in `api/ai-research.js` §7 via live `vercel logs` inspection), and direct `vercel --prod` deployments from the working tree. |
| **Antigravity CLI** | Agentic build/orchestration tooling used alongside Claude Code during iterative feature development. |
| **OpenAI ChatGPT Codex** | Independent code-review pass on generated diffs — a second-opinion review layer distinct from the implementing agent, used before/after production deploys. |
| **Vercel CLI** (`vercel`) | Deployment (`vercel --prod`), environment variable inspection (`vercel env ls` / `vercel env pull`), and production log streaming (`vercel logs`) — the log-streaming step was the deciding diagnostic in root-causing the AI Research Agent's intermittent fallback (§7). |
| **Git / GitHub** | Version control and the canonical repository (`Kaiserzanmato/agentic-cloud-datacenter-hub`) that Vercel deploys are traceable back to. |

**Diagnostic methodology note:** the DeepSeek reliability fix in §7 was not a guess-and-check exercise — it followed a repeatable loop of (1) reproduce the failure against the *live* production endpoint with repeated `curl` calls, (2) add single-string `console.error` logging to every failure branch, (3) redeploy, (4) reproduce again and pull the real error text via `vercel logs --json`, (5) fix the identified root cause (token budget), (6) redeploy and re-verify with another batch of live requests. The same loop (change → deploy → verify against production, not just `npm run build`) was used for the region-filter fix in §8.
