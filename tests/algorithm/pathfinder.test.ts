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
  { fromHutId: 'a', toHutId: 'b', distance: 5.0, ascent: 400, descent: 300, estimatedDuration: 3.5, difficulty: 'easy' as const },
  { fromHutId: 'b', toHutId: 'a', distance: 5.0, ascent: 300, descent: 400, estimatedDuration: 3.5, difficulty: 'easy' as const },
  { fromHutId: 'b', toHutId: 'c', distance: 7.0, ascent: 600, descent: 200, estimatedDuration: 4.5, difficulty: 'moderate' as const },
  { fromHutId: 'c', toHutId: 'b', distance: 7.0, ascent: 200, descent: 600, estimatedDuration: 4.5, difficulty: 'moderate' as const },
  { fromHutId: 'c', toHutId: 'd', distance: 4.0, ascent: 300, descent: 500, estimatedDuration: 3.0, difficulty: 'easy' as const },
  { fromHutId: 'd', toHutId: 'c', distance: 4.0, ascent: 500, descent: 300, estimatedDuration: 3.0, difficulty: 'moderate' as const },
  { fromHutId: 'a', toHutId: 'c', distance: 10.0, ascent: 900, descent: 500, estimatedDuration: 6.0, difficulty: 'difficult' as const },
  { fromHutId: 'c', toHutId: 'a', distance: 10.0, ascent: 500, descent: 900, estimatedDuration: 6.0, difficulty: 'difficult' as const },
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

const mockAccessPoints = [
  { id: 'ap1', name: 'Parking', type: 'parking' as const, altitude: 1000, lat: 47.0, lng: 11.0 },
  { id: 'ap2', name: 'Village', type: 'village' as const, altitude: 800, lat: 47.1, lng: 11.1 },
]

const mockAccessRoutes = [
  { accessPointId: 'ap1', hutId: 'a', distance: 3.0, ascent: 500, descent: 100, estimatedDuration: 2.0, difficulty: 'easy' as const, hasCableCar: false },
  { accessPointId: 'ap1', hutId: 'b', distance: 4.0, ascent: 600, descent: 200, estimatedDuration: 2.5, difficulty: 'moderate' as const, hasCableCar: false },
  { accessPointId: 'ap2', hutId: 'c', distance: 5.0, ascent: 700, descent: 150, estimatedDuration: 3.0, difficulty: 'moderate' as const, hasCableCar: false },
  { accessPointId: 'ap2', hutId: 'd', distance: 3.5, ascent: 400, descent: 100, estimatedDuration: 2.0, difficulty: 'easy' as const, hasCableCar: false },
]

describe('findTours with AccessPoints', () => {
  it('starts tours from access point huts only', () => {
    const graph = new HutGraph(mockHuts, mockRoutes, mockAccessPoints, mockAccessRoutes)
    const params: TourSearchParams = { stages: 4, groupSize: 2, roomPreference: 'any', accessPointId: 'ap1' }
    const tours = findTours(graph, params)
    expect(tours.length).toBeGreaterThan(0)
    // All tours should start from huts reachable from ap1 (a or b)
    tours.forEach((t) => {
      expect(['a', 'b']).toContain(t.huts[0])
      expect(t.startAccessPointId).toBe('ap1')
      expect(t.startAccessLeg).toBeDefined()
      expect(t.endAccessLeg).toBeDefined()
    })
  })

  it('rundtour requires same start/end AP', () => {
    const graph = new HutGraph(mockHuts, mockRoutes, mockAccessPoints, mockAccessRoutes)
    const params: TourSearchParams = { stages: 4, groupSize: 2, roomPreference: 'any', accessPointId: 'ap1', tourType: 'rundtour' }
    const tours = findTours(graph, params)
    tours.forEach((t) => {
      expect(t.startAccessPointId).toBe('ap1')
      expect(t.endAccessPointId).toBe('ap1')
    })
  })

  it('handles 2-stage single-hut tour from AP', () => {
    const graph = new HutGraph(mockHuts, mockRoutes, mockAccessPoints, mockAccessRoutes)
    const params: TourSearchParams = { stages: 2, groupSize: 2, roomPreference: 'any', accessPointId: 'ap1' }
    const tours = findTours(graph, params)
    expect(tours.length).toBeGreaterThan(0)
    tours.forEach((t) => {
      expect(t.huts).toHaveLength(1) // Single hut, no internal legs
      expect(t.legs).toHaveLength(0)
      expect(t.startAccessLeg).toBeDefined()
      expect(t.endAccessLeg).toBeDefined()
    })
  })

  it('falls back to original behavior without AP', () => {
    const graph = new HutGraph(mockHuts, mockRoutes, mockAccessPoints, mockAccessRoutes)
    const params: TourSearchParams = { stages: 2, groupSize: 2, roomPreference: 'any' }
    const tours = findTours(graph, params)
    expect(tours.length).toBeGreaterThan(0)
    tours.forEach((t) => {
      expect(t.startAccessPointId).toBeUndefined()
    })
  })
})
