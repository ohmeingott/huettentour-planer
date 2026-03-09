import type { Metadata } from 'next'
import { DM_Sans, Instrument_Serif } from 'next/font/google'
import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import Header from '@/components/layout/header'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Hüttentour Planer — Mehrtages-Hüttentouren in den Alpen planen',
    template: '%s | Hüttentour Planer',
  },
  description:
    'Plane deine Mehrtages-Hüttentour in den Alpen. Finde die perfekte Route, konfiguriere deine Tour und prüfe die Verfügbarkeit aller Hütten — alles an einem Ort.',
  applicationName: 'Hüttentour Planer',
  keywords: [
    'Hüttentour',
    'Alpen',
    'Mehrtages-Wanderung',
    'Berghütte',
    'Hüttenwanderung',
    'Stubaier Alpen',
    'Zillertaler Alpen',
    'Tourenplanung',
    'Verfügbarkeit',
    'Hüttenreservierung',
  ],
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Hüttentour Planer',
    title: 'Hüttentour Planer — Mehrtages-Hüttentouren in den Alpen planen',
    description:
      'Finde die perfekte Route, konfiguriere deine Tour und prüfe die Verfügbarkeit aller Hütten — alles an einem Ort.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hüttentour Planer — Mehrtages-Hüttentouren in den Alpen',
    description:
      'Finde die perfekte Route und prüfe die Verfügbarkeit aller Hütten in den Alpen.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body className="font-body antialiased">
        <Header />
        {children}
      </body>
    </html>
  )
}
