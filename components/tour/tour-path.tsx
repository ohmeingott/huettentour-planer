'use client'

import { useEffect, useRef, useState } from 'react'
import { TourResult } from '@/lib/store'

interface TourPathProps {
  tour: TourResult
  animate?: boolean
}

export default function TourPath({ tour, animate = false }: TourPathProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [drawn, setDrawn] = useState(!animate)

  useEffect(() => {
    if (animate) {
      setDrawn(false)
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setDrawn(true))
      })
      return () => cancelAnimationFrame(t)
    }
  }, [animate, tour.huts.join(',')])

  const { hutDetails, legs } = tour
  if (hutDetails.length < 2) return null

  // Layout dimensions
  const W = 420
  const H = 120
  const padX = 36
  const padTop = 24
  const padBottom = 32

  // Calculate x positions evenly spaced
  const stepX = (W - padX * 2) / (hutDetails.length - 1)
  const xs = hutDetails.map((_, i) => padX + i * stepX)

  // Calculate y positions based on altitude (higher altitude = higher on screen = lower y)
  const alts = hutDetails.map((h) => h.altitude)
  const minAlt = Math.min(...alts)
  const maxAlt = Math.max(...alts)
  const altRange = maxAlt - minAlt || 200
  const ys = alts.map(
    (alt) => H - padBottom - ((alt - minAlt) / altRange) * (H - padTop - padBottom)
  )

  // Build the path as a smooth curve through all points
  const points = xs.map((x, i) => ({ x, y: ys[i] }))

  function buildSmoothPath(pts: { x: number; y: number }[]): string {
    if (pts.length < 2) return ''
    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1]
      const curr = pts[i]
      const cpx = (prev.x + curr.x) / 2
      d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`
    }
    return d
  }

  const pathD = buildSmoothPath(points)

  // Total path length estimate for dash animation
  const totalLen = points.reduce((sum, p, i) => {
    if (i === 0) return 0
    const dx = p.x - points[i - 1].x
    const dy = p.y - points[i - 1].y
    return sum + Math.sqrt(dx * dx + dy * dy)
  }, 0)

  return (
    <div className="relative w-full overflow-hidden">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height: 'auto', maxHeight: 130 }}
      >
        {/* Altitude grid lines */}
        {[0, 0.5, 1].map((frac) => {
          const y = H - padBottom - frac * (H - padTop - padBottom)
          const alt = Math.round(minAlt + frac * altRange)
          return (
            <g key={frac}>
              <line x1={padX - 8} y1={y} x2={W - padX + 8} y2={y} stroke="#e7e5e4" strokeWidth={0.5} strokeDasharray="3 3" />
              <text x={padX - 12} y={y + 3} textAnchor="end" fontSize={7} fill="#a8a29e" fontFamily="var(--font-body)">
                {alt}
              </text>
            </g>
          )
        })}

        {/* Path shadow */}
        <path
          d={pathD}
          fill="none"
          stroke="#d6d3d1"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.5}
          transform="translate(0, 2)"
        />

        {/* Main animated path */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={totalLen}
          strokeDashoffset={drawn ? 0 : totalLen}
          style={{ transition: drawn ? `stroke-dashoffset 1.2s ease-out` : 'none' }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#378c65" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Leg info labels (between huts) */}
        {legs.map((leg, i) => {
          const midX = (xs[i] + xs[i + 1]) / 2
          const midY = (ys[i] + ys[i + 1]) / 2
          const isUp = ys[i + 1] < ys[i]
          return (
            <g
              key={i}
              opacity={drawn ? 1 : 0}
              style={{ transition: 'opacity 0.4s ease-out', transitionDelay: `${0.8 + i * 0.15}s` }}
            >
              {/* Duration badge */}
              <rect x={midX - 18} y={midY - 18} width={36} height={14} rx={4} fill="white" stroke="#e7e5e4" strokeWidth={0.5} />
              <text x={midX} y={midY - 8} textAnchor="middle" fontSize={8} fill="#57534e" fontWeight={600} fontFamily="var(--font-body)">
                {leg.estimatedDuration.toFixed(1)}h
              </text>

              {/* Elevation change */}
              <text x={midX} y={midY + 8} textAnchor="middle" fontSize={7} fill={isUp ? '#378c65' : '#c2410c'} fontFamily="var(--font-body)">
                {isUp ? '↑' : '↓'}{isUp ? leg.ascent : leg.descent}m
              </text>
            </g>
          )
        })}

        {/* Hut nodes */}
        {points.map((p, i) => {
          const hut = hutDetails[i]
          const isFirst = i === 0
          const isLast = i === points.length - 1
          return (
            <g
              key={hut.id}
              opacity={drawn ? 1 : 0}
              style={{ transition: 'opacity 0.3s ease-out', transitionDelay: `${0.3 + i * 0.2}s` }}
            >
              {/* Hut marker pin */}
              <circle cx={p.x} cy={p.y} r={5} fill="white" stroke={isFirst || isLast ? '#c2410c' : '#378c65'} strokeWidth={2} filter="url(#glow)" />
              <circle cx={p.x} cy={p.y} r={2} fill={isFirst || isLast ? '#c2410c' : '#378c65'} />

              {/* Hut name */}
              <text
                x={p.x}
                y={p.y - 10}
                textAnchor="middle"
                fontSize={7.5}
                fontWeight={600}
                fill="#292524"
                fontFamily="var(--font-body)"
              >
                {hut.name.length > 16 ? hut.name.slice(0, 14) + '...' : hut.name}
              </text>

              {/* Mountain icon under first/last */}
              {(isFirst || isLast) && (
                <path
                  d={`M ${p.x - 4} ${p.y + 10} l 4 -5 l 4 5 z`}
                  fill="none"
                  stroke="#c2410c"
                  strokeWidth={1}
                  opacity={0.5}
                />
              )}
            </g>
          )
        })}

        {/* Animated hiker dot */}
        {drawn && (
          <circle r={3} fill="#c2410c" opacity={0.9}>
            <animateMotion dur="4s" repeatCount="indefinite" path={pathD} />
          </circle>
        )}
      </svg>
    </div>
  )
}
