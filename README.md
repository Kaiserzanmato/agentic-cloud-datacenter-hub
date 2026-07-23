# Aethel Global — AI, Cloud & Data Center Infrastructure Intelligence Platform

**Live:** https://agentic-cloud-datacenter-hub.vercel.app

An executive intelligence platform tracking the global AI infrastructure build-out — hyperscale data centers, sovereign AI clusters, semiconductor fabs, SMR nuclear power, subsea cables — and the geopolitical coordination framework around it (*Pax Silica*). It combines a curated, versioned dataset with an interactive map, a region-aware Deep Research report generator, a grounded conversational AI Research Agent, and a documentary video briefing, all filterable by a single global region selector.

> Powered by [DocypherLabs](https://docypherlabs.com/) — Research & Intelligence

---

## Documentation

| Document | Purpose |
|---|---|
| [`PRD.md`](./PRD.md) | Product Requirements Document — problem statement, goals, features, functional/non-functional requirements, success metrics |
| [`TECHNICAL_ARCHITECTURE.md`](./TECHNICAL_ARCHITECTURE.md) | Full technical architecture — frontend, backend, knowledge base, AI model integration, map integration, data flow, deployment |

---

## Features

- **Executive Dashboard** — hyperscaler CapEx, global data center power, liquid cooling adoption, and regional capacity charts.
- **AI Deep Research Engine** — configurable region + infrastructure-focus report generator producing a region-specific executive summary, project registry excerpt, and risk matrix.
- **AI Research Agent** — a persistent chat panel grounded in the platform's own country registry and Pax Silica knowledge base (via DeepSeek), with citations and a deterministic fallback if the model call fails.
- **Global Map** — MapLibre GL-powered interactive world map with 6 free basemap styles (Standard, Light, Dark, Satellite, Terrain, Hybrid), status/capacity overlays, and a 2D/3D toggle.
- **Country Explorer** & **Project Registry** — filterable, searchable card grids with detail modals, all synced to the same region/country selection state as the map.
- **Video Briefing** — a dedicated tab hosting a documentary-style briefing video with native HTML5 playback.
- **Report Audit Log** & **Export Suite** — dataset change history, plus one-click JSON export and research-prompt clipboard export.
- **Global search** — autocomplete across countries, regions, and locations from the navbar.
- **Light / Dark / System theming** with no flash-of-wrong-theme on load.

---

## Tech Stack

**Frontend:** React 19 + TypeScript, Vite 7, Tailwind CSS 4, Framer Motion, Recharts, MapLibre GL JS, Lucide icons.

**Backend:** One Vercel serverless function (`api/ai-research.js`) that calls the DeepSeek API (`deepseek-v4-flash`), grounded in the platform's static registry + Pax Silica knowledge base, with a deterministic same-shape fallback on any failure.

**Data:** No database — all domain data is versioned, typed TypeScript modules under `src/data/`, bundled at build time.

**Hosting:** Vercel (static build output + one serverless function).

See [`TECHNICAL_ARCHITECTURE.md`](./TECHNICAL_ARCHITECTURE.md) for the full architecture diagrams and data flow.

---

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `DEEPSEEK_API_KEY` | Optional | Enables live AI Research Agent answers via DeepSeek. Without it, the agent still works, falling back to deterministic, registry-computed answers. |

Set it locally in a `.env` file (not committed) or via `vercel env add` for the deployed environment.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

### Deployment

The project deploys to Vercel. From the project root:

```bash
vercel --prod
```

`vercel.json` configures the Vite framework preset, `dist` as the output directory, and a catch-all SPA rewrite so client-side tab navigation survives a hard refresh.

---

## Project Structure

```
src/
├── App.tsx                    # App shell — tab router + lifted cross-cutting state
├── components/
│   ├── agent/                 # AIResearchAgent (floating chat panel)
│   ├── layout/                # Navbar, Footer, PoweredByBar
│   ├── map/                   # InfrastructureMap, MapViewSelector, map styles
│   ├── sections/              # One component per nav tab (Dashboard, Deep Research, ...)
│   └── ui/                    # Shared primitives (GlassCard, Badge, CountryModal, ...)
├── data/                      # Static, versioned knowledge base (TypeScript modules)
├── hooks/                     # useTheme, useAnimatedCounter, useInView, useRegionFilter
└── lib/                       # Shared utilities

api/
└── ai-research.js             # Vercel serverless function — DeepSeek-backed research agent

public/
└── media/                     # Static video assets (Video Briefing tab)
```

---

## License

Internal / proprietary — DocypherLabs. Not licensed for external redistribution.
