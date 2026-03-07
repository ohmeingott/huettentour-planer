'use client'

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAppStore } from '@/lib/store'
import { MapRegion, ALPINE_REGIONS } from '@/lib/map/regions'

const AlpineMap = dynamic(() => import('@/components/map/alpine-map'), { ssr: false })

const INSPIRATION = [
  {
    title: 'Stubaier Höhenweg',
    region: 'stubaier-alpen',
    description: 'Klassische Hüttentour durch die Stubaier Alpen. 5–7 Tage, moderate Schwierigkeit.',
    huts: ['Innsbrucker Hütte', 'Bremer Hütte', 'Nürnberger Hütte', 'Sulzenau Hütte', 'Neue Regensburger Hütte'],
    days: '5–7',
    distance: '~35 km',
  },
  {
    title: 'Berliner Höhenweg',
    region: 'zillertal',
    description: 'Rund um den Zillertaler Hauptkamm. 6–8 Tage für erfahrene Bergsteiger.',
    huts: ['Gamshütte', 'Berliner Hütte', 'Greizer Hütte', 'Kasseler Hütte', 'Karl-von-Edel-Hütte'],
    days: '6–8',
    distance: '~45 km',
  },
  {
    title: 'Ötztaler Runde',
    region: 'oetztal',
    description: 'Hochalpine Tour mit Gletscherberührung. 4–6 Tage, anspruchsvoll.',
    huts: ['Vernagthütte', 'Hochjoch-Hospiz', 'Martin-Busch-Hütte', 'Similaunhütte'],
    days: '4–6',
    distance: '~30 km',
  },
]

const REGION_COLORS: Record<string, string> = {
  'stubaier-alpen': 'bg-alpine-600',
  'zillertal': 'bg-emerald-600',
  'oetztal': 'bg-amber-600',
  'dolomiten': 'bg-rose-600',
  'berner-oberland': 'bg-sky-600',
}

export default function Home() {
  const router = useRouter()
  const { setSelectedRegionId } = useAppStore()

  const handleRegionSelect = (region: MapRegion) => {
    setSelectedRegionId(region.id)
    router.push(`/tour/configure?region=${region.id}`)
  }

  const handleInspirationClick = (regionId: string) => {
    setSelectedRegionId(regionId)
    router.push(`/tour/configure?region=${regionId}`)
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden flex">
      {/* Left panel */}
      <div className="w-[440px] flex-shrink-0 flex flex-col bg-white border-r border-stone-200 z-10 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="p-7 pb-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-alpine-600 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m8 3 4 8 5-5 2 15H2L8 3z"/>
              </svg>
            </div>
            <h1 className="font-display text-2xl text-stone-900 tracking-tight">Hütten-Tour Planner</h1>
          </div>
          <p className="text-stone-400 text-sm leading-relaxed">
            Plane deine Mehrtages-Hüttentour in den Alpen — automatisch oder individuell.
          </p>
        </div>

        {/* Two entry paths */}
        <div className="px-7 pb-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              const mapEl = document.querySelector('[data-map]')
              if (mapEl) mapEl.scrollIntoView()
            }}
            className="group bg-alpine-50 hover:bg-alpine-100 border border-alpine-200/60 rounded-xl p-4 text-left transition"
          >
            <div className="w-8 h-8 rounded-lg bg-alpine-600 flex items-center justify-center mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="m12 8-4 4h8"/>
              </svg>
            </div>
            <div className="text-sm font-semibold text-stone-800 mb-0.5">Entdecken</div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Region wählen, Kriterien einstellen, passende Touren finden
            </p>
          </button>

          <button
            onClick={() => router.push('/tour/custom')}
            className="group bg-summit-light/10 hover:bg-summit-light/20 border border-summit-DEFAULT/20 rounded-xl p-4 text-left transition"
          >
            <div className="w-8 h-8 rounded-lg bg-summit-DEFAULT flex items-center justify-center mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </div>
            <div className="text-sm font-semibold text-stone-800 mb-0.5">Eigene Tour</div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Hütten selbst wählen & Verfügbarkeit prüfen
            </p>
          </button>
        </div>

        {/* Divider */}
        <div className="px-7 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-stone-100" />
            <span className="text-[10px] font-medium text-stone-300 uppercase tracking-widest">Inspiration</span>
            <div className="flex-1 h-px bg-stone-100" />
          </div>
        </div>

        {/* Inspiration cards */}
        <div className="px-7 pb-5 space-y-3">
          {INSPIRATION.map((tour) => (
            <button
              key={tour.title}
              onClick={() => handleInspirationClick(tour.region)}
              className="w-full bg-stone-50 hover:bg-stone-100 border border-stone-200/60 rounded-xl p-4 text-left transition group"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-stone-800 group-hover:text-alpine-700 transition">
                    {tour.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-medium text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">{tour.days} Tage</span>
                    <span className="text-[10px] font-medium text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">{tour.distance}</span>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2" className="shrink-0 mt-1 transition group-hover:translate-x-0.5 group-hover:stroke-alpine-600">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed mb-3">{tour.description}</p>
              <div className="flex flex-wrap gap-1">
                {tour.huts.map((name, i) => (
                  <span key={i} className="text-[10px] text-stone-500 bg-white border border-stone-100 px-2 py-0.5 rounded-full">
                    {name}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Regions quick-select */}
        <div className="px-7 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-stone-100" />
            <span className="text-[10px] font-medium text-stone-300 uppercase tracking-widest">Regionen</span>
            <div className="flex-1 h-px bg-stone-100" />
          </div>
        </div>

        <div className="px-7 pb-7 grid grid-cols-2 gap-2">
          {ALPINE_REGIONS.map((region) => (
            <button
              key={region.id}
              onClick={() => handleRegionSelect(region)}
              className="flex items-center gap-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200/60 rounded-xl px-3.5 py-2.5 text-left transition group"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${REGION_COLORS[region.id] || 'bg-stone-400'}`} />
              <span className="text-sm text-stone-700 group-hover:text-stone-900 transition">{region.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right panel — map */}
      <div className="flex-1 relative" data-map>
        <AlpineMap onRegionSelect={handleRegionSelect} />

        {/* Bottom stats bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-stone-900/85 backdrop-blur-md text-white rounded-full px-6 py-3 flex items-center gap-6 text-sm shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="text-alpine-400 font-semibold">5</span>
              <span className="text-stone-300">Regionen</span>
            </div>
            <div className="w-px h-4 bg-stone-600" />
            <div className="flex items-center gap-2">
              <span className="text-summit-light font-semibold">100+</span>
              <span className="text-stone-300">Hütten</span>
            </div>
            <div className="w-px h-4 bg-stone-600" />
            <div className="flex items-center gap-2">
              <span className="text-glacier-light font-semibold">Live</span>
              <span className="text-stone-300">Verfügbarkeit</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
