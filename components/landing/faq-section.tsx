'use client'

import { useState } from 'react'

const faqItems: { question: string; answer: string }[] = [
  {
    question: 'Was ist eine Hüttentour?',
    answer:
      'Eine Hüttentour ist eine mehrtägige Wanderung in den Alpen, bei der du von Berghütte zu Berghütte wanderst. Jede Nacht übernachtest du in einer anderen Hütte – ein einzigartiges Erlebnis mit atemberaubenden Bergpanoramen.',
  },
  {
    question: 'Wie funktioniert die Verfügbarkeitsprüfung?',
    answer:
      'Wir prüfen die Echtzeit-Verfügbarkeit aller Hütten deiner geplanten Tour. So siehst du auf einen Blick, an welchen Terminen deine gesamte Tour buchbar ist – ohne jede Hütte einzeln abzufragen.',
  },
  {
    question: 'Welche Regionen sind verfügbar?',
    answer:
      'Aktuell unterstützen wir 2 Alpenregionen: Stubaier Alpen und Zillertaler Alpen. Weitere Regionen folgen.',
  },
  {
    question: 'Muss ich die Hütten selbst buchen?',
    answer:
      'Ja, wir zeigen dir die Verfügbarkeit an, aber die Buchung erfolgt direkt bei den jeweiligen Hütten über deren Webseiten. So behältst du die volle Kontrolle über deine Reservierungen.',
  },
  {
    question: 'Für wie viele Tage kann ich planen?',
    answer:
      'Du kannst Touren von 2 bis 14 Tagen planen. Dabei kannst du auch Ruhetage einplanen, an denen du in derselben Hütte bleibst.',
  },
  {
    question: 'Was kostet die Nutzung?',
    answer:
      'Der Hüttentour Planer ist komplett kostenlos. Wir möchten die Planung von Hüttentouren für alle Bergbegeisterten so einfach wie möglich machen.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id="faq" className="bg-stone-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl text-stone-900 text-center mb-12">
          Häufig gestellte Fragen
        </h2>

        <div className="divide-y divide-stone-200">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className="border-b border-stone-200 last:border-b-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-5 text-left"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base font-medium transition-colors ${
                      isOpen ? 'text-alpine-600' : 'text-stone-900'
                    }`}
                  >
                    {item.question}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`ml-4 shrink-0 text-stone-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <p className="pb-5 text-sm text-stone-500 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
