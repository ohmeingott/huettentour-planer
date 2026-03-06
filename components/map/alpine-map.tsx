'use client'

import { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import { ALPINE_REGIONS, ALPS_CENTER, ALPS_ZOOM, MapRegion } from '@/lib/map/regions'

interface AlpineMapProps {
  onRegionSelect: (region: MapRegion) => void
  selectedRegionId?: string | null
  huts?: { id: string; name: string; lat: number; lng: number; altitude: number }[]
  routeLines?: { coordinates: [number, number][] }[]
}

const FREE_STYLE = 'https://tiles.openfreemap.org/styles/liberty'

export default function AlpineMap({ onRegionSelect, selectedRegionId, huts, routeLines }: AlpineMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: FREE_STYLE,
      center: ALPS_CENTER as [number, number],
      zoom: ALPS_ZOOM,
      pitch: 30,
    })

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right')

    map.current.on('load', () => {
      setLoaded(true)

      for (const region of ALPINE_REGIONS) {
        const [[minLng, minLat], [maxLng, maxLat]] = region.bounds

        map.current!.addSource(`region-${region.id}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: { id: region.id, name: region.name },
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [minLng, minLat],
                [maxLng, minLat],
                [maxLng, maxLat],
                [minLng, maxLat],
                [minLng, minLat],
              ]],
            },
          },
        })

        map.current!.addLayer({
          id: `region-fill-${region.id}`,
          type: 'fill',
          source: `region-${region.id}`,
          paint: {
            'fill-color': '#378c65',
            'fill-opacity': 0.12,
          },
        })

        map.current!.addLayer({
          id: `region-border-${region.id}`,
          type: 'line',
          source: `region-${region.id}`,
          paint: {
            'line-color': '#287050',
            'line-width': 2,
            'line-dasharray': [4, 2],
          },
        })

        map.current!.on('click', `region-fill-${region.id}`, () => {
          onRegionSelect(region)
        })

        map.current!.on('mouseenter', `region-fill-${region.id}`, () => {
          map.current!.getCanvas().style.cursor = 'pointer'
          map.current!.setPaintProperty(`region-fill-${region.id}`, 'fill-opacity', 0.25)
        })

        map.current!.on('mouseleave', `region-fill-${region.id}`, () => {
          map.current!.getCanvas().style.cursor = ''
          map.current!.setPaintProperty(`region-fill-${region.id}`, 'fill-opacity', 0.12)
        })
      }
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [onRegionSelect])

  // Hut markers
  useEffect(() => {
    if (!map.current || !loaded) return

    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    if (!huts) return

    for (const hut of huts) {
      const el = document.createElement('div')
      el.style.cssText = `
        width: 14px; height: 14px;
        background: #c2410c;
        border: 2.5px solid white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        transition: transform 0.15s ease;
      `
      el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.3)' })
      el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })

      const popup = new maplibregl.Popup({ offset: 12, closeButton: false }).setHTML(
        `<div style="font-size:13px"><strong>${hut.name}</strong><br/><span style="color:#78716c">${hut.altitude} m</span></div>`
      )

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([hut.lng, hut.lat])
        .setPopup(popup)
        .addTo(map.current!)

      markersRef.current.push(marker)
    }

    if (huts.length > 1) {
      const bounds = new maplibregl.LngLatBounds()
      huts.forEach((h) => bounds.extend([h.lng, h.lat]))
      map.current.fitBounds(bounds, { padding: 80, duration: 1000 })
    }
  }, [huts, loaded])

  // Route lines
  useEffect(() => {
    if (!map.current || !loaded) return

    const style = map.current.getStyle()
    if (style?.layers) {
      style.layers.forEach((layer) => {
        if (layer.id.startsWith('route-line-')) {
          map.current!.removeLayer(layer.id)
        }
      })
    }
    if (style?.sources) {
      Object.keys(style.sources).forEach((src) => {
        if (src.startsWith('route-src-')) {
          map.current!.removeSource(src)
        }
      })
    }

    if (!routeLines) return

    routeLines.forEach((line, i) => {
      map.current!.addSource(`route-src-${i}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: line.coordinates },
        },
      })

      map.current!.addLayer({
        id: `route-line-${i}`,
        type: 'line',
        source: `route-src-${i}`,
        paint: {
          'line-color': '#c2410c',
          'line-width': 3,
          'line-dasharray': [3, 1.5],
        },
      })
    })
  }, [routeLines, loaded])

  // Fly to region
  useEffect(() => {
    if (!map.current || !selectedRegionId) return
    const region = ALPINE_REGIONS.find((r) => r.id === selectedRegionId)
    if (region) {
      map.current.flyTo({ center: region.center as [number, number], zoom: region.zoom, duration: 1500 })
    }
  }, [selectedRegionId])

  return <div ref={mapContainer} className="w-full h-full" />
}
