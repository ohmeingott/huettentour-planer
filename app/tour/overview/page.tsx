'use client'

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAppStore } from '@/lib/store'

const AlpineMap = dynamic(() => import('@/components/map/alpine-map'), { ssr: false })

const ROOM_LABELS: Record<string, string> = {
  double: 'Doppelzimmer',
  shared_4: 'Mehrbettzimmer',
  dorm: 'Lager',
  single: 'Einzelzimmer',
}

const DIFFICULTY_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  easy: { label: 'Leicht', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
  moderate: { label: 'Mittel', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  difficult: { label: 'Schwer', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
}

export default function OverviewPage() {
  const router = useRouter()
  const { selectedTour } = useAppStore()

  if (!selectedTour) {
    return (
      <main className="min-h-screen bg-stone-50 bg-topo flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.5">
              <path d="m8 3 4 8 5-5 2 15H2L8 3z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl text-stone-900 mb-2">Keine Tour ausgewählt</h2>
          <p className="text-stone-500 text-sm mb-6">Wähle zuerst eine Tour aus.</p>
          <button
            onClick={() => router.push('/tour/results')}
            className="text-alpine-700 hover:text-alpine-800 text-sm font-medium transition"
          >
            &larr; Zurück zu den Touren
          </button>
        </div>
      </main>
    )
  }

  const { hutDetails, legs, totalDistance, totalAscent, totalDescent, totalDuration, startAccessPoint, endAccessPoint, startAccessLeg, endAccessLeg } = selectedTour

  const routeLines = [
    // Access leg: AP → first hut
    ...(startAccessPoint && startAccessLeg
      ? [{
          coordinates: [
            [startAccessPoint.lng, startAccessPoint.lat],
            [hutDetails[0].lng, hutDetails[0].lat],
          ] as [number, number][],
          difficulty: 'access',
        }]
      : []),
    // Hut-to-hut legs
    ...legs.map((leg) => {
      const from = hutDetails.find((h) => h.id === leg.fromHutId)!
      const to = hutDetails.find((h) => h.id === leg.toHutId)!
      return { coordinates: [[from.lng, from.lat], [to.lng, to.lat]] as [number, number][], difficulty: leg.difficulty }
    }),
    // Access leg: last hut → AP
    ...(endAccessPoint && endAccessLeg
      ? [{
          coordinates: [
            [hutDetails[hutDetails.length - 1].lng, hutDetails[hutDetails.length - 1].lat],
            [endAccessPoint.lng, endAccessPoint.lat],
          ] as [number, number][],
          difficulty: 'access',
        }]
      : []),
  ]

  const mapAccessPoints = [startAccessPoint, endAccessPoint]
    .filter((ap): ap is NonNullable<typeof ap> => !!ap)
    // Deduplicate when start === end (Rundtour)
    .filter((ap, i, arr) => arr.findIndex((a) => a.id === ap.id) === i)

  // Compute initial map center from tour points so the map doesn't flash the Alps-wide view
  const allPoints = [
    ...hutDetails.map((h) => ({ lng: h.lng, lat: h.lat })),
    ...mapAccessPoints.map((ap) => ({ lng: ap.lng, lat: ap.lat })),
  ]
  const mapCenter: [number, number] = [
    allPoints.reduce((sum, p) => sum + p.lng, 0) / allPoints.length,
    allPoints.reduce((sum, p) => sum + p.lat, 0) / allPoints.length,
  ]

  return (
    <main className="h-[calc(100vh-4rem)] flex">
      {/* Left panel — tour details */}
      <div className="w-[480px] flex-shrink-0 flex flex-col bg-stone-50 border-r border-stone-200">
        <div className="p-6 pb-4 border-b border-stone-100 bg-white">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-1.5 text-sm text-stone-500 hover:text-alpine-700 transition mb-4"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition group-hover:-translate-x-0.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Andere Tour wählen
          </button>
          <h1 className="font-display text-2xl text-stone-900 mb-2">Tourübersicht</h1>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 border border-stone-200/80 rounded-full px-3 py-1">
              {hutDetails.length} Hütten
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 border border-stone-200/80 rounded-full px-3 py-1">
              {totalDistance.toFixed(1)} km
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 border border-stone-200/80 rounded-full px-3 py-1">
              {totalAscent} Hm↑ / {totalDescent} Hm↓
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 border border-stone-200/80 rounded-full px-3 py-1">
              {totalDuration.toFixed(1)} h
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div className="space-y-0">
            {/* Start access point card */}
            {startAccessPoint && startAccessLeg && (
              <>
                <div
                  className="bg-blue-50 rounded-2xl shadow-sm border border-blue-200/80 overflow-hidden animate-fade-in-up"
                  style={{ opacity: 0, animationDelay: '0s' }}
                >
                  <div className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {startAccessPoint.type === 'parking' ? 'P' : startAccessPoint.type === 'cable_car' ? 'S' : 'O'}
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-stone-900">{startAccessPoint.name}</h3>
                      <span className="text-sm text-stone-500">{startAccessPoint.altitude} m</span>
                    </div>
                    <div className="ml-auto">
                      <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 rounded-lg px-2 py-0.5">Start</span>
                    </div>
                  </div>
                </div>

                {/* Access leg connector: AP → first hut */}
                <div
                  className="relative flex items-center justify-center py-2 animate-fade-in-up"
                  style={{ animationDelay: '0.06s', opacity: 0 }}
                >
                  <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 border-l-2 border-dashed border-blue-300/50" />
                  <div className="relative z-10 flex items-center gap-2 bg-blue-50 border border-blue-200/60 rounded-full px-3.5 py-1.5 shadow-sm">
                    <span className="text-xs font-medium text-blue-700">Zustieg</span>
                    <span className="w-px h-3 bg-blue-200" />
                    <span className="text-xs text-blue-600">{startAccessLeg.distance.toFixed(1)} km</span>
                    <span className="w-px h-3 bg-blue-200" />
                    <span className="text-xs text-blue-600">{startAccessLeg.ascent} Hm↑</span>
                    <span className="w-px h-3 bg-blue-200" />
                    <span className="text-xs text-blue-600">{startAccessLeg.estimatedDuration.toFixed(1)} h</span>
                  </div>
                </div>
              </>
            )}

            {hutDetails.map((hut, i) => {
              const legBefore = i > 0 ? legs[i - 1] : null
              const diff = legBefore ? DIFFICULTY_LABELS[legBefore.difficulty] : null
              const animOffset = startAccessPoint ? 2 : 0

              return (
                <div key={hut.id}>
                  {/* Leg connector */}
                  {legBefore && (
                    <div
                      className="relative flex items-center justify-center py-2 animate-fade-in-up"
                      style={{ animationDelay: `${((i + animOffset) * 2 - 1) * 0.06}s`, opacity: 0 }}
                    >
                      <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 border-l-2 border-dashed border-alpine-300/50" />
                      <div className="relative z-10 flex items-center gap-2 bg-alpine-50 border border-alpine-200/60 rounded-full px-3.5 py-1.5 shadow-sm">
                        <span className="text-xs font-medium text-alpine-700">Etappe {i + (startAccessPoint ? 1 : 0)}</span>
                        <span className="w-px h-3 bg-alpine-200" />
                        <span className="text-xs text-alpine-600">
                          {legBefore.distance.toFixed(1)} km
                        </span>
                        <span className="w-px h-3 bg-alpine-200" />
                        <span className="text-xs text-alpine-600">
                          {legBefore.ascent} Hm↑
                        </span>
                        <span className="w-px h-3 bg-alpine-200" />
                        <span className="text-xs text-alpine-600">
                          {legBefore.estimatedDuration.toFixed(1)} h
                        </span>
                        {diff && (
                          <>
                            <span className="w-px h-3 bg-alpine-200" />
                            <span className={`text-xs font-medium ${diff.color} ${diff.bg} border rounded-full px-2 py-0.5`}>
                              {diff.label}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Hut card */}
                  <div
                    className="bg-white rounded-2xl shadow-sm border border-stone-200/80 overflow-hidden animate-fade-in-up"
                    style={{ animationDelay: `${(i + animOffset) * 2 * 0.06}s`, opacity: 0 }}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="sm:w-44 h-36 sm:h-auto flex-shrink-0 relative bg-stone-100">
                        {hut.imageUrl ? (
                          <img
                            src={hut.imageUrl}
                            alt={hut.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d6d3d1" strokeWidth="1.2">
                              <path d="m8 3 4 8 5-5 2 15H2L8 3z" />
                            </svg>
                          </div>
                        )}
                        {/* Day badge */}
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-0.5 shadow-sm">
                          <span className="text-[11px] font-semibold text-stone-700">
                            {startAccessPoint
                              ? `Tag ${i + 2}`
                              : i === 0 ? 'Start' : i === hutDetails.length - 1 ? 'Ziel' : `Tag ${i + 1}`
                            }
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 p-4">
                        <h3 className="font-display text-lg text-stone-900">{hut.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5 mb-2">
                          <span className="text-sm text-stone-500">{hut.altitude} m</span>
                          {hut.capacity && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-stone-300" />
                              <span className="text-sm text-stone-500">{hut.capacity} Betten</span>
                            </>
                          )}
                        </div>

                        {/* Room types */}
                        {hut.roomTypes && hut.roomTypes.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {hut.roomTypes.map((rt) => (
                              <span
                                key={rt.type}
                                className="text-[11px] bg-stone-50 text-stone-600 border border-stone-100 rounded-lg px-2 py-0.5"
                              >
                                {ROOM_LABELS[rt.type] || rt.type} ({rt.count})
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Amenities */}
                        {hut.amenities && hut.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {hut.amenities.map((a) => (
                              <span
                                key={a}
                                className="text-[10px] text-alpine-700 bg-alpine-50 rounded-full px-2 py-0.5"
                              >
                                {a}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* End access point card */}
            {endAccessPoint && endAccessLeg && (
              <>
                {/* Access leg connector: last hut → AP */}
                <div
                  className="relative flex items-center justify-center py-2 animate-fade-in-up"
                  style={{ animationDelay: `${(hutDetails.length + 2) * 2 * 0.06}s`, opacity: 0 }}
                >
                  <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 border-l-2 border-dashed border-blue-300/50" />
                  <div className="relative z-10 flex items-center gap-2 bg-blue-50 border border-blue-200/60 rounded-full px-3.5 py-1.5 shadow-sm">
                    <span className="text-xs font-medium text-blue-700">Abstieg</span>
                    <span className="w-px h-3 bg-blue-200" />
                    <span className="text-xs text-blue-600">{endAccessLeg.distance.toFixed(1)} km</span>
                    <span className="w-px h-3 bg-blue-200" />
                    <span className="text-xs text-blue-600">{endAccessLeg.descent} Hm↓</span>
                    <span className="w-px h-3 bg-blue-200" />
                    <span className="text-xs text-blue-600">{endAccessLeg.estimatedDuration.toFixed(1)} h</span>
                  </div>
                </div>

                <div
                  className="bg-blue-50 rounded-2xl shadow-sm border border-blue-200/80 overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${(hutDetails.length + 3) * 2 * 0.06}s`, opacity: 0 }}
                >
                  <div className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {endAccessPoint.type === 'parking' ? 'P' : endAccessPoint.type === 'cable_car' ? 'S' : 'O'}
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-stone-900">{endAccessPoint.name}</h3>
                      <span className="text-sm text-stone-500">{endAccessPoint.altitude} m</span>
                    </div>
                    <div className="ml-auto">
                      <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 rounded-lg px-2 py-0.5">Ziel</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* CTA */}
          <div
            className="mt-8 mb-4 text-center animate-fade-in-up"
            style={{ animationDelay: `${hutDetails.length * 2 * 0.06 + 0.1}s`, opacity: 0 }}
          >
            <button
              onClick={() => router.push('/tour/availability')}
              className="inline-flex items-center gap-2 bg-alpine-700 text-white px-7 py-3 rounded-xl font-medium hover:bg-alpine-800 transition shadow-sm text-sm"
            >
              Verfügbarkeit prüfen
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right panel — 3D map */}
      <div className="flex-1 relative">
        <AlpineMap
          onRegionSelect={() => {}}
          huts={hutDetails}
          accessPoints={mapAccessPoints.length > 0 ? mapAccessPoints : undefined}
          routeLines={routeLines}
          animateMarkers
          showRegions={false}
          initialCenter={mapCenter}
          initialZoom={11}
        />

        {/* Difficulty legend */}
        <div className="absolute bottom-6 left-6 bg-white/92 backdrop-blur-md rounded-xl shadow-lg border border-stone-200/60 p-3 z-10">
          <div className="text-[10px] text-stone-400 uppercase tracking-wider mb-2">Schwierigkeit</div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-0.5 rounded-full bg-green-500" />
              <span className="text-xs text-stone-600">Leicht</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-0.5 rounded-full bg-amber-500" />
              <span className="text-xs text-stone-600">Mittel</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-0.5 rounded-full bg-red-500" />
              <span className="text-xs text-stone-600">Schwer</span>
            </div>
            {mapAccessPoints.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-0.5 rounded-full bg-blue-500" />
                <span className="text-xs text-stone-600">Zustieg</span>
              </div>
            )}
          </div>
        </div>

        {/* Tour summary floating card */}
        <div className="absolute top-4 right-4 bg-white/92 backdrop-blur-md rounded-xl shadow-lg border border-stone-200/60 p-4 z-10 min-w-[200px]">
          <div className="text-xs text-stone-400 uppercase tracking-wider mb-2">Tour</div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-sm font-semibold text-stone-900">{totalDistance.toFixed(1)}</div>
              <div className="text-[10px] text-stone-400">km</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-stone-900">{totalAscent}</div>
              <div className="text-[10px] text-stone-400">Hm↑</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-stone-900">{totalDuration.toFixed(1)}</div>
              <div className="text-[10px] text-stone-400">Std</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
