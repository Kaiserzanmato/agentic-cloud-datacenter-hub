import type { StyleSpecification } from 'maplibre-gl';

export type MapViewId = 'standard' | 'satellite' | 'terrain' | 'hybrid' | 'dark' | 'light';

export interface MapViewOption {
  id: MapViewId;
  label: string;
  // MapLibre accepts either a style URL (vector, tokenless) or a full style
  // spec object (used here for free raster tile sources with no API key).
  style: string | StyleSpecification;
  // Only the OpenFreeMap vector styles expose the OpenMapTiles building
  // source-layer the 3D extrusion layer needs.
  supports3DBuildings: boolean;
}

function rasterStyle(tiles: string[], attribution: string, tileSize = 256): StyleSpecification {
  return {
    version: 8,
    sources: {
      'raster-source': {
        type: 'raster',
        tiles,
        tileSize,
        attribution,
      },
    },
    layers: [{ id: 'raster-layer', type: 'raster', source: 'raster-source' }],
  };
}

function hybridStyle(): StyleSpecification {
  return {
    version: 8,
    sources: {
      'esri-imagery': {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        ],
        tileSize: 256,
        attribution: 'Imagery © Esri',
      },
      'esri-labels': {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        ],
        tileSize: 256,
        attribution: 'Labels © Esri',
      },
    },
    layers: [
      { id: 'esri-imagery-layer', type: 'raster', source: 'esri-imagery' },
      { id: 'esri-labels-layer', type: 'raster', source: 'esri-labels' },
    ],
  };
}

// All free, tokenless sources — no API keys or accounts required.
export const MAP_VIEW_OPTIONS: MapViewOption[] = [
  {
    id: 'standard',
    label: 'Standard',
    style: 'https://tiles.openfreemap.org/styles/liberty',
    supports3DBuildings: true,
  },
  {
    id: 'satellite',
    label: 'Satellite',
    style: rasterStyle(
      ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
      'Imagery © Esri, Maxar, Earthstar Geographics'
    ),
    supports3DBuildings: false,
  },
  {
    id: 'terrain',
    label: 'Terrain',
    style: rasterStyle(
      ['https://a.tile.opentopomap.org/{z}/{x}/{y}.png', 'https://b.tile.opentopomap.org/{z}/{x}/{y}.png'],
      'Map data © OpenStreetMap contributors, SRTM | Map style © OpenTopoMap (CC-BY-SA)'
    ),
    supports3DBuildings: false,
  },
  {
    id: 'hybrid',
    label: 'Hybrid',
    style: hybridStyle(),
    supports3DBuildings: false,
  },
  {
    id: 'dark',
    label: 'Dark',
    style: rasterStyle(
      ['https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', 'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'],
      '© OpenStreetMap contributors © CARTO'
    ),
    supports3DBuildings: false,
  },
  {
    id: 'light',
    label: 'Light',
    style: 'https://tiles.openfreemap.org/styles/positron',
    supports3DBuildings: true,
  },
];

export const DEFAULT_MAP_VIEW: MapViewId = 'standard';
