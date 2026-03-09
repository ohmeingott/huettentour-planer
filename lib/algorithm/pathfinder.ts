import { HutGraph, RouteEdge, RoomTypeKey } from './graph'

export type TourType = 'rundtour' | 'flexibel' | 'egal'

export interface TourSearchParams {
  stages: number
  groupSize: number
  roomPreference: RoomTypeKey
  minDistance?: number
  maxDistance?: number
  maxAscent?: number
  accessPointId?: string
  tourType?: TourType
}

export interface TourLeg {
  fromHutId: string
  toHutId: string
  distance: number
  ascent: number
  descent: number
  estimatedDuration: number
  difficulty: string
}

export interface AccessLeg {
  accessPointId: string
  hutId: string
  distance: number
  ascent: number
  descent: number
  estimatedDuration: number
  difficulty: string
  hasCableCar: boolean
  direction: 'ap_to_hut' | 'hut_to_ap'
}

export interface TourResult {
  huts: string[]
  legs: TourLeg[]
  totalDistance: number
  totalAscent: number
  totalDescent: number
  totalDuration: number
  startAccessPointId?: string
  endAccessPointId?: string
  startAccessLeg?: AccessLeg
  endAccessLeg?: AccessLeg
}

export function findTours(graph: HutGraph, params: TourSearchParams): TourResult[] {
  const { accessPointId, tourType = 'egal' } = params

  // When an access point is specified, use AP-aware search
  if (accessPointId && graph.hasAccessPoints()) {
    return findToursFromAccessPoint(graph, params, accessPointId, tourType)
  }

  // Fallback: original behavior (start from any hut)
  const results: TourResult[] = []
  const allHuts = graph.getAllHutIds()

  for (const startHut of allHuts) {
    if (!graph.hasCapacity(startHut, params.groupSize, params.roomPreference)) continue
    dfs(graph, params, [startHut], [], results, undefined, tourType === 'rundtour' ? startHut : undefined)
  }

  // For rundtour without AP: filter to only tours that return to start
  if (tourType === 'rundtour') {
    return results.filter((r) => r.huts.length >= 2 && r.huts[0] === r.huts[r.huts.length - 1])
  }

  return results
}

function findToursFromAccessPoint(
  graph: HutGraph,
  params: TourSearchParams,
  accessPointId: string,
  tourType: TourType,
): TourResult[] {
  const reachableHuts = graph.getHutsFromAccessPoint(accessPointId)
  if (reachableHuts.length === 0) return []

  const results: TourResult[] = []

  // Internal hut-to-hut stages: total stages minus the AP→Hut and Hut→AP legs
  const internalStages = params.stages - 2

  for (const { hutId: startHutId, route: startRoute } of reachableHuts) {
    if (!graph.hasCapacity(startHutId, params.groupSize, params.roomPreference)) continue

    const startAccessLeg: AccessLeg = {
      accessPointId,
      hutId: startHutId,
      distance: startRoute.distance,
      ascent: startRoute.ascent,
      descent: startRoute.descent,
      estimatedDuration: startRoute.estimatedDuration,
      difficulty: startRoute.difficulty,
      hasCableCar: startRoute.hasCableCar,
      direction: 'ap_to_hut',
    }

    if (internalStages <= 0) {
      // Only 2 stages total: AP→Hut (day 1), Hut→AP (day 2)
      // Single-hut tour
      const endLegs = findEndAccessLegs(graph, startHutId, accessPointId, tourType)
      for (const endAccessLeg of endLegs) {
        results.push(buildTourResult(
          [startHutId],
          [],
          startAccessLeg,
          endAccessLeg,
        ))
      }
      continue
    }

    // DFS for internal hut-to-hut path
    const rawResults: TourResult[] = []
    dfs(graph, params, [startHutId], [], rawResults, internalStages)

    // Attach access legs to each found tour
    for (const raw of rawResults) {
      const lastHutId = raw.huts[raw.huts.length - 1]
      const endLegs = findEndAccessLegs(graph, lastHutId, accessPointId, tourType)

      for (const endAccessLeg of endLegs) {
        results.push(buildTourResult(
          raw.huts,
          raw.legs,
          startAccessLeg,
          endAccessLeg,
        ))
      }
    }
  }

  return results
}

function findEndAccessLegs(
  graph: HutGraph,
  lastHutId: string,
  startAccessPointId: string,
  tourType: TourType,
): AccessLeg[] {
  const accessPoints = graph.getAccessPointsFromHut(lastHutId)
  if (accessPoints.length === 0) return []

  const legs: AccessLeg[] = []

  for (const { accessPointId: apId, route } of accessPoints) {
    // For Rundtour: only accept the same access point
    if (tourType === 'rundtour' && apId !== startAccessPointId) continue

    legs.push({
      accessPointId: apId,
      hutId: lastHutId,
      // Reverse direction: hut→AP, so swap ascent/descent
      distance: route.distance,
      ascent: route.descent,
      descent: route.ascent,
      estimatedDuration: route.estimatedDuration,
      difficulty: route.difficulty,
      hasCableCar: route.hasCableCar,
      direction: 'hut_to_ap',
    })
  }

  // For Flexibel: prefer same AP, so put it first
  if (tourType === 'flexibel') {
    legs.sort((a, b) => {
      if (a.accessPointId === startAccessPointId) return -1
      if (b.accessPointId === startAccessPointId) return 1
      return 0
    })
    // Only keep the best option for flexibel to avoid explosion
    return legs.slice(0, 1)
  }

  // For Egal: also limit to avoid too many duplicates
  return legs.slice(0, 1)
}

function buildTourResult(
  huts: string[],
  legs: TourLeg[],
  startAccessLeg: AccessLeg,
  endAccessLeg: AccessLeg,
): TourResult {
  const legDistance = legs.reduce((s, l) => s + l.distance, 0)
  const legAscent = legs.reduce((s, l) => s + l.ascent, 0)
  const legDescent = legs.reduce((s, l) => s + l.descent, 0)
  const legDuration = legs.reduce((s, l) => s + l.estimatedDuration, 0)

  return {
    huts: [...huts],
    legs: [...legs],
    totalDistance: legDistance + startAccessLeg.distance + endAccessLeg.distance,
    totalAscent: legAscent + startAccessLeg.ascent + endAccessLeg.ascent,
    totalDescent: legDescent + startAccessLeg.descent + endAccessLeg.descent,
    totalDuration: legDuration + startAccessLeg.estimatedDuration + endAccessLeg.estimatedDuration,
    startAccessPointId: startAccessLeg.accessPointId,
    endAccessPointId: endAccessLeg.accessPointId,
    startAccessLeg,
    endAccessLeg,
  }
}

function dfs(
  graph: HutGraph,
  params: TourSearchParams,
  path: string[],
  legs: TourLeg[],
  results: TourResult[],
  stageOverride?: number,
  roundTripHutId?: string,
): void {
  const targetStages = stageOverride ?? params.stages

  if (path.length === targetStages + 1) {
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
    return
  }

  const currentHut = path[path.length - 1]
  const isLastStage = path.length === targetStages
  const neighbors = graph.getNeighbors(currentHut, {
    minDistance: params.minDistance,
    maxDistance: params.maxDistance,
    maxAscent: params.maxAscent,
  })

  for (const neighbor of neighbors) {
    // Allow revisiting the start hut on the last stage for round trips
    const isRoundTripReturn = roundTripHutId && isLastStage && neighbor.hutId === roundTripHutId
    if (path.includes(neighbor.hutId) && !isRoundTripReturn) continue
    if (!graph.hasCapacity(neighbor.hutId, params.groupSize, params.roomPreference)) continue

    path.push(neighbor.hutId)
    legs.push({
      fromHutId: currentHut,
      toHutId: neighbor.hutId,
      distance: neighbor.route.distance,
      ascent: neighbor.route.ascent,
      descent: neighbor.route.descent,
      estimatedDuration: neighbor.route.estimatedDuration,
      difficulty: neighbor.route.difficulty,
    })

    dfs(graph, params, path, legs, results, stageOverride, roundTripHutId)

    path.pop()
    legs.pop()
  }
}
