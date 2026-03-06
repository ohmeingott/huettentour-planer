'use client'

import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import { useAppStore } from '@/lib/store'
import AvailabilityCalendar from '@/components/tour/availability-calendar'

export default function AvailabilityPage() {
  const router = useRouter()
  const {
    selectedTour, dateStart, dateEnd, setDateRange,
    setAvailabilityJobId,
    availabilityResult, setAvailabilityResult,
  } = useAppStore()

  const [checking, setChecking] = useState(false)
  const [progress, setProgress] = useState(0)

  const pollStatus = useCallback(async (jobId: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/availability/status/${jobId}`)
        const data = await res.json()

        setProgress(data.progress || 0)

        if (data.state === 'completed') {
          clearInterval(interval)
          setAvailabilityResult(data.result)
          setChecking(false)
        } else if (data.state === 'failed') {
          clearInterval(interval)
          setChecking(false)
        }
      } catch {
        clearInterval(interval)
        setChecking(false)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [setAvailabilityResult])

  const handleCheck = async () => {
    if (!selectedTour || !dateStart || !dateEnd) return

    setChecking(true)
    setProgress(0)
    setAvailabilityResult(null)

    const res = await fetch('/api/availability/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hutIds: selectedTour.huts,
        dateStart,
        dateEnd,
        groupSize: useAppStore.getState().tourParams.groupSize,
        roomPreference: useAppStore.getState().tourParams.roomPreference,
      }),
    })

    const data = await res.json()
    setAvailabilityJobId(data.jobId)
    pollStatus(data.jobId)
  }

  if (!selectedTour) {
    return (
      <main className="min-h-screen bg-stone-50 bg-topo flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
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

  return (
    <main className="min-h-screen bg-stone-50 bg-topo">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-1.5 text-sm text-stone-500 hover:text-alpine-700 transition mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition group-hover:-translate-x-0.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Zurück zu den Touren
        </button>

        <div className="animate-fade-in-up">
          <h1 className="font-display text-4xl text-stone-900 mb-2">Verfügbarkeit prüfen</h1>
          <p className="text-stone-500 text-sm mb-8">Prüfe ob alle Hütten deiner Tour im gewünschten Zeitraum frei sind.</p>
        </div>

        {/* Tour summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-5 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <div className="flex flex-wrap items-center gap-1.5">
            {selectedTour.hutDetails.map((hut, i) => (
              <span key={hut.id} className="flex items-center text-sm">
                {i > 0 && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2" className="mx-2 flex-shrink-0">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                )}
                <span className="font-medium text-stone-800">{hut.name}</span>
                <span className="text-xs text-stone-400 ml-1">{hut.altitude}m</span>
              </span>
            ))}
          </div>
        </div>

        {/* Date range */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-6 mb-6 animate-fade-in-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
          <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-4">Zeitraum</h2>
          <div className="flex gap-4 items-end flex-wrap">
            <div>
              <label className="block text-xs text-stone-500 mb-1.5">Von</label>
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateRange(e.target.value, dateEnd)}
                className="border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 focus:ring-2 focus:ring-alpine-500/30 focus:border-alpine-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-500 mb-1.5">Bis</label>
              <input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateRange(dateStart, e.target.value)}
                className="border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 focus:ring-2 focus:ring-alpine-500/30 focus:border-alpine-500 outline-none transition"
              />
            </div>
            <button
              onClick={handleCheck}
              disabled={checking || !dateStart || !dateEnd}
              className="bg-alpine-700 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-alpine-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition shadow-sm"
            >
              {checking ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  {progress}%
                </span>
              ) : 'Verfügbarkeit prüfen'}
            </button>
          </div>

          {checking && (
            <div className="mt-5">
              <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-alpine-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-stone-400 mt-2">
                Crawler prüft {selectedTour.hutDetails.length} Hütten...
              </p>
            </div>
          )}
        </div>

        {/* Results */}
        {availabilityResult && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-6 animate-fade-in-up">
            <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-5">Ergebnis</h2>
            <AvailabilityCalendar results={availabilityResult.results} hutOrder={selectedTour.huts} />
          </div>
        )}
      </div>
    </main>
  )
}
