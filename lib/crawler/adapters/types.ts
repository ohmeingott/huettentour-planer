export interface DateRange {
  start: string
  end: string
}

export interface RoomAvailability {
  type: string
  available: number
}

export interface DayAvailability {
  date: string
  available: boolean
  roomTypes: RoomAvailability[]
}

export interface BookingAdapter {
  checkAvailability(
    hutUrl: string,
    dates: DateRange,
    groupSize: number,
  ): Promise<DayAvailability[]>
}
