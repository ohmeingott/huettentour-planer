export interface MapRegion {
  id: string
  name: string
  center: [number, number]
  zoom: number
  bounds: [[number, number], [number, number]]
}

export const ALPINE_REGIONS: MapRegion[] = [
  {
    id: 'stubaier-alpen',
    name: 'Stubaier Alpen',
    center: [11.25, 47.05],
    zoom: 11,
    bounds: [[11.05, 46.95], [11.45, 47.15]],
  },
  {
    id: 'zillertal',
    name: 'Zillertaler Alpen',
    center: [11.87, 47.05],
    zoom: 11,
    bounds: [[11.65, 46.90], [12.10, 47.20]],
  },
  {
    id: 'oetztal',
    name: 'Ötztaler Alpen',
    center: [10.85, 46.85],
    zoom: 11,
    bounds: [[10.60, 46.70], [11.10, 47.00]],
  },
  {
    id: 'dolomiten',
    name: 'Dolomiten',
    center: [11.85, 46.45],
    zoom: 10,
    bounds: [[11.40, 46.25], [12.30, 46.65]],
  },
  {
    id: 'berner-oberland',
    name: 'Berner Oberland',
    center: [7.95, 46.55],
    zoom: 10,
    bounds: [[7.60, 46.35], [8.30, 46.75]],
  },
]

export const ALPS_CENTER: [number, number] = [11.5, 47.0]
export const ALPS_ZOOM = 7
