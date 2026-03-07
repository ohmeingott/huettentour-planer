/**
 * Fetches images for all huts from Wikipedia/Wikimedia Commons API.
 * No API key required - uses free public APIs.
 *
 * Usage: npx tsx scripts/fetch-hut-images.ts
 *   --dry-run      Only print results, don't update DB (default)
 *   --update-db    Update the database with found images
 *   --update-seed  Print seed data with imageUrl fields
 */

const WIKI_API = 'https://de.wikipedia.org/w/api.php'
const WIKI_EN_API = 'https://en.wikipedia.org/w/api.php'
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php'

// Mapping of hut names to their Wikipedia article titles where
// the name doesn't match directly
const WIKI_OVERRIDES: Record<string, string> = {
  'Mannheimer Hütte (Stubai)': 'Mannheimer Hütte',
  'Schöne Aussicht': 'Schutzhütte Schöne Aussicht',
  'Bella Vista': 'Schutzhütte Bella Vista (Schnalstal)',
  'Grindelwaldblick': 'Berghaus Grindelwaldblick',
  'Rif. Antermoia': 'Antermoiahütte',
  'Rif. Passo Principe': 'Grasleitenpasshütte',
  'Rif. Alpe di Tires': 'Tierser-Alpl-Hütte',
  'Karl-von-Edel-Hütte': 'Edelhütte',
  'Pfitscherjoch-Haus': 'Pfitscher-Joch-Haus',
  'Vajolet-Hütte': 'Rifugio Vajolet',
  'Preuss-Hütte': 'Rifugio Paul Preuss',
  'Paolinahütte': 'Paolina-Hütte',
  'Lauteraarenhütte': 'Lauteraarhütte',
}

interface ImageResult {
  hutName: string
  imageUrl: string | null
  source: string
  wikiTitle?: string
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`)
  return res.json()
}

/**
 * Try to get the main image from a Wikipedia article (German first, then English)
 */
async function getWikipediaImage(title: string): Promise<{ url: string; source: string } | null> {
  for (const [api, lang] of [[WIKI_API, 'de'], [WIKI_EN_API, 'en']] as const) {
    const params = new URLSearchParams({
      action: 'query',
      titles: title,
      prop: 'pageimages',
      piprop: 'original',
      format: 'json',
      origin: '*',
    })

    try {
      const data = await fetchJson(`${api}?${params}`)
      const pages = data.query?.pages
      if (!pages) continue

      for (const pageId of Object.keys(pages)) {
        if (pageId === '-1') continue
        const page = pages[pageId]
        if (page.original?.source) {
          return { url: page.original.source, source: `wikipedia-${lang}` }
        }
      }
    } catch {
      // continue to next source
    }
  }
  return null
}

/**
 * Search Wikimedia Commons for an image
 */
async function getCommonsImage(searchTerm: string): Promise<{ url: string; source: string } | null> {
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: `${searchTerm} Hütte Alpen`,
    gsrnamespace: '6', // File namespace
    gsrlimit: '5',
    prop: 'imageinfo',
    iiprop: 'url|mime',
    iiurlwidth: '1200',
    format: 'json',
    origin: '*',
  })

  try {
    const data = await fetchJson(`${COMMONS_API}?${params}`)
    const pages = data.query?.pages
    if (!pages) return null

    for (const pageId of Object.keys(pages)) {
      const page = pages[pageId]
      const info = page.imageinfo?.[0]
      if (info && (info.mime === 'image/jpeg' || info.mime === 'image/png')) {
        const url = info.thumburl || info.url
        return { url, source: 'commons' }
      }
    }
  } catch {
    // continue
  }
  return null
}

/**
 * Search Wikimedia Commons with just the name (no extra keywords)
 */
async function getCommonsImageExact(searchTerm: string): Promise<{ url: string; source: string } | null> {
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: searchTerm,
    gsrnamespace: '6',
    gsrlimit: '5',
    prop: 'imageinfo',
    iiprop: 'url|mime',
    iiurlwidth: '1200',
    format: 'json',
    origin: '*',
  })

  try {
    const data = await fetchJson(`${COMMONS_API}?${params}`)
    const pages = data.query?.pages
    if (!pages) return null

    for (const pageId of Object.keys(pages)) {
      const page = pages[pageId]
      const info = page.imageinfo?.[0]
      if (info && (info.mime === 'image/jpeg' || info.mime === 'image/png')) {
        const url = info.thumburl || info.url
        return { url, source: 'commons' }
      }
    }
  } catch {
    // continue
  }
  return null
}

/**
 * Try multiple search strategies for a hut
 */
async function findImageForHut(hutName: string): Promise<ImageResult> {
  const searchName = WIKI_OVERRIDES[hutName] || hutName

  // Strategy 1: Direct Wikipedia article lookup
  const wikiResult = await getWikipediaImage(searchName)
  if (wikiResult) {
    return { hutName, imageUrl: wikiResult.url, source: wikiResult.source, wikiTitle: searchName }
  }

  // Strategy 2: Try without parenthetical disambiguation
  const withoutParens = searchName.replace(/\s*\(.*\)/, '')
  if (withoutParens !== searchName) {
    const wikiResult2 = await getWikipediaImage(withoutParens)
    if (wikiResult2) {
      return { hutName, imageUrl: wikiResult2.url, source: wikiResult2.source, wikiTitle: withoutParens }
    }
  }

  // Strategy 3: Search Wikimedia Commons with "Hütte Alpen" suffix
  await sleep(200)
  const commonsResult = await getCommonsImage(searchName)
  if (commonsResult) {
    return { hutName, imageUrl: commonsResult.url, source: commonsResult.source }
  }

  // Strategy 4: Try simplified name on Commons
  const simplified = hutName.replace(/\s*\(.*\)/, '')
  if (simplified !== searchName) {
    await sleep(200)
    const commonsResult2 = await getCommonsImage(simplified)
    if (commonsResult2) {
      return { hutName, imageUrl: commonsResult2.url, source: commonsResult2.source }
    }
  }

  // Strategy 5: Search Commons with just the name (no suffix)
  await sleep(200)
  const commonsExact = await getCommonsImageExact(searchName)
  if (commonsExact) {
    return { hutName, imageUrl: commonsExact.url, source: commonsExact.source }
  }
  if (simplified !== searchName) {
    await sleep(200)
    const commonsExact2 = await getCommonsImageExact(simplified)
    if (commonsExact2) {
      return { hutName, imageUrl: commonsExact2.url, source: commonsExact2.source }
    }
  }

  return { hutName, imageUrl: null, source: 'not-found' }
}

const allHuts = [
  // Stubaier Alpen
  'Innsbrucker Hütte', 'Bremer Hütte', 'Nürnberger Hütte', 'Sulzenau Hütte',
  'Dresdner Hütte', 'Neue Regensburger Hütte', 'Franz-Senn-Hütte', 'Starkenburger Hütte',
  'Elferhütte', 'Mannheimer Hütte (Stubai)', 'Hildesheimer Hütte', 'Siegerlandhütte',
  'Amberger Hütte', 'Westfalenhaus', 'Pforzheimer Hütte',
  // Zillertaler Alpen
  'Olperer Hütte', 'Friesenberghaus', 'Furtschaglhaus', 'Berliner Hütte',
  'Greizer Hütte', 'Kasseler Hütte', 'Edelhütte', 'Karl-von-Edel-Hütte',
  'Plauener Hütte', 'Gamshütte', 'Dominikushütte', 'Pfitscherjoch-Haus',
  // Ötztaler Alpen
  'Vernagthütte', 'Hochjoch-Hospiz', 'Brandenburger Haus', 'Martin-Busch-Hütte',
  'Similaunhütte', 'Schöne Aussicht', 'Bella Vista', 'Langtalereck Hütte',
  'Ramolhaus', 'Erlanger Hütte', 'Braunschweiger Hütte',
  // Dolomiten
  'Schlernhaus', 'Tierser-Alpl-Hütte', 'Grasleitenpasshütte', 'Rotwandhütte',
  'Vajolet-Hütte', 'Preuss-Hütte', 'Paolinahütte', 'Rif. Antermoia',
  'Rif. Passo Principe', 'Kölner Hütte', 'Rif. Alpe di Tires',
  // Berner Oberland
  'Grindelwaldblick', 'Glecksteinhütte', 'Schreckhornhütte', 'Lauteraarenhütte',
  'Dossenhütte', 'Gaulihütte', 'Bächlitalhütte', 'Oberaarjochhütte',
  'Finsteraarhornhütte', 'Konkordiahütte',
]

async function main() {
  const args = process.argv.slice(2)
  const updateDb = args.includes('--update-db')
  const updateSeed = args.includes('--update-seed')

  console.log(`🏔️  Suche Bilder für ${allHuts.length} Hütten...\n`)

  const results: ImageResult[] = []
  let found = 0
  let notFound = 0

  for (const hutName of allHuts) {
    process.stdout.write(`  ${hutName}... `)
    const result = await findImageForHut(hutName)
    results.push(result)

    if (result.imageUrl) {
      found++
      console.log(`✅ ${result.source}`)
    } else {
      notFound++
      console.log(`❌ kein Bild gefunden`)
    }

    await sleep(200)
  }

  console.log(`\n📊 Ergebnis: ${found}/${allHuts.length} Bilder gefunden, ${notFound} fehlen noch\n`)

  // Print missing huts
  const missing = results.filter(r => !r.imageUrl)
  if (missing.length > 0) {
    console.log('❌ Hütten ohne Bild:')
    for (const r of missing) {
      console.log(`  - ${r.hutName}`)
    }
  }

  // Print seed update format
  if (updateSeed) {
    console.log('\n// Image URLs for seed.ts:')
    console.log('const hutImages: Record<string, string> = {')
    for (const r of results) {
      if (r.imageUrl) {
        console.log(`  '${r.hutName}': '${r.imageUrl}',`)
      }
    }
    console.log('}')
  }

  // Update database if requested
  if (updateDb) {
    console.log('\n💾 Aktualisiere Datenbank...')
    const { PrismaClient } = await import('../app/generated/prisma/client')
    const { PrismaPg } = await import('@prisma/adapter-pg')
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
    const prisma = new PrismaClient({ adapter })

    let updated = 0
    for (const r of results) {
      if (r.imageUrl) {
        const result = await prisma.hut.updateMany({
          where: { name: r.hutName },
          data: { imageUrl: r.imageUrl },
        })
        if (result.count > 0) updated++
      }
    }

    console.log(`  ✅ ${updated} Hütten aktualisiert`)
    await prisma.$disconnect()
  }

  // Write results to JSON
  const fs = await import('fs')
  const outputPath = 'scripts/hut-images.json'
  fs.writeFileSync(
    outputPath,
    JSON.stringify(
      results.map(r => ({ name: r.hutName, imageUrl: r.imageUrl, source: r.source })),
      null,
      2
    )
  )
  console.log(`\n💾 Ergebnisse gespeichert in ${outputPath}`)
}

main().catch(console.error)
