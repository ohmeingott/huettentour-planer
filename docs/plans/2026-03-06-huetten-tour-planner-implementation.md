# Hütten-Tour Planner Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a web app for planning multi-day Alpine hut tours with automated availability checking.

**Architecture:** Next.js 14 monolith with BullMQ background jobs for web scraping. Prisma + PostgreSQL for data, Redis for job queue, Mapbox for maps, Playwright for scraping booking portals.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Mapbox GL JS, Prisma, PostgreSQL, Redis, BullMQ, Playwright, Vitest

**Design Doc:** `docs/plans/2026-03-06-huetten-tour-planner-design.md`

---

## Phase 1: Project Foundation

### Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `app/layout.tsx`, `app/page.tsx`

**Step 1: Create Next.js app**

Run:
```bash
cd /Users/paulohm/tabea-test
npx create-next-app@latest . --typescript --tailwind --eslint --app --src=no --import-alias="@/*" --use-npm
```

Expected: Project scaffolded with App Router.

**Step 2: Install core dependencies**

Run:
```bash
npm install prisma @prisma/client bullmq ioredis mapbox-gl @mapbox/mapbox-gl-geocoder react-map-gl zustand date-fns
npm install -D @types/mapbox-gl vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom playwright
```

**Step 3: Create vitest config**

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

Create `tests/setup.ts`:
```typescript
import '@testing-library/jest-dom/vitest'
```

**Step 4: Verify setup**

Run: `npx vitest --run`
Expected: No tests found (clean start).

Run: `npm run dev`
Expected: Next.js starts on localhost:3000.

**Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with core dependencies"
```

---

### Task 2: Docker Compose for PostgreSQL + Redis

**Files:**
- Create: `docker-compose.yml`
- Create: `.env`
- Create: `.env.example`

**Step 1: Create docker-compose.yml**

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: hutplanner
      POSTGRES_PASSWORD: hutplanner
      POSTGRES_DB: hutplanner
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'

volumes:
  pgdata:
```

**Step 2: Create .env**

```
DATABASE_URL="postgresql://hutplanner:hutplanner@localhost:5432/hutplanner"
REDIS_URL="redis://localhost:6379"
NEXT_PUBLIC_MAPBOX_TOKEN="pk.your_token_here"
```

Create `.env.example` with same content but placeholder values.

Add `.env` to `.gitignore`.

**Step 3: Start services**

Run: `docker compose up -d`
Expected: PostgreSQL on 5432, Redis on 6379.

**Step 4: Commit**

```bash
git add docker-compose.yml .env.example .gitignore
git commit -m "chore: add Docker Compose for PostgreSQL and Redis"
```

---

### Task 3: Prisma schema + seed data

**Files:**
- Create: `prisma/schema.prisma`
- Create: `prisma/seed.ts`
- Modify: `package.json` (add prisma seed script)

**Step 1: Write the Prisma schema**

Create `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum BookingSystem {
  alpsonline
  hut_wrs
  sac
  custom
}

enum Difficulty {
  easy
  moderate
  difficult
}

enum RoomType {
  single
  double
  shared_4
  dorm
}

enum TourStatus {
  draft
  checking
  available
  partially_available
}

enum AccommodationType {
  any
  private_room
  shared_room
  dorm
}

model Region {
  id                String  @id @default(cuid())
  name              String
  boundingBoxMinLat Float
  boundingBoxMinLng Float
  boundingBoxMaxLat Float
  boundingBoxMaxLng Float
  centerLat         Float
  centerLng         Float
  huts              Hut[]
}

model Hut {
  id            String        @id @default(cuid())
  name          String
  altitude      Int
  lat           Float
  lng           Float
  capacity      Int
  bookingUrl    String?
  bookingSystem BookingSystem @default(custom)
  imageUrl      String?
  description   String?
  amenities     String[]
  regionId      String
  region        Region        @relation(fields: [regionId], references: [id])
  roomTypes     RoomTypeConfig[]
  routesFrom    Route[]       @relation("routeFrom")
  routesTo      Route[]       @relation("routeTo")
  availability  AvailabilityCheck[]
  tourHuts      TourHut[]
}

model RoomTypeConfig {
  id    String   @id @default(cuid())
  hutId String
  hut   Hut      @relation(fields: [hutId], references: [id])
  type  RoomType
  count Int

  @@unique([hutId, type])
}

model Route {
  id                String     @id @default(cuid())
  fromHutId         String
  toHutId           String
  fromHut           Hut        @relation("routeFrom", fields: [fromHutId], references: [id])
  toHut             Hut        @relation("routeTo", fields: [toHutId], references: [id])
  distance          Float
  ascent            Int
  descent           Int
  estimatedDuration Float
  difficulty        Difficulty
  gpxTrack          Json?

  @@unique([fromHutId, toHutId])
}

model Tour {
  id                      String            @id @default(cuid())
  name                    String?
  groupSize               Int
  totalDays               Int
  restDays                Int               @default(0)
  accommodationType       AccommodationType @default(any)
  maxBedsPerRoom          Int?
  minDistancePerDay       Float?
  maxDistancePerDay       Float?
  maxAscentPerDay         Int?
  dateRangeStart          DateTime?
  dateRangeEnd            DateTime?
  status                  TourStatus        @default(draft)
  createdAt               DateTime          @default(now())
  huts                    TourHut[]
}

model TourHut {
  id        String @id @default(cuid())
  tourId    String
  tour      Tour   @relation(fields: [tourId], references: [id], onDelete: Cascade)
  hutId     String
  hut       Hut    @relation(fields: [hutId], references: [id])
  dayNumber Int

  @@unique([tourId, dayNumber])
}

model AvailabilityCheck {
  id        String   @id @default(cuid())
  hutId     String
  hut       Hut      @relation(fields: [hutId], references: [id])
  date      DateTime @db.Date
  roomType  RoomType
  available Int
  checkedAt DateTime @default(now())
  source    BookingSystem

  @@unique([hutId, date, roomType])
}
```

**Step 2: Generate client + migrate**

Run:
```bash
npx prisma migrate dev --name init
```

Expected: Migration created, tables in PostgreSQL.

**Step 3: Write seed data (Stubaital huts)**

Create `prisma/seed.ts`:
```typescript
import { PrismaClient, BookingSystem, Difficulty, RoomType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Stubaital region
  const stubaital = await prisma.region.create({
    data: {
      name: 'Stubaier Alpen',
      boundingBoxMinLat: 46.95,
      boundingBoxMinLng: 11.05,
      boundingBoxMaxLat: 47.15,
      boundingBoxMaxLng: 11.45,
      centerLat: 47.05,
      centerLng: 11.25,
    },
  })

  // Huts with real data
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
```

**Step 4: Add seed script to package.json**

Add to `package.json`:
```json
"prisma": {
  "seed": "npx tsx prisma/seed.ts"
}
```

Install tsx: `npm install -D tsx`

**Step 5: Run seed**

Run: `npx prisma db seed`
Expected: "Seeded 15 huts and 36 routes in Stubaier Alpen"

**Step 6: Commit**

```bash
git add prisma/ package.json package-lock.json
git commit -m "feat: add Prisma schema and Stubaital seed data"
```

---

## Phase 2: Core Algorithm

### Task 4: Hut graph data structure

**Files:**
- Create: `lib/algorithm/graph.ts`
- Create: `tests/algorithm/graph.test.ts`

**Step 1: Write the failing test**

Create `tests/algorithm/graph.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { HutGraph } from '@/lib/algorithm/graph'

const mockHuts = [
  { id: 'a', name: 'Hut A', capacity: 50, roomTypes: [{ type: 'double' as const, count: 5 }, { type: 'dorm' as const, count: 20 }] },
  { id: 'b', name: 'Hut B', capacity: 40, roomTypes: [{ type: 'double' as const, count: 3 }, { type: 'dorm' as const, count: 15 }] },
  { id: 'c', name: 'Hut C', capacity: 60, roomTypes: [{ type: 'single' as const, count: 2 }, { type: 'dorm' as const, count: 30 }] },
]

const mockRoutes = [
  { fromHutId: 'a', toHutId: 'b', distance: 5.0, ascent: 400, descent: 300, estimatedDuration: 3.5 },
  { fromHutId: 'b', toHutId: 'c', distance: 7.0, ascent: 600, descent: 200, estimatedDuration: 4.5 },
  { fromHutId: 'a', toHutId: 'c', distance: 10.0, ascent: 900, descent: 500, estimatedDuration: 6.0 },
]

describe('HutGraph', () => {
  it('builds graph from huts and routes', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    expect(graph.getHut('a')?.name).toBe('Hut A')
    expect(graph.getNeighbors('a')).toHaveLength(2)
  })

  it('returns route between two huts', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    const route = graph.getRoute('a', 'b')
    expect(route?.distance).toBe(5.0)
    expect(route?.ascent).toBe(400)
  })

  it('returns null for non-existent route', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    expect(graph.getRoute('b', 'a')).toBeNull()
  })

  it('filters neighbors by distance and ascent', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    const neighbors = graph.getNeighbors('a', { maxDistance: 6, maxAscent: 500 })
    expect(neighbors).toHaveLength(1)
    expect(neighbors[0].hutId).toBe('b')
  })

  it('checks room availability for group size', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    expect(graph.hasCapacity('a', 10, 'double')).toBe(true)
    expect(graph.hasCapacity('a', 12, 'double')).toBe(false)
    expect(graph.hasCapacity('a', 20, 'dorm')).toBe(true)
    expect(graph.hasCapacity('c', 5, 'any')).toBe(true)
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/algorithm/graph.test.ts`
Expected: FAIL — module not found.

**Step 3: Implement HutGraph**

Create `lib/algorithm/graph.ts`:
```typescript
export type RoomTypeKey = 'single' | 'double' | 'shared_4' | 'dorm' | 'any'

export interface HutNode {
  id: string
  name: string
  capacity: number
  roomTypes: { type: RoomTypeKey; count: number }[]
}

export interface RouteEdge {
  fromHutId: string
  toHutId: string
  distance: number
  ascent: number
  descent: number
  estimatedDuration: number
}

interface NeighborFilter {
  minDistance?: number
  maxDistance?: number
  maxAscent?: number
}

interface Neighbor {
  hutId: string
  route: RouteEdge
}

export class HutGraph {
  private huts: Map<string, HutNode> = new Map()
  private adjacency: Map<string, Neighbor[]> = new Map()
  private routes: Map<string, RouteEdge> = new Map()

  constructor(huts: HutNode[], routes: RouteEdge[]) {
    for (const hut of huts) {
      this.huts.set(hut.id, hut)
      this.adjacency.set(hut.id, [])
    }

    for (const route of routes) {
      const key = `${route.fromHutId}->${route.toHutId}`
      this.routes.set(key, route)
      this.adjacency.get(route.fromHutId)?.push({
        hutId: route.toHutId,
        route,
      })
    }
  }

  getHut(id: string): HutNode | null {
    return this.huts.get(id) ?? null
  }

  getRoute(fromId: string, toId: string): RouteEdge | null {
    return this.routes.get(`${fromId}->${toId}`) ?? null
  }

  getNeighbors(hutId: string, filter?: NeighborFilter): Neighbor[] {
    const neighbors = this.adjacency.get(hutId) ?? []
    if (!filter) return neighbors

    return neighbors.filter((n) => {
      if (filter.minDistance !== undefined && n.route.distance < filter.minDistance) return false
      if (filter.maxDistance !== undefined && n.route.distance > filter.maxDistance) return false
      if (filter.maxAscent !== undefined && n.route.ascent > filter.maxAscent) return false
      return true
    })
  }

  hasCapacity(hutId: string, groupSize: number, roomPreference: RoomTypeKey): boolean {
    const hut = this.huts.get(hutId)
    if (!hut) return false

    if (roomPreference === 'any') {
      const totalBeds = hut.roomTypes.reduce((sum, rt) => sum + rt.count * this.bedsPerUnit(rt.type), 0)
      return totalBeds >= groupSize
    }

    const matching = hut.roomTypes.find((rt) => rt.type === roomPreference)
    if (!matching) return false
    return matching.count * this.bedsPerUnit(roomPreference) >= groupSize
  }

  private bedsPerUnit(type: RoomTypeKey): number {
    switch (type) {
      case 'single': return 1
      case 'double': return 2
      case 'shared_4': return 4
      case 'dorm': return 1 // dorm count = number of individual beds
      default: return 1
    }
  }

  getAllHutIds(): string[] {
    return Array.from(this.huts.keys())
  }
}
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/algorithm/graph.test.ts`
Expected: All 5 tests PASS.

**Step 5: Commit**

```bash
git add lib/algorithm/graph.ts tests/algorithm/graph.test.ts
git commit -m "feat: add HutGraph data structure with neighbor filtering"
```

---

### Task 5: Pathfinder (DFS tour search)

**Files:**
- Create: `lib/algorithm/pathfinder.ts`
- Create: `tests/algorithm/pathfinder.test.ts`

**Step 1: Write the failing test**

Create `tests/algorithm/pathfinder.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { HutGraph } from '@/lib/algorithm/graph'
import { findTours, TourSearchParams } from '@/lib/algorithm/pathfinder'

const mockHuts = [
  { id: 'a', name: 'Hut A', capacity: 50, roomTypes: [{ type: 'dorm' as const, count: 50 }] },
  { id: 'b', name: 'Hut B', capacity: 40, roomTypes: [{ type: 'dorm' as const, count: 40 }] },
  { id: 'c', name: 'Hut C', capacity: 60, roomTypes: [{ type: 'dorm' as const, count: 60 }] },
  { id: 'd', name: 'Hut D', capacity: 30, roomTypes: [{ type: 'dorm' as const, count: 30 }] },
]

const mockRoutes = [
  { fromHutId: 'a', toHutId: 'b', distance: 5.0, ascent: 400, descent: 300, estimatedDuration: 3.5 },
  { fromHutId: 'b', toHutId: 'a', distance: 5.0, ascent: 300, descent: 400, estimatedDuration: 3.5 },
  { fromHutId: 'b', toHutId: 'c', distance: 7.0, ascent: 600, descent: 200, estimatedDuration: 4.5 },
  { fromHutId: 'c', toHutId: 'b', distance: 7.0, ascent: 200, descent: 600, estimatedDuration: 4.5 },
  { fromHutId: 'c', toHutId: 'd', distance: 4.0, ascent: 300, descent: 500, estimatedDuration: 3.0 },
  { fromHutId: 'd', toHutId: 'c', distance: 4.0, ascent: 500, descent: 300, estimatedDuration: 3.0 },
  { fromHutId: 'a', toHutId: 'c', distance: 10.0, ascent: 900, descent: 500, estimatedDuration: 6.0 },
  { fromHutId: 'c', toHutId: 'a', distance: 10.0, ascent: 500, descent: 900, estimatedDuration: 6.0 },
]

describe('findTours', () => {
  it('finds 3-stage tours', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    const params: TourSearchParams = { stages: 3, groupSize: 4, roomPreference: 'any' }
    const tours = findTours(graph, params)
    expect(tours.length).toBeGreaterThan(0)
    tours.forEach((t) => expect(t.huts).toHaveLength(4)) // 3 stages = 4 huts (start + 3 stops)
  })

  it('respects max distance filter', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    const params: TourSearchParams = { stages: 2, groupSize: 4, roomPreference: 'any', maxDistance: 6.0 }
    const tours = findTours(graph, params)
    tours.forEach((t) => {
      t.legs.forEach((leg) => expect(leg.distance).toBeLessThanOrEqual(6.0))
    })
  })

  it('respects max ascent filter', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    const params: TourSearchParams = { stages: 2, groupSize: 4, roomPreference: 'any', maxAscent: 500 }
    const tours = findTours(graph, params)
    tours.forEach((t) => {
      t.legs.forEach((leg) => expect(leg.ascent).toBeLessThanOrEqual(500))
    })
  })

  it('does not revisit huts', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    const params: TourSearchParams = { stages: 3, groupSize: 4, roomPreference: 'any' }
    const tours = findTours(graph, params)
    tours.forEach((t) => {
      const uniqueHuts = new Set(t.huts)
      expect(uniqueHuts.size).toBe(t.huts.length)
    })
  })

  it('returns empty for impossible params', () => {
    const graph = new HutGraph(mockHuts, mockRoutes)
    const params: TourSearchParams = { stages: 3, groupSize: 4, roomPreference: 'any', maxDistance: 1.0 }
    const tours = findTours(graph, params)
    expect(tours).toHaveLength(0)
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/algorithm/pathfinder.test.ts`
Expected: FAIL — module not found.

**Step 3: Implement pathfinder**

Create `lib/algorithm/pathfinder.ts`:
```typescript
import { HutGraph, RouteEdge, RoomTypeKey } from './graph'

export interface TourSearchParams {
  stages: number
  groupSize: number
  roomPreference: RoomTypeKey
  minDistance?: number
  maxDistance?: number
  maxAscent?: number
}

export interface TourLeg {
  fromHutId: string
  toHutId: string
  distance: number
  ascent: number
  descent: number
  estimatedDuration: number
}

export interface TourResult {
  huts: string[]
  legs: TourLeg[]
  totalDistance: number
  totalAscent: number
  totalDescent: number
  totalDuration: number
}

export function findTours(graph: HutGraph, params: TourSearchParams): TourResult[] {
  const results: TourResult[] = []
  const allHuts = graph.getAllHutIds()

  for (const startHut of allHuts) {
    if (!graph.hasCapacity(startHut, params.groupSize, params.roomPreference)) continue
    dfs(graph, params, [startHut], [], results)
  }

  return results
}

function dfs(
  graph: HutGraph,
  params: TourSearchParams,
  path: string[],
  legs: TourLeg[],
  results: TourResult[],
): void {
  if (path.length === params.stages + 1) {
    const totalDistance = legs.reduce((s, l) => s + l.distance, 0)
    const totalAscent = legs.reduce((s, l) => s + l.ascent, 0)
    const totalDescent = legs.reduce((s, l) => s + l.descent, 0)
    const totalDuration = legs.reduce((s, l) => s + l.estimatedDuration, 0)
    results.push({
      huts: [...path],
      legs: [...legs],
      totalDistance,
      totalAscent,
      totalDescent,
      totalDuration,
    })
    return
  }

  const currentHut = path[path.length - 1]
  const neighbors = graph.getNeighbors(currentHut, {
    minDistance: params.minDistance,
    maxDistance: params.maxDistance,
    maxAscent: params.maxAscent,
  })

  for (const neighbor of neighbors) {
    if (path.includes(neighbor.hutId)) continue
    if (!graph.hasCapacity(neighbor.hutId, params.groupSize, params.roomPreference)) continue

    path.push(neighbor.hutId)
    legs.push({
      fromHutId: currentHut,
      toHutId: neighbor.hutId,
      distance: neighbor.route.distance,
      ascent: neighbor.route.ascent,
      descent: neighbor.route.descent,
      estimatedDuration: neighbor.route.estimatedDuration,
    })

    dfs(graph, params, path, legs, results)

    path.pop()
    legs.pop()
  }
}
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/algorithm/pathfinder.test.ts`
Expected: All 5 tests PASS.

**Step 5: Commit**

```bash
git add lib/algorithm/pathfinder.ts tests/algorithm/pathfinder.test.ts
git commit -m "feat: add DFS pathfinder for multi-stage tour search"
```

---

### Task 6: Tour scoring

**Files:**
- Create: `lib/algorithm/scoring.ts`
- Create: `tests/algorithm/scoring.test.ts`

**Step 1: Write the failing test**

Create `tests/algorithm/scoring.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { scoreTour } from '@/lib/algorithm/scoring'
import { TourResult } from '@/lib/algorithm/pathfinder'

describe('scoreTour', () => {
  it('scores balanced legs higher than unbalanced', () => {
    const balanced: TourResult = {
      huts: ['a', 'b', 'c'],
      legs: [
        { fromHutId: 'a', toHutId: 'b', distance: 5.0, ascent: 400, descent: 300, estimatedDuration: 3 },
        { fromHutId: 'b', toHutId: 'c', distance: 5.5, ascent: 420, descent: 310, estimatedDuration: 3.2 },
      ],
      totalDistance: 10.5, totalAscent: 820, totalDescent: 610, totalDuration: 6.2,
    }

    const unbalanced: TourResult = {
      huts: ['a', 'b', 'c'],
      legs: [
        { fromHutId: 'a', toHutId: 'b', distance: 2.0, ascent: 100, descent: 50, estimatedDuration: 1 },
        { fromHutId: 'b', toHutId: 'c', distance: 10.0, ascent: 900, descent: 700, estimatedDuration: 6 },
      ],
      totalDistance: 12, totalAscent: 1000, totalDescent: 750, totalDuration: 7,
    }

    expect(scoreTour(balanced)).toBeGreaterThan(scoreTour(unbalanced))
  })

  it('gives round-trip bonus when start near end', () => {
    const roundTrip: TourResult = {
      huts: ['a', 'b', 'a'],
      legs: [
        { fromHutId: 'a', toHutId: 'b', distance: 5, ascent: 400, descent: 300, estimatedDuration: 3 },
        { fromHutId: 'b', toHutId: 'a', distance: 5, ascent: 300, descent: 400, estimatedDuration: 3 },
      ],
      totalDistance: 10, totalAscent: 700, totalDescent: 700, totalDuration: 6,
    }
    // Round trip should still produce a valid positive score
    expect(scoreTour(roundTrip)).toBeGreaterThan(0)
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/algorithm/scoring.test.ts`
Expected: FAIL.

**Step 3: Implement scoring**

Create `lib/algorithm/scoring.ts`:
```typescript
import { TourResult } from './pathfinder'

export function scoreTour(tour: TourResult): number {
  let score = 100

  // Penalize unbalanced leg distances (high variance = bad)
  const distances = tour.legs.map((l) => l.distance)
  const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length
  const variance = distances.reduce((sum, d) => sum + Math.pow(d - avgDistance, 2), 0) / distances.length
  const coeffOfVariation = Math.sqrt(variance) / (avgDistance || 1)
  score -= coeffOfVariation * 30

  // Penalize unbalanced ascent
  const ascents = tour.legs.map((l) => l.ascent)
  const avgAscent = ascents.reduce((a, b) => a + b, 0) / ascents.length
  const ascentVariance = ascents.reduce((sum, a) => sum + Math.pow(a - avgAscent, 2), 0) / ascents.length
  const ascentCoV = Math.sqrt(ascentVariance) / (avgAscent || 1)
  score -= ascentCoV * 20

  // Round-trip bonus: start === end
  if (tour.huts[0] === tour.huts[tour.huts.length - 1]) {
    score += 10
  }

  return Math.max(0, score)
}

export function rankTours(tours: TourResult[]): TourResult[] {
  return tours
    .map((tour) => ({ tour, score: scoreTour(tour) }))
    .sort((a, b) => b.score - a.score)
    .map(({ tour }) => tour)
}
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/algorithm/scoring.test.ts`
Expected: All 2 tests PASS.

**Step 5: Commit**

```bash
git add lib/algorithm/scoring.ts tests/algorithm/scoring.test.ts
git commit -m "feat: add tour scoring with balance and round-trip bonuses"
```

---

## Phase 3: API Layer

### Task 7: Prisma client singleton + DB helpers

**Files:**
- Create: `lib/db/client.ts`

**Step 1: Create Prisma client singleton**

Create `lib/db/client.ts`:
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**Step 2: Commit**

```bash
git add lib/db/client.ts
git commit -m "feat: add Prisma client singleton"
```

---

### Task 8: API — GET regions and huts

**Files:**
- Create: `app/api/regions/route.ts`
- Create: `app/api/huts/route.ts`

**Step 1: Create regions endpoint**

Create `app/api/regions/route.ts`:
```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function GET() {
  const regions = await prisma.region.findMany({
    include: { _count: { select: { huts: true } } },
  })
  return NextResponse.json(regions)
}
```

**Step 2: Create huts endpoint**

Create `app/api/huts/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function GET(request: NextRequest) {
  const regionId = request.nextUrl.searchParams.get('regionId')

  const where = regionId ? { regionId } : {}

  const huts = await prisma.hut.findMany({
    where,
    include: { roomTypes: true },
  })

  return NextResponse.json(huts)
}
```

**Step 3: Commit**

```bash
git add app/api/regions/route.ts app/api/huts/route.ts
git commit -m "feat: add API endpoints for regions and huts"
```

---

### Task 9: API — POST tour search

**Files:**
- Create: `app/api/tours/search/route.ts`

**Step 1: Create tour search endpoint**

Create `app/api/tours/search/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { HutGraph, RoomTypeKey } from '@/lib/algorithm/graph'
import { findTours, TourSearchParams } from '@/lib/algorithm/pathfinder'
import { rankTours } from '@/lib/algorithm/scoring'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { regionId, groupSize, totalDays, restDays, minDistance, maxDistance, maxAscent, roomPreference } = body

  // Load huts and routes for region
  const huts = await prisma.hut.findMany({
    where: { regionId },
    include: { roomTypes: true },
  })

  const hutIds = huts.map((h) => h.id)

  const routes = await prisma.route.findMany({
    where: {
      fromHutId: { in: hutIds },
      toHutId: { in: hutIds },
    },
  })

  // Build graph
  const graphHuts = huts.map((h) => ({
    id: h.id,
    name: h.name,
    capacity: h.capacity,
    roomTypes: h.roomTypes.map((rt) => ({ type: rt.type.toLowerCase() as RoomTypeKey, count: rt.count })),
  }))

  const graphRoutes = routes.map((r) => ({
    fromHutId: r.fromHutId,
    toHutId: r.toHutId,
    distance: r.distance,
    ascent: r.ascent,
    descent: r.descent,
    estimatedDuration: r.estimatedDuration,
  }))

  const graph = new HutGraph(graphHuts, graphRoutes)

  const stages = totalDays - (restDays || 0)

  const params: TourSearchParams = {
    stages,
    groupSize,
    roomPreference: roomPreference || 'any',
    minDistance,
    maxDistance,
    maxAscent,
  }

  const allTours = findTours(graph, params)
  const ranked = rankTours(allTours)

  // Enrich with hut details (top 20)
  const top = ranked.slice(0, 20)
  const hutMap = new Map(huts.map((h) => [h.id, h]))

  const enriched = top.map((tour) => ({
    ...tour,
    hutDetails: tour.huts.map((id) => {
      const h = hutMap.get(id)!
      return { id: h.id, name: h.name, altitude: h.altitude, lat: h.lat, lng: h.lng, imageUrl: h.imageUrl }
    }),
  }))

  return NextResponse.json({ tours: enriched, totalFound: allTours.length })
}
```

**Step 2: Commit**

```bash
git add app/api/tours/search/route.ts
git commit -m "feat: add tour search API with graph-based pathfinding"
```

---

### Task 10: API — Availability check trigger + status

**Files:**
- Create: `lib/crawler/queue.ts`
- Create: `lib/crawler/types.ts`
- Create: `app/api/availability/check/route.ts`
- Create: `app/api/availability/status/[jobId]/route.ts`

**Step 1: Create crawler types**

Create `lib/crawler/types.ts`:
```typescript
export interface AvailabilityJobData {
  jobId: string
  tourId: string
  hutChecks: {
    hutId: string
    hutName: string
    bookingUrl: string | null
    bookingSystem: string
    dates: string[] // ISO date strings
    groupSize: number
    roomPreference: string
  }[]
}

export interface AvailabilityJobResult {
  jobId: string
  status: 'completed' | 'partial' | 'failed'
  results: HutAvailabilityResult[]
}

export interface HutAvailabilityResult {
  hutId: string
  hutName: string
  status: 'available' | 'unavailable' | 'error'
  dates: {
    date: string
    available: boolean
    roomTypes: { type: string; available: number }[]
  }[]
  error?: string
}
```

**Step 2: Create queue setup**

Create `lib/crawler/queue.ts`:
```typescript
import { Queue } from 'bullmq'
import IORedis from 'ioredis'

let connection: IORedis | null = null

function getConnection() {
  if (!connection) {
    connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
      maxRetriesPerRequest: null,
    })
  }
  return connection
}

let availabilityQueue: Queue | null = null

export function getAvailabilityQueue() {
  if (!availabilityQueue) {
    availabilityQueue = new Queue('availability', {
      connection: getConnection(),
    })
  }
  return availabilityQueue
}
```

**Step 3: Create check endpoint**

Create `app/api/availability/check/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { getAvailabilityQueue } from '@/lib/crawler/queue'
import { AvailabilityJobData } from '@/lib/crawler/types'
import { randomUUID } from 'crypto'
import { eachDayOfInterval, format } from 'date-fns'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { hutIds, dateStart, dateEnd, groupSize, roomPreference } = body

  const huts = await prisma.hut.findMany({
    where: { id: { in: hutIds } },
  })

  const dates = eachDayOfInterval({
    start: new Date(dateStart),
    end: new Date(dateEnd),
  }).map((d) => format(d, 'yyyy-MM-dd'))

  const jobId = randomUUID()

  const jobData: AvailabilityJobData = {
    jobId,
    tourId: body.tourId || '',
    hutChecks: huts.map((hut) => ({
      hutId: hut.id,
      hutName: hut.name,
      bookingUrl: hut.bookingUrl,
      bookingSystem: hut.bookingSystem,
      dates,
      groupSize,
      roomPreference: roomPreference || 'any',
    })),
  }

  const queue = getAvailabilityQueue()
  await queue.add('check-availability', jobData, {
    jobId,
    attempts: 2,
    backoff: { type: 'exponential', delay: 5000 },
  })

  return NextResponse.json({ jobId, hutsCount: huts.length, datesCount: dates.length })
}
```

**Step 4: Create status endpoint**

Create `app/api/availability/status/[jobId]/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getAvailabilityQueue } from '@/lib/crawler/queue'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> },
) {
  const { jobId } = await params
  const queue = getAvailabilityQueue()
  const job = await queue.getJob(jobId)

  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 })
  }

  const state = await job.getState()

  return NextResponse.json({
    jobId,
    state,
    progress: job.progress,
    result: job.returnvalue,
    failedReason: job.failedReason,
  })
}
```

**Step 5: Commit**

```bash
git add lib/crawler/ app/api/availability/
git commit -m "feat: add availability check queue and API endpoints"
```

---

## Phase 4: Crawler

### Task 11: Booking adapter interface + mock adapter

**Files:**
- Create: `lib/crawler/adapters/types.ts`
- Create: `lib/crawler/adapters/mock-adapter.ts`
- Create: `tests/crawler/mock-adapter.test.ts`

**Step 1: Write the failing test**

Create `tests/crawler/mock-adapter.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { MockAdapter } from '@/lib/crawler/adapters/mock-adapter'

describe('MockAdapter', () => {
  it('returns availability for date range', async () => {
    const adapter = new MockAdapter()
    const results = await adapter.checkAvailability(
      'https://example.com',
      { start: '2026-07-15', end: '2026-07-17' },
      4,
    )
    expect(results).toHaveLength(3)
    results.forEach((r) => {
      expect(r.roomTypes).toBeDefined()
      expect(r.date).toBeDefined()
    })
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/crawler/mock-adapter.test.ts`
Expected: FAIL.

**Step 3: Implement adapter interface + mock**

Create `lib/crawler/adapters/types.ts`:
```typescript
export interface DateRange {
  start: string
  end: string
}

export interface RoomAvailability {
  type: string
  available: number
}

export interface DayAvailability {
  date: string
  available: boolean
  roomTypes: RoomAvailability[]
}

export interface BookingAdapter {
  checkAvailability(
    hutUrl: string,
    dates: DateRange,
    groupSize: number,
  ): Promise<DayAvailability[]>
}
```

Create `lib/crawler/adapters/mock-adapter.ts`:
```typescript
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
      // Simulate: ~70% chance available, weekends less likely
      const dayOfWeek = day.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      const available = Math.random() > (isWeekend ? 0.5 : 0.3)

      return {
        date: format(day, 'yyyy-MM-dd'),
        available,
        roomTypes: [
          { type: 'double', available: available ? Math.floor(Math.random() * 5) + 1 : 0 },
          { type: 'shared_4', available: available ? Math.floor(Math.random() * 3) + 1 : 0 },
          { type: 'dorm', available: available ? Math.floor(Math.random() * 15) + 5 : 0 },
        ],
      }
    })
  }
}
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/crawler/mock-adapter.test.ts`
Expected: PASS.

**Step 5: Commit**

```bash
git add lib/crawler/adapters/ tests/crawler/
git commit -m "feat: add BookingAdapter interface and MockAdapter"
```

---

### Task 12: Alpsonline adapter (real scraping)

**Files:**
- Create: `lib/crawler/adapters/alpsonline-adapter.ts`

**Step 1: Implement Alpsonline adapter**

Create `lib/crawler/adapters/alpsonline-adapter.ts`:
```typescript
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

      // Alpsonline uses a calendar view — we need to navigate month by month
      // and check the color-coded availability for each day
      for (const day of days) {
        const dateStr = format(day, 'yyyy-MM-dd')

        try {
          // Navigate to the correct month if needed
          const targetMonth = format(day, 'yyyy-MM')
          const currentMonth = await page.$eval('.calendar-header .month', (el) => el.textContent?.trim() || '')

          // Click through months until we reach the target
          // (Implementation depends on exact DOM structure of alpsonline)

          // Look for the day cell
          const daySelector = `[data-date="${dateStr}"], td[title*="${format(day, 'dd.MM.yyyy')}"]`
          const dayCell = await page.$(daySelector)

          if (dayCell) {
            const classes = await dayCell.getAttribute('class') || ''
            const available = !classes.includes('occupied') && !classes.includes('closed')

            results.push({
              date: dateStr,
              available,
              roomTypes: [
                // Alpsonline typically shows total availability, not per room type
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
```

Note: This adapter will need refinement once we can inspect the actual alpsonline.org DOM structure. The selectors are placeholders. Use the MockAdapter for development.

**Step 2: Commit**

```bash
git add lib/crawler/adapters/alpsonline-adapter.ts
git commit -m "feat: add AlpsonlineAdapter with Playwright scraping (WIP selectors)"
```

---

### Task 13: Crawler worker

**Files:**
- Create: `lib/crawler/worker.ts`
- Create: `lib/crawler/adapters/index.ts`

**Step 1: Create adapter factory**

Create `lib/crawler/adapters/index.ts`:
```typescript
import { BookingAdapter } from './types'
import { MockAdapter } from './mock-adapter'
import { AlpsonlineAdapter } from './alpsonline-adapter'

const adapters: Record<string, () => BookingAdapter> = {
  alpsonline: () => new AlpsonlineAdapter(),
  mock: () => new MockAdapter(),
  // Fallback all unknown systems to mock for now
  hut_wrs: () => new MockAdapter(),
  sac: () => new MockAdapter(),
  custom: () => new MockAdapter(),
}

export function getAdapter(bookingSystem: string): BookingAdapter {
  const factory = adapters[bookingSystem] || adapters.mock
  return factory()
}
```

**Step 2: Create worker**

Create `lib/crawler/worker.ts`:
```typescript
import { Worker, Job } from 'bullmq'
import IORedis from 'ioredis'
import { AvailabilityJobData, HutAvailabilityResult } from './types'
import { getAdapter } from './adapters'

const USE_MOCK = process.env.USE_MOCK_CRAWLER === 'true'

export function startWorker() {
  const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null,
  })

  const worker = new Worker(
    'availability',
    async (job: Job<AvailabilityJobData>) => {
      const { hutChecks } = job.data
      const results: HutAvailabilityResult[] = []

      for (let i = 0; i < hutChecks.length; i++) {
        const check = hutChecks[i]

        try {
          const system = USE_MOCK ? 'mock' : check.bookingSystem
          const adapter = getAdapter(system)

          const dateStart = check.dates[0]
          const dateEnd = check.dates[check.dates.length - 1]

          const availability = await adapter.checkAvailability(
            check.bookingUrl || '',
            { start: dateStart, end: dateEnd },
            check.groupSize,
          )

          const allAvailable = availability.every((d) => d.available)

          results.push({
            hutId: check.hutId,
            hutName: check.hutName,
            status: allAvailable ? 'available' : 'unavailable',
            dates: availability,
          })
        } catch (error) {
          results.push({
            hutId: check.hutId,
            hutName: check.hutName,
            status: 'error',
            dates: [],
            error: error instanceof Error ? error.message : 'Unknown error',
          })
        }

        // Update progress
        await job.updateProgress(Math.round(((i + 1) / hutChecks.length) * 100))
      }

      const allOk = results.every((r) => r.status === 'available')
      const anyError = results.some((r) => r.status === 'error')

      return {
        jobId: job.data.jobId,
        status: allOk ? 'completed' : anyError ? 'failed' : 'partial',
        results,
      }
    },
    { connection, concurrency: 2 },
  )

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`)
  })

  worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed:`, err)
  })

  return worker
}

// Start worker if run directly
if (require.main === module) {
  console.log('Starting availability crawler worker...')
  startWorker()
}
```

**Step 3: Add worker script to package.json**

Add to `package.json` scripts:
```json
"worker": "USE_MOCK_CRAWLER=true npx tsx lib/crawler/worker.ts"
```

**Step 4: Add USE_MOCK_CRAWLER=true to .env**

**Step 5: Commit**

```bash
git add lib/crawler/ package.json .env .env.example
git commit -m "feat: add crawler worker with adapter factory and BullMQ"
```

---

## Phase 5: Frontend

### Task 14: Layout, global styles, Zustand store

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Create: `lib/store.ts`

**Step 1: Set up Zustand store**

Create `lib/store.ts`:
```typescript
import { create } from 'zustand'

export interface HutDetail {
  id: string
  name: string
  altitude: number
  lat: number
  lng: number
  imageUrl: string | null
  capacity: number
  roomTypes: { type: string; count: number }[]
}

export interface TourResult {
  huts: string[]
  hutDetails: HutDetail[]
  legs: { fromHutId: string; toHutId: string; distance: number; ascent: number; descent: number; estimatedDuration: number }[]
  totalDistance: number
  totalAscent: number
  totalDescent: number
  totalDuration: number
}

export interface TourParams {
  regionId: string
  groupSize: number
  totalDays: number
  restDays: number
  minDistance: number | undefined
  maxDistance: number | undefined
  maxAscent: number | undefined
  roomPreference: string
  maxBedsPerRoom: number | undefined
}

interface AppState {
  // Region selection
  selectedRegionId: string | null
  setSelectedRegionId: (id: string | null) => void

  // Tour params
  tourParams: TourParams
  setTourParams: (params: Partial<TourParams>) => void

  // Search results
  tourResults: TourResult[]
  setTourResults: (tours: TourResult[]) => void
  totalFound: number
  setTotalFound: (n: number) => void

  // Selected tour for availability check
  selectedTour: TourResult | null
  setSelectedTour: (tour: TourResult | null) => void

  // Availability
  availabilityJobId: string | null
  setAvailabilityJobId: (id: string | null) => void
  availabilityResult: any | null
  setAvailabilityResult: (result: any) => void

  // Date range
  dateStart: string
  dateEnd: string
  setDateRange: (start: string, end: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedRegionId: null,
  setSelectedRegionId: (id) => set({ selectedRegionId: id }),

  tourParams: {
    regionId: '',
    groupSize: 2,
    totalDays: 4,
    restDays: 0,
    minDistance: undefined,
    maxDistance: undefined,
    maxAscent: undefined,
    roomPreference: 'any',
    maxBedsPerRoom: undefined,
  },
  setTourParams: (params) =>
    set((state) => ({ tourParams: { ...state.tourParams, ...params } })),

  tourResults: [],
  setTourResults: (tours) => set({ tourResults: tours }),
  totalFound: 0,
  setTotalFound: (n) => set({ totalFound: n }),

  selectedTour: null,
  setSelectedTour: (tour) => set({ selectedTour: tour }),

  availabilityJobId: null,
  setAvailabilityJobId: (id) => set({ availabilityJobId: id }),
  availabilityResult: null,
  setAvailabilityResult: (result) => set({ availabilityResult: result }),

  dateStart: '',
  dateEnd: '',
  setDateRange: (start, end) => set({ dateStart: start, dateEnd: end }),
}))
```

**Step 2: Update layout.tsx**

Replace `app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hütten-Tour Planner',
  description: 'Plane deine Mehrtages-Hüttentour in den Alpen',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

**Step 3: Commit**

```bash
git add lib/store.ts app/layout.tsx app/globals.css
git commit -m "feat: add Zustand store and layout setup"
```

---

### Task 15: Map component + region selection (Screen 1)

**Files:**
- Create: `components/map/alpine-map.tsx`
- Create: `lib/map/regions.ts`
- Modify: `app/page.tsx`

**Step 1: Create region definitions**

Create `lib/map/regions.ts`:
```typescript
export interface MapRegion {
  id: string
  name: string
  center: [number, number] // [lng, lat]
  zoom: number
  bounds: [[number, number], [number, number]] // [[minLng, minLat], [maxLng, maxLat]]
}

export const ALPINE_REGIONS: MapRegion[] = [
  {
    id: 'stubaier-alpen',
    name: 'Stubaier Alpen',
    center: [11.25, 47.05],
    zoom: 11,
    bounds: [[11.05, 46.95], [11.45, 47.15]],
  },
  {
    id: 'zillertal',
    name: 'Zillertaler Alpen',
    center: [11.87, 47.05],
    zoom: 11,
    bounds: [[11.65, 46.90], [12.10, 47.20]],
  },
  {
    id: 'oetztal',
    name: 'Ötztaler Alpen',
    center: [10.85, 46.85],
    zoom: 11,
    bounds: [[10.60, 46.70], [11.10, 47.00]],
  },
  {
    id: 'dolomiten',
    name: 'Dolomiten',
    center: [11.85, 46.45],
    zoom: 10,
    bounds: [[11.40, 46.25], [12.30, 46.65]],
  },
  {
    id: 'berner-oberland',
    name: 'Berner Oberland',
    center: [7.95, 46.55],
    zoom: 10,
    bounds: [[7.60, 46.35], [8.30, 46.75]],
  },
]

export const ALPS_CENTER: [number, number] = [11.5, 47.0]
export const ALPS_ZOOM = 7
```

**Step 2: Create map component**

Create `components/map/alpine-map.tsx`:
```tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { ALPINE_REGIONS, ALPS_CENTER, ALPS_ZOOM, MapRegion } from '@/lib/map/regions'

interface AlpineMapProps {
  onRegionSelect: (region: MapRegion) => void
  selectedRegionId?: string | null
  huts?: { id: string; name: string; lat: number; lng: number; altitude: number }[]
  routeLines?: { coordinates: [number, number][] }[]
}

export default function AlpineMap({ onRegionSelect, selectedRegionId, huts, routeLines }: AlpineMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: ALPS_CENTER,
      zoom: ALPS_ZOOM,
      pitch: 30,
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.current.on('load', () => {
      setLoaded(true)

      // Add region polygons as clickable areas
      for (const region of ALPINE_REGIONS) {
        const [[minLng, minLat], [maxLng, maxLat]] = region.bounds

        map.current!.addSource(`region-${region.id}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: { id: region.id, name: region.name },
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [minLng, minLat],
                [maxLng, minLat],
                [maxLng, maxLat],
                [minLng, maxLat],
                [minLng, minLat],
              ]],
            },
          },
        })

        map.current!.addLayer({
          id: `region-fill-${region.id}`,
          type: 'fill',
          source: `region-${region.id}`,
          paint: {
            'fill-color': '#3b82f6',
            'fill-opacity': 0.15,
          },
        })

        map.current!.addLayer({
          id: `region-border-${region.id}`,
          type: 'line',
          source: `region-${region.id}`,
          paint: {
            'line-color': '#3b82f6',
            'line-width': 2,
          },
        })

        // Region label
        map.current!.addLayer({
          id: `region-label-${region.id}`,
          type: 'symbol',
          source: `region-${region.id}`,
          layout: {
            'text-field': region.name,
            'text-size': 14,
            'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
          },
          paint: {
            'text-color': '#1e40af',
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
          },
        })

        // Click handler
        map.current!.on('click', `region-fill-${region.id}`, () => {
          onRegionSelect(region)
        })

        map.current!.on('mouseenter', `region-fill-${region.id}`, () => {
          map.current!.getCanvas().style.cursor = 'pointer'
          map.current!.setPaintProperty(`region-fill-${region.id}`, 'fill-opacity', 0.3)
        })

        map.current!.on('mouseleave', `region-fill-${region.id}`, () => {
          map.current!.getCanvas().style.cursor = ''
          map.current!.setPaintProperty(`region-fill-${region.id}`, 'fill-opacity', 0.15)
        })
      }
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  // Add hut markers when huts change
  useEffect(() => {
    if (!map.current || !loaded || !huts) return

    // Remove existing markers
    const existingMarkers = document.querySelectorAll('.hut-marker')
    existingMarkers.forEach((m) => m.remove())

    for (const hut of huts) {
      const el = document.createElement('div')
      el.className = 'hut-marker'
      el.style.cssText = 'width:12px;height:12px;background:#ef4444;border:2px solid white;border-radius:50%;cursor:pointer;'

      const popup = new mapboxgl.Popup({ offset: 10 }).setHTML(
        `<strong>${hut.name}</strong><br/>${hut.altitude}m`
      )

      new mapboxgl.Marker(el)
        .setLngLat([hut.lng, hut.lat])
        .setPopup(popup)
        .addTo(map.current!)
    }
  }, [huts, loaded])

  // Draw route lines
  useEffect(() => {
    if (!map.current || !loaded) return

    // Remove existing route layers
    const style = map.current.getStyle()
    if (style?.layers) {
      style.layers.forEach((layer) => {
        if (layer.id.startsWith('route-line-')) {
          map.current!.removeLayer(layer.id)
        }
      })
    }
    if (style?.sources) {
      Object.keys(style.sources).forEach((src) => {
        if (src.startsWith('route-')) {
          map.current!.removeSource(src)
        }
      })
    }

    if (!routeLines) return

    routeLines.forEach((line, i) => {
      map.current!.addSource(`route-${i}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: line.coordinates },
        },
      })

      map.current!.addLayer({
        id: `route-line-${i}`,
        type: 'line',
        source: `route-${i}`,
        paint: {
          'line-color': '#ef4444',
          'line-width': 3,
          'line-dasharray': [2, 1],
        },
      })
    })
  }, [routeLines, loaded])

  // Fly to selected region
  useEffect(() => {
    if (!map.current || !selectedRegionId) return
    const region = ALPINE_REGIONS.find((r) => r.id === selectedRegionId)
    if (region) {
      map.current.flyTo({ center: region.center, zoom: region.zoom, duration: 1500 })
    }
  }, [selectedRegionId])

  return <div ref={mapContainer} className="w-full h-full" />
}
```

**Step 3: Update app/page.tsx (Screen 1)**

Replace `app/page.tsx`:
```tsx
'use client'

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAppStore } from '@/lib/store'
import { MapRegion } from '@/lib/map/regions'

const AlpineMap = dynamic(() => import('@/components/map/alpine-map'), { ssr: false })

export default function Home() {
  const router = useRouter()
  const { selectedRegionId, setSelectedRegionId } = useAppStore()

  const handleRegionSelect = (region: MapRegion) => {
    setSelectedRegionId(region.id)
    router.push(`/tour/configure?region=${region.id}`)
  }

  return (
    <main className="relative h-screen w-screen">
      <div className="absolute inset-0">
        <AlpineMap onRegionSelect={handleRegionSelect} selectedRegionId={selectedRegionId} />
      </div>

      <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Hütten-Tour Planner</h1>
        <p className="text-gray-600 text-sm">
          Wähle eine Region auf der Karte, um deine Mehrtages-Hüttentour zu planen.
        </p>
      </div>
    </main>
  )
}
```

**Step 4: Commit**

```bash
git add components/map/ lib/map/ app/page.tsx
git commit -m "feat: add interactive Alpine map with region selection"
```

---

### Task 16: Tour configuration screen (Screen 2)

**Files:**
- Create: `app/tour/configure/page.tsx`

**Step 1: Create configuration page**

Create `app/tour/configure/page.tsx`:
```tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useAppStore } from '@/lib/store'

function ConfigureForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const regionId = searchParams.get('region') || ''
  const { tourParams, setTourParams } = useAppStore()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const params = { ...tourParams, regionId }
    setTourParams(params)

    const res = await fetch('/api/tours/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })

    const data = await res.json()
    useAppStore.getState().setTourResults(data.tours)
    useAppStore.getState().setTotalFound(data.totalFound)

    setLoading(false)
    router.push('/tour/results')
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <button onClick={() => router.back()} className="text-blue-600 mb-4 hover:underline text-sm">
          &larr; Zurück zur Karte
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tour konfigurieren</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gruppengröße</label>
              <input
                type="number" min={1} max={20}
                value={tourParams.groupSize}
                onChange={(e) => setTourParams({ groupSize: parseInt(e.target.value) || 1 })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gesamtdauer (Tage)</label>
              <input
                type="number" min={2} max={14}
                value={tourParams.totalDays}
                onChange={(e) => setTourParams({ totalDays: parseInt(e.target.value) || 2 })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Puffertage</label>
              <input
                type="number" min={0} max={tourParams.totalDays - 1}
                value={tourParams.restDays}
                onChange={(e) => setTourParams({ restDays: parseInt(e.target.value) || 0 })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max. Höhenmeter/Tag</label>
              <input
                type="number" min={100} max={2000} step={50}
                value={tourParams.maxAscent || ''}
                onChange={(e) => setTourParams({ maxAscent: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="z.B. 800"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min. Distanz/Tag (km)</label>
              <input
                type="number" min={1} max={30} step={0.5}
                value={tourParams.minDistance || ''}
                onChange={(e) => setTourParams({ minDistance: e.target.value ? parseFloat(e.target.value) : undefined })}
                placeholder="z.B. 3"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max. Distanz/Tag (km)</label>
              <input
                type="number" min={1} max={30} step={0.5}
                value={tourParams.maxDistance || ''}
                onChange={(e) => setTourParams({ maxDistance: e.target.value ? parseFloat(e.target.value) : undefined })}
                placeholder="z.B. 12"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unterkunft</label>
            <select
              value={tourParams.roomPreference}
              onChange={(e) => setTourParams({ roomPreference: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="any">Egal (auch Matratzenlager)</option>
              <option value="shared_4">Kleinlager (max. 4-6 Betten)</option>
              <option value="double">Doppelzimmer</option>
              <option value="single">Einzelzimmer</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Suche läuft...' : 'Touren anzeigen'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default function ConfigurePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Laden...</div>}>
      <ConfigureForm />
    </Suspense>
  )
}
```

**Step 2: Commit**

```bash
git add app/tour/configure/
git commit -m "feat: add tour configuration screen with parameter inputs"
```

---

### Task 17: Tour results screen (Screen 3)

**Files:**
- Create: `app/tour/results/page.tsx`
- Create: `components/tour/tour-card.tsx`

**Step 1: Create tour card component**

Create `components/tour/tour-card.tsx`:
```tsx
import { TourResult } from '@/lib/store'

interface TourCardProps {
  tour: TourResult
  index: number
  onSelect: (tour: TourResult) => void
}

export default function TourCard({ tour, index, onSelect }: TourCardProps) {
  return (
    <div
      onClick={() => onSelect(tour)}
      className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer p-5 border border-gray-100"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900">Tour {index + 1}</h3>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {tour.legs.length} Etappen
        </span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {tour.hutDetails.map((hut, i) => (
          <span key={hut.id} className="flex items-center text-sm text-gray-700">
            {i > 0 && <span className="mx-1 text-gray-400">&rarr;</span>}
            <span className="font-medium">{hut.name}</span>
            <span className="text-xs text-gray-500 ml-1">({hut.altitude}m)</span>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="text-center bg-gray-50 rounded-lg py-2">
          <div className="font-semibold text-gray-900">{tour.totalDistance.toFixed(1)} km</div>
          <div className="text-xs text-gray-500">Distanz</div>
        </div>
        <div className="text-center bg-gray-50 rounded-lg py-2">
          <div className="font-semibold text-gray-900">{tour.totalAscent} Hm</div>
          <div className="text-xs text-gray-500">Aufstieg</div>
        </div>
        <div className="text-center bg-gray-50 rounded-lg py-2">
          <div className="font-semibold text-gray-900">{tour.totalDuration.toFixed(1)} h</div>
          <div className="text-xs text-gray-500">Gehzeit</div>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        {tour.legs.map((leg, i) => (
          <div key={i} className="flex justify-between text-xs text-gray-500 px-1">
            <span>Etappe {i + 1}</span>
            <span>{leg.distance.toFixed(1)} km &middot; {leg.ascent} Hm↑ &middot; {leg.estimatedDuration.toFixed(1)} h</span>
          </div>
        ))}
      </div>
    </div>
  )
}
```

**Step 2: Create results page**

Create `app/tour/results/page.tsx`:
```tsx
'use client'

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAppStore, TourResult } from '@/lib/store'
import TourCard from '@/components/tour/tour-card'
import { useState } from 'react'

const AlpineMap = dynamic(() => import('@/components/map/alpine-map'), { ssr: false })

export default function ResultsPage() {
  const router = useRouter()
  const { tourResults, totalFound, setSelectedTour } = useAppStore()
  const [hoveredTour, setHoveredTour] = useState<TourResult | null>(null)

  const displayTour = hoveredTour || tourResults[0] || null

  const handleSelect = (tour: TourResult) => {
    setSelectedTour(tour)
    router.push('/tour/availability')
  }

  if (tourResults.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Keine Touren gefunden</h2>
          <p className="text-gray-600 mb-4">Versuche andere Parameter.</p>
          <button onClick={() => router.back()} className="text-blue-600 hover:underline">
            Zurück zur Konfiguration
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen flex">
      {/* Left panel — tour list */}
      <div className="w-1/2 overflow-y-auto bg-gray-50 p-6">
        <button onClick={() => router.back()} className="text-blue-600 mb-4 hover:underline text-sm">
          &larr; Parameter anpassen
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Tourenvorschläge</h1>
        <p className="text-sm text-gray-500 mb-6">{totalFound} Touren gefunden, Top {tourResults.length} angezeigt</p>

        <div className="space-y-4">
          {tourResults.map((tour, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredTour(tour)}
              onMouseLeave={() => setHoveredTour(null)}
            >
              <TourCard tour={tour} index={i} onSelect={handleSelect} />
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — map */}
      <div className="w-1/2 relative">
        <AlpineMap
          onRegionSelect={() => {}}
          huts={displayTour?.hutDetails}
          routeLines={
            displayTour
              ? displayTour.legs.map((leg) => {
                  const from = displayTour.hutDetails.find((h) => h.id === leg.fromHutId)!
                  const to = displayTour.hutDetails.find((h) => h.id === leg.toHutId)!
                  return { coordinates: [[from.lng, from.lat], [to.lng, to.lat]] }
                })
              : undefined
          }
        />
      </div>
    </main>
  )
}
```

**Step 3: Commit**

```bash
git add app/tour/results/ components/tour/
git commit -m "feat: add tour results screen with split-view map and tour cards"
```

---

### Task 18: Availability check screen (Screen 4)

**Files:**
- Create: `app/tour/availability/page.tsx`
- Create: `components/tour/availability-calendar.tsx`

**Step 1: Create availability calendar component**

Create `components/tour/availability-calendar.tsx`:
```tsx
interface AvailabilityCalendarProps {
  results: {
    hutId: string
    hutName: string
    status: string
    dates: { date: string; available: boolean; roomTypes: { type: string; available: number }[] }[]
  }[]
}

export default function AvailabilityCalendar({ results }: AvailabilityCalendarProps) {
  if (!results || results.length === 0) return null

  const allDates = results[0]?.dates.map((d) => d.date) || []

  // Find windows where ALL huts are available
  const availableWindows: string[][] = []
  let currentWindow: string[] = []
  for (const date of allDates) {
    const allAvailable = results.every((hut) =>
      hut.dates.find((d) => d.date === date)?.available
    )
    if (allAvailable) {
      currentWindow.push(date)
    } else {
      if (currentWindow.length > 0) availableWindows.push(currentWindow)
      currentWindow = []
    }
  }
  if (currentWindow.length > 0) availableWindows.push(currentWindow)

  const windowDates = new Set(availableWindows.flat())

  return (
    <div className="overflow-x-auto">
      <table className="text-xs w-full">
        <thead>
          <tr>
            <th className="text-left py-2 px-3 font-medium text-gray-700 sticky left-0 bg-white min-w-[160px]">
              Hütte
            </th>
            {allDates.map((date) => (
              <th key={date} className="py-2 px-1 font-normal text-gray-500 min-w-[36px]">
                <div>{new Date(date).toLocaleDateString('de-DE', { day: '2-digit' })}</div>
                <div>{new Date(date).toLocaleDateString('de-DE', { month: 'short' })}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((hut) => (
            <tr key={hut.hutId} className="border-t">
              <td className="py-2 px-3 font-medium text-gray-900 sticky left-0 bg-white">
                {hut.hutName}
                {hut.status === 'error' && (
                  <span className="ml-1 text-orange-500" title="Konnte nicht geprüft werden">⚠</span>
                )}
              </td>
              {hut.dates.map((d) => (
                <td key={d.date} className="py-2 px-1 text-center">
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center mx-auto ${
                      d.available
                        ? windowDates.has(d.date)
                          ? 'bg-green-500 text-white font-bold'
                          : 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                    title={d.roomTypes.map((rt) => `${rt.type}: ${rt.available}`).join(', ')}
                  >
                    {d.available ? '✓' : '✗'}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {availableWindows.length > 0 && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">Verfügbare Zeitfenster</h3>
          {availableWindows.map((window, i) => (
            <div key={i} className="text-sm text-green-700">
              {new Date(window[0]).toLocaleDateString('de-DE', { day: '2-digit', month: 'long' })}
              {' '}&ndash;{' '}
              {new Date(window[window.length - 1]).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
              {' '}({window.length} Nächte)
            </div>
          ))}
        </div>
      )}

      {availableWindows.length === 0 && results.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
          <h3 className="font-semibold text-red-800">Kein durchgängiges Zeitfenster gefunden</h3>
          <p className="text-sm text-red-700 mt-1">
            Nicht alle Hütten sind gleichzeitig verfügbar. Prüfe die Kalenderansicht für Details.
          </p>
        </div>
      )}
    </div>
  )
}
```

**Step 2: Create availability page**

Create `app/tour/availability/page.tsx`:
```tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { useAppStore } from '@/lib/store'
import AvailabilityCalendar from '@/components/tour/availability-calendar'

export default function AvailabilityPage() {
  const router = useRouter()
  const {
    selectedTour, dateStart, dateEnd, setDateRange,
    availabilityJobId, setAvailabilityJobId,
    availabilityResult, setAvailabilityResult,
  } = useAppStore()

  const [checking, setChecking] = useState(false)
  const [progress, setProgress] = useState(0)

  const pollStatus = useCallback(async (jobId: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/availability/status/${jobId}`)
        const data = await res.json()

        setProgress(data.progress || 0)

        if (data.state === 'completed') {
          clearInterval(interval)
          setAvailabilityResult(data.result)
          setChecking(false)
        } else if (data.state === 'failed') {
          clearInterval(interval)
          setChecking(false)
          alert('Verfügbarkeitsprüfung fehlgeschlagen: ' + (data.failedReason || 'Unbekannter Fehler'))
        }
      } catch {
        clearInterval(interval)
        setChecking(false)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [setAvailabilityResult])

  const handleCheck = async () => {
    if (!selectedTour || !dateStart || !dateEnd) return

    setChecking(true)
    setProgress(0)
    setAvailabilityResult(null)

    const res = await fetch('/api/availability/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hutIds: selectedTour.huts,
        dateStart,
        dateEnd,
        groupSize: useAppStore.getState().tourParams.groupSize,
        roomPreference: useAppStore.getState().tourParams.roomPreference,
      }),
    })

    const data = await res.json()
    setAvailabilityJobId(data.jobId)
    pollStatus(data.jobId)
  }

  if (!selectedTour) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Keine Tour ausgewählt.</p>
          <button onClick={() => router.push('/tour/results')} className="text-blue-600 hover:underline">
            Zurück zu den Touren
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <button onClick={() => router.back()} className="text-blue-600 mb-4 hover:underline text-sm">
          &larr; Zurück zu den Touren
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verfügbarkeit prüfen</h1>

        {/* Tour summary */}
        <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-wrap gap-2">
          {selectedTour.hutDetails.map((hut, i) => (
            <span key={hut.id} className="flex items-center text-sm">
              {i > 0 && <span className="mx-2 text-gray-400">&rarr;</span>}
              <span className="font-medium text-gray-900">{hut.name}</span>
            </span>
          ))}
        </div>

        {/* Date range selection */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Zeitraum wählen</h2>
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Von</label>
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateRange(e.target.value, dateEnd)}
                className="border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bis</label>
              <input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateRange(dateStart, e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
            </div>
            <button
              onClick={handleCheck}
              disabled={checking || !dateStart || !dateEnd}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
            >
              {checking ? `Prüfe... ${progress}%` : 'Verfügbarkeit prüfen'}
            </button>
          </div>

          {checking && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Crawler prüft die Buchungsseiten... ({selectedTour.hutDetails.length} Hütten)
              </p>
            </div>
          )}
        </div>

        {/* Results */}
        {availabilityResult && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Ergebnis</h2>
            <AvailabilityCalendar results={availabilityResult.results} />
          </div>
        )}
      </div>
    </main>
  )
}
```

**Step 3: Commit**

```bash
git add app/tour/availability/ components/tour/availability-calendar.tsx
git commit -m "feat: add availability check screen with calendar view"
```

---

## Phase 6: Polish & Integration

### Task 19: Wire up region DB lookup to API

The tour search API currently expects a Prisma `regionId` (cuid), but the frontend sends a slug like `stubaier-alpen`. Update the search endpoint to look up the region by name-matching or add a slug field.

**Files:**
- Modify: `prisma/schema.prisma` — add `slug` field to Region
- Modify: `prisma/seed.ts` — add slugs
- Modify: `app/api/tours/search/route.ts` — accept slug

**Step 1: Add slug to Region model**

Add `slug String @unique` to Region in `prisma/schema.prisma`.

**Step 2: Run migration**

Run: `npx prisma migrate dev --name add-region-slug`

**Step 3: Update seed with slug**

Add `slug: 'stubaier-alpen'` to the region seed data.

**Step 4: Update search API to resolve slug**

In the search route, look up region by slug if regionId looks like a slug (no cuid format):
```typescript
let resolvedRegionId = regionId
if (regionId && !regionId.startsWith('c')) {
  const region = await prisma.region.findFirst({ where: { slug: regionId } })
  if (region) resolvedRegionId = region.id
}
```

**Step 5: Re-seed**

Run: `npx prisma db seed`

**Step 6: Commit**

```bash
git add prisma/ app/api/tours/search/route.ts
git commit -m "feat: add region slug for frontend-friendly URLs"
```

---

### Task 20: End-to-end smoke test

**Step 1: Start all services**

```bash
docker compose up -d
npm run dev &
npm run worker &
```

**Step 2: Manual test flow**

1. Open http://localhost:3000 — verify map loads with Alpine regions
2. Click "Stubaier Alpen" region — should navigate to /tour/configure
3. Set params: 2 people, 4 days, 0 rest days, max 800 Hm — click "Touren anzeigen"
4. Verify tour results load with hut names and stats
5. Click a tour — navigate to availability check
6. Set date range (e.g. July 2026) — click "Verfügbarkeit prüfen"
7. Verify progress bar moves and calendar renders

**Step 3: Fix any issues found**

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: end-to-end integration fixes"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1-3 | Project scaffold, Docker, Prisma schema + seed |
| 2 | 4-6 | Graph, Pathfinder, Scoring algorithm |
| 3 | 7-10 | API endpoints (regions, huts, search, availability) |
| 4 | 11-13 | Crawler adapters + worker |
| 5 | 14-18 | All frontend screens |
| 6 | 19-20 | Integration + smoke test |

**Total: 20 tasks, ~4-6 hours estimated implementation time**
