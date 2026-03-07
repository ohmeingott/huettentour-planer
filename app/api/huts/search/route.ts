import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || ''
  const regionId = request.nextUrl.searchParams.get('regionId')

  if (q.length < 2) {
    return NextResponse.json([])
  }

  const where: any = {
    name: { contains: q, mode: 'insensitive' },
  }

  // Resolve region slug to ID if needed
  if (regionId) {
    if (!regionId.startsWith('c')) {
      const region = await prisma.region.findFirst({ where: { slug: regionId } })
      if (region) where.regionId = region.id
    } else {
      where.regionId = regionId
    }
  }

  const huts = await prisma.hut.findMany({
    where,
    select: {
      id: true,
      name: true,
      altitude: true,
      lat: true,
      lng: true,
      imageUrl: true,
      capacity: true,
      region: { select: { name: true, slug: true } },
    },
    orderBy: { name: 'asc' },
    take: 8,
  })

  return NextResponse.json(huts)
}
