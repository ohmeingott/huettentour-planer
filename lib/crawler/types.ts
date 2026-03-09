export interface AvailabilityJobData {
  jobId: string
  tourId: string
  hutChecks: {
    hutId: string
    hutName: string
    bookingUrl: string | null
    bookingSystem: string
    seasonStart: string | null
    seasonEnd: string | null
    dates: string[]
    groupSize: number
    roomPreference: string
  }[]
}

export interface AvailabilityJobResult {
  jobId: string
  status: 'completed' | 'partial' | 'failed'
  results: HutAvailabilityResult[]
}

export interface HutAvailabilityResult {
  hutId: string
  hutName: string
  status: 'available' | 'unavailable' | 'error'
  dates: {
    date: string
    available: boolean
    uncertain?: boolean
    roomTypes: { type: string; available: number }[]
  }[]
  error?: string
}
