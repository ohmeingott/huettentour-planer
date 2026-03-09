export type RoomTypeKey = 'single' | 'double' | 'shared_4' | 'dorm' | 'any'

export interface HutNode {
  id: string
  name: string
  capacity: number
  roomTypes: { type: RoomTypeKey; count: number }[]
}

export type Difficulty = 'easy' | 'moderate' | 'difficult'

export interface RouteEdge {
  fromHutId: string
  toHutId: string
  distance: number
  ascent: number
  descent: number
  estimatedDuration: number
  difficulty: Difficulty
}

export interface AccessPointNode {
  id: string
  name: string
  type: 'parking' | 'village' | 'cable_car'
  altitude: number
  lat: number
  lng: number
}

export interface AccessRouteEdge {
  accessPointId: string
  hutId: string
  distance: number
  ascent: number
  descent: number
  estimatedDuration: number
  difficulty: Difficulty
  hasCableCar: boolean
}

interface NeighborFilter {
  minDistance?: number
  maxDistance?: number
  maxAscent?: number
}

interface Neighbor {
  hutId: string
  route: RouteEdge
}

interface AccessNeighbor {
  hutId: string
  route: AccessRouteEdge
}

interface AccessPointNeighbor {
  accessPointId: string
  route: AccessRouteEdge
}

export class HutGraph {
  private huts: Map<string, HutNode> = new Map()
  private adjacency: Map<string, Neighbor[]> = new Map()
  private routes: Map<string, RouteEdge> = new Map()
  private accessPoints: Map<string, AccessPointNode> = new Map()
  private accessToHuts: Map<string, AccessNeighbor[]> = new Map()
  private hutToAccess: Map<string, AccessPointNeighbor[]> = new Map()

  constructor(
    huts: HutNode[],
    routes: RouteEdge[],
    accessPoints?: AccessPointNode[],
    accessRoutes?: AccessRouteEdge[],
  ) {
    for (const hut of huts) {
      this.huts.set(hut.id, hut)
      this.adjacency.set(hut.id, [])
    }

    for (const route of routes) {
      const key = `${route.fromHutId}->${route.toHutId}`
      this.routes.set(key, route)
      this.adjacency.get(route.fromHutId)?.push({
        hutId: route.toHutId,
        route,
      })
    }

    if (accessPoints && accessRoutes) {
      for (const ap of accessPoints) {
        this.accessPoints.set(ap.id, ap)
        this.accessToHuts.set(ap.id, [])
      }

      for (const hutId of this.huts.keys()) {
        this.hutToAccess.set(hutId, [])
      }

      for (const ar of accessRoutes) {
        this.accessToHuts.get(ar.accessPointId)?.push({ hutId: ar.hutId, route: ar })
        this.hutToAccess.get(ar.hutId)?.push({ accessPointId: ar.accessPointId, route: ar })
      }
    }
  }

  getHut(id: string): HutNode | null {
    return this.huts.get(id) ?? null
  }

  getRoute(fromId: string, toId: string): RouteEdge | null {
    return this.routes.get(`${fromId}->${toId}`) ?? null
  }

  getNeighbors(hutId: string, filter?: NeighborFilter): Neighbor[] {
    const neighbors = this.adjacency.get(hutId) ?? []
    if (!filter) return neighbors

    return neighbors.filter((n) => {
      if (filter.minDistance !== undefined && n.route.distance < filter.minDistance) return false
      if (filter.maxDistance !== undefined && n.route.distance > filter.maxDistance) return false
      if (filter.maxAscent !== undefined && n.route.ascent > filter.maxAscent) return false
      return true
    })
  }

  hasCapacity(hutId: string, groupSize: number, roomPreference: RoomTypeKey): boolean {
    const hut = this.huts.get(hutId)
    if (!hut) return false

    if (roomPreference === 'any') {
      const totalBeds = hut.roomTypes.reduce((sum, rt) => sum + rt.count * this.bedsPerUnit(rt.type), 0)
      return totalBeds >= groupSize
    }

    const matching = hut.roomTypes.find((rt) => rt.type === roomPreference)
    if (!matching) return false
    return matching.count * this.bedsPerUnit(roomPreference) >= groupSize
  }

  private bedsPerUnit(type: RoomTypeKey): number {
    switch (type) {
      case 'single': return 1
      case 'double': return 2
      case 'shared_4': return 4
      case 'dorm': return 1
      default: return 1
    }
  }

  getAllHutIds(): string[] {
    return Array.from(this.huts.keys())
  }

  // Access point methods
  hasAccessPoints(): boolean {
    return this.accessPoints.size > 0
  }

  getAccessPoint(id: string): AccessPointNode | null {
    return this.accessPoints.get(id) ?? null
  }

  getAccessPointIds(): string[] {
    return Array.from(this.accessPoints.keys())
  }

  getHutsFromAccessPoint(apId: string): AccessNeighbor[] {
    return this.accessToHuts.get(apId) ?? []
  }

  getAccessPointsFromHut(hutId: string): AccessPointNeighbor[] {
    return this.hutToAccess.get(hutId) ?? []
  }
}
