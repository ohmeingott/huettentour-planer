import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { HutGraph, RoomTypeKey } from '@/lib/algorithm/graph'
import { findTours, TourSearchParams, TourType } from '@/lib/algorithm/pathfinder'
import { rankTours } from '@/lib/algorithm/scoring'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const {
    regionId, groupSize, totalDays, restDays,
    minDistance, maxDistance, maxAscent, roomPreference,
    accessPointId, tourType,
  } = body

  // Resolve slug to region ID
  let resolvedRegionId = regionId
  if (regionId && !regionId.startsWith('c')) {
    const region = await prisma.region.findFirst({ where: { slug: regionId } })
    if (region) resolvedRegionId = region.id
  }

  const huts = await prisma.hut.findMany({
    where: { regionId: resolvedRegionId },
    include: { roomTypes: true },
  })

  const hutIds = huts.map((h) => h.id)

  const routes = await prisma.route.findMany({
    where: {
      fromHutId: { in: hutIds },
      toHutId: { in: hutIds },
    },
  })

  const graphHuts = huts.map((h) => ({
    id: h.id,
    name: h.name,
    capacity: h.capacity,
    roomTypes: h.roomTypes.map((rt) => ({ type: rt.type.toLowerCase() as RoomTypeKey, count: rt.count })),
  }))

  const graphRoutes = routes.map((r) => ({
    fromHutId: r.fromHutId,
    toHutId: r.toHutId,
    distance: r.distance,
    ascent: r.ascent,
    descent: r.descent,
    estimatedDuration: r.estimatedDuration,
    difficulty: r.difficulty.toLowerCase() as 'easy' | 'moderate' | 'difficult',
  }))

  // Load access points and routes if an AP is selected
  let graphAccessPoints
  let graphAccessRoutes

  if (accessPointId) {
    const accessPoints = await prisma.accessPoint.findMany({
      where: { regionId: resolvedRegionId },
      include: { cableCar: true },
    })

    const accessRoutes = await prisma.accessRoute.findMany({
      where: { accessPointId: { in: accessPoints.map((ap) => ap.id) } },
    })

    graphAccessPoints = accessPoints.map((ap) => ({
      id: ap.id,
      name: ap.name,
      type: ap.type.toLowerCase() as 'parking' | 'village' | 'cable_car',
      altitude: ap.altitude,
      lat: ap.lat,
      lng: ap.lng,
    }))

    graphAccessRoutes = accessRoutes.map((ar) => ({
      accessPointId: ar.accessPointId,
      hutId: ar.hutId,
      distance: ar.distance,
      ascent: ar.ascent,
      descent: ar.descent,
      estimatedDuration: ar.estimatedDuration,
      difficulty: ar.difficulty.toLowerCase() as 'easy' | 'moderate' | 'difficult',
      hasCableCar: ar.hasCableCar,
    }))
  }

  const graph = new HutGraph(graphHuts, graphRoutes, graphAccessPoints, graphAccessRoutes)
  const stages = totalDays - (restDays || 0)

  const params: TourSearchParams = {
    stages,
    groupSize,
    roomPreference: roomPreference || 'any',
    minDistance,
    maxDistance,
    maxAscent,
    accessPointId,
    tourType: tourType as TourType | undefined,
  }

  const allTours = findTours(graph, params)
  const ranked = rankTours(allTours, tourType as TourType | undefined)
  const top = ranked.slice(0, 20)
  const hutMap = new Map(huts.map((h) => [h.id, h]))

  // Build AP detail lookup
  const apMap = new Map<string, { id: string; name: string; type: string; altitude: number; lat: number; lng: number }>()
  if (graphAccessPoints) {
    for (const ap of graphAccessPoints) apMap.set(ap.id, ap)
  }

  const enriched = top.map((tour) => ({
    ...tour,
    hutDetails: tour.huts.map((id) => {
      const h = hutMap.get(id)!
      return {
        id: h.id, name: h.name, altitude: h.altitude, lat: h.lat, lng: h.lng,
        imageUrl: h.imageUrl, capacity: h.capacity, amenities: h.amenities,
        roomTypes: h.roomTypes.map((rt) => ({ type: rt.type, count: rt.count })),
      }
    }),
    startAccessPoint: tour.startAccessPointId ? apMap.get(tour.startAccessPointId) : undefined,
    endAccessPoint: tour.endAccessPointId ? apMap.get(tour.endAccessPointId) : undefined,
  }))

  return NextResponse.json({ tours: enriched, totalFound: allTours.length })
}
