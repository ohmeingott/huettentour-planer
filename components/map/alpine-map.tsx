'use client'

import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { ALPINE_REGIONS, ALPS_CENTER, ALPS_ZOOM, MapRegion } from '@/lib/map/regions'

interface AlpineMapProps {
  onRegionSelect: (region: MapRegion) => void
  selectedRegionId?: string | null
  huts?: { id: string; name: string; lat: number; lng: number; altitude: number }[]
  routeLines?: { coordinates: [number, number][] }[]
}

const MAPBOX_STYLE = 'mapbox://styles/mapbox/outdoors-v12'

export default function AlpineMap({ onRegionSelect, selectedRegionId, huts, routeLines }: AlpineMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX_STYLE,
      center: ALPS_CENTER as [number, number],
      zoom: ALPS_ZOOM,
      pitch: 30,
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

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

    const m = map.current

    markersRef.current.forEach((mk) => mk.remove())
    markersRef.current = []

    if (!huts) return

    function addMarkers() {
      for (const hut of huts!) {
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

        const popup = new mapboxgl.Popup({ offset: 12, closeButton: false }).setHTML(
          `<div style="font-size:13px"><strong>${hut.name}</strong><br/><span style="color:#78716c">${hut.altitude} m</span></div>`
        )

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([hut.lng, hut.lat])
          .setPopup(popup)
          .addTo(m)

        markersRef.current.push(marker)
      }

      if (huts!.length > 1) {
        const bounds = new mapboxgl.LngLatBounds()
        huts!.forEach((h) => bounds.extend([h.lng, h.lat]))
        m.fitBounds(bounds, { padding: 80, duration: 1000 })
      }
    }

    if (m.isStyleLoaded()) {
      addMarkers()
    } else {
      m.once('style.load', addMarkers)
    }
  }, [huts, loaded])

  // Route lines
  useEffect(() => {
    if (!map.current || !loaded) return

    const m = map.current

    function drawRoutes() {
      // Remove old route layers/sources
      try {
        const style = m.getStyle()
        if (style?.layers) {
          style.layers.forEach((layer) => {
            if (layer.id.startsWith('route-line-')) m.removeLayer(layer.id)
          })
        }
        if (style?.sources) {
          Object.keys(style.sources).forEach((src) => {
            if (src.startsWith('route-src-')) m.removeSource(src)
          })
        }
      } catch { /* style not ready yet, sources will be fresh */ }

      if (!routeLines) return

      routeLines.forEach((line, i) => {
        m.addSource(`route-src-${i}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: { type: 'LineString', coordinates: line.coordinates },
          },
        })

        m.addLayer({
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
      map.current.flyTo({ center: region.center as [number, number], zoom: region.zoom, duration: 1500 })
    }
  }, [selectedRegionId])

  return <div ref={mapContainer} className="w-full h-full" />
}
