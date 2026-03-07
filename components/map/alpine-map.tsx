'use client'

import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { ALPINE_REGIONS, ALPS_CENTER, ALPS_ZOOM, MapRegion } from '@/lib/map/regions'

interface HutMarkerData {
  id: string
  name: string
  lat: number
  lng: number
  altitude: number
  imageUrl?: string | null
  capacity?: number
}

interface AccessPointMarkerData {
  id: string
  name: string
  type: string
  altitude: number
  lat: number
  lng: number
}

interface RouteLine {
  coordinates: [number, number][]
  difficulty?: string
}

interface AlpineMapProps {
  onRegionSelect: (region: MapRegion) => void
  selectedRegionId?: string | null
  huts?: HutMarkerData[]
  accessPoints?: AccessPointMarkerData[]
  routeLines?: RouteLine[]
  animateMarkers?: boolean
  showRegions?: boolean
  initialCenter?: [number, number]
  initialZoom?: number
}

const MAPBOX_STYLE = 'mapbox://styles/mapbox/outdoors-v12'

const DIFFICULTY_COLORS: Record<string, { line: string; glow: string }> = {
  easy: { line: '#16a34a', glow: '#22c55e' },       // green
  moderate: { line: '#d97706', glow: '#f59e0b' },    // amber
  difficult: { line: '#dc2626', glow: '#ef4444' },   // red
  access: { line: '#2563eb', glow: '#3b82f6' },      // blue (access routes)
}
const DEFAULT_ROUTE_COLOR = { line: '#b45309', glow: '#c2410c' }

function createAccessPointIcon(type: string): HTMLDivElement {
  const el = document.createElement('div')
  el.style.cssText = `
    width: 36px; height: 40px; cursor: pointer;
    transition: transform 0.15s ease;
    filter: drop-shadow(0 3px 5px rgba(0,0,0,0.3));
  `

  if (type === 'cable_car') {
    // 3D gondola icon
    el.innerHTML = `<svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="38" rx="10" ry="2" fill="rgba(0,0,0,0.1)"/>
      <line x1="2" y1="4" x2="34" y2="8" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
      <line x1="18" y1="6" x2="18" y2="13" stroke="#64748b" stroke-width="1.5"/>
      <path d="M10 14 L10 28 Q10 30 12 30 L24 30 Q26 30 26 28 L26 14 Z" fill="#2563eb"/>
      <path d="M26 14 L30 11 L30 27 Q30 29 28 29 L26 30 L26 14 Z" fill="#1d4ed8"/>
      <path d="M9 14.5 L18 10 L27 14.5 Z" fill="#334155"/>
      <path d="M27 14.5 L31 11.5 L22 7 L18 10 Z" fill="#1e293b"/>
      <rect x="12" y="17" width="5" height="6" rx="1" fill="#bfdbfe" opacity="0.9"/>
      <rect x="19" y="17" width="5" height="6" rx="1" fill="#bfdbfe" opacity="0.9"/>
      <line x1="14.5" y1="17" x2="14.5" y2="23" stroke="#1e40af" stroke-width="0.4"/>
      <line x1="21.5" y1="17" x2="21.5" y2="23" stroke="#1e40af" stroke-width="0.4"/>
      <rect x="12.5" y="17.5" width="1.5" height="3" rx="0.3" fill="white" opacity="0.3"/>
      <rect x="19.5" y="17.5" width="1.5" height="3" rx="0.3" fill="white" opacity="0.3"/>
      <line x1="18" y1="25" x2="18" y2="30" stroke="#1e40af" stroke-width="0.5"/>
    </svg>`
  } else if (type === 'parking') {
    // 3D parking sign icon
    el.innerHTML = `<svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="38" rx="8" ry="2" fill="rgba(0,0,0,0.1)"/>
      <rect x="16" y="22" width="4" height="16" rx="1" fill="#78716c"/>
      <rect x="16" y="22" width="1.5" height="16" rx="0.5" fill="#8a8580" opacity="0.5"/>
      <rect x="6" y="4" width="22" height="20" rx="3" fill="#2563eb"/>
      <path d="M28 4 Q28 2 26 2 L31 0 Q33 0 33 2 L33 22 Q33 24 31 24 L28 24 Z" fill="#1d4ed8"/>
      <path d="M6 4 Q6 2 8 2 L29 0 Q31 0 31 2 L28 4 Q28 2 26 2 L8 2 Q6 2 6 4 Z" fill="#1e40af"/>
      <rect x="8" y="6" width="18" height="16" rx="1.5" fill="none" stroke="white" stroke-width="1.5"/>
      <text x="17" y="20" text-anchor="middle" font-size="14" font-weight="bold" fill="white" font-family="system-ui,sans-serif">P</text>
    </svg>`
  } else {
    // 3D village with church icon
    el.innerHTML = `<svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="38" rx="12" ry="2" fill="rgba(0,0,0,0.1)"/>
      <rect x="20" y="16" width="10" height="20" fill="#94a3b8"/>
      <path d="M30 16 L33 14 L33 34 L30 36 Z" fill="#64748b"/>
      <rect x="22" y="19" width="3" height="3" rx="0.3" fill="#e2e8f0"/>
      <rect x="22" y="25" width="3" height="3" rx="0.3" fill="#e2e8f0"/>
      <rect x="4" y="18" width="18" height="18" fill="#f8fafc"/>
      <path d="M22 18 L26 15 L26 33 L22 36 Z" fill="#cbd5e1"/>
      <path d="M2 19 L13 8 L24 19 Z" fill="#dc2626"/>
      <path d="M24 19 L28 16 L17 5 L13 8 Z" fill="#991b1b"/>
      <rect x="11" y="2" width="4" height="8" fill="#94a3b8"/>
      <path d="M10 10 L13 4 L16 10 Z" fill="#64748b"/>
      <line x1="13" y1="2" x2="13" y2="0" stroke="#78716c" stroke-width="1"/>
      <line x1="12" y1="1" x2="14" y2="1" stroke="#78716c" stroke-width="0.8"/>
      <path d="M10 30 Q13 27 16 30 L16 36 L10 36 Z" fill="#7c2d12"/>
      <rect x="6" y="22" width="3.5" height="3.5" rx="0.3" fill="#fde68a"/>
      <line x1="7.75" y1="22" x2="7.75" y2="25.5" stroke="#92400e" stroke-width="0.3"/>
      <line x1="6" y1="23.75" x2="9.5" y2="23.75" stroke="#92400e" stroke-width="0.3"/>
      <rect x="17" y="22" width="3.5" height="3.5" rx="0.3" fill="#fde68a"/>
      <line x1="18.75" y1="22" x2="18.75" y2="25.5" stroke="#92400e" stroke-width="0.3"/>
      <line x1="17" y1="23.75" x2="20.5" y2="23.75" stroke="#92400e" stroke-width="0.3"/>
    </svg>`
  }

  el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.25) translateY(-2px)' })
  el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
  return el
}

function createHutIcon(animate?: boolean, index?: number): HTMLDivElement {
  const el = document.createElement('div')
  const delay = animate ? (index ?? 0) * 150 : 0
  el.style.cssText = `
    width: 40px; height: 44px; cursor: pointer;
    transition: transform 0.15s ease;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35));
    ${animate ? `opacity: 0; transform: scale(0) translateY(12px); animation: hutBounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms forwards;` : ''}
  `
  el.innerHTML = `<svg width="40" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Ground shadow -->
    <ellipse cx="18" cy="42" rx="14" ry="2.5" fill="rgba(0,0,0,0.12)"/>
    <!-- Front wall -->
    <path d="M6 20 L6 36 L28 36 L28 20 Z" fill="#b8875a"/>
    <!-- Side wall (3D depth) -->
    <path d="M28 20 L35 15 L35 31 L28 36 Z" fill="#8a6340"/>
    <!-- Front wall wood grain -->
    <line x1="6" y1="24" x2="28" y2="24" stroke="#a67a4e" stroke-width="0.4" opacity="0.5"/>
    <line x1="6" y1="28" x2="28" y2="28" stroke="#a67a4e" stroke-width="0.4" opacity="0.5"/>
    <line x1="6" y1="32" x2="28" y2="32" stroke="#a67a4e" stroke-width="0.4" opacity="0.5"/>
    <!-- Roof front face -->
    <path d="M3 21 L17 6 L31 21 Z" fill="#8b3525"/>
    <!-- Roof side face (3D) -->
    <path d="M31 21 L38 16 L24 1 L17 6 Z" fill="#6d1f12"/>
    <!-- Roof ridge highlight -->
    <path d="M17 6 L24 1" stroke="#fff" stroke-width="0.6" opacity="0.3"/>
    <path d="M3 21 L17 6" stroke="#fff" stroke-width="0.8" opacity="0.4"/>
    <!-- Snow on roof edge -->
    <path d="M2 21.5 Q10 19 17 7 Q24 19 32 21.5" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.7" fill="none"/>
    <!-- Door -->
    <path d="M14 29 Q17 26 20 29 L20 36 L14 36 Z" fill="#5c3520"/>
    <circle cx="18.5" cy="33" r="0.7" fill="#d4a057"/>
    <!-- Left window (warm glow) -->
    <rect x="8" y="23" width="4.5" height="4" rx="0.5" fill="#fde68a" opacity="0.9"/>
    <rect x="8" y="23" width="4.5" height="4" rx="0.5" fill="none" stroke="#7c5030" stroke-width="0.5"/>
    <line x1="10.25" y1="23" x2="10.25" y2="27" stroke="#7c5030" stroke-width="0.4"/>
    <line x1="8" y1="25" x2="12.5" y2="25" stroke="#7c5030" stroke-width="0.4"/>
    <!-- Right window (warm glow) -->
    <rect x="22" y="23" width="4.5" height="4" rx="0.5" fill="#fde68a" opacity="0.9"/>
    <rect x="22" y="23" width="4.5" height="4" rx="0.5" fill="none" stroke="#7c5030" stroke-width="0.5"/>
    <line x1="24.25" y1="23" x2="24.25" y2="27" stroke="#7c5030" stroke-width="0.4"/>
    <line x1="22" y1="25" x2="26.5" y2="25" stroke="#7c5030" stroke-width="0.4"/>
    <!-- Side window -->
    <rect x="30" y="18" width="3" height="3" rx="0.3" fill="#fde68a" opacity="0.7"/>
    <rect x="30" y="18" width="3" height="3" rx="0.3" fill="none" stroke="#6b4a2e" stroke-width="0.4"/>
    <!-- Chimney -->
    <rect x="24" y="4" width="4" height="10" fill="#7a5232"/>
    <rect x="24" y="4" width="4" height="10" fill="none" stroke="#5c3a22" stroke-width="0.5"/>
    <rect x="23.5" y="3" width="5" height="1.8" rx="0.4" fill="#5c3a22"/>
    <!-- Smoke -->
    <circle cx="26" cy="1.5" r="1.2" fill="#d6d3d1" opacity="0.4"/>
    <!-- Window glow aura -->
    <rect x="7" y="22" width="6.5" height="6" rx="1" fill="#fbbf24" opacity="0.15"/>
    <rect x="21" y="22" width="6.5" height="6" rx="1" fill="#fbbf24" opacity="0.15"/>
  </svg>`
  el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.25) translateY(-3px)' })
  el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
  if (animate) {
    el.addEventListener('animationend', () => {
      el.style.animation = 'none'
      el.style.opacity = '1'
      el.style.transform = 'scale(1)'
    }, { once: true })
  }
  return el
}

function createHutPopupHTML(hut: HutMarkerData): string {
  const img = hut.imageUrl
    ? `<img src="${hut.imageUrl}" alt="${hut.name}" style="width:100%;height:120px;object-fit:cover;border-radius:8px 8px 0 0;display:block;" />`
    : `<div style="width:100%;height:80px;background:#f5f5f4;border-radius:8px 8px 0 0;display:flex;align-items:center;justify-content:center;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d6d3d1" stroke-width="1.2"><path d="m8 3 4 8 5-5 2 15H2L8 3z"/></svg>
       </div>`

  return `<div style="min-width:200px;max-width:240px;font-family:system-ui,sans-serif;">
    ${img}
    <div style="padding:10px 12px 12px;">
      <div style="font-weight:600;font-size:14px;color:#1c1917;margin-bottom:4px;">${hut.name}</div>
      <div style="display:flex;gap:8px;align-items:center;font-size:12px;color:#78716c;">
        <span>${hut.altitude} m</span>
        ${hut.capacity ? `<span style="width:3px;height:3px;border-radius:50%;background:#d6d3d1;"></span><span>${hut.capacity} Betten</span>` : ''}
      </div>
    </div>
  </div>`
}

const AP_TYPE_LABELS: Record<string, string> = {
  parking: 'Parkplatz',
  village: 'Ort',
  cable_car: 'Seilbahn',
}

function createAccessPointPopupHTML(ap: AccessPointMarkerData): string {
  const typeLabel = AP_TYPE_LABELS[ap.type] || ap.type
  const typeColor = ap.type === 'cable_car' ? '#2563eb' : ap.type === 'parking' ? '#2563eb' : '#64748b'
  return `<div style="min-width:180px;font-family:system-ui,sans-serif;">
    <div style="padding:10px 12px 12px;">
      <div style="display:inline-block;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:${typeColor};background:${typeColor}15;padding:2px 6px;border-radius:4px;margin-bottom:6px;">${typeLabel}</div>
      <div style="font-weight:600;font-size:14px;color:#1c1917;margin-bottom:4px;">${ap.name}</div>
      <div style="font-size:12px;color:#78716c;">${ap.altitude} m</div>
    </div>
  </div>`
}

export default function AlpineMap({ onRegionSelect, selectedRegionId, huts, accessPoints, routeLines, animateMarkers, showRegions = true, initialCenter, initialZoom }: AlpineMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const popupOpenRef = useRef(false)
  const onRegionSelectRef = useRef(onRegionSelect)
  onRegionSelectRef.current = onRegionSelect
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX_STYLE,
      center: initialCenter || (ALPS_CENTER as [number, number]),
      zoom: initialZoom ?? ALPS_ZOOM,
      pitch: 50,
      bearing: -5,
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.current.on('load', () => {
      const m = map.current!

      // 3D Terrain
      m.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      })
      m.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })

      // Sky atmosphere
      m.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 60.0],
          'sky-atmosphere-sun-intensity': 10,
        },
      })

      // Region polygons (only on region-selection views)
      if (showRegions) {
        const allFeatures = ALPINE_REGIONS.map((region, i) => ({
          type: 'Feature' as const,
          id: i,
          properties: { id: region.id, name: region.name },
          geometry: {
            type: 'Polygon' as const,
            coordinates: [region.polygon],
          },
        }))

        m.addSource('regions', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: allFeatures },
        })

        m.addLayer({
          id: 'region-glow',
          type: 'line',
          source: 'regions',
          paint: {
            'line-color': '#56a880',
            'line-width': 8,
            'line-opacity': 0.15,
            'line-blur': 4,
          },
        })

        m.addLayer({
          id: 'region-fill',
          type: 'fill',
          source: 'regions',
          paint: {
            'fill-color': '#378c65',
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              0.22,
              0.10,
            ],
          },
        })

        m.addLayer({
          id: 'region-border',
          type: 'line',
          source: 'regions',
          paint: {
            'line-color': '#287050',
            'line-width': 2.5,
            'line-opacity': 0.7,
          },
        })

        // Region labels
        const labelFeatures = ALPINE_REGIONS.map((region) => ({
          type: 'Feature' as const,
          properties: { name: region.name },
          geometry: {
            type: 'Point' as const,
            coordinates: region.center,
          },
        }))

        m.addSource('region-labels', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: labelFeatures },
        })

        m.addLayer({
          id: 'region-label',
          type: 'symbol',
          source: 'region-labels',
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
            'text-size': 14,
            'text-letter-spacing': 0.08,
            'text-transform': 'uppercase',
            'text-allow-overlap': true,
          },
          paint: {
            'text-color': '#1d4836',
            'text-halo-color': 'rgba(255,255,255,0.85)',
            'text-halo-width': 2,
          },
        })

        // Hover interactions
        let hoveredId: number | null = null

        m.on('mousemove', 'region-fill', (e) => {
          m.getCanvas().style.cursor = 'pointer'
          if (e.features && e.features.length > 0) {
            if (hoveredId !== null) {
              m.setFeatureState({ source: 'regions', id: hoveredId }, { hover: false })
            }
            hoveredId = e.features[0].id as number
            m.setFeatureState({ source: 'regions', id: hoveredId }, { hover: true })
          }
        })

        m.on('mouseleave', 'region-fill', () => {
          m.getCanvas().style.cursor = ''
          if (hoveredId !== null) {
            m.setFeatureState({ source: 'regions', id: hoveredId }, { hover: false })
            hoveredId = null
          }
        })

        m.on('click', 'region-fill', (e) => {
          // Skip if a hut popup is open — prevents re-fetch that kills markers
          if (popupOpenRef.current) return
          if (e.features && e.features.length > 0) {
            const regionId = e.features[0].properties?.id
            const region = ALPINE_REGIONS.find((r) => r.id === regionId)
            if (region) onRegionSelectRef.current(region)
          }
        })
      }

      setLoaded(true)
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Hut markers
  useEffect(() => {
    if (!map.current || !loaded) return

    const m = map.current

    markersRef.current.forEach((mk) => mk.remove())
    markersRef.current = []

    if (!huts) return

    function addMarkers() {
      for (let idx = 0; idx < huts!.length; idx++) {
        const hut = huts![idx]
        const el = createHutIcon(animateMarkers, idx)

        const popup = new mapboxgl.Popup({
          offset: 20,
          closeButton: true,
          closeOnClick: false,
          maxWidth: '260px',
          className: 'hut-popup',
        }).setHTML(createHutPopupHTML(hut))

        popup.on('open', () => { popupOpenRef.current = true })
        popup.on('close', () => { popupOpenRef.current = false })

        const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([hut.lng, hut.lat])
          .setPopup(popup)
          .addTo(m)

        markersRef.current.push(marker)
      }

      // Access point markers
      if (accessPoints) {
        for (const ap of accessPoints) {
          const el = createAccessPointIcon(ap.type)

          const popup = new mapboxgl.Popup({
            offset: 14,
            closeButton: true,
            closeOnClick: false,
            maxWidth: '200px',
            className: 'hut-popup',
          }).setHTML(createAccessPointPopupHTML(ap))

          const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
            .setLngLat([ap.lng, ap.lat])
            .setPopup(popup)
            .addTo(m)

          markersRef.current.push(marker)
        }
      }

      const bounds = new mapboxgl.LngLatBounds()
      huts!.forEach((h) => bounds.extend([h.lng, h.lat]))
      if (accessPoints) {
        accessPoints.forEach((ap) => bounds.extend([ap.lng, ap.lat]))
      }
      if (!bounds.isEmpty()) {
        m.fitBounds(bounds, { padding: 80, maxZoom: 13, duration: 400, pitch: 50, bearing: -5 })
      }
    }

    if (m.isStyleLoaded()) {
      addMarkers()
    } else {
      m.once('style.load', addMarkers)
    }
  }, [huts, accessPoints, loaded, animateMarkers])

  // Route lines
  useEffect(() => {
    if (!map.current || !loaded) return

    const m = map.current

    function drawRoutes() {
      try {
        const style = m.getStyle()
        if (style?.layers) {
          style.layers.forEach((layer) => {
            if (layer.id.startsWith('route-')) m.removeLayer(layer.id)
          })
        }
        if (style?.sources) {
          Object.keys(style.sources).forEach((src) => {
            if (src.startsWith('route-src-')) m.removeSource(src)
          })
        }
      } catch { /* fresh */ }

      if (!routeLines) return

      routeLines.forEach((line, i) => {
        const colors = (line.difficulty && DIFFICULTY_COLORS[line.difficulty]) || DEFAULT_ROUTE_COLOR

        m.addSource(`route-src-${i}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: { type: 'LineString', coordinates: line.coordinates },
          },
        })

        // Trail glow (wider, semi-transparent)
        m.addLayer({
          id: `route-glow-${i}`,
          type: 'line',
          source: `route-src-${i}`,
          paint: {
            'line-color': colors.glow,
            'line-width': 8,
            'line-opacity': 0.18,
            'line-blur': 4,
          },
        })

        // Trail line
        m.addLayer({
          id: `route-line-${i}`,
          type: 'line',
          source: `route-src-${i}`,
          paint: {
            'line-color': colors.line,
            'line-width': 3,
            'line-dasharray': [2, 2],
            'line-opacity': 0.85,
          },
        })
      })
    }

    if (m.isStyleLoaded()) {
      drawRoutes()
    } else {
      m.once('style.load', drawRoutes)
    }
  }, [routeLines, loaded])

  // Fly to region
  useEffect(() => {
    if (!map.current || !selectedRegionId) return
    const region = ALPINE_REGIONS.find((r) => r.id === selectedRegionId)
    if (region) {
      map.current.flyTo({ center: region.center as [number, number], zoom: region.zoom, pitch: 50, bearing: -5, duration: 1500 })
    }
  }, [selectedRegionId])

  return <div ref={mapContainer} className="w-full h-full" />
}
