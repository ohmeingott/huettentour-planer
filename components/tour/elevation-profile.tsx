'use client'

import { HutDetail, TourLeg } from '@/lib/store'
import { useState } from 'react'

interface ElevationProfileProps {
  hutDetails: HutDetail[]
  legs: TourLeg[]
  height?: number
}

interface ProfilePoint {
  x: number       // cumulative distance (km)
  y: number       // altitude (m)
  hutName?: string // set at hut positions
  legIndex?: number
}

/**
 * Builds a realistic elevation profile by interpolating between huts.
 * For each leg, we know: start altitude, end altitude, total ascent, total descent.
 * If ascent+descent > |altDiff|, the trail has intermediate high/low points.
 */
function buildProfile(hutDetails: HutDetail[], legs: TourLeg[]): ProfilePoint[] {
  if (hutDetails.length === 0) return []

  const points: ProfilePoint[] = []
  let cumulativeDistance = 0

  // Deduplicate hutDetails for round trips (last = first)
  const uniqueHuts = hutDetails.filter((h, i, arr) =>
    i === 0 || h.id !== arr[i - 1]?.id
  )

  // First hut
  points.push({ x: 0, y: uniqueHuts[0].altitude, hutName: uniqueHuts[0].name })

  for (let i = 0; i < legs.length; i++) {
    const leg = legs[i]
    const fromHut = hutDetails.find((h) => h.id === leg.fromHutId)
    const toHut = hutDetails.find((h) => h.id === leg.toHutId)
    if (!fromHut || !toHut) continue

    const startAlt = fromHut.altitude
    const endAlt = toHut.altitude
    const altDiff = endAlt - startAlt
    const netAscent = leg.ascent - leg.descent

    // Check if the trail has a significant peak or valley mid-leg
    // If ascent > altDiff (when going up) or descent > -altDiff (going down),
    // there's an intermediate high/low point
    const hasIntermediatePeak = leg.ascent > 0 && leg.descent > 0 &&
      (leg.ascent + leg.descent) > Math.abs(altDiff) * 1.3

    if (hasIntermediatePeak) {
      // Calculate the peak altitude: start + ascent
      const peakAlt = startAlt + leg.ascent
      const valleyAlt = startAlt - leg.descent

      if (leg.ascent >= leg.descent) {
        // Goes up to a peak, then descends to end
        const peakX = cumulativeDistance + leg.distance * 0.55
        points.push({ x: peakX, y: peakAlt, legIndex: i })
      } else {
        // Descends to valley, then climbs to end
        const valleyX = cumulativeDistance + leg.distance * 0.4
        points.push({ x: valleyX, y: valleyAlt, legIndex: i })
      }
    }

    cumulativeDistance += leg.distance
    points.push({
      x: cumulativeDistance,
      y: endAlt,
      hutName: toHut.name,
      legIndex: i,
    })
  }

  return points
}

export default function ElevationProfile({ hutDetails, legs, height = 120 }: ElevationProfileProps) {
  const [hoveredPoint, setHoveredPoint] = useState<ProfilePoint | null>(null)

  const points = buildProfile(hutDetails, legs)
  if (points.length < 2) return null

  const padding = { top: 20, bottom: 28, left: 0, right: 0 }
  const width = 400
  const chartW = width - padding.left - padding.right
  const chartH = height - padding.top - padding.bottom

  const maxX = points[points.length - 1].x
  const minY = Math.min(...points.map((p) => p.y))
  const maxY = Math.max(...points.map((p) => p.y))
  const yRange = maxY - minY || 100
  // Add 10% padding to y axis
  const yMin = minY - yRange * 0.1
  const yMax = maxY + yRange * 0.1
  const ySpan = yMax - yMin

  const toSvgX = (x: number) => padding.left + (x / maxX) * chartW
  const toSvgY = (y: number) => padding.top + chartH - ((y - yMin) / ySpan) * chartH

  // Build the path
  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(p.x).toFixed(1)} ${toSvgY(p.y).toFixed(1)}`)
    .join(' ')

  // Fill area under the line
  const areaPath = `${linePath} L ${toSvgX(maxX).toFixed(1)} ${(padding.top + chartH).toFixed(1)} L ${padding.left} ${(padding.top + chartH).toFixed(1)} Z`

  // Hut points (only those with names)
  const hutPoints = points.filter((p) => p.hutName)

  // Y-axis ticks (3-4 values)
  const tickCount = 3
  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => {
    const val = minY + (yRange * i) / tickCount
    return Math.round(val / 50) * 50 // Round to nearest 50m
  }).filter((v, i, arr) => arr.indexOf(v) === i) // dedupe

  return (
    <div className="relative group">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        preserveAspectRatio="none"
        onMouseLeave={() => setHoveredPoint(null)}
      >
        {/* Grid lines */}
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={padding.left}
              y1={toSvgY(tick)}
              x2={width - padding.right}
              y2={toSvgY(tick)}
              stroke="#e7e5e4"
              strokeWidth="0.5"
              strokeDasharray="3,3"
            />
            <text
              x={width - 2}
              y={toSvgY(tick) - 2}
              textAnchor="end"
              className="fill-stone-300"
              fontSize="7"
            >
              {tick}m
            </text>
          </g>
        ))}

        {/* Gradient fill */}
        <defs>
          <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b7d5e" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b7d5e" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#elevGrad)" />

        {/* Profile line */}
        <path
          d={linePath}
          fill="none"
          stroke="#3b7d5e"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Hut markers */}
        {hutPoints.map((p, i) => (
          <g
            key={i}
            onMouseEnter={() => setHoveredPoint(p)}
            className="cursor-pointer"
          >
            <circle
              cx={toSvgX(p.x)}
              cy={toSvgY(p.y)}
              r="3.5"
              fill="white"
              stroke="#3b7d5e"
              strokeWidth="1.5"
            />
            {/* Hut name labels — show first, last, and alternate to avoid overlap */}
            {(i === 0 || i === hutPoints.length - 1 || i % 2 === 0) && (
              <text
                x={toSvgX(p.x)}
                y={height - 4}
                textAnchor={i === 0 ? 'start' : i === hutPoints.length - 1 ? 'end' : 'middle'}
                fontSize="7"
                className="fill-stone-400"
              >
                {p.hutName!.length > 14 ? p.hutName!.substring(0, 12) + '…' : p.hutName}
              </text>
            )}
          </g>
        ))}
      </svg>

      {/* Hover tooltip */}
      {hoveredPoint && (
        <div
          className="absolute -top-8 px-2 py-1 bg-stone-800 text-white text-[10px] rounded-md shadow-lg pointer-events-none whitespace-nowrap z-10"
          style={{
            left: `${(hoveredPoint.x / maxX) * 100}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {hoveredPoint.hutName} · {hoveredPoint.y}m · {hoveredPoint.x.toFixed(1)}km
        </div>
      )}
    </div>
  )
}
