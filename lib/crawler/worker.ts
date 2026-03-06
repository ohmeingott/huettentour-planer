import { Worker, Job } from 'bullmq'
import { AvailabilityJobData, HutAvailabilityResult } from './types'
import { getAdapter } from './adapters'

const USE_MOCK = process.env.USE_MOCK_CRAWLER === 'true'

function parseRedisUrl(url: string) {
  const parsed = new URL(url)
  return {
    host: parsed.hostname || 'localhost',
    port: parseInt(parsed.port || '6379', 10),
    maxRetriesPerRequest: null as null,
  }
}

export function startWorker() {
  const connection = parseRedisUrl(process.env.REDIS_URL || 'redis://localhost:6379')

  const worker = new Worker(
    'availability',
    async (job: Job<AvailabilityJobData>) => {
      const { hutChecks } = job.data
      const results: HutAvailabilityResult[] = []

      for (let i = 0; i < hutChecks.length; i++) {
        const check = hutChecks[i]

        try {
          const system = USE_MOCK ? 'mock' : check.bookingSystem
          const adapter = getAdapter(system)

          const dateStart = check.dates[0]
          const dateEnd = check.dates[check.dates.length - 1]

          const availability = await adapter.checkAvailability(
            check.bookingUrl || '',
            { start: dateStart, end: dateEnd },
            check.groupSize,
          )

          const allAvailable = availability.every((d) => d.available)

          results.push({
            hutId: check.hutId,
            hutName: check.hutName,
            status: allAvailable ? 'available' : 'unavailable',
            dates: availability,
          })
        } catch (error) {
          results.push({
            hutId: check.hutId,
            hutName: check.hutName,
            status: 'error',
            dates: [],
            error: error instanceof Error ? error.message : 'Unknown error',
          })
        }

        await job.updateProgress(Math.round(((i + 1) / hutChecks.length) * 100))
      }

      const allOk = results.every((r) => r.status === 'available')
      const anyError = results.some((r) => r.status === 'error')

      return {
        jobId: job.data.jobId,
        status: allOk ? 'completed' : anyError ? 'failed' : 'partial',
        results,
      }
    },
    { connection, concurrency: 2 },
  )

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`)
  })

  worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed:`, err)
  })

  return worker
}

