/**
 * Calculates hiking routes between alpine huts using:
 * 1. BRouter API (preferred) — real trail routing with hiking-mountain profile
 * 2. Haversine + elevation fallback — geometric estimate when API is unavailable
 *
 * Reads hut data from data/huts-osm.json (run fetch-osm-huts.ts first).
 * Outputs data/routes.json with verified connections.
 *
 * Usage: npx tsx scripts/calculate-routes.ts [--max-distance 15] [--dry-run]
 */

import * as fs from 'fs'
import * as path from 'path'

interface OsmHut {
  osmId: number
  name: string
  altitude: number
  lat: number
  lng: number
  capacity: number | null
}

interface OsmRegion {
  name: string
  slug: string
  bounds: { minLat: number; minLng: number; maxLat: number; maxLng: number }
  center: { lat: number; lng: number }
  huts: OsmHut[]
}

interface CalculatedRoute {
  fromHut: string
  toHut: string
  distance: number       // km
  ascent: number         // m
  descent: number        // m
  duration: number       // hours
  difficulty: 'easy' | 'moderate' | 'difficult'
  source: 'brouter' | 'estimate'
}

interface RegionRoutes {
  regionSlug: string
  regionName: string
  routes: CalculatedRoute[]
}

const BROUTER_URL = 'https://brouter.de/brouter'
const MAX_DISTANCE_KM = parseFloat(process.argv.find(a => a.startsWith('--max-distance='))?.split('=')[1] || '15')
const DRY_RUN = process.argv.includes('--dry-run')

// --- Haversine distance ---

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// --- Difficulty from steepness ---

function estimateDifficulty(ascent: number, descent: number, distance: number): 'easy' | 'moderate' | 'difficult' {
  const steepness = Math.max(ascent, descent) / (distance * 1000) // m per m
  if (steepness > 0.25 || ascent > 800) return 'difficult'
  if (steepness > 0.15 || ascent > 500) return 'moderate'
  return 'easy'
}

// --- Duration estimate (Swiss hiking time formula) ---
// Horizontal: 4.2 km/h, Ascent: 400 m/h, Descent: 600 m/h

function estimateDuration(distance: number, ascent: number, descent: number): number {
  const tHorizontal = distance / 4.2
  const tAscent = ascent / 400
  const tDescent = descent / 600
  // Use the larger of horizontal/vertical, add half the smaller
  const tUp = Math.max(tHorizontal, tAscent) + Math.min(tHorizontal, tAscent) * 0.5
  const tDown = Math.max(tHorizontal, tDescent) + Math.min(tHorizontal, tDescent) * 0.5
  // Weighted average favoring longer estimate
  return Math.round(Math.max(tUp, tDown) * 10) / 10
}

// --- BRouter API ---

interface BRouterResponse {
  features: Array<{
    properties: {
      'track-length': string   // meters
      'total-ascend': string   // meters
      'total-descend': string  // meters
      'total-time': string     // seconds
    }
  }>
}

async function fetchBRouterRoute(
  fromLat: number, fromLng: number,
  toLat: number, toLng: number
): Promise<{ distance: number; ascent: number; descent: number; duration: number } | null> {
  const lonlats = `${fromLng},${fromLat}|${toLng},${toLat}`
  const url = `${BROUTER_URL}?lonlats=${lonlats}&profile=hiking-mountain&alternativeidx=0&format=geojson`

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(15000) })
    if (!response.ok) return null

    const data: BRouterResponse = await response.json()
    if (!data.features?.length) return null

    const props = data.features[0].properties
    const distance = Math.round(parseFloat(props['track-length']) / 10) / 100  // m -> km, 2 decimals
    const ascent = Math.round(parseFloat(props['total-ascend']))
    const descent = Math.round(parseFloat(props['total-descend']))
    const duration = Math.round(parseFloat(props['total-time']) / 360) / 10  // s -> h, 1 decimal

    return { distance, ascent, descent, duration }
  } catch {
    return null
  }
}

// --- Fallback: geometric estimate ---

function estimateRoute(
  fromHut: OsmHut, toHut: OsmHut
): { distance: number; ascent: number; descent: number; duration: number } {
  const straightLine = haversineKm(fromHut.lat, fromHut.lng, toHut.lat, toHut.lng)
  // Mountain trails are typically 1.3-1.5x the straight-line distance
  const distance = Math.round(straightLine * 1.4 * 10) / 10

  const elevDiff = toHut.altitude - fromHut.altitude
  // Ascent/descent include undulation estimate (add ~20% of elevation range)
  const ascent = Math.max(0, elevDiff) + Math.round(Math.abs(elevDiff) * 0.2) + Math.round(distance * 30)
  const descent = Math.max(0, -elevDiff) + Math.round(Math.abs(elevDiff) * 0.2) + Math.round(distance * 30)

  const duration = estimateDuration(distance, ascent, descent)
  return { distance, ascent, descent, duration }
}

// --- Test BRouter availability ---

async function isBRouterAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${BROUTER_URL}?lonlats=11.41,47.06|11.43,47.04&profile=hiking-mountain&format=geojson`, {
      signal: AbortSignal.timeout(10000),
    })
    return response.ok
  } catch {
    return false
  }
}

// --- Main ---

async function main() {
  const dataPath = path.join(__dirname, '..', 'data', 'huts-osm.json')
  if (!fs.existsSync(dataPath)) {
    console.error('No hut data found. Run "npm run fetch-huts" first.')
    process.exit(1)
  }

  const regions: OsmRegion[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  console.log(`Loaded ${regions.length} regions from ${dataPath}\n`)

  // Check BRouter availability
  const useBRouter = await isBRouterAvailable()
  if (useBRouter) {
    console.log('BRouter API is available — using real trail routing\n')
  } else {
    console.log('BRouter API not available — using geometric estimates\n')
    console.log('For accurate routes, run this script with internet access to brouter.de\n')
  }

  const allRegionRoutes: RegionRoutes[] = []

  for (const region of regions) {
    console.log(`\n=== ${region.name} (${region.huts.length} huts) ===`)

    const routes: CalculatedRoute[] = []
    const pairs: Array<[OsmHut, OsmHut]> = []

    // Find all hut pairs within max distance
    for (let i = 0; i < region.huts.length; i++) {
      for (let j = i + 1; j < region.huts.length; j++) {
        const dist = haversineKm(
          region.huts[i].lat, region.huts[i].lng,
          region.huts[j].lat, region.huts[j].lng
        )
        if (dist <= MAX_DISTANCE_KM) {
          pairs.push([region.huts[i], region.huts[j]])
        }
      }
    }

    console.log(`  ${pairs.length} hut pairs within ${MAX_DISTANCE_KM} km straight-line distance`)

    if (DRY_RUN) {
      for (const [from, to] of pairs) {
        const dist = haversineKm(from.lat, from.lng, to.lat, to.lng)
        console.log(`  ${from.name} <-> ${to.name}: ${dist.toFixed(1)} km (straight line)`)
      }
      allRegionRoutes.push({ regionSlug: region.slug, regionName: region.name, routes: [] })
      continue
    }

    let brouterSuccessCount = 0
    let estimateCount = 0

    for (const [fromHut, toHut] of pairs) {
      let routeData: { distance: number; ascent: number; descent: number; duration: number }
      let source: 'brouter' | 'estimate'

      if (useBRouter) {
        const brouterResult = await fetchBRouterRoute(fromHut.lat, fromHut.lng, toHut.lat, toHut.lng)
        if (brouterResult) {
          routeData = brouterResult
          source = 'brouter'
          brouterSuccessCount++
        } else {
          // BRouter couldn't find a route — means no trail exists
          console.log(`  ✗ No trail: ${fromHut.name} <-> ${toHut.name}`)
          continue
        }
        // Be polite to BRouter API
        await new Promise(r => setTimeout(r, 500))
      } else {
        routeData = estimateRoute(fromHut, toHut)
        source = 'estimate'
        estimateCount++
      }

      // Skip unreasonably long routes (> 10h one way)
      if (routeData.duration > 10) {
        console.log(`  ⚠ Skipped (too long): ${fromHut.name} <-> ${toHut.name}: ${routeData.duration}h`)
        continue
      }

      const difficulty = estimateDifficulty(routeData.ascent, routeData.descent, routeData.distance)

      routes.push({
        fromHut: fromHut.name,
        toHut: toHut.name,
        distance: routeData.distance,
        ascent: routeData.ascent,
        descent: routeData.descent,
        duration: routeData.duration,
        difficulty,
        source,
      })

      console.log(
        `  ✓ ${fromHut.name} <-> ${toHut.name}: ` +
        `${routeData.distance} km, ↑${routeData.ascent}m ↓${routeData.descent}m, ` +
        `${routeData.duration}h (${source})`
      )
    }

    allRegionRoutes.push({ regionSlug: region.slug, regionName: region.name, routes })

    if (useBRouter) {
      console.log(`  -> ${brouterSuccessCount} routes via BRouter`)
    } else {
      console.log(`  -> ${estimateCount} estimated routes`)
    }
  }

  // Write output
  const outFile = path.join(__dirname, '..', 'data', 'routes.json')
  fs.writeFileSync(outFile, JSON.stringify(allRegionRoutes, null, 2), 'utf-8')

  const totalRoutes = allRegionRoutes.reduce((s, r) => s + r.routes.length, 0)
  console.log(`\nDone! ${totalRoutes} routes across ${allRegionRoutes.length} regions`)
  console.log(`Output: ${outFile}`)

  // Summary
  const brouterRoutes = allRegionRoutes.flatMap(r => r.routes).filter(r => r.source === 'brouter').length
  const estimateRoutes = allRegionRoutes.flatMap(r => r.routes).filter(r => r.source === 'estimate').length
  if (brouterRoutes > 0) console.log(`  BRouter-verified: ${brouterRoutes}`)
  if (estimateRoutes > 0) console.log(`  Estimated: ${estimateRoutes} (re-run with BRouter access for real data)`)
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
