'use client'

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAppStore, TourResult } from '@/lib/store'
import TourCard from '@/components/tour/tour-card'
import { useState } from 'react'

const AlpineMap = dynamic(() => import('@/components/map/alpine-map'), { ssr: false })

export default function ResultsPage() {
  const router = useRouter()
  const { tourResults, totalFound, setSelectedTour } = useAppStore()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const displayTour = hoveredIndex !== null ? tourResults[hoveredIndex] : tourResults[0]

  const handleSelect = (tour: TourResult) => {
    setSelectedTour(tour)
    router.push('/tour/availability')
  }

  if (tourResults.length === 0) {
    return (
      <main className="min-h-screen bg-stone-50 bg-topo flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.5">
              <path d="m8 3 4 8 5-5 2 15H2L8 3z"/>
            </svg>
          </div>
          <h2 className="font-display text-2xl text-stone-900 mb-2">Keine Touren gefunden</h2>
          <p className="text-stone-500 text-sm mb-6">Versuche andere Parameter oder eine andere Region.</p>
          <button
            onClick={() => router.back()}
            className="text-alpine-700 hover:text-alpine-800 text-sm font-medium transition"
          >
            &larr; Zurück zur Konfiguration
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen flex">
      {/* Left panel */}
      <div className="w-[480px] flex-shrink-0 flex flex-col bg-stone-50 border-r border-stone-200">
        <div className="p-6 pb-4 border-b border-stone-100 bg-white">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-1.5 text-sm text-stone-500 hover:text-alpine-700 transition mb-4"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition group-hover:-translate-x-0.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Parameter anpassen
          </button>
          <h1 className="font-display text-2xl text-stone-900 mb-1">Tourenvorschläge</h1>
          <p className="text-sm text-stone-400">
            {totalFound} gefunden, Top {tourResults.length} angezeigt
          </p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
          {tourResults.map((tour, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
            >
              <TourCard
                tour={tour}
                index={i}
                onSelect={handleSelect}
                isHovered={hoveredIndex === i}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — map */}
      <div className="flex-1 relative">
        <AlpineMap
          onRegionSelect={() => {}}
          huts={displayTour?.hutDetails}
          routeLines={
            displayTour
              ? displayTour.legs.map((leg) => {
                  const from = displayTour.hutDetails.find((h) => h.id === leg.fromHutId)!
                  const to = displayTour.hutDetails.find((h) => h.id === leg.toHutId)!
                  return { coordinates: [[from.lng, from.lat], [to.lng, to.lat]] }
                })
              : undefined
          }
        />

        {/* Floating tour summary */}
        {displayTour && (
          <div className="absolute top-4 right-4 bg-white/92 backdrop-blur-md rounded-xl shadow-lg border border-stone-200/60 p-4 z-10 min-w-[200px]">
            <div className="text-xs text-stone-400 uppercase tracking-wider mb-2">Aktuelle Tour</div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-sm font-semibold text-stone-900">{displayTour.totalDistance.toFixed(1)}</div>
                <div className="text-[10px] text-stone-400">km</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-900">{displayTour.totalAscent}</div>
                <div className="text-[10px] text-stone-400">Hm↑</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-900">{displayTour.totalDuration.toFixed(1)}</div>
                <div className="text-[10px] text-stone-400">Std</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
