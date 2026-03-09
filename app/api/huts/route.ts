import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function GET(request: NextRequest) {
  const regionId = request.nextUrl.searchParams.get('regionId')
  const slug = request.nextUrl.searchParams.get('slug')
  const includeRoutes = request.nextUrl.searchParams.get('includeRoutes') === 'true'

  let resolvedRegionId = regionId

  if (slug) {
    const region = await prisma.region.findFirst({ where: { slug } })
    if (!region) return NextResponse.json({ error: 'Region not found' }, { status: 404 })
    resolvedRegionId = region.id
  }

  const where = resolvedRegionId ? { regionId: resolvedRegionId } : {}

  const huts = await prisma.hut.findMany({
    where,
    include: { roomTypes: true },
  })

  if (includeRoutes && resolvedRegionId) {
    const hutIds = huts.map((h) => h.id)
    const routes = await prisma.route.findMany({
      where: {
        fromHutId: { in: hutIds },
        toHutId: { in: hutIds },
      },
    })
    return NextResponse.json({ huts, routes })
  }

  return NextResponse.json(huts)
}
