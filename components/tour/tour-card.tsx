import { TourResult } from '@/lib/store'

interface TourCardProps {
  tour: TourResult
  index: number
  onSelect: (tour: TourResult) => void
  isHovered?: boolean
}

export default function TourCard({ tour, index, onSelect, isHovered }: TourCardProps) {
  return (
    <div
      onClick={() => onSelect(tour)}
      className={`bg-white rounded-2xl shadow-sm border transition-all cursor-pointer p-5 ${
        isHovered
          ? 'border-alpine-400 shadow-md ring-1 ring-alpine-200'
          : 'border-stone-200/80 hover:border-stone-300 hover:shadow-md'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-xs font-semibold text-stone-600">
            {index + 1}
          </div>
          <span className="text-xs font-medium text-alpine-700 bg-alpine-50 px-2.5 py-1 rounded-full">
            {tour.legs.length} Etappen
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1 mb-4">
        {tour.hutDetails.map((hut, i) => (
          <span key={hut.id} className="flex items-center text-sm">
            {i > 0 && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2" className="mx-1 flex-shrink-0">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            )}
            <span className="font-medium text-stone-800">{hut.name}</span>
            <span className="text-[11px] text-stone-400 ml-1">{hut.altitude}m</span>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center bg-stone-50 rounded-xl py-2.5">
          <div className="font-semibold text-stone-900 text-sm">{tour.totalDistance.toFixed(1)} km</div>
          <div className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">Distanz</div>
        </div>
        <div className="text-center bg-stone-50 rounded-xl py-2.5">
          <div className="font-semibold text-stone-900 text-sm">{tour.totalAscent} Hm</div>
          <div className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">Aufstieg</div>
        </div>
        <div className="text-center bg-stone-50 rounded-xl py-2.5">
          <div className="font-semibold text-stone-900 text-sm">{tour.totalDuration.toFixed(1)} h</div>
          <div className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">Gehzeit</div>
        </div>
      </div>

      <div className="space-y-1.5 border-t border-stone-100 pt-3">
        {tour.legs.map((leg, i) => (
          <div key={i} className="flex justify-between text-xs text-stone-500 px-0.5">
            <span className="text-stone-400">Etappe {i + 1}</span>
            <span>
              {leg.distance.toFixed(1)} km
              <span className="text-stone-300 mx-1">/</span>
              {leg.ascent} Hm↑
              <span className="text-stone-300 mx-1">/</span>
              {leg.estimatedDuration.toFixed(1)} h
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
