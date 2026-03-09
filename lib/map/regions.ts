export interface MapRegion {
  id: string
  name: string
  center: [number, number]
  zoom: number
  bounds: [[number, number], [number, number]]
  polygon: [number, number][]
}

export const ALPINE_REGIONS: MapRegion[] = [
  {
    id: 'stubaier-alpen',
    name: 'Stubaier Alpen',
    center: [11.25, 47.05],
    zoom: 11,
    bounds: [[11.05, 46.95], [11.45, 47.15]],
    polygon: [
      [11.23, 47.10],
      [11.30, 47.11],
      [11.39, 47.10],
      [11.44, 47.07],
      [11.47, 47.03],
      [11.46, 46.99],
      [11.42, 46.97],
      [11.35, 46.96],
      [11.27, 46.97],
      [11.23, 46.99],
      [11.22, 47.03],
      [11.23, 47.10],
    ],
  },
  {
    id: 'zillertal',
    name: 'Zillertaler Alpen',
    center: [11.87, 47.05],
    zoom: 11,
    bounds: [[11.65, 46.90], [12.10, 47.20]],
    polygon: [
      [11.65, 47.10],
      [11.72, 47.17],
      [11.85, 47.20],
      [11.98, 47.18],
      [12.08, 47.13],
      [12.10, 47.05],
      [12.08, 46.96],
      [12.00, 46.91],
      [11.87, 46.89],
      [11.75, 46.92],
      [11.67, 46.98],
      [11.65, 47.10],
    ],
  },
]

export const ALPS_CENTER: [number, number] = [11.55, 47.05]
export const ALPS_ZOOM = 9
