import { NextRequest, NextResponse } from 'next/server'
import { getAvailabilityQueue } from '@/lib/crawler/queue'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> },
) {
  const { jobId } = await params
  const queue = getAvailabilityQueue()
  const job = await queue.getJob(jobId)

  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 })
  }

  const state = await job.getState()

  return NextResponse.json({
    jobId,
    state,
    progress: job.progress,
    result: job.returnvalue,
    failedReason: job.failedReason,
  })
}
