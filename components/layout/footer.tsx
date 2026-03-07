import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-alpine-600 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 3 4 8 5-5 2 15H2L8 3z"/>
                </svg>
              </div>
              <span className="font-display text-xl text-white tracking-tight">Hütten-Tour Planner</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Plane deine Mehrtages-Hüttentour in den Alpen — mit echten Routen, Höhenprofilen und Live-Verfügbarkeit. Kostenlos und Open Source.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Planer</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/planner" className="hover:text-white transition">Tour starten</Link></li>
              <li><Link href="/tour/custom" className="hover:text-white transition">Eigene Tour</Link></li>
              <li><Link href="/tour/configure?region=stubaier-alpen" className="hover:text-white transition">Stubaier Alpen</Link></li>
              <li><Link href="/tour/configure?region=zillertal" className="hover:text-white transition">Zillertaler Alpen</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Info</h4>
            <ul className="space-y-2.5 text-sm">
              <li><span className="text-stone-500">Daten: OpenStreetMap</span></li>
              <li><span className="text-stone-500">Routing: BRouter</span></li>
              <li><span className="text-stone-500">Karten: OpenFreeMap</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} Hütten-Tour Planner. Daten von OpenStreetMap-Beitragenden.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <span>Gebaut mit</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444" stroke="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>in den Alpen</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
