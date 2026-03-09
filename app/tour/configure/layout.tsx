import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tour konfigurieren',
  description:
    'Konfiguriere deine Hüttentour: Wähle Gruppengröße, Dauer, Etappen und Unterkunftsart für deine Mehrtages-Wanderung in den Alpen.',
}

export default function ConfigureLayout({ children }: { children: React.ReactNode }) {
  return children
}
