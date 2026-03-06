import { PrismaClient, BookingSystem, Difficulty, RoomType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Stubaital region
  const stubaital = await prisma.region.create({
    data: {
      name: 'Stubaier Alpen',
      slug: 'stubaier-alpen',
      boundingBoxMinLat: 46.95,
      boundingBoxMinLng: 11.05,
      boundingBoxMaxLat: 47.15,
      boundingBoxMaxLng: 11.45,
      centerLat: 47.05,
      centerLng: 11.25,
    },
  })

  // Huts with real coordinate data
  const hutsData = [
    { name: 'Innsbrucker Hütte', altitude: 2369, lat: 47.0578, lng: 11.4103, capacity: 80, bookingSystem: BookingSystem.alpsonline, bookingUrl: 'https://www.alpsonline.org/reservation/calendar?hut_id=1280' },
    { name: 'Bremer Hütte', altitude: 2411, lat: 47.0403, lng: 11.4267, capacity: 60, bookingSystem: BookingSystem.alpsonline, bookingUrl: 'https://www.alpsonline.org/reservation/calendar?hut_id=1290' },
    { name: 'Nürnberger Hütte', altitude: 2280, lat: 47.0233, lng: 11.4456, capacity: 100, bookingSystem: BookingSystem.alpsonline, bookingUrl: 'https://www.alpsonline.org/reservation/calendar?hut_id=1300' },
    { name: 'Sulzenau Hütte', altitude: 2191, lat: 47.0311, lng: 11.3889, capacity: 90, bookingSystem: BookingSystem.alpsonline, bookingUrl: 'https://www.alpsonline.org/reservation/calendar?hut_id=1310' },
    { name: 'Dresdner Hütte', altitude: 2308, lat: 47.0067, lng: 11.3500, capacity: 120, bookingSystem: BookingSystem.alpsonline, bookingUrl: 'https://www.alpsonline.org/reservation/calendar?hut_id=1320' },
    { name: 'Neue Regensburger Hütte', altitude: 2286, lat: 47.0456, lng: 11.3667, capacity: 70, bookingSystem: BookingSystem.alpsonline, bookingUrl: 'https://www.alpsonline.org/reservation/calendar?hut_id=1330' },
    { name: 'Franz-Senn-Hütte', altitude: 2147, lat: 47.0833, lng: 11.3167, capacity: 150, bookingSystem: BookingSystem.alpsonline, bookingUrl: 'https://www.alpsonline.org/reservation/calendar?hut_id=1340' },
    { name: 'Starkenburger Hütte', altitude: 2237, lat: 47.0889, lng: 11.3000, capacity: 60, bookingSystem: BookingSystem.alpsonline, bookingUrl: 'https://www.alpsonline.org/reservation/calendar?hut_id=1350' },
    { name: 'Elferhütte', altitude: 2080, lat: 47.0944, lng: 11.3222, capacity: 40, bookingSystem: BookingSystem.alpsonline, bookingUrl: 'https://www.alpsonline.org/reservation/calendar?hut_id=1360' },
    { name: 'Mannheimer Hütte (Stubai)', altitude: 2007, lat: 47.0622, lng: 11.2833, capacity: 50, bookingSystem: BookingSystem.alpsonline, bookingUrl: 'https://www.alpsonline.org/reservation/calendar?hut_id=1370' },
    { name: 'Hildesheimer Hütte', altitude: 2899, lat: 46.9989, lng: 11.3833, capacity: 56, bookingSystem: BookingSystem.alpsonline, bookingUrl: 'https://www.alpsonline.org/reservation/calendar?hut_id=1380' },
    { name: 'Siegerlandhütte', altitude: 2710, lat: 46.9911, lng: 11.4000, capacity: 48, bookingSystem: BookingSystem.alpsonline, bookingUrl: 'https://www.alpsonline.org/reservation/calendar?hut_id=1390' },
    { name: 'Amberger Hütte', altitude: 2135, lat: 47.0144, lng: 11.2667, capacity: 72, bookingSystem: BookingSystem.alpsonline, bookingUrl: 'https://www.alpsonline.org/reservation/calendar?hut_id=1400' },
    { name: 'Westfalenhaus', altitude: 2273, lat: 47.0267, lng: 11.2500, capacity: 54, bookingSystem: BookingSystem.alpsonline, bookingUrl: 'https://www.alpsonline.org/reservation/calendar?hut_id=1410' },
    { name: 'Pforzheimer Hütte', altitude: 2308, lat: 47.0378, lng: 11.2833, capacity: 45, bookingSystem: BookingSystem.alpsonline, bookingUrl: 'https://www.alpsonline.org/reservation/calendar?hut_id=1420' },
  ]

  const huts = []
  for (const data of hutsData) {
    const hut = await prisma.hut.create({
      data: {
        ...data,
        regionId: stubaital.id,
        amenities: ['Warmwasser', 'Strom'],
      },
    })
    huts.push(hut)

    // Add room types for each hut
    await prisma.roomTypeConfig.createMany({
      data: [
        { hutId: hut.id, type: RoomType.double, count: Math.floor(data.capacity * 0.15) },
        { hutId: hut.id, type: RoomType.shared_4, count: Math.floor(data.capacity * 0.2) },
        { hutId: hut.id, type: RoomType.dorm, count: Math.floor(data.capacity * 0.5) },
      ],
    })
  }

  // Routes between neighboring huts (bidirectional)
  const routesData: { from: number; to: number; distance: number; ascent: number; descent: number; duration: number; difficulty: Difficulty }[] = [
    { from: 0, to: 1, distance: 5.2, ascent: 450, descent: 400, duration: 3.5, difficulty: Difficulty.moderate },
    { from: 1, to: 2, distance: 6.8, ascent: 380, descent: 510, duration: 4.0, difficulty: Difficulty.moderate },
    { from: 2, to: 3, distance: 4.5, ascent: 320, descent: 410, duration: 3.0, difficulty: Difficulty.easy },
    { from: 3, to: 5, distance: 5.0, ascent: 480, descent: 380, duration: 3.5, difficulty: Difficulty.moderate },
    { from: 5, to: 6, distance: 7.2, ascent: 350, descent: 490, duration: 4.5, difficulty: Difficulty.moderate },
    { from: 6, to: 7, distance: 3.8, ascent: 290, descent: 200, duration: 2.5, difficulty: Difficulty.easy },
    { from: 7, to: 8, distance: 2.5, ascent: 150, descent: 310, duration: 1.5, difficulty: Difficulty.easy },
    { from: 6, to: 9, distance: 6.0, ascent: 420, descent: 560, duration: 4.0, difficulty: Difficulty.moderate },
    { from: 3, to: 4, distance: 5.5, ascent: 520, descent: 400, duration: 4.0, difficulty: Difficulty.moderate },
    { from: 4, to: 10, distance: 4.2, ascent: 680, descent: 90, duration: 3.5, difficulty: Difficulty.difficult },
    { from: 10, to: 11, distance: 3.5, ascent: 200, descent: 390, duration: 2.5, difficulty: Difficulty.moderate },
    { from: 11, to: 2, distance: 6.0, ascent: 350, descent: 780, duration: 4.5, difficulty: Difficulty.moderate },
    { from: 9, to: 12, distance: 5.8, ascent: 380, descent: 250, duration: 3.5, difficulty: Difficulty.moderate },
    { from: 12, to: 13, distance: 4.0, ascent: 340, descent: 200, duration: 3.0, difficulty: Difficulty.moderate },
    { from: 13, to: 14, distance: 3.5, ascent: 280, descent: 250, duration: 2.5, difficulty: Difficulty.easy },
    { from: 14, to: 5, distance: 4.8, ascent: 350, descent: 370, duration: 3.0, difficulty: Difficulty.moderate },
    { from: 0, to: 5, distance: 7.0, ascent: 520, descent: 600, duration: 5.0, difficulty: Difficulty.moderate },
    { from: 8, to: 6, distance: 2.5, ascent: 310, descent: 150, duration: 2.0, difficulty: Difficulty.easy },
  ]

  for (const r of routesData) {
    // Forward direction
    await prisma.route.create({
      data: {
        fromHutId: huts[r.from].id,
        toHutId: huts[r.to].id,
        distance: r.distance,
        ascent: r.ascent,
        descent: r.descent,
        estimatedDuration: r.duration,
        difficulty: r.difficulty,
      },
    })
    // Reverse direction
    await prisma.route.create({
      data: {
        fromHutId: huts[r.to].id,
        toHutId: huts[r.from].id,
        distance: r.distance,
        ascent: r.descent,
        descent: r.ascent,
        estimatedDuration: r.duration,
        difficulty: r.difficulty,
      },
    })
  }

  console.log(`Seeded ${huts.length} huts and ${routesData.length * 2} routes in ${stubaital.name}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
