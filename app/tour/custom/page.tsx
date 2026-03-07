'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useAppStore, HutDetail, TourResult } from '@/lib/store'
import ElevationProfile from '@/components/tour/elevation-profile'

interface SearchHut {
  id: string
  name: string
  altitude: number
  lat: number
  lng: number
  imageUrl: string | null
  capacity: number
  region: { name: string; slug: string }
}

export default function CustomTourPage() {
  const router = useRouter()
  const { setSelectedTour } = useAppStore()
  const [selectedHuts, setSelectedHuts] = useState<SearchHut[]>([])
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchHut[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [routeLegs, setRouteLegs] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()

  // Search huts
  const searchHuts = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([])
      setShowDropdown(false)
      return
    }
    setIsSearching(true)
    try {
      const res = await fetch(`/api/huts/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      // Filter out already selected huts
      const filtered = data.filter((h: SearchHut) => !selectedHuts.some((s) => s.id === h.id))
      setResults(filtered)
      setShowDropdown(filtered.length > 0)
      setHighlightedIndex(-1)
    } catch {
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }, [selectedHuts])

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => searchHuts(query), 200)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, searchHuts])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const addHut = (hut: SearchHut) => {
    setSelectedHuts((prev) => [...prev, hut])
    setQuery('')
    setResults([])
    setShowDropdown(false)
    inputRef.current?.focus()
  }

  const removeHut = (index: number) => {
    setSelectedHuts((prev) => prev.filter((_, i) => i !== index))
  }

  const moveHut = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= selectedHuts.length) return
    const newHuts = [...selectedHuts]
    ;[newHuts[index], newHuts[newIndex]] = [newHuts[newIndex], newHuts[index]]
    setSelectedHuts(newHuts)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || results.length === 0) {
      if (e.key === 'Backspace' && query === '' && selectedHuts.length > 0) {
        removeHut(selectedHuts.length - 1)
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault()
      addHut(results[highlightedIndex])
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  // Build a TourResult from selected huts to pass to availability
  const buildTourResult = (): TourResult | null => {
    if (selectedHuts.length < 2) return null

    const hutDetails: HutDetail[] = selectedHuts.map((h) => ({
      id: h.id,
      name: h.name,
      altitude: h.altitude,
      lat: h.lat,
      lng: h.lng,
      imageUrl: h.imageUrl,
    }))

    // Build estimated legs from altitude differences
    const legs = []
    for (let i = 0; i < selectedHuts.length - 1; i++) {
      const from = selectedHuts[i]
      const to = selectedHuts[i + 1]
      const altDiff = to.altitude - from.altitude
      // Rough distance estimate from coordinates (haversine-lite)
      const dLat = (to.lat - from.lat) * 111
      const dLng = (to.lng - from.lng) * 111 * Math.cos((from.lat * Math.PI) / 180)
      const dist = Math.sqrt(dLat * dLat + dLng * dLng)
      const distance = Math.round(dist * 1.4 * 10) / 10 // trail factor 1.4

      legs.push({
        fromHutId: from.id,
        toHutId: to.id,
        distance,
        ascent: altDiff > 0 ? altDiff : Math.round(Math.abs(altDiff) * 0.3),
        descent: altDiff < 0 ? Math.abs(altDiff) : Math.round(altDiff * 0.3),
        estimatedDuration: Math.round((distance / 4 + Math.max(0, altDiff) / 400) * 10) / 10,
      })
    }

    return {
      huts: hutDetails.map((h) => h.id),
      hutDetails,
      legs,
      totalDistance: legs.reduce((s, l) => s + l.distance, 0),
      totalAscent: legs.reduce((s, l) => s + l.ascent, 0),
      totalDescent: legs.reduce((s, l) => s + l.descent, 0),
      totalDuration: legs.reduce((s, l) => s + l.estimatedDuration, 0),
    }
  }

  const tourResult = buildTourResult()

  const handleContinue = () => {
    if (!tourResult) return
    setSelectedTour(tourResult)
    router.push('/tour/availability')
  }

  return (
    <main className="min-h-screen bg-stone-50 bg-topo">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button
          onClick={() => router.push('/')}
          className="group flex items-center gap-1.5 text-sm text-stone-500 hover:text-alpine-700 transition mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition group-hover:-translate-x-0.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Zurück
        </button>

        <div className="animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-summit-DEFAULT" />
            <span className="text-xs font-medium text-summit-DEFAULT uppercase tracking-wider">
              Eigene Tour
            </span>
          </div>
          <h1 className="font-display text-4xl text-stone-900 mb-2">Tour zusammenstellen</h1>
          <p className="text-stone-400 text-sm mb-8">
            Füge Hütten in der Reihenfolge hinzu, in der du sie besuchen möchtest.
          </p>
        </div>

        {/* Selected huts */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-5 mb-4 animate-fade-in-up" style={{ animationDelay: '0.05s', opacity: 0 }}>
          {selectedHuts.length === 0 ? (
            <div className="text-center py-8 text-stone-300">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3">
                <path d="m8 3 4 8 5-5 2 15H2L8 3z"/>
              </svg>
              <p className="text-sm">Noch keine Hütten ausgewählt</p>
              <p className="text-xs mt-1">Beginne mit der Suche unten</p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedHuts.map((hut, i) => (
                <div key={hut.id + '-' + i} className="flex items-center gap-3 group">
                  {/* Stage number / connector */}
                  <div className="flex flex-col items-center w-6 shrink-0">
                    <div className="w-6 h-6 rounded-full bg-alpine-600 text-white text-xs font-semibold flex items-center justify-center">
                      {i + 1}
                    </div>
                    {i < selectedHuts.length - 1 && (
                      <div className="w-px h-4 bg-alpine-200 mt-1" />
                    )}
                  </div>

                  {/* Hut info */}
                  <div className="flex-1 flex items-center gap-3 bg-stone-50 rounded-xl px-3 py-2.5 min-w-0">
                    {hut.imageUrl ? (
                      <img src={hut.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-stone-200 flex items-center justify-center shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.5">
                          <path d="m8 3 4 8 5-5 2 15H2L8 3z"/>
                        </svg>
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-stone-800 truncate">{hut.name}</div>
                      <div className="text-xs text-stone-400">{hut.altitude}m · {hut.region.name}</div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
                    <button
                      onClick={() => moveHut(i, -1)}
                      disabled={i === 0}
                      className="w-6 h-6 rounded bg-stone-100 text-stone-400 hover:text-stone-600 disabled:opacity-30 flex items-center justify-center text-xs"
                    >↑</button>
                    <button
                      onClick={() => moveHut(i, 1)}
                      disabled={i === selectedHuts.length - 1}
                      className="w-6 h-6 rounded bg-stone-100 text-stone-400 hover:text-stone-600 disabled:opacity-30 flex items-center justify-center text-xs"
                    >↓</button>
                    <button
                      onClick={() => removeHut(i)}
                      className="w-6 h-6 rounded bg-red-50 text-red-400 hover:text-red-600 flex items-center justify-center text-xs"
                    >×</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search input */}
        <div className="relative mb-6" ref={dropdownRef}>
          <div className="bg-white rounded-xl shadow-sm border border-stone-200/80 flex items-center px-4 gap-3 focus-within:ring-2 focus-within:ring-alpine-500/30 focus-within:border-alpine-500 transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2" className="shrink-0">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => { if (results.length > 0) setShowDropdown(true) }}
              placeholder="Hütte suchen..."
              className="w-full py-3 text-sm text-stone-900 placeholder:text-stone-300 outline-none bg-transparent"
            />
            {isSearching && (
              <div className="animate-spin h-4 w-4 border-2 border-alpine-600 border-t-transparent rounded-full shrink-0" />
            )}
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden z-20 max-h-[320px] overflow-y-auto">
              {results.map((hut, i) => (
                <button
                  key={hut.id}
                  onClick={() => addHut(hut)}
                  onMouseEnter={() => setHighlightedIndex(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                    i === highlightedIndex ? 'bg-alpine-50' : 'hover:bg-stone-50'
                  }`}
                >
                  {hut.imageUrl ? (
                    <img src={hut.imageUrl} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c7c2bc" strokeWidth="1.5">
                        <path d="m8 3 4 8 5-5 2 15H2L8 3z"/>
                      </svg>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-stone-800 truncate">{hut.name}</div>
                    <div className="text-xs text-stone-400">{hut.altitude}m · {hut.region.name}</div>
                  </div>
                  <span className="text-xs text-stone-300 shrink-0">{hut.capacity} Plätze</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tour summary */}
        {tourResult && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-5 mb-6 animate-fade-in-up">
            <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-4">Tour-Übersicht</h2>

            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="text-center bg-stone-50 rounded-xl py-2.5">
                <div className="font-semibold text-stone-900 text-sm">{selectedHuts.length}</div>
                <div className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">Hütten</div>
              </div>
              <div className="text-center bg-stone-50 rounded-xl py-2.5">
                <div className="font-semibold text-stone-900 text-sm">{tourResult.totalDistance.toFixed(1)} km</div>
                <div className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">Distanz</div>
              </div>
              <div className="text-center bg-stone-50 rounded-xl py-2.5">
                <div className="font-semibold text-stone-900 text-sm">{tourResult.totalAscent} Hm</div>
                <div className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">Aufstieg</div>
              </div>
              <div className="text-center bg-stone-50 rounded-xl py-2.5">
                <div className="font-semibold text-stone-900 text-sm">{tourResult.totalDuration.toFixed(1)} h</div>
                <div className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">Gehzeit</div>
              </div>
            </div>

            <div className="mb-4">
              <ElevationProfile hutDetails={tourResult.hutDetails} legs={tourResult.legs} height={110} />
            </div>

            <p className="text-[11px] text-stone-300 italic">
              Distanz und Gehzeit sind Schätzungen basierend auf Koordinaten. Echte Routendaten werden für bekannte Verbindungen verwendet.
            </p>
          </div>
        )}

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={selectedHuts.length < 2}
          className="w-full bg-alpine-700 text-white py-3.5 rounded-xl font-medium hover:bg-alpine-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition shadow-sm hover:shadow-md active:scale-[0.99]"
        >
          {selectedHuts.length < 2 ? (
            <span className="text-stone-400">Mindestens 2 Hütten wählen</span>
          ) : (
            `Verfügbarkeit prüfen (${selectedHuts.length - 1} Nächte)`
          )}
        </button>
      </div>
    </main>
  )
}
