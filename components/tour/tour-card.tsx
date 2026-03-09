import { TourResult } from '@/lib/store'
import TourPath from './tour-path'

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
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-xs font-semibold text-stone-600">
            {index + 1}
          </div>
          <span className="text-xs font-medium text-alpine-700 bg-alpine-50 px-2.5 py-1 rounded-full">
            {tour.legs.length} Etappen
          </span>
          {tour.startAccessPoint && (
            <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              Ab {tour.startAccessPoint.name}
            </span>
          )}
        </div>
      </div>

      {/* Route path visualization */}
      <TourPath tour={tour} animate={!!isHovered} />

      <div className="grid grid-cols-3 gap-2 mt-3">
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
    </div>
  )
}
