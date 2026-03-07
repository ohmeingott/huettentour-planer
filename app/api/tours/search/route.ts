import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { HutGraph, RoomTypeKey } from '@/lib/algorithm/graph'
import { findTours, TourSearchParams } from '@/lib/algorithm/pathfinder'
import { rankTours } from '@/lib/algorithm/scoring'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { regionId, groupSize, totalDays, restDays, isRoundTrip, minDistance, maxDistance, maxAscent, roomPreference } = body

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
  }))

  const graph = new HutGraph(graphHuts, graphRoutes)
  const stages = totalDays - (restDays || 0)

  const params: TourSearchParams = {
    stages,
    groupSize,
    roomPreference: roomPreference || 'any',
    isRoundTrip: isRoundTrip || false,
    minDistance,
    maxDistance,
    maxAscent,
  }

  const allTours = findTours(graph, params)
  const ranked = rankTours(allTours)
  const top = ranked.slice(0, 20)
  const hutMap = new Map(huts.map((h) => [h.id, h]))

  const enriched = top.map((tour) => ({
    ...tour,
    hutDetails: tour.huts.map((id) => {
      const h = hutMap.get(id)!
      return { id: h.id, name: h.name, altitude: h.altitude, lat: h.lat, lng: h.lng, imageUrl: h.imageUrl }
    }),
  }))

  return NextResponse.json({ tours: enriched, totalFound: allTours.length })
}
