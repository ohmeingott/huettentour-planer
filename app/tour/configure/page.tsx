'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useAppStore } from '@/lib/store'
import { ALPINE_REGIONS } from '@/lib/map/regions'

function ConfigureForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const regionId = searchParams.get('region') || ''
  const region = ALPINE_REGIONS.find((r) => r.id === regionId)
  const { tourParams, setTourParams } = useAppStore()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const params = { ...tourParams, regionId }
    setTourParams(params)

    try {
      const res = await fetch('/api/tours/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })

      const data = await res.json()
      useAppStore.getState().setTourResults(data.tours || [])
      useAppStore.getState().setTotalFound(data.totalFound || 0)

      router.push('/tour/results')
    } catch {
      setLoading(false)
    }
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
          Zurück zur Karte
        </button>

        <div className="animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-alpine-500" />
            <span className="text-xs font-medium text-alpine-700 uppercase tracking-wider">
              {region?.name || 'Region'}
            </span>
          </div>
          <h1 className="font-display text-4xl text-stone-900 mb-8">Tour konfigurieren</h1>
        </div>

        <form onSubmit={handleSubmit} className="animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-7 mb-6">
            <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-5">Gruppe & Dauer</h2>
            <div className="grid grid-cols-3 gap-5">
              <div>
                <label className="block text-xs text-stone-500 mb-1.5">Personen</label>
                <input
                  type="number" min={1} max={20}
                  value={tourParams.groupSize}
                  onChange={(e) => setTourParams({ groupSize: parseInt(e.target.value) || 1 })}
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 focus:ring-2 focus:ring-alpine-500/30 focus:border-alpine-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs text-stone-500 mb-1.5">Tage gesamt</label>
                <input
                  type="number" min={2} max={14}
                  value={tourParams.totalDays}
                  onChange={(e) => setTourParams({ totalDays: parseInt(e.target.value) || 2 })}
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 focus:ring-2 focus:ring-alpine-500/30 focus:border-alpine-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs text-stone-500 mb-1.5">Puffertage</label>
                <input
                  type="number" min={0} max={tourParams.totalDays - 1}
                  value={tourParams.restDays}
                  onChange={(e) => setTourParams({ restDays: parseInt(e.target.value) || 0 })}
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 focus:ring-2 focus:ring-alpine-500/30 focus:border-alpine-500 outline-none transition"
                />
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-stone-100">
              <label className="flex items-center gap-3 cursor-pointer group">
                <button
                  type="button"
                  role="switch"
                  aria-checked={tourParams.isRoundTrip}
                  onClick={() => setTourParams({ isRoundTrip: !tourParams.isRoundTrip })}
                  className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${tourParams.isRoundTrip ? 'bg-alpine-600' : 'bg-stone-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 translate-y-0.5 ${tourParams.isRoundTrip ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                </button>
                <div>
                  <span className="text-sm font-medium text-stone-800">Rundtour</span>
                  <p className="text-xs text-stone-400">Start und Ziel am selben Ort</p>
                </div>
                {tourParams.isRoundTrip && (
                  <svg className="ml-auto w-5 h-5 text-alpine-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 2l4 4-4 4" /><path d="M3 11v-1a4 4 0 014-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v1a4 4 0 01-4 4H3" />
                  </svg>
                )}
              </label>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-7 mb-6">
            <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-5">Etappen-Kriterien</h2>
            <div className="grid grid-cols-3 gap-5">
              <div>
                <label className="block text-xs text-stone-500 mb-1.5">Min. Distanz (km)</label>
                <input
                  type="number" min={1} max={30} step={0.5}
                  value={tourParams.minDistance || ''}
                  onChange={(e) => setTourParams({ minDistance: e.target.value ? parseFloat(e.target.value) : undefined })}
                  placeholder="z.B. 3"
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 placeholder:text-stone-300 focus:ring-2 focus:ring-alpine-500/30 focus:border-alpine-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs text-stone-500 mb-1.5">Max. Distanz (km)</label>
                <input
                  type="number" min={1} max={30} step={0.5}
                  value={tourParams.maxDistance || ''}
                  onChange={(e) => setTourParams({ maxDistance: e.target.value ? parseFloat(e.target.value) : undefined })}
                  placeholder="z.B. 12"
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 placeholder:text-stone-300 focus:ring-2 focus:ring-alpine-500/30 focus:border-alpine-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs text-stone-500 mb-1.5">Max. Höhenmeter</label>
                <input
                  type="number" min={100} max={2000} step={50}
                  value={tourParams.maxAscent || ''}
                  onChange={(e) => setTourParams({ maxAscent: e.target.value ? parseInt(e.target.value) : undefined })}
                  placeholder="z.B. 800"
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 placeholder:text-stone-300 focus:ring-2 focus:ring-alpine-500/30 focus:border-alpine-500 outline-none transition"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-7 mb-8">
            <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-5">Unterkunft</h2>
            <select
              value={tourParams.roomPreference}
              onChange={(e) => setTourParams({ roomPreference: e.target.value })}
              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-900 focus:ring-2 focus:ring-alpine-500/30 focus:border-alpine-500 outline-none transition bg-white"
            >
              <option value="any">Egal (auch Matratzenlager)</option>
              <option value="shared_4">Kleinlager (max. 4-6 Betten)</option>
              <option value="double">Doppelzimmer</option>
              <option value="single">Einzelzimmer</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-alpine-700 text-white py-3.5 rounded-xl font-medium hover:bg-alpine-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition shadow-sm hover:shadow-md active:scale-[0.99]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Suche läuft...
              </span>
            ) : 'Touren anzeigen'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default function ConfigurePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="animate-spin h-6 w-6 border-2 border-alpine-600 border-t-transparent rounded-full" />
      </div>
    }>
      <ConfigureForm />
    </Suspense>
  )
}
