import { HutGraph, RouteEdge, RoomTypeKey } from './graph'

export interface TourSearchParams {
  stages: number
  groupSize: number
  roomPreference: RoomTypeKey
  isRoundTrip?: boolean
  minDistance?: number
  maxDistance?: number
  maxAscent?: number
}

export interface TourLeg {
  fromHutId: string
  toHutId: string
  distance: number
  ascent: number
  descent: number
  estimatedDuration: number
}

export interface TourResult {
  huts: string[]
  legs: TourLeg[]
  totalDistance: number
  totalAscent: number
  totalDescent: number
  totalDuration: number
}

export function findTours(graph: HutGraph, params: TourSearchParams): TourResult[] {
  const results: TourResult[] = []
  const allHuts = graph.getAllHutIds()

  for (const startHut of allHuts) {
    if (!graph.hasCapacity(startHut, params.groupSize, params.roomPreference)) continue
    dfs(graph, params, [startHut], [], results)
  }

  return results
}

function dfs(
  graph: HutGraph,
  params: TourSearchParams,
  path: string[],
  legs: TourLeg[],
  results: TourResult[],
): void {
  // For round trips: we need `stages` legs (not stages+1 huts) before closing the loop
  // For point-to-point: we need stages+1 huts (= stages legs)
  if (path.length === params.stages + 1) {
    if (params.isRoundTrip) {
      // Try to close the loop back to start
      const lastHut = path[path.length - 1]
      const startHut = path[0]
      const returnRoute = graph.getRoute(lastHut, startHut)
      if (!returnRoute) return // can't close the loop

      // Check return leg against filters
      if (params.minDistance !== undefined && returnRoute.distance < params.minDistance) return
      if (params.maxDistance !== undefined && returnRoute.distance > params.maxDistance) return
      if (params.maxAscent !== undefined && returnRoute.ascent > params.maxAscent) return

      const returnLeg: TourLeg = {
        fromHutId: lastHut,
        toHutId: startHut,
        distance: returnRoute.distance,
        ascent: returnRoute.ascent,
        descent: returnRoute.descent,
        estimatedDuration: returnRoute.estimatedDuration,
      }

      const allLegs = [...legs, returnLeg]
      const totalDistance = allLegs.reduce((s, l) => s + l.distance, 0)
      const totalAscent = allLegs.reduce((s, l) => s + l.ascent, 0)
      const totalDescent = allLegs.reduce((s, l) => s + l.descent, 0)
      const totalDuration = allLegs.reduce((s, l) => s + l.estimatedDuration, 0)

      results.push({
        huts: [...path, startHut],
        legs: allLegs,
        totalDistance,
        totalAscent,
        totalDescent,
        totalDuration,
      })
    } else {
      const totalDistance = legs.reduce((s, l) => s + l.distance, 0)
      const totalAscent = legs.reduce((s, l) => s + l.ascent, 0)
      const totalDescent = legs.reduce((s, l) => s + l.descent, 0)
      const totalDuration = legs.reduce((s, l) => s + l.estimatedDuration, 0)
      results.push({
        huts: [...path],
        legs: [...legs],
        totalDistance,
        totalAscent,
        totalDescent,
        totalDuration,
      })
    }
    return
  }

  const currentHut = path[path.length - 1]
  const neighbors = graph.getNeighbors(currentHut, {
    minDistance: params.minDistance,
    maxDistance: params.maxDistance,
    maxAscent: params.maxAscent,
  })

  for (const neighbor of neighbors) {
    if (path.includes(neighbor.hutId)) continue
    if (!graph.hasCapacity(neighbor.hutId, params.groupSize, params.roomPreference)) continue

    path.push(neighbor.hutId)
    legs.push({
      fromHutId: currentHut,
      toHutId: neighbor.hutId,
      distance: neighbor.route.distance,
      ascent: neighbor.route.ascent,
      descent: neighbor.route.descent,
      estimatedDuration: neighbor.route.estimatedDuration,
    })

    dfs(graph, params, path, legs, results)

    path.pop()
    legs.pop()
  }
}
