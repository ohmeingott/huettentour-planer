import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verfügbarkeit prüfen',
  description:
    'Prüfe die Live-Verfügbarkeit aller Hütten deiner geplanten Tour und finde freie Termine für deine Hüttenwanderung.',
}

export default function AvailabilityLayout({ children }: { children: React.ReactNode }) {
  return children
}
