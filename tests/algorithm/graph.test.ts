import { describe, it, expect } from 'vitest'
import { HutGraph } from '@/lib/algorithm/graph'

const mockHuts = [
  { id: 'a', name: 'Hut A', capacity: 50, roomTypes: [{ type: 'double' as const, count: 5 }, { type: 'dorm' as const, count: 20 }] },
  { id: 'b', name: 'Hut B', capacity: 40, roomTypes: [{ type: 'double' as const, count: 3 }, { type: 'dorm' as const, count: 15 }] },
  { id: 'c', name: 'Hut C', capacity: 60, roomTypes: [{ type: 'single' as const, count: 2 }, { type: 'dorm' as const, count: 30 }] },
]

const mockRoutes = [
  { fromHutId: 'a', toHutId: 'b', distance: 5.0, ascent: 400, descent: 300, estimatedDuration: 3.5 },
  { fromHutId: 'b', toHutId: 'c', distance: 7.0, ascent: 600, descent: 200, estimatedDuration: 4.5 },
  { fromHutId: 'a', toHutId: 'c', distance: 10.0, ascent: 900, descent: 500, estimatedDuration: 6.0 },
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
