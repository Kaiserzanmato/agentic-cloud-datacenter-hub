# Technical Architecture Documentation
## Aethel — Global AI, Cloud, Data Center & Digital Infrastructure Intelligence Platform

---

## 1. Executive Summary

Aethel is a client-side intelligence dashboard that visualizes the global build-out of AI infrastructure — data centers, sovereign AI clusters, cloud regions, semiconductor fabs, SMR nuclear power, and subsea cables. It presents curated research data (country readiness scores, project registries, frontier AI model benchmarks, power/cooling trends, and regulatory posture) through an executive-style dashboard with charts, filterable registries, and an audit trail.

The application is a **single-page application (SPA)** with no server-side runtime of its own: all data is bundled at build time as static TypeScript modules, and all "research" and "export" features operate on that in-memory dataset in the browser. There is no database, no custom backend API, and no live third-party AI model integration — the "Deep Research Engine" and "Export Suite" simulate/prepare research workflows (a progress sequence and a copyable/downloadable prompt or JSON payload) rather than calling an LLM API directly.

| Aspect | Summary |
|---|---|
| Type | Static SPA (Vite + React), deployed to Vercel |
| Backend | None — no server, no API routes |
| Database | None — data is hard-coded TypeScript modules bundled into the client |
| AI integration | None (live); the UI generates a research prompt intended to be pasted into an external LLM (Claude, GPT, Gemini) |
| Map integration | MapLibre GL JS + free OpenFreeMap "Liberty" tiles — interactive world map with a country-status/capacity overlay |
| Hosting | Vercel (SPA rewrite to `index.html`) |

---

## 2. Full-Stack Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                     │
│                                                           │
│  React 19 SPA (Vite build)                               │
│  ├─ App.tsx (tab-based router, no URL routing library)   │
│  ├─ Layout: Navbar                                        │
│  ├─ Sections (feature views, tab-switched)                │
│  ├─ UI primitives (GlassCard, Badge, AnimatedNumber, ...) │
│  ├─ Hooks (state helpers: filters, animated counters)     │
│  ├─ Static data modules (TypeScript arrays/objects)       │
│  ├─ Recharts (SVG chart rendering, in-browser only)       │
│  └─ MapLibre GL (WebGL map, free OpenFreeMap tiles)       │
│                                                           │
└───────────────────────┬───────────────────────────────────┘
                         │ static asset fetch (HTML/JS/CSS)
                         ▼
                 ┌───────────────┐
                 │    Vercel     │  (static hosting + SPA rewrite)
                 └───────────────┘
```

There is no client → server → database round trip anywhere in the app. Every interaction (filtering, searching, tab switching, "running" research, exporting) is computed from data already present in the JS bundle.

---

## 3. Frontend

- **Framework:** React 19 (`react`, `react-dom` ^19.2.0), function components + hooks only (no class components).
- **Build tool:** Vite 7, with `@vitejs/plugin-react` for Fast Refresh.
- **Language:** TypeScript 5.9 (strict project references: `tsconfig.app.json` / `tsconfig.node.json`), path alias `@` → `src/`.
- **Styling:** Tailwind CSS 4 via `@tailwindcss/vite` (no separate PostCSS config file — Tailwind is wired directly into the Vite plugin pipeline). Global styles in `src/index.css`; component classNames use utility-first Tailwind (dark theme: `slate-950` background, `cyan`/`indigo` accent palette).
- **Animation:** `framer-motion` for section/element transitions and micro-interactions.
- **Icons:** `lucide-react`.
- **Utilities:** `clsx` for conditional className composition; `src/lib/utils.ts` houses shared helpers.
- **Routing:** No routing library (no React Router). Navigation is a single `activeTab` string state in `App.tsx`, toggled by the `Navbar`, which conditionally renders one of the section components. There are no distinct URLs per view — the entire app lives at `/`.
- **State management:** Local component state (`useState`) lifted to `App.tsx` for cross-cutting concerns (`activeTab`, `selectedRegion`, `searchQuery`), passed down as props. A lightweight React Context (`useRegionFilter.ts`) defines a region-filter shape but is not wired to a `Provider` at the app root — region filtering in practice flows through props from `App.tsx`. No Redux/Zustand/Jotai or other global store.
- **Custom hooks:**
  - `useAnimatedCounter.ts` — animates numeric KPI values counting up on mount/in-view.
  - `useInView.ts` — IntersectionObserver-based visibility detection for scroll-triggered animations.
  - `useRegionFilter.ts` — typed region context/selector helper.

### Application shell (`src/App.tsx`)

Renders a persistent `Navbar` and `Footer`, and swaps the main content area between seven tabs:

| Tab key | Component | Purpose |
|---|---|---|
| `dashboard` | `ExecutiveDashboard` | KPIs, capex trend, regional capacity charts, executive summary |
| `research` | `DeepResearchEngine` | Configurable "research run" simulation + prompt generation |
| `countries` | `CountryExplorer` | Filterable/searchable country registry cards |
| `projects` | `ProjectRegistrySection` | Filterable/searchable global infrastructure project registry |
| `tech` | `PowerCoolingSection` | Power & cooling technology trends |
| `audit` | `AuditLogSection` | Dataset update/audit history |
| `export` | `ExportSuite` | JSON dataset download + research-prompt export |

Additional section components (`AgenticSection`, `ExecutiveSummary`, `InfrastructureSection`, `KPICards`, `RegulatorySection`, `SustainabilitySection`, `TrilemmaSection`) are composed inside the tabs above (primarily inside `ExecutiveDashboard`) rather than being top-level tabs themselves.

### UI component library (`src/components/ui/`)

Small presentational primitives shared across sections: `GlassCard` (glassmorphism panel wrapper), `Badge` (status/category pill), `SectionHeader`, `AnimatedNumber` (count-up KPI figure), `CountryModal` (detail modal for a selected country).

---

## 4. Backend

**There is no backend.** The project contains no server framework, no API route handlers, no authentication layer, and no server-side rendering. `package.json` scripts are limited to `dev` (Vite dev server), `build` (`tsc -b && vite build`), `lint`, and `preview`. All "actions" in the UI (running research, exporting data, copying prompts) execute entirely client-side using browser APIs (`navigator.clipboard`, `Blob` + `URL.createObjectURL` for file downloads).

If a real backend were added later, the natural seams are:
- Replacing the static `src/data/*.ts` modules with fetch calls to a data API.
- Wiring `DeepResearchEngine`'s "Run Research" action to an actual LLM API call instead of a local `setInterval`-based progress simulation.

---

## 5. Database

**None.** All domain data is authored directly as typed TypeScript literals under `src/data/`, compiled into the JS bundle at build time:

| File | Contents |
|---|---|
| `countryRegistry.ts` | `CountryRegistryItem[]` — ISO 3166 codes, region, sovereign-AI-policy status, data center capacity (MW), grid readiness score (0–100), active project count |
| `projectsRegistry.ts` | `GlobalProjectItem[]` — named infrastructure projects (AI supercomputers, cloud regions, semiconductor fabs, SMR nuclear, subsea cables, sovereign AI clusters, colocation DCs), with status, investment value, capacity, benefits/risks, sources, confidence rating |
| `researchData.ts` | Frontier AI model benchmark data, capex trends, regional capacity figures, and other dashboard/chart datasets |
| `deepResearchPrompt.ts` | `DEEP_RESEARCH_PROMPT_TEMPLATE` and `PRESET_RESEARCH_QUERIES` — the reusable prompt template surfaced by the Deep Research Engine and Export Suite |
| `updateAuditLog.ts` | Manually maintained change log entries shown in the Audit Log tab |
| `countryCoordinates.ts` | `[lng, lat]` centroid lookup keyed by ISO alpha-3, used only to place map markers |

Because there is no persistence layer, any user interaction (filters, searches, "research runs") is stateless and resets on page reload — nothing is written back to storage.

---

## 6. UI/UX Design System

- **Visual language:** Dark, "executive/ops-center" aesthetic — `slate-950` base background, glassmorphic cards (`GlassCard`) with translucent borders/backdrop blur, cyan/indigo accent gradients for emphasis and selection states.
- **Layout:** Fixed top `Navbar` (tab switcher + region selector + search) and `Footer`, with a centered `max-w-7xl` content column that swaps per active tab.
- **Motion:** `framer-motion` drives fade/slide-in transitions on section mount and on scroll-into-view (via `useInView`), plus animated KPI counters (`useAnimatedCounter`, `AnimatedNumber`) that count up from 0 to their target value.
- **Data density patterns:** Card grids for countries/projects (`CountryExplorer`, `ProjectRegistrySection`) with client-side filter/search; a modal (`CountryModal`) for drill-down detail; badges (`Badge`) for status/category/confidence tagging (e.g., Operational/Under Construction/Announced, High/Medium/Low confidence).
- **Responsiveness:** Tailwind responsive utility classes (`sm:`, `lg:`) throughout; grid/card layouts reflow for mobile.
- **Accessibility considerations:** Semantic headings via `SectionHeader`, icon+label pairing (`lucide-react`) rather than icon-only controls, `selection:` theme styling defined at the app root.

### 6.1 Theme System (Light / Dark / System)

The app now ships a real three-way theme switcher rather than a fixed dark palette:

- **`src/hooks/useTheme.ts`** — reads/writes a `aethel-theme` localStorage key (`'light' | 'dark' | 'system'`), resolves `'system'` via `matchMedia('(prefers-color-scheme: dark)')` (with a live listener for OS-level changes), and toggles a `.dark` class + `data-theme` attribute on `<html>`.
- **`src/components/ui/ThemeToggle.tsx`** — a 3-button Sun/Moon/Monitor control in the `Navbar`, wired to the hook via props from `App.tsx`.
- **`index.html`** contains a small blocking inline script that applies the resolved theme *before* the app mounts, so there is no flash of the wrong theme on load.
- **Tailwind v4 wiring:** `src/index.css` declares `@custom-variant dark (&:where(.dark, .dark *));` so every `dark:` utility in the codebase is gated by the `.dark` class (set by the hook/script above) rather than the OS media query directly — the `system` option is implemented in JS instead, giving the toggle explicit control.
- **Regression safeguard:** when no preference is stored, the resolved theme defaults to **`dark`** — the app's original fixed appearance — so existing users see zero visual change until they explicitly pick Light or System.
- **Coverage:** every component actually rendered by the app (the app shell, `Navbar`, `Footer`, `GlassCard`, `CountryModal`, `ExecutiveDashboard`, `DeepResearchEngine`, `InfrastructureMap`, `CountryExplorer`, `ProjectRegistrySection`, `PowerCoolingSection`, `AuditLogSection`, `ExportSuite`) has paired light/dark Tailwind classes for backgrounds, borders, and text. A handful of unused/orphaned components under `src/components/sections/` (`HeroHeader`, `RegulatorySection`, `SustainabilitySection`, `AgenticSection`, `TrilemmaSection`, `ExecutiveSummary`, `InfrastructureSection`) are not imported anywhere in `App.tsx` and were left as-is — see §12 for a note on this dead code.

---

## 7. AI Model Integration

There is **no live AI/LLM API call** in the codebase (no `fetch`/`axios` requests to OpenAI, Anthropic, or any inference endpoint, and no API keys are present or required).

What exists instead:
- **`DeepResearchEngine.tsx`** simulates a multi-step "agentic research run" (`steps` array: registry load → source query → dual-source verification → confidence scoring/report generation) using a client-side `setInterval` to progress a UI state machine — it is a UX demonstration of the intended workflow, not an actual agent execution.
- **`deepResearchPrompt.ts` / `ExportSuite.tsx`** assemble a structured **research prompt** (region, focus category, user instruction, confidence threshold) that the user copies via `navigator.clipboard` for manual use in an external LLM chat (the UI explicitly references "Gemini Flash, Claude Sonnet, or GPT models" as the intended destination).
- **`researchData.ts`** contains static, pre-authored benchmark entries *about* AI models (e.g., GPT-5.3 Codex, Claude Opus/Sonnet variants, SWE-bench-style scores) used purely as chart/table content — these are reference data points, not live model outputs.

In short: the platform's "AI" surface today is a prompt-engineering aid and a research-content viewer, not an integrated inference pipeline.

---

## 8. Chart Types Used

All charts are rendered with **Recharts 3.7** (`ResponsiveContainer`-wrapped SVG charts), consistently styled dark-theme:

| Chart type | Recharts components | Location | Purpose |
|---|---|---|---|
| Area chart | `AreaChart`, `Area`, `XAxis`, `YAxis`, `Tooltip` | `ExecutiveDashboard.tsx` | Global AI infrastructure capex trend over time |
| Horizontal bar chart | `BarChart` (`layout="vertical"`), `Bar`, `Cell` | `ExecutiveDashboard.tsx` | Regional data center capacity comparison (per-bar coloring via `Cell`) |
| Horizontal bar chart | `BarChart` (`layout="vertical"`), `Bar`, `Cell` | `AgenticSection.tsx` | SWE-bench / agentic coding benchmark comparison across models, with leader highlighting |
| Line chart | `LineChart`, `Line`, `XAxis`, `YAxis`, `Tooltip` | `SustainabilitySection.tsx` | Sustainability/efficiency metric trend (e.g., PUE or renewable-mix trend over time) |

All charts share `ResponsiveContainer` for fluid width and custom `Tooltip`/axis styling consistent with the dark glassmorphic theme; categorical emphasis (e.g., "leader" vs. others) is done via per-`Cell` fill colors rather than a chart-level color scale.

---

## 9. Map Integration

The platform includes an interactive **Global Map** tab (`src/components/map/InfrastructureMap.tsx`) built on **MapLibre GL JS** against the free, tokenless **OpenFreeMap "Liberty"** vector tile style (`https://tiles.openfreemap.org/styles/liberty`) — no Mapbox account or API key required, consistent with the free-stack pattern used in other DocypherLabs dashboards reviewed for this integration.

**Architecture:**
- `src/data/countryCoordinates.ts` — a `[lng, lat]` centroid lookup keyed by ISO alpha-3, joined against `COUNTRY_REGISTRY` at render time. No new data source or backend was introduced; the map is purely a new visualization of existing static registry data.
- `src/components/map/statusStyle.ts` — shared color scale for `sovereignAiStatus` (`Active Strategy`, `Developing Policy`, `Emerging Hub`, `Constrained`, `Baseline`) and a `capacityToRadius()` helper that scales marker size by `dataCenterCapacityMW` (sqrt-scaled so marker *area*, not radius, tracks capacity).
- `src/components/map/InfrastructureMap.tsx` — owns map lifecycle (`useEffect` init/cleanup — markers, popups, and the `maplibregl.Map` instance are all removed on unmount), builds a `maplibregl.Marker` per visible country, and re-renders markers whenever the shared `selectedRegion` / `searchQuery` props (same state lifted in `App.tsx` that drives `CountryExplorer` and `ProjectRegistrySection`) or the overlay mode change.

**Overlay modes** (toggle buttons above the map):
1. **Status Overlay** (default) — marker color encodes `sovereignAiStatus`; a legend renders bottom-left.
2. **Capacity Overlay** — marker size encodes `dataCenterCapacityMW`; a legend note replaces the status key.

**Interaction:** clicking a marker opens the existing `CountryModal` (the same detail modal used by `CountryExplorer`) — no duplicate UI was built for country detail. Hovering/clicking also surfaces a MapLibre `Popup` built entirely from DOM nodes with `textContent` assignments (never `innerHTML`/`setHTML`), avoiding any injection risk from registry data.

**Failure handling:** a `try/catch` around map construction plus a `map.on('error', ...)` handler sets a `mapFailed` state that swaps the canvas for a plain "tiles unavailable" message, so a tile-host outage degrades gracefully instead of leaving a blank or broken map.

### 9.1 Cross-Tab Selection Sync

A country/location selection made in one tab now drives the map's overlay state, not just its own local UI:

- `App.tsx` lifts a single `selectedCountryId` / `setSelectedCountryId` pair alongside the existing `selectedRegion`/`searchQuery` state, and passes it to `InfrastructureMap`, `CountryExplorer`, and `ProjectRegistrySection`.
- **`CountryExplorer`** calls `onSelectCountry(id)` when a country card is clicked (in addition to opening its own modal), and rings the currently-selected card (`ring-2 ring-cyan-500/70`) so the active selection is visible in the grid too.
- **`ProjectRegistrySection`** resolves each project's free-text `country` field to a registry id via a `COUNTRY_NAME_TO_ID` lookup (built once from `COUNTRY_REGISTRY`) and renders the country name as a clickable button when a match exists, calling `onSelectCountry(id)`.
- **`InfrastructureMap`** reacts to an externally-changed `selectedCountryId` in a dedicated `useEffect`: it flies the camera to that country's coordinates (`map.flyTo`) and opens its popup, and the marker-rendering effect also depends on `selectedCountryId` so the focused marker gets a highlighted ring/glow regardless of whether the selection came from this component or another tab.
- The whole flow is wrapped in `try/catch` so a missing coordinate or an in-flight map never throws — selection sync is strictly additive and cannot break the existing per-tab filtering.

### 9.2 3D Immersive View (Open-Source, Same Data)

A **"3D Immersive" / "2D View"** toggle lives next to the overlay-mode buttons. It does not create a second map or a second data source — it re-configures the *same* `maplibregl.Map` instance and the *same* marker set already used by the 2D overlay, which is what keeps the two views permanently in sync (there is no separate state to drift):

- Toggling on calls `map.easeTo({ pitch: 55, bearing: -17 })` and conditionally adds a `fill-extrusion` layer (`3d-buildings`) sourced from the vector tile style's own `openmaptiles` building layer — guarded by `map.getLayer(...)` / `map.getSource(...)` checks so re-toggling never throws a duplicate-layer error.
- Toggling off eases the camera back to `pitch: 0, bearing: 0` and removes the layer if present.
- Buildings only render at city-level zoom (`minzoom: 13`); at the default world view the visible effect is the tilted/rotated camera, with a small helper note in the UI explaining this.
- Everything is wrapped in `try/catch` and defaults to **off** (2D) on first load, so the original map experience is unchanged unless a user opts in — the regression safeguard requested for this feature.

**Not included (future extension):** choropleth country-shape fills (would need a TopoJSON world layer + `react-simple-maps`/`visx`), animated pulsing hotspots, or per-region camera presets — present in the reference DocypherLabs map implementations reviewed but out of scope for this pass.

---

## 10. Data Flow Summary

```
Static TS data modules (src/data/*.ts)
        │  (imported directly, no fetch)
        ▼
Section components (ExecutiveDashboard, CountryExplorer, ProjectRegistrySection, ...)
        │  (props: selectedRegion, searchQuery from App.tsx state)
        ▼
Client-side filter/search/aggregation (Array.filter/reduce in component or hook)
        │
        ▼
Recharts (SVG) render  /  Card & table render  /  Modal detail render
```

Two "output" paths exist, both client-side only:
1. **Clipboard export** — `DeepResearchEngine` / `ExportSuite` build a text prompt string and copy it via `navigator.clipboard.writeText`.
2. **File download** — `ExportSuite` serializes `COUNTRY_REGISTRY` + `GLOBAL_PROJECTS_REGISTRY` to JSON via `Blob` + a temporary `<a download>` element (`global_infrastructure_intelligence_2026.json`).

---

## 11. Build & Deployment

- **Build:** `tsc -b && vite build` → static assets emitted to `dist/`.
- **Hosting:** Vercel, configured via `vercel.json` (`framework: vite`, `outputDirectory: dist`, catch-all rewrite `/(.*) → /index.html` for client-side tab state to survive a hard refresh/deep link at `/`).
- **Linting:** ESLint 9 flat config (`eslint.config.js`) with `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.
- **No environment variables / secrets** are required or referenced — the app ships as a fully static bundle.

---

## 12. Notable Gaps / Next Steps (if evolving this into a full stack product)

1. **Backend + database** — move `src/data/*.ts` into a real data store (Postgres, or a headless CMS) behind an API, so the dataset can be updated without a redeploy.
2. **Live AI integration** — connect `DeepResearchEngine` to an actual LLM API call (e.g., Claude) instead of the simulated `setInterval` progress, with the existing prompt template as the system/user prompt.
3. **Map visualization enhancements** — the marker/overlay map is now live (§9); a choropleth country-fill layer (TopoJSON + `react-simple-maps`/`visx`) remains a reasonable follow-up for area-based (rather than point-based) encoding of `sovereignAiStatus`/capacity.
4. **Routing** — introduce URL-based routing (e.g., React Router) so tabs are deep-linkable and shareable.
5. **Persistence** — persist user filter/search state and audit log entries beyond a single page session.
6. **Dead code cleanup** — `HeroHeader.tsx`, `RegulatorySection.tsx`, `SustainabilitySection.tsx`, `AgenticSection.tsx`, `TrilemmaSection.tsx`, `ExecutiveSummary.tsx`, `InfrastructureSection.tsx`, `Badge.tsx`, and `SectionHeader.tsx` are not imported anywhere in `App.tsx` and appear to be leftover scaffolding from an earlier design pass; safe to delete once confirmed unneeded.
