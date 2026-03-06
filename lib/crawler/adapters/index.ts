import { BookingAdapter } from './types'
import { MockAdapter } from './mock-adapter'
import { AlpsonlineAdapter } from './alpsonline-adapter'

const adapters: Record<string, () => BookingAdapter> = {
  alpsonline: () => new AlpsonlineAdapter(),
  mock: () => new MockAdapter(),
  hut_wrs: () => new MockAdapter(),
  sac: () => new MockAdapter(),
  custom: () => new MockAdapter(),
}

export function getAdapter(bookingSystem: string): BookingAdapter {
  const factory = adapters[bookingSystem] || adapters.mock
  return factory()
}
