import { PrismaClient, BookingSystem, DataSource, Difficulty, RoomType } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import * as fs from 'fs'
import * as path from 'path'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

interface OsmHut {
  osmId: number
  name: string
  altitude: number
  lat: number
  lng: number
  capacity: number | null
  operator: string | null
  website: string | null
  phone: string | null
  email: string | null
  openingHours: string | null
  description: string | null
}

interface OsmRegion {
  name: string
  slug: string
  bounds: { minLat: number; minLng: number; maxLat: number; maxLng: number }
  center: { lat: number; lng: number }
  huts: OsmHut[]
}

interface RouteDef {
  fromHut: string
  toHut: string
  distance: number
  ascent: number
  descent: number
  duration: number
  difficulty: Difficulty
}

// Routes between huts (by name) — these connect the huts into a walkable network.
// Distances and durations are estimates; refine with real trail data as needed.
const ROUTES_BY_REGION: Record<string, RouteDef[]> = {
  'stubaier-alpen': [
    { fromHut: 'Innsbrucker Hütte', toHut: 'Bremer Hütte', distance: 5.2, ascent: 450, descent: 400, duration: 3.5, difficulty: Difficulty.moderate },
    { fromHut: 'Bremer Hütte', toHut: 'Nürnberger Hütte', distance: 6.8, ascent: 380, descent: 510, duration: 4.0, difficulty: Difficulty.moderate },
    { fromHut: 'Nürnberger Hütte', toHut: 'Sulzenau Hütte', distance: 4.5, ascent: 320, descent: 410, duration: 3.0, difficulty: Difficulty.easy },
    { fromHut: 'Sulzenau Hütte', toHut: 'Neue Regensburger Hütte', distance: 5.0, ascent: 480, descent: 380, duration: 3.5, difficulty: Difficulty.moderate },
    { fromHut: 'Neue Regensburger Hütte', toHut: 'Franz-Senn-Hütte', distance: 7.2, ascent: 350, descent: 490, duration: 4.5, difficulty: Difficulty.moderate },
    { fromHut: 'Franz-Senn-Hütte', toHut: 'Starkenburger Hütte', distance: 3.8, ascent: 290, descent: 200, duration: 2.5, difficulty: Difficulty.easy },
    { fromHut: 'Starkenburger Hütte', toHut: 'Elferhütte', distance: 2.5, ascent: 150, descent: 310, duration: 1.5, difficulty: Difficulty.easy },
    { fromHut: 'Franz-Senn-Hütte', toHut: 'Mannheimer Hütte (Stubai)', distance: 6.0, ascent: 420, descent: 560, duration: 4.0, difficulty: Difficulty.moderate },
    { fromHut: 'Sulzenau Hütte', toHut: 'Dresdner Hütte', distance: 5.5, ascent: 520, descent: 400, duration: 4.0, difficulty: Difficulty.moderate },
    { fromHut: 'Dresdner Hütte', toHut: 'Hildesheimer Hütte', distance: 4.2, ascent: 680, descent: 90, duration: 3.5, difficulty: Difficulty.difficult },
    { fromHut: 'Hildesheimer Hütte', toHut: 'Siegerlandhütte', distance: 3.5, ascent: 200, descent: 390, duration: 2.5, difficulty: Difficulty.moderate },
    { fromHut: 'Siegerlandhütte', toHut: 'Nürnberger Hütte', distance: 6.0, ascent: 350, descent: 780, duration: 4.5, difficulty: Difficulty.moderate },
    { fromHut: 'Mannheimer Hütte (Stubai)', toHut: 'Amberger Hütte', distance: 5.8, ascent: 380, descent: 250, duration: 3.5, difficulty: Difficulty.moderate },
    { fromHut: 'Amberger Hütte', toHut: 'Westfalenhaus', distance: 4.0, ascent: 340, descent: 200, duration: 3.0, difficulty: Difficulty.moderate },
    { fromHut: 'Westfalenhaus', toHut: 'Pforzheimer Hütte', distance: 3.5, ascent: 280, descent: 250, duration: 2.5, difficulty: Difficulty.easy },
    { fromHut: 'Pforzheimer Hütte', toHut: 'Neue Regensburger Hütte', distance: 4.8, ascent: 350, descent: 370, duration: 3.0, difficulty: Difficulty.moderate },
    { fromHut: 'Innsbrucker Hütte', toHut: 'Neue Regensburger Hütte', distance: 7.0, ascent: 520, descent: 600, duration: 5.0, difficulty: Difficulty.moderate },
    { fromHut: 'Elferhütte', toHut: 'Franz-Senn-Hütte', distance: 2.5, ascent: 310, descent: 150, duration: 2.0, difficulty: Difficulty.easy },
  ],
  'zillertal': [
    { fromHut: 'Olperer Hütte', toHut: 'Friesenberghaus', distance: 3.2, ascent: 280, descent: 170, duration: 2.0, difficulty: Difficulty.moderate },
    { fromHut: 'Friesenberghaus', toHut: 'Furtschaglhaus', distance: 4.5, ascent: 200, descent: 400, duration: 2.5, difficulty: Difficulty.moderate },
    { fromHut: 'Furtschaglhaus', toHut: 'Plauener Hütte', distance: 3.0, ascent: 250, descent: 180, duration: 2.0, difficulty: Difficulty.moderate },
    { fromHut: 'Furtschaglhaus', toHut: 'Berliner Hütte', distance: 5.8, ascent: 350, descent: 600, duration: 4.0, difficulty: Difficulty.moderate },
    { fromHut: 'Berliner Hütte', toHut: 'Greizer Hütte', distance: 6.5, ascent: 520, descent: 330, duration: 4.5, difficulty: Difficulty.moderate },
    { fromHut: 'Greizer Hütte', toHut: 'Kasseler Hütte', distance: 5.2, ascent: 380, descent: 430, duration: 3.5, difficulty: Difficulty.moderate },
    { fromHut: 'Kasseler Hütte', toHut: 'Karl-von-Edel-Hütte', distance: 4.8, ascent: 320, descent: 260, duration: 3.0, difficulty: Difficulty.moderate },
    { fromHut: 'Karl-von-Edel-Hütte', toHut: 'Edelhütte', distance: 3.5, ascent: 210, descent: 210, duration: 2.0, difficulty: Difficulty.easy },
    { fromHut: 'Edelhütte', toHut: 'Gamshütte', distance: 5.0, ascent: 180, descent: 500, duration: 3.0, difficulty: Difficulty.easy },
    { fromHut: 'Berliner Hütte', toHut: 'Karl-von-Edel-Hütte', distance: 5.5, ascent: 450, descent: 250, duration: 4.0, difficulty: Difficulty.moderate },
    { fromHut: 'Olperer Hütte', toHut: 'Dominikushütte', distance: 4.0, ascent: 150, descent: 740, duration: 2.5, difficulty: Difficulty.easy },
    { fromHut: 'Olperer Hütte', toHut: 'Pfitscherjoch-Haus', distance: 5.5, ascent: 350, descent: 460, duration: 3.5, difficulty: Difficulty.moderate },
    { fromHut: 'Gamshütte', toHut: 'Berliner Hütte', distance: 6.2, ascent: 400, descent: 280, duration: 4.0, difficulty: Difficulty.moderate },
    { fromHut: 'Plauener Hütte', toHut: 'Berliner Hütte', distance: 4.8, ascent: 200, descent: 520, duration: 3.5, difficulty: Difficulty.moderate },
  ],
  'oetztal': [
    { fromHut: 'Vernagthütte', toHut: 'Hochjoch-Hospiz', distance: 4.5, ascent: 200, descent: 540, duration: 3.0, difficulty: Difficulty.moderate },
    { fromHut: 'Vernagthütte', toHut: 'Brandenburger Haus', distance: 3.8, ascent: 620, descent: 100, duration: 3.5, difficulty: Difficulty.difficult },
    { fromHut: 'Vernagthütte', toHut: 'Ramolhaus', distance: 3.5, ascent: 350, descent: 100, duration: 2.5, difficulty: Difficulty.moderate },
    { fromHut: 'Hochjoch-Hospiz', toHut: 'Martin-Busch-Hütte', distance: 5.2, ascent: 400, descent: 310, duration: 3.5, difficulty: Difficulty.moderate },
    { fromHut: 'Hochjoch-Hospiz', toHut: 'Langtalereck Hütte', distance: 4.0, ascent: 280, descent: 260, duration: 3.0, difficulty: Difficulty.easy },
    { fromHut: 'Martin-Busch-Hütte', toHut: 'Similaunhütte', distance: 4.8, ascent: 580, descent: 60, duration: 4.0, difficulty: Difficulty.moderate },
    { fromHut: 'Martin-Busch-Hütte', toHut: 'Schöne Aussicht', distance: 6.0, ascent: 550, descent: 210, duration: 4.5, difficulty: Difficulty.moderate },
    { fromHut: 'Schöne Aussicht', toHut: 'Bella Vista', distance: 2.5, ascent: 150, descent: 150, duration: 1.5, difficulty: Difficulty.easy },
    { fromHut: 'Schöne Aussicht', toHut: 'Similaunhütte', distance: 4.2, ascent: 350, descent: 180, duration: 3.0, difficulty: Difficulty.moderate },
    { fromHut: 'Langtalereck Hütte', toHut: 'Vernagthütte', distance: 3.5, ascent: 450, descent: 120, duration: 2.5, difficulty: Difficulty.moderate },
    { fromHut: 'Ramolhaus', toHut: 'Erlanger Hütte', distance: 4.0, ascent: 200, descent: 650, duration: 3.0, difficulty: Difficulty.moderate },
    { fromHut: 'Erlanger Hütte', toHut: 'Braunschweiger Hütte', distance: 5.5, ascent: 450, descent: 240, duration: 4.0, difficulty: Difficulty.moderate },
    { fromHut: 'Braunschweiger Hütte', toHut: 'Langtalereck Hütte', distance: 6.2, ascent: 200, descent: 530, duration: 4.0, difficulty: Difficulty.moderate },
  ],
  'dolomiten': [
    { fromHut: 'Schlernhaus', toHut: 'Tierser-Alpl-Hütte', distance: 3.5, ascent: 280, descent: 300, duration: 2.0, difficulty: Difficulty.moderate },
    { fromHut: 'Schlernhaus', toHut: 'Rif. Alpe di Tires', distance: 2.8, ascent: 180, descent: 200, duration: 1.5, difficulty: Difficulty.easy },
    { fromHut: 'Tierser-Alpl-Hütte', toHut: 'Grasleitenpasshütte', distance: 2.5, ascent: 320, descent: 160, duration: 2.0, difficulty: Difficulty.moderate },
    { fromHut: 'Grasleitenpasshütte', toHut: 'Rotwandhütte', distance: 3.0, ascent: 150, descent: 470, duration: 2.0, difficulty: Difficulty.moderate },
    { fromHut: 'Grasleitenpasshütte', toHut: 'Vajolet-Hütte', distance: 4.2, ascent: 200, descent: 560, duration: 3.0, difficulty: Difficulty.moderate },
    { fromHut: 'Vajolet-Hütte', toHut: 'Preuss-Hütte', distance: 0.5, ascent: 20, descent: 20, duration: 0.3, difficulty: Difficulty.easy },
    { fromHut: 'Vajolet-Hütte', toHut: 'Paolinahütte', distance: 3.8, ascent: 200, descent: 320, duration: 2.5, difficulty: Difficulty.moderate },
    { fromHut: 'Paolinahütte', toHut: 'Rif. Antermoia', distance: 5.0, ascent: 580, descent: 210, duration: 4.0, difficulty: Difficulty.moderate },
    { fromHut: 'Vajolet-Hütte', toHut: 'Rif. Passo Principe', distance: 3.5, ascent: 500, descent: 140, duration: 3.0, difficulty: Difficulty.moderate },
    { fromHut: 'Rif. Passo Principe', toHut: 'Rif. Antermoia', distance: 3.0, ascent: 200, descent: 300, duration: 2.5, difficulty: Difficulty.moderate },
    { fromHut: 'Rotwandhütte', toHut: 'Kölner Hütte', distance: 4.5, ascent: 300, descent: 240, duration: 3.0, difficulty: Difficulty.moderate },
    { fromHut: 'Paolinahütte', toHut: 'Kölner Hütte', distance: 3.2, ascent: 380, descent: 170, duration: 2.5, difficulty: Difficulty.moderate },
    { fromHut: 'Rif. Alpe di Tires', toHut: 'Tierser-Alpl-Hütte', distance: 3.0, ascent: 200, descent: 200, duration: 2.0, difficulty: Difficulty.easy },
  ],
  'berner-oberland': [
    { fromHut: 'Grindelwaldblick', toHut: 'Glecksteinhütte', distance: 3.0, ascent: 220, descent: 250, duration: 2.0, difficulty: Difficulty.moderate },
    { fromHut: 'Glecksteinhütte', toHut: 'Schreckhornhütte', distance: 4.5, ascent: 450, descent: 240, duration: 3.5, difficulty: Difficulty.moderate },
    { fromHut: 'Schreckhornhütte', toHut: 'Lauteraarenhütte', distance: 3.8, ascent: 200, descent: 340, duration: 2.5, difficulty: Difficulty.moderate },
    { fromHut: 'Lauteraarenhütte', toHut: 'Finsteraarhornhütte', distance: 5.0, ascent: 780, descent: 120, duration: 5.0, difficulty: Difficulty.difficult },
    { fromHut: 'Finsteraarhornhütte', toHut: 'Konkordiahütte', distance: 4.5, ascent: 200, descent: 400, duration: 3.5, difficulty: Difficulty.moderate },
    { fromHut: 'Konkordiahütte', toHut: 'Grindelwaldblick', distance: 6.0, ascent: 150, descent: 650, duration: 4.0, difficulty: Difficulty.moderate },
    { fromHut: 'Lauteraarenhütte', toHut: 'Oberaarjochhütte', distance: 6.5, ascent: 950, descent: 80, duration: 6.0, difficulty: Difficulty.difficult },
    { fromHut: 'Oberaarjochhütte', toHut: 'Bächlitalhütte', distance: 5.0, ascent: 100, descent: 1030, duration: 4.0, difficulty: Difficulty.moderate },
    { fromHut: 'Bächlitalhütte', toHut: 'Gaulihütte', distance: 3.5, ascent: 200, descent: 320, duration: 2.5, difficulty: Difficulty.easy },
    { fromHut: 'Gaulihütte', toHut: 'Dossenhütte', distance: 4.0, ascent: 550, descent: 90, duration: 3.5, difficulty: Difficulty.moderate },
    { fromHut: 'Dossenhütte', toHut: 'Glecksteinhütte', distance: 5.5, ascent: 200, descent: 550, duration: 4.0, difficulty: Difficulty.moderate },
    { fromHut: 'Finsteraarhornhütte', toHut: 'Oberaarjochhütte', distance: 4.2, ascent: 350, descent: 140, duration: 3.5, difficulty: Difficulty.difficult },
  ],
}

interface CalculatedRoute {
  fromHut: string
  toHut: string
  distance: number
  ascent: number
  descent: number
  duration: number
  difficulty: 'easy' | 'moderate' | 'difficult'
  source: 'brouter' | 'estimate'
}

interface RegionRoutes {
  regionSlug: string
  routes: CalculatedRoute[]
}

async function main() {
  // Try to load OSM data from file
  const osmDataPath = path.join(__dirname, '..', 'data', 'huts-osm.json')
  let osmRegions: OsmRegion[] | null = null

  if (fs.existsSync(osmDataPath)) {
    console.log(`Loading OSM data from ${osmDataPath}`)
    osmRegions = JSON.parse(fs.readFileSync(osmDataPath, 'utf-8'))
  } else {
    console.log('No OSM data found at data/huts-osm.json')
    console.log('Run "npx tsx scripts/fetch-osm-huts.ts" first to fetch data from OpenStreetMap.')
    console.log('Falling back to built-in hut list...\n')
  }

  // Try to load calculated routes
  const routesDataPath = path.join(__dirname, '..', 'data', 'routes.json')
  let calculatedRoutes: Record<string, CalculatedRoute[]> = {}

  if (fs.existsSync(routesDataPath)) {
    console.log(`Loading calculated routes from ${routesDataPath}`)
    const regionRoutes: RegionRoutes[] = JSON.parse(fs.readFileSync(routesDataPath, 'utf-8'))
    for (const rr of regionRoutes) {
      calculatedRoutes[rr.regionSlug] = rr.routes
    }
  } else {
    console.log('No calculated routes found. Using built-in route definitions.')
    console.log('Run "npx tsx scripts/calculate-routes.ts" for BRouter-verified routes.\n')
  }

  // Try to load booking configuration
  const bookingConfigPath = path.join(__dirname, '..', 'data', 'booking-config.json')
  const bookingByName: Record<string, { bookingSystem: string; bookingUrl: string }> = {}

  if (fs.existsSync(bookingConfigPath)) {
    console.log(`Loading booking config from ${bookingConfigPath}`)
    const config = JSON.parse(fs.readFileSync(bookingConfigPath, 'utf-8'))
    for (const entry of config.huts) {
      if (entry.verified && entry.bookingUrl) {
        bookingByName[entry.name] = {
          bookingSystem: entry.bookingSystem,
          bookingUrl: entry.bookingUrl,
        }
      }
    }
    console.log(`  ${Object.keys(bookingByName).length} verified booking URLs loaded`)
  }

  // Clear existing data
  await prisma.route.deleteMany()
  await prisma.roomTypeConfig.deleteMany()
  await prisma.hut.deleteMany()
  await prisma.region.deleteMany()

  const regions = osmRegions || FALLBACK_REGIONS
  const usingOsmData = osmRegions !== null

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

    const hutsByName: Record<string, string> = {}
    for (const h of region.huts) {
      const osmHut = h as OsmHut
      const hut = await prisma.hut.create({
        data: {
          name: h.name,
          altitude: h.altitude,
          lat: h.lat,
          lng: h.lng,
          capacity: h.capacity || 50,
          osmId: osmHut.osmId ?? undefined,
          operator: osmHut.operator ?? undefined,
          website: osmHut.website ?? undefined,
          phone: osmHut.phone ?? undefined,
          email: osmHut.email ?? undefined,
          openingHours: osmHut.openingHours ?? undefined,
          description: osmHut.description ?? undefined,
          dataSource: usingOsmData ? DataSource.osm : DataSource.mock,
          regionId: dbRegion.id,
          bookingSystem: bookingByName[h.name]?.bookingSystem === 'alpsonline' ? BookingSystem.alpsonline
            : bookingByName[h.name]?.bookingSystem === 'sac' ? BookingSystem.sac
            : BookingSystem.custom,
          bookingUrl: bookingByName[h.name]?.bookingUrl ?? undefined,
          amenities: [],
        },
      })
      hutsByName[h.name] = hut.id

      // Create default room type config
      const cap = h.capacity || 50
      await prisma.roomTypeConfig.createMany({
        data: [
          { hutId: hut.id, type: RoomType.double, count: Math.max(2, Math.floor(cap * 0.15)) },
          { hutId: hut.id, type: RoomType.shared_4, count: Math.max(2, Math.floor(cap * 0.2)) },
          { hutId: hut.id, type: RoomType.dorm, count: Math.max(4, Math.floor(cap * 0.5)) },
        ],
      })
    }

    // Create routes: prefer calculated routes (from BRouter), fall back to built-in
    const calcRoutes = calculatedRoutes[region.slug]
    const routeDefs: Array<{ fromHut: string; toHut: string; distance: number; ascent: number; descent: number; duration: number; difficulty: string }> =
      calcRoutes && calcRoutes.length > 0
        ? calcRoutes
        : (ROUTES_BY_REGION[region.slug] || [])

    const usingCalcRoutes = calcRoutes && calcRoutes.length > 0
    const routeLabel = usingCalcRoutes ? 'calculated' : 'built-in (mock)'
    let routeCount = 0
    for (const r of routeDefs) {
      const fromId = hutsByName[r.fromHut]
      const toId = hutsByName[r.toHut]
      if (!fromId || !toId) {
        console.log(`  ⚠ Route skipped: "${r.fromHut}" -> "${r.toHut}" (hut not found)`)
        continue
      }
      const diff = r.difficulty === 'difficult' ? Difficulty.difficult
        : r.difficulty === 'easy' ? Difficulty.easy
        : Difficulty.moderate

      // Determine data source for route
      const routeDataSource = usingCalcRoutes
        ? ((r as any).source === 'brouter' ? DataSource.brouter : DataSource.estimate)
        : DataSource.mock

      // Create both directions
      await prisma.route.create({
        data: {
          fromHutId: fromId, toHutId: toId,
          distance: r.distance, ascent: r.ascent, descent: r.descent,
          estimatedDuration: r.duration, difficulty: diff,
          dataSource: routeDataSource,
        },
      })
      await prisma.route.create({
        data: {
          fromHutId: toId, toHutId: fromId,
          distance: r.distance, ascent: r.descent, descent: r.ascent,
          estimatedDuration: r.duration, difficulty: diff,
          dataSource: routeDataSource,
        },
      })
      routeCount += 2
    }

    console.log(`  ✓ ${region.name}: ${region.huts.length} huts, ${routeCount} routes (${routeLabel})`)
  }

  const totalHuts = regions.reduce((s, r) => s + r.huts.length, 0)
  console.log(`\n🌱 Seeded ${regions.length} regions, ${totalHuts} huts`)
}

// Fallback data when OSM data hasn't been fetched yet
const FALLBACK_REGIONS: OsmRegion[] = [
  {
    name: 'Stubaier Alpen', slug: 'stubaier-alpen',
    bounds: { minLat: 46.95, minLng: 11.05, maxLat: 47.15, maxLng: 11.45 },
    center: { lat: 47.05, lng: 11.25 },
    huts: [
      { osmId: 0, name: 'Innsbrucker Hütte', altitude: 2369, lat: 47.0578, lng: 11.4103, capacity: 80, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Bremer Hütte', altitude: 2411, lat: 47.0403, lng: 11.4267, capacity: 60, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Nürnberger Hütte', altitude: 2280, lat: 47.0233, lng: 11.4456, capacity: 100, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Sulzenau Hütte', altitude: 2191, lat: 47.0311, lng: 11.3889, capacity: 90, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Dresdner Hütte', altitude: 2308, lat: 47.0067, lng: 11.3500, capacity: 120, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Neue Regensburger Hütte', altitude: 2286, lat: 47.0456, lng: 11.3667, capacity: 70, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Franz-Senn-Hütte', altitude: 2147, lat: 47.0833, lng: 11.3167, capacity: 150, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Starkenburger Hütte', altitude: 2237, lat: 47.0889, lng: 11.3000, capacity: 60, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Elferhütte', altitude: 2080, lat: 47.0944, lng: 11.3222, capacity: 40, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Mannheimer Hütte (Stubai)', altitude: 2007, lat: 47.0622, lng: 11.2833, capacity: 50, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Hildesheimer Hütte', altitude: 2899, lat: 46.9989, lng: 11.3833, capacity: 56, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Siegerlandhütte', altitude: 2710, lat: 46.9911, lng: 11.4000, capacity: 48, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Amberger Hütte', altitude: 2135, lat: 47.0144, lng: 11.2667, capacity: 72, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Westfalenhaus', altitude: 2273, lat: 47.0267, lng: 11.2500, capacity: 54, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Pforzheimer Hütte', altitude: 2308, lat: 47.0378, lng: 11.2833, capacity: 45, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
    ],
  },
  {
    name: 'Zillertaler Alpen', slug: 'zillertal',
    bounds: { minLat: 46.90, minLng: 11.65, maxLat: 47.20, maxLng: 12.10 },
    center: { lat: 47.05, lng: 11.87 },
    huts: [
      { osmId: 0, name: 'Olperer Hütte', altitude: 2389, lat: 47.0192, lng: 11.7008, capacity: 72, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Friesenberghaus', altitude: 2498, lat: 47.0139, lng: 11.7275, capacity: 60, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Furtschaglhaus', altitude: 2295, lat: 47.0025, lng: 11.7456, capacity: 66, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Berliner Hütte', altitude: 2042, lat: 47.0289, lng: 11.7875, capacity: 180, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Greizer Hütte', altitude: 2227, lat: 47.0117, lng: 11.8183, capacity: 86, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Kasseler Hütte', altitude: 2178, lat: 47.0211, lng: 11.8558, capacity: 70, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Edelhütte', altitude: 2238, lat: 47.0533, lng: 11.8300, capacity: 48, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Karl-von-Edel-Hütte', altitude: 2238, lat: 47.0400, lng: 11.8475, capacity: 90, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Plauener Hütte', altitude: 2364, lat: 47.0067, lng: 11.7533, capacity: 50, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Gamshütte', altitude: 1921, lat: 47.0739, lng: 11.8017, capacity: 55, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Dominikushütte', altitude: 1805, lat: 47.0400, lng: 11.7050, capacity: 40, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Pfitscherjoch-Haus', altitude: 2276, lat: 46.9950, lng: 11.6700, capacity: 65, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
    ],
  },
  {
    name: 'Ötztaler Alpen', slug: 'oetztal',
    bounds: { minLat: 46.70, minLng: 10.60, maxLat: 47.00, maxLng: 11.10 },
    center: { lat: 46.85, lng: 10.85 },
    huts: [
      { osmId: 0, name: 'Vernagthütte', altitude: 2755, lat: 46.8444, lng: 10.7667, capacity: 80, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Hochjoch-Hospiz', altitude: 2412, lat: 46.8278, lng: 10.7917, capacity: 70, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Brandenburger Haus', altitude: 3272, lat: 46.8347, lng: 10.7369, capacity: 50, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Martin-Busch-Hütte', altitude: 2501, lat: 46.8042, lng: 10.8600, capacity: 100, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Similaunhütte', altitude: 3019, lat: 46.7833, lng: 10.8667, capacity: 60, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Schöne Aussicht', altitude: 2842, lat: 46.7722, lng: 10.8100, capacity: 50, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Bella Vista', altitude: 2845, lat: 46.7650, lng: 10.8283, capacity: 45, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Langtalereck Hütte', altitude: 2430, lat: 46.8583, lng: 10.8250, capacity: 40, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Ramolhaus', altitude: 3006, lat: 46.8500, lng: 10.7925, capacity: 55, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Erlanger Hütte', altitude: 2550, lat: 46.8850, lng: 10.7783, capacity: 62, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Braunschweiger Hütte', altitude: 2759, lat: 46.9125, lng: 10.8467, capacity: 90, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
    ],
  },
  {
    name: 'Dolomiten', slug: 'dolomiten',
    bounds: { minLat: 46.25, minLng: 11.40, maxLat: 46.65, maxLng: 12.30 },
    center: { lat: 46.45, lng: 11.85 },
    huts: [
      { osmId: 0, name: 'Schlernhaus', altitude: 2457, lat: 46.5064, lng: 11.5653, capacity: 120, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Tierser-Alpl-Hütte', altitude: 2440, lat: 46.5000, lng: 11.5925, capacity: 55, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Grasleitenpasshütte', altitude: 2600, lat: 46.4875, lng: 11.6083, capacity: 42, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Rotwandhütte', altitude: 2280, lat: 46.4772, lng: 11.5783, capacity: 30, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Vajolet-Hütte', altitude: 2243, lat: 46.4650, lng: 11.6208, capacity: 75, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Preuss-Hütte', altitude: 2243, lat: 46.4636, lng: 11.6225, capacity: 35, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Paolinahütte', altitude: 2125, lat: 46.4522, lng: 11.6400, capacity: 50, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Rif. Antermoia', altitude: 2497, lat: 46.4417, lng: 11.6700, capacity: 58, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Rif. Passo Principe', altitude: 2601, lat: 46.4558, lng: 11.6567, capacity: 28, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Kölner Hütte', altitude: 2337, lat: 46.4386, lng: 11.5917, capacity: 100, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Rif. Alpe di Tires', altitude: 2440, lat: 46.4917, lng: 11.5583, capacity: 65, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
    ],
  },
  {
    name: 'Berner Oberland', slug: 'berner-oberland',
    bounds: { minLat: 46.35, minLng: 7.60, maxLat: 46.75, maxLng: 8.30 },
    center: { lat: 46.55, lng: 7.95 },
    huts: [
      { osmId: 0, name: 'Grindelwaldblick', altitude: 2346, lat: 46.5833, lng: 8.0500, capacity: 55, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Glecksteinhütte', altitude: 2317, lat: 46.6000, lng: 8.0667, capacity: 70, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Schreckhornhütte', altitude: 2529, lat: 46.5833, lng: 8.0833, capacity: 40, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Lauteraarenhütte', altitude: 2392, lat: 46.5750, lng: 8.1083, capacity: 45, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Dossenhütte', altitude: 2663, lat: 46.6500, lng: 8.1500, capacity: 48, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Gaulihütte', altitude: 2205, lat: 46.6333, lng: 8.1667, capacity: 52, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Bächlitalhütte', altitude: 2328, lat: 46.6167, lng: 8.2000, capacity: 60, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Oberaarjochhütte', altitude: 3256, lat: 46.5417, lng: 8.2333, capacity: 46, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Finsteraarhornhütte', altitude: 3048, lat: 46.5583, lng: 8.1333, capacity: 38, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
      { osmId: 0, name: 'Konkordiahütte', altitude: 2850, lat: 46.5500, lng: 8.0333, capacity: 110, operator: null, website: null, phone: null, email: null, openingHours: null, description: null },
    ],
  },
]

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
