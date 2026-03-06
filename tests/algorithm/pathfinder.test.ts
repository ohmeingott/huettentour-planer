import { describe, it, expect } from 'vitest'
import { HutGraph } from '@/lib/algorithm/graph'
import { findTours, TourSearchParams } from '@/lib/algorithm/pathfinder'

const mockHuts = [
  { id: 'a', name: 'Hut A', capacity: 50, roomTypes: [{ type: 'dorm' as const, count: 50 }] },
  { id: 'b', name: 'Hut B', capacity: 40, roomTypes: [{ type: 'dorm' as const, count: 40 }] },
  { id: 'c', name: 'Hut C', capacity: 60, roomTypes: [{ type: 'dorm' as const, count: 60 }] },
  { id: 'd', name: 'Hut D', capacity: 30, roomTypes: [{ type: 'dorm' as const, count: 30 }] },
]

const mockRoutes = [
  { fromHutId: 'a', toHutId: 'b', distance: 5.0, ascent: 400, descent: 300, estimatedDuration: 3.5 },
  { fromHutId: 'b', toHutId: 'a', distance: 5.0, ascent: 300, descent: 400, estimatedDuration: 3.5 },
  { fromHutId: 'b', toHutId: 'c', distance: 7.0, ascent: 600, descent: 200, estimatedDuration: 4.5 },
  { fromHutId: 'c', toHutId: 'b', distance: 7.0, ascent: 200, descent: 600, estimatedDuration: 4.5 },
  { fromHutId: 'c', toHutId: 'd', distance: 4.0, ascent: 300, descent: 500, estimatedDuration: 3.0 },
  { fromHutId: 'd', toHutId: 'c', distance: 4.0, ascent: 500, descent: 300, estimatedDuration: 3.0 },
  { fromHutId: 'a', toHutId: 'c', distance: 10.0, ascent: 900, descent: 500, estimatedDuration: 6.0 },
  { fromHutId: 'c', toHutId: 'a', distance: 10.0, ascent: 500, descent: 900, estimatedDuration: 6.0 },
]

describe('findTours', () => {
  it('finds 3-stage tours', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    const params: TourSearchParams = { stages: 3, groupSize: 4, roomPreference: 'any' }
    const tours = findTours(graph, params)
    expect(tours.length).toBeGreaterThan(0)
    tours.forEach((t) => expect(t.huts).toHaveLength(4))
  })

  it('respects max distance filter', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    const params: TourSearchParams = { stages: 2, groupSize: 4, roomPreference: 'any', maxDistance: 6.0 }
    const tours = findTours(graph, params)
    tours.forEach((t) => {
      t.legs.forEach((leg) => expect(leg.distance).toBeLessThanOrEqual(6.0))
    })
  })

  it('respects max ascent filter', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    const params: TourSearchParams = { stages: 2, groupSize: 4, roomPreference: 'any', maxAscent: 500 }
    const tours = findTours(graph, params)
    tours.forEach((t) => {
      t.legs.forEach((leg) => expect(leg.ascent).toBeLessThanOrEqual(500))
    })
  })

  it('does not revisit huts', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    const params: TourSearchParams = { stages: 3, groupSize: 4, roomPreference: 'any' }
    const tours = findTours(graph, params)
    tours.forEach((t) => {
      const uniqueHuts = new Set(t.huts)
      expect(uniqueHuts.size).toBe(t.huts.length)
    })
  })

  it('returns empty for impossible params', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    const params: TourSearchParams = { stages: 3, groupSize: 4, roomPreference: 'any', maxDistance: 1.0 }
    const tours = findTours(graph, params)
    expect(tours).toHaveLength(0)
  })
})
