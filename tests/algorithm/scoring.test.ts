import { describe, it, expect } from 'vitest'
import { scoreTour } from '@/lib/algorithm/scoring'
import { TourResult } from '@/lib/algorithm/pathfinder'

describe('scoreTour', () => {
  it('scores balanced legs higher than unbalanced', () => {
    const balanced: TourResult = {
      huts: ['a', 'b', 'c'],
      legs: [
        { fromHutId: 'a', toHutId: 'b', distance: 5.0, ascent: 400, descent: 300, estimatedDuration: 3 },
        { fromHutId: 'b', toHutId: 'c', distance: 5.5, ascent: 420, descent: 310, estimatedDuration: 3.2 },
      ],
      totalDistance: 10.5, totalAscent: 820, totalDescent: 610, totalDuration: 6.2,
    }

    const unbalanced: TourResult = {
      huts: ['a', 'b', 'c'],
      legs: [
        { fromHutId: 'a', toHutId: 'b', distance: 2.0, ascent: 100, descent: 50, estimatedDuration: 1 },
        { fromHutId: 'b', toHutId: 'c', distance: 10.0, ascent: 900, descent: 700, estimatedDuration: 6 },
      ],
      totalDistance: 12, totalAscent: 1000, totalDescent: 750, totalDuration: 7,
    }

    expect(scoreTour(balanced)).toBeGreaterThan(scoreTour(unbalanced))
  })

  it('gives round-trip bonus when start near end', () => {
    const roundTrip: TourResult = {
      huts: ['a', 'b', 'a'],
      legs: [
        { fromHutId: 'a', toHutId: 'b', distance: 5, ascent: 400, descent: 300, estimatedDuration: 3 },
        { fromHutId: 'b', toHutId: 'a', distance: 5, ascent: 300, descent: 400, estimatedDuration: 3 },
      ],
      totalDistance: 10, totalAscent: 700, totalDescent: 700, totalDuration: 6,
    }
    expect(scoreTour(roundTrip)).toBeGreaterThan(0)
  })
})
