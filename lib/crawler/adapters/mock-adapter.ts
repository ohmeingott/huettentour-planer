import { BookingAdapter, DateRange, DayAvailability } from './types'
import { eachDayOfInterval, format } from 'date-fns'

export class MockAdapter implements BookingAdapter {
  async checkAvailability(
    hutUrl: string,
    dates: DateRange,
    groupSize: number,
  ): Promise<DayAvailability[]> {
    const days = eachDayOfInterval({
      start: new Date(dates.start),
      end: new Date(dates.end),
    })

    return days.map((day) => {
      const dayOfWeek = day.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      const available = Math.random() > (isWeekend ? 0.5 : 0.3)

      // ~15% of days get low confidence to simulate uncertain scraping
      const confidence = Math.random() > 0.15 ? 'high' as const : 'low' as const

      return {
        date: format(day, 'yyyy-MM-dd'),
        available,
        roomTypes: [
          { type: 'double', available: available ? Math.floor(Math.random() * 5) + 1 : 0 },
          { type: 'shared_4', available: available ? Math.floor(Math.random() * 3) + 1 : 0 },
          { type: 'dorm', available: available ? Math.floor(Math.random() * 15) + 5 : 0 },
        ],
        confidence,
      }
    })
  }
}
