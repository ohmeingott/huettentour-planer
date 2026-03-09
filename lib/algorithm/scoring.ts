import { TourResult, TourType } from './pathfinder'

export function scoreTour(tour: TourResult, tourType?: TourType): number {
  let score = 100

  // Balance scoring only on hut-to-hut legs (not access legs)
  if (tour.legs.length > 0) {
    const distances = tour.legs.map((l) => l.distance)
    const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length
    const variance = distances.reduce((sum, d) => sum + Math.pow(d - avgDistance, 2), 0) / distances.length
    const coeffOfVariation = Math.sqrt(variance) / (avgDistance || 1)
    score -= coeffOfVariation * 30

    const ascents = tour.legs.map((l) => l.ascent)
    const avgAscent = ascents.reduce((a, b) => a + b, 0) / ascents.length
    const ascentVariance = ascents.reduce((sum, a) => sum + Math.pow(a - avgAscent, 2), 0) / ascents.length
    const ascentCoV = Math.sqrt(ascentVariance) / (avgAscent || 1)
    score -= ascentCoV * 20
  }

  // Round-trip scoring
  if (tour.startAccessPointId) {
    // AP-based tour
    if (tourType === 'rundtour' || tourType === 'flexibel') {
      if (tour.startAccessPointId === tour.endAccessPointId) {
        score += 10
      } else if (tour.endAccessPointId) {
        score += 3
      }
    }
  } else {
    // Legacy: non-AP tour
    if (tour.huts[0] === tour.huts[tour.huts.length - 1]) {
      score += 10
    }
  }

  return Math.max(0, score)
}

export function rankTours(tours: TourResult[], tourType?: TourType): TourResult[] {
  return tours
    .map((tour) => ({ tour, score: scoreTour(tour, tourType) }))
    .sort((a, b) => b.score - a.score)
    .map(({ tour }) => tour)
}
