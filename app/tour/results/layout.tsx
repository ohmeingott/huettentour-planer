import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tourvorschläge',
  description:
    'Entdecke passende Hüttentouren basierend auf deinen Kriterien. Vergleiche Routen, Etappen und Schwierigkeitsgrade.',
}

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return children
}
