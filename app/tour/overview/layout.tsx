import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tourübersicht',
  description:
    'Deine ausgewählte Hüttentour im Detail: Alle Hütten, Etappen, Höhenmeter und Entfernungen auf einen Blick.',
}

export default function OverviewLayout({ children }: { children: React.ReactNode }) {
  return children
}
