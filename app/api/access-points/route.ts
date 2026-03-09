import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function GET(request: NextRequest) {
  try {
    const regionId = request.nextUrl.searchParams.get('regionId')
    const slug = request.nextUrl.searchParams.get('slug')

    let resolvedRegionId = regionId

    if (slug) {
      const region = await prisma.region.findFirst({ where: { slug } })
      if (!region) return NextResponse.json({ error: 'Region not found' }, { status: 404 })
      resolvedRegionId = region.id
    }

    if (!resolvedRegionId) {
      return NextResponse.json({ error: 'regionId or slug required' }, { status: 400 })
    }

    const accessPoints = await prisma.accessPoint.findMany({
      where: { regionId: resolvedRegionId },
      include: {
        routes: {
          include: { hut: { select: { id: true, name: true } } },
        },
        cableCar: true,
      },
    })

    return NextResponse.json(accessPoints)
  } catch (error) {
    console.error('Access points API error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
