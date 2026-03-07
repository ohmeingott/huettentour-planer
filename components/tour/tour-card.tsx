import { TourResult } from '@/lib/store'
import ElevationProfile from './elevation-profile'

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
      className={`bg-white rounded-2xl shadow-sm border transition-all cursor-pointer overflow-hidden ${
        isHovered
          ? 'border-alpine-400 shadow-md ring-1 ring-alpine-200'
          : 'border-stone-200/80 hover:border-stone-300 hover:shadow-md'
      }`}
    >
      {/* Hut image strip */}
      <div className="flex h-20 -space-x-1">
        {tour.hutDetails
          .filter((h, i, arr) => arr.findIndex((a) => a.id === h.id) === i)
          .slice(0, 5)
          .map((hut) => (
            <div key={hut.id} className="flex-1 relative min-w-0">
              {hut.imageUrl ? (
                <img
                  src={hut.imageUrl}
                  alt={hut.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c7c2bc" strokeWidth="1.5">
                    <path d="m8 3 4 8 5-5 2 15H2L8 3z"/>
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute bottom-1 left-1.5 right-0.5 text-[9px] font-medium text-white truncate drop-shadow-sm">
                {hut.name}
              </span>
            </div>
          ))}
      </div>

      <div className="p-5 pt-3">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-xs font-semibold text-stone-600">
              {index + 1}
            </div>
            <span className="text-xs font-medium text-alpine-700 bg-alpine-50 px-2.5 py-1 rounded-full">
              {tour.legs.length} Etappen
            </span>
            {tour.huts.length > 1 && tour.huts[0] === tour.huts[tour.huts.length - 1] && (
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 2l4 4-4 4" /><path d="M3 11v-1a4 4 0 014-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v1a4 4 0 01-4 4H3" />
                </svg>
                Rundtour
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
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

        {/* Elevation profile */}
        <div className="border-t border-stone-100 pt-3 mb-3">
          <ElevationProfile
            hutDetails={tour.hutDetails}
            legs={tour.legs}
            height={100}
          />
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
    </div>
  )
}
