/**
 * Updates existing hut records in the database with image URLs from hut-images.json.
 * Run this after fetch-hut-images.ts has generated the JSON file.
 *
 * Usage: npx tsx scripts/update-hut-images.ts
 */

import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { readFileSync } from 'fs'
import { join } from 'path'
import { config } from 'dotenv'

config()

async function main() {
  const imagesPath = join(__dirname, 'hut-images.json')
  const images: { name: string; imageUrl: string | null; source: string }[] =
    JSON.parse(readFileSync(imagesPath, 'utf-8'))

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
  const prisma = new PrismaClient({ adapter })

  console.log('💾 Aktualisiere Hütten-Bilder in der Datenbank...\n')

  let updated = 0
  let skipped = 0

  for (const img of images) {
    if (!img.imageUrl) {
      console.log(`  ⏭️  ${img.name} — kein Bild`)
      skipped++
      continue
    }

    const result = await prisma.hut.updateMany({
      where: { name: img.name },
      data: { imageUrl: img.imageUrl },
    })

    if (result.count > 0) {
      console.log(`  ✅ ${img.name}`)
      updated++
    } else {
      console.log(`  ⚠️  ${img.name} — nicht in DB gefunden`)
    }
  }

  console.log(`\n📊 ${updated} Hütten aktualisiert, ${skipped} übersprungen`)
  await prisma.$disconnect()
}

main().catch(console.error)
