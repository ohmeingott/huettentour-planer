# Hütten-Tour Planner — Design Document

**Datum:** 2026-03-06
**Status:** Approved

## Überblick

Web-App zur Planung von Mehrtages-Hüttentouren in den Alpen. Kernfeature: automatische Verfügbarkeitsprüfung aller Hütten einer Tour via Web Scraping.

## Entscheidungen

- **Region:** Gesamte Alpen (DACH + IT, FR, SI)
- **Datenquelle:** Eigene Datenbank (initial befüllt aus öffentlichen Quellen)
- **Verfügbarkeits-Check:** Web Scraping (Playwright) der Buchungsportale
- **Architektur:** Monolith mit Background Jobs (Next.js + BullMQ)
- **Tech-Stack:** Next.js 14 (App Router), TypeScript, Mapbox, Tailwind, Prisma, PostgreSQL, Redis, BullMQ, Playwright
- **Kartenanbieter:** Mapbox GL JS

## Datenmodell

### Hut (Hütte)
- id, name, altitude, coordinates (lat/lng)
- region (z.B. "Stubaier Alpen", "Berner Oberland")
- capacity (Gesamtbetten)
- bookingUrl (Link zur Buchungsseite)
- bookingSystem (enum: "alpsonline" | "hut_wrs" | "sac" | "custom")
- imageUrl, description
- amenities (Dusche, Strom, etc.)
- roomTypes: Array von { type: "single" | "double" | "shared_4" | "dorm", count: number }

### Route (Verbindung zwischen 2 Hütten)
- id, fromHutId, toHutId
- distance (km), ascent (Hm↑), descent (Hm↓)
- estimatedDuration (Stunden)
- difficulty (enum: "easy" | "moderate" | "difficult")
- gpxTrack (optional)

### Region
- id, name
- boundingBox (für Kartenansicht)
- centerCoordinates

### Tour (vom User erstellt)
- id, userId (optional), name
- hutSequence [hutId, hutId, ...] (Reihenfolge)
- groupSize
- totalDays (Gesamtdauer)
- restDays (Puffertage)
- dateRange { start, end }
- accommodationPreference { type: "any" | "private_room" | "shared_room" | "dorm", maxBedsPerRoom: number }
- minDistancePerDay, maxDistancePerDay (km)
- maxAscentPerDay (Hm)
- status (draft | checking | available | partially_available)

### AvailabilityCheck
- id, hutId, date
- availableByRoomType: Array von { type, available: number }
- checkedAt (Timestamp)
- source (Booking-System)

## User Flow

### Screen 1: Startseite / Regionenauswahl
- Vollbild-Mapbox-Karte der Alpen
- Vordefinierte Regionen als klickbare Polygone
- Alternativ: Freihand-Rechteck auf Karte ziehen

### Screen 2: Tour-Parameter
- Gruppenanzahl, Gesamtdauer, Puffertage
- Min/Max Distanz pro Etappe, Max Höhenmeter
- Zimmer-Präferenz (Einzelzimmer, Doppelzimmer, Kleinlager, egal)
- Button: "Touren anzeigen"

### Screen 3: Tourenvorschläge
- Liste möglicher Routen (Graph-Algorithmus)
- Karte mit Routen-Linien und Hütten-Markern
- Pro Tour: Hüttenreihenfolge, Gesamtdistanz, Höhenmeter, Schwierigkeit
- Höhenprofil pro Etappe bei Klick

### Screen 4: Verfügbarkeits-Check
- Datumsbereich eingeben
- Crawler prüft alle Hütten der Tour
- Kalenderansicht: grün/rot pro Hütte+Datum
- Bei Ausfall: Alternativhütten + neue Route auf Karte
- Zeitfenster hervorheben wo alle Hütten verfügbar sind

### Screen 5: Buchungsübersicht
- Finale Tour mit Daten
- Links zu Buchungsseiten der Hütten
- Export als PDF / Teilen-Link

## Routen-Algorithmus

Hütten + Verbindungen = gewichteter Graph. Modifizierte Tiefensuche (DFS) mit Pruning:

1. Etappen = totalDays - restDays
2. Für jede Hütte als Startpunkt:
   - DFS mit Tiefe = Etappen
   - Pro Schritt: nur Nachbar-Hütten mit distance >= min UND <= max UND ascent <= max
   - Keine Hütte doppelt besuchen
   - Hütte muss genug Kapazität für roomPreference + groupSize haben
3. Scoring: Ausgewogene Etappen (geringe Varianz), Höhenlagen-Vielfalt, Rundtour-Bonus

## Crawler / Verfügbarkeits-Check

### Architektur
- User triggert Check → API erstellt BullMQ Job → Worker startet Playwright pro Hütte
- Frontend pollt Status via SSE/Polling
- Ergebnis in DB (AvailabilityCheck) gespeichert

### Booking-System Adapter
Pro System ein Adapter mit Interface:
```typescript
interface BookingAdapter {
  checkAvailability(hutUrl: string, dates: DateRange, groupSize: number): Promise<AvailabilityResult[]>
}
```
- AlpsonlineAdapter (alpsonline.org — DAV/OeAV)
- HutWrsAdapter (hut.wrs.at)
- SacAdapter (SAC Schweiz)
- GenericAdapter (Fallback)

### Caching
- 6 Stunden Cache auf Verfügbarkeitsdaten
- "Zuletzt geprüft vor X Stunden" Anzeige

### Fehlerbehandlung
- Keine Buchungsseite → "manuell prüfen"
- Scraping fehlgeschlagen → 2x Retry, dann "nicht prüfbar"
- Adapter-Fehler → Logging + Admin-Alert

### Alternativsuche bei Ausfall
1. Nachbar-Hütten finden die von Vorgänger + Nachfolger erreichbar sind
2. Distanz/Höhenmeter-Kriterien prüfen
3. Verfügbarkeit der Alternative crawlen
4. Nutzer sieht: Original-Route + Alternativroute(n)

## Projektstruktur

```
app/
├── page.tsx                        (Startseite mit Karte)
├── tour/
│   ├── configure/page.tsx          (Tour-Parameter)
│   ├── results/page.tsx            (Tourenvorschläge)
│   └── [id]/page.tsx               (Tour-Detail + Verfügbarkeit)
└── api/
    ├── huts/                       (Hütten-CRUD)
    ├── routes/                     (Routen-Berechnung)
    ├── availability/               (Crawler trigger + Status)
    └── tours/                      (Tour speichern/laden)

lib/
├── db/                             (Prisma Schema + Client)
├── crawler/
│   ├── adapters/                   (Booking-System Adapter)
│   ├── queue.ts                    (BullMQ Setup)
│   └── worker.ts                   (Job Worker)
├── algorithm/
│   ├── graph.ts                    (Hütten-Graph)
│   ├── pathfinder.ts               (DFS Tourensuche)
│   └── scoring.ts                  (Tour-Bewertung)
└── map/                            (Mapbox Helpers)

components/
├── map/                            (Karten-Komponenten)
├── tour/                           (Tour-Karten, Listen)
└── ui/                             (Shared UI)
```

## MVP Seed-Daten
15-20 Hütten im Stubaital mit echten Daten zum Testen.

## Infrastruktur
- Docker Compose: PostgreSQL + Redis (lokal)
- Deployment: TBD (Vercel + separate Worker oder VPS)
