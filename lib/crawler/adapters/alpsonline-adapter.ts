import { chromium, Browser } from 'playwright'
import { BookingAdapter, DateRange, DayAvailability } from './types'
import { eachDayOfInterval, format, parse } from 'date-fns'

export class AlpsonlineAdapter implements BookingAdapter {
  private browser: Browser | null = null

  async checkAvailability(
    hutUrl: string,
    dates: DateRange,
    groupSize: number,
  ): Promise<DayAvailability[]> {
    if (!hutUrl || hutUrl.trim() === '') {
      throw new Error('No booking URL configured for this hut')
    }

    const days = eachDayOfInterval({
      start: new Date(dates.start),
      end: new Date(dates.end),
    })

    try {
      this.browser = await chromium.launch({ headless: true })
      const context = await this.browser.newContext({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      })
      const page = await context.newPage()

      await page.goto(hutUrl, { waitUntil: 'domcontentloaded', timeout: 30000 })

      // Wait for the calendar to render (SPA)
      await page.waitForTimeout(3000)

      // Try multiple selector strategies for the calendar
      const results = await this.extractAvailability(page, days, groupSize)
      return results
    } finally {
      await this.browser?.close()
      this.browser = null
    }
  }

  private async extractAvailability(
    page: import('playwright').Page,
    days: Date[],
    groupSize: number,
  ): Promise<DayAvailability[]> {
    const results: DayAvailability[] = []

    // Strategy 1: hut-reservation.org wizard calendar
    // These calendars use day buttons/cells with various states
    const calendarFound = await page.$('.calendar, [class*="calendar"], [class*="datepicker"], [role="grid"]')

    if (calendarFound) {
      for (const day of days) {
        const dateStr = format(day, 'yyyy-MM-dd')
        const result = await this.checkDateOnPage(page, day, dateStr, groupSize)
        results.push(result)
      }
      return results
    }

    // Strategy 2: If no calendar found, check for "closed" or "geschlossen" text
    const pageText = await page.textContent('body') || ''
    const isClosed = /geschlossen|closed|wintersperre|nicht geöffnet|saisonende|season.*end/i.test(pageText)

    if (isClosed) {
      return days.map((day) => ({
        date: format(day, 'yyyy-MM-dd'),
        available: false,
        roomTypes: [],
      }))
    }

    // Strategy 3: No calendar and not explicitly closed → uncertain
    throw new Error('Could not find availability calendar on page')
  }

  private async checkDateOnPage(
    page: import('playwright').Page,
    day: Date,
    dateStr: string,
    groupSize: number,
  ): Promise<DayAvailability> {
    try {
      // Try multiple date selector formats
      const selectors = [
        // data-date attribute (ISO format)
        `[data-date="${dateStr}"]`,
        // Title with German date format
        `[title*="${format(day, 'dd.MM.yyyy')}"]`,
        // aria-label with date
        `[aria-label*="${format(day, 'd')}"]`,
        // data-day attribute
        `[data-day="${format(day, 'd')}"][data-month="${format(day, 'M')}"]`,
        // Generic calendar cell with date text
        `td:has-text("${format(day, 'd')}")`,
        `button:has-text("${format(day, 'd')}")`,
      ]

      for (const selector of selectors) {
        const cell = await page.$(selector)
        if (!cell) continue

        const classes = (await cell.getAttribute('class')) || ''
        const ariaDisabled = await cell.getAttribute('aria-disabled')
        const disabled = await cell.getAttribute('disabled')

        // Check for unavailability indicators
        const isUnavailable =
          classes.includes('occupied') ||
          classes.includes('closed') ||
          classes.includes('disabled') ||
          classes.includes('unavailable') ||
          classes.includes('blocked') ||
          classes.includes('past') ||
          classes.includes('inactive') ||
          ariaDisabled === 'true' ||
          disabled !== null

        return {
          date: dateStr,
          available: !isUnavailable,
          roomTypes: [
            { type: 'dorm', available: !isUnavailable ? groupSize : 0 },
          ],
        }
      }

      // Date cell not found on the visible calendar page
      // This often means the month isn't displayed yet — mark as unavailable
      return { date: dateStr, available: false, roomTypes: [] }
    } catch {
      return { date: dateStr, available: false, roomTypes: [] }
    }
  }
}
