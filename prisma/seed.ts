import { PrismaClient, BookingSystem, Difficulty, RoomType } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

interface RegionSeed {
  name: string
  slug: string
  bounds: { minLat: number; minLng: number; maxLat: number; maxLng: number }
  center: { lat: number; lng: number }
  huts: { name: string; altitude: number; lat: number; lng: number; capacity: number }[]
  routes: { from: number; to: number; distance: number; ascent: number; descent: number; duration: number; difficulty: Difficulty }[]
}

const regions: RegionSeed[] = [
  {
    name: 'Stubaier Alpen',
    slug: 'stubaier-alpen',
    bounds: { minLat: 46.95, minLng: 11.05, maxLat: 47.15, maxLng: 11.45 },
    center: { lat: 47.05, lng: 11.25 },
    huts: [
      { name: 'Innsbrucker Hütte', altitude: 2369, lat: 47.0578, lng: 11.4103, capacity: 80 },
      { name: 'Bremer Hütte', altitude: 2411, lat: 47.0403, lng: 11.4267, capacity: 60 },
      { name: 'Nürnberger Hütte', altitude: 2280, lat: 47.0233, lng: 11.4456, capacity: 100 },
      { name: 'Sulzenau Hütte', altitude: 2191, lat: 47.0311, lng: 11.3889, capacity: 90 },
      { name: 'Dresdner Hütte', altitude: 2308, lat: 47.0067, lng: 11.3500, capacity: 120 },
      { name: 'Neue Regensburger Hütte', altitude: 2286, lat: 47.0456, lng: 11.3667, capacity: 70 },
      { name: 'Franz-Senn-Hütte', altitude: 2147, lat: 47.0833, lng: 11.3167, capacity: 150 },
      { name: 'Starkenburger Hütte', altitude: 2237, lat: 47.0889, lng: 11.3000, capacity: 60 },
      { name: 'Elferhütte', altitude: 2080, lat: 47.0944, lng: 11.3222, capacity: 40 },
      { name: 'Mannheimer Hütte (Stubai)', altitude: 2007, lat: 47.0622, lng: 11.2833, capacity: 50 },
      { name: 'Hildesheimer Hütte', altitude: 2899, lat: 46.9989, lng: 11.3833, capacity: 56 },
      { name: 'Siegerlandhütte', altitude: 2710, lat: 46.9911, lng: 11.4000, capacity: 48 },
      { name: 'Amberger Hütte', altitude: 2135, lat: 47.0144, lng: 11.2667, capacity: 72 },
      { name: 'Westfalenhaus', altitude: 2273, lat: 47.0267, lng: 11.2500, capacity: 54 },
      { name: 'Pforzheimer Hütte', altitude: 2308, lat: 47.0378, lng: 11.2833, capacity: 45 },
    ],
    routes: [
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
    ],
  },
  {
    name: 'Zillertaler Alpen',
    slug: 'zillertal',
    bounds: { minLat: 46.90, minLng: 11.65, maxLat: 47.20, maxLng: 12.10 },
    center: { lat: 47.05, lng: 11.87 },
    huts: [
      { name: 'Olperer Hütte', altitude: 2389, lat: 47.0192, lng: 11.7008, capacity: 72 },
      { name: 'Friesenberghaus', altitude: 2498, lat: 47.0139, lng: 11.7275, capacity: 60 },
      { name: 'Furtschaglhaus', altitude: 2295, lat: 47.0025, lng: 11.7456, capacity: 66 },
      { name: 'Berliner Hütte', altitude: 2042, lat: 47.0289, lng: 11.7875, capacity: 180 },
      { name: 'Greizer Hütte', altitude: 2227, lat: 47.0117, lng: 11.8183, capacity: 86 },
      { name: 'Kasseler Hütte', altitude: 2178, lat: 47.0211, lng: 11.8558, capacity: 70 },
      { name: 'Edelhütte', altitude: 2238, lat: 47.0533, lng: 11.8300, capacity: 48 },
      { name: 'Karl-von-Edel-Hütte', altitude: 2238, lat: 47.0400, lng: 11.8475, capacity: 90 },
      { name: 'Plauener Hütte', altitude: 2364, lat: 47.0067, lng: 11.7533, capacity: 50 },
      { name: 'Gamshütte', altitude: 1921, lat: 47.0739, lng: 11.8017, capacity: 55 },
      { name: 'Dominikushütte', altitude: 1805, lat: 47.0400, lng: 11.7050, capacity: 40 },
      { name: 'Pfitscherjoch-Haus', altitude: 2276, lat: 46.9950, lng: 11.6700, capacity: 65 },
    ],
    routes: [
      { from: 0, to: 1, distance: 3.2, ascent: 280, descent: 170, duration: 2.0, difficulty: Difficulty.moderate },
      { from: 1, to: 2, distance: 4.5, ascent: 200, descent: 400, duration: 2.5, difficulty: Difficulty.moderate },
      { from: 2, to: 8, distance: 3.0, ascent: 250, descent: 180, duration: 2.0, difficulty: Difficulty.moderate },
      { from: 2, to: 3, distance: 5.8, ascent: 350, descent: 600, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 3, to: 4, distance: 6.5, ascent: 520, descent: 330, duration: 4.5, difficulty: Difficulty.moderate },
      { from: 4, to: 5, distance: 5.2, ascent: 380, descent: 430, duration: 3.5, difficulty: Difficulty.moderate },
      { from: 5, to: 7, distance: 4.8, ascent: 320, descent: 260, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 7, to: 6, distance: 3.5, ascent: 210, descent: 210, duration: 2.0, difficulty: Difficulty.easy },
      { from: 6, to: 9, distance: 5.0, ascent: 180, descent: 500, duration: 3.0, difficulty: Difficulty.easy },
      { from: 3, to: 7, distance: 5.5, ascent: 450, descent: 250, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 0, to: 10, distance: 4.0, ascent: 150, descent: 740, duration: 2.5, difficulty: Difficulty.easy },
      { from: 0, to: 11, distance: 5.5, ascent: 350, descent: 460, duration: 3.5, difficulty: Difficulty.moderate },
      { from: 9, to: 3, distance: 6.2, ascent: 400, descent: 280, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 8, to: 3, distance: 4.8, ascent: 200, descent: 520, duration: 3.5, difficulty: Difficulty.moderate },
    ],
  },
  {
    name: 'Ötztaler Alpen',
    slug: 'oetztal',
    bounds: { minLat: 46.70, minLng: 10.60, maxLat: 47.00, maxLng: 11.10 },
    center: { lat: 46.85, lng: 10.85 },
    huts: [
      { name: 'Vernagthütte', altitude: 2755, lat: 46.8444, lng: 10.7667, capacity: 80 },
      { name: 'Hochjoch-Hospiz', altitude: 2412, lat: 46.8278, lng: 10.7917, capacity: 70 },
      { name: 'Brandenburger Haus', altitude: 3272, lat: 46.8347, lng: 10.7369, capacity: 50 },
      { name: 'Martin-Busch-Hütte', altitude: 2501, lat: 46.8042, lng: 10.8600, capacity: 100 },
      { name: 'Similaunhütte', altitude: 3019, lat: 46.7833, lng: 10.8667, capacity: 60 },
      { name: 'Schöne Aussicht', altitude: 2842, lat: 46.7722, lng: 10.8100, capacity: 50 },
      { name: 'Bella Vista', altitude: 2845, lat: 46.7650, lng: 10.8283, capacity: 45 },
      { name: 'Langtalereck Hütte', altitude: 2430, lat: 46.8583, lng: 10.8250, capacity: 40 },
      { name: 'Ramolhaus', altitude: 3006, lat: 46.8500, lng: 10.7925, capacity: 55 },
      { name: 'Erlanger Hütte', altitude: 2550, lat: 46.8850, lng: 10.7783, capacity: 62 },
      { name: 'Braunschweiger Hütte', altitude: 2759, lat: 46.9125, lng: 10.8467, capacity: 90 },
    ],
    routes: [
      { from: 0, to: 1, distance: 4.5, ascent: 200, descent: 540, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 0, to: 2, distance: 3.8, ascent: 620, descent: 100, duration: 3.5, difficulty: Difficulty.difficult },
      { from: 0, to: 8, distance: 3.5, ascent: 350, descent: 100, duration: 2.5, difficulty: Difficulty.moderate },
      { from: 1, to: 3, distance: 5.2, ascent: 400, descent: 310, duration: 3.5, difficulty: Difficulty.moderate },
      { from: 1, to: 7, distance: 4.0, ascent: 280, descent: 260, duration: 3.0, difficulty: Difficulty.easy },
      { from: 3, to: 4, distance: 4.8, ascent: 580, descent: 60, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 3, to: 5, distance: 6.0, ascent: 550, descent: 210, duration: 4.5, difficulty: Difficulty.moderate },
      { from: 5, to: 6, distance: 2.5, ascent: 150, descent: 150, duration: 1.5, difficulty: Difficulty.easy },
      { from: 5, to: 4, distance: 4.2, ascent: 350, descent: 180, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 7, to: 0, distance: 3.5, ascent: 450, descent: 120, duration: 2.5, difficulty: Difficulty.moderate },
      { from: 8, to: 9, distance: 4.0, ascent: 200, descent: 650, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 9, to: 10, distance: 5.5, ascent: 450, descent: 240, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 10, to: 7, distance: 6.2, ascent: 200, descent: 530, duration: 4.0, difficulty: Difficulty.moderate },
    ],
  },
  {
    name: 'Dolomiten',
    slug: 'dolomiten',
    bounds: { minLat: 46.25, minLng: 11.40, maxLat: 46.65, maxLng: 12.30 },
    center: { lat: 46.45, lng: 11.85 },
    huts: [
      { name: 'Schlernhaus', altitude: 2457, lat: 46.5064, lng: 11.5653, capacity: 120 },
      { name: 'Tierser-Alpl-Hütte', altitude: 2440, lat: 46.5000, lng: 11.5925, capacity: 55 },
      { name: 'Grasleitenpasshütte', altitude: 2600, lat: 46.4875, lng: 11.6083, capacity: 42 },
      { name: 'Rotwandhütte', altitude: 2280, lat: 46.4772, lng: 11.5783, capacity: 30 },
      { name: 'Vajolet-Hütte', altitude: 2243, lat: 46.4650, lng: 11.6208, capacity: 75 },
      { name: 'Preuss-Hütte', altitude: 2243, lat: 46.4636, lng: 11.6225, capacity: 35 },
      { name: 'Paolinahütte', altitude: 2125, lat: 46.4522, lng: 11.6400, capacity: 50 },
      { name: 'Rif. Antermoia', altitude: 2497, lat: 46.4417, lng: 11.6700, capacity: 58 },
      { name: 'Rif. Passo Principe', altitude: 2601, lat: 46.4558, lng: 11.6567, capacity: 28 },
      { name: 'Kölner Hütte', altitude: 2337, lat: 46.4386, lng: 11.5917, capacity: 100 },
      { name: 'Rif. Alpe di Tires', altitude: 2440, lat: 46.4917, lng: 11.5583, capacity: 65 },
    ],
    routes: [
      { from: 0, to: 1, distance: 3.5, ascent: 280, descent: 300, duration: 2.0, difficulty: Difficulty.moderate },
      { from: 0, to: 10, distance: 2.8, ascent: 180, descent: 200, duration: 1.5, difficulty: Difficulty.easy },
      { from: 1, to: 2, distance: 2.5, ascent: 320, descent: 160, duration: 2.0, difficulty: Difficulty.moderate },
      { from: 2, to: 3, distance: 3.0, ascent: 150, descent: 470, duration: 2.0, difficulty: Difficulty.moderate },
      { from: 2, to: 4, distance: 4.2, ascent: 200, descent: 560, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 4, to: 5, distance: 0.5, ascent: 20, descent: 20, duration: 0.3, difficulty: Difficulty.easy },
      { from: 4, to: 6, distance: 3.8, ascent: 200, descent: 320, duration: 2.5, difficulty: Difficulty.moderate },
      { from: 6, to: 7, distance: 5.0, ascent: 580, descent: 210, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 4, to: 8, distance: 3.5, ascent: 500, descent: 140, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 8, to: 7, distance: 3.0, ascent: 200, descent: 300, duration: 2.5, difficulty: Difficulty.moderate },
      { from: 3, to: 9, distance: 4.5, ascent: 300, descent: 240, duration: 3.0, difficulty: Difficulty.moderate },
      { from: 6, to: 9, distance: 3.2, ascent: 380, descent: 170, duration: 2.5, difficulty: Difficulty.moderate },
      { from: 10, to: 1, distance: 3.0, ascent: 200, descent: 200, duration: 2.0, difficulty: Difficulty.easy },
    ],
  },
  {
    name: 'Berner Oberland',
    slug: 'berner-oberland',
    bounds: { minLat: 46.35, minLng: 7.60, maxLat: 46.75, maxLng: 8.30 },
    center: { lat: 46.55, lng: 7.95 },
    huts: [
      { name: 'Grindelwaldblick', altitude: 2346, lat: 46.5833, lng: 8.0500, capacity: 55 },
      { name: 'Glecksteinhütte', altitude: 2317, lat: 46.6000, lng: 8.0667, capacity: 70 },
      { name: 'Schreckhornhütte', altitude: 2529, lat: 46.5833, lng: 8.0833, capacity: 40 },
      { name: 'Lauteraarenhütte', altitude: 2392, lat: 46.5750, lng: 8.1083, capacity: 45 },
      { name: 'Dossenhütte', altitude: 2663, lat: 46.6500, lng: 8.1500, capacity: 48 },
      { name: 'Gaulihütte', altitude: 2205, lat: 46.6333, lng: 8.1667, capacity: 52 },
      { name: 'Bächlitalhütte', altitude: 2328, lat: 46.6167, lng: 8.2000, capacity: 60 },
      { name: 'Oberaarjochhütte', altitude: 3256, lat: 46.5417, lng: 8.2333, capacity: 46 },
      { name: 'Finsteraarhornhütte', altitude: 3048, lat: 46.5583, lng: 8.1333, capacity: 38 },
      { name: 'Konkordiahütte', altitude: 2850, lat: 46.5500, lng: 8.0333, capacity: 110 },
    ],
    routes: [
      { from: 0, to: 1, distance: 3.0, ascent: 220, descent: 250, duration: 2.0, difficulty: Difficulty.moderate },
      { from: 1, to: 2, distance: 4.5, ascent: 450, descent: 240, duration: 3.5, difficulty: Difficulty.moderate },
      { from: 2, to: 3, distance: 3.8, ascent: 200, descent: 340, duration: 2.5, difficulty: Difficulty.moderate },
      { from: 3, to: 8, distance: 5.0, ascent: 780, descent: 120, duration: 5.0, difficulty: Difficulty.difficult },
      { from: 8, to: 9, distance: 4.5, ascent: 200, descent: 400, duration: 3.5, difficulty: Difficulty.moderate },
      { from: 9, to: 0, distance: 6.0, ascent: 150, descent: 650, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 3, to: 7, distance: 6.5, ascent: 950, descent: 80, duration: 6.0, difficulty: Difficulty.difficult },
      { from: 7, to: 6, distance: 5.0, ascent: 100, descent: 1030, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 6, to: 5, distance: 3.5, ascent: 200, descent: 320, duration: 2.5, difficulty: Difficulty.easy },
      { from: 5, to: 4, distance: 4.0, ascent: 550, descent: 90, duration: 3.5, difficulty: Difficulty.moderate },
      { from: 4, to: 1, distance: 5.5, ascent: 200, descent: 550, duration: 4.0, difficulty: Difficulty.moderate },
      { from: 8, to: 7, distance: 4.2, ascent: 350, descent: 140, duration: 3.5, difficulty: Difficulty.difficult },
    ],
  },
]

async function main() {
  // Clear existing data
  await prisma.route.deleteMany()
  await prisma.roomTypeConfig.deleteMany()
  await prisma.hut.deleteMany()
  await prisma.region.deleteMany()

  for (const region of regions) {
    const dbRegion = await prisma.region.create({
      data: {
        name: region.name,
        slug: region.slug,
        boundingBoxMinLat: region.bounds.minLat,
        boundingBoxMinLng: region.bounds.minLng,
        boundingBoxMaxLat: region.bounds.maxLat,
        boundingBoxMaxLng: region.bounds.maxLng,
        centerLat: region.center.lat,
        centerLng: region.center.lng,
      },
    })

    const huts = []
    for (const h of region.huts) {
      const hut = await prisma.hut.create({
        data: {
          name: h.name,
          altitude: h.altitude,
          lat: h.lat,
          lng: h.lng,
          capacity: h.capacity,
          regionId: dbRegion.id,
          bookingSystem: BookingSystem.alpsonline,
          bookingUrl: '',
          amenities: ['Warmwasser', 'Strom'],
        },
      })
      huts.push(hut)

      await prisma.roomTypeConfig.createMany({
        data: [
          { hutId: hut.id, type: RoomType.double, count: Math.max(2, Math.floor(h.capacity * 0.15)) },
          { hutId: hut.id, type: RoomType.shared_4, count: Math.max(2, Math.floor(h.capacity * 0.2)) },
          { hutId: hut.id, type: RoomType.dorm, count: Math.max(4, Math.floor(h.capacity * 0.5)) },
        ],
      })
    }

    for (const r of region.routes) {
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

    console.log(`  ✓ ${region.name}: ${huts.length} huts, ${region.routes.length * 2} routes`)
  }

  const totalHuts = regions.reduce((s, r) => s + r.huts.length, 0)
  const totalRoutes = regions.reduce((s, r) => s + r.routes.length * 2, 0)
  console.log(`\n🌱 Seeded ${regions.length} regions, ${totalHuts} huts, ${totalRoutes} routes`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
