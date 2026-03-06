import { Queue } from 'bullmq'

function parseRedisUrl(url: string) {
  const parsed = new URL(url)
  return {
    host: parsed.hostname || 'localhost',
    port: parseInt(parsed.port || '6379', 10),
    maxRetriesPerRequest: null as null,
  }
}

let availabilityQueue: Queue | null = null

export function getAvailabilityQueue() {
  if (!availabilityQueue) {
    availabilityQueue = new Queue('availability', {
      connection: parseRedisUrl(process.env.REDIS_URL || 'redis://localhost:6379'),
    })
  }
  return availabilityQueue
}
