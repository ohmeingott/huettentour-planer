import { describe, it, expect } from 'vitest'
import { HutGraph } from '@/lib/algorithm/graph'

const mockHuts = [
  { id: 'a', name: 'Hut A', capacity: 50, roomTypes: [{ type: 'double' as const, count: 5 }, { type: 'dorm' as const, count: 20 }] },
  { id: 'b', name: 'Hut B', capacity: 40, roomTypes: [{ type: 'double' as const, count: 3 }, { type: 'dorm' as const, count: 15 }] },
  { id: 'c', name: 'Hut C', capacity: 60, roomTypes: [{ type: 'single' as const, count: 2 }, { type: 'dorm' as const, count: 30 }] },
]

const mockRoutes = [
  { fromHutId: 'a', toHutId: 'b', distance: 5.0, ascent: 400, descent: 300, estimatedDuration: 3.5, difficulty: 'easy' as const },
  { fromHutId: 'b', toHutId: 'c', distance: 7.0, ascent: 600, descent: 200, estimatedDuration: 4.5, difficulty: 'moderate' as const },
  { fromHutId: 'a', toHutId: 'c', distance: 10.0, ascent: 900, descent: 500, estimatedDuration: 6.0, difficulty: 'difficult' as const },
]

describe('HutGraph', () => {
  it('builds graph from huts and routes', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    expect(graph.getHut('a')?.name).toBe('Hut A')
    expect(graph.getNeighbors('a')).toHaveLength(2)
  })

  it('returns route between two huts', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    const route = graph.getRoute('a', 'b')
    expect(route?.distance).toBe(5.0)
    expect(route?.ascent).toBe(400)
  })

  it('returns null for non-existent route', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    expect(graph.getRoute('b', 'a')).toBeNull()
  })

  it('filters neighbors by distance and ascent', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    const neighbors = graph.getNeighbors('a', { maxDistance: 6, maxAscent: 500 })
    expect(neighbors).toHaveLength(1)
    expect(neighbors[0].hutId).toBe('b')
  })

  it('checks room availability for group size', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    expect(graph.hasCapacity('a', 10, 'double')).toBe(true)
    expect(graph.hasCapacity('a', 12, 'double')).toBe(false)
    expect(graph.hasCapacity('a', 20, 'dorm')).toBe(true)
    expect(graph.hasCapacity('c', 5, 'any')).toBe(true)
  })
})

const mockAccessPoints = [
  { id: 'ap1', name: 'Parking Lot', type: 'parking' as const, altitude: 1000, lat: 47.0, lng: 11.0 },
  { id: 'ap2', name: 'Village', type: 'village' as const, altitude: 800, lat: 47.1, lng: 11.1 },
]

const mockAccessRoutes = [
  { accessPointId: 'ap1', hutId: 'a', distance: 3.0, ascent: 500, descent: 100, estimatedDuration: 2.0, difficulty: 'easy' as const, hasCableCar: false },
  { accessPointId: 'ap1', hutId: 'b', distance: 4.0, ascent: 600, descent: 200, estimatedDuration: 2.5, difficulty: 'moderate' as const, hasCableCar: false },
  { accessPointId: 'ap2', hutId: 'a', distance: 5.0, ascent: 700, descent: 150, estimatedDuration: 3.0, difficulty: 'moderate' as const, hasCableCar: false },
]

describe('HutGraph with AccessPoints', () => {
  it('stores and retrieves access points', () => {
    const graph = new HutGraph(mockHuts, mockRoutes, mockAccessPoints, mockAccessRoutes)
    expect(graph.hasAccessPoints()).toBe(true)
    expect(graph.getAccessPoint('ap1')?.name).toBe('Parking Lot')
    expect(graph.getAccessPointIds()).toHaveLength(2)
  })

  it('returns huts reachable from an access point', () => {
    const graph = new HutGraph(mockHuts, mockRoutes, mockAccessPoints, mockAccessRoutes)
    const reachable = graph.getHutsFromAccessPoint('ap1')
    expect(reachable).toHaveLength(2)
    expect(reachable.map((r) => r.hutId).sort()).toEqual(['a', 'b'])
  })

  it('returns access points reachable from a hut', () => {
    const graph = new HutGraph(mockHuts, mockRoutes, mockAccessPoints, mockAccessRoutes)
    const aps = graph.getAccessPointsFromHut('a')
    expect(aps).toHaveLength(2)
    expect(aps.map((a) => a.accessPointId).sort()).toEqual(['ap1', 'ap2'])
  })

  it('works without access points (backward compatible)', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    expect(graph.hasAccessPoints()).toBe(false)
    expect(graph.getHutsFromAccessPoint('ap1')).toHaveLength(0)
    expect(graph.getAccessPointsFromHut('a')).toHaveLength(0)
  })
})
