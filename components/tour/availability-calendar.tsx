interface AvailabilityCalendarProps {
  results: {
    hutId: string
    hutName: string
    status: string
    dates: { date: string; available: boolean; roomTypes: { type: string; available: number }[] }[]
  }[]
  hutOrder?: string[]
}

export default function AvailabilityCalendar({ results, hutOrder }: AvailabilityCalendarProps) {
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
  // A border appears on any edge where the neighbour is NOT a staircase cell.
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

                  return (
                    <td
                      key={d.date}
                      className={`py-1 px-0.5 text-center border-t border-t-stone-50 ${borders} ${
                        isStaircase ? 'bg-alpine-50/60' : ''
                      }`}
                    >
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
