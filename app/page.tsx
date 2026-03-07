'use client'

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useAppStore } from '@/lib/store'
import { MapRegion } from '@/lib/map/regions'
import HowItWorksSection from '@/components/landing/how-it-works-section'
import FaqSection from '@/components/landing/faq-section'
import Footer from '@/components/layout/footer'

const AlpineMap = dynamic(() => import('@/components/map/alpine-map'), { ssr: false })

export default function Home() {
  const router = useRouter()
  const { selectedRegionId, setSelectedRegionId } = useAppStore()

  const handleRegionSelect = (region: MapRegion) => {
    setSelectedRegionId(region.id)
    router.push(`/tour/configure?region=${region.id}`)
  }

  return (
    <main>
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-topo bg-stone-50 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-stone-50" />

        {/* Decorative mountain silhouette at bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full text-white opacity-60"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,120 L0,80 Q180,20 360,60 T720,40 T1080,70 T1440,30 L1440,120 Z" />
        </svg>

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center animate-fade-in-up">
          {/* Logo */}
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

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl text-stone-900 tracking-tight leading-[1.1] mb-6">
            Plane deine Mehrtages-Hüttentour in den Alpen
          </h1>

          {/* Subtext */}
          <p className="text-lg text-stone-500 leading-relaxed max-w-lg mx-auto mb-10">
            Finde die perfekte Route, konfiguriere deine Tour und prüfe die Verfügbarkeit aller Hütten — alles an einem Ort.
          </p>

          {/* CTA */}
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

          {/* Stats */}
          <div className="mt-14 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-alpine-600">5</span>
              <span className="text-stone-400">Regionen</span>
            </div>
            <div className="w-px h-4 bg-stone-300" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-summit-light">100+</span>
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

      {/* ─── How It Works ─── */}
      <HowItWorksSection />

      {/* ─── Map Section ─── */}
      <section id="map" className="bg-stone-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl text-stone-900 mb-3">
              Wähle deine Region
            </h2>
            <p className="text-stone-500 text-base">
              Klicke auf eine Region um deine Hüttentour zu planen
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/60" style={{ height: '70vh' }}>
            <AlpineMap onRegionSelect={handleRegionSelect} selectedRegionId={selectedRegionId} />
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <FaqSection />

      {/* ─── Footer ─── */}
      <Footer />
    </main>
  )
}
