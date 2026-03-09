import { Worker, Job } from 'bullmq'
import { AvailabilityJobData, HutAvailabilityResult } from './types'
import { getAdapter } from './adapters'

function parseRedisUrl(url: string) {
  const parsed = new URL(url)
  return {
    host: parsed.hostname || 'localhost',
    port: parseInt(parsed.port || '6379', 10),
    maxRetriesPerRequest: null as null,
  }
}

/**
 * Check if a date falls within the hut's open season.
 * seasonStart/seasonEnd are in "MM-DD" format (e.g. "06-15", "09-30").
 * If no season data → assume always open.
 */
function isDateInSeason(dateStr: string, seasonStart?: string | null, seasonEnd?: string | null): boolean {
  if (!seasonStart || !seasonEnd) return true

  const monthDay = dateStr.slice(5) // "2026-07-15" → "07-15"
  return monthDay >= seasonStart && monthDay <= seasonEnd
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

        // Check if any requested dates are out of season → mark those as unavailable
        const outOfSeasonDates = check.dates.filter(
          (d) => !isDateInSeason(d, check.seasonStart, check.seasonEnd),
        )
        const inSeasonDates = check.dates.filter(
          (d) => isDateInSeason(d, check.seasonStart, check.seasonEnd),
        )

        // If ALL dates are out of season, no need to call the adapter
        if (inSeasonDates.length === 0) {
          results.push({
            hutId: check.hutId,
            hutName: check.hutName,
            status: 'unavailable',
            dates: check.dates.map((date) => ({
              date,
              available: false,
              roomTypes: [],
            })),
          })
          await job.updateProgress(Math.round(((i + 1) / hutChecks.length) * 100))
          continue
        }

        try {
          const adapter = getAdapter(check.bookingSystem)

          const dateStart = inSeasonDates[0]
          const dateEnd = inSeasonDates[inSeasonDates.length - 1]

          const availability = await adapter.checkAvailability(
            check.bookingUrl || '',
            { start: dateStart, end: dateEnd },
            check.groupSize,
          )

          // Merge: out-of-season dates as unavailable, in-season dates from adapter
          const allDates = check.dates.map((date) => {
            if (outOfSeasonDates.includes(date)) {
              return { date, available: false, roomTypes: [] as { type: string; available: number }[] }
            }
            return availability.find((a) => a.date === date) || { date, available: false, roomTypes: [] as { type: string; available: number }[] }
          })

          const allAvailable = allDates.every((d) => d.available)

          results.push({
            hutId: check.hutId,
            hutName: check.hutName,
            status: allAvailable ? 'available' : 'unavailable',
            dates: allDates,
          })
        } catch (error) {
          // Fill dates with uncertain markers so the calendar can show "?"
          const uncertainDates = check.dates.map((date) => {
            // Out-of-season dates are definitively unavailable, not uncertain
            if (outOfSeasonDates.includes(date)) {
              return { date, available: false, uncertain: false, roomTypes: [] as { type: string; available: number }[] }
            }
            return {
              date,
              available: false,
              uncertain: true,
              roomTypes: [] as { type: string; available: number }[],
            }
          })

          results.push({
            hutId: check.hutId,
            hutName: check.hutName,
            status: 'error',
            dates: uncertainDates,
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
