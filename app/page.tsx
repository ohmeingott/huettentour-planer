'use client'

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAppStore } from '@/lib/store'
import { MapRegion } from '@/lib/map/regions'

const AlpineMap = dynamic(() => import('@/components/map/alpine-map'), { ssr: false })

export default function Home() {
  const router = useRouter()
  const { selectedRegionId, setSelectedRegionId } = useAppStore()

  const handleRegionSelect = (region: MapRegion) => {
    setSelectedRegionId(region.id)
    router.push(`/tour/configure?region=${region.id}`)
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0">
        <AlpineMap onRegionSelect={handleRegionSelect} selectedRegionId={selectedRegionId} />
      </div>

      {/* Hero card */}
      <div className="absolute top-8 left-8 z-10 animate-fade-in-up">
        <div className="bg-white/92 backdrop-blur-md rounded-2xl shadow-xl border border-stone-200/60 p-7 max-w-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-alpine-600 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m8 3 4 8 5-5 2 15H2L8 3z"/>
              </svg>
            </div>
            <h1 className="font-display text-2xl text-stone-900 tracking-tight">Hütten-Tour Planner</h1>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed mb-5">
            Plane deine Mehrtages-Hüttentour in den Alpen. Wähle eine Region auf der Karte um zu starten.
          </p>
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="m12 8-4 4h8"/>
            </svg>
            <span>Klicke auf eine Region</span>
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
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
    </main>
  )
}
