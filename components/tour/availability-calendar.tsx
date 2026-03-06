interface AvailabilityCalendarProps {
  results: {
    hutId: string
    hutName: string
    status: string
    dates: { date: string; available: boolean; roomTypes: { type: string; available: number }[] }[]
  }[]
}

export default function AvailabilityCalendar({ results }: AvailabilityCalendarProps) {
  if (!results || results.length === 0) return null

  const allDates = results[0]?.dates.map((d) => d.date) || []

  // Find windows where ALL huts are available
  const availableWindows: string[][] = []
  let currentWindow: string[] = []
  for (const date of allDates) {
    const allAvailable = results.every((hut) =>
      hut.dates.find((d) => d.date === date)?.available
    )
    if (allAvailable) {
      currentWindow.push(date)
    } else {
      if (currentWindow.length > 0) availableWindows.push(currentWindow)
      currentWindow = []
    }
  }
  if (currentWindow.length > 0) availableWindows.push(currentWindow)

  const windowDates = new Set(availableWindows.flat())

  return (
    <div>
      <div className="overflow-x-auto custom-scrollbar rounded-xl border border-stone-200">
        <table className="text-xs w-full">
          <thead>
            <tr className="bg-stone-50">
              <th className="text-left py-3 px-4 font-semibold text-stone-600 sticky left-0 bg-stone-50 min-w-[180px] border-r border-stone-100">
                Hütte
              </th>
              {allDates.map((date) => (
                <th key={date} className="py-3 px-1.5 font-normal text-stone-400 min-w-[40px]">
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
            {results.map((hut) => (
              <tr key={hut.hutId} className="border-t border-stone-100 hover:bg-stone-50/50 transition">
                <td className="py-2.5 px-4 font-medium text-stone-800 sticky left-0 bg-white border-r border-stone-100">
                  <div className="flex items-center gap-2">
                    {hut.hutName}
                    {hut.status === 'error' && (
                      <span className="text-amber-500 text-[10px] bg-amber-50 px-1.5 py-0.5 rounded" title="Konnte nicht geprüft werden">
                        Fehler
                      </span>
                    )}
                  </div>
                </td>
                {hut.dates.map((d) => (
                  <td key={d.date} className="py-2 px-1 text-center">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto text-[10px] font-medium transition ${
                        d.available
                          ? windowDates.has(d.date)
                            ? 'bg-alpine-500 text-white shadow-sm'
                            : 'bg-alpine-100 text-alpine-800'
                          : 'bg-red-100 text-red-500'
                      }`}
                      title={d.roomTypes.map((rt) => `${rt.type}: ${rt.available}`).join(', ')}
                    >
                      {d.available ? '✓' : '✗'}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {availableWindows.length > 0 && (
        <div className="mt-6 p-5 bg-alpine-50 rounded-xl border border-alpine-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-alpine-500 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h3 className="font-semibold text-alpine-900">Verfügbare Zeitfenster</h3>
          </div>
          <div className="space-y-1.5">
            {availableWindows.map((window, i) => (
              <div key={i} className="text-sm text-alpine-700 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-alpine-400" />
                {new Date(window[0]).toLocaleDateString('de-DE', { day: '2-digit', month: 'long' })}
                {' '}&ndash;{' '}
                {new Date(window[window.length - 1]).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
                <span className="text-alpine-500">({window.length} Nächte)</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {availableWindows.length === 0 && results.length > 0 && (
        <div className="mt-6 p-5 bg-red-50 rounded-xl border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </div>
            <h3 className="font-semibold text-red-900">Kein Zeitfenster gefunden</h3>
          </div>
          <p className="text-sm text-red-700 ml-8">
            Nicht alle Hütten gleichzeitig verfügbar. Prüfe den Kalender für Details.
          </p>
        </div>
      )}
    </div>
  )
}
