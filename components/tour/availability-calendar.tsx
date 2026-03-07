'use client'

import { useState, useRef, useEffect } from 'react'

interface AvailabilityCalendarProps {
  results: {
    hutId: string
    hutName: string
    status: string
    dates: { date: string; available: boolean; roomTypes: { type: string; available: number }[]; confidence?: 'high' | 'low' }[]
    phone?: string | null
    email?: string | null
    website?: string | null
  }[]
  hutOrder?: string[]
}

/** Small popover showing contact info for a hut */
function ContactPopover({
  hutName,
  phone,
  email,
  website,
  onClose,
  anchorRef,
}: {
  hutName: string
  phone?: string | null
  email?: string | null
  website?: string | null
  onClose: () => void
  anchorRef: React.RefObject<HTMLElement | null>
}) {
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  const hasContact = phone || email || website
  const anchor = anchorRef.current
  if (!anchor) return null

  // Position relative to scroll container
  const rect = anchor.getBoundingClientRect()

  return (
    <div
      ref={popoverRef}
      className="fixed z-50 animate-fade-in-up"
      style={{ top: rect.bottom + 4, left: rect.left - 60 }}
    >
      <div className="bg-white rounded-xl shadow-xl border border-stone-200 p-4 w-[260px]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-amber-600 text-[10px] font-bold">?</span>
            </div>
            <span className="text-xs font-semibold text-stone-700">Unsichere Verfügbarkeit</span>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 transition">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-[11px] text-stone-500 mb-3 leading-relaxed">
          Die Verfügbarkeit von <span className="font-medium text-stone-700">{hutName}</span> konnte nicht sicher erkannt werden. Bitte direkt bei der Hütte nachfragen:
        </p>

        {hasContact ? (
          <div className="space-y-2">
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-alpine-700 bg-stone-50 hover:bg-alpine-50 rounded-lg px-3 py-2.5 transition group"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-400 group-hover:text-alpine-600 transition shrink-0">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span className="font-medium">{phone}</span>
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-alpine-700 bg-stone-50 hover:bg-alpine-50 rounded-lg px-3 py-2.5 transition group"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-400 group-hover:text-alpine-600 transition shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span className="font-medium">{email}</span>
              </a>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-alpine-700 bg-stone-50 hover:bg-alpine-50 rounded-lg px-3 py-2.5 transition group"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-400 group-hover:text-alpine-600 transition shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
                <span className="font-medium">Website</span>
              </a>
            )}
          </div>
        ) : (
          <p className="text-[11px] text-stone-400 italic">
            Keine Kontaktdaten vorhanden.
          </p>
        )}
      </div>
    </div>
  )
}

export default function AvailabilityCalendar({ results, hutOrder }: AvailabilityCalendarProps) {
  const [popover, setPopover] = useState<{ hutIdx: number; dateIdx: number } | null>(null)
  const cellRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  if (!results || results.length === 0) return null

  // Sort by tour order so staircase rows match the itinerary
  const sorted = hutOrder
    ? hutOrder
        .map((id) => results.find((r) => r.hutId === id))
        .filter((r): r is NonNullable<typeof r> => r != null)
    : results

  const allDates = sorted[0]?.dates.map((d) => d.date) || []
  const numHuts = sorted.length

  // --- Staircase logic ---
  // A valid start index s means: hut[i] is available on allDates[s + i] for every i
  const validStarts: number[] = []
  for (let s = 0; s <= allDates.length - numHuts; s++) {
    const valid = sorted.every((hut, i) => {
      const entry = hut.dates.find((d) => d.date === allDates[s + i])
      return entry?.available
    })
    if (valid) validStarts.push(s)
  }

  // Set of cells that belong to at least one valid staircase
  const staircaseCells = new Set<string>()
  for (const s of validStarts) {
    for (let i = 0; i < numHuts; i++) {
      staircaseCells.add(`${i}-${s + i}`)
    }
  }

  // Compute per-edge borders to draw the step-shaped outline.
  function staircaseBorders(hutIdx: number, dateIdx: number): string {
    if (!staircaseCells.has(`${hutIdx}-${dateIdx}`)) return ''

    const sides: string[] = []
    if (!staircaseCells.has(`${hutIdx - 1}-${dateIdx}`)) sides.push('border-t-2')
    if (!staircaseCells.has(`${hutIdx + 1}-${dateIdx}`)) sides.push('border-b-2')
    if (!staircaseCells.has(`${hutIdx}-${dateIdx - 1}`)) sides.push('border-l-2')
    if (!staircaseCells.has(`${hutIdx}-${dateIdx + 1}`)) sides.push('border-r-2')
    if (sides.length > 0) sides.push('border-alpine-500')

    return sides.join(' ')
  }

  // Group consecutive valid starts into bookable windows
  const windows: { startIdx: number; endIdx: number }[] = []
  for (const s of validStarts) {
    if (windows.length === 0 || s > windows[windows.length - 1].endIdx + 1) {
      windows.push({ startIdx: s, endIdx: s })
    } else {
      windows[windows.length - 1].endIdx = s
    }
  }

  // Check if any date across all huts has low confidence
  const hasAnyUncertain = sorted.some((hut) => hut.dates.some((d) => d.confidence === 'low'))

  return (
    <div>
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5 text-xs text-stone-500">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-alpine-600" />
          <span>Buchbar (Treppenlogik)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-alpine-100 border border-alpine-200" />
          <span>Frei, aber kein Fenster</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-red-100 border border-red-200" />
          <span>Belegt</span>
        </div>
        {hasAnyUncertain && (
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-amber-100 border border-amber-300 flex items-center justify-center">
              <span className="text-amber-600 text-[8px] font-bold">?</span>
            </div>
            <span>Unsicher — klicken für Kontakt</span>
          </div>
        )}
      </div>

      <div className="overflow-x-auto custom-scrollbar rounded-xl border border-stone-200">
        <table className="text-xs w-full" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead>
            <tr className="bg-stone-50">
              <th className="text-left py-3 px-4 font-semibold text-stone-600 sticky left-0 bg-stone-50 min-w-[180px] border-r border-stone-100 z-10">
                Hütte
              </th>
              <th className="py-3 px-1 text-center font-normal text-stone-400 min-w-[32px] sticky left-[180px] bg-stone-50 z-10 border-r border-stone-100">
                <div className="text-[10px] text-stone-400">Nacht</div>
              </th>
              {allDates.map((date) => (
                <th key={date} className="py-3 px-1.5 font-normal text-stone-400 min-w-[42px]">
                  <div className="font-medium text-stone-500">
                    {new Date(date).toLocaleDateString('de-DE', { day: '2-digit' })}
                  </div>
                  <div className="text-[10px]">
                    {new Date(date).toLocaleDateString('de-DE', { month: 'short' })}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((hut, hutIdx) => (
              <tr key={hut.hutId} className="hover:bg-stone-50/30 transition">
                <td className="py-2 px-4 font-medium text-stone-800 sticky left-0 bg-white border-r border-stone-100 z-10 border-t border-t-stone-100">
                  <div className="flex items-center gap-2">
                    {hut.hutName}
                    {hut.status === 'error' && (
                      <span className="text-amber-500 text-[10px] bg-amber-50 px-1.5 py-0.5 rounded">
                        Fehler
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-2 px-1 text-center sticky left-[180px] bg-white border-r border-stone-100 z-10 border-t border-t-stone-100">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-stone-100 text-[10px] font-semibold text-stone-500">
                    {hutIdx + 1}
                  </span>
                </td>
                {hut.dates.map((d, dateIdx) => {
                  const isStaircase = staircaseCells.has(`${hutIdx}-${dateIdx}`)
                  const borders = staircaseBorders(hutIdx, dateIdx)
                  const isUncertain = d.confidence === 'low'
                  const cellKey = `${hutIdx}-${dateIdx}`
                  const isPopoverOpen = popover?.hutIdx === hutIdx && popover?.dateIdx === dateIdx

                  return (
                    <td
                      key={d.date}
                      className={`py-1 px-0.5 text-center border-t border-t-stone-50 ${borders} ${
                        isStaircase ? 'bg-alpine-50/60' : ''
                      }`}
                    >
                      {isUncertain ? (
                        <button
                          ref={(el) => {
                            if (el) cellRefs.current.set(cellKey, el)
                          }}
                          onClick={() => setPopover(isPopoverOpen ? null : { hutIdx, dateIdx })}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto text-[10px] font-bold transition cursor-pointer
                            bg-amber-100 text-amber-600 border border-amber-300 hover:bg-amber-200 hover:border-amber-400 hover:shadow-sm
                          `}
                          title={`Unsicher — klicken für Kontaktdaten von ${hut.hutName}`}
                        >
                          ?
                        </button>
                      ) : (
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto text-[10px] font-medium transition ${
                            d.available
                              ? isStaircase
                                ? 'bg-alpine-600 text-white shadow-sm'
                                : 'bg-alpine-100 text-alpine-700'
                              : 'bg-red-100 text-red-500'
                          }`}
                          title={d.roomTypes.map((rt) => `${rt.type}: ${rt.available}`).join(', ')}
                        >
                          {d.available ? '\u2713' : '\u2717'}
                        </div>
                      )}

                      {/* Contact popover */}
                      {isPopoverOpen && (
                        <ContactPopover
                          hutName={hut.hutName}
                          phone={hut.phone}
                          email={hut.email}
                          website={hut.website}
                          onClose={() => setPopover(null)}
                          anchorRef={{ current: cellRefs.current.get(cellKey) || null }}
                        />
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Available windows */}
      {windows.length > 0 && (
        <div className="mt-6 p-5 bg-alpine-50 rounded-xl border border-alpine-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-alpine-500 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-semibold text-alpine-900">Verfügbare Zeitfenster</h3>
          </div>
          <div className="space-y-2.5">
            {windows.map((w, i) => {
              const firstNight = allDates[w.startIdx]
              const lastNight = allDates[w.endIdx + numHuts - 1]
              const numStartOptions = w.endIdx - w.startIdx + 1
              return (
                <div key={i} className="text-sm text-alpine-700">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-alpine-400" />
                    <span className="font-medium">
                      {new Date(firstNight).toLocaleDateString('de-DE', { day: '2-digit', month: 'long' })}
                      {' '}&ndash;{' '}
                      {new Date(lastNight).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="ml-4 text-xs text-alpine-500 mt-0.5">
                    {numHuts} Nächte &middot;{' '}
                    {numStartOptions === 1
                      ? `Start am ${new Date(allDates[w.startIdx]).toLocaleDateString('de-DE', { day: '2-digit', month: 'long' })}`
                      : `${numStartOptions} mögliche Starttermine (${new Date(allDates[w.startIdx]).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })} – ${new Date(allDates[w.endIdx]).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })})`}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {windows.length === 0 && sorted.length > 0 && (
        <div className="mt-6 p-5 bg-red-50 rounded-xl border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
            <h3 className="font-semibold text-red-900">Kein Zeitfenster gefunden</h3>
          </div>
          <p className="text-sm text-red-700 ml-8">
            Keine {numHuts} aufeinanderfolgenden Nächte mit versetzter Verfügbarkeit in allen Hütten.
            Versuche einen anderen Zeitraum oder andere Tour.
          </p>
        </div>
      )}
    </div>
  )
}
