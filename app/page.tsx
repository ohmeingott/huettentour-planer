'use client'

import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useAppStore } from '@/lib/store'
import { MapRegion, ALPINE_REGIONS } from '@/lib/map/regions'
import HowItWorksSection from '@/components/landing/how-it-works-section'
import FaqSection from '@/components/landing/faq-section'
import Footer from '@/components/layout/footer'

const AlpineMap = dynamic(() => import('@/components/map/alpine-map'), { ssr: false })

interface RegionData {
  huts: { id: string; name: string; lat: number; lng: number; altitude: number; imageUrl?: string | null; capacity?: number }[]
  routes: { fromHutId: string; toHutId: string; difficulty?: string; gpxTrack?: [number, number][] | null }[]
  accessPoints: { id: string; name: string; type: string; altitude: number; lat: number; lng: number }[]
}

export default function Home() {
  const router = useRouter()
  const { selectedRegionId, setSelectedRegionId } = useAppStore()
  const [regionData, setRegionData] = useState<RegionData | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRegionSelect = useCallback(async (region: MapRegion) => {
    // Skip if this region is already selected (avoids re-fetch that kills popups)
    if (selectedRegionId === region.id) return

    setSelectedRegionId(region.id)
    setSelectedRegion(region)
    setLoading(true)

    try {
      const [hutsRes, apRes] = await Promise.all([
        fetch(`/api/huts?slug=${region.id}&includeRoutes=true`),
        fetch(`/api/access-points?slug=${region.id}`),
      ])
      const hutsData = await hutsRes.json()
      const apData = await apRes.json()
      setRegionData({
        ...hutsData,
        accessPoints: Array.isArray(apData) ? apData.map((ap: { id: string; name: string; type: string; altitude: number; lat: number; lng: number }) => ({
          id: ap.id, name: ap.name, type: ap.type, altitude: ap.altitude, lat: ap.lat, lng: ap.lng,
        })) : [],
      })
    } catch {
      setRegionData(null)
    } finally {
      setLoading(false)
    }
  }, [selectedRegionId, setSelectedRegionId])

  const handleBack = useCallback(() => {
    setSelectedRegionId(null)
    setSelectedRegion(null)
    setRegionData(null)
  }, [setSelectedRegionId])

  // Build unique route lines from the routes data (deduplicate A→B / B→A)
  const routeLines = regionData
    ? (() => {
        const seen = new Set<string>()
        const lines: { coordinates: [number, number][]; difficulty?: string }[] = []
        for (const route of regionData.routes) {
          const key = [route.fromHutId, route.toHutId].sort().join('-')
          if (seen.has(key)) continue
          seen.add(key)
          if (route.gpxTrack && route.gpxTrack.length >= 2) {
            lines.push({ coordinates: route.gpxTrack, difficulty: route.difficulty })
          } else {
            const from = regionData.huts.find((h) => h.id === route.fromHutId)
            const to = regionData.huts.find((h) => h.id === route.toHutId)
            if (from && to) {
              lines.push({ coordinates: [[from.lng, from.lat], [to.lng, to.lat]], difficulty: route.difficulty })
            }
          }
        }
        return lines
      })()
    : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Hüttentour Planer',
        url: 'http://localhost:3000',
        description: 'Plane deine Mehrtages-Hüttentour in den Alpen. Finde die perfekte Route und prüfe die Verfügbarkeit aller Hütten.',
        inLanguage: 'de-DE',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Was ist eine Hüttentour?',
            acceptedAnswer: { '@type': 'Answer', text: 'Eine Hüttentour ist eine mehrtägige Wanderung in den Alpen, bei der du von Berghütte zu Berghütte wanderst. Jede Nacht übernachtest du in einer anderen Hütte – ein einzigartiges Erlebnis mit atemberaubenden Bergpanoramen.' },
          },
          {
            '@type': 'Question',
            name: 'Wie funktioniert die Verfügbarkeitsprüfung?',
            acceptedAnswer: { '@type': 'Answer', text: 'Wir prüfen die Echtzeit-Verfügbarkeit aller Hütten deiner geplanten Tour. So siehst du auf einen Blick, an welchen Terminen deine gesamte Tour buchbar ist – ohne jede Hütte einzeln abzufragen.' },
          },
          {
            '@type': 'Question',
            name: 'Welche Regionen sind verfügbar?',
            acceptedAnswer: { '@type': 'Answer', text: 'Aktuell unterstützen wir 2 Alpenregionen: Stubaier Alpen und Zillertaler Alpen. Weitere Regionen folgen.' },
          },
          {
            '@type': 'Question',
            name: 'Was kostet die Nutzung?',
            acceptedAnswer: { '@type': 'Answer', text: 'Der Hüttentour Planer ist komplett kostenlos. Wir möchten die Planung von Hüttentouren für alle Bergbegeisterten so einfach wie möglich machen.' },
          },
        ],
      },
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-topo bg-stone-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-stone-50" />

        <svg
          className="absolute bottom-0 left-0 w-full text-white opacity-60"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,120 L0,80 Q180,20 360,60 T720,40 T1080,70 T1440,30 L1440,120 Z" />
        </svg>

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center animate-fade-in-up">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.png"
              alt="Hüttentour Planer"
              width={200}
              height={100}
              className="h-24 w-auto opacity-90"
              priority
            />
          </div>

          <h1 className="font-display text-5xl sm:text-6xl text-stone-900 tracking-tight leading-[1.1] mb-6">
            Plane deine Mehrtages-Hüttentour in den Alpen
          </h1>

          <p className="text-lg text-stone-500 leading-relaxed max-w-lg mx-auto mb-10">
            Finde die perfekte Route, konfiguriere deine Tour und prüfe die Verfügbarkeit aller Hütten — alles an einem Ort.
          </p>

          <a
            href="#map"
            className="inline-flex items-center gap-2 bg-alpine-600 text-white rounded-xl px-7 py-3.5 text-base font-medium hover:bg-alpine-700 transition-all hover:shadow-lg hover:shadow-alpine-600/20 active:scale-[0.98]"
          >
            Jetzt Tour planen
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>

          <div className="mt-14 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-alpine-600">2</span>
              <span className="text-stone-400">Regionen</span>
            </div>
            <div className="w-px h-4 bg-stone-300" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-summit-light">27</span>
              <span className="text-stone-400">Hütten</span>
            </div>
            <div className="w-px h-4 bg-stone-300" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-glacier-light">Live</span>
              <span className="text-stone-400">Verfügbarkeit</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorksSection />

      {/* Map Section */}
      <section id="map" className="bg-stone-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl text-stone-900 mb-3">
              {selectedRegion ? selectedRegion.name : 'Wähle deine Region'}
            </h2>
            <p className="text-stone-500 text-base">
              {selectedRegion
                ? `${regionData?.huts.length ?? '...'} Hütten mit ${routeLines?.length ?? '...'} Verbindungen`
                : 'Klicke auf eine Region um die Hütten und Verbindungen zu sehen'
              }
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/60" style={{ height: '70vh' }}>
            <AlpineMap
              onRegionSelect={handleRegionSelect}
              selectedRegionId={selectedRegionId}
              huts={regionData?.huts}
              accessPoints={regionData?.accessPoints}
              routeLines={routeLines}
            />

            {/* Region info overlay */}
            {selectedRegion && regionData && (
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10">
                {/* Back button */}
                <button
                  onClick={handleBack}
                  className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-stone-200/60 px-4 py-2.5 text-sm text-stone-600 hover:text-alpine-700 transition flex items-center gap-1.5"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Alle Regionen
                </button>

                {/* Configure tour CTA */}
                <button
                  onClick={() => router.push(`/tour/configure?region=${selectedRegion.id}`)}
                  className="bg-alpine-700 text-white rounded-xl shadow-lg px-6 py-3 font-medium hover:bg-alpine-800 transition flex items-center gap-2"
                >
                  Tour planen
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Loading indicator */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg px-5 py-3 flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-alpine-600" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="text-sm text-stone-600">Hütten laden...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
