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
  title: 'Hütten-Tour Planner',
  description: 'Plane deine Mehrtages-Hüttentour in den Alpen',
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
