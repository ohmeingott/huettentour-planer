'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 2 15H2L8 3z"/>
      </svg>
    ),
    title: 'Echte Routen',
    description: 'Routen aus OpenStreetMap mit BRouter-Profilen berechnet — keine Luftlinien, sondern echte Wanderwege mit Höhenprofil.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
      </svg>
    ),
    title: 'Live-Verfügbarkeit',
    description: 'Prüfe in Echtzeit, ob deine gewünschten Hütten an deinen Wunsch-Daten freie Betten haben — direkt aus den Buchungssystemen.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
    title: '100+ Hütten',
    description: 'Stubaier Alpen, Zillertaler Alpen und mehr — sorgfältig kuratierte Hütten mit Fotos, Kapazitäten und Kontaktdaten.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: 'Flexibel konfigurierbar',
    description: 'Gruppengröße, Etappenlänge, Rasttage, Rundtour oder Strecke — der Algorithmus findet die besten Touren für deine Kriterien.',
  },
]

const STEPS = [
  {
    step: '01',
    title: 'Region wählen',
    description: 'Wähle deine Wunschregion auf der interaktiven Karte — von den Stubaier Alpen bis ins Zillertal.',
    color: 'bg-alpine-600',
  },
  {
    step: '02',
    title: 'Tour konfigurieren',
    description: 'Stelle Tage, Gruppengröße und Schwierigkeit ein. Unser Algorithmus findet die besten Routen.',
    color: 'bg-summit-DEFAULT',
  },
  {
    step: '03',
    title: 'Verfügbarkeit prüfen',
    description: 'Prüfe live, ob alle Hütten an deinen Wunsch-Daten freie Plätze haben.',
    color: 'bg-glacier-light',
  },
  {
    step: '04',
    title: 'Buchen & losziehen',
    description: 'Direkt-Links zu den Buchungssystemen. Pack den Rucksack und auf geht\'s!',
    color: 'bg-alpine-800',
  },
]

const TOURS = [
  {
    title: 'Stubaier Höhenweg',
    region: 'Stubaier Alpen',
    days: '5–7 Tage',
    distance: '~35 km',
    difficulty: 'Mittel',
    huts: ['Innsbrucker Hütte', 'Bremer Hütte', 'Nürnberger Hütte', 'Sulzenau Hütte', 'Neue Regensburger Hütte'],
    description: 'Der Klassiker unter den Hüttentouren. Spektakuläre Hochgebirgspfade durch die Stubaier Alpen mit Blick auf Gletscher und 3000er.',
    regionSlug: 'stubaier-alpen',
    gradient: 'from-alpine-600 to-alpine-800',
  },
  {
    title: 'Berliner Höhenweg',
    region: 'Zillertaler Alpen',
    days: '6–8 Tage',
    distance: '~45 km',
    difficulty: 'Anspruchsvoll',
    huts: ['Gamshütte', 'Berliner Hütte', 'Greizer Hütte', 'Kasseler Hütte', 'Karl-von-Edel-Hütte'],
    description: 'Rund um den Zillertaler Hauptkamm mit der denkmalgeschützten Berliner Hütte als Herzstück. Für erfahrene Bergsteiger.',
    regionSlug: 'zillertal',
    gradient: 'from-emerald-600 to-emerald-800',
  },
]

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-alpine-900 via-alpine-800 to-alpine-700" />
        <div className="absolute inset-0 bg-topo opacity-10" />
        {/* Mountain silhouette decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 320" className="w-full text-white" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,218.7C672,213,768,171,864,165.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium px-4 py-2 rounded-full mb-8 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-available animate-pulse" />
              Live-Verfügbarkeit aktiv
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              Deine Hüttentour,<br />
              <span className="text-alpine-300">perfekt geplant.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl mb-10">
              Finde die ideale Mehrtages-Hüttentour in den Alpen — mit echten Wanderwegen, Höhenprofilen und Live-Verfügbarkeit der Hütten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/planner"
                className="inline-flex items-center justify-center gap-2 bg-white text-alpine-800 font-semibold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-stone-50 transition-all group"
              >
                Tour planen
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <a
                href="#so-funktionierts"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-medium text-base px-8 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-all"
              >
                Mehr erfahren
              </a>
            </div>
          </div>

          {/* Stats floating */}
          <div className="mt-16 flex flex-wrap gap-8 lg:gap-16">
            <div>
              <div className="text-3xl font-display text-white">100+</div>
              <div className="text-sm text-white/50 mt-1">Hütten</div>
            </div>
            <div>
              <div className="text-3xl font-display text-white">5</div>
              <div className="text-sm text-white/50 mt-1">Regionen</div>
            </div>
            <div>
              <div className="text-3xl font-display text-white">Live</div>
              <div className="text-sm text-white/50 mt-1">Verfügbarkeit</div>
            </div>
            <div>
              <div className="text-3xl font-display text-white">Kostenlos</div>
              <div className="text-sm text-white/50 mt-1">Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section id="features" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-alpine-600 mb-3 block">Features</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-stone-900">
              Alles, was du für die<br />
              <span className="text-alpine-600">perfekte Tour</span> brauchst
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className="group bg-stone-50 hover:bg-white border border-stone-200/60 hover:border-alpine-200 rounded-2xl p-6 lg:p-8 transition-all hover:shadow-lg"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-alpine-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="so-funktionierts" className="py-24 lg:py-32 bg-stone-50 bg-topo">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-alpine-600 mb-3 block">So funktioniert&apos;s</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-stone-900">
              In 4 Schritten zur<br />
              <span className="text-alpine-600">Traumtour</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {STEPS.map((step, i) => (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(100%+4px)] w-[calc(100%-24px)] h-px bg-stone-300 z-0" />
                )}
                <div className="relative bg-white rounded-2xl p-6 lg:p-8 border border-stone-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-full ${step.color} text-white text-sm font-bold flex items-center justify-center mb-5`}>
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== APP SHOWCASE ==================== */}
      <section id="app" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-alpine-600 mb-3 block">Der Planer</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-stone-900 mb-4">
              Starte jetzt mit der<br />
              <span className="text-alpine-600">Tourenplanung</span>
            </h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              Wähle eine Region, konfiguriere deine Wunschtour und prüfe die Verfügbarkeit — alles in einem Tool.
            </p>
          </div>

          {/* App Preview Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Browser chrome */}
            <div className="bg-stone-100 rounded-t-2xl border border-stone-200 border-b-0 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-stone-300" />
                <div className="w-3 h-3 rounded-full bg-stone-300" />
                <div className="w-3 h-3 rounded-full bg-stone-300" />
              </div>
              <div className="flex-1 bg-white rounded-lg px-4 py-1.5 text-xs text-stone-400 text-center border border-stone-200">
                huettentour-planer.app/planner
              </div>
            </div>

            {/* App embed */}
            <div className="border border-stone-200 rounded-b-2xl overflow-hidden shadow-2xl bg-white">
              <div className="relative h-[500px] lg:h-[600px] flex">
                {/* Left panel mockup */}
                <div className="w-[360px] lg:w-[400px] flex-shrink-0 bg-white border-r border-stone-200 p-6 overflow-hidden">
                  {/* Logo */}
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-alpine-600 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m8 3 4 8 5-5 2 15H2L8 3z"/>
                      </svg>
                    </div>
                    <span className="font-display text-lg text-stone-900">Hütten-Tour Planner</span>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-alpine-50 border border-alpine-200/60 rounded-xl p-3">
                      <div className="w-7 h-7 rounded-lg bg-alpine-600 flex items-center justify-center mb-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m12 8-4 4h8"/></svg>
                      </div>
                      <div className="text-xs font-semibold text-stone-800">Entdecken</div>
                    </div>
                    <div className="bg-summit-light/10 border border-summit-DEFAULT/20 rounded-xl p-3">
                      <div className="w-7 h-7 rounded-lg bg-summit-DEFAULT flex items-center justify-center mb-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                      </div>
                      <div className="text-xs font-semibold text-stone-800">Eigene Tour</div>
                    </div>
                  </div>

                  {/* Inspiration */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 h-px bg-stone-100" />
                    <span className="text-[10px] font-medium text-stone-300 uppercase tracking-widest">Inspiration</span>
                    <div className="flex-1 h-px bg-stone-100" />
                  </div>

                  {TOURS.map((tour) => (
                    <button
                      key={tour.title}
                      onClick={() => router.push(`/tour/configure?region=${tour.regionSlug}`)}
                      className="w-full bg-stone-50 hover:bg-stone-100 border border-stone-200/60 rounded-xl p-3.5 text-left transition group mb-2.5"
                    >
                      <div className="flex items-start justify-between mb-1.5">
                        <div>
                          <h3 className="text-xs font-semibold text-stone-800 group-hover:text-alpine-700 transition">{tour.title}</h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[9px] font-medium text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded-full">{tour.days}</span>
                            <span className="text-[9px] font-medium text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded-full">{tour.distance}</span>
                          </div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2" className="shrink-0 mt-0.5 group-hover:stroke-alpine-600 transition">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                      <p className="text-[10px] text-stone-400 leading-relaxed">{tour.description}</p>
                    </button>
                  ))}
                </div>

                {/* Right panel — map placeholder */}
                <div className="flex-1 relative bg-gradient-to-br from-alpine-50 via-stone-100 to-alpine-100">
                  {/* Fake map content */}
                  <div className="absolute inset-0 bg-topo opacity-30" />
                  {/* Mountain shapes */}
                  <svg className="absolute bottom-0 left-0 right-0 text-alpine-200/40" viewBox="0 0 800 200" preserveAspectRatio="none">
                    <path d="M0 200 L150 80 L250 140 L400 40 L500 120 L650 20 L800 100 L800 200Z" fill="currentColor"/>
                  </svg>
                  {/* Hut dots */}
                  <div className="absolute top-[30%] left-[25%] w-3 h-3 rounded-full bg-summit-light shadow-lg animate-pulse" />
                  <div className="absolute top-[45%] left-[40%] w-3 h-3 rounded-full bg-summit-light shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute top-[35%] left-[55%] w-3 h-3 rounded-full bg-summit-light shadow-lg animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="absolute top-[50%] left-[70%] w-3 h-3 rounded-full bg-summit-light shadow-lg animate-pulse" style={{ animationDelay: '1.5s' }} />
                  <div className="absolute top-[25%] left-[60%] w-3 h-3 rounded-full bg-summit-light shadow-lg animate-pulse" style={{ animationDelay: '2s' }} />
                  {/* Route line */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M25 30 L40 45 L55 35 L70 50 L60 25" fill="none" stroke="#287050" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.6"/>
                  </svg>

                  {/* Overlay CTA */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link
                      href="/planner"
                      className="bg-alpine-600 hover:bg-alpine-700 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all group flex items-center gap-2 text-lg"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m12 8-4 4h8"/></svg>
                      Interaktive Karte öffnen
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>

                  {/* Bottom stats bar */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-stone-900/85 backdrop-blur-md text-white rounded-full px-5 py-2.5 flex items-center gap-5 text-xs shadow-2xl">
                      <div className="flex items-center gap-1.5">
                        <span className="text-alpine-400 font-semibold">5</span>
                        <span className="text-stone-300">Regionen</span>
                      </div>
                      <div className="w-px h-3 bg-stone-600" />
                      <div className="flex items-center gap-1.5">
                        <span className="text-summit-light font-semibold">100+</span>
                        <span className="text-stone-300">Hütten</span>
                      </div>
                      <div className="w-px h-3 bg-stone-600" />
                      <div className="flex items-center gap-1.5">
                        <span className="text-glacier-light font-semibold">Live</span>
                        <span className="text-stone-300">Verfügbarkeit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TOUR HIGHLIGHTS ==================== */}
      <section className="py-24 lg:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-alpine-600 mb-3 block">Beliebte Touren</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-stone-900">
              Inspiration für deine<br />
              <span className="text-alpine-600">nächste Tour</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {TOURS.map((tour) => (
              <button
                key={tour.title}
                onClick={() => router.push(`/tour/configure?region=${tour.regionSlug}`)}
                className="group bg-white border border-stone-200/60 rounded-2xl overflow-hidden hover:shadow-xl transition-all text-left"
              >
                {/* Top banner */}
                <div className={`bg-gradient-to-r ${tour.gradient} px-8 py-8 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-topo opacity-10" />
                  {/* Mountain silhouette */}
                  <svg className="absolute bottom-0 left-0 right-0 text-white/10" viewBox="0 0 400 80" preserveAspectRatio="none">
                    <path d="M0 80 L80 30 L140 60 L200 10 L280 50 L350 20 L400 40 L400 80Z" fill="currentColor"/>
                  </svg>
                  <div className="relative">
                    <div className="text-white/60 text-xs font-medium mb-1">{tour.region}</div>
                    <h3 className="font-display text-2xl lg:text-3xl text-white">{tour.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-sm text-stone-500 leading-relaxed mb-5">{tour.description}</p>

                  {/* Stats */}
                  <div className="flex gap-4 mb-5">
                    <span className="text-xs font-medium text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full">{tour.days}</span>
                    <span className="text-xs font-medium text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full">{tour.distance}</span>
                    <span className="text-xs font-medium text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full">{tour.difficulty}</span>
                  </div>

                  {/* Huts */}
                  <div className="flex flex-wrap gap-1.5">
                    {tour.huts.map((hut) => (
                      <span key={hut} className="text-[11px] text-stone-600 bg-alpine-50 border border-alpine-100 px-2.5 py-1 rounded-full">
                        {hut}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-alpine-600 text-sm font-semibold group-hover:gap-3 transition-all">
                    Tour planen
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-alpine-800 via-alpine-700 to-alpine-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-topo opacity-5" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
            Bereit für die Berge?
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
            Plane jetzt deine Hüttentour — kostenlos, mit echten Routen und Live-Verfügbarkeit.
          </p>
          <Link
            href="/planner"
            className="inline-flex items-center justify-center gap-2 bg-white text-alpine-800 font-semibold text-lg px-10 py-5 rounded-full shadow-xl hover:shadow-2xl hover:bg-stone-50 transition-all group"
          >
            Jetzt Tour planen
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
