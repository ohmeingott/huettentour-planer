import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function GET() {
  const regions = await prisma.region.findMany({
    include: { _count: { select: { huts: true } } },
  })
  return NextResponse.json(regions)
}
