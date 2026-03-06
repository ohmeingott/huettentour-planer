import { Queue } from 'bullmq'
import IORedis from 'ioredis'

let connection: IORedis | null = null

function getConnection() {
  if (!connection) {
    connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
      maxRetriesPerRequest: null,
    })
  }
  return connection
}

let availabilityQueue: Queue | null = null

export function getAvailabilityQueue() {
  if (!availabilityQueue) {
    availabilityQueue = new Queue('availability', {
      connection: getConnection(),
    })
  }
  return availabilityQueue
}
