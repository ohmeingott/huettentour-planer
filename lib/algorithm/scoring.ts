import { TourResult } from './pathfinder'

export function scoreTour(tour: TourResult): number {
  let score = 100

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

  if (tour.huts[0] === tour.huts[tour.huts.length - 1]) {
    score += 10
  }

  return Math.max(0, score)
}

export function rankTours(tours: TourResult[]): TourResult[] {
  return tours
    .map((tour) => ({ tour, score: scoreTour(tour) }))
    .sort((a, b) => b.score - a.score)
    .map(({ tour }) => tour)
}
