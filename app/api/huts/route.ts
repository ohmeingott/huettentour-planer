import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function GET(request: NextRequest) {
  const regionId = request.nextUrl.searchParams.get('regionId')
  const where = regionId ? { regionId } : {}

  const huts = await prisma.hut.findMany({
    where,
    include: { roomTypes: true },
  })

  return NextResponse.json(huts)
}
