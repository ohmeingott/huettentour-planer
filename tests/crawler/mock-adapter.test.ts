import { describe, it, expect } from 'vitest'
import { MockAdapter } from '@/lib/crawler/adapters/mock-adapter'

describe('MockAdapter', () => {
  it('returns availability for date range', async () => {
    const adapter = new MockAdapter()
    const results = await adapter.checkAvailability(
      'https://example.com',
      { start: '2026-07-15', end: '2026-07-17' },
      4,
    )
    expect(results).toHaveLength(3)
    results.forEach((r) => {
      expect(r.roomTypes).toBeDefined()
      expect(r.date).toBeDefined()
    })
  })
})
