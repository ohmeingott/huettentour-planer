export interface AvailabilityJobData {
  jobId: string
  tourId: string
  hutChecks: {
    hutId: string
    hutName: string
    bookingUrl: string | null
    bookingSystem: string
    dates: string[]
    groupSize: number
    roomPreference: string
    phone?: string | null
    email?: string | null
    website?: string | null
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
    roomTypes: { type: string; available: number }[]
    confidence?: 'high' | 'low'
  }[]
  /** Contact info for the hut — shown when confidence is low */
  phone?: string | null
  email?: string | null
  website?: string | null
  error?: string
}
