import { chromium, Browser } from 'playwright'
import { BookingAdapter, DateRange, DayAvailability } from './types'
import { eachDayOfInterval, format } from 'date-fns'

export class AlpsonlineAdapter implements BookingAdapter {
  private browser: Browser | null = null

  async checkAvailability(
    hutUrl: string,
    dates: DateRange,
    groupSize: number,
  ): Promise<DayAvailability[]> {
    const results: DayAvailability[] = []

    try {
      this.browser = await chromium.launch({ headless: true })
      const page = await this.browser.newPage()
      await page.goto(hutUrl, { waitUntil: 'networkidle', timeout: 30000 })

      const days = eachDayOfInterval({
        start: new Date(dates.start),
        end: new Date(dates.end),
      })

      for (const day of days) {
        const dateStr = format(day, 'yyyy-MM-dd')

        try {
          const daySelector = `[data-date="${dateStr}"], td[title*="${format(day, 'dd.MM.yyyy')}"]`
          const dayCell = await page.$(daySelector)

          if (dayCell) {
            const classes = (await dayCell.getAttribute('class')) || ''
            const available = !classes.includes('occupied') && !classes.includes('closed')

            results.push({
              date: dateStr,
              available,
              roomTypes: [
                { type: 'dorm', available: available ? groupSize : 0 },
              ],
            })
          } else {
            results.push({ date: dateStr, available: false, roomTypes: [] })
          }
        } catch {
          results.push({ date: dateStr, available: false, roomTypes: [] })
        }
      }
    } finally {
      await this.browser?.close()
    }

    return results
  }
}
