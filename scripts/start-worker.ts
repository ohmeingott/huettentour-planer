import 'dotenv/config'
import { startWorker } from '../lib/crawler/worker'

async function main() {
  console.log('🕷️  Availability worker starting...')
  const worker = startWorker()

  // Wait for Redis connection — keeps the event loop alive
  await worker.waitUntilReady()
  console.log('🕷️  Worker connected and listening for jobs on queue "availability"')
  console.log('    Press Ctrl+C to stop.\n')

  // Keep process alive
  const keepAlive = setInterval(() => {}, 1 << 30)

  const shutdown = async () => {
    console.log('\n🛑 Shutting down worker...')
    clearInterval(keepAlive)
    await worker.close()
    process.exit(0)
  }
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

main().catch((err) => {
  console.error('Worker failed to start:', err)
  process.exit(1)
})
