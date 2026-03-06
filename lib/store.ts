import { create } from 'zustand'

export interface HutDetail {
  id: string
  name: string
  altitude: number
  lat: number
  lng: number
  imageUrl: string | null
  capacity?: number
  roomTypes?: { type: string; count: number }[]
}

export interface TourLeg {
  fromHutId: string
  toHutId: string
  distance: number
  ascent: number
  descent: number
  estimatedDuration: number
}

export interface TourResult {
  huts: string[]
  hutDetails: HutDetail[]
  legs: TourLeg[]
  totalDistance: number
  totalAscent: number
  totalDescent: number
  totalDuration: number
}

export interface TourParams {
  regionId: string
  groupSize: number
  totalDays: number
  restDays: number
  minDistance: number | undefined
  maxDistance: number | undefined
  maxAscent: number | undefined
  roomPreference: string
  maxBedsPerRoom: number | undefined
}

interface AppState {
  selectedRegionId: string | null
  setSelectedRegionId: (id: string | null) => void

  tourParams: TourParams
  setTourParams: (params: Partial<TourParams>) => void

  tourResults: TourResult[]
  setTourResults: (tours: TourResult[]) => void
  totalFound: number
  setTotalFound: (n: number) => void

  selectedTour: TourResult | null
  setSelectedTour: (tour: TourResult | null) => void

  availabilityJobId: string | null
  setAvailabilityJobId: (id: string | null) => void
  availabilityResult: any | null
  setAvailabilityResult: (result: any) => void

  dateStart: string
  dateEnd: string
  setDateRange: (start: string, end: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedRegionId: null,
  setSelectedRegionId: (id) => set({ selectedRegionId: id }),

  tourParams: {
    regionId: '',
    groupSize: 2,
    totalDays: 4,
    restDays: 0,
    minDistance: undefined,
    maxDistance: undefined,
    maxAscent: undefined,
    roomPreference: 'any',
    maxBedsPerRoom: undefined,
  },
  setTourParams: (params) =>
    set((state) => ({ tourParams: { ...state.tourParams, ...params } })),

  tourResults: [],
  setTourResults: (tours) => set({ tourResults: tours }),
  totalFound: 0,
  setTotalFound: (n) => set({ totalFound: n }),

  selectedTour: null,
  setSelectedTour: (tour) => set({ selectedTour: tour }),

  availabilityJobId: null,
  setAvailabilityJobId: (id) => set({ availabilityJobId: id }),
  availabilityResult: null,
  setAvailabilityResult: (result) => set({ availabilityResult: result }),

  dateStart: '',
  dateEnd: '',
  setDateRange: (start, end) => set({ dateStart: start, dateEnd: end }),
}))
