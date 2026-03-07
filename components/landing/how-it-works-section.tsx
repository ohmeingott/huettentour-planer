const steps = [
  {
    number: 1,
    title: 'Region wählen',
    description:
      'Wähle eine der 5 Alpenregionen auf der interaktiven Karte als Ausgangspunkt für deine Tour.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-alpine-600"
      >
        <path d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z" />
        <path d="M9 4v13" />
        <path d="M15 7v13" />
      </svg>
    ),
  },
  {
    number: 2,
    title: 'Tour konfigurieren',
    description:
      'Passe Gruppengröße, Dauer, Etappen-Kriterien und Unterkunftsart an deine Vorstellungen an.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-alpine-600"
      >
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
  },
  {
    number: 3,
    title: 'Verfügbarkeit prüfen',
    description:
      'Prüfe die Live-Verfügbarkeit aller Hütten deiner Tour und finde freie Termine.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-alpine-600"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M9 16l2 2 4-4" />
      </svg>
    ),
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl text-stone-900 text-center mb-12">
          So funktioniert&apos;s
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-stone-50 rounded-xl p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-alpine-600 text-white flex items-center justify-center font-semibold text-sm">
                  {step.number}
                </div>
              </div>

              <div className="flex justify-center mb-4">{step.icon}</div>

              <h3 className="text-lg font-semibold text-stone-900 mb-2">
                {step.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
