import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { getAvailabilityQueue } from '@/lib/crawler/queue'
import { AvailabilityJobData } from '@/lib/crawler/types'
import { randomUUID } from 'crypto'
import { eachDayOfInterval, format } from 'date-fns'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { hutIds, dateStart, dateEnd, groupSize, roomPreference } = body

  const huts = await prisma.hut.findMany({
    where: { id: { in: hutIds } },
  })

  const dates = eachDayOfInterval({
    start: new Date(dateStart),
    end: new Date(dateEnd),
  }).map((d) => format(d, 'yyyy-MM-dd'))

  const jobId = randomUUID()

  const jobData: AvailabilityJobData = {
    jobId,
    tourId: body.tourId || '',
    hutChecks: huts.map((hut) => ({
      hutId: hut.id,
      hutName: hut.name,
      bookingUrl: hut.bookingUrl,
      bookingSystem: hut.bookingSystem,
      dates,
      groupSize,
      roomPreference: roomPreference || 'any',
      phone: hut.phone,
      email: hut.email,
      website: hut.website,
    })),
  }

  const queue = getAvailabilityQueue()
  await queue.add('check-availability', jobData, {
    jobId,
    attempts: 2,
    backoff: { type: 'exponential', delay: 5000 },
  })

  return NextResponse.json({ jobId, hutsCount: huts.length, datesCount: dates.length })
}
