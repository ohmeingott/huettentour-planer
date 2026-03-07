/**
 * Fetches alpine hut data from OpenStreetMap's Overpass API for all configured regions.
 * Outputs a JSON file (data/huts-osm.json) that can be used by the seed script.
 *
 * Usage: npx tsx scripts/fetch-osm-huts.ts
 */

import * as fs from 'fs'
import * as path from 'path'

interface OsmElement {
  type: string
  id: number
  lat: number
  lon: number
  tags?: Record<string, string>
}

interface OsmResponse {
  elements: OsmElement[]
}

export interface OsmHut {
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
  imageUrl: string | null
  wikidataId: string | null
}

export interface OsmRegion {
  name: string
  slug: string
  bounds: { minLat: number; minLng: number; maxLat: number; maxLng: number }
  center: { lat: number; lng: number }
  huts: OsmHut[]
}

const REGIONS = [
  {
    name: 'Stubaier Alpen',
    slug: 'stubaier-alpen',
    bounds: { minLat: 46.95, minLng: 11.05, maxLat: 47.15, maxLng: 11.45 },
  },
  {
    name: 'Zillertaler Alpen',
    slug: 'zillertal',
    bounds: { minLat: 46.90, minLng: 11.65, maxLat: 47.20, maxLng: 12.10 },
  },
  {
    name: 'Ötztaler Alpen',
    slug: 'oetztal',
    bounds: { minLat: 46.70, minLng: 10.60, maxLat: 47.00, maxLng: 11.10 },
  },
  {
    name: 'Dolomiten',
    slug: 'dolomiten',
    bounds: { minLat: 46.25, minLng: 11.40, maxLat: 46.65, maxLng: 12.30 },
  },
  {
    name: 'Berner Oberland',
    slug: 'berner-oberland',
    bounds: { minLat: 46.35, minLng: 7.60, maxLat: 46.75, maxLng: 8.30 },
  },
]

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter'

/**
 * Convert a Wikimedia Commons filename (or tag value) to a direct thumbnail URL.
 * Uses the MD5-based URL scheme: upload.wikimedia.org/wikipedia/commons/thumb/a/ab/File.jpg/400px-File.jpg
 */
function commonsFileToUrl(tag: string | null): string | null {
  if (!tag) return null

  // If it's already a full URL (e.g. from image= tag), return as-is
  if (tag.startsWith('http://') || tag.startsWith('https://')) return tag

  // Strip "File:" or "Category:" prefix if present
  let filename = tag.replace(/^(File:|Image:|Category:)/i, '').trim()
  if (!filename) return null

  // Replace spaces with underscores (Wikimedia convention)
  filename = filename.replace(/ /g, '_')

  // Compute MD5 hash for the directory structure
  const md5 = computeMd5(filename)
  const a = md5[0]
  const ab = md5.substring(0, 2)

  const encoded = encodeURIComponent(filename).replace(/%2F/g, '/').replace(/%3A/g, ':')
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${a}/${ab}/${encoded}/400px-${encoded}`
}

/**
 * Simple MD5 implementation for Wikimedia Commons URL generation.
 * Only used for computing the 2-char directory prefix.
 */
function computeMd5(input: string): string {
  const crypto = require('crypto')
  return crypto.createHash('md5').update(input).digest('hex')
}

function buildOverpassQuery(bounds: { minLat: number; minLng: number; maxLat: number; maxLng: number }): string {
  const bbox = `${bounds.minLat},${bounds.minLng},${bounds.maxLat},${bounds.maxLng}`
  return `[out:json][timeout:30];
(
  node["tourism"="alpine_hut"](${bbox});
  way["tourism"="alpine_hut"](${bbox});
  relation["tourism"="alpine_hut"](${bbox});
);
out center body;`
}

function parseHut(element: OsmElement): OsmHut | null {
  const tags = element.tags || {}
  const name = tags.name
  if (!name) return null

  // For ways/relations the lat/lon come from "center" attribute
  const lat = element.lat ?? (element as any).center?.lat
  const lon = element.lon ?? (element as any).center?.lon
  if (lat == null || lon == null) return null

  const ele = tags.ele ? parseInt(tags.ele, 10) : 0
  const capacity = tags.capacity ? parseInt(tags.capacity, 10) : null

  // Extract image URL from wikimedia_commons or image tag
  const imageUrl = commonsFileToUrl(tags.wikimedia_commons || tags.image || null)

  return {
    osmId: element.id,
    name,
    altitude: isNaN(ele) ? 0 : ele,
    lat: Math.round(lat * 10000) / 10000,
    lng: Math.round(lon * 10000) / 10000,
    capacity,
    operator: tags.operator || null,
    website: tags.website || tags['contact:website'] || null,
    phone: tags.phone || tags['contact:phone'] || null,
    email: tags.email || tags['contact:email'] || null,
    openingHours: tags.opening_hours || null,
    description: tags.description || tags['description:de'] || null,
    imageUrl,
    wikidataId: tags.wikidata || null,
  }
}

async function fetchRegion(region: typeof REGIONS[number]): Promise<OsmRegion> {
  const query = buildOverpassQuery(region.bounds)
  console.log(`Fetching ${region.name} ...`)

  const response = await fetch(OVERPASS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `data=${encodeURIComponent(query)}`,
  })

  if (!response.ok) {
    throw new Error(`Overpass API error for ${region.name}: ${response.status} ${response.statusText}`)
  }

  const data: OsmResponse = await response.json()
  const huts = data.elements
    .map(parseHut)
    .filter((h): h is OsmHut => h !== null)
    .sort((a, b) => a.name.localeCompare(b.name))

  const center = {
    lat: Math.round(((region.bounds.minLat + region.bounds.maxLat) / 2) * 100) / 100,
    lng: Math.round(((region.bounds.minLng + region.bounds.maxLng) / 2) * 100) / 100,
  }

  console.log(`  -> ${huts.length} huts found in ${region.name}`)
  return {
    name: region.name,
    slug: region.slug,
    bounds: region.bounds,
    center,
    huts,
  }
}

async function main() {
  console.log('Fetching alpine hut data from OpenStreetMap Overpass API...\n')

  const regions: OsmRegion[] = []
  for (const region of REGIONS) {
    const result = await fetchRegion(region)
    regions.push(result)
    // Be polite to the Overpass API — wait between requests
    await new Promise((r) => setTimeout(r, 2000))
  }

  // Resolve images from Wikidata for huts that have a wikidata ID but no image yet
  await resolveWikidataImages(regions)

  const outDir = path.join(__dirname, '..', 'data')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const outFile = path.join(outDir, 'huts-osm.json')
  fs.writeFileSync(outFile, JSON.stringify(regions, null, 2), 'utf-8')

  const totalHuts = regions.reduce((s, r) => s + r.huts.length, 0)
  console.log(`\nDone! ${totalHuts} huts across ${regions.length} regions`)
  console.log(`Output: ${outFile}`)

  // Print summary of data quality
  console.log('\nData quality summary:')
  for (const region of regions) {
    const withCapacity = region.huts.filter((h) => h.capacity !== null).length
    const withOperator = region.huts.filter((h) => h.operator !== null).length
    const withWebsite = region.huts.filter((h) => h.website !== null).length
    const withPhone = region.huts.filter((h) => h.phone !== null).length
    const withOpeningHours = region.huts.filter((h) => h.openingHours !== null).length
    const withImage = region.huts.filter((h) => h.imageUrl !== null).length
    console.log(
      `  ${region.name}: ${region.huts.length} huts | ` +
        `capacity: ${withCapacity} | operator: ${withOperator} | ` +
        `website: ${withWebsite} | phone: ${withPhone} | hours: ${withOpeningHours} | images: ${withImage}`
    )
  }
}

/**
 * For huts with a Wikidata ID but no imageUrl, query Wikidata SPARQL for P18 (image) property.
 * Processes in batches to avoid oversized queries.
 */
async function resolveWikidataImages(regions: OsmRegion[]): Promise<void> {
  const hutsNeedingImages: OsmHut[] = []
  for (const region of regions) {
    for (const hut of region.huts) {
      if (!hut.imageUrl && hut.wikidataId) {
        hutsNeedingImages.push(hut)
      }
    }
  }

  if (hutsNeedingImages.length === 0) {
    console.log('\nNo huts need Wikidata image lookup.')
    return
  }

  console.log(`\nResolving images from Wikidata for ${hutsNeedingImages.length} huts...`)

  // Process in batches of 50
  const batchSize = 50
  for (let i = 0; i < hutsNeedingImages.length; i += batchSize) {
    const batch = hutsNeedingImages.slice(i, i + batchSize)
    const qids = batch.map((h) => h.wikidataId!).join(' wd:')

    const sparql = `SELECT ?item ?image WHERE {
  VALUES ?item { wd:${qids} }
  ?item wdt:P18 ?image .
}`

    try {
      const resp = await fetch('https://query.wikidata.org/sparql', {
        headers: { Accept: 'application/sparql-results+json', 'User-Agent': 'HuettentourPlaner/1.0' },
        method: 'POST',
        body: new URLSearchParams({ query: sparql }),
      })

      if (!resp.ok) {
        console.log(`  Wikidata SPARQL error: ${resp.status}`)
        continue
      }

      const data = await resp.json()
      const imageByQid: Record<string, string> = {}
      for (const binding of data.results.bindings) {
        const qid = binding.item.value.split('/').pop()!
        const commonsUrl = binding.image.value
        // Convert commons file URL to thumbnail
        const filename = decodeURIComponent(commonsUrl.split('/').pop()!)
        imageByQid[qid] = commonsFileToUrl(filename) || commonsUrl
      }

      let resolved = 0
      for (const hut of batch) {
        const url = imageByQid[hut.wikidataId!]
        if (url) {
          hut.imageUrl = url
          resolved++
        }
      }
      console.log(`  Batch ${Math.floor(i / batchSize) + 1}: ${resolved}/${batch.length} images found`)
    } catch (err) {
      console.log(`  Wikidata batch error: ${err}`)
    }

    // Rate limit
    if (i + batchSize < hutsNeedingImages.length) {
      await new Promise((r) => setTimeout(r, 1000))
    }
  }

  const totalWithImages = regions.reduce(
    (s, r) => s + r.huts.filter((h) => h.imageUrl !== null).length, 0
  )
  const totalHuts = regions.reduce((s, r) => s + r.huts.length, 0)
  console.log(`  Total huts with images: ${totalWithImages}/${totalHuts}`)
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
